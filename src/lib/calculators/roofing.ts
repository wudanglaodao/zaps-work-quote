import { z } from "zod";
import { convertCurrencyAmount, type Currency } from "../currency";

export const roofingMaterialTypes = [
  "architectural",
  "threeTab",
  "metal",
  "tile",
  "slate",
] as const;

export type RoofingMaterialType = (typeof roofingMaterialTypes)[number];

export const roofingInputSchema = z.object({
  measurementUnit: z.enum(["sqft", "sqm"]),
  footprintArea: z.number().finite().min(0).max(10_000_000),
  pitch: z.number().finite().min(0).max(24),
  wastePercent: z.number().finite().min(0).max(100),
  materialType: z.enum(roofingMaterialTypes),
  materialPricePerSquare: z.number().finite().min(0).max(1_000_000),
  underlaymentCostPerSquare: z.number().finite().min(0).max(1_000_000),
  tearOffLayers: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  tearOffRatePerSquare: z.number().finite().min(0).max(1_000_000),
  dumpsterCost: z.number().finite().min(0).max(1_000_000),
  stories: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  laborRatePerSquare: z.number().finite().min(0).max(1_000_000),
  deckingReplacementSheets: z.number().int().min(0).max(1_000),
  deckingPricePerSheet: z.number().finite().min(0).max(10_000),
  overheadPercent: z.number().finite().min(0).max(100),
  targetMargin: z.number().finite().min(0).max(95),
  minimumFee: z.number().finite().min(0).max(1_000_000),
  taxRate: z.number().finite().min(0).max(100),
});

export type RoofingInput = z.infer<typeof roofingInputSchema>;

export const defaultMaterialPrices: Record<RoofingMaterialType, number> = {
  threeTab: 95,
  architectural: 135,
  metal: 380,
  tile: 450,
  slate: 750,
};

const squareMetersPerSquareFoot = 0.09290304;

function clamp(value: number, min: number, max: number, fallback: number) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : fallback));
}

function roundMeasurement(value: number) {
  return Math.round(value * 10_000) / 10_000;
}

export function createDefaultRoofingInput(
  currency: Currency = "USD",
  measurementUnit: RoofingInput["measurementUnit"] = "sqft",
): RoofingInput {
  const input: RoofingInput = {
    measurementUnit: "sqft",
    footprintArea: 2000,
    pitch: 6,
    wastePercent: 12,
    materialType: "architectural",
    materialPricePerSquare: defaultMaterialPrices.architectural,
    underlaymentCostPerSquare: 35,
    tearOffLayers: 1,
    tearOffRatePerSquare: 45,
    dumpsterCost: 450,
    stories: 2,
    laborRatePerSquare: 160,
    deckingReplacementSheets: 2,
    deckingPricePerSheet: 65,
    overheadPercent: 12,
    targetMargin: 32,
    minimumFee: 2000,
    taxRate: 0,
  };

  const localized = convertRoofingCurrency(input, "USD", currency);
  return measurementUnit === "sqm"
    ? convertRoofingMeasurement(localized, "sqm")
    : localized;
}

export function convertRoofingCurrency(
  input: RoofingInput,
  from: Currency,
  to: Currency,
): RoofingInput {
  if (from === to) return input;
  const convert = (value: number) => convertCurrencyAmount(value, from, to);
  return {
    ...input,
    materialPricePerSquare: convert(input.materialPricePerSquare),
    underlaymentCostPerSquare: convert(input.underlaymentCostPerSquare),
    tearOffRatePerSquare: convert(input.tearOffRatePerSquare),
    dumpsterCost: convert(input.dumpsterCost),
    laborRatePerSquare: convert(input.laborRatePerSquare),
    deckingPricePerSheet: convert(input.deckingPricePerSheet),
    minimumFee: convert(input.minimumFee),
  };
}

export function convertRoofingMeasurement(
  input: RoofingInput,
  to: RoofingInput["measurementUnit"],
): RoofingInput {
  if (input.measurementUnit === to) return input;
  const factor =
    to === "sqm" ? squareMetersPerSquareFoot : 1 / squareMetersPerSquareFoot;
  return {
    ...input,
    measurementUnit: to,
    footprintArea: roundMeasurement(input.footprintArea * factor),
  };
}

