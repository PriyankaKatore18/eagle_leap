import Link from "next/link";
import { Instagram, Linkedin, Mail, Target, Telescope } from "lucide-react";

import { CountUpMetricGrid } from "@/components/site/count-up-metric-grid";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { heroImages, siteMetrics } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn how Eagle Leap Publication supports authors, researchers, and institutions with ISBN book publishing, ISSN journals, printing, and distribution.",
  path: "/about",
});

export default function AboutPage() {
  const leadershipTeam = [
    {
      initials: "AM",
      name: "Arjun Mehta",
      role: "Director",
      bio: "Guides our publishing direction, brand standards, and strategic partnerships with a steady focus on quality and consistency.",
    },
    {
      initials: "NK",
      name: "Nisha Kulkarni",
      role: "Chief Executive Officer",
      bio: "Leads the company vision, customer experience, and growth strategy across publishing, printing, and digital services.",
    },
  ];

  const teamMembers = [
    {
      initials: "RK",
      name: "Rohan Khatri",
      role: "Operations Manager",
      bio: "Coordinates timelines, author communication, and delivery workflows to keep every project moving smoothly.",
    },
    {
      initials: "PS",
      name: "Pooja Sharma",
      role: "Chief Technology Officer",
      bio: "Builds the digital systems, internal tools, and automation that support a cleaner publishing workflow.",
    },
    {
      initials: "AS",
      name: "Amit Solanki",
      role: "Marketing Head",
      bio: "Shapes launch campaigns, visibility plans, and outreach strategies for books, journals, and institutional work.",
    },
    {
      initials: "MR",
      name: "Meera Reddy",
      role: "Design Head",
      bio: "Creates cover concepts, page layouts, and visual systems that give each project a polished, professional finish.",
    },
  ];

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
        <div className="container-custom">
          <div className="section-reveal mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-accent sm:text-sm">Who We Are</p>
            <h2 className="mt-3 font-display text-[2.2rem] font-extrabold leading-[1.34] text-primary md:text-[2.6rem] lg:text-[2.85rem]">
              A professional publishing platform built for authors who value quality, transparency, and reach.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Eagle Leap Publication helps authors, researchers, academicians, and institutions bring manuscripts to
              life through a clear, collaborative publishing journey.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-relaxed text-foreground md:text-xl">
            <p>
              <strong className="font-semibold text-primary">Eagle Leap Publication</strong> is a professional
              publishing and printing platform based in India, dedicated to helping independent authors, researchers,
              and academic institutions turn ideas into polished books and journals.
            </p>
            <p>
              Our <span className="font-semibold text-accent">comprehensive publishing services</span> include editing,
              cover design, ISBN and ISSN support, print production, and distribution across major marketplaces. Every
              service is shaped around an <span className="font-semibold text-accent">author-first workflow</span> that
              keeps the process clear, consistent, and easy to follow.
            </p>
            <p>
              Whether you are publishing your first title or expanding an academic catalogue, our{" "}
              <span className="font-semibold text-accent">flexible publishing packages</span> are designed to support
              you at every stage of the journey. From manuscript submission to final release, we manage the technical
              work so you can stay focused on your writing and research.
            </p>
            <p>
              Authors who publish with us also gain access to our{" "}
              <Link href="/store" className="font-semibold text-accent hover:underline">
                Book Store
              </Link>
              , helping their work reach readers, institutions, and communities with stronger visibility and
              credibility.
            </p>
          </div>
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
            <h2 className="mt-6 text-3xl font-extrabold leading-[1.28] text-primary">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              At Eagle Leap Publication, our mission is to simplify and professionalize the publishing process for
              authors, researchers, academicians, and institutions across India. We are committed to providing
              structured and reliable ISBN-based book publication and ISSN journal publication services that enable
              individuals to share their knowledge, research, and creative work with a wider audience.
            </p>
          </div>
          <div className="card-reveal h-full rounded-3xl bg-card p-10 shadow-card">
            <Telescope className="h-12 w-12 text-accent" />
            <h2 className="mt-6 text-3xl font-extrabold leading-[1.28] text-primary">Our Vision</h2>
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
        <div className="container-custom">
          <SectionHeading
            centered
            eyebrow="Team"
            title="Our Leadership & Team"
            description="The people shaping our publishing and printing services. Our leadership team brings together years of combined experience in publishing, technology, and author services."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {leadershipTeam.map((person) => (
              <article
                key={person.name}
                className="card-reveal flex h-full flex-col rounded-[2rem] border border-border bg-card p-8 text-center shadow-card md:p-10"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-gold bg-primary text-2xl font-extrabold text-gold shadow-[0_18px_36px_-20px_rgba(15,23,42,0.55)]">
                  {person.initials}
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-accent">{person.role}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-[1.28] text-primary md:text-[2.1rem]">
                  {person.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{person.bio}</p>
                <div className="mt-6 flex items-center justify-center gap-3 text-slate-500">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background">
                    <Linkedin className="h-4 w-4" />
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background">
                    <Instagram className="h-4 w-4" />
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background">
                    <Mail className="h-4 w-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((person) => (
              <article
                key={person.name}
                className="card-reveal flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-center shadow-card"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-gold bg-primary text-xl font-bold text-gold shadow-[0_14px_28px_-18px_rgba(15,23,42,0.48)]">
                  {person.initials}
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold text-primary">{person.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-accent">{person.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                <div className="mt-5 flex items-center justify-center gap-3 text-slate-500">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-border bg-background">
                    <Linkedin className="h-3.5 w-3.5" />
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-border bg-background">
                    <Instagram className="h-3.5 w-3.5" />
                  </span>
                </div>
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
