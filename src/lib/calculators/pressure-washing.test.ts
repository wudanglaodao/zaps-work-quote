import { describe, expect, it } from "vitest";
import { calculatePressureWashingQuote, convertPressureWashingCurrency, convertPressureWashingMeasurement, createDefaultPressureWashingInput } from "./pressure-washing";

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

  it("applies condition and access multipliers before tax and a package discount", () => {
    const input = createDefaultPressureWashingInput();
    input.condition = "heavy";
    input.access = "difficult";
    input.addOnAmount = 40;
    input.packageDiscount = 20;
    input.taxRate = 10;
    const result = calculatePressureWashingQuote(input);
    expect(result.serviceMultiplier).toBeCloseTo(1.4375, 5);
    expect(result.drivewayAmount).toBeCloseTo(287.5, 5);
    expect(result.rateBasedSubtotal).toBeCloseTo(327.5, 5);
    expect(result.discountedRateSubtotal).toBeCloseTo(307.5, 5);
    expect(result.subtotal).toBeCloseTo(307.5, 5);
    expect(result.tax).toBeCloseTo(30.75, 5);
    expect(result.total).toBeCloseTo(338.25, 5);
  });

  it("changes the quote when condition or access changes", () => {
    const input = createDefaultPressureWashingInput();
    const baseline = calculatePressureWashingQuote(input);
    input.condition = "light";
    input.access = "difficult";
    const labeled = calculatePressureWashingQuote(input);
    expect(labeled.total).not.toBeCloseTo(baseline.total, 5);
  });

  it("converts area units without changing the physical quote", () => {
    const input = createDefaultPressureWashingInput();
    const metric = convertPressureWashingMeasurement(input, "sqm");
    expect(metric.area).toBeCloseTo(74.3224, 3);
    expect(metric.ratePerArea).toBeCloseTo(2.691, 3);
    expect(calculatePressureWashingQuote(metric).total).toBeCloseTo(calculatePressureWashingQuote(input).total, 2);
  });

  it("converts currency and normalizes invalid numeric values", () => {
    const yen = convertPressureWashingCurrency(createDefaultPressureWashingInput(), "USD", "JPY");
    expect(yen.minimumFee).toBe(15000);
    yen.area = -10;
    expect(() => calculatePressureWashingQuote(yen)).not.toThrow();
    expect(calculatePressureWashingQuote(yen).measuredArea).toBe(0);
  });
});
