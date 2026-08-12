import { NextResponse } from "next/server";
import { checkD1Analytics, isD1Configured } from "@/lib/cloudflare/d1";
import { siteConfig } from "@/lib/site";

export async function GET() {
  if (!isD1Configured()) {
    return NextResponse.json({ status: "ok", service: new URL(siteConfig.url).hostname, analytics: "not_configured", time: new Date().toISOString() });
  }

  let analytics = "ready";
  try {
    await checkD1Analytics();
  } catch {
    analytics = "migration_required";
  }
  return NextResponse.json({
    status: "ok",
    service: new URL(siteConfig.url).hostname,
    analytics,
    time: new Date().toISOString(),
  });
}
