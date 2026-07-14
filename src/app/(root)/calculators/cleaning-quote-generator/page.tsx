import type { Metadata } from "next";
import { CleaningView } from "@/app/[locale]/calculators/cleaning-quote-generator/page";
import { getCleaningCopy } from "@/lib/i18n/cleaning";
import { buildMetadata } from "@/lib/seo";

const copy = getCleaningCopy("en");
export const metadata: Metadata = buildMetadata({ locale: "en", path: "calculators/cleaning-quote-generator", title: copy.title, description: copy.description });
export default function Page() { return <CleaningView locale="en" />; }
