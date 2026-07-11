import type { Metadata } from "next";
import { LaserCuttingView } from "@/app/[locale]/tools/laser-cutting-cost-calculator/page";
import { getLaserCuttingCopy } from "@/lib/i18n/laser-cutting";
import { buildMetadata } from "@/lib/seo";

const copy = getLaserCuttingCopy("en");

export const metadata: Metadata = buildMetadata({ locale: "en", path: "tools/laser-cutting-cost-calculator", title: copy.title, description: copy.description });

export default function LaserCuttingPage() {
  return <LaserCuttingView locale="en" />;
}
