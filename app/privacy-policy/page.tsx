import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy policy placeholder page for form, lead, and account data handling.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <PageHero title="Privacy Policy" breadcrumbs={[{ label: "Privacy Policy" }]} />
      <section className="py-24">
        <div className="container-custom max-w-4xl rounded-[2rem] border border-border bg-card p-10 shadow-card">
          <p className="leading-relaxed text-muted-foreground">
            This page is prepared for the final privacy policy content covering lead forms, account data, ebook access,
            order information, and communication settings. The admin-managed legal content block can replace this copy
            without changing the frontend structure.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
