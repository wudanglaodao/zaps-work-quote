# zaps.work Technical Architecture

Version: 2026-07-10

## 1. Product Direction

zaps.work is a free, multilingual library of cost calculators and quote generators. The release strategy is:

1. Publish useful tools without login or paywalls.
2. Build search traffic through complete localized tool pages.
3. Measure aggregate product usage without collecting quote PII.
4. Add more scenarios from validated demand.
5. Consider ads only after traffic is meaningful, outside the calculator workspace.

The first live tool is `3D Print Cost Calculator`. `Cleaning Quote Generator` is the next planned scenario.

## 2. Architecture Decisions

```text
GitHub
  -> Vercel / Next.js App Router
       -> static localized pages and metadata
       -> client-side calculator and document exports
       -> server-only analytics API
            -> Supabase Postgres
```

- One Next.js application owns public pages, tools, metadata, API routes, and future admin pages.
- Calculators are client-side, deterministic pure TypeScript functions validated by Zod.
- PDF and CSV exports are generated in the browser for a fast, no-login MVP.
- Customer names, contact details, addresses, and quote documents remain in the browser.
- Supabase stores only allowlisted aggregate product events.
- Vercel handles deployments, previews, Web Analytics, and Speed Insights.
- No ORM is required for the MVP's single append-only analytics table. Add a typed query layer only when the domain schema grows.

## 3. Runtime Stack

| Layer | Choice | Responsibility |
| --- | --- | --- |
| Source | GitHub | Review, CI, production branch |
| Web | Next.js 16, React 19, TypeScript | App Router pages, APIs, metadata |
| Validation | Zod | Inputs and analytics payload contracts |
| Calculation | Pure TypeScript | Shared deterministic formulas |
| UI | CSS tokens, Lucide icons | Light/dark and responsive interface |
| Database | Supabase Postgres | Aggregate analytics events |
| Hosting | Vercel | CDN, functions, previews, analytics |
| Tests | Vitest, ESLint, TypeScript | Formula and release safety |

## 4. Locale And SEO Routing

Every indexable language has a stable path prefix:

```text
/
/tools
/tools/3d-print-cost-calculator
/zh-hant
/zh-hant/tools
/zh-hant/tools/3d-print-cost-calculator
```

Rules:

- English is the default language and uses unprefixed canonical URLs.
- Legacy `/en/...` URLs permanently redirect to the matching unprefixed English route.
- English and Traditional Chinese never share one indexable URL.
- Every page has a self-referencing canonical.
- Every equivalent page has reciprocal `en`, `zh-Hant`, and `x-default` alternates; `x-default` points to English.
- The XML sitemap repeats the same alternate mapping.
- `<html lang>` and `dir` come from the locale configuration.
- Page title, description, visible FAQ, structured data, Open Graph metadata, and internal links use the same locale.
- Tool slugs remain stable in English during the first release. Localized slugs can be introduced later only with permanent redirects and measured search demand.
- Language and currency are independent preferences. Currency changes formatting and calculations, not the indexed URL.
- Future Arabic uses `/ar/...`, `dir="rtl"`, logical CSS properties, localized metadata, and an RTL document template.

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

The browser never depends on Supabase for a calculation. A database outage must not prevent using the calculator or exporting a quote.

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
- Uses the Supabase service-role key only on the server.
- Returns `204` without blocking the UI when Supabase is not configured.
- Never accepts company names, customer details, quote numbers, addresses, emails, notes, item names, or full calculator snapshots.

Allowed examples:

```text
tool_view
item_added
item_removed
currency_changed
locale_changed
pdf_exported
csv_exported
summary_copied
```

Allowed properties are aggregate dimensions such as tool slug, locale, currency, item count, export type, and formula version.

Supabase table policy:

- Row Level Security is enabled.
- `anon` and `authenticated` have no direct read or write access.
- Only `service_role` can insert and select analytics events.
- Production access happens through the validated Next.js route.

## 9. Security Baseline

- `SUPABASE_SERVICE_ROLE_KEY` must never use a `NEXT_PUBLIC_` prefix.
- Secrets exist only in Vercel environment variables and local ignored files.
- Security headers disable MIME sniffing, framing, camera, microphone, and geolocation.
- Public API payloads are size-limited and schema-validated.
- CSV export guards against spreadsheet formula injection.
- Dependencies and the full quality gate run before release.
- Rate limiting can be added at the Vercel layer if event abuse appears.

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
    sitemap.ts
  components/
  lib/
    analytics/
    calculators/
    i18n/
    tools/
supabase/
  migrations/
public/
  assets/
```

## 11. Deployment Flow

```text
feature branch
  -> GitHub pull request
  -> GitHub Actions: lint + typecheck + tests + production build
  -> Vercel Preview
  -> merge to main
  -> Vercel Production
  -> zaps.work
```

Production environment variables:

```text
NEXT_PUBLIC_SITE_URL=https://zaps.work
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ANALYTICS_SALT=...
```

The publishable key is reserved for future client-side Supabase features. The current calculator does not require it.

## 12. Release Phases

### Phase 1: Publish

- English and Traditional Chinese homepage and tool routes.
- 3D Print Cost Calculator.
- Multiple items, PDF, CSV, copy summary.
- Localized metadata, sitemap, robots, and structured data.
- Privacy-safe analytics endpoint.

### Phase 2: Learn

- Connect Supabase and build aggregate reports.
- Measure tool views, completed calculations, exports, locale, and currency.
- Add guides based on actual search intent.
- Tune performance and Core Web Vitals from production data.

### Phase 3: Expand

- Cleaning Quote Generator.
- More fabrication and local-service tools.
- Arabic only after full RTL UI, metadata, and PDF QA.
- Optional accounts and saved quote history only if repeat usage justifies them.

### Phase 4: Monetize

- Consider AdSense on educational or related-tool sections.
- Keep ads away from input fields, result panels, and export controls.
- Reserve stable ad dimensions to prevent layout shift.
- Keep all core calculators usable without registration.
