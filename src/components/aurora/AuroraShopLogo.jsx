import React from "react";

export default function AuroraShopLogo({ size = 80, className = "" }) {
  return (
    <div
      className={`aurora-shop-logo-emblem ${className}`}
      style={{ width: size, height: size }}
      aria-label="Arora Exclusive Emblem"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldRadial" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="35%" stopColor="#E5C365" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#997A1C" />
          </linearGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Laurel Frame */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#goldRadial)"
          strokeWidth="1.8"
          strokeDasharray="4 2"
          opacity="0.85"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#goldRadial)"
          strokeWidth="1.2"
        />

        {/* Central Khanda / Radiant Heritage Motif */}
        {/* Central Double-Edged Sword (Khanda) */}
        <path
          d="M48.5 18 L51.5 18 L51.5 68 L53.5 68 L53.5 76 L46.5 76 L46.5 68 L48.5 68 Z"
          fill="url(#goldRadial)"
        />
        {/* Pointy Top Blade */}
        <path
          d="M50 12 L53 19 L47 19 Z"
          fill="url(#goldRadial)"
        />

        {/* Central Quoit / Circle (Chakkar) */}
        <circle
          cx="50"
          cy="42"
          r="14"
          stroke="url(#goldRadial)"
          strokeWidth="3.2"
          fill="none"
        />

        {/* Left Kirpan (Curved Sword) */}
        <path
          d="M34 68 C22 55 24 32 37 24 C36 29 32 46 41 58 C38 62 36 65 34 68 Z"
          fill="url(#goldRadial)"
        />
        <path
          d="M34 68 L30 73 L33 75 L37 70 Z"
          fill="url(#goldRadial)"
        />

        {/* Right Kirpan (Curved Sword) */}
        <path
          d="M66 68 C78 55 76 32 63 24 C64 29 68 46 59 58 C62 62 64 65 66 68 Z"
          fill="url(#goldRadial)"
        />
        <path
          d="M66 68 L70 73 L67 75 L63 70 Z"
          fill="url(#goldRadial)"
        />

        {/* Bottom decorative stars */}
        <circle cx="50" cy="85" r="1.8" fill="url(#goldRadial)" />
        <circle cx="43" cy="84" r="1.2" fill="url(#goldRadial)" />
        <circle cx="57" cy="84" r="1.2" fill="url(#goldRadial)" />
      </svg>
    </div>
  );
}
