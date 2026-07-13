import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import { createDefaultCmsContent, normalizeCmsContent, type CmsContent } from "./cms-content";
import { getMysqlCmsConfig, getMysqlCmsContent, saveMysqlCmsContent } from "./mysql-cms-store";

type CmsStorageMode = "auto" | "mysql" | "fallback" | "static";

type FallbackCmsState = {
  content?: CmsContent;
  lastMysqlError?: string;
};

const globalForFallbackCms = globalThis as typeof globalThis & {
  __eagleLeapFallbackCms?: FallbackCmsState;
};

const fallbackCmsState = (globalForFallbackCms.__eagleLeapFallbackCms ??= {});

function getCmsStorageMode(): CmsStorageMode {
  const mode = (process.env.CMS_STORAGE ?? "auto").trim().toLowerCase();

  if (mode === "mysql" || mode === "fallback" || mode === "static") {
    return mode;
  }

  return "auto";
}

function isLocalMysqlHost(host: string | undefined) {
  return host === "127.0.0.1" || host === "localhost" || host === "::1";
}

function hasMysqlEnvironment() {
  return Boolean(process.env.MYSQL_HOST && process.env.MYSQL_DATABASE && process.env.MYSQL_USER);
}

function shouldUseMysqlCms() {
  const mode = getCmsStorageMode();

  if (mode === "mysql") {
    return true;
  }

  if (mode === "fallback" || mode === "static") {
    return false;
  }

  if (!hasMysqlEnvironment()) {
    return false;
  }

  // A localhost database cannot exist inside Vercel's serverless runtime.
  if (process.env.VERCEL && isLocalMysqlHost(process.env.MYSQL_HOST)) {
    return false;
  }

  return true;
}

function getFallbackCmsContent() {
  if (!fallbackCmsState.content) {
    fallbackCmsState.content = normalizeCmsContent(createDefaultCmsContent());
  }

  return structuredClone(fallbackCmsState.content);
}

function saveFallbackCmsContent(input: CmsContent) {
  fallbackCmsState.content = normalizeCmsContent(input);
  return structuredClone(fallbackCmsState.content);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown MySQL CMS error.";
}

export function getCmsStorageLabel() {
  if (!shouldUseMysqlCms()) {
    return "Fallback CMS: bundled content";
  }

  if (fallbackCmsState.lastMysqlError) {
    return "Fallback CMS: MySQL unavailable";
  }

  const config = getMysqlCmsConfig();
  return `MySQL: ${config.database}`;
}

export function getCmsSaveSuccessMessage() {
  return shouldUseMysqlCms() && !fallbackCmsState.lastMysqlError
    ? "CMS content saved to MySQL and published."
    : "CMS content saved to fallback memory for this running server. Configure MySQL for durable production saves.";
}

export async function getCmsContent(): Promise<CmsContent> {
  noStore();

  if (!shouldUseMysqlCms()) {
    fallbackCmsState.lastMysqlError = undefined;
    return getFallbackCmsContent();
  }

  try {
    const content = await getMysqlCmsContent();
    fallbackCmsState.lastMysqlError = undefined;
    return content;
  } catch (error) {
    if (getCmsStorageMode() === "mysql") {
      throw error;
    }

    fallbackCmsState.lastMysqlError = getErrorMessage(error);
    console.warn(`MySQL CMS unavailable. Using fallback CMS content. ${fallbackCmsState.lastMysqlError}`);
    return getFallbackCmsContent();
  }
}

export async function saveCmsContent(input: CmsContent) {
  noStore();
  const normalized = normalizeCmsContent(input);

  if (!shouldUseMysqlCms()) {
    fallbackCmsState.lastMysqlError = undefined;
    return saveFallbackCmsContent(normalized);
  }

  try {
    const content = await saveMysqlCmsContent(normalized);
    fallbackCmsState.lastMysqlError = undefined;
    return content;
  } catch (error) {
    if (getCmsStorageMode() === "mysql") {
      throw error;
    }

    fallbackCmsState.lastMysqlError = getErrorMessage(error);
    console.warn(`MySQL CMS save unavailable. Saving to fallback CMS memory. ${fallbackCmsState.lastMysqlError}`);
    return saveFallbackCmsContent(normalized);
  }
}

export async function getCmsProducts() {
  const content = await getCmsContent();
  return content.products.filter((product) => product.status !== "draft" && product.status !== "archived");
}

export async function getCmsFeaturedProducts(limit = 7) {
  const products = await getCmsProducts();
  return products.filter((product) => product.featured).slice(0, limit);
}

export async function getCmsPublications() {
  const content = await getCmsContent();
  return content.publications;
}

export async function getCmsBlogs() {
  const content = await getCmsContent();
  return content.blogs;
}

export async function getCmsFeaturedBlogs(limit = 3) {
  const blogs = await getCmsBlogs();
  return blogs.filter((blog) => blog.featured !== false && blog.status === "published").slice(0, limit);
}

export async function getCmsAuthors() {
  const content = await getCmsContent();
  return content.authors;
}

export async function getCmsTestimonials(placement: "home" | "packages" | "about" = "home", limit = 9) {
  const content = await getCmsContent();
  return content.testimonials
    .filter((testimonial) => testimonial.status === "published" && testimonial[placement] !== false)
    .slice(0, limit);
}

export async function getCmsFeaturedAuthors(limit = 3) {
  const authors = await getCmsAuthors();
  return authors.filter((author) => author.featured !== false && author.status !== "draft").slice(0, limit);
}

export async function getCmsProductBySlug(slug: string) {
  const products = await getCmsProducts();
  return products.find((product) => product.slug === slug);
}

export async function getCmsPublicationBySlug(slug: string) {
  const publications = await getCmsPublications();
  return publications.find((publication) => publication.slug === slug);
}

export async function getCmsAuthorBySlug(slug: string) {
  const authors = await getCmsAuthors();
  return authors.find((author) => author.slug === slug);
}

export async function getCmsBlogBySlug(slug: string) {
  const blogs = await getCmsBlogs();
  return blogs.find((blog) => blog.slug === slug);
}
