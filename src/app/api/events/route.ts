import { NextResponse } from "next/server";
import { analyticsEventSchema } from "@/lib/analytics/schema";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

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
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Analytics unavailable" }, { status: 503 });
  const event = parsed.data;
  const { error } = await supabase.from("analytics_events").insert({
    event_type: event.eventType,
    tool_slug: event.toolSlug,
    tool_version: "1.0.0",
    formula_version: "3d-print-v1",
    locale: event.locale,
    currency: event.currency,
    item_count: event.metrics.itemCount,
    total_cost: event.metrics.totalCost,
    quote_total: event.metrics.quoteTotal,
    margin: event.metrics.margin,
    quote_snapshot: event.quoteSnapshot ?? null,
  });
  if (error) {
    console.error("analytics insert failed", error.code);
    return NextResponse.json({ error: "Event unavailable" }, { status: 503 });
  }
  return new NextResponse(null, { status: 204 });
}
