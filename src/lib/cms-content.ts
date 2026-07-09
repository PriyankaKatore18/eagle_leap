import { z } from "zod";

import { publications, storeProducts, type ProductRecord, type PublicationRecord } from "@/data/catalog-data";
import { heroImages, testimonials as marketingTestimonials } from "@/data/marketing-data";

export type BlogRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  publishAt: string;
  featured?: boolean;
  status: "draft" | "review" | "published" | "scheduled";
};

export type AuthorRecord = {
  id: string;
  slug: string;
  name: string;
  designation: string;
  bio: string;
  image: string;
  website?: string;
  featured?: boolean;
  status: "draft" | "published";
};

export type TestimonialRecord = {
  id: string;
  slug: string;
  name: string;
  designation: string;
  review: string;
  rating: number;
  home?: boolean;
  packages?: boolean;
  about?: boolean;
  status: "draft" | "published" | "archived";
};

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
  blogs: BlogRecord[];
  authors: AuthorRecord[];
  testimonials: TestimonialRecord[];
  homeFeatureSection: HomeFeatureSection;
};

const publicationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  author: z.string(),
  year: z.string(),
  edition: z.string(),
  publicationType: z.enum(["Book", "ISBN Paper", "Edited Book"]),
  category: z.enum(["Books", "Edited Books", "Articles", "Chapters", "Papers"]),
  isbn: z.string(),
  publicationDate: z.string(),
  description: z.string(),
  cover: z.string(),
  featured: z.boolean().optional(),
  pdfUrl: z.string().optional(),
  certificateUrl: z.string().optional(),
});

const blogSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  featuredImage: z.string(),
  author: z.string(),
  category: z.string(),
  publishAt: z.string(),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "review", "published", "scheduled"]).optional(),
});

const authorSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  designation: z.string(),
  bio: z.string(),
  image: z.string(),
  website: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

const testimonialSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  designation: z.string(),
  review: z.string(),
  rating: z.number().int().min(1).max(5),
  home: z.boolean().optional(),
  packages: z.boolean().optional(),
  about: z.boolean().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  author: z.string(),
  category: z.string(),
  format: z.enum(["Ebook", "Hard Copy", "Both"]),
  price: z.string(),
  offerPrice: z.string().optional(),
  stock: z.string(),
  isbn: z.string(),
  year: z.string(),
  description: z.string(),
  cover: z.string(),
  featured: z.boolean().optional(),
  newArrival: z.boolean().optional(),
  popular: z.boolean().optional(),
  status: z.enum(["draft", "active", "out_of_stock", "archived"]).optional(),
});

const homeFeatureSectionSchema = z.object({
  leftEyebrow: z.string(),
  leftTitle: z.string(),
  leftHighlights: z.tuple([z.string(), z.string()]),
  rightHighlights: z.tuple([z.string(), z.string()]),
  rightEyebrow: z.string(),
  rightTitle: z.string(),
  rightDescription: z.string(),
  imageSrc: z.string(),
});

export const cmsContentSchema = z.object({
  updatedAt: z.string(),
  products: z.array(productSchema),
  publications: z.array(publicationSchema),
  blogs: z.array(blogSchema).optional(),
  authors: z.array(authorSchema).optional(),
  testimonials: z.array(testimonialSchema).optional(),
  homeFeatureSection: homeFeatureSectionSchema,
});

const defaultTestimonials: TestimonialRecord[] = marketingTestimonials.map((testimonial, index) => ({
  id: `testimonial-${index + 1}`,
  slug: `testimonial-${index + 1}`,
  name: testimonial.name,
  designation: testimonial.designation,
  review: testimonial.review,
  rating: 5,
  home: true,
  packages: true,
  about: true,
  status: "published",
}));

