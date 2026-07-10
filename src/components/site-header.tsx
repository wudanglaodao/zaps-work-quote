"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Coins, Globe2, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localeLabel, otherLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/seo";
import { currencies, usePreferences, type Currency } from "./preferences-provider";

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
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div className="preference" ref={root}>
      <button className="preference-trigger" type="button" aria-label={label} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {icon}<span>{value}</span><ChevronDown aria-hidden="true" />
      </button>
      {open ? <div className="preference-menu" onClick={() => setOpen(false)}>{children}</div> : null}
    </div>
  );
}

export function SiteHeader({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname();
  const { currency, setCurrency, theme, toggleTheme } = usePreferences();
  const alternate = otherLocale(locale);
  const routePath = pathname.replace(/^\/(en|zh-hant)(?=\/|$)/, "").replace(/^\//, "");
  const alternatePath = localizedPath(alternate, routePath);
  const currentPath = localizedPath(locale, routePath);
  return (
    <header className="site-header">
      <nav className="shell nav" aria-label="Primary navigation">
        <Link className="brand" href={localizedPath(locale)}>zaps<span>.</span>work</Link>
        <div className="nav-links">
          <Link href={localizedPath(locale, "tools")}>{dictionary.common.tools}</Link>
          <Link href={`${localizedPath(locale)}#how-it-works`}>{dictionary.common.howItWorks}</Link>
          <Link href={`${localizedPath(locale)}#guides`}>{dictionary.common.guides}</Link>
        </div>
        <div className="nav-actions">
          <Menu label={dictionary.common.language} value={localeLabel(locale)} icon={<Globe2 aria-hidden="true" />}>
            <Link className="preference-option selected" href={currentPath}>{locale === "en" ? "English" : "繁體中文"}</Link>
            <Link className="preference-option" href={alternatePath}>{alternate === "en" ? "English" : "繁體中文"}</Link>
          </Menu>
          <Menu label={dictionary.common.currency} value={currency} icon={<Coins aria-hidden="true" />}>
            {currencies.map((option) => (
              <button className={`preference-option ${option === currency ? "selected" : ""}`} type="button" key={option} onClick={() => setCurrency(option as Currency)}>{option}</button>
            ))}
          </Menu>
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? dictionary.common.lightMode : dictionary.common.darkMode}>
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          <Link className="button compact" href={localizedPath(locale, "tools")}>{dictionary.common.allTools}</Link>
        </div>
      </nav>
    </header>
  );
}
