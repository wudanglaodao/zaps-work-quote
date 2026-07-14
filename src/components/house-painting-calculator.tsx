"use client";

import { createPortal } from "react-dom";
import { Download, FileSpreadsheet } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePreferences } from "@/components/preferences-provider";
import { ServiceQuoteDocument } from "@/components/quote-templates/service-quote-document";
import type { BasicQuoteLabels, BasicQuoteLine } from "@/components/quote-templates/basic-quote-document";
import { calculateHousePaintingQuote, convertHousePaintingCurrency, convertHousePaintingMeasurement, createDefaultHousePaintingInput, type HousePaintingInput } from "@/lib/calculators/house-painting";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getHousePaintingCopy } from "@/lib/i18n/house-painting";
import { createBasicQuoteCsv } from "@/lib/quotes/basic-csv";

const localeCodes: Record<Locale, string> = { en: "en-US", "zh-hant": "zh-TW", de: "de-DE", ja: "ja-JP", es: "es-ES", fr: "fr-FR", "pt-br": "pt-BR", ko: "ko-KR" };

function NumberField({ label, value, onChange, suffix, min = 0, max, step = "any" }: { label: string; value: number; onChange: (value: number) => void; suffix?: string; min?: number; max?: number; step?: number | "any" }) {
  const commit = (next: number) => { if (Number.isFinite(next)) onChange(Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min, next))); };
  return <label className="field"><span>{label}</span><span className={`field-control${suffix ? " has-suffix" : ""}`}><input type="number" value={Number.isFinite(value) ? value : min} min={min} max={max} step={step} onChange={(event) => { if (event.target.value !== "") commit(Number(event.target.value)); }} />{suffix ? <i>{suffix}</i> : null}</span></label>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }> }) {
  return <label className="field"><span>{label}</span><span className="field-control"><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></span></label>;
}

