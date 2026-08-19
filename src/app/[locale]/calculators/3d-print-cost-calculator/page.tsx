import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ThreeDPrintView } from "@/components/three-d-print-view";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

const path = "calculators/3d-print-cost-calculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return buildMetadata({ locale, path, title: dictionary.tool.title, description: dictionary.tool.description });
}

export default async function ThreeDPrintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/calculators/3d-print-cost-calculator");
  return <ThreeDPrintView locale={rawLocale} />;
}
