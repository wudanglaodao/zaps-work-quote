"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n/config";

export const currencies = ["USD", "TWD", "EUR", "GBP"] as const;
export type Currency = (typeof currencies)[number];

type Preferences = {
  locale: Locale;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const PreferencesContext = createContext<Preferences | null>(null);

export function PreferencesProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(locale === "zh-hant" ? "TWD" : locale === "de" ? "EUR" : "USD");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedCurrency = localStorage.getItem("zaps-currency") as Currency | null;
      if (savedCurrency && currencies.includes(savedCurrency)) setCurrencyState(savedCurrency);
      const savedTheme = localStorage.getItem("zaps-theme") === "dark" ? "dark" : "light";
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const value = useMemo<Preferences>(() => ({
    locale,
    currency,
    setCurrency(next) {
      setCurrencyState(next);
      localStorage.setItem("zaps-currency", next);
    },
    theme,
    toggleTheme() {
      const next = theme === "dark" ? "light" : "dark";
      setTheme(next);
      document.documentElement.dataset.theme = next;
      localStorage.setItem("zaps-theme", next);
    },
  }), [currency, locale, theme]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences must be used inside PreferencesProvider");
  return context;
}
