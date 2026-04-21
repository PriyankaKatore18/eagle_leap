import { DashboardShell } from "@/components/site/dashboard-shell";
import { distributorDashboard } from "@/data/site-data";
import { requireDemoSessionRole } from "@/lib/demo-session";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Distributor Dashboard",
  description: "Distributor dashboard preview with catalogue access, margin support, bulk ordering, and account summaries.",
  path: "/distributor",
});

export default function DistributorDashboardPage() {
  const user = requireDemoSessionRole(["distributor"]);

  return (
    <DashboardShell
      title="Distributor Dashboard"
      description="A distributor-facing area for discounted catalogue access, 10–20 copy ordering, stock visibility, and payment/account management."
      cards={distributorDashboard.cards}
      user={user}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-card p-8 shadow-card">
          <h2 className="text-2xl font-bold text-primary">Distribution Controls</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>• View books visible to distributor accounts</p>
            <p>• Set and review 30% margin information</p>
            <p>• Place direct 10–20 copy orders</p>
            <p>• Check stock and account updates</p>
          </div>
        </div>
        <div className="rounded-3xl bg-card p-8 shadow-card">
          <h2 className="text-2xl font-bold text-primary">Account Summary</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>• Bulk order option</p>
            <p>• Order history timeline</p>
            <p>• Payment and margin section</p>
            <p>• Catalogue by selected titles</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
