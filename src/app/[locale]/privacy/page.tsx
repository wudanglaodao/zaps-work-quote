import type { Metadata } from "next";
import { BarChart3, Database, FileDown, LockKeyhole, ShieldCheck } from "lucide-react";
import { notFound, permanentRedirect } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { withSimplifiedChinese } from "@/lib/i18n/simplified-chinese";
import { buildMetadata } from "@/lib/seo";

type PrivacyCopy = { title: string; description: string; heading: string; intro: string; customerHeading: string; customerBody: string; dataHeading: string; dataBody: string; analyticsHeading: string; analyticsBody: string; exportsHeading: string; exportsBody: string };

const baseCopy: Record<Exclude<Locale, "zh-hans">, PrivacyCopy> = {
  en: { title: "Privacy | zaps.work", description: "How zaps.work handles calculator and analytics data.", heading: "Privacy", intro: "Calculators work without an account. We do not build or maintain a database of your customers' information.", customerHeading: "Customer information and quote content", customerBody: "Company names, customer names, emails, addresses, phone numbers, quote numbers, item names, and notes stay in your browser. They are not sent to or stored in our Supabase database.", dataHeading: "Data we record", dataBody: "When PDF or CSV is exported, our database receives a strictly allowlisted, anonymous quote snapshot including the tool, locale, currency, material type, quantity, filament, production time, rates, cost breakdown, and quote result. We may also record the browser-reported time zone and a coarse country or region derived by our hosting platform. We never store raw IP addresses. The snapshot contains no free-text fields or customer-related information.", analyticsHeading: "Website analytics", analyticsBody: "We use Vercel Analytics and Google Analytics to understand page visits, traffic sources, devices, and browsers. We do not send quote form fields or customer information as analytics event parameters.", exportsHeading: "Exported documents", exportsBody: "PDF and CSV files themselves are generated in your browser and are not automatically uploaded or stored." },
  "zh-hant": { title: "隱私說明 | zaps.work", description: "zaps.work 如何處理計算器與分析資料。", heading: "隱私說明", intro: "計算器可在不登入的情況下使用。我們不會建立或保存你的客戶資訊資料庫。", customerHeading: "客戶資料與報價內容", customerBody: "你輸入的公司名稱、客戶姓名、Email、地址、電話、報價單號、項目名稱與備註只會在你的瀏覽器中使用，不會傳送到或儲存在我們的 Supabase 資料庫。", dataHeading: "我們記錄的資料", dataBody: "PDF 或 CSV 匯出時，資料庫會接收嚴格白名單化的匿名報價快照，包括工具、語言、貨幣、材料類型、數量、耗材、工時、費率、成本構成與報價結果。我們也可能記錄瀏覽器回報的時區，以及由託管平台推導出的粗略國家或地區；絕不保存原始 IP 位址。快照不包含任何自由文字欄位或客戶相關資料。", analyticsHeading: "網站分析", analyticsBody: "我們使用 Vercel Analytics 與 Google Analytics 了解頁面瀏覽、來源、裝置與瀏覽器等網站使用情況。我們不會把報價表單欄位或客戶資料作為分析事件參數傳送。", exportsHeading: "匯出文件", exportsBody: "PDF 與 CSV 文件本身在瀏覽器中產生，不會自動上傳保存。" },
  de: { title: "Datenschutz | zaps.work", description: "Wie zaps.work Rechner- und Analysedaten verarbeitet.", heading: "Datenschutz", intro: "Die Rechner funktionieren ohne Konto. Wir erstellen oder pflegen keine Datenbank mit Kundeninformationen.", customerHeading: "Kundeninformationen und Angebotsinhalte", customerBody: "Firmennamen, Kundennamen, E-Mails, Adressen, Telefonnummern, Angebotsnummern, Artikelnamen und Notizen bleiben in deinem Browser. Sie werden nicht an unsere Supabase-Datenbank gesendet oder dort gespeichert.", dataHeading: "Welche Daten wir erfassen", dataBody: "Beim Export von PDF oder CSV erhält unsere Datenbank einen streng erlaubten, anonymen Angebots-Snapshot mit Tool, Sprache, Währung, Materialtyp, Menge, Filament, Produktionszeit, Sätzen, Kostenaufteilung und Ergebnis. Der Snapshot enthält keine Freitextfelder oder kundenbezogenen Daten.", analyticsHeading: "Website-Analysen", analyticsBody: "Wir verwenden Vercel Analytics und Google Analytics, um Seitenaufrufe, Zugriffsquellen, Geräte und Browser zu verstehen. Angebotsformularfelder oder Kundendaten werden nicht als Analyseparameter übertragen.", exportsHeading: "Exportierte Dateien", exportsBody: "PDF- und CSV-Dateien werden in deinem Browser erstellt und nicht automatisch hochgeladen oder gespeichert." },
  ja: { title: "プライバシー | zaps.work", description: "zaps.workが計算機と分析データを扱う方法。", heading: "プライバシー", intro: "計算機はアカウントなしで利用できます。お客様の情報を集めたデータベースを作成・維持することはありません。", customerHeading: "顧客情報と見積もり内容", customerBody: "会社名、顧客名、メールアドレス、住所、電話番号、見積番号、項目名、メモはブラウザ内に残ります。Supabaseデータベースに送信・保存されることはありません。", dataHeading: "記録するデータ", dataBody: "PDFまたはCSVの出力時、データベースにはツール、言語、通貨、材料の種類、数量、フィラメント、製作時間、単価、コスト内訳、見積結果を含む、許可リストに基づく匿名の見積スナップショットだけが送られます。自由入力欄や顧客関連データは含まれません。", analyticsHeading: "サイト分析", analyticsBody: "ページ閲覧、流入元、端末、ブラウザを理解するためにVercel AnalyticsとGoogle Analyticsを使用しています。見積もりフォームの入力値や顧客情報を分析イベントのパラメーターとして送信することはありません。", exportsHeading: "出力ファイル", exportsBody: "PDFとCSVはブラウザ内で生成され、自動的にアップロードや保存はされません。" },
  es: { title: "Privacidad | zaps.work", description: "Cómo gestiona zaps.work los datos de cálculo y análisis.", heading: "Privacidad", intro: "Las calculadoras funcionan sin cuenta. No creamos ni mantenemos una base de datos con la información de tus clientes.", customerHeading: "Información del cliente y contenido del presupuesto", customerBody: "Los nombres de empresa y clientes, correos, direcciones, teléfonos, números de presupuesto, nombres de artículos y notas permanecen en tu navegador. No se envían ni se guardan en nuestra base de datos de Supabase.", dataHeading: "Datos que registramos", dataBody: "Al exportar un PDF o CSV, nuestra base de datos recibe un resumen anónimo y limitado que incluye herramienta, idioma, moneda, tipo de material, cantidad, filamento, tiempo de producción, tarifas, desglose de costes y resultado. No incluye campos de texto libre ni datos relacionados con clientes.", analyticsHeading: "Analítica del sitio", analyticsBody: "Usamos Vercel Analytics y Google Analytics para entender visitas, fuentes de tráfico, dispositivos y navegadores. No enviamos campos del formulario ni datos de clientes como parámetros de analítica.", exportsHeading: "Documentos exportados", exportsBody: "Los archivos PDF y CSV se generan en tu navegador y no se suben ni almacenan automáticamente." },
  fr: { title: "Confidentialité | zaps.work", description: "Comment zaps.work traite les données de calcul et d’analyse.", heading: "Confidentialité", intro: "Les calculateurs fonctionnent sans compte. Nous ne créons ni ne maintenons de base de données contenant les informations de vos clients.", customerHeading: "Informations client et contenu des devis", customerBody: "Les noms d’entreprise et de clients, e-mails, adresses, numéros de téléphone, numéros de devis, noms d’articles et notes restent dans votre navigateur. Ils ne sont pas envoyés à notre base Supabase et n’y sont pas stockés.", dataHeading: "Données que nous enregistrons", dataBody: "Lors de l’export d’un PDF ou CSV, notre base reçoit uniquement un instantané de devis anonyme et limité comprenant l’outil, la langue, la devise, le type de matière, la quantité, le filament, le temps de production, les taux, le détail des coûts et le résultat. Aucun champ libre ni donnée client n’est inclus.", analyticsHeading: "Analyse du site", analyticsBody: "Nous utilisons Vercel Analytics et Google Analytics pour comprendre les visites, les sources de trafic, les appareils et les navigateurs. Les champs du formulaire et les données client ne sont pas transmis comme paramètres d’analyse.", exportsHeading: "Documents exportés", exportsBody: "Les fichiers PDF et CSV sont générés dans votre navigateur et ne sont pas automatiquement téléversés ou stockés." },
  "pt-br": { title: "Privacidade | zaps.work", description: "Como a zaps.work trata dados de cálculo e análise.", heading: "Privacidade", intro: "As calculadoras funcionam sem conta. Não criamos nem mantemos um banco de dados com as informações dos seus clientes.", customerHeading: "Informações do cliente e conteúdo do orçamento", customerBody: "Nomes de empresas e clientes, e-mails, endereços, telefones, números de orçamento, nomes de itens e observações ficam no seu navegador. Eles não são enviados nem armazenados no nosso banco Supabase.", dataHeading: "Dados que registramos", dataBody: "Ao exportar PDF ou CSV, nosso banco recebe apenas um resumo anônimo e limitado com ferramenta, idioma, moeda, tipo de material, quantidade, filamento, tempo de produção, taxas, detalhamento de custos e resultado. O resumo não contém campos de texto livre nem dados de clientes.", analyticsHeading: "Análise do site", analyticsBody: "Usamos Vercel Analytics e Google Analytics para entender visitas, fontes de tráfego, dispositivos e navegadores. Não enviamos campos do formulário ou dados de clientes como parâmetros de análise.", exportsHeading: "Documentos exportados", exportsBody: "Os arquivos PDF e CSV são gerados no seu navegador e não são enviados ou armazenados automaticamente." },
  ko: { title: "개인정보 보호 | zaps.work", description: "zaps.work가 계산 및 분석 데이터를 처리하는 방식입니다.", heading: "개인정보 보호", intro: "계산기는 계정 없이 사용할 수 있습니다. 고객 정보를 모은 데이터베이스를 만들거나 유지하지 않습니다.", customerHeading: "고객 정보 및 견적 내용", customerBody: "회사명, 고객명, 이메일, 주소, 전화번호, 견적 번호, 항목 이름, 메모는 브라우저에 남습니다. Supabase 데이터베이스로 전송되거나 저장되지 않습니다.", dataHeading: "기록하는 데이터", dataBody: "PDF 또는 CSV를 내보낼 때 도구, 언어, 통화, 재료 유형, 수량, 필라멘트, 제작 시간, 요율, 비용 내역, 견적 결과만 포함된 익명 허용 목록 스냅샷을 데이터베이스에 보냅니다. 자유 입력이나 고객 관련 데이터는 포함되지 않습니다.", analyticsHeading: "사이트 분석", analyticsBody: "페이지 방문, 유입 경로, 기기, 브라우저를 이해하기 위해 Vercel Analytics와 Google Analytics를 사용합니다. 견적 양식이나 고객 정보는 분석 이벤트 매개변수로 보내지 않습니다.", exportsHeading: "내보낸 문서", exportsBody: "PDF와 CSV 파일은 브라우저에서 생성되며 자동으로 업로드되거나 저장되지 않습니다." },
};

