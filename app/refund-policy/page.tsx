import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Refund Policy",
  description: "Refund policy placeholder page for store and service workflows.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <SiteShell>
      <PageHero title="Refund Policy" breadcrumbs={[{ label: "Refund Policy" }]} />
      <section className="py-24">
        <div className="container-custom max-w-4xl rounded-[2rem] border border-border bg-card p-10 shadow-card">
          <p className="leading-relaxed text-muted-foreground">
            This space is reserved for the final refund policy related to store products, order cancellations, service
            commitments, and payment handling.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
