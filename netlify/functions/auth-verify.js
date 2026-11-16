/**
 * Netlify Serverless Function: auth-verify
 * Route: POST or GET /.netlify/functions/auth-verify (or /api/auth-verify)
 *
 * Verifies HMAC-SHA256 signed session tokens, validates expiration,
 * and ensures user roles cannot be spoofed via client-side manipulation.
 */

import crypto from "crypto";

// Ephemeral runtime session fallback secret
let runtimeEphemeralSecret = null;
function getSessionSecret() {
  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.trim().length >= 32) {
    return process.env.SESSION_SECRET.trim();
  }
  if (!runtimeEphemeralSecret) {
    runtimeEphemeralSecret = crypto.randomBytes(64).toString("hex");
  }
  return runtimeEphemeralSecret;
}

function verifySessionToken(token, secret) {
  if (!token || typeof token !== "string") return { valid: false, error: "Missing token" };

  const parts = token.split(".");
  if (parts.length !== 3) return { valid: false, error: "Malformed token structure" };

  const [headerB64, payloadB64, signatureB64] = parts;

  // Recompute expected signature
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(`${headerB64}.${payloadB64}`)
    .digest("base64url");

  // Constant-time signature comparison using fixed SHA-256 digests
  try {
    const sigHash = crypto.createHash("sha256").update(signatureB64).digest();
    const expHash = crypto.createHash("sha256").update(expectedSig).digest();
    if (!crypto.timingSafeEqual(sigHash, expHash)) {
      return { valid: false, error: "Invalid signature" };
    }
  } catch {
    return { valid: false, error: "Signature verification failed" };
  }

  // Parse payload and check expiration
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
    const nowSec = Math.floor(Date.now() / 1000);

    if (!payload || typeof payload !== "object") {
      return { valid: false, error: "Invalid token payload" };
    }

    if (payload.exp && payload.exp < nowSec) {
      return { valid: false, error: "Session token has expired", expired: true };
    }

    if (payload.role !== "admin") {
      return { valid: false, error: "Insufficient permissions" };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, error: "Failed to decode payload" };
  }
}

export const handler = async (event) => {
  const securityHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY"
  };

  const secret = getSessionSecret();

  // Extract token from Authorization header or body
  let token = null;
  const authHeader = event.headers["authorization"] || event.headers["Authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7).trim();
  } else if (event.body) {
    try {
      const parsed = JSON.parse(event.body);
      token = parsed.token;
    } catch {
      // ignore
    }
  }

  if (!token) {
    return {
      statusCode: 401,
      headers: securityHeaders,
      body: JSON.stringify({ valid: false, error: "No authentication token provided." })
    };
  }

  // Cryptographically verify token
  const result = verifySessionToken(token, secret);
  if (!result.valid) {
    return {
      statusCode: 401,
      headers: securityHeaders,
      body: JSON.stringify({ valid: false, error: result.error, expired: Boolean(result.expired) })
    };
  }

  return {
    statusCode: 200,
    headers: securityHeaders,
    body: JSON.stringify({
      valid: true,
      user: {
        username: result.payload.sub,
        role: result.payload.role || "admin"
      },
      expiresAt: (result.payload.exp || 0) * 1000
    })
  };
};
