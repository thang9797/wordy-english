import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { PageSkeleton } from "@/components/app/skeletons";
import { NoteEditor } from "@/components/app/note-editor";
import { SpeakButton } from "@/components/app/speak-button";
import { WordContext, hasContext } from "@/components/app/word-context";
import { getDeckDetail, parseExamples } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { categoryStyles, popButton, popCard } from "@/lib/styles";

export default function DeckPage({ params }: PageProps<"/decks/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <DeckDetail params={params} />
    </Suspense>
  );
}

function statusOf(progress: { dueAt: Date; intervalDays: number }[], now: Date) {
  const p = progress[0];
  if (!p) return { label: "New", cls: "bg-muted text-muted-foreground" };
  if (p.dueAt <= now) return { label: "Due", cls: "bg-coral text-primary-foreground" };
  if (p.intervalDays >= 21) return { label: "Mastered", cls: "bg-lime text-primary-foreground" };
  return { label: "Learning", cls: "bg-sun text-primary-foreground" };
}

async function DeckDetail({ params }: { params: PageProps<"/decks/[slug]">["params"] }) {
  const user = await requireUser();
  const { slug } = await params;
  const deck = await getDeckDetail(user.id, slug);
  if (!deck) notFound();

  const now = new Date();
  const dueCount = deck.words.filter((w) => w.progress[0] && w.progress[0].dueAt <= now).length;
  const newCount = deck.words.filter((w) => !w.progress[0]).length;
  const style = categoryStyles[deck.category];

  return (
    <div className="flex flex-col gap-8">
      <Link href="/decks" className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> All decks
      </Link>

      <div className={`${popCard} flex flex-wrap items-center justify-between gap-6 p-6`}>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className={`${style.bg} rounded-full border-2 border-black/60 px-2 py-0.5 text-xs font-bold text-primary-foreground`}>{style.label}</span>
            <span className="text-sm text-muted-foreground">{deck.level}</span>
          </div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight">{deck.title}</h1>
          <p className="mt-1 text-muted-foreground">{deck.description}</p>
          <p className="mt-3 text-sm">
            <b>{deck.words.length}</b> words · <b>{dueCount}</b> due · <b>{newCount}</b> new
          </p>
        </div>
        <Link href={`/decks/${deck.slug}/study`} className={popButton("lime", "lg")}>
          <Play className="size-5" /> Study now
        </Link>
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {deck.words.map((w) => {
          const status = statusOf(w.progress, now);
          return (
            <li key={w.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <SpeakButton text={w.term} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-heading text-lg font-bold">{w.term}</span>
                  <span className="font-mono text-xs text-muted-foreground">{w.phonetic}</span>
                  <span className="text-xs italic text-muted-foreground">{w.partOfSpeech}</span>
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold ${status.cls}`}>{status.label}</span>
                </div>
                <p className="mt-1 text-sm">{w.definitionEn}</p>
                <p className="text-sm font-medium text-sun">🇻🇳 {w.meaningVi}</p>
                <p className="mt-2 text-sm italic text-muted-foreground">“{w.exampleEn}”</p>
                <details className="group mt-3">
                  <summary className="cursor-pointer text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground">
                    {hasContext({ ...w, moreExamples: parseExamples(w.moreExamples) }) ? "More: context, examples & my note" : "My note"}
                  </summary>
                  <div className="mt-3 flex flex-col gap-3">
                    <WordContext word={{ ...w, moreExamples: parseExamples(w.moreExamples) }} />
                    <NoteEditor wordId={w.id} initialNote={w.notes[0]?.note ?? null} />
                  </div>
                </details>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
