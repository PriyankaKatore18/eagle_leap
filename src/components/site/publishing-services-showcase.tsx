import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  BookMarked,
  BookOpenText,
  Boxes,
  Feather,
  FilePenLine,
  Files,
  Globe,
  GraduationCap,
  Megaphone,
  PenTool,
  Printer,
  Sparkles,
  Type,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { serviceCards } from "@/data/site-data";
import { cn } from "@/lib/utils";

type ServiceIconMap = Record<string, LucideIcon>;

const serviceIcons: ServiceIconMap = {
  "Book Publishing": BookOpenText,
  "Editing & Proofreading": FilePenLine,
  "Cover Design": PenTool,
  "Interior Formatting": Type,
  "ISBN & Copyright Support": Award,
  "Premium Book Printing": Printer,
  "Online Distribution": Globe,
  "Edited Book Publication": Files,
  "Journal Publication": BookMarked,
  "Thesis to Book": GraduationCap,
  "Bulk Printing": Boxes,
  "Book Marketing": Megaphone,
};

function InkFeatherDecoration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 360" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="inkAccent" x1="22" y1="10" x2="166" y2="114" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f5b56f" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>

      <path
        d="M22 18C64 4 108 0 166 18C138 26 103 40 72 58C50 71 32 89 19 112"
        stroke="url(#inkAccent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      {Array.from({ length: 10 }).map((_, index) => (
        <path
          key={index}
          d={`M18 ${12 + index * 5}C64 ${index * 1.8 + 6} 112 ${index * 1.2 + 8} 170 ${18 + index * 5}`}
          stroke="#f2c99a"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          opacity={0.44 - index * 0.024}
        />
      ))}

      <path
        d="M95 103C115 94 145 96 174 108C146 132 126 160 112 198C98 238 88 277 73 320C57 292 49 263 50 229C51 180 66 134 95 103Z"
        stroke="#21345f"
        strokeWidth="2.4"
        fill="none"
        opacity="0.78"
      />
      <path d="M150 116C126 154 107 202 84 312" stroke="#21345f" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <path d="M134 131C120 140 107 151 94 167" stroke="#21345f" strokeWidth="1.5" strokeLinecap="round" opacity="0.52" />
      <path d="M140 149C122 165 105 186 90 212" stroke="#21345f" strokeWidth="1.5" strokeLinecap="round" opacity="0.52" />
      <path d="M144 169C124 195 110 222 98 250" stroke="#21345f" strokeWidth="1.5" strokeLinecap="round" opacity="0.52" />
      <path d="M148 194C131 218 118 244 108 273" stroke="#21345f" strokeWidth="1.5" strokeLinecap="round" opacity="0.52" />
      <path d="M141 136C155 149 167 166 175 184" stroke="#21345f" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      <path d="M137 158C153 176 163 196 168 215" stroke="#21345f" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      <path d="M130 182C144 202 153 222 157 244" stroke="#21345f" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />

      <path
        d="M19 272C31 255 54 247 77 252C90 255 101 264 106 280V330H14V292C14 285 16 278 19 272Z"
        fill="none"
        stroke="#21345f"
        strokeWidth="2.2"
        opacity="0.75"
      />
      <path d="M10 330H110" stroke="#21345f" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
      <path d="M29 262C33 279 41 291 53 303" stroke="#21345f" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <path d="M44 257C48 275 56 289 66 300" stroke="#21345f" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function BookStackDecoration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 320" className={className} aria-hidden="true">
      <path
        d="M108 36C142 54 178 78 208 112"
        stroke="#f4c38d"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M130 18C162 34 190 58 214 92"
        stroke="#f4c38d"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.42"
      />

      <path
        d="M36 262L168 240L236 274L106 296L36 262Z"
        fill="none"
        stroke="#21345f"
        strokeWidth="2.3"
        opacity="0.78"
      />
      <path
        d="M48 225L180 203L244 236L114 258L48 225Z"
        fill="none"
        stroke="#21345f"
        strokeWidth="2.3"
        opacity="0.78"
      />
      <path
        d="M62 188L194 166L250 198L120 220L62 188Z"
        fill="none"
        stroke="#21345f"
        strokeWidth="2.3"
        opacity="0.78"
      />
      <path d="M106 296V258" stroke="#21345f" strokeWidth="1.8" opacity="0.58" />
      <path d="M114 258V220" stroke="#21345f" strokeWidth="1.8" opacity="0.58" />
      <path d="M120 220V182" stroke="#21345f" strokeWidth="1.8" opacity="0.58" />
      <path d="M168 240V202" stroke="#21345f" strokeWidth="1.8" opacity="0.58" />
      <path d="M180 203V166" stroke="#21345f" strokeWidth="1.8" opacity="0.58" />
      <path d="M188 165V127" stroke="#21345f" strokeWidth="1.8" opacity="0.58" />

      <path
        d="M178 138C178 90 146 64 116 54C97 47 72 48 54 57L46 181L176 159L178 138Z"
        fill="none"
        stroke="#21345f"
        strokeWidth="2.3"
        opacity="0.78"
      />
      <path d="M53 57C78 69 101 89 116 116C129 139 136 160 139 180" stroke="#21345f" strokeWidth="1.7" opacity="0.5" />
      <path d="M176 158C151 146 128 144 100 148" stroke="#21345f" strokeWidth="1.6" opacity="0.45" />
      <path d="M172 177C145 166 120 164 92 168" stroke="#21345f" strokeWidth="1.6" opacity="0.45" />
    </svg>
  );
}

