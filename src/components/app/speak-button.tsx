"use client";

import { Volume2 } from "lucide-react";
import { useSpeechSynthesis, type Accent } from "@/hooks/use-speech-synthesis";

export function SpeakButton({
  text,
  rate,
  accent,
  label = "Listen",
  className = "",
}: {
  text: string;
  rate?: number;
  accent?: Accent;
  label?: string;
  className?: string;
}) {
  const { supported, speaking, speak } = useSpeechSynthesis();
  if (!supported) return null;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text, { rate, accent });
      }}
      aria-label={`${label}: ${text}`}
      title={label}
      className={`grid size-9 shrink-0 place-items-center rounded-full border-2 border-black/60 bg-sky text-primary-foreground transition-transform hover:-translate-y-0.5 ${
        speaking ? "animate-pulse" : ""
      } ${className}`}
    >
      <Volume2 className="size-4" />
    </button>
  );
}
