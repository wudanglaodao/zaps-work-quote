import type { Metadata } from "next";
import Link from "next/link";
import { Box, BrushCleaning, DraftingCompass, Droplets, Paintbrush, ScanLine } from "lucide-react";
import { notFound, permanentRedirect } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { tools } from "@/lib/tools/registry";
import { localizedPath } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = ({ en: "Free Cost Calculators & Quote Tools | zaps.work", "zh-hant": "免費成本計算器與報價工具 | zaps.work", de: "Kostenrechner und Angebots-Tools | zaps.work", ja: "無料のコスト計算機と見積もりツール | zaps.work", es: "Calculadoras de costes y presupuestos | zaps.work", fr: "Calculateurs de coûts et outils de devis | zaps.work", "pt-br": "Calculadoras de custos e orçamentos | zaps.work", ko: "무료 비용 계산기 및 견적 도구 | zaps.work" } as const)[locale];
  const description = ({ en: "Browse free calculators for fabrication and service quotes.", "zh-hant": "瀏覽製造與服務業使用的免費成本計算與報價工具。", de: "Kostenlose Rechner für Fertigung und Serviceangebote.", ja: "製造やサービスの見積もりに使える無料の計算ツールをご覧ください。", es: "Explora calculadoras gratuitas para presupuestos de fabricación y servicios.", fr: "Découvrez des calculateurs gratuits pour les devis de fabrication et de services.", "pt-br": "Confira calculadoras gratuitas para orçamentos de fabricação e serviços.", ko: "제조 및 서비스 견적을 위한 무료 계산기를 살펴보세요." } as const)[locale];
  return buildMetadata({ locale, path: "tools", title, description });
}

export function ToolsView({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const icons = [Box, ScanLine, BrushCleaning, Paintbrush, DraftingCompass, Droplets];
  return <section className="section page-section"><div className="shell"><p className="section-kicker">{dictionary.home.toolsKicker}</p><h1 className="page-title">{dictionary.home.toolsHeading}</h1><div className="tool-grid page-tool-grid">{tools.map((tool, index) => { const Icon = icons[index]; return tool.status === "live" ? <Link className="tool-card live-card" href={localizedPath(locale, `tools/${tool.slug}`)} key={tool.slug}><Icon aria-hidden="true" /><span className="status live">{dictionary.common.live}</span><h2>{tool.names[locale]}</h2><p>{tool.summaries[locale]}</p></Link> : <article className="tool-card disabled" key={tool.slug}><Icon aria-hidden="true" /><span className="status soon">{dictionary.common.soon}</span><h2>{tool.names[locale]}</h2><p>{tool.summaries[locale]}</p></article>; })}</div></div></section>;
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/tools");
  return <ToolsView locale={rawLocale} />;
}
