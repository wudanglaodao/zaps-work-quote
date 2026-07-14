import type { Metadata } from "next";
import { HousePaintingView } from "@/app/[locale]/calculators/house-painting-quote/page";
import { getHousePaintingCopy } from "@/lib/i18n/house-painting";
import { buildMetadata } from "@/lib/seo";

const copy = getHousePaintingCopy("en");
export const metadata: Metadata = buildMetadata({ locale: "en", path: "calculators/house-painting-quote", title: copy.title, description: copy.description });

export default function HousePaintingPage() { return <HousePaintingView locale="en" />; }
