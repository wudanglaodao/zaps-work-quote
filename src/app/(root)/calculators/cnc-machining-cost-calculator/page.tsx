import type { Metadata } from "next";
import { Cpu } from "lucide-react";
import { NewToolPage } from "@/components/new-tool-page";
import { getNewToolCopy } from "@/lib/i18n/new-tools";
import { buildMetadata } from "@/lib/seo";
const copy = getNewToolCopy("en", "cnc"); export const metadata: Metadata = buildMetadata({ locale: "en", path: "calculators/cnc-machining-cost-calculator", title: copy.title, description: copy.description });
export default function Page() { return <NewToolPage kind="cnc" locale="en" path="calculators/cnc-machining-cost-calculator" guidePath="guides/how-to-price-cnc-machining" Icon={Cpu} />; }
