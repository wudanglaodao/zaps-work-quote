import { z } from "zod";
import { currencies } from "../currency";
import { locales } from "../i18n/config";

const amountSchema = z.number().finite().min(0).max(1_000_000_000);

const threeDPrintQuoteSnapshotSchema = z.object({
  kind: z.literal("3d-print"),
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

const pressureWashingQuoteSnapshotSchema = z.object({
  kind: z.literal("pressure-washing"),
  inputs: z.object({
    measurementMode: z.enum(["area", "dimensions"]),
    measurementUnit: z.enum(["sqft", "sqm"]),
    area: amountSchema,
    length: amountSchema,
    width: amountSchema,
    ratePerArea: amountSchema,
    condition: z.enum(["light", "standard", "heavy"]),
    access: z.enum(["normal", "difficult"]),
    crewSize: z.number().int().min(1).max(100),
    crewHours: amountSchema,
    laborRate: amountSchema,
    chemicalsCost: amountSchema,
    equipmentCost: amountSchema,
    travelCost: amountSchema,
    otherCost: amountSchema,
    addOnAmount: amountSchema,
    packageDiscount: amountSchema,
    targetMargin: z.number().finite().min(0).max(95),
    taxRate: z.number().finite().min(0).max(100),
  }).strict(),
  outputs: z.object({
    measuredArea: amountSchema,
    drivewayAmount: amountSchema,
    laborCost: amountSchema,
    directCost: amountSchema,
    costFloor: amountSchema,
    subtotal: amountSchema,
    tax: amountSchema,
    total: amountSchema,
    profit: z.number().finite().min(-1_000_000_000).max(1_000_000_000),
    margin: z.number().finite().min(-10).max(1),
  }).strict(),
}).strict();

export const quoteSnapshotSchema = z.discriminatedUnion("kind", [threeDPrintQuoteSnapshotSchema, pressureWashingQuoteSnapshotSchema]);

export const analyticsEventSchema = z.object({
  eventType: z.enum(["calculator_used", "pdf_exported", "csv_exported", "summary_copied"]),
  toolSlug: z.enum(["3d-print-cost-calculator", "pressure-washing-quote"]),
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
