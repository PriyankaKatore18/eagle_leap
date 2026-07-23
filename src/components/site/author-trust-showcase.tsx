import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Feather,
  Handshake,
  Headset,
  LibraryBig,
  MapPinned,
  PenTool,
  Printer,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TrustFeature = {
  description: string;
  icon: LucideIcon;
  id: string;
  number: string;
  titleLines: [string, string];
  watermark: LucideIcon;
};

const trustFeatures: TrustFeature[] = [
  {
    id: "end-to-end-publishing",
    number: "01",
    titleLines: ["End-to-End", "Publishing"],
    description: "From manuscript submission to final publication, we manage every stage of the publishing process.",
    icon: BookOpen,
    watermark: Feather,
  },
  {
    id: "professional-book-design",
    number: "02",
    titleLines: ["Professional", "Book Design"],
    description: "Eye-catching cover designs and clean interior layouts that meet modern publishing standards.",
    icon: PenTool,
    watermark: LibraryBig,
  },
  {
    id: "official-isbn-registration",
    number: "03",
    titleLines: ["Official ISBN", "Registration"],
    description: "Complete support for ISBN allocation, barcode generation, and publication documentation.",
    icon: ShieldCheck,
    watermark: BookMarked,
  },
  {
    id: "premium-quality-printing",
    number: "04",
    titleLines: ["Premium Quality", "Printing"],
    description: "High-quality paperback and hardcover printing with durable materials and professional finishing.",
    icon: Printer,
    watermark: BookMarked,
  },
  {
    id: "nationwide-distribution",
    number: "05",
    titleLines: ["Nationwide", "Distribution"],
    description: "Reach readers across India through Amazon, Flipkart, and direct distribution channels.",
    icon: Truck,
    watermark: MapPinned,
  },
  {
    id: "dedicated-author-support",
    number: "06",
    titleLines: ["Dedicated Author", "Support"],
    description: "A dedicated team to guide you throughout the publishing journey and answer your questions.",
    icon: Headset,
    watermark: Handshake,
  },
];

function PaperSheet({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute hidden h-28 w-24 rounded-[1.55rem] border border-[#edd8c0] bg-white shadow-[0_28px_55px_-38px_rgba(15,23,42,0.28)] xl:block",
        className,
      )}
    >
      <div className="mx-auto mt-5 h-1.5 w-10 rounded-full bg-[#f3dfc8]" />
      <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#efe8de]" />
      <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[#efe8de]" />
      <div className="mx-auto mt-2 h-1 w-11 rounded-full bg-[#efe8de]" />
      <div className="mx-auto mt-2 h-1 w-14 rounded-full bg-[#efe8de]" />
    </div>
  );
}