function ServiceCard({
  description,
  icon: Icon,
  index,
  title,
}: {
  description: string;
  icon: LucideIcon;
  index: number;
  title: string;
}) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[2rem] border border-[#eadfce] bg-white px-5 pb-5 pt-5 shadow-[0_28px_70px_-52px_rgba(15,23,42,0.34)] transition-smooth hover:-translate-y-1.5 hover:shadow-[0_36px_80px_-50px_rgba(15,23,42,0.34)] sm:px-6 sm:pb-6">
      <div className="absolute bottom-5 left-0 top-16 w-[3px] rounded-r-full bg-primary" />

      <span
        className="absolute right-5 top-0 flex h-10 w-11 items-center justify-center bg-accent text-sm font-extrabold text-white shadow-[0_18px_30px_-20px_rgba(249,115,22,0.55)]"
        style={{ clipPath: "polygon(0 0,100% 0,100% 82%,76% 100%,0 100%)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.2rem] bg-primary text-accent shadow-[0_26px_55px_-30px_rgba(15,23,42,0.56)] sm:h-20 sm:w-20 sm:rounded-[1.35rem]">
          <Icon className="h-7 w-7 sm:h-9 sm:w-9" />
        </div>

        <h3 className="mt-5 text-[1.45rem] font-extrabold leading-[1.06] text-primary sm:mt-6 sm:text-[1.7rem] xl:text-[1.95rem]">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{description}</p>

        <div className="mt-5 h-[3px] w-10 rounded-full bg-accent" />
      </div>
    </article>
  );
}

export function PublishingServicesShowcase() {
  const decoratedCards = serviceCards.map((card, index) => ({
    ...card,
    icon: serviceIcons[card.title] ?? BookOpenText,
    index,
  }));

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdfa_0%,#ffffff_52%,#fffaf4_100%)] py-24 sm:py-28">
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,#ffedd5_0%,rgba(255,237,213,0.2)_38%,transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,#dbeafe_0%,rgba(219,234,254,0.18)_34%,transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-14 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#ffedd5_0%,rgba(255,237,213,0.22)_36%,transparent_72%)] blur-3xl" />

      <InkFeatherDecoration className="pointer-events-none absolute left-0 top-4 hidden w-[13rem] xl:block" />
      <BookStackDecoration className="pointer-events-none absolute bottom-28 right-0 hidden w-[14.5rem] xl:block" />

      <div className="pointer-events-none absolute right-16 top-[22rem] hidden h-24 w-24 bg-[radial-gradient(circle,#f1d8bb_1.4px,transparent_1.4px)] [background-size:12px_12px] opacity-60 xl:block" />
      <div className="pointer-events-none absolute left-16 bottom-28 hidden h-28 w-28 bg-[radial-gradient(circle,#f1d8bb_1.4px,transparent_1.4px)] [background-size:12px_12px] opacity-50 xl:block" />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-3 text-accent sm:gap-4">
            <span className="hidden h-px w-16 bg-gradient-to-r from-transparent via-accent/40 to-accent/80 sm:block lg:w-24" />
            <Sparkles className="h-4 w-4 text-[#e6a442]" />
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-accent sm:text-[0.82rem]">Publishing Services</p>
            <Sparkles className="h-4 w-4 text-[#e6a442]" />
            <span className="hidden h-px w-16 bg-gradient-to-l from-transparent via-accent/40 to-accent/80 sm:block lg:w-24" />
          </div>

          <h2 className="mx-auto mt-5 max-w-6xl text-balance font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-primary sm:text-[3rem] lg:text-[4.65rem]">
            <span className="block">Everything an Author</span>
            <span className="block">
              Needs - <span className="text-accent">All in One Place</span>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-slate-500 sm:text-xl">
            From editorial support and design to ISBN, printing, distribution, and marketing, our publishing services
            are built to help every manuscript become a polished, market-ready book.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {decoratedCards.map((card) => (
            <ServiceCard
              key={card.title}
              index={card.index}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="hidden h-px w-20 bg-gradient-to-r from-transparent via-accent/35 to-accent/75 lg:block" />
          <Feather className="hidden h-4 w-4 text-accent lg:block" />
          <Button
            asChild
            className="h-auto rounded-full bg-primary px-2 py-2 text-white shadow-[0_24px_55px_-28px_rgba(15,23,42,0.4)] hover:bg-primary"
          >
            <Link href="/packages" className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full px-4 py-1 pr-2 sm:gap-4 sm:pl-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/8">
                <BookOpenText className="h-5 w-5" />
              </span>
              <span className="text-center font-display text-base font-bold tracking-[-0.03em] sm:text-[1.45rem]">Explore All Packages</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </Button>
          <Feather className="hidden h-4 w-4 text-accent lg:block" />
          <span className="hidden h-px w-20 bg-gradient-to-l from-transparent via-accent/35 to-accent/75 lg:block" />
        </div>
      </div>
    </section>
  );
}
