# zaps.work

Free, multilingual cost calculators and quote generators for real work.

The source code is public so the calculation logic, privacy boundary, and export behavior can be inspected. No quote-entered content is stored in the database. Customer names, emails, addresses, and other customer details stay in the browser.

Repository: [github.com/wudanglaodao/zaps-work-quote](https://github.com/wudanglaodao/zaps-work-quote)

The first live tool is the [3D Print Cost Calculator](https://zaps.work/tools/3d-print-cost-calculator). It supports multiple line items, margin-based pricing, PDF quotes, CSV exports, English, Traditional Chinese, and global currency preferences.

## Stack

- Next.js 16 App Router, React 19, and TypeScript
- Zod schemas and pure calculation functions
- Supabase Postgres for privacy-safe product analytics
- Vercel hosting, previews, Web Analytics, and Speed Insights
- Google Analytics for page-level traffic analysis
- Vitest, ESLint, and TypeScript release checks

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Supabase variables may remain empty during local UI work; analytics then becomes a no-op.

## Quality Gate

```bash
npm run check
```

This runs lint, type checking, unit tests, and a production build.

## International SEO

English uses clean, unprefixed URLs. Other languages use stable locale prefixes:

- `/...`
- `/zh-hant/...`

Each localized page emits a language-specific canonical URL, reciprocal `hreflang` links, and an `x-default` English fallback. The sitemap repeats the same alternate mapping. Legacy `/en/...` routes permanently redirect to their unprefixed English equivalents.

## Data Boundary

Calculations and PDF/CSV generation run in the browser. The analytics API accepts only allowlisted, aggregate product events: tool name, locale, currency, item count, numeric cost/quote/margin metrics, and export event type. It never receives quote-entered content or customer-related information. The service-role key is server-only and the analytics table has Row Level Security enabled.

## Deployment

See [RELEASE.md](./RELEASE.md) for GitHub, Vercel, Supabase, domain, and SEO launch steps. Architecture decisions are documented in [zaps-work_technical_architecture.md](./zaps-work_technical_architecture.md).

## License

MIT. See [LICENSE](./LICENSE).
