import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, BrushCleaning, Database, DraftingCompass, FileDown, LockKeyhole, ScanLine, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { htmlLanguage, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools/registry";
import { notFound, permanentRedirect } from "next/navigation";
import { localizedPath } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);
  return buildMetadata({ locale: rawLocale, title: dictionary.home.title, description: dictionary.home.description });
}

const icons = [Box, ScanLine, BrushCleaning, DraftingCompass];

export function HomeView({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const workflowLabels = locale === "zh-hant" ? ["輸入", "成本與毛利", "報價"] : locale === "de" ? ["Eingabe", "Kosten + Marge", "Angebot"] : ["Input", "Cost + margin", "Quote"];
  return (
    <div className="home-page">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, description: dictionary.home.description, inLanguage: htmlLanguage(locale) }} />
      <section className="shell home-hero">
        <div className="home-hero-inner">
          <p className="home-eyebrow">{dictionary.home.eyebrow}</p>
          <h1>{dictionary.home.heading}</h1>
          <p className="home-hero-copy">{dictionary.home.subheading}</p>
          <div className="home-hero-actions">
            <Link className="button primary" href={localizedPath(locale, "tools/3d-print-cost-calculator")}>{dictionary.home.primaryCta}</Link>
            <Link className="home-text-link" href="#how-it-works"><span>{locale === "zh-hant" ? "查看運作方式" : locale === "de" ? "So funktioniert es" : "See how it works"}</span><ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <section className="home-workflow-section" id="how-it-works">
        <div className="shell home-section-intro">
          <div><p className="section-kicker">{dictionary.home.workflowKicker}</p><h2>{dictionary.home.workflowHeading}</h2></div>
          <p>{dictionary.home.workflowCopy}</p>
        </div>
        <div className="shell home-workflow-grid">
          <article className="home-workflow-card blue">
            <div className="home-workflow-scene"><div className="home-mini-window home-input-window">{["100%", "76%", "88%"].map((width) => <div className="home-input-line" key={width}><span /><i style={{ width }} /><b /></div>)}</div></div>
            <div className="home-workflow-caption"><span className="home-workflow-icon"><Box aria-hidden="true" /></span><h3>{workflowLabels[0]}</h3><b>01</b></div>
          </article>
          <article className="home-workflow-card green">
            <div className="home-workflow-scene"><div className="home-mini-window home-margin-window"><div className="home-margin-ring"><strong>34%</strong></div><div className="home-result-bars">{[74, 54, 88, 42].map((width) => <span key={width}><i style={{ width: `${width}%` }} /></span>)}</div></div></div>
            <div className="home-workflow-caption"><span className="home-workflow-icon"><ScanLine aria-hidden="true" /></span><h3>{workflowLabels[1]}</h3><b>02</b></div>
          </article>
          <article className="home-workflow-card amber">
            <div className="home-workflow-scene"><div className="home-mini-window home-quote-window"><div><strong>{locale === "zh-hant" ? "您的公司" : locale === "de" ? "IHR UNTERNEHMEN" : "YOUR COMPANY"}</strong><strong>{locale === "zh-hant" ? "報價" : locale === "de" ? "ANGEBOT" : "QUOTE"}</strong></div><span /><span /><span /><i /></div></div>
            <div className="home-workflow-caption"><span className="home-workflow-icon"><DraftingCompass aria-hidden="true" /></span><h3>{workflowLabels[2]}</h3><b>03</b></div>
          </article>
        </div>
      </section>
      <section className="home-tools-section" id="tools">
        <div className="shell home-section-intro">
          <div><p className="section-kicker">{dictionary.home.toolsKicker}</p><h2>{dictionary.home.toolsHeading}</h2></div>
          <p>{dictionary.home.toolsCopy}</p>
        </div>
        <div className="shell home-tool-layout">
          <Link className="home-featured-tool" href={localizedPath(locale, "tools/3d-print-cost-calculator")}>
            <div className="home-tool-preview"><Image src="/assets/zaps-work_homepage_workflow_preview.png" alt={tools[0].names[locale]} width={1600} height={900} /></div>
            <div className="home-featured-copy"><div><span className="status live">{dictionary.common.live}</span><h3>{tools[0].names[locale]}</h3><p>{tools[0].summaries[locale]}</p></div><ArrowRight aria-hidden="true" /></div>
          </Link>
          <div className="home-planned-tools">
            {tools.slice(1).map((tool, index) => {
              const Icon = icons[index + 1] || Box;
              return <article className="home-planned-card" key={tool.slug}><div><span className="home-tool-icon"><Icon aria-hidden="true" /></span><span className="status soon">{dictionary.common.soon}</span></div><h3>{tool.names[locale]}</h3><p>{tool.summaries[locale]}</p><small>{locale === "zh-hant" ? "開發中" : locale === "de" ? "In Entwicklung" : "In development"}</small></article>;
            })}
          </div>
        </div>
      </section>
      <section className="home-privacy-section">
        <div className="shell home-privacy-layout">
          <div className="home-privacy-visual" aria-hidden="true">
            <div className="privacy-browser-panel">
              <div className="privacy-panel-bar"><span><i /><i /><i /></span><b>{dictionary.home.privacyBrowserLabel}</b><LockKeyhole /></div>
              <div className="privacy-private-sheet">
                <div className="privacy-sheet-head"><span><LockKeyhole /></span><div><i /><b /></div></div>
                {[82, 64, 74, 56].map((width) => <div className="privacy-redacted-row" key={width}><span /><i style={{ width: `${width}%` }} /></div>)}
                <div className="privacy-local-export"><FileDown /><span>PDF</span><span>CSV</span></div>
              </div>
            </div>
            <div className="privacy-filter-gate"><ShieldCheck /><span>{dictionary.home.privacyBlockedLabel}</span></div>
            <div className="privacy-metrics-panel">
              <div className="privacy-metrics-head"><Database /><span>{dictionary.home.privacyMetricsLabel}</span></div>
              <div className="privacy-metric-chips"><span>PLA</span><span>6.5h</span><span>35%</span></div>
              <div className="privacy-metric-chart">{[72, 46, 84, 58].map((width) => <span key={width}><i style={{ width: `${width}%` }} /></span>)}</div>
            </div>
          </div>
          <div className="home-privacy-copy">
            <p className="section-kicker">{dictionary.home.privacyKicker}</p>
            <h2>{dictionary.home.privacyHeading}</h2>
            <p className="home-privacy-lead">{dictionary.home.privacyCopy}</p>
            <div className="home-privacy-points">
              <p><FileDown aria-hidden="true" /><span>{dictionary.home.privacyLocal}</span></p>
              <p><Database aria-hidden="true" /><span>{dictionary.home.privacyAnonymous}</span></p>
            </div>
            <Link className="home-text-link home-privacy-link" href={localizedPath(locale, "privacy")}><span>{dictionary.home.privacyCta}</span><ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/");
  return <HomeView locale={rawLocale} />;
}
