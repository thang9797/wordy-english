import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { PageSkeleton } from "@/components/app/skeletons";
import { SpeakButton } from "@/components/app/speak-button";
import { displayAnswer } from "@/lib/grading";
import { getAttemptResult } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { popButton, popCard } from "@/lib/styles";

export default function ResultsPage({ params }: PageProps<"/quizzes/[slug]/results/[attemptId]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Results params={params} />
    </Suspense>
  );
}

function verdict(pct: number) {
  if (pct === 100) return { emoji: "🏆", text: "Perfect score!" };
  if (pct >= 80) return { emoji: "🎉", text: "Excellent work!" };
  if (pct >= 50) return { emoji: "💪", text: "Good effort. Review the explanations below." };
  return { emoji: "🌱", text: "Keep going. Every mistake is a lesson." };
}

async function Results({ params }: { params: PageProps<"/quizzes/[slug]/results/[attemptId]">["params"] }) {
  const user = await requireUser();
  const { attemptId } = await params;
  const attempt = await getAttemptResult(user.id, attemptId);
  if (!attempt) notFound();

  const pct = Math.round((attempt.score / Math.max(1, attempt.total)) * 100);
  const v = verdict(pct);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className={`${popCard} flex flex-wrap items-center gap-6 p-6 sm:p-8`}>
        <div
          className={`shadow-pop grid size-24 shrink-0 place-items-center rounded-3xl border-2 border-black/60 text-primary-foreground ${
            pct >= 80 ? "bg-lime" : pct >= 50 ? "bg-sun" : "bg-coral"
          }`}
        >
          <span className="font-heading text-3xl font-extrabold">{pct}%</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted-foreground">{attempt.quiz.title}</p>
          <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">
            {attempt.score}/{attempt.total} correct <span aria-hidden>{v.emoji}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">{v.text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={`/quizzes/${attempt.quiz.slug}`} className={popButton("primary")}>
            <RotateCcw className="size-4" /> Try again
          </Link>
          <Link href="/quizzes" className={popButton("card")}>
            All quizzes
          </Link>
        </div>
      </div>

      <ol className="flex flex-col gap-4">
        {attempt.answers.map((a, i) => (
          <li key={a.id} className={`rounded-3xl border-2 bg-card p-5 ${a.isCorrect ? "border-lime/60" : "border-coral/60"}`}>
            <div className="flex items-start gap-3">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full border-2 border-black/60 text-primary-foreground ${a.isCorrect ? "bg-lime" : "bg-coral"}`}
                aria-label={a.isCorrect ? "Correct" : "Incorrect"}
              >
                {a.isCorrect ? <Check className="size-4" /> : <X className="size-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">
                  {i + 1}. {a.question.prompt}
                </p>
                {a.question.audioText && (
                  <div className="mt-2 flex items-start gap-2 rounded-2xl bg-muted p-3 text-sm">
                    <SpeakButton text={a.question.audioText} label="Replay audio" className="size-8" />
                    <p className="whitespace-pre-line text-muted-foreground">{a.question.audioText}</p>
                  </div>
                )}
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  <span>
                    Your answer:{" "}
                    <b className={a.isCorrect ? "text-lime" : "text-coral"}>{a.answer.trim() || "(no answer)"}</b>
                  </span>
                  {!a.isCorrect && (
                    <span>
                      Correct answer: <b className="text-lime">{displayAnswer(a.question.correctAnswer)}</b>
                    </span>
                  )}
                </div>
                <div className="mt-3 rounded-2xl border border-border p-3 text-sm leading-relaxed">
                  <p>💡 {a.question.explanationEn}</p>
                  <p className="mt-1 text-sun">🇻🇳 {a.question.explanationVi}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
