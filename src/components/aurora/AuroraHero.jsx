import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import AuroraShopLogo from "./AuroraShopLogo";
import { AURORA_BRAND } from "../../data/auroraData";

export default function AuroraHero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="aurora-hero-section">
      {/* Ambient background glows */}
      <div className="aurora-ambient-glow aurora-glow-top" aria-hidden="true" />
      <div className="aurora-ambient-glow aurora-glow-bottom" aria-hidden="true" />

      <div className="aurora-hero-content">
        {/* Curated Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="aurora-badge-pill"
        >
          <Sparkles size={14} className="aurora-sparkle-icon" />
          <span>Complete Family Fashion</span>
          <span className="aurora-badge-dot">•</span>
          <MapPin size={12} className="text-gold" />
          <span>Ganiyari</span>
        </motion.div>

        {/* Golden Shop Logo Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="aurora-hero-logo-wrap"
        >
          <AuroraShopLogo size={88} />
        </motion.div>

        {/* Main Brand Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="aurora-brand-headline"
        >
          <span className="headline-first">Arora</span>{" "}
          <span className="headline-second">Exclusive</span>
        </motion.h1>

        {/* Brand Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="aurora-hero-tagline"
        >
          Fashion for the Whole Family
        </motion.p>

        {/* Short Business Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="aurora-hero-intro"
        >
          {AURORA_BRAND.description}
        </motion.p>

        {/* Store Location Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="aurora-location-pill"
        >
          <MapPin size={15} className="text-gold flex-shrink-0" />
          <span>In front of SBI Bank, Ganiyari</span>
        </motion.div>

        {/* Category Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="aurora-hero-chips"
        >
          <span className="aurora-chip">Men's Wear</span>
          <span className="aurora-chip">Women's Wear</span>
          <span className="aurora-chip">Kids' Wear</span>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="aurora-hero-ctas"
        >
          <a
            href={AURORA_BRAND.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="aurora-cta-primary"
            aria-label="Direct WhatsApp personal consultation"
          >
            <MessageCircle size={18} className="cta-icon" />
            <span>Chat on WhatsApp</span>
            <ArrowRight size={16} className="cta-arrow" />
          </a>

          <a
            href={AURORA_BRAND.googleBusiness.url}
            target="_blank"
            rel="noopener noreferrer"
            className="aurora-cta-secondary"
            aria-label="Visit Google Business profile"
          >
            <MapPin size={17} />
            <span>Find Store on Google</span>
          </a>
        </motion.div>

        {/* Live Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="aurora-hero-footer-status"
        >
          <div className="status-live-indicator">
            <span className="live-dot" />
            <span>Open for Store Visits</span>
          </div>
          <span className="status-divider">•</span>
          <span className="status-text">{AURORA_BRAND.timings}</span>
        </motion.div>
      </div>
    </section>
  );
}
