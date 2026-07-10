# zaps.work First Two Scenario Requirements

Version: 1.0  
Research date: 2026-07-10  
Status: ready for UX and technical breakdown

## 1. Scope

This document turns the first two zaps.work scenarios into buildable product requirements:

1. `3D Print Cost Calculator`
2. `Cleaning Quote Generator`

They validate two different product engines:

```text
Fabrication job
Inputs -> production cost -> pricing rule -> quote

Service job
Property scope -> labor estimate -> service cost -> pricing rule -> quote
```

The tools share the page shell, result contract, quote preview, export system, analytics events, and design system. They do not share one generic generated form.

## 2. Research Summary

### 2.1 3D Printing References

[Prusa's calculator](https://blog.prusa3d.com/3d-printing-price-calculator_38905/) establishes the strongest free-tool baseline:

- Manual print time and filament weight.
- Optional G-code upload to prefill both values.
- Editable defaults instead of an empty calculator.
- Filament, electricity, preparation labor, post-processing labor, machine cost, repairs, other costs, tax, sharing, and printable summary.

[Prusa's cost guide](https://blog.prusa3d.com/how-to-calculate-printing-costs_38650/) reinforces several calculation principles:

- Material, preparation labor, failed-print allowance, and machine operating cost should be visible separately.
- Electricity is usually small but still calculable.
- Printer cost can be allocated over expected commercial operating hours.
- Long jobs increase machine exposure even when hands-on labor stays low.

[Formlabs' FDM/SLA comparison](https://formlabs.com/blog/fdm-vs-sla-compare-types-of-3d-printers/) shows why material technology matters:

- Equipment ownership, material, and labor all affect cost per part.
- FDM and resin workflows have different material and post-processing profiles.
- Post-processing labor can materially change the economics.

Product implication:

> zaps.work should be easier to start than a detailed shop spreadsheet, but more transparent than a material-only calculator.

### 2.2 Cleaning References

[Jobber's house cleaning calculator](https://www.getjobber.com/free-tools/house-cleaning-cost-calculator/) uses two familiar estimating paths:

- Number of rooms.
- Square footage.

It also includes visit type and add-ons such as floors, appliances, windows, and laundry, then returns a price range.

[ZenMaid's pricing calculator](https://get.zenmaid.com/es/tools/cleaning-pricing-calculator) uses a production-rate model:

```text
Base price = square footage / production rate * hourly rate
```

It treats cleaning type and frequency as adjustments and emphasizes that the hourly rate must cover labor, overhead, and target profit.

[Jobber's service price calculator](https://www.getjobber.com/free-tools/pricing-calculator/) separates:

- Number of workers and hours.
- Average hourly labor cost.
- Materials.
- Allocated overhead.
- Profit, markup, and margin.

[Jobber's cleaning estimate template](https://www.getjobber.com/free-tools/estimate-template/cleaning/) shows the expected customer-facing output:

- Business and customer details.
- Estimate number and date.
- Service line items and scope.
- Subtotal, tax, discounts, and fees.
- Validity, terms, exclusions, and optional signature.

Product implication:

> zaps.work should estimate cleaner-hours first, then turn those hours into a profitable flat quote. It should not present a market-average range as if it were the user's true price.

## 3. Shared Product Decisions

### 3.1 Positioning

Both tools answer two questions in order:

1. What will this job cost me?
2. What should I quote to protect my target margin?

The suggested quote is a transparent calculation, not a promise about the local market price.

### 3.2 Pricing Modes

Support two pricing modes in the shared result engine:

```text
Markup mode:
price = total cost * (1 + markup rate)

Target margin mode:
price = total cost / (1 - target margin rate)
```

Rules:

- Default to target margin mode for new users.
- Never use the words markup and margin interchangeably.
- Show both effective markup and margin in the result.
- Reject target margin values at or above `100%`.

### 3.3 Money And Precision

- Calculate with decimal-safe arithmetic, not binary floating point.
- Keep internal values at four decimal places or greater.
- Round display amounts to the selected currency precision.
- Round only the final line-item amounts, not intermediate formulas.
- Store numeric snapshots as decimal strings.

### 3.4 Defaults

- Every calculator opens with a complete example.
- Defaults are marked as starter assumptions, not industry recommendations.
- Users can restore defaults.
- Currency, locale, and unit system are separate settings.

### 3.5 Quote Output

Shared quote fields:

- Business name.
- Customer name, optional in MVP.
- Job or project name.
- Quote date.
- Validity period.
- Line items.
- Subtotal.
- Discount.
- Tax.
- Total.
- Notes and terms.

Stored analytics snapshots exclude customer name, address, email, phone, and private notes.

## 4. Scenario A: 3D Print Cost Calculator

### 4.1 Job To Be Done

```text
When someone asks me to print one or more parts,
I want to include material, machine exposure, hands-on work, and failure risk,
so I can quote confidently without rebuilding a spreadsheet.
```

### 4.2 Target User

- Maker accepting occasional custom jobs.
- Etsy or Shopify seller.
- Small print farm.
- Prototype shop using FDM printers.

The first release is optimized for FDM filament printing. Resin-specific consumables and washing/curing are a later preset.

### 4.3 MVP Input Model

#### Job

| Field | Type | Default | Required | Notes |
|---|---|---:|---|---|
| Job name | Text | Custom print | No | Used in quote only |
| Quantity | Integer | 1 | Yes | Number of finished units in this batch |
| Print time hours | Number | 6 | Yes | Total batch print time |
| Print time minutes | Integer | 30 | Yes | `0-59` |
| Filament used | Decimal | 120 g | Yes | Total batch filament |

MVP rule:

> Print time and filament are totals for the batch. Quantity is used to calculate the per-unit result. This avoids silently multiplying slicer totals twice.

#### Material

| Field | Type | Default | Required | Notes |
|---|---|---:|---|---|
| Material preset | Select | PLA | Yes | PLA, PETG, ABS, TPU, Other |
| Spool price | Money | 24.00 | Yes | Editable preset value |
| Spool weight | Decimal | 1000 g | Yes | Commonly 1 kg |
| Material waste | Percent | 5% | No | Purge, supports, leftovers |

#### Labor

| Field | Type | Default | Required | Notes |
|---|---|---:|---|---|
| Preparation time | Duration | 10 min | No | Slicing, setup, loading |
| Post-processing time | Duration | 15 min | No | Support removal, cleanup |
| Labor rate | Money/hour | 20.00 | Yes | User's own loaded rate |

#### Machine And Risk

| Field | Type | Default | Required | Notes |
|---|---|---:|---|---|
| Machine rate | Money/hour | 0.50 | Yes | Simple MVP input |
| Power draw | Watts | 120 W | No | Collapsed by default |
| Electricity rate | Money/kWh | 0.16 | No | Collapsed by default |
| Failure rate | Percent | 5% | No | Expected failed attempts |

#### Pricing

| Field | Type | Default | Required | Notes |
|---|---|---:|---|---|
| Pricing mode | Segmented | Target margin | Yes | Margin or markup |
| Target margin | Percent | 35% | Conditional | Editable starter value |
| Markup | Percent | 40% | Conditional | Used only in markup mode |
| Minimum job fee | Money | 10.00 | No | Applied before tax |
| Other fixed cost | Money | 0.00 | No | Packaging or delivery |
| Tax | Percent | 0% | No | Applied after subtotal |

### 4.4 Advanced Machine Rate Helper

The first version can accept a direct machine hourly rate. An optional helper calculates it from:

```text
recoverable machine cost = printer purchase price * (1 + lifetime repair rate)
available commercial hours = recovery years * operating days/year * commercial hours/day
machine rate/hour = recoverable machine cost / available commercial hours
```

The calculated hourly rate is copied into the editable machine-rate field.

### 4.5 Calculation Model

```text
print hours = hours + minutes / 60

raw material cost = filament used / spool weight * spool price
material cost = raw material cost * (1 + material waste rate)

labor hours = (preparation minutes + post-processing minutes) / 60
labor cost = labor hours * labor rate

machine cost = print hours * machine rate
electricity cost = power watts / 1000 * print hours * electricity rate

attempt cost = material cost + machine cost + electricity cost
expected production cost = attempt cost / (1 - failure rate)
failure allowance = expected production cost - attempt cost

total cost = expected production cost + labor cost + other fixed cost
base quote = pricing formula(total cost)
quote subtotal = max(base quote, minimum job fee)
tax amount = quote subtotal * tax rate
quote total = quote subtotal + tax amount

profit = quote subtotal - total cost
margin = profit / quote subtotal
unit price = quote total / quantity
```

Failure-rate rule:

- Valid range: `0-50%` in MVP.
- Show a warning over `20%`.
- Labor is not automatically repeated after a failed print because setup practices vary; explain this assumption.

### 4.6 Result Contract

Primary:

- Suggested quote total.
- Unit price.
- Total cost.
- Profit.
- Margin.

Breakdown:

- Material.
- Machine.
- Electricity.
- Labor.
- Failure allowance.
- Other fixed cost.
- Minimum-fee adjustment, when applied.
- Tax, shown outside profit calculation.

### 4.7 Interaction Requirements

- Calculate immediately after valid input changes.
- Show a useful example on first load.
- Keep power, electricity, failure risk, tax, and machine helper collapsed under Advanced.
- Switching material changes only suggested assumptions; never overwrite a value the user has manually edited without confirmation.
- Switching pricing mode preserves the current quote approximately by converting markup to margin or margin to markup.
- Clicking a breakdown line focuses or reveals the related input group.
- Copy summary works without customer details.
- PDF export requires a valid job name and at least one valid line item, not a customer email.

### 4.8 Validation And Warnings

Errors:

- Quantity below `1`.
- Print time equal to `0`.
- Filament used, spool price, or spool weight not above `0`.
- Negative cost, duration, tax, markup, or margin fields.
- Target margin at or above `100%`.

Warnings:

- Margin below `20%`.
- Minimum fee is controlling the quote.
- Labor time is `0`.
- Machine rate is `0` for a long print.
- Failure rate above `20%`.
- Unit price rounds to zero in the selected currency.

### 4.9 Acceptance Criteria

- Default example produces a non-zero material, labor, machine, cost, price, profit, and margin.
- Changing filament weight changes material, failure allowance, total cost, price, and unit price.
- Changing quantity alone changes unit price but does not multiply batch cost.
- Margin mode and markup mode follow their documented formulas.
- A 10% failure rate calculates expected attempt cost using division by `0.9`.
- Tax changes the customer total but not pre-tax profit.
- The quote can be copied without login.
- Stored analytics contain no quote contact fields.

Golden default fixture, before tax:

```text
material cost       3.0240
electricity cost    0.1248
machine cost        3.2500
failure allowance   0.3368
labor cost          8.3333
total cost         15.0689
quote subtotal     23.1830
display quote      23.18
display margin     35.0%
```

Tests may use a tolerance of `0.0001` for serialized decimal comparisons.

### 4.10 Not In MVP

- STL analysis.
- G-code upload and parsing.
- Resin workflow.
- Multi-printer comparison.
- Saved machine profiles.
- Shipping-rate lookup.
- Marketplace price recommendations.

## 5. Scenario B: Cleaning Quote Generator

### 5.1 Job To Be Done

```text
When a customer describes a property and cleaning scope,
I want a realistic cleaner-hour estimate and profitable flat quote,
so I can respond quickly without guessing or exposing an hourly bill.
```

### 5.2 Target User

- Independent residential cleaner.
- Small cleaning team.
- New cleaning business building a repeatable rate sheet.
- Owner quoting one-time and recurring residential work.

Commercial janitorial bidding is not part of the first release.

### 5.3 Estimation Modes

Support two modes:

1. `Estimate by area` as the default.
2. `Enter cleaner-hours manually` for experienced users.

Definitions:

- `Cleaner-hours` means total labor across the team.
- `On-site duration` means cleaner-hours divided by crew size.
- A two-person crew working two hours equals four cleaner-hours.

This distinction must be visible wherever hours are shown.

### 5.4 MVP Input Model

#### Property And Scope

| Field | Type | Default | Required | Notes |
|---|---|---:|---|---|
| Property type | Select | House | Yes | House, apartment, condo |
| Area | Decimal | 1800 sqft | Yes | Metric display supported |
| Bedrooms | Integer | 3 | No | Quote scope; no hidden price effect in area mode |
| Bathrooms | Decimal | 2 | No | Quote scope; no hidden price effect in area mode |
| Cleaning type | Select | Standard | Yes | Standard, deep, move-in/out |
| Frequency | Select | One-time | Yes | One-time, weekly, biweekly, every 4 weeks |
| Difficulty | Select | Typical | Yes | Light, typical, heavy |

#### Labor Model

| Field | Type | Default | Required | Notes |
|---|---|---:|---|---|
| Estimation mode | Segmented | By area | Yes | Area or manual hours |
| Production rate | Area/cleaner-hour | 500 sqft | Conditional | Editable assumption |
| Manual cleaner-hours | Duration | 4 h | Conditional | Used in manual mode |
| Crew size | Integer | 2 | Yes | Affects on-site duration, not total labor |
| Loaded labor cost | Money/cleaner-hour | 24.00 | Yes | Wage plus burden |
| Overhead rate | Money/cleaner-hour | 10.00 | Yes | Insurance, admin, software, vehicle |

Starter production rates are examples only. The UI should encourage users to replace them with their own completed-job data.

#### Cleaning Adjustments

| Field | Type | Default | Required | Notes |
|---|---|---:|---|---|
| Cleaning type multiplier | Decimal | 1.0 | Yes | Editable preset |
| Difficulty multiplier | Decimal | 1.0 | Yes | Editable preset |
| Supplies | Money | 12.00 | No | Job cost |
| Travel and parking | Money | 15.00 | No | Job cost |

Suggested editable type presets:

```text
Standard: 1.0
Deep clean: 1.6
Move-in/out: 1.8
```

These are starting assumptions, not local price claims.

#### Add-ons

MVP add-ons:

- Inside oven.
- Inside fridge.
- Interior windows.
- Inside cabinets.
- Laundry.
- Pet-hair or heavy-soil adjustment.

Each add-on contains:

```text
label
quantity
added cleaner-minutes
optional fixed customer price
```

If fixed customer price is empty, the add-on is priced through added labor cost and the selected margin rule.

#### Pricing

| Field | Type | Default | Required | Notes |
|---|---|---:|---|---|
| Target margin | Percent | 30% | Yes | Default pricing mode |
| Minimum service fee | Money | 120.00 | Yes | Pre-tax minimum |
| Frequency discount | Percent | 0% | No | Editable by frequency |
| First-clean surcharge | Percent | 0% | No | Optional |
| Tax | Percent | 0% | No | Jurisdiction dependent |

### 5.5 Calculation Model

Area mode:

```text
adjusted base hours = area / production rate * cleaning type multiplier * difficulty multiplier
```

Manual mode:

```text
adjusted base hours = manual cleaner-hours
```

Shared:

```text
add-on hours = sum(add-on cleaner-minutes) / 60
total cleaner-hours = adjusted base hours + add-on hours
on-site duration = total cleaner-hours / crew size

base labor cost = adjusted base hours * loaded labor cost/hour
base overhead cost = adjusted base hours * overhead rate/hour
add-on cost = add-on hours * (loaded labor cost/hour + overhead rate/hour)
job cost = base labor cost + base overhead cost + add-on cost + supplies + travel

auto-priced cost = base labor cost + base overhead cost + supplies + travel
                 + cost of add-ons without a fixed customer price
cost-based quote = auto-priced cost / (1 - target margin)
fixed add-on revenue = sum(add-on fixed customer price * quantity)
pre-adjustment quote = cost-based quote + fixed add-on revenue
first-clean quote = pre-adjustment quote * (1 + first-clean surcharge)
discounted quote = first-clean quote * (1 - frequency discount)
quote subtotal = max(discounted quote, minimum service fee)
tax amount = quote subtotal * tax rate
quote total = quote subtotal + tax amount

profit = quote subtotal - job cost
margin = profit / quote subtotal
```

Fixed add-on rule:

- Added cleaner-minutes still contribute to job cost.
- A fixed add-on price replaces margin-based pricing for that add-on; it is not added twice.
- The result warns when a fixed add-on reduces total margin below the user's target.

### 5.6 Result Contract

Primary:

- Suggested flat quote.
- Total cleaner-hours.
- Estimated on-site duration.
- Crew size.
- Job cost.
- Profit and margin.

Breakdown:

- Labor.
- Overhead.
- Supplies.
- Travel and parking.
- Add-on cost and revenue.
- First-clean surcharge.
- Frequency discount.
- Minimum-fee adjustment.
- Tax.

Quote line items:

- Base cleaning service.
- Selected add-ons.
- Discount or surcharge when shown to the customer.
- Tax and total.

### 5.7 Interaction Requirements

- Changing area, production rate, cleaning type, or difficulty updates cleaner-hours immediately.
- Changing crew size updates on-site duration but does not change total labor cost.
- Manual-hour mode preserves the most recent manual value when switching modes.
- Add-ons reveal quantity and time/price assumptions only after selection.
- Frequency applies its editable discount and immediately rechecks margin.
- The result explains whether the minimum fee is controlling the quote.
- The quote preview has compact Included and Not included fields.
- Customer address remains optional for copy/PDF in MVP.

### 5.8 Validation And Warnings

Errors:

- Area, production rate, crew size, or loaded labor cost not above `0` when required.
- Manual cleaner-hours not above `0` in manual mode.
- Negative cost, time, multiplier, discount, surcharge, or tax.
- Frequency discount at or above `100%`.

Warnings:

- Margin below target after discount.
- Production rate outside an editable plausible range.
- On-site duration below 30 minutes or above 12 hours.
- Crew size changes duration but the user may expect it to change cleaner-hours.
- Supplies or travel set to `0`.
- Deep or move-out clean using a `1.0` multiplier.
- Minimum service fee is controlling the quote.

### 5.9 Acceptance Criteria

- Default example produces cleaner-hours, on-site duration, job cost, price, profit, and margin.
- Doubling crew size halves on-site duration but leaves cleaner-hours and labor cost unchanged.
- Increasing area increases cleaner-hours and quote in area mode.
- Changing manual cleaner-hours changes the result in manual mode without changing area.
- Adding an oven add-on increases cleaner-hours, cost, and quote.
- Frequency discount reduces revenue and recalculates actual margin.
- Minimum service fee wins when the calculated quote is lower.
- Quote preview includes cleaning type, frequency, base service, selected add-ons, and total.
- Stored analytics exclude customer and property address fields.

Golden default fixture with no add-ons, surcharge, discount, or tax:

```text
cleaner-hours        3.6000
on-site duration     1.8000
labor cost          86.4000
overhead cost       36.0000
supplies            12.0000
travel              15.0000
job cost           149.4000
quote subtotal     213.4286
display quote      213.43
display margin      30.0%
```

Tests may use a tolerance of `0.0001` for serialized decimal comparisons.

### 5.10 Not In MVP

- Local competitor price lookup.
- Automatic market-average recommendation.
- Commercial office bidding.
- Route optimization.
- Calendar scheduling.
- Team availability.
- CRM and customer history.
- Quote approval and deposits.

## 6. Shared Analytics Requirements

Record low-volume meaningful events:

```text
tool_viewed
calculation_started
advanced_opened
pricing_mode_changed
warning_shown
quote_copied
quote_exported
```

One calculation-session summary may include:

- Tool slug and formula version.
- Locale, currency, and unit system.
- Sanitized numeric input buckets.
- Cost, quote, profit, and margin bands.
- Selected pricing mode.
- Warning types.
- Export method.

Do not send an event on every keystroke or every result repaint.

## 7. Shared Delivery Priority

### P0 Foundation

- Shared money and percentage types.
- Decimal-safe formulas.
- Shared result contract.
- Quote preview shell.
- Copy summary.
- Formula unit tests.

### P0 Tool One

- 3D Print Cost Calculator with direct machine hourly rate.
- Advanced failure, electricity, minimum fee, and tax settings.
- Quote preview and copy summary.

### P0 Tool Two

- Cleaning Quote Generator with area and manual-hour modes.
- Cleaner-hour versus on-site-duration distinction.
- Add-ons, minimum fee, frequency discount, and quote preview.

### P1

- Server PDF export.
- Sanitized export snapshots.
- Machine-rate helper.
- Preset editing and local persistence.
- Chinese UI.

### P2

- G-code upload.
- Saved machine and cleaning-rate profiles.
- Quote history and customer accounts.

## 8. Decisions Ready For Implementation

- Build 3D printing first, then cleaning.
- Optimize 3D printing MVP for FDM.
- Use batch totals for print time and filament.
- Use direct machine rate first; keep the machine-cost helper optional.
- Default pricing to target margin, while supporting markup.
- Use area-based cleaner-hours as the cleaning default.
- Keep cleaner-hours separate from crew duration.
- Use user-owned rate assumptions instead of claiming local market accuracy.
- Keep customer PII out of analytics storage.
