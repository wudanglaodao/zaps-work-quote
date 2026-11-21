import type { Locale } from "./config";
import { withSimplifiedChinese } from "./simplified-chinese";
import type { RoofingMaterialType } from "../calculators/roofing";

export type RoofingCopy = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  dimensionsTitle: string;
  materialsTitle: string;
  laborTitle: string;
  pricingTitle: string;
  measurementUnit: string;
  squareFeet: string;
  squareMeters: string;
  footprintArea: string;
  pitch: string;
  pitchPreset: string;
  pitchPresets: Record<string, string>;
  pitchDegrees: string;
  pitchMultiplier: string;
  wastePercent: string;
  surfaceArea: string;
  orderedSquares: string;
  squaresUnit: string;
  materialType: string;
  materialOptions: Record<RoofingMaterialType, string>;
  materialPricePerSquare: string;
  underlaymentCostPerSquare: string;
  tearOffLayers: string;
  tearOffOptions: {
    none: string;
    one: string;
    two: string;
  };
  tearOffRatePerSquare: string;
  dumpsterCost: string;
  stories: string;
  storiesOptions: {
    one: string;
    two: string;
    three: string;
  };
  laborRatePerSquare: string;
  deckingReplacementSheets: string;
  deckingPricePerSheet: string;
  deckingAllowance: string;
  overheadPercent: string;
  targetMargin: string;
  minimumFee: string;
  taxRate: string;
  targetQuote: string;
  pricePerSquare: string;
  directCost: string;
  profit: string;
  shingles: string;
  underlayment: string;
  decking: string;
  tearOff: string;
  labor: string;
  overhead: string;
  quoteBreakdown: string;
  printOrSave: string;
  exportCsv: string;
  viewQuote: string;
  privacyNote: string;
  methodologyTitle: string;
  methodologyBody: string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
};

const en: RoofingCopy = {
  title: "Roofing Quote Calculator | LOEME Tools",
  description:
    "Estimate roof squares, pitch multiplier, materials, tear-off, labor, overhead, margin, and export contractor-ready roofing quotes.",
  heading: "Roofing Quote Calculator",
  intro:
    "Turn roof pitch, footprint area, tear-off layers, materials, and crew rates into an accurate, customer-ready roofing quote.",
  dimensionsTitle: "Roof Dimensions & Pitch",
  materialsTitle: "Materials & Tear-Off",
  laborTitle: "Labor & Complexity",
  pricingTitle: "Pricing & Margins",
  measurementUnit: "Measurement unit",
  squareFeet: "sq ft",
  squareMeters: "sq m",
  footprintArea: "Footprint / ground area",
  pitch: "Roof pitch (rise / 12)",
  pitchPreset: "Pitch preset",
  pitchPresets: {
    "4": "4/12 (Low slope - 18.4°)",
    "6": "6/12 (Standard slope - 26.6°)",
    "8": "8/12 (Steep slope - 33.7°)",
    "10": "10/12 (Very steep - 39.8°)",
    "12": "12/12 (45° angle)",
  },
  pitchDegrees: "Pitch angle",
  pitchMultiplier: "Pitch multiplier",
  wastePercent: "Waste allowance",
  surfaceArea: "Actual surface area",
  orderedSquares: "Ordered squares (with waste)",
  squaresUnit: "Squares",
  materialType: "Shingle / material type",
  materialOptions: {
    threeTab: "3-Tab Asphalt Shingles (Economy)",
    architectural: "Architectural Laminate Shingles (Standard)",
    metal: "Standing Seam Metal Roof",
    tile: "Concrete / Clay Tile",
    slate: "Natural Slate / Premium",
  },
  materialPricePerSquare: "Material price per square",
  underlaymentCostPerSquare: "Underlayment, flashing & nails per square",
  tearOffLayers: "Existing layers to tear off",
  tearOffOptions: {
    none: "No tear-off (New construction / overlay)",
    one: "1 layer tear-off & disposal",
    two: "2 layers tear-off & disposal",
  },
  tearOffRatePerSquare: "Tear-off labor per square",
  dumpsterCost: "Dumpster & disposal fee",
  stories: "Building height",
  storiesOptions: {
    one: "1 Story (Ranch / Bungalow)",
    two: "2 Stories (Standard)",
    three: "3+ Stories (High elevation)",
  },
  laborRatePerSquare: "Base installation labor per square",
  deckingReplacementSheets: "Plywood / OSB replacement sheets",
  deckingPricePerSheet: "Decking price per sheet (installed)",
  deckingAllowance: "Decking repair allowance",
  overheadPercent: "Overhead percentage",
  targetMargin: "Target profit margin",
  minimumFee: "Minimum job fee",
  taxRate: "Tax rate",
  targetQuote: "Target Quote",
  pricePerSquare: "Price per Square",
  directCost: "Direct Cost",
  profit: "Net Profit",
  shingles: "Roofing shingles / panels",
  underlayment: "Underlayment & flashing",
  decking: "Decking repair",
  tearOff: "Tear-off & disposal",
  labor: "Installation labor",
  overhead: "Operating overhead",
  quoteBreakdown: "Quote Breakdown",
  printOrSave: "Print / Save PDF",
  exportCsv: "Export CSV",
  viewQuote: "View Quote",
  privacyNote:
    "All calculation parameters and customer data stay private inside your browser. No project data is sent to external servers.",
  methodologyTitle: "Industry-standard roofing square estimation",
  methodologyBody:
    "In the roofing trade, 1 Square equals 100 square feet (~9.29 m²). The calculator derives true sloped roof surface using the geometric pitch factor √(1 + (Pitch/12)²), factors in hip and valley waste, and tallies materials, underlayment, tear-off disposal, crew elevation difficulty, decking repair allowances, and your target margin.",
  faqTitle: "Roofing Estimate Frequently Asked Questions",
  faq: [
    {
      question: "What is a roofing square?",
      answer:
        "A roofing square is the standard unit of measurement in North American roofing, equal to 100 square feet of roof surface. For example, a 2,400 sq ft roof equals 24 squares.",
    },
    {
      question: "How does pitch affect total roof cost?",
      answer:
        "Steeper pitches increase the actual surface area compared to the home's ground footprint (e.g. an 8/12 pitch adds ~20% more surface area). Additionally, pitches 8/12 and above require roof jacks, safety harnesses, and slower work, increasing labor rates.",
    },
    {
      question: "Why include a decking replacement allowance?",
      answer:
        "When tearing off old shingles, contractors frequently discover water-damaged or rotted plywood sheathing. Budgeting for 2 to 4 replacement sheets upfront avoids contentious change orders.",
    },
  ],
};

