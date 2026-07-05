/* eslint-disable react-refresh/only-export-components */

import Link from "next/link";
import { CheckCircle2, Info } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { packagePlans } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Packages",
  description:
    "Explore Eagle Leap Publication's publishing packages with clear pricing, comparison tables, FAQs, and a premium consultation-led layout.",
  path: "/packages",
});

const comparisonRows: Array<
  | { type: "section"; label: string }
  | { type: "row"; label: string; values: [string, string, string, string] }
> = [
  { type: "section", label: "Publishing Foundation" },
  { type: "row", label: "ISBN Assignment", values: ["Included", "Included", "Included", "Included"] },
  { type: "row", label: "E-book Formatting", values: ["Included", "Included", "Included", "Included"] },
  { type: "row", label: "Print Book Formatting", values: ["Not included", "Included", "Included", "Included"] },
  { type: "row", label: "Professional Interior Layout", values: ["Basic layout", "Standard layout", "Enhanced layout", "Premium layout"] },
  { type: "section", label: "Design & Formatting" },
  { type: "row", label: "Cover Design", values: ["Template-based", "Standard custom", "Premium custom", "Signature custom"] },
  { type: "row", label: "Cover Revisions", values: ["1 revision", "2 revisions", "3 revisions", "Unlimited"] },
  { type: "row", label: "Interior Design Options", values: ["Basic templates", "Enhanced templates", "Custom design", "Signature design"] },
  { type: "section", label: "Editing & Quality" },
  { type: "row", label: "Proofreading", values: ["Basic review", "Comprehensive review", "Professional review", "Editorial suite"] },
  { type: "row", label: "Content Editing", values: ["Basic edits", "Light editorial", "Advanced editing", "Complete editorial package"] },
  { type: "row", label: "Manuscript Review", values: ["Included", "Included", "Included", "Included"] },
  { type: "section", label: "Distribution & Sales" },
  { type: "row", label: "Digital Distribution", values: ["Major platforms", "Major platforms", "Expanded network", "Global network"] },
  { type: "row", label: "Print Distribution", values: ["Print-on-demand", "Print-on-demand", "Print-on-demand", "Print-on-demand"] },
  { type: "row", label: "Royalty Rate", values: ["70%", "70%", "70%", "70%"] },
  { type: "row", label: "Royalty Payments", values: ["Quarterly", "Quarterly", "Quarterly", "Quarterly"] },
  { type: "section", label: "Marketing & Support" },
  { type: "row", label: "Author Dashboard", values: ["Included", "Included", "Included", "Included"] },
  { type: "row", label: "Marketing Support", values: ["Basic setup", "Enhanced support", "Strategy session", "Launch campaign"] },
  { type: "row", label: "Author Support", values: ["Email support", "Priority email", "Email and chat", "Dedicated manager"] },
  { type: "section", label: "Timeline & Delivery" },
  { type: "row", label: "Processing Time", values: ["14-15 business days", "7-8 business days", "5-6 business days", "2-3 business days"] },
  { type: "row", label: "Format Delivery", values: ["E-book only", "E-book + print", "E-book + print", "All formats"] },
  { type: "row", label: "Quality Assurance", values: ["Basic review", "Standard QA", "Comprehensive QA", "Premium QA"] },
  { type: "row", label: "Ideal For", values: ["First-time authors", "Print and digital authors", "Serious authors", "Flagship titles"] },
];

const packageFaqs = [
  {
    question: "What is included in each package?",
    answer:
      "Each plan includes a defined publishing scope with ISBN support, design, formatting, and distribution guidance. Higher-tier plans add stronger editing, marketing, and support.",
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Yes. If your manuscript or launch plan evolves, we can move you to a higher package and adjust the support scope accordingly.",
  },
  {
    question: "Do I keep full rights to my book?",
    answer:
      "Absolutely. You retain ownership of your work while we manage the publishing, setup, and distribution process.",
  },
  {
    question: "How long does publishing take?",
    answer:
      "Timelines vary by package and manuscript readiness, ranging from around 2 to 15 business days. We share a confirmed schedule after review.",
  },
  {
    question: "Which package is best for academic books?",
    answer:
      "Standard and Premium are the most balanced options for research-led titles, edited volumes, and authors who want stronger production support.",
  },
];

