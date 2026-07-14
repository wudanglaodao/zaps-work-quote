import type { Metadata } from "next";
import { PanelsTopLeft } from "lucide-react";
import { notFound, permanentRedirect } from "next/navigation";
import { NewToolPage } from "@/components/new-tool-page";
import { isLocale } from "@/lib/i18n/config";
import { getNewToolCopy } from "@/lib/i18n/new-tools";
import { buildMetadata } from "@/lib/seo";

const path = "calculators/window-cleaning-quote";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? buildMetadata({ locale, path, title: getNewToolCopy(locale, "window-cleaning").title, description: getNewToolCopy(locale, "window-cleaning").description }) : {};
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "en") permanentRedirect("/calculators/window-cleaning-quote");
  return <NewToolPage kind="window-cleaning" locale={locale} path={path} guidePath="guides/how-to-price-window-cleaning-jobs" Icon={PanelsTopLeft} />;
}
