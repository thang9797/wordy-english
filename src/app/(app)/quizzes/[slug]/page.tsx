import { notFound } from "next/navigation";
import { Suspense } from "react";
import { QuizPlayer } from "@/components/app/quiz-player";
import { Skeleton } from "@/components/ui/skeleton";
import { getQuizForPlay } from "@/lib/queries";
import { requireUser } from "@/lib/session";

export default function QuizPage({ params }: PageProps<"/quizzes/[slug]">) {
  return (
    <Suspense fallback={<Skeleton className="mx-auto h-96 max-w-2xl rounded-3xl" />}>
      <Quiz params={params} />
    </Suspense>
  );
}

async function Quiz({ params }: { params: PageProps<"/quizzes/[slug]">["params"] }) {
  await requireUser();
  const { slug } = await params;
  const quiz = await getQuizForPlay(slug);
  if (!quiz) notFound();
  return <QuizPlayer quiz={quiz} />;
}
