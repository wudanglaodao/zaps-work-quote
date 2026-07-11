# zaps.work Release Runbook

## Production Stack

- GitHub: `wudanglaodao/zaps-work-quote`
- Hosting and previews: Vercel
- Database and aggregate product analytics: Supabase Postgres
- Public traffic analytics: Vercel Web Analytics and Speed Insights

## Launch Routes

- `/`
- `/zh-hant`
- `/de`
- `/ja`
- `/es`
- `/fr`
- `/pt-br`
- `/ko`
- `/tools/3d-print-cost-calculator`
- `/zh-hant/tools/3d-print-cost-calculator`
- `/de/tools/3d-print-cost-calculator`
- `/ja/tools/3d-print-cost-calculator`
- `/es/tools/3d-print-cost-calculator`
- `/fr/tools/3d-print-cost-calculator`
- `/pt-br/tools/3d-print-cost-calculator`
- `/ko/tools/3d-print-cost-calculator`
- `/tools/pressure-washing-quote`
- `/zh-hant/tools/pressure-washing-quote`
- `/de/tools/pressure-washing-quote`
- `/ja/tools/pressure-washing-quote`
- `/es/tools/pressure-washing-quote`
- `/fr/tools/pressure-washing-quote`
- `/pt-br/tools/pressure-washing-quote`
- `/ko/tools/pressure-washing-quote`
- `/tools/laser-cutting-cost-calculator`
- `/zh-hant/tools/laser-cutting-cost-calculator`
- `/de/tools/laser-cutting-cost-calculator`
- `/ja/tools/laser-cutting-cost-calculator`
- `/es/tools/laser-cutting-cost-calculator`
- `/fr/tools/laser-cutting-cost-calculator`
- `/pt-br/tools/laser-cutting-cost-calculator`
- `/ko/tools/laser-cutting-cost-calculator`
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/api/health`

## Environment Variables

Copy `.env.example` to `.env.local` for local development. Configure the same names in Vercel for Preview and Production.

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Never prefix it with `NEXT_PUBLIC_`.

## Supabase

1. Create a Supabase project in the region closest to the expected users.
2. Apply every SQL file in `supabase/migrations` in filename order before deploying code that depends on it.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel.
4. Confirm that `anon` and `authenticated` cannot select or insert into `analytics_events`.

## Vercel

1. Import the GitHub repository.
2. Keep `main` as the production branch.
3. Add `zaps.work` and `www.zaps.work`; redirect one host to the canonical host.
4. Set `NEXT_PUBLIC_SITE_URL=https://zaps.work` in every environment.
5. Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` in Preview and Production.
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
2. Apply any pending Supabase migrations.
3. Run `npm run check` locally.
4. Push a feature branch and verify its Vercel Preview deployment.
5. Merge into `main`; Vercel deploys Production from the GitHub commit.
6. Verify `/api/health` and the changed user flow on `https://www.zaps.work`.
7. Mark the log entry as released, use the production date, and add the final link or screenshots needed for the blog post.

## SEO Launch Checklist

- Verify every supported locale route returns `200` and contains one language only.
- Confirm legacy `/en` routes permanently redirect to unprefixed English equivalents and are not indexed as duplicate content.
- Inspect canonical and `hreflang` links, including `x-default`.
- Verify `/llms.txt` returns the current public page map and privacy boundary.
- Submit `https://zaps.work/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- Verify the domain property and both protocol/host redirects.
- Run Rich Results Test for the tool page.
- Confirm localized visible FAQ matches FAQ structured data.
- Confirm `/api`, Preview URLs, and admin routes are not indexed.
- Confirm the PDF includes only filled optional fields and no zaps.work branding.
- Open the CSV in Excel or Numbers and verify UTF-8 text, currency, and formulas remain inert.
- Check Core Web Vitals on mobile after production traffic begins.

## Release Gate

```bash
npm run check
```

The command must pass lint, TypeScript, unit tests, and production build.
