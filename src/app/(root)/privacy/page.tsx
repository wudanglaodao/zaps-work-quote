import type { Metadata } from "next";
import { PrivacyView } from "@/app/[locale]/privacy/page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ locale: "en", path: "privacy", title: "Privacy | LOEME Quote", description: "How LOEME Quote handles calculator and analytics data." });

export default function PrivacyPage() {
  return <PrivacyView locale="en" />;
}
