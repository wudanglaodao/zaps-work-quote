import { describe, expect, it } from "vitest";
import { calculateLaserCuttingQuote, createDefaultLaserCuttingInput } from "./laser-cutting";

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
});
