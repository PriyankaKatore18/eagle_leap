import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminTestingBundle } from "@/lib/testing-data";

export function AdminTestingPage() {
  const testingData = getAdminTestingBundle();
  const fixtureEntries = Object.values(testingData.auth.fixtures);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] gradient-brand p-8 text-white shadow-elegant">
        <Badge variant="secondary" className="bg-white/10 text-white">
          Admin Testing
        </Badge>
        <h1 className="mt-4 text-4xl font-extrabold">Protected testing links, fixtures, and JSON export.</h1>
        <p className="mt-4 max-w-3xl text-white/80">
          Buyer, author, and distributor users must register first. Use this page to test those flows, access the admin
          panel, and download the current JSON snapshot.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/api/testing-data"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
          >
            Open JSON export
          </Link>
          <Link
            href="/login?role=admin"
            className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Open admin login
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[28px] border-border shadow-card">
          <CardContent className="p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Auth Fixtures</p>
                <h2 className="mt-3 text-3xl font-bold text-primary">Role-by-role testing data</h2>
              </div>
              <Badge variant="outline" className="border-primary/20 text-primary">
                {fixtureEntries.length} roles
              </Badge>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Register First</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Redirect</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fixtureEntries.map((fixture) => (
                    <TableRow key={fixture.role}>
                      <TableCell className="font-semibold text-primary">{fixture.role}</TableCell>
                      <TableCell className="text-muted-foreground">{fixture.registerFirst ? "Yes" : "No"}</TableCell>
                      <TableCell className="text-muted-foreground">{fixture.loginPayload.email}</TableCell>
                      <TableCell className="text-muted-foreground">{fixture.loginPayload.password}</TableCell>
                      <TableCell className="text-muted-foreground">{fixture.redirectTo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border shadow-card">
          <CardContent className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Rules</p>
            <div className="mt-5 grid gap-3">
              {testingData.auth.notes.map((note) => (
                <div key={note} className="rounded-2xl border border-border bg-secondary p-4 text-sm text-primary">
                  {note}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-[28px] border-border shadow-card">
          <CardContent className="p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Useful Links</p>
                <h2 className="mt-3 text-3xl font-bold text-primary">Testing shortcuts</h2>
              </div>
              <Badge variant="outline" className="border-primary/20 text-primary">
                {testingData.links.length} links
              </Badge>
            </div>
            <div className="mt-6 grid gap-4">
              {testingData.links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-3xl border border-border bg-secondary p-5 transition-transform hover:-translate-y-0.5">
                  <p className="text-lg font-bold text-primary">{link.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{link.description}</p>
                  <p className="mt-3 text-sm font-semibold text-accent">{link.href}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border shadow-card">
          <CardContent className="p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Registered Users</p>
                <h2 className="mt-3 text-3xl font-bold text-primary">Current public accounts</h2>
              </div>
              <Badge variant="outline" className="border-primary/20 text-primary">
                {testingData.currentRegisteredUsers.length} accounts
              </Badge>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testingData.currentRegisteredUsers.length ? (
                    testingData.currentRegisteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-semibold text-primary">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.role}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell className="text-muted-foreground">{new Date(user.createdAt).toLocaleString("en-IN")}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                        No buyer, author, or distributor accounts have been registered yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-[28px] border-border shadow-card">
        <CardContent className="p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Admin Modules</p>
              <h2 className="mt-3 text-3xl font-bold text-primary">Module links for panel testing</h2>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary">
              {testingData.adminModules.length} modules
            </Badge>
          </div>
          <div className="mt-6 overflow-hidden rounded-3xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Sample Rows</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testingData.adminModules.map((module) => (
                  <TableRow key={module.slug}>
                    <TableCell className="font-semibold text-primary">{module.title}</TableCell>
                    <TableCell className="text-muted-foreground">{module.href}</TableCell>
                    <TableCell className="text-muted-foreground">{module.access.join(", ")}</TableCell>
                    <TableCell className="text-muted-foreground">{module.sampleRows}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
