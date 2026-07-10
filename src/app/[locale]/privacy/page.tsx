import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "en" ? "Privacy | zaps.work" : "隱私說明 | zaps.work";
  const description = locale === "en" ? "How zaps.work handles calculator and analytics data." : "zaps.work 如何處理計算器與分析資料。";
  return buildMetadata({ locale, path: "privacy", title, description });
}

export function PrivacyView({ locale }: { locale: "en" | "zh-hant" }) {
  const zh = locale === "zh-hant";
  return <article className="shell prose-page"><h1>{zh ? "隱私說明" : "Privacy"}</h1><p>{zh ? "計算器可在不登入的情況下使用。我們不會建立或保存你的客戶資訊資料庫。" : "Calculators work without an account. We do not build or maintain a database of your customers' information."}</p><h2>{zh ? "客戶資料" : "Customer information"}</h2><p>{zh ? "你輸入的公司名稱、客戶姓名、Email、地址、電話、報價單號、項目名稱與備註只會在你的瀏覽器中使用，不會傳送到或儲存在我們的 Supabase 資料庫。" : "Company names, customer names, emails, addresses, phone numbers, quote numbers, item names, and notes stay in your browser. They are not sent to or stored in our Supabase database."}</p><h2>{zh ? "我們記錄的資料" : "Data we record"}</h2><p>{zh ? "我們可能記錄工具名稱、語言、貨幣、項目數、成本與報價的匿名數值，以及 PDF、CSV 等操作事件，用於改善產品。這些事件不包含客戶或報價識別資料。" : "We may record the tool, locale, currency, item count, anonymous numeric cost and quote metrics, and actions such as PDF or CSV export to improve the product. These events do not contain customer or quote identifiers."}</p><h2>{zh ? "匯出文件" : "Exported documents"}</h2><p>{zh ? "PDF 與 CSV 目前在瀏覽器中產生，不會自動上傳保存。" : "PDF and CSV files are currently generated in your browser and are not automatically uploaded or stored."}</p></article>;
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "en") permanentRedirect("/privacy");
  return <PrivacyView locale={locale} />;
}
