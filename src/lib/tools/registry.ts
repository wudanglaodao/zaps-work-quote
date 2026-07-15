import type { Locale } from "../i18n/config";
import { withSimplifiedChinese } from "../i18n/simplified-chinese";

export type ToolCategoryId = "fabrication" | "local-services" | "professional-services";
export type ToolStatus = "live" | "soon";
type BaseLocalizedString = Record<Exclude<Locale, "zh-hans">, string>;
export type LocalizedString = Record<Locale, string>;
export type ToolDefinition = { slug: string; status: ToolStatus; category: ToolCategoryId; names: LocalizedString; summaries: LocalizedString };

const localize = (copy: BaseLocalizedString): LocalizedString => withSimplifiedChinese(copy);

const baseToolCategories: Array<{ id: ToolCategoryId; order: number; names: BaseLocalizedString; descriptions: BaseLocalizedString }> = [
  { id: "fabrication", order: 10, names: { en: "Fabrication & manufacturing", "zh-hant": "製造與加工", de: "Fertigung & Produktion", ja: "製造・加工", es: "Fabricación y producción", fr: "Fabrication et production", "pt-br": "Fabricação e produção", ko: "제조 및 가공" }, descriptions: { en: "Price materials, machine time, labor, setup, waste, and batch work.", "zh-hant": "計算材料、機時、人工、設定、損耗與批量工作。", de: "Material, Maschinenzeit, Arbeit, Rüsten, Ausschuss und Serien kalkulieren.", ja: "材料、機械時間、人件費、段取り、ロス、ロットを見積もります。", es: "Calcula materiales, máquina, mano de obra, preparación, merma y lotes.", fr: "Chiffrez matière, temps machine, main-d’œuvre, réglage, pertes et séries.", "pt-br": "Calcule material, tempo de máquina, mão de obra, preparação, perdas e lotes.", ko: "재료, 장비 시간, 인건비, 설정, 손실 및 배치 작업을 계산합니다." } },
  { id: "local-services", order: 20, names: { en: "Local services & home maintenance", "zh-hant": "本地服務與房屋維護", de: "Lokale Dienste & Hauswartung", ja: "地域サービス・住宅メンテナンス", es: "Servicios locales y mantenimiento del hogar", fr: "Services locaux et entretien de la maison", "pt-br": "Serviços locais e manutenção residencial", ko: "지역 서비스 및 주택 관리" }, descriptions: { en: "Build clear quotes for on-site work, crews, travel, equipment, and service scope.", "zh-hant": "為到府作業、團隊、交通、設備與服務範圍建立清楚報價。", de: "Klare Angebote für Einsätze vor Ort, Teams, Anfahrt, Geräte und Leistungsumfang.", ja: "現場作業、チーム、出張、機材、サービス範囲の明確な見積もりを作成します。", es: "Crea presupuestos claros para trabajo en sitio, equipos, viajes, equipo y alcance.", fr: "Créez des devis clairs pour les interventions, équipes, déplacements, matériel et périmètre.", "pt-br": "Crie orçamentos claros para trabalho no local, equipes, deslocamento, equipamentos e escopo.", ko: "현장 작업, 작업팀, 이동, 장비 및 서비스 범위에 대한 명확한 견적을 만듭니다." } },
  { id: "professional-services", order: 30, names: { en: "Freelance & professional services", "zh-hant": "自由工作與專業服務", de: "Freelance & professionelle Dienste", ja: "フリーランス・専門サービス", es: "Servicios freelance y profesionales", fr: "Services freelance et professionnels", "pt-br": "Serviços freelancer e profissionais", ko: "프리랜서 및 전문 서비스" }, descriptions: { en: "Protect project margins across scope, revisions, rush work, and fixed costs.", "zh-hant": "在工作範圍、修改、急件與固定成本中守住專案毛利。", de: "Projektmargen bei Umfang, Korrekturen, Eilaufträgen und Fixkosten schützen.", ja: "作業範囲、修正、特急対応、固定費を含めて案件の利益率を守ります。", es: "Protege el margen del proyecto con alcance, revisiones, urgencia y costes fijos.", fr: "Protégez la marge du projet avec périmètre, révisions, urgence et coûts fixes.", "pt-br": "Proteja a margem do projeto com escopo, revisões, urgência e custos fixos.", ko: "작업 범위, 수정, 긴급 작업 및 고정 비용 전반에서 프로젝트 마진을 지킵니다." } },
];

