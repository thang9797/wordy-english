import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";

export type CurrentUser = { id: string; name: string; email: string };

/** Reads the session for the current request (deduped per render). */
export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

/** Returns the signed-in user or redirects to /sign-in. Use in pages and server actions. */
export async function requireUser(): Promise<CurrentUser> {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  const { id, name, email } = session.user;
  return { id, name, email };
}
