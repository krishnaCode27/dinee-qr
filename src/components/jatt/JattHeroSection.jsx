import React from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Star,
  Clock,
  MapPin,
  Phone,
  Share2,
  Check,
  ChevronDown,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function JattHeroSection({
  brand,
  onExploreClick,
  onShareClick,
  shareCopied
}) {
  return (
    <section className="jatt-hero-section">
      {/* Dynamic Animated Ambient Background */}
      <div className="jatt-hero-ambient-glow" />
      <div className="jatt-hero-pattern-grid" />

      {/* Floating Accent Embers / Particles */}
      <motion.div
        className="jatt-floating-ember ember-1"
        animate={{
          y: [-10, 15, -10],
          x: [-5, 8, -5],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="jatt-floating-ember ember-2"
        animate={{
          y: [12, -18, 12],
          x: [8, -6, 8],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="jatt-floating-ember ember-3"
        animate={{
          y: [-15, 10, -15],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="jatt-container jatt-hero-grid">
        {/* Left Column: Brand Typography & Info */}
        <motion.div
          className="jatt-hero-text-col"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Pill / Badge */}
          <div className="jatt-hero-top-badges">
            <span className="jatt-hero-pill-badge">
              <Flame size={14} className="jatt-text-orange" />
              <span>STREET FOOD REVOLUTION</span>
            </span>
            <span className="jatt-hero-rating-badge">
              <Star size={13} fill="#FFB703" color="#FFB703" />
              <strong>{brand.rating}</strong>
              <small>({brand.reviewsCount})</small>
            </span>
          </div>

          {/* Main Title with Styled Accent */}
          <h1 className="jatt-hero-main-title">
            <span className="jatt-title-highlight">JATT ROLL</span>
            <span className="jatt-title-sub">MENU</span>
          </h1>

          {/* Subtitle */}
          <p className="jatt-hero-categories-subtitle">
            Rolls <span className="jatt-bullet">•</span> Chaap{" "}
            <span className="jatt-bullet">•</span> Fries{" "}
            <span className="jatt-bullet">•</span> Shakes
          </p>

          {/* Tagline */}
          <p className="jatt-hero-tagline">
            Bold Flavours. Loaded Rolls. Full Satisfaction.
          </p>

          {/* Veg / Non-Veg Indicator Chips */}
          <div className="jatt-diet-indicators-row">
            <div className="jatt-diet-indicator-chip is-veg">
              <span className="jatt-diet-symbol" />
              <span>100% Pure Veg Options</span>
            </div>
            <div className="jatt-diet-indicator-chip is-egg">
              <span className="jatt-diet-symbol" />
              <span>Classic Egg Rolls</span>
            </div>
          </div>

          {/* Quick Restaurant Information Chips */}
          <div className="jatt-hero-meta-chips">
            <div className="jatt-meta-chip">
              <Clock size={13} className="jatt-meta-icon" />
              <span>{brand.openingHours}</span>
            </div>
            <div className="jatt-meta-chip">
              <MapPin size={13} className="jatt-meta-icon" />
              <span>{brand.location}, {brand.city}</span>
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div className="jatt-hero-actions-row">
            <motion.button
              type="button"
              className="jatt-btn jatt-btn-primary jatt-hero-explore-btn"
              onClick={onExploreClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Explore 20 Menu Items</span>
              <ArrowRight size={17} />
            </motion.button>

            <button
              type="button"
              className="jatt-btn jatt-btn-outline jatt-hero-share-btn"
              onClick={onShareClick}
              title="Share Digital Menu URL"
            >
              {shareCopied ? (
                <>
                  <Check size={16} className="jatt-text-green" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 size={16} />
                  <span>Share Menu</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Right Column: Visual Food Montage & Floating Cards */}
        <motion.div
          className="jatt-hero-visual-col"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="jatt-hero-image-frame">
            <img
              src={brand.heroImage}
              alt="JATT ROLL Loaded Roll and Tandoori Chaap"
              className="jatt-hero-img"
            />
            <div className="jatt-hero-image-overlay" />

            {/* Floating Floating Badge: Spicy Bhoot */}
            <motion.div
              className="jatt-floating-card jatt-float-left"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="jatt-float-icon">🔥</div>
              <div>
                <strong>Spicy Bhoot</strong>
                <p>Ghost Pepper Roll • ₹199</p>
              </div>
            </motion.div>

            {/* Floating Badge: Kadak Singh Loaded */}
            <motion.div
              className="jatt-floating-card jatt-float-right"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <div className="jatt-float-icon">⭐</div>
              <div>
                <strong>Kadak Singh Chaap</strong>
                <p>Loaded Roll • ₹179</p>
              </div>
            </motion.div>

            {/* Bottom Strip in Image Frame */}
            <div className="jatt-hero-frame-footer">
              <span className="jatt-badge-pill">🌯 Handcrafted Fresh Daily</span>
              <span className="jatt-badge-pill">⚡ Direct WhatsApp Ordering</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="jatt-scroll-down-wrap">
        <button
          type="button"
          onClick={onExploreClick}
          className="jatt-scroll-prompt-btn"
          aria-label="Scroll down to menu"
        >
          <span>Scroll to Menu</span>
          <ChevronDown size={16} className="jatt-bounce-icon" />
        </button>
      </div>
    </section>
  );
}
