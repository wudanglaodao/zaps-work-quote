-- Privacy-safe analytics only. Customer names, addresses, contact details,
-- quote numbers, item names, and free text must never be inserted here.
create table if not exists analytics_events (
  id text primary key not null default (lower(hex(randomblob(16)))),
  event_type text not null check (event_type in ('calculator_used', 'pdf_exported', 'csv_exported', 'summary_copied')),
  tool_slug text not null,
  tool_version text not null,
  formula_version text not null,
  locale text not null,
  currency text not null,
  time_zone text check (time_zone is null or (length(time_zone) between 1 and 64 and time_zone glob '[A-Za-z_]*')),
  country_code text check (country_code is null or (length(country_code) = 2 and country_code glob '[A-Z][A-Z]')),
  region_code text check (region_code is null or (length(region_code) between 1 and 8 and region_code not glob '*[^A-Z0-9-]*')),
  item_count integer not null check (item_count between 1 and 10),
  total_cost real not null check (total_cost >= 0),
  quote_total real not null check (quote_total >= 0),
  margin real not null,
  quote_snapshot text check (quote_snapshot is null or json_valid(quote_snapshot)),
  created_at text not null default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

create index if not exists analytics_events_tool_created_idx on analytics_events (tool_slug, created_at desc);
create index if not exists analytics_events_type_created_idx on analytics_events (event_type, created_at desc);
create index if not exists analytics_events_context_created_idx on analytics_events (country_code, time_zone, created_at desc);
