import { z } from "zod";
import { NextResponse } from "next/server";

import { buildRedirectPath, findDemoUser, sanitizeDemoUser } from "@/lib/demo-auth";
import { setDemoSession } from "@/lib/demo-session";

const loginSchema = z.object({
  role: z.enum(["buyer", "author", "distributor", "admin"]),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Missing or invalid login credentials." }, { status: 400 });
  }

  const user = findDemoUser(parsed.data.email, parsed.data.role);

  if (!user) {
    return NextResponse.json(
      {
        message:
          parsed.data.role === "admin"
            ? "Admin testing account not found."
            : `No ${parsed.data.role} account exists for this email. Please register first.`,
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
