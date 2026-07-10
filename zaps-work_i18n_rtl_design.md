# zaps.work Internationalization, RTL, And Localized SEO

Version: 1.0  
Status: canonical cross-product specification

This document governs localization for the homepage, calculator pages, quote previews, exported documents, metadata, and analytics. It supplements:

- `zaps-work_design.md`
- `zaps-work_homepage_design.md`
- `zaps-work_quote_platform_interaction_spec.md`
- `zaps-work_technical_architecture.md`

The product must be internationalization-ready before each locale is published. A locale is not indexable until its complete page copy, SEO metadata, calculator labels, FAQ, and export labels have been reviewed.

## 0. Language Rollout

Current complete locales:

| Locale | URL prefix | HTML language | Direction | Default currency for a new visitor |
| --- | --- | --- | --- | --- |
| English | none | `en` | LTR | USD |
| Traditional Chinese | `/zh-hant` | `zh-Hant` | LTR | TWD |
| German | `/de` | `de` | LTR | EUR |

Recommended next release group:

1. Simplified Chinese (`zh-hans`)
2. Japanese (`ja`)
3. Spanish (`es`)

Follow-up group:

1. French (`fr`)
2. Brazilian Portuguese (`pt-br`)
3. Korean (`ko`)

Arabic (`ar`) remains a separate RTL release because it needs mirrored desktop layout, Arabic typography, mixed-direction quote handling, and a dedicated PDF review. Do not add a locale to the route list only to expose a translated navigation label.

## 1. Core Model

Do not treat language as a single global preference. Keep these values independent:

```ts
type ProductPreferences = {
  uiLocale: "en" | "zh-hant" | "de" | "zh-hans" | "ja" | "es" | "ar";
  region: string | null;
  currency: string;
  unitSystem: "metric" | "imperial";
  numberSystem: "latn" | "arab" | "arabext";
  documentLocale: string;
  documentDirection: "ltr" | "rtl";
};
```

Examples:

- An Arabic UI may produce an English USD quote.
- An English UI may calculate in EUR and metric units.
- A Chinese user may prepare an Arabic customer-facing quote.

Rules:

- UI locale controls navigation, labels, help, validation, and page metadata.
- Currency controls money formatting and must not be inferred permanently from locale.
- Unit system controls input defaults and conversions.
- Document locale controls the quote preview and PDF independently of the app shell.
- Store canonical numeric values; format only at the presentation boundary.

## 2. URL And SEO Strategy

### Canonical Locale Routes

English uses the root URL structure. Every additional language uses its own locale-prefixed URL:

```text
/
/tools/3d-print-cost-calculator
/zh-hant/tools/3d-print-cost-calculator
/de/tools/3d-print-cost-calculator
/ar/tools/3d-print-cost-calculator
```

The root `/` is not an indexable content duplicate. It may:

- Redirect to a remembered locale.
- Use `Accept-Language` for a first-visit recommendation.
- Fall back to `/`.

Always keep an explicit language switcher. Do not force or permanently lock a language based on IP address.

### Canonical And Alternate Links

For every localized page:

- Canonical points to the same-language URL.
- Each complete translation self-references with `hreflang`.
- Each page references every equivalent complete locale.
- Add `x-default` pointing to `/` or the English fallback.
- Include the same alternate mapping in the sitemap.
- Never canonicalize Arabic, Chinese, or Spanish pages to English.

Example:

```html
<link rel="canonical" href="https://zaps.work/ar/tools/3d-print-cost-calculator" />
<link rel="alternate" hreflang="en" href="https://zaps.work/tools/3d-print-cost-calculator" />
<link rel="alternate" hreflang="zh-Hant" href="https://zaps.work/zh-hant/tools/3d-print-cost-calculator" />
<link rel="alternate" hreflang="ar" href="https://zaps.work/ar/tools/3d-print-cost-calculator" />
<link rel="alternate" hreflang="x-default" href="https://zaps.work/" />
```

