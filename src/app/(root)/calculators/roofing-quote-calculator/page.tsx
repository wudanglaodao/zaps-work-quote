import type { Metadata } from "next";
import { RoofingView } from "@/app/[locale]/calculators/roofing-quote-calculator/page";
import { getRoofingCopy } from "@/lib/i18n/roofing";
import { buildMetadata } from "@/lib/seo";

const copy = getRoofingCopy("en");

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "calculators/roofing-quote-calculator",
  title: copy.title,
  description: copy.description,
});

export default function RoofingPage() {
  return <RoofingView locale="en" />;
}
