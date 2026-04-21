import dynamic from "next/dynamic";
import { UserPlus } from "lucide-react";

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
  title: "Register",
  description: "Create buyer, author, or distributor accounts and continue into the secure login portal.",
  path: "/register",
});

export default function RegisterPage() {
  return (
    <SiteShell>
      <PageHero
        title="Create Your Account"
        subtitle="Register as a buyer, author, or distributor without changing the established Eagle Leap visual theme."
        breadcrumbs={[{ label: "Register" }]}
      />

      <section className="py-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="New Accounts"
              title="Start with registration, continue with secure login."
              description="Each role follows its own business flow while staying inside one unified, conversion-focused experience."
            />
            <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
              <UserPlus className="h-10 w-10 text-accent" />
              <h3 className="mt-5 text-2xl font-bold text-primary">Role-based onboarding</h3>
              <p className="mt-3 text-muted-foreground">
                Buyers can start purchasing immediately, authors can manage publications and certificates, and
                distributors can access margin-led catalogue workflows after account creation.
              </p>
            </div>
          </div>
          <AuthPortal defaultTab="register" />
        </div>
      </section>
    </SiteShell>
  );
}
