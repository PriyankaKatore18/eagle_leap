import { NextResponse } from "next/server";

import { createRecordId, ensureProductRecord } from "@/lib/cms-content";
import { getCmsContent, saveCmsContent } from "@/lib/cms-store";

import { withCorsHeaders } from "../../_lib/cors";
import { parseProductPayload, type ProductPayload } from "../../_lib/product-payload";

function json(data: unknown, request: Request, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: withCorsHeaders(request.headers.get("origin"), init?.headers),
  });
}

function isValidProductBody(body: ProductPayload) {
  return (
    typeof body.title === "string" &&
    body.title.trim().length > 0 &&
    typeof body.author === "string" &&
    body.author.trim().length > 0 &&
    typeof body.category === "string" &&
    body.category.trim().length > 0 &&
    typeof body.price === "string" &&
    body.price.trim().length > 0 &&
    typeof body.stock === "string" &&
    body.stock.trim().length > 0 &&
    typeof body.isbn === "string" &&
    body.isbn.trim().length > 0 &&
    typeof body.year === "string" &&
    body.year.trim().length > 0 &&
    typeof body.description === "string" &&
    body.description.trim().length > 0 &&
    typeof body.cover === "string" &&
    body.cover.trim().length > 0
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
  const body = await parseProductPayload(request);

  if (!body || !isValidProductBody(body)) {
    return json({ message: "Book title, author, category, price, stock, ISBN, year, description, and cover are required." }, request, {
      status: 400,
    });
  }

  const current = await getCmsContent();

  const nextRecord = ensureProductRecord({
    id: String(body.id ?? id ?? createRecordId("product")),
    slug: String(body.slug ?? body.title ?? ""),
    title: String(body.title),
    author: String(body.author),
    category: String(body.category),
    format: body.format === "Ebook" || body.format === "Hard Copy" ? body.format : "Both",
    price: String(body.price),
    offerPrice: body.offerPrice ? String(body.offerPrice) : undefined,
    stock: String(body.stock),
    isbn: String(body.isbn),
    year: String(body.year),
    description: String(body.description),
    cover: String(body.cover),
    featured: Boolean(body.featured),
    newArrival: Boolean(body.newArrival),
    popular: Boolean(body.popular),
    status: body.status ?? "active",
  });

  const products = current.products.some((product) => product.id === id)
    ? current.products.map((product) => (product.id === id ? nextRecord : product))
    : [nextRecord, ...current.products];

  const saved = await saveCmsContent({
    ...current,
    products,
  });

  return json(saved.products.find((product) => product.id === nextRecord.id) ?? nextRecord, request);
}

export async function DELETE(request: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  const { id } = await Promise.resolve(params);
  const current = await getCmsContent();
  const products = current.products.filter((product) => product.id !== id);

  const saved = await saveCmsContent({
    ...current,
    products,
  });

  return json({ success: true, products: saved.products }, request);
}
