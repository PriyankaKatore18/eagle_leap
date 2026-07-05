import Link from "next/link";
import { BadgeCheck, FileCheck2, Globe2, GraduationCap, Layers3 } from "lucide-react";
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { IllustrationPanel } from "@/components/site/illustration-panel";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { heroImages, journalInfo, upcomingJournals } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Journal",
  description: "Explore the current Eagle Leap journal, ISSN details, journal features, submission prompts, and upcoming academic journal expansions.",
  path: "/journal",
});

const journalHighlights: Array<{
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  featured?: boolean;
}> = [
  {
    title: "Peer-Reviewed Process",
    description: "Editorial screening and subject review help maintain quality, consistency, and scholarly value.",
    icon: FileCheck2,
  },
  {
    title: "Open Access Publication",
    description: "Built for wider discoverability so researchers, faculty, and readers can access published work easily.",
    icon: Globe2,
  },
  {
    title: "Multidisciplinary Coverage",
    description: "Welcomes strong submissions across science, commerce, humanities, technology, and related fields.",
    icon: Layers3,
  },
  {
    title: "Academic Research Focus",
    description: "Designed for authors, institutions, and scholars who want a credible platform for original research.",
    icon: GraduationCap,
  },
  {
    title: "ISSN Registered Journal",
    description: "A registered journal identity that supports professional presentation and long-term continuity.",
    icon: BadgeCheck,
    featured: true,
  },
] as const;

export default function JournalPage() {
  return (
    <SiteShell>
      <PageHero
        title="Our Journals"
        subtitle="Explore our academic journals dedicated to multidisciplinary research, innovation, and knowledge sharing."
        breadcrumbs={[{ label: "Journal" }]}
        backgroundSrc={heroImages.journalHero}
        backgroundAlt="Academic journal library and reading room"
      />

      <section className="py-24">
        <div className="container-custom rounded-[2rem] gradient-brand p-10 text-white shadow-elegant md:p-14">
          <SectionHeading eyebrow="Current Journal" title={journalInfo.name} description={journalInfo.description} invert />
          <div className="mt-10 grid gap-5 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-3">
            <div>
              <p className="text-sm text-white/60">ISSN</p>
              <p className="mt-2 text-2xl font-bold">{journalInfo.issn}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Type</p>
              <p className="mt-2 text-lg font-bold">{journalInfo.type}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Focus</p>
              <p className="mt-2 text-lg font-bold">Peer-reviewed multidisciplinary research</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild className="gradient-accent text-accent-foreground">
              <Link href="/journal">Visit Journal Website</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-primary">
                <Link href="/journal">View Current Issue</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom grid items-stretch gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <IllustrationPanel
            src={heroImages.journalFeature}
            alt="Refined academic library reception and bookshelf"
            eyebrow="Journal Experience"
            title="A stronger visual layer for submission quality, trust, and research presentation."
            description="This section presents the journal with stronger academic credibility, cleaner visuals, and a more research-focused identity."
            items={[
              "Peer-reviewed multidisciplinary research",
              "Structured ISSN-led journal identity",
              "Submission flow linked to call-for-paper",
              "Future-ready issue and archive expansion",
            ]}
            dark
          />
          <div className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-8 shadow-card md:p-10">
            <SectionHeading
              eyebrow="Journal Highlights"
              title="What this journal communicates to authors and readers."
              description="The right side now gives visitors a clearer professional summary instead of empty cards."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {journalHighlights.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`rounded-3xl border p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card ${
                    feature.featured
                      ? "md:col-span-2 border-transparent bg-gradient-to-br from-primary to-primary-glow text-white"
                      : "border-border/80 bg-gradient-to-br from-white to-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        feature.featured ? "bg-white/10 text-white" : "bg-primary/5 text-accent"
                      }`}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                            feature.featured ? "bg-white/10 text-white/80" : "bg-accent/10 text-accent"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className={`text-lg font-bold leading-tight ${feature.featured ? "text-white" : "text-primary"}`}>
                          {feature.title}
                        </h3>
                      </div>
                      <p className={`mt-3 text-sm leading-relaxed ${feature.featured ? "text-white/82" : "text-muted-foreground"}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl bg-secondary/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">ISSN</p>
                  <p className="mt-2 text-xl font-extrabold text-primary">{journalInfo.issn}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Professional journal identity for authors and institutions.</p>
                </div>
                <Button asChild className="gradient-accent text-accent-foreground">
                  <Link href="/call-for-paper">Submit Paper</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid items-stretch gap-8 lg:grid-cols-2">
          <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-10 shadow-card">
            <SectionHeading
              eyebrow="Submit to Our Journal"
              title="Invite authors to contribute to the academic community."
              description="This short section mirrors the requirement document and routes users toward a journal-related submission path."
            />
            <Button asChild className="mt-8 gradient-accent text-accent-foreground">
              <Link href="/call-for-paper">Submit Paper</Link>
            </Button>
          </div>
          <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-10 shadow-card">
            <SectionHeading
              eyebrow="Upcoming Journals"
              title="Future-ready journal expansion cards"
              description="Future-ready journal cards keep the platform prepared for expansion while staying clean and easy to scan."
            />
            <div className="mt-8 space-y-4">
              {upcomingJournals.map((journal) => (
                <div key={journal.name} className="rounded-2xl bg-secondary p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xl font-bold text-primary">{journal.name}</p>
                      <p className="mt-2 text-muted-foreground">{journal.focus}</p>
                    </div>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {journal.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Submit Your Research?"
        subtitle="Join our journal and share your research with the academic community."
        primaryLabel="Submit Paper"
        primaryHref="/call-for-paper"
        secondaryLabel="Visit Journal"
        secondaryHref="/journal"
      />
    </SiteShell>
  );
}
