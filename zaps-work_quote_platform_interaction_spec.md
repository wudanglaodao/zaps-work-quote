# zaps.work Quote Platform Interaction Spec

Companion docs:

- `zaps-work_design.md`: current design system.
- `zaps-work_style_update_notes.md`: latest style update summary.
- `zaps-work_quote_page_scenarios.md`: detailed page specs for the first two scenarios.
- `zaps-work_technical_architecture.md`: project architecture for multilingual tools, analytics, export storage, and later ads.
- `zaps-work_i18n_rtl_design.md`: canonical localized SEO, translation, RTL, formatting, and multilingual PDF rules.

## 1. Direction

zaps.work should feel like a modern fintech workbench for cost calculation and quote generation.

Reference direction:

- Fintech dashboard polish: Coinest, Monefy, Global Payments style.
- Vercel-like interface discipline: restrained typography, clear hierarchy, precise spacing, calm states, fast interactions.
- zaps.work-owned product identity: do not copy Vercel brand assets, logos, page composition, or exact component styling.

Core product feeling:

> Simple enough for a maker or small business owner, structured enough to feel like a professional pricing system.

## 1.1 Product And Domain Strategy

Decision:

> Use `zaps.work` as the long-term domain and make it a general quote/cost tool platform.

Recommended product structure:

```text
zaps.work
  /en/tools
  /en/tools/3d-print-cost-calculator
  /en/tools/laser-cutting-cost-calculator
  /en/tools/cleaning-quote-generator
  /en/tools/pressure-washing-quote-generator
  /en/templates
  /en/guides
```

Use path-based URLs instead of many subdomains.

Why:

- One domain accumulates SEO authority.
- Tool pages can cross-link naturally.
- The platform can expand across many quote scenarios.
- Users remember one simple brand: `zaps.work`.

Brand model:

- `zaps.work` is the umbrella platform.
- Estimly can remain the product/system name for the quote engine if useful.
- Public copy should prioritize the user promise over the internal product name.

Recommended public positioning:

> Quote tools for real-world work.

Longer positioning:

> zaps.work helps makers, freelancers, and small businesses calculate costs, set prices, and generate professional quotes.

## 1.2 Universal Quote Platform Model

The long-term product should not be a random collection of calculators. It should be a reusable quote engine applied to many scenarios.

Core engine:

```text
Scenario
  -> Inputs
  -> Cost model
  -> Pricing rules
  -> Result
  -> Quote document
```

Shared data model:

```text
Tool
  slug
  category
  scenario
  inputSchema
  defaultExample
  calculationModel
  pricingRules
  resultSchema
  quoteTemplate
  seoMetadata
  relatedTools
```

Coverage can expand by category:

- Fabrication: 3D printing, laser cutting, CNC, embroidery, print shop.
- Local services: cleaning, pressure washing, handyman, lawn care, painting.
- Creative services: freelance projects, design work, copywriting, video editing.
- Repair/installation: appliance repair, furniture assembly, installation jobs.
- Business templates: estimates, invoices, quote PDFs, service agreements.

Expansion rule:

> Add a new scenario only when it can reuse the shared quote engine and has a clear SEO entry point.

## 2. Design Principles

### Tool First

Every tool page must show the usable calculator in the first viewport.

Avoid:

- Marketing hero before the tool.
- Long intro copy above the calculator.
- Generic SaaS landing-page sections before the user can calculate.

Use:

- Short H1.
- One-sentence promise.
- Calculator workspace immediately visible.

### Real-Time Feedback

Inputs should update results immediately.

Rules:

- No "Calculate" button required for basic updates.
- Use a primary action only for exporting, copying, saving, or resetting.
- When a value changes, update the result panel within the same interaction.
- Highlight changed result rows briefly with a subtle background or number transition.

### Explainable Pricing

Users must understand how the result was produced.

Each calculator must include:

- Cost breakdown.
- Formula summary.
- Editable assumptions.
- Warning states for risky or unrealistic inputs.
- Example calculation below the tool.

