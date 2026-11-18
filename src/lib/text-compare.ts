/**
 * Word-level comparison between a target sentence and what the learner typed
 * (dictation) or said (speech recognition). Pure functions: no I/O.
 */

export type DiffStatus = "ok" | "missing" | "extra";
export interface DiffToken {
  word: string;
  status: DiffStatus;
}
export interface CompareResult {
  tokens: DiffToken[];
  matched: number;
  total: number;
  /** 0–100: share of target words the learner got, minus a small penalty for extra words. */
  score: number;
}

const NUMBER_WORDS: Record<string, string> = {
  zero: "0", one: "1", two: "2", three: "3", four: "4", five: "5",
  six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
  eleven: "11", twelve: "12", thirteen: "13", fourteen: "14", fifteen: "15",
  sixteen: "16", seventeen: "17", eighteen: "18", nineteen: "19", twenty: "20",
  thirty: "30", forty: "40", fifty: "50", hundred: "100",
};

/** Lowercases, unifies quotes, drops punctuation and maps number words to digits. */
export function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[‘’ʼ]/g, "'")
    .replace(/%/g, " percent ")
    .replace(/[-–—/]/g, " ")
    .replace(/[^\p{L}\p{N}'\s]/gu, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^'+|'+$/g, ""))
    .filter(Boolean)
    .map((w) => NUMBER_WORDS[w] ?? w);
}

export function compareText(target: string, attempt: string): CompareResult {
  const a = normalizeWords(target);
  const b = normalizeWords(attempt);

  // Longest common subsequence table over words.
  const lcs: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const tokens: DiffToken[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      tokens.push({ word: a[i], status: "ok" });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      tokens.push({ word: a[i++], status: "missing" });
    } else {
      tokens.push({ word: b[j++], status: "extra" });
    }
  }
  while (i < a.length) tokens.push({ word: a[i++], status: "missing" });
  while (j < b.length) tokens.push({ word: b[j++], status: "extra" });

  const matched = lcs[0][0];
  const total = a.length;
  const extra = b.length - matched;
  const raw = total === 0 ? 0 : (matched - extra * 0.5) / total;
  const score = Math.round(Math.min(1, Math.max(0, raw)) * 100);

  return { tokens, matched, total, score };
}
