"use client";

import { Star } from "lucide-react";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/site/section-heading";
import { testimonials as marketingTestimonials } from "@/data/marketing-data";
import type { TestimonialRecord } from "@/lib/cms-content";

type TestimonialsCarouselProps = {
  testimonials?: TestimonialRecord[];
};

const fallbackTestimonials: TestimonialRecord[] = marketingTestimonials.map((testimonial, index) => ({
  id: `fallback-testimonial-${index + 1}`,
  slug: `fallback-testimonial-${index + 1}`,
  name: testimonial.name,
  designation: testimonial.designation,
  review: testimonial.review,
  rating: 5,
  home: true,
  packages: true,
  about: true,
  status: "published",
}));

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const items = (testimonials?.length ? testimonials : fallbackTestimonials).slice(0, 1);

  return (
    <section className="py-24">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Authors Say"
          description="Real experiences from authors who trusted Eagle Leap Publication with their publishing journey."
          centered
        />

        <Carousel opts={{ align: "start", loop: false }} className="mt-12">
          <CarouselContent className="-ml-5">
            {items.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-5 md:basis-1/2 md:pl-0 md:pr-5 md:last:mx-auto md:last:max-w-2xl">
                <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-card">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: Math.max(1, Math.min(5, testimonial.rating || 5)) }).map((_, index) => (
                      <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-lg leading-relaxed text-foreground/85">&ldquo;{testimonial.review}&rdquo;</p>
                  <div className="mt-6 border-t border-border pt-5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-accent/30 bg-accent/10 text-sm font-bold text-accent" aria-hidden="true">
                        {testimonial.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <p className="mx-auto mt-10 max-w-2xl text-center text-base font-semibold text-primary sm:text-lg">
          Every book is different. Our commitment to every author remains the same.
        </p>
      </div>
    </section>
  );
}
