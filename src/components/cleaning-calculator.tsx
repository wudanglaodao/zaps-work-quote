"use client";

import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Copy, Download, FileSpreadsheet } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ServiceQuoteDocument } from "@/components/quote-templates/service-quote-document";
import type { BasicQuoteDetails, BasicQuoteLabels, BasicQuoteLine } from "@/components/quote-templates/basic-quote-document";
import { usePreferences } from "@/components/preferences-provider";
import { trackToolEvent } from "@/lib/analytics/client";
import { calculateCleaningQuote, convertCleaningCurrency, convertCleaningMeasurement, createDefaultCleaningInput, type CleaningAddOnKey, type CleaningInput } from "@/lib/calculators/cleaning";
import { currencySymbols } from "@/lib/currency";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getCleaningCopy, type CleaningCopy } from "@/lib/i18n/cleaning";
import { getQuoteActionLabels } from "@/lib/i18n/quote-actions";
import { createBasicQuoteCsv } from "@/lib/quotes/basic-csv";

type QuoteDetails = { companyName: string; companyDetails: string; customerName: string; customerDetails: string; quoteNumber: string; validDays: string };
const localeCodes: Record<Locale, string> = { en: "en-US", "zh-hant": "zh-TW", de: "de-DE", ja: "ja-JP", es: "es-ES", fr: "fr-FR", "pt-br": "pt-BR", ko: "ko-KR" };
const addOnKeys: CleaningAddOnKey[] = ["oven", "fridge", "windows", "cabinets", "laundry", "petHair"];

function localIsoDate(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
function NumberField({ label, value, onChange, suffix, min = 0, max, step = "any", stepperStep }: { label: string; value: number; onChange: (value: number) => void; suffix?: string; min?: number; max?: number; step?: number | "any"; stepperStep?: number }) {
  const stepValue = stepperStep ?? (typeof step === "number" ? step : 1);
  const className = `field-control number-control${suffix ? " has-suffix" : ""}${suffix && suffix.length >= 5 ? " wide-suffix" : ""}`;
  const commit = (next: number) => { if (!Number.isFinite(next)) return; onChange(Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min, next))); };
  const changeBy = (delta: number) => { const current = Number.isFinite(value) ? value : min; commit(Number((current + delta).toFixed(6))); };
  return <label className="field"><span>{label}</span><span className={className}><input type="number" value={Number.isFinite(value) ? value : min} min={min} max={max} step={step} onChange={(event) => { if (event.target.value !== "") commit(Number(event.target.value)); }} /><span className="number-stepper" aria-label={`${label} stepper`}><button type="button" aria-label={`Increase ${label}`} onClick={() => changeBy(stepValue)}><ChevronUp aria-hidden="true" /></button><button type="button" aria-label={`Decrease ${label}`} onClick={() => changeBy(-stepValue)}><ChevronDown aria-hidden="true" /></button></span>{suffix ? <i>{suffix}</i> : null}</span></label>;
}
function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) { return <label className="field"><span>{label}</span><span className="field-control"><input type="text" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></span></label>; }
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }> }) { return <label className="field"><span>{label}</span><span className="field-control"><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></span></label>; }

function CleaningQuotePreview({ locale, dictionary, copy, details, detailsEnabled, input, result, money, className = "" }: { locale: Locale; dictionary: Dictionary; copy: CleaningCopy; details: QuoteDetails; detailsEnabled: boolean; input: CleaningInput; result: ReturnType<typeof calculateCleaningQuote>; money: (value: number) => string; className?: string }) {
  const t = dictionary.calculator;
  const validity = detailsEnabled && Number(details.validDays) > 0 ? t.validFor.replace("{days}", String(Math.round(Number(details.validDays)))) : "";
  const labels: BasicQuoteLabels = { quote: t.quote, date: t.date, preparedFor: t.preparedFor, project: t.project, description: t.description, qty: t.qty, unitPrice: t.unitPrice, amount: t.amount, subtotal: t.subtotal, tax: t.tax, total: t.total };
  const basicDetails: BasicQuoteDetails = { companyName: details.companyName, companyDetails: details.companyDetails, customerName: details.customerName, customerDetails: details.customerDetails, quoteNumber: details.quoteNumber, validity };
  const selected = addOnKeys.filter((key) => input.addOns[key].selected).map((key) => copy[key]);
  const areaUnit = input.measurementUnit === "sqft" ? copy.squareFeet : copy.squareMeters;
  const detail = `${copy[input.cleaningType]} · ${copy[input.frequency]} · ${input.area} ${areaUnit}`;
  const lines: BasicQuoteLine[] = [{ id: "cleaning", description: copy.serviceLine, detail, quantity: 1, unitPrice: money(result.subtotal), amount: money(result.subtotal) }];
  const notes = [{ label: copy.totalCleanerHours, value: result.totalCleanerHours.toFixed(2) }, { label: copy.onSiteDuration, value: `${result.onSiteHours.toFixed(2)} h` }];
  if (selected.length) notes.push({ label: copy.selectedAddOns, value: selected.join(", ") });
  return <ServiceQuoteDocument labels={labels} details={basicDetails} detailsEnabled={detailsEnabled} serviceName={copy.heading} dateText={new Intl.DateTimeFormat(localeCodes[locale], { dateStyle: "medium" }).format(new Date())} lines={lines} notes={notes} subtotal={money(result.subtotal)} tax={result.tax > 0 ? money(result.tax) : undefined} total={money(result.total)} className={className} />;
}

