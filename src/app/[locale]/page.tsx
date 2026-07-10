import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, BrushCleaning, DraftingCompass, ScanLine } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools/registry";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);
  return buildMetadata({ locale: rawLocale, title: dictionary.home.title, description: dictionary.home.description });
}

const icons = [Box, ScanLine, BrushCleaning, DraftingCompass];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dictionary = getDictionary(locale);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, description: dictionary.home.description, inLanguage: locale === "zh-hant" ? "zh-Hant" : "en" }} />
      <section className="hero">
        <Image src="/assets/zaps-work_hero_background.jpg" alt="" fill priority sizes="100vw" className="hero-background" />
        <div className="hero-overlay" />
        <div className="shell hero-content">
          <p className="eyebrow"><span />{dictionary.home.eyebrow}</p>
          <h1>{dictionary.home.heading}</h1>
          <p className="hero-copy">{dictionary.home.subheading}</p>
          <div className="hero-actions">
            <Link className="button primary" href={`/${locale}/tools/3d-print-cost-calculator`}>{dictionary.home.primaryCta}</Link>
            <Link className="button ghost" href={`/${locale}/tools`}>{dictionary.home.secondaryCta}<ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <section className="section workflow-section" id="how-it-works">
        <div className="shell section-heading split-heading">
          <div><p className="section-kicker">{dictionary.home.workflowKicker}</p><h2>{dictionary.home.workflowHeading}</h2></div>
          <p>{dictionary.home.workflowCopy}</p>
        </div>
        <div className="shell workflow-image-wrap"><Image src="/assets/zaps-work_homepage_workflow_preview.png" alt={dictionary.home.workflowHeading} width={1600} height={900} className="workflow-image" /></div>
      </section>
      <section className="section tools-section" id="tools">
        <div className="shell section-heading split-heading">
          <div><p className="section-kicker">{dictionary.home.toolsKicker}</p><h2>{dictionary.home.toolsHeading}</h2></div>
          <p>{dictionary.home.toolsCopy}</p>
        </div>
        <div className="shell tool-grid">
          {tools.map((tool, index) => {
            const Icon = icons[index] || Box;
            const content = <><Icon aria-hidden="true" /><span className={`status ${tool.status}`}>{tool.status === "live" ? dictionary.common.live : dictionary.common.soon}</span><h3>{tool.names[locale]}</h3><p>{tool.summaries[locale]}</p></>;
            return tool.status === "live" ? <Link className="tool-card live-card" href={`/${locale}/tools/${tool.slug}`} key={tool.slug}>{content}</Link> : <article className="tool-card disabled" key={tool.slug}>{content}</article>;
          })}
        </div>
      </section>
    </>
  );
}