### Localized Page Quality

A locale is publishable only when it includes:

- Localized title, description, H1, calculator labels, errors, FAQ, and related links.
- Localized `SoftwareApplication`, `WebApplication`, FAQ, and breadcrumb structured data where applicable.
- Locally sensible examples, currency, and unit defaults.
- Human-reviewed search language and terminology.
- Correct Open Graph text and social image locale.
- A working equivalent-language route map.

Do not launch thin pages made from metadata-only or raw machine translation. Translation and keyword localization are separate tasks.

Tool slugs may remain stable in English for the first release. If localized slugs are introduced later, maintain an explicit route map and permanent redirects; never derive slugs by translating them at runtime.

## 3. Document Direction

Set language and base direction in markup:

```tsx
<html lang={locale} dir={directionFor(locale)}>
```

Use `dir="rtl"` for Arabic and other RTL locales. Do not use CSS `direction` as the primary document-direction mechanism.

Direction belongs to the locale configuration:

```ts
export const locales = {
  en: { direction: "ltr", defaultCurrency: "USD", defaultUnits: "imperial" },
  "zh-hant": { direction: "ltr", defaultCurrency: "TWD", defaultUnits: "metric" },
  de: { direction: "ltr", defaultCurrency: "EUR", defaultUnits: "metric" },
  ar: { direction: "rtl", defaultCurrency: "USD", defaultUnits: "metric" },
} as const;
```

## 4. RTL Layout Rules

### Use Logical CSS

Production components must use logical properties:

```css
padding-inline: 16px;
margin-inline-start: 8px;
border-inline-start: 2px solid var(--color-accent);
inset-inline-end: 12px;
text-align: start;
inline-size: 100%;
```

Avoid physical layout declarations in shared components:

```css
/* Avoid */
margin-left: 8px;
padding-right: 16px;
left: 0;
text-align: right;
```

Physical properties are allowed only for truly physical media behavior, such as a fixed print crop edge.

### Mirror Structure, Not Everything

Mirror in RTL:

- Header navigation flow and utility placement.
- Input/result columns in the calculator workspace.
- Back/forward arrows, chevrons, undo/redo, and directional progress connectors.
- Icon/text order when the icon communicates movement.
- Drawer and tooltip attachment sides.

Do not mirror:

- The zaps.work wordmark.
- Numbers, formulas, charts, clocks, play icons, download icons, and checkmarks.
- File formats, email addresses, URLs, quote IDs, model names, and G-code.
- Product screenshots that depict an explicitly LTR document, unless a localized RTL version exists.

On desktop, the Arabic calculator starts with input controls on the right and results on the left. On mobile, both directions use the same vertical task order: inputs, results, breakdown, quote.

### Mixed-Direction Content

Isolate user and technical content:

```html
<bdi>{customerName}</bdi>
<span dir="ltr">QT-2026-0078</span>
<span dir="ltr">hello@example.com</span>
```

Rules:

- Numeric inputs, URLs, email, quote IDs, filenames, formulas, and technical codes remain LTR.
- Surround unknown user-generated inline text with `<bdi>`.
- Do not manually insert Unicode direction-control characters into translated strings.
- Use message placeholders instead of concatenating label, value, unit, and punctuation.

## 5. Typography Across Scripts

Use script-aware font tokens:

```css
:root {
  --font-ui-latin: Inter, "Helvetica Neue", Arial, sans-serif;
  --font-ui-arabic: "Noto Sans Arabic", Tahoma, Arial, sans-serif;
  --font-ui: var(--font-ui-latin);
}

html[lang^="ar"] {
  --font-ui: var(--font-ui-arabic);
}
```

Rules:

- Use a tested Arabic UI font with full shaping and numeric glyph coverage.
- Do not apply letter spacing or uppercase transforms to Arabic.
- Allow Arabic body copy a slightly taller line height when needed.
- Do not force Latin weight values to look identical across scripts; match visual emphasis.
- Embed the required script font in generated PDFs.
- Keep technical and monetary values visually stable without making all localized copy monospace.

