"use client";

import { createPortal } from "react-dom";
import { Download, FileSpreadsheet, ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePreferences } from "@/components/preferences-provider";
import { ServiceQuoteDocument } from "@/components/quote-templates/service-quote-document";
import type {
  BasicQuoteLabels,
  BasicQuoteLine,
} from "@/components/quote-templates/basic-quote-document";
import {
  calculateRoofingQuote,
  convertRoofingCurrency,
  convertRoofingMeasurement,
  createDefaultRoofingInput,
  defaultMaterialPrices,
  roofingMaterialTypes,
  type RoofingInput,
  type RoofingMaterialType,
} from "@/lib/calculators/roofing";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getRoofingCopy } from "@/lib/i18n/roofing";
import { createBasicQuoteCsv } from "@/lib/quotes/basic-csv";
import { RoofingVisualizer } from "./roofing-visualizer";

const localeCodes: Record<Locale, string> = {
  en: "en-US",
  "zh-hant": "zh-TW",
  "zh-hans": "zh-CN",
  de: "de-DE",
  ja: "ja-JP",
  es: "es-ES",
  fr: "fr-FR",
  "pt-br": "pt-BR",
  ko: "ko-KR",
  it: "it-IT",
  nl: "nl-NL",
  pl: "pl-PL",
};

