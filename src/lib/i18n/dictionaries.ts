import type { Locale } from "./config";

export type Dictionary = {
  common: {
    tools: string;
    howItWorks: string;
    guides: string;
    privacy: string;
    allTools: string;
    language: string;
    currency: string;
    searchLanguage: string;
    noLanguageResults: string;
    searchCurrency: string;
    noCurrencyResults: string;
    darkMode: string;
    lightMode: string;
    live: string;
    soon: string;
    footerSummary: string;
    footerPrivacyPromise: string;
    footer3d: string;
    footerCleaning: string;
    footerLaser: string;
    resources: string;
    templates: string;
    pricingBasics: string;
    contact: string;
    feedback: string;
    footerLive: string;
    github: string;
  };
  home: {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    subheading: string;
    primaryCta: string;
    secondaryCta: string;
    workflowKicker: string;
    workflowHeading: string;
    workflowCopy: string;
    toolsKicker: string;
    toolsHeading: string;
    toolsCopy: string;
    privacyKicker: string;
    privacyHeading: string;
    privacyCopy: string;
    privacyLocal: string;
    privacyAnonymous: string;
    privacyCta: string;
    privacyBrowserLabel: string;
    privacyBlockedLabel: string;
    privacyMetricsLabel: string;
  };
  tool: {
    title: string;
    description: string;
    heading: string;
    intro: string;
    methodologyTitle: string;
    methodologyBody: string;
    privacyNote: string;
    faqTitle: string;
    faq: Array<{ question: string; answer: string }>;
  };
  calculator: {
    input: string;
    jobDetails: string;
    printItems: string;
    addItem: string;
    itemName: string;
    material: string;
    quantity: string;
    filament: string;
    printHours: string;
    printMinutes: string;
    itemCosts: string;
    spoolPrice: string;
    spoolWeight: string;
    preparation: string;
    postProcessing: string;
    packaging: string;
    sharedRates: string;
    machineRate: string;
    laborRate: string;
    failureRate: string;
    wasteRate: string;
    powerDraw: string;
    electricityRate: string;
    pricing: string;
    targetMargin: string;
    minimumFee: string;
    shipping: string;
    tax: string;
    pdfDetails: string;
    companyName: string;
    additionalQuoteDetails: string;
    companyDetails: string;
    customerName: string;
    customerDetails: string;
    quoteNumber: string;
    validDays: string;
    targetQuote: string;
    totalCost: string;
    profit: string;
    margin: string;
    exportPdf: string;
    exportCsv: string;
    copySummary: string;
    breakdown: string;
    materialCost: string;
    machine: string;
    electricity: string;
    labor: string;
    failureRisk: string;
    total: string;
    subtotal: string;
    quote: string;
    date: string;
    preparedFor: string;
    project: string;
    description: string;
    qty: string;
    unitPrice: string;
    amount: string;
    validFor: string;
    copied: string;
    csvExported: string;
    noConversion: string;
  };
};

const en: Dictionary = {
  common: {
    tools: "Tools",
    howItWorks: "How it works",
    guides: "Guides",
    privacy: "Privacy",
    allTools: "All tools",
    language: "Language",
    currency: "Currency",
    searchLanguage: "Search language",
    noLanguageResults: "No matching language",
    searchCurrency: "Search currency",
    noCurrencyResults: "No matching currency",
    darkMode: "Switch to dark mode",
    lightMode: "Switch to light mode",
    live: "Live",
    soon: "Soon",
    footerSummary: "Practical cost calculators and quote generators for fabrication, local services, and independent work. Open source on GitHub.",
    footerPrivacyPromise: "Your customers' personal information stays in your browser.",
    footer3d: "3D Print Cost",
    footerCleaning: "Cleaning Quote",
    footerLaser: "Laser Cutting",
    resources: "Resources",
    templates: "Templates",
    pricingBasics: "Pricing basics",
    contact: "Contact",
    feedback: "Feedback",
    footerLive: "3D Print Calculator live",
    github: "GitHub",
  },
  home: {
    title: "Free Cost Calculators & Quote Tools | zaps.work",
    description: "Calculate real job costs, protect your margin, and export customer-ready quotes with free tools from zaps.work.",
    eyebrow: "3D Print Cost Calculator is live",
    heading: "Cost in. Quote out.",
    subheading: "Know what the job costs, protect your margin, and send a clear quote.",
    primaryCta: "Open 3D print calculator",
    secondaryCta: "Browse tools",
    workflowKicker: "One useful path",
    workflowHeading: "From job details to a ready quote.",
    workflowCopy: "Every tool follows the same clear flow, while keeping the inputs specific to the work.",
    toolsKicker: "Tool library",
    toolsHeading: "Start with the work in front of you.",
    toolsCopy: "One calculator is live. New fabrication and service quote tools will open as they become genuinely useful.",
    privacyKicker: "Privacy by design",
    privacyHeading: "Your customer data stays yours.",
    privacyCopy: "Names, emails, phone numbers, addresses, company details, item names, and quote numbers never leave your browser.",
    privacyLocal: "PDF and CSV files are generated locally in your browser.",
    privacyAnonymous: "Only anonymous material, time, cost, and margin data is recorded when you export.",
    privacyCta: "Read our privacy approach",
    privacyBrowserLabel: "Your browser",
    privacyBlockedLabel: "Private fields blocked",
    privacyMetricsLabel: "Anonymous metrics",
  },
  tool: {
    title: "3D Printing Cost & Price Calculator | zaps.work",
    description: "Calculate 3D printing cost per hour, filament, machine time, labor, failure risk, profit margin, and a customer-ready quote for free.",
    heading: "3D Printing Cost & Price Calculator",
    intro: "Calculate an FDM print's true cost, selling price, and profit margin from filament, machine time, electricity, labor, and failure risk, then export a customer-ready quote.",
    methodologyTitle: "What the calculator includes",
    methodologyBody: "The estimate combines filament usage, waste, machine time, electricity, labor, packaging, expected failure cost, minimum fees, margin, shipping, and tax. Inputs stay editable so the result reflects your own shop rather than a generic market average.",
    privacyNote: "Customer names and contact details, including email, phone, and address, stay in your browser and are not stored in our database.",
    faqTitle: "3D printing cost questions",
    faq: [
      { question: "How is the suggested quote calculated?", answer: "The calculator totals production and labor costs, adjusts for expected failures, then applies your target margin and minimum fee before tax." },
      { question: "How do I calculate 3D printing cost per hour?", answer: "Multiply print time by your machine hourly rate, then add electricity for the same period. Material, hands-on labor, failure risk, packaging, and overhead still need to be added before setting the selling price." },
      { question: "What should be included in a 3D printing price?", answer: "Include filament and waste, machine time, electricity, preparation and post-processing labor, expected failures, packaging, job-specific purchases, overhead, shipping, tax, and the profit margin your business needs." },
      { question: "Does changing currency convert existing values?", answer: "Yes. Monetary inputs are converted to the selected currency and formatted with that currency's standard decimal precision." },
      { question: "Can I quote several printed parts together?", answer: "Yes. Add up to ten line items and export them as one customer quote." },
    ],
  },
  calculator: {
    input: "Input", jobDetails: "Job details", printItems: "Print items", addItem: "Add item", itemName: "Item name", material: "Material", quantity: "Quantity", filament: "Filament used", printHours: "Print hours", printMinutes: "Print minutes", itemCosts: "Item costs & labor", spoolPrice: "Spool price", spoolWeight: "Spool weight", preparation: "Preparation", postProcessing: "Post-processing", packaging: "Packaging", sharedRates: "Shared rates & risk", machineRate: "Machine rate", laborRate: "Labor rate", failureRate: "Failure rate", wasteRate: "Material waste", powerDraw: "Power draw", electricityRate: "Electricity rate", pricing: "Pricing", targetMargin: "Target margin", minimumFee: "Minimum job fee", shipping: "Shipping", tax: "Tax", pdfDetails: "Quote details", companyName: "Company name", additionalQuoteDetails: "Additional quote details", companyDetails: "Company details", customerName: "Customer name", customerDetails: "Customer details", quoteNumber: "Quote number", validDays: "Valid for", targetQuote: "Target quote", totalCost: "Total cost", profit: "Profit", margin: "Margin", exportPdf: "Export PDF", exportCsv: "Export CSV", copySummary: "Copy summary", breakdown: "Cost breakdown", materialCost: "Material", machine: "Machine", electricity: "Electricity", labor: "Labor", failureRisk: "Failure risk", total: "Total", subtotal: "Subtotal", quote: "QUOTE", date: "Date", preparedFor: "Prepared for", project: "Project", description: "Description", qty: "Qty", unitPrice: "Unit price", amount: "Amount", validFor: "Valid for {days} days", copied: "Summary copied", csvExported: "CSV exported", noConversion: "Existing values were not converted.",
  },
};

