import type { Locale } from "./config";
import { withSimplifiedChinese } from "./simplified-chinese";
import type { SheetMetalMaterial } from "../calculators/sheet-metal-bend";

export type SheetMetalBendCopy = {
  title: string;
  heading: string;
  intro: string;
  description: string;
  parametersTitle: string;
  parametersSubtitle: string;
  material: string;
  materialOptions: Record<SheetMetalMaterial, string>;
  kFactor: string;
  customKFactor: string;
  unit: string;
  unitMetric: string;
  unitImperial: string;
  thickness: string;
  insideRadius: string;
  bendAngle: string;
  flangeA: string;
  flangeB: string;
  quantity: string;
  resultsTitle: string;
  flatLength: string;
  totalFlatLength: string;
  bendDeduction: string;
  bendAllowance: string;
  setback: string;
  neutralAxis: string;
  innerArc: string;
  outerArc: string;
  formulaNote: string;
  copySummary: string;
  copied: string;
  printPdf: string;
  sendToLaser: string;
  laserLinkHint: string;
  diagramTitle: string;
  neutralAxisLegend: string;
  methodologyTitle: string;
  methodologyBody: string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
};

const baseCopies: Record<Exclude<Locale, "zh-hans">, SheetMetalBendCopy> = {
  "en": {
    "title": "Sheet Metal Bend Calculator & Flat Pattern (K-Factor, BD, BA) | zaps.work",
    "heading": "Sheet Metal Bend Calculator",
    "intro": "Calculate bend deduction (BD), bend allowance (BA), setback (OSSB), and flat pattern unfolding length for precision sheet metal fabrication.",
    "description": "Free online sheet metal bend calculator. Calculate K-Factor, Bend Deduction (BD), Bend Allowance (BA), and Flat Length for press brake and laser cutting.",
    "parametersTitle": "Bend Parameters",
    "parametersSubtitle": "Sheet Metal Bending",
    "material": "Sheet Material",
    "materialOptions": {
      "coldRolledSteel": "Cold Rolled Steel (CRS, K=0.44)",
      "stainlessSteel": "Stainless Steel (SUS304, K=0.45)",
      "aluminum": "Aluminum (6061/5052, K=0.40)",
      "brassCopper": "Brass / Copper (K=0.42)",
      "custom": "Custom K-Factor"
    },
    "kFactor": "K-Factor (Neutral Axis)",
    "customKFactor": "Custom K-Factor",
    "unit": "Unit System",
    "unitMetric": "Metric (mm)",
    "unitImperial": "Imperial (in)",
    "thickness": "Sheet Thickness (T)",
    "insideRadius": "Inside Bend Radius (R)",
    "bendAngle": "Bend Angle (θ)",
    "flangeA": "Flange A Length",
    "flangeB": "Flange B Length",
    "quantity": "Batch Quantity",
    "resultsTitle": "Unfolded Dimensions",
    "flatLength": "Flat Pattern Length",
    "totalFlatLength": "Total Batch Length",
    "bendDeduction": "Bend Deduction (BD)",
    "bendAllowance": "Bend Allowance (BA)",
    "setback": "Setback (OSSB)",
    "neutralAxis": "Neutral Axis Radius",
    "innerArc": "Inner Arc Length",
    "outerArc": "Outer Arc Length",
    "formulaNote": "Formulas based on ISO 2768 / DIN 6935 standards for air bending and bottoming.",
    "copySummary": "Copy Summary",
    "copied": "Copied!",
    "printPdf": "Print / Save PDF",
    "sendToLaser": "Send Size to Laser Quote →",
    "laserLinkHint": "Take this flat pattern size directly to the Laser Cutting Calculator for instant pricing.",
    "diagramTitle": "2D Cross-Section Preview",
    "neutralAxisLegend": "Red dashed line indicates neutral axis (no tension/compression)",
    "methodologyTitle": "How Sheet Metal Bend Deduction Works",
    "methodologyBody": "When sheet metal is bent, the outer surface is stretched in tension while the inner surface is compressed. The neutral axis is the plane where no deformation occurs, characterized by the K-factor (ratio of neutral axis distance to thickness). Bend Deduction (BD = 2 × OSSB - BA) accounts for material stretch so your cut flat pattern produces the exact finished outer dimensions.",
    "faqTitle": "Frequently Asked Questions",
    "faq": [
      {
        "question": "What is K-Factor and how to choose it?",
        "answer": "K-Factor represents the ratio of the neutral axis depth to the material thickness (t/T). Typical air bending values range from 0.38 to 0.45. Softer materials like aluminum usually have lower K-factors (0.40), while steels average around 0.44-0.45."
      },
      {
        "question": "What is the difference between Bend Allowance (BA) and Bend Deduction (BD)?",
        "answer": "Bend Allowance is the arc length along the neutral axis around the bend. Bend Deduction is the amount subtracted from the sum of the flange lengths (A + B) to find the flat blank length (L = A + B - BD)."
      },
      {
        "question": "Does this support acute and obtuse bend angles?",
        "answer": "Yes, the calculator supports any bend angle from 1° to 179°, dynamically recalculating outer setback (OSSB) and bend allowance accordingly."
      }
    ]
  },
  "zh-hant": {
    "title": "鈑金折彎扣除量與展開長度計算器 (K-Factor, BD, BA) | zaps.work",
    "heading": "鈑金折彎展開計算器",
    "intro": "精確計算折彎扣除量 (BD)、補償量 (BA)、外退量 (OSSB) 與展開下料長度，專為鈑金加工與雷射下料設計。",
    "description": "免費線上鈑金折彎計算器。即時計算中性層 K 系數、折彎扣除量 (BD)、折彎補償量 (BA) 與展開總長度。",
    "parametersTitle": "折彎參數設定",
    "parametersSubtitle": "輸入板厚、內 R 角、折彎角度與各法蘭邊長",
    "material": "板材材質",
    "materialOptions": {
      "coldRolledSteel": "冷軋碳鋼 (CRS, K=0.44)",
      "stainlessSteel": "不鏽鋼 (SUS304, K=0.45)",
      "aluminum": "鋁合金 (6061/5052, K=0.40)",
      "brassCopper": "黃銅／紫銅 (K=0.42)",
      "custom": "自訂 K 系數"
    },
    "kFactor": "K 系數 (中性層比例)",
    "customKFactor": "自訂 K 系數",
    "unit": "單位制",
    "unitMetric": "公制 (mm)",
    "unitImperial": "英制 (in)",
    "thickness": "板材厚度 (T)",
    "insideRadius": "內折彎半徑 (R)",
    "bendAngle": "折彎角度 (θ)",
    "flangeA": "法蘭邊長 A",
    "flangeB": "法蘭邊長 B",
    "quantity": "批量數量",
    "resultsTitle": "展開下料尺寸",
    "flatLength": "單件展開下料長度",
    "totalFlatLength": "批量累計長度",
    "bendDeduction": "折彎扣除量 (BD)",
    "bendAllowance": "折彎補償量 (BA)",
    "setback": "外退量 (OSSB)",
    "neutralAxis": "中性層半徑",
    "innerArc": "內弧長",
    "outerArc": "外弧長",
    "formulaNote": "基於 ISO / DIN 標準折彎力學公式精確計算。",
    "copySummary": "複製結果",
    "copied": "已複製！",
    "printPdf": "列印／儲存 PDF",
    "sendToLaser": "帶入雷射切割報價 →",
    "laserLinkHint": "將此展開下料尺寸直接傳送至雷射切割計算器，快速完成加工報價。",
    "diagramTitle": "2D 折彎截面即時預覽",
    "neutralAxisLegend": "紅色虛線代表中性層（材料無拉伸／壓縮處）",
    "methodologyTitle": "鈑金折彎扣除量原理",
    "methodologyBody": "鈑金在折彎機受壓彎曲時，外側板材受拉伸伸長，內側板材受擠壓縮短。中性層（K-Factor）是板材內部既不伸長也不縮短的理論平面。折彎扣除量 (BD = 2 × OSSB - BA) 扣除了材料拉伸量，確保展開下料切割出的平板折彎後正好符合成品外尺寸。",
    "faqTitle": "常見問題與計算說明",
    "faq": [
      {
        "question": "什麼是 K 系數 (K-Factor)？",
        "answer": "K 系數是中性層距內表面的距離與板厚的比值 (t/T)。常規自由折彎中，鋁合金一般約 0.40，碳鋼約 0.44，不鏽鋼約 0.45。"
      },
      {
        "question": "折彎補償量 (BA) 與折彎扣除量 (BD) 有何差別？",
        "answer": "BA 是折彎圓弧處中性層的弧長；BD 是兩邊外尺寸之和 (A + B) 減去展開長度的扣減值 (L = A + B - BD)。"
      },
      {
        "question": "支援非 90 度的銳角或鈍角折彎嗎？",
        "answer": "支援 1° 到 179° 的任意角度折彎，系統會自動透過三角函數重算外退量 OSSB 與補償量。"
      }
    ]
  },
  "de": {
    "title": "Blechbiegerechner & Abwicklung (K-Faktor, BD, BA) | zaps.work",
    "heading": "Blechbiegerechner & Zuschnitt",
    "intro": "Berechne Biegeverkürzung (BD), Ausgleichswert (BA), Rücksprung (OSSB) und gestreckte Länge für die präzise Blechfertigung.",
    "description": "Kostenloser Online-Blechbiegerechner. Berechne K-Faktor, Biegeverkürzung und gestreckte Länge für Abkantpresse und Laserzuschnitt.",
    "parametersTitle": "Biegeparameter",
    "parametersSubtitle": "Blechdicke, Innenradius, Biegewinkel und Schenkellängen",
    "material": "Werkstoff",
    "materialOptions": {
      "coldRolledSteel": "Kaltgewalzter Stahl (K=0.44)",
      "stainlessSteel": "Edelstahl (1.4301 / V2A, K=0.45)",
      "aluminum": "Aluminium (AlMg3 / 6061, K=0.40)",
      "brassCopper": "Messing / Kupfer (K=0.42)",
      "custom": "Eigener K-Faktor"
    },
    "kFactor": "K-Faktor (Neutrale Faser)",
    "customKFactor": "Benutzerdefinierter K-Faktor",
    "unit": "Einheitensystem",
    "unitMetric": "Metric (mm)",
    "unitImperial": "Imperial (in)",
    "thickness": "Blechdicke (T)",
    "insideRadius": "Innenradius (R)",
    "bendAngle": "Biegewinkel (θ)",
    "flangeA": "Schenkellänge A",
    "flangeB": "Schenkellänge B",
    "quantity": "Stückzahl",
    "resultsTitle": "Zuschnittmaße",
    "flatLength": "Gestreckte Länge (Zuschnitt)",
    "totalFlatLength": "Gesamtlänge Charge",
    "bendDeduction": "Biegeverkürzung (BD)",
    "bendAllowance": "Biegeausgleich (BA)",
    "setback": "Rücksprung (OSSB)",
    "neutralAxis": "Radius neutrale Faser",
    "innerArc": "Innere Bogenlänge",
    "outerArc": "Äußere Bogenlänge",
    "formulaNote": "Berechnung nach DIN 6935 / ISO-Standards für das freie Biegen.",
    "copySummary": "Zusammenfassung kopieren",
    "copied": "Kopiert!",
    "printPdf": "Drucken / PDF speichern",
    "sendToLaser": "Maße an Laserschneid-Rechner senden →",
    "laserLinkHint": "Übernimm diese Zuschnittmaße direkt in den Laserschneid-Kalkulator für ein sofortiges Angebot.",
    "diagramTitle": "2D-Biegequerschnitt Live-Vorschau",
    "neutralAxisLegend": "Rote gestrichelte Linie markiert die neutrale Faser (dehnungsfrei)",
    "methodologyTitle": "Funktionsweise der Biegeberechnung",
    "methodologyBody": "Beim Biegen von Blechen wird die Außenseite gedehnt und die Innenseite gestaucht. Die neutrale Faser bleibt längenunverändert. Der Ausgleichswert und die Biegeverkürzung gleichen die Verformung exakt aus.",
    "faqTitle": "Häufig gestellte Fragen",
    "faq": [
      {
        "question": "Was ist der K-Faktor?",
        "answer": "Der K-Faktor beschreibt die Lage der neutralen Faser im Verhältnis zur Blechdicke (t/T)."
      },
      {
        "question": "Unterschied zwischen BA und BD?",
        "answer": "BA ist die Bogenlänge der neutralen Faser; BD wird von den Außenmaßen (A + B) abgezogen."
      },
      {
        "question": "Werden alle Winkel unterstützt?",
        "answer": "Ja, der Rechner unterstützt jeden Biegewinkel von 1° bis 179°."
      }
    ]
  },
  "ja": {
    "title": "板金曲げ展開計算機 (Kファクター, 伸び補正, 展開長) | zaps.work",
    "heading": "板金曲げ展開計算機",
    "intro": "曲げ補正値 (BD/BA)、外側セットバック (OSSB)、展開ブランク長を瞬時に計算し、高精度な板金加工・レーザー切断をサポートします。",
    "description": "無料の板金曲げ展開オンライン計算ツール。Kファクター、曲げ伸び値、展開寸法を即座に計算。",
    "parametersTitle": "曲げパラメータ設定",
    "parametersSubtitle": "板厚、曲げR、曲げ角度、フランジ寸法を入力",
    "material": "板材材質",
    "materialOptions": {
      "coldRolledSteel": "SPCC 冷間圧延鋼板 (K=0.44)",
      "stainlessSteel": "SUS304 ステンレス (K=0.45)",
      "aluminum": "A5052 / A6061 アルミ (K=0.40)",
      "brassCopper": "真鍮・銅 (K=0.42)",
      "custom": "カスタム K値"
    },
    "kFactor": "Kファクター (中立軸比率)",
    "customKFactor": "カスタム Kファクター",
    "unit": "単位",
    "unitMetric": "Metric (mm)",
    "unitImperial": "Imperial (in)",
    "thickness": "板厚 (T)",
    "insideRadius": "内曲げ半径 (R)",
    "bendAngle": "曲げ角度 (θ)",
    "flangeA": "フランジ長 A",
    "flangeB": "フランジ長 B",
    "quantity": "製作数量",
    "resultsTitle": "展開下穴寸法",
    "flatLength": "展開下料長さ",
    "totalFlatLength": "ロット合計長さ",
    "bendDeduction": "曲げ伸び引き値 (BD)",
    "bendAllowance": "曲げ余裕値 (BA)",
    "setback": "セットバック (OSSB)",
    "neutralAxis": "中立面半径",
    "innerArc": "内周円弧長",
    "outerArc": "外周円弧長",
    "formulaNote": "JIS / ISO 規格の板金曲げ計算式に準拠。",
    "copySummary": "結果をコピー",
    "copied": "コピーしました！",
    "printPdf": "印刷／PDF保存",
    "sendToLaser": "レーザー加工見積もりに送信 →",
    "laserLinkHint": "この展開寸法をレーザー加工計算機に自動反映し、見積書を即座に作成できます。",
    "diagramTitle": "2D 曲げ断面リアルタイム図",
    "neutralAxisLegend": "赤の破線は伸縮のない中立軸を示します",
    "methodologyTitle": "板金曲げ展開の計算原理",
    "methodologyBody": "金属板を曲げると外側は伸び内側は圧縮されます。伸び縮みしない中立軸の位置をKファクターで表し、正確な展開寸法を算出します。",
    "faqTitle": "よくあるご質問",
    "faq": [
      {
        "question": "Kファクターとは？",
        "answer": "板厚に対する中立軸深さの比率 (t/T) です。"
      },
      {
        "question": "BAとBDの違いは？",
        "answer": "BAは中立軸の曲げ円弧長、BDは外寸合計から差し引く補正値です。"
      },
      {
        "question": "鋭角・鈍角に対応していますか？",
        "answer": "1°〜179°の任意の角度に対応しています。"
      }
    ]
  },
  "es": {
    "title": "Calculadora de Plegado de Chapa y Desarrollo Plano (Factor K, BD, BA) | zaps.work",
    "heading": "Calculadora de Plegado de Chapa",
    "intro": "Calcula la deducción de curvatura (BD), compensación (BA), retroceso (OSSB) y longitud desplegada para plegado y corte láser.",
    "description": "Calculadora gratuita de desarrollo de chapa metálica. Calcula Factor K, Deducción de Plegado y Longitud Desplegada.",
    "parametersTitle": "Parámetros de Plegado",
    "parametersSubtitle": "Grosor, radio interior, ángulo y longitud de pestañas",
    "material": "Material",
    "materialOptions": {
      "coldRolledSteel": "Acero Laminado en Frío (K=0.44)",
      "stainlessSteel": "Acero Inoxidable (SUS304, K=0.45)",
      "aluminum": "Aluminio (6061/5052, K=0.40)",
      "brassCopper": "Latón / Cobre (K=0.42)",
      "custom": "Factor K Personalizado"
    },
    "kFactor": "Factor K (Eje Neutro)",
    "customKFactor": "Factor K Personalizado",
    "unit": "Unidades",
    "unitMetric": "Metric (mm)",
    "unitImperial": "Imperial (in)",
    "thickness": "Espesor de Chapa (T)",
    "insideRadius": "Radio Interior (R)",
    "bendAngle": "Ángulo de Curvatura (θ)",
    "flangeA": "Longitud Pestaña A",
    "flangeB": "Longitud Pestaña B",
    "quantity": "Cantidad",
    "resultsTitle": "Dimensiones Desplegadas",
    "flatLength": "Longitud Plana Desplegada",
    "totalFlatLength": "Longitud Total Lote",
    "bendDeduction": "Deducción de Plegado (BD)",
    "bendAllowance": "Compensación de Plegado (BA)",
    "setback": "Retroceso Exterior (OSSB)",
    "neutralAxis": "Radio Eje Neutro",
    "innerArc": "Arco Interior",
    "outerArc": "Arco Exterior",
    "formulaNote": "Cálculo según normas ISO / DIN para conformado de chapa.",
    "copySummary": "Copiar Resumen",
    "copied": "¡Copiado!",
    "printPdf": "Imprimir / Guardar PDF",
    "sendToLaser": "Enviar medidas a Corte Láser →",
    "laserLinkHint": "Pasa esta longitud plana directamente a la calculadora de corte láser para cotizar al cliente.",
    "diagramTitle": "Previsualización 2D de Sección",
    "neutralAxisLegend": "La línea discontinua roja indica la fibra neutra",
    "methodologyTitle": "Principios de Plegado de Chapa",
    "methodologyBody": "Al doblar chapa metálica, el exterior se estira y el interior se comprime. La deducción de plegado (BD) compensa este alargamiento para que coincida exactamente con las medidas exteriores deseadas.",
    "faqTitle": "Preguntas Frecuentes",
    "faq": [
      {
        "question": "¿Qué es el Factor K?",
        "answer": "Es la relación entre la profundidad del eje neutro y el espesor de la chapa (t/T)."
      },
      {
        "question": "¿Qué diferencia hay entre BA y BD?",
        "answer": "BA es la longitud del arco neutro; BD es el valor restado a (A + B)."
      },
      {
        "question": "¿Admite ángulos agudos y obtusos?",
        "answer": "Sí, calcula cualquier ángulo desde 1° hasta 179°."
      }
    ]
  },
  "fr": {
    "title": "Calculateur de Pliage de Tôle et Développé (Facteur K, BD, BA) | zaps.work",
    "heading": "Calculateur de Pliage de Tôle",
    "intro": "Calculez la perte au pli (BD), le développé (BA), le retrait (OSSB) et la longueur de flan dépliée pour le pliage et la découpe laser.",
    "description": "Calculateur gratuit de pliage et développé de tôle. Calculez Facteur K, Perte au pli et Longueur dépliée instantanément.",
    "parametersTitle": "Paramètres de Pliage",
    "parametersSubtitle": "Épaisseur, rayon intérieur, angle et longueurs de bord",
    "material": "Matériau",
    "materialOptions": {
      "coldRolledSteel": "Acier Laminé à Froid (K=0.44)",
      "stainlessSteel": "Acier Inoxydable (Inox 304, K=0.45)",
      "aluminum": "Aluminium (6061/5052, K=0.40)",
      "brassCopper": "Laiton / Cuivre (K=0.42)",
      "custom": "Facteur K Personnalisé"
    },
    "kFactor": "Facteur K (Fibre Neutre)",
    "customKFactor": "Facteur K Personnalisé",
    "unit": "Unités",
    "unitMetric": "Metric (mm)",
    "unitImperial": "Imperial (in)",
    "thickness": "Épaisseur de Tôle (T)",
    "insideRadius": "Rayon Intérieur (R)",
    "bendAngle": "Angle de Pliage (θ)",
    "flangeA": "Longueur Bord A",
    "flangeB": "Longueur Bord B",
    "quantity": "Quantité",
    "resultsTitle": "Dimensions Dépliées",
    "flatLength": "Longueur Dépliée (Flan)",
    "totalFlatLength": "Longueur Totale Lot",
    "bendDeduction": "Perte au Pli (BD)",
    "bendAllowance": "Tolérance de Pliage (BA)",
    "setback": "Retrait Extérieur (OSSB)",
    "neutralAxis": "Rayon Fibre Neutre",
    "innerArc": "Arc Intérieur",
    "outerArc": "Arc Extérieur",
    "formulaNote": "Calcul basé sur les formules mécaniques standard ISO / DIN.",
    "copySummary": "Copier le Résumé",
    "copied": "Copié !",
    "printPdf": "Imprimer / Enregistrer PDF",
    "sendToLaser": "Transférer au Devis Découpe Laser →",
    "laserLinkHint": "Injectez directement cette dimension dépliée dans le calculateur de découpe laser.",
    "diagramTitle": "Aperçu 2D de la Section",
    "neutralAxisLegend": "La ligne pointillée rouge indique la fibre neutre sans déformation",
    "methodologyTitle": "Méthode de Calcul du Développé",
    "methodologyBody": "Lors du pliage, la matière extérieure est étirée et la matière intérieure comprimée. La perte au pli compense cet étirement.",
    "faqTitle": "Questions Fréquentes",
    "faq": [
      {
        "question": "Qu'est-ce que le Facteur K ?",
        "answer": "Le facteur K indique la position de la fibre neutre par rapport à l'épaisseur (t/T)."
      },
      {
        "question": "Différence entre BA et BD ?",
        "answer": "BA est l'arc neutre ; BD est la valeur déduite de la somme des cotes extérieures (A + B)."
      },
      {
        "question": "Prend-il en charge les angles aigus et obtus ?",
        "answer": "Oui, de 1° à 179°."
      }
    ]
  },
  "pt-br": {
    "title": "Calculadora de Dobra de Chapa e Comprimento Planificado (Fator K, BD) | zaps.work",
    "heading": "Calculadora de Dobra de Chapa",
    "intro": "Calcule dedução de dobra (BD), compensação (BA), recuo (OSSB) e comprimento desdobrado para corte a laser e prensa dobradeira.",
    "description": "Calculadora gratuita de planificação de dobra de chapa metálica. Calcule Fator K, Dedução e Desenvolvimento de Chapa.",
    "parametersTitle": "Parâmetros de Dobra",
    "parametersSubtitle": "Espessura, raio interno, ângulo e abas",
    "material": "Material",
    "materialOptions": {
      "coldRolledSteel": "Aço Laminado a Frio (K=0.44)",
      "stainlessSteel": "Aço Inoxidável (Inox 304, K=0.45)",
      "aluminum": "Alumínio (6061/5052, K=0.40)",
      "brassCopper": "Latão / Cobre (K=0.42)",
      "custom": "Fator K Personalizado"
    },
    "kFactor": "Fator K (Linha Neutra)",
    "customKFactor": "Fator K Personalizado",
    "unit": "Unidades",
    "unitMetric": "Metric (mm)",
    "unitImperial": "Imperial (in)",
    "thickness": "Espessura da Chapa (T)",
    "insideRadius": "Raio Interno (R)",
    "bendAngle": "Ângulo de Dobra (θ)",
    "flangeA": "Comprimento Aba A",
    "flangeB": "Comprimento Aba B",
    "quantity": "Quantidade",
    "resultsTitle": "Dimensões Planificadas",
    "flatLength": "Comprimento Planificado (Blank)",
    "totalFlatLength": "Comprimento Total do Lote",
    "bendDeduction": "Dedução de Dobra (BD)",
    "bendAllowance": "Compensação de Dobra (BA)",
    "setback": "Recuo Externo (OSSB)",
    "neutralAxis": "Raio da Linha Neutra",
    "innerArc": "Arco Interno",
    "outerArc": "Arco Externo",
    "formulaNote": "Cálculo baseado em normas ISO / DIN para conformação mecânica.",
    "copySummary": "Copiar Resumo",
    "copied": "Copiado!",
    "printPdf": "Imprimir / Salvar PDF",
    "sendToLaser": "Enviar para Orçamento Laser →",
    "laserLinkHint": "Leve esse comprimento planificado direto para a calculadora de corte a laser.",
    "diagramTitle": "Pré-visualização 2D da Seção",
    "neutralAxisLegend": "A linha tracejada vermelha representa a linha neutra",
    "methodologyTitle": "Como Funciona a Dedução de Dobra",
    "methodologyBody": "Ao dobrar a chapa, a superfície externa se estica e a interna se comprime. A dedução de dobra subtrai essa deformação para garantir medidas exatas.",
    "faqTitle": "Perguntas Frequentes",
    "faq": [
      {
        "question": "O que é o Fator K?",
        "answer": "É a razão entre a distância da linha neutra e a espessura da chapa (t/T)."
      },
      {
        "question": "Diferença entre BA e BD?",
        "answer": "BA é o arco da linha neutra; BD é o valor subtraído de (A + B)."
      },
      {
        "question": "Calcula ângulos agudos e obtusos?",
        "answer": "Sim, de 1° a 179°."
      }
    ]
  },
  "ko": {
    "title": "판금 절곡 전개장 계산기 (K-Factor, 절곡 연신율, BD) | zaps.work",
    "heading": "판금 절곡 전개장 계산기",
    "intro": "절곡 공제량 (BD), 벤드 얼로언스 (BA), 세트백 (OSSB) 및 전개 판재 길이를 정밀 계산하여 레이저 가공과 절곡 작업을 지원합니다.",
    "description": "무료 온라인 판금 절곡 계산기. K-Factor, 절곡 공제치 및 평판 전개 치수를 즉시 산출합니다.",
    "parametersTitle": "절곡 파라미터",
    "parametersSubtitle": "판재 두께, 내부 R, 절곡 각도 및 플랜지 길이 입력",
    "material": "판재 재질",
    "materialOptions": {
      "coldRolledSteel": "냉간압연강판 (CR / SPCC, K=0.44)",
      "stainlessSteel": "스테인리스 (SUS304, K=0.45)",
      "aluminum": "알루미늄 (AL6061/5052, K=0.40)",
      "brassCopper": "황동 / 동 (K=0.42)",
      "custom": "사용자 지정 K계수"
    },
    "kFactor": "K-Factor (중립축 비율)",
    "customKFactor": "사용자 정의 K계수",
    "unit": "단위계",
    "unitMetric": "Metric (mm)",
    "unitImperial": "Imperial (in)",
    "thickness": "판재 두께 (T)",
    "insideRadius": "내측 벤딩 반경 (R)",
    "bendAngle": "절곡 각도 (θ)",
    "flangeA": "플랜지 A 길이",
    "flangeB": "플랜지 B 길이",
    "quantity": "수량",
    "resultsTitle": "전개 가공 치수",
    "flatLength": "단품 전개 판재 길이",
    "totalFlatLength": "배치 총 전개 길이",
    "bendDeduction": "절곡 공제량 (BD)",
    "bendAllowance": "벤드 얼로언스 (BA)",
    "setback": "외측 세트백 (OSSB)",
    "neutralAxis": "중립면 반경",
    "innerArc": "내측 호 길이",
    "outerArc": "외측 호 길이",
    "formulaNote": "ISO / DIN 표준 판금 소성 가공 역학 공식 적용.",
    "copySummary": "결과 복사",
    "copied": "복사 완료!",
    "printPdf": "인쇄 / PDF 저장",
    "sendToLaser": "레이저 절단 견적으로 전송 →",
    "laserLinkHint": "이 전개 치수를 레이저 가공 계산기로 바로 전송하여 견적을 산출하세요.",
    "diagramTitle": "2D 절곡 단면 실시간 뷰",
    "neutralAxisLegend": "빨간 점선은 인장/압축이 없는 중립축을 나타냅니다",
    "methodologyTitle": "판금 절곡 전개 계산 원리",
    "methodologyBody": "판금을 절곡할 때 외측은 인장되어 늘어나고 내측은 압축됩니다. 절곡 공제치(BD)를 차감하여 정확한 전개 블랭크를 산출합니다.",
    "faqTitle": "자주 묻는 질문",
    "faq": [
      {
        "question": "K-Factor란?",
        "answer": "판 두께 대비 중립축 깊이의 비율(t/T)입니다."
      },
      {
        "question": "BA와 BD의 차이는?",
        "answer": "BA는 중립축의 벤딩 호 길이이며, BD는 외경 합에서 빼는 공제치입니다."
      },
      {
        "question": "다양한 절곡 각도를 지원하나요?",
        "answer": "1°부터 179°까지 모든 각도를 지원합니다."
      }
    ]
  },
  "it": {
    "title": "Calcolatore Sviluppo Lamiera e Piegatura (Fattore K, BD, BA) | zaps.work",
    "heading": "Calcolatore Piegatura e Sviluppo Lamiera",
    "intro": "Calcola deduzione di piega (BD), compenso (BA), arretramento (OSSB) e sviluppo piatto per presse piegatrici e taglio laser.",
    "description": "Calcolatore online gratuito per piegatura lamiera. Calcola Fattore K, Deduzione di piega e Sviluppo piano.",
    "parametersTitle": "Parametri di Piegatura",
    "parametersSubtitle": "Spessore, raggio interno, angolo e lunghezze ali",
    "material": "Materiale",
    "materialOptions": {
      "coldRolledSteel": "Acciaio Laminato a Freddo (K=0.44)",
      "stainlessSteel": "Acciaio Inox (AISI 304, K=0.45)",
      "aluminum": "Alluminio (6061/5052, K=0.40)",
      "brassCopper": "Ottone / Rame (K=0.42)",
      "custom": "Fattore K Personalizzato"
    },
    "kFactor": "Fattore K (Asse Neutro)",
    "customKFactor": "Fattore K Personalizzato",
    "unit": "Sistema Unità",
    "unitMetric": "Metric (mm)",
    "unitImperial": "Imperial (in)",
    "thickness": "Spessore Lamiera (T)",
    "insideRadius": "Raggio Interno (R)",
    "bendAngle": "Angolo di Piega (θ)",
    "flangeA": "Lunghezza Ala A",
    "flangeB": "Lunghezza Ala B",
    "quantity": "Quantità Pezzi",
    "resultsTitle": "Dimensioni Sviluppo Piano",
    "flatLength": "Lunghezza Sviluppata (Piatto)",
    "totalFlatLength": "Lunghezza Totale Lotto",
    "bendDeduction": "Deduzione di Piega (BD)",
    "bendAllowance": "Compenso di Piega (BA)",
    "setback": "Arretramento Esterno (OSSB)",
    "neutralAxis": "Raggio Asse Neutro",
    "innerArc": "Arco Interno",
    "outerArc": "Arco Esterno",
    "formulaNote": "Calcolo basato su standard ISO / DIN per la deformazione della lamiera.",
    "copySummary": "Copia Riepilogo",
    "copied": "Copiato!",
    "printPdf": "Stampa / Salva PDF",
    "sendToLaser": "Invia a Preventivo Taglio Laser →",
    "laserLinkHint": "Porta queste dimensioni di taglio piatto direttamente nel calcolatore taglio laser.",
    "diagramTitle": "Anteprima Sezione 2D Dinamica",
    "neutralAxisLegend": "La linea tratteggiata rossa indica l'asse neutro privo di deformazione",
    "methodologyTitle": "Come Funziona la Deduzione di Piegatura",
    "methodologyBody": "Quando la lamiera viene piegata, le fibre esterne si allungano e quelle interne si comprimono. La deduzione di piega (BD) sottrae questo allungamento per garantire quote perfette.",
    "faqTitle": "Domande Frequenti",
    "faq": [
      {
        "question": "Cos'è il Fattore K?",
        "answer": "È il rapporto tra la posizione dell'asse neutro e lo spessore della lamiera (t/T)."
      },
      {
        "question": "Differenza tra BA e BD?",
        "answer": "BA è la lunghezza dell'arco neutro; BD è la quota sottratta alla somma delle ali (A + B)."
      },
      {
        "question": "Supporta angoli acuti e ottusi?",
        "answer": "Sì, da 1° a 179°."
      }
    ]
  },
  "nl": {
    "title": "Plaatwerk Buigcalculator & Uitslag (K-Factor, BD, BA) | zaps.work",
    "heading": "Plaatwerk Buigcalculator & Uitslag",
    "intro": "Bereken buigverkorting (BD), buigtoeslag (BA), setback (OSSB) en gestrekte uitslaglengte voor kantpers en lasersnijden.",
    "description": "Gratis online plaatwerk buigcalculator. Bereken K-factor, buigverkorting en uitslaglengte voor kantbanken.",
    "parametersTitle": "Buigparameters",
    "parametersSubtitle": "Plaatdikte, binnenradius, buighoek en beenlengtes",
    "material": "Plaatmateriaal",
    "materialOptions": {
      "coldRolledSteel": "Koudgewalst Staal (K=0.44)",
      "stainlessSteel": "RVS (AISI 304, K=0.45)",
      "aluminum": "Aluminium (6061/5052, K=0.40)",
      "brassCopper": "Messing / Koper (K=0.42)",
      "custom": "Aangepaste K-factor"
    },
    "kFactor": "K-Factor (Neutrale Lijn)",
    "customKFactor": "Aangepaste K-factor",
    "unit": "Eenheden",
    "unitMetric": "Metric (mm)",
    "unitImperial": "Imperial (in)",
    "thickness": "Plaatdikte (T)",
    "insideRadius": "Binnenradius (R)",
    "bendAngle": "Buighoek (θ)",
    "flangeA": "Beenlengte A",
    "flangeB": "Beenlengte B",
    "quantity": "Aantal",
    "resultsTitle": "Uitslag Afmetingen",
    "flatLength": "Gestrekte Uitslaglengte",
    "totalFlatLength": "Totale Serie Lengte",
    "bendDeduction": "Buigverkorting (BD)",
    "bendAllowance": "Buigtoeslag (BA)",
    "setback": "Buitenwaartse Setback (OSSB)",
    "neutralAxis": "Straal Neutrale Lijn",
    "innerArc": "Binnenbooglengte",
    "outerArc": "Buitenbooglengte",
    "formulaNote": "Gebaseerd op ISO / DIN-normen voor plaatvervorming.",
    "copySummary": "Samenvatting Kopiëren",
    "copied": "Gekopieerd!",
    "printPdf": "Afdrukken / PDF Opslaan",
    "sendToLaser": "Naar Lasersnij-offerte Sturen →",
    "laserLinkHint": "Gebruik deze uitslagmaat direct in de lasersnijcalculator voor een snelle offerte.",
    "diagramTitle": "2D Doorsnede Live-weergave",
    "neutralAxisLegend": "De rode stippellijn geeft de spanningsvrije neutrale lijn aan",
    "methodologyTitle": "Principe van Buigverkorting",
    "methodologyBody": "Bij het buigen rekt de buitenzijde en krimpt de binnenzijde. De buigverkorting corrigeert voor deze rek.",
    "faqTitle": "Veelgestelde Vragen",
    "faq": [
      {
        "question": "Wat is de K-factor?",
        "answer": "De verhouding van de neutrale lijn ten opzichte van de plaatdikte (t/T)."
      },
      {
        "question": "Verschil tussen BA en BD?",
        "answer": "BA is de booglengte van de neutrale lijn; BD wordt afgetrokken van (A + B)."
      },
      {
        "question": "Worden alle hoeken ondersteund?",
        "answer": "Ja, van 1° tot 179°."
      }
    ]
  },
  "pl": {
    "title": "Kalkulator Gięcia Blach i Rozwinięcia (Współczynnik K, BD, BA) | zaps.work",
    "heading": "Kalkulator Gięcia Blach i Rozwinięcia",
    "intro": "Precyzyjne obliczanie ubytku na gięcie (BD), naddatku (BA), odsunięcia (OSSB) i długości rozwinięcia formatki dla pras krawędziowych i cięcia laserowego.",
    "description": "Darmowy kalkulator gięcia blachy online. Oblicz współczynnik K, ubytek na gięcie i wymiar rozwinięcia.",
    "parametersTitle": "Parametry Gięcia",
    "parametersSubtitle": "Wprowadź grubość, promień wewnętrzny, kąt i długości półek",
    "material": "Gatunek Materiału",
    "materialOptions": {
      "coldRolledSteel": "Stal Zimnowalcowana (K=0.44)",
      "stainlessSteel": "Stal Nierdzewna (1.4301, K=0.45)",
      "aluminum": "Aluminium (6061/5052, K=0.40)",
      "brassCopper": "Mosiądz / Miedź (K=0.42)",
      "custom": "Własny Współczynnik K"
    },
    "kFactor": "Współczynnik K (Oś Obojętna)",
    "customKFactor": "Własny Współczynnik K",
    "unit": "Układ Jednostek",
    "unitMetric": "Metric (mm)",
    "unitImperial": "Imperial (in)",
    "thickness": "Grubość Blachy (T)",
    "insideRadius": "Promień Wewnętrzny (R)",
    "bendAngle": "Kąt Gięcia (θ)",
    "flangeA": "Długość Półki A",
    "flangeB": "Długość Półki B",
    "quantity": "Ilość Sztuk",
    "resultsTitle": "Wymiary Rozwinięcia",
    "flatLength": "Długość Rozwinięcia Formatki",
    "totalFlatLength": "Łączna Długość Partii",
    "bendDeduction": "Ubytek na Gięcie (BD)",
    "bendAllowance": "Naddatek na Gięcie (BA)",
    "setback": "Odsunięcie Zewnętrzne (OSSB)",
    "neutralAxis": "Promień Osi Obojętnej",
    "innerArc": "Długość Łuku Wewnętrznego",
    "outerArc": "Długość Łuku Zewnętrznego",
    "formulaNote": "Obliczenia zgodne z normami ISO / DIN dla gięcia swobodnego.",
    "copySummary": "Kopiuj Podsumowanie",
    "copied": "Skopiowano!",
    "printPdf": "Drukuj / Zapisz PDF",
    "sendToLaser": "Przenieś do Wyceny Cięcia Laserem →",
    "laserLinkHint": "Przenieś ten wymiar formatki bezpośrednio do kalkulatora cięcia laserowego.",
    "diagramTitle": "Podgląd Przekroju 2D",
    "neutralAxisLegend": "Czerwona linia przerywana oznacza oś obojętną bez odkształceń",
    "methodologyTitle": "Zasada Obliczania Rozwinięcia Gięcia",
    "methodologyBody": "Podczas gięcia zewnętrzna warstwa blachy ulega rozciąganiu, a wewnętrzna ściskaniu. Ubytek na gięcie (BD) kompensuje to wydłużenie.",
    "faqTitle": "Najczęściej Zadawane Pytania",
    "faq": [
      {
        "question": "Czym jest współczynnik K?",
        "answer": "To stosunek położenia osi obojętnej do grubości blachy (t/T)."
      },
      {
        "question": "Czym różni się BA od BD?",
        "answer": "BA to długość łuku osi obojętnej; BD to wartość odejmowana od sumy wymiarów zewnętrznych."
      },
      {
        "question": "Czy obsługuje kąty ostre i rozwarte?",
        "answer": "Tak, od 1° do 179°."
      }
    ]
  }
};

const copies: Record<Locale, SheetMetalBendCopy> = withSimplifiedChinese(baseCopies);

export function getSheetMetalBendCopy(locale: Locale): SheetMetalBendCopy {
  return copies[locale];
}
