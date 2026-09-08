"use client";

import Link from "next/link";
import { Copy, Download, FileSpreadsheet, ArrowRight, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState, useMemo } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getQuoteActionLabels } from "@/lib/i18n/quote-actions";
import { localizedPath } from "@/lib/seo";
import {
  calculatePressBrakeTonnage,
  convertPressBrakeTonnageUnit,
  createDefaultPressBrakeTonnageInput,
  defaultTensileStrengths,
  type PressBrakeTonnageInput,
  type PressBrakeMaterial,
} from "@/lib/calculators/press-brake-tonnage";
import { getPressBrakeTonnageCopy } from "@/lib/i18n/press-brake-tonnage";
import { createBasicQuoteCsv } from "@/lib/quotes/basic-csv";
import { PressBrakeTonnageVisualizer } from "./press-brake-tonnage-visualizer";
import { PressBrakeTonnageQuoteDocument, type QuoteDetails } from "./press-brake-tonnage-quote-document";

function localIsoDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <span className="field-control">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      </span>
    </label>
  );
}

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
          onChange={(e) => {
            if (e.target.value !== "") commit(Number(e.target.value));
          }}
        />
        <span className="number-stepper" aria-label={`${label} stepper`}>
          <button type="button" aria-label={`Increase ${label}`} onClick={() => changeBy(stepValue)}>
            <ChevronUp aria-hidden="true" />
          </button>
          <button type="button" aria-label={`Decrease ${label}`} onClick={() => changeBy(-stepperStep)}>
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

