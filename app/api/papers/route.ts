import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  if (!formData.get("authorName") || !formData.get("paperTitle") || !formData.get("email")) {
    return NextResponse.json({ message: "Missing required submission fields." }, { status: 400 });
  }

  return NextResponse.json({
    message: "Paper submitted successfully. Our team will review and connect with you soon.",
  });
}
