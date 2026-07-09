import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CMS | Eagle Leap Publication",
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return [];
}

export default function AdminModuleRoute() {
  redirect("/admin/cms");
}
