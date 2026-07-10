# zaps.work Quote Document Requirements

Version: 1.0  
Status: MVP definition  
Scope: 3D Print Cost Calculator first; reusable by future quote tools

## 1. Product Definition

The quote document answers:

> What is this job, who is it for, what is included, and how much should the customer pay?

The first release creates a customer-facing quote, not an invoice.

Out of scope for MVP:

- Payment collection.
- Invoice numbering or payment status.
- E-signatures.
- Customer accounts.
- Cloud quote history.
- Automatic email delivery.

The quote must be usable without an account and without saving customer data to the server.

## 2. Quote Data Model

```ts
type QuoteDetails = {
  companyName: string;
  companyDetails?: string;
  customerName?: string;
  customerDetails?: string;
  quoteNumber?: string;
  quoteDate: string;
  validDays?: number;
  notes?: string;
  terms?: string;
};

type QuoteDocument = {
  documentType: "quote";
  locale: Locale;
  currency: Currency;
  details: QuoteDetails;
  items: QuoteLineItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
};
```

Calculation inputs remain separate from document details. A quote renderer consumes the calculated result; it must not recalculate costs or pricing.

## 3. Required And Optional Fields

### Core fields

| Field | Required | Default | Customer document rule |
|---|---|---|---|
| Company name | No | Empty or local starter example | Show only when filled |
| Quote date | Yes | Current date | Always show |
| Project / job name | Yes | Derived from item name | Always show |
| Line items | Yes | One starter item | Render one row per item |
| Currency | Yes | Global preference | Format every monetary value |
| Subtotal | Yes | Calculated | Show when tax or discount exists |
| Total | Yes | Calculated | Always show |

### Additional details

Additional quote details are controlled by one switch. The switch is off by default.

When off, hide these inputs and omit their document fields:

- Company details.
- Customer name.
- Customer details.
- Quote number.
- Valid for.
- Notes.
- Terms.

When on, display the fields as optional. Empty values must not leave blank labels, empty rows, or empty sections in the PDF.

Starter placeholders:

- Company details: `info@lopuo.com`.
- Customer name: `Optional`.
- Customer details: `Email or address`.
- Quote number: `QT-2026-001`.
- Valid for: `30 days`.

Placeholders are not exported as values.

## 4. Customer-Facing Layout

The default document is deliberately plain and compact so it works as an email attachment or browser-saved PDF.

```text
Company name                                      QUOTE
Company details                                   Quote date

Project / job name                                Quote number (if filled)
Customer name and details (if filled)             Valid for (if filled)

Description                         Qty   Unit price   Amount
------------------------------------------------------------
Item 1                              1     $0.00        $0.00
Item 2                              2     $0.00        $0.00
Shipping / other (if applicable)                         $0.00

                                               Subtotal $0.00
                                               Tax      $0.00
                                               Total    $0.00

Notes / terms (if filled)
```

Rules:

- Use `QUOTE` / localized equivalent, never `INVOICE`.
- Do not show `zaps.work`, a platform URL, watermark, promotional copy, or platform logo in the exported document.
- Company name is the document identity. If it is empty, keep the document unbranded.
- Keep the preview and exported PDF structurally identical.
- Use a single page for normal quotes; allow natural pagination for more than ten line items or long notes.
- Keep the document light by default, with black text, thin rules, and no decorative gradients.

## 5. Line Items

Each calculator item becomes one quote line.

Required line item output:

- Item name.
- Optional material or short secondary description.
- Quantity.
- Unit price.
- Line amount.

Rules:

- Support up to 10 items in MVP.
- Quantity is an integer greater than zero.
- Unit price is calculated as line amount divided by quantity.
- Shipping and quote-level costs appear as separate lines when greater than zero.
- Minimum job fee, shipping, discount, and tax are applied once per quote unless explicitly marked per-item by a future scenario.
- The quote renderer must preserve item order.

## 6. Totals And Money

```text
subtotal = sum(line item amounts) + quote-level costs - discount
tax = subtotal * tax rate
total = subtotal + tax
```

Calculation rules:

