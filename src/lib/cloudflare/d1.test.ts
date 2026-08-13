import { afterEach, describe, expect, it, vi } from "vitest";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { insertAnalyticsEvent, isD1Configured } from "./d1";

vi.mock("@opennextjs/cloudflare", () => ({ getCloudflareContext: vi.fn() }));

afterEach(() => vi.clearAllMocks());

describe("Cloudflare D1 analytics client", () => {
  it("uses the Worker D1 binding and parameterized SQL", async () => {
    const run = vi.fn().mockResolvedValue({ success: true });
    const bind = vi.fn().mockReturnValue({ run });
    const prepare = vi.fn().mockReturnValue({ bind });
    vi.mocked(getCloudflareContext).mockReturnValue({ env: { DB: { prepare } } } as never);

    await insertAnalyticsEvent({
      eventType: "pdf_exported", toolSlug: "3d-print-cost-calculator", toolVersion: "1.0.0", formulaVersion: "3d-print-v1",
      locale: "en", currency: "USD", timeZone: "Asia/Shanghai", countryCode: "CN", regionCode: "SH", ipHash: "a".repeat(64),
      itemCount: 1, totalCost: 10, quoteTotal: 15, margin: .33, quoteSnapshot: { kind: "3d-print" },
    });

    expect(prepare).toHaveBeenCalledWith(expect.stringContaining("insert into analytics_events"));
    expect(bind).toHaveBeenCalledWith(
      "pdf_exported", "3d-print-cost-calculator", "1.0.0", "3d-print-v1", "en", "USD",
      "Asia/Shanghai", "CN", "SH", "a".repeat(64), 1, 10, 15, .33, '{"kind":"3d-print"}',
    );
    expect(run).toHaveBeenCalledOnce();
  });

  it("reports the binding as unavailable outside a Worker context", () => {
    vi.mocked(getCloudflareContext).mockImplementation(() => { throw new Error("missing context"); });
    expect(isD1Configured()).toBe(false);
  });
});
