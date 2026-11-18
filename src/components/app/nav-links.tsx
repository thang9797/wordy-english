"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Headphones, Home, Layers, MessageCircleQuestion } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/decks", label: "Decks", icon: Layers },
  { href: "/quizzes", label: "Quizzes", icon: MessageCircleQuestion },
  { href: "/practice", label: "Practice", icon: Headphones },
];

function LinksView({ pathname }: { pathname: string | null }) {
  return (
    <nav className="flex items-center gap-1 overflow-x-auto text-sm font-semibold">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname !== null && (pathname === href || pathname.startsWith(`${href}/`));
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
              active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="size-4" />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function ActiveLinks() {
  return <LinksView pathname={usePathname()} />;
}

/** The pathname is runtime data, so the highlighted state streams in; the links render instantly. */
export function NavLinks() {
  return (
    <Suspense fallback={<LinksView pathname={null} />}>
      <ActiveLinks />
    </Suspense>
  );
}