function OpenBookIllustration() {
  return (
    <svg viewBox="0 0 960 320" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="pageLeft" x1="168" y1="112" x2="470" y2="232" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffefb" />
          <stop offset="1" stopColor="#f5e7d5" />
        </linearGradient>
        <linearGradient id="pageRight" x1="792" y1="112" x2="490" y2="232" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffefb" />
          <stop offset="1" stopColor="#f5e7d5" />
        </linearGradient>
        <linearGradient id="cover" x1="182" y1="214" x2="778" y2="248" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0b1e54" />
          <stop offset="0.48" stopColor="#1a3877" />
          <stop offset="1" stopColor="#0b1e54" />
        </linearGradient>
        <linearGradient id="spine" x1="462" y1="206" x2="498" y2="236" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9a3b" />
          <stop offset="1" stopColor="#f26a11" />
        </linearGradient>
      </defs>

      <ellipse cx="480" cy="272" rx="280" ry="22" fill="rgba(15,23,42,0.08)" />

      <path
        d="M479 132C437 103 361 88 243 89C218 90 198 99 188 116C183 125 180 138 181 154C317 154 422 171 479 213V132Z"
        fill="url(#pageLeft)"
        stroke="#efd8bb"
        strokeWidth="2"
      />
      <path
        d="M481 132C523 103 599 88 717 89C742 90 762 99 772 116C777 125 780 138 779 154C643 154 538 171 481 213V132Z"
        fill="url(#pageRight)"
        stroke="#efd8bb"
        strokeWidth="2"
      />

      {Array.from({ length: 8 }).map((_, index) => (
        <path
          key={`left-line-${index}`}
          d={`M217 ${128 + index * 10}C289 ${130 + index * 2} 371 ${139 + index * 4} 451 ${173 + index * 4}`}
          stroke="#e1c39f"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.72"
        />
      ))}
      {Array.from({ length: 8 }).map((_, index) => (
        <path
          key={`right-line-${index}`}
          d={`M743 ${128 + index * 10}C671 ${130 + index * 2} 589 ${139 + index * 4} 509 ${173 + index * 4}`}
          stroke="#e1c39f"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.72"
        />
      ))}

      <path
        d="M184 214C294 196 390 198 480 224C570 198 666 196 776 214L768 231C671 217 575 218 480 243C385 218 289 217 192 231L184 214Z"
        fill="url(#cover)"
      />
      <path d="M456 210C465 202 495 202 504 210L496 238C489 233 471 233 464 238L456 210Z" fill="url(#spine)" />
      <path d="M469 214H491" stroke="#ffe1c2" strokeWidth="3" strokeLinecap="round" />
      <path d="M480 132V223" stroke="#ead1b2" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function TrustCard({ feature, featured }: { feature: TrustFeature; featured?: boolean }) {
  const Icon = feature.icon;
  const Watermark = feature.watermark;

  return (
    <article
      className={cn(
        "relative min-h-[15.5rem] overflow-hidden rounded-[2rem] border px-6 py-6 shadow-[0_22px_60px_-38px_rgba(15,23,42,0.28)] sm:min-h-[17.25rem] sm:px-8 sm:py-8",
        featured
          ? "border-accent/45 bg-primary text-white after:absolute after:-bottom-4 after:left-1/2 after:h-8 after:w-16 after:-translate-x-1/2 after:rounded-b-full after:bg-primary after:content-[''] lg:-translate-y-5"
          : "border-slate-200 bg-white text-primary",
      )}
    >
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-[#fff8f1] text-accent shadow-[0_22px_40px_-28px_rgba(249,115,22,0.5)] sm:h-20 sm:w-20">
        <Icon className="h-7 w-7 sm:h-9 sm:w-9" />
      </div>

      <span
        className={cn(
          "absolute right-6 top-5 font-display text-[3.85rem] leading-none tracking-[-0.06em] sm:right-8 sm:text-[4.5rem]",
          featured ? "text-white/16" : "text-primary/14",
        )}
      >
        {feature.number}
      </span>

      <div className="relative z-10 mt-6 max-w-[18rem]">
        <h3 className={cn("font-display text-[1.55rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-[2rem]", featured ? "text-white" : "text-primary")}>
          <span className="block">{feature.titleLines[0]}</span>
          <span className="block">{feature.titleLines[1]}</span>
        </h3>

        <div className="mt-5 h-[3px] w-14 rounded-full bg-accent" />

        <p className={cn("mt-5 text-[0.98rem] leading-7 sm:text-[1.05rem] sm:leading-8", featured ? "text-white/84" : "text-slate-600")}>{feature.description}</p>
      </div>

      <Watermark
        aria-hidden="true"
        className={cn(
          "absolute bottom-5 right-5 h-24 w-24 sm:bottom-6 sm:right-6 sm:h-28 sm:w-28",
          featured ? "text-white/12" : "text-primary/10",
        )}
      />
    </article>
  );
}

export function AuthorTrustShowcase() {
  return (
    <section className="bg-background py-24 sm:py-28">
      <div className="container-custom">
        <div className="mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-3 text-accent sm:gap-4">
            <span className="hidden h-px w-16 bg-gradient-to-r from-transparent via-accent/40 to-accent/80 sm:block lg:w-28" />
            <Feather className="h-5 w-5 text-primary/80" />
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-accent sm:text-[0.82rem]">Why Authors Trust Us</p>
            <span className="hidden h-px w-16 bg-gradient-to-l from-transparent via-accent/40 to-accent/80 sm:block lg:w-28" />
          </div>

          <h2 className="mx-auto mt-5 max-w-5xl text-balance font-display text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.04em] text-primary sm:text-[3rem] lg:text-[4.6rem]">
            <span className="block">A publishing partner built around</span>
            <span className="mt-1 block">
              <span className="font-serif italic text-accent">quality</span>
              <span className="text-primary">, </span>
              <span className="font-serif italic text-accent">clarity</span>
              <span className="text-primary">, and </span>
              <span className="font-serif italic text-accent">support</span>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-xl">
            We combine editorial care, premium design, quality printing, ISBN support, and dependable communication to
            help authors publish with confidence.
          </p>
        </div>

        <div className="relative mx-auto mt-10 hidden h-48 w-full max-w-[48rem] md:block lg:h-56">
          <PaperSheet className="left-0 top-3 -rotate-[16deg]" />
          <PaperSheet className="right-4 top-2 rotate-[16deg]" />
          <OpenBookIllustration />
        </div>

        <div className="relative z-10 mt-8 grid gap-6 lg:grid-cols-3 xl:-mt-1">
          <TrustCard feature={trustFeatures[0]} />
          <TrustCard feature={trustFeatures[1]} featured />
          <TrustCard feature={trustFeatures[2]} />
          <TrustCard feature={trustFeatures[3]} />
          <TrustCard feature={trustFeatures[4]} />
          <TrustCard feature={trustFeatures[5]} />
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 lg:mt-16">
          <span className="hidden h-px w-24 bg-gradient-to-r from-transparent via-accent/35 to-accent/75 lg:block" />
          <Feather className="hidden h-4 w-4 text-accent lg:block" />
          <Button
            asChild
            className="h-auto rounded-full bg-primary px-2 py-2 text-white shadow-[0_24px_55px_-28px_rgba(15,23,42,0.4)] hover:bg-primary"
          >
            <Link href="/publish-my-book" className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full px-4 py-1 pr-2 sm:gap-4 sm:pl-8">
              <span className="text-center font-display text-base font-bold tracking-[-0.03em] sm:text-[1.5rem]">Let&apos;s Publish Your Book</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </Button>
          <Feather className="hidden h-4 w-4 text-accent lg:block" />
          <span className="hidden h-px w-24 bg-gradient-to-l from-transparent via-accent/35 to-accent/75 lg:block" />
        </div>
      </div>
    </section>
  );
}
