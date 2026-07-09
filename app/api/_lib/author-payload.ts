import { saveUploadedMediaFile } from "./upload-media";

export type AuthorPayload = {
  id?: string;
  slug?: string;
  name?: string;
  designation?: string;
  bio?: string;
  image?: string;
  website?: string;
  featured?: boolean;
  status?: "draft" | "published";
};

export function createDefaultAuthorImage(name: string) {
  const seed = encodeURIComponent(name.trim() || "Author");
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;
}

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

async function readImage(formData: FormData) {
  const value = formData.get("image");

  if (value instanceof File && value.size > 0) {
    return saveUploadedMediaFile(value, "authors");
  }

  return readString(formData, "image");
}

export async function parseAuthorPayload(request: Request): Promise<AuthorPayload | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();

    return {
      id: readString(formData, "id") || undefined,
      slug: readString(formData, "slug") || undefined,
      name: readString(formData, "name"),
      designation: readString(formData, "designation") || undefined,
      bio: readString(formData, "bio"),
      image: await readImage(formData),
      website: readString(formData, "website") || undefined,
      featured: readBoolean(formData, "featured"),
      status: readString(formData, "status") === "draft" ? "draft" : "published",
    };
  }

  try {
    return (await request.json()) as AuthorPayload;
  } catch {
    return null;
  }
}
