import type { Metadata } from "next";

import { siteConfig } from "@/data/site-config";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function createMetadata({ title, description, path = "/" }: MetadataInput): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL("https://www.eagleleappublication.com"),
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: normalizedPath,
      siteName: siteConfig.name,
      images: ["/og-image.jpg"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.jpg"],
    },
  };
}
