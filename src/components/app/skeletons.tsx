import { Skeleton } from "@/components/ui/skeleton";

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className="h-44 rounded-3xl" />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-64 rounded-xl" />
      <Skeleton className="h-5 w-96 max-w-full rounded-lg" />
      <GridSkeleton count={3} />
    </div>
  );
}
