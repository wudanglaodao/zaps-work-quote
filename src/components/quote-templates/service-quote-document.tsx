import { BasicQuoteDocument, type BasicQuoteDetails, type BasicQuoteLabels, type BasicQuoteLine } from "./basic-quote-document";

export type ServiceQuoteDocumentProps = {
  labels: BasicQuoteLabels;
  details: BasicQuoteDetails;
  detailsEnabled: boolean;
  serviceName: string;
  dateText: string;
  lines: BasicQuoteLine[];
  subtotal: string;
  tax?: string;
  total: string;
  notes?: Array<{ label: string; value: string }>;
  className?: string;
};

export function ServiceQuoteDocument({ serviceName, ...props }: ServiceQuoteDocumentProps) {
  return <BasicQuoteDocument {...props} project={serviceName} />;
}
