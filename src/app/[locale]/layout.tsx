import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { PreferencesProvider } from "@/components/preferences-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { directionFor, htmlLanguage, isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  icons: { icon: "/favicon.ico" },
};

export function generateStaticParams() {
  return locales.filter((locale) => locale !== "en").map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const dictionary = getDictionary(rawLocale);
  return (
    <html lang={htmlLanguage(rawLocale)} dir={directionFor(rawLocale)} data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <PreferencesProvider locale={rawLocale}>
          <SiteHeader locale={rawLocale} dictionary={dictionary} />
          <main className="site-main">{children}</main>
          <SiteFooter locale={rawLocale} dictionary={dictionary} />
        </PreferencesProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
