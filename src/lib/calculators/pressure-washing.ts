import { z } from "zod";

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
  targetMargin: z.number().finite().min(0).max(95),
  taxRate: z.number().finite().min(0).max(100),
});

export type PressureWashingInput = z.infer<typeof pressureWashingInputSchema>;

export function createDefaultPressureWashingInput(): PressureWashingInput {
  return {
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
    targetMargin: 35,
    taxRate: 0,
  };
}

export function calculatePressureWashingQuote(rawInput: PressureWashingInput) {
  const input = pressureWashingInputSchema.parse(rawInput);
  const measuredArea = input.measurementMode === "dimensions" ? input.length * input.width : input.area;
  const drivewayAmount = measuredArea * input.ratePerArea;
  const rateBasedSubtotal = drivewayAmount + input.addOnAmount;
  const discountedRateSubtotal = Math.max(0, rateBasedSubtotal - input.packageDiscount);
  const laborCost = input.crewSize * input.crewHours * input.laborRate;
  const directCost = laborCost + input.chemicalsCost + input.equipmentCost + input.travelCost + input.otherCost;
  const costFloor = directCost / Math.max(0.05, 1 - input.targetMargin / 100);
  const subtotal = Math.max(discountedRateSubtotal, costFloor);
  const tax = subtotal * (input.taxRate / 100);
  const total = subtotal + tax;
  const profit = subtotal - directCost;
  const margin = subtotal > 0 ? profit / subtotal : 0;
  const controllingRule = subtotal === costFloor && costFloor >= discountedRateSubtotal
      ? "marginFloor"
      : "surfaceRate";

  return {
    input,
    measuredArea,
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
