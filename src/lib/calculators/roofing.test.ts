import { describe, expect, it } from "vitest";
import {
  calculateRoofingQuote,
  convertRoofingCurrency,
  convertRoofingMeasurement,
  createDefaultRoofingInput,
  normalizeRoofingInput,
  type RoofingInput,
} from "./roofing";

describe("Roofing Calculator", () => {
  it("calculates realistic default roofing quote", () => {
    const input = createDefaultRoofingInput("USD", "sqft");
    const result = calculateRoofingQuote(input);

    expect(result.pitchMultiplier).toBeCloseTo(1.118, 3);
    expect(result.surfaceArea).toBeCloseTo(2236.068, 2);
    expect(result.baseSquares).toBeCloseTo(22.36, 2);
    expect(result.orderedSquares).toBe(26);
    expect(result.totalMaterialCost).toBeGreaterThan(0);
    expect(result.tearOffCost).toBeGreaterThan(0);
    expect(result.laborCost).toBeGreaterThan(0);
    expect(result.directCost).toBeGreaterThan(5000);
    expect(result.subtotal).toBeGreaterThan(result.directCost);
    expect(result.total).toBe(result.subtotal + result.tax);
    expect(result.pricePerSquare).toBeGreaterThan(300);
    expect(result.pricePerSquare).toBeLessThan(800);
    expect(result.controllingRule).toBe("marginFloor");
  });

  it("applies steep pitch and story surcharges accurately", () => {
    const standardInput: RoofingInput = {
      ...createDefaultRoofingInput("USD", "sqft"),
      pitch: 4,
      stories: 1,
    };
    const steepInput: RoofingInput = {
      ...createDefaultRoofingInput("USD", "sqft"),
      pitch: 10,
      stories: 3,
    };

    const standardResult = calculateRoofingQuote(standardInput);
    const steepResult = calculateRoofingQuote(steepInput);

    expect(standardResult.storyMultiplier).toBe(1.0);
    expect(standardResult.steepMultiplier).toBe(1.0);
    expect(steepResult.storyMultiplier).toBe(1.3);
    expect(steepResult.steepMultiplier).toBe(1.25);
    expect(steepResult.effectiveLaborRate).toBeGreaterThan(
      standardResult.effectiveLaborRate,
    );
  });

  it("handles zero tear-off for new roof installations", () => {
    const input: RoofingInput = {
      ...createDefaultRoofingInput("USD", "sqft"),
      tearOffLayers: 0,
    };
    const result = calculateRoofingQuote(input);

    expect(result.tearOffCost).toBe(0);
  });

  it("triggers minimum fee when scope is very small", () => {
    const input: RoofingInput = {
      ...createDefaultRoofingInput("USD", "sqft"),
      footprintArea: 100, // Small shed/garage patch
      minimumFee: 2500,
    };
    const result = calculateRoofingQuote(input);

    expect(result.subtotal).toBe(2500);
    expect(result.controllingRule).toBe("minimumFee");
  });

  it("converts between imperial (sqft) and metric (sqm)", () => {
    const imperial = createDefaultRoofingInput("USD", "sqft");
    const metric = convertRoofingMeasurement(imperial, "sqm");

    expect(metric.measurementUnit).toBe("sqm");
    expect(metric.footprintArea).toBeCloseTo(2000 * 0.09290304, 1);

    const backToImperial = convertRoofingMeasurement(metric, "sqft");
    expect(backToImperial.footprintArea).toBeCloseTo(2000, 0);

    const metricResult = calculateRoofingQuote(metric);
    // Calculated Squares should remain almost identical (around 25-26)
    expect(metricResult.orderedSquares).toBe(26);
  });

  it("converts currency properly", () => {
    const usdInput = createDefaultRoofingInput("USD", "sqft");
    const eurInput = convertRoofingCurrency(usdInput, "USD", "EUR");

    expect(eurInput.materialPricePerSquare).not.toBe(
      usdInput.materialPricePerSquare,
    );
    expect(eurInput.laborRatePerSquare).not.toBe(usdInput.laborRatePerSquare);
  });

  it("normalizes and clamps invalid inputs safely", () => {
    const invalidInput: RoofingInput = {
      ...createDefaultRoofingInput("USD", "sqft"),
      footprintArea: -500,
      pitch: 99,
      wastePercent: 200,
      targetMargin: 120,
    };
    const normalized = normalizeRoofingInput(invalidInput);

    expect(normalized.footprintArea).toBe(0);
    expect(normalized.pitch).toBe(24);
    expect(normalized.wastePercent).toBe(100);
    expect(normalized.targetMargin).toBe(95);
  });
});
