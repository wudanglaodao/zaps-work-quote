import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PressBrakeTonnageView } from "@/components/press-brake-tonnage-view";
import { isLocale } from "@/lib/i18n/config";
import { getPressBrakeTonnageCopy } from "@/lib/i18n/press-brake-tonnage";
import { buildMetadata } from "@/lib/seo";

const path = "calculators/press-brake-tonnage-calculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const copy = getPressBrakeTonnageCopy(rawLocale);
  return buildMetadata({ locale: rawLocale, path, title: copy.title, description: copy.description });
}

export default async function PressBrakeTonnagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/calculators/press-brake-tonnage-calculator");
  return <PressBrakeTonnageView locale={rawLocale} />;
}
