import "server-only";

import mysql, { type Pool, type PoolConnection, type RowDataPacket } from "mysql2/promise";

import type { ProductRecord, PublicationRecord } from "@/data/catalog-data";

import {
  createDefaultCmsContent,
  ensureAuthorRecord,
  ensureBlogRecord,
  ensureProductRecord,
  ensurePublicationRecord,
  ensureTestimonialRecord,
  normalizeCmsContent,
  type AuthorRecord,
  type BlogRecord,
  type CmsContent,
  type HomeFeatureSection,
  type TestimonialRecord,
} from "./cms-content";

type MysqlCmsGlobals = {
  pool?: Pool;
  schemaReady?: boolean;
};

type CountRow = RowDataPacket & {
  total: number;
};

type ProductRow = RowDataPacket & {
  id: string;
  slug: string;
  title: string;
  author_name: string;
  category: string;
  format: ProductRecord["format"];
  price: string;
  offer_price: string | null;
  stock: string;
  isbn: string;
  publication_year: string | number | null;
  description: string;
  cover: string;
  featured: number;
  new_arrival: number;
  popular: number;
  status: ProductRecord["status"];
};

type PublicationRow = RowDataPacket & {
  id: string;
  slug: string;
  title: string;
  author_name: string;
  publication_year: string | number;
  edition: string;
  publication_type: PublicationRecord["publicationType"];
  category: PublicationRecord["category"];
  isbn: string;
  publication_date: string;
  description: string;
  cover: string;
  featured: number;
  pdf_url: string | null;
  certificate_url: string | null;
};

type AuthorRow = RowDataPacket & {
  id: string;
  slug: string;
  name: string;
  designation: string;
  bio: string;
  image: string;
  website: string | null;
  featured: number;
  status: AuthorRecord["status"];
};

type BlogRow = RowDataPacket & {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  category: string;
  publish_at: string;
  featured: number;
  status: BlogRecord["status"];
};

type TestimonialRow = RowDataPacket & {
  id: string;
  slug: string;
  name: string;
  designation: string;
  review: string;
  rating: number;
  home: number;
  packages: number;
  about: number;
  status: TestimonialRecord["status"];
};

type HomeFeatureRow = RowDataPacket & {
  left_eyebrow: string;
  left_title: string;
  left_highlights_json: string;
  right_highlights_json: string;
  right_eyebrow: string;
  right_title: string;
  right_description: string;
  image_src: string;
};

const globalForMysql = globalThis as typeof globalThis & {
  __eagleLeapMysqlCms?: MysqlCmsGlobals;
};

const mysqlState = (globalForMysql.__eagleLeapMysqlCms ??= {});

export function getMysqlCmsConfig() {
  return {
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "root",
    database: process.env.MYSQL_DATABASE ?? "eagle_leap_main",
  };
}

function quoteIdentifier(value: string) {
  if (!/^[A-Za-z0-9_]+$/.test(value)) {
    throw new Error(`Invalid MySQL identifier: ${value}`);
  }

  return `\`${value}\``;
}

function getPool() {
  if (!mysqlState.pool) {
    const config = getMysqlCmsConfig();

    mysqlState.pool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: true,
      dateStrings: true,
      charset: "utf8mb4",
    });
  }

  return mysqlState.pool;
}

async function createDatabaseIfNeeded() {
  const config = getMysqlCmsConfig();
  const databaseName = quoteIdentifier(config.database);
  const connection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    charset: "utf8mb4",
  });

  try {
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${databaseName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  } finally {
    await connection.end();
  }
}

