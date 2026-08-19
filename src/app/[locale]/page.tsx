import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { HomeView } from "@/components/home-view";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);
  return buildMetadata({ locale: rawLocale, title: dictionary.home.title, description: dictionary.home.description });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  if (rawLocale === "en") permanentRedirect("/");
  return <HomeView locale={rawLocale} />;
}
