# zaps.work Quote Page Scenarios

Version: 2026-07-10

Detailed research, formulas, MVP fields, and acceptance criteria are maintained in `zaps-work_two_scenario_requirements.md`. This document remains the page-level interaction summary.

This document starts with two representative scenarios:

1. `3D Print Cost Calculator` for fabrication cost calculation.
2. `Cleaning Quote Generator` for local service quote generation.

These two cover different product patterns:

- Cost-heavy quote: material, machine time, labor, markup.
- Service-heavy quote: site details, labor estimate, add-ons, recurring price.

## 1. Shared Quote Page Framework

Every quote page should reuse the same page model:

```text
Scenario
  -> Inputs
  -> Cost model
  -> Pricing rules
  -> Result
  -> Quote document
```

### Shared Page Blocks

First viewport:

- Header.
- Tool title.
- One-sentence promise.
- Input panel.
- Sticky result panel on desktop.
- Primary action: export/copy quote when valid.

Below workspace:

- Cost breakdown.
- Quote preview.
- Formula explanation.
- Example calculation.
- FAQ.
- Related tools.

### Shared Interactions

- Results update instantly when inputs change.
- Inputs ship with realistic default examples.
- Advanced settings are collapsed by default.
- Warnings appear for low margin, unrealistic values, or below-minimum quotes.
- Quote preview updates with result changes.
- PDF export is disabled until required quote data exists.
- User can copy a plain-text summary without login.

### Shared Result Panel

Recommended result hierarchy:

```text
Suggested quote
Total cost
Profit
Margin
Primary action: Export PDF
Secondary action: Copy summary
```

PDF identity:

- Editable company name.
- No zaps.work wordmark, URL, watermark, or promotional footer.
- Empty company name produces an unbranded quote rather than platform branding.

For service tools, use:

```text
Suggested quote
Estimated hours
Labor cost
Add-ons / travel / supplies
Recurring price when relevant
```

## 2. Scenario A: 3D Print Cost Calculator

### Page Basics

Route:

```text
/en/tools/3d-print-cost-calculator
```

Primary user question:

```text
How much should I charge for this 3D print job?
```

Target user:

- Etsy / Shopify sellers.
- Makers taking custom print jobs.
- Print farm operators.
- Hobbyists trying to price fairly.

Page promise:

```text
Calculate filament, machine time, labor, and margin before sending a quote.
```

### First Viewport

Layout:

```text
Left panel: Print items + shared assumptions
Right panel: Suggested quote
Lower row: Breakdown + Quote preview
```

### Multiple Print Items

The calculator supports one or more print items in the same quote.

MVP behavior:

- Start with one editable item.
- Add, select, duplicate, and delete items.
- Show compact item summaries with name, material, quantity, and quoted amount.
- Keep one item editor visible at a time.
- Do not allow deletion of the only remaining item.
- Support up to 10 items in the first public version.
- Quote preview renders one customer-facing line per item.
- Cost breakdown aggregates all items.

Per-item values:

- Item name.
- Material, spool price, and spool weight.
- Filament used and print time.
- Quantity.
- Design, preparation, and post-processing time.
- Hardware and packaging.

Shared quote values:

- Machine and labor rates.
- Electricity, waste, and failure assumptions.
- Shipping and other quote-level costs.
- Pricing mode, target margin, minimum job fee, and tax.

The minimum job fee, shipping, tax, and quote-level adjustments are applied once per quote, not once per item.

Default example:

```text
Material: PLA
Filament used: 120g
Print time: 6h 30m
Filament price: $24/kg
Printer power: 120W
Electricity: $0.16/kWh
Labor: 15 min
Labor rate: $15/h
Markup: 40%
```

### Input Groups

01. Print items:

- Item selector with add, duplicate, delete, and current quoted amount.
- Item name.
- Material.
- Quantity.
- Filament used.
- Print time.
- Collapsed item costs and labor: spool price, spool weight, design, preparation, post-processing, hardware, and packaging.

02. Rates and risk:

- Machine rate.
- Labor rate.
- Collapsed production assumptions: machine-rate helper, electricity, printer power, waste, and failure rate.

03. Pricing:

- Target margin / markup mode.
- Minimum job fee.
- Shipping.
- Other quote-level costs.
- Tax.

04. PDF details:

- Editable company name.
- Later: customer details, quote number, notes, and terms.

Hierarchy rule:

> Separate what is being produced, how cost is calculated, how the quote is priced, and what appears on the customer document.

### Output Calculations

Cost breakdown:

- Material cost.
- Electricity cost.
- Machine depreciation.
- Labor cost.
- Failure allowance.
- Packaging/other.
- Total cost.

Pricing output:

- Suggested quote.
- Item count and per-item quoted amounts.
- Profit.
- Margin.
- Below-cost warning.
- Low-margin warning.

Quote output:

- Customer name.
- Project name.
- One line item per print item.
- Quantity and quoted line amount.
- Total.
- Notes.
- Terms.
- PDF export.
- Copy summary.

### Key Interactions

- Material preset changes cost hint and default density assumptions.
- Filament input supports grams first; length can come later.
- Print time supports hours + minutes.
- Markup and target margin can be switched.
- Changing quantity recalculates total and optional unit price.
- Clicking a breakdown row focuses the related input.
- Advanced settings can be expanded without hiding the result panel.

