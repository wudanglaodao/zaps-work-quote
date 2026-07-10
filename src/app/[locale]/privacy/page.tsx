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
  return <article className="shell prose-page"><h1>{zh ? "隱私說明" : "Privacy"}</h1><p>{zh ? "計算器可在不登入的情況下使用。我們不會建立或保存你的客戶資訊資料庫。" : "Calculators work without an account. We do not build or maintain a database of your customers' information."}</p><h2>{zh ? "客戶資料與報價內容" : "Customer information and quote content"}</h2><p>{zh ? "你輸入的公司名稱、客戶姓名、Email、地址、電話、報價單號、項目名稱、備註與其他報價內容只會在你的瀏覽器中使用，不會傳送到或儲存在我們的 Supabase 資料庫。" : "Company names, customer names, emails, addresses, phone numbers, quote numbers, item names, notes, and any other quote-entered content stay in your browser. They are not sent to or stored in our Supabase database."}</p><h2>{zh ? "我們記錄的資料" : "Data we record"}</h2><p>{zh ? "資料庫只接收白名單中的匿名彙總使用事件，例如工具名稱、語言、貨幣、項目數、成本與報價數值、毛利，以及 PDF 或 CSV 匯出事件。這些事件不包含任何報價欄位或客戶相關資料。" : "Our database receives only allowlisted, aggregate usage events such as tool name, locale, currency, item count, numeric cost and quote metrics, margin, and PDF or CSV export events. These events contain no quote fields and no customer-related information."}</p><h2>{zh ? "網站分析" : "Website analytics"}</h2><p>{zh ? "我們使用 Vercel Analytics 與 Google Analytics 了解頁面瀏覽、來源、裝置與瀏覽器等網站使用情況。我們不會把報價表單欄位或客戶資料作為分析事件參數傳送。" : "We use Vercel Analytics and Google Analytics to understand page visits, traffic sources, devices, and browsers. We do not send quote form fields or customer information as analytics event parameters."}</p><h2>{zh ? "匯出文件" : "Exported documents"}</h2><p>{zh ? "PDF 與 CSV 目前在瀏覽器中產生，不會自動上傳保存。" : "PDF and CSV files are currently generated in your browser and are not automatically uploaded or stored."}</p></article>;
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "en") permanentRedirect("/privacy");
  return <PrivacyView locale={locale} />;
}
