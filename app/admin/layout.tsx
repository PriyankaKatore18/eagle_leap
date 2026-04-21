import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AdminShell } from "@/components/site/admin/admin-shell";
import { requireDemoSessionRole } from "@/lib/demo-session";

export const metadata: Metadata = {
  title: "Admin | Eagle Leap Publication",
  description: "Role-based Eagle Leap admin panel for CMS, publications, store, and operations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const user = requireDemoSessionRole(["admin"]);

  return <AdminShell user={user}>{children}</AdminShell>;
}
