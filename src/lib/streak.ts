/**
 * Calendar-day helpers and streak calculation. Days are "YYYY-MM-DD" keys in the
 * app's time zone, so a streak day rolls over at local midnight, not UTC.
 */

export const APP_TIME_ZONE = process.env.APP_TIME_ZONE ?? "Asia/Ho_Chi_Minh";

/** "YYYY-MM-DD" for the given instant in the app's time zone. */
export function toDayKey(date: Date, timeZone: string = APP_TIME_ZONE): string {
  // en-CA formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** A day key as a UTC-midnight Date, suitable for a Postgres DATE column. */
export function dayKeyToDate(key: string): Date {
  return new Date(`${key}T00:00:00.000Z`);
}

/** A DATE column value (UTC midnight) back to its day key. */
export function dateToDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(key: string, days: number): string {
  const d = dayKeyToDate(key);
  d.setUTCDate(d.getUTCDate() + days);
  return dateToDayKey(d);
}

/**
 * Counts consecutive active days ending today, or ending yesterday when the
 * learner hasn't studied yet today (the streak isn't broken until tonight).
 */
export function computeStreak(activeDays: Iterable<string>, todayKey: string) {
  const days = new Set(activeDays);
  const activeToday = days.has(todayKey);
  let cursor = activeToday ? todayKey : addDays(todayKey, -1);
  let current = 0;
  while (days.has(cursor)) {
    current++;
    cursor = addDays(cursor, -1);
  }
  return { current, activeToday };
}
