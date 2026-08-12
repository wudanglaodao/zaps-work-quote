import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { NewToolCalculator } from "@/components/new-tool-calculators";
import { htmlLanguage, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getNewToolCopy, type NewToolKind } from "@/lib/i18n/new-tools";
import { localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function NewToolPage({ kind, locale, path, guidePath, Icon }: { kind: NewToolKind; locale: Locale; path: string; guidePath: string; Icon: LucideIcon }) {
  const copy = getNewToolCopy(locale, kind);
  const dictionary = getDictionary(locale);
  const url = `${siteConfig.url}${localizedPath(locale, path)}`;
  const structuredData = [{ "@context": "https://schema.org", "@type": "WebApplication", name: copy.heading, description: copy.description, url, applicationCategory: "BusinessApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript", offers: { "@type": "Offer", price: "0", priceCurrency: ({ en: "USD", "zh-hant": "TWD", "zh-hans": "CNY", de: "EUR", ja: "JPY", es: "EUR", fr: "EUR", "pt-br": "BRL", ko: "KRW" } as const)[locale] }, inLanguage: htmlLanguage(locale) }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.faq.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })) }];
  return <article className="tool-page"><JsonLd data={structuredData} /><header className="shell tool-intro"><span className="tool-icon"><Icon aria-hidden="true" /></span><div><h1>{copy.heading}</h1><p>{copy.intro}</p></div></header><NewToolCalculator kind={kind} locale={locale} dictionary={dictionary} /><section className="section seo-content"><div className="shell seo-grid"><div><p className="section-kicker">Method</p><h2>{copy.methodTitle}</h2><p>{copy.methodBody}</p>{locale === "en" ? <Link className="seo-guide-link" href={`/${guidePath}`}>Read the pricing guide →</Link> : null}</div><div><h2>{copy.faqTitle}</h2><div className="faq-list">{copy.faq.map((entry) => <details key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>)}</div></div></div></section></article>;
}
