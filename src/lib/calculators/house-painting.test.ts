import { describe, expect, it } from "vitest";
import { calculateHousePaintingQuote, convertHousePaintingMeasurement, createDefaultHousePaintingInput } from "./house-painting";

describe("house painting quote calculator", () => {
  it("includes paint, labor, overhead, and target margin", () => {
    const result = calculateHousePaintingQuote(createDefaultHousePaintingInput());
    expect(result.paintContainers).toBe(8);
    expect(result.laborHours).toBeCloseTo(18.1, 5);
    expect(result.total).toBeGreaterThan(result.directCost);
    expect(result.margin).toBeCloseTo(0.35, 5);
  });

  it("converts all area-based inputs when changing measurement units", () => {
    const imperial = createDefaultHousePaintingInput();
    const metric = convertHousePaintingMeasurement(imperial, "sqm");
    expect(metric.area).toBeCloseTo(111.4836, 4);
    expect(metric.coveragePerContainer).toBeCloseTo(32.5161, 4);
    expect(metric.productionRate).toBeCloseTo(13.9355, 4);
    expect(calculateHousePaintingQuote(metric).total).toBeCloseTo(calculateHousePaintingQuote(imperial).total, 2);
  });

  it("normalizes invalid numeric input instead of producing a broken quote", () => {
    const input = createDefaultHousePaintingInput();
    const result = calculateHousePaintingQuote({ ...input, area: Number.NaN, laborRate: -20, coats: 0 });
    expect(result.input.area).toBe(0);
    expect(result.input.laborRate).toBe(0);
    expect(result.input.coats).toBe(1);
    expect(Number.isFinite(result.total)).toBe(true);
  });
});
