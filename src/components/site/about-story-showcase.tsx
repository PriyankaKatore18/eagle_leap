import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChartColumnBig,
  CirclePlay,
  Globe,
  Headset,
  Package,
  PenTool,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OrbitFeature = {
  desktopClassName: string;
  icon: LucideIcon;
  label: string;
};

type MissionFeature = {
  description: string;
  icon: LucideIcon;
  title: string;
};

const orbitFeatures: OrbitFeature[] = [
  {
    desktopClassName: "left-1/2 top-0 -translate-x-1/2",
    icon: PenTool,
    label: "Author First",
  },
  {
    desktopClassName: "left-2 top-24",
    icon: BadgeCheck,
    label: "Quality Focused",
  },
  {
    desktopClassName: "right-0 top-24",
    icon: Globe,
    label: "Global Reach",
  },
  {
    desktopClassName: "left-0 top-[18rem]",
    icon: Headset,
    label: "End-to-End Support",
  },
  {
    desktopClassName: "right-4 top-[18rem]",
    icon: ShieldCheck,
    label: "Transparent Process",
  },
];

const missionFeatures: MissionFeature[] = [
  {
    title: "Comprehensive Services",
    description: "Editing, cover design, ISBN/ISSN support, print production, and global distribution.",
    icon: PenTool,
  },
  {
    title: "Author-First Workflow",
    description: "A smooth, clear, and collaborative process designed around your needs.",
    icon: Users,
  },
  {
    title: "Flexible Publishing Packages",
    description: "From first-time authors to established researchers, we support every stage of your journey.",
    icon: Package,
  },
  {
    title: "Technical Expertise",
    description: "We handle the technical work so you can stay focused on writing and research.",
    icon: Settings2,
  },
  {
    title: "Book Store Access",
    description: "Your work gets the visibility it deserves with access to our exclusive book store.",
    icon: BookOpen,
  },
  {
    title: "Stronger Visibility",
    description: "Helping your work reach readers, institutions, and communities worldwide.",
    icon: ChartColumnBig,
  },
];

function OrbitFeatureBadge({ feature }: { feature: OrbitFeature }) {
  const Icon = feature.icon;

  return (
    <div className={cn("absolute flex w-28 flex-col items-center text-center", feature.desktopClassName)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#f0dcc8] bg-white text-accent shadow-[0_24px_55px_-36px_rgba(249,115,22,0.52)]">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-3 text-sm font-semibold leading-snug text-slate-700">{feature.label}</p>
    </div>
  );
}

function OpenBookIllustration() {
  return (
    <svg viewBox="0 0 960 320" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="aboutBookLeft" x1="168" y1="112" x2="470" y2="232" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffefb" />
          <stop offset="1" stopColor="#f5e7d5" />
        </linearGradient>
        <linearGradient id="aboutBookRight" x1="792" y1="112" x2="490" y2="232" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffefb" />
          <stop offset="1" stopColor="#f5e7d5" />
        </linearGradient>
        <linearGradient id="aboutBookCover" x1="182" y1="214" x2="778" y2="248" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0b1e54" />
          <stop offset="0.48" stopColor="#1a3877" />
          <stop offset="1" stopColor="#0b1e54" />
        </linearGradient>
        <linearGradient id="aboutBookSpine" x1="462" y1="206" x2="498" y2="236" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9a3b" />
          <stop offset="1" stopColor="#f26a11" />
        </linearGradient>
      </defs>

      <ellipse cx="480" cy="272" rx="280" ry="22" fill="rgba(15,23,42,0.08)" />

      <path
        d="M479 132C437 103 361 88 243 89C218 90 198 99 188 116C183 125 180 138 181 154C317 154 422 171 479 213V132Z"
        fill="url(#aboutBookLeft)"
        stroke="#efd8bb"
        strokeWidth="2"
      />
      <path
        d="M481 132C523 103 599 88 717 89C742 90 762 99 772 116C777 125 780 138 779 154C643 154 538 171 481 213V132Z"
        fill="url(#aboutBookRight)"
        stroke="#efd8bb"
        strokeWidth="2"
      />

      {Array.from({ length: 8 }).map((_, index) => (
        <path
          key={`about-book-left-line-${index}`}
          d={`M217 ${128 + index * 10}C289 ${130 + index * 2} 371 ${139 + index * 4} 451 ${173 + index * 4}`}
          stroke="#e1c39f"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.72"
        />
      ))}
      {Array.from({ length: 8 }).map((_, index) => (
        <path
          key={`about-book-right-line-${index}`}
          d={`M743 ${128 + index * 10}C671 ${130 + index * 2} 589 ${139 + index * 4} 509 ${173 + index * 4}`}
          stroke="#e1c39f"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.72"
        />
      ))}

      <path
        d="M184 214C294 196 390 198 480 224C570 198 666 196 776 214L768 231C671 217 575 218 480 243C385 218 289 217 192 231L184 214Z"
        fill="url(#aboutBookCover)"
      />
      <path
        d="M456 210C465 202 495 202 504 210L496 238C489 233 471 233 464 238L456 210Z"
        fill="url(#aboutBookSpine)"
      />
      <path d="M469 214H491" stroke="#ffe1c2" strokeWidth="3" strokeLinecap="round" />
      <path d="M480 132V223" stroke="#ead1b2" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function MissionFeatureItem({ feature, index }: { feature: MissionFeature; index: number }) {
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        "px-6 py-6 sm:px-7",
        index > 0 && "border-t border-slate-100",
        index < 2 && "md:border-t-0",
        index % 2 === 1 && "md:border-l md:border-slate-100",
      )}
    >
      <div className="flex gap-4">
        <div className="mt-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-primary">{feature.title}</h3>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{feature.description}</p>
        </div>
      </div>
    </div>
  );
}

