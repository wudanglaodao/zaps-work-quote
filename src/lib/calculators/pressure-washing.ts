import { z } from "zod";
import { convertCurrencyAmount, type Currency } from "../currency";

export const pressureWashingInputSchema = z.object({
  measurementMode: z.enum(["area", "dimensions"]),
  measurementUnit: z.enum(["sqft", "sqm"]),
  area: z.number().finite().min(0).max(10_000_000),
  length: z.number().finite().min(0).max(100_000),
  width: z.number().finite().min(0).max(100_000),
  ratePerArea: z.number().finite().min(0).max(1_000_000),
  condition: z.enum(["light", "standard", "heavy"]),
  access: z.enum(["normal", "difficult"]),
  crewSize: z.number().int().min(1).max(100),
  crewHours: z.number().finite().min(0).max(10_000),
  laborRate: z.number().finite().min(0).max(1_000_000),
  chemicalsCost: z.number().finite().min(0).max(1_000_000),
  equipmentCost: z.number().finite().min(0).max(1_000_000),
  travelCost: z.number().finite().min(0).max(1_000_000),
  otherCost: z.number().finite().min(0).max(1_000_000),
  addOnAmount: z.number().finite().min(0).max(1_000_000),
  packageDiscount: z.number().finite().min(0).max(1_000_000),
  minimumFee: z.number().finite().min(0).max(1_000_000),
  targetMargin: z.number().finite().min(0).max(95),
  taxRate: z.number().finite().min(0).max(100),
});

export type PressureWashingInput = z.infer<typeof pressureWashingInputSchema>;

const squareMetersPerSquareFoot = 0.09290304;
const conditionMultiplier = { light: 0.9, standard: 1, heavy: 1.25 } as const;
const accessMultiplier = { normal: 1, difficult: 1.15 } as const;

function clamp(value: number, min: number, max: number, fallback: number) {
  const finite = Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, finite));
}

function roundMeasurement(value: number) { return Math.round(value * 10000) / 10000; }

export function createDefaultPressureWashingInput(currency: Currency = "USD", measurementUnit: PressureWashingInput["measurementUnit"] = "sqft"): PressureWashingInput {
  const input: PressureWashingInput = {
    measurementMode: "area",
    measurementUnit: "sqft",
    area: 800,
    length: 40,
    width: 20,
    ratePerArea: 0.25,
    condition: "standard",
    access: "normal",
    crewSize: 1,
    crewHours: 2.5,
    laborRate: 30,
    chemicalsCost: 15,
    equipmentCost: 10,
    travelCost: 0,
    otherCost: 0,
    addOnAmount: 0,
    packageDiscount: 0,
    minimumFee: 100,
    targetMargin: 35,
    taxRate: 0,
  };
  const localized = convertPressureWashingCurrency(input, "USD", currency);
  return measurementUnit === "sqm" ? convertPressureWashingMeasurement(localized, "sqm") : localized;
}

export function convertPressureWashingCurrency(input: PressureWashingInput, from: Currency, to: Currency): PressureWashingInput {
  if (from === to) return input;
  const convert = (value: number) => convertCurrencyAmount(value, from, to);
  return { ...input, ratePerArea: convert(input.ratePerArea), laborRate: convert(input.laborRate), chemicalsCost: convert(input.chemicalsCost), equipmentCost: convert(input.equipmentCost), travelCost: convert(input.travelCost), otherCost: convert(input.otherCost), addOnAmount: convert(input.addOnAmount), packageDiscount: convert(input.packageDiscount), minimumFee: convert(input.minimumFee) };
}

export function convertPressureWashingMeasurement(input: PressureWashingInput, to: PressureWashingInput["measurementUnit"]): PressureWashingInput {
  if (input.measurementUnit === to) return input;
  const linearFactor = to === "sqm" ? Math.sqrt(squareMetersPerSquareFoot) : 1 / Math.sqrt(squareMetersPerSquareFoot);
  const areaFactor = to === "sqm" ? squareMetersPerSquareFoot : 1 / squareMetersPerSquareFoot;
  return { ...input, measurementUnit: to, area: roundMeasurement(input.area * areaFactor), length: roundMeasurement(input.length * linearFactor), width: roundMeasurement(input.width * linearFactor), ratePerArea: roundMeasurement(input.ratePerArea / areaFactor) };
}

export function normalizePressureWashingInput(rawInput: PressureWashingInput): PressureWashingInput {
  return pressureWashingInputSchema.parse({
    ...rawInput,
    area: clamp(rawInput.area, 0, 10_000_000, 0), length: clamp(rawInput.length, 0, 100_000, 0), width: clamp(rawInput.width, 0, 100_000, 0),
    ratePerArea: clamp(rawInput.ratePerArea, 0, 1_000_000, 0), crewSize: Math.round(clamp(rawInput.crewSize, 1, 100, 1)), crewHours: clamp(rawInput.crewHours, 0, 10_000, 0),
    laborRate: clamp(rawInput.laborRate, 0, 1_000_000, 0), chemicalsCost: clamp(rawInput.chemicalsCost, 0, 1_000_000, 0), equipmentCost: clamp(rawInput.equipmentCost, 0, 1_000_000, 0), travelCost: clamp(rawInput.travelCost, 0, 1_000_000, 0), otherCost: clamp(rawInput.otherCost, 0, 1_000_000, 0),
    addOnAmount: clamp(rawInput.addOnAmount, 0, 1_000_000, 0), packageDiscount: clamp(rawInput.packageDiscount, 0, 1_000_000, 0), minimumFee: clamp(rawInput.minimumFee, 0, 1_000_000, 0), targetMargin: clamp(rawInput.targetMargin, 0, 95, 0), taxRate: clamp(rawInput.taxRate, 0, 100, 0),
  });
}

export function calculatePressureWashingQuote(rawInput: PressureWashingInput) {
  const input = normalizePressureWashingInput(rawInput);
  const measuredArea = input.measurementMode === "dimensions" ? input.length * input.width : input.area;
  const serviceMultiplier = conditionMultiplier[input.condition] * accessMultiplier[input.access];
  const drivewayAmount = measuredArea * input.ratePerArea * serviceMultiplier;
  const rateBasedSubtotal = drivewayAmount + input.addOnAmount;
  const discountedRateSubtotal = Math.max(0, rateBasedSubtotal - input.packageDiscount);
  const laborCost = input.crewSize * input.crewHours * input.laborRate;
  const directCost = laborCost + input.chemicalsCost + input.equipmentCost + input.travelCost + input.otherCost;
  const costFloor = directCost / Math.max(0.05, 1 - input.targetMargin / 100);
  const subtotal = Math.max(discountedRateSubtotal, costFloor, input.minimumFee);
  const tax = subtotal * (input.taxRate / 100);
  const total = subtotal + tax;
  const profit = subtotal - directCost;
  const margin = subtotal > 0 ? profit / subtotal : 0;
  const controllingRule = subtotal === input.minimumFee ? "minimumFee" : subtotal === costFloor && costFloor >= discountedRateSubtotal ? "marginFloor" : "surfaceRate";

  return {
    input,
    measuredArea, serviceMultiplier,
    drivewayAmount,
    rateBasedSubtotal,
    discountedRateSubtotal,
    laborCost,
    directCost,
    costFloor,
    subtotal,
    tax,
    total,
    profit,
    margin,
    controllingRule,
    isBelowCostFloor: discountedRateSubtotal < costFloor,
  };
}
