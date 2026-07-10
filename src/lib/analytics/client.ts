export type ToolEvent = {
  eventType: "calculator_used" | "pdf_exported" | "csv_exported" | "summary_copied";
  toolSlug: "3d-print-cost-calculator";
  locale: "en" | "zh-hant";
  currency: "USD" | "TWD" | "EUR" | "GBP";
  metrics: { itemCount: number; totalCost: number; quoteTotal: number; margin: number };
};

export function trackToolEvent(event: ToolEvent) {
  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(event),
    keepalive: true,
  }).catch(() => undefined);
}