const copy: Record<Locale, PrivacyCopy> = withSimplifiedChinese(baseCopy);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const item = copy[locale];
  return buildMetadata({ locale, path: "privacy", title: item.title, description: item.description });
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const item = copy[locale];
  const cards = [
    { icon: LockKeyhole, title: item.customerHeading, body: item.customerBody, className: "primary" },
    { icon: Database, title: item.dataHeading, body: item.dataBody, className: "data" },
    { icon: BarChart3, title: item.analyticsHeading, body: item.analyticsBody, className: "analytics" },
    { icon: FileDown, title: item.exportsHeading, body: item.exportsBody, className: "exports" },
  ];
  return <article className="privacy-page">
    <section className="privacy-hero">
      <div className="shell privacy-hero-grid">
        <div className="privacy-hero-copy">
          <p className="section-kicker">{item.heading}</p>
          <h1>{item.heading}</h1>
          <p className="privacy-hero-lead">{item.intro}</p>
          <div className="privacy-promise"><ShieldCheck aria-hidden="true" /><strong>{item.customerHeading}</strong></div>
        </div>
        <div className="privacy-hero-visual" aria-hidden="true">
          <div className="privacy-visual-browser"><div className="privacy-visual-bar"><i /><i /><i /><LockKeyhole /></div><div className="privacy-visual-lines"><span /><span /><span /><span /><span /></div><div className="privacy-visual-local"><FileDown /><i /><i /></div></div>
          <div className="privacy-visual-gate"><ShieldCheck /></div>
          <div className="privacy-visual-database"><Database /><div><i /><i /><i /><i /></div></div>
        </div>
      </div>
    </section>
    <section className="shell privacy-content">
      <div className="privacy-content-heading"><p className="section-kicker">{item.dataHeading}</p><h2>{item.heading}</h2></div>
      <div className="privacy-card-grid">{cards.map(({ icon: Icon, title, body, className }) => <section className={`privacy-card ${className}`} key={title}><div className="privacy-card-icon"><Icon aria-hidden="true" /></div><h2>{title}</h2><p>{body}</p></section>)}</div>
    </section>
  </article>;
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/privacy");
  return <PrivacyView locale={rawLocale} />;
}
