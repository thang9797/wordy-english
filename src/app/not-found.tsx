import Link from "next/link";
import { popButton, popCard } from "@/lib/styles";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className={`${popCard} flex max-w-md flex-col items-center gap-4 p-10 text-center`}>
        <span className="font-heading text-6xl font-extrabold text-lime">404</span>
        <h1 className="font-heading text-2xl font-extrabold">Page not found</h1>
        <p className="text-muted-foreground">This page doesn&apos;t exist. Maybe it&apos;s a word we haven&apos;t learned yet 🤔</p>
        <Link href="/dashboard" className={popButton("primary")}>
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
