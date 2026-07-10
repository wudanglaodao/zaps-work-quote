export const locales = ["en", "zh-hant", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function htmlLanguage(locale: Locale) {
  return locale === "zh-hant" ? "zh-Hant" : locale === "de" ? "de" : "en";
}

export function directionFor(locale: Locale): "ltr" | "rtl" {
  return ({ en: "ltr", "zh-hant": "ltr", de: "ltr" } as const)[locale];
}

export function localeLabel(locale: Locale) {
  return ({ en: "EN", "zh-hant": "繁中", de: "DE" } as const)[locale];
}