### Professional Output

zaps.work is not only a calculator collection. It should produce quote-ready outputs.

Each mature tool should support:

- Suggested price.
- Profit and margin.
- Cost line items.
- PDF quote preview.
- Copy quote summary.
- Export PDF.
- Export CSV.

### Progressive Complexity

Start simple, reveal advanced controls only when needed.

Default view:

- Essential inputs.
- Main result.
- Simple cost breakdown.

Advanced view:

- Machine depreciation.
- Waste/failure rate.
- Tax.
- Overhead.
- Custom line items.
- Discount.

## 3. Visual Interaction Style

### Overall Style

Use a workbench layout:

```text
Dark / deep brand shell
  Light calculator workspace
    Input panel
    Result panel
    Breakdown table
    Quote preview
```

The interface should feel precise and financial, not playful or decorative.

### Theme Strategy

zaps.work should support both light mode and dark mode from the beginning.

Default recommendation:

- Public homepage: dark shell with light workbench preview.
- Calculator pages: respect system preference, with light mode as the safest default for dense input work.
- Returning users: remember the last selected theme locally.

Theme switcher:

- Place a compact icon button in the footer utility row.
- Use sun/moon icons, not a text-heavy toggle.
- Tooltip labels: "Use Light Mode" and "Use Dark Mode".
- Never place theme switching inside the main calculator form.

Theme modes:

```text
Light Mode
  Page background: white / near-white
  Calculator panels: white
  Text: neutral high contrast
  Borders: subtle gray alpha
  Accent: green for pricing/profit

Dark Mode
  Page background: near-black / deep green-black
  Calculator panels: dark neutral
  Text: near-white high contrast
  Borders: white alpha
  Accent: brighter green for pricing/profit
```

Hybrid landing treatment:

```text
Dark brand shell
  Light workbench preview
```

This can be used on the homepage even when the user's active theme is light, because it communicates the fintech dashboard mood without sacrificing calculator readability.

### Theme Token Model

Use semantic tokens rather than hard-coded theme colors.

Canonical theme tokens live in:

```text
zaps-work_design.md
```

Recommended tokens:

```text
--color-page
--color-surface
--color-surface-raised
--color-surface-muted
--color-border
--color-border-strong
--color-text
--color-text-muted
--color-text-subtle
--color-accent
--color-accent-hover
--color-accent-soft
--color-focus
--color-success
--color-warning
--color-danger
```

Component tokens should consume semantic tokens:

```text
button.primary.background -> --color-text
button.primary.text -> --color-page
input.background -> --color-surface
input.border -> --color-border
result.profit -> --color-success
result.warning -> --color-warning
```

Theme behavior rules:

- Do not invert screenshots or quote previews automatically.
- PDF quote preview should stay light by default because most quotes are printed or emailed.
- Charts must swap gridlines, axis labels, and tooltip surfaces per theme.
- Focus rings must remain visible in both themes.
- Warning/error states must use icon + text, not color alone.
- Theme change must not reset calculator inputs.

### Color Direction

Recommended palette direction:

- Background shell: near-black or deep green-black.
- Main workspace: white / near-white.
- Primary accent: fresh green or lime green.
- Secondary accent: blue for export/share actions only.
- Text: high-contrast neutral.
- Warnings: amber.
- Errors: red.
- Success: green.

Avoid:

- Purple-blue SaaS gradients.
- Heavy beige/cream theme.
- Overly decorative gradient orbs.
- A one-color green-only interface.

### Vercel Design Token Baseline

Use `https://vercel.com/design.md` and `https://vercel.com/design.dark.md` as the baseline design-token reference, then adapt it to zaps.work.

Directly reusable values:

- 4px spacing scale: 4, 8, 12, 16, 24, 32, 40, 64, 96.
- Everyday control radius: 6px.
- Popover/modal radius: 12px.
- Button/input default height: 40px.
- Compact controls: 32px.
- Large controls: 48px.
- Button text: 14px medium.
- Input text: 14px regular.
- Main copy: 14px or 16px.
- Mono numbers: 12-14px.
- Fast state changes: roughly 150ms when motion helps.
- Popovers/tooltips: roughly 200ms.
- Modals/overlays: roughly 300ms.

