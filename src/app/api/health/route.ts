import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ status: "ok", service: "zaps.work", analytics: "not_configured", time: new Date().toISOString() });
  }

  const { error } = await supabase.from("analytics_events").select("id, quote_snapshot").limit(1);
  return NextResponse.json({
    status: "ok",
    service: "zaps.work",
    analytics: error ? "migration_required" : "ready",
    time: new Date().toISOString(),
  });
}
