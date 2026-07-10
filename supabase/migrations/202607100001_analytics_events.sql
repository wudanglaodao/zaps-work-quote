create extension if not exists pgcrypto;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('calculator_used', 'pdf_exported', 'csv_exported', 'summary_copied')),
  tool_slug text not null,
  tool_version text not null,
  formula_version text not null,
  locale text not null,
  currency text not null,
  item_count integer not null check (item_count between 1 and 10),
  total_cost numeric(18, 4) not null check (total_cost >= 0),
  quote_total numeric(18, 4) not null check (quote_total >= 0),
  margin numeric(10, 6) not null,
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;
revoke all on table public.analytics_events from anon, authenticated;
grant select, insert on table public.analytics_events to service_role;

create index if not exists analytics_events_tool_created_idx on public.analytics_events (tool_slug, created_at desc);
create index if not exists analytics_events_type_created_idx on public.analytics_events (event_type, created_at desc);

comment on table public.analytics_events is 'PII-free calculator and export events. Never store customer, company, email, quote number, or item-name fields.';
