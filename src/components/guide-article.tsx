import Link from "next/link";
import { ArrowRight, CalendarDays, Calculator, CheckCircle2, Clock3, List } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { htmlLanguage, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export type GuideFaq = { question: string; answer: string };
export type GuideTocItem = { id: string; label: string };
export type GuideLabels = {
  home: string;
  guides: string;
  guide: string;
  category: string;
  updated: string;
  by: string;
  onThisPage: string;
  toolTitle: string;
  toolDescription: string;
  freeNoSignup: string;
  commonQuestions: string;
  faqTitle: string;
  finalKicker: string;
  finalTitle: string;
};

const englishLabels: GuideLabels = {
  home: "Home", guides: "Guides", guide: "Guide", category: "Pricing & quoting", updated: "Updated", by: "By zaps.work",
  onThisPage: "On this page", toolTitle: "Put the formula to work", toolDescription: "Use your own costs and target margin to build a quote in the free calculator.",
  freeNoSignup: "Free · No sign-up", commonQuestions: "Common questions", faqTitle: "Frequently asked questions", finalKicker: "Build your quote",
  finalTitle: "Use your numbers, not a generic market average.",
};

export function GuideArticle({ locale = "en", labels = englishLabels, title, description, published, updated, readingTime, slug, toolHref, toolLabel, toc, faq, children }: {
  locale?: Locale; labels?: GuideLabels;
  title: string; description: string; published: string; updated: string; readingTime: string; slug: string;
  toolHref: string; toolLabel: string; toc: GuideTocItem[]; faq: GuideFaq[]; children: React.ReactNode;
}) {
  const homeHref = localizedPath(locale);
  const guidesHref = localizedPath(locale, "guides");
  const url = `${siteConfig.url}${localizedPath(locale, `guides/${slug}`)}`;
  const graph = [
    { "@context": "https://schema.org", "@type": "Article", headline: title, description, datePublished: published, dateModified: updated, mainEntityOfPage: url, inLanguage: htmlLanguage(locale), author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url }, publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.home, item: `${siteConfig.url}${homeHref}` },
      { "@type": "ListItem", position: 2, name: labels.guides, item: `${siteConfig.url}${guidesHref}` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ];

  return <>
    <JsonLd data={graph} />
    <article className="guide-article">
      <header className="guide-hero shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={homeHref}>{labels.home}</Link><span aria-hidden="true">/</span><Link href={guidesHref}>{labels.guides}</Link></nav>
        <p className="guide-type"><span>{labels.guide}</span> {labels.category}</p><h1>{title}</h1><p className="guide-deck">{description}</p>
        <div className="guide-meta"><span><CalendarDays aria-hidden="true" /> {labels.updated} {updated}</span><span><Clock3 aria-hidden="true" /> {readingTime}</span><span>{labels.by}</span></div>
      </header>
      <div className="guide-layout shell">
        <div className="guide-prose">{children}</div>
        <aside className="guide-aside" aria-label={labels.onThisPage}>
          <nav className="guide-toc"><p><List aria-hidden="true" /> {labels.onThisPage}</p><ol>{toc.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ol></nav>
          <div className="guide-tool-card"><div className="guide-tool-icon"><Calculator aria-hidden="true" /></div><h2>{labels.toolTitle}</h2><p>{labels.toolDescription}</p>
            <Link className="button primary" href={toolHref}>{toolLabel}<ArrowRight aria-hidden="true" /></Link><small><CheckCircle2 aria-hidden="true" /> {labels.freeNoSignup}</small>
          </div>
        </aside>
      </div>
      <section className="guide-faq shell" aria-labelledby="guide-faq-title"><p className="section-kicker">{labels.commonQuestions}</p><h2 id="guide-faq-title">{labels.faqTitle}</h2>
        <div className="guide-faq-list">{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      </section>
      <section className="guide-final-cta"><div className="shell"><div><p className="section-kicker">{labels.finalKicker}</p><h2>{labels.finalTitle}</h2></div><Link className="button primary" href={toolHref}>{toolLabel}<ArrowRight aria-hidden="true" /></Link></div></section>
    </article>
  </>;
}
