import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { PreferencesProvider } from "@/components/preferences-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const dictionary = getDictionary("en");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

export default function RootEntryLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning><body><PreferencesProvider locale="en"><SiteHeader locale="en" dictionary={dictionary} /><main className="site-main">{children}</main><SiteFooter locale="en" dictionary={dictionary} /></PreferencesProvider><Analytics /><SpeedInsights /><GoogleAnalytics /></body></html>;
}