export function normalizeRoofingInput(rawInput: RoofingInput): RoofingInput {
  return roofingInputSchema.parse({
    ...rawInput,
    footprintArea: clamp(rawInput.footprintArea, 0, 10_000_000, 0),
    pitch: clamp(rawInput.pitch, 0, 24, 6),
    wastePercent: clamp(rawInput.wastePercent, 0, 100, 10),
    materialPricePerSquare: clamp(rawInput.materialPricePerSquare, 0, 1_000_000, 0),
    underlaymentCostPerSquare: clamp(rawInput.underlaymentCostPerSquare, 0, 1_000_000, 0),
    tearOffRatePerSquare: clamp(rawInput.tearOffRatePerSquare, 0, 1_000_000, 0),
    dumpsterCost: clamp(rawInput.dumpsterCost, 0, 1_000_000, 0),
    laborRatePerSquare: clamp(rawInput.laborRatePerSquare, 0, 1_000_000, 0),
    deckingReplacementSheets: Math.round(clamp(rawInput.deckingReplacementSheets, 0, 1000, 0)),
    deckingPricePerSheet: clamp(rawInput.deckingPricePerSheet, 0, 10_000, 0),
    overheadPercent: clamp(rawInput.overheadPercent, 0, 100, 0),
    targetMargin: clamp(rawInput.targetMargin, 0, 95, 0),
    minimumFee: clamp(rawInput.minimumFee, 0, 1_000_000, 0),
    taxRate: clamp(rawInput.taxRate, 0, 100, 0),
  });
}

export function calculateRoofingQuote(rawInput: RoofingInput) {
  const input = normalizeRoofingInput(rawInput);

  // Pitch multiplier: sqrt(1 + (pitch / 12)^2)
  const pitchMultiplier = Math.sqrt(1 + Math.pow(input.pitch / 12, 2));
  const pitchDegrees = (Math.atan(input.pitch / 12) * 180) / Math.PI;

  // Real surface area in selected unit
  const surfaceArea = input.footprintArea * pitchMultiplier;

  // Convert surface area to square feet to calculate Squares (1 Square = 100 sq ft)
  const surfaceAreaSqFt =
    input.measurementUnit === "sqft"
      ? surfaceArea
      : surfaceArea / squareMetersPerSquareFoot;

  const baseSquares = surfaceAreaSqFt / 100;
  const orderedSquares = Math.max(
    1,
    Math.ceil(baseSquares * (1 + input.wastePercent / 100)),
  );

  // Material and accessories
  const shinglesCost = orderedSquares * input.materialPricePerSquare;
  const underlaymentCost = orderedSquares * input.underlaymentCostPerSquare;
  const deckingCost =
    input.deckingReplacementSheets * input.deckingPricePerSheet;
  const totalMaterialCost = shinglesCost + underlaymentCost + deckingCost;

  // Tear-off and disposal
  const tearOffPerLayerFactor = input.tearOffLayers === 2 ? 1.75 : 1.0;
  const tearOffCost =
    input.tearOffLayers > 0
      ? orderedSquares * input.tearOffRatePerSquare * tearOffPerLayerFactor +
        input.dumpsterCost
      : 0;

  // Labor with complexity surcharges
  const storyMultiplier =
    input.stories === 1 ? 1.0 : input.stories === 2 ? 1.15 : 1.3;
  const steepMultiplier =
    input.pitch >= 9 ? 1.25 : input.pitch >= 7 ? 1.12 : 1.0;
  const effectiveLaborRate =
    input.laborRatePerSquare * storyMultiplier * steepMultiplier;
  const laborCost = orderedSquares * effectiveLaborRate;

  // Direct costs and overhead
  const directCost = totalMaterialCost + tearOffCost + laborCost;
  const overheadCost = (directCost * input.overheadPercent) / 100;
  const totalCost = directCost + overheadCost;

  // Margin and pricing
  const marginFloor = totalCost / Math.max(0.05, 1 - input.targetMargin / 100);
  const subtotal = Math.max(marginFloor, input.minimumFee);
  const tax = (subtotal * input.taxRate) / 100;
  const total = subtotal + tax;

  const profit = subtotal - totalCost;
  const margin = subtotal > 0 ? profit / subtotal : 0;
  const pricePerSquare = orderedSquares > 0 ? total / orderedSquares : 0;
  const pricePerUnitArea = surfaceArea > 0 ? total / surfaceArea : 0;

  return {
    input,
    pitchMultiplier,
    pitchDegrees,
    surfaceArea,
    surfaceAreaSqFt,
    baseSquares,
    orderedSquares,
    shinglesCost,
    underlaymentCost,
    deckingCost,
    totalMaterialCost,
    tearOffCost,
    storyMultiplier,
    steepMultiplier,
    effectiveLaborRate,
    laborCost,
    directCost,
    overheadCost,
    totalCost,
    marginFloor,
    subtotal,
    tax,
    total,
    profit,
    margin,
    pricePerSquare,
    pricePerUnitArea,
    controllingRule:
      subtotal === input.minimumFee
        ? ("minimumFee" as const)
        : ("marginFloor" as const),
  };
}
