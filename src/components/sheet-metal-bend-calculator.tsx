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
  calculateSheetMetalBend,
  convertSheetMetalBendUnit,
  createDefaultSheetMetalBendInput,
  defaultKFactors,
  type SheetMetalBendInput,
  type SheetMetalMaterial,
} from "@/lib/calculators/sheet-metal-bend";
import { getSheetMetalBendCopy } from "@/lib/i18n/sheet-metal-bend";
import { createBasicQuoteCsv } from "@/lib/quotes/basic-csv";
import { SheetMetalBendVisualizer } from "./sheet-metal-bend-visualizer";
import { SheetMetalBendQuoteDocument, type QuoteDetails } from "./sheet-metal-bend-quote-document";

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

export function SheetMetalBendCalculator({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const copy = getSheetMetalBendCopy(locale);
  const quoteActions = getQuoteActionLabels(locale);
  const [input, setInput] = useState<SheetMetalBendInput>(createDefaultSheetMetalBendInput);
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

  const result = useMemo(() => calculateSheetMetalBend(input), [input]);

  const handleUnitChange = (newUnit: "mm" | "in") => {
    setInput((prev) => convertSheetMetalBendUnit(prev, newUnit));
  };

  const handleMaterialChange = (material: SheetMetalMaterial) => {
    setInput((prev) => ({
      ...prev,
      material,
      kFactor: defaultKFactors[material],
      customKFactor: material === "custom",
    }));
  };

  const handleCopySummary = async () => {
    const summaryText = `${copy.heading} - ${details.companyName || "zaps.work"}
----------------------------------------
${detailsEnabled && details.customerName ? `${dictionary.calculator.customerName}: ${details.customerName}\n` : ""}${detailsEnabled && details.quoteNumber ? `${dictionary.calculator.quoteNumber}: ${details.quoteNumber}\n` : ""}${copy.material}: ${copy.materialOptions[input.material]}
${copy.kFactor}: ${result.kFactor}
${copy.thickness}: ${input.thickness} ${input.unit}
${copy.insideRadius}: ${input.insideRadius} ${input.unit}
${copy.bendAngle}: ${input.bendAngle}°
${copy.flangeA}: ${input.flangeA} ${input.unit}
${copy.flangeB}: ${input.flangeB} ${input.unit}
${copy.quantity}: ${input.quantity}
----------------------------------------
👉 ${copy.flatLength}: ${result.flatLengthSingle} ${input.unit}
👉 ${copy.bendDeduction} (BD): ${result.bendDeduction} ${input.unit}
👉 ${copy.bendAllowance} (BA): ${result.bendAllowance} ${input.unit}
👉 ${copy.setback} (OSSB): ${result.setback} ${input.unit}
${input.quantity > 1 ? `👉 ${copy.totalFlatLength}: ${result.flatLengthTotal} ${input.unit}\n` : ""}`;

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
      copy.kFactor,
      copy.thickness,
      copy.insideRadius,
      copy.bendAngle,
      copy.flangeA,
      copy.flangeB,
      copy.quantity,
      copy.flatLength,
      copy.bendDeduction,
      copy.bendAllowance,
      copy.setback,
      copy.totalFlatLength,
    ];

    const rows: unknown[][] = [
      [
        details.companyName || "zaps.work",
        detailsEnabled ? details.quoteNumber : "",
        detailsEnabled ? details.customerName : "",
        copy.materialOptions[input.material],
        result.kFactor,
        `${input.thickness} ${input.unit}`,
        `${input.insideRadius} ${input.unit}`,
        `${input.bendAngle}°`,
        `${input.flangeA} ${input.unit}`,
        `${input.flangeB} ${input.unit}`,
        input.quantity,
        `${result.flatLengthSingle} ${input.unit}`,
        `${result.bendDeduction} ${input.unit}`,
        `${result.bendAllowance} ${input.unit}`,
        `${result.setback} ${input.unit}`,
        `${result.flatLengthTotal} ${input.unit}`,
      ],
    ];

    const summaryRows: unknown[][] = [
      ["", "", "", "", "", "", "", "", "", "", "", copy.flatLength, `${result.flatLengthSingle} ${input.unit}`],
    ];

    const csv = createBasicQuoteCsv({ headers, rows, summaryRows });
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    const filePrefix = detailsEnabled && details.quoteNumber ? details.quoteNumber.trim() : "sheet-metal-bend";
    link.download = `${filePrefix}-${date}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setToast(dictionary.calculator.csvExported);
  };

  const handlePrint = () => {
    setPrinting(true);
    window.setTimeout(() => window.print(), 50);
  };

  const laserHref = useMemo(() => {
    const laserMaterial =
      input.material === "stainlessSteel"
        ? "stainlessSteel"
        : input.material === "aluminum"
        ? "aluminum"
        : "mildSteel";

    const flatL = result.flatLengthSingle;
    const estWidth = Math.max(50, Number((flatL * 0.5).toFixed(1)));
    const cutLen = Number(((flatL + estWidth) * 2).toFixed(1));
    const area =
      input.unit === "in"
        ? Number(((flatL * estWidth) / 144).toFixed(3))
        : Number(((flatL * estWidth) / 1_000_000).toFixed(4));

    const params = new URLSearchParams({
      material: laserMaterial,
      thickness: String(input.thickness),
      unit: input.unit,
      quantity: String(input.quantity),
      cutLength: String(cutLen),
      area: String(area),
    });

    return `${localizedPath(locale, "calculators/laser-cutting-cost-calculator")}?${params.toString()}`;
  }, [input, result, locale]);

  return (
    <section className="calculator-section" id="sheet-metal-calculator">
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
              {/* Unit System Select Dropdown */}
              <SelectField
                label={copy.unit}
                value={input.unit}
                onChange={(val) => handleUnitChange(val as "mm" | "in")}
                options={[
                  { value: "mm", label: copy.unitMetric || "Metric (mm)" },
                  { value: "in", label: copy.unitImperial || "Imperial (in)" },
                ]}
              />

              {/* Material Dropdown */}
              <SelectField
                label={copy.material}
                value={input.material}
                onChange={(val) => handleMaterialChange(val as SheetMetalMaterial)}
                options={(Object.keys(copy.materialOptions) as SheetMetalMaterial[]).map((key) => ({
                  value: key,
                  label: copy.materialOptions[key],
                }))}
              />

              {/* K-Factor adjustment */}
              <div className="field split-field">
                <span>{copy.kFactor}</span>
                <div className="kfactor-control-wrap">
                  <input
                    type="number"
                    min={0.1}
                    max={0.9}
                    step={0.01}
                    value={input.kFactor}
                    className="kfactor-input"
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (Number.isFinite(val)) {
                        setInput((prev) => ({
                          ...prev,
                          kFactor: Math.min(0.9, Math.max(0.1, val)),
                          customKFactor: true,
                        }));
                      }
                    }}
                  />
                  <span className="kfactor-badge">
                    {input.customKFactor ? copy.customKFactor : "Preset"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Bend Geometry */}
          <div className="form-section">
            <div className="form-title">
              <h3>
                <b>02</b>
                {copy.parametersTitle}
              </h3>
            </div>

            <div className="fields">
              {/* Sheet Thickness T */}
              <NumberField
                label={copy.thickness}
                value={input.thickness}
                suffix={input.unit}
                min={0.01}
                max={200}
                step={input.unit === "in" ? 0.005 : 0.1}
                stepperStep={input.unit === "in" ? 0.02 : 0.5}
                onChange={(thickness) => setInput((prev) => ({ ...prev, thickness }))}
              />

              {/* Inside Radius R */}
              <NumberField
                label={copy.insideRadius}
                value={input.insideRadius}
                suffix={input.unit}
                min={0.01}
                max={500}
                step={input.unit === "in" ? 0.005 : 0.1}
                stepperStep={input.unit === "in" ? 0.02 : 0.5}
                onChange={(insideRadius) => setInput((prev) => ({ ...prev, insideRadius }))}
              />

              {/* Bend Angle with Slider */}
              <div className="field angle-slider-field">
                <div className="angle-slider-header">
                  <span>{copy.bendAngle}</span>
                  <strong>{input.bendAngle}°</strong>
                </div>
                <div className="angle-slider-controls">
                  <input
                    type="range"
                    min={1}
                    max={179}
                    step={1}
                    value={input.bendAngle}
                    className="slider-input"
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setInput((prev) => ({ ...prev, bendAngle: v }));
                    }}
                  />
                  <div className="quick-angle-buttons">
                    {[30, 45, 60, 90, 120, 135].map((ang) => (
                      <button
                        type="button"
                        key={ang}
                        className={`angle-btn ${input.bendAngle === ang ? "active" : ""}`}
                        onClick={() => setInput((prev) => ({ ...prev, bendAngle: ang }))}
                      >
                        {ang}°
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flange A */}
              <NumberField
                label={copy.flangeA}
                value={input.flangeA}
                suffix={input.unit}
                min={0.01}
                max={50000}
                step={input.unit === "in" ? 0.05 : 1}
                stepperStep={input.unit === "in" ? 0.25 : 5}
                onChange={(flangeA) => setInput((prev) => ({ ...prev, flangeA }))}
              />

              {/* Flange B */}
              <NumberField
                label={copy.flangeB}
                value={input.flangeB}
                suffix={input.unit}
                min={0.01}
                max={50000}
                step={input.unit === "in" ? 0.05 : 1}
                stepperStep={input.unit === "in" ? 0.25 : 5}
                onChange={(flangeB) => setInput((prev) => ({ ...prev, flangeB }))}
              />

              {/* Quantity */}
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
          {/* Dynamic 2D SVG Cross-Section Preview */}
          <SheetMetalBendVisualizer
            input={input}
            result={result}
            labels={{
              diagramTitle: copy.diagramTitle,
              neutralAxisLegend: copy.neutralAxisLegend,
              flangeA: copy.flangeA,
              flangeB: copy.flangeB,
              thickness: copy.thickness,
              insideRadius: copy.insideRadius,
              bendAngle: copy.bendAngle,
              flatLength: copy.flatLength,
            }}
          />

          {/* Primary Results Card */}
          <section className="result-card" id="bend-results">
            <p className="result-label">{copy.flatLength}</p>
            <strong className="result-value">
              {result.flatLengthSingle} <small className="result-unit">{input.unit}</small>
            </strong>

            <div className="result-metrics bend-metrics-grid">
              <p>
                <span>{copy.bendDeduction}</span>
                <strong className="positive">
                  {result.bendDeduction} {input.unit}
                </strong>
              </p>
              <p>
                <span>{copy.bendAllowance}</span>
                <strong>
                  {result.bendAllowance} {input.unit}
                </strong>
              </p>
              <p>
                <span>{copy.setback}</span>
                <strong>
                  {result.setback} {input.unit}
                </strong>
              </p>
            </div>

            {input.quantity > 1 && (
              <div className="batch-total-row">
                <span>{copy.totalFlatLength} ({input.quantity} pcs)</span>
                <strong>{result.flatLengthTotal} {input.unit}</strong>
              </div>
            )}

            {/* Action Buttons: 3 in a row matching official style */}
            <div className="result-actions">
              <button
                className="button primary"
                type="button"
                onClick={handlePrint}
              >
                <Download aria-hidden="true" />
                {quoteActions.printOrSavePdf}
              </button>
              <button
                className="button"
                type="button"
                onClick={handleExportCsv}
              >
                <FileSpreadsheet aria-hidden="true" />
                {dictionary.calculator.exportCsv}
              </button>
              <button
                className="button"
                type="button"
                onClick={handleCopySummary}
              >
                <Copy aria-hidden="true" />
                {dictionary.calculator.copySummary}
              </button>
            </div>
          </section>

          {/* Ecosystem Bridge: Link directly to Laser Cutting Quote */}
          <Link href={laserHref} className="laser-bridge-card">
            <div className="laser-bridge-icon">
              <Sparkles aria-hidden="true" />
            </div>
            <div className="laser-bridge-copy">
              <h4>{copy.sendToLaser}</h4>
              <p>{copy.laserLinkHint}</p>
            </div>
            <span className="laser-bridge-btn">
              <ArrowRight aria-hidden="true" />
            </span>
          </Link>

          {/* Detailed Engineering Parameters */}
          <section className="breakdown-panel">
            <h2>{copy.resultsTitle}</h2>
            <div className="breakdown-row">
              <span>{copy.kFactor}</span>
              <strong>{result.kFactor}</strong>
            </div>
            <div className="breakdown-row">
              <span>{copy.neutralAxis}</span>
              <strong>{result.neutralAxisRadius} {input.unit}</strong>
            </div>
            <div className="breakdown-row">
              <span>{copy.innerArc}</span>
              <strong>{result.innerArcLength} {input.unit}</strong>
            </div>
            <div className="breakdown-row">
              <span>{copy.outerArc}</span>
              <strong>{result.outerArcLength} {input.unit}</strong>
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
            <SheetMetalBendQuoteDocument
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