const zhHant: Dictionary = {
  common: {
    tools: "工具",
    howItWorks: "運作方式",
    guides: "指南",
    privacy: "隱私",
    allTools: "所有工具",
    language: "語言",
    currency: "貨幣",
    searchLanguage: "搜尋語言",
    noLanguageResults: "找不到符合的語言",
    searchCurrency: "搜尋貨幣",
    noCurrencyResults: "找不到符合的貨幣",
    darkMode: "切換至深色模式",
    lightMode: "切換至淺色模式",
    live: "已上線",
    soon: "即將推出",
    footerSummary: "為製造加工、在地服務與獨立工作者打造的實用成本與報價工具，開源於 GitHub。",
    footerPrivacyPromise: "客戶個人資料只會保留在你的瀏覽器中。",
    footer3d: "3D 列印成本",
    footerCleaning: "清潔報價",
    footerLaser: "雷射切割",
    resources: "資源",
    templates: "範本",
    pricingBasics: "定價基礎",
    contact: "聯絡我們",
    feedback: "回饋",
    footerLive: "3D 列印計算器已上線",
    github: "GitHub",
  },
  home: {
    title: "免費成本計算器與報價工具 | zaps.work",
    description: "使用 zaps.work 免費計算工作成本、檢查毛利，並匯出可直接交付客戶的報價單。",
    eyebrow: "3D 列印成本計算器已上線",
    heading: "算清成本，再送出報價。",
    subheading: "掌握工作真正成本、守住利潤，送出清楚的報價。",
    primaryCta: "開啟 3D 列印計算器",
    secondaryCta: "瀏覽工具",
    workflowKicker: "一條清楚的路徑",
    workflowHeading: "從工作資料到可直接使用的報價。",
    workflowCopy: "每個工具都遵循相同流程，同時保留該工作真正需要的輸入。",
    toolsKicker: "工具庫",
    toolsHeading: "先處理眼前的工作。",
    toolsCopy: "目前已有一個計算器上線；其他製造與服務報價工具會在真正可用後陸續開放。",
    privacyKicker: "隱私設計",
    privacyHeading: "客戶資料，始終只屬於你。",
    privacyCopy: "姓名、Email、電話、地址、公司資料、項目名稱與報價單號只會保留在你的瀏覽器中。",
    privacyLocal: "PDF 與 CSV 文件直接在你的瀏覽器中產生。",
    privacyAnonymous: "匯出時只記錄匿名的材料、工時、成本與毛利資料。",
    privacyCta: "了解我們的隱私方式",
    privacyBrowserLabel: "你的瀏覽器",
    privacyBlockedLabel: "阻擋私人欄位",
    privacyMetricsLabel: "匿名指標",
  },
  tool: {
    title: "3D 列印成本計算器與報價工具 | zaps.work",
    description: "計算耗材、機器時間、電費、人工、失敗風險與毛利，並匯出客戶用 3D 列印報價單。",
    heading: "3D 列印成本計算器",
    intro: "用材料、機器時間、人工、失敗風險與目標毛利，完成 FDM 列印定價並匯出 PDF 或 CSV。",
    methodologyTitle: "計算器包含哪些成本",
    methodologyBody: "估算包含耗材用量、損耗、機器時間、電費、人工、包裝、預期失敗成本、最低費用、毛利、運費與稅額。所有假設都能調整，結果反映你的實際工作室，而不是通用市場均價。",
    privacyNote: "客戶姓名與聯絡資料（包含 Email、電話與地址）只會保留在你的瀏覽器中，不會儲存在我們的資料庫。",
    faqTitle: "3D 列印成本常見問題",
    faq: [
      { question: "建議報價如何計算？", answer: "系統先合計生產與人工成本，納入預期失敗，再套用目標毛利與最低費用，最後計算稅額。" },
      { question: "切換貨幣會自動換算嗎？", answer: "會。金額欄位會換算成所選貨幣，並依該貨幣的標準小數位顯示。" },
      { question: "可以把多個列印零件放在同一份報價嗎？", answer: "可以，最多加入十個項目並匯出為同一份客戶報價。" },
    ],
  },
  calculator: {
    input: "輸入", jobDetails: "工作資料", printItems: "列印項目", addItem: "新增項目", itemName: "項目名稱", material: "材料", quantity: "數量", filament: "耗材用量", printHours: "列印小時", printMinutes: "列印分鐘", itemCosts: "項目成本與人工", spoolPrice: "整卷耗材價格", spoolWeight: "整卷耗材重量", preparation: "前置準備", postProcessing: "後處理", packaging: "包裝", sharedRates: "共用費率與風險", machineRate: "機器費率", laborRate: "人工費率", failureRate: "失敗率", wasteRate: "材料耗損", powerDraw: "耗電功率", electricityRate: "電費", pricing: "定價", targetMargin: "目標毛利率", minimumFee: "最低訂單金額", shipping: "運費", tax: "稅額", pdfDetails: "報價資料", companyName: "公司名稱", additionalQuoteDetails: "更多報價資料", companyDetails: "公司資料", customerName: "客戶名稱", customerDetails: "客戶資料", quoteNumber: "報價單號", validDays: "有效期限", targetQuote: "目標報價", totalCost: "總成本", profit: "利潤", margin: "毛利率", exportPdf: "匯出 PDF", exportCsv: "匯出 CSV", copySummary: "複製摘要", breakdown: "成本明細", materialCost: "材料", machine: "機器", electricity: "電費", labor: "人工", failureRisk: "失敗風險", total: "總計", subtotal: "未稅小計", quote: "報價單", date: "日期", preparedFor: "報價對象", project: "專案", description: "項目說明", qty: "數量", unitPrice: "單價", amount: "金額", validFor: "報價有效期 {days} 天", copied: "已複製摘要", csvExported: "CSV 已匯出", noConversion: "現有數值未自動換算。",
  },
};

