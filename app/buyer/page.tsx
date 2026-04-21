import { DashboardShell } from "@/components/site/dashboard-shell";
import { buyerDashboard } from "@/data/site-data";
import { requireDemoSessionRole } from "@/lib/demo-session";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Buyer Dashboard",
  description: "Buyer dashboard preview with order history, invoices, saved addresses, and wishlist areas.",
  path: "/buyer",
});

export default function BuyerDashboardPage() {
  const user = requireDemoSessionRole(["buyer"]);

  return (
    <DashboardShell
      title="Buyer Dashboard"
      description="Track orders, manage saved addresses, download invoices, and keep a shortlist of titles inside a buyer-friendly account experience."
      cards={buyerDashboard.cards}
      user={user}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-card p-8 shadow-card">
          <h2 className="text-2xl font-bold text-primary">Recent Orders</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>Order #ELP-2041 · Delivered · Research Methods for Applied Scholarship</p>
            <p>Order #ELP-2032 · Shipped · Contemporary Voices in Commerce</p>
            <p>Order #ELP-2025 · Processing · Digital Literacy and Academic Growth</p>
          </div>
        </div>
        <div className="rounded-3xl bg-card p-8 shadow-card">
          <h2 className="text-2xl font-bold text-primary">Account Features</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>• Download invoices</p>
            <p>• Manage saved addresses</p>
            <p>• Maintain wishlist</p>
            <p>• View order status and delivery notes</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
