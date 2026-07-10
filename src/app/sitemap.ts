import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { languageAlternates, localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pages = ["", "tools", "tools/3d-print-cost-calculator", "privacy"];
const lastModified = new Date("2026-07-10");

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) => locales.map((locale) => ({
    url: `${siteConfig.url}${localizedPath(locale, path)}`,
    lastModified,
    changeFrequency: path.includes("tools/") ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path.includes("tools/") ? 0.9 : 0.6,
    alternates: { languages: languageAlternates(path) },
  })));
}
