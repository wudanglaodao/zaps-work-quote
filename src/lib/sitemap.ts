import { htmlLanguage, locales, type Locale } from "./i18n/config";
import { localizedPath } from "./seo";
import { siteConfig } from "./site";

export const sitemapLastModified = "2026-07-14";
export const sitemapStyleHref = "/sitemap.xsl?v=20260714";

export const pageSitemapPaths = ["", "tools", "privacy"] as const;
export const toolSitemapPaths = ["tools/3d-print-cost-calculator", "tools/pressure-washing-quote", "tools/laser-cutting-cost-calculator", "tools/cleaning-quote-generator", "tools/house-painting-quote", "tools/freelance-job-quote", "tools/cnc-machining-cost-calculator", "tools/lawn-care-quote"] as const;
export const guideSitemapPaths = ["guides", "guides/how-to-price-3d-prints", "guides/how-to-price-pressure-washing-jobs", "guides/how-to-price-laser-cutting-jobs", "guides/how-to-price-house-cleaning-jobs"] as const;
export const guideEnglishOnlySitemapPaths = ["guides/how-to-price-house-painting-jobs", "guides/how-to-price-freelance-projects", "guides/how-to-price-cnc-machining", "guides/how-to-price-lawn-care-services"] as const;

export function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character] || character);
}

export function localizedUrl(locale: Locale, path: string) {
  return `${siteConfig.url}${localizedPath(locale, path)}`;
}

export function alternateLinks(path: string) {
  return locales.map((locale) => ({ locale: htmlLanguage(locale), href: localizedUrl(locale, path) }));
}

export function renderSitemapUrl(path: string, priority: string, changeFrequency: string) {
  const alternates = alternateLinks(path).map(({ locale, href }) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(locale)}" href="${escapeXml(href)}" />`).join("\n");
  const xDefault = localizedUrl("en", path);
  return `<url>\n  <loc>${escapeXml(localizedUrl("en", path))}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefault)}" />\n  <lastmod>${sitemapLastModified}</lastmod>\n  <changefreq>${changeFrequency}</changefreq>\n  <priority>${priority}</priority>\n</url>\n${locales.slice(1).map((locale) => {
    const localeAlternates = alternateLinks(path).map(({ locale: alternateLocale, href }) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternateLocale)}" href="${escapeXml(href)}" />`).join("\n");
    return `<url>\n  <loc>${escapeXml(localizedUrl(locale, path))}</loc>\n${localeAlternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefault)}" />\n  <lastmod>${sitemapLastModified}</lastmod>\n  <changefreq>${changeFrequency}</changefreq>\n  <priority>${priority}</priority>\n</url>`;
  }).join("\n")}`;
}

export function renderUrlSet(paths: readonly string[], englishOnlyPaths: readonly string[] = []) {
  const localizedUrls = paths.map((path) => renderSitemapUrl(path, path === "" ? "1.0" : path.includes("tools/") ? "0.9" : "0.6", path.includes("tools/") ? "weekly" : "monthly"));
  const englishOnlyUrls = englishOnlyPaths.map((path) => `<url>\n  <loc>${escapeXml(localizedUrl("en", path))}</loc>\n  <lastmod>${sitemapLastModified}</lastmod>\n  <changefreq>monthly</changefreq>\n  <priority>0.6</priority>\n</url>`);
  const urls = [...localizedUrls, ...englishOnlyUrls].join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="${sitemapStyleHref}"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}</urlset>`;
}

export function renderEnglishUrlSet(paths: readonly string[]) {
  const urls = paths.map((path) => `<url>\n  <loc>${escapeXml(localizedUrl("en", path))}</loc>\n  <lastmod>${sitemapLastModified}</lastmod>\n  <changefreq>monthly</changefreq>\n  <priority>${path === "guides" ? "0.7" : "0.8"}</priority>\n</url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="${sitemapStyleHref}"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export function renderSitemapIndex() {
  const entries = ["pages-sitemap.xml", "tools-sitemap.xml", "guides-sitemap.xml"].map((path) => `  <sitemap>\n    <loc>${escapeXml(`${siteConfig.url}/${path}`)}</loc>\n    <lastmod>${sitemapLastModified}</lastmod>\n  </sitemap>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="${sitemapStyleHref}"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>`;
}
