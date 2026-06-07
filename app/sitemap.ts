import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${siteUrl}/tr`,
      lastModified: now,
      alternates: {
        languages: { tr: `${siteUrl}/tr`, en: `${siteUrl}/en` },
      },
    },
    {
      url: `${siteUrl}/en`,
      lastModified: now,
      alternates: {
        languages: { tr: `${siteUrl}/tr`, en: `${siteUrl}/en` },
      },
    },
  ];
}
