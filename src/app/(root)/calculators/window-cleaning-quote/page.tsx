import type { Metadata } from "next";
import { PanelsTopLeft } from "lucide-react";
import { NewToolPage } from "@/components/new-tool-page";
import { getNewToolCopy } from "@/lib/i18n/new-tools";
import { buildMetadata } from "@/lib/seo";

const copy = getNewToolCopy("en", "window-cleaning");
export const metadata: Metadata = buildMetadata({ locale: "en", path: "calculators/window-cleaning-quote", title: copy.title, description: copy.description });

export default function Page() {
  return <NewToolPage kind="window-cleaning" locale="en" path="calculators/window-cleaning-quote" guidePath="guides/how-to-price-window-cleaning-jobs" Icon={PanelsTopLeft} />;
}
