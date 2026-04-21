import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Award, BookCopy, CalendarDays, FileBadge2, FileText } from "lucide-react";

import { AsyncSectionPlaceholder } from "@/components/site/async-section-placeholder";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { PublicationCard } from "@/components/site/publication-card";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import {
  currentCallForPaper,
  journalInfo,
  paperBenefits,
  paperFaqs,
  paperGuidelines,
  paperSubjects,
  publications,
} from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

const PaperSubmissionForm = dynamic(
  () => import("@/components/site/forms/paper-submission-form").then((module) => module.PaperSubmissionForm),
  {
    ssr: false,
    loading: () => <AsyncSectionPlaceholder id="paper-submission-form" />,
  },
);

const FaqList = dynamic(() => import("@/components/site/faq-list").then((module) => module.FaqList), {
  ssr: false,
  loading: () => <AsyncSectionPlaceholder variant="faq" />,
});

export const metadata = createMetadata({
  title: "Call for Paper",
  description:
    "Submit your research paper, article, or book chapter for ongoing ISBN-based edited volumes with publication details, benefits, and submission flow.",
  path: "/call-for-paper",
});

const paperInfoCards = [
  {
    id: "subjects",
    eyebrow: "Areas & Subjects Covered",
    titleLines: ["Multidisciplinary", "Scope"],
    items: paperSubjects,
  },
  {
    id: "benefits",
    eyebrow: "Benefits of Publishing",
    titleLines: ["Author-Facing", "Value"],
    items: paperBenefits,
  },
  {
    id: "submission-guidelines",
    eyebrow: "Submission Guidelines",
    titleLines: ["Checklist", "Before Upload"],
    items: paperGuidelines,
  },
] as const;

export default function CallForPaperPage() {
  return (
    <SiteShell>
      <PageHero
        title="Call for Paper - Publish Your Research"
        subtitle="Submit your research paper, article, or book chapter in our ongoing ISBN-based edited volumes and get professionally published."
        breadcrumbs={[{ label: "Call for Paper" }]}
      />

      <section className="py-24">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-reveal rounded-[2rem] gradient-brand p-10 text-white shadow-elegant">
            <SectionHeading eyebrow="Current Call for Paper" title={currentCallForPaper.title} invert />
            <div className="mt-10 space-y-5 rounded-3xl border border-white/10 bg-white/5 p-8">
              <div>
                <p className="text-sm text-white/60">Book Title</p>
                <p className="mt-2 text-2xl font-bold">{currentCallForPaper.title}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-white/60">Submission Deadline</p>
                  <p className="mt-2 font-semibold">{currentCallForPaper.submissionDeadline}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Publication Date</p>
                  <p className="mt-2 font-semibold">{currentCallForPaper.publicationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Publication Fee</p>
                  <p className="mt-2 font-semibold">{currentCallForPaper.publicationFee}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Mode</p>
                  <p className="mt-2 font-semibold">{currentCallForPaper.mode}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild className="gradient-accent text-accent-foreground">
                  <Link href="#paper-submission-form">Submit Now</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-primary">
                  <Link href="#submission-guidelines">Download Brochure</Link>
                </Button>
              </div>
            </div>
          </div>

          <PaperSubmissionForm />
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom grid gap-6 lg:grid-cols-3">
          {paperInfoCards.map((card) => (
            <div
              key={card.id}
              id={card.id === "submission-guidelines" ? "submission-guidelines" : undefined}
              className="card-reveal flex h-full flex-col rounded-3xl bg-card p-8 shadow-card"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">{card.eyebrow}</p>
              <h2 className="mt-5 text-[2.2rem] font-extrabold leading-[1.26] text-primary md:text-[2.55rem]">
                {card.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <div className="mt-8 space-y-4 text-muted-foreground">
                {card.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                    <p className="text-lg leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid gap-6 lg:grid-cols-2">
          <div className="card-reveal rounded-3xl border border-border bg-card p-10 shadow-card">
            <SectionHeading eyebrow="Submission Process" title="How to Submit" />
            <div className="mt-8 space-y-4">
              {[
                { icon: FileText, label: "Fill Submission Form" },
                { icon: BookCopy, label: "Upload Paper" },
                { icon: Award, label: "Review Process" },
                { icon: FileBadge2, label: "Confirmation & Payment" },
                { icon: CalendarDays, label: "Publication" },
              ].map((step) => (
                <div key={step.label} className="flex items-center gap-4 rounded-2xl bg-secondary p-5">
                  <step.icon className="h-8 w-8 text-accent" />
                  <p className="text-lg font-semibold text-primary">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-reveal rounded-3xl gradient-brand p-10 text-white shadow-elegant">
            <SectionHeading eyebrow="ISSN Journal" title={journalInfo.name} invert />
            <p className="mt-6 text-lg font-semibold">ISSN: {journalInfo.issn}</p>
            <p className="mt-4 text-white/80">
              An Open Access, Peer-Reviewed, Multidisciplinary Scholarly Journal. Bi-monthly, multilingual, and
              academically focused.
            </p>
            <Button asChild className="mt-8 gradient-accent text-accent-foreground">
              <Link href="/journal">
                Visit Journal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Our Previous Publications" title="A trust-building preview of earlier work." />
            <Button asChild variant="outline">
              <Link href="/publications">View Publications</Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {publications.slice(0, 3).map((item) => (
              <PublicationCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions about submission and publication." centered />
          <div className="mx-auto mt-12 max-w-4xl">
            <FaqList items={paperFaqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Submit Your Research?"
        subtitle="Join our current edited volume and move ahead with a structured, professional publication process."
        primaryLabel="Submit Paper"
        primaryHref="#paper-submission-form"
        secondaryLabel="Visit Journal"
        secondaryHref="/journal"
      />
    </SiteShell>
  );
}
