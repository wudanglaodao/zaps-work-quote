"use client";

import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Copy, Download, FileSpreadsheet, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePreferences } from "@/components/preferences-provider";
import { trackToolEvent } from "@/lib/analytics/client";
import { calculateThreeDPrintQuote, clampNumericInput, createDefaultItem, createDefaultQuoteInput, type PrintItemInput, type QuoteInput } from "@/lib/calculators/three-d-print";
import { BasicQuoteDocument, type BasicQuoteDetails, type BasicQuoteLabels, type BasicQuoteLine } from "@/components/quote-templates/basic-quote-document";
import { currencySymbols } from "@/lib/currency";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { createBasicQuoteCsv } from "@/lib/quotes/basic-csv";

type QuoteDetails = {
  companyName: string;
  companyDetails: string;
  customerName: string;
  customerDetails: string;
  quoteNumber: string;
  validDays: string;
  scope: string;
  assumptions: string;
  terms: string;
};

function localIsoDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function Field({ label, value, onChange, suffix, min = 0, max = Number.MAX_SAFE_INTEGER, step = "any", stepperStep }: { label: string; value: number; onChange: (value: number) => void; suffix?: string; min?: number; max?: number; step?: number | "any"; stepperStep?: number }) {
  const stepValue = stepperStep ?? (typeof step === "number" ? step : 1);
  const controlClass = `field-control number-control${suffix ? " has-suffix" : ""}${suffix && suffix.length >= 5 ? " wide-suffix" : ""}`;
  const changeBy = (delta: number) => {
    const current = Number.isFinite(value) ? value : min;
    onChange(clampNumericInput(Number((current + delta).toFixed(6)), min, max));
  };
  return <label className="field"><span>{label}</span><span className={controlClass}><input type="number" min={min} max={max} step={step} value={value} onChange={(event) => onChange(clampNumericInput(event.target.value, min, max))} /><span className="number-stepper" aria-label={`${label} stepper`}><button type="button" aria-label={`Increase ${label}`} onClick={(event) => { event.preventDefault(); event.stopPropagation(); changeBy(stepValue); }}><ChevronUp aria-hidden="true" /></button><button type="button" aria-label={`Decrease ${label}`} onClick={(event) => { event.preventDefault(); event.stopPropagation(); changeBy(-stepValue); }}><ChevronDown aria-hidden="true" /></button></span>{suffix ? <i>{suffix}</i> : null}</span></label>;
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="field"><span>{label}</span><span className="field-control"><input type="text" maxLength={160} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></span></label>;
}

function TextAreaField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="field"><span>{label}</span><span className="field-control"><textarea maxLength={1000} rows={3} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></span></label>;
}

function TimeField({
  label,
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
  hoursLabel,
  minutesLabel,
}: {
  label: string;
  hours: number;
  minutes: number;
  onHoursChange: (value: number) => void;
  onMinutesChange: (value: number) => void;
  hoursLabel: string;
  minutesLabel: string;
}) {
  function numericValue(value: string, max?: number) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return 0;
    const normalized = Math.max(0, Math.floor(parsed));
    return max === undefined ? normalized : Math.min(max, normalized);
  }

  return <div className="field split-field">
    <span>{label}</span>
    <span className="split-controls">
      <span className="time-control"><input className="time-input" aria-label={hoursLabel} inputMode="numeric" min="0" max="100000" step="1" type="number" value={Number.isFinite(hours) ? hours : 0} onChange={(event) => onHoursChange(Math.min(100000, numericValue(event.target.value)))} /><span className="time-unit" aria-hidden="true">h</span></span>
      <span className="time-control"><input className="time-input" aria-label={minutesLabel} inputMode="numeric" min="0" max="59" step="1" type="number" value={Number.isFinite(minutes) ? minutes : 0} onChange={(event) => onMinutesChange(numericValue(event.target.value, 59))} /><span className="time-unit" aria-hidden="true">m</span></span>
    </span>
  </div>;
}

