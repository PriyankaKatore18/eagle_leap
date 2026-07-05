"use client";

import Link from "next/link";
import { BookOpen, ChevronRight, Sparkles } from "lucide-react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";

const featuredBooks = [
  {
    title: "Manuscript to Marketplace",
    author: "Eagle Leap Editorial Team",
    category: "Publishing Guide",
    summary: "A practical book for authors who want a clear path from first draft to final launch.",
    pages: "216 pages",
    format: "Paperback",
    badge: "Bestseller",
    tone: "from-primary via-primary-glow to-accent",
  },
  {
    title: "The Scholar's Compass",
    author: "Dr. Priya Nair",
    category: "Academic Writing",
    summary: "A research-friendly title that helps scholars structure ideas, citations, and arguments.",
    pages: "184 pages",
    format: "eBook",
    badge: "New Release",
    tone: "from-slate-950 via-blue-900 to-cyan-600",
  },
  {
    title: "Editing for Excellence",
    author: "Ananya Sharma",
    category: "Editing & Proofing",
    summary: "A sharp guide to stronger language, cleaner flow, and confident final manuscripts.",
    pages: "198 pages",
    format: "Paperback",
    badge: "Editor's Pick",
    tone: "from-amber-700 via-orange-500 to-primary",
  },
  {
    title: "ISBN Publishing Blueprint",
    author: "Editorial Desk",
    category: "Publication Setup",
    summary: "How to prepare a book for ISBN registration, distribution readiness, and launch planning.",
    pages: "240 pages",
    format: "Hardcover",
    badge: "Featured",
    tone: "from-primary via-indigo-700 to-fuchsia-500",
  },
  {
    title: "The Cover Design Atelier",
    author: "Rohit Malhotra",
    category: "Design Strategy",
    summary: "A visually rich book about covers, layouts, typography, and first-impression branding.",
    pages: "172 pages",
    format: "Paperback",
    badge: "Design Guide",
    tone: "from-emerald-700 via-teal-600 to-sky-500",
  },
  {
    title: "Thesis to Book",
    author: "Dr. Kavita Rao",
    category: "Academic Conversion",
    summary: "Transform dissertations and research projects into polished books with publication support.",
    pages: "220 pages",
    format: "eBook",
    badge: "Academic",
    tone: "from-violet-800 via-purple-700 to-pink-500",
  },
  {
    title: "Journal Launch Handbook",
    author: "Bodhivruksha Editorial Board",
    category: "Journal Publishing",
    summary: "A compact handbook for launching, managing, and presenting a professional journal brand.",
    pages: "160 pages",
    format: "Paperback",
    badge: "Journal",
    tone: "from-slate-900 via-slate-700 to-orange-500",
  },
  {
    title: "The Distribution Advantage",
    author: "S. B. Goyal",
    category: "Market Reach",
    summary: "Explores how books travel from print-ready files to online platforms and wider readers.",
    pages: "208 pages",
    format: "Hardcover",
    badge: "Popular",
    tone: "from-cyan-800 via-blue-700 to-primary",
  },
  {
    title: "Author Brand Builder",
    author: "Meera Kulkarni",
    category: "Marketing",
    summary: "A modern author branding guide covering launches, audience trust, and digital presence.",
    pages: "190 pages",
    format: "Paperback",
    badge: "Launch",
    tone: "from-rose-700 via-pink-600 to-orange-500",
  },
  {
    title: "Research to Recognition",
    author: "Prof. Sandeep Iyer",
    category: "Research Publishing",
    summary: "A roadmap for researchers who want visibility, publication quality, and credible output.",
    pages: "232 pages",
    format: "eBook",
    badge: "Academic",
    tone: "from-blue-950 via-indigo-800 to-primary",
  },
  {
    title: "The Print-Ready Manuscript",
    author: "Editorial Studio",
    category: "Production",
    summary: "A production-focused title covering layout preparation, proofing, and print decisions.",
    pages: "176 pages",
    format: "Paperback",
    badge: "Production",
    tone: "from-stone-900 via-zinc-700 to-slate-500",
  },
  {
    title: "Pages of Promise",
    author: "Kavita Joshi",
    category: "Literary Fiction",
    summary: "A warm, reflective book example that adds a creative, reader-friendly note to the carousel.",
    pages: "264 pages",
    format: "Hardcover",
    badge: "Staff Pick",
    tone: "from-purple-900 via-fuchsia-700 to-amber-500",
  },
] as const;

export function FeaturedBooksCarousel() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="container-custom">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured Books"
            title="Discover our latest bestselling publications"
            description="A carousel showcase of sample titles that can represent your homepage featured books with a clean, premium presentation."
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/store">
              View All Books
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Carousel opts={{ align: "start", loop: false }} className="mt-12">
          <div className="mb-6 flex justify-end gap-3">
            <CarouselPrevious className="!static !h-11 !w-11 !translate-x-0 !translate-y-0" />
            <CarouselNext className="!static !h-11 !w-11 !translate-x-0 !translate-y-0" />
          </div>
          <CarouselContent className="-ml-5">
            {featuredBooks.map((book) => (
              <CarouselItem key={book.title} className="pl-5 md:basis-1/2 xl:basis-1/3 2xl:basis-1/4">
                <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant">
                  <div className={`relative overflow-hidden bg-gradient-to-br ${book.tone} p-5 text-white`}>
                    <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.85),transparent_18%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.35),transparent_18%),radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.12),transparent_30%)]" />
                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-black/10 blur-2xl" />
                    <div className="relative flex aspect-[4/5] flex-col justify-between rounded-[1.6rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                          {book.badge}
                        </span>
                        <BookOpen className="h-5 w-5 text-white/90" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">{book.category}</p>
                        <h3 className="mt-3 text-3xl font-extrabold leading-[1.02] text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)]">
                          {book.title}
                        </h3>
                        <p className="mt-3 text-sm font-medium text-white/85">{book.author}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">{book.summary}</p>

                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl bg-secondary px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Format</p>
                        <p className="mt-1 font-semibold text-primary">{book.format}</p>
                      </div>
                      <div className="rounded-2xl bg-secondary px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Length</p>
                        <p className="mt-1 font-semibold text-primary">{book.pages}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                        <Sparkles className="h-4 w-4" />
                        Featured Title
                      </span>
                      <Button asChild className="gradient-accent text-accent-foreground">
                        <Link href="/store">
                          View Details
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
