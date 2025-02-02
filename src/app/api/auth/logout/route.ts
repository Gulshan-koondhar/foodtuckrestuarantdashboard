import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Remove the "IsLogin" cookie by setting it to "0" with an immediate expiry
  response.cookies.set("IsLogin", "0", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
