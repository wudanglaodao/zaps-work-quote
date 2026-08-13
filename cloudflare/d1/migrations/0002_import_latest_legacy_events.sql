-- Import the two newest legacy events exported from Supabase.
--
-- The legacy export predates the context columns, so time_zone,
-- country_code, and region_code are intentionally NULL. Keep the original
-- event IDs and UTC timestamps so this migration is idempotent and preserves
-- the historical event order.
insert or ignore into analytics_events (
  id,
  event_type,
  tool_slug,
  tool_version,
  formula_version,
  locale,
  currency,
  time_zone,
  country_code,
  region_code,
  item_count,
  total_cost,
  quote_total,
  margin,
  quote_snapshot,
  created_at
) values
  (
    'd75bcb2a-2923-446c-bcce-5c32bc9a641a',
    'summary_copied',
    '3d-print-cost-calculator',
    '1.0.0',
    '3d-print-v1',
    'en',
    'USD',
    null,
    null,
    null,
    1,
    17.0689,
    26.2599,
    0.35,
    null,
    '2026-08-07T05:35:32.024645Z'
  ),
  (
    '0473bacf-5ce0-4629-8d36-1d1d6c7f1a4d',
    'csv_exported',
    'laser-cutting-cost-calculator',
    '1.0.0',
    'laser-cutting-v1',
    'de',
    'EUR',
    null,
    null,
    null,
    1,
    10.5567,
    16.2410,
    0.35,
    '{"kind":"laser-cutting","inputs":{"taxRate":0,"material":"mildSteel","quantity":1,"cutLength":1800,"laborRate":23,"otherCost":0,"wasteRate":10,"machineRate":0.74,"pierceCount":12,"materialArea":2,"materialRate":0.69,"setupMinutes":15,"targetMargin":35,"cutLengthUnit":"mm","finishingCost":0,"thicknessUnit":"mm","cutTimeMinutes":18,"handlingMinutes":8,"measurementUnit":"sqm","packageDiscount":0,"materialThickness":3},"outputs":{"tax":0,"total":16.24102564102564,"margin":0.35,"profit":5.6843589743589735,"subtotal":16.24102564102564,"costFloor":16.24102564102564,"directCost":10.556666666666667,"machineCost":0.222,"materialCost":1.518,"finishingCost":0,"setupLaborCost":5.75,"handlingLaborCost":3.0666666666666664}}',
    '2026-08-04T17:18:01.153445Z'
  );
