"use client";

import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Copy, Download, FileSpreadsheet, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePreferences } from "@/components/preferences-provider";
import { trackToolEvent } from "@/lib/analytics/client";
import { calculateThreeDPrintQuote, createDefaultItem, createDefaultQuoteInput, type PrintItemInput, type QuoteInput } from "@/lib/calculators/three-d-print";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const currencySymbols = { USD: "$", TWD: "NT$", EUR: "€", GBP: "£" } as const;

type QuoteDetails = {
  companyName: string;
  companyDetails: string;
  customerName: string;
  customerDetails: string;
  quoteNumber: string;
  validDays: string;
};

function csvCell(value: unknown) {
  const raw = String(value ?? "");
  const safe = /^[\t\r ]*[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return /[",\r\n]/.test(safe) ? `"${safe.replaceAll('"', '""')}"` : safe;
}

function localIsoDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function Field({ label, value, onChange, suffix, min = 0, step = "any", stepperStep }: { label: string; value: number; onChange: (value: number) => void; suffix?: string; min?: number; step?: number | "any"; stepperStep?: number }) {
  const stepValue = stepperStep ?? (typeof step === "number" ? step : 1);
  const controlClass = `field-control number-control${suffix ? " has-suffix" : ""}`;
  const changeBy = (delta: number) => {
    const current = Number.isFinite(value) ? value : min;
    onChange(Math.max(min, Number((current + delta).toFixed(6))));
  };
  return <label className="field"><span>{label}</span><span className={controlClass}><input type="number" min={min} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /><span className="number-stepper" aria-label={`${label} stepper`}><button type="button" aria-label={`Increase ${label}`} onClick={(event) => { event.preventDefault(); event.stopPropagation(); changeBy(stepValue); }}><ChevronUp aria-hidden="true" /></button><button type="button" aria-label={`Decrease ${label}`} onClick={(event) => { event.preventDefault(); event.stopPropagation(); changeBy(-stepValue); }}><ChevronDown aria-hidden="true" /></button></span>{suffix ? <i>{suffix}</i> : null}</span></label>;
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="field"><span>{label}</span><span className="field-control"><input type="text" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></span></label>;
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
      <span className="time-control"><input className="time-input" aria-label={hoursLabel} inputMode="numeric" min="0" step="1" type="number" value={Number.isFinite(hours) ? hours : 0} onChange={(event) => onHoursChange(numericValue(event.target.value))} /><span className="time-unit" aria-hidden="true">h</span></span>
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
  const hasCustomer = detailsEnabled && Boolean(details.customerName || details.customerDetails);
  const validity = detailsEnabled && Number(details.validDays) > 0 ? t.validFor.replace("{days}", String(Math.round(Number(details.validDays)))) : "";
  const project = input.items.length === 1 ? input.items[0].name : locale === "zh-hant" ? `${input.items.length} 個列印項目` : locale === "de" ? `${input.items.length} Druckpositionen` : `${input.items.length} print items`;
  return <article className={`quote-document ${className}`}>
    <header className="quote-head"><div><h2>{t.quote}</h2><p>{new Intl.DateTimeFormat(locale === "zh-hant" ? "zh-TW" : locale === "de" ? "de-DE" : "en-US", { dateStyle: "medium" }).format(new Date())}</p>{detailsEnabled && details.quoteNumber ? <p>{details.quoteNumber}</p> : null}</div><div className="quote-company"><strong>{details.companyName}</strong>{detailsEnabled && details.companyDetails ? <span>{details.companyDetails}</span> : null}</div></header>
    <section className={`quote-parties ${hasCustomer ? "" : "single"}`}>
      {hasCustomer ? <div><small>{t.preparedFor}</small>{details.customerName ? <strong>{details.customerName}</strong> : null}{details.customerDetails ? <span>{details.customerDetails}</span> : null}</div> : null}
      <div><small>{t.project}</small><strong>{project}</strong></div>
    </section>
    <div className="quote-columns"><span>{t.description}</span><span>{t.qty}</span><span>{t.unitPrice}</span><span>{t.amount}</span></div>
    <div className="quote-lines">
      {result.itemResults.map((item) => <div className="quote-line" key={item.id}><span><strong>{item.name}</strong><small>{item.material}</small></span><span>{item.quantity}</span><span>{money(item.quoteAmount / Math.max(1, item.quantity))}</span><span>{money(item.quoteAmount)}</span></div>)}
      {result.allocatedShipping > 0 ? <div className="quote-line"><span><strong>{t.shipping}</strong></span><span /><span /><span>{money(result.allocatedShipping)}</span></div> : null}
    </div>
    <div className="quote-summary"><p><span>{t.subtotal}</span><strong>{money(result.subtotal)}</strong></p>{result.tax > 0 ? <p><span>{t.tax}</span><strong>{money(result.tax)}</strong></p> : null}<p className="quote-total"><span>{t.total}</span><strong>{money(result.total)}</strong></p></div>
    {details.companyName || validity ? <footer className="quote-footer"><span>{validity}</span><span>{details.companyName}</span></footer> : null}
  </article>;
}

export function ThreeDPrintCalculator({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const t = dictionary.calculator;
  const { currency } = usePreferences();
  const [input, setInput] = useState<QuoteInput>(() => createDefaultQuoteInput());
  const [activeItemId, setActiveItemId] = useState("item-1");
  const [detailsEnabled, setDetailsEnabled] = useState(false);
  const [details, setDetails] = useState<QuoteDetails>({ companyName: "Northline Studio", companyDetails: "", customerName: "", customerDetails: "", quoteNumber: "", validDays: "" });
  const [printing, setPrinting] = useState(false);
  const [toast, setToast] = useState("");
  const result = useMemo(() => calculateThreeDPrintQuote(input), [input]);
  const activeItem = input.items.find((item) => item.id === activeItemId) || input.items[0];
  const localeCode = locale === "zh-hant" ? "zh-TW" : locale === "de" ? "de-DE" : "en-US";
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
    const summary = (label: string, amount: number) => rows.push(["", "", "", "", "", "", "", label, "", "", "", amount.toFixed(2), currency]);
    summary(t.subtotal, result.subtotal);
    if (result.tax > 0) summary(t.tax, result.tax);
    summary(t.total, result.total);
    const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
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

  return <section className="calculator-section" id="calculator">
    <div className="shell calculator-grid">
      <form className="calculator-panel" onSubmit={(event) => event.preventDefault()}>
        <header className="panel-heading"><p>{t.input}</p><h2>{t.jobDetails}</h2></header>
        <div className="form-section"><div className="form-title"><h3><b>01</b>{t.printItems}</h3><span>{input.items.length}</span></div><div className="item-tabs">{input.items.map((item, index) => <button type="button" className={item.id === activeItem.id ? "active" : ""} key={item.id} onClick={() => setActiveItemId(item.id)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong>{input.items.length > 1 ? <Trash2 aria-label="Delete item" onClick={(event) => { event.stopPropagation(); const next = input.items.filter((candidate) => candidate.id !== item.id); setInput({ ...input, items: next }); setActiveItemId(next[0].id); }} /> : null}</button>)}</div><button className="button dashed" type="button" disabled={input.items.length >= 10} onClick={() => { const next = createDefaultItem(input.items.length + 1); setInput({ ...input, items: [...input.items, next] }); setActiveItemId(next.id); }}><Plus aria-hidden="true" />{t.addItem}</button>
          <div className="fields"><TextField label={t.itemName} value={activeItem.name} onChange={(name) => updateItem({ name })} /><label className="field"><span>{t.material}</span><span className="field-control"><select value={activeItem.material} onChange={(event) => updateItem({ material: event.target.value as PrintItemInput["material"] })}>{["PLA", "PETG", "ABS", "TPU", "Other"].map((material) => <option key={material}>{material}</option>)}</select></span></label><Field label={t.quantity} value={activeItem.quantity} min={1} step={1} onChange={(quantity) => updateItem({ quantity: Math.max(1, Math.round(quantity)) })} suffix="pcs" /><Field label={t.filament} value={activeItem.filamentGrams} onChange={(filamentGrams) => updateItem({ filamentGrams })} suffix="g" /><TimeField label={locale === "zh-hant" ? "列印時間" : locale === "de" ? "Druckzeit" : "Print time"} hours={activeItem.printHours} minutes={activeItem.printMinutes} onHoursChange={(printHours) => updateItem({ printHours })} onMinutesChange={(printMinutes) => updateItem({ printMinutes })} hoursLabel={t.printHours} minutesLabel={t.printMinutes} /></div>
          <details className="form-disclosure"><summary>{t.itemCosts}<span /></summary><div className="fields detail-fields"><Field label={t.spoolPrice} value={activeItem.spoolPrice} onChange={(spoolPrice) => updateItem({ spoolPrice })} suffix={symbol} /><Field label={t.spoolWeight} value={activeItem.spoolWeightGrams} onChange={(spoolWeightGrams) => updateItem({ spoolWeightGrams })} suffix="g" stepperStep={50} /><Field label={t.preparation} value={activeItem.preparationMinutes} onChange={(preparationMinutes) => updateItem({ preparationMinutes })} suffix="min" stepperStep={5} /><Field label={t.postProcessing} value={activeItem.postProcessingMinutes} onChange={(postProcessingMinutes) => updateItem({ postProcessingMinutes })} suffix="min" stepperStep={5} /><Field label={t.packaging} value={activeItem.packagingCost} onChange={(packagingCost) => updateItem({ packagingCost })} suffix={symbol} /></div></details>
        </div>
        <div className="form-section"><div className="form-title"><h3><b>02</b>{t.sharedRates}</h3></div><div className="fields"><Field label={t.machineRate} value={input.machineRate} onChange={(value) => updateInput("machineRate", value)} suffix={`${symbol}/h`} stepperStep={0.1} /><Field label={t.laborRate} value={input.laborRate} onChange={(value) => updateInput("laborRate", value)} suffix={`${symbol}/h`} /><Field label={t.failureRate} value={input.failureRate} onChange={(value) => updateInput("failureRate", value)} suffix="%" /><Field label={t.wasteRate} value={input.wasteRate} onChange={(value) => updateInput("wasteRate", value)} suffix="%" /><Field label={t.powerDraw} value={input.powerDrawWatts} onChange={(value) => updateInput("powerDrawWatts", value)} suffix="W" stepperStep={10} /><Field label={t.electricityRate} value={input.electricityRate} onChange={(value) => updateInput("electricityRate", value)} suffix={`${symbol}/kWh`} stepperStep={0.01} /></div></div>
        <div className="form-section"><div className="form-title"><h3><b>03</b>{t.pricing}</h3></div><div className="fields"><Field label={t.targetMargin} value={input.targetMargin} onChange={(value) => updateInput("targetMargin", value)} suffix="%" /><Field label={t.minimumFee} value={input.minimumFee} onChange={(value) => updateInput("minimumFee", value)} suffix={symbol} /><Field label={t.shipping} value={input.shippingCost} onChange={(value) => updateInput("shippingCost", value)} suffix={symbol} /><Field label={t.tax} value={input.taxRate} onChange={(value) => updateInput("taxRate", value)} suffix="%" /></div></div>
        <div className="form-section"><div className="form-title"><h3><b>04</b>{t.pdfDetails}</h3></div><div className="fields"><TextField label={t.companyName} value={details.companyName} onChange={(companyName) => setDetails({ ...details, companyName })} /></div><div className="optional-toggle"><span>{t.additionalQuoteDetails}</span><label className="switch"><input type="checkbox" checked={detailsEnabled} onChange={(event) => setDetailsEnabled(event.target.checked)} /><i /></label></div>{detailsEnabled ? <div className="fields optional-fields"><TextField label={t.companyDetails} value={details.companyDetails} onChange={(companyDetails) => setDetails({ ...details, companyDetails })} placeholder="info@lopuo.com" /><TextField label={t.customerName} value={details.customerName} onChange={(customerName) => setDetails({ ...details, customerName })} /><TextField label={t.customerDetails} value={details.customerDetails} onChange={(customerDetails) => setDetails({ ...details, customerDetails })} /><TextField label={t.quoteNumber} value={details.quoteNumber} onChange={(quoteNumber) => setDetails({ ...details, quoteNumber })} placeholder="QT-2026-001" /><TextField label={t.validDays} value={details.validDays} onChange={(validDays) => setDetails({ ...details, validDays })} placeholder="30" /></div> : null}</div>
      </form>
      <div className="result-column">
        <section className="result-card"><p className="result-label">{t.targetQuote}</p><strong className="result-value">{money(result.total)}</strong><div className="result-metrics"><p><span>{t.totalCost}</span><strong>{money(result.totalCost)}</strong></p><p><span>{t.profit}</span><strong className="positive">{money(result.profit)}</strong></p><p><span>{t.margin}</span><strong className="positive">{(result.margin * 100).toFixed(1)}%</strong></p></div><div className="result-actions"><button className="button primary" type="button" onClick={exportPdf}><Download aria-hidden="true" />{t.exportPdf}</button><button className="button" type="button" onClick={exportCsv}><FileSpreadsheet aria-hidden="true" />{t.exportCsv}</button><button className="button" type="button" onClick={copySummary}><Copy aria-hidden="true" />{t.copySummary}</button></div></section>
        <section className="breakdown-panel"><h2>{t.breakdown}</h2>{[[t.materialCost, result.itemResults.reduce((sum, item) => sum + item.materialCost, 0)], [t.machine, result.itemResults.reduce((sum, item) => sum + item.machine, 0)], [t.electricity, result.itemResults.reduce((sum, item) => sum + item.electricity, 0)], [t.labor, result.itemResults.reduce((sum, item) => sum + item.labor, 0)], [t.failureRisk, result.itemResults.reduce((sum, item) => sum + item.failureRisk, 0)]].map(([label, value]) => <div className="breakdown-row" key={String(label)}><span>{label}</span><i><b style={{ width: `${Math.max(2, Number(value) / Math.max(result.totalCost, 0.01) * 100)}%` }} /></i><strong>{money(Number(value))}</strong></div>)}</section>
        <section className="quote-preview-panel"><QuoteDocument locale={locale} dictionary={dictionary} details={details} detailsEnabled={detailsEnabled} input={input} result={result} money={money} /></section>
      </div>
    </div>
    {toast ? <div className="toast" onAnimationEnd={() => setToast("")}>{toast}</div> : null}
    {printing ? createPortal(<QuoteDocument locale={locale} dictionary={dictionary} details={details} detailsEnabled={detailsEnabled} input={input} result={result} money={money} className="print-document" />, document.body) : null}
  </section>;
}
