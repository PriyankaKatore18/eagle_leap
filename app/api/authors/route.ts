import { NextResponse } from "next/server";

import { createAuthorRecordId, ensureAuthorRecord } from "@/lib/cms-content";
import { getCmsContent, saveCmsContent } from "@/lib/cms-store";

import { withCorsHeaders } from "../_lib/cors";
import { createDefaultAuthorImage, parseAuthorPayload, type AuthorPayload } from "../_lib/author-payload";

function json(data: unknown, request: Request, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: withCorsHeaders(request.headers.get("origin"), init?.headers),
  });
}

function isValidAuthorBody(body: AuthorPayload) {
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.bio === "string" &&
    body.bio.trim().length > 0
  );
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: withCorsHeaders(request.headers.get("origin")),
  });
}

export async function GET(request: Request) {
  const content = await getCmsContent();
  const authors = content.authors.map((author) => ensureAuthorRecord(author));
  return json(authors, request);
}

export async function POST(request: Request) {
  const body = await parseAuthorPayload(request);
  if (!body || !isValidAuthorBody(body)) {
    return json({ message: "Author name and bio are required." }, request, { status: 400 });
  }

  const current = await getCmsContent();

  const record = ensureAuthorRecord({
    id: String(body.id ?? createAuthorRecordId()),
    slug: String(body.slug ?? body.name ?? ""),
    name: String(body.name),
    designation: String(body.designation ?? "Author"),
    bio: String(body.bio),
    image:
      typeof body.image === "string" && body.image.trim().length > 0
        ? body.image
        : createDefaultAuthorImage(String(body.name)),
    website: typeof body.website === "string" ? body.website : undefined,
    featured: Boolean(body.featured),
    status: body.status === "draft" ? "draft" : "published",
  });

  const authors = [record, ...current.authors.filter((author) => author.id !== record.id)];
  const saved = await saveCmsContent({
    ...current,
    authors,
  });

  return json(saved.authors.find((author) => author.id === record.id) ?? record, request, { status: 201 });
}
