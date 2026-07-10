import { z } from "zod";

export const printItemSchema = z.object({
  id: z.string(),
  name: z.string().max(160),
  material: z.enum(["PLA", "PETG", "ABS", "TPU", "Other"]),
  quantity: z.number().int().min(1).max(10000),
  filamentGrams: z.number().min(0).max(1000000),
  printHours: z.number().min(0).max(100000),
  printMinutes: z.number().int().min(0).max(59),
  spoolPrice: z.number().min(0).max(100000000),
  spoolWeightGrams: z.number().positive().max(1000000),
  preparationMinutes: z.number().min(0).max(100000),
  postProcessingMinutes: z.number().min(0).max(100000),
  packagingCost: z.number().min(0).max(100000000),
});

export const quoteInputSchema = z.object({
  items: z.array(printItemSchema).min(1).max(10),
  machineRate: z.number().min(0).max(1000000),
  laborRate: z.number().min(0).max(1000000),
  failureRate: z.number().min(0).max(50),
  wasteRate: z.number().min(0).max(100),
  powerDrawWatts: z.number().min(0).max(100000),
  electricityRate: z.number().min(0).max(1000000),
  targetMargin: z.number().min(0).max(95),
  minimumFee: z.number().min(0).max(100000000),
  shippingCost: z.number().min(0).max(100000000),
  taxRate: z.number().min(0).max(100),
});

export type PrintItemInput = z.infer<typeof printItemSchema>;
export type QuoteInput = z.infer<typeof quoteInputSchema>;

export function createDefaultItem(index = 1): PrintItemInput {
  return {
    id: `item-${index}`,
    name: index === 1 ? "Custom print" : `Print item ${index}`,
    material: "PLA",
    quantity: 1,
    filamentGrams: 120,
    printHours: 6,
    printMinutes: 30,
    spoolPrice: 24,
    spoolWeightGrams: 1000,
    preparationMinutes: 10,
    postProcessingMinutes: 15,
    packagingCost: 2,
  };
}

export function createDefaultQuoteInput(): QuoteInput {
  return {
    items: [createDefaultItem()],
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
  };
}

export function calculateThreeDPrintQuote(rawInput: QuoteInput) {
  const input = quoteInputSchema.parse(rawInput);
  const itemResults = input.items.map((item) => {
    const hours = item.printHours + item.printMinutes / 60;
    const material = (item.filamentGrams / item.spoolWeightGrams) * item.spoolPrice * (1 + input.wasteRate / 100);
    const machine = hours * input.machineRate;
    const electricity = (input.powerDrawWatts / 1000) * hours * input.electricityRate;
    const attemptCost = material + machine + electricity;
    const production = attemptCost / Math.max(0.5, 1 - input.failureRate / 100);
    const failureRisk = production - attemptCost;
    const labor = ((item.preparationMinutes + item.postProcessingMinutes) / 60) * input.laborRate;
    const totalCost = production + labor + item.packagingCost;
    return { ...item, hours, materialCost: material, machine, electricity, failureRisk, labor, totalCost, quoteAmount: 0 };
  });
  const itemCost = itemResults.reduce((sum, item) => sum + item.totalCost, 0);
  const totalCost = itemCost + input.shippingCost;
  const calculatedSubtotal = totalCost / Math.max(0.05, 1 - input.targetMargin / 100);
  const subtotal = Math.max(calculatedSubtotal, input.minimumFee);
  const allocationFactor = totalCost > 0 ? subtotal / totalCost : 0;
  for (const item of itemResults) item.quoteAmount = item.totalCost * allocationFactor;
  const allocatedShipping = input.shippingCost * allocationFactor;
  const tax = subtotal * (input.taxRate / 100);
  const total = subtotal + tax;
  const profit = subtotal - totalCost;
  const margin = subtotal > 0 ? profit / subtotal : 0;
  return { input, itemResults, itemCost, totalCost, subtotal, allocatedShipping, tax, total, profit, margin, allocationFactor };
}