export function PressBrakeTonnageCalculator({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const copy = getPressBrakeTonnageCopy(locale);
  const quoteActions = getQuoteActionLabels(locale);
  const [input, setInput] = useState<PressBrakeTonnageInput>(createDefaultPressBrakeTonnageInput);
  const [detailsEnabled, setDetailsEnabled] = useState(false);
  const [details, setDetails] = useState<QuoteDetails>({
    companyName: "",
    companyDetails: "",
    customerName: "",
    customerDetails: "",
    quoteNumber: "",
    validDays: "",
  });
  const [toast, setToast] = useState("");
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const finish = () => setPrinting(false);
    window.addEventListener("afterprint", finish);
    return () => window.removeEventListener("afterprint", finish);
  }, []);

  const result = useMemo(() => calculatePressBrakeTonnage(input), [input]);

  const handleUnitChange = (newUnit: "mm" | "in") => {
    setInput((prev) => convertPressBrakeTonnageUnit(prev, newUnit));
  };

  const handleMaterialChange = (material: PressBrakeMaterial) => {
    setInput((prev) => {
      let newTensileStrength = prev.tensileStrength;
      let customTensile = prev.customTensile;
      if (material !== "custom") {
        newTensileStrength = defaultTensileStrengths[material][prev.unit];
        customTensile = false;
      } else {
        customTensile = true;
      }
      return {
        ...prev,
        material,
        tensileStrength: newTensileStrength,
        customTensile,
      };
    });
  };

  const tonUnit = input.unit === "mm" ? "ton" : "US ton";
  const lengthUnit = input.unit === "mm" ? "m" : "ft";
  const pressureUnit = input.unit === "mm" ? "MPa" : "PSI";

  const handleCopySummary = async () => {
    const summaryText = `${copy.heading} - ${details.companyName || "zaps.work"}
----------------------------------------
${detailsEnabled && details.customerName ? `${dictionary.calculator.customerName}: ${details.customerName}\n` : ""}${detailsEnabled && details.quoteNumber ? `${dictionary.calculator.quoteNumber}: ${details.quoteNumber}\n` : ""}${copy.material}: ${copy.materialOptions[input.material]}
${copy.tensileStrength}: ${input.tensileStrength} ${pressureUnit}
${copy.thickness}: ${input.thickness} ${input.unit}
${copy.bendLength}: ${input.bendLength} ${input.unit}
${copy.dieOpening}: ${input.customDieOpening ? input.dieOpening : result.recommendedDieOpening} ${input.unit}
${copy.safetyFactor}: ${input.safetyFactor}
----------------------------------------
👉 ${copy.tonnageWithSafety}: ${result.tonnageWithSafety} ${tonUnit}
👉 ${copy.tonnagePerMeter}: ${result.tonnagePerMeter} ${tonUnit}/${lengthUnit}
👉 ${copy.recommendedDieOpening}: ${result.recommendedDieOpening} ${input.unit}
👉 ${copy.minimumFlange}: ${result.minimumFlange} ${input.unit}`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setToast(dictionary.calculator.copied);
    } catch {
      // ignore
    }
  };

  const handleExportCsv = () => {
    const date = localIsoDate();
    const headers = [
      dictionary.calculator.companyName,
      dictionary.calculator.quoteNumber,
      dictionary.calculator.customerName,
      copy.material,
      copy.tensileStrength,
      copy.thickness,
      copy.bendLength,
      copy.dieOpening,
      copy.safetyFactor,
      copy.tonnageWithSafety,
      copy.tonnagePerBend,
      copy.tonnagePerMeter,
      copy.recommendedDieOpening,
      copy.minimumFlange,
      copy.insideBendRadius,
    ];

    const rows: unknown[][] = [
      [
        details.companyName || "zaps.work",
        detailsEnabled ? details.quoteNumber : "",
        detailsEnabled ? details.customerName : "",
        copy.materialOptions[input.material],
        `${input.tensileStrength} ${pressureUnit}`,
        `${input.thickness} ${input.unit}`,
        `${input.bendLength} ${input.unit}`,
        `${input.customDieOpening ? input.dieOpening : result.recommendedDieOpening} ${input.unit}`,
        input.safetyFactor,
        `${result.tonnageWithSafety} ${tonUnit}`,
        `${result.tonnagePerBend} ${tonUnit}`,
        `${result.tonnagePerMeter} ${tonUnit}/${lengthUnit}`,
        `${result.recommendedDieOpening} ${input.unit}`,
        `${result.minimumFlange} ${input.unit}`,
        `${result.insideBendRadius} ${input.unit}`,
      ],
    ];

    const csv = createBasicQuoteCsv({ headers, rows, summaryRows: [] });
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    const filePrefix = detailsEnabled && details.quoteNumber ? details.quoteNumber.trim() : "press-brake-tonnage";
    link.download = `${filePrefix}-${date}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setToast(dictionary.calculator.csvExported);
  };

  const handlePrint = () => {
    setPrinting(true);
    window.setTimeout(() => window.print(), 50);
  };

  const bendHref = useMemo(() => {
    const params = new URLSearchParams({
      material: input.material === 'stainlessSteel' ? 'stainlessSteel' : input.material === 'aluminum' ? 'aluminum' : 'mildSteel',
      thickness: String(input.thickness),
      unit: input.unit,
      quantity: String(input.quantity),
    });
    return `${localizedPath(locale, 'calculators/sheet-metal-bend-calculator')}?${params.toString()}`;
  }, [input, locale]);

  return (
    <section className="calculator-section" id="press-brake-tonnage-calculator">
      <div className="shell calculator-grid">
        {/* Left Input Form Panel */}
        <form className="calculator-panel" onSubmit={(e) => e.preventDefault()}>
          <header className="panel-heading">
            <p>{dictionary.calculator.input}</p>
            <h2>{copy.heading}</h2>
          </header>

          {/* Section 1: Units & Material */}
          <div className="form-section">
            <div className="form-title">
              <h3>
                <b>01</b>
                {copy.material}
              </h3>
            </div>

            <div className="fields">
              <SelectField
                label={copy.unit}
                value={input.unit}
                onChange={(val) => handleUnitChange(val as "mm" | "in")}
                options={[
                  { value: "mm", label: copy.unitMetric || "Metric (mm, kN)" },
                  { value: "in", label: copy.unitImperial || "Imperial (in, tons)" },
                ]}
              />

              <SelectField
                label={copy.material}
                value={input.material}
                onChange={(val) => handleMaterialChange(val as PressBrakeMaterial)}
                options={(Object.keys(copy.materialOptions) as PressBrakeMaterial[]).map((key) => ({
                  value: key,
                  label: copy.materialOptions[key],
                }))}
              />

              <div className="field split-field">
                <span>{copy.tensileStrength} ({pressureUnit})</span>
                <div className="kfactor-control-wrap">
                  <input
                    type="number"
                    min={10}
                    max={500000}
                    step={10}
                    value={input.tensileStrength}
                    className="kfactor-input"
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (Number.isFinite(val)) {
                        setInput((prev) => ({
                          ...prev,
                          tensileStrength: Math.max(10, val),
                          customTensile: true,
                          material: prev.material !== "custom" && val !== defaultTensileStrengths[prev.material as Exclude<PressBrakeMaterial, "custom">]?.[prev.unit] ? "custom" : prev.material,
                        }));
                      }
                    }}
                  />
                  <span className="kfactor-badge">
                    {input.customTensile ? copy.customTensile : "Preset"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Bending Parameters */}
          <div className="form-section">
            <div className="form-title">
              <h3>
                <b>02</b>
                {copy.parametersTitle}
              </h3>
            </div>

            <div className="fields">
              <NumberField
                label={copy.thickness}
                value={input.thickness}
                suffix={input.unit}
                min={0.1}
                max={100}
                step={input.unit === "in" ? 0.005 : 0.1}
                stepperStep={input.unit === "in" ? 0.02 : 0.5}
                onChange={(thickness) => setInput((prev) => ({ ...prev, thickness }))}
              />

              <NumberField
                label={copy.bendLength}
                value={input.bendLength}
                suffix={input.unit}
                min={1}
                max={20000}
                step={input.unit === "in" ? 1 : 10}
                stepperStep={input.unit === "in" ? 10 : 100}
                onChange={(bendLength) => setInput((prev) => ({ ...prev, bendLength }))}
              />

              <SelectField
                label={copy.dieOpening}
                value={input.customDieOpening ? "custom" : "auto"}
                onChange={(v) =>
                  setInput((prev) => ({
                    ...prev,
                    customDieOpening: v === "custom",
                    dieOpening: v === "custom" ? (prev.customDieOpening ? prev.dieOpening : result.recommendedDieOpening) : prev.dieOpening,
                  }))
                }
                options={[
                  { value: "auto", label: copy.recommendedDie },
                  { value: "custom", label: copy.customDieOpening },
                ]}
              />

              <NumberField
                label={`${copy.dieOpening} (${input.unit})`}
                value={input.customDieOpening ? input.dieOpening : result.recommendedDieOpening}
                suffix={input.unit}
                min={1}
                max={500}
                step={input.unit === "in" ? 0.05 : 1}
                stepperStep={input.unit === "in" ? 0.25 : 2}
                onChange={(dieOpening) =>
                  setInput((prev) => ({
                    ...prev,
                    dieOpening,
                    customDieOpening: true,
                  }))
                }
              />

              <NumberField
                label={copy.quantity}
                value={input.quantity}
                suffix="pcs"
                min={1}
                max={100000}
                step={1}
                stepperStep={1}
                onChange={(quantity) => setInput((prev) => ({ ...prev, quantity: Math.max(1, quantity) }))}
              />

              <NumberField
                label={copy.safetyFactor}
                value={input.safetyFactor}
                min={1.0}
                max={3.0}
                step={0.1}
                stepperStep={0.1}
                onChange={(safetyFactor) => setInput((prev) => ({ ...prev, safetyFactor }))}
              />
            </div>
          </div>

          {/* Section 3: Quote Details */}
          <div className="form-section">
            <div className="form-title">
              <h3>
                <b>03</b>
                {dictionary.calculator.pdfDetails}
              </h3>
            </div>
            <div className="fields">
              <TextField
                label={dictionary.calculator.companyName}
                value={details.companyName}
                onChange={(companyName) => setDetails((prev) => ({ ...prev, companyName }))}
              />
            </div>
            <div className="optional-toggle">
              <span>{dictionary.calculator.additionalQuoteDetails}</span>
              <label className="switch">
                <input
                  type="checkbox"
                  aria-label={dictionary.calculator.additionalQuoteDetails}
                  checked={detailsEnabled}
                  onChange={(event) => setDetailsEnabled(event.target.checked)}
                />
                <i />
              </label>
            </div>
            {detailsEnabled ? (
              <div className="fields optional-fields">
                <TextField
                  label={dictionary.calculator.companyDetails}
                  value={details.companyDetails}
                  onChange={(companyDetails) => setDetails((prev) => ({ ...prev, companyDetails }))}
                  placeholder="info@example.com"
                />
                <TextField
                  label={dictionary.calculator.customerName}
                  value={details.customerName}
                  onChange={(customerName) => setDetails((prev) => ({ ...prev, customerName }))}
                />
                <TextField
                  label={dictionary.calculator.customerDetails}
                  value={details.customerDetails}
                  onChange={(customerDetails) => setDetails((prev) => ({ ...prev, customerDetails }))}
                />
                <TextField
                  label={dictionary.calculator.quoteNumber}
                  value={details.quoteNumber}
                  onChange={(quoteNumber) => setDetails((prev) => ({ ...prev, quoteNumber }))}
                  placeholder="QT-2026-001"
                />
                <TextField
                  label={dictionary.calculator.validDays}
                  value={details.validDays}
                  onChange={(validDays) => setDetails((prev) => ({ ...prev, validDays }))}
                  placeholder="30"
                />
              </div>
            ) : null}
          </div>
        </form>

        {/* Right Output Panel */}
        <div className="result-column">
          <PressBrakeTonnageVisualizer
            input={input}
            result={result}
            labels={{
              diagramTitle: copy.diagramTitle,
              thickness: copy.thickness,
              bendLength: copy.bendLength,
              dieOpening: copy.dieOpening,
              tonnagePerBend: copy.tonnagePerBend,
              tonnageWithSafety: copy.tonnageWithSafety,
            }}
          />

          {/* Primary Results Card */}
          <section className="result-card" id="tonnage-results">
            <p className="result-label">{copy.tonnageWithSafety}</p>
            <strong className="result-value">
              {result.tonnageWithSafety} <small className="result-unit">{tonUnit}</small>
            </strong>

            <div className="result-metrics bend-metrics-grid">
              <p>
                <span>{copy.tonnagePerBend}</span>
                <strong>
                  {result.tonnagePerBend} {tonUnit}
                </strong>
              </p>
              <p>
                <span>{copy.tonnagePerMeter}</span>
                <strong>
                  {result.tonnagePerMeter} {tonUnit}/{lengthUnit}
                </strong>
              </p>
              <p>
                <span>{copy.recommendedDieOpening}</span>
                <strong className="positive">
                  {result.recommendedDieOpening} {input.unit}
                </strong>
              </p>
              <p>
                <span>{copy.minimumFlange}</span>
                <strong>
                  {result.minimumFlange} {input.unit}
                </strong>
              </p>
              <p>
                <span>{copy.insideBendRadius}</span>
                <strong>
                  {result.insideBendRadius} {input.unit}
                </strong>
              </p>
            </div>

            <p className="field-hint" style={{ marginTop: "1rem", color: "var(--color-danger)" }}>
              {copy.capacityWarning}
            </p>

            <div className="result-actions">
              <button className="button primary" type="button" onClick={handlePrint}>
                <Download aria-hidden="true" />
                {quoteActions.printOrSavePdf}
              </button>
              <button className="button" type="button" onClick={handleExportCsv}>
                <FileSpreadsheet aria-hidden="true" />
                {dictionary.calculator.exportCsv}
              </button>
              <button className="button" type="button" onClick={handleCopySummary}>
                <Copy aria-hidden="true" />
                {dictionary.calculator.copySummary}
              </button>
            </div>
          </section>

          {/* Ecosystem Bridge */}
          <Link href={bendHref} className="laser-bridge-card">
            <div className="laser-bridge-icon">
              <Sparkles aria-hidden="true" />
            </div>
            <div className="laser-bridge-copy">
              <h4>{copy.sendToBendCalc}</h4>
              <p>{copy.bendCalcHint}</p>
            </div>
            <span className="laser-bridge-btn">
              <ArrowRight aria-hidden="true" />
            </span>
          </Link>

          {/* Detailed Breakdown */}
          <section className="breakdown-panel">
            <h2>{copy.resultsTitle}</h2>
            <div className="breakdown-row">
              <span>{copy.dieOpeningUsed}</span>
              <strong>{result.dieOpeningUsed} {input.unit}</strong>
            </div>
            <p className="field-hint" style={{ marginTop: "0.75rem", fontSize: "0.8125rem" }}>
              {copy.formulaNote}
            </p>
          </section>
        </div>
      </div>

      {toast ? (
        <div className="toast" role="status" aria-live="polite" onAnimationEnd={() => setToast("")}>
          {toast}
        </div>
      ) : null}
      {printing
        ? createPortal(
            <PressBrakeTonnageQuoteDocument
              locale={locale}
              dictionary={dictionary}
              details={details}
              detailsEnabled={detailsEnabled}
              input={input}
              result={result}
              className="print-document"
            />,
            document.body,
          )
        : null}
    </section>
  );
}