async function ensureMysqlCmsSchema() {
  if (mysqlState.schemaReady) {
    return;
  }

  await createDatabaseIfNeeded();
  const pool = getPool();

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cms_products (
      id VARCHAR(64) NOT NULL,
      slug VARCHAR(160) NOT NULL,
      title VARCHAR(255) NOT NULL,
      author_name VARCHAR(191) NOT NULL,
      category VARCHAR(120) NOT NULL,
      format ENUM('Ebook', 'Hard Copy', 'Both') NOT NULL DEFAULT 'Both',
      price VARCHAR(80) NOT NULL,
      offer_price VARCHAR(80) NULL,
      stock VARCHAR(120) NOT NULL,
      isbn VARCHAR(80) NOT NULL,
      publication_year VARCHAR(12) NOT NULL,
      description LONGTEXT NOT NULL,
      cover VARCHAR(255) NOT NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      new_arrival TINYINT(1) NOT NULL DEFAULT 0,
      popular TINYINT(1) NOT NULL DEFAULT 0,
      status ENUM('draft', 'active', 'out_of_stock', 'archived') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_cms_products_slug (slug),
      KEY idx_cms_products_flags (featured, new_arrival, popular),
      KEY idx_cms_products_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cms_publications (
      id VARCHAR(64) NOT NULL,
      slug VARCHAR(160) NOT NULL,
      title VARCHAR(255) NOT NULL,
      author_name VARCHAR(191) NOT NULL,
      publication_year VARCHAR(12) NOT NULL,
      edition VARCHAR(100) NOT NULL,
      publication_type ENUM('Book', 'ISBN Paper', 'Edited Book') NOT NULL DEFAULT 'Book',
      category ENUM('Books', 'Edited Books', 'Articles', 'Chapters', 'Papers') NOT NULL DEFAULT 'Books',
      isbn VARCHAR(80) NOT NULL,
      publication_date VARCHAR(80) NOT NULL,
      description LONGTEXT NOT NULL,
      cover VARCHAR(255) NOT NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      pdf_url VARCHAR(255) NULL,
      certificate_url VARCHAR(255) NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_cms_publications_slug (slug),
      KEY idx_cms_publications_type_category (publication_type, category),
      KEY idx_cms_publications_featured (featured)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cms_authors (
      id VARCHAR(64) NOT NULL,
      slug VARCHAR(160) NOT NULL,
      name VARCHAR(191) NOT NULL,
      designation VARCHAR(150) NOT NULL,
      bio TEXT NOT NULL,
      image VARCHAR(255) NOT NULL,
      website VARCHAR(255) NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      status ENUM('draft', 'published') NOT NULL DEFAULT 'published',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_cms_authors_slug (slug),
      KEY idx_cms_authors_featured_status (featured, status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cms_blogs (
      id VARCHAR(64) NOT NULL,
      slug VARCHAR(160) NOT NULL,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      content LONGTEXT NOT NULL,
      featured_image VARCHAR(255) NOT NULL,
      author_name VARCHAR(191) NOT NULL,
      category VARCHAR(120) NOT NULL,
      publish_at VARCHAR(32) NOT NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      status ENUM('draft', 'review', 'published', 'scheduled') NOT NULL DEFAULT 'published',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_cms_blogs_slug (slug),
      KEY idx_cms_blogs_status_date (status, publish_at),
      FULLTEXT KEY ft_cms_blogs_title_content (title, content)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cms_testimonials (
      id VARCHAR(64) NOT NULL,
      slug VARCHAR(160) NOT NULL,
      name VARCHAR(191) NOT NULL,
      designation VARCHAR(191) NOT NULL,
      review TEXT NOT NULL,
      rating TINYINT UNSIGNED NOT NULL DEFAULT 5,
      home TINYINT(1) NOT NULL DEFAULT 1,
      packages TINYINT(1) NOT NULL DEFAULT 1,
      about TINYINT(1) NOT NULL DEFAULT 1,
      status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'published',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_cms_testimonials_slug (slug),
      KEY idx_cms_testimonials_status_home (status, home)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cms_home_feature (
      id TINYINT UNSIGNED NOT NULL DEFAULT 1,
      left_eyebrow VARCHAR(120) NOT NULL,
      left_title TEXT NOT NULL,
      left_highlights_json TEXT NOT NULL,
      right_highlights_json TEXT NOT NULL,
      right_eyebrow VARCHAR(120) NOT NULL,
      right_title TEXT NOT NULL,
      right_description TEXT NOT NULL,
      image_src VARCHAR(255) NOT NULL,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const [productCount] = await pool.execute<CountRow[]>("SELECT COUNT(*) AS total FROM cms_products");
  const [publicationCount] = await pool.execute<CountRow[]>("SELECT COUNT(*) AS total FROM cms_publications");
  const [authorCount] = await pool.execute<CountRow[]>("SELECT COUNT(*) AS total FROM cms_authors");
  const [blogCount] = await pool.execute<CountRow[]>("SELECT COUNT(*) AS total FROM cms_blogs");
  const [testimonialCount] = await pool.execute<CountRow[]>("SELECT COUNT(*) AS total FROM cms_testimonials");
  const [homeCount] = await pool.execute<CountRow[]>("SELECT COUNT(*) AS total FROM cms_home_feature");

  const shouldSeedAll =
    productCount[0]?.total === 0 &&
    publicationCount[0]?.total === 0 &&
    authorCount[0]?.total === 0 &&
    blogCount[0]?.total === 0 &&
    testimonialCount[0]?.total === 0 &&
    homeCount[0]?.total === 0;

  if (shouldSeedAll) {
    const connection = await pool.getConnection();

    try {
      await replaceCmsContent(connection, createDefaultCmsContent());
    } finally {
      connection.release();
    }
    mysqlState.schemaReady = true;
    return;
  }

  if (testimonialCount[0]?.total === 0) {
    await pool.execute("DELETE FROM cms_testimonials");

    const defaults = createDefaultCmsContent().testimonials.map((testimonial) => ({
      ...serializeTestimonial(testimonial),
    }));

    for (const testimonial of defaults) {
      await pool.execute(
        `INSERT INTO cms_testimonials (
          id, slug, name, designation, review, rating, home, packages, about, status
        ) VALUES (
          :id, :slug, :name, :designation, :review, :rating, :home, :packages, :about, :status
        )`,
        testimonial,
      );
    }
  }

  if (homeCount[0]?.total === 0) {
    await pool.execute(
      `INSERT INTO cms_home_feature (
        id, left_eyebrow, left_title, left_highlights_json, right_highlights_json,
        right_eyebrow, right_title, right_description, image_src
      ) VALUES (1, :leftEyebrow, :leftTitle, :leftHighlights, :rightHighlights, :rightEyebrow, :rightTitle, :rightDescription, :imageSrc)`,
      serializeHomeFeature(createDefaultCmsContent().homeFeatureSection),
    );
  }

  mysqlState.schemaReady = true;
}

function serializeHomeFeature(section: HomeFeatureSection) {
  return {
    leftEyebrow: section.leftEyebrow,
    leftTitle: section.leftTitle,
    leftHighlights: JSON.stringify(section.leftHighlights),
    rightHighlights: JSON.stringify(section.rightHighlights),
    rightEyebrow: section.rightEyebrow,
    rightTitle: section.rightTitle,
    rightDescription: section.rightDescription,
    imageSrc: section.imageSrc,
  };
}

function serializeTestimonial(testimonial: TestimonialRecord) {
  return {
    id: testimonial.id,
    slug: testimonial.slug,
    name: testimonial.name,
    designation: testimonial.designation,
    review: testimonial.review,
    rating: testimonial.rating,
    home: testimonial.home ? 1 : 0,
    packages: testimonial.packages ? 1 : 0,
    about: testimonial.about ? 1 : 0,
    status: testimonial.status ?? "published",
  };
}

function parseHighlights(value: unknown): [string, string] {
  if (Array.isArray(value) && value.length >= 2) {
    return [String(value[0]), String(value[1])];
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed) && parsed.length >= 2) {
        return [String(parsed[0]), String(parsed[1])];
      }
    } catch {
      return ["", ""];
    }
  }

  return ["", ""];
}

function getTrailingNumericId(value: string) {
  const match = value.match(/-(\d+)$/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

function sortByIdSuffix(left: { id: string }, right: { id: string }) {
  const leftValue = getTrailingNumericId(left.id);
  const rightValue = getTrailingNumericId(right.id);

  if (leftValue !== rightValue) {
    return leftValue - rightValue;
  }

  return left.id.localeCompare(right.id);
}

function toProduct(row: ProductRow): ProductRecord {
  return ensureProductRecord({
    id: row.id,
    slug: row.slug,
    title: row.title,
    author: row.author_name,
    category: row.category,
    format: row.format,
    price: row.price,
    offerPrice: row.offer_price ?? undefined,
    stock: row.stock,
    isbn: row.isbn,
    year: String(row.publication_year ?? ""),
    description: row.description,
    cover: row.cover,
    featured: Boolean(row.featured),
    newArrival: Boolean(row.new_arrival),
    popular: Boolean(row.popular),
    status: row.status ?? "active",
  });
}

function toPublication(row: PublicationRow): PublicationRecord {
  return ensurePublicationRecord({
    id: row.id,
    slug: row.slug,
    title: row.title,
    author: row.author_name,
    year: String(row.publication_year),
    edition: row.edition,
    publicationType: row.publication_type,
    category: row.category,
    isbn: row.isbn,
    publicationDate: row.publication_date,
    description: row.description,
    cover: row.cover,
    featured: Boolean(row.featured),
    pdfUrl: row.pdf_url ?? undefined,
    certificateUrl: row.certificate_url ?? undefined,
  });
}

function toAuthor(row: AuthorRow): AuthorRecord {
  return ensureAuthorRecord({
    id: row.id,
    slug: row.slug,
    name: row.name,
    designation: row.designation,
    bio: row.bio,
    image: row.image,
    website: row.website ?? undefined,
    featured: Boolean(row.featured),
    status: row.status ?? "published",
  });
}

function toBlog(row: BlogRow): BlogRecord {
  return ensureBlogRecord({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featured_image,
    author: row.author_name,
    category: row.category,
    publishAt: row.publish_at,
    featured: Boolean(row.featured),
    status: row.status ?? "published",
  });
}

function toTestimonial(row: TestimonialRow): TestimonialRecord {
  return ensureTestimonialRecord({
    id: row.id,
    slug: row.slug,
    name: row.name,
    designation: row.designation,
    review: row.review,
    rating: Number(row.rating ?? 5),
    home: Boolean(row.home),
    packages: Boolean(row.packages),
    about: Boolean(row.about),
    status: row.status ?? "published",
  });
}

function toHomeFeature(row: HomeFeatureRow | undefined): HomeFeatureSection {
  if (!row) {
    return createDefaultCmsContent().homeFeatureSection;
  }

  return {
    leftEyebrow: row.left_eyebrow,
    leftTitle: row.left_title,
    leftHighlights: parseHighlights(row.left_highlights_json),
    rightHighlights: parseHighlights(row.right_highlights_json),
    rightEyebrow: row.right_eyebrow,
    rightTitle: row.right_title,
    rightDescription: row.right_description,
    imageSrc: row.image_src,
  };
}

async function replaceCmsContent(connection: PoolConnection, content: CmsContent) {
  const normalized = normalizeCmsContent(content);

  await connection.beginTransaction();

  try {
    await connection.execute("DELETE FROM cms_products");
    await connection.execute("DELETE FROM cms_publications");
    await connection.execute("DELETE FROM cms_authors");
    await connection.execute("DELETE FROM cms_blogs");
    await connection.execute("DELETE FROM cms_testimonials");
    await connection.execute("DELETE FROM cms_home_feature");

    for (const product of normalized.products) {
      await connection.execute(
        `INSERT INTO cms_products (
          id, slug, title, author_name, category, format, price, offer_price, stock,
          isbn, publication_year, description, cover, featured, new_arrival, popular, status
        ) VALUES (
          :id, :slug, :title, :author, :category, :format, :price, :offerPrice, :stock,
          :isbn, :year, :description, :cover, :featured, :newArrival, :popular, :status
        )`,
        {
          ...product,
          offerPrice: product.offerPrice ?? null,
          featured: product.featured ? 1 : 0,
          newArrival: product.newArrival ? 1 : 0,
          popular: product.popular ? 1 : 0,
          status: product.status ?? "active",
        },
      );
    }

    for (const publication of normalized.publications) {
      await connection.execute(
        `INSERT INTO cms_publications (
          id, slug, title, author_name, publication_year, edition, publication_type, category,
          isbn, publication_date, description, cover, featured, pdf_url, certificate_url
        ) VALUES (
          :id, :slug, :title, :author, :year, :edition, :publicationType, :category,
          :isbn, :publicationDate, :description, :cover, :featured, :pdfUrl, :certificateUrl
        )`,
        {
          ...publication,
          featured: publication.featured ? 1 : 0,
          pdfUrl: publication.pdfUrl ?? null,
          certificateUrl: publication.certificateUrl ?? null,
        },
      );
    }

    for (const author of normalized.authors) {
      await connection.execute(
        `INSERT INTO cms_authors (
          id, slug, name, designation, bio, image, website, featured, status
        ) VALUES (
          :id, :slug, :name, :designation, :bio, :image, :website, :featured, :status
        )`,
        {
          ...author,
          website: author.website ?? null,
          featured: author.featured ? 1 : 0,
          status: author.status ?? "published",
        },
      );
    }

    for (const blog of normalized.blogs) {
      await connection.execute(
        `INSERT INTO cms_blogs (
          id, slug, title, excerpt, content, featured_image, author_name, category, publish_at, featured, status
        ) VALUES (
          :id, :slug, :title, :excerpt, :content, :featuredImage, :author, :category, :publishAt, :featured, :status
        )`,
        {
          ...blog,
          featured: blog.featured ? 1 : 0,
          status: blog.status ?? "published",
        },
      );
    }

    for (const testimonial of normalized.testimonials) {
      await connection.execute(
        `INSERT INTO cms_testimonials (
          id, slug, name, designation, review, rating, home, packages, about, status
        ) VALUES (
          :id, :slug, :name, :designation, :review, :rating, :home, :packages, :about, :status
        )`,
        serializeTestimonial(testimonial),
      );
    }

    await connection.execute(
      `INSERT INTO cms_home_feature (
        id, left_eyebrow, left_title, left_highlights_json, right_highlights_json,
        right_eyebrow, right_title, right_description, image_src
      ) VALUES (
        1, :leftEyebrow, :leftTitle, :leftHighlights, :rightHighlights,
        :rightEyebrow, :rightTitle, :rightDescription, :imageSrc
      )`,
      serializeHomeFeature(normalized.homeFeatureSection),
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

export async function getMysqlCmsContent(): Promise<CmsContent> {
  await ensureMysqlCmsSchema();
  const pool = getPool();

  const [products] = await pool.execute<ProductRow[]>("SELECT * FROM cms_products ORDER BY updated_at DESC, title ASC");
  const [publications] = await pool.execute<PublicationRow[]>("SELECT * FROM cms_publications ORDER BY publication_year DESC, title ASC");
  const [authors] = await pool.execute<AuthorRow[]>("SELECT * FROM cms_authors ORDER BY featured DESC, name ASC");
  const [blogs] = await pool.execute<BlogRow[]>("SELECT * FROM cms_blogs ORDER BY publish_at DESC, title ASC");
  const [testimonials] = await pool.execute<TestimonialRow[]>("SELECT * FROM cms_testimonials ORDER BY updated_at DESC, name ASC");
  const [homeFeatureRows] = await pool.execute<HomeFeatureRow[]>("SELECT * FROM cms_home_feature WHERE id = 1 LIMIT 1");

  return {
    updatedAt: new Date().toISOString(),
    products: products.map(toProduct).sort(sortByIdSuffix),
    publications: publications.map(toPublication).sort(sortByIdSuffix),
    authors: authors.map(toAuthor),
    blogs: blogs.map(toBlog),
    testimonials: testimonials.map(toTestimonial).sort(sortByIdSuffix),
    homeFeatureSection: toHomeFeature(homeFeatureRows[0]),
  };
}

export async function saveMysqlCmsContent(input: CmsContent): Promise<CmsContent> {
  await ensureMysqlCmsSchema();
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    await replaceCmsContent(connection, input);
  } finally {
    connection.release();
  }

  return getMysqlCmsContent();
}
