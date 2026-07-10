export const locales = ["en", "zh-hant", "de", "ja", "es", "fr", "pt-br", "ko"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function htmlLanguage(locale: Locale) {
  return ({ en: "en", "zh-hant": "zh-Hant", de: "de", ja: "ja", es: "es", fr: "fr", "pt-br": "pt-BR", ko: "ko" } as const)[locale];
}

export function directionFor(locale: Locale): "ltr" | "rtl" {
  return ({ en: "ltr", "zh-hant": "ltr", de: "ltr", ja: "ltr", es: "ltr", fr: "ltr", "pt-br": "ltr", ko: "ltr" } as const)[locale];
}

export function localeLabel(locale: Locale) {
  return ({ en: "EN", "zh-hant": "繁中", de: "DE", ja: "JA", es: "ES", fr: "FR", "pt-br": "PT", ko: "KO" } as const)[locale];
}
