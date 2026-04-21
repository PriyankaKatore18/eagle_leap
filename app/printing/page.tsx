import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Clock3, Palette, ShieldCheck, Truck } from "lucide-react";

import { AsyncSectionPlaceholder } from "@/components/site/async-section-placeholder";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { IllustrationPanel } from "@/components/site/illustration-panel";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { heroImages, printingClients, printingServices } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

const PrintingForm = dynamic(() => import("@/components/site/forms/printing-form").then((module) => module.PrintingForm), {
  ssr: false,
  loading: () => <AsyncSectionPlaceholder />,
});

export const metadata = createMetadata({
  title: "Printing",
  description: "Professional printing solutions for institutions and businesses, from ID cards and magazines to practical books, certificates, and awards.",
  path: "/printing",
});

const whyPrinting = [
  { icon: ShieldCheck, text: "High-quality materials & finishing" },
  { icon: Truck, text: "Affordable bulk pricing" },
  { icon: Clock3, text: "Fast turnaround time" },
  { icon: Palette, text: "Custom design support" },
];

export default function PrintingPage() {
  return (
    <SiteShell>
      <PageHero
        title="Professional Printing Solutions for Institutions & Businesses"
        subtitle="From ID cards to academic books, we provide high-quality printing services with reliable delivery and affordable pricing."
        breadcrumbs={[{ label: "Printing" }]}
        backgroundSrc={heroImages.printingHero}
        backgroundAlt="Professional printing machinery and production setup"
      />

      <section className="py-24">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="Printing"
              title="Built for academic production, events, and institutional reliability."
              description="The printing page supports quote generation, WhatsApp contact, service discovery, and lead capture while preserving the same premium visual language."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="gradient-accent text-accent-foreground">
                <Link href="#printing-enquiry">Get Printing Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`https://wa.me/919876543210`} target="_blank">
                  WhatsApp Us
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-elegant sm:aspect-[5/4] lg:h-full lg:aspect-auto">
            <Image
              src={heroImages.printingFeature}
              alt="Printing press"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Our Printing Services" title="Core printing services aligned with the requirement document." centered />
          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            {printingServices.map((service) => (
              <div key={service.title} className="card-reveal rounded-3xl bg-card p-8 shadow-card">
                <h3 className="text-2xl font-bold leading-[1.08] text-primary">{service.title}</h3>
                <div className="mt-5 space-y-3 text-muted-foreground">
                  {service.points.map((point) => (
                    <p key={point}>• {point}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid items-stretch gap-6 lg:grid-cols-2">
          <IllustrationPanel
            src="/illustrations/printing-operations.svg"
            alt="Printing operations illustration"
            eyebrow="Why Choose Our Printing Services"
            title="Institutional quality, turnaround control, and cleaner production visibility."
            description="This visual treatment helps the printing page look more reliable and corporate while still fitting the rest of the site."
            items={whyPrinting.map((item) => item.text)}
          />
          <div className="flex h-full flex-col rounded-3xl gradient-brand p-10 text-white shadow-elegant">
            <SectionHeading eyebrow="Simple & Efficient Process" title="A clean four-step print workflow." invert />
            <div className="mt-8 space-y-4">
              {["Share Your Requirement", "Get Quote & Approval", "Printing & Production", "Delivery"].map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-accent text-lg font-bold text-white">{index + 1}</div>
                  <p className="text-lg font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Who We Serve" title="Target clients highlighted exactly as required." centered />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {printingClients.map((client) => (
              <div key={client} className="card-reveal rounded-3xl bg-card p-8 text-center shadow-card">
                <p className="text-xl font-bold text-primary">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="printing-enquiry" className="py-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Printing Enquiry"
              title="Request a customized quote for your institution or event."
              description="The form is already prepared for API integration, file upload, and lead capture flow for the later backend step."
            />
          </div>
          <PrintingForm />
        </div>
      </section>

      <CtaBand
        title="Need Bulk Printing? Let's Get Started"
        subtitle="Contact us today for customized printing solutions and best pricing."
        primaryLabel="Request a Quote"
        primaryHref="#printing-enquiry"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </SiteShell>
  );
}
