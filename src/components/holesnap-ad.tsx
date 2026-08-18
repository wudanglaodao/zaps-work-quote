import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

const HOLESNAP_TOOLS_URL = "https://www.holesnap.com/products/mesh";

const copy: Record<Locale, { kicker: string; title: string; body: string; cta: string }> = {
  en: {
    kicker: "Featured tool",
    title: "Create cleaner hole patterns before you price the job.",
    body: "HoleSnap Mesh lets you tune shape, spacing, and layout, then export CAD-ready files for the next fabrication step.",
    cta: "Explore HoleSnap",
  },
  "zh-hant": {
    kicker: "推薦工具",
    title: "先做好孔陣列，再開始報價。",
    body: "用 HoleSnap Mesh 調整孔形、間距與排列，並匯出可交給 CAD/CAM 的檔案。",
    cta: "探索 HoleSnap",
  },
  "zh-hans": {
    kicker: "推荐工具",
    title: "先把孔阵列做清楚，再开始报价。",
    body: "用 HoleSnap Mesh 调整孔形、间距与排列，并导出可交给 CAD/CAM 的文件。",
    cta: "探索 HoleSnap",
  },
  de: {
    kicker: "Empfohlenes Tool",
    title: "Saubere Lochmuster erstellen, bevor du den Auftrag kalkulierst.",
    body: "Mit HoleSnap Mesh steuerst du Form, Abstand und Layout und exportierst CAD-fertige Dateien.",
    cta: "HoleSnap öffnen",
  },
  ja: {
    kicker: "おすすめツール",
    title: "見積もりの前に、きれいな穴パターンを作成。",
    body: "HoleSnap Mesh で形状・間隔・レイアウトを調整し、CAD/CAM 用に書き出せます。",
    cta: "HoleSnap を見る",
  },
  es: {
    kicker: "Herramienta recomendada",
    title: "Crea patrones de agujeros limpios antes de calcular el trabajo.",
    body: "HoleSnap Mesh te permite ajustar forma, espaciado y diseño, y exportar archivos para CAD/CAM.",
    cta: "Explorar HoleSnap",
  },
  fr: {
    kicker: "Outil recommandé",
    title: "Créez des motifs de trous propres avant de chiffrer le projet.",
    body: "HoleSnap Mesh permet d’ajuster la forme, l’espacement et la disposition, puis d’exporter pour la CAO/FAO.",
    cta: "Découvrir HoleSnap",
  },
  "pt-br": {
    kicker: "Ferramenta recomendada",
    title: "Crie padrões de furos limpos antes de precificar o trabalho.",
    body: "O HoleSnap Mesh permite ajustar forma, espaçamento e layout e exportar arquivos para CAD/CAM.",
    cta: "Explorar HoleSnap",
  },
  ko: {
    kicker: "추천 도구",
    title: "견적 전에 깔끔한 홀 패턴을 만들어 보세요.",
    body: "HoleSnap Mesh로 홀 모양, 간격, 배치를 조정하고 CAD/CAM용 파일로 내보낼 수 있습니다.",
    cta: "HoleSnap 둘러보기",
  },
  it: {
    kicker: "Strumento consigliato",
    title: "Crea pattern di foratura perfetti prima di calcolare il preventivo.",
    body: "HoleSnap Mesh ti permette di regolare forma, passo e disposizione, esportando file pronti per CAD/CAM.",
    cta: "Scopri HoleSnap",
  },
  nl: {
    kicker: "Aanbevolen tool",
    title: "Ontwerp strakke gatenpatronen voordat je de offerte opstelt.",
    body: "Met HoleSnap Mesh pas je vorm, afstand en lay-out aan en exporteer je bestanden direct voor CAD/CAM.",
    cta: "Ontdek HoleSnap",
  },
  pl: {
    kicker: "Polecane narzędzie",
    title: "Stwórz precyzyjny układ otworów przed wykonaniem wyceny.",
    body: "HoleSnap Mesh pozwala dostosować kształt, rozstaw i układ oraz wyeksportować pliki gotowe do CAD/CAM.",
    cta: "Poznaj HoleSnap",
  },
};

export function HoleSnapAd({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <aside className="holesnap-ad" aria-label={`HoleSnap ${text.kicker}`}>
      <div className="holesnap-ad-visual"><Image src="/assets/holesnap-ventilation-grille.png" alt="Example perforated ventilation grille" width={640} height={480} sizes="(max-width: 680px) 100vw, 220px" /></div>
      <div className="holesnap-ad-copy">
        <p className="holesnap-ad-kicker">{text.kicker} · HoleSnap</p>
        <h2>{text.title}</h2>
        <p>{text.body}</p>
      </div>
      <a className="holesnap-ad-link" href={HOLESNAP_TOOLS_URL} target="_blank" rel="sponsored noopener noreferrer">
        {text.cta}<span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
