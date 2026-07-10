import { z } from "zod";
import { currencies } from "../currency";
import { locales } from "../i18n/config";

const amountSchema = z.number().finite().min(0).max(1_000_000_000);

export const quoteSnapshotSchema = z.object({
  inputs: z.object({
    items: z.array(z.object({
      material: z.enum(["PLA", "PETG", "ABS", "TPU", "Other"]),
      quantity: z.number().int().min(1).max(10_000),
      filamentGrams: amountSchema,
      printHours: amountSchema,
      printMinutes: z.number().int().min(0).max(59),
      spoolPrice: amountSchema,
      spoolWeightGrams: z.number().finite().positive().max(1_000_000),
      preparationMinutes: amountSchema,
      postProcessingMinutes: amountSchema,
      packagingCost: amountSchema,
    }).strict()).min(1).max(10),
    machineRate: amountSchema,
    laborRate: amountSchema,
    failureRate: z.number().finite().min(0).max(50),
    wasteRate: z.number().finite().min(0).max(100),
    powerDrawWatts: amountSchema,
    electricityRate: amountSchema,
    targetMargin: z.number().finite().min(0).max(95),
    minimumFee: amountSchema,
    shippingCost: amountSchema,
    taxRate: z.number().finite().min(0).max(100),
  }).strict(),
  outputs: z.object({
    items: z.array(z.object({
      materialCost: amountSchema,
      machineCost: amountSchema,
      electricityCost: amountSchema,
      laborCost: amountSchema,
      failureRiskCost: amountSchema,
      totalCost: amountSchema,
      quoteAmount: amountSchema,
    }).strict()).min(1).max(10),
    totalCost: amountSchema,
    subtotal: amountSchema,
    tax: amountSchema,
    total: amountSchema,
    profit: z.number().finite().min(-1_000_000_000).max(1_000_000_000),
    margin: z.number().finite().min(-10).max(1),
  }).strict(),
}).strict();

export const analyticsEventSchema = z.object({
  eventType: z.enum(["calculator_used", "pdf_exported", "csv_exported", "summary_copied"]),
  toolSlug: z.literal("3d-print-cost-calculator"),
  locale: z.enum(locales),
  currency: z.enum(currencies),
  metrics: z.object({
    itemCount: z.number().int().min(1).max(10),
    totalCost: z.number().finite().min(0).max(1_000_000_000),
    quoteTotal: z.number().finite().min(0).max(1_000_000_000),
    margin: z.number().finite().min(-10).max(1),
  }).strict(),
  quoteSnapshot: quoteSnapshotSchema.optional(),
}).strict().superRefine((event, context) => {
  const isExport = event.eventType === "pdf_exported" || event.eventType === "csv_exported";
  if (isExport && !event.quoteSnapshot) {
    context.addIssue({ code: "custom", path: ["quoteSnapshot"], message: "Export events require a quote snapshot" });
  }
  if (!isExport && event.quoteSnapshot) {
    context.addIssue({ code: "custom", path: ["quoteSnapshot"], message: "Only export events may include a quote snapshot" });
  }
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;
export type QuoteSnapshot = z.infer<typeof quoteSnapshotSchema>;