### Validation And Warnings

Errors:

- Filament used must be greater than `0`.
- Print time must be greater than `0`.
- Filament price must be greater than `0`.

Warnings:

- Margin below `20%`.
- Quote below total cost.
- Very long print time.
- Failure rate above a normal range.
- Labor time set to `0`.

### MVP Scope

Must have:

- Material, filament, print time, labor, markup.
- Live suggested quote.
- Cost breakdown.
- Quote preview.
- Copy summary.

Can wait:

- STL upload.
- Automatic slicer parsing.
- User accounts.
- Saved machines.
- Multi-line quote builder.

### SEO Content

Primary keyword:

```text
3D print cost calculator
```

Supporting queries:

- How much should I charge for 3D prints?
- 3D printing pricing calculator.
- Filament cost calculator.
- 3D print quote calculator.

Page FAQ:

- How do I calculate 3D printing cost?
- Should I charge by gram or by print time?
- What margin should I use for 3D printing?
- Should failed prints be included in pricing?

## 3. Scenario B: Cleaning Quote Generator

### Page Basics

Route:

```text
/en/tools/cleaning-quote-generator
```

Primary user question:

```text
What should I charge for this cleaning job?
```

Target user:

- Independent cleaners.
- Small cleaning businesses.
- Residential cleaning teams.
- Office cleaning providers.

Page promise:

```text
Estimate cleaning time, add supplies and travel, then create a customer-ready quote.
```

### First Viewport

Layout:

```text
Left panel: Job details
Right panel: Suggested quote
Lower row: Labor estimate + Quote preview
```

Default example:

```text
Property type: House
Square footage: 1,800 sqft
Bedrooms: 3
Bathrooms: 2
Cleaning type: Standard cleaning
Frequency: One-time
Labor rate: $35/h
Estimated cleaners: 2
Supplies: $12
Travel: $15
Minimum service fee: $120
```

### Input Groups

Property details:

- Property type.
- Square footage.
- Bedrooms.
- Bathrooms.
- Cleaning type.
- Frequency.

Labor estimate:

- Number of cleaners.
- Estimated hours.
- Labor rate.
- Difficulty level.

Costs:

- Supplies.
- Travel.
- Parking/tolls.
- Equipment.

Pricing rules:

- Minimum service fee.
- Markup or target margin.
- Recurring discount.

Add-ons:

- Deep clean.
- Move-in / move-out.
- Oven.
- Fridge.
- Windows.
- Pets.
- Laundry.
- Inside cabinets.

Advanced:

- First-time cleaning surcharge.
- Rush fee.
- Cancellation terms.
- Deposit.
- Tax.

### Output Calculations

Estimate output:

- Estimated total hours.
- Labor cost.
- Supplies.
- Travel.
- Add-ons.
- Minimum-fee adjustment.
- Total cost.

Pricing output:

- Suggested one-time quote.
- Recurring weekly price.
- Recurring biweekly price.
- Profit.
- Margin.

Quote output:

- Customer name.
- Service address.
- Cleaning scope.
- Line items.
- Optional add-ons.
- Frequency.
- Terms.
- PDF estimate.
- Copy summary.

### Key Interactions

- Property type and square footage suggest estimated hours.
- Cleaning type changes base multiplier.
- Frequency applies recurring discount.
- Add-ons add line items and estimated time.
- Minimum service fee overrides too-low jobs.
- User can manually override estimated hours.
- Quote preview groups add-ons under service details.

### Validation And Warnings

Errors:

- Square footage must be greater than `0`.
- Labor rate must be greater than `0`.
- Number of cleaners must be at least `1`.

Warnings:

- Quote below minimum service fee.
- Estimated hours unusually low for square footage.
- No travel cost added.
- First-time cleaning without surcharge.
- Recurring discount too high.

### MVP Scope

Must have:

- Property type.
- Square footage.
- Rooms/bathrooms.
- Cleaning type.
- Frequency.
- Labor rate.
- Supplies/travel.
- Minimum service fee.
- Suggested quote.
- Copy summary.

Can wait:

- Route optimization.
- Calendar booking.
- Customer CRM.
- Multi-property account.
- Team scheduling.

### SEO Content

Primary keyword:

```text
cleaning quote generator
```

Supporting queries:

- House cleaning estimate calculator.
- Cleaning service quote template.
- How much to charge for house cleaning.
- Commercial cleaning quote calculator.

Page FAQ:

- How do I estimate cleaning time?
- Should I charge hourly or flat rate?
- How much should I charge for deep cleaning?
- How do recurring cleaning discounts work?

## 4. Shared MVP Priority

Build order:

1. 3D Print Cost Calculator.
2. Cleaning Quote Generator.

Why:

- 3D Print validates cost-model calculators.
- Cleaning validates service quote generators.
- Together they prove the platform is not limited to one niche.

Shared MVP features:

- Live calculation.
- Example defaults.
- Editable assumptions.
- Cost/price breakdown.
- Quote preview.
- Copy summary.
- Disabled PDF button can be shown if PDF export is not ready.

Shared later features:

- Saved templates.
- Saved client profiles.
- Multi-line quote builder.
- Login and quote history.
- Stripe payment link.
- Email quote to customer.
