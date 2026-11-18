import { Suspense } from "react";
import { PageHeader } from "@/components/app/page-header";
import { PracticeRunner } from "@/components/app/practice-runner";
import { Skeleton } from "@/components/ui/skeleton";
import { getPracticeSentences } from "@/lib/queries";
import { requireUser } from "@/lib/session";

export const metadata = { title: "Shadowing · Wordy" };

export default function SpeakingPage() {
  return (
    <>
      <PageHeader title="Shadowing" emoji="🎙️" subtitle="Listen, then say the sentence out loud. Your browser transcribes it and we score how close you were." />
      <Suspense fallback={<Skeleton className="mx-auto h-96 max-w-3xl rounded-3xl" />}>
        <Runner />
      </Suspense>
    </>
  );
}

async function Runner() {
  await requireUser();
  const sentences = await getPracticeSentences();
  return <PracticeRunner mode="SPEAKING" sentences={sentences} />;
}
