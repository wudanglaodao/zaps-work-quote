import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "en" ? "Privacy | zaps.work" : locale === "de" ? "Datenschutz | zaps.work" : "隱私說明 | zaps.work";
  const description = locale === "en" ? "How zaps.work handles calculator and analytics data." : locale === "de" ? "Wie zaps.work Rechner- und Analysedaten verarbeitet." : "zaps.work 如何處理計算器與分析資料。";
  return buildMetadata({ locale, path: "privacy", title, description });
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const zh = locale === "zh-hant";
  const de = locale === "de";
  return <article className="shell prose-page"><h1>{zh ? "隱私說明" : de ? "Datenschutz" : "Privacy"}</h1><p>{zh ? "計算器可在不登入的情況下使用。我們不會建立或保存你的客戶資訊資料庫。" : de ? "Die Rechner funktionieren ohne Konto. Wir erstellen oder pflegen keine Datenbank mit Kundeninformationen." : "Calculators work without an account. We do not build or maintain a database of your customers' information."}</p><h2>{zh ? "客戶資料與報價內容" : de ? "Kundeninformationen und Angebotsinhalte" : "Customer information and quote content"}</h2><p>{zh ? "你輸入的公司名稱、客戶姓名、Email、地址、電話、報價單號、項目名稱與備註只會在你的瀏覽器中使用，不會傳送到或儲存在我們的 Supabase 資料庫。" : de ? "Firmennamen, Kundennamen, E-Mails, Adressen, Telefonnummern, Angebotsnummern, Artikelnamen und Notizen bleiben in deinem Browser. Sie werden nicht an unsere Supabase-Datenbank gesendet oder dort gespeichert." : "Company names, customer names, emails, addresses, phone numbers, quote numbers, item names, and notes stay in your browser. They are not sent to or stored in our Supabase database."}</p><h2>{zh ? "我們記錄的資料" : de ? "Welche Daten wir erfassen" : "Data we record"}</h2><p>{zh ? "PDF 或 CSV 匯出時，資料庫會接收嚴格白名單化的匿名報價快照，包括工具、語言、貨幣、材料類型、數量、耗材、工時、費率、成本構成與報價結果。快照不包含任何自由文字欄位或客戶相關資料。" : de ? "Beim Export von PDF oder CSV erhält unsere Datenbank einen streng erlaubten, anonymen Angebots-Snapshot mit Tool, Sprache, Währung, Materialtyp, Menge, Filament, Produktionszeit, Sätzen, Kostenaufteilung und Ergebnis. Der Snapshot enthält keine Freitextfelder oder kundenbezogenen Daten." : "When PDF or CSV is exported, our database receives a strictly allowlisted, anonymous quote snapshot including the tool, locale, currency, material type, quantity, filament, production time, rates, cost breakdown, and quote result. The snapshot contains no free-text fields or customer-related information."}</p><h2>{zh ? "網站分析" : de ? "Website-Analysen" : "Website analytics"}</h2><p>{zh ? "我們使用 Vercel Analytics 與 Google Analytics 了解頁面瀏覽、來源、裝置與瀏覽器等網站使用情況。我們不會把報價表單欄位或客戶資料作為分析事件參數傳送。" : de ? "Wir verwenden Vercel Analytics und Google Analytics, um Seitenaufrufe, Zugriffsquellen, Geräte und Browser zu verstehen. Angebotsformularfelder oder Kundendaten werden nicht als Analyseparameter übertragen." : "We use Vercel Analytics and Google Analytics to understand page visits, traffic sources, devices, and browsers. We do not send quote form fields or customer information as analytics event parameters."}</p><h2>{zh ? "匯出文件" : de ? "Exportierte Dateien" : "Exported documents"}</h2><p>{zh ? "PDF 與 CSV 文件本身在瀏覽器中產生，不會自動上傳保存。" : de ? "PDF- und CSV-Dateien werden in deinem Browser erstellt und nicht automatisch hochgeladen oder gespeichert." : "PDF and CSV files themselves are generated in your browser and are not automatically uploaded or stored."}</p></article>;
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "en") permanentRedirect("/privacy");
  return <PrivacyView locale={locale} />;
}
