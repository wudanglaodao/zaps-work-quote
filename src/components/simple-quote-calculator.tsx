"use client";

import { createPortal } from "react-dom";
import { Download, FileSpreadsheet } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePreferences } from "@/components/preferences-provider";
import { ServiceQuoteDocument } from "@/components/quote-templates/service-quote-document";
import type { BasicQuoteDetails, BasicQuoteLabels, BasicQuoteLine } from "@/components/quote-templates/basic-quote-document";
import type { Currency } from "@/lib/currency";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { createBasicQuoteCsv } from "@/lib/quotes/basic-csv";

type InputValue = number | string;
type QuoteInput = Record<string, InputValue>;
type Result = { directCost: number; subtotal: number; tax: number; total: number; profit: number; margin: number };
type QuoteDetails = Omit<BasicQuoteDetails, "validity"> & { validDays: string };
export type SimpleQuoteField = { key: string; label: string; section: string; suffix?: "currency" | "%" | string | ((input: QuoteInput, currency: Currency) => string); min?: number; max?: number; step?: number; options?: Array<{ value: string; label: string }> };
export type SimpleQuoteConfig = {
  title: string;
  category: string;
  privacyNote: string;
  targetQuote: string;
  directCostLabel: string;
  profitLabel: string;
  marginLabel: string;
  breakdownTitle: string;
  pricingAdjustmentLabel: string;
  printLabel: string;
  exportLabel: string;
  viewLabel: string;
  fields: SimpleQuoteField[];
  createDefaultInput: (currency: Currency) => QuoteInput;
  convertCurrency: (input: QuoteInput, from: Currency, to: Currency) => QuoteInput;
  calculate: (input: QuoteInput) => Result;
  breakdown: (result: Result) => Array<{ label: string; amount: number }>;
  lines: (result: Result, money: (value: number) => string) => BasicQuoteLine[];
  notes?: (input: QuoteInput, result: Result) => Array<{ label: string; value: string }>;
  changeInput?: (input: QuoteInput, key: string, value: InputValue) => QuoteInput;
};

const localeCodes: Record<Locale, string> = { en: "en-US", "zh-hant": "zh-TW", de: "de-DE", ja: "ja-JP", es: "es-ES", fr: "fr-FR", "pt-br": "pt-BR", ko: "ko-KR" };
const emptyDetails: QuoteDetails = { companyName: "", companyDetails: "", customerName: "", customerDetails: "", quoteNumber: "", validDays: "" };

function NumberField({ field, value, input, currency, onChange }: { field: SimpleQuoteField; value: number; input: QuoteInput; currency: Currency; onChange: (value: number) => void }) {
  const suffix = typeof field.suffix === "function" ? field.suffix(input, currency) : field.suffix === "currency" ? currency : field.suffix;
  const commit = (next: number) => { if (Number.isFinite(next)) onChange(Math.min(field.max ?? Number.POSITIVE_INFINITY, Math.max(field.min ?? 0, next))); };
  return <label className="field"><span>{field.label}</span><span className={`field-control${suffix ? " has-suffix" : ""}`}><input type="number" value={Number.isFinite(value) ? value : field.min ?? 0} min={field.min ?? 0} max={field.max} step={field.step ?? "any"} onChange={(event) => { if (event.target.value !== "") commit(Number(event.target.value)); }} />{suffix ? <i>{suffix}</i> : null}</span></label>;
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="field"><span>{label}</span><span className="field-control"><input type="text" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></span></label>;
}

