import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import book4 from "@/assets/book-4.jpg";

const cmsMediaMap: Record<string, string> = {
  "asset:book-1": book1.src,
  "asset:book-2": book2.src,
  "asset:book-3": book3.src,
  "asset:book-4": book4.src,
};

export function resolveCmsMediaSrc(value: string) {
  return cmsMediaMap[value] ?? value;
}

export const cmsMediaOptions = [
  { label: "Default Book 1", value: "asset:book-1" },
  { label: "Default Book 2", value: "asset:book-2" },
  { label: "Default Book 3", value: "asset:book-3" },
  { label: "Default Book 4", value: "asset:book-4" },
] as const;
