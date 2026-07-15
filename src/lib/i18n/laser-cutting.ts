import type { Locale } from "./config";
import { withSimplifiedChinese } from "./simplified-chinese";

export type LaserCuttingCopy = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  material: string;
  mildSteel: string;
  stainlessSteel: string;
  aluminum: string;
  acrylic: string;
  plywood: string;
  other: string;
  materialThickness: string;
  thicknessUnit: string;
  materialArea: string;
  materialRate: string;
  wasteRate: string;
  quantity: string;
  measurementUnit: string;
  squareFeet: string;
  squareMeters: string;
  cutStats: string;
  cutLength: string;
  cutLengthUnit: string;
  cutTimeMinutes: string;
  pierceCount: string;
  machineRate: string;
  setupHandling: string;
  setupMinutes: string;
  handlingMinutes: string;
  laborRate: string;
  optionalCosts: string;
  finishingCost: string;
  otherCost: string;
  pricing: string;
  targetMargin: string;
  packageDiscount: string;
  taxRate: string;
  quoteDetails: string;
  materialLine: string;
  targetQuote: string;
  directCost: string;
  profit: string;
  margin: string;
  materialCost: string;
  machineCost: string;
  setupCost: string;
  handlingCost: string;
  finishing: string;
  pricingFloor: string;
  methodologyTitle: string;
  methodologyBody: string;
  privacyNote: string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
};

const enCopy: LaserCuttingCopy = {
  title: "Laser Cutting Cost Calculator & Quote Generator | zaps.work",
  description: "Estimate sheet material, machine time, setup, handling, waste, and margin for laser cutting jobs.",
  heading: "Laser Cutting Quote",
  intro: "Turn manual CAD/CAM statistics into a consistent laser cutting quote without rebuilding a spreadsheet.",
  material: "Material",
  mildSteel: "Mild steel",
  stainlessSteel: "Stainless steel",
  aluminum: "Aluminum",
  acrylic: "Acrylic",
  plywood: "Plywood",
  other: "Other",
  materialThickness: "Thickness",
  thicknessUnit: "Thickness unit",
  materialArea: "Material area",
  materialRate: "Material rate",
  wasteRate: "Waste",
  quantity: "Quantity",
  measurementUnit: "Unit system",
  squareFeet: "sq ft",
  squareMeters: "sq m",
  cutStats: "Cut & machine data",
  cutLength: "Cut length",
  cutLengthUnit: "Cut length unit",
  cutTimeMinutes: "Cut time",
  pierceCount: "Pierces",
  machineRate: "Machine rate",
  setupHandling: "Setup & handling",
  setupMinutes: "Setup time",
  handlingMinutes: "Handling time",
  laborRate: "Labor rate",
  optionalCosts: "Finishing & other costs",
  finishingCost: "Finishing per part",
  otherCost: "Other job cost",
  pricing: "Pricing",
  targetMargin: "Target margin",
  packageDiscount: "Package discount",
  taxRate: "Tax",
  quoteDetails: "Quote details",
  materialLine: "Laser cutting service",
  targetQuote: "Target quote",
  directCost: "Direct cost",
  profit: "Profit",
  margin: "Margin",
  materialCost: "Material",
  machineCost: "Machine",
  setupCost: "Setup labor",
  handlingCost: "Handling labor",
  finishing: "Finishing",
  pricingFloor: "Pricing floor",
  methodologyTitle: "What this estimate includes",
  methodologyBody: "The estimate combines material area, thickness, waste, cut time, machine rate, setup, handling, finishing, quantity, target margin, discount, and tax. Cut length and pierce count are kept as job notes from your CAD/CAM workflow.",
  privacyNote: "Customer names and contact details stay in your browser and are not stored in our database.",
  faqTitle: "Laser cutting quote questions",
  faq: [
    { question: "Where do the cutting inputs come from?", answer: "Enter the material area and the cut time, length, and pierce count from your CAD/CAM or nesting workflow. The first version does not parse CAD files." },
    { question: "How is setup handled for batches?", answer: "Setup labor is applied once per quote, while material, machine time, and handling are multiplied by quantity." },
    { question: "Can I add finishing or other job costs?", answer: "Yes. Turn on the optional cost group when the job needs finishing or another fixed cost." },
  ],
};

