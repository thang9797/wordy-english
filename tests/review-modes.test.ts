import { describe, expect, it } from "vitest";
import { DISTRACTOR_COUNT, pickMode, resolveMode, shuffled } from "@/lib/review-modes";

describe("pickMode", () => {
  it("introduces new cards, then moves through recognition, cloze and listening", () => {
    expect(pickMode({ repetitions: 0, isNew: true })).toBe("intro");
    expect(pickMode({ repetitions: 0, isNew: false })).toBe("choose-meaning"); // just forgotten
    expect(pickMode({ repetitions: 1, isNew: false })).toBe("choose-meaning");
    expect(pickMode({ repetitions: 2, isNew: false })).toBe("choose-meaning");
    expect(pickMode({ repetitions: 3, isNew: false })).toBe("cloze");
    expect(pickMode({ repetitions: 4, isNew: false })).toBe("cloze");
    expect(pickMode({ repetitions: 5, isNew: false })).toBe("listen-type");
    expect(pickMode({ repetitions: 12, isNew: false })).toBe("listen-type");
  });
});

describe("resolveMode", () => {
  const card = { term: "ambitious", exampleEn: "She is an ambitious lawyer.", distractors: ["a", "b", "c"] };

  it("keeps the picked mode when the card supports it", () => {
    expect(resolveMode("cloze", card)).toBe("cloze");
    expect(resolveMode("choose-meaning", card)).toBe("choose-meaning");
    expect(resolveMode("listen-type", card)).toBe("listen-type");
  });

  it("falls back from cloze to multiple choice when the term is missing from the example", () => {
    expect(resolveMode("cloze", { ...card, exampleEn: "Nothing relevant here." })).toBe("choose-meaning");
  });

  it("falls back to the plain card when there are too few wrong options", () => {
    const few = { ...card, distractors: ["a"] };
    expect(few.distractors.length).toBeLessThan(DISTRACTOR_COUNT);
    expect(resolveMode("choose-meaning", few)).toBe("intro");
    expect(resolveMode("cloze", { ...few, exampleEn: "No term." })).toBe("intro");
  });
});

describe("shuffled", () => {
  it("is deterministic per seed, keeps all items and differs between seeds", () => {
    const items = ["a", "b", "c", "d", "e", "f"];
    expect(shuffled(items, "card-1")).toEqual(shuffled(items, "card-1"));
    expect([...shuffled(items, "card-1")].sort()).toEqual(items);
    const orders = new Set(["x", "y", "z", "w", "v"].map((s) => shuffled(items, s).join("")));
    expect(orders.size).toBeGreaterThan(1);
  });

  it("does not mutate its input", () => {
    const items = ["a", "b", "c"];
    shuffled(items, "seed");
    expect(items).toEqual(["a", "b", "c"]);
  });
});
