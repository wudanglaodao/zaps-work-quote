"use client";

import Link from "next/link";
import { FoldHorizontal } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SheetMetalBendCalculator } from "@/components/sheet-metal-bend-calculator";
import { htmlLanguage, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSheetMetalBendCopy } from "@/lib/i18n/sheet-metal-bend";
import { localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const path = "calculators/sheet-metal-bend-calculator";

export function SheetMetalBendView({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = getSheetMetalBendCopy(locale);
  const url = `${siteConfig.url}${localizedPath(locale, path)}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: copy.heading,
      description: copy.description,
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
        { "@type": "ListItem", position: 3, name: copy.heading, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.map((entry) => ({
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
          <FoldHorizontal aria-hidden="true" />
        </span>
        <div>
          <h1>{copy.heading}</h1>
          <p>{copy.intro}</p>
        </div>
      </header>

      <SheetMetalBendCalculator locale={locale} dictionary={dictionary} />

      <section className="section seo-content">
        <div className="shell seo-grid">
          <div>
            <p className="section-kicker">Method</p>
            <h2>{copy.methodologyTitle}</h2>
            <p>{copy.methodologyBody}</p>
            <Link className="seo-guide-link" href={localizedPath(locale, "calculators/laser-cutting-cost-calculator")}>
              {copy.sendToLaser}
            </Link>
          </div>
          <div>
            <h2>{copy.faqTitle}</h2>
            <div className="faq-list">
              {copy.faq.map((entry) => (
                <details key={entry.question}>
                  <summary>{entry.question}</summary>
                  <p>{entry.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
