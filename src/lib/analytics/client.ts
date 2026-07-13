import type { QuoteSnapshot } from "./schema";
import type { Currency } from "@/lib/currency";
import type { Locale } from "@/lib/i18n/config";

type EventBase = {
  toolSlug: "3d-print-cost-calculator" | "pressure-washing-quote" | "laser-cutting-cost-calculator" | "cleaning-quote-generator";
  locale: Locale;
  currency: Currency;
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
