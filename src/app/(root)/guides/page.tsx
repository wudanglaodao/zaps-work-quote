import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Box, Droplets } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import type { Locale } from "@/lib/i18n/config";
import { guidesIndexCopy } from "@/lib/guides/ui";
import { buildMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const englishCopy = guidesIndexCopy.en;
export const metadata: Metadata = buildMetadata({ locale: "en", path: "guides", title: englishCopy.metadataTitle, description: englishCopy.metadataDescription });

export function GuidesView({ locale }: { locale: Locale }) {
  const copy = guidesIndexCopy[locale];
  const guides = [
    { href: localizedPath(locale, "guides/how-to-price-3d-prints"), icon: Box, ...copy.cards[0] },
    { href: localizedPath(locale, "guides/how-to-price-pressure-washing-jobs"), icon: Droplets, ...copy.cards[1] },
  ];
  const url = `${siteConfig.url}${localizedPath(locale, "guides")}`;
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: copy.listHeading, description: copy.metadataDescription, url, inLanguage: locale, hasPart: guides.map((guide) => ({ "@type": "Article", name: guide.title, url: `${siteConfig.url}${guide.href}` })) }} />
    <section className="guides-index-hero"><div className="shell"><p className="section-kicker">{copy.kicker}</p><h1>{copy.heading}</h1><p>{copy.intro}</p></div></section>
    <section className="guides-index shell" aria-labelledby="latest-guides"><div className="guides-index-heading"><div><p className="section-kicker">{copy.listKicker}</p><h2 id="latest-guides">{copy.listHeading}</h2></div><p>{copy.listIntro}</p></div>
      <div className="guide-card-grid">{guides.map(({ icon: Icon, ...guide }) => <Link className="guide-card" href={guide.href} key={guide.href}><div className="guide-card-icon"><Icon aria-hidden="true" /></div><p>{guide.category}</p><h2>{guide.title}</h2><span>{guide.description}</span><footer><small>{guide.time}</small><strong>{copy.readGuide} <ArrowRight aria-hidden="true" /></strong></footer></Link>)}</div>
    </section></>;
}

export default function GuidesPage() { return <GuidesView locale="en" />; }