const de: Dictionary = {
  common: {
    tools: "Tools",
    howItWorks: "So funktioniert es",
    guides: "Leitfäden",
    privacy: "Datenschutz",
    allTools: "Alle Tools",
    language: "Sprache",
    currency: "Währung",
    searchLanguage: "Sprache suchen",
    noLanguageResults: "Keine passende Sprache",
    searchCurrency: "Währung suchen",
    noCurrencyResults: "Keine passende Währung",
    darkMode: "Dunkelmodus aktivieren",
    lightMode: "Hellmodus aktivieren",
    live: "Live",
    soon: "Bald verfügbar",
    footerSummary: "Praktische Kostenrechner und Angebotsgeneratoren für Fertigung, lokale Dienstleistungen und selbstständige Arbeit. Open Source auf GitHub.",
    footerPrivacyPromise: "Die persönlichen Daten deiner Kunden bleiben in deinem Browser.",
    footer3d: "3D-Druckkosten",
    footerCleaning: "Reinigungsangebot",
    footerLaser: "Laserschneiden",
    resources: "Ressourcen",
    templates: "Vorlagen",
    pricingBasics: "Preisgrundlagen",
    contact: "Kontakt",
    feedback: "Feedback",
    footerLive: "3D-Druckrechner live",
    github: "GitHub",
  },
  home: {
    title: "Kostenrechner und Angebots-Tools | zaps.work",
    description: "Berechne echte Auftragskosten, sichere deine Marge und exportiere klare Angebote mit kostenlosen Tools von zaps.work.",
    eyebrow: "3D-Druckkostenrechner ist live",
    heading: "Kosten rein. Angebot raus.",
    subheading: "Kenne deine echten Kosten, schütze deine Marge und versende ein klares Angebot.",
    primaryCta: "3D-Druckrechner öffnen",
    secondaryCta: "Tools durchsuchen",
    workflowKicker: "Ein klarer Weg",
    workflowHeading: "Von Auftragsdaten zu einem fertigen Angebot.",
    workflowCopy: "Jedes Tool folgt demselben klaren Ablauf und behält die für die Arbeit wichtigen Eingaben.",
    toolsKicker: "Tool-Bibliothek",
    toolsHeading: "Beginne mit der Arbeit vor dir.",
    toolsCopy: "Ein Rechner ist live. Weitere Tools für Fertigung und Dienstleistungen folgen, sobald sie wirklich nützlich sind.",
    privacyKicker: "Datenschutz als Prinzip",
    privacyHeading: "Die Kundendaten bleiben bei dir.",
    privacyCopy: "Namen, E-Mails, Telefonnummern, Adressen, Firmendaten, Artikelnamen und Angebotsnummern verlassen deinen Browser nicht.",
    privacyLocal: "PDF- und CSV-Dateien werden direkt in deinem Browser erstellt.",
    privacyAnonymous: "Beim Export werden nur anonyme Material-, Zeit-, Kosten- und Margendaten erfasst.",
    privacyCta: "Unseren Datenschutz ansehen",
    privacyBrowserLabel: "Dein Browser",
    privacyBlockedLabel: "Private Felder geschützt",
    privacyMetricsLabel: "Anonyme Kennzahlen",
  },
  tool: {
    title: "3D-Druck-Kostenrechner: Preis berechnen | zaps.work",
    description: "3D-Druck-Kosten pro Stunde berechnen: Filament, Maschinenzeit, Strom, Arbeit, Fehldrucke und Marge kalkulieren und Angebot erstellen.",
    heading: "3D-Druckkostenrechner",
    intro: "Berechne Kosten und Verkaufspreis eines FDM-Drucks aus Filament, Maschinenzeit, Strom, Arbeit, Fehldruckrisiko und Zielmarge und exportiere ein Kundenangebot.",
    methodologyTitle: "Was der Rechner berücksichtigt",
    methodologyBody: "Die Schätzung kombiniert Filamentverbrauch, Ausschuss, Maschinenzeit, Strom, Arbeit, Verpackung, erwartete Ausfallkosten, Mindestgebühren, Marge, Versand und Steuern. Alle Annahmen bleiben anpassbar, damit das Ergebnis deinen eigenen Betrieb abbildet.",
    privacyNote: "Kundennamen und Kontaktdaten, einschließlich E-Mail, Telefon und Adresse, bleiben in deinem Browser und werden nicht in unserer Datenbank gespeichert.",
    faqTitle: "Fragen zu 3D-Druckkosten",
    faq: [
      { question: "Wie wird das empfohlene Angebot berechnet?", answer: "Der Rechner summiert Produktions- und Arbeitskosten, berücksichtigt erwartete Ausfälle und wendet anschließend Zielmarge und Mindestgebühr vor Steuern an." },
      { question: "Wie berechne ich 3D-Druck-Kosten pro Stunde?", answer: "Multipliziere die Druckdauer mit deinem Maschinenstundensatz und addiere den Stromverbrauch für denselben Zeitraum. Material, aktive Arbeit, Fehldruckrisiko, Verpackung und Gemeinkosten kommen hinzu." },
      { question: "Welche Kosten gehören in einen 3D-Druckpreis?", answer: "Berücksichtige Filament und Ausschuss, Maschinenzeit, Strom, Vorbereitung, Nachbearbeitung, erwartete Fehldrucke, Verpackung, Gemeinkosten, Versand, Steuer und deine benötigte Gewinnmarge." },
      { question: "Werden bestehende Werte beim Währungswechsel umgerechnet?", answer: "Ja. Geldwerte werden in die ausgewählte Währung umgerechnet und mit deren üblicher Dezimalzahl formatiert." },
      { question: "Kann ich mehrere Druckteile gemeinsam anbieten?", answer: "Ja. Füge bis zu zehn Positionen hinzu und exportiere sie als ein Kundenangebot." },
    ],
  },
  calculator: {
    input: "Eingabe", jobDetails: "Auftragsdaten", printItems: "Druckpositionen", addItem: "Position hinzufügen", itemName: "Positionsname", material: "Material", quantity: "Menge", filament: "Verbrauchtes Filament", printHours: "Druckstunden", printMinutes: "Druckminuten", itemCosts: "Positionskosten und Arbeit", spoolPrice: "Spulenpreis", spoolWeight: "Spulengewicht", preparation: "Vorbereitung", postProcessing: "Nachbearbeitung", packaging: "Verpackung", sharedRates: "Gemeinsame Sätze und Risiko", machineRate: "Maschinensatz", laborRate: "Arbeitssatz", failureRate: "Ausfallrate", wasteRate: "Materialausschuss", powerDraw: "Leistungsaufnahme", electricityRate: "Strompreis", pricing: "Preisgestaltung", targetMargin: "Zielmarge", minimumFee: "Mindestauftragswert", shipping: "Versand", tax: "Steuer", pdfDetails: "Angebotsdaten", companyName: "Firmenname", additionalQuoteDetails: "Weitere Angebotsdaten", companyDetails: "Firmendaten", customerName: "Kundenname", customerDetails: "Kundendaten", quoteNumber: "Angebotsnummer", validDays: "Gültig für", targetQuote: "Zielangebot", totalCost: "Gesamtkosten", profit: "Gewinn", margin: "Marge", exportPdf: "PDF exportieren", exportCsv: "CSV exportieren", copySummary: "Zusammenfassung kopieren", breakdown: "Kostenaufteilung", materialCost: "Material", machine: "Maschine", electricity: "Strom", labor: "Arbeit", failureRisk: "Ausfallrisiko", total: "Gesamt", subtotal: "Zwischensumme", quote: "ANGEBOT", date: "Datum", preparedFor: "Erstellt für", project: "Projekt", description: "Beschreibung", qty: "Menge", unitPrice: "Stückpreis", amount: "Betrag", validFor: "Gültig für {days} Tage", copied: "Zusammenfassung kopiert", csvExported: "CSV exportiert", noConversion: "Bestehende Werte wurden nicht umgerechnet.",
  },
};

