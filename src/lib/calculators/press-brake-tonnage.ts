import { z } from "zod";

export const pressBrakeMaterialEnum = z.enum([
  'mildSteel',      // 400 MPa / 58,000 psi
  'stainlessSteel', // 620 MPa / 90,000 psi  
  'aluminum',       // 310 MPa / 45,000 psi
  'highStrengthSteel', // 590 MPa / 85,600 psi
  'custom'
]);

export type PressBrakeMaterial = z.infer<typeof pressBrakeMaterialEnum>;

export const defaultTensileStrengths: Record<Exclude<PressBrakeMaterial, "custom">, { mm: number, in: number }> = {
  mildSteel: { mm: 400, in: 58000 },
  stainlessSteel: { mm: 620, in: 90000 },
  aluminum: { mm: 310, in: 45000 },
  highStrengthSteel: { mm: 590, in: 85600 },
};

export const pressBrakeTonnageInputSchema = z.object({
  material: pressBrakeMaterialEnum,
  tensileStrength: z.number().finite().min(10).max(500000), // MPa or PSI
  customTensile: z.boolean(),
  unit: z.enum(['mm', 'in']),
  thickness: z.number().finite().min(0.1).max(100),
  bendLength: z.number().finite().min(1).max(20000),
  dieOpening: z.number().finite().min(1).max(500),
  customDieOpening: z.boolean(), // false = use recommended V
  quantity: z.number().int().min(1).max(100000),
  safetyFactor: z.number().finite().min(1.0).max(3.0), // default 1.2
});

export type PressBrakeTonnageInput = z.infer<typeof pressBrakeTonnageInputSchema>;

export type PressBrakeTonnageResult = {
  tonnagePerBend: number;       // metric tons or US tons
  tonnageWithSafety: number;    // with safety factor
  tonnagePerMeter: number;      // tons per meter of bend length (for machine capacity)
  recommendedDieOpening: number;
  minimumFlange: number;
  insideBendRadius: number;
  dieOpeningUsed: number;       // actual die opening used in calculation
};

const MM_PER_INCH = 25.4;

export function createDefaultPressBrakeTonnageInput(): PressBrakeTonnageInput {
  return {
    material: "mildSteel",
    tensileStrength: 400,
    customTensile: false,
    unit: "mm",
    thickness: 2.0,
    bendLength: 1000,
    dieOpening: 16.0,
    customDieOpening: false,
    quantity: 1,
    safetyFactor: 1.2,
  };
}

export function convertPressBrakeTonnageUnit(
  input: PressBrakeTonnageInput,
  targetUnit: "mm" | "in"
): PressBrakeTonnageInput {
  if (input.unit === targetUnit) return input;

  const factor = targetUnit === "in" ? 1 / MM_PER_INCH : MM_PER_INCH;
  const round = (val: number) => {
    return targetUnit === "in"
      ? Number((val * factor).toFixed(4))
      : Number((val * factor).toFixed(2));
  };
  
  let newTensileStrength = input.tensileStrength;
  if (!input.customTensile && input.material !== "custom") {
    newTensileStrength = defaultTensileStrengths[input.material][targetUnit];
  } else {
    // 1 MPa ≈ 145.038 PSI
    const psiPerMpa = 145.0377;
    if (targetUnit === "in") {
      newTensileStrength = Math.round(input.tensileStrength * psiPerMpa);
    } else {
      newTensileStrength = Math.round(input.tensileStrength / psiPerMpa);
    }
  }

  return {
    ...input,
    unit: targetUnit,
    thickness: round(input.thickness),
    bendLength: round(input.bendLength),
    dieOpening: round(input.dieOpening),
    tensileStrength: newTensileStrength,
  };
}

export function recommendedDieOpening(thickness: number, unit: "mm" | "in"): number {
  const tMm = unit === "in" ? thickness * MM_PER_INCH : thickness;
  
  let vMm: number;
  if (tMm < 3) {
    vMm = 6 * tMm;
  } else if (tMm <= 6) {
    vMm = 8 * tMm;
  } else {
    vMm = 10 * tMm;
  }
  
  if (unit === "in") {
    return Number((vMm / MM_PER_INCH).toFixed(4));
  }
  return Number(vMm.toFixed(2));
}

export function calculatePressBrakeTonnage(input: PressBrakeTonnageInput): PressBrakeTonnageResult {
  const t = Math.max(0.001, input.thickness);
  const l = Math.max(0.001, input.bendLength);
  
  let uts = input.tensileStrength;
  if (!input.customTensile && input.material !== "custom") {
    uts = defaultTensileStrengths[input.material][input.unit];
  }

  const recV = recommendedDieOpening(t, input.unit);
  const v = input.customDieOpening ? Math.max(0.001, input.dieOpening) : recV;
  
  const c = 1.42; // Constant factor for air bending
  
  let p: number;
  if (input.unit === "mm") {
    // P = (C × σ × L × T²) / (1000 × V)
    p = (c * uts * l * t * t) / (1000 * v);
  } else {
    // P = (C × σ_psi × L_in × T_in²) / (V_in) / 2000
    p = (c * uts * l * t * t) / (v * 2000);
  }
  
  const tonnageWithSafety = p * input.safetyFactor;
  
  // Per meter or per foot
  let tonnagePerMeter: number;
  if (input.unit === "mm") {
    tonnagePerMeter = (p / l) * 1000;
  } else {
    // Per foot? The output spec says: "tons per meter of bend length (for machine capacity)".
    // But in imperial it might be expected to be per foot.
    // The prompt says: "tons per meter of bend length (for machine capacity)" in comments.
    // So let's provide tons per foot when in inches. (12 inches = 1 foot)
    tonnagePerMeter = (p / l) * 12;
  }
  
  const insideBendRadius = v / 6;
  const minimumFlange = (v * 0.67) + insideBendRadius + t; 

  const precision = input.unit === "in" ? 4 : 2;
  const round = (val: number) => Number(val.toFixed(precision));

  return {
    tonnagePerBend: round(p),
    tonnageWithSafety: round(tonnageWithSafety),
    tonnagePerMeter: round(tonnagePerMeter),
    recommendedDieOpening: round(recV),
    minimumFlange: round(minimumFlange),
    insideBendRadius: round(insideBendRadius),
    dieOpeningUsed: round(v),
  };
}
