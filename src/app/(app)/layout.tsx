import { AppNav } from "@/components/app/app-nav";

// Static shell: the nav renders instantly; each page reads the session inside
// its own <Suspense> boundary (via requireUser) and streams in.
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col">
      <AppNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
