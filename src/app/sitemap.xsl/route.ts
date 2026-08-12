const sitemapXsl = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>zaps.work sitemap</title>
        <style>
          :root { color-scheme: light; --bg: #f7f9f7; --surface: #fff; --ink: #07100a; --muted: #526158; --line: #dce4de; --green: #087b32; --soft: #ebfaf0; }
          * { box-sizing: border-box; }
          body { margin: 0; background: var(--bg); color: var(--ink); font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
          main { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 48px 0 72px; }
          header { display: flex; align-items: end; justify-content: space-between; gap: 24px; padding-bottom: 28px; border-bottom: 1px solid var(--line); }
          h1 { margin: 0; font-size: 32px; letter-spacing: -.02em; }
          p { margin: 8px 0 0; color: var(--muted); }
          .badge { padding: 5px 9px; border: 1px solid #9ed3ad; border-radius: 2px; background: var(--soft); color: var(--green); font-size: 12px; font-weight: 700; }
          section { margin-top: 28px; padding: 22px; border: 1px solid var(--line); background: var(--surface); box-shadow: 0 12px 30px rgba(7,16,10,.05); }
          h2 { margin: 0 0 16px; font-size: 18px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 12px 10px; border-top: 1px solid var(--line); text-align: left; vertical-align: top; }
          th { color: var(--muted); font-size: 12px; font-weight: 700; text-transform: uppercase; }
          a { color: var(--green); overflow-wrap: anywhere; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .langs { display: flex; flex-wrap: wrap; gap: 6px; }
          .langs a { padding: 3px 6px; border: 1px solid var(--line); border-radius: 2px; font-size: 11px; }
          @media (max-width: 680px) { main { padding-top: 28px; } header { display: block; } .badge { display: inline-block; margin-top: 18px; } section { padding: 14px; overflow-x: auto; } table { min-width: 680px; } }
        </style>
      </head>
      <body>
        <main>
          <header><div><h1>zaps.work sitemap</h1><p>Search-engine index for cost calculators and quote tools.</p></div><span class="badge"><xsl:value-of select="count(//s:url) + count(//s:sitemap)" /> entries</span></header>
          <xsl:choose>
            <xsl:when test="s:sitemapindex">
              <section><h2>Sitemap sections</h2><table><thead><tr><th>File</th><th>Last modified</th></tr></thead><tbody><xsl:for-each select="s:sitemapindex/s:sitemap"><tr><td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td><td><xsl:value-of select="s:lastmod" /></td></tr></xsl:for-each></tbody></table></section>
            </xsl:when>
            <xsl:otherwise>
              <section><h2>Indexed URLs</h2><table><thead><tr><th>URL</th><th>Language versions</th><th>Last modified</th><th>Frequency</th></tr></thead><tbody><xsl:for-each select="s:urlset/s:url"><tr><td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td><td><div class="langs"><xsl:for-each select="xhtml:link"><a href="{@href}"><xsl:value-of select="@hreflang" /></a></xsl:for-each></div></td><td><xsl:value-of select="s:lastmod" /></td><td><xsl:value-of select="s:changefreq" /></td></tr></xsl:for-each></tbody></table></section>
            </xsl:otherwise>
          </xsl:choose>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

export function GET() {
  return new Response(sitemapXsl, { headers: { "Content-Type": "application/xslt+xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
