import type { Metadata } from "next";
import { Sprout } from "lucide-react";
import { NewToolPage } from "@/components/new-tool-page";
import { getNewToolCopy } from "@/lib/i18n/new-tools";
import { buildMetadata } from "@/lib/seo";
const copy = getNewToolCopy("en", "lawn-care"); export const metadata: Metadata = buildMetadata({ locale: "en", path: "calculators/lawn-care-quote", title: copy.title, description: copy.description });
export default function Page() { return <NewToolPage kind="lawn-care" locale="en" path="calculators/lawn-care-quote" guidePath="guides/how-to-price-lawn-care-services" Icon={Sprout} />; }
