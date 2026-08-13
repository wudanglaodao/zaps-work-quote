-- Store only a keyed, irreversible IP identifier for aggregate analysis.
-- The HMAC secret lives in the Cloudflare Worker secret binding and is never
-- stored in this database or exposed to the browser.
alter table analytics_events add column ip_hash text
  check (ip_hash is null or (length(ip_hash) = 64 and ip_hash not glob '*[^0-9a-f]*'));

create index if not exists analytics_events_ip_hash_created_idx
  on analytics_events (ip_hash, created_at desc);
