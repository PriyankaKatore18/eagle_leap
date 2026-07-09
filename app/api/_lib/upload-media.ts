import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const MIME_EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
};

function slugifyFileName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveExtension(file: File) {
  const fromName = path.extname(file.name).toLowerCase();
  if (fromName) {
    return fromName;
  }

  return MIME_EXTENSION_MAP[file.type] ?? "";
}

export async function saveUploadedMediaFile(file: File, folder: string) {
  const safeFolder = slugifyFileName(folder) || "media";
  const targetDirectory = path.join(process.cwd(), "public", "uploads", safeFolder);

  await mkdir(targetDirectory, { recursive: true });

  const baseName = slugifyFileName(path.basename(file.name, path.extname(file.name))) || "upload";
  const extension = resolveExtension(file) || ".bin";
  const fileName = `${baseName}-${randomUUID().slice(0, 8)}${extension}`;
  const targetPath = path.join(targetDirectory, fileName);
  const bytes = new Uint8Array(await file.arrayBuffer());

  await writeFile(targetPath, bytes);

  return `/uploads/${safeFolder}/${fileName}`;
}
