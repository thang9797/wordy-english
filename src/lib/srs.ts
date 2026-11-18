/**
 * Spaced repetition scheduler based on SuperMemo-2 (SM-2), with Anki-style
 * tweaks for the Hard and Easy buttons. Pure functions: no I/O.
 */

export const RATINGS = { again: 1, hard: 2, good: 3, easy: 4 } as const;
export type Rating = (typeof RATINGS)[keyof typeof RATINGS];

export interface SrsState {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  lapses: number;
}

export interface ScheduleResult extends SrsState {
  dueAt: Date;
}

export const INITIAL_STATE: SrsState = {
  easeFactor: 2.5,
  intervalDays: 0,
  repetitions: 0,
  lapses: 0,
};

export const MIN_EASE = 1.3;
/** A failed card comes back after this many minutes (and is re-queued in-session). */
export const RELEARN_MINUTES = 10;
const HARD_MULTIPLIER = 1.2;
const EASY_BONUS = 1.3;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Maps a 1–4 button rating to SM-2 quality (0–5). */
function toQuality(rating: Rating): number {
  switch (rating) {
    case RATINGS.again:
      return 1;
    case RATINGS.hard:
      return 3;
    case RATINGS.good:
      return 4;
    case RATINGS.easy:
      return 5;
  }
}

export function nextEaseFactor(easeFactor: number, rating: Rating): number {
  const q = toQuality(rating);
  const ef = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  return Math.max(MIN_EASE, Math.round(ef * 100) / 100);
}

export function schedule(state: SrsState, rating: Rating, now: Date = new Date()): ScheduleResult {
  const easeFactor = nextEaseFactor(state.easeFactor, rating);

  if (rating === RATINGS.again) {
    return {
      easeFactor,
      intervalDays: 0,
      repetitions: 0,
      lapses: state.lapses + 1,
      dueAt: new Date(now.getTime() + RELEARN_MINUTES * 60 * 1000),
    };
  }

  const prev = state.intervalDays;
  let interval: number;

  if (state.repetitions === 0) {
    interval = rating === RATINGS.easy ? 4 : 1;
  } else if (state.repetitions === 1) {
    interval = rating === RATINGS.hard ? 3 : rating === RATINGS.easy ? 8 : 6;
  } else if (rating === RATINGS.hard) {
    interval = Math.round(prev * HARD_MULTIPLIER);
  } else {
    // Use the ease factor from before this review, as in classic SM-2.
    interval = Math.round(prev * state.easeFactor);
    if (rating === RATINGS.easy) interval = Math.round(interval * EASY_BONUS);
  }

  // A successful review on a mature card always moves the due date forward.
  if (state.repetitions >= 2) interval = Math.max(interval, prev + 1);
  interval = Math.max(1, interval);

  return {
    easeFactor,
    intervalDays: interval,
    repetitions: state.repetitions + 1,
    lapses: state.lapses,
    dueAt: new Date(now.getTime() + interval * DAY_MS),
  };
}

/** Human-friendly preview of the next interval, e.g. "10m", "1d", "2mo". */
export function formatInterval(result: ScheduleResult, now: Date = new Date()): string {
  const minutes = Math.round((result.dueAt.getTime() - now.getTime()) / 60000);
  if (minutes < 60) return `${minutes}m`;
  const days = result.intervalDays;
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${Math.round((days / 365) * 10) / 10}y`;
}
