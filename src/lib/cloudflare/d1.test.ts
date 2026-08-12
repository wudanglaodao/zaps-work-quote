import { afterEach, describe, expect, it, vi } from "vitest";
import { insertAnalyticsEvent, isD1Configured } from "./d1";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Cloudflare D1 analytics client", () => {
  it("uses a server-only D1 token to insert a parameterized event", async () => {
    vi.stubEnv("CLOUDFLARE_ACCOUNT_ID", "account-id");
    vi.stubEnv("CLOUDFLARE_D1_DATABASE_ID", "database-id");
    vi.stubEnv("CLOUDFLARE_D1_API_TOKEN", "secret-token");
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, result: [{ success: true, results: [] }] })));
    vi.stubGlobal("fetch", fetchMock);

    await insertAnalyticsEvent({
      eventType: "pdf_exported", toolSlug: "3d-print-cost-calculator", toolVersion: "1.0.0", formulaVersion: "3d-print-v1",
      locale: "en", currency: "USD", timeZone: "Asia/Shanghai", countryCode: "CN", regionCode: "SH",
      itemCount: 1, totalCost: 10, quoteTotal: 15, margin: .33, quoteSnapshot: { kind: "3d-print" },
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.cloudflare.com/client/v4/accounts/account-id/d1/database/database-id/query",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ authorization: "Bearer secret-token" }),
      }),
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.sql).toContain("insert into analytics_events");
    expect(body.params.at(-1)).toBe('{"kind":"3d-print"}');
  });

  it("does not report D1 as configured when a required secret is missing", () => {
    vi.stubEnv("CLOUDFLARE_ACCOUNT_ID", "account-id");
    vi.stubEnv("CLOUDFLARE_D1_DATABASE_ID", "database-id");
    vi.stubEnv("CLOUDFLARE_D1_API_TOKEN", "");
    expect(isD1Configured()).toBe(false);
  });
});
