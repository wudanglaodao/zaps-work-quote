import { getCloudflareContext } from "@opennextjs/cloudflare";

type D1Parameter = string | number | null;

type D1PreparedStatement = {
  bind(...params: D1Parameter[]): D1PreparedStatement;
  all<T = unknown>(): Promise<{ results?: T[] }>;
  run(): Promise<{ success?: boolean }>;
};

type D1DatabaseLike = {
  prepare(sql: string): D1PreparedStatement;
};

type WorkerEnv = {
  DB?: D1DatabaseLike;
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
  ipHash?: string | null;
  itemCount: number;
  totalCost: number;
  quoteTotal: number;
  margin: number;
  quoteSnapshot: unknown | null;
};

function getDatabase() {
  try {
    const context = getCloudflareContext() as unknown as { env?: WorkerEnv };
    return context.env?.DB ?? null;
  } catch {
    // Local unit tests and a plain `next dev` process have no Worker context.
    return null;
  }
}

export function isD1Configured() {
  return getDatabase() !== null;
}

function prepare(sql: string, params: D1Parameter[]) {
  const database = getDatabase();
  if (!database) throw new Error("Cloudflare D1 binding DB is not configured");
  const statement = database.prepare(sql);
  return params.length ? statement.bind(...params) : statement;
}

export async function queryD1<T = unknown>(sql: string, params: D1Parameter[] = []) {
  const result = await prepare(sql, params).all<T>();
  return result.results ?? [];
}

export async function insertAnalyticsEvent(row: AnalyticsEventRow) {
  const result = await prepare(
    `insert into analytics_events (
      event_type, tool_slug, tool_version, formula_version, locale, currency,
      time_zone, country_code, region_code, ip_hash, item_count, total_cost, quote_total,
      margin, quote_snapshot
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      row.eventType, row.toolSlug, row.toolVersion, row.formulaVersion, row.locale, row.currency,
      row.timeZone, row.countryCode, row.regionCode, row.ipHash ?? null, row.itemCount, row.totalCost, row.quoteTotal,
      row.margin, row.quoteSnapshot ? JSON.stringify(row.quoteSnapshot) : null,
    ],
  ).run();
  if (result.success === false) throw new Error("Cloudflare D1 insert failed");
}

export async function checkD1Analytics() {
  await queryD1("select id from analytics_events limit 1");
}
