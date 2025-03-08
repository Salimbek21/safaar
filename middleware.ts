import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // This is a simplified middleware that would normally check for authentication
  // In a real app, you would verify the session/token here

  // For demo purposes, we'll just check if the path is protected
  const isProtectedPath =
    !request.nextUrl.pathname.startsWith("/auth") &&
    request.nextUrl.pathname !== "/_next" &&
    !request.nextUrl.pathname.includes(".");

  // In a real app, you would check for a valid session here
  // For now, we'll just redirect to login if there's no cookie
  const hasSession = request.cookies.has("safarim-user");

  if (isProtectedPath && !hasSession) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
