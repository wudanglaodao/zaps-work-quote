import type { Metadata } from "next";
import { guidesIndexCopy } from "@/lib/guides/ui";
import { buildMetadata } from "@/lib/seo";
import { GuidesView } from "@/components/guides-view";

const englishCopy = guidesIndexCopy.en;
export const metadata: Metadata = buildMetadata({ locale: "en", path: "guides", title: englishCopy.metadataTitle, description: englishCopy.metadataDescription });

export default function GuidesPage() { return <GuidesView locale="en" />; }
