import dynamic from "next/dynamic";
import { Mail, MapPin, Phone } from "lucide-react";

import { AsyncSectionPlaceholder } from "@/components/site/async-section-placeholder";
import { PageHero } from "@/components/site/page-hero";
import { IllustrationPanel } from "@/components/site/illustration-panel";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { contactResponsePoints, heroImages } from "@/data/marketing-data";
import { siteConfig } from "@/data/site-config";
import { createMetadata } from "@/lib/seo";

const ContactForm = dynamic(() => import("@/components/site/forms/contact-form").then((module) => module.ContactForm), {
  ssr: false,
  loading: () => <AsyncSectionPlaceholder />,
});

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch for publishing, call for paper, printing, distribution, and store support through a structured lead form.",
  path: "/contact",
});

export default function ContactPage() {
  const mapQuery = encodeURIComponent(siteConfig.location);

  return (
    <SiteShell>
      <PageHero
        title="Get in Touch"
        subtitle="Have a manuscript, a printing requirement, or a publishing question? We're here to help."
        breadcrumbs={[{ label: "Contact" }]}
        backgroundSrc={heroImages.contactHero}
        backgroundAlt="Professional client discussion and contact support"
      />

      <section className="py-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <ContactForm />
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <div className="border-b border-border px-8 py-6">
                <SectionHeading
                  eyebrow="Visit Us"
                  title="Find our office on Google Maps."
                  description="Use the map for quick directions before you visit or call."
                />
              </div>
              <iframe
                title="Eagle Leap Publication Map"
                src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="card-reveal rounded-3xl border border-border bg-card p-8 shadow-card">
              <SectionHeading eyebrow="Contact Info" title="Reach Eagle Leap Publication directly." />
              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-accent text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Location</p>
                    <p className="mt-2 font-semibold text-primary">{siteConfig.location}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-accent text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
                    <p className="mt-2 font-semibold text-primary">{siteConfig.phone}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-accent text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Email</p>
                    <p className="mt-2 font-semibold text-primary">{siteConfig.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <IllustrationPanel
              src={heroImages.contactSupport}
              alt="Professional note-taking and support coordination"
              eyebrow="Response Experience"
              title="Professional support presentation for authors, institutions, and buyers."
              description="This helps the contact page feel like a proper business support channel rather than only a form block."
              items={contactResponsePoints}
              dark
              className="h-auto p-6 md:p-8"
              mediaClassName="mt-6 aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/10]"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
