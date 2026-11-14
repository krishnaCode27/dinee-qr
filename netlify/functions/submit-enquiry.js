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

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  const clientIp = getClientIp(event);
  if (!checkRateLimit(clientIp)) {
    return {
      statusCode: 429,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Rate limit exceeded. Please wait a while before submitting another enquiry." })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON request." })
    };
  }

  // Honeypot check: If bot fills hidden field '_hp', pretend success but drop
  if (body._hp) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, message: "Enquiry received." })
    };
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const phone = typeof body.phone === "string" ? body.phone.replace(/[^0-9+]/g, "").slice(0, 20) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 120) : "";
  const restaurantName = typeof body.restaurantName === "string" ? body.restaurantName.trim().slice(0, 120) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
  const plan = typeof body.plan === "string" ? body.plan.trim().slice(0, 60) : "General Enquiry";

  if (!name || (!phone && !email)) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Name and at least one contact method (phone or email) are required." })
    };
  }

  // Safe sanitized enquiry record
  const enquiry = {
    id: `enq-${Date.now()}`,
    name,
    phone,
    email,
    restaurantName,
    message,
    plan,
    status: "New",
    createdAt: new Date().toISOString()
  };

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      success: true,
      message: "Enquiry submitted successfully.",
      data: enquiry
    })
  };
};
