import "server-only";
import { db } from "@/lib/db";
import type { Category } from "@/generated/prisma/client";
import { shuffled } from "@/lib/review-modes";
import { toDayKey } from "@/lib/streak";

/** New (never-seen) cards a learner is introduced to per day, across all decks. */
export const NEW_CARDS_PER_DAY = 20;
/** New cards offered per study session of one deck. */
export const NEW_CARDS_PER_SESSION = 10;

export async function getDashboardData(userId: string) {
  const now = new Date();
  const [dueCount, learnedCount, masteredCount, recentAttempts, dueByDeck] = await Promise.all([
    db.cardProgress.count({ where: { userId, dueAt: { lte: now } } }),
    db.cardProgress.count({ where: { userId } }),
    db.cardProgress.count({ where: { userId, intervalDays: { gte: 21 } } }),
    db.quizAttempt.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 5,
      include: { quiz: { select: { title: true, slug: true, category: true } } },
    }),
    db.cardProgress.findMany({
      where: { userId, dueAt: { lte: now } },
      select: { word: { select: { deck: { select: { slug: true, title: true, category: true } } } } },
    }),
  ]);

  const decks = new Map<string, { slug: string; title: string; category: Category; due: number }>();
  for (const { word } of dueByDeck) {
    const d = word.deck;
    const entry = decks.get(d.slug) ?? { ...d, due: 0 };
    entry.due++;
    decks.set(d.slug, entry);
  }

  return {
    dueCount,
    learnedCount,
    masteredCount,
    recentAttempts,
    dueDecks: [...decks.values()].sort((a, b) => b.due - a.due),
  };
}

export async function getDecksWithProgress(userId: string) {
  const now = new Date();
  const [decks, progress] = await Promise.all([
    db.deck.findMany({
      where: { isOfficial: true },
      orderBy: [{ category: "asc" }, { createdAt: "asc" }],
      include: { _count: { select: { words: true } } },
    }),
    db.cardProgress.findMany({
      where: { userId },
      select: { dueAt: true, word: { select: { deckId: true } } },
    }),
  ]);

  const stats = new Map<string, { learned: number; due: number }>();
  for (const p of progress) {
    const s = stats.get(p.word.deckId) ?? { learned: 0, due: 0 };
    s.learned++;
    if (p.dueAt <= now) s.due++;
    stats.set(p.word.deckId, s);
  }

  return decks.map((d) => ({
    id: d.id,
    slug: d.slug,
    title: d.title,
    description: d.description,
    category: d.category,
    level: d.level,
    toeicBand: d.toeicBand,
    total: d._count.words,
    learned: stats.get(d.id)?.learned ?? 0,
    due: stats.get(d.id)?.due ?? 0,
  }));
}

export async function getDeckDetail(userId: string, slug: string) {
  const deck = await db.deck.findUnique({
    where: { slug },
    include: {
      words: {
        orderBy: { position: "asc" },
        include: {
          progress: { where: { userId }, select: { dueAt: true, intervalDays: true } },
          notes: { where: { userId }, select: { note: true } },
        },
      },
    },
  });
  if (!deck) return null;
  if (!deck.isOfficial && deck.ownerId !== userId) return null;
  return deck;
}

/** How many brand-new cards the learner has started today (app time zone). */
async function countNewCardsToday(userId: string) {
  const todayKey = toDayKey(new Date());
  const recent = await db.cardProgress.findMany({
    where: { userId, createdAt: { gte: new Date(Date.now() - 36 * 60 * 60 * 1000) } },
    select: { createdAt: true },
  });
  return recent.filter((p) => toDayKey(p.createdAt) === todayKey).length;
}

export type ExtraExample = { en: string; vi: string };

/** `Word.moreExamples` is stored as JSON; keep only well-formed entries. */
export function parseExamples(value: unknown): ExtraExample[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is ExtraExample =>
      typeof v === "object" && v !== null && typeof (v as ExtraExample).en === "string" && typeof (v as ExtraExample).vi === "string",
  );
}

/** Up to three other meanings from the same deck, preferring the same part of speech. */
function pickDistractors(word: { id: string; partOfSpeech: string }, pool: { id: string; partOfSpeech: string; meaningVi: string }[]) {
  const others = pool.filter((p) => p.id !== word.id);
  const samePos = others.filter((p) => p.partOfSpeech === word.partOfSpeech);
  const rest = others.filter((p) => p.partOfSpeech !== word.partOfSpeech);
  const ordered = [...shuffled(samePos, word.id), ...shuffled(rest, word.id)];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of ordered) {
    if (seen.has(p.meaningVi)) continue;
    seen.add(p.meaningVi);
    out.push(p.meaningVi);
    if (out.length === 3) break;
  }
  return out;
}

