import { describe, expect, it } from "vitest";
import { calculatePressureWashingQuote, createDefaultPressureWashingInput } from "./pressure-washing";

describe("pressure washing driveway quote calculation", () => {
  it("calculates the default driveway quote from area and cost inputs", () => {
    const result = calculatePressureWashingQuote(createDefaultPressureWashingInput());
    expect(result.measuredArea).toBe(800);
    expect(result.directCost).toBeCloseTo(100, 5);
    expect(result.subtotal).toBeCloseTo(200, 5);
    expect(result.profit).toBeCloseTo(100, 5);
    expect(result.margin).toBeCloseTo(0.5, 5);
    expect(result.controllingRule).toBe("surfaceRate");
  });

  it("uses the margin floor for a small driveway instead of underpricing the visit", () => {
    const input = createDefaultPressureWashingInput();
    input.area = 300;
    const result = calculatePressureWashingQuote(input);
    expect(result.rateBasedSubtotal).toBeCloseTo(75, 5);
    expect(result.costFloor).toBeCloseTo(153.846, 3);
    expect(result.subtotal).toBeCloseTo(result.costFloor, 5);
    expect(result.controllingRule).toBe("marginFloor");
    expect(result.isBelowCostFloor).toBe(true);
  });

  it("keeps condition and access as labels while applying tax and a package discount", () => {
    const input = createDefaultPressureWashingInput();
    input.condition = "heavy";
    input.access = "difficult";
    input.addOnAmount = 40;
    input.packageDiscount = 20;
    input.taxRate = 10;
    const result = calculatePressureWashingQuote(input);
    expect(result.drivewayAmount).toBeCloseTo(200, 5);
    expect(result.rateBasedSubtotal).toBeCloseTo(240, 5);
    expect(result.discountedRateSubtotal).toBeCloseTo(220, 5);
    expect(result.subtotal).toBeCloseTo(220, 5);
    expect(result.tax).toBeCloseTo(22, 5);
    expect(result.total).toBeCloseTo(242, 5);
  });

  it("does not change the quote when only condition or access labels change", () => {
    const input = createDefaultPressureWashingInput();
    const baseline = calculatePressureWashingQuote(input);
    input.condition = "light";
    input.access = "difficult";
    const labeled = calculatePressureWashingQuote(input);
    expect(labeled.total).toBeCloseTo(baseline.total, 5);
  });
});
