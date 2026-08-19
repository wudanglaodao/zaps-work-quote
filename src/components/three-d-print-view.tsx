"use client";

import Link from "next/link";
import { Box } from "lucide-react";
import { HoleSnapAd } from "@/components/holesnap-ad";
import { JsonLd } from "@/components/json-ld";
import { ThreeDPrintCalculator } from "@/components/three-d-print-calculator";
import { htmlLanguage, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const path = "calculators/3d-print-cost-calculator";
const guideLinkLabels: Record<Locale, string> = {
  en: "Read the complete 3D print pricing guide →",
  "zh-hant": "閱讀完整 3D 列印定價指南 →",
  "zh-hans": "阅读完整 3D 打印定价指南 →",
  de: "Vollständigen 3D-Druck-Preisguide lesen →",
  ja: "3Dプリント価格設定ガイドを読む →",
  es: "Leer la guía completa de precios de impresión 3D →",
  fr: "Lire le guide complet de tarification d’impression 3D →",
  "pt-br": "Ler o guia completo de precificação de impressão 3D →",
  ko: "3D 프린팅 가격 책정 가이드 읽기 →",
  it: "Leggi la guida completa sui prezzi della stampa 3D →",
  nl: "Lees de complete gids voor 3D-print prijzen →",
  pl: "Przeczytaj kompletny poradnik wyceny druku 3D →",
};

const searchContent = {
  en: [
    { heading: "How to calculate 3D printing cost per hour", body: "Start with the printer machine rate: purchase cost, expected maintenance, replacement parts, and realistic billable life. Multiply that rate by print time, then add electricity for the same hours. This gives the time-based production cost, not the complete selling price." },
    { heading: "From production cost to selling price", body: "Add filament and waste, hands-on preparation and post-processing, expected failed-print cost, packaging, overhead, shipping, and any minimum job fee. Apply target margin only after the complete cost is known. The calculator keeps cost, profit, margin, and customer quote separate so underpricing is easier to spot." },
  ],
  de: [
    { heading: "3D-Druck-Kosten pro Stunde berechnen", body: "Beginne mit dem Maschinenstundensatz: Anschaffung, erwartete Wartung, Ersatzteile und realistische abrechenbare Nutzungsdauer. Multipliziere diesen Satz mit der Druckzeit und addiere den Strom für dieselben Stunden. Das ergibt die zeitabhängigen Produktionskosten, aber noch nicht den vollständigen Verkaufspreis." },
    { heading: "Von Druckkosten zum Verkaufspreis", body: "Ergänze Filament und Ausschuss, aktive Vorbereitung und Nachbearbeitung, erwartete Fehldruckkosten, Verpackung, Gemeinkosten, Versand und den Mindestauftragswert. Wende die Zielmarge erst auf die vollständigen Kosten an. Der Rechner trennt Kosten, Gewinn, Marge und Kundenangebot klar voneinander." },
  ],
} as const;

export function ThreeDPrintView({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const url = `${siteConfig.url}${localizedPath(locale, path)}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: dictionary.tool.heading,
      description: dictionary.tool.description,
      url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: ({
          en: "USD",
          "zh-hant": "TWD",
          "zh-hans": "CNY",
          de: "EUR",
          ja: "JPY",
          es: "EUR",
          fr: "EUR",
          "pt-br": "BRL",
          ko: "KRW",
          it: "EUR",
          nl: "EUR",
          pl: "PLN",
        } as const)[locale],
      },
      inLanguage: htmlLanguage(locale),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteConfig.name, item: `${siteConfig.url}${localizedPath(locale)}` },
        { "@type": "ListItem", position: 2, name: dictionary.common.tools, item: `${siteConfig.url}${localizedPath(locale, "calculators")}` },
        { "@type": "ListItem", position: 3, name: dictionary.tool.heading, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: dictionary.tool.faq.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: { "@type": "Answer", text: entry.answer },
      })),
    },
  ];

  return (
    <article className="tool-page">
      <JsonLd data={structuredData} />
      <header className="shell tool-intro">
        <span className="tool-icon">
          <Box aria-hidden="true" />
        </span>
        <div>
          <h1>{dictionary.tool.heading}</h1>
          <p>{dictionary.tool.intro}</p>
        </div>
      </header>
      <ThreeDPrintCalculator locale={locale} dictionary={dictionary} />
      <p className="shell tool-privacy-note">{dictionary.tool.privacyNote}</p>
      <div className="shell holesnap-ad-shell">
        <HoleSnapAd locale={locale} />
      </div>
      <section className="section seo-content">
        <div className="shell seo-grid">
          <div>
            <p className="section-kicker">Method</p>
            <h2>{dictionary.tool.methodologyTitle}</h2>
            <p>{dictionary.tool.methodologyBody}</p>
            <Link className="seo-guide-link" href={localizedPath(locale, "guides/how-to-price-3d-prints")}>
              {guideLinkLabels[locale]}
            </Link>
          </div>
          <div>
            <h2>{dictionary.tool.faqTitle}</h2>
            <div className="faq-list">
              {dictionary.tool.faq.map((entry) => (
                <details key={entry.question}>
                  <summary>{entry.question}</summary>
                  <p>{entry.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
        {locale === "en" || locale === "de" ? (
          <div className="shell seo-detail-grid">
            {searchContent[locale].map((entry) => (
              <div key={entry.heading}>
                <h2>{entry.heading}</h2>
                <p>{entry.body}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </article>
  );
}
