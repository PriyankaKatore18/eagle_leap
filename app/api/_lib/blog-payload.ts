import { saveUploadedMediaFile } from "./upload-media";

export type BlogPayload = {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  author?: string;
  category?: string;
  publishAt?: string;
  featured?: boolean;
  status?: "draft" | "review" | "published" | "scheduled";
};

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function readBoolean(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return false;
  }

  return ["true", "1", "on", "yes"].includes(value.trim().toLowerCase());
}

async function readFeaturedImage(formData: FormData) {
  const value = formData.get("featuredImage");

  if (value instanceof File && value.size > 0) {
    return saveUploadedMediaFile(value, "blogs");
  }

  return readString(formData, "featuredImage");
}

export async function parseBlogPayload(request: Request): Promise<BlogPayload | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();

    return {
      id: readString(formData, "id") || undefined,
      slug: readString(formData, "slug") || undefined,
      title: readString(formData, "title"),
      excerpt: readString(formData, "excerpt"),
      content: readString(formData, "content"),
      featuredImage: await readFeaturedImage(formData),
      author: readString(formData, "author") || undefined,
      category: readString(formData, "category") || undefined,
      publishAt: readString(formData, "publishAt") || undefined,
      featured: readBoolean(formData, "featured"),
      status:
        readString(formData, "status") === "draft"
          ? "draft"
          : readString(formData, "status") === "review"
            ? "review"
            : readString(formData, "status") === "scheduled"
              ? "scheduled"
              : "published",
    };
  }

  try {
    const body = (await request.json()) as BlogPayload;
    const status = body.status;
    const legacyImage = (body as { image?: unknown }).image;

    return {
      ...body,
      featured: Boolean(body.featured),
      featuredImage: typeof body.featuredImage === "string" ? body.featuredImage : typeof legacyImage === "string" ? legacyImage : undefined,
      status:
        status === "draft"
          ? "draft"
          : status === "review"
            ? "review"
            : status === "scheduled"
              ? "scheduled"
              : "published",
    };
  } catch {
    return null;
  }
}
