import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticle, type GuideFaq, type GuideTocItem } from "@/components/guide-article";
import { buildMetadata } from "@/lib/seo";

const title = "How to Price 3D Prints: Cost, Margin, and Quote Formula";
const description = "Learn how to price an FDM 3D print using filament, machine time, labor, failed-print risk, overhead, and your target profit margin.";
const faq: GuideFaq[] = [
  { question: "How much should I charge per gram for a 3D print?", answer: "A per-gram price alone is rarely enough. It ignores machine time, setup, post-processing, failed prints, packaging, and overhead. Calculate filament cost by gram, then add the other cost categories before applying your margin." },
  { question: "Should I charge for 3D printer machine time?", answer: "Yes. Machine time should cover depreciation, maintenance, replacement parts, and the fact that the printer cannot run another paid job at the same time. Use an hourly machine rate based on your equipment and expected billable hours." },
  { question: "What profit margin is reasonable for 3D printing?", answer: "There is no universal correct margin. Choose a margin that reflects your market, complexity, risk, and business needs. Test the resulting price against customer demand, but never confuse margin with markup." },
  { question: "How do I include failed prints in a quote?", answer: "Estimate your normal failure rate and spread the expected failure cost across successful jobs. A failure allowance can be applied to production-related costs instead of waiting for one failed job to erase the profit on an order." },
];
const toc: GuideTocItem[] = [
  { id: "true-cost", label: "Calculate true cost" }, { id: "risk-overhead", label: "Risk and overhead" },
  { id: "profit-margin", label: "Apply profit margin" }, { id: "worked-example", label: "Worked example" },
  { id: "minimum-charge", label: "Set a minimum charge" }, { id: "professional-quote", label: "Build the quote" },
];
export const metadata: Metadata = buildMetadata({ locale: "en", path: "guides/how-to-price-3d-prints", title, description, includeLanguageAlternates: false });

