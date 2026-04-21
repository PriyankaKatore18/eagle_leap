import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Shipping Policy",
  description: "Shipping policy placeholder page for printed books and related delivery commitments.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  return (
    <SiteShell>
      <PageHero title="Shipping Policy" breadcrumbs={[{ label: "Shipping Policy" }]} />
      <section className="py-24">
        <div className="container-custom max-w-4xl rounded-[2rem] border border-border bg-card p-10 shadow-card">
          <p className="leading-relaxed text-muted-foreground">
            This route is prepared for final shipping policy content, including dispatch timelines, delivery windows,
            tracking updates, and logistics notes for printed book orders.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
