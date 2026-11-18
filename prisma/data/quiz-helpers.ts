import type { SeedPassage, SeedQuestion } from "./types";

/** Multiple-choice question. Throws at seed time if the answer isn't one of the options. */
export function mc(
  prompt: string,
  options: string[],
  correctAnswer: string,
  explanationEn: string,
  explanationVi: string,
  audioText?: string,
): SeedQuestion {
  if (!options.includes(correctAnswer)) throw new Error(`Answer "${correctAnswer}" not in options for: ${prompt}`);
  if (new Set(options).size !== options.length) throw new Error(`Duplicate options for: ${prompt}`);
  return { type: "MULTIPLE_CHOICE", prompt, options, correctAnswer, explanationEn, explanationVi, audioText };
}

/** A reading passage (Part 6/7) with its questions. Blanks in Part 6 are written as [1], [2]… */
export function reading(kind: string, title: string, content: string, questions: SeedQuestion[]): SeedPassage {
  return { kind, title, content, questions };
}

/** A listening script (Part 3/4) with its questions. Use "M:" / "W:" line prefixes for two voices. */
export function listening(kind: string, audioText: string, questions: SeedQuestion[]): SeedPassage {
  return { kind, audioText, questions };
}
