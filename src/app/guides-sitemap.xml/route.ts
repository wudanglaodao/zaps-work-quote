import { guideSitemapPaths, renderUrlSet } from "@/lib/sitemap";

export function GET() {
  return new Response(renderUrlSet(guideSitemapPaths), { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