export function HousePaintingCalculator({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const copy = getHousePaintingCopy(locale);
  const { currency } = usePreferences();
  const defaultUnit: HousePaintingInput["measurementUnit"] = locale === "en" ? "sqft" : "sqm";
  const [input, setInput] = useState<HousePaintingInput>(() => createDefaultHousePaintingInput(currency, defaultUnit));
  const previousCurrency = useRef(currency);
  const [printing, setPrinting] = useState(false);
  const result = useMemo(() => calculateHousePaintingQuote(input), [input]);
  const formatter = useMemo(() => new Intl.NumberFormat(localeCodes[locale], { style: "currency", currency }), [currency, locale]);
  const money = (value: number) => formatter.format(value);
  const unit = input.measurementUnit === "sqft" ? copy.squareFeet : copy.squareMeters;

  useEffect(() => {
    const finish = () => setPrinting(false);
    window.addEventListener("afterprint", finish);
    return () => window.removeEventListener("afterprint", finish);
  }, []);
  useEffect(() => {
    if (previousCurrency.current === currency) return;
    setInput((current) => convertHousePaintingCurrency(current, previousCurrency.current, currency));
    previousCurrency.current = currency;
  }, [currency]);

  function update<K extends keyof HousePaintingInput>(key: K, value: HousePaintingInput[K]) { setInput((current) => ({ ...current, [key]: value })); }
  function setMeasurementUnit(measurementUnit: HousePaintingInput["measurementUnit"]) { setInput((current) => convertHousePaintingMeasurement(current, measurementUnit)); }
  function exportPdf() { setPrinting(true); window.setTimeout(() => window.print(), 40); }
  function exportCsv() {
    const csv = createBasicQuoteCsv({
      headers: [dictionary.calculator.description, dictionary.calculator.amount],
      rows: [[copy.paint, result.paintCost], [copy.laborCost, result.laborCost], [copy.overhead, result.overheadCost], [copy.prepCost, input.prepCost], [copy.travelCost, input.travelCost]],
      summaryRows: [[dictionary.calculator.subtotal, result.subtotal], [dictionary.calculator.tax, result.tax], [dictionary.calculator.total, result.total]],
    });
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "house-painting-quote.csv"; anchor.click(); URL.revokeObjectURL(url);
  }

  const labels: BasicQuoteLabels = { quote: dictionary.calculator.quote, date: dictionary.calculator.date, preparedFor: dictionary.calculator.preparedFor, project: dictionary.calculator.project, description: dictionary.calculator.description, qty: dictionary.calculator.qty, unitPrice: dictionary.calculator.unitPrice, amount: dictionary.calculator.amount, subtotal: dictionary.calculator.subtotal, tax: dictionary.calculator.tax, total: dictionary.calculator.total };
  const lines: BasicQuoteLine[] = [
    { id: "paint", description: copy.paint, detail: `${result.paintContainers} · ${copy.coveragePerContainer}`, quantity: result.paintContainers, unitPrice: money(input.paintPrice), amount: money(result.paintCost) },
    { id: "labor", description: copy.laborCost, detail: `${result.laborHours.toFixed(1)} h`, quantity: result.laborHours, unitPrice: money(input.laborRate), amount: money(result.laborCost) },
  ];
  if (input.sundriesCost > 0) lines.push({ id: "sundries", description: copy.sundriesCost, quantity: 1, unitPrice: money(input.sundriesCost), amount: money(input.sundriesCost) });
  if (input.prepCost > 0) lines.push({ id: "prep", description: copy.prepCost, quantity: 1, unitPrice: money(input.prepCost), amount: money(input.prepCost) });
  if (input.travelCost > 0) lines.push({ id: "travel", description: copy.travelCost, quantity: 1, unitPrice: money(input.travelCost), amount: money(input.travelCost) });

  return <section className="calculator-section"><div className="shell calculator-grid"><div className="calculator-panel"><header className="panel-heading"><p>House painting</p><h2>{copy.heading}</h2></header>
    <section className="form-section"><div className="form-title"><h3><b>01</b>{copy.jobDetails}</h3><span>{unit}</span></div><div className="fields">
      <SelectField label={copy.projectType} value={input.projectType} onChange={(value) => update("projectType", value as HousePaintingInput["projectType"])} options={[{ value: "interior", label: copy.interior }, { value: "exterior", label: copy.exterior }]} />
      <SelectField label={copy.area} value={input.measurementUnit} onChange={(value) => setMeasurementUnit(value as HousePaintingInput["measurementUnit"])} options={[{ value: "sqft", label: copy.squareFeet }, { value: "sqm", label: copy.squareMeters }]} />
      <NumberField label={copy.area} value={input.area} onChange={(value) => update("area", value)} suffix={unit} />
      <NumberField label={copy.coats} value={input.coats} onChange={(value) => update("coats", Math.round(value))} min={1} max={10} step={1} />
      <NumberField label={copy.rooms} value={input.rooms} onChange={(value) => update("rooms", Math.round(value))} max={1000} step={1} />
      <SelectField label={copy.condition} value={input.condition} onChange={(value) => update("condition", value as HousePaintingInput["condition"])} options={[{ value: "good", label: copy.good }, { value: "standard", label: copy.standard }, { value: "repairHeavy", label: copy.repairHeavy }]} />
    </div></section>
    <section className="form-section"><div className="form-title"><h3><b>02</b>{copy.paintPlan}</h3></div><div className="fields"><NumberField label={copy.coveragePerContainer} value={input.coveragePerContainer} onChange={(value) => update("coveragePerContainer", value)} min={0.01} suffix={unit} /><NumberField label={copy.paintPrice} value={input.paintPrice} onChange={(value) => update("paintPrice", value)} suffix={currency} /><NumberField label={copy.wastePercent} value={input.wastePercent} onChange={(value) => update("wastePercent", value)} max={100} suffix="%" /><NumberField label={copy.sundriesCost} value={input.sundriesCost} onChange={(value) => update("sundriesCost", value)} suffix={currency} /></div></section>
    <section className="form-section"><div className="form-title"><h3><b>03</b>{copy.labor}</h3></div><div className="fields"><NumberField label={copy.productionRate} value={input.productionRate} onChange={(value) => update("productionRate", value)} min={0.01} suffix={`${unit}/h`} /><NumberField label={copy.laborRate} value={input.laborRate} onChange={(value) => update("laborRate", value)} suffix={`${currency}/h`} /><NumberField label={copy.crewSize} value={input.crewSize} onChange={(value) => update("crewSize", Math.round(value))} min={1} max={100} step={1} /></div></section>
    <section className="form-section"><div className="form-title"><h3><b>04</b>{copy.pricing}</h3></div><div className="fields"><NumberField label={copy.prepCost} value={input.prepCost} onChange={(value) => update("prepCost", value)} suffix={currency} /><NumberField label={copy.travelCost} value={input.travelCost} onChange={(value) => update("travelCost", value)} suffix={currency} /><NumberField label={copy.overheadPercent} value={input.overheadPercent} onChange={(value) => update("overheadPercent", value)} max={100} suffix="%" /><NumberField label={copy.targetMargin} value={input.targetMargin} onChange={(value) => update("targetMargin", value)} max={95} suffix="%" /><NumberField label={copy.minimumFee} value={input.minimumFee} onChange={(value) => update("minimumFee", value)} suffix={currency} /><NumberField label={copy.taxRate} value={input.taxRate} onChange={(value) => update("taxRate", value)} max={100} suffix="%" /></div></section>
  </div><div className="result-column"><section className="result-card" id="house-painting-results"><p className="result-label">{copy.targetQuote}</p><strong className="result-value">{money(result.total)}</strong><div className="result-metrics"><p><span>{copy.directCost}</span><strong>{money(result.directCost)}</strong></p><p><span>{copy.profit}</span><strong className={result.profit >= 0 ? "positive" : ""}>{money(result.profit)}</strong></p><p><span>{copy.targetMargin}</span><strong>{(result.margin * 100).toFixed(1)}%</strong></p></div><div className="result-actions"><button className="button primary" type="button" onClick={exportPdf}><Download aria-hidden="true" />{copy.printOrSave}</button><button className="button" type="button" onClick={exportCsv}><FileSpreadsheet aria-hidden="true" />{copy.exportCsv}</button></div></section>
    <section className="breakdown-panel"><h2>{copy.quoteBreakdown}</h2>{[[copy.paint, result.paintCost], [copy.laborCost, result.laborCost], [copy.overhead, result.overheadCost], [copy.onSiteHours, result.onSiteHours], [copy.paintContainers, result.paintContainers]].map(([label, value]) => <div className="breakdown-row" key={String(label)}><span>{label}</span><i><b style={{ width: `${Math.min(100, Number(value) / Math.max(result.subtotal, 1) * 100)}%` }} /></i><strong>{label === copy.onSiteHours ? `${Number(value).toFixed(1)} h` : label === copy.paintContainers ? String(value) : money(Number(value))}</strong></div>)}</section>
    <section className="quote-preview-panel"><ServiceQuoteDocument labels={labels} details={{ companyName: "", companyDetails: "", customerName: "", customerDetails: "", quoteNumber: "", validity: "" }} detailsEnabled={false} serviceName={copy.heading} dateText={new Intl.DateTimeFormat(localeCodes[locale], { dateStyle: "medium" }).format(new Date())} lines={lines} notes={[{ label: copy.projectType, value: input.projectType === "interior" ? copy.interior : copy.exterior }, { label: copy.condition, value: copy[input.condition] }]} subtotal={money(result.subtotal)} tax={result.tax > 0 ? money(result.tax) : undefined} total={money(result.total)} /></section>
  </div></div><p className="shell tool-privacy-note">{copy.privacyNote}</p><section className="section seo-content"><div className="shell seo-grid"><div><p className="section-kicker">Method</p><h2>{copy.methodologyTitle}</h2><p>{copy.methodologyBody}</p></div><div><h2>{copy.faqTitle}</h2><div className="faq-list">{copy.faq.map((entry) => <details key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>)}</div></div></div></section>
  <div className="mobile-quote-bar"><span><small>{copy.targetQuote}</small><strong>{money(result.total)}</strong></span><a href="#house-painting-results">{copy.viewQuote}</a></div>
  {printing ? createPortal(<div className="print-document"><ServiceQuoteDocument labels={labels} details={{ companyName: "", companyDetails: "", customerName: "", customerDetails: "", quoteNumber: "", validity: "" }} detailsEnabled={false} serviceName={copy.heading} dateText={new Intl.DateTimeFormat(localeCodes[locale], { dateStyle: "medium" }).format(new Date())} lines={lines} notes={[{ label: copy.projectType, value: input.projectType === "interior" ? copy.interior : copy.exterior }, { label: copy.condition, value: copy[input.condition] }]} subtotal={money(result.subtotal)} tax={result.tax > 0 ? money(result.tax) : undefined} total={money(result.total)} /></div>, document.body) : null}</section>;
}
