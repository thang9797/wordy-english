import "server-only";
import { db } from "@/lib/db";
import { computeStreak, dateToDayKey, dayKeyToDate, toDayKey, addDays } from "@/lib/streak";

export type ActivityKind = "reviews" | "quizzes" | "practices";

/** Increments today's counter for the given kind of activity. */
export async function recordActivity(userId: string, kind: ActivityKind, amount = 1) {
  const date = dayKeyToDate(toDayKey(new Date()));
  await db.dailyActivity.upsert({
    where: { userId_date: { userId, date } },
    create: { userId, date, [kind]: amount },
    update: { [kind]: { increment: amount } },
  });
}

/** Current streak plus the last 7 days of activity (oldest first). */
export async function getStreakSummary(userId: string) {
  const todayKey = toDayKey(new Date());
  const rows = await db.dailyActivity.findMany({
    where: { userId, date: { gte: dayKeyToDate(addDays(todayKey, -400)) } },
    select: { date: true, reviews: true, quizzes: true, practices: true },
    orderBy: { date: "desc" },
  });
  const byDay = new Map(rows.map((r) => [dateToDayKey(r.date), r.reviews + r.quizzes + r.practices]));
  const streak = computeStreak(byDay.keys(), todayKey);
  const week = Array.from({ length: 7 }, (_, i) => {
    const key = addDays(todayKey, i - 6);
    return { day: key, count: byDay.get(key) ?? 0 };
  });
  return { ...streak, week };
}
