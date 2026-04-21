import dynamic from "next/dynamic";
import { LockKeyhole, ShieldCheck, ShoppingCart, UserRound } from "lucide-react";

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
  title: "Login and Registration",
  description: "Buyer, author, and distributor registration and login with a clean role-based access experience.",
  path: "/login",
});

type LoginPageProps = {
  searchParams?: {
    role?: string;
  };
};

function resolveRole(role?: string) {
  if (role === "author" || role === "buyer" || role === "distributor" || role === "admin") {
    return role;
  }

  return "buyer";
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const defaultRole = resolveRole(searchParams?.role);

  return (
    <SiteShell>
      <PageHero
        title="Login and Registration System"
        subtitle="Buyers, authors, and distributors must create accounts first, then access their role-based dashboards."
        breadcrumbs={[{ label: "Login" }]}
      />

      <section className="py-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Access Portals"
              title="Three focused account journeys, one consistent UI."
              description="Register and log in as a buyer, author, or distributor while keeping the same premium Eagle Leap experience across all roles."
            />
            <div className="grid gap-6">
              {[
                {
                  icon: ShoppingCart,
                  title: "Buyer Login",
                  text: "Order history, saved address, wishlist, and invoice access.",
                },
                {
                  icon: UserRound,
                  title: "Author Dashboard",
                  text: "Published books and papers, sales reports, royalty details, certificates, and manuscript status.",
                },
                {
                  icon: LockKeyhole,
                  title: "Distributor Login",
                  text: "Discount visibility, 10-20 copy ordering, catalogue access, stock view, and account section.",
                },
                {
                  icon: ShieldCheck,
                  title: "Admin Testing",
                  text: "Use the seeded admin test account to review the admin panel, JSON fixtures, and protected links.",
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
          <AuthPortal defaultRole={defaultRole} />
        </div>
      </section>
    </SiteShell>
  );
}
