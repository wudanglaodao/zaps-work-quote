import type { Metadata } from "next";
import { htmlLanguage, locales, type Locale } from "./i18n/config";
import { siteConfig } from "./site";

export function localizedPath(locale: Locale, path = "") {
  const suffix = path && path !== "/" ? `/${path.replace(/^\//, "")}` : "";
  return locale === "en" ? suffix || "/" : `/${locale}${suffix}`;
}

export function languageAlternates(path = "") {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[htmlLanguage(locale)] = `${siteConfig.url}${localizedPath(locale, path)}`;
  }
  languages["x-default"] = `${siteConfig.url}${localizedPath("en", path)}`;
  return languages;
}

export function buildMetadata(args: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  includeLanguageAlternates?: boolean;
}): Metadata {
  const { locale, path = "", title, description, includeLanguageAlternates = true } = args;
  const canonical = `${siteConfig.url}${localizedPath(locale, path)}`;
  return {
    title,
    description,
    alternates: { canonical, ...(includeLanguageAlternates ? { languages: languageAlternates(path) } : {}) },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      locale: htmlLanguage(locale).replace("-", "_"),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
