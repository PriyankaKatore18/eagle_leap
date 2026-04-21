import { NextRequest, NextResponse } from "next/server";

import { clearDemoSession } from "@/lib/demo-session";

export async function GET(request: NextRequest) {
  const redirectTarget = request.nextUrl.searchParams.get("redirect") || "/login";
  const redirectUrl = new URL(redirectTarget, request.url);
  const response = NextResponse.redirect(redirectUrl);

  clearDemoSession(response);

  return response;
}
