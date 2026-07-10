# zaps.work Design System

Version: 0.5 consolidated direction

Homepage implementation is governed by `zaps-work_homepage_design.md`. This file defines the shared system used by the homepage and calculator pages.

Internationalization, localized SEO, bidirectional content, and RTL behavior are governed by `zaps-work_i18n_rtl_design.md`.

zaps.work is a practical cost and quote workspace. The interface should feel like a real tool: precise, quiet, useful, and confident. It should not feel like an AI landing page, a crypto dashboard, or a generic SaaS template.

## 1. Product Tone

Core promise:

```text
Cost in. Quote out.
```

Design keywords:

- Precise.
- Practical.
- Low-noise.
- Calculator-first.
- Quote-ready.
- Slightly premium, not decorative.

Avoid:

- AI-style gradient blobs.
- Overly soft SaaS cards.
- Huge copy blocks.
- Decorative product metaphors.
- Cartoon arrows, sparks, paper mascots, or fake automation imagery.
- One-note green pages.

## 2. Brand

Primary wordmark:

```text
zaps.work
```

Rules:

- Use a lowercase wordmark.
- Keep the period green.
- Keep the wordmark black in light mode and near-white in dark mode.
- Do not use a product icon as the primary logo.
- Do not attach arrows, checkmarks, calculators, paper sheets, charts, sparks, or coins to the logo.
- The product UI explains the product; the logo behaves like a serious brand mark.

Optional favicon:

- Compact typographic `z` or `zw`.
- Dark square or near-square background.
- One green dot as the only accent.

## 3. Typography

Primary UI stack:

```css
font-family: Inter, "Helvetica Neue", Arial, ui-sans-serif, system-ui, sans-serif;
```

Numeric and technical data:

```css
font-family: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
```

Scale:

| Role | Size | Weight | Use |
|---|---:|---:|---|
| Hero H1 | 52-68 | 590-650 | First viewport only |
| Page H1 | 36-44 | 620 | Tool pages |
| Section H2 | 32-44 | 620 | Major sections |
| Panel title | 18-24 | 650 | Cards, panels |
| Body | 14-16 | 400-520 | UI copy |
| Label | 12-13 | 650-720 | Inputs, tags |
| Amount | 48-64 | 650-720 | Quote totals |

Rules:

- Letter spacing stays `0`.
- Do not scale type directly with viewport width beyond controlled `clamp()`.
- Keep homepage copy short. Prefer visuals over paragraphs.
- Use large type only for hero and major section headlines.

## 4. Color

### Primitive Palette

| Token | Hex | Use |
|---|---:|---|
| `neutral-0` | `#ffffff` | Quote documents, white cards |
| `neutral-50` | `#fbfcfa` | Light page |
| `neutral-100` | `#f1f4f2` | Muted surfaces |
| `neutral-200` | `#dde6e1` | Default border |
| `neutral-300` | `#bbc8c0` | Strong border |
| `neutral-500` | `#7b8781` | Subtle text |
| `neutral-600` | `#536158` | Muted text |
| `neutral-900` | `#111713` | Dark raised surface |
| `neutral-950` | `#070b09` | Dark page |
| `neutral-1000` | `#030504` | Deep shell |
| `green-50` | `#ecfdf3` | Accent wash |
| `green-500` | `#22c55e` | Positive charts |
| `green-600` | `#16a34a` | Primary accent |
| `green-700` | `#0f8a3c` | Accent hover |
| `green-400` | `#4ade80` | Dark accent |
| `blue-600` | `#2563eb` | Focus/export |
| `amber-500` | `#f59e0b` | Risk/warning |
| `red-600` | `#dc2626` | Invalid/below cost |

### Semantic CSS

```css
:root {
  color-scheme: light;
  --color-page: #fbfcfa;
  --color-surface: #ffffff;
  --color-surface-muted: #f1f4f2;
  --color-border: #dde6e1;
  --color-border-strong: #bbc8c0;
  --color-text: #08100c;
  --color-text-muted: #536158;
  --color-text-subtle: #7b8781;
  --color-accent: #16a34a;
  --color-accent-hover: #0f8a3c;
  --color-accent-soft: #ecfdf3;
  --color-focus: #2563eb;
  --color-warning: #f59e0b;
  --color-danger: #dc2626;
  --color-pdf-page: #ffffff;
  --color-pdf-text: #08100c;
}

[data-theme="dark"] {
  color-scheme: dark;
  --color-page: #070b09;
  --color-surface: #111713;
  --color-surface-muted: #222b26;
  --color-border: #2a342e;
  --color-border-strong: #445047;
  --color-text: #f8faf9;
  --color-text-muted: #a8b3ad;
  --color-text-subtle: #7b8781;
  --color-accent: #4ade80;
  --color-accent-hover: #86efac;
  --color-accent-soft: #052e16;
  --color-focus: #48aeff;
  --color-warning: #f59e0b;
  --color-danger: #f87171;
  --color-pdf-page: #ffffff;
  --color-pdf-text: #08100c;
}
```

