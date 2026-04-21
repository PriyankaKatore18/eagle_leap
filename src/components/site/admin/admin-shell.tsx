"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, FlaskConical, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { adminModules } from "@/data/admin-data";
import type { DemoSessionUser } from "@/lib/demo-auth";
import { cn } from "@/lib/utils";

import { SiteLogo } from "../site-logo";

type AdminShellProps = {
  children: ReactNode;
  user: DemoSessionUser;
};

export function AdminShell({ children, user }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-secondary">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-6">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[28px] border border-border bg-card p-6 shadow-card">
            <div className="rounded-3xl gradient-brand p-6 text-white shadow-elegant">
              <SiteLogo light size="sm" />
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Admin Panel</p>
              <h1 className="mt-4 text-3xl font-extrabold">Eagle Leap Control Room</h1>
              <p className="mt-3 text-sm text-white/80">
                CMS, commerce, publications, leads, and role-based operations inside the same brand-safe system.
              </p>
              <Link href="/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                <ArrowLeft className="h-4 w-4" /> Back to website
              </Link>
            </div>

            <div className="mt-6">
              <div className="rounded-3xl border border-border bg-secondary p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Session</p>
                <h2 className="mt-3 text-lg font-bold text-primary">{user.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {user.role}
                  </span>
                  <Link
                    href="/api/logout?redirect=%2Flogin%3Frole%3Dadmin"
                    className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-background"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Modules</p>
              <nav className="mt-4 grid gap-2">
                <Link
                  href="/admin"
                  className={cn(
                    "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                    pathname === "/admin"
                      ? "border-primary/30 bg-primary text-primary-foreground"
                      : "border-border bg-background text-primary hover:border-primary/20 hover:bg-secondary",
                  )}
                >
                  <span>Overview</span>
                  <ShieldCheck className="h-4 w-4" />
                </Link>
                <Link
                  href="/admin/testing"
                  className={cn(
                    "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                    pathname === "/admin/testing"
                      ? "border-primary/30 bg-primary text-primary-foreground"
                      : "border-border bg-background text-primary hover:border-primary/20 hover:bg-secondary",
                  )}
                >
                  <span>Testing</span>
                  <FlaskConical className="h-4 w-4" />
                </Link>
                {adminModules.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/admin/${item.slug}`}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors",
                      pathname === `/admin/${item.slug}`
                        ? "border-primary/30 bg-primary text-primary-foreground"
                        : "border-border bg-background text-primary hover:border-primary/20 hover:bg-secondary",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-6 rounded-3xl border border-primary/10 bg-secondary p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">RBAC</p>
              <h2 className="mt-3 text-lg font-bold text-primary">Role-based access ready</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Backend APIs already support JWT and scoped admin roles for content, publication, store, and operational access.
              </p>
            </div>
          </div>
        </aside>

        <main className="pb-8">{children}</main>
      </div>
    </div>
  );
}
