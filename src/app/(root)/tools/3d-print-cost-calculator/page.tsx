import type { Metadata } from "next";
import { ThreeDPrintView } from "@/app/[locale]/tools/3d-print-cost-calculator/page";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

const dictionary = getDictionary("en");

export const metadata: Metadata = buildMetadata({ locale: "en", path: "tools/3d-print-cost-calculator", title: dictionary.tool.title, description: dictionary.tool.description });

export default function ThreeDPrintPage() {
  return <ThreeDPrintView locale="en" />;
}
