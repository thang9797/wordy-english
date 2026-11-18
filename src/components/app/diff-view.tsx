import type { CompareResult } from "@/lib/text-compare";

/** Word-by-word feedback: ✓ matched, struck-through extra words, highlighted missing words. */
export function DiffView({ result }: { result: CompareResult }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="flex flex-wrap gap-1.5 text-lg leading-relaxed" aria-label="Word by word feedback">
        {result.tokens.map((t, i) => (
          <span
            key={i}
            className={
              t.status === "ok"
                ? "rounded-md bg-lime/20 px-1.5 text-lime"
                : t.status === "missing"
                  ? "rounded-md bg-coral/20 px-1.5 font-semibold text-coral underline decoration-wavy"
                  : "rounded-md bg-muted px-1.5 text-muted-foreground line-through"
            }
            title={t.status === "ok" ? "Correct" : t.status === "missing" ? "Missed or wrong: expected word" : "Extra or wrong word you wrote"}
          >
            {t.word}
          </span>
        ))}
      </p>
      <p className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span><span className="text-lime">■</span> correct</span>
        <span><span className="text-coral">■</span> missed (expected word)</span>
        <span><span className="line-through">abc</span> extra / wrong</span>
      </p>
    </div>
  );
}