- Keep internal precision at four decimal places or greater.
- Round only display values and final exported amounts.
- Use the global currency preference for symbols, decimal separators, and currency placement.
- Changing currency changes formatting and labels only; it does not convert existing input values.
- Never expose raw floating-point artifacts such as `12.799999`.

## 7. Export Requirements

### PDF

The MVP action is `Export PDF`. It opens the browser's Save as PDF flow using print-specific CSS.

Acceptance criteria:

- Export is available without login.
- Exported PDF contains the same values as the preview.
- Exported PDF contains no zaps.work branding or URL.
- Empty optional fields are omitted entirely.
- Locale, direction, date, number format, currency, and labels follow the document locale.
- PDF remains readable in light mode regardless of the app theme.
- The action label must not say `Print`.

### CSV

CSV is an analysis/export format, not the customer-facing document.

Include:

- Quote metadata that the user entered.
- One row per line item.
- Quantity, unit price, amount, currency.
- Subtotal, tax, and total summary rows.

CSV rules:

- Encode as UTF-8 with BOM for spreadsheet compatibility.
- Escape commas, quotes, and new lines.
- Neutralize formula-like values beginning with `=`, `+`, `-`, or `@`.
- Never include service-role keys or private analytics fields.

## 8. Interaction States

### Draft

- Inputs use realistic starter examples.
- Quote preview updates as inputs change.
- Export actions remain available when the calculation is valid.

### Incomplete

- Required calculation fields show an inline error.
- Result shows the last valid value or an explicit unavailable state.
- PDF and CSV export are disabled until required values are valid.

### Optional details off

- Only company name input is visible in the PDF details section.
- The document contains no empty customer or quote metadata rows.

### Optional details on

- Additional fields become editable.
- Only filled values are rendered.
- Turning the switch off hides the fields and removes them from preview/export, but does not delete their draft values.

### Export success

- Show a short localized toast such as `PDF ready` or `CSV exported`.
- Keep all inputs and the preview unchanged.

## 9. Localization And Accessibility

- UI locale and document locale are separate concepts for future versions.
- English uses the root route; Traditional Chinese uses `/zh-hant`.
- All labels, dates, numbers, currencies, validation, and export text are localized.
- Use logical CSS properties so the same document can support RTL languages later.
- Arabic and other RTL locales must use `dir="rtl"`; do not mirror monetary values or quote numbers incorrectly.
- Form fields need visible labels, keyboard focus, and screen-reader names.
- Icon-only theme controls need an accessible label and tooltip/title where appropriate.

## 10. Privacy And Storage

MVP quote details stay in browser memory. No quote-entered field is sent to or stored in Supabase analytics.

Never store in analytics:

- Company name.
- Customer name.
- Email, address, phone, or notes.
- Quote number.
- Item names.
- Full quote or calculator snapshots.

Analytics may store only aggregate events such as calculator used, PDF exported, CSV exported, item count, currency, total cost, quote total, and margin. It never stores any customer-related information or quote-entered content.

## 11. Acceptance Checklist For 3D Print MVP

- [ ] One starter item renders in the quote preview.
- [ ] Add, edit, duplicate, select, and delete item behavior is stable.
- [ ] Multiple items render as separate quote lines.
- [ ] Company name is the only visible PDF detail field by default.
- [ ] Additional details switch is off by default.
- [ ] Empty optional fields are omitted from preview, PDF, and CSV.
- [ ] Quote uses `QUOTE`, never `INVOICE`.
- [ ] No zaps.work URL, logo, or watermark appears in PDF.
- [ ] PDF and CSV actions use the selected locale and currency.
- [ ] Currency switching does not silently convert inputs.
- [ ] Light and dark app themes do not change the PDF's readable light document surface.
- [ ] English, Traditional Chinese, mobile, and print/save-as-PDF paths are checked.

## 12. Reuse For Future Scenarios

Each future tool supplies its own calculation schema and labels, then maps into the same quote contract:

```text
scenario inputs
  -> scenario calculation result
  -> normalized quote line items
  -> shared quote details
  -> shared preview / PDF / CSV renderer
```

The shared renderer must not contain 3D-print-specific assumptions. Scenario-specific data belongs in the line item description, metadata, or scenario calculation layer.
