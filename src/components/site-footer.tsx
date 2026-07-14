"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/seo";
import { usePreferences } from "./preferences-provider";

const githubUrl = "https://github.com/wudanglaodao/zaps-work-quote";
const feedbackUrl = "https://github.com/wudanglaodao/zaps-work-quote/issues";

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const { theme, toggleTheme } = usePreferences();
  const pathname = usePathname();
  const homePath = localizedPath(locale);

  if (pathname.includes("/calculators")) {
    return (
      <footer className="site-footer site-footer-compact">
        <div className="shell footer-compact-inner">
          <Link className="brand footer-brand" href={homePath}>zaps<span>.</span>work</Link>
          <div className="footer-compact-links">
            <Link href={localizedPath(locale, "calculators")}>{dictionary.common.tools}</Link>
            <Link href={localizedPath(locale, "privacy")}>{dictionary.common.privacy}</Link>
            <a href="mailto:info@lopuo.com">{dictionary.common.contact}</a>
            <a href={feedbackUrl} target="_blank" rel="noreferrer">{dictionary.common.feedback}</a>
            <a href={githubUrl} target="_blank" rel="noreferrer">{dictionary.common.github}</a>
            <span>© 2026 zaps.work</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div className="footer-summary">
          <Link className="brand footer-brand" href={homePath}>zaps<span>.</span>work</Link>
          <p>{dictionary.common.footerSummary}</p>
          <p className="footer-privacy-promise">{dictionary.common.footerPrivacyPromise}</p>
        </div>
        <div className="footer-column">
          <h3>{dictionary.common.tools}</h3>
          <Link href={localizedPath(locale, "calculators/3d-print-cost-calculator")}>{dictionary.common.footer3d}</Link>
          <Link href={localizedPath(locale, "calculators/cleaning-quote-generator")}>{dictionary.common.footerCleaning}</Link>
          <Link href={localizedPath(locale, "calculators/laser-cutting-cost-calculator")}>{dictionary.common.footerLaser}</Link>
        </div>
        <div className="footer-column">
          <h3>{dictionary.common.resources}</h3>
          <Link href={localizedPath(locale, "guides")}>{dictionary.common.guides}</Link>
        </div>
        <div className="footer-column">
          <h3>zaps.work</h3>
          <Link href={localizedPath(locale, "privacy")}>{dictionary.common.privacy}</Link>
          <a href="mailto:info@lopuo.com">{dictionary.common.contact}</a>
          <a href={feedbackUrl} target="_blank" rel="noreferrer">{dictionary.common.feedback}</a>
          <a href={githubUrl} target="_blank" rel="noreferrer">{dictionary.common.github}</a>
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
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? dictionary.common.lightMode : dictionary.common.darkMode}
          >
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
        </div>
      </div>
    </footer>
  );
}
