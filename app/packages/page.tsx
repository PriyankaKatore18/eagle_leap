import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { IllustrationPanel } from "@/components/site/illustration-panel";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { heroImages, packagePlans, packageSupportPoints } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Packages",
  description: "Explore clean, premium book publishing packages designed for first-time authors, academic works, and premium launch support.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <SiteShell>
      <PageHero
        title="Book Publishing Packages"
        subtitle="Clean, minimal, premium package presentation built for comparison, trust, and conversion."
        breadcrumbs={[{ label: "Packages" }]}
        backgroundSrc={heroImages.packagesHero}
        backgroundAlt="Publishing consultation and package planning meeting"
      />

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Packages"
            title="Only book publishing packages, presented with clarity."
            description="The package layer is structured so the exact Google Sheet pricing and service matrix can be plugged in later without changing the page design."
            centered
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {packagePlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[2rem] p-8 shadow-card ${
                  plan.highlighted ? "gradient-brand border-2 border-accent text-white shadow-elegant" : "border border-border bg-card"
                }`}
              >
                <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${plan.highlighted ? "text-accent" : "text-muted-foreground"}`}>
                  {plan.tag}
                </p>
                <h2 className={`mt-4 text-3xl font-extrabold ${plan.highlighted ? "text-white" : "text-primary"}`}>{plan.name}</h2>
                <p className={`mt-2 text-5xl font-extrabold ${plan.highlighted ? "text-white" : "text-primary"}`}>{plan.price}</p>
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-3">
                      <div className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full ${plan.highlighted ? "bg-white/10" : "bg-accent/10"}`}>
                        <Check className={`h-4 w-4 ${plan.highlighted ? "text-accent" : "text-accent"}`} />
                      </div>
                      <p className={plan.highlighted ? "text-white/85" : "text-muted-foreground"}>{feature}</p>
                    </div>
                  ))}
                </div>
                <Button asChild size="lg" className={`mt-8 w-full ${plan.highlighted ? "gradient-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
                  <Link href="/publish-my-book">Select {plan.name}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom grid items-stretch gap-10 lg:grid-cols-[1fr_1fr]">
          <IllustrationPanel
            src={heroImages.packagesFeature}
            alt="Publishing consultation paperwork and planning"
            eyebrow="Package Clarity"
            title="Built to feel like a guided publishing consultation, not a cluttered pricing table."
            description="This makes the packages page feel more professional and corporate while still keeping the same theme and pricing-first structure."
            items={packagePlans.map((plan) => `${plan.name} - ${plan.price}`)}
            dark
          />
          <div className="grid h-full auto-rows-fr gap-6">
            {packageSupportPoints.map((item) => (
              <div key={item} className="flex h-full flex-col rounded-3xl bg-card p-8 shadow-card">
                <Check className="h-10 w-10 text-accent" />
                <p className="mt-5 text-lg font-semibold text-primary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need help choosing the right package?"
        subtitle="We can help match your manuscript, goals, and distribution needs to the right publishing plan."
        primaryLabel="Get Started"
        primaryHref="/publish-my-book"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </SiteShell>
  );
}
