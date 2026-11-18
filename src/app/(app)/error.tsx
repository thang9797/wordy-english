"use client";

import { popButton, popCard } from "@/lib/styles";

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className={`${popCard} mx-auto flex max-w-lg flex-col items-center gap-4 p-10 text-center`}>
      <span className="text-5xl" aria-hidden>
        😵
      </span>
      <h1 className="font-heading text-2xl font-extrabold">Something went wrong</h1>
      <p className="text-muted-foreground">
        Please try again. If the problem continues, check that the database is running.
        {error.digest && <span className="mt-2 block font-mono text-xs">Error ID: {error.digest}</span>}
      </p>
      <button type="button" onClick={reset} className={popButton("primary")}>
        Try again
      </button>
    </div>
  );
}
