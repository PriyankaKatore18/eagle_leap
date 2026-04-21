import Image from "next/image";
import Link from "next/link";
import { BookText, CheckCircle2, Target, Telescope } from "lucide-react";

import { CountUpMetricGrid } from "@/components/site/count-up-metric-grid";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { blogPosts, founderProfiles, heroImages, siteMetrics } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Eagle Leap Publication, our mission, vision, journey, founders, and our academic-focused publishing and printing ecosystem.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        title="About Eagle Leap Publication"
        subtitle="Empowering authors, researchers, and institutions through professional ISBN book publishing and ISSN journal publication, along with complete printing and distribution solutions."
        breadcrumbs={[{ label: "About Us" }]}
        backgroundSrc={heroImages.aboutHero}
        backgroundAlt="Eagle Leap team and publishing collaboration"
      />

      <section className="py-24">
        <div className="container-custom grid items-stretch gap-8 lg:grid-cols-[1.04fr_0.96fr]">
          <article className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-8 shadow-card md:p-10 lg:p-12">
            <SectionHeading
              eyebrow="Who We Are"
              title="A professional publishing and printing platform built to simplify the journey."
              description="Eagle Leap Publication is a professional publishing and printing platform based in India, dedicated to supporting authors, researchers, academicians, and institutions in bringing their ideas to life."
            />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We specialize in ISBN-based book and research publication as well as ISSN journal publishing, along with
              printing services and distribution across major platforms such as Amazon and Flipkart. Our goal is to
              simplify the publishing journey and provide complete support from manuscript submission to final
              publication and distribution.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "ISBN and ISSN publication guidance",
                "Printing and marketplace distribution support",
                "Academic, institutional, and author-first workflows",
                "Professional support from submission to final release",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-secondary px-5 py-4 text-sm font-semibold leading-relaxed text-primary">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-card">
            <div className="relative min-h-[24rem] flex-1">
              <Image
                src={heroImages.aboutFeature}
                alt="Publishing team collaborating over books and academic content"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,69,0.08)_0%,rgba(9,26,71,0.26)_34%,rgba(8,24,69,0.82)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">Academic Publishing Identity</p>
                <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold leading-[1.14] md:text-[2.35rem]">
                  A stronger visual story for trust, leadership, and academic credibility.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/82">
                  The About page now presents Eagle Leap as a credible publishing brand with a clearer academic and professional identity.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          <CountUpMetricGrid metrics={siteMetrics} />
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom grid gap-6 lg:grid-cols-2">
          <div className="card-reveal h-full rounded-3xl bg-card p-10 shadow-card">
            <Target className="h-12 w-12 text-accent" />
            <h2 className="mt-6 text-3xl font-extrabold leading-[1.14] text-primary">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              At Eagle Leap Publication, our mission is to simplify and professionalize the publishing process for
              authors, researchers, academicians, and institutions across India. We are committed to providing
              structured and reliable ISBN-based book publication and ISSN journal publication services that enable
              individuals to share their knowledge, research, and creative work with a wider audience.
            </p>
          </div>
          <div className="card-reveal h-full rounded-3xl bg-card p-10 shadow-card">
            <Telescope className="h-12 w-12 text-accent" />
            <h2 className="mt-6 text-3xl font-extrabold leading-[1.14] text-primary">Our Vision</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our vision is to establish Eagle Leap Publication as a trusted and recognized name in the field of
              academic and professional publishing in India. We aspire to build a comprehensive ecosystem that supports
              both book publishing and journal publishing while encouraging innovation, research excellence, and
              knowledge sharing across disciplines.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid gap-12 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="What We Do" title="Publishing, journal, printing, and distribution support in one ecosystem." />
            <div className="mt-8 space-y-4">
              {[
                "Book Publishing (ISBN)",
                "Research Paper / Chapter / Article Publication (ISBN)",
                "Journal Publication (ISSN)",
                "Printing Services for Institutions",
                "Book Distribution & Online Listing",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-secondary px-5 py-4 text-primary">
                  <BookText className="h-5 w-5 text-accent" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Why Choose Us" title="Why Choose Eagle Leap Publication" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Expertise in ISBN & ISSN Publications",
                "Fast & Reliable Publishing Process",
                "Affordable and Transparent Pricing",
                "Academic & Research-Oriented Approach",
                "End-to-End Support (Publishing to Distribution)",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                  <p className="mt-4 font-semibold text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl bg-card p-10 shadow-card">
            <SectionHeading eyebrow="Our Journey" title="Built on decades of printing strength and expanded into publishing in 2021." />
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Eagle Leap Publication began its journey with a clear vision to simplify the publishing process and make
              it accessible for authors, researchers, and institutions across India. Our roots are strongly built in
              the printing industry, where we have been delivering reliable and high-quality printing services for the
              past 23-24 years.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Building on this strong foundation, we expanded into the field of publishing in 2021, focusing on
              ISBN-based book publication and research paper and edited volume publication. With growing demand and
              trust, we further extended our services into ISSN journal publication, creating a comprehensive academic
              publishing platform.
            </p>
          </div>
          <div className="rounded-3xl gradient-brand p-10 text-white shadow-elegant">
            <SectionHeading eyebrow="Founder & Leadership" title="Leadership committed to a stronger academic publishing ecosystem." invert />
            <div className="mt-8 space-y-5">
              {founderProfiles.map((founder) => (
                <div key={founder.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-bold">{founder.name}</h3>
                  <p className="mt-3 text-white/80">{founder.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Latest Insights & Publishing Knowledge"
              title="Expert insights on book publishing, ISBN & ISSN processes, research writing, and printing solutions."
            />
            <Link href="/blog" className="text-sm font-semibold text-accent">
              View All Insights
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="rounded-3xl border border-border bg-card p-8 shadow-card">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">{post.category}</p>
                <h3 className="mt-4 text-2xl font-bold text-primary">{post.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-accent">
                  Read More
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Start Your Publishing Journey Today"
        subtitle="Publish your book, research paper, or journal work with a trusted academic publishing partner."
        primaryLabel="Publish Your Book"
        primaryHref="/publish-my-book"
        secondaryLabel="Submit Paper"
        secondaryHref="/call-for-paper"
      />
    </SiteShell>
  );
}
