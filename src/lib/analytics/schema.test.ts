import { describe, expect, it } from "vitest";
import { analyticsEventSchema } from "./schema";

const snapshot = {
  inputs: {
    items: [{ material: "PLA", quantity: 1, filamentGrams: 120, printHours: 6, printMinutes: 30, spoolPrice: 24, spoolWeightGrams: 1000, preparationMinutes: 10, postProcessingMinutes: 15, packagingCost: 2 }],
    machineRate: 0.5,
    laborRate: 20,
    failureRate: 5,
    wasteRate: 5,
    powerDrawWatts: 120,
    electricityRate: 0.16,
    targetMargin: 35,
    minimumFee: 10,
    shippingCost: 0,
    taxRate: 0,
  },
  outputs: {
    items: [{ materialCost: 3.02, machineCost: 3.25, electricityCost: 0.12, laborCost: 8.33, failureRiskCost: 0.34, totalCost: 17.07, quoteAmount: 26.26 }],
    totalCost: 17.07,
    subtotal: 26.26,
    tax: 0,
    total: 26.26,
    profit: 9.19,
    margin: 0.35,
  },
};

const exportEvent = {
  eventType: "pdf_exported",
  toolSlug: "3d-print-cost-calculator",
  locale: "en",
  currency: "USD",
  metrics: { itemCount: 1, totalCost: 17.07, quoteTotal: 26.26, margin: 0.35 },
  quoteSnapshot: snapshot,
};

describe("analytics event privacy schema", () => {
  it("accepts an allowlisted export snapshot", () => {
    expect(analyticsEventSchema.safeParse(exportEvent).success).toBe(true);
  });

  it("rejects free-text and customer fields", () => {
    const unsafe = structuredClone(exportEvent);
    Object.assign(unsafe.quoteSnapshot.inputs.items[0], { itemName: "Private prototype", customerEmail: "customer@example.com" });
    expect(analyticsEventSchema.safeParse(unsafe).success).toBe(false);
  });

  it("requires snapshots only for export events", () => {
    expect(analyticsEventSchema.safeParse({ ...exportEvent, quoteSnapshot: undefined }).success).toBe(false);
    expect(analyticsEventSchema.safeParse({ ...exportEvent, eventType: "summary_copied" }).success).toBe(false);
  });
});
