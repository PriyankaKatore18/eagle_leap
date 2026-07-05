"use client";

import { Star } from "lucide-react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/site/section-heading";
import { testimonials } from "@/data/site-data";

export function TestimonialsCarousel() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our authors say"
          description="Simple and elegant social proof cards focused on service quality, support, and publishing experience."
          centered
        />

        <Carousel opts={{ align: "start", loop: false }} className="mt-12">
          <div className="mb-6 flex justify-end gap-3">
            <CarouselPrevious className="!static !h-11 !w-11 !translate-x-0 !translate-y-0" />
            <CarouselNext className="!static !h-11 !w-11 !translate-x-0 !translate-y-0" />
          </div>

          <CarouselContent className="-ml-5">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="pl-5 md:basis-1/2 xl:basis-1/3">
                <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-card">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-lg leading-relaxed text-foreground/85">&ldquo;{testimonial.review}&rdquo;</p>
                  <div className="mt-6 border-t border-border pt-5">
                    <p className="font-bold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
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
