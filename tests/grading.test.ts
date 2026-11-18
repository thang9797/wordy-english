import { describe, expect, it } from "vitest";
import { displayAnswer, isCorrectAnswer } from "@/lib/grading";

describe("isCorrectAnswer", () => {
  it("ignores case, surrounding spaces and trailing punctuation", () => {
    expect(isCorrectAnswer("  Taken. ", "taken")).toBe(true);
    expect(isCorrectAnswer("HAD ALREADY STARTED", "had already started")).toBe(true);
  });

  it("accepts any pipe-separated alternative", () => {
    expect(isCorrectAnswer("save", "conserve|save|preserve")).toBe(true);
    expect(isCorrectAnswer("protect", "conserve|save|preserve")).toBe(false);
    expect(displayAnswer("conserve|save|preserve")).toBe("conserve");
  });

  it("forgives a one-letter typo on longer words only when asked", () => {
    expect(isCorrectAnswer("conserv", "conserve", { forgiveTypos: true })).toBe(true);
    expect(isCorrectAnswer("serch", "search", { forgiveTypos: true })).toBe(true);
    expect(isCorrectAnswer("serch", "search")).toBe(false);
    expect(isCorrectAnswer("srch", "search", { forgiveTypos: true })).toBe(false);
    // Short words must be exact: "on" is a different preposition from "in".
    expect(isCorrectAnswer("on", "in", { forgiveTypos: true })).toBe(false);
  });

  it("rejects empty answers", () => {
    expect(isCorrectAnswer("", "in")).toBe(false);
    expect(isCorrectAnswer("   ", "in")).toBe(false);
  });
});
