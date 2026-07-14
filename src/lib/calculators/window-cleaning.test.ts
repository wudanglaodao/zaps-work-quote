import { describe, expect, it } from "vitest";
import { calculateWindowCleaningQuote, createDefaultWindowCleaningInput } from "./window-cleaning";

describe("window cleaning quote calculator", () => {
  it("adds access and condition time without losing the target margin", () => {
    const baseline = calculateWindowCleaningQuote(createDefaultWindowCleaningInput());
    const complex = calculateWindowCleaningQuote({ ...createDefaultWindowCleaningInput(), access: "high-access", condition: "heavy" });
    expect(complex.crewHours).toBeGreaterThan(baseline.crewHours);
    expect(complex.total).toBeGreaterThan(baseline.total);
    expect(complex.margin).toBeGreaterThanOrEqual(.35);
  });

  it("uses the crew's editable access and condition factors", () => {
    const defaults = createDefaultWindowCleaningInput();
    const baseline = calculateWindowCleaningQuote({ ...defaults, access: "high-access", condition: "heavy" });
    const calibrated = calculateWindowCleaningQuote({ ...defaults, access: "high-access", condition: "heavy", highAccessMultiplier: 2, heavySoilMultiplier: 1.5 });
    expect(calibrated.crewHours).toBeGreaterThan(baseline.crewHours);
    expect(calibrated.total).toBeGreaterThan(baseline.total);
  });

  it("normalizes invalid values into a safe quote", () => {
    const result = calculateWindowCleaningQuote({ ...createDefaultWindowCleaningInput(), standardWindows: Number.NaN, crewSize: -2, laborRate: -10, highAccessMultiplier: Number.NaN });
    expect(result.input.standardWindows).toBe(0);
    expect(result.input.crewSize).toBe(1);
    expect(result.input.laborRate).toBe(0);
    expect(result.input.highAccessMultiplier).toBe(1);
  });
});
