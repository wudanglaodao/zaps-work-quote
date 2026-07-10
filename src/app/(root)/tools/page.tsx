import type { Metadata } from "next";
import { ToolsView } from "@/app/[locale]/tools/page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ locale: "en", path: "tools", title: "Free Cost Calculators & Quote Tools | zaps.work", description: "Browse free calculators for fabrication and service quotes." });

export default function ToolsPage() {
  return <ToolsView locale="en" />;
}
