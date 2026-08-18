import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ToolsView } from "@/components/tools-view";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const title = ({ en: "Free Cost Calculators & Quote Tools | zaps.work", "zh-hant": "免費成本計算器與報價工具 | zaps.work", "zh-hans": "免费成本计算器与报价工具 | zaps.work", de: "Kostenrechner und Angebots-Tools | zaps.work", ja: "無料のコスト計算機と見積もりツール | zaps.work", es: "Calculadoras de costes y presupuestos | zaps.work", fr: "Calculateurs de coûts et outils de devis | zaps.work", "pt-br": "Calculadoras de custos e orçamentos | zaps.work", ko: "무료 비용 계산기 및 견적 도구 | zaps.work", it: "Calcolatori di costi e preventivi gratuiti | zaps.work", nl: "Gratis kostencalculators en offertetools | zaps.work", pl: "Darmowe kalkulatory kosztów i narzędzia wycen | zaps.work" } as const)[locale];
  const description = ({ en: "Browse free calculators for fabrication and service quotes.", "zh-hant": "瀏覽製造與服務業使用的免費成本計算與報價工具。", "zh-hans": "浏览面向制造和服务报价的免费成本计算器与工具。", de: "Kostenlose Rechner für Fertigung und Serviceangebote.", ja: "製造やサービスの見積もりに使える無料の計算ツールをご覧ください。", es: "Explora calculadoras gratuitas para presupuestos de fabricación y servicios.", fr: "Découvrez des calculateurs gratuits pour les devis de fabrication et de services.", "pt-br": "Confira calculadoras gratuitas para orçamentos de fabricação e serviços.", ko: "제조 및 서비스 견적을 위한 무료 계산기를 살펴보세요.", it: "Esplora calcolatori gratuiti per preventivi di produzione e servizi artigianali.", nl: "Ontdek gratis calculators voor productie- en dienstverleningsoffertes.", pl: "Przeglądaj bezpłatne kalkulatory wycen dla produkcji i usług rzemieślniczych." } as const)[locale];
  return buildMetadata({ locale, path: "calculators", title, description });
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/calculators");
  return <ToolsView locale={rawLocale as Locale} />;
}
