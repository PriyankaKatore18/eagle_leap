import dynamic from "next/dynamic";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { AsyncSectionPlaceholder } from "@/components/site/async-section-placeholder";
import { Button } from "@/components/ui/button";
import { IllustrationPanel } from "@/components/site/illustration-panel";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { heroImages, packagePlans } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

const PublishBookForm = dynamic(
  () => import("@/components/site/forms/publish-book-form").then((module) => module.PublishBookForm),
  {
    ssr: false,
    loading: () => <AsyncSectionPlaceholder id="publish-book-form" />,
  },
);

export const metadata = createMetadata({
  title: "Publish My Book",
  description: "Capture author leads with a premium publish-my-book page including package selection, manuscript upload, validation, and WhatsApp follow-up.",
  path: "/publish-my-book",
});

export default function PublishMyBookPage() {
  return (
    <SiteShell>
      <PageHero
        title="Publish Your Book with Confidence"
        subtitle="Turn your manuscript into a professionally published book with complete support from ISBN registration to distribution."
        breadcrumbs={[{ label: "Publish my Book" }]}
      />

      <section className="py-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
              <SectionHeading
                eyebrow="Why Publish With Us"
                title="Why Choose Eagle Leap Publication"
                description="The form supports package selection, file upload, validation, success messaging, email-ready structure, and WhatsApp follow-up."
              />
              <div className="mt-6 flex flex-wrap gap-4">
                <Button asChild className="gradient-accent text-accent-foreground">
                  <Link href="#publish-book-form">Get Started</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/packages">View Packages</Link>
                </Button>
              </div>
              <div className="mt-8 space-y-4">
                {[
                  "ISBN Registration Included",
                  "Professional Cover & Formatting",
                  "Amazon & Flipkart Listing",
                  "Printing & Distribution Support",
                  "End-to-End Publishing Guidance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-secondary px-5 py-4">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="font-semibold text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <IllustrationPanel
              src={heroImages.publishJourney}
              alt="Focused author writing and planning at a desk"
              eyebrow="Package Selection"
              title="Choose a publishing package and move directly into consultation."
              description="This visual block makes the page feel more premium while still keeping the package-led conversion path from the document."
              items={packagePlans.map((plan) => `${plan.name} - ${plan.price}`)}
              dark
            />
          </div>
          <PublishBookForm />
        </div>
      </section>
    </SiteShell>
  );
}