const ja: Dictionary = {
  common: {
    tools: "ツール", howItWorks: "使い方", guides: "ガイド", privacy: "プライバシー", allTools: "すべてのツール", language: "言語", currency: "通貨", searchLanguage: "言語を検索", noLanguageResults: "該当する言語がありません", searchCurrency: "通貨を検索", noCurrencyResults: "該当する通貨がありません", darkMode: "ダークモードに切り替え", lightMode: "ライトモードに切り替え", live: "公開中", soon: "近日公開", footerSummary: "製造、地域サービス、個人の仕事に役立つコスト計算と見積もりツール。GitHubでオープンソースとして公開しています。", footerPrivacyPromise: "顧客の個人情報はブラウザ内に保管されます。", footer3d: "3Dプリントコスト", footerCleaning: "清掃見積もり", footerLaser: "レーザー加工", resources: "リソース", templates: "テンプレート", pricingBasics: "価格設定の基本", contact: "お問い合わせ", feedback: "フィードバック", footerLive: "3Dプリント計算機 公開中", github: "GitHub",
  },
  home: {
    title: "無料のコスト計算機と見積もりツール | zaps.work", description: "zaps.workの無料ツールで実際の仕事コストを計算し、利益率を確認して、わかりやすい見積書を作成できます。", eyebrow: "3Dプリントコスト計算機 公開中", heading: "コストを入れて、見積もりを出す。", subheading: "仕事の本当のコストを把握し、利益率を守り、わかりやすい見積書を送りましょう。", primaryCta: "3Dプリント計算機を開く", secondaryCta: "ツールを見る", workflowKicker: "シンプルな流れ", workflowHeading: "仕事の詳細から完成した見積書まで。", workflowCopy: "すべてのツールが同じ明快な流れに沿いながら、仕事に必要な入力を保ちます。", toolsKicker: "ツールライブラリ", toolsHeading: "目の前の仕事から始める。", toolsCopy: "現在は1つの計算機を公開中です。製造やサービス向けのツールも、役立つ状態になったら追加します。", privacyKicker: "プライバシーを設計に", privacyHeading: "顧客データはあなたのもの。", privacyCopy: "名前、メール、電話番号、住所、会社情報、項目名、見積番号はブラウザの外に出ません。", privacyLocal: "PDFとCSVはブラウザ内で直接作成されます。", privacyAnonymous: "エクスポート時に記録するのは匿名の材料、時間、コスト、利益率データだけです。", privacyCta: "プライバシーの方針を見る", privacyBrowserLabel: "あなたのブラウザ", privacyBlockedLabel: "個人情報フィールドを保護", privacyMetricsLabel: "匿名の指標",
  },
  tool: {
    title: "3Dプリントコスト計算機と見積もり作成 | zaps.work", description: "フィラメント、機械時間、電気代、人件費、失敗リスク、利益率を計算し、3Dプリントの見積書を作成します。", heading: "3Dプリントコスト計算機", intro: "材料、機械時間、人件費、失敗リスク、利益率を使ってFDMプリントの価格を計算し、PDFまたはCSVで出力できます。", methodologyTitle: "計算に含まれるもの", methodologyBody: "フィラメント使用量、廃棄、機械時間、電気代、人件費、梱包、想定される失敗コスト、最低料金、利益率、送料、税金を組み合わせて見積もります。前提はすべて編集できるため、自分の作業環境に合わせられます。", privacyNote: "顧客の名前やメール、電話、住所などの連絡先はブラウザ内に残り、データベースには保存されません。", faqTitle: "3Dプリントコストに関する質問", faq: [
      { question: "推奨見積もりはどのように計算されますか？", answer: "製造費と人件費を合計し、想定される失敗コストを加味したうえで、税引前に目標利益率と最低料金を適用します。" },
      { question: "通貨を変更すると既存の値は換算されますか？", answer: "はい。金額項目は選択した通貨へ換算され、その通貨の標準的な小数桁で表示されます。" },
      { question: "複数の印刷部品をまとめて見積もれますか？", answer: "はい。最大10項目を追加して、1つの顧客向け見積書として出力できます。" },
    ],
  },
  calculator: {
    input: "入力", jobDetails: "仕事の詳細", printItems: "印刷項目", addItem: "項目を追加", itemName: "項目名", material: "材料", quantity: "数量", filament: "フィラメント使用量", printHours: "印刷時間（時間）", printMinutes: "印刷時間（分）", itemCosts: "項目コストと人件費", spoolPrice: "スプール価格", spoolWeight: "スプール重量", preparation: "準備", postProcessing: "後処理", packaging: "梱包", sharedRates: "共通単価とリスク", machineRate: "機械単価", laborRate: "人件費単価", failureRate: "失敗率", wasteRate: "材料ロス", powerDraw: "消費電力", electricityRate: "電気料金", pricing: "価格設定", targetMargin: "目標利益率", minimumFee: "最低料金", shipping: "送料", tax: "税金", pdfDetails: "見積書の詳細", companyName: "会社名", additionalQuoteDetails: "追加の見積書情報", companyDetails: "会社情報", customerName: "顧客名", customerDetails: "顧客情報", quoteNumber: "見積番号", validDays: "有効期間", targetQuote: "目標見積額", totalCost: "総コスト", profit: "利益", margin: "利益率", exportPdf: "PDFを出力", exportCsv: "CSVを出力", copySummary: "概要をコピー", breakdown: "コスト内訳", materialCost: "材料", machine: "機械", electricity: "電気", labor: "人件費", failureRisk: "失敗リスク", total: "合計", subtotal: "小計", quote: "見積書", date: "日付", preparedFor: "宛先", project: "プロジェクト", description: "説明", qty: "数量", unitPrice: "単価", amount: "金額", validFor: "{days}日間有効", copied: "概要をコピーしました", csvExported: "CSVを出力しました", noConversion: "既存の値は換算されていません。",
  },
};

