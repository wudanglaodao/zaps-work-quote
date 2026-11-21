import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { notFound, permanentRedirect } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { RoofingCalculator } from "@/components/roofing-calculator";
import { htmlLanguage, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getRoofingCopy } from "@/lib/i18n/roofing";
import { buildMetadata, localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const path = "calculators/roofing-quote-calculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const copy = getRoofingCopy(rawLocale);
  return buildMetadata({
    locale: rawLocale,
    path,
    title: copy.title,
    description: copy.description,
  });
}

export function RoofingView({ locale }: { locale: Locale }) {
  const copy = getRoofingCopy(locale);
  const dictionary = getDictionary(locale);
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
        priceCurrency: (
          {
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
          } as const
        )[locale],
      },
      inLanguage: htmlLanguage(locale),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteConfig.name,
          item: `${siteConfig.url}${localizedPath(locale)}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: dictionary.common.tools,
          item: `${siteConfig.url}${localizedPath(locale, "calculators")}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: copy.heading,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.answer,
        },
      })),
    },
  ];

  return (
    <article className="tool-page">
      <JsonLd data={structuredData} />
      <header className="shell tool-intro">
        <span className="tool-icon">
          <Home aria-hidden="true" />
        </span>
        <div>
          <h1>{copy.heading}</h1>
          <p>{copy.intro}</p>
        </div>
      </header>
      <RoofingCalculator locale={locale} dictionary={dictionary} />
      {locale === "en" ? (
        <section className="section seo-content">
          <div className="shell">
            <Link className="seo-guide-link" href="/guides/how-to-price-roofing-jobs">
              Read the roofing pricing guide →
            </Link>
          </div>
        </section>
      ) : null}
    </article>
  );
}

export default async function RoofingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/calculators/roofing-quote-calculator");
  return <RoofingView locale={rawLocale} />;
}
