import { notFound } from "next/navigation";
import { Suspense } from "react";
import { StudySession } from "@/components/app/study-session";
import { Skeleton } from "@/components/ui/skeleton";
import { getStudyQueue } from "@/lib/queries";
import { requireUser } from "@/lib/session";

export default function StudyPage({ params }: PageProps<"/decks/[slug]/study">) {
  return (
    <Suspense fallback={<Skeleton className="mx-auto h-96 max-w-xl rounded-3xl" />}>
      <Study params={params} />
    </Suspense>
  );
}

async function Study({ params }: { params: PageProps<"/decks/[slug]/study">["params"] }) {
  const user = await requireUser();
  const { slug } = await params;
  const data = await getStudyQueue(user.id, slug);
  if (!data) notFound();
  return <StudySession {...data} />;
}
