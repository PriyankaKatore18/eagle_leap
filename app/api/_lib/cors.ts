const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5175",
]);

export function getCorsHeaders(origin: string | null) {
  const headers = new Headers();

  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Vary", "Origin");
  }

  headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return headers;
}

export function withCorsHeaders(origin: string | null, init: HeadersInit = {}) {
  const headers = new Headers(init);
  const corsHeaders = getCorsHeaders(origin);

  corsHeaders.forEach((value, key) => {
    headers.set(key, value);
  });

  return headers;
}
