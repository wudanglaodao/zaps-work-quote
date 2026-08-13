# zaps.work Technical Architecture

Version: 2026-07-13

## 1. Product Direction

zaps.work is a free, multilingual library of cost calculators and quote generators. The release strategy is:

1. Publish useful tools without login or paywalls.
2. Build search traffic through complete localized tool pages.
3. Measure aggregate product usage without collecting quote PII.
4. Add more scenarios from validated demand.
5. Consider ads only after traffic is meaningful, outside the calculator workspace.

The current production tools are `3D Print Cost Calculator`, `Pressure Washing Quote Generator`, and `Laser Cutting Cost Calculator`. `Cleaning Quote Generator` is implemented and ready for release; `House Painting Quote Calculator` is the next planned scenario after production validation.

Every new scenario ships as a complete vertical release: calculator or quote workflow, customer quote export, localized page-level SEO, sitemap entries, an updated `llms.txt`, and at least one directly related operating or pricing guide. A tool is not considered released when only its form and calculation logic are complete.

## 2. Architecture Decisions

```text
GitHub
        -> Cloudflare Workers / Next.js App Router via OpenNext
       -> static localized pages and metadata
       -> client-side calculator and document exports
       -> server-only analytics API
            -> Cloudflare D1
```

- One Next.js application owns public pages, tools, metadata, API routes, and future admin pages.
- Calculators are client-side, deterministic pure TypeScript functions validated by Zod.
- PDF and CSV exports are generated in the browser for a fast, no-login MVP.
- All quote-entered content, including company details, customer names, contact details, addresses, item names, quote numbers, notes, and terms, remains in the browser.
- Cloudflare D1 stores only allowlisted aggregate product events. New events may include a keyed HMAC-SHA-256 IP hash, browser-reported time zone, and coarse Cloudflare location fields; plaintext IP addresses are never stored.
- Cloudflare Workers handles deployments, previews, custom domains, and the Worker runtime.
- No ORM is required for the MVP's single append-only analytics table. Add a typed query layer only when the domain schema grows.

## 3. Runtime Stack

| Layer | Choice | Responsibility |
| --- | --- | --- |
| Source | GitHub | Review, CI, production branch |
| Web | Next.js 16, React 19, TypeScript | App Router pages, APIs, metadata |
| Validation | Zod | Inputs and analytics payload contracts |
| Calculation | Pure TypeScript | Shared deterministic formulas |
| UI | CSS tokens, Lucide icons | Light/dark and responsive interface |
| Database | Cloudflare D1 | Aggregate analytics events |
| Hosting | Cloudflare Workers + OpenNext | CDN, Worker runtime, previews, custom domains |
| Tests | Vitest, ESLint, TypeScript | Formula and release safety |

## 4. Locale And SEO Routing

Every indexable language has a stable path prefix:

```text
/
/calculators/3d-print-cost-calculator
/zh-hant
/zh-hant/tools
/zh-hant/calculators/3d-print-cost-calculator
/de
/de/tools
/de/calculators/3d-print-cost-calculator
/ja
/ja/tools
/ja/calculators/3d-print-cost-calculator
/es
/es/tools
/es/calculators/3d-print-cost-calculator
/fr
/fr/tools
/fr/calculators/3d-print-cost-calculator
/pt-br
/pt-br/tools
/pt-br/calculators/3d-print-cost-calculator
/ko
/ko/tools
/ko/calculators/3d-print-cost-calculator
```

Rules:

- English is the default language and uses unprefixed canonical URLs.
- Legacy `/en/...` URLs permanently redirect to the matching unprefixed English route.
- Each supported language has its own indexable URL: English, Traditional Chinese, German, Japanese, Spanish, French, Brazilian Portuguese, and Korean.
- Every page has a self-referencing canonical.
- Every equivalent page has reciprocal `en`, `zh-Hant`, `de`, `ja`, `es`, `fr`, `pt-BR`, `ko`, and `x-default` alternates; `x-default` points to English.
- The XML sitemap is a styled sitemap index with separate page and tool child sitemaps.
- Each child sitemap repeats the same reciprocal language alternate mapping and `x-default` English fallback.
- `/sitemap.xsl` is only a human-readable browser view; crawlers still receive standard sitemap XML.
- `<html lang>` and `dir` come from the locale configuration.
- Page title, description, visible FAQ, structured data, Open Graph metadata, and internal links use the same locale.
- Tool slugs remain stable in English during the first release. Localized slugs can be introduced later only with permanent redirects and measured search demand.
- Language and currency are independent preferences. Currency changes formatting and calculations, not the indexed URL.
- Simplified Chinese (`zh-hans`) is the next candidate after terminology review.
- Future Arabic uses `/ar/...`, `dir="rtl"`, logical CSS properties, localized metadata, and an RTL document template; it must not ship as a thin translation.

Current SEO outputs:

- `robots.txt`
- `sitemap.xml`
- localized canonical and `hreflang`
- `WebApplication`, `BreadcrumbList`, and `FAQPage` JSON-LD
- localized visible methodology and FAQ content
- web manifest and social metadata

## 5. Tool Model

Each tool is registered with a stable identity and localized presentation:

```ts
type ToolDefinition = {
  slug: string;
  status: "live" | "soon";
  category: "fabrication" | "local-services" | "creative";
  toolVersion: string;
  formulaVersion: string;
  seo: LocalizedSeoMetadata;
};
```

Calculation modules own:

- Zod input schema.
- Default values.
- Deterministic cost and pricing formulas.
- Formula version.
- Unit tests for totals, margin, quantities, and minimum fees.
- Optional-group state and the effective input used when a group is disabled.

Optional input rule:

- A non-required group may be disabled by default to keep the common path focused.
- Disabled groups preserve their local draft values but contribute zero values to calculations, breakdowns, exports, and analytics snapshots.
- Each tool must test enabled, disabled, and re-enabled states so hidden inputs cannot continue affecting the quote.

The tool page shell owns:

- Locale and currency preferences.
- Multiple item editing.
- Results, breakdown, quote preview, and exports.
- Event names and aggregate metrics.
- Localized educational and SEO content.

## 6. 3D Print Calculation Flow

```text
User edits item or shared assumptions
  -> Zod validation
  -> calculate each item
  -> aggregate material, machine, electricity, labor, risk, and extras
  -> apply target margin or markup
  -> apply minimum fee, shipping, and tax
  -> render result and quote preview
```

The browser never depends on Cloudflare D1 for a calculation. A database outage must not prevent using the calculator or exporting a quote.

## 7. PDF And CSV Exports

### PDF

- Uses a dedicated A4 print portal, not a screenshot of the application.
- Includes the user's company name and only optional fields that were filled in.
- Supports multiple line items, quantity, unit price, amount, subtotal, tax, and total.
- Does not add zaps.work branding to the customer document.
- Uses print-specific CSS and browser Save as PDF for the MVP.

### CSV

- Exports UTF-8 with a BOM for spreadsheet compatibility.
- Includes line items and quote totals.
- Escapes CSV values and neutralizes spreadsheet formula injection.
- Uses the selected currency code and locale-independent numeric values.

Later, authenticated quote history may use server-generated PDF files and object storage. That phase requires explicit consent, retention rules, and delete/export controls.

## 8. Analytics And Privacy Boundary

The browser posts to `POST /api/events`. The route:

- Rejects payloads larger than 4 KB.
- Validates a strict event-name and property allowlist with Zod.
- Uses the Cloudflare D1 `DB` binding only on the server.
- Derives `ip_hash` from the trusted Cloudflare client-IP header with the server-only `ANALYTICS_IP_HASH_SECRET`; missing secrets result in `NULL`, never plaintext fallback.
- Returns `503` for an analytics event when D1 is not configured, without blocking calculator use or document export.
- Never accepts or stores company names, customer details, quote numbers, addresses, emails, notes, item names, quote fields, or full calculator snapshots.

Allowed examples:

```text
calculator_used
pdf_exported
csv_exported
summary_copied
```

Allowed properties are aggregate dimensions such as tool slug, locale, currency, item count, export type, and formula version.

Cloudflare D1 access policy:

- The D1 database is exposed to the Worker only through the `DB` binding.
- Wrangler controls the binding; no database token is shipped to the browser.
- The browser has no database credentials and can only call the validated Next.js route.
- Production access happens through the schema-validated Next.js route.

## 9. Security Baseline

- The D1 `DB` binding must never be exposed through a `NEXT_PUBLIC_` variable.
- `ANALYTICS_IP_HASH_SECRET` must remain a Cloudflare Worker secret and must never be committed or sent to the browser.
- Secrets and local Worker variables exist only in Cloudflare Worker bindings and ignored local files.
- Security headers disable MIME sniffing, framing, camera, microphone, and geolocation.
- Public API payloads are size-limited and schema-validated.
- CSV export guards against spreadsheet formula injection.
- Dependencies and the full quality gate run before release.
- Rate limiting can be added at the Cloudflare layer if event abuse appears.

## 10. Repository Structure

```text
src/
  app/
    [locale]/
      page.tsx
      tools/
      privacy/
    api/
      events/
      health/
    robots.ts
    sitemap.xml/route.ts
    pages-sitemap.xml/route.ts
    calculators-sitemap.xml/route.ts
    sitemap.xsl/route.ts
  components/
  lib/
    analytics/
    calculators/
    i18n/
    sitemap.ts
    tools/
cloudflare/
  d1/
    migrations/
public/
  assets/
```

## 11. Deployment Flow

```text
feature branch
  -> GitHub pull request
  -> GitHub Actions: lint + typecheck + tests + production build
  -> Cloudflare Workers preview
  -> merge to main
  -> Cloudflare Workers Production
  -> zaps.work
```

Production environment variables:

```text
NEXT_PUBLIC_SITE_URL=https://zaps.work

Worker binding:
DB -> zaps-work-analytics (Cloudflare D1)
```

The database token is never available to client-side code. The current calculator does not require customer accounts or browser database access.

## 12. Release Phases

### Phase 1: Publish

- English and Traditional Chinese homepage and tool routes.
- 3D Print Cost Calculator.
- Multiple items, PDF, CSV, copy summary.
- Localized metadata, sitemap, robots, and structured data.
- Privacy-safe analytics endpoint.

### Phase 2: Learn

- Connect Cloudflare D1 and build aggregate reports.
- Measure tool views, completed calculations, exports, locale, and currency.
- Add guides based on actual search intent.
- Tune performance and Core Web Vitals from production data.

### Phase 3: Expand

- Cleaning Quote Generator.
- More fabrication and local-service tools.
- Arabic only after full RTL UI, metadata, and PDF QA.
- Optional accounts and saved quote history only if repeat usage justifies them.

### Phase 4: Monetize

- Keep the core calculators free and usable without registration.
- Evaluate first-party workflow features only after repeat usage justifies them.