export default function PackagesPage() {
  return (
    <SiteShell>
      <PageHero
        title="Publishing Packages"
        subtitle="Flexible plans designed for every author&apos;s journey. From manuscript preparation to marketplace launch, our publishing packages combine editorial support, professional design, ISBN, printing, and distribution with a transparent pricing structure."
        breadcrumbs={[{ label: "Packages" }]}
        backgroundSrc="/banners/home-hero-publishing-ai.png"
        backgroundAlt="Publishing books, editing, printing, and distribution illustration"
      />

      <section className="py-20 sm:py-24">
        <div className="container-custom">
          <SectionHeading
            centered
            eyebrow="Choose Your Perfect Plan"
            title="Compare package features"
            description="The layout mirrors a premium consultation page, while the service matrix keeps pricing and inclusions easy to scan."
            titleClassName="text-3xl md:text-[2rem] lg:text-[2.35rem] max-w-2xl mx-auto"
          />

          <div className="mt-14 grid gap-6 xl:grid-cols-4">
            {packagePlans.map((plan) => (
              <article
                key={plan.name}
                className={cn(
                  "flex h-full flex-col rounded-[2rem] border p-7 shadow-card transition-smooth hover:-translate-y-1",
                  plan.highlighted
                    ? "gradient-brand border-accent text-white shadow-elegant"
                    : "border-border bg-card text-foreground hover:shadow-elegant",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className={cn("text-sm font-medium leading-relaxed", plan.highlighted ? "text-white/85" : "text-muted-foreground")}>
                    {plan.tag}
                  </p>
                  {plan.highlighted ? (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                      Most Popular
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-4 text-3xl font-display font-extrabold leading-tight tracking-tight">{plan.name}</h2>
                <p
                  className={cn(
                    "mt-4 whitespace-nowrap font-display text-[2.55rem] font-extrabold leading-none tracking-[-0.04em] md:text-[2.8rem]",
                    plan.highlighted ? "text-white" : "text-primary",
                  )}
                >
                  {plan.price}
                </p>
                <p className={cn("mt-2 text-xs font-semibold uppercase tracking-[0.3em] md:text-sm", plan.highlighted ? "text-white/70" : "text-accent")}>
                  {plan.timeline}
                </p>

                <p className={cn("mt-5 text-sm leading-relaxed", plan.highlighted ? "text-white/80" : "text-muted-foreground")}>
                  {plan.summary}
                </p>

                <div className={cn("mt-6 space-y-3 border-t pt-6", plan.highlighted ? "border-white/10" : "border-border")}>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className={cn("mt-0.5 flex h-5 w-5 items-center justify-center rounded-full", plan.highlighted ? "bg-white/10" : "bg-accent/10")}>
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <p className={cn("text-sm leading-relaxed", plan.highlighted ? "text-white/85" : "text-muted-foreground")}>{feature}</p>
                    </div>
                  ))}
                </div>

                <div className={cn("mt-6 rounded-2xl p-4", plan.highlighted ? "bg-white/5" : "bg-secondary/70")}>
                  <p className={cn("text-xs font-semibold uppercase tracking-[0.24em]", plan.highlighted ? "text-accent" : "text-accent")}>Ideal for</p>
                  <p className={cn("mt-2 text-sm leading-relaxed", plan.highlighted ? "text-white/80" : "text-primary")}>{plan.idealFor}</p>
                </div>

                <div className="mt-7 space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "w-full",
                      plan.highlighted ? "gradient-accent text-accent-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
                    <Link href="/publish-my-book">Choose This Package</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "w-full border-2",
                      plan.highlighted
                        ? "border-white/25 bg-white/10 text-white hover:bg-white hover:text-primary"
                        : "border-border bg-white text-primary hover:border-accent hover:bg-accent/5",
                    )}
                    variant="outline"
                  >
                    <Link href={`/packages/${plan.slug}`}>
                      <Info className="h-4 w-4" />
                      View Full Details
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-relaxed text-muted-foreground">
            All packages include consultation-led guidance, publishing support, and post-launch coordination. Final scope can be tailored after manuscript review.
          </p>
        </div>
      </section>

      <section className="bg-secondary/70 py-20 sm:py-24">
        <div className="container-custom">
          <SectionHeading
            centered
            eyebrow="Compare All Features"
            title="Side-by-side comparison to help you make the right choice."
            description="This table keeps the pricing story easy to understand while giving authors a clear view of what changes as the package level increases."
          />

          <div className="mt-14 overflow-hidden rounded-[2rem] border border-border bg-card shadow-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/60 hover:bg-secondary/60">
                  <TableHead className="min-w-[220px] text-primary">Features & Services</TableHead>
                  {packagePlans.map((plan) => (
                    <TableHead key={plan.name} className="text-center text-primary">
                      <span className="block text-base font-bold">{plan.name}</span>
                      <span className="mt-1 block text-sm font-medium text-muted-foreground">{plan.price}</span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonRows.map((row) =>
                  row.type === "section" ? (
                    <TableRow key={row.label} className="bg-secondary/40 hover:bg-secondary/40">
                      <TableCell colSpan={5} className="border-t border-border px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                        {row.label}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={row.label}>
                      <TableCell className="font-semibold text-primary">{row.label}</TableCell>
                      {row.values.map((value, index) => (
                        <TableCell key={`${row.label}-${index}`} className="text-center text-sm leading-relaxed text-muted-foreground">
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            All packages retain your authorship rights, with no hidden fees or recurring charges.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-custom">
          <SectionHeading
            centered
            eyebrow="Frequently Asked Questions"
            title="Everything you need to know about our publishing packages"
            description="Common questions about pricing, timelines, rights, and package upgrades."
          />
          <div className="mt-14">
            <FaqList items={packageFaqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Publish Your Book?"
        subtitle="Tell us about your manuscript and we&apos;ll help you pick the best publishing plan for your goals."
        primaryLabel="Publish Your Book"
        primaryHref="/publish-my-book"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </SiteShell>
  );
}
