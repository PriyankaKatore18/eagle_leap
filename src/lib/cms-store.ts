import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import { normalizeCmsContent, type CmsContent } from "./cms-content";
import { getMysqlCmsConfig, getMysqlCmsContent, saveMysqlCmsContent } from "./mysql-cms-store";

export function getCmsStorageLabel() {
  const config = getMysqlCmsConfig();
  return `MySQL: ${config.database}`;
}

export async function getCmsContent(): Promise<CmsContent> {
  noStore();
  return getMysqlCmsContent();
}

export async function saveCmsContent(input: CmsContent) {
  noStore();
  return saveMysqlCmsContent(normalizeCmsContent(input));
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