export function AboutStoryShowcase() {
  return (
    <section className="bg-[linear-gradient(180deg,#fffdfa_0%,#ffffff_52%,#f8fbff_100%)] pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pt-36">
      <div className="container-custom">
        <div className="grid gap-12 xl:grid-cols-[1.02fr_1fr] xl:items-center">
          <div className="section-reveal max-w-[40rem]">
            <div className="flex items-center gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-accent sm:text-sm">Who We Are</p>
              <span className="h-px w-16 bg-accent/60" />
            </div>

            <h1 className="mt-6 font-display text-[2.15rem] font-extrabold leading-[1.12] text-primary sm:text-[2.8rem] lg:text-[4rem]">
              <span className="block">A Professional Publishing</span>
              <span className="block">Platform Built for Authors</span>
              <span className="block">
                Who Value <span className="text-accent">Quality</span>, <span className="text-accent">Transparency</span>,
              </span>
              <span className="block">
                and <span className="text-accent">Reach</span>.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl">
              Eagle Leap Publication helps authors, researchers, academicians, and institutions bring manuscripts to
              life through a clear, collaborative publishing journey.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                className="h-auto rounded-full bg-accent px-3 py-3 text-white shadow-[0_24px_50px_-28px_rgba(249,115,22,0.48)] hover:bg-accent/90"
              >
                <Link href="/packages" className="inline-flex w-full items-center justify-center gap-3 rounded-full px-4 py-1 text-base font-semibold sm:w-auto sm:pl-6 sm:pr-3">
                  <span>Explore Our Services</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>

              <Link
                href="#about-mission"
                className="inline-flex items-center gap-3 text-base font-semibold text-primary transition hover:text-accent"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/35 bg-white text-accent shadow-[0_16px_34px_-24px_rgba(249,115,22,0.45)]">
                  <CirclePlay className="h-5 w-5" />
                </span>
                See Our Mission
              </Link>
            </div>
          </div>

          <div className="section-reveal">
            <div className="relative mx-auto flex max-w-[40rem] flex-col items-center rounded-[2.25rem] border border-slate-100 bg-white/85 px-5 pb-6 pt-6 shadow-[0_28px_80px_-54px_rgba(15,23,42,0.28)] lg:border-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:shadow-none">
              <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
                {orbitFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.label}
                      className="flex min-h-[5.75rem] items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-semibold leading-snug text-slate-700">{feature.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="relative mt-6 h-[20rem] w-full sm:h-[24rem] lg:mt-0 lg:h-[34rem]">
                <div className="absolute left-1/2 top-6 h-28 w-28 -translate-x-1/2 rounded-full bg-accent/12 blur-3xl lg:top-28 lg:h-44 lg:w-44" />

                <div className="absolute inset-x-12 top-6 hidden h-[18rem] rounded-full border border-accent/15 lg:block" />
                <div className="absolute inset-x-20 top-14 hidden h-[15rem] rounded-full border border-primary/8 lg:block" />
                <div className="absolute inset-x-28 top-20 hidden h-[12rem] rounded-full border border-accent/10 lg:block" />

                <div className="hidden lg:block">
                  {orbitFeatures.map((feature) => (
                    <OrbitFeatureBadge key={feature.label} feature={feature} />
                  ))}
                </div>

                <div className="absolute left-1/2 top-5 flex h-32 w-32 -translate-x-1/2 items-center justify-center rounded-full border border-[#f1dfcb] bg-white p-4 shadow-[0_28px_72px_-44px_rgba(15,23,42,0.32)] sm:h-36 sm:w-36 lg:top-28 lg:h-44 lg:w-44 lg:p-5">
                  <Image
                    src="/brand/eagle-leap-publication-logo.svg"
                    alt="Eagle Leap Publication"
                    width={156}
                    height={139}
                    className="h-auto w-[6.3rem] sm:w-[6.75rem] lg:w-[8rem]"
                  />
                </div>

                <div className="absolute bottom-0 left-1/2 w-[96%] max-w-[34rem] -translate-x-1/2 sm:w-[88%] lg:w-[90%]">
                  <OpenBookIllustration />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="about-mission"
          className="section-reveal mt-12 overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_28px_80px_-54px_rgba(15,23,42,0.28)]"
        >
          <div className="grid lg:grid-cols-[0.92fr_1.28fr]">
            <div className="border-b border-slate-100 px-6 py-8 sm:px-10 sm:py-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
              <div className="flex items-center gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.36em] text-accent sm:text-sm">Our Mission</p>
                <span className="h-px w-16 bg-accent/60" />
              </div>

              <h2 className="mt-5 font-display text-[1.95rem] font-extrabold leading-[1.14] text-primary sm:text-[2.8rem]">
                Empowering Ideas.
                <br />
                Publishing Excellence.
              </h2>

              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Eagle Leap Publication is a professional publishing and printing platform based in India, dedicated to
                helping independent authors, researchers, and academic institutions turn ideas into polished books and
                journals.
              </p>

              <div className="mt-10">
                <p
                  className="text-[2.35rem] italic leading-none text-primary/75 sm:text-[2.7rem]"
                  style={{ fontFamily: "'Segoe Script', 'Brush Script MT', cursive" }}
                >
                  Eagle Leap Team
                </p>
                <span className="mt-3 block h-[2px] w-28 rounded-full bg-accent/80" />
              </div>
            </div>

            <div className="grid md:grid-cols-2">
              {missionFeatures.map((feature, index) => (
                <MissionFeatureItem key={feature.title} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
