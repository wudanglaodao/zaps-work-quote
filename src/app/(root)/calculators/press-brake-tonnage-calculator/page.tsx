import type { Metadata } from "next";
import { PressBrakeTonnageView } from "@/components/press-brake-tonnage-view";
import { getPressBrakeTonnageCopy } from "@/lib/i18n/press-brake-tonnage";
import { buildMetadata } from "@/lib/seo";

const path = "calculators/press-brake-tonnage-calculator";

export function generateMetadata(): Metadata {
  const copy = getPressBrakeTonnageCopy("en");
  return buildMetadata({ locale: "en", path, title: copy.title, description: copy.description });
}

export default function PressBrakeTonnageRootPage() {
  return <PressBrakeTonnageView locale="en" />;
}