Color rules:

- Green means active, live, profit, positive margin, or primary quote progress.
- Blue means focus, export, or neutral utility.
- Amber means pricing risk.
- Red means invalid, below-cost, or destructive.
- Quote previews and PDFs stay white in every theme.

## 5. Radius, Border, Elevation

Radius:

| Token | Value | Use |
|---|---:|---|
| `radius-control` | `2px` | Buttons, inputs, switches |
| `radius-card` | `4px` | Tool cards, flow cards |
| `radius-panel` | `6px` | Large preview containers |
| `radius-full` | `999px` | Status dots only |

Rules:

- Prefer crisp borders over soft shadows.
- Buttons should not be pill-shaped.
- Cards should feel hard and intentional, not bubbly.
- Use shadow only for layered previews or floating mini-panels.

Elevation:

```text
low: 0 1px 2px rgba(8, 16, 12, 0.06)
medium: 0 14px 40px rgba(8, 16, 12, 0.10)
preview: 0 28px 80px rgba(8, 16, 12, 0.14)
```

## 6. Buttons

Primary:

```text
background: green-600
text: white
border: transparent
radius: 2px
height: 42px
```

Use for:

- Open tool.
- Start quote.
- Export PDF.
- Export CSV.
- Continue from one step to the next.

Secondary:

```text
background: white/surface
text: color-text
border: color-border-strong
radius: 2px
height: 42px
```

Use for:

- Browse tools.
- Copy summary.
- Reset example.

Do not use pill buttons unless the element is a status badge or a tiny tag.

## 7. Theme Switch

Use a compact icon button in the site footer, not a text toggle.

Rules:

- Size: `36px x 36px`.
- Radius: `2px`.
- Show the sun in light mode and moon in dark mode.
- Add `aria-label` and `aria-pressed`.
- Store the manual choice locally.
- Keep it in the footer utility row on homepage and tool pages.
- Do not place theme controls inside calculator forms.

## 8. Homepage Pattern

Canonical homepage structure, responsive behavior, and acceptance criteria now live in `zaps-work_homepage_design.md`.

The homepage must follow this hierarchy:

```text
Short hero
Three-stage quote workflow
Tool library with one featured live tool
Compact how-it-works band
Final action and footer
```

Do not combine this with the older split workbench direction. The homepage introduces the platform; individual tool pages contain the full calculator workspace.

First viewport:

- Light page by default.
- Centered hero.
- Short kicker.
- One-line H1.
- One short supporting sentence.
- Two CTAs.
- No proof metrics unless they represent verified product usage data.
- No marketing illustration unless it shows a real product state.

Hero copy should stay close to:

```text
Cost in. Quote out.
```

Workflow preview:

- Use three visual cards: Input, Margin, Quote.
- Keep text minimal.
- Use abstract UI scenes rather than full screenshots of a single calculator.
- Each card may use a different soft scene color.
- Keep the three-card layout on desktop and small desktop; stack only below tablet width.
- Keep cards compact enough to show as a workflow, not as full-page screenshots.
- Keep connectors subtle or remove them if they add clutter.
- The quote card should imply a document, but not become a full PDF preview.

Tool library:

- Start with the live 3D Print Cost Calculator.
- Keep planned tools visible but disabled.
- Cards should use hard borders, small radius, top status rail, icon block, and status tag.

Supporting explanation sections:

- Use a subtle full-width band when the section would otherwise disappear into the page background.
- Prefer neutral-green tint over saturated color.
- Keep content cards white or dark-surface on top of the band.
- Avoid heavy section boxes or nested cards.
- Do not repeat the Input / Margin / Quote workflow in another explanatory section.

## 9. Tool Cards

Live card:

- White surface.
- Strong top green rail.
- Square icon block.
- `Live` badge.
- Clear bottom action row.

Disabled card:

- Muted surface.
- Muted title/body/icon.
- `Soon` badge.
- No hover elevation.
- `cursor: not-allowed`.
- No dead navigation.

Card radius:

```text
2-4px
```

Card copy:

- Title: clear tool name.
- Body: one short line or two compact lines.
- Output line: what the user gets.

## 10. Calculator Pages

Layout:

- Left: job inputs.
- Right/top: suggested quote.
- Right/bottom: cost breakdown and quote preview.
- Tabs: Input, Breakdown, Quote.

Interaction:

- Recalculate live when inputs change.
- No required calculate button for basic updates.
- Keep advanced settings collapsed by default.
- Keep quote export visible after valid inputs.
- Highlight changed result rows subtly.

Input rules:

- Inputs need clear units.
- Numeric fields must support keyboard editing.
- Defaults should produce a useful example immediately.
- Error states must include text, not just color.
- Advanced assumption disclosure uses a visible switch track: neutral when collapsed and green when expanded; the whole summary row remains clickable.
- Organize quote forms in task order: items, shared rates/risk, pricing, then customer-document details.
- Keep per-item values inside the active item editor; do not place material-specific values such as spool weight in shared assumptions.
- Keep shipping, other quote charges, tax, and minimum fee together under pricing rather than hiding them as advanced production inputs.
- Give each primary form section a numbered 01-04 marker and divide long sections with quiet secondary labels such as Item details, Slicer data, Base rates, and Quote charges.
- Input values use tabular numerals; units render as visually separated suffix cells inside the control.
- Use white/surface input backgrounds, subtle hover contrast, and a three-pixel soft focus ring without changing control dimensions.

## 11. Quote Document

Quote preview and exported PDFs use document tokens, not app theme tokens.

```text
background: white
text: near-black
accent: none; use weight and rules for hierarchy
```

Rules:

- PDF output is always light.
- The quote should look printable and customer-facing.
- Use the user's editable company name and identity, never the zaps.work wordmark or URL.
- Company name is optional; leave the header blank when it is not provided instead of falling back to platform branding.
- Do not add a zaps.work footer, watermark, promotional line, or source URL to exported documents.
- Keep only Company name visible by default. Place the remaining optional quote metadata behind an off-by-default switch; closing it preserves entered values but excludes them from the PDF.
- Optional quote metadata starts empty. Omit both its label and value from the PDF when the user has not provided it; placeholders such as `hello@zaps.work` are never exported.
- Use a restrained editorial quote structure: large document title, company identity, quote date/reference, customer and project block, line-item table, totals, and validity note.
- Customer-facing line items show description, quantity, unit price, and amount. Internal cost, margin, risk, and pricing formulas never appear in the exported quote.
- CSV exports use UTF-8 BOM, localized headers, plain numeric amount cells, and a separate currency-code column. Optional metadata follows the same visibility switch as the PDF.
- Use an A4 page with document-owned internal padding so browser print-margin settings cannot collapse the layout against the paper edge.
- Keep company logo, address, tax ID, contact details, and payment terms optional for later profile support.
- Totals must be easy to scan.

## 12. Motion

Use motion sparingly:

- Hero entry: short stagger, readable from the first frame.
- Scroll reveal: `opacity + translateY(24px)`, stagger repeated cards by `80-110ms`.
- Card hover: `translateY(-4px to -6px)` with slightly stronger border/shadow.
- Embedded chart motion: grow bars or rings when the card first enters the viewport.
- Theme switch thumb: `180ms ease`.
- Result highlight: `600ms fade`.
- Filter card enter/exit: subtle; never reshuffle with a heavy animation.

Respect `prefers-reduced-motion`.

## 13. Internationalization And Direction

All shared components must be designed for translation and RTL before release.

Rules:

- Use locale-prefixed routes for every indexable language version.
- Set `lang` and `dir` on the document root.
- Use CSS logical properties such as `padding-inline`, `margin-inline-start`, and `text-align: start`.
- Keep UI locale, currency, unit system, numbering system, and quote document locale independent.
- Show language and currency as persistent global controls in the shared header.
- Launch with English and Traditional Chinese; initial currencies are USD, TWD, EUR, and GBP.
- Render language and currency as borderless icon + current value + chevron triggers; use only a subtle hover fill and visible keyboard focus ring.
- Open preferences in a compact custom popover, never the browser-native select menu. Show the full option name on a quiet elevated surface with a 4px radius; indicate selection with background and text color only, without a check icon.
- Preference menus close on outside click or `Escape`, open from the trigger with `ArrowDown`, and move through options with `ArrowUp` / `ArrowDown`.
- Support at least 40% text expansion without overlap or clipped actions.
- Mirror directional navigation and workflow cues in RTL; do not mirror the wordmark, numbers, charts, or neutral icons.
- Keep quote preview and PDF direction independent from the current app direction.
- Isolate IDs, email, URLs, formulas, filenames, and user-generated mixed-direction values.

The complete component, SEO, formatting, PDF, analytics, and test rules live in `zaps-work_i18n_rtl_design.md`.

## 14. Accessibility

- Body text must meet WCAG AA.
- Focus states must be visible in both themes.
- Disabled controls must stay readable.
- State cannot rely on color alone.
- Charts need labels or values.
- Theme switch must expose state through `aria-pressed`.
- Tool cards that are unavailable must not be focusable links.

## 15. Build Checklist

Before shipping a page:

- Light mode checked.
- Dark mode checked.
- Theme switch state checked.
- Buttons use 2px radius.
- Cards use 2-4px radius.
- Quote preview stays white.
- Disabled features look unavailable.
- H1/H2 sizes are not oversized.
- Copy is short enough to scan.
- Mobile text does not overflow.
- Focus states are visible.
- English, expanded-text, and RTL layouts are checked.
- Currency, units, and quote document language are not coupled to UI language.