zaps.work adaptations:

- Use neutral surfaces and borders from the Geist approach.
- Use green as the product accent because pricing/profit states benefit from it.
- Use blue sparingly for focus, links, and export/share actions.
- Use amber for pricing warnings.
- Use red only for invalid or below-cost states.

Do not copy:

- Vercel layout composition.
- Vercel brand identity.
- Vercel logo or proprietary product UI.
- Exact marketing-page structure.

### Typography

Use Geist-style typography if the project stack allows it.

Recommended:

- Geist Sans for UI, headings, buttons, forms.
- Geist Mono for amounts, formulas, units, timestamps, quote IDs, and dense metrics.

Type behavior:

- Use medium weight rather than heavy bold by default.
- Numbers should use tabular alignment.
- Labels should be small but readable.
- Avoid oversized headings inside compact panels.

### Cards And Panels

Use panels for functional grouping, not decoration.

Rules:

- Border radius: 6-8px.
- Subtle border over heavy shadow.
- No card-inside-card nesting.
- Cards are for repeated items, result tiles, modals, and quote preview surfaces.
- Full page sections should be bands or unframed layouts.

## 4. Global Navigation

### Desktop

Header:

- zaps.work logo/name.
- Tools.
- Guides.
- Templates.
- Optional search.

Right side:

- "All tools" or "Start calculating".
- No login in MVP unless needed.

### Mobile

Header:

- zaps.work logo/name.
- Search icon.
- Menu icon.

Mobile menu:

- Tools grouped by category.
- Guides.
- Templates.

Avoid crowding the header with multiple text links on mobile.

## 5. Page Types

### Home Page

Purpose:

- Explain zaps.work as a cost and quote tool system.
- Send users quickly into calculators.
- Feel like a practical tool directory and workbench, not an AI SaaS landing page.

First viewport:

```text
zaps.work
Cost calculators and quote generators for real-world work.

[Search tools]
[Popular tools grid]
```

Primary interactions:

- Search by job type.
- Open a tool.
- Browse by Cost Tools / Quote Tools.
- See which tools are available now and which are coming soon.

Do not make the home page a long marketing hero.
Do not lead with "AI-powered" language, abstract automation claims, glowing gradients, prompt boxes, or assistant-style chat UI.

Recommended homepage composition:

```text
Header
  Logo
  Tools / Guides / Templates

Footer utility row
  Theme toggle

Main workbench
  Left: search, category filters, tool cards
  Right: live-looking quote workspace preview

Below first viewport
  Cost layer
  Quote layer
  Popular guides/templates
```

Unavailable homepage items:

- Render unopened tools with disabled styling.
- Add a small `Soon` badge.
- Keep disabled cards non-clickable.
- Do not link to empty calculator pages unless a real coming-soon page is intentionally built.

### Tools Index

Purpose:

- Let users discover calculators.

Layout:

- Category tabs: Cost Tools, Quote Tools, Templates.
- Search/filter input.
- Tool cards.

Tool card content:

- Tool name.
- One-line use case.
- Category.
- Main output, such as "Cost + quote PDF".

Interactions:

- Search filters instantly.
- Category tabs preserve URL state.
- Related tools shown after selecting a category.

### Calculator Tool Page

This is the core zaps.work page type.

Desktop layout:

```text
Header

Tool title + short description

Main workspace
-------------------------------------------------
Left: Input Panel       Right: Result Panel
                         Sticky on desktop

Bottom:
Cost Breakdown
Quote Preview
Formula
FAQ
Related Tools
```

Mobile layout:

```text
Tool title
Primary result summary
Input sections
Cost breakdown
PDF quote preview
FAQ
Related tools
```

Mobile behavior:

- Keep a compact result summary sticky near the bottom after user starts editing.
- Avoid making the user scroll back to the top to see the price.
- PDF export button should remain easy to reach after valid inputs.

