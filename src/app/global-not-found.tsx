import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleSlash2, House, Wrench } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | zaps.work",
  description: "The requested page could not be found. Browse the free cost calculators and quote tools on zaps.work.",
  robots: { index: false, follow: true },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body className="global-not-found-body">
        <header className="global-not-found-header">
          <Link className="brand" href="/">zaps<span>.</span>work</Link>
          <Link className="global-not-found-header-link" href="/tools">All tools <ArrowRight aria-hidden="true" /></Link>
        </header>
        <main className="global-not-found-main">
          <section className="not-found-page">
            <div className="shell not-found-content">
              <p className="section-kicker"><CircleSlash2 aria-hidden="true" /> Page not found</p>
              <div className="not-found-code" aria-hidden="true">404</div>
              <h1>We couldn&apos;t find that page.</h1>
              <p className="not-found-copy">The link may be outdated, or the page may have moved. Start with the tools and pricing guides that are ready to use.</p>
              <div className="not-found-actions">
                <Link className="button primary" href="/"><House aria-hidden="true" /> Back to home</Link>
                <Link className="home-text-link" href="/tools"><Wrench aria-hidden="true" /><span>Browse tools</span><ArrowRight aria-hidden="true" /></Link>
              </div>
            </div>
          </section>
        </main>
        <footer className="global-not-found-footer"><span>© 2026 zaps.work</span><span>Free cost calculators and quote tools</span></footer>
      </body>
    </html>
  );
}
