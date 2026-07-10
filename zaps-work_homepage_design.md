# zaps.work Homepage Design

Version: 1.0  
Status: canonical homepage specification

Localized SEO, translated component behavior, and RTL layout are governed by `zaps-work_i18n_rtl_design.md`.

## 1. Homepage Job

The homepage has three jobs:

1. Explain that zaps.work turns job details into defensible quotes.
2. Let a visitor open a working calculator quickly.
3. Show that more cost and quote scenarios will live in the same system.

It is a product entry point, not a long SaaS sales page and not a generic AI landing page.

## 2. Direction

Use a light-first, editorial product style:

- White and near-white page surfaces.
- Near-black typography.
- Green for live, positive, active, and primary actions.
- Blue for input and utility.
- Amber for quote output and pricing caution.
- Hard 2-4px corners, thin borders, restrained shadows.
- System sans typography with compact headings and generous section spacing.
- Real product states and interface diagrams instead of decorative illustration.

The page should feel practical, calm, and established. It must not look like an AI template, a finance dashboard, or a startup pitch deck.

All homepage sections must survive 40% text expansion. In RTL locales, navigation, workflow direction, section alignment, and directional controls mirror through logical layout properties; the zaps.work wordmark and neutral visual symbols do not mirror.

## 3. Information Architecture

```text
Header
  Brand
  Tools / How it works / Guides
  Language / Currency
  Browse tools

Hero
  Live status
  Product promise
  One supporting sentence
  Primary and secondary actions

Quote workflow
  Input
  Cost and margin
  Quote

Tool library
  Category filters
  One featured live tool with real product preview
  Planned tools with disabled styling

How it works
  Three compact steps
  No repeated product screenshots

Final action
  Open the live calculator

Footer
  Theme switch
```

## 4. First Viewport

The first viewport must communicate the product before asking the user to scroll.

Hero content:

```text
Cost in. Quote out.
Know what the job costs, protect your margin, and send a clear quote.
```

Rules:

- Keep H1 between 48px and 60px on desktop, 38px to 42px on mobile.
- Keep the hero between 430px and 520px high on desktop, including the header.
- Do not use proof metrics such as `5 inputs`, `34%`, or `PDF` in the hero.
- Do not use a background photo, glowing gradient, decorative orb, or floating dashboard.
- Use one strong green action and one neutral text action.
- The quote workflow must be partially visible at the bottom of a typical desktop viewport.

## 5. Quote Workflow Visual

The workflow is the primary visual asset of the homepage.

- Present three equal panels: Input, Margin, Quote.
- Each panel contains an abstract but believable UI state.
- Use blue, green, and amber as distinct semantic accents.
- Keep visual scenes larger than the labels.
- Use small labels and step numbers below the scenes.
- Keep panel radius at 4px and inner UI radius at 2-4px.
- Use subtle hover motion that changes depth, not layout.
- On mobile, stack panels and show a vertical connector.

The workflow explains the product model. It must not look like a screenshot of only the 3D printing calculator.

## 6. Tool Library

The tool library is the main conversion section.

Featured live tool:

- Use a wider card with the real 3D Print Calculator preview.
- Show `Live` and a clear `Open calculator` action.
- Keep copy to one short sentence.

Planned tools:

- Render as muted, non-clickable cards.
- Show `Soon` in a quiet status label.
- Use a small scenario icon and one short description.
- No hover lift, pointer cursor, or fake CTA.
- Cleaning may be marked `Next` but remains disabled until functional.

Filters:

- All, Fabrication, Local services, Creative.
- Use compact segmented buttons with 2px radius.
- Filtering can hide irrelevant cards but must preserve disabled state.

## 7. Section Rhythm

Use three surface bands:

1. Hero: white or near-white.
2. Workflow and tools: very light neutral surface.
3. How it works: muted green-gray band.

Spacing:

```text
Header height: 64px
Section vertical padding: 72-104px desktop
Section vertical padding: 52-72px mobile
Content width: 1180px maximum
Grid gap: 16-24px
```

Do not place a card around an entire section. Cards are reserved for workflow stages and individual tools.

## 8. Typography

Use the native UI stack for the static prototype:

```css
-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif
```

Scale:

| Role | Desktop | Mobile | Weight |
|---|---:|---:|---:|
| Hero H1 | 56-60px | 40px | 650-700 |
| Section H2 | 34-40px | 30-34px | 620-680 |
| Card title | 18-22px | 18-20px | 620-680 |
| Body | 15-17px | 15-16px | 400-520 |
| Label | 11-13px | 11-13px | 650-720 |

Rules:

- Letter spacing remains `0`.
- Headlines use short literal phrases.
- Avoid long centered paragraphs.
- Avoid uppercase except small status labels.

## 9. Shape And Color

```text
Button radius: 2px
Card radius: 4px
Inner control radius: 2-4px
Badge radius: 2px
Border: 1px solid
```

Core light tokens:

```text
Canvas: #F7F9F7
Surface: #FFFFFF
Ink: #0B110D
Muted: #5E6A62
Line: #DCE4DE
Green: #16A34A
Green dark: #0F7A38
Blue: #2563EB
Amber: #F59E0B
```

Dark mode uses charcoal-green surfaces rather than pure black. The quote document remains white in both themes.

## 10. Motion

- Hero elements enter once with a 10-16px rise.
- Sections reveal with opacity and 18px vertical movement.
- Repeated cards stagger by 70-90ms.
- Live cards lift by no more than 4px.
- Disabled cards do not move.
- Workflow bars and margin ring animate only when first visible.
- Theme transitions use 180ms.
- Respect `prefers-reduced-motion`.

## 11. Responsive Rules

Desktop:

- Three workflow panels in one row.
- Tool library uses one featured tool and a two-column planned-tool grid.

Tablet:

- Keep workflow in three columns while readable; stack below 820px.
- Featured tool preview moves above its copy.

Mobile:

- Hide desktop navigation links.
- Hero aligns left.
- Actions use full width.
- Workflow panels stack.
- Tool cards become one column.
- Footer becomes a simple stacked list.

## 12. Acceptance Checklist

- The product purpose is clear within five seconds.
- The live calculator is reachable from the header and hero.
- Workflow is visible without reading a paragraph.
- No section repeats the same message or visual.
- Only live tools are clickable.
- Dark mode is readable and keeps semantic colors.
- Desktop and mobile have no overlap or horizontal overflow.
- Motion does not block interaction.
- The homepage feels like a practical quoting product, not an AI generator.
