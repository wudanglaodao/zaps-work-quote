import type { Locale } from "@/lib/i18n/config";

const labels: Record<Locale, { printOrSavePdf: string; viewQuote: string }> = {
  en: { printOrSavePdf: "Print / save PDF", viewQuote: "View quote" },
  "zh-hant": { printOrSavePdf: "列印／儲存 PDF", viewQuote: "查看報價" },
  de: { printOrSavePdf: "Drucken / als PDF speichern", viewQuote: "Angebot ansehen" },
  ja: { printOrSavePdf: "印刷／PDFで保存", viewQuote: "見積額を見る" },
  es: { printOrSavePdf: "Imprimir / guardar PDF", viewQuote: "Ver presupuesto" },
  fr: { printOrSavePdf: "Imprimer / enregistrer en PDF", viewQuote: "Voir le devis" },
  "pt-br": { printOrSavePdf: "Imprimir / salvar PDF", viewQuote: "Ver orçamento" },
  ko: { printOrSavePdf: "인쇄 / PDF로 저장", viewQuote: "견적 보기" },
};

export function getQuoteActionLabels(locale: Locale) {
  return labels[locale];
}
