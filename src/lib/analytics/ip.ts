/**
 * Create a stable, irreversible identifier for an IP address.
 *
 * The secret is kept in the Cloudflare Worker binding and never sent to the
 * browser or stored in D1. Returning null when the secret is unavailable lets
 * local development and misconfigured deployments continue recording the
 * event without falling back to plaintext IP storage.
 */
export async function hashIpAddress(ipAddress: string | null, secret: string | null): Promise<string | null> {
  const ip = ipAddress?.trim();
  const keyMaterial = secret?.trim();
  if (!ip || ip.length > 64 || !keyMaterial || keyMaterial.length < 32) return null;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(keyMaterial),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
