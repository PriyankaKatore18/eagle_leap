import { Instagram, Linkedin, Mail } from "lucide-react";

import { AboutStoryShowcase } from "@/components/site/about-story-showcase";
import { CountUpMetricGrid } from "@/components/site/count-up-metric-grid";
import { CtaBand } from "@/components/site/cta-band";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { siteMetrics } from "@/data/site-data";
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
      <AboutStoryShowcase />

      <section className="pb-24">
        <div className="container-custom">
          <CountUpMetricGrid metrics={siteMetrics} />
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
