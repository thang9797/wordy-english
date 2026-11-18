"use client";

import { useState, useTransition } from "react";
import { Check, NotebookPen } from "lucide-react";
import { saveWordNote } from "@/actions/note";
import { Textarea } from "@/components/ui/textarea";

/** Lets a learner keep their own memory trick for a word. Saves when the field loses focus. */
export function NoteEditor({ wordId, initialNote }: { wordId: string; initialNote: string | null }) {
  const [text, setText] = useState(initialNote ?? "");
  const [saved, setSaved] = useState(initialNote ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function save() {
    const value = text.trim();
    if (value === saved) return;
    setError(null);
    startTransition(async () => {
      try {
        const result = await saveWordNote({ wordId, note: value });
        setSaved(result.note);
        setText(result.note);
      } catch {
        setError("Couldn't save your note. Try again.");
      }
    });
  }

  return (
    <div className="text-left" onClick={(e) => e.stopPropagation()}>
      <label htmlFor={`note-${wordId}`} className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <NotebookPen className="size-3.5" aria-hidden /> My note
        {pending && <span className="font-normal normal-case">Saving…</span>}
        {!pending && saved && text.trim() === saved && (
          <span className="flex items-center gap-0.5 font-normal normal-case text-lime">
            <Check className="size-3" aria-hidden /> Saved
          </span>
        )}
      </label>
      <Textarea
        id={`note-${wordId}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={save}
        maxLength={500}
        rows={2}
        placeholder="Write your own example or memory trick…"
        className="text-sm"
      />
      {error && (
        <p role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
