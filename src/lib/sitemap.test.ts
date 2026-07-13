import { describe, expect, it } from "vitest";
import { guideSitemapPaths, pageSitemapPaths, renderSitemapIndex, renderUrlSet, toolSitemapPaths } from "./sitemap";

describe("sitemap output", () => {
  it("keeps legacy English and daily URLs out of every sitemap", () => {
    const output = [
      renderUrlSet(pageSitemapPaths),
      renderUrlSet(toolSitemapPaths),
      renderUrlSet(guideSitemapPaths),
    ].join("\n");

    expect(output).not.toContain("/en/");
    expect(output).not.toContain("/daily/");
  });

  it("lists each current child sitemap", () => {
    const output = renderSitemapIndex();

    expect(output).toContain("/pages-sitemap.xml");
    expect(output).toContain("/tools-sitemap.xml");
    expect(output).toContain("/guides-sitemap.xml");
  });

  it("publishes localized guide URLs and reciprocal language alternates", () => {
    const output = renderUrlSet(guideSitemapPaths);

    expect(output).toContain("https://zaps.work/guides/how-to-price-3d-prints");
    expect(output).toContain("https://zaps.work/de/guides/how-to-price-3d-prints");
    expect(output).toContain('hreflang="de"');
    expect(output).toContain('hreflang="x-default"');
  });
});