## 6. Resilient Components

Design for 30-40% text expansion before translation begins.

Required behavior:

- Text buttons use padding and minimum height, not fixed width.
- Labels may wrap to two lines without moving neighboring controls incoherently.
- Segmented controls wrap, scroll, or become a select menu when labels no longer fit.
- Tabs remain reachable and do not truncate the active label silently.
- Input suffixes have reserved inline space and never overlap the value.
- Cards use content-driven height within a row, or equalize deliberately after wrapping.
- Icon-only controls always have localized accessible names and tooltips.
- Status labels avoid fixed English widths such as `Live` or `Soon`.

Do not put critical copy into bitmap assets. Product diagrams should use localized HTML text or have per-locale assets and meaningful alt text.

## 7. Calculator And Quote Formatting

Use platform formatters rather than handcrafted separators:

```ts
new Intl.NumberFormat(locale, {
  style: "currency",
  currency,
  currencyDisplay: "symbol",
}).format(amount);

new Intl.NumberFormat(locale, {
  style: "percent",
  maximumFractionDigits: 1,
}).format(margin);
```

Rules:

- Store money in minor units or a defined decimal representation.
- Store dates as ISO values and render with locale-aware formatters.
- Store measurements in canonical units and convert for display.
- Never parse a formatted display string as the source calculation value.
- Decimal separator, grouping separator, currency position, and percent spacing follow locale.
- The chosen numbering system is a user/document preference, not an assumption about Arabic.

Translated validation messages must name the localized field and keep the entered value isolated when needed.

## 8. Quote Preview And PDF

The quote document has its own locale and direction independent of the current UI.

The export payload includes:

```ts
type DocumentPreferences = {
  locale: string;
  direction: "ltr" | "rtl";
  currency: string;
  unitSystem: "metric" | "imperial";
  numberSystem: string;
  timeZone: string;
};
```

RTL quote requirements:

- Customer and company columns follow document direction.
- Amount columns remain consistently aligned by numeric value.
- Quote ID, email, URL, SKU, and tax identifiers are direction-isolated.
- Tables preserve logical reading order for screen readers and copied text.
- Arabic glyph shaping and font embedding are verified in the generated PDF.
- PDF text remains selectable; do not rasterize the full document.

Document identity requirements:

- Use the user's editable company name and optional company profile fields.
- Do not place the zaps.work wordmark, URL, watermark, or promotional footer in the customer document.
- If no company identity is supplied, export a neutral unbranded document.
- Localize company address, tax identifiers, and contact-field labels without translating user-entered values.

## 9. Language Switcher

The switcher must:

- Display each language in its own language, such as `English`, `简体中文`, and `العربية`.
- Preserve the equivalent page or tool when changing locale.
- Store the explicit preference in a cookie or account preference later.
- Never reset calculator inputs solely because the UI locale changed.
- Warn only when switching requires unit or currency conversion that changes displayed values.
- Remain keyboard and screen-reader accessible.

Currency behavior:

- Currency is a global preference shared by the homepage and every tool page.
- MVP currencies are `USD`, `TWD`, `EUR`, and `GBP`.
- Language switching never changes currency automatically.
- If the quote is untouched, a currency change may load a sensible localized example.
- If the user has edited the quote, changing currency updates formatting and units but does not silently convert numeric values.
- Production exchange conversion requires a dated rate source and an explicit user action.

Do not use country flags as language labels. Languages are not one-to-one with countries.

## 10. Accessibility

- Set the correct page `lang` and `dir` at the document root.
- Mark passages in another language with a local `lang` attribute.
- Keep DOM order consistent with logical reading and keyboard order.
- Use `start` and `end` alignment rather than visual left/right instructions in copy.
- Localize accessible names, error announcements, tooltips, and PDF labels.
- Confirm focus indicators and popover placement in both directions.
- Avoid instructions such as "click the button on the right".

