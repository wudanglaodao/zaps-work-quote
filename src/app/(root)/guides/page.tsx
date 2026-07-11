import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Box, Droplets } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({ locale: "en", path: "guides", title: "Pricing & Quote Guides for Small Businesses | zaps.work", description: "Practical guides to job costing, profit margins, and customer-ready quotes for 3D printing and local service work.", includeLanguageAlternates: false });
const guides = [
  { href: "/guides/how-to-price-3d-prints", icon: Box, category: "3D printing", title: "How to Price 3D Prints", description: "Turn filament, machine time, labor, failure risk, and target margin into a defensible customer quote.", time: "10 min read" },
  { href: "/guides/how-to-price-pressure-washing-jobs", icon: Droplets, category: "Pressure washing", title: "How to Price Pressure Washing Jobs", description: "Estimate surface work, operating costs, crew time, minimum charges, and profit without guessing.", time: "9 min read" },
];
export default function GuidesPage() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Pricing and Quote Guides", description: "Practical job costing and quote guides from zaps.work.", url: `${siteConfig.url}/guides`, hasPart: guides.map((guide) => ({ "@type": "Article", name: guide.title, url: `${siteConfig.url}${guide.href}` })) }} />
    <section className="guides-index-hero"><div className="shell"><p className="section-kicker">Guides</p><h1>Price real work with confidence.</h1><p>Practical formulas and worked examples for turning job costs into clear, profitable customer quotes.</p></div></section>
    <section className="guides-index shell" aria-labelledby="latest-guides"><div className="guides-index-heading"><div><p className="section-kicker">Start here</p><h2 id="latest-guides">Pricing guides</h2></div><p>Each guide explains the method, then links to a free calculator where you can use your own rates.</p></div>
      <div className="guide-card-grid">{guides.map(({ icon: Icon, ...guide }) => <Link className="guide-card" href={guide.href} key={guide.href}><div className="guide-card-icon"><Icon aria-hidden="true" /></div><p>{guide.category}</p><h2>{guide.title}</h2><span>{guide.description}</span><footer><small>{guide.time}</small><strong>Read guide <ArrowRight aria-hidden="true" /></strong></footer></Link>)}</div>
    </section></>;
}
