/**
 * Netlify Serverless Function: auth-login
 * Route: POST /.netlify/functions/auth-login (or /api/auth-login)
 *
 * Provides secure administrator authentication running server-side in Node.js.
 * Credentials and secrets are read from server environment variables and never
 * exposed in the client-side JavaScript bundle.
 */

import crypto from "crypto";

// In-memory rate limiting map (IP -> { attempts: number, lockUntil: number, resetAt: number })
const rateLimitMap = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout
const WINDOW_MS = 15 * 60 * 1000;  // 15 minutes window

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
      return { allowed: false, error: `Too many failed login attempts. Account locked. Please try again in ${waitMinutes} minutes.` };
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

export const handler = async (event) => {
  // Only accept POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  const clientIp = getClientIp(event);
  const rateLimitStatus = checkRateLimit(clientIp);
  if (!rateLimitStatus.allowed) {
    return {
      statusCode: 429,
      headers: {
        "Content-Type": "application/json",
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON request body." })
    };
  }

  const { username, password } = body;
  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Username and password are required." })
    };
  }

  // Read server-side credentials from Netlify environment variables
  const validAdminUser = process.env.ADMIN_USERNAME || "admin";
  const validAdminPassword = process.env.ADMIN_PASSWORD || "admin@dineeqr12345";
  const sessionSecret = process.env.SESSION_SECRET || "dineeqr_secure_blackcardinal_hmac_secret_2026_prod";

  const isUserMatch = username.trim() === validAdminUser;
  // Constant-time comparison for password to mitigate timing attacks
  let isPasswordMatch = false;
  try {
    const enteredBuf = Buffer.from(password);
    const validBuf = Buffer.from(validAdminPassword);
    if (enteredBuf.length === validBuf.length) {
      isPasswordMatch = crypto.timingSafeEqual(enteredBuf, validBuf);
    }
  } catch {
    isPasswordMatch = false;
  }

  if (!isUserMatch || !isPasswordMatch) {
    recordAttempt(clientIp, false);
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid credentials. Please verify your username and password." })
    };
  }

  // Successful authentication
  recordAttempt(clientIp, true);

  // 8-hour session expiration
  const sessionDurationSec = 8 * 60 * 60;
  const nowSec = Math.floor(Date.now() / 1000);
  const expSec = nowSec + sessionDurationSec;

  const payload = {
    sub: username.trim(),
    role: "admin",
    iat: nowSec,
    exp: expSec
  };

  const token = createSessionToken(payload, sessionSecret);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    },
    body: JSON.stringify({
      success: true,
      token,
      expiresAt: expSec * 1000,
      user: {
        username: validAdminUser,
        role: "admin"
      }
    })
  };
};
