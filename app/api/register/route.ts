import { NextResponse } from "next/server";
import { z } from "zod";

import { createDemoUser, hasDemoUser } from "@/lib/demo-auth";

const registerSchema = z
  .object({
    role: z.enum(["buyer", "author", "distributor"]),
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    businessName: z.string().optional(),
    password: z.string().min(6),
  })
  .superRefine((value, ctx) => {
    if (value.role === "distributor" && !value.businessName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["businessName"],
        message: "Business name is required for distributor registration.",
      });
    }
  });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Missing or invalid registration details." }, { status: 400 });
  }

  if (hasDemoUser(parsed.data.email)) {
    return NextResponse.json({ message: "A user with this email already exists." }, { status: 409 });
  }

  const user = createDemoUser({
    role: parsed.data.role,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    businessName: parsed.data.businessName,
    password: parsed.data.password,
  });

  return NextResponse.json(
    {
      message: "Registration successful. Please log in to continue.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    { status: 201 },
  );
}
