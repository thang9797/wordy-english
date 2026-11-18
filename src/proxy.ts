import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic check only: sends visitors without a session cookie to /sign-in.
// Real authorization happens in requireUser() on the server, so a stale cookie
// is still rejected there (and we never redirect *away* from /sign-in here,
// which would loop with a stale cookie).
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const url = new URL("/sign-in", request.url);
  url.searchParams.set("next", pathname + search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*", "/decks/:path*", "/quizzes/:path*", "/practice/:path*"],
};
