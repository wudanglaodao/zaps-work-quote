alter table public.analytics_events
  add column if not exists quote_snapshot jsonb;

alter table public.analytics_events
  drop constraint if exists analytics_events_quote_snapshot_event_check;

alter table public.analytics_events
  add constraint analytics_events_quote_snapshot_event_check
  check (
    quote_snapshot is null
    or (
      event_type in ('pdf_exported', 'csv_exported')
      and jsonb_typeof(quote_snapshot) = 'object'
    )
  );

comment on column public.analytics_events.quote_snapshot is
  'Strictly allowlisted numeric and categorical quote inputs/outputs. Never store free text, item names, company/customer details, contact information, addresses, or quote numbers.';
