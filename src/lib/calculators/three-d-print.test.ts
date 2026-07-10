import { describe, expect, it } from "vitest";
import { calculateThreeDPrintQuote, createDefaultQuoteInput } from "./three-d-print";

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
});
