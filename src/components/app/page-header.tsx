import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  emoji,
  action,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  emoji?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title} {emoji && <span aria-hidden>{emoji}</span>}
        </h1>
        {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
