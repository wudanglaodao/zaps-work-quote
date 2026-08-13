import { describe, expect, it } from "vitest";
import { hashIpAddress } from "./ip";

describe("analytics IP hashing", () => {
  it("returns a stable SHA-256 HMAC without exposing the address", async () => {
    const first = await hashIpAddress("203.0.113.10", "a".repeat(32));
    const second = await hashIpAddress("203.0.113.10", "a".repeat(32));
    const different = await hashIpAddress("203.0.113.11", "a".repeat(32));

    expect(first).toMatch(/^[0-9a-f]{64}$/);
    expect(first).toBe(second);
    expect(first).not.toBe(different);
    expect(first).not.toContain("203");
  });

  it("does not fall back to plaintext when the secret is missing or weak", async () => {
    await expect(hashIpAddress("203.0.113.10", null)).resolves.toBeNull();
    await expect(hashIpAddress("203.0.113.10", "short-secret")).resolves.toBeNull();
    await expect(hashIpAddress(null, "a".repeat(32))).resolves.toBeNull();
  });
});
