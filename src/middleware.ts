import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const IsLogin = cookieStore.get("IsLogin")?.value;

  // If there is no cookie or it's set to "0", redirect to login page
  if (!IsLogin || IsLogin === "0") {
    if (request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If user is logged in and tries to access login page, redirect to dashboard
  if (IsLogin === "1" && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/", "/dashboard", "/login"],
};
