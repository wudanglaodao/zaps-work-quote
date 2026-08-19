import type { Metadata } from "next";
import { LaserCuttingView } from "@/components/laser-cutting-view";
import { getLaserCuttingCopy } from "@/lib/i18n/laser-cutting";
import { buildMetadata } from "@/lib/seo";

const path = "calculators/laser-cutting-cost-calculator";

export function generateMetadata(): Metadata {
  const copy = getLaserCuttingCopy("en");
  return buildMetadata({ locale: "en", path, title: copy.title, description: copy.description });
}

export default function LaserCuttingRootPage() {
  return <LaserCuttingView locale="en" />;
}