const baseCopies: Record<Exclude<Locale, "zh-hans">, RoofingCopy> = {
  en,
  "zh-hant": {
    ...en,
    title: "屋頂翻新與施工報價計算器 | LOEME Tools",
    description:
      "計算屋頂 Squares、坡度係數、材料、拆除舊瓦、人工、間接成本與毛利，快速產出承包商專業屋頂報價單。",
    heading: "屋頂施工與翻新報價計算器",
    intro:
      "以屋頂坡度、占地面積、舊瓦拆除層數、主材規格與團隊工時，精確計算出可直接交付業主的專業屋頂報價。",
    dimensionsTitle: "屋頂尺寸與坡度",
    materialsTitle: "材料規格與拆舊",
    laborTitle: "施工難度與人工",
    pricingTitle: "定價與利潤條款",
    measurementUnit: "計量單位",
    squareFeet: "平方英尺 (sq ft)",
    squareMeters: "平方米 (sq m)",
    footprintArea: "建築占地面積",
    pitch: "屋頂坡度 (Rise / 12)",
    pitchPreset: "常見坡度預設",
    pitchPresets: {
      "4": "4/12 (平緩坡度 - 18.4°)",
      "6": "6/12 (標準常見坡度 - 26.6°)",
      "8": "8/12 (陡峭坡度 - 33.7°)",
      "10": "10/12 (極陡坡度 - 39.8°)",
      "12": "12/12 (45° 夾角)",
    },
    pitchDegrees: "坡度傾角",
    pitchMultiplier: "表面積展開係數",
    wastePercent: "損耗與裁剪余量",
    surfaceArea: "屋頂實際表面積",
    orderedSquares: "訂購 Squares (含損耗)",
    squaresUnit: "Squares",
    materialType: "屋面主材類型",
    materialOptions: {
      threeTab: "3-Tab 經濟瀝青平瓦",
      architectural: "雙層立體瀝青瓦 (最主流)",
      metal: "立邊咬合金屬屋面 (Standing Seam)",
      tile: "混凝土瓦 / 陶土瓦",
      slate: "天然板岩 / 頂級奢華",
    },
    materialPricePerSquare: "主材單價 (每 Square)",
    underlaymentCostPerSquare: "防水墊層、天溝泛水與釘子 (每 Square)",
    tearOffLayers: "拆除舊瓦層數",
    tearOffOptions: {
      none: "無需拆舊 (新建工程 / 直接覆蓋)",
      one: "拆除 1 層舊瓦及清運",
      two: "拆除 2 層舊瓦及清運",
    },
    tearOffRatePerSquare: "拆舊人工費 (每 Square)",
    dumpsterCost: "垃圾清運斗租賃與傾倒費",
    stories: "建築層數",
    storiesOptions: {
      one: "單層平房 (1 Story)",
      two: "雙層建築 (2 Stories)",
      three: "3 層及以上 (高空防護)",
    },
    laborRatePerSquare: "基礎安裝人工 (每 Square)",
    deckingReplacementSheets: "木基層膠合板更換預估張數",
    deckingPricePerSheet: "木基層板更換單價 (含安裝)",
    deckingAllowance: "基層修補備用金",
    overheadPercent: "營運間接成本比例",
    targetMargin: "目標毛利率",
    minimumFee: "最低起步工程款",
    taxRate: "稅率",
    targetQuote: "目標總報價",
    pricePerSquare: "每 Square 綜合均價",
    directCost: "直接成本",
    profit: "淨利潤",
    shingles: "屋面瓦材 / 瓦片",
    underlayment: "防水墊層與泛水配件",
    decking: "基層木板修復",
    tearOff: "舊瓦拆除與垃圾清運",
    labor: "施工安裝人工",
    overhead: "營運管理費",
    quoteBreakdown: "報價費用構成明細",
    printOrSave: "列印 / 儲存 PDF 報價單",
    exportCsv: "匯出 CSV 明細表",
    viewQuote: "查看報價單",
    privacyNote:
      "所有報價參數與客戶資料皆安全保留在您的瀏覽器本機，不向任何外部伺服器上傳儲存。",
    methodologyTitle: "歐美標準 Roofing Square 估算法",
    methodologyBody:
      "屋面行業通常以 1 Square（100 平方英尺，約 9.29 平方米）為統一計價基數。本工具依據坡度勾股定理 √(1 + (Pitch/12)²) 精密還原坡面展開面積，結合山牆天溝損耗、主材、防水層、清運、層高攀爬難度與木基層更換預算，生成精確報價。",
    faqTitle: "屋頂報價常見問題",
    faq: [
      {
        question: "什麼是 Roofing Square？",
        answer:
          "Roofing Square 是北美與國際屋面工程的通用度量單位，1 Square 等於 100 平方英尺（約 9.29 平方米）。例如 2,400 平方英尺的屋面等於 24 個 Squares。",
      },
      {
        question: "坡度（Pitch）如何影響造價？",
        answer:
          "坡度越陡，實際展開的屋面瓦片面積就比房屋占地投影大得多（如 8/12 坡度會增加約 20% 的面積）。此外坡度達到 8/12 以上必須架設安全繩與跳板，工人施工速度放緩，人工費相應上浮。",
      },
      {
        question: "為什麼要預留木基層（Decking）更換費用？",
        answer:
          "拆除舊瓦時經常會發現屋頂底部有漏水腐朽的木夾板。在報價單中預留 2～4 張更換預算，能有效避免施工中與業主產生增項糾紛。",
      },
    ],
  },
  de: {
    ...en,
    title: "Dachdecker Angebotsrechner | LOEME Tools",
    description:
      "Kalkulieren Sie Dachflächen, Dachneigung, Material, Abriss, Lohn und Marge für präzise Kundenangebote.",
    heading: "Dachdecker Angebotsrechner",
    intro:
      "Berechnen Sie aus Dachneigung, Grundfläche, Abriss, Material und Arbeitskosten ein sauberes Dachangebot.",
    dimensionsTitle: "Dachmaße & Neigung",
    materialsTitle: "Material & Altbelag-Abriss",
    laborTitle: "Arbeit & Bauhöhe",
    pricingTitle: "Preise & Margen",
    measurementUnit: "Maßeinheit",
    squareFeet: "Quadratfuß (sq ft)",
    squareMeters: "Quadratmeter (m²)",
    footprintArea: "Grundfläche Gebäude",
    pitch: "Dachneigung (Rise / 12)",
    pitchDegrees: "Neigungswinkel",
    wastePercent: "Verschnitt",
    surfaceArea: "Tatsächliche Dachfläche",
    orderedSquares: "Bestellmenge Squares",
    materialType: "Dacheindeckung",
    laborRatePerSquare: "Verlegelohn je Square",
    targetQuote: "Gesamtangebot",
    pricePerSquare: "Preis je Square",
    directCost: "Direktkosten",
    profit: "Nettogewinn",
    quoteBreakdown: "Kostenaufstellung",
    printOrSave: "Drucken / PDF speichern",
    exportCsv: "CSV exportieren",
    viewQuote: "Angebot ansehen",
  },
  ja: {
    ...en,
    title: "屋根工事・リフォーム見積もり計算機 | LOEME Tools",
    description:
      "屋根面積、勾配係数、材料、撤去費、人件費、粗利率から正確な屋根工事見積もりを作成します。",
    heading: "屋根工事・リフォーム見積もり計算機",
    intro:
      "屋根の勾配、建築面積、既存屋根の撤去層数、材料、職人単価から信頼性の高い見積書を作成します。",
    dimensionsTitle: "屋根寸法と勾配",
    materialsTitle: "材料と解体・撤去",
    laborTitle: "施工難度と人件費",
    pricingTitle: "価格と利益率",
    measurementUnit: "単位",
    squareFeet: "平方フィート (sq ft)",
    squareMeters: "平方メートル (m²)",
    footprintArea: "建築面積（投影面積）",
    pitch: "屋根勾配 (寸勾配 / 12)",
    pitchDegrees: "勾配角度",
    wastePercent: "ロス率",
    surfaceArea: "実際の屋根表面積",
    orderedSquares: "発注 Squares (ロス含む)",
    materialType: "屋根材の種類",
    laborRatePerSquare: "施工人件費 (1 Squareあたり)",
    targetQuote: "見積合計金額",
    pricePerSquare: "Squareあたり単価",
    directCost: "直接原価",
    profit: "営業利益",
    quoteBreakdown: "見積内訳",
    printOrSave: "印刷 / PDF保存",
    exportCsv: "CSV出力",
    viewQuote: "見積もりを見る",
  },
  es: {
    ...en,
    title: "Calculadora de Presupuestos de Techos | LOEME Tools",
    description:
      "Calcula Squares de techo, pendiente, materiales, remoción, mano de obra y margen para contratistas de techado.",
    heading: "Calculadora de Presupuestos de Techos",
    intro:
      "Convierte inclinación, área, capas a remover, tejas y tarifas en un presupuesto profesional de techado.",
    dimensionsTitle: "Dimensiones e Inclinación del Techo",
    materialsTitle: "Materiales y Demolición",
    laborTitle: "Mano de Obra y Dificultad",
    pricingTitle: "Precios y Márgenes",
    measurementUnit: "Unidad de medida",
    squareFeet: "pies cuadrados (sq ft)",
    squareMeters: "metros cuadrados (m²)",
    footprintArea: "Área de huella del edificio",
    pitch: "Pendiente del techo (Rise / 12)",
    pitchDegrees: "Ángulo de inclinación",
    wastePercent: "Merma y desperdicio",
    surfaceArea: "Área real de superficie",
    orderedSquares: "Squares requeridos (con merma)",
    materialType: "Tipo de teja / cubierta",
    laborRatePerSquare: "Mano de obra de instalación por Square",
    targetQuote: "Presupuesto Objetivo",
    pricePerSquare: "Precio por Square",
    directCost: "Coste Directo",
    profit: "Beneficio Neto",
    quoteBreakdown: "Desglose de Costes",
    printOrSave: "Imprimir / Guardar PDF",
    exportCsv: "Exportar CSV",
    viewQuote: "Ver Presupuesto",
  },
  fr: {
    ...en,
    title: "Calculateur de Devis Toiture | LOEME Tools",
    description:
      "Estimez la surface de toiture, la pente, les matériaux, la dépose, la main-d’œuvre et la marge pour devis couvreur.",
    heading: "Calculateur de Devis Toiture",
    intro:
      "Transformez pente, surface au sol, dépose d’ancienne toiture et main-d’œuvre en devis professionnel.",
    dimensionsTitle: "Dimensions et Pente de Toiture",
    materialsTitle: "Matériaux et Dépose",
    laborTitle: "Main-d’œuvre et Complexité",
    pricingTitle: "Prix et Marges",
    measurementUnit: "Unité de mesure",
    squareFeet: "pieds carrés (sq ft)",
    squareMeters: "mètres carrés (m²)",
    footprintArea: "Surface au sol",
    pitch: "Pente de toit (Rise / 12)",
    pitchDegrees: "Angle de pente",
    wastePercent: "Tolérance de coupe / perte",
    surfaceArea: "Surface réelle développée",
    orderedSquares: "Squares commandés (avec pertes)",
    materialType: "Type de couverture / tuiles",
    laborRatePerSquare: "Pose par Square",
    targetQuote: "Devis Total Cible",
    pricePerSquare: "Prix par Square",
    directCost: "Coût Direct",
    profit: "Bénéfice Net",
    quoteBreakdown: "Détail du Devis",
    printOrSave: "Imprimer / Enregistrer PDF",
    exportCsv: "Exporter CSV",
    viewQuote: "Voir le Devis",
  },
  "pt-br": {
    ...en,
    title: "Calculadora de Orçamento de Telhado | LOEME Tools",
    description:
      "Calcule área de telhado, inclinação, materiais, demolição, mão de obra e margem para orçamentos de telhadistas.",
    heading: "Calculadora de Orçamento de Telhado",
    intro:
      "Transforme inclinação, projeção, camadas antigas, telhas e equipe em um orçamento profissional de telhado.",
    dimensionsTitle: "Dimensões e Inclinação do Telhado",
    materialsTitle: "Materiais e Demolição",
    laborTitle: "Mão de Obra e Altura",
    pricingTitle: "Preço e Margens",
    measurementUnit: "Unidade de medida",
    squareFeet: "pés quadrados (sq ft)",
    squareMeters: "metros quadrados (m²)",
    footprintArea: "Área de projeção no solo",
    pitch: "Inclinação do telhado (Rise / 12)",
    pitchDegrees: "Ângulo de inclinação",
    wastePercent: "Margem de perda",
    surfaceArea: "Área real de superfície",
    orderedSquares: "Squares calculados (com perda)",
    materialType: "Tipo de telha / cobertura",
    laborRatePerSquare: "Mão de obra por Square",
    targetQuote: "Orçamento Total Alvo",
    pricePerSquare: "Preço por Square",
    directCost: "Custo Direto",
    profit: "Lucro Líquido",
    quoteBreakdown: "Detalhamento de Custos",
    printOrSave: "Imprimir / Salvar PDF",
    exportCsv: "Exportar CSV",
    viewQuote: "Ver Orçamento",
  },
  ko: {
    ...en,
    title: "지붕 시공 및 교체 견적 계산기 | LOEME Tools",
    description:
      "지붕 면적, 물매 경사도, 자재, 철거비, 인건비, 마진을 계산하여 고객용 지붕 견적서를 만드세요.",
    heading: "지붕 시공 및 교체 견적 계산기",
    intro:
      "지붕 물매, 바닥 면적, 기존 지붕 철거, 슁글 자재, 인건비 단가로 정확한 시공 견적을 산출합니다.",
    dimensionsTitle: "지붕 규격 및 물매(경사)",
    materialsTitle: "자재 및 기존 지붕 철거",
    laborTitle: "시공 난이도 및 인건비",
    pricingTitle: "가격 및 마진 설정",
    measurementUnit: "단위",
    squareFeet: "제곱피트 (sq ft)",
    squareMeters: "제곱미터 (m²)",
    footprintArea: "건축 바닥 면적",
    pitch: "지붕 물매 (Rise / 12)",
    pitchDegrees: "경사 각도",
    wastePercent: "할증 및 손실률",
    surfaceArea: "실제 지붕 표면적",
    orderedSquares: "발주 Squares (손실 포함)",
    materialType: "지붕 자재 종류",
    laborRatePerSquare: "Square당 시공 인건비",
    targetQuote: "최종 목표 견적",
    pricePerSquare: "Square당 단가",
    directCost: "직접 원가",
    profit: "순이익",
    quoteBreakdown: "비용 내역",
    printOrSave: "인쇄 / PDF 저장",
    exportCsv: "CSV 내보내기",
    viewQuote: "견적 보기",
  },
  it: {
    ...en,
    title: "Calcolatore Preventivo Tetti e Coperture | LOEME Tools",
    description:
      "Calcola superficie tetto, pendenza, materiali, rimozione, manodopera e margine per preventivi tetto.",
    heading: "Calcolatore Preventivo Tetti e Coperture",
    intro:
      "Trasforma pendenza, pianta, strati da rimuovere, tegole e costi orari in un preventivo dettagliato.",
    dimensionsTitle: "Dimensioni e Pendenza Tetto",
    materialsTitle: "Materiali e Demolizione",
    laborTitle: "Manodopera e Quota",
    pricingTitle: "Prezzi e Margini",
    measurementUnit: "Unità di misura",
    squareFeet: "piedi quadri (sq ft)",
    squareMeters: "metri quadri (m²)",
    footprintArea: "Superficie a terra dell'edificio",
    pitch: "Pendenza tetto (Rise / 12)",
    pitchDegrees: "Angolo pendenza",
    wastePercent: "Sfrido",
    surfaceArea: "Superficie reale sviluppata",
    orderedSquares: "Squares da ordinare (con sfrido)",
    materialType: "Tipo di tegole / manto",
    laborRatePerSquare: "Manodopera posa per Square",
    targetQuote: "Preventivo Obiettivo",
    pricePerSquare: "Prezzo per Square",
    directCost: "Costo Diretto",
    profit: "Utile Netto",
    quoteBreakdown: "Dettaglio Costi",
    printOrSave: "Stampa / Salva PDF",
    exportCsv: "Esporta CSV",
    viewQuote: "Vedi Preventivo",
  },
  nl: {
    ...en,
    title: "Dakdekker Offerte Calculator | LOEME Tools",
    description:
      "Bereken dakoppervlak, dakhelling, materialen, sloop oud dak, arbeid en marge voor dakdekker offertes.",
    heading: "Dakdekker Offerte Calculator",
    intro:
      "Zet dakhelling, grondvlak, afvoer oude pannen, materialen en uurtarieven om in een kant-en-klare offerte.",
    dimensionsTitle: "Dakafmetingen & Helling",
    materialsTitle: "Materialen & Slopen",
    laborTitle: "Arbeid & Moeilijkheidsgraad",
    pricingTitle: "Prijzen & Marges",
    measurementUnit: "Maateenheid",
    squareFeet: "vierkante voet (sq ft)",
    squareMeters: "vierkante meter (m²)",
    footprintArea: "Grondoppervlak gebouw",
    pitch: "Dakhelling (Rise / 12)",
    pitchDegrees: "Hellingshoek",
    wastePercent: "Snijverlies",
    surfaceArea: "Werkelijke dakoppervlakte",
    orderedSquares: "Benodigde Squares (incl. verlies)",
    materialType: "Soort dakbedekking / pannen",
    laborRatePerSquare: "Arbeid per Square",
    targetQuote: "Doelofferte",
    pricePerSquare: "Prijs per Square",
    directCost: "Directe Kosten",
    profit: "Nettowinst",
    quoteBreakdown: "Kostenopbouw",
    printOrSave: "Afdrukken / Opslaan als PDF",
    exportCsv: "Exporteer CSV",
    viewQuote: "Offerte bekijken",
  },
  pl: {
    ...en,
    title: "Kalkulator Wyceny Dachu | LOEME Tools",
    description:
      "Oblicz powierzchnię dachu, kąt nachylenia, materiały, zerwanie starego pokrycia, robociznę i marżę dekarską.",
    heading: "Kalkulator Wyceny Dachu",
    intro:
      "Przekształć spadek dachu, rzut budynku, zrywanie starego dachu, pokrycie i robociznę w profesjonalną wycenę.",
    dimensionsTitle: "Wymiary Dachu i Nachylenie",
    materialsTitle: "Materiały i Rozbiórka",
    laborTitle: "Robocizna i Wysokość",
    pricingTitle: "Wycena i Marża",
    measurementUnit: "Jednostka miary",
    squareFeet: "stopy kwadratowe (sq ft)",
    squareMeters: "metry kwadratowe (m²)",
    footprintArea: "Powierzchnia zabudowy",
    pitch: "Spadek dachu (Rise / 12)",
    pitchDegrees: "Kąt spadku",
    wastePercent: "Naddatek na docinki",
    surfaceArea: "Rzeczywista powierzchnia połaci",
    orderedSquares: "Zamawiane Squares (z naddatkiem)",
    materialType: "Rodzaj pokrycia dachowego",
    laborRatePerSquare: "Stawka montażu za Square",
    targetQuote: "Docelowa Wycena",
    pricePerSquare: "Cena za Square",
    directCost: "Koszty Bezpośrednie",
    profit: "Zysk Netto",
    quoteBreakdown: "Podział Kosztów",
    printOrSave: "Drukuj / Zapisz PDF",
    exportCsv: "Eksportuj CSV",
    viewQuote: "Zobacz Wycenę",
  },
};

const copies: Record<Locale, RoofingCopy> = withSimplifiedChinese(baseCopies);

export function getRoofingCopy(locale: Locale) {
  return copies[locale];
}
