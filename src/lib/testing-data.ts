import { adminModules } from "@/data/admin-data";

import { getRegisteredPublicUsers, getTestingFixtures } from "./demo-auth";

export function getAdminTestingLinks() {
  return [
    {
      label: "Register Portal",
      href: "/register",
      description: "Create buyer, author, and distributor accounts before login.",
    },
    {
      label: "Login Portal",
      href: "/login",
      description: "Login for buyer, author, distributor, or admin testing.",
    },
    {
      label: "Buyer Dashboard",
      href: "/buyer",
      description: "Protected buyer area. Requires a registered buyer login.",
    },
    {
      label: "Author Dashboard",
      href: "/author",
      description: "Protected author area. Requires a registered author login.",
    },
    {
      label: "Distributor Dashboard",
      href: "/distributor",
      description: "Protected distributor area. Requires a registered distributor login.",
    },
    {
      label: "Admin Panel",
      href: "/admin",
      description: "Protected admin workspace.",
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
      publicRegistrationRequired: true,
      notes: [
        "Buyer, author, and distributor accounts are not pre-seeded anymore.",
        "Admin access is available through the seeded testing account.",
        "Public role dashboards redirect back to login until the user signs in with the matching role.",
      ],
      fixtures,
    },
    links: getAdminTestingLinks(),
    currentRegisteredUsers: getRegisteredPublicUsers(),
    adminModules: adminModules.map((module) => ({
      slug: module.slug,
      label: module.label,
      title: module.title,
      href: `/admin/${module.slug}`,
      access: module.access,
      sampleRows: module.table.rows.length,
    })),
  };
}
