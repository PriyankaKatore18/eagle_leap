import Link from "next/link";
import { BookOpen, FileText, Printer, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FeaturedBooksCarousel } from "@/components/site/featured-books-carousel";
import { HomeCounterBar } from "@/components/site/home-counter-bar";
import { HomeHeroCarousel } from "@/components/site/home-hero-carousel";
import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { serviceCards } from "@/data/site-data";
import { TestimonialsCarousel } from "@/components/site/testimonials-carousel";
import { getCmsContent } from "@/lib/cms-store";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Publish smarter, grow faster, and reach wider with Eagle Leap Publication's book publishing, paper publication, printing, journal, and store ecosystem.",
  path: "/",
});

const whyTrustItems = [
  {
    title: "End-to-End Publishing",
    description: "From manuscript submission to final publication, we manage every stage of the publishing process.",
    icon: BookOpen,
  },
  {
    title: "Professional Book Design",
    description: "Eye-catching cover designs and clean interior layouts that meet modern publishing standards.",
    icon: Sparkles,
  },
  {
    title: "Official ISBN Registration",
    description: "Complete support for ISBN allocation, barcode generation, and publication documentation.",
    icon: ShieldCheck,
  },
  {
    title: "Premium Quality Printing",
    description: "High-quality paperback and hardcover printing with durable materials and professional finishing.",
    icon: Printer,
  },
  {
    title: "Nationwide Distribution",
    description: "Reach readers across India through Amazon, Flipkart, and direct distribution channels.",
    icon: Truck,
  },
  {
    title: "Dedicated Author Support",
    description: "A dedicated team to guide you throughout the publishing journey and answer your questions.",
    icon: FileText,
  },
];

const publishingJourney = [
  {
    title: "Submit Your Manuscript",
    description: "Upload your completed manuscript securely through our guided submission flow.",
  },
  {
    title: "Editing & Proofreading",
    description: "Professional editors polish language, structure, and readability for a polished finish.",
  },
  {
    title: "Cover Design & Formatting",
    description: "We create a strong cover and a clean interior layout aligned with your subject.",
  },
  {
    title: "ISBN & Publishing",
    description: "ISBN registration, production coordination, and final publishing approvals are handled for you.",
  },
  {
    title: "Global Distribution",
    description: "Your book is prepared for wider reach through online and direct distribution channels.",
  },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getCmsContent();
  const books = content.products.filter((product) => product.status !== "draft" && product.status !== "archived");
  const testimonials = content.testimonials.filter((testimonial) => testimonial.status === "published" && testimonial.home !== false);

  return (
    <SiteShell>
      <HomeHeroCarousel />

      <HomeCounterBar />

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Authors Trust Us"
            title="A publishing partner built around quality, clarity, and support"
            description="We combine editorial care, premium design, quality printing, ISBN support, and dependable communication to help authors publish with confidence."
            centered
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whyTrustItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="card-reveal rounded-3xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FeaturedBooksCarousel books={books} />

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Publishing Services"
            title="Everything an Author Needs - All in One Place"
            description="From editorial support and design to ISBN, printing, distribution, and marketing, our publishing services are built to help every manuscript become a polished, market-ready book."
            centered
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((card, index) => (
              <article key={card.title} className="rounded-3xl border border-border bg-card p-6 shadow-card hover-lift">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-lg font-extrabold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Included</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-primary">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/packages">Explore Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Publishing Process"
            title="Your Publishing Journey in 5 Simple Steps"
            description="From manuscript to marketplace - we guide you every step."
            centered
          />

          <div className="relative mt-12">
            <div className="absolute inset-y-0 left-1/2 hidden w-[3px] -translate-x-1/2 rounded-full bg-slate-900/35 shadow-[0_0_0_1px_rgba(15,23,42,0.08)] lg:block" />
            <div className="space-y-6">
              {publishingJourney.map((step, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div key={step.title} className="grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)]">
                    <article
                      className={`rounded-[2rem] border border-border bg-card p-5 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant sm:p-6 ${
                        isLeft ? "lg:col-start-1 lg:justify-self-end lg:max-w-xl" : "lg:col-start-3 lg:justify-self-start lg:max-w-xl"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-white shadow-glow">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Publishing Step</p>
                      </div>
                      <h3 className="mt-4 text-[1.45rem] font-bold leading-[1.18] text-primary">{step.title}</h3>
                      <p className="mt-2.5 text-[0.98rem] leading-relaxed text-muted-foreground">{step.description}</p>
                    </article>

                    <div className="relative z-10 flex justify-center lg:col-start-2">
                      <div className="hidden h-4 w-4 rounded-full border-4 border-white bg-accent shadow-glow lg:block" />
                    </div>

                    <div className="hidden lg:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsCarousel testimonials={testimonials} />

      <CtaBand
        title="Ready to Publish Your Work?"
        subtitle="Take the next step in your publishing journey with us."
        primaryLabel="Publish Your Book"
        primaryHref="/publish-my-book"
        secondaryLabel="Submit Paper"
        secondaryHref="/call-for-paper"
      />
    </SiteShell>
  );
}
