import { DashboardShell } from "@/components/site/dashboard-shell";
import { authorDashboard } from "@/data/site-data";
import { requireDemoSessionRole } from "@/lib/demo-session";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Author Dashboard",
  description: "Author dashboard preview including profile data, publications, certificates, PDFs, royalty information, and manuscript tracking.",
  path: "/author",
});

export default function AuthorDashboardPage() {
  const user = requireDemoSessionRole(["author"]);

  return (
    <DashboardShell
      title="Author Dashboard"
      description="A dashboard built for publication visibility, manuscript progress, sales reporting, royalty communication, and certificate access."
      cards={authorDashboard.cards}
      user={user}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-card p-8 shadow-card">
          <h2 className="text-2xl font-bold text-primary">Published Works</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>• Multidisciplinary Perspectives on Learning</p>
            <p>• Research Methods for Applied Scholarship</p>
            <p>• Digital Literacy and Academic Growth</p>
          </div>
        </div>
        <div className="rounded-3xl bg-card p-8 shadow-card">
          <h2 className="text-2xl font-bold text-primary">Dashboard Controls</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>• Review manuscript status</p>
            <p>• Access certificates and PDFs</p>
            <p>• View royalty and earning details</p>
            <p>• Manage profile and account settings</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