const defaultAuthors: AuthorRecord[] = [
  {
    id: "author-1",
    slug: "dr-nandkishor-n-dhondge",
    name: "Dr. Nandkishor N. Dhondge",
    designation: "Commerce",
    bio: "Associate professor of commerce and a research guide in business economics.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Dr.%20Nandkishor%20N.%20Dhondge",
    featured: true,
    status: "published",
  },
  {
    id: "author-2",
    slug: "prof-pooja-p-ghulaxe",
    name: "Prof. Pooja P. Ghulaxe",
    designation: "Commerce",
    bio: "CHB faculty in accountancy and income tax with a strong teaching and mentoring focus.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Prof.%20Pooja%20P.%20Ghulaxe",
    featured: true,
    status: "published",
  },
  {
    id: "author-3",
    slug: "prof-apeksha-g-dubey",
    name: "Prof. Apeksha G. Dubey",
    designation: "Commerce",
    bio: "Commerce faculty working across statistics and computer-related subjects.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Prof.%20Apeksha%20G.%20Dubey",
    featured: true,
    status: "published",
  },
  {
    id: "author-4",
    slug: "prof-vishakha-v-patil",
    name: "Prof. Vishakha V. Patil",
    designation: "Commerce",
    bio: "Commerce faculty with extensive experience in accountancy.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Prof.%20Vishakha%20V.%20Patil",
    featured: true,
    status: "published",
  },
  {
    id: "author-5",
    slug: "dr-bhushan-s-mangte",
    name: "Dr. Bhushan S. Mangte",
    designation: "Management",
    bio: "Management scholar and BOS contributor focused on business studies and research.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Dr.%20Bhushan%20S.%20Mangte",
    featured: false,
    status: "published",
  },
  {
    id: "author-6",
    slug: "dr-komal-a-ghuma",
    name: "Dr. Komal A. Ghuma",
    designation: "Management",
    bio: "Management and commerce teacher with a background in taxation and business studies.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Dr.%20Komal%20A.%20Ghuma",
    featured: false,
    status: "published",
  },
  {
    id: "author-7",
    slug: "dr-pavan-d-sharma",
    name: "Dr. Pavan D. Sharma",
    designation: "Management",
    bio: "Commerce educator interested in finance, taxation and classroom practice.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Dr.%20Pavan%20D.%20Sharma",
    featured: false,
    status: "published",
  },
  {
    id: "author-8",
    slug: "dr-vinod-shripati-pawar",
    name: "Dr. Vinod Shripati Pawar",
    designation: "Agriculture",
    bio: "Assistant professor in agriculture who writes practical textbooks for B.Sc. learners.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Dr.%20Vinod%20Shripati%20Pawar",
    featured: false,
    status: "published",
  },
  {
    id: "author-9",
    slug: "ms-sneha-vilas-kulkarni",
    name: "Ms. Sneha Vilas Kulkarni",
    designation: "Strategic Studies",
    bio: "Defense and strategic studies scholar focusing on terrorism, extremism and geopolitics.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Ms.%20Sneha%20Vilas%20Kulkarni",
    featured: false,
    status: "published",
  },
  {
    id: "author-10",
    slug: "prof-rohan-pradeep-shinde",
    name: "Prof. Rohan Pradeep Shinde",
    designation: "Engineering",
    bio: "Electrical engineering academic focused on renewable energy and grid-connected systems.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Prof.%20Rohan%20Pradeep%20Shinde",
    featured: false,
    status: "published",
  },
  {
    id: "author-11",
    slug: "dr-yogesh-laxmanrao-patinge",
    name: "Dr. Yogesh Laxmanrao Patinge",
    designation: "Accounting",
    bio: "Associate professor and author in accounting, banking and financial systems.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Dr.%20Yogesh%20Laxmanrao%20Patinge",
    featured: false,
    status: "published",
  },
];

