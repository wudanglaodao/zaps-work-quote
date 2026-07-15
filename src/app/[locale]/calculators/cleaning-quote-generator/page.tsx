import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { BrushCleaning } from "lucide-react";
import { CleaningCalculator } from "@/components/cleaning-calculator";
import { JsonLd } from "@/components/json-ld";
import { htmlLanguage, isLocale, type Locale } from "@/lib/i18n/config";
import { getCleaningCopy } from "@/lib/i18n/cleaning";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const path = "calculators/cleaning-quote-generator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getCleaningCopy(locale);
  return buildMetadata({ locale, path, title: copy.title, description: copy.description });
}

export function CleaningView({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = getCleaningCopy(locale);
  const url = `${siteConfig.url}${localizedPath(locale, path)}`;
  const structuredData = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: copy.heading, description: copy.description, url, applicationCategory: "BusinessApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript", offers: { "@type": "Offer", price: "0", priceCurrency: ({ en: "USD", "zh-hant": "TWD", "zh-hans": "CNY", de: "EUR", ja: "JPY", es: "EUR", fr: "EUR", "pt-br": "BRL", ko: "KRW" } as const)[locale] }, inLanguage: htmlLanguage(locale) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "zaps.work", item: `${siteConfig.url}${localizedPath(locale)}` }, { "@type": "ListItem", position: 2, name: dictionary.common.tools, item: `${siteConfig.url}${localizedPath(locale, "calculators")}` }, { "@type": "ListItem", position: 3, name: copy.heading, item: url }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.faq.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })) },
  ];
  return <article className="tool-page"><JsonLd data={structuredData} /><header className="shell tool-intro"><span className="tool-icon"><BrushCleaning aria-hidden="true" /></span><div><h1>{copy.heading}</h1><p>{copy.intro}</p></div></header><CleaningCalculator locale={locale} dictionary={dictionary} /><p className="shell tool-privacy-note">{copy.privacyNote}</p><section className="section seo-content"><div className="shell seo-grid"><div><p className="section-kicker">Method</p><h2>{copy.methodologyTitle}</h2><p>{copy.methodologyBody}</p><Link className="seo-guide-link" href={localizedPath(locale, "guides/how-to-price-house-cleaning-jobs")}>{copy.guideLink}</Link></div><div><h2>{copy.faqTitle}</h2><div className="faq-list">{copy.faq.map((entry) => <details key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>)}</div></div></div></section></article>;
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "en") permanentRedirect("/calculators/cleaning-quote-generator");
  return <CleaningView locale={locale} />;
}
