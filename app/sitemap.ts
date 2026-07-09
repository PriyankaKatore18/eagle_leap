import type { MetadataRoute } from "next";

import { getCmsBlogs } from "@/lib/cms-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    "/blog",
    "/privacy-policy",
    "/terms-conditions",
    "/refund-policy",
    "/shipping-policy",
  ];

  const blogs = await getCmsBlogs();
  const blogRoutes = blogs
    .filter((post) => post.status === "published" && post.featured !== false)
    .map((post) => ({
      url: `https://www.eagleleappublication.com/blog/${post.slug}`,
      lastModified: new Date(post.publishAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [
    ...routes.map((route) => ({
      url: `https://www.eagleleappublication.com${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...blogRoutes,
  ];
}