const es: Dictionary = {
  common: {
    tools: "Herramientas", howItWorks: "Cómo funciona", guides: "Guías", privacy: "Privacidad", allTools: "Todas las herramientas", language: "Idioma", currency: "Moneda", searchLanguage: "Buscar idioma", noLanguageResults: "No se encontró ningún idioma", searchCurrency: "Buscar moneda", noCurrencyResults: "No se encontró ninguna moneda", darkMode: "Activar modo oscuro", lightMode: "Activar modo claro", live: "Disponible", soon: "Próximamente", footerSummary: "Calculadoras de costes y generadores de presupuestos para fabricación, servicios locales y trabajo independiente. Código abierto en GitHub.", footerPrivacyPromise: "Los datos personales de tus clientes permanecen en tu navegador.", footer3d: "Coste de impresión 3D", footerCleaning: "Presupuesto de limpieza", footerLaser: "Corte láser", resources: "Recursos", templates: "Plantillas", pricingBasics: "Conceptos de precios", contact: "Contacto", feedback: "Comentarios", footerLive: "Calculadora 3D disponible", github: "GitHub",
  },
  home: {
    title: "Calculadoras de costes y presupuestos | zaps.work", description: "Calcula costes reales, protege tu margen y exporta presupuestos claros con las herramientas gratuitas de zaps.work.", eyebrow: "Calculadora de costes de impresión 3D disponible", heading: "Entra el coste. Sale el presupuesto.", subheading: "Conoce el coste real del trabajo, protege tu margen y envía un presupuesto claro.", primaryCta: "Abrir calculadora 3D", secondaryCta: "Ver herramientas", workflowKicker: "Un camino claro", workflowHeading: "De los datos del trabajo a un presupuesto listo.", workflowCopy: "Cada herramienta sigue el mismo flujo claro y conserva las entradas específicas de cada trabajo.", toolsKicker: "Biblioteca de herramientas", toolsHeading: "Empieza con el trabajo que tienes delante.", toolsCopy: "Hay una calculadora disponible. Añadiremos nuevas herramientas de fabricación y servicios cuando sean realmente útiles.", privacyKicker: "Privacidad por diseño", privacyHeading: "Los datos de tus clientes son tuyos.", privacyCopy: "Nombres, correos, teléfonos, direcciones, datos de empresa, nombres de artículos y números de presupuesto no salen de tu navegador.", privacyLocal: "Los archivos PDF y CSV se generan directamente en tu navegador.", privacyAnonymous: "Al exportar solo registramos datos anónimos de materiales, tiempo, costes y margen.", privacyCta: "Conoce nuestro enfoque de privacidad", privacyBrowserLabel: "Tu navegador", privacyBlockedLabel: "Campos privados protegidos", privacyMetricsLabel: "Métricas anónimas",
  },
  tool: {
    title: "Calculadora de costes de impresión 3D y presupuestos | zaps.work", description: "Calcula filamento, tiempo de máquina, electricidad, mano de obra, riesgo de fallo y margen para crear un presupuesto de impresión 3D.", heading: "Calculadora de costes de impresión 3D", intro: "Calcula el precio de una impresión FDM con material, tiempo de máquina, mano de obra, riesgo de fallo, margen y exportación PDF o CSV.", methodologyTitle: "Qué incluye la calculadora", methodologyBody: "La estimación combina consumo de filamento, desperdicio, tiempo de máquina, electricidad, mano de obra, embalaje, coste esperado de fallos, tarifas mínimas, margen, envío e impuestos. Todos los supuestos son editables para reflejar tu negocio.", privacyNote: "Los nombres y datos de contacto de clientes, incluidos correo, teléfono y dirección, permanecen en tu navegador y no se guardan en nuestra base de datos.", faqTitle: "Preguntas sobre costes de impresión 3D", faq: [
      { question: "¿Cómo se calcula el presupuesto recomendado?", answer: "La calculadora suma los costes de producción y mano de obra, considera los fallos esperados y aplica el margen objetivo y la tarifa mínima antes de impuestos." },
      { question: "¿Cambiar la moneda convierte los valores existentes?", answer: "Sí. Los importes se convierten a la moneda seleccionada y usan su número estándar de decimales." },
      { question: "¿Puedo presupuestar varias piezas juntas?", answer: "Sí. Añade hasta diez artículos y expórtalos como un único presupuesto para el cliente." },
    ],
  },
  calculator: {
    input: "Entrada", jobDetails: "Detalles del trabajo", printItems: "Artículos impresos", addItem: "Añadir artículo", itemName: "Nombre del artículo", material: "Material", quantity: "Cantidad", filament: "Filamento usado", printHours: "Horas de impresión", printMinutes: "Minutos de impresión", itemCosts: "Costes y mano de obra del artículo", spoolPrice: "Precio de la bobina", spoolWeight: "Peso de la bobina", preparation: "Preparación", postProcessing: "Postprocesado", packaging: "Embalaje", sharedRates: "Tarifas y riesgo compartidos", machineRate: "Tarifa de máquina", laborRate: "Tarifa de mano de obra", failureRate: "Tasa de fallos", wasteRate: "Desperdicio de material", powerDraw: "Consumo eléctrico", electricityRate: "Tarifa eléctrica", pricing: "Precios", targetMargin: "Margen objetivo", minimumFee: "Tarifa mínima", shipping: "Envío", tax: "Impuesto", pdfDetails: "Datos del presupuesto", companyName: "Nombre de la empresa", additionalQuoteDetails: "Datos adicionales del presupuesto", companyDetails: "Datos de la empresa", customerName: "Nombre del cliente", customerDetails: "Datos del cliente", quoteNumber: "Número de presupuesto", validDays: "Validez", targetQuote: "Presupuesto objetivo", totalCost: "Coste total", profit: "Beneficio", margin: "Margen", exportPdf: "Exportar PDF", exportCsv: "Exportar CSV", copySummary: "Copiar resumen", breakdown: "Desglose de costes", materialCost: "Material", machine: "Máquina", electricity: "Electricidad", labor: "Mano de obra", failureRisk: "Riesgo de fallo", total: "Total", subtotal: "Subtotal", quote: "PRESUPUESTO", date: "Fecha", preparedFor: "Preparado para", project: "Proyecto", description: "Descripción", qty: "Cant.", unitPrice: "Precio unitario", amount: "Importe", validFor: "Válido durante {days} días", copied: "Resumen copiado", csvExported: "CSV exportado", noConversion: "Los valores existentes no se han convertido.",
  },
};

