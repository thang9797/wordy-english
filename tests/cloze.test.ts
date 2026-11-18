import { describe, expect, it } from "vitest";
import { BLANK, inflections, makeCloze } from "@/lib/cloze";

describe("inflections", () => {
  it("covers regular, -e, -y and doubled-consonant words", () => {
    expect(inflections("walk")).toEqual(expect.arrayContaining(["walks", "walked", "walking"]));
    expect(inflections("promote")).toEqual(expect.arrayContaining(["promoted", "promoting", "promotes"]));
    expect(inflections("apply")).toEqual(expect.arrayContaining(["applies", "applied"]));
    expect(inflections("stop")).toEqual(expect.arrayContaining(["stopped", "stopping"]));
  });

  it("does not double the final consonant of w/x/y or after a consonant", () => {
    expect(inflections("play")).not.toContain("playyed");
    expect(inflections("fix")).not.toContain("fixxed");
    expect(inflections("help")).not.toContain("helpped");
  });
});

describe("makeCloze", () => {
  it("blanks the exact word", () => {
    const c = makeCloze("She is an ambitious young lawyer.", "ambitious");
    expect(c?.sentence).toBe(`She is an ${BLANK} young lawyer.`);
    expect(c?.answers).toContain("ambitious");
  });

  it("blanks inflected forms and keeps the form used in the sentence first", () => {
    expect(makeCloze("He was promoted after two years.", "promote")).toEqual({
      sentence: `He was ${BLANK} after two years.`,
      answers: ["promoted", "promote"],
    });
    expect(makeCloze("Prices keep surging.", "surge")?.answers[0]).toBe("surging");
    expect(makeCloze("Shops closed and stopped trading.", "stop")?.sentence).toContain(BLANK);
    expect(makeCloze("She applies for jobs daily.", "apply")?.answers[0]).toBe("applies");
  });

  it("matches multi-word terms as a phrase, inflecting the first word", () => {
    expect(makeCloze("He comes across as confident.", "come across")?.sentence).toBe(`He ${BLANK} as confident.`);
    expect(makeCloze("How do you cope with stress?", "cope with")?.sentence).toBe(`How do you ${BLANK} stress?`);
    expect(makeCloze("Many are coping with change.", "cope with")?.answers[0]).toBe("coping with");
  });

  it("is case-insensitive and keeps the original capitalization out of the answers", () => {
    const c = makeCloze("Despite the rain, we went out.", "despite");
    expect(c?.sentence).toBe(`${BLANK} the rain, we went out.`);
    expect(c?.answers[0]).toBe("despite");
  });

  it("does not blank part of a longer word", () => {
    expect(makeCloze("The category was wide.", "cat")).toBeNull();
    expect(makeCloze("Prices rose.", "price")?.sentence).toBe(`${BLANK}s rose.`.replace("s", "")); // "Prices" is price + s
  });

  it("returns null when the term is not in the sentence", () => {
    expect(makeCloze("A completely different sentence.", "ambitious")).toBeNull();
  });
});
