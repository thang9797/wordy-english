import { describe, expect, it } from "vitest";
import {
  INITIAL_STATE,
  MIN_EASE,
  RATINGS,
  RELEARN_MINUTES,
  formatInterval,
  nextEaseFactor,
  schedule,
  type Rating,
  type SrsState,
} from "@/lib/srs";

const NOW = new Date("2026-01-01T08:00:00.000Z");
const DAY = 24 * 60 * 60 * 1000;

/** Applies several ratings in a row and returns the final state. */
function review(state: SrsState, ...ratings: Rating[]) {
  return ratings.reduce<SrsState>((s, r) => schedule(s, r, NOW), state);
}

describe("nextEaseFactor", () => {
  it("keeps EF for Good, raises it for Easy, lowers it for Hard/Again", () => {
    expect(nextEaseFactor(2.5, RATINGS.good)).toBe(2.5);
    expect(nextEaseFactor(2.5, RATINGS.easy)).toBe(2.6);
    expect(nextEaseFactor(2.5, RATINGS.hard)).toBe(2.36);
    expect(nextEaseFactor(2.5, RATINGS.again)).toBe(1.96);
  });

  it("never goes below the minimum ease", () => {
    let ef = 2.5;
    for (let i = 0; i < 20; i++) ef = nextEaseFactor(ef, RATINGS.again);
    expect(ef).toBe(MIN_EASE);
  });
});

describe("schedule", () => {
  it("follows the classic 1 → 6 → interval×EF progression for Good", () => {
    const first = schedule(INITIAL_STATE, RATINGS.good, NOW);
    expect(first).toMatchObject({ intervalDays: 1, repetitions: 1, easeFactor: 2.5 });
    expect(first.dueAt.getTime()).toBe(NOW.getTime() + DAY);

    const second = schedule(first, RATINGS.good, NOW);
    expect(second).toMatchObject({ intervalDays: 6, repetitions: 2 });

    const third = schedule(second, RATINGS.good, NOW);
    expect(third).toMatchObject({ intervalDays: 15, repetitions: 3 });
  });

  it("gives Easy a longer first interval and a bonus later", () => {
    expect(schedule(INITIAL_STATE, RATINGS.easy, NOW).intervalDays).toBe(4);
    const afterTwo = review(INITIAL_STATE, RATINGS.good, RATINGS.good);
    const easy = schedule(afterTwo, RATINGS.easy, NOW);
    const good = schedule(afterTwo, RATINGS.good, NOW);
    expect(easy.intervalDays).toBeGreaterThan(good.intervalDays);
  });

  it("grows Hard reviews slowly but always forward", () => {
    const afterTwo = review(INITIAL_STATE, RATINGS.good, RATINGS.good); // 6 days
    const hard = schedule(afterTwo, RATINGS.hard, NOW);
    expect(hard.intervalDays).toBe(7); // round(6 × 1.2)
    expect(hard.intervalDays).toBeGreaterThan(afterTwo.intervalDays);
  });

  it("resets a lapsed card and brings it back in a few minutes", () => {
    const mature = review(INITIAL_STATE, RATINGS.good, RATINGS.good, RATINGS.good);
    const failed = schedule(mature, RATINGS.again, NOW);
    expect(failed).toMatchObject({ intervalDays: 0, repetitions: 0, lapses: 1 });
    expect(failed.dueAt.getTime()).toBe(NOW.getTime() + RELEARN_MINUTES * 60 * 1000);
    expect(failed.easeFactor).toBeLessThan(mature.easeFactor);
  });

  it("does not mutate the input state", () => {
    const state = { ...INITIAL_STATE };
    schedule(state, RATINGS.good, NOW);
    expect(state).toEqual(INITIAL_STATE);
  });
});

describe("formatInterval", () => {
  it("formats minutes, days, months and years", () => {
    expect(formatInterval(schedule(INITIAL_STATE, RATINGS.again, NOW), NOW)).toBe("10m");
    expect(formatInterval(schedule(INITIAL_STATE, RATINGS.good, NOW), NOW)).toBe("1d");
    const long = { ...INITIAL_STATE, repetitions: 5, intervalDays: 100, easeFactor: 2.5 };
    expect(formatInterval(schedule(long, RATINGS.good, NOW), NOW)).toBe("8mo");
    const veryLong = { ...INITIAL_STATE, repetitions: 8, intervalDays: 400, easeFactor: 2.5 };
    expect(formatInterval(schedule(veryLong, RATINGS.good, NOW), NOW)).toBe("2.7y");
  });
});
