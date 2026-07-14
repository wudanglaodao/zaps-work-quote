import { z } from "zod";
import { convertCurrencyAmount, type Currency } from "../currency";

export const windowCleaningInputSchema = z.object({
  standardWindows: z.number().int().min(0).max(10_000),
  largeWindows: z.number().int().min(0).max(10_000),
  skylights: z.number().int().min(0).max(10_000),
  serviceType: z.enum(["exterior", "inside-out"]),
  access: z.enum(["ground", "second-floor", "high-access"]),
  condition: z.enum(["standard", "heavy"]),
  screens: z.number().int().min(0).max(10_000),
  deepTracks: z.number().int().min(0).max(10_000),
  minutesPerStandard: z.number().finite().min(0).max(10_000),
  minutesPerLarge: z.number().finite().min(0).max(10_000),
  minutesPerSkylight: z.number().finite().min(0).max(10_000),
  minutesPerScreen: z.number().finite().min(0).max(10_000),
  minutesPerTrack: z.number().finite().min(0).max(10_000),
  secondFloorMultiplier: z.number().finite().min(1).max(5),
  highAccessMultiplier: z.number().finite().min(1).max(5),
  heavySoilMultiplier: z.number().finite().min(1).max(5),
  crewSize: z.number().int().min(1).max(100),
  laborRate: z.number().finite().min(0).max(1_000_000),
  suppliesCost: z.number().finite().min(0).max(1_000_000),
  travelCost: z.number().finite().min(0).max(1_000_000),
  overheadPercent: z.number().finite().min(0).max(100),
  targetMargin: z.number().finite().min(0).max(95),
  minimumFee: z.number().finite().min(0).max(1_000_000),
  taxRate: z.number().finite().min(0).max(100),
});

export type WindowCleaningInput = z.infer<typeof windowCleaningInputSchema>;
const clamp = (value: number, min: number, max: number, fallback = min) => Math.min(max, Math.max(min, Number.isFinite(value) ? value : fallback));
const serviceMultiplier = { exterior: 1, "inside-out": 1.8 } as const;

export function createDefaultWindowCleaningInput(currency: Currency = "USD"): WindowCleaningInput {
  return convertWindowCleaningCurrency({ standardWindows: 14, largeWindows: 2, skylights: 0, serviceType: "inside-out", access: "ground", condition: "standard", screens: 8, deepTracks: 0, minutesPerStandard: 6, minutesPerLarge: 12, minutesPerSkylight: 18, minutesPerScreen: 2, minutesPerTrack: 3, secondFloorMultiplier: 1.25, highAccessMultiplier: 1.6, heavySoilMultiplier: 1.35, crewSize: 1, laborRate: 32, suppliesCost: 12, travelCost: 18, overheadPercent: 12, targetMargin: 35, minimumFee: 120, taxRate: 0 }, "USD", currency);
}

export function convertWindowCleaningCurrency(input: WindowCleaningInput, from: Currency, to: Currency): WindowCleaningInput {
  if (from === to) return input;
  const convert = (value: number) => convertCurrencyAmount(value, from, to);
  return { ...input, laborRate: convert(input.laborRate), suppliesCost: convert(input.suppliesCost), travelCost: convert(input.travelCost), minimumFee: convert(input.minimumFee) };
}

export function calculateWindowCleaningQuote(raw: WindowCleaningInput) {
  const input = windowCleaningInputSchema.parse({
    ...raw,
    standardWindows: Math.round(clamp(raw.standardWindows, 0, 10_000)),
    largeWindows: Math.round(clamp(raw.largeWindows, 0, 10_000)),
    skylights: Math.round(clamp(raw.skylights, 0, 10_000)),
    screens: Math.round(clamp(raw.screens, 0, 10_000)),
    deepTracks: Math.round(clamp(raw.deepTracks, 0, 10_000)),
    minutesPerStandard: clamp(raw.minutesPerStandard, 0, 10_000),
    minutesPerLarge: clamp(raw.minutesPerLarge, 0, 10_000),
    minutesPerSkylight: clamp(raw.minutesPerSkylight, 0, 10_000),
    minutesPerScreen: clamp(raw.minutesPerScreen, 0, 10_000),
    minutesPerTrack: clamp(raw.minutesPerTrack, 0, 10_000),
    secondFloorMultiplier: clamp(raw.secondFloorMultiplier, 1, 5, 1),
    highAccessMultiplier: clamp(raw.highAccessMultiplier, 1, 5, 1),
    heavySoilMultiplier: clamp(raw.heavySoilMultiplier, 1, 5, 1),
    crewSize: Math.round(clamp(raw.crewSize, 1, 100, 1)),
    laborRate: clamp(raw.laborRate, 0, 1_000_000),
    suppliesCost: clamp(raw.suppliesCost, 0, 1_000_000),
    travelCost: clamp(raw.travelCost, 0, 1_000_000),
    overheadPercent: clamp(raw.overheadPercent, 0, 100),
    targetMargin: clamp(raw.targetMargin, 0, 95),
    minimumFee: clamp(raw.minimumFee, 0, 1_000_000),
    taxRate: clamp(raw.taxRate, 0, 100),
  });
  const baseMinutes = input.standardWindows * input.minutesPerStandard + input.largeWindows * input.minutesPerLarge + input.skylights * input.minutesPerSkylight;
  const accessMultiplier = input.access === "ground" ? 1 : input.access === "second-floor" ? input.secondFloorMultiplier : input.highAccessMultiplier;
  const conditionMultiplier = input.condition === "standard" ? 1 : input.heavySoilMultiplier;
  const windowHours = baseMinutes / 60 * serviceMultiplier[input.serviceType] * accessMultiplier * conditionMultiplier;
  const addOnHours = (input.screens * input.minutesPerScreen + input.deepTracks * input.minutesPerTrack) / 60;
  const crewHours = windowHours + addOnHours;
  const laborCost = crewHours * input.crewSize * input.laborRate;
  const overheadCost = laborCost * input.overheadPercent / 100;
  const directCost = laborCost + overheadCost + input.suppliesCost + input.travelCost;
  const marginFloor = directCost / Math.max(.05, 1 - input.targetMargin / 100);
  const subtotal = Math.max(marginFloor, input.minimumFee);
  const tax = subtotal * input.taxRate / 100;
  const total = subtotal + tax;
  const profit = subtotal - directCost;
  return { input, baseMinutes, windowHours, addOnHours, crewHours, laborCost, overheadCost, directCost, marginFloor, subtotal, tax, total, profit, margin: subtotal > 0 ? profit / subtotal : 0 };
}
