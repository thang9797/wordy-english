"use client";

import { useMemo, useState, useTransition } from "react";
import { Eye, EyeOff, Mic, Shuffle, Square, Turtle, Volume2 } from "lucide-react";
import { savePractice } from "@/actions/practice";
import { DiffView } from "@/components/app/diff-view";
import { Textarea } from "@/components/ui/textarea";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { useSpeechSynthesis, type Accent } from "@/hooks/use-speech-synthesis";
import type { CompareResult } from "@/lib/text-compare";
import { categoryStyles, popButton, popCard, type CategoryKey } from "@/lib/styles";

type Sentence = { id: string; text: string; translationVi: string; category: CategoryKey; level: string };
type Mode = "DICTATION" | "SPEAKING";

const FILTERS: { key: CategoryKey | "ALL"; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "TOEIC", label: "TOEIC" },
  { key: "IELTS", label: "IELTS" },
  { key: "GENERAL", label: "Everyday" },
];

export function PracticeRunner({ mode, sentences }: { mode: Mode; sentences: Sentence[] }) {
  const [filter, setFilter] = useState<CategoryKey | "ALL">("ALL");
  const [accent, setAccent] = useState<Accent>("en-US");
  const pool = useMemo(() => (filter === "ALL" ? sentences : sentences.filter((s) => s.category === filter)), [filter, sentences]);
  const [currentId, setCurrentId] = useState(sentences[0]?.id);
  const sentence = pool.find((s) => s.id === currentId) ?? pool[0];

  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<CompareResult | null>(null);
  const [showText, setShowText] = useState(mode === "SPEAKING");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [session, setSession] = useState({ count: 0, total: 0 });

  const tts = useSpeechSynthesis();
  const stt = useSpeechRecognition(accent);

  function nextSentence() {
    if (pool.length === 0) return;
    let next = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1) while (next.id === sentence?.id) next = pool[Math.floor(Math.random() * pool.length)];
    setCurrentId(next.id);
    setTyped("");
    setResult(null);
    setError(null);
    setShowText(mode === "SPEAKING");
    tts.cancel();
  }

  function check(attempt: string) {
    if (!sentence || !attempt.trim()) return;
    setError(null);
    startTransition(async () => {
      try {
        const r = await savePractice({ sentenceId: sentence.id, mode, attempt });
        setResult(r);
        setShowText(true);
        setSession((s) => ({ count: s.count + 1, total: s.total + r.score }));
      } catch {
        setError("Couldn't check your answer. Please try again.");
      }
    });
  }

  if (!tts.supported) {
    return <Notice>Your browser doesn&apos;t support text-to-speech. Please use a recent version of Chrome, Edge or Safari.</Notice>;
  }
  if (mode === "SPEAKING" && !stt.supported) {
    return (
      <Notice>
        Speech recognition isn&apos;t available in this browser. Please open this page in <b>Google Chrome</b> or <b>Microsoft Edge</b> on a computer or Android phone.
      </Notice>
    );
  }
  if (!sentence) return <Notice>No sentences found for this filter.</Notice>;

  const style = categoryStyles[sentence.category];
  const avg = session.count ? Math.round(session.total / session.count) : null;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => {
              setFilter(f.key);
              setResult(null);
              setTyped("");
            }}
            aria-pressed={filter === f.key}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              filter === f.key ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 rounded-full bg-muted p-1 text-xs font-semibold">
          {(["en-US", "en-GB"] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAccent(a)}
              aria-pressed={accent === a}
              className={`rounded-full px-2.5 py-1 ${accent === a ? "bg-card text-foreground" : "text-muted-foreground"}`}
            >
              {a === "en-US" ? "🇺🇸 US" : "🇬🇧 UK"}
            </button>
          ))}
        </div>
      </div>

      <div className={`${popCard} flex flex-col gap-5 p-6 sm:p-8`}>
        <div className="flex items-center gap-2 text-xs">
          <span className={`${style.bg} rounded-full border-2 border-black/60 px-2 py-0.5 font-bold text-primary-foreground`}>{style.label}</span>
          <span className="text-muted-foreground">{sentence.level}</span>
          {avg !== null && (
            <span className="ml-auto text-muted-foreground">
              Session: {session.count} done · avg {avg}%
            </span>
          )}
        </div>

        {/* Listen */}
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => tts.speak(sentence.text, { accent })} className={popButton("sky", "lg")}>
            <Volume2 className="size-5" /> {tts.speaking ? "Playing…" : "Play"}
          </button>
          <button type="button" onClick={() => tts.speak(sentence.text, { accent, rate: 0.7 })} className={popButton("card")}>
            <Turtle className="size-4" /> Slow
          </button>
          {mode === "DICTATION" && (
            <button type="button" onClick={() => setShowText((v) => !v)} className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
              {showText ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              {showText ? "Hide sentence" : "Show sentence"}
            </button>
          )}
        </div>

        {showText ? (
          <div>
            <p className="font-heading text-2xl font-bold leading-snug">{sentence.text}</p>
            <p className="mt-1 text-sun">🇻🇳 {sentence.translationVi}</p>
          </div>
        ) : (
          <p className="rounded-2xl border-2 border-dashed border-border p-4 text-center text-muted-foreground">
            Listen, then type exactly what you hear. Punctuation and capital letters don&apos;t matter.
          </p>
        )}

        {/* Answer */}
        {mode === "DICTATION" ? (
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              check(typed);
            }}
          >
            <Textarea
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="Type what you hear…"
              rows={3}
              className="text-lg"
              autoCapitalize="none"
              spellCheck={false}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  check(typed);
                }
              }}
            />
            <button type="submit" disabled={pending || !typed.trim()} className={`${popButton("lime")} self-start`}>
              {pending ? "Checking…" : "Check"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {stt.listening ? (
                <button type="button" onClick={stt.stop} className={`${popButton("coral", "lg")} animate-pulse`}>
                  <Square className="size-5" /> Stop
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    tts.cancel();
                    setResult(null);
                    stt.start();
                  }}
                  className={popButton("coral", "lg")}
                >
                  <Mic className="size-5" /> Speak
                </button>
              )}
              {stt.transcript && !stt.listening && (
                <button type="button" disabled={pending} onClick={() => check(stt.transcript)} className={popButton("lime")}>
                  {pending ? "Scoring…" : "Score it"}
                </button>
              )}
            </div>
            {(stt.transcript || stt.interim) && (
              <p className="text-muted-foreground">
                You said: <span className="text-foreground">{stt.transcript}</span> <span className="opacity-60">{stt.interim}</span>
              </p>
            )}
            {stt.error && <p className="text-sm text-coral">{stt.error}</p>}
          </div>
        )}

        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

        {result && (
          <div className="flex flex-col gap-4 rounded-2xl bg-muted p-4" aria-live="polite">
            <div className="flex items-center gap-3">
              <span
                className={`shadow-pop grid size-14 place-items-center rounded-2xl border-2 border-black/60 font-heading text-lg font-extrabold text-primary-foreground ${
                  result.score >= 90 ? "bg-lime" : result.score >= 60 ? "bg-sun" : "bg-coral"
                }`}
              >
                {result.score}
              </span>
              <p className="font-heading text-lg font-bold">
                {result.score >= 90 ? "Excellent! 🎉" : result.score >= 60 ? "Nice, almost there! 💪" : "Keep practising 🌱"}
                <span className="block text-sm font-normal text-muted-foreground">
                  {result.matched}/{result.total} words matched
                </span>
              </p>
            </div>
            <DiffView result={result} />
          </div>
        )}
      </div>

      <button type="button" onClick={nextSentence} className={`${popButton("primary")} self-center`}>
        <Shuffle className="size-4" /> Next sentence
      </button>
    </div>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div className={`${popCard} mx-auto max-w-xl p-8 text-center text-muted-foreground`}>{children}</div>;
}
