"use client";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { SheetMetalBendInput, SheetMetalBendResult } from "@/lib/calculators/sheet-metal-bend";
import { getSheetMetalBendCopy } from "@/lib/i18n/sheet-metal-bend";

export type QuoteDetails = {
  companyName: string;
  companyDetails: string;
  customerName: string;
  customerDetails: string;
  quoteNumber: string;
  validDays: string;
};

export function SheetMetalBendQuoteDocument({
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
  input: SheetMetalBendInput;
  result: SheetMetalBendResult;
  className?: string;
}) {
  const copy = getSheetMetalBendCopy(locale);
  const t = dictionary.calculator;
  const dateText = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date());
  const validity =
    detailsEnabled && Number(details.validDays) > 0
      ? t.validFor.replace("{days}", String(Math.round(Number(details.validDays))))
      : "";
  const hasCustomer = detailsEnabled && Boolean(details.customerName || details.customerDetails);

  return (
    <article className={`quote-document sheet-metal-quote-doc ${className}`}>
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
            <span>Sheet Metal Fabrication Specification</span>
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
          <span>K = {result.kFactor}</span>
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
            <strong>{copy.insideRadius}</strong>
          </span>
          <span>{input.insideRadius}</span>
          <span>{input.unit}</span>
          <span>Inside Radius</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.bendAngle}</strong>
          </span>
          <span>{input.bendAngle}</span>
          <span>°</span>
          <span>Included Angle</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.flangeA}</strong>
          </span>
          <span>{input.flangeA}</span>
          <span>{input.unit}</span>
          <span>Outer Leg A</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.flangeB}</strong>
          </span>
          <span>{input.flangeB}</span>
          <span>{input.unit}</span>
          <span>Outer Leg B</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.bendDeduction}</strong>
          </span>
          <span>{result.bendDeduction}</span>
          <span>{input.unit}</span>
          <span>2 × OSSB - BA</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.bendAllowance}</strong>
          </span>
          <span>{result.bendAllowance}</span>
          <span>{input.unit}</span>
          <span>Neutral Arc (BA)</span>
        </div>
        <div className="quote-line">
          <span>
            <strong>{copy.setback}</strong>
          </span>
          <span>{result.setback}</span>
          <span>{input.unit}</span>
          <span>tan(θ/2) × (R + T)</span>
        </div>
      </div>

      <div className="quote-notes">
        <p>
          <strong>{copy.formulaNote}</strong>
        </p>
      </div>

      <div className="quote-summary">
        {input.quantity > 1 ? (
          <>
            <p>
              <span>{copy.flatLength} (1 pc)</span>
              <strong>
                {result.flatLengthSingle} {input.unit}
              </strong>
            </p>
            <p className="quote-total">
              <span>
                {copy.totalFlatLength} ({input.quantity} pcs)
              </span>
              <strong>
                {result.flatLengthTotal} {input.unit}
              </strong>
            </p>
          </>
        ) : (
          <p className="quote-total">
            <span>{copy.flatLength}</span>
            <strong>
              {result.flatLengthSingle} {input.unit}
            </strong>
          </p>
        )}
      </div>

      <footer className="quote-footer">
        <span>{validity || "Generated by zaps.work Sheet Metal Calculator"}</span>
        <span>{details.companyName || "zaps.work"}</span>
      </footer>
    </article>
  );
}