export function CleaningCalculator({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const copy = getCleaningCopy(locale);
  const quoteActions = getQuoteActionLabels(locale);
  const { currency } = usePreferences();
  const defaultMeasurementUnit: CleaningInput["measurementUnit"] = locale === "en" ? "sqft" : "sqm";
  const [input, setInput] = useState<CleaningInput>(() => createDefaultCleaningInput(currency, defaultMeasurementUnit));
  const previousCurrency = useRef(currency);
  const [detailsEnabled, setDetailsEnabled] = useState(false);
  const [details, setDetails] = useState<QuoteDetails>({ companyName: "", companyDetails: "", customerName: "", customerDetails: "", quoteNumber: "", validDays: "" });
  const [printing, setPrinting] = useState(false);
  const [toast, setToast] = useState("");
  const result = useMemo(() => calculateCleaningQuote(input), [input]);
  const symbol = currencySymbols[currency];
  const moneyFormatter = useMemo(() => new Intl.NumberFormat(localeCodes[locale], { style: "currency", currency }), [currency, locale]);
  const fractionDigits = moneyFormatter.resolvedOptions().maximumFractionDigits;
  const money = (value: number) => moneyFormatter.format(value);
  const areaUnit = input.measurementUnit === "sqft" ? copy.squareFeet : copy.squareMeters;

  useEffect(() => { const finish = () => setPrinting(false); window.addEventListener("afterprint", finish); return () => window.removeEventListener("afterprint", finish); }, []);
  useEffect(() => {
    if (previousCurrency.current === currency) return;
    setInput((current) => convertCleaningCurrency(current, previousCurrency.current, currency));
    previousCurrency.current = currency;
  }, [currency]);
  function update<K extends keyof CleaningInput>(key: K, value: CleaningInput[K]) { setInput((current) => ({ ...current, [key]: value })); }
  function updateAddOn(key: CleaningAddOnKey, patch: Partial<CleaningInput["addOns"][CleaningAddOnKey]>) { setInput((current) => ({ ...current, addOns: { ...current.addOns, [key]: { ...current.addOns[key], ...patch } } })); }
  function metrics() { return { itemCount: 1, totalCost: result.jobCost, quoteTotal: result.total, margin: result.margin }; }
  function quoteSnapshot() {
    const selectedAddOnCount = addOnKeys.filter((key) => input.addOns[key].selected).length;
    return { kind: "cleaning" as const, inputs: { propertyType: input.propertyType, measurementUnit: input.measurementUnit, area: input.area, bedrooms: input.bedrooms, bathrooms: input.bathrooms, cleaningType: input.cleaningType, frequency: input.frequency, difficulty: input.difficulty, estimationMode: input.estimationMode, productionRate: input.productionRate, manualCleanerHours: input.manualCleanerHours, crewSize: input.crewSize, laborCostPerHour: input.laborCostPerHour, overheadPerHour: input.overheadPerHour, suppliesCost: input.suppliesCost, travelCost: input.travelCost, selectedAddOnCount, addOnCleanerHours: result.addOnCleanerHours, fixedAddOnRevenue: result.fixedAddOnRevenue, targetMargin: input.targetMargin, minimumFee: input.minimumFee, frequencyDiscount: input.frequencyDiscount, firstCleanSurcharge: input.firstCleanSurcharge, taxRate: input.taxRate }, outputs: { baseCleanerHours: result.baseCleanerHours, totalCleanerHours: result.totalCleanerHours, onSiteHours: result.onSiteHours, laborCost: result.laborCost, overheadCost: result.overheadCost, addOnCost: result.addOnCost, jobCost: result.jobCost, subtotal: result.subtotal, tax: result.tax, total: result.total, profit: result.profit, margin: result.margin } };
  }
  function exportPdf() { trackToolEvent({ eventType: "pdf_exported", toolSlug: "cleaning-quote-generator", locale, currency, metrics: metrics(), quoteSnapshot: quoteSnapshot() }); setPrinting(true); window.setTimeout(() => window.print(), 60); }
  function exportCsv() {
    const date = localIsoDate(); const quoteNumber = detailsEnabled ? details.quoteNumber.trim() : ""; const shared = [details.companyName, detailsEnabled ? details.companyDetails : "", quoteNumber, date, detailsEnabled ? details.customerName : "", detailsEnabled ? details.customerDetails : "", copy.heading];
    const headers = [dictionary.calculator.companyName, dictionary.calculator.companyDetails, dictionary.calculator.quoteNumber, dictionary.calculator.date, dictionary.calculator.customerName, dictionary.calculator.customerDetails, dictionary.calculator.project, dictionary.calculator.description, dictionary.calculator.qty, dictionary.calculator.unitPrice, dictionary.calculator.amount, dictionary.common.currency];
    const rows: unknown[][] = [[...shared, copy.serviceLine, 1, result.subtotal.toFixed(fractionDigits), result.subtotal.toFixed(fractionDigits), currency]];
    const summaryRows: unknown[][] = [["", "", "", "", "", "", "", dictionary.calculator.subtotal, "", "", result.subtotal.toFixed(fractionDigits), currency]];
    if (result.tax > 0) summaryRows.push(["", "", "", "", "", "", "", dictionary.calculator.tax, "", "", result.tax.toFixed(fractionDigits), currency]);
    summaryRows.push(["", "", "", "", "", "", "", dictionary.calculator.total, "", "", result.total.toFixed(fractionDigits), currency]);
    const csv = createBasicQuoteCsv({ headers, rows, summaryRows }); const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = `${(quoteNumber || `cleaning-quote-${date}`).replace(/[\/:*?"<>|]/g, "-")}.csv`; link.click(); URL.revokeObjectURL(url);
    trackToolEvent({ eventType: "csv_exported", toolSlug: "cleaning-quote-generator", locale, currency, metrics: metrics(), quoteSnapshot: quoteSnapshot() }); setToast(dictionary.calculator.csvExported);
  }
  async function copySummary() { await navigator.clipboard.writeText(`${copy.targetQuote}: ${money(result.total)}\n${copy.totalCleanerHours}: ${result.totalCleanerHours.toFixed(2)}\n${copy.onSiteDuration}: ${result.onSiteHours.toFixed(2)} h\n${copy.jobCost}: ${money(result.jobCost)}\n${copy.margin}: ${(result.margin * 100).toFixed(1)}%`); trackToolEvent({ eventType: "summary_copied", toolSlug: "cleaning-quote-generator", locale, currency, metrics: metrics() }); setToast(dictionary.calculator.copied); }

  return <section className="calculator-section" id="calculator"><div className="shell calculator-grid"><form className="calculator-panel" onSubmit={(event) => event.preventDefault()}>
    <header className="panel-heading"><p>{dictionary.calculator.input}</p><h2>{copy.heading}</h2></header>
    <div className="form-section"><div className="form-title"><h3><b>01</b>{copy.jobDetails}</h3></div><div className="fields">
      <SelectField label={copy.propertyType} value={input.propertyType} onChange={(value) => update("propertyType", value as CleaningInput["propertyType"])} options={["house", "apartment", "condo"].map((value) => ({ value, label: copy[value as "house" | "apartment" | "condo"] }))} />
      <SelectField label={copy.measurementUnit} value={input.measurementUnit} onChange={(value) => setInput((current) => convertCleaningMeasurement(current, value as CleaningInput["measurementUnit"]))} options={[{ value: "sqft", label: copy.squareFeet }, { value: "sqm", label: copy.squareMeters }]} />
      <NumberField label={copy.area} value={input.area} onChange={(value) => update("area", Math.max(1, value))} suffix={areaUnit} min={1} step={1} stepperStep={100} />
      <NumberField label={copy.bedrooms} value={input.bedrooms} onChange={(value) => update("bedrooms", Math.max(0, Math.round(value)))} step={1} stepperStep={1} />
      <NumberField label={copy.bathrooms} value={input.bathrooms} onChange={(value) => update("bathrooms", value)} step={0.5} stepperStep={0.5} />
      <SelectField label={copy.cleaningType} value={input.cleaningType} onChange={(value) => update("cleaningType", value as CleaningInput["cleaningType"])} options={["standard", "deep", "move"].map((value) => ({ value, label: copy[value as "standard" | "deep" | "move"] }))} />
      <SelectField label={copy.frequency} value={input.frequency} onChange={(value) => update("frequency", value as CleaningInput["frequency"])} options={["oneTime", "weekly", "biweekly", "monthly"].map((value) => ({ value, label: copy[value as "oneTime" | "weekly" | "biweekly" | "monthly"] }))} />
      <SelectField label={copy.difficulty} value={input.difficulty} onChange={(value) => update("difficulty", value as CleaningInput["difficulty"])} options={["light", "typical", "heavy"].map((value) => ({ value, label: copy[value as "light" | "typical" | "heavy"] }))} />
    </div></div>
    <div className="form-section"><div className="form-title"><h3><b>02</b>{copy.laborEstimate}</h3></div><div className="fields">
      <SelectField label={copy.estimationMode} value={input.estimationMode} onChange={(value) => update("estimationMode", value as CleaningInput["estimationMode"])} options={[{ value: "area", label: copy.byArea }, { value: "manual", label: copy.manual }]} />
      {input.estimationMode === "area" ? <NumberField label={copy.productionRate} value={input.productionRate} onChange={(value) => update("productionRate", Math.max(1, value))} suffix={`${areaUnit}/h`} min={1} step={1} stepperStep={25} /> : <NumberField label={copy.manualCleanerHours} value={input.manualCleanerHours} onChange={(value) => update("manualCleanerHours", Math.max(0.25, value))} suffix="h" min={0.25} step={0.25} stepperStep={0.25} />}
      <NumberField label={copy.crewSize} value={input.crewSize} onChange={(value) => update("crewSize", Math.max(1, Math.round(value)))} min={1} step={1} stepperStep={1} />
      <NumberField label={copy.laborCostPerHour} value={input.laborCostPerHour} onChange={(value) => update("laborCostPerHour", value)} suffix={`${symbol}/h`} step={0.01} stepperStep={1} />
      <NumberField label={copy.overheadPerHour} value={input.overheadPerHour} onChange={(value) => update("overheadPerHour", value)} suffix={`${symbol}/h`} step={0.01} stepperStep={1} />
    </div></div>
    <div className="form-section"><div className="form-title"><h3><b>03</b>{copy.costsAndAddOns}</h3></div><div className="fields"><NumberField label={copy.suppliesCost} value={input.suppliesCost} onChange={(value) => update("suppliesCost", value)} suffix={symbol} step={0.01} stepperStep={1} /><NumberField label={copy.travelCost} value={input.travelCost} onChange={(value) => update("travelCost", value)} suffix={symbol} step={0.01} stepperStep={1} /></div><div className="cleaning-addon-list" aria-label={copy.addOns}>{addOnKeys.map((key) => { const addOn = input.addOns[key]; return <div className={`cleaning-addon${addOn.selected ? " selected" : ""}`} key={key}><label><input type="checkbox" checked={addOn.selected} onChange={(event) => updateAddOn(key, { selected: event.target.checked })} /><strong>{copy[key]}</strong></label>{addOn.selected ? <div className="fields"><NumberField label={copy.quantity} value={addOn.quantity} onChange={(value) => updateAddOn(key, { quantity: Math.max(1, Math.round(value)) })} min={1} step={1} /><NumberField label={copy.addedMinutes} value={addOn.minutes} onChange={(value) => updateAddOn(key, { minutes: value })} suffix="min" step={5} stepperStep={5} /><NumberField label={copy.fixedPrice} value={addOn.fixedPrice} onChange={(value) => updateAddOn(key, { fixedPrice: value })} suffix={symbol} step={0.01} stepperStep={1} /></div> : null}</div>; })}</div></div>
    <div className="form-section"><div className="form-title"><h3><b>04</b>{copy.pricing}</h3></div><div className="fields"><NumberField label={copy.targetMargin} value={input.targetMargin} onChange={(value) => update("targetMargin", value)} suffix="%" max={95} step={1} stepperStep={5} /><NumberField label={copy.minimumFee} value={input.minimumFee} onChange={(value) => update("minimumFee", value)} suffix={symbol} step={0.01} stepperStep={5} /><NumberField label={copy.frequencyDiscount} value={input.frequencyDiscount} onChange={(value) => update("frequencyDiscount", value)} suffix="%" max={95} step={1} stepperStep={5} /><NumberField label={copy.firstCleanSurcharge} value={input.firstCleanSurcharge} onChange={(value) => update("firstCleanSurcharge", value)} suffix="%" max={500} step={1} stepperStep={5} /><NumberField label={copy.taxRate} value={input.taxRate} onChange={(value) => update("taxRate", value)} suffix="%" max={100} step={1} stepperStep={1} /></div></div>
    <div className="form-section"><div className="form-title"><h3><b>05</b>{copy.quoteDetails}</h3></div><div className="fields"><TextField label={dictionary.calculator.companyName} value={details.companyName} onChange={(companyName) => setDetails({ ...details, companyName })} /></div><div className="optional-toggle"><span>{dictionary.calculator.additionalQuoteDetails}</span><label className="switch"><input type="checkbox" aria-label={dictionary.calculator.additionalQuoteDetails} checked={detailsEnabled} onChange={(event) => setDetailsEnabled(event.target.checked)} /><i /></label></div>{detailsEnabled ? <div className="fields optional-fields"><TextField label={dictionary.calculator.companyDetails} value={details.companyDetails} onChange={(companyDetails) => setDetails({ ...details, companyDetails })} placeholder="info@example.com" /><TextField label={dictionary.calculator.customerName} value={details.customerName} onChange={(customerName) => setDetails({ ...details, customerName })} /><TextField label={dictionary.calculator.customerDetails} value={details.customerDetails} onChange={(customerDetails) => setDetails({ ...details, customerDetails })} /><TextField label={dictionary.calculator.quoteNumber} value={details.quoteNumber} onChange={(quoteNumber) => setDetails({ ...details, quoteNumber })} placeholder="QT-2026-001" /><TextField label={dictionary.calculator.validDays} value={details.validDays} onChange={(validDays) => setDetails({ ...details, validDays })} placeholder="30" /></div> : null}</div>
  </form><div className="result-column"><section className="result-card" id="cleaning-results"><p className="result-label">{copy.targetQuote}</p><strong className="result-value">{money(result.total)}</strong><div className="result-metrics"><p><span>{copy.jobCost}</span><strong>{money(result.jobCost)}</strong></p><p><span>{copy.profit}</span><strong className={result.profit >= 0 ? "positive" : ""}>{money(result.profit)}</strong></p><p><span>{copy.margin}</span><strong className={result.margin >= input.targetMargin / 100 ? "positive" : ""}>{(result.margin * 100).toFixed(1)}%</strong></p><p><span>{copy.totalCleanerHours}</span><strong>{result.totalCleanerHours.toFixed(2)} h</strong></p><p><span>{copy.onSiteDuration}</span><strong>{result.onSiteHours.toFixed(2)} h</strong></p></div><div className="result-actions"><button className="button primary" type="button" onClick={exportPdf}><Download aria-hidden="true" />{quoteActions.printOrSavePdf}</button><button className="button" type="button" onClick={exportCsv}><FileSpreadsheet aria-hidden="true" />{dictionary.calculator.exportCsv}</button><button className="button" type="button" onClick={copySummary}><Copy aria-hidden="true" />{dictionary.calculator.copySummary}</button></div></section>
    <section className="breakdown-panel"><h2>{dictionary.calculator.breakdown}</h2>{[[copy.labor, result.laborCost], [copy.overhead, result.overheadCost], [copy.addOnCost, result.addOnCost], [copy.suppliesCost, input.suppliesCost], [copy.travelCost, input.travelCost], [copy.minimumAdjustment, result.minimumFeeAdjustment]].map(([label, value]) => <div className="breakdown-row" key={String(label)}><span>{label}</span><i role="img" aria-label={`${label}: ${money(Number(value))}`}><b aria-hidden="true" style={{ width: `${Math.max(2, Math.min(100, Number(value) / Math.max(result.jobCost, result.subtotal, 1) * 100))}%` }} /></i><strong aria-hidden="true">{money(Number(value))}</strong></div>)}</section>
    <section className="quote-preview-panel"><CleaningQuotePreview locale={locale} dictionary={dictionary} copy={copy} details={details} detailsEnabled={detailsEnabled} input={input} result={result} money={money} /></section></div></div><aside className="mobile-quote-bar" aria-live="polite"><span><small>{copy.targetQuote}</small><strong>{money(result.total)}</strong></span><a href="#cleaning-results">{copy.viewQuote}</a></aside>{toast ? <div className="toast" role="status" aria-live="polite" onAnimationEnd={() => setToast("")}>{toast}</div> : null}{printing ? createPortal(<CleaningQuotePreview locale={locale} dictionary={dictionary} copy={copy} details={details} detailsEnabled={detailsEnabled} input={input} result={result} money={money} className="print-document" />, document.body) : null}</section>;
}
