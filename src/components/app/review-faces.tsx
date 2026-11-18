"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Eye, Turtle, Volume2 } from "lucide-react";
import { NoteEditor } from "@/components/app/note-editor";
import { SpeakButton } from "@/components/app/speak-button";
import { WordContext } from "@/components/app/word-context";
import { Input } from "@/components/ui/input";
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis";
import { BLANK, type Cloze } from "@/lib/cloze";
import { isCorrectAnswer } from "@/lib/grading";
import type { StudyCard } from "@/lib/queries";
import { shuffled } from "@/lib/review-modes";
import { popButton } from "@/lib/styles";

export interface AnswerResult {
  correct: boolean;
  hinted: boolean;
}

const LETTERS = ["A", "B", "C", "D"];

/** Everything about a word: meaning, example, context and the learner's own note. */
export function AnswerBack({ card }: { card: StudyCard }) {
  return (
    <div className="flex flex-col gap-3 text-left">
      <div className="flex items-center gap-2">
        <span className="font-heading text-2xl font-extrabold">{card.term}</span>
        <span className="font-mono text-xs text-muted-foreground">{card.phonetic}</span>
        <i className="text-xs text-muted-foreground">{card.partOfSpeech}</i>
        <SpeakButton text={card.term} className="ml-auto size-8" />
      </div>
      <p className="text-lg leading-snug">{card.definitionEn}</p>
      <p className="text-lg font-semibold text-sun">🇻🇳 {card.meaningVi}</p>
      <div className="rounded-2xl bg-muted p-4">
        <div className="flex items-start gap-2">
          <p className="flex-1 italic">“{card.exampleEn}”</p>
          <SpeakButton text={card.exampleEn} label="Listen to example" className="size-8" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{card.exampleVi}</p>
      </div>
      <WordContext word={card} />
      <NoteEditor wordId={card.id} initialNote={card.note} />
    </div>
  );
}

