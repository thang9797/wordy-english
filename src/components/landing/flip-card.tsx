"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

const cards = [
  { word: "serendipity", ipa: "/ˌser.ənˈdɪp.ə.ti/", meaning: "Finding something good without looking for it.", example: "Meeting her was pure serendipity." },
  { word: "wanderlust", ipa: "/ˈwɒn.də.lʌst/", meaning: "A strong wish to travel.", example: "Wanderlust kept him moving city to city." },
  { word: "cozy", ipa: "/ˈkəʊ.zi/", meaning: "Warm, comfortable and safe.", example: "A cozy café on a rainy day." },
];

export function FlipCard() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];

  function next() {
    setFlipped(false);
    setIndex((i) => (i + 1) % cards.length);
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? `Show the word ${card.word}` : `Reveal the meaning of ${card.word}`}
        className="perspective-1000 h-64 w-full cursor-pointer rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
      >
        <div
          className={`relative h-full w-full transition-transform duration-500 transform-3d motion-reduce:transition-none ${flipped ? "rotate-y-180" : ""}`}
        >
          {/* Front */}
          <div className="backface-hidden shadow-pop-lg absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-black/60 bg-lime p-6 text-primary-foreground">
            <span className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Tap to flip
            </span>
            <span className="font-heading text-5xl font-extrabold tracking-tight">{card.word}</span>
            <span className="font-mono text-sm opacity-70">{card.ipa}</span>
          </div>
          {/* Back */}
          <div className="backface-hidden shadow-pop-lg absolute inset-0 flex rotate-y-180 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-black/60 bg-grape p-6 text-center text-primary-foreground">
            <p className="font-heading text-2xl font-bold leading-snug">{card.meaning}</p>
            <p className="text-sm italic opacity-80">“{card.example}”</p>
          </div>
        </div>
      </button>

      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted-foreground">How well did you know it?</span>
        {[
          { label: "😬", title: "Again", cls: "bg-coral" },
          { label: "🙂", title: "Good", cls: "bg-sun" },
          { label: "🤩", title: "Easy", cls: "bg-lime" },
        ].map((b) => (
          <button
            key={b.title}
            type="button"
            onClick={next}
            title={b.title}
            aria-label={`${b.title}, next card`}
            className={`${b.cls} shadow-pop grid size-10 place-items-center rounded-xl border-2 border-black/60 text-lg transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`}
          >
            {b.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setFlipped(false)}
          aria-label="Reset card"
          className="grid size-10 place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>
    </div>
  );
}
