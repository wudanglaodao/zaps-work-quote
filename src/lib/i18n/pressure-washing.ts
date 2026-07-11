import type { Locale } from "./config";

export type PressureWashingCopy = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  serviceDetails: string;
  drivewayArea: string;
  measurementMode: string;
  areaMode: string;
  dimensionsMode: string;
  area: string;
  length: string;
  width: string;
  squareFeet: string;
  squareMeters: string;
  ratePerArea: string;
  condition: string;
  light: string;
  standard: string;
  heavy: string;
  access: string;
  normalAccess: string;
  difficultAccess: string;
  sharedCosts: string;
  crewSize: string;
  crewHours: string;
  laborRate: string;
  chemicals: string;
  equipment: string;
  travel: string;
  other: string;
  pricing: string;
  addOnAmount: string;
  packageDiscount: string;
  targetMargin: string;
  minimumFee?: string;
  taxRate: string;
  quoteDetails: string;
  targetQuote: string;
  measuredArea: string;
  directCost: string;
  profit: string;
  margin: string;
  surfaceRate: string;
  labor: string;
  operatingCosts: string;
  pricingFloor: string;
  conditionNote: string;
  accessNote: string;
  methodologyTitle: string;
  methodologyBody: string;
  privacyNote: string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
};

const copies: Record<Locale, PressureWashingCopy> = {
  en: {
    title: "Pressure Washing Quote Calculator | zaps.work", description: "Estimate driveway pressure washing costs, protect your margin, and export a customer-ready quote.", heading: "Pressure Washing Quote", intro: "Price a driveway cleaning job with area, condition, crew time, operating costs, and a ready-to-send quote.", serviceDetails: "Driveway details", drivewayArea: "Driveway size", measurementMode: "Measure by", areaMode: "Area", dimensionsMode: "Length × width", area: "Area", length: "Length", width: "Width", squareFeet: "sq ft", squareMeters: "sq m", ratePerArea: "Surface rate", condition: "Surface condition", light: "Light", standard: "Standard", heavy: "Heavy", access: "Site access", normalAccess: "Normal", difficultAccess: "Difficult", sharedCosts: "Crew & operating costs", crewSize: "Crew size", crewHours: "Crew hours", laborRate: "Labor rate", chemicals: "Chemicals", equipment: "Equipment", travel: "Travel", other: "Other cost", pricing: "Pricing", addOnAmount: "Add-ons", packageDiscount: "Package discount", targetMargin: "Target margin", minimumFee: "Minimum service fee", taxRate: "Tax", quoteDetails: "Quote details", targetQuote: "Target quote", measuredArea: "Measured area", directCost: "Direct cost", profit: "Profit", margin: "Margin", surfaceRate: "Surface service", labor: "Crew labor", operatingCosts: "Operating costs", pricingFloor: "Pricing floor", conditionNote: "Condition", accessNote: "Access", methodologyTitle: "What this estimate includes", methodologyBody: "The estimate combines the measured driveway area, surface condition, access difficulty, crew time, labor, chemicals, equipment, travel, add-ons, discounts, minimum fee, margin, and tax.", privacyNote: "Customer names and contact details stay in your browser and are not stored in our database.", faqTitle: "Pressure washing quote questions", faq: [{ question: "How is the driveway quote calculated?", answer: "The calculator applies a surface rate to the measured area, adjusts for condition and access, then checks labor, operating costs, margin, and the minimum service fee." }, { question: "Can I use square meters instead of square feet?", answer: "Yes. Choose square feet or square meters and enter the rate in the same unit." }, { question: "Can I quote add-on services?", answer: "Yes. Add-ons and package discounts are included before the minimum service fee and tax are applied." }],
  },
  "zh-hant": {
    title: "高壓清洗報價計算器 | zaps.work", description: "估算車道高壓清洗成本、守住毛利，並匯出可直接寄給客戶的報價單。", heading: "高壓清洗報價", intro: "輸入車道面積、表面狀況、人力工時與營運成本，快速產生可用的服務報價。", serviceDetails: "車道資料", drivewayArea: "車道尺寸", measurementMode: "測量方式", areaMode: "面積", dimensionsMode: "長 × 寬", area: "面積", length: "長度", width: "寬度", squareFeet: "平方英尺", squareMeters: "平方公尺", ratePerArea: "單位面積費率", condition: "表面狀況", light: "輕度", standard: "一般", heavy: "嚴重", access: "現場進出", normalAccess: "正常", difficultAccess: "困難", sharedCosts: "人力與營運成本", crewSize: "人員數量", crewHours: "團隊工時", laborRate: "人工費率", chemicals: "清潔藥劑", equipment: "設備", travel: "交通", other: "其他成本", pricing: "定價", addOnAmount: "加購服務", packageDiscount: "套裝折扣", targetMargin: "目標毛利率", minimumFee: "最低服務費", taxRate: "稅額", quoteDetails: "報價資料", targetQuote: "目標報價", measuredArea: "測量面積", directCost: "直接成本", profit: "利潤", margin: "毛利率", surfaceRate: "表面清洗", labor: "團隊人工", operatingCosts: "營運成本", pricingFloor: "定價底線", conditionNote: "狀況", accessNote: "進出", methodologyTitle: "估價包含哪些內容", methodologyBody: "估價會合併車道面積、表面狀況、現場進出難度、團隊工時、人工、藥劑、設備、交通、加購、折扣、最低費用、毛利與稅額。", privacyNote: "客戶姓名與聯絡資料會留在你的瀏覽器中，不會儲存在我們的資料庫。", faqTitle: "高壓清洗報價問題", faq: [{ question: "車道報價如何計算？", answer: "工具會將單位面積費率套用到測量面積，再檢查人工、營運成本、毛利與最低服務費。" }, { question: "可以使用平方公尺嗎？", answer: "可以，選擇平方英尺或平方公尺，並用相同單位輸入費率。" }, { question: "可以加入其他服務嗎？", answer: "可以，加購服務與套裝折扣會在套用最低服務費和稅額前計入。" }],
  },
  de: {
    title: "Hochdruckreinigung Angebotsrechner | zaps.work", description: "Kosten für die Einfahrtsreinigung kalkulieren, Marge schützen und ein Kundenangebot exportieren.", heading: "Angebot für Hochdruckreinigung", intro: "Kalkulieren Sie eine Einfahrtsreinigung mit Fläche, Zustand, Teamzeit und Betriebskosten.", serviceDetails: "Daten zur Einfahrt", drivewayArea: "Größe der Einfahrt", measurementMode: "Messung", areaMode: "Fläche", dimensionsMode: "Länge × Breite", area: "Fläche", length: "Länge", width: "Breite", squareFeet: "sq ft", squareMeters: "m²", ratePerArea: "Flächensatz", condition: "Oberflächenzustand", light: "Leicht", standard: "Standard", heavy: "Stark", access: "Zugang", normalAccess: "Normal", difficultAccess: "Schwierig", sharedCosts: "Team- und Betriebskosten", crewSize: "Teamgröße", crewHours: "Teamstunden", laborRate: "Arbeitssatz", chemicals: "Reinigungsmittel", equipment: "Ausrüstung", travel: "Anfahrt", other: "Sonstige Kosten", pricing: "Preisgestaltung", addOnAmount: "Zusatzleistungen", packageDiscount: "Paketnachlass", targetMargin: "Zielmarge", minimumFee: "Mindestgebühr", taxRate: "Steuer", quoteDetails: "Angebotsdaten", targetQuote: "Zielangebot", measuredArea: "Gemessene Fläche", directCost: "Direktkosten", profit: "Gewinn", margin: "Marge", surfaceRate: "Flächenservice", labor: "Teamarbeit", operatingCosts: "Betriebskosten", pricingFloor: "Preisuntergrenze", conditionNote: "Zustand", accessNote: "Zugang", methodologyTitle: "Was die Schätzung enthält", methodologyBody: "Berücksichtigt werden Fläche, Zustand, Zugang, Teamzeit, Arbeit, Reinigungsmittel, Ausrüstung, Anfahrt, Zusatzleistungen, Nachlass, Mindestgebühr, Marge und Steuer.", privacyNote: "Kundennamen und Kontaktdaten bleiben in Ihrem Browser und werden nicht in unserer Datenbank gespeichert.", faqTitle: "Fragen zur Hochdruckreinigung", faq: [{ question: "Wie wird das Angebot berechnet?", answer: "Der Flächensatz wird auf die gemessene Fläche angewendet und um Zustand und Zugang angepasst. Danach werden Arbeit, Betriebskosten, Marge und Mindestgebühr geprüft." }, { question: "Kann ich Quadratmeter verwenden?", answer: "Ja. Wählen Sie Quadratfuß oder Quadratmeter und verwenden Sie dieselbe Einheit für den Satz." }, { question: "Kann ich Zusatzleistungen hinzufügen?", answer: "Ja. Zusatzleistungen und Paketnachlass werden vor Mindestgebühr und Steuer berücksichtigt." }],
  },
  ja: {
    title: "高圧洗浄見積もり計算機 | zaps.work", description: " driveway の高圧洗浄コストを計算し、利益率を確認して見積書を出力します。", heading: "高圧洗浄見積もり", intro: "面積、状態、作業時間、運営コストを入力して、 driveway 清掃の見積もりを作成します。", serviceDetails: "作業データ", drivewayArea: " driveway サイズ", measurementMode: "測定方法", areaMode: "面積", dimensionsMode: "長さ × 幅", area: "面積", length: "長さ", width: "幅", squareFeet: "sq ft", squareMeters: "m²", ratePerArea: "面積単価", condition: "表面の状態", light: "軽い", standard: "標準", heavy: "重い", access: "現場へのアクセス", normalAccess: "通常", difficultAccess: "困難", sharedCosts: "スタッフと運営コスト", crewSize: "人数", crewHours: "作業時間", laborRate: "人件費単価", chemicals: "薬剤", equipment: "機材", travel: "移動費", other: "その他の費用", pricing: "価格設定", addOnAmount: "追加サービス", packageDiscount: "パッケージ割引", targetMargin: "目標利益率", minimumFee: "最低訪問料金", taxRate: "税金", quoteDetails: "見積書情報", targetQuote: "目標見積額", measuredArea: "測定面積", directCost: "直接費", profit: "利益", margin: "利益率", surfaceRate: "表面清掃", labor: "作業人件費", operatingCosts: "運営コスト", pricingFloor: "価格下限", conditionNote: "状態", accessNote: "アクセス", methodologyTitle: "見積もりに含まれる内容", methodologyBody: "面積、表面状態、アクセス、作業時間、人件費、薬剤、機材、移動費、追加サービス、割引、最低料金、利益率、税金を組み合わせます。", privacyNote: "顧客名と連絡先はブラウザ内に留まり、データベースには保存されません。", faqTitle: "高圧洗浄の見積もりに関する質問", faq: [{ question: "見積もりはどのように計算されますか？", answer: "面積単価を面積に適用し、状態とアクセスで調整した後、人件費、運営費、利益率、最低料金を確認します。" }, { question: "平方メートルを使えますか？", answer: "はい。平方フィートまたは平方メートルを選び、同じ単位で単価を入力します。" }, { question: "追加サービスを入れられますか？", answer: "はい。最低料金と税金を適用する前に、追加サービスと割引を反映できます。" }],
  },
  es: {
    title: "Calculadora de presupuestos de lavado a presión | zaps.work", description: "Calcula el coste de limpiar una entrada, protege tu margen y exporta un presupuesto.", heading: "Presupuesto de lavado a presión", intro: "Calcula la limpieza de una entrada con superficie, estado, horas del equipo y costes operativos.", serviceDetails: "Datos de la entrada", drivewayArea: "Tamaño de la entrada", measurementMode: "Medir por", areaMode: "Superficie", dimensionsMode: "Largo × ancho", area: "Superficie", length: "Largo", width: "Ancho", squareFeet: "pies²", squareMeters: "m²", ratePerArea: "Tarifa por superficie", condition: "Estado de la superficie", light: "Ligero", standard: "Estándar", heavy: "Intenso", access: "Acceso al sitio", normalAccess: "Normal", difficultAccess: "Difícil", sharedCosts: "Equipo y costes operativos", crewSize: "Tamaño del equipo", crewHours: "Horas del equipo", laborRate: "Tarifa laboral", chemicals: "Productos químicos", equipment: "Equipo", travel: "Desplazamiento", other: "Otros costes", pricing: "Precios", addOnAmount: "Extras", packageDiscount: "Descuento del paquete", targetMargin: "Margen objetivo", minimumFee: "Tarifa mínima", taxRate: "Impuesto", quoteDetails: "Datos del presupuesto", targetQuote: "Presupuesto objetivo", measuredArea: "Superficie medida", directCost: "Coste directo", profit: "Beneficio", margin: "Margen", surfaceRate: "Servicio de superficie", labor: "Trabajo del equipo", operatingCosts: "Costes operativos", pricingFloor: "Precio mínimo", conditionNote: "Estado", accessNote: "Acceso", methodologyTitle: "Qué incluye la estimación", methodologyBody: "La estimación combina superficie, estado, acceso, horas, mano de obra, productos, equipo, desplazamiento, extras, descuentos, tarifa mínima, margen e impuestos.", privacyNote: "Los nombres y datos de contacto de clientes permanecen en tu navegador y no se guardan en nuestra base de datos.", faqTitle: "Preguntas sobre presupuestos de lavado", faq: [{ question: "¿Cómo se calcula el presupuesto?", answer: "Se aplica una tarifa por superficie, ajustada por estado y acceso, y después se comprueban mano de obra, costes operativos, margen y tarifa mínima." }, { question: "¿Puedo usar metros cuadrados?", answer: "Sí. Elige pies cuadrados o metros cuadrados y usa la misma unidad para la tarifa." }, { question: "¿Puedo añadir servicios extra?", answer: "Sí. Los extras y descuentos se incluyen antes de aplicar la tarifa mínima y los impuestos." }],
  },
  fr: {
    title: "Calculateur de devis de lavage haute pression | zaps.work", description: "Estimez le coût du nettoyage d’une allée, protégez votre marge et exportez un devis.", heading: "Devis de lavage haute pression", intro: "Calculez le nettoyage d’une allée avec la surface, l’état, les heures d’équipe et les coûts d’exploitation.", serviceDetails: "Données de l’allée", drivewayArea: "Taille de l’allée", measurementMode: "Mesurer par", areaMode: "Surface", dimensionsMode: "Longueur × largeur", area: "Surface", length: "Longueur", width: "Largeur", squareFeet: "pi²", squareMeters: "m²", ratePerArea: "Tarif au m²", condition: "État de la surface", light: "Léger", standard: "Standard", heavy: "Important", access: "Accès au site", normalAccess: "Normal", difficultAccess: "Difficile", sharedCosts: "Équipe et coûts d’exploitation", crewSize: "Taille de l’équipe", crewHours: "Heures d’équipe", laborRate: "Tarif de main-d’œuvre", chemicals: "Produits", equipment: "Équipement", travel: "Déplacement", other: "Autres coûts", pricing: "Tarification", addOnAmount: "Options", packageDiscount: "Remise forfait", targetMargin: "Marge cible", minimumFee: "Frais minimum", taxRate: "Taxe", quoteDetails: "Données du devis", targetQuote: "Devis cible", measuredArea: "Surface mesurée", directCost: "Coût direct", profit: "Bénéfice", margin: "Marge", surfaceRate: "Service de surface", labor: "Main-d’œuvre", operatingCosts: "Coûts d’exploitation", pricingFloor: "Prix plancher", conditionNote: "État", accessNote: "Accès", methodologyTitle: "Ce que comprend l’estimation", methodologyBody: "L’estimation combine la surface, l’état, l’accès, le temps d’équipe, la main-d’œuvre, les produits, l’équipement, le déplacement, les options, la remise, les frais minimum, la marge et la taxe.", privacyNote: "Les noms et coordonnées des clients restent dans votre navigateur et ne sont pas enregistrés dans notre base de données.", faqTitle: "Questions sur les devis de lavage", faq: [{ question: "Comment le devis est-il calculé ?", answer: "Le tarif de surface est appliqué à la surface mesurée, puis ajusté selon l’état et l’accès. Les coûts, la marge et les frais minimum sont ensuite vérifiés." }, { question: "Puis-je utiliser les mètres carrés ?", answer: "Oui. Choisissez les pieds carrés ou les mètres carrés et utilisez la même unité pour le tarif." }, { question: "Puis-je ajouter des options ?", answer: "Oui. Les options et remises sont prises en compte avant les frais minimum et la taxe." }],
  },
  "pt-br": {
    title: "Calculadora de orçamento de lavagem sob pressão | zaps.work", description: "Calcule o custo de lavar uma entrada, proteja sua margem e exporte um orçamento.", heading: "Orçamento de lavagem sob pressão", intro: "Calcule a limpeza de uma entrada com área, condição, horas da equipe e custos operacionais.", serviceDetails: "Dados da entrada", drivewayArea: "Tamanho da entrada", measurementMode: "Medir por", areaMode: "Área", dimensionsMode: "Comprimento × largura", area: "Área", length: "Comprimento", width: "Largura", squareFeet: "pés²", squareMeters: "m²", ratePerArea: "Valor por área", condition: "Condição da superfície", light: "Leve", standard: "Padrão", heavy: "Pesada", access: "Acesso ao local", normalAccess: "Normal", difficultAccess: "Difícil", sharedCosts: "Equipe e custos operacionais", crewSize: "Tamanho da equipe", crewHours: "Horas da equipe", laborRate: "Valor da mão de obra", chemicals: "Produtos químicos", equipment: "Equipamento", travel: "Deslocamento", other: "Outros custos", pricing: "Preços", addOnAmount: "Adicionais", packageDiscount: "Desconto do pacote", targetMargin: "Margem desejada", minimumFee: "Taxa mínima", taxRate: "Imposto", quoteDetails: "Dados do orçamento", targetQuote: "Orçamento alvo", measuredArea: "Área medida", directCost: "Custo direto", profit: "Lucro", margin: "Margem", surfaceRate: "Serviço de superfície", labor: "Mão de obra", operatingCosts: "Custos operacionais", pricingFloor: "Preço mínimo", conditionNote: "Condição", accessNote: "Acesso", methodologyTitle: "O que a estimativa inclui", methodologyBody: "A estimativa combina área, condição, acesso, horas, mão de obra, produtos, equipamento, deslocamento, adicionais, descontos, taxa mínima, margem e imposto.", privacyNote: "Nomes e dados de contato dos clientes ficam no seu navegador e não são armazenados em nosso banco de dados.", faqTitle: "Dúvidas sobre orçamento de lavagem", faq: [{ question: "Como o orçamento é calculado?", answer: "O valor por área é aplicado à área medida e ajustado pela condição e pelo acesso. Depois são verificados mão de obra, custos, margem e taxa mínima." }, { question: "Posso usar metros quadrados?", answer: "Sim. Escolha pés quadrados ou metros quadrados e use a mesma unidade para o valor." }, { question: "Posso incluir serviços adicionais?", answer: "Sim. Adicionais e descontos são aplicados antes da taxa mínima e do imposto." }],
  },
  ko: {
    title: "고압 세척 견적 계산기 | zaps.work", description: "진입로 고압 세척 비용을 계산하고 마진을 보호하며 견적서를 내보내세요.", heading: "고압 세척 견적", intro: "면적, 상태, 작업 시간과 운영 비용을 입력해 진입로 세척 견적을 만드세요.", serviceDetails: "진입로 정보", drivewayArea: "진입로 크기", measurementMode: "측정 방식", areaMode: "면적", dimensionsMode: "길이 × 너비", area: "면적", length: "길이", width: "너비", squareFeet: "제곱피트", squareMeters: "제곱미터", ratePerArea: "면적 단가", condition: "표면 상태", light: "가벼움", standard: "표준", heavy: "심함", access: "현장 접근", normalAccess: "보통", difficultAccess: "어려움", sharedCosts: "인력 및 운영 비용", crewSize: "팀 규모", crewHours: "팀 작업 시간", laborRate: "인건비 단가", chemicals: "세척제", equipment: "장비", travel: "이동 비용", other: "기타 비용", pricing: "가격 설정", addOnAmount: "추가 서비스", packageDiscount: "패키지 할인", targetMargin: "목표 마진", minimumFee: "최소 방문 요금", taxRate: "세금", quoteDetails: "견적 정보", targetQuote: "목표 견적", measuredArea: "측정 면적", directCost: "직접 비용", profit: "이익", margin: "마진", surfaceRate: "표면 서비스", labor: "팀 인건비", operatingCosts: "운영 비용", pricingFloor: "가격 하한", conditionNote: "상태", accessNote: "접근", methodologyTitle: "견적에 포함되는 항목", methodologyBody: "면적, 표면 상태, 접근성, 작업 시간, 인건비, 세척제, 장비, 이동, 추가 서비스, 할인, 최소 요금, 마진과 세금을 함께 계산합니다.", privacyNote: "고객 이름과 연락처는 브라우저에 남으며 데이터베이스에 저장되지 않습니다.", faqTitle: "고압 세척 견적 질문", faq: [{ question: "견적은 어떻게 계산되나요?", answer: "면적 단가를 면적에 적용하고 상태와 접근성에 따라 조정한 뒤 인건비, 운영 비용, 마진과 최소 요금을 확인합니다." }, { question: "제곱미터를 사용할 수 있나요?", answer: "네. 제곱피트 또는 제곱미터를 선택하고 같은 단위로 단가를 입력하세요." }, { question: "추가 서비스를 넣을 수 있나요?", answer: "네. 최소 요금과 세금을 적용하기 전에 추가 서비스와 할인을 반영할 수 있습니다." }],
  },
};

