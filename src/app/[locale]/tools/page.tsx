import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { tools } from "@/lib/tools/registry";
import { localizedPath } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "en" ? "Free Cost Calculators & Quote Tools | zaps.work" : "免費成本計算器與報價工具 | zaps.work";
  const description = locale === "en" ? "Browse free calculators for fabrication and service quotes." : "瀏覽製造與服務業使用的免費成本計算與報價工具。";
  return buildMetadata({ locale, path: "tools", title, description });
}

export function ToolsView({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  return <section className="section page-section"><div className="shell"><p className="section-kicker">{dictionary.home.toolsKicker}</p><h1 className="page-title">{dictionary.home.toolsHeading}</h1><div className="tool-grid page-tool-grid">{tools.map((tool) => tool.status === "live" ? <Link className="tool-card live-card" href={localizedPath(locale, `tools/${tool.slug}`)} key={tool.slug}><span className="status live">{dictionary.common.live}</span><h2>{tool.names[locale]}</h2><p>{tool.summaries[locale]}</p></Link> : <article className="tool-card disabled" key={tool.slug}><span className="status soon">{dictionary.common.soon}</span><h2>{tool.names[locale]}</h2><p>{tool.summaries[locale]}</p></article>)}</div></div></section>;
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/tools");
  return <ToolsView locale={rawLocale} />;
}
