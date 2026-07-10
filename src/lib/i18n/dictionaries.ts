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
    title: "3D Print Cost Calculator & Quote Generator | zaps.work",
    description: "Calculate filament, machine time, electricity, labor, failure risk, margin, and a customer-ready 3D printing quote.",
    heading: "3D Print Cost Calculator",
    intro: "Price an FDM print with material, machine time, labor, failure risk, margin, and customer-ready PDF or CSV output.",
    methodologyTitle: "What the calculator includes",
    methodologyBody: "The estimate combines filament usage, waste, machine time, electricity, labor, packaging, expected failure cost, minimum fees, margin, shipping, and tax. Inputs stay editable so the result reflects your own shop rather than a generic market average.",
    privacyNote: "Customer names and contact details, including email, phone, and address, stay in your browser and are not stored in our database.",
    faqTitle: "3D printing cost questions",
    faq: [
      { question: "How is the suggested quote calculated?", answer: "The calculator totals production and labor costs, adjusts for expected failures, then applies your target margin and minimum fee before tax." },
      { question: "Does changing currency convert existing values?", answer: "No. Currency changes the label and formatting only. Enter rates and prices in the selected currency." },
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
      { question: "切換貨幣會自動換算嗎？", answer: "不會。切換貨幣只改變標示與格式，費率和價格請用所選貨幣輸入。" },
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
    title: "3D-Druckkostenrechner und Angebotsgenerator | zaps.work",
    description: "Berechne Filament, Maschinenzeit, Strom, Arbeit, Ausfallrisiko und Marge und erstelle ein fertiges 3D-Druckangebot.",
    heading: "3D-Druckkostenrechner",
    intro: "Berechne den Preis eines FDM-Drucks mit Material, Maschinenzeit, Arbeit, Ausfallrisiko, Marge und PDF- oder CSV-Ausgabe für Kunden.",
    methodologyTitle: "Was der Rechner berücksichtigt",
    methodologyBody: "Die Schätzung kombiniert Filamentverbrauch, Ausschuss, Maschinenzeit, Strom, Arbeit, Verpackung, erwartete Ausfallkosten, Mindestgebühren, Marge, Versand und Steuern. Alle Annahmen bleiben anpassbar, damit das Ergebnis deinen eigenen Betrieb abbildet.",
    privacyNote: "Kundennamen und Kontaktdaten, einschließlich E-Mail, Telefon und Adresse, bleiben in deinem Browser und werden nicht in unserer Datenbank gespeichert.",
    faqTitle: "Fragen zu 3D-Druckkosten",
    faq: [
      { question: "Wie wird das empfohlene Angebot berechnet?", answer: "Der Rechner summiert Produktions- und Arbeitskosten, berücksichtigt erwartete Ausfälle und wendet anschließend Zielmarge und Mindestgebühr vor Steuern an." },
      { question: "Werden bestehende Werte beim Währungswechsel umgerechnet?", answer: "Nein. Der Währungswechsel ändert nur Bezeichnung und Format. Gib Preise und Sätze in der ausgewählten Währung ein." },
      { question: "Kann ich mehrere Druckteile gemeinsam anbieten?", answer: "Ja. Füge bis zu zehn Positionen hinzu und exportiere sie als ein Kundenangebot." },
    ],
  },
  calculator: {
    input: "Eingabe", jobDetails: "Auftragsdaten", printItems: "Druckpositionen", addItem: "Position hinzufügen", itemName: "Positionsname", material: "Material", quantity: "Menge", filament: "Verbrauchtes Filament", printHours: "Druckstunden", printMinutes: "Druckminuten", itemCosts: "Positionskosten und Arbeit", spoolPrice: "Spulenpreis", spoolWeight: "Spulengewicht", preparation: "Vorbereitung", postProcessing: "Nachbearbeitung", packaging: "Verpackung", sharedRates: "Gemeinsame Sätze und Risiko", machineRate: "Maschinensatz", laborRate: "Arbeitssatz", failureRate: "Ausfallrate", wasteRate: "Materialausschuss", powerDraw: "Leistungsaufnahme", electricityRate: "Strompreis", pricing: "Preisgestaltung", targetMargin: "Zielmarge", minimumFee: "Mindestauftragswert", shipping: "Versand", tax: "Steuer", pdfDetails: "Angebotsdaten", companyName: "Firmenname", additionalQuoteDetails: "Weitere Angebotsdaten", companyDetails: "Firmendaten", customerName: "Kundenname", customerDetails: "Kundendaten", quoteNumber: "Angebotsnummer", validDays: "Gültig für", targetQuote: "Zielangebot", totalCost: "Gesamtkosten", profit: "Gewinn", margin: "Marge", exportPdf: "PDF exportieren", exportCsv: "CSV exportieren", copySummary: "Zusammenfassung kopieren", breakdown: "Kostenaufteilung", materialCost: "Material", machine: "Maschine", electricity: "Strom", labor: "Arbeit", failureRisk: "Ausfallrisiko", total: "Gesamt", subtotal: "Zwischensumme", quote: "ANGEBOT", date: "Datum", preparedFor: "Erstellt für", project: "Projekt", description: "Beschreibung", qty: "Menge", unitPrice: "Stückpreis", amount: "Betrag", validFor: "Gültig für {days} Tage", copied: "Zusammenfassung kopiert", csvExported: "CSV exportiert", noConversion: "Bestehende Werte wurden nicht umgerechnet.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, "zh-hant": zhHant, de };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
