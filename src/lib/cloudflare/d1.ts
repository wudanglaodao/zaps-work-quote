type D1Parameter = string | number | null;

type D1Result = {
  success?: boolean;
  results?: unknown[];
};

type D1ApiResponse = {
  success?: boolean;
  errors?: Array<{ code?: number; message?: string }>;
  result?: D1Result | D1Result[];
};

export type AnalyticsEventRow = {
  eventType: string;
  toolSlug: string;
  toolVersion: string;
  formulaVersion: string;
  locale: string;
  currency: string;
  timeZone: string | null;
  countryCode: string | null;
  regionCode: string | null;
  itemCount: number;
  totalCost: number;
  quoteTotal: number;
  margin: number;
  quoteSnapshot: unknown | null;
};

function configuration() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_D1_API_TOKEN;
  return accountId && databaseId && apiToken ? { accountId, databaseId, apiToken } : null;
}

export function isD1Configured() {
  return configuration() !== null;
}

function errorMessage(payload: D1ApiResponse) {
  return payload.errors?.map((error) => error.message || `D1 error ${error.code ?? "unknown"}`).join("; ") || "D1 query failed";
}

export async function queryD1(sql: string, params: D1Parameter[] = []) {
  const config = configuration();
  if (!config) throw new Error("Cloudflare D1 is not configured");

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.accountId}/d1/database/${config.databaseId}/query`, {
    method: "POST",
    headers: { authorization: `Bearer ${config.apiToken}`, "content-type": "application/json" },
    body: JSON.stringify({ sql, params }),
    signal: AbortSignal.timeout(8_000),
  });
  const payload = await response.json().catch(() => null) as D1ApiResponse | null;
  if (!response.ok || !payload?.success) throw new Error(payload ? errorMessage(payload) : `D1 request failed (${response.status})`);

  const results = Array.isArray(payload.result) ? payload.result : [payload.result];
  if (results.some((result) => !result?.success)) throw new Error(errorMessage(payload));
  return results.flatMap((result) => result?.results || []);
}

export async function insertAnalyticsEvent(row: AnalyticsEventRow) {
  await queryD1(
    `insert into analytics_events (
      event_type, tool_slug, tool_version, formula_version, locale, currency,
      time_zone, country_code, region_code, item_count, total_cost, quote_total,
      margin, quote_snapshot
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      row.eventType, row.toolSlug, row.toolVersion, row.formulaVersion, row.locale, row.currency,
      row.timeZone, row.countryCode, row.regionCode, row.itemCount, row.totalCost, row.quoteTotal,
      row.margin, row.quoteSnapshot ? JSON.stringify(row.quoteSnapshot) : null,
    ],
  );
}

export async function checkD1Analytics() {
  await queryD1("select id from analytics_events limit 1");
}
