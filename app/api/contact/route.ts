import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ message: "Please fill in the required fields." }, { status: 400 });
  }

  return NextResponse.json({
    message: "Thank you! Your message has been submitted. Our team will contact you shortly.",
  });
}
