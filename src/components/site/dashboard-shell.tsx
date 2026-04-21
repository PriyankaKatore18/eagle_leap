import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import type { DemoSessionUser } from "@/lib/demo-auth";

type DashboardShellProps = {
  title: string;
  description: string;
  cards: { label: string; value: string }[];
  user: DemoSessionUser;
  children: ReactNode;
};

export function DashboardShell({ title, description, cards, user, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-secondary pt-28">
      <div className="container-custom pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
            <ArrowLeft className="h-4 w-4" /> Back to login portal
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-primary shadow-card">
              Signed in as <span className="font-semibold">{user.name}</span> ({user.role})
            </div>
            <Link
              href="/api/logout?redirect=/login"
              className="rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-card"
            >
              Sign out
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-6 rounded-3xl gradient-brand p-8 text-white shadow-elegant lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Secure dashboard preview</p>
            <h1 className="mt-4 text-4xl font-extrabold">{title}</h1>
            <p className="mt-4 max-w-2xl text-white/80">{description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-sm text-white/70">{card.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-accent">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
