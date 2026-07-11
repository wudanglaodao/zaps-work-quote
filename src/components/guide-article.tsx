import Link from "next/link";
import { ArrowRight, CalendarDays, Calculator, CheckCircle2, Clock3, List } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site";

export type GuideFaq = { question: string; answer: string };
export type GuideTocItem = { id: string; label: string };

export function GuideArticle({ title, description, published, updated, readingTime, slug, toolHref, toolLabel, toc, faq, children }: {
  title: string; description: string; published: string; updated: string; readingTime: string; slug: string;
  toolHref: string; toolLabel: string; toc: GuideTocItem[]; faq: GuideFaq[]; children: React.ReactNode;
}) {
  const url = `${siteConfig.url}/guides/${slug}`;
  const graph = [
    { "@context": "https://schema.org", "@type": "Article", headline: title, description, datePublished: published, dateModified: updated, mainEntityOfPage: url, author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url }, publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ];

  return <>
    <JsonLd data={graph} />
    <article className="guide-article">
      <header className="guide-hero shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/guides">Guides</Link></nav>
        <p className="guide-type"><span>Guide</span> Pricing &amp; quoting</p><h1>{title}</h1><p className="guide-deck">{description}</p>
        <div className="guide-meta"><span><CalendarDays aria-hidden="true" /> Updated {updated}</span><span><Clock3 aria-hidden="true" /> {readingTime}</span><span>By zaps.work</span></div>
      </header>
      <div className="guide-layout shell">
        <div className="guide-prose">{children}</div>
        <aside className="guide-aside" aria-label="On this page">
          <nav className="guide-toc"><p><List aria-hidden="true" /> On this page</p><ol>{toc.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ol></nav>
          <div className="guide-tool-card"><div className="guide-tool-icon"><Calculator aria-hidden="true" /></div><h2>Put the formula to work</h2><p>Use your own costs and target margin to build a quote in the free calculator.</p>
            <Link className="button primary" href={toolHref}>{toolLabel}<ArrowRight aria-hidden="true" /></Link><small><CheckCircle2 aria-hidden="true" /> Free · No sign-up</small>
          </div>
        </aside>
      </div>
      <section className="guide-faq shell" aria-labelledby="guide-faq-title"><p className="section-kicker">Common questions</p><h2 id="guide-faq-title">Frequently asked questions</h2>
        <div className="guide-faq-list">{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      </section>
      <section className="guide-final-cta"><div className="shell"><div><p className="section-kicker">Build your quote</p><h2>Use your numbers, not a generic market average.</h2></div><Link className="button primary" href={toolHref}>{toolLabel}<ArrowRight aria-hidden="true" /></Link></div></section>
    </article>
  </>;
}
