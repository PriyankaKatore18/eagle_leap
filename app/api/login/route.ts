import { z } from "zod";
import { NextResponse } from "next/server";

import { buildRedirectPath, findDemoUser, sanitizeDemoUser } from "@/lib/demo-auth";
import { setDemoSession } from "@/lib/demo-session";

const loginSchema = z.object({
  role: z.literal("admin"),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Only admin login is enabled." }, { status: 400 });
  }

  const user = findDemoUser(parsed.data.email, parsed.data.role);

  if (!user) {
    return NextResponse.json(
      {
        message: "Admin account not found.",
      },
      { status: 401 },
    );
  }

  if (user.password !== parsed.data.password) {
    return NextResponse.json({ message: "Incorrect password for this account." }, { status: 401 });
  }

  const response = NextResponse.json({
    message: "Login successful.",
    redirectTo: buildRedirectPath(parsed.data.role),
    user: sanitizeDemoUser(user),
  });

  setDemoSession(response, sanitizeDemoUser(user));

  return response;
}
