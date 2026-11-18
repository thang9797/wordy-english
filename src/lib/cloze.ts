/**
 * Builds a fill-in-the-blank sentence from an example sentence by hiding the target
 * word, including its common inflected forms (-s, -ed, -ing, y→ies, doubled consonants).
 * Pure functions: no I/O.
 */

export const BLANK = "_____";

const VOWELS = "aeiou";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Plausible surface forms of a single English word, base form first. */
export function inflections(word: string): string[] {
  const w = word.toLowerCase();
  const forms = new Set<string>([w, `${w}s`, `${w}es`, `${w}ed`, `${w}ing`, `${w}d`]);

  if (w.endsWith("e")) {
    forms.add(`${w.slice(0, -1)}ing`);
    forms.add(`${w}d`);
  }
  if (w.endsWith("y") && w.length > 2 && !VOWELS.includes(w[w.length - 2])) {
    const stem = w.slice(0, -1);
    forms.add(`${stem}ies`);
    forms.add(`${stem}ied`);
  }
  // stop → stopped / stopping; plan → planned
  const last = w[w.length - 1];
  const beforeLast = w[w.length - 2];
  if (
    w.length >= 3 &&
    last &&
    !VOWELS.includes(last) &&
    !"wxy".includes(last) &&
    beforeLast &&
    VOWELS.includes(beforeLast) &&
    !VOWELS.includes(w[w.length - 3] ?? "a")
  ) {
    forms.add(`${w}${last}ed`);
    forms.add(`${w}${last}ing`);
  }
  return [...forms];
}

export interface Cloze {
  /** The example sentence with the target replaced by a blank. */
  sentence: string;
  /** Surface forms that count as correct (the form used in the sentence first). */
  answers: string[];
}

/**
 * Returns null when the term cannot be found in the example, so the caller can fall
 * back to a different review mode. Multi-word terms are matched as a phrase and only
 * their first word is inflected ("comes across", "coping with").
 */
export function makeCloze(example: string, term: string): Cloze | null {
  const words = term.trim().split(/\s+/);
  const [first, ...rest] = words;
  if (!first) return null;

  const tail = rest.length ? ` ${rest.map(escapeRegExp).join("\\s+")}` : "";
  const alternatives = inflections(first)
    .sort((a, b) => b.length - a.length)
    .map((f) => `${escapeRegExp(f)}${tail}`);
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])(${alternatives.join("|")})(?![\\p{L}\\p{N}])`, "iu");

  const match = pattern.exec(example);
  if (!match) return null;

  const surface = match[1];
  const sentence = example.slice(0, match.index) + BLANK + example.slice(match.index + surface.length);
  const answers = [surface.toLowerCase()];
  if (!answers.includes(term.toLowerCase())) answers.push(term.toLowerCase());
  return { sentence, answers };
}
