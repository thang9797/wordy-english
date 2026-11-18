import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/app/page-header";
import { GridSkeleton } from "@/components/app/skeletons";
import { Progress } from "@/components/ui/progress";
import { getDecksWithProgress } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { categoryStyles, popCard } from "@/lib/styles";

export const metadata = { title: "Decks · Wordy" };

type DeckItem = Awaited<ReturnType<typeof getDecksWithProgress>>[number];

const SECTIONS: { key: string; title: string; blurb: string; match: (d: DeckItem) => boolean }[] = [
  { key: "b2", title: "B2 vocabulary", blurb: "Upper-intermediate words with synonyms, collocations and word families.", match: (d) => d.level === "B2" },
  { key: "c1", title: "C1 vocabulary", blurb: "Advanced, precise words for fluent speaking and writing.", match: (d) => d.level === "C1" },
  { key: "c2", title: "C2 vocabulary", blurb: "Rare, literary and highly precise words for near-native mastery.", match: (d) => d.level === "C2" },
  { key: "toeic-550", title: "TOEIC 550–650", blurb: "Core workplace vocabulary.", match: (d) => d.category === "TOEIC" && d.toeicBand === 550 },
  { key: "toeic-650", title: "TOEIC 650–750", blurb: "Business vocabulary for emails, contracts and projects.", match: (d) => d.category === "TOEIC" && d.toeicBand === 650 },
  { key: "toeic-750", title: "TOEIC 750–850", blurb: "More abstract business vocabulary.", match: (d) => d.category === "TOEIC" && d.toeicBand === 750 },
  { key: "toeic-850", title: "TOEIC 850–990", blurb: "Formal and nuanced words for top scorers.", match: (d) => d.category === "TOEIC" && d.toeicBand === 850 },
  { key: "ielts", title: "IELTS", blurb: "Topic and academic vocabulary for Writing and Speaking.", match: (d) => d.category === "IELTS" },
  {
    key: "everyday",
    title: "Everyday English",
    blurb: "Foundation words for daily life (A2–B1).",
    match: (d) => d.category === "GENERAL" && !["B2", "C1", "C2"].includes(d.level),
  },
];

export default function DecksPage() {
  return (
    <>
      <PageHeader title="Decks" emoji="🗂️" subtitle="Study a deck and each word comes back in a new way: first you see it, then recognise it, complete a sentence, and finally spell it by ear." />
      <Suspense fallback={<GridSkeleton />}>
        <DeckSections />
      </Suspense>
    </>
  );
}

async function DeckSections() {
  const user = await requireUser();
  const decks = await getDecksWithProgress(user.id);

  return (
    <div className="flex flex-col gap-12">
      {SECTIONS.map((section) => {
        const items = decks.filter(section.match);
        if (items.length === 0) return null;
        return (
          <section key={section.key}>
            <div className="mb-5 flex items-baseline gap-3">
              <h2 className="font-heading text-2xl font-extrabold">{section.title}</h2>
              <p className="text-sm text-muted-foreground">{section.blurb}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((d) => {
                const pct = d.total ? Math.round((d.learned / d.total) * 100) : 0;
                return (
                  <Link
                    key={d.slug}
                    href={`/decks/${d.slug}`}
                    className={`${popCard} group flex flex-col gap-3 p-5 transition-transform hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`${categoryStyles[d.category].bg} rounded-full border-2 border-black/60 px-2 py-0.5 text-xs font-bold text-primary-foreground`}>
                        {categoryStyles[d.category].label}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">{d.level}</span>
                      {d.due > 0 && (
                        <span className="ml-auto rounded-full bg-coral px-2 py-0.5 text-xs font-bold text-primary-foreground">
                          {d.due} due
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-xl font-bold">{d.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                    <div className="mt-auto pt-2">
                      <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                        <span>
                          {d.learned}/{d.total} words started
                        </span>
                        <span>{pct}%</span>
                      </div>
                      <Progress value={pct} aria-label={`${d.title} progress`} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