const defaultBlogs: BlogRecord[] = [
  {
    id: "blog-1",
    slug: "how-isbn-publication-helps-first-time-authors",
    title: "How ISBN Publication Helps First-Time Authors Build Credibility",
    excerpt: "A practical guide to ISBN-ready publishing, platform trust, and what authors should prepare before starting.",
    content:
      "Starting with an ISBN gives a first-time author a formal place in the publishing ecosystem. It makes the work easier to catalogue, share, and distribute while also giving readers a stronger sense of legitimacy.\n\nA clear manuscript, a polished cover, and a publishing partner that understands distribution can make the difference between a private draft and a book that can be discovered, purchased, and cited.",
    featuredImage: heroImages.homeEditorial,
    author: "Editorial Team",
    category: "Publishing Tips",
    publishAt: "2026-04-12",
    featured: true,
    status: "published",
  },
  {
    id: "blog-2",
    slug: "submitting-better-multidisciplinary-research-papers",
    title: "Submitting Better Multidisciplinary Research Papers",
    excerpt: "Key structure, formatting, and review-readiness practices for edited volumes and academic collections.",
    content:
      "Multidisciplinary submissions work best when they balance breadth with clarity. Strong abstracts, explicit methodology, and well-managed references help reviewers understand how the article contributes to the wider discussion.\n\nAuthors can improve submission success by keeping the argument focused, checking formatting requirements carefully, and making sure the final draft is easy to review on both screen and paper.",
    featuredImage: heroImages.homeResearch,
    author: "Editorial Team",
    category: "Research",
    publishAt: "2026-03-28",
    featured: true,
    status: "published",
  },
  {
    id: "blog-3",
    slug: "institutional-printing-checklist-for-colleges",
    title: "Institutional Printing Checklist for Colleges and Universities",
    excerpt: "How to streamline ID cards, magazines, practical books, and certificate production with fewer errors and faster delivery.",
    content:
      "Institutional printing works best when the requirements are gathered early and the final file set is checked before production begins. That includes paper size, binding style, proof approval, branding, and delivery expectations.\n\nA consistent checklist saves time, reduces reprints, and makes the final output more dependable for colleges, universities, and event teams managing multiple print materials at once.",
    featuredImage: heroImages.homePrinting,
    author: "Editorial Team",
    category: "Printing",
    publishAt: "2026-03-07",
    featured: true,
    status: "published",
  },
];

export function createDefaultAuthors(): AuthorRecord[] {
  return structuredClone(defaultAuthors);
}

export function createDefaultBlogs(): BlogRecord[] {
  return structuredClone(defaultBlogs);
}

export function createDefaultTestimonials(): TestimonialRecord[] {
  return structuredClone(defaultTestimonials);
}

