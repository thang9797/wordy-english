/**
 * Chooses how a flashcard is tested, so a word is met in different ways as it is learned:
 * see it → recognise the meaning → complete a sentence → hear and spell it.
 * Pure functions: no I/O.
 */

import { makeCloze } from "@/lib/cloze";

export type ReviewMode = "intro" | "choose-meaning" | "cloze" | "listen-type";

export interface ModeState {
  repetitions: number;
  isNew: boolean;
}

/** Mode for a card based only on how well it is already known. */
export function pickMode({ repetitions, isNew }: ModeState): ReviewMode {
  if (isNew) return "intro";
  if (repetitions <= 2) return "choose-meaning"; // also covers a card that was just forgotten
  if (repetitions <= 4) return "cloze";
  return "listen-type";
}

export interface ModeCard {
  term: string;
  exampleEn: string;
  distractors: string[];
}

/** Number of wrong options shown next to the right meaning. */
export const DISTRACTOR_COUNT = 3;

/**
 * Falls back to a simpler mode when the card cannot support the picked one:
 * no usable example for a blank, or too few wrong options for multiple choice.
 */
export function resolveMode(mode: ReviewMode, card: ModeCard): ReviewMode {
  if (mode === "cloze" && !makeCloze(card.exampleEn, card.term)) return resolveMode("choose-meaning", card);
  if (mode === "choose-meaning" && card.distractors.length < DISTRACTOR_COUNT) return "intro";
  return mode;
}

/** Deterministic shuffle (seeded by the card id) so the order is stable across re-renders. */
export function shuffled<T>(items: readonly T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
