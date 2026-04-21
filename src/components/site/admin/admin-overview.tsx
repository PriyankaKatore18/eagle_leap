import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { adminModules, adminOverviewCards, adminRecentActivity, adminRoleMatrix } from "@/data/admin-data";

import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 rounded-[32px] gradient-brand p-8 text-white shadow-elegant lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Badge variant="secondary" className="bg-white/10 text-white">
            Admin Overview
          </Badge>
          <h2 className="mt-5 text-4xl font-extrabold">One workspace for content, commerce, publications, and operations.</h2>
          <p className="mt-4 max-w-2xl text-white/80">
            This admin layer covers the modules defined in your document while preserving the same premium visual language used on the public site.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {adminOverviewCards.map((card) => (
            <div key={card.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-white/70">{card.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-accent">{card.value}</p>
              <p className="mt-2 text-sm text-white/75">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[28px] border-border shadow-card">
          <CardContent className="p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Modules</p>
                <h3 className="mt-3 text-3xl font-bold text-primary">Required admin modules</h3>
              </div>
              <Badge variant="outline" className="border-primary/20 text-primary">
                {adminModules.length} areas
              </Badge>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {adminModules.map((item) => (
                <Link
                  key={item.slug}
                  href={`/admin/${item.slug}`}
                  className="group rounded-3xl border border-border bg-secondary p-5 transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-background p-3">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <h4 className="mt-4 text-xl font-bold text-primary">{item.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  <p className="mt-4 text-sm font-semibold text-accent">{item.accent}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[28px] border-border shadow-card">
            <CardContent className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Recent Activity</p>
              <div className="mt-5 grid gap-4">
                {adminRecentActivity.map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-secondary p-4 text-sm text-primary">
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border shadow-card">
            <CardContent className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Role Access Matrix</p>
              <div className="mt-5 overflow-hidden rounded-3xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Scope</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminRoleMatrix.map((item) => (
                      <TableRow key={item.role}>
                        <TableCell className="font-semibold text-primary">{item.role}</TableCell>
                        <TableCell className="text-muted-foreground">{item.scope}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
