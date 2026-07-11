# zaps.work Three Quote Scenario Demand Research

Version: 1.0
Research date: 2026-07-10
Status: product discovery recommendation

## 1. Decision Summary

This research selects three quote scenarios that represent three different pricing problems:

1. `Driveway / House Pressure Washing Estimate`
2. `Laser Cutting Job Quote`
3. `CNC Prototype & Small-Batch Quote`

They should not be treated as three skins on one generic form.

```text
Pressure washing
Measured service scope -> field adjustments -> minimum job -> estimate

Laser cutting
Sheet allocation -> cut features -> setup -> batch price -> quote

CNC machining
Engineering and setup -> operations -> inspection and risk -> quantity breaks -> quote
```

### Recommended order

| Priority | Scenario | Demand fit | Calculation confidence | Build complexity | Product decision |
| --- | --- | --- | --- | --- | --- |
| 1 | Driveway / House Pressure Washing | Broad service and cost-search cluster | High when the contractor supplies rates | Low to medium | Build first |
| 2 | Laser Cutting Job Quote | Smaller but high-intent fabrication audience | Medium to high with manual cut statistics | Medium | Build after pressure washing |
| 3 | CNC Prototype & Small-Batch Quote | Narrower audience, high job value | Medium only with expert-entered process estimates | High | Validate with domain partners before building |

The first product should be named `Pressure Washing Cost Calculator & Quote Generator`. Cost and estimate language captures the discovery need; quote generation is the workflow outcome.

## 2. Research Method And Limits

The research uses:

- Public pricing and quote guides.
- Current quoting products and their advertised workflows.
- Practitioner discussions about real quoting decisions.
- Existing zaps.work quote-document and calculation requirements.

This is directional product research, not a verified keyword-volume report. Exact U.S. monthly volume, keyword difficulty, and CPC should be confirmed with Google Keyword Planner or another paid keyword dataset before committing a large content program.

Vendor pages are useful for understanding expected features but are not independent proof of demand. Community discussions are useful for identifying recurring pain but should not be used as authoritative market-rate tables.

## 3. Scenario One: Driveway / House Pressure Washing Estimate

### 3.1 Narrow scenario definition

Target work:

- Residential concrete driveway cleaning.
- Residential house exterior washing.
- Optional patio, walkway, and small flat-work add-ons.

Initial exclusions:

- Roof cleaning and steep-access work.
- Commercial fleet, industrial, or municipal cleaning.
- Restoration guarantees for oil, rust, paint, oxidation, or biological staining.
- Automatic property measurement from maps or aerial images.

The first tool should provide two presets, `Driveway` and `House Exterior`, inside one pressure-washing engine.

### 3.2 Target user

- Solo pressure-washing operator.
- Owner of a small exterior-cleaning crew.
- New contractor replacing mental math or a basic spreadsheet.
- Established contractor who needs a fast phone or photo-based estimate.

### 3.3 Trigger and job to be done

```text
When a homeowner asks what a driveway or house wash will cost,
I want to combine measurable scope, job difficulty, travel, and my minimum charge,
so I can respond quickly without accepting an unprofitable job or promising a scope I did not price.
```

Typical trigger:

1. The customer sends an address, photos, and a rough size.
2. The contractor estimates area and condition.
3. The contractor applies a local rate or cost-based price.
4. The contractor sends a written estimate with assumptions and exclusions.

### 3.4 Demand evidence

Recurring practitioner questions focus on:

- Whether to charge by square foot or use a base fee.
- How to keep small jobs above a profitable minimum.
- How condition, access, chemicals, and surface type change the price.
- What the written scope must exclude when the job is estimated remotely.

In one contractor discussion, a simple square-foot result was considered too low to justify the trip, so respondents used a minimum charge before switching to area pricing for larger jobs. This supports a pricing floor as a first-class rule rather than an advanced afterthought.

