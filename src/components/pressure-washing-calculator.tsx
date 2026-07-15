"use client";

import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Copy, Download, FileSpreadsheet } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePreferences } from "@/components/preferences-provider";
import { trackToolEvent } from "@/lib/analytics/client";
import { calculatePressureWashingQuote, convertPressureWashingCurrency, convertPressureWashingMeasurement, createDefaultPressureWashingInput, type PressureWashingInput } from "@/lib/calculators/pressure-washing";
import { ServiceQuoteDocument } from "@/components/quote-templates/service-quote-document";
import type { BasicQuoteDetails, BasicQuoteLabels, BasicQuoteLine } from "@/components/quote-templates/basic-quote-document";
import { currencySymbols } from "@/lib/currency";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getQuoteActionLabels } from "@/lib/i18n/quote-actions";
import { getPressureWashingCopy, type PressureWashingCopy } from "@/lib/i18n/pressure-washing";
import { createBasicQuoteCsv } from "@/lib/quotes/basic-csv";

type QuoteDetails = {
  companyName: string;
  companyDetails: string;
  customerName: string;
  customerDetails: string;
  quoteNumber: string;
  validDays: string;
};

const localeCodes: Record<Locale, string> = { en: "en-US", "zh-hant": "zh-TW", "zh-hans": "zh-CN", de: "de-DE", ja: "ja-JP", es: "es-ES", fr: "fr-FR", "pt-br": "pt-BR", ko: "ko-KR" };

function localIsoDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function NumberField({ label, value, onChange, suffix, min = 0, max, step = "any", stepperStep }: { label: string; value: number; onChange: (value: number) => void; suffix?: string; min?: number; max?: number; step?: number | "any"; stepperStep?: number }) {
  const stepValue = stepperStep ?? (typeof step === "number" ? step : 1);
  const className = `field-control number-control${suffix ? " has-suffix" : ""}${suffix && suffix.length >= 5 ? " wide-suffix" : ""}`;
  const changeBy = (delta: number) => {
    const current = Number.isFinite(value) ? value : min;
    const next = Math.max(min, Number((current + delta).toFixed(6)));
    onChange(max === undefined ? next : Math.min(max, next));
  };
  const commit = (next: number) => { if (!Number.isFinite(next)) return; onChange(Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min, next))); };
  return <label className="field"><span>{label}</span><span className={className}><input type="number" value={Number.isFinite(value) ? value : min} min={min} max={max} step={step} onChange={(event) => { if (event.target.value !== "") commit(Number(event.target.value)); }} /><span className="number-stepper" aria-label={`${label} stepper`}><button type="button" aria-label={`Increase ${label}`} onClick={() => changeBy(stepValue)}><ChevronUp aria-hidden="true" /></button><button type="button" aria-label={`Decrease ${label}`} onClick={() => changeBy(-stepValue)}><ChevronDown aria-hidden="true" /></button></span>{suffix ? <i>{suffix}</i> : null}</span></label>;
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="field"><span>{label}</span><span className="field-control"><input type="text" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></span></label>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }> }) {
  return <label className="field"><span>{label}</span><span className="field-control"><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></span></label>;
}

