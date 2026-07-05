/* eslint-disable react-refresh/only-export-components */

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Globe, Headphones, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { packagePlans } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const packageStories = {
  essentials: {
    intro:
      "A streamlined publishing plan for authors who already have a polished manuscript and want a professional, low-friction market launch.",
    promise: "Fast setup, dependable production support, and a clean path to digital distribution.",
    closing:
      "Perfect when you want a credible first release with the core publishing essentials handled by a team that keeps the process simple.",
    highlights: ["Quick onboarding", "Template-led cover direction", "Major digital marketplace reach"],
  },
  standard: {
    intro:
      "Our most balanced package for authors who want both print and digital reach with dependable support across the production flow.",
    promise: "A strong all-round option with professional formatting, cover design, and guided publishing support.",
    closing:
      "Best for authors who want a polished, presentation-ready release that balances value, speed, and visibility.",
    highlights: ["Print and e-book setup", "Standard custom cover design", "Priority publishing coordination"],
  },
  premium: {
    intro:
      "A more refined publishing experience for authors who want stronger editorial support, custom design, and broader presentation quality.",
    promise: "Built for serious authors who want their book to feel premium from the first proof through final distribution.",
    closing:
      "Ideal when manuscript quality matters, brand presentation matters, and you want a stronger market-facing finish.",
    highlights: ["Custom creative direction", "Stronger editing workflow", "Expanded distribution focus"],
  },
  elite: {
    intro:
      "Our flagship full-service package for authors who want the highest level of publishing support, from editorial polish to launch coordination.",
    promise: "A premium, end-to-end publishing experience with full guidance, elevated design, and maximum visibility.",
    closing:
      "The best choice for authors seeking a high-touch, fully supported release with a strong professional presentation.",
    highlights: ["Full-service editorial support", "Premium design treatment", "Launch-focused visibility"],
  },
} as const;

const publishingSteps = [
  {
    title: "Manuscript Review",
    body: "We assess your file, confirm the package scope, and map the production plan before work begins.",
  },
  {
    title: "Editing & Design",
    body: "Our team prepares the manuscript, cover, and interior layout with a polished, market-ready finish.",
  },
  {
    title: "Proof Approval",
    body: "You review the final proof, share refinements, and approve the package before publication.",
  },
  {
    title: "Publish & Distribute",
    body: "We finalize the release, complete the publishing setup, and coordinate distribution-ready delivery.",
  },
];

const packageBenefits = [
  {
    icon: Sparkles,
    title: "Professional Presentation",
    description: "Each plan is structured to deliver a clean, credible, author-ready result.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Workflow",
    description: "From scope to delivery, the publishing steps stay clear and easy to follow.",
  },
  {
    icon: Globe,
    title: "Distribution Ready",
    description: "Your book is prepared for online visibility and broader reach across major channels.",
  },
  {
    icon: Headphones,
    title: "Guided Support",
    description: "A responsive team helps you move through the publishing process with confidence.",
  },
];

function getPlan(slug: string) {
  return packagePlans.find((plan) => plan.slug === slug);
}

export function generateStaticParams() {
  return packagePlans.map((plan) => ({
    slug: plan.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const plan = getPlan(params.slug);

  if (!plan) {
    return createMetadata({
      title: "Package Not Found",
      description: "The requested publishing package could not be found.",
      path: `/packages/${params.slug}`,
    });
  }

  return createMetadata({
    title: `${plan.name} Package`,
    description: plan.summary,
    path: `/packages/${plan.slug}`,
  });
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const plan = getPlan(params.slug);

  if (!plan) {
    notFound();
  }

  const story = packageStories[plan.slug as keyof typeof packageStories] ?? packageStories.standard;

  return (
    <SiteShell>
      <PageHero
        title={`${plan.name} Publishing Package`}
        subtitle={story.intro}
        breadcrumbs={[{ label: "Packages", href: "/packages" }, { label: plan.name }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-card sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-accent">{plan.tag}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-primary md:text-4xl">
              {plan.name} for authors who want a polished release
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{plan.summary}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">{plan.price}</span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">{plan.timeline}</span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">{plan.idealFor}</span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {story.highlights.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-secondary/50 p-4">
                  <p className="text-sm font-semibold leading-relaxed text-primary">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="gradient-accent text-accent-foreground">
                <Link href="/publish-my-book" className="gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Choose This Package
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border bg-white text-primary hover:border-accent hover:bg-accent/5">
                <Link href="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "rounded-[2rem] border p-8 shadow-card sm:p-10",
              plan.highlighted ? "border-accent bg-[linear-gradient(180deg,rgba(255,127,26,0.08)_0%,rgba(255,255,255,1)_100%)]" : "border-border bg-secondary/55",
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Package at a glance</p>
              {plan.highlighted ? (
                <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                  Most Popular
                </span>
              ) : null}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Price</p>
                <p className="mt-2 text-2xl font-extrabold text-primary">{plan.price}</p>
              </div>
              <div className="rounded-2xl bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Timeline</p>
                <p className="mt-2 text-2xl font-extrabold text-primary">{plan.timeline}</p>
              </div>
              <div className="rounded-2xl bg-card p-5 shadow-sm sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Best For</p>
                <p className="mt-2 text-lg font-semibold leading-relaxed text-primary">{plan.idealFor}</p>
              </div>
              <div className="rounded-2xl bg-card p-5 shadow-sm sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Outcome</p>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{story.promise}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-card p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">What this gives you</p>
              <ul className="mt-4 space-y-3">
                {plan.features.slice(0, 5).map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-20 sm:py-24">
        <div className="container-custom">
          <SectionHeading
            centered
            eyebrow="Included Services"
            title="Everything this package covers"
            description="The package layout keeps the core services clear, so authors can see exactly what they receive at this tier."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {plan.features.map((feature, index) => (
                <div key={feature} className="rounded-[1.5rem] border border-border bg-card p-5 shadow-card">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-primary">{feature}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Built into the package scope with a professional publishing workflow and consistent communication.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-accent">Why this plan works</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {packageBenefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div key={benefit.title} className="rounded-2xl bg-secondary/55 p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-base font-semibold text-primary">{benefit.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Best suited for</p>
                <p className="mt-3 text-base leading-relaxed text-primary">{story.closing}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-custom">
          <SectionHeading
            centered
            eyebrow="Publishing Process"
            title="A simple path from manuscript to market"
            description="The workflow stays clear and predictable, helping authors understand how the package moves from review to delivery."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {publishingSteps.map((step, index) => (
              <div key={step.title} className="rounded-[1.75rem] border border-border bg-card p-6 text-center shadow-card">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-lg font-extrabold text-accent-foreground shadow-[0_12px_24px_-14px_rgba(255,127,26,0.7)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-5 text-xl font-bold text-primary">{step.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to move forward with this package?"
        subtitle="Share your manuscript details and we&apos;ll help you confirm the best publishing path for your goals."
        primaryLabel="Publish Your Book"
        primaryHref="/publish-my-book"
        secondaryLabel="View All Packages"
        secondaryHref="/packages"
      />
    </SiteShell>
  );
}