function QuoteDocument({
  locale,
  dictionary,
  details,
  detailsEnabled,
  input,
  result,
  money,
  className = "",
}: {
  locale: Locale;
  dictionary: Dictionary;
  details: QuoteDetails;
  detailsEnabled: boolean;
  input: QuoteInput;
  result: ReturnType<typeof calculateThreeDPrintQuote>;
  money: (value: number) => string;
  className?: string;
}) {
  const t = dictionary.calculator;
  const validity = detailsEnabled && Number(details.validDays) > 0 ? t.validFor.replace("{days}", String(Math.round(Number(details.validDays)))) : "";
  const projectLabels = ({ en: "print items", "zh-hant": "個列印項目", de: "Druckpositionen", ja: "件の印刷項目", es: "elementos de impresión", fr: "éléments imprimés", "pt-br": "itens de impressão", ko: "개 인쇄 항목" } as const);
  const project = input.items.length === 1 ? input.items[0].name : `${input.items.length} ${projectLabels[locale]}`;
  const labels: BasicQuoteLabels = { quote: t.quote, date: t.date, preparedFor: t.preparedFor, project: t.project, description: t.description, qty: t.qty, unitPrice: t.unitPrice, amount: t.amount, subtotal: t.subtotal, tax: t.tax, total: t.total };
  const basicDetails: BasicQuoteDetails = { companyName: details.companyName, companyDetails: details.companyDetails, customerName: details.customerName, customerDetails: details.customerDetails, quoteNumber: details.quoteNumber, validity };
  const noteLabels = ({ en: ["Scope", "Assumptions", "Terms"], "zh-hant": ["工作範圍", "假設", "條款"], de: ["Leistungsumfang", "Annahmen", "Bedingungen"], ja: ["作業範囲", "前提条件", "条件"], es: ["Alcance", "Supuestos", "Condiciones"], fr: ["Périmètre", "Hypothèses", "Conditions"], "pt-br": ["Escopo", "Premissas", "Termos"], ko: ["작업 범위", "가정", "조건"] } as const)[locale];
  const notes = detailsEnabled ? [details.scope, details.assumptions, details.terms].map((value, index) => ({ label: noteLabels[index], value })).filter((note) => note.value.trim()) : [];
  const lines: BasicQuoteLine[] = result.itemResults.map((item) => ({ id: item.id, description: item.name, detail: item.material, quantity: item.quantity, unitPrice: money(item.quoteAmount / Math.max(1, item.quantity)), amount: money(item.quoteAmount) }));
  if (result.allocatedShipping > 0) lines.push({ id: "shipping", description: t.shipping, amount: money(result.allocatedShipping) });
  return <BasicQuoteDocument labels={labels} details={basicDetails} detailsEnabled={detailsEnabled} project={project} dateText={new Intl.DateTimeFormat(({ en: "en-US", "zh-hant": "zh-TW", de: "de-DE", ja: "ja-JP", es: "es-ES", fr: "fr-FR", "pt-br": "pt-BR", ko: "ko-KR" } as const)[locale], { dateStyle: "medium" }).format(new Date())} lines={lines} subtotal={money(result.subtotal)} tax={result.tax > 0 ? money(result.tax) : undefined} total={money(result.total)} notes={notes} className={className} />;
}

