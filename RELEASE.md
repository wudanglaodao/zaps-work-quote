# zaps.work Release Runbook

## Production Stack

- GitHub: `wudanglaodao/zaps-work-quote`
- Hosting and previews: Vercel
- Database and aggregate product analytics: Cloudflare D1
- Public traffic analytics: Vercel Web Analytics and Speed Insights

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

Copy `.env.example` to `.env.local` for local development. Configure the same names in Vercel for Preview and Production.

`CLOUDFLARE_D1_API_TOKEN` is server-only. Never prefix it with `NEXT_PUBLIC_` or expose it in the browser.

## Cloudflare D1

1. Create a D1 database named `zaps-work-analytics` in Cloudflare.
2. Apply `cloudflare/d1/migrations/0001_analytics_events.sql` in the D1 dashboard or with Wrangler before deploying code that writes events.
3. Create a Cloudflare API token scoped only to this database with `D1 Read` and `D1 Write` permissions.
4. Set `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, and `CLOUDFLARE_D1_API_TOKEN` in Vercel for Preview and Production.

## Vercel

1. Import the GitHub repository.
2. Keep `main` as the production branch.
3. Add `zaps.work` as the canonical production host. Keep `www.zaps.work`, `quote.loeme.com`, and `www.quote.loeme.com` attached to this project so Proxy can return a path- and query-preserving `301` to the canonical host.
4. Set `NEXT_PUBLIC_SITE_URL=https://zaps.work` in every environment.
5. Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-7HE8VQXGTQ` in Preview and Production.
6. Enable Web Analytics and Speed Insights.
7. Verify the Preview deployment before merging to `main`.

## GitHub

1. Push this repository to `wudanglaodao/zaps-work-quote`.
2. Keep branch protection on `main` after the first release.
3. Require the `quality` GitHub Actions job before merging.
4. Let Vercel create Preview deployments for pull requests and Production deployments from `main`.
5. Use GitHub as the release source of truth; do not run manual production deployments during the normal release flow.

## Release Flow

1. Confirm the release version and update the newest entry in `DEVELOPMENT_LOG.md`.
2. Apply any pending Cloudflare D1 migrations.
3. Run `npm run check` locally.
4. Push a feature branch and verify its Vercel Preview deployment.
5. Merge into `main`; Vercel deploys Production from the GitHub commit.
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
