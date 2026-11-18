import Link from "next/link";
import { Suspense } from "react";
import { getSession } from "@/lib/session";
import { NavLinks } from "./nav-links";
import { UserMenu } from "./user-menu";

async function CurrentUser() {
  const session = await getSession();
  if (!session) return null;
  return <UserMenu name={session.user.name} email={session.user.email} />;
}

export function AppNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2">
          <span className="shadow-pop grid size-8 -rotate-6 place-items-center rounded-xl border-2 border-black/60 bg-lime font-heading font-extrabold text-primary-foreground">
            W
          </span>
          <span className="hidden font-heading text-lg font-extrabold tracking-tight sm:inline">wordy</span>
        </Link>
        <NavLinks />
        <div className="ml-auto">
          <Suspense fallback={<div className="size-9 rounded-full bg-muted" />}>
            <CurrentUser />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
