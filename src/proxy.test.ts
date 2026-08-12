import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

describe("domain and legacy-path redirects", () => {
  it("permanently sends quote.loeme.com requests to zaps.work and keeps their path and query", () => {
    const response = proxy(new NextRequest("https://quote.loeme.com/calculators/window-cleaning-quote?currency=JPY"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://zaps.work/calculators/window-cleaning-quote?currency=JPY");
  });

  it("keeps the former tools path redirect on the new domain", () => {
    const response = proxy(new NextRequest("https://zaps.work/zh-hans/tools/laser-cutting-cost-calculator"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://zaps.work/zh-hans/calculators/laser-cutting-cost-calculator");
  });

  it("sends legacy-domain tools URLs directly to their final calculator URL", () => {
    const response = proxy(new NextRequest("https://quote.loeme.com/tools/3d-print-cost-calculator"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://zaps.work/calculators/3d-print-cost-calculator");
  });

  it("sends the www host to the canonical zaps.work host", () => {
    const response = proxy(new NextRequest("https://www.zaps.work/guides?source=bookmark"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://zaps.work/guides?source=bookmark");
  });
});
