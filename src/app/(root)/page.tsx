import type { Metadata } from "next";
import { HomeView } from "@/app/[locale]/page";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

const dictionary = getDictionary("en");

export const metadata: Metadata = buildMetadata({ locale: "en", title: dictionary.home.title, description: dictionary.home.description });

export default function HomePage() {
  return <HomeView locale="en" />;
}
