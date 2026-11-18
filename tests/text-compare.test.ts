import { describe, expect, it } from "vitest";
import { compareText, normalizeWords } from "@/lib/text-compare";

describe("normalizeWords", () => {
  it("lowercases, strips punctuation and unifies apostrophes", () => {
    expect(normalizeWords("Hello, World! It’s “fine”.")).toEqual(["hello", "world", "it's", "fine"]);
  });

  it("splits hyphenated words and maps number words to digits", () => {
    expect(normalizeWords("A well-known firm hired twelve people")).toEqual([
      "a", "well", "known", "firm", "hired", "12", "people",
    ]);
    expect(normalizeWords("Sales rose 5%")).toEqual(["sales", "rose", "5", "percent"]);
  });
});

describe("compareText", () => {
  it("scores a perfect answer 100 regardless of case and punctuation", () => {
    const r = compareText("The meeting starts at nine.", "the meeting starts at 9");
    expect(r.score).toBe(100);
    expect(r.tokens.every((t) => t.status === "ok")).toBe(true);
  });

  it("marks a wrong word as missing (target) followed by extra (attempt)", () => {
    const r = compareText("the cat sat", "the bat sat");
    expect(r.tokens).toEqual([
      { word: "the", status: "ok" },
      { word: "cat", status: "missing" },
      { word: "bat", status: "extra" },
      { word: "sat", status: "ok" },
    ]);
    expect(r.matched).toBe(2);
    expect(r.total).toBe(3);
    expect(r.score).toBe(50);
  });

  it("marks skipped words as missing", () => {
    const r = compareText("please submit the report today", "please submit report");
    expect(r.tokens.filter((t) => t.status === "missing").map((t) => t.word)).toEqual(["the", "today"]);
    expect(r.score).toBe(60);
  });

  it("returns 0 for an empty attempt and never goes negative", () => {
    expect(compareText("hello there", "").score).toBe(0);
    expect(compareText("hi", "completely different words here").score).toBe(0);
  });
});
