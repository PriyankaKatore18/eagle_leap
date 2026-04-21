import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  if (!formData.get("name") || !formData.get("mobile") || !formData.get("serviceType")) {
    return NextResponse.json({ message: "Missing required printing enquiry fields." }, { status: 400 });
  }

  return NextResponse.json({
    message: "Printing enquiry submitted successfully. We will share the quote shortly.",
  });
}
