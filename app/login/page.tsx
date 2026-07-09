import dynamic from "next/dynamic";
import { Database, LockKeyhole, ShieldCheck } from "lucide-react";

import { AsyncSectionPlaceholder } from "@/components/site/async-section-placeholder";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { createMetadata } from "@/lib/seo";

const AuthPortal = dynamic(() => import("@/components/site/forms/auth-portal").then((module) => module.AuthPortal), {
  ssr: false,
  loading: () => <AsyncSectionPlaceholder variant="portal" />,
});

export const metadata = createMetadata({
  title: "Admin Login",
  description: "Secure Eagle Leap admin login for managing books, authors, blogs, publications, and CMS content.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <SiteShell>
      <PageHero
        title="Admin Login"
        subtitle="Sign in once to manage Eagle Leap books, authors, blogs, publications, homepage content, and store records."
        showBreadcrumbs={false}
      />

      <section className="py-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Management Access"
              title="One secure admin account for the whole CMS."
              description="Use the admin login to update MySQL-backed content across the public frontend without buyer, author, or distributor account options."
            />
            <div className="grid gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "Single Admin Login",
                  text: "Only the seeded admin account can access the management panel.",
                },
                {
                  icon: LockKeyhole,
                  title: "Protected Management",
                  text: "Admin pages redirect here until the correct account is signed in.",
                },
                {
                  icon: Database,
                  title: "MySQL CMS",
                  text: "Manage books, publications, authors, blogs, and homepage content from one database-backed panel.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-border bg-card p-8 shadow-card">
                  <item.icon className="h-10 w-10 text-accent" />
                  <h3 className="mt-5 text-2xl font-bold text-primary">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <AuthPortal />
        </div>
      </section>
    </SiteShell>
  );
}
