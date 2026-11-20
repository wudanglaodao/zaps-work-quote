import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";

describe("domain and legacy-path redirects", () => {
  it("permanently sends zaps.work and quote.loeme.com requests to tools.loeme.com and keeps their path and query", () => {
    const response = middleware(new NextRequest("https://zaps.work/calculators/window-cleaning-quote?currency=JPY"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://tools.loeme.com/calculators/window-cleaning-quote?currency=JPY");
  });

  it("keeps the former tools path redirect on the new domain", () => {
    const response = middleware(new NextRequest("https://tools.loeme.com/zh-hans/tools/laser-cutting-cost-calculator"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://tools.loeme.com/zh-hans/calculators/laser-cutting-cost-calculator");
  });

  it("sends legacy-domain tools URLs directly to their final calculator URL", () => {
    const response = middleware(new NextRequest("https://quote.loeme.com/tools/3d-print-cost-calculator"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://tools.loeme.com/calculators/3d-print-cost-calculator");
  });

  it("sends the www host to the canonical tools.loeme.com host", () => {
    const response = middleware(new NextRequest("https://www.tools.loeme.com/guides?source=bookmark"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://tools.loeme.com/guides?source=bookmark");
  });
});
