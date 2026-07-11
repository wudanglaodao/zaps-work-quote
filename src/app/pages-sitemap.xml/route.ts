import { pageSitemapPaths, renderUrlSet } from "@/lib/sitemap";

export function GET() {
  return new Response(renderUrlSet(pageSitemapPaths), { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
