import type { Metadata } from "next";
import { ThreeDPrintView } from "@/components/three-d-print-view";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

const dictionary = getDictionary("en");

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "calculators/3d-print-cost-calculator",
  title: dictionary.tool.title,
  description: dictionary.tool.description,
});

export default function ThreeDPrintRootPage() {
  return <ThreeDPrintView locale="en" />;
}