export function getPressureWashingCopy(locale: Locale) {
  const copy = { ...copies[locale] };
  delete copy.minimumFee;
  const replacements: Partial<Record<Locale, Array<[string, string]>>> = {
    en: [[", minimum fee, ", ", "], [", and the minimum service fee", ""], ["the minimum service fee and tax", "tax"], ["minimum service fee", ""]],
    "zh-hant": [["、最低費用", ""], ["與最低服務費。", "。"], ["套用最低服務費和稅額前", "套用稅額前"]],
    de: [["Mindestgebühr, ", ""], [" und Mindestgebühr", ""], ["vor Mindestgebühr und Steuer", "vor Steuer"]],
    ja: [["、最低料金、", "、"], ["、最低料金を", "を"], ["最低料金と税金を適用する前に", "税金を適用する前に"]],
    es: [["tarifa mínima, ", ""], [" y tarifa mínima", ""], ["la tarifa mínima y los impuestos", "los impuestos"]],
    fr: [["les frais minimum, ", ""], [" et les frais minimum", ""], ["les frais minimum et la taxe", "la taxe"]],
    "pt-br": [["taxa mínima, ", ""], [" e taxa mínima", ""], ["a taxa mínima e do imposto", "o imposto"]],
    ko: [["최소 요금, ", ""], ["과 최소 요금", ""], ["최소 요금과 세금을 적용하기 전에", "세금을 적용하기 전에"]],
  };
  const applyReplacements = (text: string) => (replacements[locale] ?? []).reduce((value, [from, to]) => value.replaceAll(from, to), text);
  return {
    ...copy,
    methodologyBody: applyReplacements(copy.methodologyBody),
    faq: copy.faq.map((entry) => ({ ...entry, answer: applyReplacements(entry.answer) })),
  };
}
