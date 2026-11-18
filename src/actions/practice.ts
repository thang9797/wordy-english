"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { recordActivity } from "@/lib/activity";
import { requireUser } from "@/lib/session";
import { compareText } from "@/lib/text-compare";

const practiceSchema = z.object({
  sentenceId: z.string().min(1),
  mode: z.enum(["DICTATION", "SPEAKING"]),
  attempt: z.string().max(1000),
});

/** Scores a dictation / shadowing attempt on the server and logs it. */
export async function savePractice(input: z.infer<typeof practiceSchema>) {
  const user = await requireUser();
  const { sentenceId, mode, attempt } = practiceSchema.parse(input);

  const sentence = await db.sentence.findUnique({ where: { id: sentenceId }, select: { text: true } });
  if (!sentence) throw new Error("Sentence not found");

  const result = compareText(sentence.text, attempt);
  await db.practiceLog.create({ data: { userId: user.id, sentenceId, mode, score: result.score } });
  await recordActivity(user.id, "practices");
  return result;
}