const baseTools: Array<Omit<ToolDefinition, "names" | "summaries"> & { names: BaseLocalizedString; summaries: BaseLocalizedString }> = [
  {
    slug: "3d-print-cost-calculator",
    status: "live" as const,
    category: "fabrication" as const,
    names: { en: "3D Print Cost Calculator", "zh-hant": "3D 列印成本計算器", de: "3D-Druckkostenrechner", ja: "3Dプリントコスト計算機", es: "Calculadora de costes de impresión 3D", fr: "Calculateur de coût d’impression 3D", "pt-br": "Calculadora de custos de impressão 3D", ko: "3D 프린팅 비용 계산기" },
    summaries: {
      en: "Filament, machine time, labor, failure risk, margin, PDF, and CSV.",
      "zh-hant": "耗材、機器時間、人工、失敗風險、毛利、PDF 與 CSV。",
      de: "Filament, Maschinenzeit, Arbeit, Ausfallrisiko, Marge, PDF und CSV.",
      ja: "フィラメント、機械時間、人件費、失敗リスク、利益率、PDF、CSV。",
      es: "Filamento, tiempo de máquina, mano de obra, riesgo de fallo, margen, PDF y CSV.",
      fr: "Filament, temps machine, main-d’œuvre, risque d’échec, marge, PDF et CSV.",
      "pt-br": "Filamento, tempo de máquina, mão de obra, risco de falha, margem, PDF e CSV.",
      ko: "필라멘트, 장비 시간, 인건비, 실패 위험, 마진, PDF, CSV.",
    },
  },
  {
    slug: "laser-cutting-cost-calculator",
    status: "live" as const,
    category: "fabrication" as const,
    names: { en: "Laser Cutting Cost Calculator", "zh-hant": "雷射切割成本計算器", de: "Laserschneidkostenrechner", ja: "レーザー加工コスト計算機", es: "Calculadora de costes de corte láser", fr: "Calculateur de coût de découpe laser", "pt-br": "Calculadora de custos de corte a laser", ko: "레이저 절단 비용 계산기" },
    summaries: { en: "Sheet material, CAD/CAM cut data, setup, waste, and margin.", "zh-hant": "板材、CAD/CAM 切割資料、設定、損耗與毛利。", de: "Blechmaterial, CAD/CAM-Schnittdaten, Einrichtung, Ausschuss und Marge.", ja: "板材、CAD/CAM加工データ、設定、廃材、利益率。", es: "Material en lámina, datos CAD/CAM, preparación, desperdicio y margen.", fr: "Matière en feuille, données CAD/CAM, réglage, pertes et marge.", "pt-br": "Material em chapa, dados CAD/CAM, preparação, desperdício e margem.", ko: "판재, CAD/CAM 절단 데이터, 설정, 폐기물, 마진." },
  },
  {
    slug: "cleaning-quote-generator",
    status: "live" as const,
    category: "local-services",
    names: { en: "Cleaning Quote Generator", "zh-hant": "清潔服務報價工具", de: "Angebotsgenerator für Reinigung", ja: "清掃見積もり作成ツール", es: "Generador de presupuestos de limpieza", fr: "Générateur de devis de nettoyage", "pt-br": "Gerador de orçamentos de limpeza", ko: "청소 견적 생성기" },
    summaries: { en: "Rooms, area, frequency, add-ons, and labor.", "zh-hant": "房間、面積、頻率、加購與人工。", de: "Räume, Fläche, Häufigkeit, Zusatzleistungen und Arbeit.", ja: "部屋、面積、頻度、追加サービス、人件費。", es: "Habitaciones, superficie, frecuencia, extras y mano de obra.", fr: "Pièces, surface, fréquence, options et main-d’œuvre.", "pt-br": "Cômodos, área, frequência, adicionais e mão de obra.", ko: "공간, 면적, 빈도, 추가 서비스, 인건비." },
  },
  {
    slug: "house-painting-quote",
    status: "live" as const,
    category: "local-services",
    names: { en: "House Painting Quote Calculator", "zh-hant": "房屋油漆報價計算器", de: "Angebotsrechner für Hausanstriche", ja: "住宅塗装見積もり計算機", es: "Calculadora de presupuestos de pintura residencial", fr: "Calculateur de devis de peinture résidentielle", "pt-br": "Calculadora de orçamento de pintura residencial", ko: "주택 도장 견적 계산기" },
    summaries: { en: "Paint coverage, labor, surface condition, margin, PDF, and CSV.", "zh-hant": "油漆覆蓋率、人工、表面狀況、毛利、PDF 與 CSV。", de: "Deckkraft, Arbeit, Oberflächenzustand, Marge, PDF und CSV.", ja: "塗布面積、人件費、下地状態、利益率、PDF、CSV。", es: "Cobertura, mano de obra, estado de superficie, margen, PDF y CSV.", fr: "Rendement, main-d’œuvre, état des surfaces, marge, PDF et CSV.", "pt-br": "Cobertura, mão de obra, condição da superfície, margem, PDF e CSV.", ko: "도포 면적, 인건비, 표면 상태, 마진, PDF, CSV." },
  },
  {
    slug: "freelance-job-quote",
    status: "live" as const,
    category: "professional-services",
    names: { en: "Freelance Job Quote", "zh-hant": "自由工作者報價工具", de: "Angebot für Freelancer-Aufträge", ja: "フリーランス案件見積もり", es: "Presupuesto para trabajos freelance", fr: "Devis pour mission freelance", "pt-br": "Orçamento para trabalho freelance", ko: "프리랜서 작업 견적" },
    summaries: { en: "Scope, hourly rate, revisions, rush fee, and deposit.", "zh-hant": "工作範圍、時薪、修改、急件費與訂金。", de: "Leistungsumfang, Stundensatz, Korrekturen, Expressgebühr und Anzahlung.", ja: "作業範囲、時給、修正、特急料金、前金。", es: "Alcance, tarifa por hora, revisiones, urgencia y anticipo.", fr: "Périmètre, taux horaire, révisions, urgence et acompte.", "pt-br": "Escopo, valor por hora, revisões, urgência e entrada.", ko: "작업 범위, 시간당 요금, 수정, 긴급 수수료, 선금." },
  },
  {
    slug: "cnc-machining-cost-calculator",
    status: "live" as const,
    category: "fabrication" as const,
    names: { en: "CNC Machining Cost Calculator", "zh-hant": "CNC 加工成本計算器", de: "CNC-Bearbeitungskostenrechner", ja: "CNC加工コスト計算機", es: "Calculadora de costes de mecanizado CNC", fr: "Calculateur de coût d’usinage CNC", "pt-br": "Calculadora de custos de usinagem CNC", ko: "CNC 가공 비용 계산기" },
    summaries: { en: "Material, programming, setup, machine time, batch size, tooling, and margin.", "zh-hant": "材料、編程、設定、機時、批量、刀具與毛利。", de: "Material, Programmierung, Rüsten, Maschinenzeit, Losgröße, Werkzeuge und Marge.", ja: "材料、プログラム、段取り、機械時間、数量、工具、利益率。", es: "Material, programación, preparación, tiempo de máquina, lote, herramientas y margen.", fr: "Matière, programmation, réglage, temps machine, série, outillage et marge.", "pt-br": "Material, programação, preparação, tempo de máquina, lote, ferramentas e margem.", ko: "재료, 프로그래밍, 설정, 기계 시간, 수량, 공구와 마진." },
  },
  {
    slug: "lawn-care-quote",
    status: "live" as const,
    category: "local-services",
    names: { en: "Lawn Care Quote Calculator", "zh-hant": "草坪服務報價計算器", de: "Angebotsrechner für Rasenpflege", ja: "芝生サービス見積もり計算機", es: "Calculadora de presupuestos de jardinería", fr: "Calculateur de devis d’entretien de pelouse", "pt-br": "Calculadora de orçamento de gramado", ko: "잔디 관리 견적 계산기" },
    summaries: { en: "Lawn area, grass condition, crew production, equipment, travel, and margin.", "zh-hant": "草坪面積、草況、團隊產能、設備、交通與毛利。", de: "Rasenfläche, Zustand, Teamleistung, Gerät, Anfahrt und Marge.", ja: "面積、芝の状態、チーム生産性、機材、移動、利益率。", es: "Superficie, estado del césped, producción, equipo, desplazamiento y margen.", fr: "Surface, état du gazon, productivité, équipement, déplacement et marge.", "pt-br": "Área, condição do gramado, produtividade, equipamento, deslocamento e margem.", ko: "면적, 잔디 상태, 팀 생산성, 장비, 이동과 마진." },
  },
  {
    slug: "pressure-washing-quote",
    status: "live" as const,
    category: "local-services",
    names: { en: "Pressure Washing Quote", "zh-hant": "高壓清洗報價", de: "Angebot für Hochdruckreinigung", ja: "高圧洗浄見積もり", es: "Presupuesto de lavado a presión", fr: "Devis de lavage haute pression", "pt-br": "Orçamento de lavagem sob pressão", ko: "고압 세척 견적" },
    summaries: { en: "Driveway area, condition, crew time, operating costs, and margin.", "zh-hant": "車道面積、狀況、人力工時、營運成本與毛利。", de: "Fläche, Zustand, Teamzeit, Betriebskosten und Marge.", ja: "面積、状態、作業時間、運営コスト、利益率。", es: "Superficie, estado, horas, costes operativos y margen.", fr: "Surface, état, temps d’équipe, coûts et marge.", "pt-br": "Área, condição, horas da equipe, custos e margem.", ko: "면적, 상태, 작업 시간, 운영 비용, 마진." },
  },
  {
    slug: "window-cleaning-quote",
    status: "live" as const,
    category: "local-services",
    names: { en: "Window Cleaning Quote Calculator", "zh-hant": "窗戶清潔報價計算器", de: "Angebotsrechner für Fensterreinigung", ja: "窓清掃見積もり計算機", es: "Calculadora de presupuestos de limpieza de ventanas", fr: "Calculateur de devis de nettoyage de vitres", "pt-br": "Calculadora de orçamento de limpeza de janelas", ko: "창문 청소 견적 계산기" },
    summaries: { en: "Window types, access, screens, tracks, crew time, travel, and margin.", "zh-hant": "窗型、作業高度、紗窗、軌道、團隊工時、交通與毛利。", de: "Fenstertypen, Zugang, Fliegengitter, Schienen, Teamzeit, Anfahrt und Marge.", ja: "窓の種類、作業高さ、網戸、レール、チーム時間、出張費、利益率。", es: "Tipos de ventana, acceso, mosquiteros, rieles, tiempo de equipo, viaje y margen.", fr: "Types de vitres, accès, moustiquaires, rails, temps d’équipe, déplacement et marge.", "pt-br": "Tipos de janela, acesso, telas, trilhos, tempo da equipe, deslocamento e margem.", ko: "창문 유형, 작업 접근성, 방충망, 레일, 작업 시간, 이동과 마진." },
  },
];

export const toolCategories: Array<{ id: ToolCategoryId; order: number; names: LocalizedString; descriptions: LocalizedString }> = baseToolCategories.map((category) => ({
  ...category,
  names: localize(category.names),
  descriptions: localize(category.descriptions),
}));

export const tools: ToolDefinition[] = baseTools.map((tool) => ({
  ...tool,
  names: localize(tool.names),
  summaries: localize(tool.summaries),
}));

export function getToolsByCategory(category: ToolCategoryId) {
  return tools.filter((tool) => tool.category === category);
}
