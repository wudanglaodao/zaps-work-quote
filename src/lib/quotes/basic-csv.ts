export type BasicCsvOptions = {
  headers: unknown[];
  rows: unknown[][];
  summaryRows?: unknown[][];
};

export function csvCell(value: unknown) {
  const raw = String(value ?? "");
  const safe = /^[\t\r ]*[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return /[",\r\n]/.test(safe) ? `"${safe.replaceAll('"', '""')}"` : safe;
}

export function createBasicQuoteCsv({ headers, rows, summaryRows = [] }: BasicCsvOptions) {
  const allRows = [headers, ...rows, ...summaryRows];
  return `\uFEFF${allRows.map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
}
