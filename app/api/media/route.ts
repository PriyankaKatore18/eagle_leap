import { NextResponse } from "next/server";

import { getDemoSessionUser } from "@/lib/demo-session";

import { saveUploadedMediaFile } from "../_lib/upload-media";

export async function POST(request: Request) {
  const user = getDemoSessionUser();

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Admin access is required." }, { status: 401 });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "The image upload request must use form data." }, { status: 400 });
  }

  const file = formData.get("file") ?? formData.get("image");
  const folderValue = formData.get("folder");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "Please choose an image file." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ message: "Only image files can be uploaded here." }, { status: 400 });
  }

  try {
    const folder = typeof folderValue === "string" && folderValue.trim() ? folderValue : "cms";
    const url = await saveUploadedMediaFile(file, folder);

    return NextResponse.json({
      message: "Image uploaded successfully.",
      url,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Image upload failed." },
      { status: 500 },
    );
  }
}