export function ThreeDPrintCalculator({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const t = dictionary.calculator;
  const { currency } = usePreferences();
  const [input, setInput] = useState<QuoteInput>(() => createDefaultQuoteInput());
  const [activeItemId, setActiveItemId] = useState("item-1");
  const [detailsEnabled, setDetailsEnabled] = useState(false);
  const [details, setDetails] = useState<QuoteDetails>({ companyName: "Northline Studio", companyDetails: "", customerName: "", customerDetails: "", quoteNumber: "", validDays: "", scope: "", assumptions: "", terms: "" });
  const [printing, setPrinting] = useState(false);
  const [toast, setToast] = useState("");
  const result = useMemo(() => calculateThreeDPrintQuote(input), [input]);
  const activeItem = input.items.find((item) => item.id === activeItemId) || input.items[0];
  const localeCode = ({ en: "en-US", "zh-hant": "zh-TW", de: "de-DE", ja: "ja-JP", es: "es-ES", fr: "fr-FR", "pt-br": "pt-BR", ko: "ko-KR" } as const)[locale];
  const money = (value: number) => `${currencySymbols[currency]}${new Intl.NumberFormat(localeCode, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;
  const symbol = currencySymbols[currency];

  useEffect(() => {
    const finish = () => setPrinting(false);
    window.addEventListener("afterprint", finish);
    return () => window.removeEventListener("afterprint", finish);
  }, []);

  function updateItem(patch: Partial<PrintItemInput>) {
    setInput((current) => ({ ...current, items: current.items.map((item) => item.id === activeItem.id ? { ...item, ...patch } : item) }));
  }

  function updateInput<K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function metrics() {
    return { itemCount: input.items.length, totalCost: result.totalCost, quoteTotal: result.total, margin: result.margin };
  }

  function quoteSnapshot() {
    return {
      kind: "3d-print" as const,
      inputs: {
        items: input.items.map((item) => ({
          material: item.material,
          quantity: item.quantity,
          filamentGrams: item.filamentGrams,
          printHours: item.printHours,
          printMinutes: item.printMinutes,
          spoolPrice: item.spoolPrice,
          spoolWeightGrams: item.spoolWeightGrams,
          preparationMinutes: item.preparationMinutes,
          postProcessingMinutes: item.postProcessingMinutes,
          packagingCost: item.packagingCost,
        })),
        machineRate: input.machineRate,
        laborRate: input.laborRate,
        failureRate: input.failureRate,
        wasteRate: input.wasteRate,
        powerDrawWatts: input.powerDrawWatts,
        electricityRate: input.electricityRate,
        targetMargin: input.targetMargin,
        minimumFee: input.minimumFee,
        shippingCost: input.shippingCost,
        taxRate: input.taxRate,
      },
      outputs: {
        items: result.itemResults.map((item) => ({
          materialCost: item.materialCost,
          machineCost: item.machine,
          electricityCost: item.electricity,
          laborCost: item.labor,
          failureRiskCost: item.failureRisk,
          totalCost: item.totalCost,
          quoteAmount: item.quoteAmount,
        })),
        totalCost: result.totalCost,
        subtotal: result.subtotal,
        tax: result.tax,
        total: result.total,
        profit: result.profit,
        margin: result.margin,
      },
    };
  }

  function exportPdf() {
    trackToolEvent({ eventType: "pdf_exported", toolSlug: "3d-print-cost-calculator", locale, currency, metrics: metrics(), quoteSnapshot: quoteSnapshot() });
    setPrinting(true);
    window.setTimeout(() => window.print(), 60);
  }

  function exportCsv() {
    const date = localIsoDate();
    const quoteNumber = detailsEnabled ? details.quoteNumber.trim() : "";
    const shared = [details.companyName, detailsEnabled ? details.companyDetails : "", quoteNumber, date, detailsEnabled ? details.customerName : "", detailsEnabled ? details.customerDetails : "", input.items.length === 1 ? input.items[0].name : `${input.items.length} items`];
    const rows: unknown[][] = [[t.companyName, t.companyDetails, t.quoteNumber, t.date, t.customerName, t.customerDetails, t.project, t.description, t.material, t.qty, t.unitPrice, t.amount, dictionary.common.currency]];
    for (const item of result.itemResults) rows.push([...shared, item.name, item.material, item.quantity, (item.quoteAmount / Math.max(1, item.quantity)).toFixed(2), item.quoteAmount.toFixed(2), currency]);
    if (result.allocatedShipping > 0) rows.push([...shared, t.shipping, "", "", "", result.allocatedShipping.toFixed(2), currency]);
    const summaryRows: unknown[][] = [];
    const summary = (label: string, amount: number) => summaryRows.push(["", "", "", "", "", "", "", label, "", "", "", amount.toFixed(2), currency]);
    summary(t.subtotal, result.subtotal);
    if (result.tax > 0) summary(t.tax, result.tax);
    summary(t.total, result.total);
    const csv = createBasicQuoteCsv({ headers: rows[0], rows: rows.slice(1), summaryRows });
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(quoteNumber || `3d-print-quote-${date}`).replace(/[\\/:*?"<>|]/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    trackToolEvent({ eventType: "csv_exported", toolSlug: "3d-print-cost-calculator", locale, currency, metrics: metrics(), quoteSnapshot: quoteSnapshot() });
    setToast(t.csvExported);
  }

  async function copySummary() {
    const text = `${t.totalCost}: ${money(result.totalCost)}\n${t.targetQuote}: ${money(result.total)}\n${t.profit}: ${money(result.profit)}\n${t.margin}: ${(result.margin * 100).toFixed(1)}%`;
    await navigator.clipboard.writeText(text);
    trackToolEvent({ eventType: "summary_copied", toolSlug: "3d-print-cost-calculator", locale, currency, metrics: metrics() });
    setToast(t.copied);
  }

  const deleteItemLabels = ({ en: "Delete item", "zh-hant": "刪除項目", de: "Position löschen", ja: "項目を削除", es: "Eliminar artículo", fr: "Supprimer l’article", "pt-br": "Excluir item", ko: "항목 삭제" } as const)[locale];
  const batchLabels = ({ en: { filament: "Batch filament from slicer", time: "Batch print time", hint: "Enter slicer totals for the complete batch. Quantity is used only for the customer-facing unit price.", scope: "Scope", assumptions: "Assumptions", terms: "Terms" }, "zh-hant": { filament: "切片軟體整批耗材", time: "整批列印時間", hint: "請輸入切片軟體顯示的整批總量。數量僅用於客戶報價的單價。", scope: "工作範圍", assumptions: "假設", terms: "條款" }, de: { filament: "Filament für den gesamten Auftrag", time: "Druckzeit für den gesamten Auftrag", hint: "Slicer-Gesamtwerte für den vollständigen Auftrag eingeben. Die Menge dient nur dem Stückpreis im Angebot.", scope: "Leistungsumfang", assumptions: "Annahmen", terms: "Bedingungen" }, ja: { filament: "スライサーのバッチ材料量", time: "バッチ印刷時間", hint: "バッチ全体のスライサー合計値を入力してください。数量は顧客向け単価の算出にのみ使用します。", scope: "作業範囲", assumptions: "前提条件", terms: "条件" }, es: { filament: "Filamento del lote según el laminador", time: "Tiempo de impresión del lote", hint: "Introduzca los totales del laminador para el lote completo. La cantidad solo calcula el precio unitario.", scope: "Alcance", assumptions: "Supuestos", terms: "Condiciones" }, fr: { filament: "Filament du lot selon le slicer", time: "Temps d’impression du lot", hint: "Saisissez les totaux du slicer pour le lot complet. La quantité sert uniquement au prix unitaire client.", scope: "Périmètre", assumptions: "Hypothèses", terms: "Conditions" }, "pt-br": { filament: "Filamento do lote no fatiador", time: "Tempo de impressão do lote", hint: "Informe os totais do fatiador para o lote completo. A quantidade serve apenas para o preço unitário ao cliente.", scope: "Escopo", assumptions: "Premissas", terms: "Termos" }, ko: { filament: "슬라이서의 배치 필라멘트", time: "배치 출력 시간", hint: "전체 배치에 대한 슬라이서 합계를 입력하세요. 수량은 고객용 단가 계산에만 사용됩니다.", scope: "작업 범위", assumptions: "가정", terms: "조건" } } as const)[locale];

  return <section className="calculator-section" id="calculator">
    <div className="shell calculator-grid">
      <form className="calculator-panel" onSubmit={(event) => event.preventDefault()}>
        <header className="panel-heading"><p>{t.input}</p><h2>{t.jobDetails}</h2></header>
        <div className="form-section"><div className="form-title"><h3><b>01</b>{t.printItems}</h3><span>{input.items.length}</span></div><div className="item-tabs">{input.items.map((item, index) => <div className="item-tab-row" key={item.id}><button type="button" className={item.id === activeItem.id ? "item-tab active" : "item-tab"} onClick={() => setActiveItemId(item.id)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong></button>{input.items.length > 1 ? <button className="item-tab-delete" type="button" aria-label={`${deleteItemLabels}: ${item.name}`} onClick={() => { const next = input.items.filter((candidate) => candidate.id !== item.id); setInput({ ...input, items: next }); setActiveItemId(next[0].id); }}><Trash2 aria-hidden="true" /></button> : null}</div>)}</div><button className="button dashed" type="button" disabled={input.items.length >= 10} onClick={() => { const next = createDefaultItem(input.items.length + 1); setInput({ ...input, items: [...input.items, next] }); setActiveItemId(next.id); }}><Plus aria-hidden="true" />{t.addItem}</button>
          <p className="field-hint">{batchLabels.hint}</p><div className="fields"><TextField label={t.itemName} value={activeItem.name} onChange={(name) => updateItem({ name })} /><label className="field"><span>{t.material}</span><span className="field-control"><select value={activeItem.material} onChange={(event) => updateItem({ material: event.target.value as PrintItemInput["material"] })}>{["PLA", "PETG", "ABS", "TPU", "Other"].map((material) => <option key={material}>{material}</option>)}</select></span></label><Field label={t.quantity} value={activeItem.quantity} min={1} max={10000} step={1} onChange={(quantity) => updateItem({ quantity: Math.round(quantity) })} suffix="pcs" /><Field label={batchLabels.filament} value={activeItem.filamentGrams} max={1000000} onChange={(filamentGrams) => updateItem({ filamentGrams })} suffix="g" /><TimeField label={batchLabels.time} hours={activeItem.printHours} minutes={activeItem.printMinutes} onHoursChange={(printHours) => updateItem({ printHours })} onMinutesChange={(printMinutes) => updateItem({ printMinutes })} hoursLabel={t.printHours} minutesLabel={t.printMinutes} /></div>
          <details className="form-disclosure"><summary>{t.itemCosts}<span /></summary><div className="fields detail-fields"><Field label={t.spoolPrice} value={activeItem.spoolPrice} max={100000000} onChange={(spoolPrice) => updateItem({ spoolPrice })} suffix={symbol} /><Field label={t.spoolWeight} value={activeItem.spoolWeightGrams} min={1} max={1000000} onChange={(spoolWeightGrams) => updateItem({ spoolWeightGrams })} suffix="g" stepperStep={50} /><Field label={t.preparation} value={activeItem.preparationMinutes} max={100000} onChange={(preparationMinutes) => updateItem({ preparationMinutes })} suffix="min" stepperStep={5} /><Field label={t.postProcessing} value={activeItem.postProcessingMinutes} max={100000} onChange={(postProcessingMinutes) => updateItem({ postProcessingMinutes })} suffix="min" stepperStep={5} /><Field label={t.packaging} value={activeItem.packagingCost} max={100000000} onChange={(packagingCost) => updateItem({ packagingCost })} suffix={symbol} /></div></details>
        </div>
        <div className="form-section"><div className="form-title"><h3><b>02</b>{t.sharedRates}</h3></div><div className="fields"><Field label={t.machineRate} value={input.machineRate} max={1000000} onChange={(value) => updateInput("machineRate", value)} suffix={`${symbol}/h`} stepperStep={0.1} /><Field label={t.laborRate} value={input.laborRate} max={1000000} onChange={(value) => updateInput("laborRate", value)} suffix={`${symbol}/h`} /><Field label={t.failureRate} value={input.failureRate} max={50} onChange={(value) => updateInput("failureRate", value)} suffix="%" /><Field label={t.wasteRate} value={input.wasteRate} max={100} onChange={(value) => updateInput("wasteRate", value)} suffix="%" /><Field label={t.powerDraw} value={input.powerDrawWatts} max={100000} onChange={(value) => updateInput("powerDrawWatts", value)} suffix="W" stepperStep={10} /><Field label={t.electricityRate} value={input.electricityRate} max={1000000} onChange={(value) => updateInput("electricityRate", value)} suffix={`${symbol}/kWh`} stepperStep={0.01} /></div></div>
        <div className="form-section"><div className="form-title"><h3><b>03</b>{t.pricing}</h3></div><div className="fields"><Field label={t.targetMargin} value={input.targetMargin} max={95} onChange={(value) => updateInput("targetMargin", value)} suffix="%" /><Field label={t.minimumFee} value={input.minimumFee} max={100000000} onChange={(value) => updateInput("minimumFee", value)} suffix={symbol} /><Field label={t.shipping} value={input.shippingCost} max={100000000} onChange={(value) => updateInput("shippingCost", value)} suffix={symbol} /><Field label={t.tax} value={input.taxRate} max={100} onChange={(value) => updateInput("taxRate", value)} suffix="%" /></div></div>
        <div className="form-section"><div className="form-title"><h3><b>04</b>{t.pdfDetails}</h3></div><div className="fields"><TextField label={t.companyName} value={details.companyName} onChange={(companyName) => setDetails({ ...details, companyName })} /></div><div className="optional-toggle"><span>{t.additionalQuoteDetails}</span><label className="switch"><input type="checkbox" checked={detailsEnabled} onChange={(event) => setDetailsEnabled(event.target.checked)} /><i /></label></div>{detailsEnabled ? <div className="fields optional-fields"><TextField label={t.companyDetails} value={details.companyDetails} onChange={(companyDetails) => setDetails({ ...details, companyDetails })} placeholder="info@lopuo.com" /><TextField label={t.customerName} value={details.customerName} onChange={(customerName) => setDetails({ ...details, customerName })} /><TextField label={t.customerDetails} value={details.customerDetails} onChange={(customerDetails) => setDetails({ ...details, customerDetails })} /><TextField label={t.quoteNumber} value={details.quoteNumber} onChange={(quoteNumber) => setDetails({ ...details, quoteNumber })} placeholder="QT-2026-001" /><TextField label={t.validDays} value={details.validDays} onChange={(validDays) => setDetails({ ...details, validDays })} placeholder="30" /><TextAreaField label={batchLabels.scope} value={details.scope} onChange={(scope) => setDetails({ ...details, scope })} /><TextAreaField label={batchLabels.assumptions} value={details.assumptions} onChange={(assumptions) => setDetails({ ...details, assumptions })} /><TextAreaField label={batchLabels.terms} value={details.terms} onChange={(terms) => setDetails({ ...details, terms })} /></div> : null}</div>
      </form>
      <div className="result-column">
        <section className="result-card"><p className="result-label">{t.targetQuote}</p><strong className="result-value">{money(result.total)}</strong><div className="result-metrics"><p><span>{t.totalCost}</span><strong>{money(result.totalCost)}</strong></p><p><span>{t.profit}</span><strong className="positive">{money(result.profit)}</strong></p><p><span>{t.margin}</span><strong className="positive">{(result.margin * 100).toFixed(1)}%</strong></p></div><div className="result-actions"><button className="button primary" type="button" onClick={exportPdf}><Download aria-hidden="true" />{t.exportPdf}</button><button className="button" type="button" onClick={exportCsv}><FileSpreadsheet aria-hidden="true" />{t.exportCsv}</button><button className="button" type="button" onClick={copySummary}><Copy aria-hidden="true" />{t.copySummary}</button></div></section>
        <section className="breakdown-panel"><h2>{t.breakdown}</h2>{[[t.materialCost, result.itemResults.reduce((sum, item) => sum + item.materialCost, 0)], [t.machine, result.itemResults.reduce((sum, item) => sum + item.machine, 0)], [t.electricity, result.itemResults.reduce((sum, item) => sum + item.electricity, 0)], [t.labor, result.itemResults.reduce((sum, item) => sum + item.labor, 0)], [t.failureRisk, result.itemResults.reduce((sum, item) => sum + item.failureRisk, 0)]].map(([label, value]) => <div className="breakdown-row" key={String(label)}><span>{label}</span><i role="img" aria-label={`${label}: ${money(Number(value))}`}><b aria-hidden="true" style={{ width: `${Math.max(2, Number(value) / Math.max(result.totalCost, 0.01) * 100)}%` }} /></i><strong aria-hidden="true">{money(Number(value))}</strong></div>)}</section>
        <section className="quote-preview-panel"><QuoteDocument locale={locale} dictionary={dictionary} details={details} detailsEnabled={detailsEnabled} input={input} result={result} money={money} /></section>
      </div>
    </div>
    {toast ? <div className="toast" role="status" aria-live="polite" onAnimationEnd={() => setToast("")}>{toast}</div> : null}
    {printing ? createPortal(<QuoteDocument locale={locale} dictionary={dictionary} details={details} detailsEnabled={detailsEnabled} input={input} result={result} money={money} className="print-document" />, document.body) : null}
  </section>;
}