const baseCopies: Record<Exclude<Locale, "zh-hans">, LaserCuttingCopy> = {
  en: enCopy,
  "zh-hant": { ...enCopy, title: "雷射切割成本計算器與報價工具 | zaps.work", description: "估算板材、機器時間、設定、搬運、損耗與毛利，快速產生雷射切割報價。", heading: "雷射切割報價", intro: "輸入 CAD/CAM 統計資料，快速產生一致的雷射切割報價。", material: "材料", mildSteel: "碳鋼", stainlessSteel: "不鏽鋼", aluminum: "鋁", acrylic: "壓克力", plywood: "木板", other: "其他材料", materialThickness: "厚度", thicknessUnit: "厚度單位", materialArea: "材料面積", materialRate: "材料單價", wasteRate: "損耗", quantity: "數量", measurementUnit: "單位系統", squareFeet: "平方英尺", squareMeters: "平方公尺", cutStats: "切割與機器資料", cutLength: "切割長度", cutLengthUnit: "長度單位", cutTimeMinutes: "切割時間", pierceCount: "穿孔數", machineRate: "機器費率", setupHandling: "設定與搬運", setupMinutes: "設定時間", handlingMinutes: "搬運時間", laborRate: "人工費率", optionalCosts: "後處理與其他成本", finishingCost: "每件後處理", otherCost: "其他工作成本", pricing: "定價", targetMargin: "目標毛利率", packageDiscount: "套裝折扣", taxRate: "稅額", quoteDetails: "報價資料", materialLine: "雷射切割服務", targetQuote: "目標報價", directCost: "直接成本", profit: "利潤", margin: "毛利率", materialCost: "材料", machineCost: "機器", setupCost: "設定人工", handlingCost: "搬運人工", finishing: "後處理", pricingFloor: "定價底線", methodologyTitle: "估價包含哪些內容", methodologyBody: "估價會合併材料面積、厚度、損耗、切割時間、機器費率、設定、搬運、後處理、數量、目標毛利、折扣與稅額。切割長度與穿孔數會保留為 CAD/CAM 工作流程的備註。", privacyNote: "客戶姓名與聯絡資料會留在你的瀏覽器中，不會儲存在我們的資料庫。", faqTitle: "雷射切割報價問題" },
  de: { ...enCopy, title: "Laserschneidkostenrechner und Angebotsgenerator | zaps.work", description: "Material, Maschinenzeit, Einrichtung, Handhabung, Ausschuss und Marge für Laserschneidaufträge kalkulieren.", heading: "Angebot für Laserschneiden", intro: "Manuelle CAD/CAM-Daten in ein einheitliches Angebot umwandeln.", material: "Material", materialThickness: "Dicke", materialArea: "Materialfläche", materialRate: "Materialsatz", wasteRate: "Ausschuss", quantity: "Menge", measurementUnit: "Einheitensystem", cutStats: "Schnitt- und Maschinendaten", cutLength: "Schnittlänge", cutTimeMinutes: "Schnittzeit", pierceCount: "Piercings", machineRate: "Maschinensatz", setupHandling: "Einrichtung und Handhabung", setupMinutes: "Einrichtungszeit", handlingMinutes: "Handhabungszeit", laborRate: "Arbeitssatz", optionalCosts: "Nachbearbeitung und sonstige Kosten", finishingCost: "Nachbearbeitung je Teil", otherCost: "Sonstige Auftragskosten", targetMargin: "Zielmarge", packageDiscount: "Paketnachlass", taxRate: "Steuer", quoteDetails: "Angebotsdaten", materialLine: "Laserschneidservice", targetQuote: "Zielangebot", directCost: "Direktkosten", profit: "Gewinn", margin: "Marge", materialCost: "Material", machineCost: "Maschine", setupCost: "Einrichtungsarbeit", handlingCost: "Handhabungsarbeit", finishing: "Nachbearbeitung", pricingFloor: "Preisuntergrenze" },
  ja: { ...enCopy, title: "レーザー加工コスト計算機と見積もり | zaps.work", description: "材料、加工時間、設定、取り扱い、廃材、利益率を計算します。", heading: "レーザー加工見積もり", intro: "CAD/CAMの統計情報からレーザー加工の見積もりを作成します。", material: "材料", materialThickness: "厚さ", materialArea: "材料面積", materialRate: "材料単価", wasteRate: "廃材", quantity: "数量", measurementUnit: "単位系", cutStats: "加工・機械データ", cutLength: "切断長", cutTimeMinutes: "加工時間", pierceCount: "ピアス数", machineRate: "機械単価", setupHandling: "設定・取り扱い", setupMinutes: "設定時間", handlingMinutes: "取り扱い時間", laborRate: "人件費単価", optionalCosts: "仕上げ・その他の費用", finishingCost: "仕上げ（1個）", otherCost: "その他の作業費", targetMargin: "目標利益率", packageDiscount: "パッケージ割引", taxRate: "税金", quoteDetails: "見積書情報", materialLine: "レーザー加工サービス", targetQuote: "目標見積額", directCost: "直接費", profit: "利益", margin: "利益率", materialCost: "材料", machineCost: "機械", setupCost: "設定人件費", handlingCost: "取り扱い人件費", finishing: "仕上げ", pricingFloor: "価格下限" },
  es: { ...enCopy, title: "Calculadora de costes y presupuestos de corte láser | zaps.work", description: "Calcula material, tiempo de máquina, preparación, manipulación, desperdicio y margen.", heading: "Presupuesto de corte láser", intro: "Convierte datos manuales de CAD/CAM en un presupuesto consistente.", material: "Material", materialThickness: "Grosor", materialArea: "Área de material", materialRate: "Tarifa de material", wasteRate: "Desperdicio", quantity: "Cantidad", measurementUnit: "Sistema de unidades", cutStats: "Datos de corte y máquina", cutLength: "Longitud de corte", cutTimeMinutes: "Tiempo de corte", pierceCount: "Perforaciones", machineRate: "Tarifa de máquina", setupHandling: "Preparación y manipulación", setupMinutes: "Tiempo de preparación", handlingMinutes: "Tiempo de manipulación", laborRate: "Tarifa laboral", optionalCosts: "Acabado y otros costes", finishingCost: "Acabado por pieza", otherCost: "Otros costes del trabajo", targetMargin: "Margen objetivo", packageDiscount: "Descuento del paquete", taxRate: "Impuesto", quoteDetails: "Datos del presupuesto", materialLine: "Servicio de corte láser", targetQuote: "Presupuesto objetivo", directCost: "Coste directo", profit: "Beneficio", margin: "Margen", materialCost: "Material", machineCost: "Máquina", setupCost: "Preparación", handlingCost: "Manipulación", finishing: "Acabado", pricingFloor: "Precio mínimo" },
  fr: { ...enCopy, title: "Calculateur de coût et devis de découpe laser | zaps.work", description: "Estimez la matière, le temps machine, le réglage, la manutention, les pertes et la marge.", heading: "Devis de découpe laser", intro: "Transformez les statistiques CAD/CAM manuelles en devis cohérents.", material: "Matière", materialThickness: "Épaisseur", materialArea: "Surface de matière", materialRate: "Tarif matière", wasteRate: "Pertes", quantity: "Quantité", measurementUnit: "Système d’unités", cutStats: "Données de coupe et machine", cutLength: "Longueur de coupe", cutTimeMinutes: "Temps de coupe", pierceCount: "Perçages", machineRate: "Tarif machine", setupHandling: "Réglage et manutention", setupMinutes: "Temps de réglage", handlingMinutes: "Temps de manutention", laborRate: "Tarif de main-d’œuvre", optionalCosts: "Finition et autres coûts", finishingCost: "Finition par pièce", otherCost: "Autre coût du travail", targetMargin: "Marge cible", packageDiscount: "Remise forfait", taxRate: "Taxe", quoteDetails: "Données du devis", materialLine: "Service de découpe laser", targetQuote: "Devis cible", directCost: "Coût direct", profit: "Bénéfice", margin: "Marge", materialCost: "Matière", machineCost: "Machine", setupCost: "Réglage", handlingCost: "Manutention", finishing: "Finition", pricingFloor: "Prix plancher" },
  "pt-br": { ...enCopy, title: "Calculadora de custos e orçamento de corte a laser | zaps.work", description: "Calcule material, tempo de máquina, preparação, manuseio, desperdício e margem.", heading: "Orçamento de corte a laser", intro: "Transforme dados manuais de CAD/CAM em um orçamento consistente.", material: "Material", materialThickness: "Espessura", materialArea: "Área do material", materialRate: "Valor do material", wasteRate: "Desperdício", quantity: "Quantidade", measurementUnit: "Sistema de unidades", cutStats: "Dados de corte e máquina", cutLength: "Comprimento do corte", cutTimeMinutes: "Tempo de corte", pierceCount: "Perfurações", machineRate: "Valor da máquina", setupHandling: "Preparação e manuseio", setupMinutes: "Tempo de preparação", handlingMinutes: "Tempo de manuseio", laborRate: "Valor da mão de obra", optionalCosts: "Acabamento e outros custos", finishingCost: "Acabamento por peça", otherCost: "Outro custo do trabalho", targetMargin: "Margem desejada", packageDiscount: "Desconto do pacote", taxRate: "Imposto", quoteDetails: "Dados do orçamento", materialLine: "Serviço de corte a laser", targetQuote: "Orçamento alvo", directCost: "Custo direto", profit: "Lucro", margin: "Margem", materialCost: "Material", machineCost: "Máquina", setupCost: "Preparação", handlingCost: "Manuseio", finishing: "Acabamento", pricingFloor: "Preço mínimo" },
  ko: { ...enCopy, title: "레이저 절단 비용 계산기 및 견적 생성기 | zaps.work", description: "재료, 장비 시간, 설정, 취급, 폐기물과 마진을 계산하세요.", heading: "레이저 절단 견적", intro: "수동 CAD/CAM 데이터를 일관된 견적으로 바꿔보세요.", material: "재료", materialThickness: "두께", materialArea: "재료 면적", materialRate: "재료 단가", wasteRate: "폐기물", quantity: "수량", measurementUnit: "단위 체계", cutStats: "절단 및 장비 데이터", cutLength: "절단 길이", cutTimeMinutes: "절단 시간", pierceCount: "피어싱 수", machineRate: "장비 단가", setupHandling: "설정 및 취급", setupMinutes: "설정 시간", handlingMinutes: "취급 시간", laborRate: "인건비 단가", optionalCosts: "후처리 및 기타 비용", finishingCost: "부품당 후처리", otherCost: "기타 작업 비용", targetMargin: "목표 마진", packageDiscount: "패키지 할인", taxRate: "세금", quoteDetails: "견적 정보", materialLine: "레이저 절단 서비스", targetQuote: "목표 견적", directCost: "직접 비용", profit: "이익", margin: "마진", materialCost: "재료", machineCost: "장비", setupCost: "설정 인건비", handlingCost: "취급 인건비", finishing: "후처리", pricingFloor: "가격 하한" },
};

const copies: Record<Locale, LaserCuttingCopy> = withSimplifiedChinese(baseCopies);

export function getLaserCuttingCopy(locale: Locale) {
  return copies[locale];
}
