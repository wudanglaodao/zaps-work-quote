import type { Metadata } from "next";
import { BriefcaseBusiness } from "lucide-react";
import { NewToolPage } from "@/components/new-tool-page";
import { getNewToolCopy } from "@/lib/i18n/new-tools";
import { buildMetadata } from "@/lib/seo";
const copy = getNewToolCopy("en", "freelance"); export const metadata: Metadata = buildMetadata({ locale: "en", path: "tools/freelance-job-quote", title: copy.title, description: copy.description });
export default function Page() { return <NewToolPage kind="freelance" locale="en" path="tools/freelance-job-quote" guidePath="guides/how-to-price-freelance-projects" Icon={BriefcaseBusiness} />; }
