import React, { useEffect, useState } from "react";
import AuroraLoader from "./AuroraLoader";
import AuroraParticles from "./AuroraParticles";
import AuroraHero from "./AuroraHero";
import AuroraQuickLinks from "./AuroraQuickLinks";
import AuroraStoreGallery from "./AuroraStoreGallery";
import AuroraMinimalFooter from "./AuroraMinimalFooter";
import AuroraCornerQR from "./AuroraCornerQR";
import AuroraFloatingWhatsApp from "./AuroraFloatingWhatsApp";
import { AURORA_BRAND } from "../../data/auroraData";
import "./aurora-styles.css";

export default function AuroraExclusivePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamic SEO Title & Meta Tag Updates for Arora Exclusive
    document.title = `${AURORA_BRAND.name} | Exclusive Fashion for Men, Women & Kids - Ganiyari`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `${AURORA_BRAND.name} (${AURORA_BRAND.location}): ${AURORA_BRAND.description} Follow on Instagram, chat on WhatsApp, or visit our retail store.`
      );
    }

    // Scroll to top on first mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aurora-page-wrapper mobile-focused-shell">
      {/* 1. Loading Splash Screen with Shop Logo */}
      <AuroraLoader onLoaded={() => setIsLoaded(true)} />

      {/* 2. Floating Golden Particles Background Animation */}
      <AuroraParticles />

      {/* 3. Centered Mobile-First Layout Container */}
      <div className="aurora-mobile-container">
        <main className="aurora-main-content">
          {/* Hero Section with Shop Logo, Name & Landmark */}
          <AuroraHero />

          {/* Quick Links — Link-in-Bio Core Channels (Instagram, WhatsApp, Google Business, Call) */}
          <AuroraQuickLinks />

          {/* Only Two Real Store Images: Exterior & Interior Showroom */}
          <AuroraStoreGallery />
        </main>

        {/* 4. Minimalist Footer with ONLY 'Report this page' */}
        <AuroraMinimalFooter />
      </div>

      {/* 5. Bottom Right Corner QR Code Widget */}
      <AuroraCornerQR />

      {/* 6. Floating WhatsApp Concierge */}
      <AuroraFloatingWhatsApp />
    </div>
  );
}