export function SimpleQuoteCalculator({ locale, dictionary, config }: { locale: Locale; dictionary: Dictionary; config: SimpleQuoteConfig }) {
  const { currency } = usePreferences();
  const [input, setInput] = useState<QuoteInput>(() => config.createDefaultInput(currency));
  const [details, setDetails] = useState<QuoteDetails>(emptyDetails);
  const [detailsEnabled, setDetailsEnabled] = useState(false);
  const previousCurrency = useRef(currency);
  const [printing, setPrinting] = useState(false);
  const result = useMemo(() => config.calculate(input), [config, input]);
  const formatter = useMemo(() => new Intl.NumberFormat(localeCodes[locale], { style: "currency", currency }), [currency, locale]);
  const money = (value: number) => formatter.format(value);
  const labels: BasicQuoteLabels = { quote: dictionary.calculator.quote, date: dictionary.calculator.date, preparedFor: dictionary.calculator.preparedFor, project: dictionary.calculator.project, description: dictionary.calculator.description, qty: dictionary.calculator.qty, unitPrice: dictionary.calculator.unitPrice, amount: dictionary.calculator.amount, subtotal: dictionary.calculator.subtotal, tax: dictionary.calculator.tax, total: dictionary.calculator.total };
  const quoteDetails: BasicQuoteDetails = { ...details, validity: detailsEnabled && Number(details.validDays) > 0 ? dictionary.calculator.validFor.replace("{days}", String(Math.round(Number(details.validDays)))) : "" };
  const lines = config.lines(result, money);
  const notes = config.notes?.(input, result);
  const sections = [...new Set(config.fields.map((field) => field.section))];
  const updateInput = (key: string, value: InputValue) => setInput((current) => config.changeInput ? config.changeInput(current, key, value) : { ...current, [key]: value });

  useEffect(() => { const finish = () => setPrinting(false); window.addEventListener("afterprint", finish); return () => window.removeEventListener("afterprint", finish); }, []);
  useEffect(() => { if (previousCurrency.current === currency) return; setInput((current) => config.convertCurrency(current, previousCurrency.current, currency)); previousCurrency.current = currency; }, [config, currency]);

  function exportCsv() {
    const csv = createBasicQuoteCsv({ headers: [dictionary.calculator.description, dictionary.calculator.amount], rows: config.breakdown(result).map((item) => [item.label, item.amount]), summaryRows: [[dictionary.calculator.subtotal, result.subtotal], [dictionary.calculator.tax, result.tax], [dictionary.calculator.total, result.total]] });
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${config.category}-quote.csv`; anchor.click(); URL.revokeObjectURL(url);
  }

  const quoteDocument = <ServiceQuoteDocument labels={labels} details={quoteDetails} detailsEnabled={detailsEnabled} serviceName={config.title} dateText={new Intl.DateTimeFormat(localeCodes[locale], { dateStyle: "medium" }).format(new Date())} lines={lines} notes={notes} subtotal={money(result.subtotal)} tax={result.tax > 0 ? money(result.tax) : undefined} total={money(result.total)} />;

  return <section className="calculator-section"><div className="shell calculator-grid"><div className="calculator-panel"><header className="panel-heading"><p>{config.category}</p><h2>{config.title}</h2></header>{sections.map((section, index) => <section className="form-section" key={section}><div className="form-title"><h3><b>{String(index + 1).padStart(2, "0")}</b>{section}</h3></div><div className="fields">{config.fields.filter((field) => field.section === section).map((field) => field.options ? <label className="field" key={field.key}><span>{field.label}</span><span className="field-control"><select value={String(input[field.key])} onChange={(event) => updateInput(field.key, event.target.value)}>{field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></span></label> : <NumberField key={field.key} field={field} value={Number(input[field.key])} input={input} currency={currency} onChange={(value) => updateInput(field.key, value)} />)}</div></section>)}<section className="form-section"><div className="form-title"><h3><b>{String(sections.length + 1).padStart(2, "0")}</b>{dictionary.calculator.pdfDetails}</h3></div><div className="fields"><TextField label={dictionary.calculator.companyName} value={details.companyName} onChange={(companyName) => setDetails((current) => ({ ...current, companyName }))} /></div><div className="optional-toggle"><span>{dictionary.calculator.additionalQuoteDetails}</span><label className="switch"><input type="checkbox" aria-label={dictionary.calculator.additionalQuoteDetails} checked={detailsEnabled} onChange={(event) => setDetailsEnabled(event.target.checked)} /><i /></label></div>{detailsEnabled ? <div className="fields optional-fields"><TextField label={dictionary.calculator.companyDetails} value={details.companyDetails} onChange={(companyDetails) => setDetails((current) => ({ ...current, companyDetails }))} placeholder="info@example.com" /><TextField label={dictionary.calculator.customerName} value={details.customerName} onChange={(customerName) => setDetails((current) => ({ ...current, customerName }))} /><TextField label={dictionary.calculator.customerDetails} value={details.customerDetails} onChange={(customerDetails) => setDetails((current) => ({ ...current, customerDetails }))} /><TextField label={dictionary.calculator.quoteNumber} value={details.quoteNumber} onChange={(quoteNumber) => setDetails((current) => ({ ...current, quoteNumber }))} placeholder="QT-2026-001" /><TextField label={dictionary.calculator.validDays} value={details.validDays} onChange={(validDays) => setDetails((current) => ({ ...current, validDays }))} placeholder="30" /></div> : null}</section></div><div className="result-column"><section className="result-card" id={`${config.category}-results`}><p className="result-label">{config.targetQuote}</p><strong className="result-value">{money(result.total)}</strong><div className="result-metrics"><p><span>{config.directCostLabel}</span><strong>{money(result.directCost)}</strong></p><p><span>{config.profitLabel}</span><strong className={result.profit >= 0 ? "positive" : ""}>{money(result.profit)}</strong></p><p><span>{config.marginLabel}</span><strong>{(result.margin * 100).toFixed(1)}%</strong></p></div><div className="result-actions"><button className="button primary" type="button" onClick={() => { setPrinting(true); window.setTimeout(() => window.print(), 40); }}><Download aria-hidden="true" />{config.printLabel}</button><button className="button" type="button" onClick={exportCsv}><FileSpreadsheet aria-hidden="true" />{config.exportLabel}</button></div></section><section className="breakdown-panel"><h2>{config.breakdownTitle}</h2>{config.breakdown(result).map((item) => <div className="breakdown-row" key={item.label}><span>{item.label}</span><i><b style={{ width: `${Math.min(100, item.amount / Math.max(result.subtotal, 1) * 100)}%` }} /></i><strong>{money(item.amount)}</strong></div>)}</section><section className="quote-preview-panel">{quoteDocument}</section></div></div><p className="shell tool-privacy-note">{config.privacyNote}</p><div className="mobile-quote-bar"><span><small>{config.targetQuote}</small><strong>{money(result.total)}</strong></span><a href={`#${config.category}-results`}>{config.viewLabel}</a></div>{printing ? createPortal(<div className="print-document">{quoteDocument}</div>, document.body) : null}</section>;
}
