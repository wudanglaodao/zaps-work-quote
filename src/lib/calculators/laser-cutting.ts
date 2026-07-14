import { z } from "zod";
import { convertCurrencyAmount, type Currency } from "../currency";

export const laserCuttingInputSchema = z.object({
  material: z.enum(["mildSteel", "stainlessSteel", "aluminum", "acrylic", "plywood", "other"]),
  measurementUnit: z.enum(["sqft", "sqm"]),
  materialThickness: z.number().finite().min(0).max(1_000),
  thicknessUnit: z.enum(["mm", "in"]),
  materialArea: z.number().finite().min(0).max(10_000_000),
  materialRate: z.number().finite().min(0).max(1_000_000),
  wasteRate: z.number().finite().min(0).max(100),
  quantity: z.number().int().min(1).max(100_000),
  cutLength: z.number().finite().min(0).max(10_000_000),
  cutLengthUnit: z.enum(["mm", "in"]),
  cutTimeMinutes: z.number().finite().min(0).max(1_000_000),
  pierceCount: z.number().int().min(0).max(10_000_000),
  machineRate: z.number().finite().min(0).max(1_000_000),
  setupMinutes: z.number().finite().min(0).max(1_000_000),
  handlingMinutes: z.number().finite().min(0).max(1_000_000),
  laborRate: z.number().finite().min(0).max(1_000_000),
  finishingCost: z.number().finite().min(0).max(1_000_000),
  otherCost: z.number().finite().min(0).max(1_000_000),
  targetMargin: z.number().finite().min(0).max(95),
  packageDiscount: z.number().finite().min(0).max(1_000_000),
  taxRate: z.number().finite().min(0).max(100),
});

export type LaserCuttingInput = z.infer<typeof laserCuttingInputSchema>;

const squareMetersPerSquareFoot = 0.09290304;
const millimetersPerInch = 25.4;
const materialMultiplier: Record<LaserCuttingInput["material"], number> = { mildSteel: 1, stainlessSteel: 1.6, aluminum: 1.4, acrylic: 0.7, plywood: 0.45, other: 1 };

function clamp(value: number, min: number, max: number, fallback: number) {
  const finite = Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, finite));
}

function roundMeasurement(value: number) { return Math.round(value * 10000) / 10000; }

export function createDefaultLaserCuttingInput(currency: Currency = "USD"): LaserCuttingInput {
  return convertLaserCuttingCurrency({
    material: "mildSteel",
    measurementUnit: "sqm",
    materialThickness: 3,
    thicknessUnit: "mm",
    materialArea: 2,
    materialRate: 0.75,
    wasteRate: 10,
    quantity: 1,
    cutLength: 1_800,
    cutLengthUnit: "mm",
    cutTimeMinutes: 18,
    pierceCount: 12,
    machineRate: 0.8,
    setupMinutes: 15,
    handlingMinutes: 8,
    laborRate: 25,
    finishingCost: 0,
    otherCost: 0,
    targetMargin: 35,
    packageDiscount: 0,
    taxRate: 0,
  }, "USD", currency);
}

export function convertLaserCuttingCurrency(input: LaserCuttingInput, from: Currency, to: Currency): LaserCuttingInput {
  if (from === to) return input;
  const convert = (value: number) => convertCurrencyAmount(value, from, to);
  return { ...input, materialRate: convert(input.materialRate), machineRate: convert(input.machineRate), laborRate: convert(input.laborRate), finishingCost: convert(input.finishingCost), otherCost: convert(input.otherCost), packageDiscount: convert(input.packageDiscount) };
}

