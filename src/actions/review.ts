"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { recordActivity } from "@/lib/activity";
import { requireUser } from "@/lib/session";
import { INITIAL_STATE, schedule, type Rating } from "@/lib/srs";

const reviewSchema = z.object({
  wordId: z.string().min(1),
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
});

/** Grades one flashcard and stores the next review date (SM-2). */
export async function submitReview(input: { wordId: string; rating: Rating }) {
  const user = await requireUser();
  const { wordId, rating } = reviewSchema.parse(input);

  const word = await db.word.findUnique({ where: { id: wordId }, select: { id: true } });
  if (!word) throw new Error("Word not found");

  const existing = await db.cardProgress.findUnique({
    where: { userId_wordId: { userId: user.id, wordId } },
  });
  const now = new Date();
  const next = schedule(existing ?? INITIAL_STATE, rating, now);
  const data = {
    easeFactor: next.easeFactor,
    intervalDays: next.intervalDays,
    repetitions: next.repetitions,
    lapses: next.lapses,
    dueAt: next.dueAt,
    lastReviewedAt: now,
  };

  await db.$transaction([
    db.cardProgress.upsert({
      where: { userId_wordId: { userId: user.id, wordId } },
      create: { userId: user.id, wordId, ...data },
      update: data,
    }),
    db.reviewLog.create({ data: { userId: user.id, wordId, rating } }),
  ]);
  await recordActivity(user.id, "reviews");

  return { dueAt: next.dueAt.toISOString(), intervalDays: next.intervalDays };
}
