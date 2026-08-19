import Link from "next/link";
import { Box, BriefcaseBusiness, BrushCleaning, Cpu, Droplets, FoldHorizontal, Paintbrush, PanelsTopLeft, ScanLine, Sprout } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getToolsByCategory, toolCategories } from "@/lib/tools/registry";
import { localizedPath } from "@/lib/seo";

export function ToolsView({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const icons = {
    "3d-print-cost-calculator": Box,
    "laser-cutting-cost-calculator": ScanLine,
    "sheet-metal-bend-calculator": FoldHorizontal,
    "cleaning-quote-generator": BrushCleaning,
    "house-painting-quote": Paintbrush,
    "pressure-washing-quote": Droplets,
    "freelance-job-quote": BriefcaseBusiness,
    "cnc-machining-cost-calculator": Cpu,
    "lawn-care-quote": Sprout,
    "window-cleaning-quote": PanelsTopLeft,
  } as const;
  return (
    <section className="section page-section">
      <div className="shell">
        <p className="section-kicker">{dictionary.home.toolsKicker}</p>
        <h1 className="page-title">{dictionary.home.toolsHeading}</h1>
        <div className="tool-catalog">
          {[...toolCategories].sort((a, b) => a.order - b.order).map((category) => {
            const categoryTools = getToolsByCategory(category.id);
            return (
              <section className="tool-category" id={category.id} key={category.id}>
                <header className="tool-category-heading">
                  <div>
                    <h2>{category.names[locale]}</h2>
                    <p>{category.descriptions[locale]}</p>
                  </div>
                  <span>{categoryTools.length}</span>
                </header>
                <div className="tool-grid page-tool-grid">
                  {categoryTools.map((tool) => {
                    const Icon = icons[tool.slug as keyof typeof icons] || Box;
                    return tool.status === "live" ? (
                      <Link className="tool-card live-card" href={localizedPath(locale, `calculators/${tool.slug}`)} key={tool.slug}>
                        <Icon aria-hidden="true" />
                        <span className="status live">{dictionary.common.live}</span>
                        <h3>{tool.names[locale]}</h3>
                        <p>{tool.summaries[locale]}</p>
                      </Link>
                    ) : (
                      <article className="tool-card disabled" key={tool.slug}>
                        <Icon aria-hidden="true" />
                        <span className="status soon">{dictionary.common.soon}</span>
                        <h3>{tool.names[locale]}</h3>
                        <p>{tool.summaries[locale]}</p>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
