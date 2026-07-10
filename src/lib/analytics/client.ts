import type { QuoteSnapshot } from "./schema";

type EventBase = {
  toolSlug: "3d-print-cost-calculator";
  locale: "en" | "zh-hant";
  currency: "USD" | "TWD" | "EUR" | "GBP";
  metrics: { itemCount: number; totalCost: number; quoteTotal: number; margin: number };
};

export type ToolEvent = EventBase & (
  | { eventType: "pdf_exported" | "csv_exported"; quoteSnapshot: QuoteSnapshot }
  | { eventType: "calculator_used" | "summary_copied"; quoteSnapshot?: never }
);

export function trackToolEvent(event: ToolEvent) {
  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(event),
    keepalive: true,
  }).catch(() => undefined);
}