The customer document also needs more than a total. Current estimate templates emphasize service address, scope, assumptions, exclusions, customer preparation, expiration, and approval instructions.

Market pricing varies by city, surface, and service type. A 2026 public report covering 1,360 providers across 49 U.S. cities reports a wide price spread and different per-square-foot ranges by surface. zaps.work should therefore use user-owned rates and assumptions, not present a single national price as correct.

Sources:

- [Pressure Washing Finder: 2026 cost report](https://pressurewashingfinder.com/report)
- [Pressure-washing contractor discussion: driveway price and minimums](https://www.reddit.com/r/pressurewashing/comments/1b6iwdq/pressure_washing_driveway_price/)
- [Pressure Washing Estimate Template](https://jobquotelab.com/pressure-washing-estimate-template)

### 3.5 Core business problems

| Problem | Business consequence | Product response |
| --- | --- | --- |
| Area pricing produces a quote below the cost of showing up | Small jobs lose money | Apply a quote-level minimum job fee |
| The same square footage can require different effort | Condition and access are underpriced | Add explicit condition, access, and surface adjustments |
| The contractor does not know true job cost | A market rate can hide weak margin | Show labor, chemicals, travel, equipment, overhead, and margin privately |
| Remote information is incomplete | The customer treats an estimate as a guarantee | Put assumptions and review conditions in the customer document |
| Driveway, house, and add-ons are priced separately in messages | Slow response and missed upsell | Support multiple service line items and package totals |
| Internal pricing logic leaks into the customer quote | Creates negotiation friction | Keep cost and margin private; expose scope and customer price only |

### 3.6 Product hypothesis

The tool should support two pricing paths that reconcile into one recommended quote:

1. `Surface-rate check`: the sum of measured service lines multiplied by the user's rates.
2. `Cost-and-margin floor`: estimated direct cost converted to a price at the user's target margin.

The recommended pre-tax quote is the highest of:

```text
discounted rate-based subtotal
cost-and-margin price
minimum job fee
```

This prevents the calculator from declaring a low square-foot result profitable when travel, setup, and labor say otherwise.

### 3.7 MVP input model

Job and service:

- Job name.
- Service address, optional and quote-only.
- One or more service lines.
- Service preset: driveway or house exterior.
- Measurement mode by preset: direct surface area, driveway length x width, or house perimeter x average wall height.
- Area in square feet or square meters.
- User-owned rate per area unit.
- Condition: light, standard, or heavy.
- Access: normal or difficult.
- House stories for the house preset.
- Quantity or count for add-ons when relevant.

Cost assumptions:

- Crew size.
- Estimated crew hours.
- Loaded labor rate per worker-hour.
- Chemicals and consumables.
- Equipment allocation.
- Travel time or travel charge.
- Other job cost.

Pricing:

- Target margin or markup mode.
- Minimum job fee.
- Package discount, optional.
- Tax.

Quote details:

- Company and customer details.
- Estimate date and validity.
- Scope.
- Assumptions.
- Exclusions.
- Customer preparation.
- Notes and terms.

### 3.8 Calculation model

```text
adjusted service amount = area * user rate * condition factor * access factor
rate-based subtotal = sum(adjusted service amounts) + priced add-ons
discounted rate-based subtotal = rate-based subtotal - package discount

labor cost = crew size * crew hours * loaded labor rate
direct cost = labor cost + chemicals + equipment + travel + other job cost

cost-and-margin price = direct cost / (1 - target margin)

quote subtotal = max(
  discounted rate-based subtotal,
  cost-and-margin price,
  minimum job fee
)

tax = quote subtotal * tax rate
quote total = quote subtotal + tax
```

Rules:

- Condition and access factors are editable starter assumptions, not market facts.
- Show which rule controls the quote: surface rate, margin floor, or minimum fee.
- Warn when the surface-rate price is below the cost-and-margin floor.
- A package discount must never reduce the quote below the cost-and-margin floor or minimum fee.
- Do not apply the minimum fee once per service line; apply it once per visit.
- Keep tax outside profit and margin calculations.

### 3.9 Customer-facing estimate

Recommended line items:

- Driveway pressure washing.
- House exterior washing.
- Patio, walkway, or other add-on.
- Travel or special treatment only when the contractor wants it visible.

Required customer-safe content:

- Approximate measured scope.
- Included surfaces and selected treatment level.
- Access and water assumptions.
- Explicit exclusions for restoration and unlisted work.
- Customer preparation requirements.
- Price, validity, and approval instructions.

Never show:

- Contractor labor cost.
- Chemical cost.
- Profit or margin.
- Private condition multipliers.

### 3.10 MVP success and validation

Validation questions:

- Do contractors begin from area, expected hours, or a flat service table?
- Is the minimum job fee universal or service-specific?
- Which conditions change price versus trigger an on-site review?
- Do contractors prefer one firm estimate or a range before inspection?
- Which exclusions prevent the most disputes?

Proposed pre-build validation gate:

- Interview at least five solo or small-team operators.
- Back-test at least ten completed driveway or house-wash jobs.
- Confirm the calculator can reproduce each contractor's current quote when given the same assumptions.
- Confirm a first-time user can produce a customer-safe estimate in under three minutes.

Product metrics after launch:

- Valid calculation completion rate.
- Estimate preview and PDF export rate.
- Share of quotes controlled by minimum fee versus area rate.
- Frequency of multiple service lines.
- Warning rate for area price below margin floor.

### 3.11 Traffic and content cluster

Core tool:

- `/tools/pressure-washing-quote-generator`

Recommended page title:

- `Pressure Washing Cost Calculator & Quote Generator`

Supporting intent pages:

- Driveway pressure washing cost calculator.
- House washing cost calculator.
- Pressure washing price per square foot calculator.
- How to quote pressure washing jobs.
- Pressure washing estimate template.

## 4. Scenario Two: Laser Cutting Job Quote

### 4.1 Narrow scenario definition

Target work:

- Flat-sheet laser cutting.
- One-off and small-batch parts.
- User-entered cut statistics from CAD/CAM or an existing nest.
- Optional deburring or simple finishing as external line items.

Initial exclusions:

- Tube laser.
- Press-brake bending and welded assemblies.
- Automatic DXF/DWG/STEP cleanup or geometry analysis.
- Production-ready nesting.
- Automatic gas-consumption or machine-specific speed databases.
- Consumer-product value pricing for signs, gifts, or artwork.

This scope keeps the first version useful without pretending to be CAM software.

### 4.2 Target user

- Small laser-cutting job shop.
- Maker moving from internal work to paid custom jobs.
- Sign or fabrication shop that knows its machine and material rates.
- Estimator who currently uses a spreadsheet plus CAM statistics.

### 4.3 Trigger and job to be done

```text
When a customer sends one or more flat-part files and quantities,
I want to combine material allocation, cut features, setup, handling, and batch economics,
so I can quote consistently without rebuilding a spreadsheet or forgetting low-volume overhead.
```

Typical trigger:

1. The customer sends a DXF, DWG, STEP file, or drawing.
2. The shop selects material and thickness.
3. CAD/CAM provides cut length, pierce count, and expected cutting time.
4. The estimator applies material yield, setup, machine, and labor rates.
5. The shop sends unit and batch pricing.

### 4.4 Demand evidence

Practitioner discussions repeatedly show new laser owners asking how to convert internal machine use into paid job pricing. Common answers include material, machine time, human time, setup, minimum charge, and profit. Batch work also exposes labor that pure laser-on time misses, such as loading, unloading, masking, cleaning, and handling each part.

Industry calculators treat material type, thickness, quantity, cutting parameters, and machine utilization as primary cost drivers. Current commercial quote products go further by cleaning CAD files, counting pierces, calculating rapid moves and gas, unfolding STEP files, and nesting parts. Those products establish the advanced competitive baseline, but they also define a clear MVP boundary for zaps.work: transparent manual inputs before file automation.

Sources:

- [Xometry: factors affecting laser-cutting cost](https://www.xometry.com/resources/sheet/laser-cutting-cost-calculator/)
- [Laser-cutting practitioner discussion: how to price jobs](https://www.reddit.com/r/lasercutting/comments/zbmw25/how_to_price_jobs/)
- [Laser batch-pricing discussion: loading, unloading, and full cycle time](https://www.reddit.com/r/lasercutting/comments/1en9znh/pricing/)
- [CutQuote: current automated laser-quote workflow](https://cutquote.app/)
- [Kerf Tools: nesting outputs such as cut length, pierce count, and utilization](https://kerftools.com/)

### 4.5 Core business problems

| Problem | Business consequence | Product response |
| --- | --- | --- |
| Material is charged by rough part area | Scrap and poor nesting are underpriced | Allocate material using a user-entered nesting efficiency |
| Laser-on time is treated as the whole job | Setup, handling, and finishing disappear | Separate machine time from hands-on labor |
| Intricate files have many pierces and moves | Two parts with similar area get the same incorrect price | Accept cut length, pierce count, or CAM cutting time |
| One-off jobs carry the same preparation as a batch | Small orders lose money | Separate quote-level setup and minimum charge |
| Batch quantity lowers setup cost per part | Discounts are guessed | Show fixed-cost amortization and quantity breaks |
| Automated tools look authoritative even with bad files | Quote risk becomes invisible | Keep assumptions visible and require estimator review |

### 4.6 Product hypothesis

The MVP should be a transparent job-cost worksheet and quote generator. It should accept statistics the user already has from LightBurn, CAD/CAM, or a nesting tool.

Two cutting-time entry modes are sufficient:

1. `Direct time`: user enters expected machine cutting time.
2. `Feature estimate`: user enters cut length, cutting speed, pierce count, and pierce time.

The direct-time mode is the default because it avoids implying that a basic formula models acceleration, rapid moves, lead-ins, corner behavior, and machine-specific controls precisely.

### 4.7 MVP input model

Part:

- Part name.
- Quantity.
- Material and thickness.
- Part bounding width and height, or allocated area.
- Nesting efficiency.
- Cut length per part, optional by mode.
- Pierces per part, optional by mode.
- Direct cutting time per part or batch.

Material:

- Sheet width and height.
- Sheet price.
- Billing mode: proportional sheet usage or whole sheets consumed.
- Scrap or remnant policy.

Machine and labor:

- Machine hourly rate.
- Setup and file-preparation time.
- Setup labor rate.
- Handling time per part or per batch.
- Finishing labor and external finishing cost.
- Consumables or gas allowance, optional.

Pricing:

- Target margin or markup.
- Minimum job fee.
- Tax.
- Quantity alternatives.

### 4.8 Calculation model

For proportional material billing:

```text
nominal part area = width * height
allocated material area = nominal part area * quantity / nesting efficiency
material cost = allocated material area / sheet area * sheet price
```

For whole-sheet billing:

```text
sheets required = ceil(allocated material area / sheet area)
material cost = sheets required * sheet price
```

Feature-based cutting estimate:

```text
cut travel time = total cut length / cutting speed
pierce time = total pierces * time per pierce
estimated cutting time = cut travel time + pierce time + user-entered motion allowance
```

Job cost:

```text
machine cost = cutting hours * machine hourly rate
setup cost = setup hours * setup labor rate
handling cost = handling hours * handling labor rate

total job cost = material + machine + setup + handling + finishing + consumables
base quote = total job cost / (1 - target margin)
quote subtotal = max(base quote, minimum job fee)
```

Rules:

- Setup is charged once per job or material/thickness change, not once per part.
- Material and setup must be allocated consistently across quantity alternatives.
- Show unit cost and unit quote without hiding the total fixed setup amount.
- A nesting-efficiency default must be labeled as a starter assumption.
- Direct CAM cutting time overrides the feature estimate when both exist.

### 4.9 Customer-facing quote

Recommended line items:

- Part or part family with material, thickness, quantity, and unit price.
- Setup/NRE, either shown separately or rolled into part price.
- Deburring, finishing, packaging, or delivery when applicable.

Customer-safe assumptions:

- Quote is based on supplied revision and geometry.
- Material and thickness.
- Quantity and lead-time assumption.
- Tolerance or edge-quality assumptions.
- Whether material remnants remain with the shop or customer.
- Exclusions for design repair, bending, welding, finishing, and freight unless listed.

### 4.10 MVP success and validation

Validation questions:

- Which CAM statistic is most reliably available: total time, cut length, or both?
- Do small shops charge proportional material, full sheets, or a material multiplier?
- When is setup shown separately versus rolled into unit price?
- How do shops treat reusable remnants?
- Which secondary operations are common enough for the first release?

Proposed pre-build validation gate:

- Interview at least three small laser shops or paid-job makers.
- Back-test at least twenty historical jobs across one-off and batch quantities.
- Match the shop's existing spreadsheet result when the same assumptions are entered.
- Confirm that manual geometry statistics are acceptable before investing in DXF parsing.

Product metrics after launch:

- Direct-time versus feature-estimate usage.
- Number of part lines per quote.
- Minimum-fee activation rate.
- Quantity-break usage.
- PDF and CSV export rate.

### 4.11 Traffic and content cluster

Core tool:

- `/tools/laser-cutting-cost-calculator`

Supporting intent pages:

- How to price laser-cutting jobs.
- Laser-cutting cost per minute calculator.
- Laser-cutting material cost calculator.
- Laser-cutting quote template.
- How to calculate sheet utilization for quoting.

## 5. Scenario Three: CNC Prototype & Small-Batch Quote

### 5.1 Narrow scenario definition

Target work:

- Prototype and small-batch CNC work.
- First preset optimized for 3-axis milling.
- User-entered programming, setup, and operation estimates.
- Quantity alternatives such as 1, 10, 25, 50, or 100 parts.

Initial exclusions:

- Automatic STEP feature recognition.
- Automatic toolpath generation or cycle-time simulation.
- Five-axis, Swiss, grinding, EDM, and multi-process assemblies as first-class presets.
- Claims that a quote is manufacturable or guaranteed to meet tolerance.
- Automatic tolerance multipliers presented as engineering truth.

The first product should be positioned as a transparent quoting worksheet and second opinion, not autonomous instant quoting.

### 5.2 Target user

- Solo machinist taking paid work.
- Small prototype or job shop.
- Owner-estimator still using spreadsheets, printed drawings, and rough CAM checks.
- Experienced machinist who wants repeatable quantity-break math without adopting a full ERP.

### 5.3 Trigger and job to be done

```text
When a customer sends a new prototype or short-run RFQ,
I want to separate one-time engineering and setup from recurring part cost,
then account for inspection, tooling, outside processes, and risk,
so I can quote several quantities without hiding uncertainty or losing money on the first run.
```

Typical trigger:

1. The customer sends CAD, drawing, material, quantity, tolerance, finish, and due date.
2. The estimator chooses a process plan and number of setups.
3. The estimator prices programming, fixtures, tooling, machine operations, and inspection.
4. Fixed costs are shown separately or amortized across quantities.
5. The shop sends a reviewed quote with assumptions and revision control.

### 5.4 Demand evidence

Practitioner quoting methods consistently separate programming, setup, machining, and post-treatment, then add material, consumables, tooling, inspection, overhead, and margin. Discussions also emphasize reviewing estimated versus actual time after production.

The largest product risk is false automation. Experienced machinists describe process engineering and programming as a major part of prototype and short-run work and warn that geometry-only scoring cannot reliably understand every shop's machines, workholding, access, tooling, and process choices. This supports a transparent operation builder with user review.

Current commercial systems use file analysis to estimate setup count, detect process-specific features, surface manufacturability warnings, and estimate material removal. Protolabs and similar services also change quote economics through proprietary automation and standardized processes. zaps.work should not imply that a lightweight public calculator can reproduce those systems.

Sources:

- [Machinist discussion: programming, setup, machining, material, tooling, and margin](https://www.reddit.com/r/Machinists/comments/1e13391/job_quoting_method/)
- [CNC automation research discussion: trust and process-engineering limits](https://www.reddit.com/r/CNC/comments/1q7dvic/market_research_im_a_masters_student_building_an/)
- [Machinist discussion: tolerances, scrap risk, and underquoting](https://www.reddit.com/r/Machinists/comments/1g0urc8/any_advice_on_trying_to_convince_your_boss_to_not/)
- [Paperless Parts: current automated manufacturing-quote inputs](https://www.paperlessparts.com/)
- [Protolabs: interactive CNC quote and DFM workflow](https://www.protolabs.com/parts/cnc-machining/)
- [DigiFabster: CNC and manufacturing instant quoting](https://digifabster.com/)

### 5.5 Core business problems

| Problem | Business consequence | Product response |
| --- | --- | --- |
| Programming and setup are mixed into unit cost | One-off jobs look inexplicably expensive and repeat jobs are mispriced | Separate NRE/fixed cost from recurring cost |
| Quantity changes require rebuilding the spreadsheet | Inconsistent discounts and slow RFQ response | Generate quantity alternatives from the same process plan |
| Tight tolerances create inspection and scrap risk | The quote can be won and still lose money | Make inspection time, special gauges, and risk explicit |
| Machine, operator, and setup time use different rates | One shop rate distorts the real cost | Support operation-specific machine and labor rates |
| Special tooling and fixtures may be reusable | Customers dispute one-time charges or future pricing | Mark costs as one-time, reusable, amortized, or customer-owned |
| Quote assumptions are not tied to revision and process | Scope changes arrive without repricing | Put revision, material, tolerance, finish, and exclusions in the quote |
| Estimates are not compared with actuals | The same quoting mistake repeats | Design the data model so estimate-versus-actual can be added later |

### 5.6 Product hypothesis

The CNC tool should ask the estimator to build a short process plan:

```text
material
  + programming
  + setup and fixturing
  + one or more machine operations
  + handling and deburr
  + inspection
  + outside processes
  + tooling and risk
```

The tool performs reliable allocation and margin math. The user remains responsible for process selection, setup count, cycle time, tolerance feasibility, and scrap risk.

Tolerance should not silently apply a universal price multiplier. Instead, tighter tolerance can:

- Reveal inspection and risk fields.
- Warn that standard assumptions may not apply.
- Require the estimator to enter inspection time, special tooling/gauges, and scrap allowance.
- Add a visible `manual review required` state for unsupported tolerances.

### 5.7 MVP input model

RFQ and part:

- Part name and revision.
- Process preset: 3-axis milling first.
- Material and stock form.
- Raw-stock cost per part or batch.
- Quantity alternatives.
- Requested tolerance class.
- Finish and outside-process notes.
- Lead-time class.

One-time engineering:

- Programming hours and programmer rate.
- Setup count.
- Setup hours and setup rate.
- Fixture cost.
- Special tooling and gauges.
- Whether each cost is shown as NRE or amortized.

Recurring operations:

- Operation name.
- Machine type.
- Cycle time per part.
- Machine hourly rate.
- Attended labor time and labor rate.
- Handling and deburr time.

Quality and outside work:

- First-article inspection time.
- Per-part inspection time.
- Inspection labor rate.
- Material certificates or reports.
- Outside-process cost per batch or part.
- Packaging and shipping.

Risk and pricing:

- Expected scrap rate or explicit risk allowance.
- New-job contingency.
- Target margin or markup.
- Minimum order amount.
- Tax.

### 5.8 Calculation model

```text
fixed engineering cost =
  programming
  + setup
  + fixture
  + one-time tooling and gauges
  + first-article inspection

recurring cost per part =
  material
  + sum(machine operation cost)
  + attended labor
  + handling and deburr
  + per-part inspection
  + per-part outside processes

expected recurring cost = recurring cost per part / (1 - scrap rate)

production subtotal(quantity) =
  fixed engineering cost
  + expected recurring cost * quantity
  + batch outside processes
  + packaging and shipping

risk allowance =
  user-entered fixed amount
  or production subtotal * new-job contingency rate

batch cost(quantity) = production subtotal + risk allowance

base quote(quantity) = batch cost(quantity) / (1 - target margin)
quote subtotal(quantity) = max(base quote(quantity), minimum order amount)
unit quote(quantity) = quote subtotal(quantity) / quantity
```

Rules:

- Calculate every quantity alternative from the same reviewed process plan.
- Clearly show the fixed-cost allocation per part at each quantity.
- Scrap rate applies to repeatable production cost, not automatically to all one-time engineering.
- Keep scrap allowance and new-job contingency separate so the estimator can see when both are being charged.
- Special tooling and gauges need an ownership/reuse note.
- Do not combine margin and markup language.
- Unsupported tolerance, material, or process combinations require manual review rather than a fake answer.

### 5.9 Customer-facing quote

Recommended line items:

- NRE, programming, or setup when the shop exposes it.
- Machined part with quantity, unit price, and line amount.
- Special tooling or fixture when customer-specific.
- Inspection report, certification, finishing, and shipping.

Required customer-safe content:

- Part name, revision, and drawing reference.
- Material and finish.
- Quantity and unit price.
- Tolerance standard or explicit assumptions.
- Inspection and certification level.
- Lead time and quote validity.
- NRE reuse or ownership terms.
- Exclusions and change-order language.

Never show:

- Internal machine and labor rates.
- Private scrap assumptions.
- Target margin.
- Internal manufacturability warnings not intended for the customer.

### 5.10 MVP success and validation

Validation questions:

- Which process should be first: 3-axis milling or 2-axis turning?
- Which costs are normally shown as NRE versus rolled into unit price?
- How are setup and programming reused on repeat orders or new revisions?
- Which tolerance thresholds trigger special inspection or quote rejection?
- Is a process-plan worksheet valuable without CAD upload?
- What historical actuals are available to check quote accuracy?

Proposed pre-build validation gate:

- Work with at least two experienced CNC estimators as design partners.
- Back-test at least thirty completed prototype or small-batch jobs.
- Require every price difference to be traceable to an entered assumption.
- Confirm that the operation builder reduces spreadsheet work without hiding estimator judgment.
- Do not launch public automatic recommendations until tolerance and risk behavior has expert review.

Product metrics after launch:

- Quantity alternatives generated per RFQ.
- Share of quote in fixed NRE versus recurring cost.
- Manual-review warning rate.
- Frequency of inspection, tooling, and outside-process lines.
- Quote export rate.
- Later: estimated-versus-actual variance by cost category, without customer PII.

### 5.11 Traffic and content cluster

Core tool:

- `/tools/cnc-cost-calculator`

Supporting intent pages:

- CNC machining quote calculator.
- CNC setup-cost calculator.
- CNC machine shop rate calculator.
- CNC quantity-break calculator.
- How to quote prototype machining jobs.
- CNC machining quote template.

## 6. Shared Product Foundation

The three tools should share a quote contract, result conventions, and document renderer. They should not share one generic field schema.

```text
scenario inputs
  -> scenario calculation
  -> private cost and pricing result
  -> normalized customer line items
  -> shared quote preview / PDF / CSV
```

### Shared private result

- Total cost.
- Suggested pre-tax quote.
- Profit.
- Margin and effective markup.
- Minimum-fee adjustment.
- Warnings and manual-review state.
- Cost breakdown owned by the scenario.

### Shared customer document

- Company and customer details.
- Quote or estimate number.
- Date and validity.
- Job name and service address or drawing revision.
- Line items, quantities, unit prices, and amounts.
- Discount, tax, and total.
- Scope, assumptions, exclusions, notes, and terms.
- Unbranded PDF and CSV export.

### Scenario-specific quote metadata

| Scenario | Required additions |
| --- | --- |
| Pressure washing | Service address, measured scope, customer preparation, access/water assumptions |
| Laser cutting | Material, thickness, file revision, quantity, edge/tolerance assumptions |
| CNC machining | Part revision, tolerance standard, inspection level, NRE reuse, lead time |

### Privacy boundary

Follow `zaps-work_quote_document_requirements.md`:

- Customer-entered quote details remain in the browser.
- Analytics never store customer name, address, email, phone, quote number, item name, drawing reference, notes, or full quote snapshots.
- Aggregate events may record tool slug, completion, export, item count, quantity-band use, warning category, and formula version.

## 7. Roadmap Recommendation

### Phase 1: pressure-washing vertical slice

Build:

- Pressure-washing cost and margin model.
- Driveway and house presets.
- Multiple service lines.
- Minimum fee and package behavior.
- Service-specific scope, assumptions, exclusions, and customer-prep sections.
- Shared estimate preview, PDF, and CSV.

Why first:

- Inputs are available during a phone or photo-based estimate.
- The formula is understandable and user-editable.
- One engine supports several high-intent content pages.
- It validates the local-service quote pattern before more technical fabrication work.

### Phase 2: laser manual-statistics MVP

Build:

- Sheet and material allocation.
- Direct CAM-time mode.
- Optional cut-length and pierce estimate.
- Setup, handling, minimum fee, and quantity breaks.
- Fabrication-specific quote assumptions.

Defer DXF parsing until manual-input usage is validated. File parsing materially increases scope because real customer files can contain open contours, duplicate lines, incorrect units, and non-cut layers.

### Phase 3: CNC expert-assisted prototype

Build only after validation:

- One-time engineering and NRE model.
- Operation builder.
- Quantity alternatives.
- Inspection, tooling, outside-process, and risk lines.
- Manual-review states.

Do not begin with CAD-based autonomous pricing. A trustworthy CNC product needs historical-job calibration, machine-specific assumptions, and expert ownership of the process plan.

## 8. Immediate Research Tasks

1. Recruit five pressure-washing operators and collect ten anonymized completed estimates.
2. Recruit three laser shops or paid-job makers and collect twenty anonymized jobs with CAM statistics.
3. Recruit two experienced CNC estimators and collect thirty anonymized prototype/small-batch quotes with actual outcomes where available.
4. Create one interview script shared across scenarios:
   - Show the last quote from initial request to sent document.
   - Identify every assumption and where it came from.
   - Identify costs that are often forgotten.
   - Identify what makes the estimator refuse or revise a job.
   - Compare quoted versus actual time and cost.
   - Mark which information is safe to show the customer.
5. Use the collected jobs to create formula fixtures and acceptance tests before implementation.

## 9. Final Product Decisions

- Build pressure washing first.
- Treat driveway and house exterior as presets in one engine.
- Build laser cutting as a transparent manual-statistics calculator before attempting CAD automation.
- Treat CNC as an estimator-owned worksheet and second opinion.
- Never substitute generic market rates for the user's actual costs and pricing policy.
- Keep internal cost, margin, and risk assumptions separate from the customer quote.
- Require assumptions and exclusions whenever remote or technical uncertainty can change the final price.
