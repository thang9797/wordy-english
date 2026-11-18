import { Lightbulb } from "lucide-react";
import { SpeakButton } from "@/components/app/speak-button";

export interface WordContextData {
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  wordFamily: string[];
  moreExamples: { en: string; vi: string }[];
  mnemonicVi: string | null;
}

export function hasContext(w: WordContextData) {
  return Boolean(
    w.synonyms.length || w.antonyms.length || w.collocations.length || w.wordFamily.length || w.moreExamples.length || w.mnemonicVi,
  );
}

function Chips({ label, items, tone }: { label: string; items: string[]; tone: string }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      {items.map((item) => (
        <span key={item} className={`rounded-full border px-2.5 py-0.5 text-sm ${tone}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

/** Context and memory aids for a word. Empty sections are hidden, so older words look unchanged. */
export function WordContext({ word }: { word: WordContextData }) {
  if (!hasContext(word)) return null;
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-border p-4 text-left">
      <Chips label="Synonyms" items={word.synonyms} tone="border-lime/50 text-lime" />
      <Chips label="Opposites" items={word.antonyms} tone="border-coral/50 text-coral" />
      <Chips label="Goes with" items={word.collocations} tone="border-sky/50 text-sky" />
      <Chips label="Word family" items={word.wordFamily} tone="border-grape/50 text-grape" />
      {word.moreExamples.map((ex) => (
        <div key={ex.en} className="flex items-start gap-2">
          <SpeakButton text={ex.en} label="Listen to example" className="size-8" />
          <div>
            <p className="italic">“{ex.en}”</p>
            <p className="text-sm text-muted-foreground">{ex.vi}</p>
          </div>
        </div>
      ))}
      {word.mnemonicVi && (
        <p className="flex items-start gap-2 rounded-xl bg-sun/15 p-3 text-sm">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-sun" aria-hidden />
          <span>
            <b>Mẹo nhớ:</b> {word.mnemonicVi}
          </span>
        </p>
      )}
    </div>
  );
}