export function createDefaultCmsContent(): CmsContent {
  return {
    updatedAt: new Date().toISOString(),
    products: structuredClone(storeProducts),
    publications: structuredClone(publications),
    blogs: createDefaultBlogs(),
    authors: createDefaultAuthors(),
    testimonials: createDefaultTestimonials(),
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

export function createRecordId(prefix: "product" | "publication" | "testimonial") {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createBlogRecordId() {
  return `blog-${Math.random().toString(36).slice(2, 10)}`;
}

export function createAuthorRecordId() {
  return `author-${Math.random().toString(36).slice(2, 10)}`;
}

export function createTestimonialRecordId() {
  return `testimonial-${Math.random().toString(36).slice(2, 10)}`;
}

function cleanText(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

function cleanImagePath(value: string | undefined, fallback: string) {
  const normalized = cleanText(value, fallback);
  return normalized.startsWith("/") || normalized.startsWith("data:") || normalized.startsWith("asset:") ? normalized : fallback;
}

export function ensureProductRecord(product: ProductRecord): ProductRecord {
  const id = product.id || createRecordId("product");
  const title = cleanText(product.title, "Untitled Book");

  return {
    ...product,
    id,
    slug: slugify(product.slug || title || id) || id,
    title,
    author: cleanText(product.author, "Eagle Leap Publication"),
    category: cleanText(product.category, "Academic Books"),
    price: cleanText(product.price, "INR 0"),
    stock: cleanText(product.stock, "In Stock"),
    isbn: cleanText(product.isbn, "ISBN pending"),
    year: cleanText(product.year, new Date().getFullYear().toString()),
    description: cleanText(product.description, "Details will be updated soon."),
    cover: cleanText(product.cover, "asset:book-1"),
    offerPrice:
      typeof product.offerPrice === "string"
        ? product.offerPrice.trim() || undefined
        : product.offerPrice !== undefined && product.offerPrice !== null
          ? String(product.offerPrice)
          : undefined,
    status: product.status || "active",
  };
}

export function ensureBlogRecord(blog: BlogRecord): BlogRecord {
  const id = blog.id || createBlogRecordId();
  const title = cleanText(blog.title, "Untitled Blog");

  return {
    ...blog,
    id,
    slug: slugify(blog.slug || title || id) || id,
    title,
    excerpt: cleanText(blog.excerpt, "Publishing update from Eagle Leap Publication."),
    content: cleanText(blog.content, "Details will be updated soon."),
    featuredImage: cleanImagePath(blog.featuredImage, "/banners/home-hero-publishing-ai.png"),
    author: cleanText(blog.author, "Editorial Team"),
    category: cleanText(blog.category, "Publishing"),
    publishAt: cleanText(blog.publishAt, new Date().toISOString().slice(0, 10)),
    featured: Boolean(blog.featured),
    status: blog.status || "published",
  };
}

export function ensurePublicationRecord(publication: PublicationRecord): PublicationRecord {
  const id = publication.id || createRecordId("publication");
  const title = cleanText(publication.title, "Untitled Publication");

  return {
    ...publication,
    id,
    slug: slugify(publication.slug || title || id) || id,
    title,
    author: cleanText(publication.author, "Eagle Leap Publication"),
    year: cleanText(publication.year, new Date().getFullYear().toString()),
    edition: cleanText(publication.edition, "First Edition"),
    isbn: cleanText(publication.isbn, "ISBN pending"),
    publicationDate: cleanText(publication.publicationDate, publication.year || new Date().getFullYear().toString()),
    description: cleanText(publication.description, "Details will be updated soon."),
    cover: cleanText(publication.cover, "asset:book-1"),
    pdfUrl: publication.pdfUrl?.trim() || undefined,
    certificateUrl: publication.certificateUrl?.trim() || undefined,
  };
}

export function ensureAuthorRecord(author: AuthorRecord): AuthorRecord {
  const id = author.id || createAuthorRecordId();
  const name = cleanText(author.name, "Untitled Author");

  return {
    ...author,
    id,
    slug: slugify(author.slug || name || id) || id,
    name,
    designation: cleanText(author.designation, "Author"),
    bio: cleanText(author.bio, "Author profile details will be updated soon."),
    image: cleanText(author.image, `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`),
    website: author.website?.trim() || undefined,
    featured: Boolean(author.featured),
    status: author.status || "published",
  };
}

export function ensureTestimonialRecord(testimonial: TestimonialRecord): TestimonialRecord {
  const id = testimonial.id || createTestimonialRecordId();
  const name = cleanText(testimonial.name, "Verified Client");
  const rating = Number.isFinite(Number(testimonial.rating)) ? Math.min(5, Math.max(1, Math.round(Number(testimonial.rating)))) : 5;

  return {
    ...testimonial,
    id,
    slug: slugify(testimonial.slug || name || id) || id,
    name,
    designation: cleanText(testimonial.designation, "Client"),
    review: cleanText(testimonial.review, "Testimonial will be updated soon."),
    rating,
    home: testimonial.home !== false,
    packages: testimonial.packages !== false,
    about: testimonial.about !== false,
    status: testimonial.status || "published",
  };
}

function ensureHomeFeatureSection(section: HomeFeatureSection): HomeFeatureSection {
  const defaults = createDefaultCmsContent().homeFeatureSection;

  return {
    leftEyebrow: cleanText(section.leftEyebrow, defaults.leftEyebrow),
    leftTitle: cleanText(section.leftTitle, defaults.leftTitle),
    leftHighlights: [
      cleanText(section.leftHighlights[0], defaults.leftHighlights[0]),
      cleanText(section.leftHighlights[1], defaults.leftHighlights[1]),
    ],
    rightHighlights: [
      cleanText(section.rightHighlights[0], defaults.rightHighlights[0]),
      cleanText(section.rightHighlights[1], defaults.rightHighlights[1]),
    ],
    rightEyebrow: cleanText(section.rightEyebrow, defaults.rightEyebrow),
    rightTitle: cleanText(section.rightTitle, defaults.rightTitle),
    rightDescription: cleanText(section.rightDescription, defaults.rightDescription),
    imageSrc: cleanText(section.imageSrc, defaults.imageSrc),
  };
}

export function normalizeCmsContent(content: CmsContent): CmsContent {
  return {
    ...content,
    updatedAt: new Date().toISOString(),
    products: content.products.map(ensureProductRecord),
    publications: content.publications.map(ensurePublicationRecord),
    blogs: (content.blogs?.length ? content.blogs : createDefaultBlogs()).map(ensureBlogRecord),
    authors: (content.authors?.length ? content.authors : createDefaultAuthors()).map(ensureAuthorRecord),
    testimonials: (content.testimonials?.length ? content.testimonials : createDefaultTestimonials()).map(ensureTestimonialRecord),
    homeFeatureSection: ensureHomeFeatureSection(content.homeFeatureSection),
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

export function getAuthorInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
