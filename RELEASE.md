# zaps.work Release Runbook

## Production Stack

- GitHub: `wudanglaodao/zaps-work-quote`
- Hosting and previews: Cloudflare Workers via OpenNext
- Database and aggregate product analytics: Cloudflare D1
- Page-level traffic analytics: Google Analytics (`G-7HE8VQXGTQ`)

## Launch Routes

- `/`
- `/{locale}` for every supported locale
- `/calculators` and `/{locale}/calculators`
- `/calculators/{tool-slug}` and `/{locale}/calculators/{tool-slug}` for every published calculator
- `/guides/how-to-price-3d-prints`
- `/guides/how-to-price-pressure-washing-jobs`
- `/guides/how-to-price-laser-cutting-jobs`
- `/guides/how-to-price-house-cleaning-jobs`
- Each guide route above under `/zh-hant`, `/de`, `/ja`, `/es`, `/fr`, `/pt-br`, and `/ko`
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/api/health`

## Environment Variables

Copy `.env.example` to `.env.local` for local development. Worker bindings are declared in `wrangler.jsonc`; the D1 database is available to the application as `env.DB`.

## Cloudflare D1

1. Create a D1 database named `zaps-work-analytics`: `npx wrangler d1 create zaps-work-analytics`.
2. Copy the returned database ID into `wrangler.jsonc` as `database_id`.
3. Apply `cloudflare/d1/migrations/0001_analytics_events.sql`: `npx wrangler d1 migrations apply zaps-work-analytics --remote`.
4. Generate binding types with `npm run cf-typegen`.

## Cloudflare Workers

1. Log in with `npx wrangler login`.
2. Set `database_id` in `wrangler.jsonc` and confirm the `DB` binding is present.
3. Run `npm run preview:workers` and verify the site through Wrangler locally.
4. Run `npm run deploy:workers` to publish the Worker.
5. Add `zaps.work` as the Worker custom domain in Cloudflare. Keep `www.zaps.work`, `quote.loeme.com`, and `www.quote.loeme.com` attached during the migration so the application can return path- and query-preserving `301` redirects.
6. Verify `/api/health` and the changed user flow on `https://zaps.work`.

## GitHub

1. Push this repository to `wudanglaodao/zaps-work-quote`.
2. Keep branch protection on `main` after the first release.
3. Require the `quality` GitHub Actions job before merging.
4. Configure Cloudflare Workers Builds with `npm run deploy:workers` if deployments should run automatically from `main`.
5. Use GitHub as the release source of truth; do not mix Vercel and Workers production deployments.

## Release Flow

1. Confirm the release version and update the newest entry in `DEVELOPMENT_LOG.md`.
2. Apply any pending Cloudflare D1 migrations.
3. Run `npm run check` locally.
4. Push a feature branch and verify `npm run preview:workers` locally or through a Cloudflare preview Worker.
5. Merge into `main`; Cloudflare Workers Builds deploys the production Worker.
6. Verify `/api/health` and the changed user flow on `https://zaps.work`.
7. Mark the log entry as released, use the production date, and add the final link or screenshots needed for the blog post.

## SEO Launch Checklist

- Confirm the new tool has a defined primary search intent, localized title, description, H1, methodology content, and visible FAQ.
- Publish or update at least one directly related operating, pricing, or quote guide and add reciprocal links between the guide and tool.
- Verify every supported locale route returns `200` and contains one language only.
- Confirm legacy `/en` routes permanently redirect to unprefixed English equivalents and are not indexed as duplicate content.
- Inspect canonical and `hreflang` links, including `x-default`.
- Verify the tool and all localized equivalents appear in `calculators-sitemap.xml`; verify its guide and localized equivalents appear in `guides-sitemap.xml`.
- Update `/llms.txt` with the new tool, related guide, capabilities, and current public URLs; verify the production file returns the current public page map and privacy boundary.
- Submit `https://zaps.work/sitemap.xml` to Google Search Console and Bing Webmaster Tools, then submit the old sitemap once more so crawlers observe the permanent migration.
- Verify the domain property and that `quote.loeme.com`, `www.quote.loeme.com`, and `www.zaps.work` permanently redirect every path and query to `zaps.work`.
- Run Rich Results Test for the tool page.
- Confirm localized visible FAQ matches FAQ structured data.
- Confirm `/api`, Preview URLs, and admin routes are not indexed.
- Confirm the PDF includes only filled optional fields and no obsolete zaps.work branding.
- Open the CSV in Excel or Numbers and verify UTF-8 text, currency, and formulas remain inert.
- Check Core Web Vitals on mobile after production traffic begins.

## Release Gate

```bash
npm run check
```

The command must pass lint, TypeScript, unit tests, and production build.
