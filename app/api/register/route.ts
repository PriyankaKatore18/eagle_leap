import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Public registration is disabled. Use the admin login account.",
    },
    { status: 410 },
  );
}
