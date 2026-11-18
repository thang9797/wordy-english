import Link from "next/link";
import { ArrowRight, Brain, Flame, Layers, MessageCircleQuestion, Sparkles, Target } from "lucide-react";
import { FlipCard } from "@/components/landing/flip-card";
import { GlowBackground, Logo } from "@/components/brand/logo";

const features = [
  {
    href: "/decks",
    icon: Layers,
    title: "Decks",
    body: "Build word decks or grab ready-made ones. Spaced repetition brings each card back right before you'd forget it.",
    color: "bg-lime",
    tilt: "-rotate-1",
  },
  {
    href: "/quizzes",
    icon: MessageCircleQuestion,
    title: "Quizzes",
    body: "Quick-fire rounds that check what stuck. Small typos are forgiven, so you're marked on what you meant.",
    color: "bg-sun",
    tilt: "rotate-1",
  },
  {
    href: "/practice",
    icon: Target,
    title: "Practice",
    body: "Type, listen and repeat. Short sessions that fit between coffee and your first meeting.",
    color: "bg-sky",
    tilt: "-rotate-[0.5deg]",
  },
];

const floatingWords = [
  { text: "hello!", cls: "left-[4%] top-24 bg-coral [--r:-8deg]" },
  { text: "awesome", cls: "right-[6%] top-32 bg-sun [--r:6deg] [animation-delay:1s]" },
  { text: "let's go", cls: "left-[10%] bottom-10 bg-sky [--r:4deg] [animation-delay:2s]" },
];

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <GlowBackground />

      {/* Nav */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link href="/sign-in" className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground">
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="shadow-pop rounded-full border-2 border-black/60 bg-primary px-4 py-2 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Start free
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
          {floatingWords.map((w) => (
            <span
              key={w.text}
              aria-hidden
              className={`animate-float shadow-pop absolute hidden rounded-full border-2 border-black/60 px-3 py-1 font-heading text-sm font-bold text-primary-foreground xl:block ${w.cls}`}
            >
              {w.text}
            </span>
          ))}

          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-sun" />
              New words every day, no boring drills
            </span>
            <h1 className="font-heading text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Learn English{" "}
              <span className="relative inline-block">
                <span className="relative z-10">like it&apos;s</span>
                <span aria-hidden className="absolute inset-x-0 bottom-1 -z-0 h-4 -rotate-1 rounded-full bg-grape/70" />
              </span>{" "}
              <span className="text-lime">a game.</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Flashcards that remember for you, quizzes that keep it light, and a streak you won&apos;t want to break.
              Five minutes a day, and you&apos;ll notice.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="shadow-pop-lg group inline-flex items-center gap-2 rounded-2xl border-2 border-black/60 bg-primary px-6 py-3.5 font-heading text-lg font-bold text-primary-foreground transition-transform hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Start learning
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/decks"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-border px-6 py-3.5 font-heading text-lg font-bold transition-colors hover:border-foreground/40 hover:bg-card"
              >
                Browse decks
              </Link>
            </div>
            <div className="flex items-center gap-5 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Flame className="size-4 text-coral" /> Daily streaks
              </span>
              <span className="flex items-center gap-1.5">
                <Brain className="size-4 text-grape" /> Spaced repetition
              </span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <FlipCard />
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <h2 className="mb-10 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            Three ways to play <span aria-hidden>🎲</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ href, icon: Icon, title, body, color, tilt }) => (
              <Link
                key={title}
                href={href}
                className={`group shadow-pop-lg ${tilt} flex flex-col gap-4 rounded-3xl border-2 border-black/60 bg-card p-6 transition-transform hover:-translate-y-1 hover:rotate-0`}
              >
                <span className={`${color} shadow-pop grid size-12 place-items-center rounded-2xl border-2 border-black/60 text-primary-foreground`}>
                  <Icon className="size-6" />
                </span>
                <h3 className="font-heading text-2xl font-bold">{title}</h3>
                <p className="leading-relaxed text-muted-foreground">{body}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-foreground/80 group-hover:text-foreground">
                  Try it <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Streak strip */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
          <div className="shadow-pop-lg flex flex-col items-start justify-between gap-8 rounded-3xl border-2 border-black/60 bg-grape p-8 text-primary-foreground sm:p-10 md:flex-row md:items-center">
            <div className="max-w-md">
              <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Keep the flame alive 🔥</h2>
              <p className="mt-3 text-lg opacity-80">
                One review a day keeps your streak going. Miss a day? It happens. Just come back tomorrow.
              </p>
            </div>
            <div className="flex gap-2" aria-label="Example week with a five-day streak">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span
                    className={`grid size-10 place-items-center rounded-xl border-2 border-black/60 text-lg sm:size-12 ${
                      i < 5 ? "shadow-pop bg-sun" : "bg-white/20"
                    }`}
                  >
                    {i < 5 ? "🔥" : ""}
                  </span>
                  <span className="text-xs font-bold opacity-70">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 border-t border-border px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <span className="font-heading font-bold text-foreground">wordy</span>
        <span>Made for curious learners ✌️</span>
      </footer>
    </div>
  );
}
