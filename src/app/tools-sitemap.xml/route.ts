import { renderUrlSet, toolSitemapPaths } from "@/lib/sitemap";

export function GET() {
  return new Response(renderUrlSet(toolSitemapPaths), { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