const fr: Dictionary = {
  common: {
    tools: "Outils", howItWorks: "Comment ça marche", guides: "Guides", privacy: "Confidentialité", allTools: "Tous les outils", language: "Langue", currency: "Devise", searchLanguage: "Rechercher une langue", noLanguageResults: "Aucune langue trouvée", searchCurrency: "Rechercher une devise", noCurrencyResults: "Aucune devise trouvée", darkMode: "Activer le mode sombre", lightMode: "Activer le mode clair", live: "En ligne", soon: "Bientôt", footerSummary: "Des calculateurs de coûts et générateurs de devis pour la fabrication, les services locaux et les indépendants. Open source sur GitHub.", footerPrivacyPromise: "Les données personnelles de vos clients restent dans votre navigateur.", footer3d: "Coût d’impression 3D", footerCleaning: "Devis de nettoyage", footerLaser: "Découpe laser", resources: "Ressources", templates: "Modèles", pricingBasics: "Bases de la tarification", contact: "Contact", feedback: "Commentaires", footerLive: "Calculateur 3D en ligne", github: "GitHub",
  },
  home: {
    title: "Calculateurs de coûts et outils de devis | zaps.work", description: "Calculez les coûts réels, protégez votre marge et exportez des devis clairs avec les outils gratuits de zaps.work.", eyebrow: "Calculateur de coût d’impression 3D en ligne", heading: "Le coût entre. Le devis sort.", subheading: "Connaissez le coût réel du travail, protégez votre marge et envoyez un devis clair.", primaryCta: "Ouvrir le calculateur 3D", secondaryCta: "Voir les outils", workflowKicker: "Un parcours clair", workflowHeading: "Des détails du travail à un devis prêt à envoyer.", workflowCopy: "Chaque outil suit le même parcours simple tout en gardant les données propres à chaque travail.", toolsKicker: "Bibliothèque d’outils", toolsHeading: "Commencez par le travail devant vous.", toolsCopy: "Un calculateur est en ligne. D’autres outils pour la fabrication et les services arriveront lorsqu’ils seront vraiment utiles.", privacyKicker: "La confidentialité par conception", privacyHeading: "Les données de vos clients restent à vous.", privacyCopy: "Les noms, e-mails, téléphones, adresses, informations d’entreprise, noms d’articles et numéros de devis ne quittent pas votre navigateur.", privacyLocal: "Les fichiers PDF et CSV sont générés directement dans votre navigateur.", privacyAnonymous: "Lors d’un export, seules des données anonymes de matière, temps, coût et marge sont enregistrées.", privacyCta: "Voir notre approche de la confidentialité", privacyBrowserLabel: "Votre navigateur", privacyBlockedLabel: "Champs privés protégés", privacyMetricsLabel: "Indicateurs anonymes",
  },
  tool: {
    title: "Calculateur de coût d’impression 3D et générateur de devis | zaps.work", description: "Calculez le filament, le temps machine, l’électricité, la main-d’œuvre, le risque d’échec et la marge pour créer un devis d’impression 3D.", heading: "Calculateur de coût d’impression 3D", intro: "Calculez le prix d’une impression FDM avec la matière, le temps machine, la main-d’œuvre, le risque d’échec, la marge et un export PDF ou CSV.", methodologyTitle: "Ce que le calculateur inclut", methodologyBody: "L’estimation combine la consommation de filament, les pertes, le temps machine, l’électricité, la main-d’œuvre, l’emballage, le coût attendu des échecs, les frais minimums, la marge, l’expédition et les taxes. Toutes les hypothèses sont modifiables.", privacyNote: "Les noms et coordonnées des clients, notamment leur e-mail, téléphone et adresse, restent dans votre navigateur et ne sont pas enregistrés dans notre base de données.", faqTitle: "Questions sur le coût de l’impression 3D", faq: [
      { question: "Comment le devis recommandé est-il calculé ?", answer: "Le calculateur additionne les coûts de production et de main-d’œuvre, prend en compte les échecs prévus, puis applique la marge cible et les frais minimums avant taxes." },
      { question: "Le changement de devise convertit-il les valeurs existantes ?", answer: "Oui. Les montants sont convertis dans la devise choisie et utilisent son nombre standard de décimales." },
      { question: "Puis-je regrouper plusieurs pièces dans un devis ?", answer: "Oui. Ajoutez jusqu’à dix articles et exportez-les dans un seul devis client." },
    ],
  },
  calculator: {
    input: "Saisie", jobDetails: "Détails du travail", printItems: "Articles imprimés", addItem: "Ajouter un article", itemName: "Nom de l’article", material: "Matière", quantity: "Quantité", filament: "Filament utilisé", printHours: "Heures d’impression", printMinutes: "Minutes d’impression", itemCosts: "Coûts et main-d’œuvre de l’article", spoolPrice: "Prix de la bobine", spoolWeight: "Poids de la bobine", preparation: "Préparation", postProcessing: "Post-traitement", packaging: "Emballage", sharedRates: "Taux et risques partagés", machineRate: "Taux machine", laborRate: "Taux de main-d’œuvre", failureRate: "Taux d’échec", wasteRate: "Pertes de matière", powerDraw: "Puissance électrique", electricityRate: "Tarif électrique", pricing: "Tarification", targetMargin: "Marge cible", minimumFee: "Frais minimums", shipping: "Expédition", tax: "Taxe", pdfDetails: "Détails du devis", companyName: "Nom de l’entreprise", additionalQuoteDetails: "Détails supplémentaires du devis", companyDetails: "Informations de l’entreprise", customerName: "Nom du client", customerDetails: "Informations du client", quoteNumber: "Numéro de devis", validDays: "Valable", targetQuote: "Devis cible", totalCost: "Coût total", profit: "Bénéfice", margin: "Marge", exportPdf: "Exporter le PDF", exportCsv: "Exporter le CSV", copySummary: "Copier le résumé", breakdown: "Détail des coûts", materialCost: "Matière", machine: "Machine", electricity: "Électricité", labor: "Main-d’œuvre", failureRisk: "Risque d’échec", total: "Total", subtotal: "Sous-total", quote: "DEVIS", date: "Date", preparedFor: "Préparé pour", project: "Projet", description: "Description", qty: "Qté", unitPrice: "Prix unitaire", amount: "Montant", validFor: "Valable {days} jours", copied: "Résumé copié", csvExported: "CSV exporté", noConversion: "Les valeurs existantes n’ont pas été converties.",
  },
};

