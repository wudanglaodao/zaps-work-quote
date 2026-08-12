import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// The current site is mostly static and does not need an R2 or D1 cache layer.
// The application database binding below is used for privacy-safe analytics only.
export default defineCloudflareConfig();