### Guide Page

Purpose:

- Capture SEO demand and explain pricing methods.

Structure:

- Short intro.
- Embedded related calculator near the top.
- Formula explanation.
- Example.
- Common mistakes.
- FAQ.
- Related tools.

The guide should not compete with the calculator page. It should feed users into the calculator.

### Template Page

Purpose:

- Capture users searching for quote/estimate templates.

Structure:

- Template preview.
- Editable fields.
- Export action.
- Link to related calculator.

Primary action:

- "Create quote from this template".

## 6. Calculator Interaction Model

### First Load

Each calculator should load with realistic defaults.

Rules:

- Do not start as an empty form.
- Show an example result immediately.
- Make defaults visibly editable.
- Include "Reset to example" and "Clear all" actions.

Example default state for 3D Print Cost Calculator:

```text
Material: PLA
Filament used: 120g
Print time: 6h 30m
Filament price: $24/kg
Electricity rate: $0.16/kWh
Labor: 15 min
Markup: 40%
```

### Input Controls

Use the right control for each input:

- Select menu for material, machine type, service type.
- Number input for measurable values.
- Unit selector for g/kg, in/mm, sqft/sqm, hour/min.
- Slider only for intuitive ranges such as markup, margin, difficulty, waste rate.
- Checkbox/toggle for optional costs.
- Stepper for quantity.

Input rules:

- Every numeric field must show a unit.
- Every editable assumption must have a default.
- Invalid fields show inline errors.
- Risky but possible values show warnings, not errors.
- Advanced fields are collapsed by default.

### Multiple Line Items

Quote-capable calculators use an `items[]` model even when the first screen starts with one item.

MVP interaction:

- One item is present by default.
- Add, select, duplicate, and delete are explicit controls.
- Only one item editor is expanded at a time.
- Collapsed summaries show item name, key type/material, quantity, and quoted amount.
- The only remaining item cannot be deleted.
- Reordering is deferred; do not add drag handles to the first release.
- Quote preview and copied summary list every item separately.

Keep per-item production inputs separate from quote-level assumptions. Minimum fees, shipping, discounts, and taxes must not be multiplied by the item count unless the user explicitly marks them as per-item.

3D printing form hierarchy:

```text
01 Print items
   Basic slicer inputs
   Item costs & labor (collapsed)
02 Rates & risk
   Shared machine/labor rates
   Production assumptions (collapsed)
03 Pricing
   Margin/markup, minimum, shipping, other, tax
04 PDF details
   Company and customer-facing fields
```

### Result Panel

Result hierarchy:

1. Suggested price.
2. Total cost.
3. Profit.
4. Margin.
5. Cost breakdown.

Recommended structure:

```text
Suggested price
$42.80

Total cost: $28.41
Profit: $14.39
Margin: 33.6%

[Export PDF] [Copy summary]
```

Interactions:

- Result updates instantly.
- User can switch between markup and target margin.
- If margin is low, show a warning.
- If price is below cost, show an error state.

### Cost Breakdown

Breakdown rows:

- Material.
- Machine time.
- Labor.
- Electricity.
- Overhead.
- Waste/failure.
- Other.

Each row should show:

- Label.
- Formula or source.
- Amount.
- Percentage of total cost.

Interactions:

- Clicking a row focuses the related input.
- Optional rows can be enabled/disabled.
- Custom rows can be added in advanced mode.

### Formula Disclosure

Formula is visible but not dominant.

Default:

- Show a short formula summary.

Expanded:

- Show full formula.
- Explain each variable.
- Show example calculation.

Do not force users to read formulas before using the calculator.

### Quote Preview

Quote preview should feel like a professional document, not a screenshot.

Branding rules:

- The document belongs to the user, not zaps.work.
- Show an editable company name in the document header.
- Do not export the zaps.work wordmark, domain, watermark, or promotional footer.
- If company name is empty, leave that header position empty.
- Later account/profile support may reuse company logo, address, tax ID, contact details, and payment terms.

