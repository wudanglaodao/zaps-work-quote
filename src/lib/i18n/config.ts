export const locales = ["en", "zh-hant"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function htmlLanguage(locale: Locale) {
  return locale === "zh-hant" ? "zh-Hant" : "en";
}

export function directionFor(locale: Locale): "ltr" | "rtl" {
  return ({ en: "ltr", "zh-hant": "ltr" } as const)[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "zh-hant" : "en";
}

export function localeLabel(locale: Locale) {
  return locale === "en" ? "EN" : "繁中";
}
