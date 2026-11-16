/**
 * Netlify Serverless Function: submit-enquiry
 * Route: POST /.netlify/functions/submit-enquiry (or /api/submit-enquiry)
 *
 * Provides server-side validation, rate limiting, and honeypot spam protection
 * for public restaurant onboarding inquiries.
 */

// In-memory rate limiting map (IP -> { count: number, resetAt: number })
const rateLimitMap = new Map();
const MAX_ENQUIRIES_PER_HOUR = 10;
const WINDOW_MS = 60 * 60 * 1000;

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
  const record = rateLimitMap.get(ip) || { count: 0, resetAt: now + WINDOW_MS };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + WINDOW_MS;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);

  if (record.count > MAX_ENQUIRIES_PER_HOUR) {
    return false;
  }
  return true;
}

function cleanString(val, maxLength = 200) {
  if (typeof val !== "string") return "";
  return val
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "") // strip control characters
    .trim()
    .slice(0, maxLength);
}

export const handler = async (event) => {
  const securityHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY"
  };

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...securityHeaders, Allow: "POST" },
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  const clientIp = getClientIp(event);
  if (!checkRateLimit(clientIp)) {
    return {
      statusCode: 429,
      headers: {
        ...securityHeaders,
        "Retry-After": "3600"
      },
      body: JSON.stringify({ error: "Rate limit exceeded. Please wait a while before submitting another enquiry." })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: securityHeaders,
      body: JSON.stringify({ error: "Invalid JSON request." })
    };
  }

  // Honeypot check: If bot fills hidden field '_hp', drop silently
  if (body._hp) {
    return {
      statusCode: 200,
      headers: securityHeaders,
      body: JSON.stringify({ success: true, message: "Enquiry received." })
    };
  }

  const name = cleanString(body.name, 100);
  const rawPhone = typeof body.phone === "string" ? body.phone.replace(/[^0-9+]/g, "").slice(0, 20) : "";
  const email = cleanString(body.email, 120);
  const restaurantName = cleanString(body.restaurantName, 120);
  const message = cleanString(body.message, 1000);
  const plan = cleanString(body.plan, 60) || "General Enquiry";

  if (!name || (!rawPhone && !email)) {
    return {
      statusCode: 400,
      headers: securityHeaders,
      body: JSON.stringify({ error: "Name and at least one contact method (phone or email) are required." })
    };
  }

  // Email format validation if provided
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers: securityHeaders,
      body: JSON.stringify({ error: "Invalid email format." })
    };
  }

  // Phone validation if provided
  if (rawPhone && !/^\+?[0-9]{7,16}$/.test(rawPhone)) {
    return {
      statusCode: 400,
      headers: securityHeaders,
      body: JSON.stringify({ error: "Invalid phone number format." })
    };
  }

  const enquiry = {
    id: `enq-${Date.now()}`,
    name,
    phone: rawPhone,
    email,
    restaurantName,
    message,
    plan,
    status: "New",
    createdAt: new Date().toISOString()
  };

  return {
    statusCode: 200,
    headers: securityHeaders,
    body: JSON.stringify({
      success: true,
      message: "Enquiry submitted successfully.",
      data: enquiry
    })
  };
};
