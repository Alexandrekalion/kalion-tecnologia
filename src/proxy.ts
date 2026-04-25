import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith("/sistema-kalion-x9/painel")) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get(ADMIN_SESSION_COOKIE)?.value === "authenticated";
  if (isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/sistema-kalion-x9", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/sistema-kalion-x9/painel/:path*"],
};
