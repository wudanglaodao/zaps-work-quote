import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "en" ? "Privacy | zaps.work" : "隱私說明 | zaps.work";
  const description = locale === "en" ? "How zaps.work handles calculator and analytics data." : "zaps.work 如何處理計算器與分析資料。";
  return buildMetadata({ locale, path: "privacy", title, description });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const zh = locale === "zh-hant";
  return <article className="shell prose-page"><h1>{zh ? "隱私說明" : "Privacy"}</h1><p>{zh ? "計算器可在不登入的情況下使用。公司、客戶、Email、報價單號與項目名稱不會被送入分析資料庫。" : "Calculators work without an account. Company, customer, email, quote number, and item-name fields are not sent to the analytics database."}</p><h2>{zh ? "我們記錄的資料" : "Data we record"}</h2><p>{zh ? "我們可能記錄工具名稱、語言、貨幣、項目數、成本與報價的匿名數值區間，以及 PDF、CSV 等操作事件，用於改善產品。" : "We may record the tool, locale, currency, item count, anonymous numeric cost and quote metrics, and actions such as PDF or CSV export to improve the product."}</p><h2>{zh ? "匯出文件" : "Exported documents"}</h2><p>{zh ? "PDF 與 CSV 目前在瀏覽器中產生，不會自動上傳保存。" : "PDF and CSV files are currently generated in your browser and are not automatically uploaded or stored."}</p></article>;
}
