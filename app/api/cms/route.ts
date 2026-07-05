import { NextResponse } from "next/server";

import { getDemoSessionUser } from "@/lib/demo-session";
import { cmsContentSchema, type CmsContent } from "@/lib/cms-content";
import { getCmsContent, saveCmsContent } from "@/lib/cms-store";

export async function GET() {
  const content = await getCmsContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const user = getDemoSessionUser();

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Admin access is required." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = cmsContentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid CMS payload.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const saved = await saveCmsContent(parsed.data as CmsContent);

  return NextResponse.json({
    message: "CMS content saved successfully.",
    content: saved,
  });
}
