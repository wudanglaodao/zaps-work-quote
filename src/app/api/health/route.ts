import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok", service: "zaps.work", time: new Date().toISOString() });
}
