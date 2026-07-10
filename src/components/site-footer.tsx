import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/seo";

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Link className="brand footer-brand" href={localizedPath(locale)}>zaps<span>.</span>work</Link>
        <div className="footer-links">
          <Link href={localizedPath(locale, "tools")}>{dictionary.common.tools}</Link>
          <Link href={localizedPath(locale, "privacy")}>{dictionary.common.privacy}</Link>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
