import { describe, expect, it } from "vitest";
import { calculateCleaningQuote, createDefaultCleaningInput } from "./cleaning";

describe("cleaning quote calculation", () => {
  it("matches the documented default fixture", () => {
    const result = calculateCleaningQuote(createDefaultCleaningInput());
    expect(result.totalCleanerHours).toBeCloseTo(3.6, 5);
    expect(result.onSiteHours).toBeCloseTo(1.8, 5);
    expect(result.laborCost).toBeCloseTo(86.4, 5);
    expect(result.overheadCost).toBeCloseTo(36, 5);
    expect(result.jobCost).toBeCloseTo(149.4, 5);
    expect(result.subtotal).toBeCloseTo(213.428571, 5);
    expect(result.margin).toBeCloseTo(0.3, 5);
  });

  it("changes duration but not cleaner-hours or labor when crew size doubles", () => {
    const input = createDefaultCleaningInput();
    const oneCrew = calculateCleaningQuote({ ...input, crewSize: 1 });
    const twoCrew = calculateCleaningQuote({ ...input, crewSize: 2 });
    expect(twoCrew.onSiteHours).toBeCloseTo(oneCrew.onSiteHours / 2, 5);
    expect(twoCrew.totalCleanerHours).toBeCloseTo(oneCrew.totalCleanerHours, 5);
    expect(twoCrew.laborCost).toBeCloseTo(oneCrew.laborCost, 5);
  });

  it("uses manual cleaner-hours independently from area", () => {
    const input = createDefaultCleaningInput();
    input.estimationMode = "manual";
    input.manualCleanerHours = 5;
    const first = calculateCleaningQuote(input);
    input.area = 5000;
    const second = calculateCleaningQuote(input);
    expect(first.baseCleanerHours).toBe(5);
    expect(second.baseCleanerHours).toBe(5);
    expect(second.subtotal).toBeCloseTo(first.subtotal, 5);
  });

  it("adds selected add-on time, cost, and quote revenue", () => {
    const input = createDefaultCleaningInput();
    input.addOns.oven.selected = true;
    const result = calculateCleaningQuote(input);
    expect(result.addOnCleanerHours).toBeCloseTo(0.75, 5);
    expect(result.addOnCost).toBeCloseTo(25.5, 5);
    expect(result.subtotal).toBeGreaterThan(213.43);
  });

  it("applies recurring discount and minimum fee", () => {
    const input = createDefaultCleaningInput();
    input.frequencyDiscount = 20;
    const discounted = calculateCleaningQuote(input);
    expect(discounted.discountAmount).toBeGreaterThan(0);
    input.area = 100;
    input.suppliesCost = 0;
    input.travelCost = 0;
    const minimum = calculateCleaningQuote(input);
    expect(minimum.subtotal).toBe(120);
    expect(minimum.minimumFeeApplied).toBe(true);
  });
});
