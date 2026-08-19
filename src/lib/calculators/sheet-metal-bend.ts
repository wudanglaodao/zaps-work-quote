import { z } from "zod";

export const sheetMetalMaterialEnum = z.enum([
  "coldRolledSteel",
  "stainlessSteel",
  "aluminum",
  "brassCopper",
  "custom",
]);

export type SheetMetalMaterial = z.infer<typeof sheetMetalMaterialEnum>;

export const defaultKFactors: Record<SheetMetalMaterial, number> = {
  coldRolledSteel: 0.44,
  stainlessSteel: 0.45,
  aluminum: 0.40,
  brassCopper: 0.42,
  custom: 0.44,
};

export const sheetMetalBendInputSchema = z.object({
  material: sheetMetalMaterialEnum,
  kFactor: z.number().finite().min(0.1).max(0.9),
  customKFactor: z.boolean(),
  unit: z.enum(["mm", "in"]),
  thickness: z.number().finite().min(0.01).max(500),
  insideRadius: z.number().finite().min(0.01).max(1000),
  bendAngle: z.number().finite().min(1).max(179), // degrees (included or bend angle)
  flangeA: z.number().finite().min(0.01).max(100000),
  flangeB: z.number().finite().min(0.01).max(100000),
  quantity: z.number().int().min(1).max(100000),
});

export type SheetMetalBendInput = z.infer<typeof sheetMetalBendInputSchema>;

export type SheetMetalBendResult = {
  kFactor: number;
  setback: number; // OSSB
  bendAllowance: number; // BA
  bendDeduction: number; // BD
  flatLengthSingle: number;
  flatLengthTotal: number;
  neutralAxisRadius: number;
  innerArcLength: number;
  outerArcLength: number;
};

const MM_PER_INCH = 25.4;

export function createDefaultSheetMetalBendInput(): SheetMetalBendInput {
  return {
    material: "coldRolledSteel",
    kFactor: 0.44,
    customKFactor: false,
    unit: "mm",
    thickness: 2.0,
    insideRadius: 1.5,
    bendAngle: 90,
    flangeA: 50.0,
    flangeB: 50.0,
    quantity: 1,
  };
}

export function convertSheetMetalBendUnit(
  input: SheetMetalBendInput,
  targetUnit: "mm" | "in"
): SheetMetalBendInput {
  if (input.unit === targetUnit) return input;

  const factor = targetUnit === "in" ? 1 / MM_PER_INCH : MM_PER_INCH;
  const round = (val: number) => {
    return targetUnit === "in"
      ? Number((val * factor).toFixed(4))
      : Number((val * factor).toFixed(2));
  };

  return {
    ...input,
    unit: targetUnit,
    thickness: round(input.thickness),
    insideRadius: round(input.insideRadius),
    flangeA: round(input.flangeA),
    flangeB: round(input.flangeB),
  };
}

export function calculateSheetMetalBend(input: SheetMetalBendInput): SheetMetalBendResult {
  const k = input.customKFactor ? input.kFactor : defaultKFactors[input.material];
  const t = Math.max(0.001, input.thickness);
  const r = Math.max(0.001, input.insideRadius);
  const angle = Math.min(179, Math.max(1, input.bendAngle));
  const angleRad = (angle * Math.PI) / 180;

  // Outer Setback: OSSB = tan(angle / 2) * (R + T)
  const setback = Math.tan(angleRad / 2) * (r + t);

  // Bend Allowance: BA = (pi * angle / 180) * (R + K * T)
  const bendAllowance = angleRad * (r + k * t);

  // Bend Deduction: BD = 2 * OSSB - BA
  const bendDeduction = 2 * setback - bendAllowance;

  // Flat Length: L_flat = A + B - BD
  const flatLengthSingle = Math.max(0, input.flangeA + input.flangeB - bendDeduction);
  const flatLengthTotal = flatLengthSingle * Math.max(1, input.quantity);

  const neutralAxisRadius = r + k * t;
  const innerArcLength = angleRad * r;
  const outerArcLength = angleRad * (r + t);

  const precision = input.unit === "in" ? 4 : 2;
  const round = (v: number) => Number(v.toFixed(precision));

  return {
    kFactor: Number(k.toFixed(3)),
    setback: round(setback),
    bendAllowance: round(bendAllowance),
    bendDeduction: round(bendDeduction),
    flatLengthSingle: round(flatLengthSingle),
    flatLengthTotal: round(flatLengthTotal),
    neutralAxisRadius: round(neutralAxisRadius),
    innerArcLength: round(innerArcLength),
    outerArcLength: round(outerArcLength),
  };
}
