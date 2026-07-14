import { z } from "zod";
import { convertCurrencyAmount, type Currency } from "../currency";

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
const propertyTypeMultiplier = { house: 1, apartment: 0.94, condo: 0.97 } as const;
const frequencyTimeMultiplier = { oneTime: 1, weekly: 0.85, biweekly: 0.9, monthly: 0.96 } as const;
const squareMetersPerSquareFoot = 0.09290304;

function clamp(value: number, min: number, max: number, fallback: number) {
  const finite = Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, finite));
}

function roundMeasurement(value: number) {
  return Math.round(value * 100) / 100;
}

export function createDefaultCleaningInput(currency: Currency = "USD", measurementUnit: CleaningInput["measurementUnit"] = "sqft"): CleaningInput {
  const input: CleaningInput = {
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
  const localized = convertCleaningCurrency(input, "USD", currency);
  return measurementUnit === "sqm" ? convertCleaningMeasurement(localized, "sqm") : localized;
}

export function convertCleaningCurrency(input: CleaningInput, from: Currency, to: Currency): CleaningInput {
  if (from === to) return input;
  const convert = (value: number) => convertCurrencyAmount(value, from, to);
  return {
    ...input,
    laborCostPerHour: convert(input.laborCostPerHour),
    overheadPerHour: convert(input.overheadPerHour),
    suppliesCost: convert(input.suppliesCost),
    travelCost: convert(input.travelCost),
    minimumFee: convert(input.minimumFee),
    addOns: Object.fromEntries(Object.entries(input.addOns).map(([key, addOn]) => [key, { ...addOn, fixedPrice: convert(addOn.fixedPrice) }])) as CleaningInput["addOns"],
  };
}

export function convertCleaningMeasurement(input: CleaningInput, to: CleaningInput["measurementUnit"]): CleaningInput {
  if (input.measurementUnit === to) return input;
  const factor = to === "sqm" ? squareMetersPerSquareFoot : 1 / squareMetersPerSquareFoot;
  return { ...input, measurementUnit: to, area: roundMeasurement(input.area * factor), productionRate: roundMeasurement(input.productionRate * factor) };
}

export function normalizeCleaningInput(rawInput: CleaningInput): CleaningInput {
  return cleaningInputSchema.parse({
    ...rawInput,
    area: clamp(rawInput.area, 0.01, 10_000_000, 1),
    bedrooms: Math.round(clamp(rawInput.bedrooms, 0, 100, 0)),
    bathrooms: clamp(rawInput.bathrooms, 0, 100, 0),
    productionRate: clamp(rawInput.productionRate, 0.01, 1_000_000, 1),
    manualCleanerHours: clamp(rawInput.manualCleanerHours, 0.01, 10_000, 0.25),
    crewSize: Math.round(clamp(rawInput.crewSize, 1, 100, 1)),
    laborCostPerHour: clamp(rawInput.laborCostPerHour, 0, 1_000_000, 0),
    overheadPerHour: clamp(rawInput.overheadPerHour, 0, 1_000_000, 0),
    suppliesCost: clamp(rawInput.suppliesCost, 0, 1_000_000, 0),
    travelCost: clamp(rawInput.travelCost, 0, 1_000_000, 0),
    targetMargin: clamp(rawInput.targetMargin, 0, 95, 0),
    minimumFee: clamp(rawInput.minimumFee, 0, 1_000_000, 0),
    frequencyDiscount: clamp(rawInput.frequencyDiscount, 0, 95, 0),
    firstCleanSurcharge: clamp(rawInput.firstCleanSurcharge, 0, 500, 0),
    taxRate: clamp(rawInput.taxRate, 0, 100, 0),
    addOns: Object.fromEntries(Object.entries(rawInput.addOns).map(([key, addOn]) => [key, {
      ...addOn,
      quantity: Math.round(clamp(addOn.quantity, 1, 100, 1)),
      minutes: clamp(addOn.minutes, 0, 10_000, 0),
      fixedPrice: clamp(addOn.fixedPrice, 0, 1_000_000, 0),
    }])) as CleaningInput["addOns"],
  });
}

export function calculateCleaningQuote(rawInput: CleaningInput) {
  const input = normalizeCleaningInput(rawInput);
  const roomAdjustmentHours = (input.bedrooms - 3) * 0.12 + (input.bathrooms - 2) * 0.25;
  const areaBasedHours = Math.max(0.25, input.area / input.productionRate + roomAdjustmentHours)
    * propertyTypeMultiplier[input.propertyType]
    * cleaningTypeMultiplier[input.cleaningType]
    * difficultyMultiplier[input.difficulty]
    * frequencyTimeMultiplier[input.frequency];
  const baseCleanerHours = input.estimationMode === "manual"
    ? input.manualCleanerHours
    : areaBasedHours;
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

  return { input, roomAdjustmentHours, propertyTypeMultiplier: propertyTypeMultiplier[input.propertyType], frequencyTimeMultiplier: frequencyTimeMultiplier[input.frequency], baseCleanerHours, addOnCleanerHours, totalCleanerHours, onSiteHours, laborCost, overheadCost, addOnCost, jobCost, fixedAddOnRevenue, autoPricedCost, costBasedQuote, preAdjustmentQuote, surchargeAmount, discountAmount, discountedQuote, minimumFeeAdjustment, subtotal, tax, total, profit, margin, minimumFeeApplied: minimumFeeAdjustment > 0 };
}
