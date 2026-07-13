import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getDemoSessionUser } from "@/lib/demo-session";
import { cmsContentSchema, type CmsContent } from "@/lib/cms-content";
import { getCmsContent, getCmsSaveSuccessMessage, saveCmsContent } from "@/lib/cms-store";

const CMS_REVALIDATE_PATHS = ["/", "/store", "/publications", "/authors", "/blog", "/about", "/packages"] as const;

function revalidateCmsFrontend() {
  CMS_REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
  revalidatePath("/store/[slug]", "page");
  revalidatePath("/publications/[slug]", "page");
  revalidatePath("/blog/[slug]", "page");
}

export async function GET() {
  try {
    const content = await getCmsContent();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "The CMS content could not be loaded." },
      { status: 500 },
    );
  }
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

  try {
    const saved = await saveCmsContent(parsed.data as CmsContent);
    revalidateCmsFrontend();

    return NextResponse.json({
      message: getCmsSaveSuccessMessage(),
      content: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "The CMS content could not be saved." },
      { status: 500 },
    );
  }
}
