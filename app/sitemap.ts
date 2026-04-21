import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/packages",
    "/printing",
    "/call-for-paper",
    "/publications",
    "/journal",
    "/store",
    "/contact",
    "/publish-my-book",
    "/login",
    "/register",
    "/blog",
    "/privacy-policy",
    "/terms-conditions",
    "/refund-policy",
    "/shipping-policy",
  ];

  return routes.map((route) => ({
    url: `https://www.eagleleappublication.com${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