function NumberField({
  label,
  value,
  onChange,
  suffix,
  min = 0,
  max,
  step = "any",
  stepperStep = 1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number | "any";
  stepperStep?: number;
}) {
  const stepValue = stepperStep ?? (typeof step === "number" ? step : 1);
  const className = `field-control number-control${suffix ? " has-suffix" : ""}`;
  const changeBy = (delta: number) => {
    const current = Number.isFinite(value) ? value : min;
    const next = Math.max(min, Number((current + delta).toFixed(4)));
    onChange(max === undefined ? next : Math.min(max, next));
  };
  const commit = (next: number) => {
    if (!Number.isFinite(next)) return;
    onChange(Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min, next)));
  };

  return (
    <label className="field">
      <span>{label}</span>
      <span className={className}>
        <input
          type="number"
          value={Number.isFinite(value) ? value : min}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            if (event.target.value !== "") commit(Number(event.target.value));
          }}
        />
        <span className="number-stepper" aria-label={`${label} stepper`}>
          <button
            type="button"
            aria-label={`Increase ${label}`}
            onClick={() => changeBy(stepValue)}
          >
            <ChevronUp aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Decrease ${label}`}
            onClick={() => changeBy(-stepValue)}
          >
            <ChevronDown aria-hidden="true" />
          </button>
        </span>
        {suffix ? <i>{suffix}</i> : null}
      </span>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <span className="field-control">
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

export function RoofingCalculator({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const copy = getRoofingCopy(locale);
  const { currency } = usePreferences();
  const defaultUnit: RoofingInput["measurementUnit"] =
    locale === "en" ? "sqft" : "sqm";

  const [input, setInput] = useState<RoofingInput>(() =>
    createDefaultRoofingInput(currency, defaultUnit),
  );
  const previousCurrency = useRef(currency);
  const [printing, setPrinting] = useState(false);

  const result = useMemo(() => calculateRoofingQuote(input), [input]);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(localeCodes[locale], {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }),
    [currency, locale],
  );

  const money = (value: number) => formatter.format(value);
  const areaUnit =
    input.measurementUnit === "sqft" ? copy.squareFeet : copy.squareMeters;

  useEffect(() => {
    const finish = () => setPrinting(false);
    window.addEventListener("afterprint", finish);
    return () => window.removeEventListener("afterprint", finish);
  }, []);

  useEffect(() => {
    if (previousCurrency.current === currency) return;
    setInput((current) =>
      convertRoofingCurrency(current, previousCurrency.current, currency),
    );
    previousCurrency.current = currency;
  }, [currency]);

  function update<K extends keyof RoofingInput>(key: K, value: RoofingInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function handleMaterialChange(type: RoofingMaterialType) {
    setInput((current) => ({
      ...current,
      materialType: type,
      materialPricePerSquare: defaultMaterialPrices[type],
    }));
  }

  function setMeasurementUnit(unit: RoofingInput["measurementUnit"]) {
    setInput((current) => convertRoofingMeasurement(current, unit));
  }

  function exportPdf() {
    setPrinting(true);
    window.setTimeout(() => window.print(), 40);
  }

  function exportCsv() {
    const csv = createBasicQuoteCsv({
      headers: [dictionary.calculator.description, dictionary.calculator.amount],
      rows: [
        [
          `${copy.shingles} (${result.orderedSquares} ${copy.squaresUnit})`,
          result.shinglesCost,
        ],
        [copy.underlayment, result.underlaymentCost],
        [copy.tearOff, result.tearOffCost],
        [copy.labor, result.laborCost],
        [copy.decking, result.deckingCost],
        [copy.overhead, result.overheadCost],
      ],
      summaryRows: [
        [dictionary.calculator.subtotal, result.subtotal],
        [dictionary.calculator.tax, result.tax],
        [dictionary.calculator.total, result.total],
      ],
    });
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "roofing-quote.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const labels: BasicQuoteLabels = {
    quote: dictionary.calculator.quote,
    date: dictionary.calculator.date,
    preparedFor: dictionary.calculator.preparedFor,
    project: dictionary.calculator.project,
    description: dictionary.calculator.description,
    qty: dictionary.calculator.qty,
    unitPrice: dictionary.calculator.unitPrice,
    amount: dictionary.calculator.amount,
    subtotal: dictionary.calculator.subtotal,
    tax: dictionary.calculator.tax,
    total: dictionary.calculator.total,
  };

  const lines: BasicQuoteLine[] = [
    {
      id: "shingles",
      description: `${copy.shingles} - ${copy.materialOptions[input.materialType]}`,
      detail: `${result.orderedSquares} ${copy.squaresUnit} · pitch ${input.pitch}/12`,
      quantity: result.orderedSquares,
      unitPrice: money(input.materialPricePerSquare),
      amount: money(result.shinglesCost),
    },
    {
      id: "underlayment",
      description: copy.underlayment,
      detail: `${result.orderedSquares} ${copy.squaresUnit}`,
      quantity: result.orderedSquares,
      unitPrice: money(input.underlaymentCostPerSquare),
      amount: money(result.underlaymentCost),
    },
    {
      id: "labor",
      description: `${copy.labor} (${input.stories} stories)`,
      detail: `${result.orderedSquares} ${copy.squaresUnit}`,
      quantity: result.orderedSquares,
      unitPrice: money(result.effectiveLaborRate),
      amount: money(result.laborCost),
    },
  ];

  if (result.tearOffCost > 0) {
    lines.push({
      id: "tearOff",
      description: copy.tearOff,
      detail: `${input.tearOffLayers} layer(s) + dumpster disposal`,
      quantity: 1,
      unitPrice: money(result.tearOffCost),
      amount: money(result.tearOffCost),
    });
  }

  if (result.deckingCost > 0) {
    lines.push({
      id: "decking",
      description: copy.decking,
      detail: `${input.deckingReplacementSheets} sheets replacement`,
      quantity: input.deckingReplacementSheets,
      unitPrice: money(input.deckingPricePerSheet),
      amount: money(result.deckingCost),
    });
  }

  return (
    <section className="calculator-section" id="roofing-calculator">
      <div className="shell calculator-grid">
        {/* Left Form Column */}
        <div className="calculator-panel">
          <header className="panel-heading">
            <p>Roofing & Exteriors</p>
            <h2>{copy.heading}</h2>
          </header>

          {/* Section 01: Dimensions & Pitch */}
          <section className="form-section">
            <div className="form-title">
              <h3>
                <b>01</b>
                {copy.dimensionsTitle}
              </h3>
              <span>{areaUnit}</span>
            </div>

            <div className="fields">
              <SelectField
                label={copy.measurementUnit}
                value={input.measurementUnit}
                onChange={(value) =>
                  setMeasurementUnit(value as RoofingInput["measurementUnit"])
                }
                options={[
                  { value: "sqft", label: copy.squareFeet },
                  { value: "sqm", label: copy.squareMeters },
                ]}
              />

              <NumberField
                label={copy.footprintArea}
                value={input.footprintArea}
                onChange={(value) => update("footprintArea", value)}
                min={1}
                stepperStep={input.measurementUnit === "sqft" ? 100 : 10}
                suffix={areaUnit}
              />

              <SelectField
                label={copy.pitchPreset}
                value={String(Math.round(input.pitch))}
                onChange={(value) => update("pitch", Number(value))}
                options={[
                  { value: "4", label: copy.pitchPresets["4"] },
                  { value: "6", label: copy.pitchPresets["6"] },
                  { value: "8", label: copy.pitchPresets["8"] },
                  { value: "10", label: copy.pitchPresets["10"] },
                  { value: "12", label: copy.pitchPresets["12"] },
                ]}
              />

              <NumberField
                label={copy.pitch}
                value={input.pitch}
                onChange={(value) => update("pitch", value)}
                min={0}
                max={24}
                step={0.5}
                stepperStep={1}
                suffix="/12"
              />

              <NumberField
                label={copy.wastePercent}
                value={input.wastePercent}
                onChange={(value) => update("wastePercent", value)}
                min={0}
                max={100}
                stepperStep={1}
                suffix="%"
              />
            </div>

            <RoofingVisualizer
              pitch={input.pitch}
              pitchDegrees={result.pitchDegrees}
              pitchMultiplier={result.pitchMultiplier}
              surfaceArea={result.surfaceArea}
              footprintArea={input.footprintArea}
              unit={areaUnit}
            />
          </section>

          {/* Section 02: Materials & Tear-Off */}
          <section className="form-section">
            <div className="form-title">
              <h3>
                <b>02</b>
                {copy.materialsTitle}
              </h3>
              <span>{result.orderedSquares} {copy.squaresUnit}</span>
            </div>

            <div className="fields">
              <SelectField
                label={copy.materialType}
                value={input.materialType}
                onChange={(value) =>
                  handleMaterialChange(value as RoofingMaterialType)
                }
                options={roofingMaterialTypes.map((type) => ({
                  value: type,
                  label: copy.materialOptions[type],
                }))}
              />

              <NumberField
                label={copy.materialPricePerSquare}
                value={input.materialPricePerSquare}
                onChange={(value) => update("materialPricePerSquare", value)}
                stepperStep={10}
                suffix={`${currency}/sq`}
              />

              <NumberField
                label={copy.underlaymentCostPerSquare}
                value={input.underlaymentCostPerSquare}
                onChange={(value) =>
                  update("underlaymentCostPerSquare", value)
                }
                stepperStep={5}
                suffix={`${currency}/sq`}
              />

              <SelectField
                label={copy.tearOffLayers}
                value={String(input.tearOffLayers)}
                onChange={(value) =>
                  update("tearOffLayers", Number(value) as 0 | 1 | 2)
                }
                options={[
                  { value: "0", label: copy.tearOffOptions.none },
                  { value: "1", label: copy.tearOffOptions.one },
                  { value: "2", label: copy.tearOffOptions.two },
                ]}
              />

              {input.tearOffLayers > 0 ? (
                <>
                  <NumberField
                    label={copy.tearOffRatePerSquare}
                    value={input.tearOffRatePerSquare}
                    onChange={(value) => update("tearOffRatePerSquare", value)}
                    stepperStep={5}
                    suffix={`${currency}/sq`}
                  />
                  <NumberField
                    label={copy.dumpsterCost}
                    value={input.dumpsterCost}
                    onChange={(value) => update("dumpsterCost", value)}
                    stepperStep={50}
                    suffix={currency}
                  />
                </>
              ) : null}
            </div>
          </section>

          {/* Section 03: Labor & Complexity */}
          <section className="form-section">
            <div className="form-title">
              <h3>
                <b>03</b>
                {copy.laborTitle}
              </h3>
            </div>

            <div className="fields">
              <SelectField
                label={copy.stories}
                value={String(input.stories)}
                onChange={(value) =>
                  update("stories", Number(value) as 1 | 2 | 3)
                }
                options={[
                  { value: "1", label: copy.storiesOptions.one },
                  { value: "2", label: copy.storiesOptions.two },
                  { value: "3", label: copy.storiesOptions.three },
                ]}
              />

              <NumberField
                label={copy.laborRatePerSquare}
                value={input.laborRatePerSquare}
                onChange={(value) => update("laborRatePerSquare", value)}
                stepperStep={10}
                suffix={`${currency}/sq`}
              />

              <NumberField
                label={copy.deckingReplacementSheets}
                value={input.deckingReplacementSheets}
                onChange={(value) =>
                  update("deckingReplacementSheets", Math.round(value))
                }
                stepperStep={1}
                suffix="sheets"
              />

              {input.deckingReplacementSheets > 0 ? (
                <NumberField
                  label={copy.deckingPricePerSheet}
                  value={input.deckingPricePerSheet}
                  onChange={(value) => update("deckingPricePerSheet", value)}
                  stepperStep={5}
                  suffix={`${currency}/sheet`}
                />
              ) : null}
            </div>
          </section>

          {/* Section 04: Pricing & Commercial Terms */}
          <section className="form-section">
            <div className="form-title">
              <h3>
                <b>04</b>
                {copy.pricingTitle}
              </h3>
            </div>

            <div className="fields">
              <NumberField
                label={copy.overheadPercent}
                value={input.overheadPercent}
                onChange={(value) => update("overheadPercent", value)}
                max={100}
                stepperStep={1}
                suffix="%"
              />

              <NumberField
                label={copy.targetMargin}
                value={input.targetMargin}
                onChange={(value) => update("targetMargin", value)}
                max={95}
                stepperStep={1}
                suffix="%"
              />

              <NumberField
                label={copy.minimumFee}
                value={input.minimumFee}
                onChange={(value) => update("minimumFee", value)}
                stepperStep={100}
                suffix={currency}
              />

              <NumberField
                label={copy.taxRate}
                value={input.taxRate}
                onChange={(value) => update("taxRate", value)}
                max={100}
                stepperStep={1}
                suffix="%"
              />
            </div>
          </section>
        </div>

        {/* Right Result Column (Sticky on desktop) */}
        <div className="result-column">
          <section className="result-card" id="roofing-results">
            <p className="result-label">{copy.targetQuote}</p>
            <strong className="result-value">{money(result.total)}</strong>

            <div className="result-metrics">
              <p>
                <span>{copy.pricePerSquare}</span>
                <strong>{money(result.pricePerSquare)}</strong>
              </p>
              <p>
                <span>{copy.directCost}</span>
                <strong>{money(result.directCost)}</strong>
              </p>
              <p>
                <span>{copy.targetMargin}</span>
                <strong className={result.profit >= 0 ? "positive" : ""}>
                  {(result.margin * 100).toFixed(1)}%
                </strong>
              </p>
            </div>

            <div className="result-actions">
              <button
                className="button primary"
                type="button"
                onClick={exportPdf}
              >
                <Download aria-hidden="true" />
                {copy.printOrSave}
              </button>
              <button className="button" type="button" onClick={exportCsv}>
                <FileSpreadsheet aria-hidden="true" />
                {copy.exportCsv}
              </button>
            </div>
          </section>

          {/* Breakdown progress bar panel */}
          <section className="breakdown-panel">
            <h2>{copy.quoteBreakdown}</h2>
            {[
              [copy.shingles, result.shinglesCost],
              [copy.underlayment, result.underlaymentCost],
              [copy.tearOff, result.tearOffCost],
              [copy.labor, result.laborCost],
              [copy.decking, result.deckingCost],
              [copy.overhead, result.overheadCost],
            ].map(([label, value]) => (
              <div className="breakdown-row" key={String(label)}>
                <span>{label}</span>
                <i>
                  <b
                    style={{
                      width: `${Math.min(
                        100,
                        (Number(value) / Math.max(result.subtotal, 1)) * 100,
                      )}%`,
                    }}
                  />
                </i>
                <strong>{money(Number(value))}</strong>
              </div>
            ))}
          </section>

          {/* Customer Quote Document Preview */}
          <section className="quote-preview-panel">
            <ServiceQuoteDocument
              labels={labels}
              details={{
                companyName: "",
                companyDetails: "",
                customerName: "",
                customerDetails: "",
                quoteNumber: "",
                validity: "",
              }}
              detailsEnabled={false}
              serviceName={copy.heading}
              dateText={new Intl.DateTimeFormat(localeCodes[locale], {
                dateStyle: "medium",
              }).format(new Date())}
              lines={lines}
              notes={[
                {
                  label: copy.materialType,
                  value: copy.materialOptions[input.materialType],
                },
                {
                  label: copy.pitch,
                  value: `${input.pitch}/12 (${result.pitchDegrees.toFixed(1)}°)`,
                },
                {
                  label: copy.orderedSquares,
                  value: `${result.orderedSquares} ${copy.squaresUnit}`,
                },
              ]}
              subtotal={money(result.subtotal)}
              tax={result.tax > 0 ? money(result.tax) : undefined}
              total={money(result.total)}
            />
          </section>
        </div>
      </div>

      <p className="shell tool-privacy-note">{copy.privacyNote}</p>

      {/* SEO Methodology & FAQ */}
      <section className="section seo-content">
        <div className="shell seo-grid">
          <div>
            <p className="section-kicker">Methodology</p>
            <h2>{copy.methodologyTitle}</h2>
            <p>{copy.methodologyBody}</p>
          </div>
          <div>
            <h2>{copy.faqTitle}</h2>
            <div className="faq-list">
              {copy.faq.map((entry) => (
                <details key={entry.question}>
                  <summary>{entry.question}</summary>
                  <p>{entry.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <div className="mobile-quote-bar">
        <span>
          <small>{copy.targetQuote}</small>
          <strong>{money(result.total)}</strong>
        </span>
        <a href="#roofing-results">{copy.viewQuote}</a>
      </div>

      {/* Print Document Portal */}
      {printing
        ? createPortal(
            <div className="print-document">
              <ServiceQuoteDocument
                labels={labels}
                details={{
                  companyName: "",
                  companyDetails: "",
                  customerName: "",
                  customerDetails: "",
                  quoteNumber: "",
                  validity: "",
                }}
                detailsEnabled={false}
                serviceName={copy.heading}
                dateText={new Intl.DateTimeFormat(localeCodes[locale], {
                  dateStyle: "medium",
                }).format(new Date())}
                lines={lines}
                notes={[
                  {
                    label: copy.materialType,
                    value: copy.materialOptions[input.materialType],
                  },
                  {
                    label: copy.pitch,
                    value: `${input.pitch}/12 (${result.pitchDegrees.toFixed(1)}°)`,
                  },
                  {
                    label: copy.orderedSquares,
                    value: `${result.orderedSquares} ${copy.squaresUnit}`,
                  },
                ]}
                subtotal={money(result.subtotal)}
                tax={result.tax > 0 ? money(result.tax) : undefined}
                total={money(result.total)}
              />
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