Fields:

- Business name.
- Client name.
- Project name.
- Quote date.
- Quote number.
- Line items.
- Notes.
- Terms.
- Total.

MVP behavior:

- Optional fields can be blank.
- PDF can be generated in browser.
- No login required.

Interactions:

- Edit quote details inline or in a side panel.
- Preview updates immediately.
- Export PDF is disabled until minimum required fields are valid.

Minimum required fields:

- Tool result exists.
- Quote total exists.
- At least one line item exists.

## 7. Tool-Specific Interaction Specs

### 3D Print Cost Calculator

Primary user question:

> How much should I charge for this 3D print job?

Essential inputs:

- Material type.
- Filament used.
- Filament spool price.
- Print time.
- Electricity rate.
- Printer power.
- Labor time.
- Labor rate.
- Markup or target margin.

Advanced inputs:

- Printer purchase price.
- Expected machine lifetime.
- Daily commercial usage.
- Maintenance percentage.
- Failure rate.
- Post-processing time.
- Other costs.
- Tax.

Result outputs:

- Material cost.
- Electricity cost.
- Machine cost.
- Labor cost.
- Failure allowance.
- Total cost.
- Suggested price.
- Profit.
- Margin.
- PDF quote.

Key interactions:

- Material preset updates density/default cost hint.
- User can enter filament by grams or length.
- Markup and margin modes are switchable.
- Low margin warning appears below 20%.
- Below-cost warning appears if final price is less than total cost.

### Laser Cutting Cost Calculator

Primary user question:

> What should this laser cutting job cost?

Essential inputs:

- Material.
- Thickness.
- Sheet size or material area.
- Cut length.
- Cutting time.
- Machine hourly rate.
- Setup time.
- Quantity.
- Markup or target margin.

Advanced inputs:

- Pierces.
- Engraving time.
- Nesting/waste percentage.
- Gas/consumables.
- Finishing.
- Rush multiplier.

Result outputs:

- Material cost.
- Cutting cost.
- Setup cost.
- Waste cost.
- Consumables.
- Total cost.
- Suggested quote.

Key interactions:

- Material and thickness can suggest default speed assumptions.
- Quantity changes unit cost and total quote.
- Setup cost is spread across quantity.

### Pressure Washing Quote Generator

Primary user question:

> How should I quote this pressure washing job?

Essential inputs:

- Surface type.
- Area.
- Soil level.
- Travel distance.
- Labor rate.
- Estimated time.
- Materials/chemicals.
- Minimum service fee.

Advanced inputs:

- Difficulty multiplier.
- Equipment cost.
- Water access issue.
- Stain treatment.
- Rush service.

Result outputs:

- Labor cost.
- Materials.
- Travel.
- Equipment.
- Suggested quote.
- Profit.
- Quote PDF.

Key interactions:

- Area and surface type can estimate time.
- Difficulty multiplier adjusts time and price.
- Minimum service fee overrides too-low quotes.

### Cleaning Quote Generator

Primary user question:

> What should I charge for this cleaning job?

Essential inputs:

- Property type.
- Square footage.
- Rooms/bathrooms.
- Cleaning type.
- Frequency.
- Labor rate.
- Supplies.
- Travel.

Advanced inputs:

- Deep cleaning multiplier.
- First-time cleaning surcharge.
- Pets.
- Add-ons.
- Discount.

Result outputs:

- Estimated hours.
- Labor cost.
- Supplies.
- Travel.
- Suggested quote.
- Recurring price.
- PDF estimate.

Key interactions:

- Frequency changes recommended discount.
- Deep clean and first-time clean affect multiplier.
- Add-ons appear as quote line items.

## 8. States

### Default State

- Calculator is pre-filled.
- Result is visible.
- PDF preview uses placeholder business/client details.

### Editing State

- Changed input has focus styling.
- Related result row can highlight briefly.
- No full-page loading.

### Invalid State

Use for impossible inputs:

- Negative quantity.
- Zero or negative material price.
- Missing required unit.

Behavior:

