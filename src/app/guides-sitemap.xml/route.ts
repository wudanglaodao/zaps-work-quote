import { guideSitemapPaths, renderEnglishUrlSet } from "@/lib/sitemap";

export function GET() {
  return new Response(renderEnglishUrlSet(guideSitemapPaths), { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
