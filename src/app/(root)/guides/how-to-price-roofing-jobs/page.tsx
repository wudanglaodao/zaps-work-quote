import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticle, type GuideFaq, type GuideTocItem } from "@/components/guide-article";
import { buildMetadata } from "@/lib/seo";

const title = "How to Price Roofing Jobs: A Practical Estimating Guide";
const description =
  "Learn how to estimate roofing squares, calculate pitch multipliers, price materials, tear-off, and crew labor, and protect project profit margins.";
const toc: GuideTocItem[] = [
  { id: "squares", label: "Calculate Squares & pitch" },
  { id: "materials", label: "Estimate shingles & underlayment" },
  { id: "tear-off", label: "Price tear-off & dumpsters" },
  { id: "labor", label: "Labor & height difficulty" },
  { id: "decking", label: "Decking repair allowances" },
  { id: "margin", label: "Protect margin & write quotes" },
];

const faq: GuideFaq[] = [
  {
    question: "How do I calculate roofing squares from house square footage?",
    answer:
      "Multiply ground footprint area by the pitch multiplier √(1 + (Pitch/12)²), add a 10% to 15% waste allowance for ridges, valleys, and starter shingles, then divide by 100. For example, a 2,000 sq ft home with a 6/12 pitch has ~2,236 sq ft of sloped roof, or 25 to 26 ordered squares.",
  },
  {
    question: "What is the difference between markup and margin in roofing?",
    answer:
      "Markup is added onto direct cost (Cost × 1.35), whereas margin is the percentage of the selling price that is profit (Price = Cost ÷ (1 − Margin)). If a roof costs $7,000 to install and you want a 35% margin, the quote must be $7,000 ÷ 0.65 = $10,769, not $9,450.",
  },
  {
    question: "How much extra should I charge for steep roof pitches?",
    answer:
      "Pitches 7/12 to 8/12 typically require a 10% to 15% labor surcharge due to required toe-boards and slower footing. Pitches 9/12 and steeper (such as 10/12 or 12/12) require permanent safety harnesses and roof jacks, warranting a 20% to 30% labor premium.",
  },
];

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "guides/how-to-price-roofing-jobs",
  title,
  description,
});