## 11. Analytics And Privacy

Store these dimensions separately when relevant:

```text
ui_locale
content_locale
direction
currency
unit_system
number_system
document_locale
document_direction
```

Use them to answer product questions, not to infer sensitive identity. Do not store free-text customer data merely to analyze language usage.

Recommended events:

```text
locale_detected
locale_changed
currency_changed
unit_system_changed
document_locale_changed
rtl_layout_rendered
quote_exported
```

## 12. Implementation Shape

Recommended App Router structure:

```text
app/
  [locale]/
    layout.tsx
    page.tsx
    tools/
      [toolSlug]/page.tsx
i18n/
  config.ts
  routing.ts
  dictionaries/
    en.json
    zh-Hant.json
    ar.json
  messages/
  formatters.ts
  direction.ts
```

Implementation rules:

- Validate locale parameters against a typed allowlist and return 404 for unsupported values.
- Load only the active server-side dictionary into rendered output.
- Generate static parameters for public locale pages where practical.
- Generate metadata, canonical URLs, alternates, and structured data from one route map.
- Use translation keys by meaning, not by copying English sentences into key names.
- Keep calculator schemas and formulas locale-neutral.

## 13. Release Order

Foundation release:

- English production content.
- Locale-prefixed routing.
- Direction-aware components.
- Currency and unit preferences separated from locale.
- Pseudo-localization and RTL test locales available internally.

Expansion release:

- Choose languages from Search Console demand and product usage.
- Complete content and keyword research per locale.
- Add Arabic only after full calculator, quote preview, and PDF RTL QA passes.

Arabic support is an architecture requirement now, not necessarily a day-one content promise.

## 14. Test Matrix

Minimum representative locales:

| Locale | Purpose |
|---|---|
| `en-US` | LTR baseline and imperial defaults |
| `de-DE` | Long-label stress test |
| `zh-Hant` | Traditional Chinese typography and compact labels |
| `ar-SA` | RTL, Arabic shaping, and mixed-direction data |

Test each representative locale across:

- Desktop and mobile.
- Light and dark themes.
- Keyboard-only navigation.
- Calculator input, result, breakdown, preview, and PDF.
- 200% browser zoom.
- Empty, error, loading, and long-content states.
- Real currency, percent, date, unit, email, URL, and quote-ID examples.

Add two development-only pseudo-locales:

- Expanded LTR text at roughly 40% extra length.
- Mirrored RTL text with mixed Latin and numeric values.

## 15. Acceptance Checklist

- [ ] English pages use unprefixed canonicals; every additional language uses a locale-prefixed canonical URL.
- [ ] Complete locale equivalents have reciprocal `hreflang` and `x-default`.
- [ ] `<html>` has correct `lang` and `dir`.
- [ ] Shared layout CSS uses logical properties.
- [ ] Directional icons mirror; neutral icons and the logo do not.
- [ ] Buttons, tabs, labels, and cards survive 40% text expansion.
- [ ] Currency, numbers, dates, percentages, and units use locale-aware formatters.
- [ ] Technical and user-generated mixed-direction strings are isolated.
- [ ] UI locale, currency, units, and document locale can change independently.
- [ ] Arabic quote preview and PDF pass shaping, alignment, selection, and copy tests.
- [ ] Metadata, structured data, FAQ, and internal links are localized.
- [ ] Language switching preserves the equivalent route and calculator state.

## 16. Primary References

- Google Search Central, multilingual and multi-regional sites: https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites
- W3C Internationalization, authoring HTML for right-to-left scripts: https://www.w3.org/International/docs/bp-html-bidi/Overview
- MDN, CSS logical properties and values: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values
- MDN, CSS direction and the HTML `dir` preference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/direction
- Next.js App Router internationalization guide: https://nextjs.org/docs/app/guides/internationalization
