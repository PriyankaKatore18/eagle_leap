import { adminModules } from "@/data/admin-data";

import { getTestingFixtures } from "./demo-auth";

export function getAdminTestingLinks() {
  return [
    {
      label: "Admin Login",
      href: "/login?role=admin",
      description: "Single admin login for the management panel.",
    },
    {
      label: "CMS Manager",
      href: "/admin/cms",
      description: "Protected admin workspace for books, authors, blogs, publications, and homepage content.",
    },
    {
      label: "Admin Testing Page",
      href: "/admin/testing",
      description: "Live testing matrix, credentials, and module links.",
    },
    {
      label: "Testing Data JSON",
      href: "/api/testing-data",
      description: "Admin-only JSON export for fixtures, links, and module data.",
    },
  ];
}

export function getAdminTestingBundle() {
  const fixtures = getTestingFixtures();

  return {
    generatedAt: new Date().toISOString(),
    auth: {
      publicRegistrationRequired: false,
      notes: [
        "Only the seeded admin account can sign in.",
        "Buyer, author, and distributor login and registration are disabled.",
        "Admin access opens the MySQL-backed management panel.",
      ],
      fixtures,
    },
    links: getAdminTestingLinks(),
    currentRegisteredUsers: [],
    adminModules: adminModules
      .filter((module) => module.slug === "cms")
      .map((module) => ({
        slug: module.slug,
        label: module.label,
        title: module.title,
        href: "/admin/cms",
        access: module.access,
        sampleRows: module.table.rows.length,
      })),
  };
}
