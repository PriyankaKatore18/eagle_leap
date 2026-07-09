import { NextResponse } from "next/server";

import { createRecordId, ensureProductRecord } from "@/lib/cms-content";
import { getCmsContent, saveCmsContent } from "@/lib/cms-store";

import { withCorsHeaders } from "../_lib/cors";
import { parseProductPayload, type ProductPayload } from "../_lib/product-payload";

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

export async function GET(request: Request) {
  const content = await getCmsContent();
  const products = content.products.map((product) => ensureProductRecord(product));
  return json(products, request);
}

export async function POST(request: Request) {
  const body = await parseProductPayload(request);

  if (!body || !isValidProductBody(body)) {
    return json({ message: "Book title, author, category, price, stock, ISBN, year, description, and cover are required." }, request, {
      status: 400,
    });
  }

  const current = await getCmsContent();

  const record = ensureProductRecord({
    id: String(body.id ?? createRecordId("product")),
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

  const products = [record, ...current.products.filter((product) => product.id !== record.id)];
  const saved = await saveCmsContent({
    ...current,
    products,
  });

  return json(saved.products.find((product) => product.id === record.id) ?? record, request, { status: 201 });
}
