"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/site/section-heading";
import type { ProductRecord } from "@/data/catalog-data";
import { resolveCmsMediaSrc } from "@/lib/cms-media";
import featuredBook1 from "@/assets/featured-books/featured-book-1.jpg";
import featuredBook2 from "@/assets/featured-books/featured-book-2.jpg";
import featuredBook3 from "@/assets/featured-books/featured-book-3.jpg";
import featuredBook4 from "@/assets/featured-books/featured-book-4.png";
import featuredBook5 from "@/assets/featured-books/featured-book-5.jpg";
import featuredBook6 from "@/assets/featured-books/featured-book-6.jpg";
import featuredBook7 from "@/assets/featured-books/featured-book-7.jpg";

type FeaturedBook = {
  title: string;
  cover: string | StaticImageData;
  description: string;
};

const staticFeaturedBooks = [
  {
    title: "Banking and Insurance Service",
    cover: featuredBook1,
    description: "A commerce-friendly title covering financial systems, insurance essentials, and applied business concepts.",
  },
  {
    title: "The War Over Words",
    cover: featuredBook2,
    description: "An eye-catching cover for a critical read on language, conflict, and the power of public debate.",
  },
  {
    title: "Management Dynamics - II",
    cover: featuredBook3,
    description: "A structured academic title focused on managerial principles, leadership, and organization.",
  },
  {
    title: "Manures and Organic Farming",
    cover: featuredBook4,
    description: "A practical book on soil health, compost methods, and sustainable farming practices.",
  },
  {
    title: "Basics of Electrical and Electronics Engineering",
    cover: featuredBook5,
    description: "An introductory engineering resource covering circuits, components, and core technical foundations.",
  },
  {
    title: "Fundamentals of Financial Accounting",
    cover: featuredBook6,
    description: "A clear guide to bookkeeping, financial statements, and essential accounting principles.",
  },
  {
    title: "The Meaning We Withhold: Terrorism, Crisis, and the Cost of Ambiguity",
    cover: featuredBook7,
    description: "A strategic studies book examining terrorism, ambiguity, and the cost of crisis-driven silence.",
  },
] as const satisfies ReadonlyArray<FeaturedBook>;

export function FeaturedBooksCarousel({ books = [] }: { books?: ProductRecord[] }) {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);
  const featuredBooks: FeaturedBook[] = books.length
    ? books.map((book) => ({
        title: book.title,
        cover: resolveCmsMediaSrc(book.cover),
        description: book.description,
      }))
    : [...staticFeaturedBooks];

  React.useEffect(() => {
    if (!carouselApi || typeof window === "undefined") {
      return;
    }

    const interval = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 3500);

    return () => window.clearInterval(interval);
  }, [carouselApi]);

  return (
    <section className="bg-secondary/40 py-24">
      <div className="container-custom">
        <SectionHeading
          centered
          eyebrow="Featured Books"
          title="Selected covers from recent publications"
          description="A rotating showcase of seven book covers from our latest titles."
        />

        <Carousel opts={{ align: "start", loop: true }} setApi={setCarouselApi} className="mt-12">
          <CarouselContent className="-ml-5">
            {featuredBooks.map((book, index) => (
              <CarouselItem key={book.title} className="pl-5 basis-[82%] sm:basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
                <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card p-3 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-white">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 768px) 33vw, 80vw"
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-center px-1 pb-1 pt-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Featured Book</p>
                    <h3 className="mt-2 text-[1.08rem] font-bold leading-snug text-primary">{book.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{book.description}</p>
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
