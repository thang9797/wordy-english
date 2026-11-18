import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Headphones, Mic } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { GridSkeleton } from "@/components/app/skeletons";
import { getPracticeStats } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { popCard } from "@/lib/styles";

export const metadata = { title: "Practice · Wordy" };

export default function PracticePage() {
  return (
    <>
      <PageHeader title="Practice" emoji="🎧" subtitle="Train your ears and your mouth with real TOEIC and IELTS sentences." />
      <Suspense fallback={<GridSkeleton count={2} />}>
        <Modes />
      </Suspense>
    </>
  );
}

async function Modes() {
  const user = await requireUser();
  const stats = await getPracticeStats(user.id);
  const modes = [
    {
      href: "/practice/listening",
      title: "Dictation",
      body: "Listen to a sentence and type what you hear. Great for TOEIC Listening and IELTS Listening.",
      icon: Headphones,
      color: "bg-sky",
      tilt: "-rotate-1",
      stat: stats.dictation,
    },
    {
      href: "/practice/speaking",
      title: "Shadowing",
      body: "Hear a sentence, say it out loud and get instant pronunciation feedback. Works in Chrome and Edge.",
      icon: Mic,
      color: "bg-coral",
      tilt: "rotate-1",
      stat: stats.speaking,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {modes.map(({ href, title, body, icon: Icon, color, tilt, stat }) => (
        <Link key={href} href={href} className={`${popCard} ${tilt} group flex flex-col gap-4 p-6 transition-transform hover:-translate-y-1 hover:rotate-0`}>
          <span className={`${color} shadow-pop grid size-12 place-items-center rounded-2xl border-2 border-black/60 text-primary-foreground`}>
            <Icon className="size-6" />
          </span>
          <h2 className="font-heading text-2xl font-bold">{title}</h2>
          <p className="leading-relaxed text-muted-foreground">{body}</p>
          <div className="mt-auto flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {stat.count > 0 ? `${stat.count} done · average ${stat.avg}%` : "Not started yet"}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold">
              Start <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
