import Link from "next/link";
import { Suspense } from "react";
import { BookOpen, BookOpenCheck, Headphones, SpellCheck } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { GridSkeleton } from "@/components/app/skeletons";
import { getQuizzesWithBest } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { categoryStyles, popCard } from "@/lib/styles";

export const metadata = { title: "Quizzes · Wordy" };

const SKILL = {
  VOCAB: { label: "Vocabulary", icon: SpellCheck, bg: "bg-lime" },
  GRAMMAR: { label: "Grammar", icon: BookOpenCheck, bg: "bg-sun" },
  LISTENING: { label: "Listening", icon: Headphones, bg: "bg-sky" },
  READING: { label: "Reading", icon: BookOpen, bg: "bg-grape" },
} as const;

export default function QuizzesPage() {
  return (
    <>
      <PageHeader
        title="Quizzes"
        emoji="🎯"
        subtitle="TOEIC-style and IELTS-style practice sets. Every answer comes with an explanation in English and Vietnamese."
      />
      <Suspense fallback={<GridSkeleton />}>
        <QuizList />
      </Suspense>
    </>
  );
}

async function QuizList() {
  const user = await requireUser();
  const quizzes = await getQuizzesWithBest(user.id);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((q) => {
        const skill = SKILL[q.skill];
        const Icon = skill.icon;
        return (
          <Link key={q.slug} href={`/quizzes/${q.slug}`} className={`${popCard} flex flex-col gap-3 p-5 transition-transform hover:-translate-y-1`}>
            <div className="flex items-center gap-2">
              <span className={`${skill.bg} grid size-9 place-items-center rounded-xl border-2 border-black/60 text-primary-foreground`}>
                <Icon className="size-4" />
              </span>
              <span className={`${categoryStyles[q.category].bg} rounded-full border-2 border-black/60 px-2 py-0.5 text-xs font-bold text-primary-foreground`}>
                {categoryStyles[q.category].label}
              </span>
              <span className="text-xs text-muted-foreground">{skill.label}</span>
            </div>
            <h2 className="font-heading text-lg font-bold leading-snug">{q.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{q.description}</p>
            <div className="mt-auto flex items-center justify-between pt-2 text-sm">
              <span className="text-muted-foreground">
                {q.questionCount} questions · {q.level}
              </span>
              {q.bestPercent !== null && (
                <span className={`font-heading font-bold ${q.bestPercent >= 80 ? "text-lime" : q.bestPercent >= 50 ? "text-sun" : "text-coral"}`}>
                  Best {q.bestPercent}%
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