export function convertLaserCuttingMeasurement(input: LaserCuttingInput, to: LaserCuttingInput["measurementUnit"]): LaserCuttingInput {
  if (input.measurementUnit === to) return input;
  const toMetric = to === "sqm";
  const areaFactor = toMetric ? squareMetersPerSquareFoot : 1 / squareMetersPerSquareFoot;
  const linearFactor = toMetric ? millimetersPerInch : 1 / millimetersPerInch;
  return { ...input, measurementUnit: to, thicknessUnit: toMetric ? "mm" : "in", cutLengthUnit: toMetric ? "mm" : "in", materialArea: roundMeasurement(input.materialArea * areaFactor), materialRate: roundMeasurement(input.materialRate / areaFactor), materialThickness: roundMeasurement(input.materialThickness * linearFactor), cutLength: roundMeasurement(input.cutLength * linearFactor) };
}

export function normalizeLaserCuttingInput(rawInput: LaserCuttingInput): LaserCuttingInput {
  return laserCuttingInputSchema.parse({ ...rawInput,
    materialThickness: clamp(rawInput.materialThickness, 0, 1_000, 0), materialArea: clamp(rawInput.materialArea, 0, 10_000_000, 0), materialRate: clamp(rawInput.materialRate, 0, 1_000_000, 0), wasteRate: clamp(rawInput.wasteRate, 0, 100, 0), quantity: Math.round(clamp(rawInput.quantity, 1, 100_000, 1)), cutLength: clamp(rawInput.cutLength, 0, 10_000_000, 0), cutTimeMinutes: clamp(rawInput.cutTimeMinutes, 0, 1_000_000, 0), pierceCount: Math.round(clamp(rawInput.pierceCount, 0, 10_000_000, 0)), machineRate: clamp(rawInput.machineRate, 0, 1_000_000, 0), setupMinutes: clamp(rawInput.setupMinutes, 0, 1_000_000, 0), handlingMinutes: clamp(rawInput.handlingMinutes, 0, 1_000_000, 0), laborRate: clamp(rawInput.laborRate, 0, 1_000_000, 0), finishingCost: clamp(rawInput.finishingCost, 0, 1_000_000, 0), otherCost: clamp(rawInput.otherCost, 0, 1_000_000, 0), targetMargin: clamp(rawInput.targetMargin, 0, 95, 0), packageDiscount: clamp(rawInput.packageDiscount, 0, 1_000_000, 0), taxRate: clamp(rawInput.taxRate, 0, 100, 0),
  });
}

export function calculateLaserCuttingQuote(rawInput: LaserCuttingInput) {
  const input = normalizeLaserCuttingInput(rawInput);
  const thicknessMillimeters = input.thicknessUnit === "mm" ? input.materialThickness : input.materialThickness * millimetersPerInch;
  const thicknessMultiplier = Math.max(0.1, thicknessMillimeters / 3);
  const materialCost = input.materialArea * input.materialRate * materialMultiplier[input.material] * thicknessMultiplier * (1 + input.wasteRate / 100) * input.quantity;
  const machineCost = (input.cutTimeMinutes / 60) * input.machineRate * input.quantity;
  const setupLaborCost = (input.setupMinutes / 60) * input.laborRate;
  const handlingLaborCost = (input.handlingMinutes / 60) * input.laborRate * input.quantity;
  const finishingCost = input.finishingCost * input.quantity;
  const directCost = materialCost + machineCost + setupLaborCost + handlingLaborCost + finishingCost + input.otherCost;
  const costFloor = directCost / Math.max(0.05, 1 - input.targetMargin / 100);
  const discountedQuote = Math.max(directCost, costFloor - input.packageDiscount);
  const subtotal = discountedQuote;
  const tax = subtotal * (input.taxRate / 100);
  const total = subtotal + tax;
  const profit = subtotal - directCost;
  const margin = subtotal > 0 ? profit / subtotal : 0;

  return {
    input, thicknessMillimeters, thicknessMultiplier, materialMultiplier: materialMultiplier[input.material],
    materialCost,
    machineCost,
    setupLaborCost,
    handlingLaborCost,
    finishingCost,
    directCost,
    costFloor,
    discountedQuote,
    subtotal,
    tax,
    total,
    profit,
    margin,
    isBelowCostFloor: discountedQuote < costFloor,
  };
}
