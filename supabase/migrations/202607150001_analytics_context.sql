alter table public.analytics_events
  add column if not exists time_zone text,
  add column if not exists country_code text,
  add column if not exists region_code text;

alter table public.analytics_events
  add constraint analytics_events_time_zone_check
  check (time_zone is null or (char_length(time_zone) between 1 and 64 and time_zone ~ '^(UTC|[A-Za-z_]+(/[A-Za-z_+-]+)+)$'));

alter table public.analytics_events
  add constraint analytics_events_country_code_check
  check (country_code is null or country_code ~ '^[A-Z]{2}$');

alter table public.analytics_events
  add constraint analytics_events_region_code_check
  check (region_code is null or region_code ~ '^[A-Z0-9-]{1,8}$');

create index if not exists analytics_events_context_created_idx
  on public.analytics_events (country_code, time_zone, created_at desc);

comment on column public.analytics_events.time_zone is
  'Browser-reported IANA time zone. Optional and never derived from an IP address.';

comment on column public.analytics_events.country_code is
  'Two-letter country code derived from a trusted hosting-platform request header. Raw IP addresses are never stored.';

comment on column public.analytics_events.region_code is
  'Coarse region code derived from a trusted hosting-platform request header. Raw IP addresses are never stored.';
