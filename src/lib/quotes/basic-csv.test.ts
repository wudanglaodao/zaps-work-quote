import { describe, expect, it } from "vitest";
import { createBasicQuoteCsv, csvCell } from "./basic-csv";

describe("basic quote CSV template", () => {
  it("adds a UTF-8 BOM and keeps summary rows after quote lines", () => {
    const csv = createBasicQuoteCsv({
      headers: ["Description", "Amount"],
      rows: [["Driveway washing", "120.00"]],
      summaryRows: [["Total", "120.00"]],
    });

    expect(csv).toBe("\uFEFFDescription,Amount\r\nDriveway washing,120.00\r\nTotal,120.00");
  });

  it("quotes delimiters and neutralizes spreadsheet formulas", () => {
    expect(csvCell("Northline, Studio")).toBe('"Northline, Studio"');
    expect(csvCell("=HYPERLINK(\"https://example.com\")")).toBe('"\'=HYPERLINK(""https://example.com"")"');
  });
});
