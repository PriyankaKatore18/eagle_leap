import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { unstable_noStore as noStore } from "next/cache";

import { cmsContentSchema, createDefaultCmsContent, normalizeCmsContent, type CmsContent } from "./cms-content";

const CMS_DIRECTORY = path.join(process.cwd(), "data");
const CMS_FILE_PATH = path.join(CMS_DIRECTORY, "cms-content.json");

async function ensureCmsFile() {
  await mkdir(CMS_DIRECTORY, { recursive: true });

  try {
    await readFile(CMS_FILE_PATH, "utf8");
  } catch {
    const defaults = createDefaultCmsContent();
    await writeFile(CMS_FILE_PATH, JSON.stringify(defaults, null, 2), "utf8");
  }
}

export async function getCmsContent(): Promise<CmsContent> {
  noStore();
  await ensureCmsFile();

  try {
    const raw = await readFile(CMS_FILE_PATH, "utf8");
    const parsed = cmsContentSchema.safeParse(JSON.parse(raw));

    if (parsed.success) {
      return parsed.data as CmsContent;
    }
  } catch {
    // Fall through to rewrite the file with defaults.
  }

  const defaults = createDefaultCmsContent();
  await writeFile(CMS_FILE_PATH, JSON.stringify(defaults, null, 2), "utf8");
  return defaults;
}

export async function saveCmsContent(input: CmsContent) {
  noStore();
  await ensureCmsFile();

  const normalized = normalizeCmsContent(input);
  const parsed = cmsContentSchema.parse(normalized);

  await writeFile(CMS_FILE_PATH, JSON.stringify(parsed, null, 2), "utf8");

  return parsed;
}

export async function getCmsProducts() {
  const content = await getCmsContent();
  return content.products;
}

export async function getCmsPublications() {
  const content = await getCmsContent();
  return content.publications;
}

export async function getCmsProductBySlug(slug: string) {
  const products = await getCmsProducts();
  return products.find((product) => product.slug === slug);
}

export async function getCmsPublicationBySlug(slug: string) {
  const publications = await getCmsPublications();
  return publications.find((publication) => publication.slug === slug);
}
