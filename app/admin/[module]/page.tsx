import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdminModulePage } from "@/components/site/admin/admin-module-page";
import { adminModules, getAdminModule } from "@/data/admin-data";

type ModulePageProps = {
  params: Promise<{ module: string }>;
};

export async function generateStaticParams() {
  return adminModules.map((module) => ({
    module: module.slug,
  }));
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const module = getAdminModule(resolvedParams.module);

  if (!module) {
    return {
      title: "Admin Module | Eagle Leap Publication",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${module.title} | Eagle Leap Publication`,
    description: module.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminModuleRoute({ params }: ModulePageProps) {
  const resolvedParams = await params;
  const module = getAdminModule(resolvedParams.module);

  if (!module) {
    notFound();
  }

  return <AdminModulePage module={module} />;
}
