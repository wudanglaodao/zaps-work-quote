import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getLocalizedGuide, LocalizedGuidePage } from "@/components/localized-guide-page";
import { isLocale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") return {};
  const copy = getLocalizedGuide(locale, "pressure-washing");
  return buildMetadata({ locale, path: "guides/how-to-price-pressure-washing-jobs", title: copy.title, description: copy.description });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "en") permanentRedirect("/guides/how-to-price-pressure-washing-jobs");
  return <LocalizedGuidePage locale={locale} kind="pressure-washing" />;
}
