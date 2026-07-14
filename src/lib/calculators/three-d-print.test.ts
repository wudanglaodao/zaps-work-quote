import { describe, expect, it } from "vitest";
import { calculateThreeDPrintQuote, clampNumericInput, convertThreeDPrintCurrency, createDefaultQuoteInput, quoteInputSchema } from "./three-d-print";

describe("3D print quote calculation", () => {
  it("returns a deterministic profitable default quote", () => {
    const result = calculateThreeDPrintQuote(createDefaultQuoteInput());
    expect(result.totalCost).toBeCloseTo(17.07, 1);
    expect(result.subtotal).toBeCloseTo(26.26, 1);
    expect(result.margin).toBeCloseTo(0.35, 4);
  });

  it("keeps item allocations and shipping equal to the subtotal", () => {
    const input = createDefaultQuoteInput();
    input.shippingCost = 5;
    const result = calculateThreeDPrintQuote(input);
    const allocated = result.itemResults.reduce((sum, item) => sum + item.quoteAmount, 0) + result.allocatedShipping;
    expect(allocated).toBeCloseTo(result.subtotal, 8);
  });

  it("treats slicer material and print time as whole-batch totals", () => {
    const onePiece = createDefaultQuoteInput();
    const batch = createDefaultQuoteInput();
    batch.items[0].quantity = 10;

    expect(calculateThreeDPrintQuote(batch).totalCost).toBeCloseTo(calculateThreeDPrintQuote(onePiece).totalCost, 8);
    expect(calculateThreeDPrintQuote(batch).subtotal).toBeCloseTo(calculateThreeDPrintQuote(onePiece).subtotal, 8);
  });

  it("clamps transient numeric input to calculator schema limits", () => {
    expect(clampNumericInput("", 1, 1000)).toBe(1);
    expect(clampNumericInput("Infinity", 0, 95)).toBe(0);
    expect(clampNumericInput("120", 0, 95)).toBe(95);
    expect(clampNumericInput("-5", 0, 50)).toBe(0);
  });

  it("rejects invalid calculator values at the domain boundary", () => {
    const input = createDefaultQuoteInput();
    input.targetMargin = 96;
    expect(quoteInputSchema.safeParse(input).success).toBe(false);
  });

  it("converts all monetary inputs when currency changes", () => {
    const input = convertThreeDPrintCurrency(createDefaultQuoteInput(), "USD", "JPY");
    expect(input.items[0].spoolPrice).toBe(3600);
    expect(input.laborRate).toBe(3000);
    expect(input.minimumFee).toBe(1500);
  });
});
