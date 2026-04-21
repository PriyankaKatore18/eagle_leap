import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";

import { buildRedirectPath, findDemoUserById, sanitizeDemoUser, type DemoAuthRole, type DemoSessionUser } from "./demo-auth";

const AUTH_COOKIE_NAME = "eagle_leap_demo_session";
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const sessionSchema = z.object({
  id: z.string().min(1),
  role: z.enum(["buyer", "author", "distributor", "admin"]),
});

function encodeSessionCookie(payload: z.infer<typeof sessionSchema>) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodeSessionCookie(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    const decoded = Buffer.from(value, "base64url").toString("utf8");
    return sessionSchema.parse(JSON.parse(decoded));
  } catch {
    return null;
  }
}

export function buildLoginPath(role?: DemoAuthRole) {
  if (!role) {
    return "/login";
  }

  return `/login?role=${role}`;
}

export function getDemoSessionUser(): DemoSessionUser | null {
  const cookieStore = cookies();
  const session = decodeSessionCookie(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    return null;
  }

  const user = findDemoUserById(session.id);

  if (!user || user.role !== session.role) {
    return null;
  }

  return sanitizeDemoUser(user);
}

export function requireDemoSessionRole(roles: DemoAuthRole[]) {
  const user = getDemoSessionUser();

  if (!user || !roles.includes(user.role)) {
    redirect(buildLoginPath(roles[0]));
  }

  return user;
}

export function setDemoSession(response: NextResponse, user: DemoSessionUser) {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: encodeSessionCookie({ id: user.id, role: user.role }),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
}

export function clearDemoSession(response: NextResponse) {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function getLogoutRedirect(role?: DemoAuthRole) {
  return role ? buildLoginPath(role) : buildRedirectPath("buyer");
}
