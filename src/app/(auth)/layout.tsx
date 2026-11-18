import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

// If a valid session exists, skip the auth pages entirely.
async function RedirectIfSignedIn() {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return null;
}

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-x-clip px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-grape/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-[24rem] rounded-full bg-lime/15 blur-3xl" />
      </div>
      <Suspense>
        <RedirectIfSignedIn />
      </Suspense>
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="shadow-pop grid size-10 -rotate-6 place-items-center rounded-xl border-2 border-black/60 bg-lime font-heading text-xl font-extrabold text-primary-foreground">
          W
        </span>
        <span className="font-heading text-2xl font-extrabold tracking-tight">wordy</span>
      </Link>
      {children}
    </div>
  );
}
