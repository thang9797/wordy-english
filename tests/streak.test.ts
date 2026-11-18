import { describe, expect, it } from "vitest";
import { addDays, computeStreak, dateToDayKey, dayKeyToDate, toDayKey } from "@/lib/streak";

describe("day keys", () => {
  it("uses the given time zone, not UTC", () => {
    // 20:00 UTC on Jan 1 is already Jan 2 in Vietnam (UTC+7).
    const instant = new Date("2026-01-01T20:00:00.000Z");
    expect(toDayKey(instant, "UTC")).toBe("2026-01-01");
    expect(toDayKey(instant, "Asia/Ho_Chi_Minh")).toBe("2026-01-02");
  });

  it("round-trips through a DATE value and adds days across month/year ends", () => {
    expect(dateToDayKey(dayKeyToDate("2026-03-15"))).toBe("2026-03-15");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });
});

describe("computeStreak", () => {
  const today = "2026-05-10";

  it("is zero with no activity", () => {
    expect(computeStreak([], today)).toEqual({ current: 0, activeToday: false });
  });

  it("counts consecutive days ending today", () => {
    expect(computeStreak(["2026-05-08", "2026-05-09", "2026-05-10"], today)).toEqual({
      current: 3,
      activeToday: true,
    });
  });

  it("keeps yesterday's streak alive before the learner studies today", () => {
    expect(computeStreak(["2026-05-08", "2026-05-09"], today)).toEqual({ current: 2, activeToday: false });
  });

  it("stops at a gap", () => {
    expect(computeStreak(["2026-05-05", "2026-05-06", "2026-05-09", "2026-05-10"], today).current).toBe(2);
    expect(computeStreak(["2026-05-07", "2026-05-08"], today).current).toBe(0);
  });
});
