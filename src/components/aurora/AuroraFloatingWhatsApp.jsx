import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { AURORA_BRAND } from "../../data/auroraData";

export default function AuroraFloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Also show after 3 seconds anyway
    const timer = setTimeout(() => setIsVisible(true), 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <aside className="aurora-floating-wa-wrap" aria-label="WhatsApp Contact">
      {showTooltip && (
        <div className="aurora-wa-tooltip">
          <div className="wa-tooltip-text">
            <strong>Need Outfit Assistance?</strong>
            <span>Chat directly with Aurora Exclusive</span>
          </div>
          <button
            type="button"
            className="wa-tooltip-close"
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss tooltip"
          >
            <X size={13} />
          </button>
        </div>
      )}

      <a
        href={AURORA_BRAND.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        className="aurora-floating-wa-btn"
        aria-label="Chat with Aurora Exclusive on WhatsApp (+91 7722866553)"
      >
        <span className="aurora-wa-badge">1</span>
        <div className="aurora-wa-pulse" />
        <MessageCircle size={26} className="aurora-wa-icon" />
      </a>
    </aside>
  );
}
