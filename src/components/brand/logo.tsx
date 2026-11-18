import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <span className="shadow-pop grid size-9 -rotate-6 place-items-center rounded-xl border-2 border-black/60 bg-lime font-heading text-lg font-extrabold text-primary-foreground">
        W
      </span>
      <span className="font-heading text-xl font-extrabold tracking-tight">wordy</span>
    </Link>
  );
}

/** Soft colored glows behind a page. Purely decorative. */
export function GlowBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-grape/25 blur-3xl" />
      <div className="absolute -right-24 top-40 size-[24rem] rounded-full bg-lime/15 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-coral/15 blur-3xl" />
    </div>
  );
}
