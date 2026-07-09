import book1 from "@/assets/featured-books/featured-book-1.jpg";
import book2 from "@/assets/featured-books/featured-book-2.jpg";
import book3 from "@/assets/featured-books/featured-book-3.jpg";
import book4 from "@/assets/featured-books/featured-book-4.png";
import book5 from "@/assets/featured-books/featured-book-5.jpg";
import book6 from "@/assets/featured-books/featured-book-6.jpg";
import book7 from "@/assets/featured-books/featured-book-7.jpg";

const cmsMediaMap: Record<string, string> = {
  "asset:book-1": book1.src,
  "asset:book-2": book2.src,
  "asset:book-3": book3.src,
  "asset:book-4": book4.src,
  "asset:book-5": book5.src,
  "asset:book-6": book6.src,
  "asset:book-7": book7.src,
};

export const defaultCmsImageSrc = "/banners/home-hero-publishing-ai.png";

export function resolveCmsMediaSrc(value: string) {
  return cmsMediaMap[value] ?? value;
}

export function canRenderCmsImageSrc(value: string) {
  const normalized = value.trim();
  return normalized.startsWith("/") || normalized.startsWith("data:");
}

export function resolveCmsMediaSrcOrFallback(value: string, fallback = defaultCmsImageSrc) {
  const resolved = resolveCmsMediaSrc(value);
  return canRenderCmsImageSrc(resolved) ? resolved : fallback;
}

export const cmsMediaOptions = [
  { label: "Default Book 1", value: "asset:book-1" },
  { label: "Default Book 2", value: "asset:book-2" },
  { label: "Default Book 3", value: "asset:book-3" },
  { label: "Default Book 4", value: "asset:book-4" },
  { label: "Default Book 5", value: "asset:book-5" },
  { label: "Default Book 6", value: "asset:book-6" },
  { label: "Default Book 7", value: "asset:book-7" },
] as const;
