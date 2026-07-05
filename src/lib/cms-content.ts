import { z } from "zod";

import { publications, storeProducts, type ProductRecord, type PublicationRecord } from "@/data/catalog-data";
import { heroImages } from "@/data/marketing-data";

export type HomeFeatureSection = {
  leftEyebrow: string;
  leftTitle: string;
  leftHighlights: [string, string];
  rightHighlights: [string, string];
  rightEyebrow: string;
  rightTitle: string;
  rightDescription: string;
  imageSrc: string;
};

export type CmsContent = {
  updatedAt: string;
  products: ProductRecord[];
  publications: PublicationRecord[];
  homeFeatureSection: HomeFeatureSection;
};

const publicationSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(2),
  author: z.string().min(2),
  year: z.string().min(4),
  edition: z.string().min(2),
  publicationType: z.enum(["Book", "ISBN Paper", "Edited Book"]),
  category: z.enum(["Books", "Edited Books", "Articles", "Chapters", "Papers"]),
  isbn: z.string().min(5),
  publicationDate: z.string().min(4),
  description: z.string().min(10),
  cover: z.string().min(1),
  featured: z.boolean().optional(),
  pdfUrl: z.string().optional(),
  certificateUrl: z.string().optional(),
});

const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(2),
  author: z.string().min(2),
  category: z.string().min(2),
  format: z.enum(["Ebook", "Hard Copy", "Both"]),
  price: z.string().min(3),
  stock: z.string().min(2),
  isbn: z.string().min(5),
  year: z.string().min(4),
  description: z.string().min(10),
  cover: z.string().min(1),
  featured: z.boolean().optional(),
  newArrival: z.boolean().optional(),
  popular: z.boolean().optional(),
});

const homeFeatureSectionSchema = z.object({
  leftEyebrow: z.string().min(2),
  leftTitle: z.string().min(12),
  leftHighlights: z.tuple([z.string().min(4), z.string().min(4)]),
  rightHighlights: z.tuple([z.string().min(4), z.string().min(4)]),
  rightEyebrow: z.string().min(2),
  rightTitle: z.string().min(12),
  rightDescription: z.string().min(12),
  imageSrc: z.string().min(1),
});

export const cmsContentSchema = z.object({
  updatedAt: z.string(),
  products: z.array(productSchema),
  publications: z.array(publicationSchema),
  homeFeatureSection: homeFeatureSectionSchema,
});

export function createDefaultCmsContent(): CmsContent {
  return {
    updatedAt: new Date().toISOString(),
    products: structuredClone(storeProducts),
    publications: structuredClone(publications),
    homeFeatureSection: {
      leftEyebrow: "Publishing Ecosystem",
      leftTitle: "A cleaner corporate presentation for publishing, printing, journals, and store operations.",
      leftHighlights: [
        "Publishing, printing, store, and journal flows in one ecosystem",
        "Structured support from manuscript intake to final distribution",
      ],
      rightHighlights: [
        "Academic-first presentation with premium corporate credibility",
        "Role-based access for buyers, authors, distributors, and admins",
      ],
      rightEyebrow: "Why It Works",
      rightTitle: "Built for authors, researchers, institutions, and distribution partners.",
      rightDescription:
        "The website now frames Eagle Leap as a full academic publishing ecosystem instead of just a brochure site, helping visitors trust the process faster.",
      imageSrc: heroImages.homeEditorial,
    },
  };
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function createRecordId(prefix: "product" | "publication") {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function ensureProductRecord(product: ProductRecord): ProductRecord {
  return {
    ...product,
    id: product.id || createRecordId("product"),
    slug: slugify(product.slug || product.title),
  };
}

export function ensurePublicationRecord(publication: PublicationRecord): PublicationRecord {
  return {
    ...publication,
    id: publication.id || createRecordId("publication"),
    slug: slugify(publication.slug || publication.title),
  };
}

export function normalizeCmsContent(content: CmsContent): CmsContent {
  return {
    ...content,
    updatedAt: new Date().toISOString(),
    products: content.products.map(ensureProductRecord),
    publications: content.publications.map(ensurePublicationRecord),
  };
}

export function buildAuthorProfiles(items: PublicationRecord[]) {
  const seen = new Set<string>();

  return items
    .filter((item) => {
      const key = item.author.trim().toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .map((item) => ({
      name: item.author,
      role: item.publicationType === "Edited Book" ? "Edited Volume Contributor" : "Published Author",
      initials: item.author
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join(""),
      slug: item.slug,
    }));
}
