import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  if (!formData.get("fullName") || !formData.get("mobile") || !formData.get("email") || !formData.get("bookTitle")) {
    return NextResponse.json({ message: "Missing required publish request fields." }, { status: 400 });
  }

  return NextResponse.json({
    message: "Thank you! Your request has been submitted. Our team will contact you shortly.",
  });
}
