import type { Metadata } from "next";
import { PressureWashingView } from "@/app/[locale]/tools/pressure-washing-quote/page";
import { getPressureWashingCopy } from "@/lib/i18n/pressure-washing";
import { buildMetadata } from "@/lib/seo";

const copy = getPressureWashingCopy("en");

export const metadata: Metadata = buildMetadata({ locale: "en", path: "tools/pressure-washing-quote", title: copy.title, description: copy.description });

export default function PressureWashingPage() {
  return <PressureWashingView locale="en" />;
}
