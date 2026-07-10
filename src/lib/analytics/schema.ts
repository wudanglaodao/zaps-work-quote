import { z } from "zod";

export const analyticsEventSchema = z.object({
  eventType: z.enum(["calculator_used", "pdf_exported", "csv_exported", "summary_copied"]),
  toolSlug: z.literal("3d-print-cost-calculator"),
  locale: z.enum(["en", "zh-hant"]),
  currency: z.enum(["USD", "TWD", "EUR", "GBP"]),
  metrics: z.object({
    itemCount: z.number().int().min(1).max(10),
    totalCost: z.number().finite().min(0).max(1_000_000_000),
    quoteTotal: z.number().finite().min(0).max(1_000_000_000),
    margin: z.number().finite().min(-10).max(1),
  }).strict(),
}).strict();

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;