function ServiceQuotePreview({ locale, dictionary, copy, details, detailsEnabled, input, result, money, className = "" }: { locale: Locale; dictionary: Dictionary; copy: PressureWashingCopy; details: QuoteDetails; detailsEnabled: boolean; input: PressureWashingInput; result: ReturnType<typeof calculatePressureWashingQuote>; money: (value: number) => string; className?: string }) {
  const t = dictionary.calculator;
  const validity = detailsEnabled && Number(details.validDays) > 0 ? t.validFor.replace("{days}", String(Math.round(Number(details.validDays)))) : "";
  const labels: BasicQuoteLabels = { quote: t.quote, date: t.date, preparedFor: t.preparedFor, project: t.project, description: t.description, qty: t.qty, unitPrice: t.unitPrice, amount: t.amount, subtotal: t.subtotal, tax: t.tax, total: t.total };
  const basicDetails: BasicQuoteDetails = { companyName: details.companyName, companyDetails: details.companyDetails, customerName: details.customerName, customerDetails: details.customerDetails, quoteNumber: details.quoteNumber, validity };
  const areaUnit = input.measurementUnit === "sqft" ? copy.squareFeet : copy.squareMeters;
  const lines: BasicQuoteLine[] = [{ id: "driveway", description: copy.surfaceRate, detail: `${result.measuredArea.toFixed(0)} ${areaUnit} · ${copy[input.condition]}`, quantity: 1, unitPrice: money(input.ratePerArea), amount: money(result.drivewayAmount) }];
  if (input.addOnAmount > 0) lines.push({ id: "addons", description: copy.addOnAmount, quantity: 1, unitPrice: money(input.addOnAmount), amount: money(input.addOnAmount) });
  if (input.packageDiscount > 0) lines.push({ id: "discount", description: copy.packageDiscount, amount: `-${money(input.packageDiscount)}` });
  const notes = [{ label: copy.conditionNote, value: copy[input.condition] }, { label: copy.accessNote, value: copy[input.access === "normal" ? "normalAccess" : "difficultAccess"] }];
  return <ServiceQuoteDocument labels={labels} details={basicDetails} detailsEnabled={detailsEnabled} serviceName={copy.heading} dateText={new Intl.DateTimeFormat(localeCodes[locale], { dateStyle: "medium" }).format(new Date())} lines={lines} notes={notes} subtotal={money(result.subtotal)} tax={result.tax > 0 ? money(result.tax) : undefined} total={money(result.total)} className={className} />;
}

