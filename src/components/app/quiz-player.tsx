"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { submitQuiz } from "@/actions/quiz";
import { SpeakButton } from "@/components/app/speak-button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { popButton, popCard } from "@/lib/styles";

type PlayQuestion = {
  id: string;
  type: "MULTIPLE_CHOICE" | "FILL_BLANK";
  prompt: string;
  audioText: string | null;
  options: string[];
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function QuizPlayer({ quiz }: { quiz: { id: string; slug: string; title: string; questions: PlayQuestion[] } }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const total = quiz.questions.length;
  const q = quiz.questions[index];
  const answer = answers[q.id] ?? "";
  const isLast = index === total - 1;
  const answeredCount = Object.values(answers).filter((a) => a.trim()).length;

  function setAnswer(value: string) {
    setAnswers((a) => ({ ...a, [q.id]: value }));
  }

  function finish() {
    setError(null);
    startTransition(async () => {
      try {
        await submitQuiz({ quizId: quiz.id, answers });
      } catch (e) {
        // redirect() inside the action surfaces as a navigation, not an error.
        if (e && typeof e === "object" && "digest" in e && String(e.digest).startsWith("NEXT_REDIRECT")) throw e;
        setError("Couldn't submit your answers. Please try again.");
      }
    });
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/quizzes" aria-label="Back to quizzes" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-5" />
        </Link>
        <Progress value={Math.round(((index + 1) / total) * 100)} className="flex-1" aria-label="Quiz progress" />
        <span className="text-sm tabular-nums text-muted-foreground">
          {index + 1}/{total}
        </span>
      </div>

      <div className={`${popCard} p-6 sm:p-8`}>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{quiz.title}</p>

        {q.audioText && (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-muted p-4">
            <SpeakButton text={q.audioText} label="Play audio" className="size-11" />
            <SpeakButton text={q.audioText} rate={0.75} label="Play slowly" className="size-9 bg-card text-foreground" />
            <span className="text-sm text-muted-foreground">Listen first. The script is shown after you submit.</span>
          </div>
        )}

        <h1 className="mt-4 font-heading text-xl font-bold leading-snug sm:text-2xl">{q.prompt}</h1>

        {q.type === "MULTIPLE_CHOICE" ? (
          <div className="mt-6 grid gap-3" role="radiogroup" aria-label="Answer options">
            {q.options.map((opt, i) => {
              const selected = answer === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setAnswer(opt)}
                  className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left font-medium transition-all ${
                    selected ? "shadow-pop border-black/60 bg-lime text-primary-foreground" : "border-border hover:border-foreground/40 hover:bg-muted"
                  }`}
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-lg border-2 font-heading text-sm font-bold ${
                      selected ? "border-black/60 bg-card text-foreground" : "border-border"
                    }`}
                  >
                    {LETTERS[i]}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (isLast) finish();
              else setIndex((i) => i + 1);
            }}
          >
            <label htmlFor={`answer-${q.id}`} className="text-sm font-medium text-muted-foreground">
              Type the missing word
            </label>
            <Input
              id={`answer-${q.id}`}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              className="mt-2 h-12 text-lg"
              autoFocus
            />
          </form>
        )}
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => setIndex((i) => i - 1)} disabled={index === 0} className={popButton("card")}>
          <ArrowLeft className="size-4" /> Back
        </button>
        {isLast ? (
          <button type="button" onClick={finish} disabled={pending} className={popButton("lime", "lg")}>
            {pending ? "Checking…" : `Submit (${answeredCount}/${total} answered)`}
          </button>
        ) : (
          <button type="button" onClick={() => setIndex((i) => i + 1)} className={popButton("primary")}>
            Next <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