export type StudyCard = {
  id: string;
  term: string;
  phonetic: string;
  partOfSpeech: string;
  definitionEn: string;
  meaningVi: string;
  exampleEn: string;
  exampleVi: string;
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  wordFamily: string[];
  moreExamples: ExtraExample[];
  mnemonicVi: string | null;
  /** The learner's own note for this word, if any. */
  note: string | null;
  /** Meanings of other words, used as wrong options in multiple choice. */
  distractors: string[];
  isNew: boolean;
  state: { easeFactor: number; intervalDays: number; repetitions: number; lapses: number };
};

export async function getStudyQueue(userId: string, slug: string) {
  const deck = await getDeckDetail(userId, slug);
  if (!deck) return null;
  const now = new Date();

  const due: StudyCard[] = [];
  const fresh: StudyCard[] = [];
  const progressRows = await db.cardProgress.findMany({
    where: { userId, word: { deckId: deck.id } },
  });
  const progressByWord = new Map(progressRows.map((p) => [p.wordId, p]));

  for (const w of deck.words) {
    const p = progressByWord.get(w.id);
    const card = {
      id: w.id,
      term: w.term,
      phonetic: w.phonetic,
      partOfSpeech: w.partOfSpeech,
      definitionEn: w.definitionEn,
      meaningVi: w.meaningVi,
      exampleEn: w.exampleEn,
      exampleVi: w.exampleVi,
      synonyms: w.synonyms,
      antonyms: w.antonyms,
      collocations: w.collocations,
      wordFamily: w.wordFamily,
      moreExamples: parseExamples(w.moreExamples),
      mnemonicVi: w.mnemonicVi,
      note: w.notes[0]?.note ?? null,
      distractors: pickDistractors(w, deck.words),
      isNew: !p,
      state: p
        ? { easeFactor: p.easeFactor, intervalDays: p.intervalDays, repetitions: p.repetitions, lapses: p.lapses }
        : { easeFactor: 2.5, intervalDays: 0, repetitions: 0, lapses: 0 },
    };
    if (!p) fresh.push(card);
    else if (p.dueAt <= now) due.push(card);
  }

  const newToday = await countNewCardsToday(userId);
  const newAllowance = Math.max(0, Math.min(NEW_CARDS_PER_SESSION, NEW_CARDS_PER_DAY - newToday));
  // Most overdue first is already roughly the deck order; keep it simple and predictable.
  const queue = [...due, ...fresh.slice(0, newAllowance)];

  return {
    deck: { slug: deck.slug, title: deck.title, category: deck.category },
    queue,
    dueCount: due.length,
    newCount: Math.min(fresh.length, newAllowance),
    newRemainingInDeck: fresh.length,
    dailyNewLimitReached: newAllowance === 0 && fresh.length > 0,
  };
}

export async function getQuizzesWithBest(userId: string) {
  const [quizzes, attempts] = await Promise.all([
    db.quiz.findMany({ orderBy: [{ category: "asc" }, { createdAt: "asc" }], include: { _count: { select: { questions: true } } } }),
    db.quizAttempt.findMany({ where: { userId }, select: { quizId: true, score: true, total: true } }),
  ]);
  const best = new Map<string, number>();
  for (const a of attempts) {
    const pct = a.total ? Math.round((a.score / a.total) * 100) : 0;
    best.set(a.quizId, Math.max(best.get(a.quizId) ?? 0, pct));
  }
  return quizzes.map((q) => ({
    id: q.id,
    slug: q.slug,
    title: q.title,
    description: q.description,
    category: q.category,
    skill: q.skill,
    level: q.level,
    questionCount: q._count.questions,
    bestPercent: best.get(q.id) ?? null,
  }));
}

/** Quiz for taking: answers and explanations are NOT included (they stay on the server). */
export async function getQuizForPlay(slug: string) {
  return db.quiz.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      category: true,
      skill: true,
      level: true,
      questions: {
        orderBy: { order: "asc" },
        select: { id: true, type: true, prompt: true, audioText: true, options: true },
      },
    },
  });
}

export async function getAttemptResult(userId: string, attemptId: string) {
  return db.quizAttempt.findFirst({
    where: { id: attemptId, userId },
    include: {
      quiz: { select: { title: true, slug: true, category: true } },
      answers: {
        include: { question: true },
        orderBy: { question: { order: "asc" } },
      },
    },
  });
}

export async function getPracticeSentences(category?: Category) {
  return db.sentence.findMany({
    where: category ? { category } : undefined,
    select: { id: true, text: true, translationVi: true, category: true, level: true },
    orderBy: { text: "asc" },
  });
}

export async function getPracticeStats(userId: string) {
  const logs = await db.practiceLog.groupBy({
    by: ["mode"],
    where: { userId },
    _count: { _all: true },
    _avg: { score: true },
  });
  const pick = (mode: "DICTATION" | "SPEAKING") => {
    const row = logs.find((l) => l.mode === mode);
    return { count: row?._count._all ?? 0, avg: row?._avg.score != null ? Math.round(row._avg.score) : null };
  };
  return { dictation: pick("DICTATION"), speaking: pick("SPEAKING") };
}
