// DineEQR by Black Cardinal — Official Brand Logo & Wordmark
import React from "react";
import { Link } from "react-router-dom";

export function CircularBrandLogo({ size = 36, className = "" }) {
  return (
    <div
      className={`circular-logo-wrapper ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        backgroundColor: "#090909",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
      }}
    >
      <img
        src="/images/logo/dineeqr-circular-favicon-512.png"
        alt="DineEQR by Black Cardinal Logo"
        width={size}
        height={size}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          borderRadius: "50%",
          imageRendering: "-webkit-optimize-contrast"
        }}
        onError={(e) => {
          // If image fails to load, gracefully fallback to icon
          e.target.style.display = "none";
        }}
      />
    </div>
  );
}

// Retain BlackCardinalBird export for backward compatibility
export function BlackCardinalBird({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx="26" fill="currentColor" fillOpacity="0.12" />
      <path
        d="M26 68L48 24L74 54L64 68L48 56L34 68H26Z"
        fill="url(#cardinal_grad)"
      />
      <circle cx="58" cy="38" r="4.5" fill="#FAF8F5" />
      <path
        d="M38 60L52 44L62 60L48 52Z"
        fill="#E31B23"
        fillOpacity="0.85"
      />
      <defs>
        <linearGradient id="cardinal_grad" x1="26" y1="24" x2="74" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E31B23" />
          <stop offset="1" stopColor="#A81017" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function BrandLogo({
  light = false,
  size = "md",
  withTagline = false,
  linkTo = "/",
  collapsed = false,
  className = ""
}) {
  const pixelSizeMap = {
    xs: 26,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 60
  };
  const pixelSize = pixelSizeMap[size] || 40;

  const content = (
    <div className={`brand-wrapper ${light ? "brand-light" : "brand-dark"} brand-size-${size} ${className}`}>
      <div className="brand-badge">
        <CircularBrandLogo size={pixelSize} />
      </div>

      {!collapsed && (
        <div className="brand-text">
          <div className="brand-title">
            <span className="brand-name">Dine<span className="brand-accent">EQR</span></span>
            <span className="brand-by">by Black Cardinal</span>
          </div>
          {withTagline && (
            <span className="brand-tagline">Scan. Explore. Order.</span>
          )}
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="brand-link-wrap" aria-label="DineEQR by Black Cardinal">{content}</Link>;
  }

  return content;
}
