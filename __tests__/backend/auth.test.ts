/**
 * @jest-environment node
 */
import {
  hashPassword,
  verifyPassword,
  signSessionToken,
  verifySessionToken,
} from "@/lib/auth";

describe("Backend Auth Utilities", () => {
  it("should securely hash and verify passwords using bcrypt", async () => {
    const rawPass = "superSecureAdminPass123!";
    const hashed = await hashPassword(rawPass);

    expect(hashed).toBeDefined();
    expect(hashed).not.toEqual(rawPass);
    expect(hashed.startsWith("$2")).toBe(true);

    const isMatch = await verifyPassword(rawPass, hashed);
    expect(isMatch).toBe(true);

    const isMismatch = await verifyPassword("wrongPassword", hashed);
    expect(isMismatch).toBe(false);
  });

  it("should sign and verify JWT session tokens", async () => {
    const payload = {
      userId: "user-test-id-123",
      email: "kyawzinw469@gmail.com",
    };

    const token = await signSessionToken(payload, "1h");
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3);

    const decoded = await verifySessionToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.email).toBe(payload.email);
  });

  it("should reject invalid or tampered JWT tokens", async () => {
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature";
    const result = await verifySessionToken(invalidToken);
    expect(result).toBeNull();
  });
});
