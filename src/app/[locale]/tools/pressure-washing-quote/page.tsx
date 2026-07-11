import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Droplets } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { PressureWashingCalculator } from "@/components/pressure-washing-calculator";
import { htmlLanguage, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPressureWashingCopy } from "@/lib/i18n/pressure-washing";
import { buildMetadata, localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const path = "tools/pressure-washing-quote";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale;
  const copy = getPressureWashingCopy(locale);
  return buildMetadata({ locale, path, title: copy.title, description: copy.description });
}

export function PressureWashingView({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = getPressureWashingCopy(locale);
  const url = `${siteConfig.url}${localizedPath(locale, path)}`;
  const structuredData = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: copy.heading, description: copy.description, url, applicationCategory: "BusinessApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript", offers: { "@type": "Offer", price: "0", priceCurrency: ({ en: "USD", "zh-hant": "TWD", de: "EUR", ja: "JPY", es: "EUR", fr: "EUR", "pt-br": "BRL", ko: "KRW" } as const)[locale] }, inLanguage: htmlLanguage(locale) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "zaps.work", item: `${siteConfig.url}${localizedPath(locale)}` }, { "@type": "ListItem", position: 2, name: dictionary.common.tools, item: `${siteConfig.url}${localizedPath(locale, "tools")}` }, { "@type": "ListItem", position: 3, name: copy.heading, item: url }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.faq.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })) },
  ];
  return <article className="tool-page"><JsonLd data={structuredData} /><header className="shell tool-intro"><span className="tool-icon"><Droplets aria-hidden="true" /></span><div><h1>{copy.heading}</h1><p>{copy.intro}</p></div></header><PressureWashingCalculator locale={locale} dictionary={dictionary} /><p className="shell tool-privacy-note">{copy.privacyNote}</p><section className="section seo-content"><div className="shell seo-grid"><div><p className="section-kicker">Method</p><h2>{copy.methodologyTitle}</h2><p>{copy.methodologyBody}</p></div><div><h2>{copy.faqTitle}</h2><div className="faq-list">{copy.faq.map((entry) => <details key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>)}</div></div></div></section></article>;
}

export default async function PressureWashingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/tools/pressure-washing-quote");
  return <PressureWashingView locale={rawLocale} />;
}
