import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Printer,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CountUpMetricGrid } from "@/components/site/count-up-metric-grid";
import { CtaBand } from "@/components/site/cta-band";
import { HomeHeroCarousel } from "@/components/site/home-hero-carousel";
import { SiteShell } from "@/components/site/site-shell";
import { PublicationCard } from "@/components/site/publication-card";
import { SectionHeading } from "@/components/site/section-heading";
import {
  currentCallForPaper,
  ecosystemHighlights,
  journalInfo,
  publications,
  publishingProcess,
  serviceCards,
  heroImages,
  siteMetrics,
  testimonials,
  trustItems,
} from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Publish smarter, grow faster, and reach wider with Eagle Leap Publication's book publishing, paper publication, printing, journal, and store ecosystem.",
  path: "/",
});

const serviceIcons = [BookOpen, FileText, Printer, Truck];
const printingIcons = [ScrollText, GraduationCap, BookOpen, Sparkles];
const whyChoose = [
  "Fast & Reliable Publishing",
  "Affordable Packages",
  "Academic & Research Focus",
  "End-to-End Support",
  "Transparent Process",
];

export default function HomePage() {
  return (
    <SiteShell>
      <HomeHeroCarousel />

      <section className="border-y border-border bg-secondary/80">
        <div className="container-custom grid gap-4 py-6 md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm font-semibold text-primary">
              <ShieldCheck className="h-5 w-5 text-accent" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid items-stretch gap-8 lg:grid-cols-[1.04fr_0.96fr]">
          <article className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-8 shadow-card md:p-10 lg:p-12">
            <SectionHeading
              eyebrow="Publishing Ecosystem"
              title="A cleaner corporate presentation for publishing, printing, journals, and store operations."
              description="The website now frames Eagle Leap as a full academic publishing ecosystem instead of just a brochure site, helping visitors trust the process faster."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ecosystemHighlights.map((item) => (
                <div key={item} className="rounded-2xl bg-secondary px-5 py-4 text-sm font-semibold leading-relaxed text-primary">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <CountUpMetricGrid metrics={siteMetrics} className="grid gap-4 sm:grid-cols-2" />
            </div>
          </article>

          <article className="relative h-full min-h-[24rem] overflow-hidden rounded-[2rem] border border-border bg-card shadow-card md:min-h-[27rem] lg:min-h-[30rem]">
            <Image
              src={heroImages.homeEditorial}
              alt="Bookshelves and editorial publishing environment"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,53,0.05)_0%,rgba(8,24,69,0.2)_34%,rgba(8,24,69,0.82)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">Why It Works</p>
              <h2 className="mt-3 max-w-lg font-display text-3xl font-extrabold leading-[1.02] md:text-[2.2rem]">
                Built for authors, researchers, institutions, and distribution partners.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/84 md:text-base">
                A tighter image height and a cleaner editorial crop make this first scroll feel more balanced, premium, and easier to scan.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="What We Offer"
            title="Complete Publishing & Printing Solutions"
            description="A short overview of the core services helping authors, researchers, and institutions move from submission to publication and distribution."
            centered
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((card, index) => {
              const Icon = serviceIcons[index];
              return (
                <div key={card.title} className="rounded-3xl border border-border bg-card p-8 shadow-card hover-lift">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{card.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/packages">View Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Visual Story"
              title="A richer image-led presentation for publishing, research, and printing."
              description="This editorial collage gives the homepage a more premium, inspiration-driven feel while staying focused on the publishing business."
            />
            <Button asChild variant="outline">
              <Link href="/about">Explore Our Story</Link>
            </Button>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="group relative min-h-[34rem] overflow-hidden rounded-[2rem] shadow-elegant">
              <Image
                src={heroImages.homeShowcase}
                alt="Premium reading room and publication display"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,45,0.12)_0%,rgba(10,27,71,0.68)_52%,rgba(9,23,61,0.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Publishing Showcase</p>
                <h3 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight md:text-4xl">
                  Books, brand, and marketplace-ready presentation in one visual story.
                </h3>
                <p className="mt-4 max-w-2xl text-white/80">
                  Designed to make Eagle Leap feel more visual and premium from the first scroll instead of relying only on text blocks.
                </p>
              </div>
            </article>
            <div className="grid gap-6">
              <article className="group relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-border bg-card shadow-card">
                <Image
                  src={heroImages.homeResearch}
                  alt="Library-style research and journal workspace"
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className="object-cover object-[center_18%] transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(12,35,86,0.16)_40%,rgba(9,25,64,0.86)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Research & Journal</p>
                  <h3 className="mt-3 text-2xl font-extrabold">Submission flow, review visibility, and academic trust.</h3>
                </div>
              </article>
              <article className="group relative min-h-[16rem] overflow-hidden rounded-[2rem] shadow-card">
                <Image
                  src={heroImages.homePrinting}
                  alt="Printing and production setup"
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,17,41,0.12)_0%,rgba(11,31,80,0.45)_45%,rgba(10,26,68,0.92)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Printing & Production</p>
                  <h3 className="mt-3 text-2xl font-extrabold">Institution-ready printing, packaging, and delivery support.</h3>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Publishing Process"
            title="Simple & Transparent Publishing Process"
            description="A clean, guided workflow that helps visitors understand exactly how Eagle Leap Publication takes a manuscript or paper toward final publication."
            centered
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-5">
            {publishingProcess.map((step, index) => (
              <div key={step} className="rounded-3xl bg-card p-6 text-center shadow-card">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-xl font-extrabold text-white">
                  {index + 1}
                </div>
                <p className="mt-5 text-lg font-semibold text-primary">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="rounded-[2rem] gradient-brand p-10 text-white shadow-elegant md:p-14">
            <SectionHeading
              eyebrow="Current Call for Paper"
              title="Current Call for Paper"
              description="A dynamic highlight block designed for monthly updates around current edited volumes, deadlines, publication dates, and fees."
              invert
            />
            <div className="mt-10 grid gap-5 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-4">
              <div>
                <p className="text-sm text-white/60">Running Title</p>
                <p className="mt-2 text-xl font-bold">{currentCallForPaper.title}</p>
              </div>
              <div>
                <p className="text-sm text-white/60">Submission Deadline</p>
                <p className="mt-2 text-xl font-bold">{currentCallForPaper.submissionDeadline}</p>
              </div>
              <div>
                <p className="text-sm text-white/60">Publication Date</p>
                <p className="mt-2 text-xl font-bold">{currentCallForPaper.publicationDate}</p>
              </div>
              <div>
                <p className="text-sm text-white/60">Publication Fee</p>
                <p className="mt-2 text-xl font-bold">{currentCallForPaper.publicationFee}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="gradient-accent text-accent-foreground">
                <Link href="/call-for-paper">Submit Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-primary">
                <Link href="/journal">Visit Journal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Featured Publications"
              title="Our Recent Publications"
              description="Recent and featured works to build trust through visibility, authorship, and publication quality."
            />
            <Button asChild variant="outline">
              <Link href="/publications">View All Publications</Link>
            </Button>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {publications.filter((item) => item.featured).slice(0, 3).map((item) => (
              <PublicationCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-10 shadow-card">
            <SectionHeading
              eyebrow="Our Academic Journal"
              title={journalInfo.name}
              description={journalInfo.description}
            />
            <p className="mt-6 text-base font-semibold text-primary">ISSN: {journalInfo.issn}</p>
            <div className="mt-6 rounded-2xl bg-secondary p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Why Researchers Choose It</p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Structured editorial flow, multidisciplinary reach, and cleaner visibility for academic contributors across book chapters, papers, and journal-led publishing.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {journalInfo.features.slice(0, 4).map((feature) => (
                <div key={feature} className="rounded-2xl bg-secondary p-5">
                  <p className="text-base font-semibold text-primary">{feature}</p>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8 self-start gradient-accent text-accent-foreground">
              <Link href="/journal">Visit Journal</Link>
            </Button>
          </div>
          <div className="flex h-full flex-col rounded-[2rem] bg-secondary p-10">
            <SectionHeading
              eyebrow="Printing Solutions"
              title="Printing Solutions"
              description="Preview the institution-friendly printing services available across academic and event requirements."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["ID Card", "College Magazine", "Practical Books", "Momento & Awards"].map((item, index) => {
                const Icon = printingIcons[index];
                return (
                  <div key={item} className="rounded-2xl bg-card p-5 shadow-card">
                    <Icon className="h-8 w-8 text-accent" />
                    <p className="mt-4 font-semibold text-primary">{item}</p>
                  </div>
                );
              })}
            </div>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/printing">Explore Printing</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Authors Trust Eagle Leap Publication"
            description="A concise trust section that reinforces speed, affordability, academic orientation, support, and process transparency."
            centered
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {whyChoose.map((item) => (
              <div key={item} className="rounded-3xl border border-border bg-card p-6 shadow-card">
                <CheckCircle2 className="h-10 w-10 text-accent" />
                <p className="mt-4 text-lg font-semibold text-primary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Authors Say"
            description="Simple and elegant social proof cards focused on service quality, support, and publishing experience."
            centered
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-card">
                <p className="text-lg leading-relaxed text-foreground/85">&quot;{testimonial.review}&quot;</p>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="font-bold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
