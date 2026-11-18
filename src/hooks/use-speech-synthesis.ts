"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export type Accent = "en-US" | "en-GB";

const subscribeNoop = () => () => {};
function useIsSupported() {
  return useSyncExternalStore(
    subscribeNoop,
    () => "speechSynthesis" in window,
    () => false,
  );
}

function pickVoices(voices: SpeechSynthesisVoice[], accent: Accent) {
  const english = voices.filter((v) => v.lang.replace("_", "-").startsWith("en"));
  const sameAccent = english.filter((v) => v.lang.replace("_", "-") === accent);
  const pool = sameAccent.length ? sameAccent : english;
  // Prefer higher-quality voices when the browser offers them.
  const ranked = [...pool].sort((a, b) => score(b) - score(a));
  return ranked;
}

function score(v: SpeechSynthesisVoice) {
  const n = v.name.toLowerCase();
  return (n.includes("natural") || n.includes("neural") ? 2 : 0) + (n.includes("google") ? 1 : 0);
}

/**
 * Text-to-speech using the browser's Web Speech API.
 * Lines starting with "M:" or "W:" are read by two different voices (for conversations).
 */
export function useSpeechSynthesis() {
  const supported = useIsSupported();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!supported) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string, opts: { rate?: number; accent?: Accent } = {}) => {
      if (!supported) return;
      const synth = window.speechSynthesis;
      synth.cancel();

      const ranked = pickVoices(voices, opts.accent ?? "en-US");
      const voiceA = ranked[0];
      const voiceB = ranked[1] ?? ranked[0];

      const segments = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const m = /^([MW]):\s*(.*)$/.exec(line);
          return m ? { speaker: m[1], text: m[2] } : { speaker: "", text: line };
        });

      segments.forEach((seg, i) => {
        const u = new SpeechSynthesisUtterance(seg.text);
        u.lang = opts.accent ?? "en-US";
        u.rate = opts.rate ?? 1;
        if (seg.speaker === "W") {
          u.voice = voiceB ?? null;
          u.pitch = 1.25;
        } else if (seg.speaker === "M") {
          u.voice = voiceA ?? null;
          u.pitch = 0.85;
        } else if (voiceA) {
          u.voice = voiceA;
        }
        if (i === 0) u.onstart = () => setSpeaking(true);
        if (i === segments.length - 1) {
          u.onend = () => setSpeaking(false);
          u.onerror = () => setSpeaking(false);
        }
        synth.speak(u);
      });
    },
    [supported, voices],
  );

  return { supported, speaking, speak, cancel };
}
