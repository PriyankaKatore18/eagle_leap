import { saveUploadedMediaFile } from "./upload-media";

export type ProductPayload = {
  id?: string;
  slug?: string;
  title?: string;
  author?: string;
  category?: string;
  format?: "Ebook" | "Hard Copy" | "Both";
  price?: string | number;
  offerPrice?: string | number;
  stock?: string | number;
  isbn?: string;
  year?: string | number;
  description?: string;
  cover?: string;
  featured?: boolean;
  newArrival?: boolean;
  popular?: boolean;
  status?: "draft" | "active" | "out_of_stock" | "archived";
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

function normalizeMoney(value: string | number | undefined) {
  if (value === undefined || value === null) {
    return "";
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return `INR ${value}`;
  }

  const text = String(value).trim();
  if (!text) {
    return "";
  }

  return /^\d+(\.\d+)?$/.test(text) ? `INR ${text}` : text;
}

function normalizeText(value: string | number | undefined) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

async function readCover(formData: FormData) {
  const value = formData.get("cover") ?? formData.get("coverImage");

  if (value instanceof File && value.size > 0) {
    return saveUploadedMediaFile(value, "books");
  }

  return readString(formData, "cover") || readString(formData, "coverImage");
}

export async function parseProductPayload(request: Request): Promise<ProductPayload | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const rawStatus = readString(formData, "status");

    return {
      id: readString(formData, "id") || undefined,
      slug: readString(formData, "slug") || undefined,
      title: readString(formData, "title"),
      author: readString(formData, "author"),
      category: readString(formData, "category"),
      format:
        readString(formData, "format") === "Ebook"
          ? "Ebook"
          : readString(formData, "format") === "Hard Copy"
            ? "Hard Copy"
            : "Both",
      price: normalizeMoney(readString(formData, "price")),
      offerPrice: normalizeMoney(readString(formData, "offerPrice")) || undefined,
      stock: normalizeText(readString(formData, "stock")),
      isbn: readString(formData, "isbn"),
      year: normalizeText(readString(formData, "year")),
      description: readString(formData, "description"),
      cover: await readCover(formData),
      featured: readBoolean(formData, "featured"),
      newArrival: readBoolean(formData, "newArrival"),
      popular: readBoolean(formData, "popular"),
      status:
        rawStatus === "draft"
          ? "draft"
          : rawStatus === "out_of_stock"
            ? "out_of_stock"
            : rawStatus === "archived"
              ? "archived"
              : "active",
    };
  }

  try {
    const body = (await request.json()) as ProductPayload;
    const legacyCover = (body as { coverImage?: unknown }).coverImage;

    return {
      ...body,
      price: normalizeMoney(body.price),
      offerPrice: normalizeMoney(body.offerPrice) || undefined,
      stock: normalizeText(body.stock),
      year: normalizeText(body.year),
      cover: typeof body.cover === "string" ? body.cover : typeof legacyCover === "string" ? legacyCover : "",
      format: body.format === "Ebook" || body.format === "Hard Copy" ? body.format : "Both",
      status:
        body.status === "draft"
          ? "draft"
          : body.status === "out_of_stock"
            ? "out_of_stock"
            : body.status === "archived"
              ? "archived"
              : "active",
      featured: Boolean(body.featured),
      newArrival: Boolean(body.newArrival),
      popular: Boolean(body.popular),
    };
  } catch {
    return null;
  }
}
