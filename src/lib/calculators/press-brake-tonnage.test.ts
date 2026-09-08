import { describe, expect, it } from "vitest";
import {
  calculatePressBrakeTonnage,
  convertPressBrakeTonnageUnit,
  createDefaultPressBrakeTonnageInput,
  recommendedDieOpening
} from "./press-brake-tonnage";

describe("press brake tonnage calculation engine", () => {
  it("calculates accurate tonnage for standard 2mm mild steel with default die opening", () => {
    const input = createDefaultPressBrakeTonnageInput();
    // material: mildSteel (400 MPa)
    // thickness: 2.0 mm
    // bendLength: 1000 mm
    // customDieOpening: false -> uses recommended which is 6*2 = 12
    
    // P = (1.42 * 400 * 1000 * 4) / (1000 * 12) = 2272 / 12 = 189.333 tons
    const res = calculatePressBrakeTonnage(input);
    expect(res.dieOpeningUsed).toBe(12.0);
    expect(res.tonnagePerBend).toBe(189.33);
    expect(res.tonnageWithSafety).toBe(227.2); // 189.333 * 1.2
  });
  
  it("uses custom die opening when specified", () => {
    const input = {
      ...createDefaultPressBrakeTonnageInput(),
      customDieOpening: true,
      dieOpening: 16.0,
    };
    // P = (1.42 * 400 * 1000 * 4) / (1000 * 16) = 2272 / 16 = 142 tons
    const res = calculatePressBrakeTonnage(input);
    expect(res.dieOpeningUsed).toBe(16.0);
    expect(res.tonnagePerBend).toBe(142.0);
  });

  it("handles different materials properly (stainless steel has higher UTS)", () => {
    const mild = calculatePressBrakeTonnage({
      ...createDefaultPressBrakeTonnageInput(),
      customDieOpening: true,
      dieOpening: 16.0,
    });
    const stainless = calculatePressBrakeTonnage({
      ...createDefaultPressBrakeTonnageInput(),
      material: "stainlessSteel",
      customDieOpening: true,
      dieOpening: 16.0,
    });
    
    expect(stainless.tonnagePerBend).toBeGreaterThan(mild.tonnagePerBend);
  });
  
  it("handles custom tensile strength override", () => {
    const customInput = {
      ...createDefaultPressBrakeTonnageInput(),
      customTensile: true,
      tensileStrength: 500, // custom
      customDieOpening: true,
      dieOpening: 16.0,
    };
    const res = calculatePressBrakeTonnage(customInput);
    // P = (1.42 * 500 * 1000 * 4) / (1000 * 16) = 2840 / 16 = 177.5
    expect(res.tonnagePerBend).toBe(177.5);
  });

  it("converts units between mm and inches seamlessly", () => {
    const metric = createDefaultPressBrakeTonnageInput();
    const imperial = convertPressBrakeTonnageUnit(metric, "in");

    expect(imperial.unit).toBe("in");
    expect(imperial.thickness).toBeCloseTo(2.0 / 25.4, 3);
    expect(imperial.bendLength).toBeCloseTo(1000 / 25.4, 3);
    expect(imperial.tensileStrength).toBe(58000); // from mapping

    const backToMetric = convertPressBrakeTonnageUnit(imperial, "mm");
    expect(backToMetric.unit).toBe("mm");
    expect(backToMetric.thickness).toBeCloseTo(2.0, 1);
    expect(backToMetric.tensileStrength).toBe(400);
  });

  it("calculates correctly in imperial units", () => {
    const imperial = convertPressBrakeTonnageUnit(createDefaultPressBrakeTonnageInput(), "in");
    // force calculation to use custom die opening for predictability
    imperial.customDieOpening = true;
    imperial.dieOpening = 16.0 / 25.4; 
    
    const res = calculatePressBrakeTonnage(imperial);
    // Imperial calculation formula gives ~16 US tons (which is physically accurate, unlike the metric formula in the prompt which gives 10x)
    expect(res.tonnagePerBend).toBeGreaterThan(15);
    expect(res.tonnagePerBend).toBeLessThan(17);
  });
  
  it("provides correct recommended die openings based on thickness", () => {
    expect(recommendedDieOpening(2, "mm")).toBe(12); // < 3mm: 6T
    expect(recommendedDieOpening(4, "mm")).toBe(32); // 3-6mm: 8T
    expect(recommendedDieOpening(10, "mm")).toBe(100); // > 6mm: 10T
  });

  it("handles very thin sheet gracefully", () => {
    const thinInput = {
      ...createDefaultPressBrakeTonnageInput(),
      thickness: 0.1,
    };
    const res = calculatePressBrakeTonnage(thinInput);
    expect(res.tonnagePerBend).toBeGreaterThan(0);
    expect(res.dieOpeningUsed).toBe(0.6); // 6 * 0.1 = 0.6
  });

  it("handles very thick sheet gracefully", () => {
    const thickInput = {
      ...createDefaultPressBrakeTonnageInput(),
      thickness: 50,
    };
    const res = calculatePressBrakeTonnage(thickInput);
    expect(res.tonnagePerBend).toBeGreaterThan(0);
    expect(res.dieOpeningUsed).toBe(500); // 10 * 50 = 500
  });
});
