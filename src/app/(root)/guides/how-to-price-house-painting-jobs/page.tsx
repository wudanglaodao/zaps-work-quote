import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticle, type GuideFaq, type GuideTocItem } from "@/components/guide-article";
import { buildMetadata } from "@/lib/seo";

const title = "How to Price House Painting Jobs: A Practical Estimate Guide";
const description = "Build house painting quotes from paint coverage, labor production, surface preparation, overhead, minimum charges, and target margin.";
const toc: GuideTocItem[] = [{ id: "scope", label: "Define the scope" }, { id: "paint", label: "Calculate paint" }, { id: "labor", label: "Estimate labor" }, { id: "costs", label: "Add job costs" }, { id: "margin", label: "Protect margin" }, { id: "quote", label: "Write the quote" }];
const faq: GuideFaq[] = [
  { question: "How do I calculate paint quantity for a quote?", answer: "Multiply paintable area by the number of coats, add a deliberate waste allowance, divide by the stated container coverage, and round up to whole containers." },
  { question: "Should I price painting by room, square foot, or hour?", answer: "Use the measure that best predicts your own costs. A fixed customer price can be built from area, coats, room setup, expected labor-hours, materials, and risk." },
  { question: "How do I add profit margin to a painting estimate?", answer: "Divide total direct cost by one minus the target margin. Multiplying cost by a percentage creates markup, which is not the same as margin." },
];

export const metadata: Metadata = buildMetadata({ locale: "en", path: "guides/how-to-price-house-painting-jobs", title, description });

export default function HousePaintingGuidePage() {
  return <GuideArticle title={title} description={description} published="2026-07-14" updated="2026-07-14" readingTime="8 min read" slug="how-to-price-house-painting-jobs" toolHref="/tools/house-painting-quote" toolLabel="Open calculator" toc={toc} faq={faq}>
    <p className="guide-lead">A reliable painting quote starts with the actual work—not a copied price per square foot. Define the surfaces and preparation, estimate paint and labor from your own production, then add the costs, margin, and minimum job value your business needs.</p>
    <div className="guide-callout"><strong>The short formula</strong><code>Quote = total job cost ÷ (1 − target margin)</code><p>Total job cost includes paint, supplies, labor, labor overhead, preparation, travel, and any job-specific fixed cost.</p></div>
    <h2 id="scope">1. Define the painting scope before pricing</h2>
    <p>Record the surfaces to be painted, their approximate paintable area, the number of coats, interior or exterior conditions, and all preparation. A room count is useful for estimating masking, cutting-in, moving protection, cleanup, and transitions, but it does not replace measuring the surfaces.</p>
    <p>State exclusions clearly: extensive repairs, wallpaper removal, water damage, rot, lead-safe work, unusual heights, furniture moving, color changes, premium finishes, and work outside normal access. If a condition cannot be confirmed before the job, state the allowance and the change process in the quote.</p>
    <h2 id="paint">2. Calculate paint and material quantity</h2>
    <p>Use the coverage printed for the specific paint system and surface, rather than assuming every container covers the same area. Coverage changes with porosity, texture, roller method, spray loss, primer, color change, and the number of coats.</p>
    <pre><code>Containers = ceil((paintable area × coats × (1 + waste %)) ÷ coverage per container)</code></pre>
    <p>Round up to whole containers, then add sundries separately: primer, caulk, filler, tape, plastic, paper, brushes, roller covers, solvent, protection, and disposal. Keeping those items visible makes the estimate easier to review when the scope changes.</p>
    <h2 id="labor">3. Estimate labor from production, not optimism</h2>
    <p>Set a production rate in paintable area per painter-hour from your own completed work. It should include the normal tasks your team performs, not only time spent with a roller in hand. Add an allowance for room setup and adjust the baseline when access, repair, exterior height, protection, or surface condition will slow the job.</p>
    <pre><code>Labor-hours = ((area × coats) ÷ production rate + room setup allowance) × condition factor</code></pre>
    <p>Use a loaded hourly labor rate: wages alone do not cover payroll burden, paid non-billable time, supervision, insurance, and the real cost of keeping a crew available. Divide labor-hours by crew size only to estimate duration; it does not reduce total labor-hours.</p>
    <h2 id="costs">4. Include preparation, travel, and job overhead</h2>
    <p>Small jobs still require scheduling, loading, travel, customer communication, protection, cleanup, invoicing, and collection. Add travel and job-specific preparation separately when they are material. Apply a defined labor-overhead percentage only if it represents real costs you need to recover; do not hide a second arbitrary markup in the same number.</p>
    <ul><li>Paint, primer, and consumables.</li><li>Labor-hours × loaded labor rate.</li><li>Labor overhead, equipment, and protection.</li><li>Preparation, repairs, travel, parking, and disposal.</li><li>Any required permits, lift access, or subcontracted work.</li></ul>
    <h2 id="margin">5. Protect margin and small-job economics</h2>
    <p>Once direct cost is known, divide by one minus the desired margin. A 35% target margin means dividing cost by 0.65—not adding 35% to cost. Then compare the result with a minimum job fee based on the smallest visit that is worth scheduling.</p>
    <table><thead><tr><th>Direct job cost</th><th>Target margin</th><th>Required price</th></tr></thead><tbody><tr><td>$650</td><td>25%</td><td>$866.67</td></tr><tr><td>$650</td><td>35%</td><td>$1,000.00</td></tr><tr><td>$650</td><td>45%</td><td>$1,181.82</td></tr></tbody></table>
    <p>Tax should be applied only when applicable to the price in the relevant jurisdiction. The <Link href="/tools/house-painting-quote">house painting quote calculator</Link> keeps tax separate from the job price so you can see the pre-tax margin.</p>
    <h2 id="quote">6. Write a quote that controls scope</h2>
    <p>List the included surfaces, the paint system or allowance, coat count, preparation included, exclusions, customer responsibilities, payment schedule, total, tax, and quote validity. Describe how concealed damage or materially different site conditions will be handled before extra work begins.</p>
    <p>Do not promise an outcome that depends on hidden conditions. A clear, itemized quote protects both the customer and the crew: it makes a reasonable price understandable and gives both sides a reference when the job changes.</p>
    <h2>House painting estimate checklist</h2>
    <ul><li>Measure paintable surfaces and record the number of coats.</li><li>Confirm interior or exterior access, repair needs, and protection work.</li><li>Use the paint system&apos;s coverage and a deliberate waste allowance.</li><li>Estimate labor from completed-job production data.</li><li>Include loaded labor, supplies, preparation, travel, and overhead.</li><li>Apply the correct target-margin formula and minimum job fee.</li><li>Write inclusions, exclusions, assumptions, tax, and validity into the quote.</li></ul>
  </GuideArticle>;
}
