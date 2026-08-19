import type { Metadata } from "next";
import { SheetMetalBendView } from "@/components/sheet-metal-bend-view";
import { getSheetMetalBendCopy } from "@/lib/i18n/sheet-metal-bend";
import { buildMetadata } from "@/lib/seo";

const path = "calculators/sheet-metal-bend-calculator";

export function generateMetadata(): Metadata {
  const copy = getSheetMetalBendCopy("en");
  return buildMetadata({ locale: "en", path, title: copy.title, description: copy.description });
}

export default function SheetMetalBendRootPage() {
  return <SheetMetalBendView locale="en" />;
}
