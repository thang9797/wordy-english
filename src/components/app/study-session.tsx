"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { ArrowLeft, PartyPopper } from "lucide-react";
import { submitReview } from "@/actions/review";
import {
  AnswerBack,
  ChooseMeaningFace,
  ClozeFace,
  IntroFace,
  ListenTypeFace,
  type AnswerResult,
} from "@/components/app/review-faces";
import { Progress } from "@/components/ui/progress";
import { makeCloze } from "@/lib/cloze";
import type { StudyCard } from "@/lib/queries";
import { pickMode, resolveMode } from "@/lib/review-modes";
import { RATINGS, formatInterval, schedule, type Rating } from "@/lib/srs";
import { popButton, popCard } from "@/lib/styles";

const BUTTONS: { rating: Rating; label: string; emoji: string; cls: string }[] = [
  { rating: RATINGS.again, label: "Again", emoji: "😬", cls: "bg-coral" },
  { rating: RATINGS.hard, label: "Hard", emoji: "😅", cls: "bg-sun" },
  { rating: RATINGS.good, label: "Good", emoji: "🙂", cls: "bg-sky" },
  { rating: RATINGS.easy, label: "Easy", emoji: "🤩", cls: "bg-lime" },
];

const MODE_LABEL = {
  intro: "New word",
  "choose-meaning": "Recognise",
  cloze: "In context",
  "listen-type": "Listen & spell",
} as const;

/** A card failed this many times in one session is not re-queued again. */
const MAX_REQUEUES = 3;

/** null = the learner just looked at the card (intro). */
type Answered = { correct: boolean | null; hinted: boolean };

/** Which self-ratings make sense after this answer. A wrong answer is always "Again". */
function allowedRatings(a: Answered): Rating[] {
  if (a.correct === null) return [RATINGS.again, RATINGS.hard, RATINGS.good, RATINGS.easy];
  if (!a.correct) return [RATINGS.again];
  return a.hinted ? [RATINGS.hard, RATINGS.good] : [RATINGS.hard, RATINGS.good, RATINGS.easy];
}

