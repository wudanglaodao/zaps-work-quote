"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/seo";
import { usePreferences } from "./preferences-provider";

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const { theme, toggleTheme } = usePreferences();
  const homePath = localizedPath(locale);

  return (
    <footer className="site-footer" id="guides">
      <div className="shell footer-top">
        <div className="footer-summary">
          <Link className="brand footer-brand" href={homePath}>zaps<span>.</span>work</Link>
          <p>{dictionary.common.footerSummary}</p>
        </div>
        <div className="footer-column">
          <h3>{dictionary.common.tools}</h3>
          <Link href={localizedPath(locale, "tools/3d-print-cost-calculator")}>{dictionary.common.footer3d}</Link>
          <span>{dictionary.common.footerCleaning}</span>
          <span>{dictionary.common.footerLaser}</span>
        </div>
        <div className="footer-column">
          <h3>{dictionary.common.resources}</h3>
          <span>{dictionary.common.guides}</span>
          <span>{dictionary.common.templates}</span>
          <span>{dictionary.common.pricingBasics}</span>
        </div>
        <div className="footer-column">
          <h3>zaps.work</h3>
          <Link href={`${homePath}#how-it-works`}>{dictionary.common.howItWorks}</Link>
          <Link href={localizedPath(locale, "privacy")}>{dictionary.common.privacy}</Link>
          <a href="mailto:hello@zaps.work">{dictionary.common.contact}</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 zaps.work</span>
        <div className="footer-bottom-actions">
          <span className="online">{dictionary.common.footerLive}</span>
          <button
            className="icon-button footer-theme"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? dictionary.common.lightMode : dictionary.common.darkMode}
          >
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
        </div>
      </div>
    </footer>
  );
}
