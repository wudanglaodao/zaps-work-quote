# zaps.work Style Update Notes

Version: 2026-07-10

## 1. Direction Shift

This round moves zaps.work away from a generic SaaS mockup and toward a practical quote workbench.

The current visual direction:

```text
precise calculator tool
+ quote-ready business output
+ restrained product-site polish
```

The page should feel useful before it feels decorative.

## 2. What Changed

### Brand And Logo

- Use `zaps.work` as a wordmark-first brand.
- Keep the period green as the main brand accent.
- Avoid literal product icons in the logo.
- Do not use arrows, paper sheets, checkmarks, sparks, or AI-style marks.

### Shape Language

- Buttons use `2px` radius.
- Tool and workflow cards use `2-4px` radius.
- Large panels can use `6px` at most.
- The interface should feel crisp and work-focused, not soft or bubbly.

### Typography

- Primary stack: `Inter`, `"Helvetica Neue"`, Arial, system sans.
- Large type is reserved for the homepage hero and major section headlines.
- Tool pages should be denser and more functional than the homepage.
- Letter spacing stays `0`.

### Color

- Green is the product accent and should mean active, live, profit, positive margin, or progress.
- Blue is for focus, utility, export, or neutral system states.
- Amber is for pricing risk.
- Red is for invalid or below-cost states.
- Quote previews and exported PDFs stay white in every theme.

### Homepage

- The homepage now uses a light-first hero with the promise:

```text
Cost in. Quote out.
```

- The first screen should stay copy-light.
- Product explanation is shown through abstract workflow cards: Input, Margin, Quote.
- Tool cards keep unopened tools visible with disabled styling.
- Supporting explanation sections can use subtle full-width bands.

### Motion

- Add motion only where it explains hierarchy.
- Hero has a light staggered entry.
- Workflow cards and tool cards reveal on scroll.
- Cards lift slightly on hover.
- Embedded chart bars/rings animate when entering the viewport.
- Respect `prefers-reduced-motion`.

## 3. Interaction Rules

### Theme Switch

- Use a compact sun/moon switch.
- Use `aria-label` and `aria-pressed`.
- Store manual theme choice locally.
- Do not place the theme switch inside calculator forms.

### Disabled Features

- Unopened tools can appear in the library but must look disabled.
- Disabled cards do not navigate to dead pages.
- Use a `Soon` badge.
- Avoid hover elevation on disabled cards.

### Tool Pages

Every tool page should start with the actual usable calculator, not a marketing section.

Required first viewport:

- Tool name.
- One-sentence value proposition.
- Input panel.
- Live suggested quote/result.
- Export/copy actions when valid.

## 4. Page-Level Design Pattern

Recommended calculator page structure:

```text
Header
Tool title
Workspace
  Left: inputs
  Right: sticky result summary
Tabs or lower panels
  Breakdown
  Quote preview
  Formula
  FAQ
  Related tools
```

Mobile structure:

```text
Tool title
Compact result summary
Input sections
Breakdown
Quote preview
FAQ
Related tools
```

## 5. Guardrails

Avoid:

- Oversized H1/H2 inside dense tools.
- Full-page marketing before a calculator.
- Overly rounded pill-heavy controls.
- Dark quote documents.
- Decorative gradients that do not explain workflow.
- AI-looking copy such as "powered by intelligence" or "automate everything".

Prefer:

- Real defaults.
- Immediate results.
- Clear formulas.
- Editable assumptions.
- Quote PDF preview.
- Small-business language.
