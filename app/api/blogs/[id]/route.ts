import { NextResponse } from "next/server";

import { createBlogRecordId, ensureBlogRecord } from "@/lib/cms-content";
import { getCmsContent, saveCmsContent } from "@/lib/cms-store";

import { withCorsHeaders } from "../../_lib/cors";
import { parseBlogPayload, type BlogPayload } from "../../_lib/blog-payload";

function json(data: unknown, request: Request, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: withCorsHeaders(request.headers.get("origin"), init?.headers),
  });
}

function isValidBlogBody(body: BlogPayload) {
  return (
    typeof body.title === "string" &&
    body.title.trim().length > 0 &&
    typeof body.excerpt === "string" &&
    body.excerpt.trim().length > 0 &&
    typeof body.content === "string" &&
    body.content.trim().length > 0 &&
    typeof body.featuredImage === "string" &&
    body.featuredImage.trim().length > 0
  );
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: withCorsHeaders(request.headers.get("origin")),
  });
}

export async function PUT(request: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  const { id } = await Promise.resolve(params);
  const body = await parseBlogPayload(request);

  if (!body || !isValidBlogBody(body)) {
    return json({ message: "Blog title, excerpt, content, and featured image are required." }, request, { status: 400 });
  }

  const current = await getCmsContent();

  const nextRecord = ensureBlogRecord({
    id: String(body.id ?? id ?? createBlogRecordId()),
    slug: String(body.slug ?? body.title ?? ""),
    title: String(body.title),
    excerpt: String(body.excerpt),
    content: String(body.content),
    featuredImage: String(body.featuredImage),
    author: typeof body.author === "string" ? body.author : "Editorial Team",
    category: typeof body.category === "string" ? body.category : "Publishing",
    publishAt: typeof body.publishAt === "string" ? body.publishAt : new Date().toISOString().slice(0, 10),
    featured: Boolean(body.featured),
    status: body.status ?? "published",
  });

  const blogs = current.blogs.some((blog) => blog.id === id)
    ? current.blogs.map((blog) => (blog.id === id ? nextRecord : blog))
    : [nextRecord, ...current.blogs];

  const saved = await saveCmsContent({
    ...current,
    blogs,
  });

  return json(saved.blogs.find((blog) => blog.id === nextRecord.id) ?? nextRecord, request);
}

export async function DELETE(request: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  const { id } = await Promise.resolve(params);
  const current = await getCmsContent();
  const blogs = current.blogs.filter((blog) => blog.id !== id);

  const saved = await saveCmsContent({
    ...current,
    blogs,
  });

  return json({ success: true, blogs: saved.blogs }, request);
}
