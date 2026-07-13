import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ScanLine } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { LaserCuttingCalculator } from "@/components/laser-cutting-calculator";
import { htmlLanguage, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLaserCuttingCopy } from "@/lib/i18n/laser-cutting";
import { buildMetadata, localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const path = "tools/laser-cutting-cost-calculator";
const guideLabels: Record<Locale, string> = {
  en: "Read the complete laser cutting pricing guide →", "zh-hant": "閱讀完整雷射切割報價指南 →", de: "Vollständigen Kalkulationsleitfaden lesen →", ja: "レーザー加工見積ガイドを読む →", es: "Leer la guía completa de corte láser →", fr: "Lire le guide complet de découpe laser →", "pt-br": "Ler o guia completo de corte a laser →", ko: "레이저 절단 견적 가이드 읽기 →",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const copy = getLaserCuttingCopy(rawLocale);
  return buildMetadata({ locale: rawLocale, path, title: copy.title, description: copy.description });
}

export function LaserCuttingView({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = getLaserCuttingCopy(locale);
  const url = `${siteConfig.url}${localizedPath(locale, path)}`;
  const structuredData = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: copy.heading, description: copy.description, url, applicationCategory: "BusinessApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript", offers: { "@type": "Offer", price: "0", priceCurrency: ({ en: "USD", "zh-hant": "TWD", de: "EUR", ja: "JPY", es: "EUR", fr: "EUR", "pt-br": "BRL", ko: "KRW" } as const)[locale] }, inLanguage: htmlLanguage(locale) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "zaps.work", item: `${siteConfig.url}${localizedPath(locale)}` }, { "@type": "ListItem", position: 2, name: dictionary.common.tools, item: `${siteConfig.url}${localizedPath(locale, "tools")}` }, { "@type": "ListItem", position: 3, name: copy.heading, item: url }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.faq.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })) },
  ];
  return <article className="tool-page"><JsonLd data={structuredData} /><header className="shell tool-intro"><span className="tool-icon"><ScanLine aria-hidden="true" /></span><div><h1>{copy.heading}</h1><p>{copy.intro}</p></div></header><LaserCuttingCalculator locale={locale} dictionary={dictionary} /><p className="shell tool-privacy-note">{copy.privacyNote}</p><section className="section seo-content"><div className="shell seo-grid"><div><p className="section-kicker">Method</p><h2>{copy.methodologyTitle}</h2><p>{copy.methodologyBody}</p><Link className="seo-guide-link" href={localizedPath(locale, "guides/how-to-price-laser-cutting-jobs")}>{guideLabels[locale]}</Link></div><div><h2>{copy.faqTitle}</h2><div className="faq-list">{copy.faq.map((entry) => <details key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>)}</div></div></div></section></article>;
}

export default async function LaserCuttingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/tools/laser-cutting-cost-calculator");
  return <LaserCuttingView locale={rawLocale} />;
}