export function PressureWashingCalculator({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const copy = getPressureWashingCopy(locale);
  const { currency } = usePreferences();
  const quoteActions = getQuoteActionLabels(locale);
  const defaultMeasurementUnit: PressureWashingInput["measurementUnit"] = locale === "en" ? "sqft" : "sqm";
  const [input, setInput] = useState<PressureWashingInput>(() => createDefaultPressureWashingInput(currency, defaultMeasurementUnit));
  const previousCurrency = useRef(currency);
  const [detailsEnabled, setDetailsEnabled] = useState(false);
  const [details, setDetails] = useState<QuoteDetails>({ companyName: "", companyDetails: "", customerName: "", customerDetails: "", quoteNumber: "", validDays: "" });
  const [printing, setPrinting] = useState(false);
  const [toast, setToast] = useState("");
  const calculationInput = input;
  const result = useMemo(() => calculatePressureWashingQuote(calculationInput), [calculationInput]);
  const symbol = currencySymbols[currency];
  const moneyFormatter = useMemo(() => new Intl.NumberFormat(localeCodes[locale], { style: "currency", currency }), [currency, locale]);
  const fractionDigits = moneyFormatter.resolvedOptions().maximumFractionDigits;
  const money = (value: number) => moneyFormatter.format(value);
  const unit = input.measurementUnit === "sqft" ? copy.squareFeet : copy.squareMeters;

  useEffect(() => {
    const finish = () => setPrinting(false);
    window.addEventListener("afterprint", finish);
    return () => window.removeEventListener("afterprint", finish);
  }, []);
  useEffect(() => {
    if (previousCurrency.current === currency) return;
    setInput((current) => convertPressureWashingCurrency(current, previousCurrency.current, currency));
    previousCurrency.current = currency;
  }, [currency]);

  function update<K extends keyof PressureWashingInput>(key: K, value: PressureWashingInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function metrics() {
    return { itemCount: 1, totalCost: result.directCost, quoteTotal: result.total, margin: result.margin };
  }

  function quoteSnapshot() {
    return {
      kind: "pressure-washing" as const,
      inputs: { measurementMode: calculationInput.measurementMode, measurementUnit: calculationInput.measurementUnit, area: calculationInput.area, length: calculationInput.length, width: calculationInput.width, ratePerArea: calculationInput.ratePerArea, condition: calculationInput.condition, access: calculationInput.access, crewSize: calculationInput.crewSize, crewHours: calculationInput.crewHours, laborRate: calculationInput.laborRate, chemicalsCost: calculationInput.chemicalsCost, equipmentCost: calculationInput.equipmentCost, travelCost: calculationInput.travelCost, otherCost: calculationInput.otherCost, addOnAmount: calculationInput.addOnAmount, packageDiscount: calculationInput.packageDiscount, minimumFee: calculationInput.minimumFee, targetMargin: calculationInput.targetMargin, taxRate: calculationInput.taxRate },
      outputs: { measuredArea: result.measuredArea, drivewayAmount: result.drivewayAmount, laborCost: result.laborCost, directCost: result.directCost, costFloor: result.costFloor, subtotal: result.subtotal, tax: result.tax, total: result.total, profit: result.profit, margin: result.margin },
    };
  }

  function exportPdf() {
    trackToolEvent({ eventType: "pdf_exported", toolSlug: "pressure-washing-quote", locale, currency, metrics: metrics(), quoteSnapshot: quoteSnapshot() });
    setPrinting(true);
    window.setTimeout(() => window.print(), 60);
  }

  function exportCsv() {
    const date = localIsoDate();
    const quoteNumber = detailsEnabled ? details.quoteNumber.trim() : "";
    const shared = [details.companyName, detailsEnabled ? details.companyDetails : "", quoteNumber, date, detailsEnabled ? details.customerName : "", detailsEnabled ? details.customerDetails : "", copy.heading];
    const headers = [dictionary.calculator.companyName, dictionary.calculator.companyDetails, dictionary.calculator.quoteNumber, dictionary.calculator.date, dictionary.calculator.customerName, dictionary.calculator.customerDetails, dictionary.calculator.project, dictionary.calculator.description, dictionary.calculator.qty, dictionary.calculator.unitPrice, dictionary.calculator.amount, dictionary.common.currency];
    const rows: unknown[][] = [[...shared, copy.surfaceRate, 1, input.ratePerArea.toFixed(fractionDigits), result.drivewayAmount.toFixed(fractionDigits), currency]];
    if (input.addOnAmount > 0) rows.push([...shared, copy.addOnAmount, 1, input.addOnAmount.toFixed(fractionDigits), input.addOnAmount.toFixed(fractionDigits), currency]);
    if (input.packageDiscount > 0) rows.push([...shared, copy.packageDiscount, "", "", `-${input.packageDiscount.toFixed(fractionDigits)}`, currency]);
    const summaryRows: unknown[][] = [["", "", "", "", "", "", "", dictionary.calculator.subtotal, "", "", result.subtotal.toFixed(fractionDigits), currency]];
    if (result.tax > 0) summaryRows.push(["", "", "", "", "", "", "", dictionary.calculator.tax, "", "", result.tax.toFixed(fractionDigits), currency]);
    summaryRows.push(["", "", "", "", "", "", "", dictionary.calculator.total, "", "", result.total.toFixed(fractionDigits), currency]);
    const csv = createBasicQuoteCsv({ headers, rows, summaryRows });
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(quoteNumber || `pressure-washing-quote-${date}`).replace(/[\\/:*?"<>|]/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    trackToolEvent({ eventType: "csv_exported", toolSlug: "pressure-washing-quote", locale, currency, metrics: metrics(), quoteSnapshot: quoteSnapshot() });
    setToast(dictionary.calculator.csvExported);
  }

  async function copySummary() {
    const text = `${copy.targetQuote}: ${money(result.total)}\n${copy.directCost}: ${money(result.directCost)}\n${copy.profit}: ${money(result.profit)}\n${copy.margin}: ${(result.margin * 100).toFixed(1)}%`;
    await navigator.clipboard.writeText(text);
    trackToolEvent({ eventType: "summary_copied", toolSlug: "pressure-washing-quote", locale, currency, metrics: metrics() });
    setToast(dictionary.calculator.copied);
  }

  const conditionOptions = [{ value: "light", label: copy.light }, { value: "standard", label: copy.standard }, { value: "heavy", label: copy.heavy }];
  const accessOptions = [{ value: "normal", label: copy.normalAccess }, { value: "difficult", label: copy.difficultAccess }];
  return <section className="calculator-section" id="calculator">
    <div className="shell calculator-grid">
      <form className="calculator-panel" onSubmit={(event) => event.preventDefault()}>
        <header className="panel-heading"><p>{dictionary.calculator.input}</p><h2>{copy.serviceDetails}</h2></header>
        <div className="form-section"><div className="form-title"><h3><b>01</b>{copy.drivewayArea}</h3></div><div className="fields"><SelectField label={`${copy.squareFeet} / ${copy.squareMeters}`} value={input.measurementUnit} onChange={(value) => setInput((current) => convertPressureWashingMeasurement(current, value as PressureWashingInput["measurementUnit"]))} options={[{ value: "sqft", label: copy.squareFeet }, { value: "sqm", label: copy.squareMeters }]} /><label className="field"><span>{copy.measurementMode}</span><span className="field-control"><select value={input.measurementMode} onChange={(event) => update("measurementMode", event.target.value as PressureWashingInput["measurementMode"])}><option value="area">{copy.areaMode}</option><option value="dimensions">{copy.dimensionsMode}</option></select></span></label>{input.measurementMode === "area" ? <NumberField label={copy.area} value={input.area} onChange={(value) => update("area", value)} suffix={unit} step={1} stepperStep={50} /> : <><NumberField label={copy.length} value={input.length} onChange={(value) => update("length", value)} suffix={unit} step={1} stepperStep={5} /><NumberField label={copy.width} value={input.width} onChange={(value) => update("width", value)} suffix={unit} step={1} stepperStep={5} /></>}<NumberField label={copy.ratePerArea} value={input.ratePerArea} onChange={(value) => update("ratePerArea", value)} suffix={`${symbol}/${unit}`} step={0.01} stepperStep={0.05} /><SelectField label={copy.condition} value={input.condition} onChange={(value) => update("condition", value as PressureWashingInput["condition"])} options={conditionOptions} /><SelectField label={copy.access} value={input.access} onChange={(value) => update("access", value as PressureWashingInput["access"])} options={accessOptions} /></div></div>
        <div className="form-section"><div className="form-title"><h3><b>02</b>{copy.sharedCosts}</h3></div><div className="fields"><NumberField label={copy.crewSize} value={input.crewSize} onChange={(value) => update("crewSize", Math.max(1, Math.round(value)))} suffix="" step={1} stepperStep={1} min={1} /><NumberField label={copy.crewHours} value={input.crewHours} onChange={(value) => update("crewHours", value)} suffix="h" step={0.25} stepperStep={0.25} /><NumberField label={copy.laborRate} value={input.laborRate} onChange={(value) => update("laborRate", value)} suffix={`${symbol}/h`} step={0.01} stepperStep={1} /><NumberField label={copy.chemicals} value={input.chemicalsCost} onChange={(value) => update("chemicalsCost", value)} suffix={symbol} step={0.01} stepperStep={1} /><NumberField label={copy.equipment} value={input.equipmentCost} onChange={(value) => update("equipmentCost", value)} suffix={symbol} step={0.01} stepperStep={1} /><NumberField label={copy.travel} value={input.travelCost} onChange={(value) => update("travelCost", value)} suffix={symbol} step={0.01} stepperStep={1} /><NumberField label={copy.other} value={input.otherCost} onChange={(value) => update("otherCost", value)} suffix={symbol} step={0.01} stepperStep={1} /></div></div>
        <div className="form-section"><div className="form-title"><h3><b>03</b>{copy.pricing}</h3></div><div className="fields"><NumberField label={copy.addOnAmount} value={input.addOnAmount} onChange={(value) => update("addOnAmount", value)} suffix={symbol} step={0.01} stepperStep={1} /><NumberField label={copy.packageDiscount} value={input.packageDiscount} onChange={(value) => update("packageDiscount", value)} suffix={symbol} step={0.01} stepperStep={1} /><NumberField label={copy.minimumFee} value={input.minimumFee} onChange={(value) => update("minimumFee", value)} suffix={symbol} step={0.01} stepperStep={5} /><NumberField label={copy.targetMargin} value={input.targetMargin} onChange={(value) => update("targetMargin", value)} suffix="%" step={1} stepperStep={5} max={95} /><NumberField label={copy.taxRate} value={input.taxRate} onChange={(value) => update("taxRate", value)} suffix="%" step={1} stepperStep={1} max={100} /></div></div>
        <div className="form-section"><div className="form-title"><h3><b>04</b>{copy.quoteDetails}</h3></div><div className="fields"><TextField label={dictionary.calculator.companyName} value={details.companyName} onChange={(companyName) => setDetails({ ...details, companyName })} /></div><div className="optional-toggle"><span>{dictionary.calculator.additionalQuoteDetails}</span><label className="switch"><input type="checkbox" aria-label={dictionary.calculator.additionalQuoteDetails} checked={detailsEnabled} onChange={(event) => setDetailsEnabled(event.target.checked)} /><i /></label></div>{detailsEnabled ? <div className="fields optional-fields"><TextField label={dictionary.calculator.companyDetails} value={details.companyDetails} onChange={(companyDetails) => setDetails({ ...details, companyDetails })} placeholder="info@example.com" /><TextField label={dictionary.calculator.customerName} value={details.customerName} onChange={(customerName) => setDetails({ ...details, customerName })} /><TextField label={dictionary.calculator.customerDetails} value={details.customerDetails} onChange={(customerDetails) => setDetails({ ...details, customerDetails })} /><TextField label={dictionary.calculator.quoteNumber} value={details.quoteNumber} onChange={(quoteNumber) => setDetails({ ...details, quoteNumber })} placeholder="QT-2026-001" /><TextField label={dictionary.calculator.validDays} value={details.validDays} onChange={(validDays) => setDetails({ ...details, validDays })} placeholder="30" /></div> : null}</div>
      </form>
      <div className="result-column">
        <section className="result-card" id="pressure-washing-results"><p className="result-label">{copy.targetQuote}</p><strong className="result-value">{money(result.total)}</strong><div className="result-metrics"><p><span>{copy.directCost}</span><strong>{money(result.directCost)}</strong></p><p><span>{copy.profit}</span><strong className={result.profit >= 0 ? "positive" : ""}>{money(result.profit)}</strong></p><p><span>{copy.margin}</span><strong className={result.margin >= input.targetMargin / 100 ? "positive" : ""}>{(result.margin * 100).toFixed(1)}%</strong></p></div><div className="result-actions"><button className="button primary" type="button" onClick={exportPdf}><Download aria-hidden="true" />{quoteActions.printOrSavePdf}</button><button className="button" type="button" onClick={exportCsv}><FileSpreadsheet aria-hidden="true" />{dictionary.calculator.exportCsv}</button><button className="button" type="button" onClick={copySummary}><Copy aria-hidden="true" />{dictionary.calculator.copySummary}</button></div></section>
        <section className="breakdown-panel"><h2>{dictionary.calculator.breakdown}</h2>{[[copy.surfaceRate, result.drivewayAmount], [copy.labor, result.laborCost], [copy.operatingCosts, calculationInput.chemicalsCost + calculationInput.equipmentCost + calculationInput.travelCost + calculationInput.otherCost], [copy.pricingFloor, result.costFloor]].map(([label, value]) => <div className="breakdown-row" key={String(label)}><span>{label}</span><i role="img" aria-label={`${label}: ${money(Number(value))}`}><b aria-hidden="true" style={{ width: `${Math.max(2, Math.min(100, Number(value) / Math.max(result.directCost, result.subtotal, 1) * 100))}%` }} /></i><strong aria-hidden="true">{money(Number(value))}</strong></div>)}</section>
        <section className="quote-preview-panel"><ServiceQuotePreview locale={locale} dictionary={dictionary} copy={copy} details={details} detailsEnabled={detailsEnabled} input={input} result={result} money={money} /></section>
      </div>
    </div>
    <aside className="mobile-quote-bar" aria-live="polite"><span><small>{copy.targetQuote}</small><strong>{money(result.total)}</strong></span><a href="#pressure-washing-results">{quoteActions.viewQuote}</a></aside>
    {toast ? <div className="toast" role="status" aria-live="polite" onAnimationEnd={() => setToast("")}>{toast}</div> : null}
    {printing ? createPortal(<ServiceQuotePreview locale={locale} dictionary={dictionary} copy={copy} details={details} detailsEnabled={detailsEnabled} input={input} result={result} money={money} className="print-document" />, document.body) : null}
  </section>;
}
