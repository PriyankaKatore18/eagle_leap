import { Linkedin, Mail } from "lucide-react";

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
      name: "Sandesh Pahulkar",
      role: "Founder",
      bio: "Leads publishing operations and author experience, with a focus on quality, clear communication, and a dependable publishing journey from manuscript to market.",
    },
    {
      name: "Shivprasad Paul",
      role: "Founder",
      bio: "Leads business strategy, technology, and brand development, with a focus on building strong systems, new opportunities, and the long-term growth of Eagle Leap Publication.",
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
            eyebrow="Leadership"
            title="Meet Our Founders"
            description="Driven by a shared vision to build a publishing company centered on quality, transparency, and meaningful author support."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {leadershipTeam.map((person) => (
              <article
                key={person.name}
                className="card-reveal flex h-full flex-col rounded-[2rem] border border-border bg-card p-8 text-center shadow-card md:p-10"
              >
                <div
                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-gold bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.22),transparent_35%),linear-gradient(145deg,#173875,#0b1e54)] text-xs font-bold uppercase tracking-[0.22em] text-gold shadow-[0_18px_36px_-20px_rgba(15,23,42,0.55)]"
                  aria-label={`${person.name} photo placeholder`}
                >
                  Photo
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-accent">{person.role}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-[1.28] text-primary md:text-[2.1rem]">
                  {person.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{person.bio}</p>
                <div className="mt-6 flex items-center justify-center gap-4 text-sm font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <CtaBand
        title="Start Your Publishing Journey"
        subtitle="Bring your manuscript to life with professional publishing support built around quality, clarity, and dependable communication."
        primaryLabel="Publish Your Book"
        primaryHref="/publish-my-book"
        secondaryLabel="Submit Your Paper"
        secondaryHref="/call-for-paper"
      />
    </SiteShell>
  );
}