export default function RoofingPricingGuidePage() {
  return (
    <GuideArticle
      title={title}
      description={description}
      published="2026-08-15"
      updated="2026-11-21"
      readingTime="9 min read"
      slug="how-to-price-roofing-jobs"
      toolHref="/calculators/roofing-quote-calculator"
      toolLabel="Open roofing calculator"
      toc={toc}
      faq={faq}
    >
      <p className="guide-lead">
        A profitable roofing quote cannot be built from a generic &quot;per square foot&quot; rule of thumb. Every roof has unique geometry, pitch slope multipliers, tear-off layers, access hurdles, and decking conditions. Here is the field-tested framework used by top roofing contractors to calculate true Squares, tally direct costs, and protect company margins.
      </p>

      <div className="guide-callout">
        <strong>The Core Roofing Formula</strong>
        <code>Total Quote = Direct Job Cost ÷ (1 − Target Margin %)</code>
        <p>
          Direct cost includes shingles, underlayment, ridge caps, flashing, tear-off labor, dumpster rental, installation labor, and decking repair allowances.
        </p>
      </div>

      <h2 id="squares">1. Calculate true surface area and Roofing Squares</h2>
      <p>
        In North American and international roofing, materials and labor are measured in <strong>&quot;Squares&quot;</strong>, where <strong>1 Square = 100 square feet</strong> (approximately 9.29 m²).
      </p>
      <p>
        Never use the building&apos;s flat ground footprint alone. Roof pitch increases the actual sloped surface area. Calculate your pitch multiplier using the Pythagorean theorem:
      </p>
      <pre>
        <code>Pitch Multiplier = √(1 + (Pitch ÷ 12)²)</code>
      </pre>
      <table>
        <thead>
          <tr>
            <th>Roof Pitch</th>
            <th>Angle (Degrees)</th>
            <th>Pitch Multiplier</th>
            <th>Surface Area Increase</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4/12 (Low slope)</td>
            <td>18.4°</td>
            <td>1.054</td>
            <td>+5.4%</td>
          </tr>
          <tr>
            <td>6/12 (Standard slope)</td>
            <td>26.6°</td>
            <td>1.118</td>
            <td>+11.8%</td>
          </tr>
          <tr>
            <td>8/12 (Steep slope)</td>
            <td>33.7°</td>
            <td>1.202</td>
            <td>+20.2%</td>
          </tr>
          <tr>
            <td>10/12 (Very steep)</td>
            <td>39.8°</td>
            <td>1.302</td>
            <td>+30.2%</td>
          </tr>
          <tr>
            <td>12/12 (45° pitch)</td>
            <td>45.0°</td>
            <td>1.414</td>
            <td>+41.4%</td>
          </tr>
        </tbody>
      </table>
      <p>
        Always add a <strong>10% to 15% waste factor</strong>. Simple gable roofs require ~10% extra for starter strips, ridge caps, and perimeter cuts. Hip roofs with multiple valleys, dormers, and sidewalls require 12% to 17% waste.
      </p>

      <h2 id="materials">2. Estimate shingles, underlayment, and accessories</h2>
      <p>
        A complete roofing system consists of much more than bundles of shingles. Break down your material specification:
      </p>
      <ul>
        <li>
          <strong>Primary Shingles / Panels</strong>: 3 bundles typically equal 1 square of architectural laminate or 3-tab shingles. Standing seam metal panels and tile have higher raw unit costs.
        </li>
        <li>
          <strong>Synthetic Underlayment</strong>: High-traction synthetic felt rolls (usually 10 squares per roll).
        </li>
        <li>
          <strong>Ice & Water Shield</strong>: Self-adhering polymer modified bitumen membrane required along eaves (at least 24 inches past the interior wall), valleys, and around skylights/chimneys.
        </li>
        <li>
          <strong>Drip Edge & Flashing</strong>: Corrosion-resistant perimeter drip edge, step flashing for sidewalls, and valley metal.
        </li>
        <li>
          <strong>Ridge Ventilation & Caps</strong>: Continuous ridge vent baffles and matching high-profile hip/ridge caps.
        </li>
      </ul>

      <h2 id="tear-off">3. Price tear-off, dumpsters, and disposal</h2>
      <p>
        Unless you are installing over an existing single-layer asphalt roof (which many local building codes restrict), old materials must be stripped down to the sheathing.
      </p>
      <p>
        Tear-off pricing must account for:
      </p>
      <ul>
        <li>
          <strong>Layer count</strong>: 1 layer of architectural shingles weighs ~250 lbs per square. Tearing off 2 layers takes nearly double the physical labor and doubles weight disposal fees.
        </li>
        <li>
          <strong>Roll-Off Dumpster Rental</strong>: A 20-yard to 30-yard dumpster with 3 to 5 tons of included disposal typically costs $400 to $650 depending on local transfer station tipping fees.
        </li>
        <li>
          <strong>Ground Protection & Clean-Up</strong>: Tarps along landscaping, magnetic nail sweepers, and gutter clearing.
        </li>
      </ul>

      <h2 id="labor">4. Calculate crew labor and elevation difficulty</h2>
      <p>
        Labor productivity is governed by roof slope and building height:
      </p>
      <ul>
        <li>
          <strong>Single-Story (1.0× baseline)</strong>: Easy eave access, staging directly onto the roof from a trailer or ground lift.
        </li>
        <li>
          <strong>Two-Story (1.15× multiplier)</strong>: Ladder access, fall protection tie-offs, and longer material hoisting times.
        </li>
        <li>
          <strong>Three-Story or Steep Pitch (1.25× to 1.35× multiplier)</strong>: Crews move significantly slower when wearing harnesses and positioning roof jacks.
        </li>
      </ul>
      <p>
        Always calculate loaded crew labor rates: include hourly wage, worker&apos;s compensation insurance (which is higher for roofers than almost any other trade), payroll taxes, and supervisory time.
      </p>

      <h2 id="decking">5. Budget for plywood decking repair allowances</h2>
      <p>
        One of the most frequent sources of friction between contractors and homeowners is rotted sheathing discovered after tear-off.
      </p>
      <p>
        Rather than surprising the customer with an aggressive mid-job change order, specify in your quote:
      </p>
      <pre>
        <code>Includes 2 sheets of 1/2&quot; CDX plywood decking replacement. Additional damaged sheets replaced at $75/sheet installed.</code>
      </pre>
      <p>
        This establishes clear transparency and guarantees your crew gets paid for necessary substrate stabilization.
      </p>

      <h2 id="margin">6. Protect margin and write customer-ready quotes</h2>
      <p>
        Once direct costs (materials + tear-off + labor + dumpsters + permits + decking) are summed, add your operating overhead (typically 10% to 15% to cover vehicles, shop lease, office staff, and marketing).
      </p>
      <p>
        Then apply your <strong>target profit margin</strong>. Remember:
      </p>
      <table>
        <thead>
          <tr>
            <th>Total Direct Cost</th>
            <th>Target Margin</th>
            <th>Required Selling Price</th>
            <th>Gross Profit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$7,500</td>
            <td>25%</td>
            <td>$10,000.00</td>
            <td>$2,500.00</td>
          </tr>
          <tr>
            <td>$7,500</td>
            <td>32%</td>
            <td>$11,029.41</td>
            <td>$3,529.41</td>
          </tr>
          <tr>
            <td>$7,500</td>
            <td>40%</td>
            <td>$12,500.00</td>
            <td>$5,000.00</td>
          </tr>
        </tbody>
      </table>
      <p>
        Our interactive <Link href="/calculators/roofing-quote-calculator">Roofing Quote Calculator</Link> automates this entire math pipeline, giving you both a commercial breakdown and an exportable, customer-ready PDF quote.
      </p>

      <h2>Roofing Estimate Checklist</h2>
      <ul>
        <li>Measure ground footprint and check roof slope with a pitch gauge or digital level.</li>
        <li>Apply the geometric pitch multiplier and a 10%–15% waste factor to determine order Squares.</li>
        <li>Confirm tear-off layer count and reserve appropriate dumpster capacity.</li>
        <li>Price complete weatherproofing: shingles, synthetic felt, ice & water shield, drip edge, and ridge vents.</li>
        <li>Adjust labor rates for building elevation (stories) and pitch steepness.</li>
        <li>Specify a plywood decking replacement allowance upfront.</li>
        <li>Apply the target-margin formula (not markup) to protect business profits.</li>
      </ul>
    </GuideArticle>
  );
}
