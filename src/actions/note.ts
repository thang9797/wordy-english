"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";

const noteSchema = z.object({
  wordId: z.string().min(1),
  note: z.string().trim().max(500),
});

/** Saves (or clears, when empty) the learner's own memory trick for a word. */
export async function saveWordNote(input: { wordId: string; note: string }) {
  const user = await requireUser();
  const { wordId, note } = noteSchema.parse(input);

  const word = await db.word.findUnique({ where: { id: wordId }, select: { id: true } });
  if (!word) throw new Error("Word not found");

  if (!note) {
    await db.wordNote.deleteMany({ where: { userId: user.id, wordId } });
    return { note: "" };
  }
  await db.wordNote.upsert({
    where: { userId_wordId: { userId: user.id, wordId } },
    create: { userId: user.id, wordId, note },
    update: { note },
  });
  return { note };
}
