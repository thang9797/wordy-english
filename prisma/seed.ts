import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../src/generated/prisma/client";
import { b2Decks } from "./data/b2-decks";
import { b2MoreDecks } from "./data/b2-decks-more";
import { c1Decks } from "./data/c1-decks";
import { c1MoreDecks } from "./data/c1-decks-more";
import { c2Decks } from "./data/c2-decks";
import { generalDecks } from "./data/general-decks";
import { ieltsDecks } from "./data/ielts-decks";
import { quizzes } from "./data/quizzes";
import { sentences } from "./data/sentences";
import { toeicBand550Decks } from "./data/toeic-band-550";
import { toeicBand650Decks } from "./data/toeic-band-650";
import { toeicBand750Decks } from "./data/toeic-band-750";
import { toeicBand850Decks } from "./data/toeic-band-850";
import { toeicDecks } from "./data/toeic-decks";
import { isPassage, type SeedDeck, type SeedQuestion, type SeedWord } from "./data/types";

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const JSON_NULL = Prisma.DbNull;

function wordData(word: SeedWord, position: number) {
  const { moreExamples, synonyms, antonyms, collocations, wordFamily, mnemonicVi, ...base } = word;
  return {
    ...base,
    position,
    synonyms: synonyms ?? [],
    antonyms: antonyms ?? [],
    collocations: collocations ?? [],
    wordFamily: wordFamily ?? [],
    moreExamples: moreExamples?.length ? moreExamples : JSON_NULL,
    mnemonicVi: mnemonicVi ?? null,
  };
}

/** Throws if a term repeats inside one level (e.g. two B2 decks); warns about repeats across levels. */
function checkDuplicates(decks: SeedDeck[]) {
  const seen = new Map<string, { deck: string; level: string }>();
  for (const deck of decks) {
    for (const word of deck.words) {
      const key = word.term.toLowerCase();
      const prev = seen.get(key);
      if (prev && prev.deck !== deck.slug) {
        if (prev.level === deck.level && ["B2", "C1", "C2"].includes(deck.level)) {
          throw new Error(`Duplicate term "${word.term}" in ${prev.deck} and ${deck.slug}`);
        }
        console.warn(`  note: "${word.term}" appears in ${prev.deck} and ${deck.slug}`);
      } else if (!prev) {
        seen.set(key, { deck: deck.slug, level: deck.level });
      }
    }
  }
}

// Idempotent: everything is upserted by a natural key (slug / term / order / text),
// so re-running the seed updates content without touching user progress.
async function seedDecks() {
  const decks = [
    ...toeicDecks,
    ...toeicBand550Decks,
    ...toeicBand650Decks,
    ...toeicBand750Decks,
    ...toeicBand850Decks,
    ...ieltsDecks,
    ...generalDecks,
    ...b2Decks,
    ...b2MoreDecks,
    ...c1Decks,
    ...c1MoreDecks,
    ...c2Decks,
  ];
  checkDuplicates(decks);
  let wordCount = 0;
  for (const { words, ...deck } of decks) {
    const saved = await db.deck.upsert({
      where: { slug: deck.slug },
      create: deck,
      update: deck,
    });
    for (const [position, word] of words.entries()) {
      const data = wordData(word, position);
      await db.word.upsert({
        where: { deckId_term: { deckId: saved.id, term: word.term } },
        create: { ...data, deckId: saved.id },
        update: data,
      });
      wordCount++;
    }
  }
  console.log(`  decks: ${decks.length}, words: ${wordCount}`);
}

async function seedQuizzes() {
  let questionCount = 0;
  for (const { questions: items, ...quiz } of quizzes) {
    // Passage-based items (TOEIC Part 6–7 / Listening 3–4) are not seeded yet; only standalone questions.
    const questions: SeedQuestion[] = items.filter((i): i is SeedQuestion => !isPassage(i));
    const saved = await db.quiz.upsert({ where: { slug: quiz.slug }, create: quiz, update: quiz });
    for (const [order, q] of questions.entries()) {
      const data = { ...q, options: q.options ?? [], audioText: q.audioText ?? null };
      await db.question.upsert({
        where: { quizId_order: { quizId: saved.id, order } },
        create: { ...data, order, quizId: saved.id },
        update: data,
      });
      questionCount++;
    }
    // Remove questions that no longer exist in the source data.
    await db.question.deleteMany({ where: { quizId: saved.id, order: { gte: questions.length } } });
  }
  console.log(`  quizzes: ${quizzes.length}, questions: ${questionCount}`);
}

async function seedSentences() {
  for (const s of sentences) {
    await db.sentence.upsert({ where: { text: s.text }, create: s, update: s });
  }
  console.log(`  sentences: ${sentences.length}`);
}

async function main() {
  console.log("Seeding…");
  await seedDecks();
  await seedQuizzes();
  await seedSentences();
  console.log("Done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
