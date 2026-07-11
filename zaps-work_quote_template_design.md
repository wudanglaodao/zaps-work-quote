# Quote Export Templates

## Current template

`Basic` is the first shared export template for zaps.work. It is intentionally quiet and document-like:

- one company header
- optional customer and project details
- line-item table with description, quantity, unit price, and amount
- subtotal, optional tax, and total
- optional validity and company footer

The 3D Print Cost Calculator now supplies data to this template instead of owning the PDF layout. Its CSV export also uses the shared `basic-csv` encoder, including UTF-8 BOM, CRLF rows, delimiter escaping, and spreadsheet formula neutralization.

## Contract

Each calculator owns only:

1. Input state and calculation logic.
2. Localized labels and scenario-specific line-item mapping.
3. Export metrics and the privacy-safe analytics snapshot.

The shared template owns:

1. Document structure and visual hierarchy.
2. Optional customer-detail visibility.
3. Print/PDF layout classes.
4. CSV cell encoding and row ordering.

Customer information remains local to the browser and can be included in a user-triggered local PDF/CSV export. It is not part of the analytics snapshot or database event payload.

## Extension path

Future templates should be added beside `Basic` and selected explicitly by the export UI:

- `Basic`: current compact quote document.
- `Compact`: shorter one-page summary for quick handoff.
- `Detailed`: expanded assumptions, notes, and cost breakdown.

Scenario calculators should continue to pass a normalized list of quote lines and summary values. This keeps template changes independent from calculator formulas and lets Pressure Washing, Laser Cutting, and future tools share the same export system.
