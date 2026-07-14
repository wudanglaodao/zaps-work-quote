import { describe, expect, it } from "vitest";
import { calculateLaserCuttingQuote, convertLaserCuttingCurrency, convertLaserCuttingMeasurement, createDefaultLaserCuttingInput } from "./laser-cutting";

describe("laser cutting quote calculation", () => {
  it("calculates material, machine, setup, handling, and target margin", () => {
    const result = calculateLaserCuttingQuote(createDefaultLaserCuttingInput());
    expect(result.materialCost).toBeCloseTo(1.65, 5);
    expect(result.machineCost).toBeCloseTo(0.24, 5);
    expect(result.setupLaborCost).toBeCloseTo(6.25, 5);
    expect(result.handlingLaborCost).toBeCloseTo(3.3333, 3);
    expect(result.directCost).toBeCloseTo(11.4733, 3);
    expect(result.subtotal).toBeCloseTo(17.6513, 3);
    expect(result.margin).toBeCloseTo(0.35, 5);
  });

  it("allocates repeated material, machine, and handling work by quantity", () => {
    const input = createDefaultLaserCuttingInput();
    input.quantity = 4;
    const result = calculateLaserCuttingQuote(input);
    expect(result.materialCost).toBeCloseTo(6.6, 5);
    expect(result.machineCost).toBeCloseTo(0.96, 5);
    expect(result.handlingLaborCost).toBeCloseTo(13.3333, 3);
    expect(result.setupLaborCost).toBeCloseTo(6.25, 5);
  });

  it("keeps a package discount above direct cost", () => {
    const input = createDefaultLaserCuttingInput();
    input.packageDiscount = 100;
    input.taxRate = 10;
    const result = calculateLaserCuttingQuote(input);
    expect(result.discountedQuote).toBeCloseTo(result.directCost, 5);
    expect(result.subtotal).toBeCloseTo(result.directCost, 5);
    expect(result.total).toBeCloseTo(result.directCost * 1.1, 5);
    expect(result.isBelowCostFloor).toBe(true);
  });

  it("uses material and thickness as real pricing inputs", () => {
    const input = createDefaultLaserCuttingInput();
    const baseline = calculateLaserCuttingQuote(input);
    input.materialThickness = 6;
    const thicker = calculateLaserCuttingQuote(input);
    expect(thicker.materialCost).toBeCloseTo(baseline.materialCost * 2, 5);
    input.material = "stainlessSteel";
    expect(calculateLaserCuttingQuote(input).materialCost).toBeCloseTo(thicker.materialCost * 1.6, 5);
  });

  it("converts measurement units without changing the quote", () => {
    const input = createDefaultLaserCuttingInput();
    const imperial = convertLaserCuttingMeasurement(input, "sqft");
    expect(imperial.materialArea).toBeCloseTo(21.5278, 3);
    expect(imperial.materialThickness).toBeCloseTo(0.1181, 3);
    expect(imperial.cutLength).toBeCloseTo(70.8661, 3);
    expect(calculateLaserCuttingQuote(imperial).total).toBeCloseTo(calculateLaserCuttingQuote(input).total, 2);
  });

  it("converts currency and normalizes invalid numeric values", () => {
    const yen = convertLaserCuttingCurrency(createDefaultLaserCuttingInput(), "USD", "JPY");
    expect(yen.laborRate).toBe(3750);
    yen.materialThickness = -1;
    expect(() => calculateLaserCuttingQuote(yen)).not.toThrow();
    expect(calculateLaserCuttingQuote(yen).input.materialThickness).toBe(0);
  });
});
