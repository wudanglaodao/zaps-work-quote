"use client";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { PressBrakeTonnageInput, PressBrakeTonnageResult } from "@/lib/calculators/press-brake-tonnage";
import { getPressBrakeTonnageCopy } from "@/lib/i18n/press-brake-tonnage";

export type QuoteDetails = {
  companyName: string;
  companyDetails: string;
  customerName: string;
  customerDetails: string;
  quoteNumber: string;
  validDays: string;
};

export function PressBrakeTonnageQuoteDocument({
  locale,
  dictionary,
  details,
  detailsEnabled,
  input,
  result,
  className = "",
}: {
  locale: Locale;
  dictionary: Dictionary;
  details: QuoteDetails;
  detailsEnabled: boolean;
  input: PressBrakeTonnageInput;
  result: PressBrakeTonnageResult;
  className?: string;
}) {
  const copy = getPressBrakeTonnageCopy(locale);
  const t = dictionary.calculator;
  const dateText = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date());
  const validity =
    detailsEnabled && Number(details.validDays) > 0
      ? t.validFor.replace("{days}", String(Math.round(Number(details.validDays))))
      : "";
  const hasCustomer = detailsEnabled && Boolean(details.customerName || details.customerDetails);

  const tonUnit = input.unit === "mm" ? "ton" : "US ton";
  const lengthUnit = input.unit === "mm" ? "m" : "ft";
  const pressureUnit = input.unit === "mm" ? "MPa" : "PSI";

  return (
    <article className={`quote-document press-brake-quote-doc ${className}`}>
      <header className="quote-head">
        <div>
          <h2>{copy.heading}</h2>
          <p>{dateText}</p>
          {detailsEnabled && details.quoteNumber ? <p>{details.quoteNumber}</p> : null}
        </div>
        <div className="quote-company">
          <strong>{details.companyName || "zaps.work"}</strong>
          {detailsEnabled && details.companyDetails ? (
            <span>{details.companyDetails}</span>
          ) : (
            <span>Press Brake Bending Specification</span>
          )}
        </div>
      </header>

      <section className={`quote-parties ${hasCustomer ? "" : "single"}`}>
        {hasCustomer ? (
          <div>
            <small>{t.preparedFor}</small>
            {details.customerName ? <strong>{details.customerName}</strong> : null}
            {details.customerDetails ? <span>{details.customerDetails}</span> : null}
          </div>
        ) : null}
        <div>
          <small>{t.project}</small>
          <strong>
            {copy.parametersTitle} · {copy.materialOptions[input.material]}
          </strong>
        </div>
      </section>

      <div className="quote-columns">
        <span>{t.description}</span>
        <span>{t.qty}</span>
        <span>Unit</span>
        <span>Remark / Formula</span>
      </div>

      <div className="quote-lines">
        <div className="quote-line">
          <span>
            <strong>{copy.material}</strong>
          </span>
          <span>{input.quantity} pcs</span>
          <span>-</span>
          <span>{input.tensileStrength} {pressureUnit} UTS</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.thickness}</strong>
          </span>
          <span>{input.thickness}</span>
          <span>{input.unit}</span>
          <span>Material Thickness</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.bendLength}</strong>
          </span>
          <span>{input.bendLength}</span>
          <span>{input.unit}</span>
          <span>Bend Length (L)</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.dieOpening}</strong>
          </span>
          <span>{input.customDieOpening ? input.dieOpening : result.recommendedDieOpening}</span>
          <span>{input.unit}</span>
          <span>V-Die Opening</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.safetyFactor}</strong>
          </span>
          <span>{input.safetyFactor}</span>
          <span>-</span>
          <span>Safety Multiplier</span>
        </div>
        
        <div className="quote-line">
          <span>
            <strong>{copy.tonnagePerBend}</strong>
          </span>
          <span>{result.tonnagePerBend}</span>
          <span>{tonUnit}</span>
          <span>Base Bending Force</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.tonnagePerMeter}</strong>
          </span>
          <span>{result.tonnagePerMeter}</span>
          <span>{tonUnit}/{lengthUnit}</span>
          <span>Force / Unit Length</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.minimumFlange}</strong>
          </span>
          <span>{result.minimumFlange}</span>
          <span>{input.unit}</span>
          <span>Min Flange Length</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.insideBendRadius}</strong>
          </span>
          <span>{result.insideBendRadius}</span>
          <span>{input.unit}</span>
          <span>Est. Inside Radius</span>
        </div>
      </div>

      <div className="quote-notes">
        <p style={{ color: "var(--color-danger)" }}>
          <strong>{copy.capacityWarning}</strong>
        </p>
        <p>
          <strong>{copy.formulaNote}</strong>
        </p>
      </div>

      <div className="quote-summary">
        <p className="quote-total">
          <span>{copy.tonnageWithSafety}</span>
          <strong>
            {result.tonnageWithSafety} {tonUnit}
          </strong>
        </p>
      </div>

      <footer className="quote-footer">
        <span>{validity || "Generated by zaps.work Tonnage Calculator"}</span>
        <span>{details.companyName || "zaps.work"}</span>
      </footer>
    </article>
  );
}
