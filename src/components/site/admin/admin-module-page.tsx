import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { AdminModuleRecord } from "@/data/admin-data";
import { adminModules } from "@/data/admin-data";

import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";

type AdminModulePageProps = {
  module: AdminModuleRecord;
};

export function AdminModulePage({ module }: AdminModulePageProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] gradient-brand p-8 text-white shadow-elegant">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <ArrowLeft className="h-4 w-4" /> Back to admin overview
            </Link>
            <Badge variant="secondary" className="mt-5 bg-white/10 text-white">
              {module.label}
            </Badge>
            <h1 className="mt-4 text-4xl font-extrabold">{module.title}</h1>
            <p className="mt-4 text-lg text-white/80">{module.description}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{module.accent}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/85 backdrop-blur-sm">
            Access: {module.access.join(", ")}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {module.stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-white/70">{stat.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-accent">{stat.value}</p>
              <p className="mt-2 text-sm text-white/75">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="rounded-[28px] border-border shadow-card">
          <CardContent className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Operational Focus</p>
            <div className="mt-5 grid gap-3">
              {module.focus.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-secondary p-4 text-sm text-primary">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border shadow-card">
          <CardContent className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Default Actions</p>
            <div className="mt-5 grid gap-3">
              {module.actions.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-secondary p-4 text-sm text-primary">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border shadow-card">
          <CardContent className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Role Access</p>
            <div className="mt-5 grid gap-3">
              {module.access.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-secondary p-4 text-sm font-semibold text-primary">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-[28px] border-border shadow-card">
        <CardContent className="p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Sample Records</p>
              <h2 className="mt-3 text-3xl font-bold text-primary">{module.title} queue snapshot</h2>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary">
              Preview dataset
            </Badge>
          </div>
          <div className="mt-6 overflow-hidden rounded-3xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  {module.table.columns.map((column) => (
                    <TableHead key={column}>{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {module.table.rows.map((row) => (
                  <TableRow key={row.join("-")}>
                    {row.map((value) => (
                      <TableCell key={value} className="text-muted-foreground">
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminModules
          .filter((item) => item.slug !== module.slug)
          .slice(0, 3)
          .map((item) => (
            <Link key={item.slug} href={`/admin/${item.slug}`} className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <div className="rounded-2xl bg-secondary p-3">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.accent}</p>
            </Link>
          ))}
      </section>
    </div>
  );
}
