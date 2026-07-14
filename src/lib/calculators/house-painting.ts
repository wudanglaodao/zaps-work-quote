import { z } from "zod";
import { convertCurrencyAmount, type Currency } from "../currency";

export const housePaintingInputSchema = z.object({
  measurementUnit: z.enum(["sqft", "sqm"]),
  area: z.number().finite().min(0).max(10_000_000),
  coats: z.number().int().min(1).max(10),
  rooms: z.number().int().min(0).max(1_000),
  projectType: z.enum(["interior", "exterior"]),
  condition: z.enum(["good", "standard", "repairHeavy"]),
  coveragePerContainer: z.number().finite().min(0.01).max(10_000_000),
  paintPrice: z.number().finite().min(0).max(1_000_000),
  wastePercent: z.number().finite().min(0).max(100),
  sundriesCost: z.number().finite().min(0).max(1_000_000),
  productionRate: z.number().finite().min(0.01).max(10_000_000),
  laborRate: z.number().finite().min(0).max(1_000_000),
  crewSize: z.number().int().min(1).max(100),
  prepCost: z.number().finite().min(0).max(1_000_000),
  travelCost: z.number().finite().min(0).max(1_000_000),
  overheadPercent: z.number().finite().min(0).max(100),
  targetMargin: z.number().finite().min(0).max(95),
  minimumFee: z.number().finite().min(0).max(1_000_000),
  taxRate: z.number().finite().min(0).max(100),
});

export type HousePaintingInput = z.infer<typeof housePaintingInputSchema>;

const squareMetersPerSquareFoot = 0.09290304;
const conditionMultiplier = { good: 0.9, standard: 1, repairHeavy: 1.3 } as const;
const projectMultiplier = { interior: 1, exterior: 1.15 } as const;

function clamp(value: number, min: number, max: number, fallback: number) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : fallback));
}

function roundMeasurement(value: number) { return Math.round(value * 10_000) / 10_000; }

export function createDefaultHousePaintingInput(currency: Currency = "USD", measurementUnit: HousePaintingInput["measurementUnit"] = "sqft"): HousePaintingInput {
  const input: HousePaintingInput = {
    measurementUnit: "sqft", area: 1_200, coats: 2, rooms: 6, projectType: "interior", condition: "standard",
    coveragePerContainer: 350, paintPrice: 42, wastePercent: 10, sundriesCost: 35,
    productionRate: 150, laborRate: 32, crewSize: 2, prepCost: 0, travelCost: 0, overheadPercent: 12,
    targetMargin: 35, minimumFee: 300, taxRate: 0,
  };
  const localized = convertHousePaintingCurrency(input, "USD", currency);
  return measurementUnit === "sqm" ? convertHousePaintingMeasurement(localized, "sqm") : localized;
}

export function convertHousePaintingCurrency(input: HousePaintingInput, from: Currency, to: Currency): HousePaintingInput {
  if (from === to) return input;
  const convert = (value: number) => convertCurrencyAmount(value, from, to);
  return {
    ...input,
    paintPrice: convert(input.paintPrice), sundriesCost: convert(input.sundriesCost), laborRate: convert(input.laborRate),
    prepCost: convert(input.prepCost), travelCost: convert(input.travelCost), minimumFee: convert(input.minimumFee),
  };
}

export function convertHousePaintingMeasurement(input: HousePaintingInput, to: HousePaintingInput["measurementUnit"]): HousePaintingInput {
  if (input.measurementUnit === to) return input;
  const areaFactor = to === "sqm" ? squareMetersPerSquareFoot : 1 / squareMetersPerSquareFoot;
  return {
    ...input,
    measurementUnit: to,
    area: roundMeasurement(input.area * areaFactor),
    coveragePerContainer: roundMeasurement(input.coveragePerContainer * areaFactor),
    productionRate: roundMeasurement(input.productionRate * areaFactor),
  };
}

export function normalizeHousePaintingInput(rawInput: HousePaintingInput): HousePaintingInput {
  return housePaintingInputSchema.parse({
    ...rawInput,
    area: clamp(rawInput.area, 0, 10_000_000, 0), coats: Math.round(clamp(rawInput.coats, 1, 10, 1)), rooms: Math.round(clamp(rawInput.rooms, 0, 1_000, 0)),
    coveragePerContainer: clamp(rawInput.coveragePerContainer, 0.01, 10_000_000, 1), paintPrice: clamp(rawInput.paintPrice, 0, 1_000_000, 0), wastePercent: clamp(rawInput.wastePercent, 0, 100, 0), sundriesCost: clamp(rawInput.sundriesCost, 0, 1_000_000, 0),
    productionRate: clamp(rawInput.productionRate, 0.01, 10_000_000, 1), laborRate: clamp(rawInput.laborRate, 0, 1_000_000, 0), crewSize: Math.round(clamp(rawInput.crewSize, 1, 100, 1)), prepCost: clamp(rawInput.prepCost, 0, 1_000_000, 0), travelCost: clamp(rawInput.travelCost, 0, 1_000_000, 0),
    overheadPercent: clamp(rawInput.overheadPercent, 0, 100, 0), targetMargin: clamp(rawInput.targetMargin, 0, 95, 0), minimumFee: clamp(rawInput.minimumFee, 0, 1_000_000, 0), taxRate: clamp(rawInput.taxRate, 0, 100, 0),
  });
}

export function calculateHousePaintingQuote(rawInput: HousePaintingInput) {
  const input = normalizeHousePaintingInput(rawInput);
  const coverageArea = input.area * input.coats;
  const paintContainers = Math.ceil(coverageArea * (1 + input.wastePercent / 100) / input.coveragePerContainer);
  const paintCost = paintContainers * input.paintPrice;
  const baseLaborHours = coverageArea / input.productionRate + input.rooms * 0.35;
  const laborHours = baseLaborHours * conditionMultiplier[input.condition] * projectMultiplier[input.projectType];
  const laborCost = laborHours * input.laborRate;
  const overheadCost = laborCost * input.overheadPercent / 100;
  const directCost = paintCost + input.sundriesCost + laborCost + overheadCost + input.prepCost + input.travelCost;
  const marginFloor = directCost / Math.max(0.05, 1 - input.targetMargin / 100);
  const subtotal = Math.max(marginFloor, input.minimumFee);
  const tax = subtotal * input.taxRate / 100;
  const total = subtotal + tax;
  const profit = subtotal - directCost;
  const margin = subtotal > 0 ? profit / subtotal : 0;
  return { input, coverageArea, paintContainers, paintCost, baseLaborHours, laborHours, laborCost, overheadCost, directCost, marginFloor, subtotal, tax, total, profit, margin, onSiteHours: laborHours / input.crewSize, controllingRule: subtotal === input.minimumFee ? "minimumFee" as const : "marginFloor" as const };
}
