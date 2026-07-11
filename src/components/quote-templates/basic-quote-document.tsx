export type BasicQuoteDetails = {
  companyName: string;
  companyDetails: string;
  customerName: string;
  customerDetails: string;
  quoteNumber: string;
  validity: string;
};

export type BasicQuoteLabels = {
  quote: string;
  date: string;
  preparedFor: string;
  project: string;
  description: string;
  qty: string;
  unitPrice: string;
  amount: string;
  subtotal: string;
  tax: string;
  total: string;
};

export type BasicQuoteLine = {
  id: string;
  description: string;
  detail?: string;
  quantity?: string | number;
  unitPrice?: string;
  amount: string;
};

export type BasicQuoteDocumentProps = {
  labels: BasicQuoteLabels;
  details: BasicQuoteDetails;
  detailsEnabled: boolean;
  project: string;
  dateText: string;
  lines: BasicQuoteLine[];
  subtotal: string;
  tax?: string;
  total: string;
  notes?: Array<{ label: string; value: string }>;
  className?: string;
};

export function BasicQuoteDocument({ labels, details, detailsEnabled, project, dateText, lines, subtotal, tax, total, notes = [], className = "" }: BasicQuoteDocumentProps) {
  const hasCustomer = detailsEnabled && Boolean(details.customerName || details.customerDetails);
  return <article className={`quote-document ${className}`}>
    <header className="quote-head"><div><h2>{labels.quote}</h2><p>{dateText}</p>{detailsEnabled && details.quoteNumber ? <p>{details.quoteNumber}</p> : null}</div><div className="quote-company"><strong>{details.companyName}</strong>{detailsEnabled && details.companyDetails ? <span>{details.companyDetails}</span> : null}</div></header>
    <section className={`quote-parties ${hasCustomer ? "" : "single"}`}>
      {hasCustomer ? <div><small>{labels.preparedFor}</small>{details.customerName ? <strong>{details.customerName}</strong> : null}{details.customerDetails ? <span>{details.customerDetails}</span> : null}</div> : null}
      <div><small>{labels.project}</small><strong>{project}</strong></div>
    </section>
    <div className="quote-columns"><span>{labels.description}</span><span>{labels.qty}</span><span>{labels.unitPrice}</span><span>{labels.amount}</span></div>
    <div className="quote-lines">{lines.map((line) => <div className="quote-line" key={line.id}><span><strong>{line.description}</strong>{line.detail ? <small>{line.detail}</small> : null}</span><span>{line.quantity ?? ""}</span><span>{line.unitPrice ?? ""}</span><span>{line.amount}</span></div>)}</div>
    {notes.length ? <div className="quote-notes">{notes.map((note) => <p key={note.label}><strong>{note.label}</strong><span>{note.value}</span></p>)}</div> : null}
    <div className="quote-summary"><p><span>{labels.subtotal}</span><strong>{subtotal}</strong></p>{tax ? <p><span>{labels.tax}</span><strong>{tax}</strong></p> : null}<p className="quote-total"><span>{labels.total}</span><strong>{total}</strong></p></div>
    {details.companyName || details.validity ? <footer className="quote-footer"><span>{details.validity}</span><span>{details.companyName}</span></footer> : null}
  </article>;
}
