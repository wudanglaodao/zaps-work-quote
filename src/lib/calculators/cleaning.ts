import { z } from "zod";

const addOnSchema = z.object({
  selected: z.boolean(),
  quantity: z.number().int().min(1).max(100),
  minutes: z.number().finite().min(0).max(10_000),
  fixedPrice: z.number().finite().min(0).max(1_000_000),
});

export const cleaningInputSchema = z.object({
  propertyType: z.enum(["house", "apartment", "condo"]),
  measurementUnit: z.enum(["sqft", "sqm"]),
  area: z.number().finite().positive().max(10_000_000),
  bedrooms: z.number().int().min(0).max(100),
  bathrooms: z.number().finite().min(0).max(100),
  cleaningType: z.enum(["standard", "deep", "move"]),
  frequency: z.enum(["oneTime", "weekly", "biweekly", "monthly"]),
  difficulty: z.enum(["light", "typical", "heavy"]),
  estimationMode: z.enum(["area", "manual"]),
  productionRate: z.number().finite().positive().max(1_000_000),
  manualCleanerHours: z.number().finite().positive().max(10_000),
  crewSize: z.number().int().min(1).max(100),
  laborCostPerHour: z.number().finite().min(0).max(1_000_000),
  overheadPerHour: z.number().finite().min(0).max(1_000_000),
  suppliesCost: z.number().finite().min(0).max(1_000_000),
  travelCost: z.number().finite().min(0).max(1_000_000),
  addOns: z.object({ oven: addOnSchema, fridge: addOnSchema, windows: addOnSchema, cabinets: addOnSchema, laundry: addOnSchema, petHair: addOnSchema }),
  targetMargin: z.number().finite().min(0).max(95),
  minimumFee: z.number().finite().min(0).max(1_000_000),
  frequencyDiscount: z.number().finite().min(0).max(95),
  firstCleanSurcharge: z.number().finite().min(0).max(500),
  taxRate: z.number().finite().min(0).max(100),
});

export type CleaningInput = z.infer<typeof cleaningInputSchema>;
export type CleaningAddOnKey = keyof CleaningInput["addOns"];

const cleaningTypeMultiplier = { standard: 1, deep: 1.6, move: 1.8 } as const;
const difficultyMultiplier = { light: 0.85, typical: 1, heavy: 1.35 } as const;

export function createDefaultCleaningInput(): CleaningInput {
  return {
    propertyType: "house", measurementUnit: "sqft", area: 1800, bedrooms: 3, bathrooms: 2,
    cleaningType: "standard", frequency: "oneTime", difficulty: "typical", estimationMode: "area",
    productionRate: 500, manualCleanerHours: 4, crewSize: 2, laborCostPerHour: 24, overheadPerHour: 10,
    suppliesCost: 12, travelCost: 15,
    addOns: {
      oven: { selected: false, quantity: 1, minutes: 45, fixedPrice: 0 },
      fridge: { selected: false, quantity: 1, minutes: 30, fixedPrice: 0 },
      windows: { selected: false, quantity: 6, minutes: 10, fixedPrice: 0 },
      cabinets: { selected: false, quantity: 1, minutes: 60, fixedPrice: 0 },
      laundry: { selected: false, quantity: 1, minutes: 30, fixedPrice: 0 },
      petHair: { selected: false, quantity: 1, minutes: 45, fixedPrice: 0 },
    },
    targetMargin: 30, minimumFee: 120, frequencyDiscount: 0, firstCleanSurcharge: 0, taxRate: 0,
  };
}

export function calculateCleaningQuote(rawInput: CleaningInput) {
  const input = cleaningInputSchema.parse(rawInput);
  const baseCleanerHours = input.estimationMode === "manual"
    ? input.manualCleanerHours
    : input.area / input.productionRate * cleaningTypeMultiplier[input.cleaningType] * difficultyMultiplier[input.difficulty];
  const selectedAddOns = Object.entries(input.addOns).filter(([, value]) => value.selected) as Array<[CleaningAddOnKey, CleaningInput["addOns"][CleaningAddOnKey]]>;
  const addOnCleanerHours = selectedAddOns.reduce((sum, [, addOn]) => sum + addOn.quantity * addOn.minutes / 60, 0);
  const totalCleanerHours = baseCleanerHours + addOnCleanerHours;
  const onSiteHours = totalCleanerHours / input.crewSize;
  const hourlyCost = input.laborCostPerHour + input.overheadPerHour;
  const laborCost = baseCleanerHours * input.laborCostPerHour;
  const overheadCost = baseCleanerHours * input.overheadPerHour;
  const addOnCost = addOnCleanerHours * hourlyCost;
  const jobCost = laborCost + overheadCost + addOnCost + input.suppliesCost + input.travelCost;
  const fixedAddOnCost = selectedAddOns.reduce((sum, [, addOn]) => addOn.fixedPrice > 0 ? sum + addOn.quantity * addOn.minutes / 60 * hourlyCost : sum, 0);
  const fixedAddOnRevenue = selectedAddOns.reduce((sum, [, addOn]) => sum + addOn.fixedPrice * addOn.quantity, 0);
  const autoPricedCost = Math.max(0, jobCost - fixedAddOnCost);
  const costBasedQuote = autoPricedCost / Math.max(0.05, 1 - input.targetMargin / 100);
  const preAdjustmentQuote = costBasedQuote + fixedAddOnRevenue;
  const surchargeAmount = preAdjustmentQuote * input.firstCleanSurcharge / 100;
  const firstCleanQuote = preAdjustmentQuote + surchargeAmount;
  const discountAmount = firstCleanQuote * input.frequencyDiscount / 100;
  const discountedQuote = Math.max(0, firstCleanQuote - discountAmount);
  const subtotal = Math.max(discountedQuote, input.minimumFee);
  const minimumFeeAdjustment = Math.max(0, input.minimumFee - discountedQuote);
  const tax = subtotal * input.taxRate / 100;
  const total = subtotal + tax;
  const profit = subtotal - jobCost;
  const margin = subtotal > 0 ? profit / subtotal : 0;

  return { input, baseCleanerHours, addOnCleanerHours, totalCleanerHours, onSiteHours, laborCost, overheadCost, addOnCost, jobCost, fixedAddOnRevenue, autoPricedCost, costBasedQuote, preAdjustmentQuote, surchargeAmount, discountAmount, discountedQuote, minimumFeeAdjustment, subtotal, tax, total, profit, margin, minimumFeeApplied: minimumFeeAdjustment > 0 };
}
