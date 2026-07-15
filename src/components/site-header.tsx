"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Coins, Globe2, Moon, Sun } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localeLabel, locales, type Locale } from "@/lib/i18n/config";
import { currencies, currencyNames } from "@/lib/currency";
import { localizedPath } from "@/lib/seo";
import { usePreferences } from "./preferences-provider";

const localeNames: Record<Locale, string> = { en: "English", "zh-hant": "繁體中文", "zh-hans": "简体中文", de: "Deutsch", ja: "日本語", es: "Español", fr: "Français", "pt-br": "Português (Brasil)", ko: "한국어" };
const skipLabels: Record<Locale, string> = { en: "Skip to content", "zh-hant": "跳至主要內容", "zh-hans": "跳至主要内容", de: "Zum Inhalt springen", ja: "本文へ移動", es: "Saltar al contenido", fr: "Aller au contenu", "pt-br": "Ir para o conteúdo", ko: "본문으로 건너뛰기" };
const navigationLabels: Record<Locale, string> = { en: "Primary navigation", "zh-hant": "主要導覽", "zh-hans": "主导航", de: "Hauptnavigation", ja: "メインナビゲーション", es: "Navegación principal", fr: "Navigation principale", "pt-br": "Navegação principal", ko: "주 탐색" };

function Menu({
  label,
  value,
  icon,
  children,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div className="preference" ref={root}>
      <button className="preference-trigger" type="button" aria-label={label} aria-expanded={open} aria-controls={menuId} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} onClick={() => setOpen((value) => !value)}>
        {icon}<span>{value}</span><ChevronDown aria-hidden="true" />
      </button>
      {open ? <div className="preference-menu" id={menuId} onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); root.current?.querySelector<HTMLButtonElement>(".preference-trigger")?.focus(); } }} onClick={(event) => { if ((event.target as HTMLElement).closest(".preference-option")) setOpen(false); }}>{children}</div> : null}
    </div>
  );
}

export function SiteHeader({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname();
  const { currency, setCurrency, theme, toggleTheme } = usePreferences();
  const [languageQuery, setLanguageQuery] = useState("");
  const [currencyQuery, setCurrencyQuery] = useState("");
  const routePath = pathname.replace(/^\/(en|zh-hant|de|ja|es|fr|pt-br|ko)(?=\/|$)/, "").replace(/^\//, "");
  const normalizedLanguageQuery = languageQuery.trim().toLowerCase();
  const normalizedCurrencyQuery = currencyQuery.trim().toLowerCase();
  const filteredLocales = locales.filter((option) => `${option} ${localeNames[option]}`.toLowerCase().includes(normalizedLanguageQuery));
  const filteredCurrencies = currencies.filter((option) => `${option} ${currencyNames[option]}`.toLowerCase().includes(normalizedCurrencyQuery));
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">{skipLabels[locale]}</a>
      <nav className="shell nav" aria-label={navigationLabels[locale]}>
        <Link className="brand" href={localizedPath(locale)}>zaps<span>.</span>work</Link>
        <div className="nav-links">
          <Link href={localizedPath(locale, "calculators")}>{dictionary.common.tools}</Link>
          <Link href={localizedPath(locale, "guides")}>{dictionary.common.guides}</Link>
          <Link href={localizedPath(locale, "privacy")}>{dictionary.common.privacy}</Link>
        </div>
        <div className="nav-actions">
          <Menu label={dictionary.common.language} value={localeLabel(locale)} icon={<Globe2 aria-hidden="true" />}>
            <label className="menu-search"><span className="sr-only">{dictionary.common.searchLanguage}</span><input type="search" value={languageQuery} placeholder={dictionary.common.searchLanguage} onChange={(event) => setLanguageQuery(event.target.value)} /></label>
            <div className="menu-options">{filteredLocales.length ? filteredLocales.map((option) => <Link className={`preference-option ${option === locale ? "selected" : ""}`} href={localizedPath(option, routePath)} key={option}>{localeNames[option]}</Link>) : <p className="menu-empty">{dictionary.common.noLanguageResults}</p>}</div>
          </Menu>
          <Menu label={dictionary.common.currency} value={currency} icon={<Coins aria-hidden="true" />}>
            <label className="menu-search currency-search"><span className="sr-only">{dictionary.common.searchCurrency}</span><input type="search" value={currencyQuery} placeholder={dictionary.common.searchCurrency} onChange={(event) => setCurrencyQuery(event.target.value)} /></label>
            <div className="currency-options">{filteredCurrencies.length ? filteredCurrencies.map((option) => <button className={`preference-option currency-option ${option === currency ? "selected" : ""}`} type="button" key={option} onClick={() => setCurrency(option)}><strong>{option}</strong><small>{currencyNames[option]}</small></button>) : <p className="currency-empty">{dictionary.common.noCurrencyResults}</p>}</div>
          </Menu>
          <button className="icon-button theme-button" type="button" onClick={toggleTheme} aria-pressed={theme === "dark"} aria-label={theme === "dark" ? dictionary.common.lightMode : dictionary.common.darkMode}>
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          <Link className="button compact" href={localizedPath(locale, "calculators")}>{dictionary.common.allTools}</Link>
        </div>
      </nav>
    </header>
  );
}
