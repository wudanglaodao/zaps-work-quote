import { describe, expect, it } from "vitest";
import {
  calculateSheetMetalBend,
  convertSheetMetalBendUnit,
  createDefaultSheetMetalBendInput,
} from "./sheet-metal-bend";

describe("sheet metal bend calculation engine", () => {
  it("calculates accurate 90 degree bend for standard 2mm steel", () => {
    const input = {
      material: "coldRolledSteel" as const,
      kFactor: 0.44,
      customKFactor: false,
      unit: "mm" as const,
      thickness: 2.0,
      insideRadius: 1.5,
      bendAngle: 90,
      flangeA: 50.0,
      flangeB: 50.0,
      quantity: 1,
    };

    const res = calculateSheetMetalBend(input);
    // OSSB = tan(45 deg) * (1.5 + 2.0) = 3.50 mm
    expect(res.setback).toBe(3.5);
    // BA = (pi * 90 / 180) * (1.5 + 0.44 * 2) = 1.570796 * 2.38 = 3.7385 -> 3.74 mm
    expect(res.bendAllowance).toBe(3.74);
    // BD = 2 * 3.5 - 3.74 = 3.26 mm
    expect(res.bendDeduction).toBe(3.26);
    // L_flat = 50 + 50 - 3.26 = 96.74 mm
    expect(res.flatLengthSingle).toBe(96.74);
    expect(res.flatLengthTotal).toBe(96.74);
  });

  it("handles custom K-Factor overriding material preset", () => {
    const input = {
      ...createDefaultSheetMetalBendInput(),
      customKFactor: true,
      kFactor: 0.5,
      thickness: 2.0,
      insideRadius: 2.0,
      bendAngle: 90,
      flangeA: 40.0,
      flangeB: 60.0,
    };

    const res = calculateSheetMetalBend(input);
    expect(res.kFactor).toBe(0.5);
    // OSSB = 4.0
    expect(res.setback).toBe(4.0);
    // BA = (pi / 2) * (2 + 0.5 * 2) = 1.570796 * 3 = 4.71
    expect(res.bendAllowance).toBe(4.71);
    // BD = 8.0 - 4.71 = 3.29
    expect(res.bendDeduction).toBe(3.29);
    // L_flat = 100 - 3.29 = 96.71
    expect(res.flatLengthSingle).toBe(96.71);
  });

  it("calculates non-90 degree acute and obtuse bends correctly", () => {
    const acuteInput = {
      ...createDefaultSheetMetalBendInput(),
      bendAngle: 45,
      thickness: 1.0,
      insideRadius: 1.0,
      flangeA: 30.0,
      flangeB: 30.0,
    };
    const acuteRes = calculateSheetMetalBend(acuteInput);
    expect(acuteRes.setback).toBeGreaterThan(0);
    expect(acuteRes.bendAllowance).toBeGreaterThan(0);
    expect(acuteRes.flatLengthSingle).toBeLessThan(60);

    const obtuseInput = {
      ...createDefaultSheetMetalBendInput(),
      bendAngle: 120,
      thickness: 1.0,
      insideRadius: 1.0,
      flangeA: 30.0,
      flangeB: 30.0,
    };
    const obtuseRes = calculateSheetMetalBend(obtuseInput);
    expect(obtuseRes.setback).toBeGreaterThan(acuteRes.setback);
  });

  it("converts units between mm and inches seamlessly", () => {
    const metric = createDefaultSheetMetalBendInput();
    const imperial = convertSheetMetalBendUnit(metric, "in");

    expect(imperial.unit).toBe("in");
    expect(imperial.thickness).toBeCloseTo(2.0 / 25.4, 3);
    expect(imperial.flangeA).toBeCloseTo(50.0 / 25.4, 3);

    const backToMetric = convertSheetMetalBendUnit(imperial, "mm");
    expect(backToMetric.unit).toBe("mm");
    expect(backToMetric.thickness).toBeCloseTo(2.0, 1);
  });
});
