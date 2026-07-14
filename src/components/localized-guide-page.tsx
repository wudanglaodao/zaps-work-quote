import { GuideArticle } from "@/components/guide-article";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/seo";
import { pressureWashingGuide } from "@/lib/guides/pressure-washing";
import { threeDPrintGuide } from "@/lib/guides/three-d-print";
import { laserCuttingGuide, laserMaterialFormula } from "@/lib/guides/laser-cutting";
import { houseCleaningGuide, houseCleaningHoursFormula } from "@/lib/guides/house-cleaning";
import { guideUi } from "@/lib/guides/ui";

type TranslatedLocale = Exclude<Locale, "en">;
type GuideKind = "three-d-print" | "pressure-washing" | "laser-cutting" | "house-cleaning";

const guideConfig = {
  "three-d-print": { slug: "how-to-price-3d-prints", toolPath: "calculators/3d-print-cost-calculator", published: "2026-07-11", copies: threeDPrintGuide },
  "pressure-washing": { slug: "how-to-price-pressure-washing-jobs", toolPath: "calculators/pressure-washing-quote", published: "2026-07-11", copies: pressureWashingGuide },
  "laser-cutting": { slug: "how-to-price-laser-cutting-jobs", toolPath: "calculators/laser-cutting-cost-calculator", published: "2026-07-13", copies: laserCuttingGuide },
  "house-cleaning": { slug: "how-to-price-house-cleaning-jobs", toolPath: "calculators/cleaning-quote-generator", published: "2026-07-13", copies: houseCleaningGuide },
} as const;

export function getLocalizedGuide(locale: TranslatedLocale, kind: GuideKind) {
  return guideConfig[kind].copies[locale];
}

export function LocalizedGuidePage({ locale, kind }: { locale: TranslatedLocale; kind: GuideKind }) {
  const config = guideConfig[kind];
  const copy = config.copies[locale];
  return (
    <GuideArticle
      locale={locale}
      labels={guideUi[locale]}
      title={copy.title}
      description={copy.description}
      published={config.published}
      updated="2026-07-13"
      readingTime={copy.readingTime}
      slug={config.slug}
      toolHref={localizedPath(locale, config.toolPath)}
      toolLabel={copy.toolLabel}
      toc={copy.toc}
      faq={copy.faq}
    >
      <p className="guide-lead">{copy.lead}</p>
      <div className="guide-callout"><strong>{copy.formulaLabel}</strong><code>{copy.formula}</code><p>{copy.formulaBody}</p></div>
      {copy.sections.map((section) => {
        const formula = kind === "house-cleaning" && section.id === "hours"
          ? houseCleaningHoursFormula[locale]
          : kind === "laser-cutting" && section.id === "material"
            ? laserMaterialFormula[locale]
            : section.formula;
        return <section key={section.id}>
          <h2 id={section.id}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {formula ? <pre><code>{formula}</code></pre> : null}
        </section>;
      })}
      <h2>{copy.checklistTitle}</h2>
      <ul>{copy.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
    </GuideArticle>
  );
}
