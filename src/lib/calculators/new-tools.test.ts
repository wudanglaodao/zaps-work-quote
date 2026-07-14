import { describe, expect, it } from "vitest";
import { calculateCncQuote, createDefaultCncInput } from "./cnc";
import { calculateFreelanceQuote, createDefaultFreelanceInput } from "./freelance";
import { calculateLawnCareQuote, createDefaultLawnCareInput } from "./lawn-care";

describe("new quote tools", () => {
  it("prices freelance revisions and rush work without losing the target margin", () => { const result = calculateFreelanceQuote({ ...createDefaultFreelanceInput(), rushPercent: 25 }); expect(result.baseHours).toBe(14); expect(result.total).toBeGreaterThan(result.directCost); expect(result.margin).toBeGreaterThan(.35); });
  it("spreads CNC setup and programming across a batch", () => { const result = calculateCncQuote(createDefaultCncInput()); expect(result.materialCost).toBeGreaterThan(0); expect(result.machineHours).toBeGreaterThan(0); expect(result.unitPrice).toBeCloseTo(result.total / 10, 5); });
  it("normalizes invalid lawn inputs and applies the condition multiplier", () => { const standard = calculateLawnCareQuote(createDefaultLawnCareInput()); const overgrown = calculateLawnCareQuote({ ...createDefaultLawnCareInput(), condition: "overgrown", area: Number.NaN, laborRate: -1 }); expect(overgrown.input.area).toBe(0); expect(overgrown.input.laborRate).toBe(0); expect(standard.crewHours).toBeGreaterThan(0); });
});
