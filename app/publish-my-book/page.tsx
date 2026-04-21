import Image from "next/image";
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

const consultationSteps = [
  "We review your manuscript details and recommended package fit",
  "You receive guided consultation on ISBN, formatting, and listing",
  "Our team aligns the launch plan, printing, and distribution support",
];

export default function PublishMyBookPage() {
  return (
    <SiteShell>
      <PageHero
        title="Publish Your Book with Confidence"
        subtitle="Turn your manuscript into a professionally published book with complete support from ISBN registration to distribution."
        breadcrumbs={[{ label: "Publish my Book" }]}
      />

      <section className="py-24">
        <div className="container-custom grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
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
              className="h-auto p-6 md:p-8"
              mediaClassName="mt-6 aspect-[16/9] sm:aspect-[16/10] lg:aspect-[16/9]"
            />
          </div>
          <div className="space-y-8">
            <PublishBookForm className="self-start" />
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image
                  src={heroImages.homeEditorial}
                  alt="Editorial support and publishing consultation"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,59,0.08)_0%,rgba(8,20,59,0.28)_46%,rgba(8,20,59,0.85)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Consultation Flow</p>
                  <h3 className="mt-3 text-[2rem] font-extrabold leading-[1.24] md:text-[2.25rem]">
                    Clear next steps after you submit your manuscript.
                  </h3>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">What Happens Next</p>
                <div className="mt-5 grid gap-4">
                  {consultationSteps.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/70 px-4 py-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <p className="text-base font-medium leading-relaxed text-primary">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-[1.5rem] gradient-brand p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Author Support</p>
                  <p className="mt-3 text-lg font-semibold leading-relaxed">
                    Submission, consultation, package alignment, and publishing guidance now sit in one clean right-side block instead of leaving empty space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
