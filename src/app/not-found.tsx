import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleSlash2, House, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found | zaps.work",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <section className="section not-found-page"><div className="shell not-found-content"><p className="section-kicker"><CircleSlash2 aria-hidden="true" />Page not found</p><div className="not-found-code" aria-hidden="true">404</div><h1>We couldn&apos;t find that page.</h1><p className="not-found-copy">The link may be outdated, or the page may have moved. Start with the tools that are ready to use.</p><div className="not-found-actions"><Link className="button primary" href="/"><House aria-hidden="true" />Back to home</Link><Link className="home-text-link" href="/tools"><Wrench aria-hidden="true" /><span>Browse tools</span><ArrowRight aria-hidden="true" /></Link></div></div></section>;
}
