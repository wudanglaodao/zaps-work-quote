import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

describe("domain and legacy-path redirects", () => {
  it("permanently sends every zaps.work request to quote.loeme.com and keeps its path and query", () => {
    const response = proxy(new NextRequest("https://zaps.work/calculators/window-cleaning-quote?currency=JPY"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://quote.loeme.com/calculators/window-cleaning-quote?currency=JPY");
  });

  it("keeps the former tools path redirect on the new domain", () => {
    const response = proxy(new NextRequest("https://quote.loeme.com/zh-hans/tools/laser-cutting-cost-calculator"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://quote.loeme.com/zh-hans/calculators/laser-cutting-cost-calculator");
  });

  it("sends old-domain tools URLs directly to their final calculator URL", () => {
    const response = proxy(new NextRequest("https://www.zaps.work/tools/3d-print-cost-calculator"));

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://quote.loeme.com/calculators/3d-print-cost-calculator");
  });
});
