import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { heroImages } from "@/data/marketing-data";

import { Button } from "../ui/button";

const trustPoints = ["Pan-India publishing support", "Editing, ISBN, and design", "Printing and global distribution"];

export function HomeHeroCarousel() {
  return (
    <section className="relative isolate overflow-hidden pt-[4.5rem] lg:pt-20">
      <div className="absolute inset-0 bg-[#07142d]" />
      <Image
        src={heroImages.homeHero}
        alt="Premium publishing banner for Eagle Leap Publication"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center] lg:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,25,0.94)_0%,rgba(6,15,37,0.9)_28%,rgba(6,15,37,0.72)_50%,rgba(6,15,37,0.32)_74%,rgba(6,15,37,0.1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,138,45,0.18),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(114,150,255,0.15),transparent_22%),radial-gradient(circle_at_76%_76%,rgba(255,255,255,0.08),transparent_20%)]" />

      <div className="relative grid min-h-[calc(100vh-4.5rem)] w-full items-center gap-10 px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:min-h-[42rem] lg:grid-cols-[1.02fr_0.98fr] lg:px-16 lg:py-16 xl:px-24 2xl:px-28">
        <div className="max-w-3xl animate-slide-in-left">
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-accent/35 bg-white/10 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-sm sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.26em]">
            <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-glow" />
            A Leading National Book Publishing House in India
          </div>

          <h1 className="mt-7 max-w-[12ch] text-[2.2rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-white [text-shadow:0_10px_40px_rgba(0,0,0,0.42)] sm:max-w-none sm:text-[3rem] md:text-[3.65rem] lg:text-[4.65rem] xl:text-[5.2rem]">
            <span className="block">Publish Your Book</span>
            <span className="block text-gradient-accent">with Eagle Leap Publication</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[0.98rem] font-medium leading-relaxed text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)] sm:text-lg lg:text-xl">
            From Manuscript to Marketplace{" \u2014 "}We handle Writing Support, Editing, ISBN, Book Design, Printing, Publishing, and Global Distribution.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 w-full rounded-2xl bg-accent px-8 text-base font-bold text-accent-foreground shadow-[0_20px_50px_-20px_rgba(255,124,26,0.82)] hover:bg-accent/90 sm:h-16 sm:w-auto sm:text-lg"
            >
              <Link href="/publish-my-book">
                Publish Your Book
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-2xl border-white/30 bg-white/10 px-8 text-base font-bold text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:h-16 sm:w-auto sm:text-lg"
            >
              <Link href="/call-for-paper">Submit your Paper</Link>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {["Books", "Edited Books", "Journals", "ISBN", "Printing", "Distribution"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 bg-white/10 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm sm:px-4 sm:text-[0.76rem]"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {trustPoints.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-medium text-white/[0.88] backdrop-blur-xl"
              >
                <BadgeCheck className="h-4 w-4 shrink-0 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
