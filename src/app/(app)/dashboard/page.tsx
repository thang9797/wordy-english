import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Brain, Flame, Headphones, Layers, MessageCircleQuestion, Trophy } from "lucide-react";
import { PageSkeleton } from "@/components/app/skeletons";
import { getStreakSummary } from "@/lib/activity";
import { getDashboardData } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { categoryStyles, popButton, popCard } from "@/lib/styles";

export const metadata = { title: "Dashboard · Wordy" };

export default function DashboardPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}

const WEEKDAY = new Intl.DateTimeFormat("en-US", { weekday: "narrow", timeZone: "UTC" });

async function Dashboard() {
  const user = await requireUser();
  const [data, streak] = await Promise.all([getDashboardData(user.id), getStreakSummary(user.id)]);
  const firstName = user.name.split(" ")[0] || "there";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          Hi {firstName}! <span aria-hidden>👋</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          {data.dueCount > 0
            ? `You have ${data.dueCount} card${data.dueCount === 1 ? "" : "s"} waiting for review. Let's go!`
            : "Nothing due right now. Learn some new words or try a quiz."}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard color="bg-coral" icon={<Flame className="size-6" />} value={streak.current} label={`day streak${streak.activeToday ? "" : " · study today to keep it"}`} />
        <StatCard color="bg-sky" icon={<Layers className="size-6" />} value={data.dueCount} label="cards due" />
        <StatCard color="bg-lime" icon={<Brain className="size-6" />} value={data.learnedCount} label="words started" />
        <StatCard color="bg-sun" icon={<Trophy className="size-6" />} value={data.masteredCount} label="words mastered (21+ days)" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Review queue */}
        <section className={`${popCard} p-6`}>
          <h2 className="font-heading text-xl font-bold">Ready to review</h2>
          {data.dueDecks.length === 0 ? (
            <div className="mt-4 flex flex-col items-start gap-4">
              <p className="text-muted-foreground">You&apos;re all caught up. Pick a deck to learn new words.</p>
              <Link href="/decks" className={popButton("lime")}>
                Browse decks <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {data.dueDecks.slice(0, 5).map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/decks/${d.slug}/study`}
                    className="flex items-center gap-3 rounded-2xl border border-border p-3 transition-colors hover:bg-muted"
                  >
                    <span className={`${categoryStyles[d.category].bg} rounded-full border-2 border-black/60 px-2 py-0.5 text-xs font-bold text-primary-foreground`}>
                      {categoryStyles[d.category].label}
                    </span>
                    <span className="font-semibold">{d.title}</span>
                    <span className="ml-auto text-sm text-muted-foreground">{d.due} due</span>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Week */}
        <section className={`${popCard} p-6`}>
          <h2 className="font-heading text-xl font-bold">This week</h2>
          <div className="mt-5 flex justify-between gap-2" aria-label="Activity over the last seven days">
            {streak.week.map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-2">
                <span
                  title={`${d.day}: ${d.count} activities`}
                  className={`grid size-10 place-items-center rounded-xl border-2 border-black/60 text-lg ${
                    d.count > 0 ? "shadow-pop bg-sun" : "bg-muted"
                  }`}
                >
                  {d.count > 0 ? "🔥" : ""}
                </span>
                <span className="text-xs font-bold text-muted-foreground">{WEEKDAY.format(new Date(`${d.day}T00:00:00Z`))}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Recent quizzes */}
        <section className={`${popCard} p-6`}>
          <h2 className="font-heading text-xl font-bold">Recent quizzes</h2>
          {data.recentAttempts.length === 0 ? (
            <p className="mt-4 text-muted-foreground">No quizzes yet. Try a TOEIC Part 5 set!</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {data.recentAttempts.map((a) => {
                const pct = Math.round((a.score / Math.max(1, a.total)) * 100);
                return (
                  <li key={a.id}>
                    <Link
                      href={`/quizzes/${a.quiz.slug}/results/${a.id}`}
                      className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-muted"
                    >
                      <span className="min-w-0 flex-1 truncate font-medium">{a.quiz.title}</span>
                      <span className={`font-heading font-bold ${pct >= 80 ? "text-lime" : pct >= 50 ? "text-sun" : "text-coral"}`}>
                        {a.score}/{a.total}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Quick links */}
        <section className="flex flex-col gap-4">
          <QuickLink href="/quizzes" color="bg-sun" icon={<MessageCircleQuestion className="size-5" />} title="Take a quiz" body="TOEIC Part 5, IELTS collocations, grammar" />
          <QuickLink href="/practice/listening" color="bg-sky" icon={<Headphones className="size-5" />} title="Dictation" body="Listen and type what you hear" />
          <QuickLink href="/practice/speaking" color="bg-grape" icon={<Headphones className="size-5" />} title="Shadowing" body="Repeat out loud and get a score" />
        </section>
      </div>
    </div>
  );
}

function StatCard({ color, icon, value, label }: { color: string; icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className={`${popCard} flex items-center gap-4 p-5`}>
      <span className={`${color} shadow-pop grid size-12 shrink-0 place-items-center rounded-2xl border-2 border-black/60 text-primary-foreground`}>
        {icon}
      </span>
      <div>
        <div className="font-heading text-3xl font-extrabold leading-none">{value}</div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function QuickLink({ href, color, icon, title, body }: { href: string; color: string; icon: React.ReactNode; title: string; body: string }) {
  return (
    <Link href={href} className={`${popCard} group flex items-center gap-4 p-4 transition-transform hover:-translate-y-0.5`}>
      <span className={`${color} grid size-10 shrink-0 place-items-center rounded-xl border-2 border-black/60 text-primary-foreground`}>{icon}</span>
      <div className="min-w-0">
        <div className="font-heading font-bold">{title}</div>
        <div className="truncate text-sm text-muted-foreground">{body}</div>
      </div>
      <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