export function StudySession({
  deck,
  queue: initialQueue,
  dueCount,
  newCount,
  newRemainingInDeck,
  dailyNewLimitReached,
}: {
  deck: { slug: string; title: string };
  queue: StudyCard[];
  dueCount: number;
  newCount: number;
  newRemainingInDeck: number;
  dailyNewLimitReached: boolean;
}) {
  const [queue, setQueue] = useState(initialQueue);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<Answered | null>(null);
  const [reviewed, setReviewed] = useState(0);
  const [requeues, setRequeues] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const card = queue[index];
  const done = !card;

  const mode = useMemo(
    () => (card ? resolveMode(pickMode({ repetitions: card.state.repetitions, isNew: card.isNew }), card) : "intro"),
    [card],
  );
  const cloze = useMemo(() => (card && mode === "cloze" ? makeCloze(card.exampleEn, card.term) : null), [card, mode]);

  const rate = useCallback(
    (rating: Rating) => {
      if (!card || !answered || pending || !allowedRatings(answered).includes(rating)) return;
      setError(null);
      startTransition(async () => {
        try {
          await submitReview({ wordId: card.id, rating });
        } catch {
          setError("Couldn't save that review. Check your connection and try again.");
          return;
        }
        setReviewed((n) => n + 1);
        const times = requeues[card.id] ?? 0;
        if (rating === RATINGS.again && times < MAX_REQUEUES) {
          const next = schedule(card.state, rating);
          setQueue((q) => [...q, { ...card, isNew: false, state: next }]);
          setRequeues((r) => ({ ...r, [card.id]: times + 1 }));
        }
        setAnswered(null);
        setIndex((i) => i + 1);
      });
    },
    [card, answered, pending, requeues],
  );

  const onAnswer = useCallback((r: AnswerResult) => setAnswered({ correct: r.correct, hinted: r.hinted }), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!answered) {
        if (mode === "intro" && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          setAnswered({ correct: null, hinted: false });
        }
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        rate(answered.correct === false ? RATINGS.again : RATINGS.good);
        return;
      }
      const b = BUTTONS.find((x) => String(x.rating) === e.key);
      if (b) rate(b.rating);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rate, answered, mode]);

  if (initialQueue.length === 0) {
    return (
      <EmptyState
        deck={deck}
        message={
          dailyNewLimitReached
            ? "You've reached today's limit for new words. Come back tomorrow for more!"
            : newRemainingInDeck === 0
              ? "No cards are due in this deck right now. Great work!"
              : "Nothing to study right now."
        }
      />
    );
  }

  if (done) {
    return (
      <div className={`${popCard} mx-auto flex max-w-xl flex-col items-center gap-4 p-10 text-center`}>
        <PartyPopper className="size-12 text-sun" />
        <h1 className="font-heading text-3xl font-extrabold">Session complete!</h1>
        <p className="text-muted-foreground">
          You reviewed <b className="text-foreground">{reviewed}</b> card{reviewed === 1 ? "" : "s"} from {deck.title}. Your streak is safe for today 🔥
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/dashboard" className={popButton("lime")}>
            Back to dashboard
          </Link>
          <Link href={`/decks/${deck.slug}`} className={popButton("card")}>
            View deck
          </Link>
        </div>
      </div>
    );
  }

  const progressPct = Math.round((index / queue.length) * 100);
  const allowed = answered ? allowedRatings(answered) : [];
  const cardKey = `${card.id}:${index}`;

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href={`/decks/${deck.slug}`} aria-label="Back to deck" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-5" />
        </Link>
        <Progress value={progressPct} className="flex-1" aria-label="Session progress" />
        <span className="text-sm tabular-nums text-muted-foreground">
          {index + 1}/{queue.length}
        </span>
      </div>
      <p className="-mt-3 text-center text-xs text-muted-foreground">
        {deck.title} · {dueCount} due · {newCount} new · <b className="text-foreground">{MODE_LABEL[mode]}</b>
      </p>

      {mode === "intro" && <IntroFace key={cardKey} card={card} flipped={answered !== null} onReveal={() => setAnswered({ correct: null, hinted: false })} />}
      {mode === "choose-meaning" && <ChooseMeaningFace key={cardKey} card={card} onAnswer={onAnswer} />}
      {mode === "cloze" && cloze && <ClozeFace key={cardKey} card={card} cloze={cloze} onAnswer={onAnswer} />}
      {mode === "listen-type" && <ListenTypeFace key={cardKey} card={card} onAnswer={onAnswer} />}

      {/* After a quiz-style answer, show the whole word: meaning, context and the learner's note. */}
      {answered && mode !== "intro" && (
        <div className={`${popCard} p-6`}>
          <AnswerBack card={card} />
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Rating */}
      {answered ? (
        answered.correct === false ? (
          <button type="button" disabled={pending} onClick={() => rate(RATINGS.again)} className={popButton("coral", "lg")}>
            Continue · see it again soon ({formatInterval(schedule(card.state, RATINGS.again))})
          </button>
        ) : (
          <div className={`grid gap-3 ${allowed.length === 4 ? "grid-cols-4" : allowed.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
            {BUTTONS.filter((b) => allowed.includes(b.rating)).map((b) => (
              <button
                key={b.rating}
                type="button"
                disabled={pending}
                onClick={() => rate(b.rating)}
                className={`${b.cls} shadow-pop flex flex-col items-center gap-0.5 rounded-2xl border-2 border-black/60 py-2.5 font-heading font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-60`}
              >
                <span className="text-xl" aria-hidden>
                  {b.emoji}
                </span>
                <span className="text-sm">{b.label}</span>
                <span className="text-[11px] font-semibold opacity-75">{formatInterval(schedule(card.state, b.rating))}</span>
              </button>
            ))}
          </div>
        )
      ) : mode === "intro" ? (
        <button type="button" onClick={() => setAnswered({ correct: null, hinted: false })} className={popButton("primary", "lg")}>
          Show answer
        </button>
      ) : null}

      <p className="text-center text-xs text-muted-foreground">
        {mode === "choose-meaning"
          ? "Keyboard: 1–4 choose an answer · then Enter to continue"
          : mode === "intro"
            ? "Keyboard: Space = flip · 1 Again · 2 Hard · 3 Good · 4 Easy"
            : "Press Enter in the box to check · then 2 Hard · 3 Good · 4 Easy"}
      </p>
    </div>
  );
}

function EmptyState({ deck, message }: { deck: { slug: string; title: string }; message: string }) {
  return (
    <div className={`${popCard} mx-auto flex max-w-xl flex-col items-center gap-4 p-10 text-center`}>
      <span className="text-5xl" aria-hidden>
        🎉
      </span>
      <h1 className="font-heading text-2xl font-extrabold">{deck.title}</h1>
      <p className="text-muted-foreground">{message}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/decks" className={popButton("lime")}>
          Other decks
        </Link>
        <Link href="/quizzes" className={popButton("card")}>
          Take a quiz
        </Link>
      </div>
    </div>
  );
}
