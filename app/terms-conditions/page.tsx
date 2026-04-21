import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions placeholder page for publishing, store, and user account usage.",
  path: "/terms-conditions",
});

export default function TermsConditionsPage() {
  return (
    <SiteShell>
      <PageHero title="Terms & Conditions" breadcrumbs={[{ label: "Terms & Conditions" }]} />
      <section className="py-24">
        <div className="container-custom max-w-4xl rounded-[2rem] border border-border bg-card p-10 shadow-card">
          <p className="leading-relaxed text-muted-foreground">
            This route is reserved for final legal terms covering publishing services, store purchases, account roles,
            ebook access conditions, and platform usage rules.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