const ptBr: Dictionary = {
  common: {
    tools: "Ferramentas", howItWorks: "Como funciona", guides: "Guias", privacy: "Privacidade", allTools: "Todas as ferramentas", language: "Idioma", currency: "Moeda", searchLanguage: "Buscar idioma", noLanguageResults: "Nenhum idioma encontrado", searchCurrency: "Buscar moeda", noCurrencyResults: "Nenhuma moeda encontrada", darkMode: "Ativar modo escuro", lightMode: "Ativar modo claro", live: "Disponível", soon: "Em breve", footerSummary: "Calculadoras de custos e geradores de orçamentos para fabricação, serviços locais e trabalho independente. Código aberto no GitHub.", footerPrivacyPromise: "Os dados pessoais dos seus clientes ficam no seu navegador.", footer3d: "Custo de impressão 3D", footerCleaning: "Orçamento de limpeza", footerLaser: "Corte a laser", resources: "Recursos", templates: "Modelos", pricingBasics: "Noções de preços", contact: "Contato", feedback: "Feedback", footerLive: "Calculadora 3D disponível", github: "GitHub",
  },
  home: {
    title: "Calculadoras de custos e orçamentos | zaps.work", description: "Calcule custos reais, proteja sua margem e exporte orçamentos claros com as ferramentas gratuitas da zaps.work.", eyebrow: "Calculadora de custos de impressão 3D disponível", heading: "Entra o custo. Sai o orçamento.", subheading: "Conheça o custo real do trabalho, proteja sua margem e envie um orçamento claro.", primaryCta: "Abrir calculadora 3D", secondaryCta: "Ver ferramentas", workflowKicker: "Um caminho claro", workflowHeading: "Dos detalhes do trabalho a um orçamento pronto.", workflowCopy: "Cada ferramenta segue o mesmo fluxo claro, mantendo os dados específicos de cada trabalho.", toolsKicker: "Biblioteca de ferramentas", toolsHeading: "Comece pelo trabalho à sua frente.", toolsCopy: "Uma calculadora está disponível. Novas ferramentas para fabricação e serviços serão adicionadas quando estiverem realmente úteis.", privacyKicker: "Privacidade desde o início", privacyHeading: "Os dados dos seus clientes são seus.", privacyCopy: "Nomes, e-mails, telefones, endereços, dados da empresa, nomes de itens e números de orçamento não saem do seu navegador.", privacyLocal: "Arquivos PDF e CSV são gerados diretamente no seu navegador.", privacyAnonymous: "Ao exportar, registramos apenas dados anônimos de material, tempo, custo e margem.", privacyCta: "Conheça nossa abordagem de privacidade", privacyBrowserLabel: "Seu navegador", privacyBlockedLabel: "Campos privados protegidos", privacyMetricsLabel: "Métricas anônimas",
  },
  tool: {
    title: "Calculadora de custos de impressão 3D e gerador de orçamentos | zaps.work", description: "Calcule filamento, tempo de máquina, energia, mão de obra, risco de falha e margem para criar um orçamento de impressão 3D.", heading: "Calculadora de custos de impressão 3D", intro: "Calcule o preço de uma impressão FDM com material, tempo de máquina, mão de obra, risco de falha, margem e exportação em PDF ou CSV.", methodologyTitle: "O que a calculadora inclui", methodologyBody: "A estimativa combina uso de filamento, desperdício, tempo de máquina, energia, mão de obra, embalagem, custo esperado de falhas, taxas mínimas, margem, frete e impostos. Todas as premissas podem ser editadas.", privacyNote: "Nomes e dados de contato dos clientes, incluindo e-mail, telefone e endereço, ficam no seu navegador e não são armazenados no nosso banco de dados.", faqTitle: "Dúvidas sobre custos de impressão 3D", faq: [
      { question: "Como o orçamento recomendado é calculado?", answer: "A calculadora soma custos de produção e mão de obra, considera falhas esperadas e aplica a margem desejada e a taxa mínima antes dos impostos." },
      { question: "Trocar a moeda converte os valores existentes?", answer: "Sim. Os valores monetários são convertidos para a moeda escolhida e usam as casas decimais padrão dela." },
      { question: "Posso incluir várias peças no mesmo orçamento?", answer: "Sim. Adicione até dez itens e exporte tudo como um único orçamento para o cliente." },
    ],
  },
  calculator: {
    input: "Entrada", jobDetails: "Detalhes do trabalho", printItems: "Itens impressos", addItem: "Adicionar item", itemName: "Nome do item", material: "Material", quantity: "Quantidade", filament: "Filamento usado", printHours: "Horas de impressão", printMinutes: "Minutos de impressão", itemCosts: "Custos e mão de obra do item", spoolPrice: "Preço do rolo", spoolWeight: "Peso do rolo", preparation: "Preparação", postProcessing: "Pós-processamento", packaging: "Embalagem", sharedRates: "Taxas e risco compartilhados", machineRate: "Taxa da máquina", laborRate: "Taxa de mão de obra", failureRate: "Taxa de falha", wasteRate: "Desperdício de material", powerDraw: "Consumo de energia", electricityRate: "Tarifa de energia", pricing: "Preços", targetMargin: "Margem desejada", minimumFee: "Taxa mínima", shipping: "Frete", tax: "Imposto", pdfDetails: "Dados do orçamento", companyName: "Nome da empresa", additionalQuoteDetails: "Dados adicionais do orçamento", companyDetails: "Dados da empresa", customerName: "Nome do cliente", customerDetails: "Dados do cliente", quoteNumber: "Número do orçamento", validDays: "Validade", targetQuote: "Orçamento desejado", totalCost: "Custo total", profit: "Lucro", margin: "Margem", exportPdf: "Exportar PDF", exportCsv: "Exportar CSV", copySummary: "Copiar resumo", breakdown: "Detalhamento de custos", materialCost: "Material", machine: "Máquina", electricity: "Energia", labor: "Mão de obra", failureRisk: "Risco de falha", total: "Total", subtotal: "Subtotal", quote: "ORÇAMENTO", date: "Data", preparedFor: "Preparado para", project: "Projeto", description: "Descrição", qty: "Qtd.", unitPrice: "Preço unitário", amount: "Valor", validFor: "Válido por {days} dias", copied: "Resumo copiado", csvExported: "CSV exportado", noConversion: "Os valores existentes não foram convertidos.",
  },
};

