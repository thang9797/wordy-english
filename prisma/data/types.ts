export type CategoryName = "TOEIC" | "IELTS" | "GENERAL";

export interface SeedWord {
  term: string;
  phonetic: string;
  partOfSpeech: string;
  definitionEn: string;
  meaningVi: string;
  exampleEn: string;
  exampleVi: string;
  synonyms?: string[];
  antonyms?: string[];
  collocations?: string[];
  /** Related forms, e.g. "decide (v)", "decision (n)". */
  wordFamily?: string[];
  moreExamples?: { en: string; vi: string }[];
  mnemonicVi?: string;
}

export interface SeedDeck {
  slug: string;
  title: string;
  description: string;
  category: CategoryName;
  level: string;
  topic: string;
  /** TOEIC score band lower bound: 550 | 650 | 750 | 850. */
  toeicBand?: ToeicBand;
  words: SeedWord[];
}

export type ToeicBand = 550 | 650 | 750 | 850;

export interface SeedQuestion {
  type: "MULTIPLE_CHOICE" | "FILL_BLANK";
  prompt: string;
  /** Spoken with text-to-speech. Lines starting with "M:" / "W:" use different voices. */
  audioText?: string;
  options?: string[];
  /** For FILL_BLANK, alternatives can be separated with "|". The first is shown as the answer. */
  correctAnswer: string;
  explanationEn: string;
  explanationVi: string;
}

/** A reading text or listening script shared by several questions. */
export interface SeedPassage {
  kind: string;
  title?: string;
  /** Reading text. Part 6 blanks are written as [1], [2]… */
  content?: string;
  /** Listening script. Lines starting with "M:" / "W:" use different voices. */
  audioText?: string;
  questions: SeedQuestion[];
}

/** A quiz item is either a standalone question or a passage with its questions. */
export type SeedItem = SeedQuestion | SeedPassage;

export function isPassage(item: SeedItem): item is SeedPassage {
  return "questions" in item;
}

export interface SeedQuiz {
  slug: string;
  title: string;
  description: string;
  category: CategoryName;
  skill: "VOCAB" | "GRAMMAR" | "LISTENING" | "READING";
  level: string;
  toeicBand?: ToeicBand;
  /** TOEIC part(s) covered, e.g. "5", "6–7", "2–4". */
  toeicPart?: string;
  questions: SeedItem[];
}

export interface SeedSentence {
  text: string;
  translationVi: string;
  category: CategoryName;
  level: string;
}

/** Compact word constructor to keep the content files readable. */
export function w(
  term: string,
  phonetic: string,
  partOfSpeech: string,
  definitionEn: string,
  meaningVi: string,
  exampleEn: string,
  exampleVi: string,
): SeedWord {
  return { term, phonetic, partOfSpeech, definitionEn, meaningVi, exampleEn, exampleVi };
}

/** Extra context for a word: synonyms, collocations, word family, an extra example, a memory trick. */
export interface WordExtras {
  syn?: string[];
  ant?: string[];
  col?: string[];
  fam?: string[];
  ex?: [en: string, vi: string];
  mnemonic?: string;
}

/** An extra example and optional memory trick, merged into an existing word by its term. */
export interface ExtraInfo {
  ex: [en: string, vi: string];
  mnemonic?: string;
}

/** Merges extras into decks by term. Throws if a term is not found, so typos cannot slip by. */
export function applyExtras(decks: SeedDeck[], extras: Record<string, ExtraInfo>): SeedDeck[] {
  const unused = new Set(Object.keys(extras));
  for (const deck of decks) {
    for (const word of deck.words) {
      const extra = extras[word.term];
      if (!extra) continue;
      unused.delete(word.term);
      word.moreExamples = [...(word.moreExamples ?? []), { en: extra.ex[0], vi: extra.ex[1] }];
      if (extra.mnemonic) word.mnemonicVi = extra.mnemonic;
    }
  }
  if (unused.size) throw new Error(`Extras for unknown terms: ${[...unused].join(", ")}`);
  return decks;
}

/** Like `w()`, plus context and memory aids. */
export function wx(
  term: string,
  phonetic: string,
  partOfSpeech: string,
  definitionEn: string,
  meaningVi: string,
  exampleEn: string,
  exampleVi: string,
  extras: WordExtras,
): SeedWord {
  return {
    ...w(term, phonetic, partOfSpeech, definitionEn, meaningVi, exampleEn, exampleVi),
    synonyms: extras.syn,
    antonyms: extras.ant,
    collocations: extras.col,
    wordFamily: extras.fam,
    moreExamples: extras.ex ? [{ en: extras.ex[0], vi: extras.ex[1] }] : undefined,
    mnemonicVi: extras.mnemonic,
  };
}
