import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { GuidesView } from "@/app/(root)/guides/page";
import { guidesIndexCopy } from "@/lib/guides/ui";
import { isLocale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = guidesIndexCopy[locale];
  return buildMetadata({ locale, path: "guides", title: copy.metadataTitle, description: copy.metadataDescription });
}

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "en") permanentRedirect("/guides");
  return <GuidesView locale={locale} />;
}
