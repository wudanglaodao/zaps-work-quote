import { NextResponse } from "next/server";
import { analyticsEventSchema } from "@/lib/analytics/schema";
import { insertAnalyticsEvent, isD1Configured } from "@/lib/cloudflare/d1";

export const runtime = "nodejs";

function requestContext(request: Request) {
  const countryCode = request.headers.get("x-vercel-ip-country")?.trim().toUpperCase() ?? "";
  const regionCode = request.headers.get("x-vercel-ip-country-region")?.trim().toUpperCase() ?? "";
  return {
    countryCode: /^[A-Z]{2}$/.test(countryCode) ? countryCode : null,
    regionCode: /^[A-Z0-9-]{1,8}$/.test(regionCode) ? regionCode : null,
  };
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 4096) return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = analyticsEventSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  if (!isD1Configured()) return NextResponse.json({ error: "Analytics unavailable" }, { status: 503 });
  const event = parsed.data;
  const context = requestContext(request);
  const eventRow = {
    eventType: event.eventType,
    toolSlug: event.toolSlug,
    toolVersion: "1.0.0",
    formulaVersion: event.toolSlug === "pressure-washing-quote" ? "pressure-washing-v1" : event.toolSlug === "laser-cutting-cost-calculator" ? "laser-cutting-v1" : "3d-print-v1",
    locale: event.locale,
    currency: event.currency,
    timeZone: event.timeZone ?? null,
    countryCode: context.countryCode,
    regionCode: context.regionCode,
    itemCount: event.metrics.itemCount,
    totalCost: event.metrics.totalCost,
    quoteTotal: event.metrics.quoteTotal,
    margin: event.metrics.margin,
    quoteSnapshot: event.quoteSnapshot ?? null,
  };
  try {
    await insertAnalyticsEvent(eventRow);
  } catch (error) {
    console.error("analytics insert failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Event unavailable" }, { status: 503 });
  }
  return new NextResponse(null, { status: 204 });
}
