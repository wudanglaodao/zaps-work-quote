import { z } from "zod";

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

export function createDefaultLaserCuttingInput(): LaserCuttingInput {
  return {
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
  };
}

export function calculateLaserCuttingQuote(rawInput: LaserCuttingInput) {
  const input = laserCuttingInputSchema.parse(rawInput);
  const materialCost = input.materialArea * input.materialRate * (1 + input.wasteRate / 100) * input.quantity;
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
    input,
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
