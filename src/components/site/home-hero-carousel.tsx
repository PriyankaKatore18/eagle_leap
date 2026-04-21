import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { heroImages, homeHeroSlides } from "@/data/marketing-data";

import { Button } from "../ui/button";

const hero = homeHeroSlides[0];
const trustPoints = ["ISO Certified", "Govt. Registered ISBN Agent", "100% Author Royalty"];

export function HomeHeroCarousel() {
  return (
    <section className="relative isolate overflow-hidden pt-[4.5rem] lg:pt-20">
      <div className="absolute inset-0">
        <Image
          src={heroImages.homeHero}
          alt="Bookshelf background for Eagle Leap Publication"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,28,84,0.96)_0%,rgba(14,39,109,0.88)_44%,rgba(15,39,112,0.58)_72%,rgba(215,104,29,0.45)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.06),transparent_20%),radial-gradient(circle_at_88%_72%,rgba(255,138,45,0.26),transparent_24%)]" />
      </div>

      <div className="relative grid min-h-[calc(100vh-4.5rem)] w-full items-center gap-12 px-6 py-10 sm:px-8 md:py-12 lg:min-h-[35rem] lg:grid-cols-[1.02fr_0.98fr] lg:px-16 lg:py-10 xl:px-24 2xl:px-28">
        <div className="max-w-3xl animate-slide-in-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-white/8 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent backdrop-blur-sm sm:text-xs">
            <span className="text-base leading-none">&#9733;</span>
            {hero.badge}
          </div>

          <h1 className="mt-8 max-w-[8.5ch] text-[3rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-white [text-shadow:0_10px_40px_rgba(0,0,0,0.42)] sm:max-w-[10ch] sm:text-[4.15rem] lg:max-w-none lg:text-[4.7rem] xl:text-[5.2rem]">
            {hero.title.map((line, index) => (
              <span key={line} className={`block lg:whitespace-nowrap ${index === hero.accentLine ? "text-accent" : ""}`}>
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed !text-white [text-shadow:0_8px_24px_rgba(0,0,0,0.3)] sm:text-lg lg:text-xl">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-16 rounded-2xl bg-accent px-9 text-lg font-bold text-accent-foreground shadow-[0_20px_50px_-20px_rgba(255,124,26,0.8)] hover:bg-accent/90"
            >
              <Link href={hero.primaryHref}>
                {hero.primaryLabel}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-16 rounded-2xl border-white/35 bg-white/8 px-9 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/16 hover:text-white"
            >
              <Link href={hero.secondaryHref}>{hero.secondaryLabel}</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-base !text-white [text-shadow:0_6px_20px_rgba(0,0,0,0.28)]">
            {trustPoints.map((item) => (
              <div key={item} className="inline-flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="!text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[24rem] w-full max-w-[34rem] animate-slide-in-right items-center justify-center lg:min-h-[31rem] lg:max-w-[36rem]">
          <div className="absolute inset-x-[12%] bottom-10 h-28 rounded-full bg-accent/35 blur-3xl" />
          <div className="absolute right-[10%] top-[6%] h-44 w-44 rounded-full bg-white/12 blur-3xl" />

          <div className="absolute bottom-[2%] left-[20%] right-[2%] z-0 rounded-[1.5rem] border border-white/15 bg-white/10 px-5 py-4 text-white backdrop-blur-md shadow-[0_20px_60px_-28px_rgba(15,23,42,0.85)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{hero.panelEyebrow}</p>
            <p className="mt-3 max-w-[18rem] text-sm font-semibold leading-relaxed text-white">{hero.panelTitle}</p>
            <div className="mt-3 space-y-2 text-sm text-white/88">
              {hero.panelItems.slice(0, 3).map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-accent" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
