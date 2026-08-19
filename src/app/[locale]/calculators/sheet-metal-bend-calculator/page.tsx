import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SheetMetalBendView } from "@/components/sheet-metal-bend-view";
import { isLocale } from "@/lib/i18n/config";
import { getSheetMetalBendCopy } from "@/lib/i18n/sheet-metal-bend";
import { buildMetadata } from "@/lib/seo";

const path = "calculators/sheet-metal-bend-calculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const copy = getSheetMetalBendCopy(rawLocale);
  return buildMetadata({ locale: rawLocale, path, title: copy.title, description: copy.description });
}

export default async function SheetMetalBendPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/calculators/sheet-metal-bend-calculator");
  return <SheetMetalBendView locale={rawLocale} />;
}
