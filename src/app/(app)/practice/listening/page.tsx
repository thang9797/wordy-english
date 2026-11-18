import { Suspense } from "react";
import { PageHeader } from "@/components/app/page-header";
import { PracticeRunner } from "@/components/app/practice-runner";
import { Skeleton } from "@/components/ui/skeleton";
import { getPracticeSentences } from "@/lib/queries";
import { requireUser } from "@/lib/session";

export const metadata = { title: "Dictation · Wordy" };

export default function ListeningPage() {
  return (
    <>
      <PageHeader title="Dictation" emoji="🎧" subtitle="Play the sentence (slow it down if you need to), type what you hear, then check." />
      <Suspense fallback={<Skeleton className="mx-auto h-96 max-w-3xl rounded-3xl" />}>
        <Runner />
      </Suspense>
    </>
  );
}

async function Runner() {
  await requireUser();
  const sentences = await getPracticeSentences();
  return <PracticeRunner mode="DICTATION" sentences={sentences} />;
}
