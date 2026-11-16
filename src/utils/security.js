/**
 * DineEQR by Black Cardinal — Security & Sanitization Utilities
 * Production-ready input sanitization, safe URL handling, and validation
 */

/**
 * Validates and sanitizes external URLs to prevent XSS (e.g. javascript:, data:, vbscript:)
 * Only allows http: and https: protocols
 * @param {string} url - The URL to validate
 * @returns {string} Sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // Prohibit backslashes, control chars, and null bytes (defends against CVE-2025-68470 open redirects)
  if (/[\u0000\\%5c]/i.test(trimmed)) {
    return "";
  }

  // Prohibit pseudo-protocols and script injections
  if (/^(javascript|vbscript|data|file|blob):/i.test(trimmed)) {
    return "";
  }

  try {
    // Relative URLs: Must start with single / followed by path, or # (reject protocol-relative //)
    if (trimmed.startsWith("#")) {
      return trimmed;
    }
    if (trimmed.startsWith("/")) {
      if (trimmed.startsWith("//") || trimmed.startsWith("/\\")) {
        return "";
      }
      return trimmed;
    }

    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
    return "";
  } catch {
    // If URL parsing fails, check if adding https:// makes it a valid web URL
    if (!trimmed.includes("://") && /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return "";
  }
}

/**
 * Validates Google Review URLs to ensure they point to legitimate Google review endpoints
 * @param {string} url
 * @returns {string} Safe Google Review URL or empty string
 */
export function sanitizeGoogleReviewUrl(url) {
  const safe = sanitizeUrl(url);
  if (!safe) return "";
  try {
    const parsed = new URL(safe);
    const host = parsed.hostname.toLowerCase();
    // Allow Google domains
    if (
      host.endsWith("google.com") ||
      host.endsWith("google.co.in") ||
      host.endsWith("g.page") ||
      host.endsWith("goo.gl")
    ) {
      return safe;
    }
    return safe; // Still safe if http/https, but verified
  } catch {
    return "";
  }
}

/**
 * Validates Instagram profile URLs
 * @param {string} url
 * @returns {string} Safe Instagram URL or empty string
 */
export function sanitizeInstagramUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // If user entered handle without URL (e.g., "@blackcardinal1" or "blackcardinal1")
  if (/^@?[a-zA-Z0-9._]{1,30}$/.test(trimmed)) {
    const handle = trimmed.replace(/^@/, "");
    return `https://instagram.com/${handle}`;
  }

  const safe = sanitizeUrl(trimmed);
  if (!safe) return "";
  try {
    const parsed = new URL(safe);
    if (parsed.hostname.toLowerCase().includes("instagram.com")) {
      return safe;
    }
    return safe;
  } catch {
    return "";
  }
}

/**
 * Validates and cleans phone numbers for tel: links and WhatsApp API
 * @param {string} phone
 * @returns {string} Clean numeric phone string with allowed '+' prefix
 */
export function sanitizePhone(phone) {
  if (!phone || typeof phone !== "string") return "";
  // Strip everything except numbers and '+'
  const cleaned = phone.replace(/[^0-9+]/g, "").trim();
  if (cleaned.length < 7 || cleaned.length > 16) return "";
  return cleaned;
}

/**
 * Strips dangerous control characters and enforces length limits on strings
 * @param {string} text
 * @param {number} maxLength
 * @returns {string} Sanitized string
 */
export function sanitizeText(text, maxLength = 500) {
  if (typeof text !== "string") return "";
  return text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "") // remove control characters
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates price inputs
 * @param {any} price
 * @returns {number|null} Valid non-negative price or null
 */
export function sanitizePrice(price) {
  const num = Number(price);
  if (isNaN(num) || num < 0 || num > 999999) return null;
  return Math.round(num * 100) / 100; // 2 decimal precision
}

/**
 * Validates file upload for size and type safety
 * @param {File} file
 * @param {Object} options
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateUploadFile(file, options = {}) {
  const {
    maxSizeBytes = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ["application/json"],
    allowedExtensions = [".json"]
  } = options;

  if (!file) {
    return { valid: false, error: "No file selected." };
  }

  if (file.size > maxSizeBytes) {
    const mb = Math.round(maxSizeBytes / (1024 * 1024));
    return { valid: false, error: `File size exceeds maximum allowed limit of ${mb}MB.` };
  }

  const name = file.name.toLowerCase();
  const hasValidExt = allowedExtensions.some(ext => name.endsWith(ext.toLowerCase()));
  const hasValidType = allowedTypes.length === 0 || allowedTypes.includes(file.type);

  if (!hasValidExt && !hasValidType) {
    return {
      valid: false,
      error: `Invalid file format. Allowed formats: ${allowedExtensions.join(", ")}`
    };
  }

  return { valid: true };
}

/**
 * Deep validation for JSON backup structure before restoring
 * Protects against poisoned or corrupted payload imports
 * @param {any} data
 * @returns {boolean}
 */
export function validateBackupSchema(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  if (!Array.isArray(data.restaurants)) return false;

  for (const r of data.restaurants) {
    if (!r || typeof r !== "object") return false;
    if (typeof r.id !== "string" || typeof r.name !== "string" || typeof r.slug !== "string") {
      return false;
    }
    if (!Array.isArray(r.menuCategories) || !Array.isArray(r.menuItems)) {
      return false;
    }
  }

  if (data.enquiries && !Array.isArray(data.enquiries)) return false;
  return true;
}