- Inline message.
- Result panel keeps last valid result if useful.
- Export disabled until fixed.

### Warning State

Use for possible but risky inputs:

- Margin below 20%.
- Waste rate above 30%.
- Print time unusually high.
- Quote below minimum service fee.

Behavior:

- Amber warning near relevant field or result.
- Do not block calculation unless impossible.

### Empty/Cleared State

If user clears all:

- Show compact guidance in the result panel.
- Keep sample action available.
- Avoid a blank page.

### Export Success

After PDF download:

- Show toast: "Quote PDF downloaded".
- Offer copy summary.
- Do not force sign-up.

### Error State

If PDF generation fails:

- Keep the calculated result visible.
- Show retry action.
- Offer copy summary as fallback.

## 9. Microinteractions

Use subtle feedback:

- Number transitions: 120-180ms.
- Result highlight: 600ms fade.
- Accordion open/close: 150-200ms.
- Toast: 3-4 seconds.
- Buttons: clear hover and pressed states.

Avoid:

- Large animated hero effects.
- Decorative motion.
- Excessive chart animation.
- Anything that slows down data entry.

## 10. Content And Copy

Tone:

- Clear.
- Practical.
- Professional.
- No hype.

Button labels:

- "Export PDF"
- "Copy summary"
- "Reset example"
- "Add cost item"
- "Show formula"
- "Use target margin"

Avoid:

- "Get started" when the tool is already visible.
- "Unlock your potential".
- Vague AI wording before AI exists.

## 11. SEO Interaction Rules

Calculator page must balance tool and content.

Every indexable language version uses a locale-prefixed URL and complete localized content. Canonical, `hreflang`, `x-default`, sitemap alternates, and direction behavior follow `zaps-work_i18n_rtl_design.md`.

Above the fold:

- H1.
- Short promise.
- Calculator.

Below the fold:

- How it works.
- Formula.
- Example.
- FAQ.
- Related tools.

Internal links:

- 3D print tool links to laser cutting and CNC.
- Laser cutting links to 3D print and CNC.
- Pressure washing links to cleaning and handyman.
- Quote tools link to quote templates.

## 12. Analytics Events

Track anonymous events from day one.

Recommended events:

```text
tool_viewed
input_changed
advanced_opened
result_updated
margin_warning_shown
pdf_preview_opened
pdf_downloaded
summary_copied
related_tool_clicked
faq_opened
```

Event properties:

- tool_slug.
- tool_category.
- input_group.
- has_advanced_fields.
- result_total_cost_range.
- result_quote_range.
- margin_range.
- export_type.

Do not collect personal client/business details in MVP analytics.

## 13. Vercel Reference Decision

Use directly:

- Geist Sans / Geist Mono if the stack supports it.
- Restrained typography.
- Neutral borders.
- High-contrast surfaces.
- Fast, calm UI states.
- Developer-tool clarity.

Do not use directly:

- Vercel logo.
- Vercel brand layout as a clone.
- Exact Vercel homepage/console composition.
- Vercel-specific visual assets.

zaps.work translation:

```text
Vercel precision
+ fintech dashboard polish
+ quote/calculation workbench
= zaps.work interface language
```

## 14. MVP Build Checklist

Before shipping a tool page:

- Calculator visible in first viewport.
- Realistic default example exists.
- Inputs have labels and units.
- Results update instantly.
- Cost breakdown exists.
- Formula summary exists.
- Invalid and warning states exist.
- Mobile result summary is usable.
- PDF export path is present or clearly marked as coming next.
- FAQ and related tools exist below the calculator.
- Analytics events are wired.

## 15. First Implementation Recommendation

Build this page first:

```text
/en/tools/3d-print-cost-calculator
```

First version scope:

- Essential inputs.
- Real-time result panel.
- Cost breakdown.
- Markup/margin toggle.
- Formula section.
- PDF quote preview mock or browser PDF export.
- Related tools: Laser Cutting, CNC.

This page becomes the reusable interaction template for every zaps.work calculator.