const ko: Dictionary = {
  common: {
    tools: "도구", howItWorks: "사용 방법", guides: "가이드", privacy: "개인정보 보호", allTools: "모든 도구", language: "언어", currency: "통화", searchLanguage: "언어 검색", noLanguageResults: "일치하는 언어가 없습니다", searchCurrency: "통화 검색", noCurrencyResults: "일치하는 통화가 없습니다", darkMode: "다크 모드로 전환", lightMode: "라이트 모드로 전환", live: "사용 가능", soon: "곧 출시", footerSummary: "제조, 지역 서비스, 독립 작업자를 위한 실용적인 비용 계산기와 견적 도구입니다. GitHub에서 오픈 소스로 공개합니다.", footerPrivacyPromise: "고객의 개인정보는 브라우저에만 보관됩니다.", footer3d: "3D 프린팅 비용", footerCleaning: "청소 견적", footerLaser: "레이저 절단", resources: "리소스", templates: "템플릿", pricingBasics: "가격 책정 기본", contact: "문의", feedback: "피드백", footerLive: "3D 프린팅 계산기 사용 가능", github: "GitHub",
  },
  home: {
    title: "무료 비용 계산기 및 견적 도구 | zaps.work", description: "zaps.work의 무료 도구로 실제 작업 비용을 계산하고, 마진을 확인하고, 명확한 견적을 내보내세요.", eyebrow: "3D 프린팅 비용 계산기 사용 가능", heading: "비용을 입력하고, 견적을 완성하세요.", subheading: "실제 작업 비용을 파악하고 마진을 지키며 명확한 견적을 보내세요.", primaryCta: "3D 프린팅 계산기 열기", secondaryCta: "도구 보기", workflowKicker: "명확한 작업 흐름", workflowHeading: "작업 정보에서 완성된 견적까지.", workflowCopy: "모든 도구는 같은 명확한 흐름을 따르면서 작업에 필요한 입력을 유지합니다.", toolsKicker: "도구 라이브러리", toolsHeading: "지금 필요한 작업부터 시작하세요.", toolsCopy: "현재 하나의 계산기를 제공합니다. 제조와 서비스용 도구는 충분히 유용해지면 추가합니다.", privacyKicker: "개인정보 보호 설계", privacyHeading: "고객 데이터는 여러분의 것입니다.", privacyCopy: "이름, 이메일, 전화번호, 주소, 회사 정보, 항목 이름, 견적 번호는 브라우저 밖으로 나가지 않습니다.", privacyLocal: "PDF와 CSV 파일은 브라우저에서 직접 생성됩니다.", privacyAnonymous: "내보낼 때 익명의 재료, 시간, 비용, 마진 데이터만 기록합니다.", privacyCta: "개인정보 보호 방식 보기", privacyBrowserLabel: "내 브라우저", privacyBlockedLabel: "개인 필드 보호됨", privacyMetricsLabel: "익명 지표",
  },
  tool: {
    title: "3D 프린팅 비용 계산기 및 견적 생성기 | zaps.work", description: "필라멘트, 장비 시간, 전기, 인건비, 실패 위험, 마진을 계산해 3D 프린팅 견적을 만드세요.", heading: "3D 프린팅 비용 계산기", intro: "재료, 장비 시간, 인건비, 실패 위험, 마진을 사용해 FDM 출력 가격을 계산하고 PDF 또는 CSV로 내보낼 수 있습니다.", methodologyTitle: "계산기에 포함되는 항목", methodologyBody: "필라멘트 사용량, 폐기물, 장비 시간, 전기, 인건비, 포장, 예상 실패 비용, 최소 수수료, 마진, 배송비, 세금을 계산에 반영합니다. 모든 가정은 직접 수정할 수 있습니다.", privacyNote: "고객 이름과 이메일, 전화번호, 주소를 포함한 연락처 정보는 브라우저에 남으며 데이터베이스에 저장되지 않습니다.", faqTitle: "3D 프린팅 비용 질문", faq: [
      { question: "추천 견적은 어떻게 계산되나요?", answer: "생산비와 인건비를 합산하고 예상 실패 비용을 반영한 뒤, 세전 기준으로 목표 마진과 최소 수수료를 적용합니다." },
      { question: "통화를 바꾸면 기존 값이 환산되나요?", answer: "네. 금액 입력값은 선택한 통화로 환산되고 해당 통화의 표준 소수 자릿수로 표시됩니다." },
      { question: "여러 출력 부품을 한 번에 견적낼 수 있나요?", answer: "네. 최대 10개의 항목을 추가해 하나의 고객용 견적으로 내보낼 수 있습니다." },
    ],
  },
  calculator: {
    input: "입력", jobDetails: "작업 정보", printItems: "출력 항목", addItem: "항목 추가", itemName: "항목 이름", material: "재료", quantity: "수량", filament: "사용 필라멘트", printHours: "출력 시간(시간)", printMinutes: "출력 시간(분)", itemCosts: "항목 비용 및 인건비", spoolPrice: "스풀 가격", spoolWeight: "스풀 무게", preparation: "준비", postProcessing: "후처리", packaging: "포장", sharedRates: "공통 요율 및 위험", machineRate: "장비 요율", laborRate: "인건비 요율", failureRate: "실패율", wasteRate: "재료 폐기율", powerDraw: "전력 소비", electricityRate: "전기 요율", pricing: "가격 설정", targetMargin: "목표 마진", minimumFee: "최소 작업 수수료", shipping: "배송", tax: "세금", pdfDetails: "견적 정보", companyName: "회사명", additionalQuoteDetails: "추가 견적 정보", companyDetails: "회사 정보", customerName: "고객명", customerDetails: "고객 정보", quoteNumber: "견적 번호", validDays: "유효 기간", targetQuote: "목표 견적", totalCost: "총비용", profit: "이익", margin: "마진", exportPdf: "PDF 내보내기", exportCsv: "CSV 내보내기", copySummary: "요약 복사", breakdown: "비용 내역", materialCost: "재료", machine: "장비", electricity: "전기", labor: "인건비", failureRisk: "실패 위험", total: "합계", subtotal: "소계", quote: "견적서", date: "날짜", preparedFor: "수신자", project: "프로젝트", description: "설명", qty: "수량", unitPrice: "단가", amount: "금액", validFor: "{days}일 동안 유효", copied: "요약이 복사되었습니다", csvExported: "CSV를 내보냈습니다", noConversion: "기존 값은 환산되지 않았습니다.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, "zh-hant": zhHant, de, ja, es, fr, "pt-br": ptBr, ko };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
