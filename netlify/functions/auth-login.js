/**
 * Netlify Serverless Function: auth-login
 * Route: POST /.netlify/functions/auth-login (or /api/auth-login)
 *
 * Provides secure administrator authentication running server-side in Node.js.
 * Credentials and secrets are strictly read from server environment variables
 * and never exposed to client-side bundles or public repositories.
 */

import crypto from "crypto";

// In-memory rate limiting map (IP -> { attempts: number, lockUntil: number, resetAt: number })
const rateLimitMap = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout
const WINDOW_MS = 15 * 60 * 1000;  // 15 minutes tracking window

// Ephemeral runtime session fallback secret generated at cold start if not configured
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

function getClientIp(event) {
  const headers = event.headers || {};
  return (
    headers["x-nf-client-connection-ip"] ||
    headers["client-ip"] ||
    headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    "unknown-ip"
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (record) {
    if (record.lockUntil && record.lockUntil > now) {
      const waitMinutes = Math.ceil((record.lockUntil - now) / 60000);
      return { allowed: false, error: `Too many failed login attempts. Account temporarily locked. Please try again in ${waitMinutes} minutes.` };
    }
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
  return { allowed: true };
}

function recordAttempt(ip, success) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { attempts: 0, resetAt: now + WINDOW_MS };

  if (success) {
    rateLimitMap.delete(ip);
    return;
  }

  record.attempts += 1;
  if (record.attempts >= MAX_ATTEMPTS) {
    record.lockUntil = now + LOCKOUT_MS;
  }
  rateLimitMap.set(ip, record);
}

// Generate an HMAC-SHA256 signed session token
function createSessionToken(payload, secret) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${signature}`;
}

// Timing-attack proof constant-time comparison helper
function verifyPassword(enteredPassword, configuredSecret) {
  if (!enteredPassword || !configuredSecret) return false;

  // Support PBKDF2 hashed password format: pbkdf2:<saltHex>:<iterations>:<hashHex>
  if (typeof configuredSecret === "string" && configuredSecret.startsWith("pbkdf2:")) {
    const parts = configuredSecret.split(":");
    if (parts.length === 4) {
      try {
        const [, saltHex, iterationsStr, hashHex] = parts;
        const iterations = parseInt(iterationsStr, 10) || 100000;
        const salt = Buffer.from(saltHex, "hex");
        const expectedBuf = Buffer.from(hashHex, "hex");
        const derivedBuf = crypto.pbkdf2Sync(enteredPassword, salt, iterations, expectedBuf.length, "sha512");
        return crypto.timingSafeEqual(derivedBuf, expectedBuf);
      } catch {
        return false;
      }
    }
  }

  // Direct constant-time string comparison via SHA-256 fixed-length digests
  try {
    const enteredHash = crypto.createHash("sha256").update(String(enteredPassword)).digest();
    const expectedHash = crypto.createHash("sha256").update(String(configuredSecret)).digest();
    return crypto.timingSafeEqual(enteredHash, expectedHash);
  } catch {
    return false;
  }
}

function verifyUsername(enteredUsername, configuredUsername) {
  if (!enteredUsername || !configuredUsername) return false;
  try {
    const enteredHash = crypto.createHash("sha256").update(String(enteredUsername).trim().toLowerCase()).digest();
    const expectedHash = crypto.createHash("sha256").update(String(configuredUsername).trim().toLowerCase()).digest();
    return crypto.timingSafeEqual(enteredHash, expectedHash);
  } catch {
    return false;
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

  // Only accept POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...securityHeaders, Allow: "POST" },
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  const clientIp = getClientIp(event);
  const rateLimitStatus = checkRateLimit(clientIp);
  if (!rateLimitStatus.allowed) {
    return {
      statusCode: 429,
      headers: {
        ...securityHeaders,
        "Retry-After": "900"
      },
      body: JSON.stringify({ error: rateLimitStatus.error })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: securityHeaders,
      body: JSON.stringify({ error: "Invalid JSON request body." })
    };
  }

  const { username, password } = body;
  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    return {
      statusCode: 400,
      headers: securityHeaders,
      body: JSON.stringify({ error: "Username and password are required." })
    };
  }

  // Strict enforcement: Credentials must be configured in server environment variables
  const configuredAdminUser = (process.env.ADMIN_USERNAME && process.env.ADMIN_USERNAME !== "undefined") ? process.env.ADMIN_USERNAME : "admin";
  const rawHash = process.env.ADMIN_PASSWORD_HASH;
  const rawPass = process.env.ADMIN_PASSWORD;
  const configuredAdminPassword = (rawHash && rawHash !== "undefined") ? rawHash : ((rawPass && rawPass !== "undefined") ? rawPass : null);

  if (!configuredAdminPassword) {
    return {
      statusCode: 500,
      headers: securityHeaders,
      body: JSON.stringify({
        error: "Server authentication error: ADMIN_PASSWORD is not configured in server environment variables."
      })
    };
  }

  const isUserValid = verifyUsername(username, configuredAdminUser);
  const isPasswordValid = verifyPassword(password, configuredAdminPassword);

  if (!isUserValid || !isPasswordValid) {
    recordAttempt(clientIp, false);
    return {
      statusCode: 401,
      headers: securityHeaders,
      body: JSON.stringify({ error: "Invalid administrator credentials. Please check your username and password." })
    };
  }

  // Successful authentication: Reset failed attempt count
  recordAttempt(clientIp, true);

  // Configurable session expiration duration (Default: 8 hours)
  const hours = Math.max(1, Math.min(72, parseInt(process.env.SESSION_EXPIRY_HOURS, 10) || 8));
  const sessionDurationSec = hours * 60 * 60;
  const nowSec = Math.floor(Date.now() / 1000);
  const expSec = nowSec + sessionDurationSec;

  const payload = {
    sub: username.trim(),
    role: "admin",
    iat: nowSec,
    exp: expSec
  };

  const secret = getSessionSecret();
  const token = createSessionToken(payload, secret);

  return {
    statusCode: 200,
    headers: securityHeaders,
    body: JSON.stringify({
      success: true,
      token,
      expiresAt: expSec * 1000,
      user: {
        username: configuredAdminUser,
        role: "admin"
      }
    })
  };
};