export default function HowToPrice3dPrintsPage() {
  return <GuideArticle title={title} description={description} published="2026-07-11" updated="2026-07-11" readingTime="10 min read" slug="how-to-price-3d-prints" toolHref="/tools/3d-print-cost-calculator" toolLabel="Open calculator" toc={toc} faq={faq}>
    <p className="guide-lead">A sustainable 3D printing price has to pay for more than filament. It must cover the printer, electricity, hands-on work, waste, failed prints, packaging, and the profit required to keep the business operating.</p>
    <div className="guide-callout"><strong>The short formula</strong><code>Quote = Total cost ÷ (1 − target margin)</code><p>Calculate the complete job cost first. Then use the margin formula and apply any minimum order charge, shipping, and tax.</p></div>

    <h2 id="true-cost">1. Calculate the true cost of the print</h2>
    <p>Start with costs that change with the job. Keeping them separate makes the quote explainable and shows which input matters when a customer changes the quantity, material, finish, or deadline.</p>
    <h3>Filament cost</h3>
    <p>Use the slicer&apos;s estimated material weight rather than the finished part&apos;s weight. The slicer estimate includes supports and other printed material that the customer never receives.</p>
    <pre><code>Filament cost = (grams used ÷ spool grams) × spool price</code></pre>
    <p>If a 1,000 g spool costs $24 and the job uses 180 g, the base filament cost is <strong>$4.32</strong>. Add a waste allowance for purge lines, calibration, unusable remnants, and small measurement differences.</p>
    <h3>Machine time</h3>
    <p>A printer is not free while it runs. An hourly machine rate can cover depreciation, maintenance, nozzles, beds, belts, lubrication, and eventual replacement. Divide the cost you need to recover by realistic billable machine hours—not every hour the printer could theoretically run.</p>
    <pre><code>Machine cost = print hours × machine hourly rate</code></pre>
    <h3>Electricity</h3>
    <p>Electricity is often smaller than filament or labor, but it is easy to calculate and becomes meaningful across long prints and multiple machines.</p>
    <pre><code>Electricity cost = power in kW × print hours × electricity rate</code></pre>
    <p>A printer averaging 0.12 kW over a 12-hour print at $0.18/kWh uses about <strong>$0.26</strong> of electricity.</p>
    <h3>Labor</h3>
    <p>Charge for active work, not unattended print time. Include file review, slicing, printer setup, bed preparation, material changes, support removal, sanding, assembly, quality checks, customer communication, and packing.</p>
    <pre><code>Labor cost = hands-on hours × labor hourly rate</code></pre>

    <h2 id="risk-overhead">2. Add failure risk, overhead, and job-specific costs</h2>
    <p>Long prints can fail because of adhesion, filament, power, geometry, or machine problems. Estimate a normal failure allowance from your own history. A simple approach is to add a percentage to production costs. More experienced shops can track failures by printer, material, or job type.</p>
    <p>Then include costs such as packaging, purchased hardware, magnets, inserts, adhesives, outsourced finishing, platform fees, payment fees, and special delivery. General overhead—software, workspace, insurance, admin time, and marketing—can be included in your machine or labor rates, or allocated separately. Include it once and avoid double-counting.</p>

    <h2 id="profit-margin">3. Apply profit margin correctly</h2>
    <p>Markup and margin are not the same. A 30% markup on a $50 cost produces a $65 price and only a 23.1% margin. If you want a true 30% margin, divide cost by 0.70.</p>
    <pre><code>Price at target margin = total cost ÷ (1 − margin)</code></pre>
    <table><thead><tr><th>Total cost</th><th>Target margin</th><th>Quote before tax</th></tr></thead><tbody><tr><td>$50.00</td><td>20%</td><td>$62.50</td></tr><tr><td>$50.00</td><td>30%</td><td>$71.43</td></tr><tr><td>$50.00</td><td>40%</td><td>$83.33</td></tr></tbody></table>

    <h2 id="worked-example">4. Worked 3D printing quote example</h2>
    <p>Consider a two-part FDM order using 180 g of filament and 12 hours of machine time. The shop spends 45 minutes on preparation and finishing.</p>
    <table><thead><tr><th>Cost item</th><th>Calculation</th><th>Cost</th></tr></thead><tbody><tr><td>Filament</td><td>180 g from a $24 / 1 kg spool</td><td>$4.32</td></tr><tr><td>Material waste</td><td>10% of filament cost</td><td>$0.43</td></tr><tr><td>Machine</td><td>12 hours × $1.50</td><td>$18.00</td></tr><tr><td>Electricity</td><td>0.12 kW × 12 × $0.18</td><td>$0.26</td></tr><tr><td>Labor</td><td>0.75 hours × $28</td><td>$21.00</td></tr><tr><td>Packaging</td><td>Box and protective material</td><td>$2.50</td></tr><tr><td>Failure allowance</td><td>10% of production costs</td><td>$2.30</td></tr><tr><th colSpan={2}>Total cost</th><th>$48.81</th></tr></tbody></table>
    <p>At a 30% target margin, the pre-tax price is <strong>$69.73</strong>. The shop might round that to $70, then add shipping and applicable tax. If its minimum order is $75, the minimum takes precedence.</p>

    <h2 id="minimum-charge">5. Set a minimum charge</h2>
    <p>Small jobs still require messages, setup, slicing, inspection, and payment processing. A minimum charge prevents a technically profitable percentage from producing too little profit in dollars. Base the minimum on the smallest order worth interrupting your workflow for.</p>
    <h2 id="professional-quote">6. Turn the calculation into a professional quote</h2>
    <p>A customer usually does not need your internal cost breakdown. Describe what they will receive: quantity, material, color, finish, tolerances or assumptions, unit price, total, lead time, validity period, shipping, and tax. Record which file version was priced and explain whether design changes require a revised quote.</p>
    <p>Use the <Link href="/tools/3d-print-cost-calculator">free 3D print cost calculator</Link> to enter multiple items, check margin, apply a minimum fee, and export a customer-ready PDF or CSV without creating an account.</p>
    <h2>A repeatable pricing checklist</h2>
    <ul><li>Use slicer material and time estimates.</li><li>Include supports, waste, and consumables.</li><li>Charge for machine occupancy and active labor.</li><li>Allow for normal print failures.</li><li>Include packaging and job-specific purchases.</li><li>Apply margin with the correct formula.</li><li>Check the price against your minimum charge.</li><li>Document scope, assumptions, delivery, and quote validity.</li></ul>
  </GuideArticle>;
}
