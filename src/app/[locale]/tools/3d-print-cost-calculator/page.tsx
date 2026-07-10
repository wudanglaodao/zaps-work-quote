import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ThreeDPrintCalculator } from "@/components/three-d-print-calculator";
import { htmlLanguage, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const path = "tools/3d-print-cost-calculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return buildMetadata({ locale, path, title: dictionary.tool.title, description: dictionary.tool.description });
}

export default async function ThreeDPrintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
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
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: htmlLanguage(locale),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "zaps.work", item: `${siteConfig.url}${localizedPath(locale)}` },
        { "@type": "ListItem", position: 2, name: dictionary.common.tools, item: `${siteConfig.url}${localizedPath(locale, "tools")}` },
        { "@type": "ListItem", position: 3, name: dictionary.tool.heading, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: dictionary.tool.faq.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })),
    },
  ];
  return <article className="tool-page">
    <JsonLd data={structuredData} />
    <header className="shell tool-intro"><span className="tool-icon"><Box aria-hidden="true" /></span><div><h1>{dictionary.tool.heading}</h1><p>{dictionary.tool.intro}</p></div></header>
    <ThreeDPrintCalculator locale={locale} dictionary={dictionary} />
    <section className="section seo-content"><div className="shell seo-grid"><div><p className="section-kicker">Method</p><h2>{dictionary.tool.methodologyTitle}</h2><p>{dictionary.tool.methodologyBody}</p></div><div><h2>{dictionary.tool.faqTitle}</h2><div className="faq-list">{dictionary.tool.faq.map((entry) => <details key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>)}</div></div></div></section>
  </article>;
}
