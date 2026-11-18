/** Pure answer-checking helpers shared by the quiz action and tests. */

export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[.!?,;:]+$/g, "")
    .replace(/\s+/g, " ");
}

/** Alternatives in `correctAnswer` are separated by "|". */
export function acceptedAnswers(correctAnswer: string): string[] {
  return correctAnswer.split("|").map((a) => a.trim()).filter(Boolean);
}

/** Edit distance between two short strings (insert / delete / substitute = 1). */
export function levenshtein(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

/**
 * Exact match after normalization. With `forgiveTypos`, a one-letter slip is
 * accepted for answers of 5+ letters (e.g. "conserv" for "conserve"), but short
 * words like "in" / "on" must be exact, since one letter changes the meaning.
 */
export function isCorrectAnswer(answer: string, correctAnswer: string, opts: { forgiveTypos?: boolean } = {}): boolean {
  const given = normalizeAnswer(answer);
  if (!given) return false;
  return acceptedAnswers(correctAnswer).some((a) => {
    const expected = normalizeAnswer(a);
    if (expected === given) return true;
    return Boolean(opts.forgiveTypos) && expected.length >= 5 && levenshtein(expected, given) <= 1;
  });
}

/** The canonical answer to display (first alternative). */
export function displayAnswer(correctAnswer: string): string {
  return acceptedAnswers(correctAnswer)[0] ?? correctAnswer;
}