function Prompt({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="shadow-pop-lg flex flex-col gap-4 rounded-3xl border-2 border-black/60 bg-card p-6 sm:p-8">
      <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

/** First meeting with a word: flip the card to see everything. */
export function IntroFace({ card, flipped, onReveal }: { card: StudyCard; flipped: boolean; onReveal: () => void }) {
  return (
    <div
      role={flipped ? undefined : "button"}
      tabIndex={flipped ? undefined : 0}
      onClick={flipped ? undefined : onReveal}
      onKeyDown={flipped ? undefined : (e) => e.key === "Enter" && onReveal()}
      aria-label={flipped ? undefined : "Show the answer"}
      className={`perspective-1000 min-h-80 w-full rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-ring/60 ${flipped ? "" : "cursor-pointer"}`}
    >
      <div className={`relative grid min-h-80 transition-transform duration-500 transform-3d motion-reduce:transition-none ${flipped ? "rotate-y-180" : ""}`}>
        <div className="backface-hidden shadow-pop-lg col-start-1 row-start-1 flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-black/60 bg-lime p-8 text-center text-primary-foreground">
          {card.isNew && <span className="rounded-full bg-black/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">New word</span>}
          <span className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">{card.term}</span>
          <span className="font-mono text-sm opacity-75">
            {card.phonetic} · <i>{card.partOfSpeech}</i>
          </span>
          <SpeakButton text={card.term} className="mt-2 bg-card text-foreground" />
          <span className="mt-4 text-xs font-semibold opacity-70">Tap or press Space to reveal</span>
        </div>
        <div className="backface-hidden shadow-pop-lg col-start-1 row-start-1 rotate-y-180 rounded-3xl border-2 border-black/60 bg-card p-6 sm:p-7">
          {flipped && <AnswerBack card={card} />}
        </div>
      </div>
    </div>
  );
}

/** Recognition: pick the Vietnamese meaning of the word. */
export function ChooseMeaningFace({ card, onAnswer }: { card: StudyCard; onAnswer: (r: AnswerResult) => void }) {
  const options = useMemo(() => shuffled([card.meaningVi, ...card.distractors.slice(0, 3)], `${card.id}:options`), [card]);
  const [picked, setPicked] = useState<string | null>(null);

  function pick(option: string) {
    if (picked !== null) return;
    setPicked(option);
    onAnswer({ correct: option === card.meaningVi, hinted: false });
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const i = Number(e.key) - 1;
      if (picked === null && Number.isInteger(i) && i >= 0 && i < options.length) pick(options[i]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked, options]);

  return (
    <Prompt label="What does it mean?">
      <div className="flex items-center gap-3">
        <span className="font-heading text-4xl font-extrabold tracking-tight">{card.term}</span>
        <SpeakButton text={card.term} />
      </div>
      <span className="-mt-2 font-mono text-sm text-muted-foreground">
        {card.phonetic} · <i>{card.partOfSpeech}</i>
      </span>
      <div className="grid gap-3" role="radiogroup" aria-label="Meanings">
        {options.map((option, i) => {
          const isRight = option === card.meaningVi;
          const state =
            picked === null
              ? "border-border hover:border-foreground/40 hover:bg-muted"
              : isRight
                ? "border-lime bg-lime/15"
                : option === picked
                  ? "border-coral bg-coral/15"
                  : "border-border opacity-60";
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={picked === option}
              disabled={picked !== null}
              onClick={() => pick(option)}
              className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left font-medium transition-all ${state}`}
            >
              <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg border-2 border-border font-heading text-sm font-bold">{LETTERS[i]}</span>
              {option}
            </button>
          );
        })}
      </div>
    </Prompt>
  );
}

function useTypedAnswer(accepted: string[], onAnswer: (r: AnswerResult) => void) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState<null | boolean>(null);
  const [hinted, setHinted] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (submitted !== null || !value.trim()) return;
    const correct = accepted.some((a) => isCorrectAnswer(value, a, { forgiveTypos: true }));
    setSubmitted(correct);
    onAnswer({ correct, hinted });
  }
  return { value, setValue, submitted, hinted, setHinted, submit };
}

function AnswerInput({
  id,
  state,
  placeholder,
}: {
  id: string;
  state: ReturnType<typeof useTypedAnswer>;
  placeholder: string;
}) {
  const { value, setValue, submitted, submit } = state;
  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <Input
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={submitted !== null}
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        autoFocus
        placeholder={placeholder}
        aria-invalid={submitted === false}
        className={`h-12 text-lg ${submitted === true ? "border-lime" : submitted === false ? "border-coral" : ""}`}
      />
      {submitted === null && (
        <button type="submit" disabled={!value.trim()} className={`${popButton("primary")} self-start`}>
          Check
        </button>
      )}
    </form>
  );
}

function Verdict({ correct, answer }: { correct: boolean; answer: string }) {
  return (
    <p role="status" className={`rounded-xl px-3 py-2 text-sm font-semibold ${correct ? "bg-lime/15 text-lime" : "bg-coral/15 text-coral"}`}>
      {correct ? "Correct!" : `Not quite. The answer is “${answer}”.`}
    </p>
  );
}

/** Production in context: complete the example sentence. */
export function ClozeFace({ card, cloze, onAnswer }: { card: StudyCard; cloze: Cloze; onAnswer: (r: AnswerResult) => void }) {
  const typed = useTypedAnswer(cloze.answers, onAnswer);
  const parts = cloze.sentence.split(BLANK);

  return (
    <Prompt label="Fill in the blank">
      <p className="text-xl leading-relaxed">
        {parts[0]}
        <span className="mx-1 inline-block min-w-24 border-b-2 border-dashed border-foreground/60 text-center font-bold text-lime">
          {typed.submitted !== null ? cloze.answers[0] : " "}
        </span>
        {parts.slice(1).join(BLANK)}
      </p>
      {typed.hinted || typed.submitted !== null ? (
        <p className="text-sun">
          🇻🇳 {card.meaningVi} <span className="text-muted-foreground">· {card.exampleVi}</span>
        </p>
      ) : (
        <button type="button" onClick={() => typed.setHinted(true)} className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <Eye className="size-4" /> Show hint
        </button>
      )}
      <AnswerInput id={`cloze-${card.id}`} state={typed} placeholder="Type the missing word…" />
      {typed.submitted !== null && <Verdict correct={typed.submitted} answer={cloze.answers[0]} />}
    </Prompt>
  );
}

/** Recall by ear: hear the word and spell it. */
export function ListenTypeFace({ card, onAnswer }: { card: StudyCard; onAnswer: (r: AnswerResult) => void }) {
  const typed = useTypedAnswer([card.term], onAnswer);
  const { supported, speak } = useSpeechSynthesis();

  useEffect(() => {
    // Browsers may block autoplay; the Play button is always available.
    if (supported) speak(card.term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported, card.id]);

  return (
    <Prompt label="Listen and type the word">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => speak(card.term)} className={popButton("sky", "lg")}>
          <Volume2 className="size-5" /> Play
        </button>
        <button type="button" onClick={() => speak(card.term, { rate: 0.6 })} className={popButton("card")}>
          <Turtle className="size-4" /> Slow
        </button>
        <button type="button" onClick={() => speak(card.exampleEn)} className="text-sm font-semibold text-muted-foreground hover:text-foreground">
          Hear it in a sentence
        </button>
      </div>
      {typed.hinted || typed.submitted !== null ? (
        <p className="text-sun">
          🇻🇳 {card.meaningVi} <span className="text-muted-foreground">· starts with “{card.term[0]}”, {card.term.length} letters</span>
        </p>
      ) : (
        <button type="button" onClick={() => typed.setHinted(true)} className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <Eye className="size-4" /> Show hint
        </button>
      )}
      <AnswerInput id={`listen-${card.id}`} state={typed} placeholder="Type what you hear…" />
      {typed.submitted !== null && <Verdict correct={typed.submitted} answer={card.term} />}
    </Prompt>
  );
}
