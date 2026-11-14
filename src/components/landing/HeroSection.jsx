import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ArrowUpRight, Eye, Sparkles, CheckCircle2, QrCode, Shield, Utensils, Smartphone, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "../common/FloatingWhatsAppButton";

export default function HeroSection({ onOpenEnquiry }) {
  const demoUrl = typeof window !== "undefined"
    ? `${window.location.origin}/menu/the-spice-route`
    : "https://dineeqr.blackcardinal.in/menu/the-spice-route";

  return (
    <section className="hero-section" id="home">
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="landing-container hero-grid">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>DineEQR by Black Cardinal</span>
            <span className="badge-divider">•</span>
            <span className="badge-accent">Scan. Explore. Order.</span>
          </div>

          <h1 className="hero-title">
            Your Restaurant.<br />
            Your Digital Menu.<br />
            <span className="gradient-text">One Scan Away.</span>
          </h1>

          <p className="hero-subtitle">
            Create a beautiful digital menu for your restaurant, café or food business. Let customers explore your menu with one simple QR scan.
          </p>

          <div className="hero-cta-group">
            <Link to="/admin" className="btn btn-primary btn-xl">
              Create Your Digital Menu <ArrowUpRight size={18} />
            </Link>
            <a
              href={getWhatsAppUrl("Hello DineEQR Team! I am interested in creating a digital QR menu for my restaurant. Please share the details and pricing.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-xl"
            >
              <MessageCircle size={18} /> Talk to Our Team
            </a>
            <Link to="/menu/the-spice-route" className="btn btn-outline btn-xl">
              <Eye size={18} /> Explore Live Demo
            </Link>
          </div>

          {/* Social Proof & Value Chips */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <CheckCircle2 size={16} className="text-coral" />
              <span>Free 8-day trial</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="text-coral" />
              <span>₹100/mo after trial</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="text-coral" />
              <span>Instant price & item updates</span>
            </div>
          </div>

          <div className="launch-offer-badge" onClick={onOpenEnquiry}>
            <Sparkles size={16} className="text-coral" />
            <span><strong>Launch Special:</strong> First 8 small shops get free custom QR design assistance!</span>
            <span className="claim-link">Claim now →</span>
          </div>
        </motion.div>

        {/* Animated Interactive Mockup */}
        <motion.div
          className="hero-mockup-wrapper"
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="mockup-frame">
            <div className="mockup-header-bar">
              <span className="mac-dot red" />
              <span className="mac-dot yellow" />
              <span className="mac-dot green" />
              <span className="mockup-url-pill">dineeqr.blackcardinal.in/menu/the-spice-route</span>
            </div>

            <div className="mockup-body">
              {/* Restaurant Header snippet */}
              <div className="mockup-rest-head">
                <div className="mockup-avatar">🍛</div>
                <div>
                  <h4 className="mockup-name">The Spice Route</h4>
                  <p className="mockup-sub">Royal North Indian & Tandoor • Open Now</p>
                </div>
                <span className="live-status-pill">Active</span>
              </div>

              {/* QR Centerpiece */}
              <div className="mockup-qr-box">
                <div className="qr-container-card">
                  <QRCodeSVG
                    value={demoUrl}
                    size={160}
                    level="H"
                    includeMargin
                    bgColor="#FAF8F5"
                    fgColor="#111317"
                  />
                </div>
                <div className="qr-instruction">
                  <QrCode size={16} />
                  <span>Scan with your phone camera to test live menu</span>
                </div>
              </div>

              {/* Sample dish cards preview */}
              <div className="mockup-items-preview">
                <div className="mini-dish-card">
                  <span className="diet-dot veg" />
                  <div className="mini-dish-info">
                    <strong>Tandoori Malai Paneer Tikka</strong>
                    <span>₹260</span>
                  </div>
                  <span className="featured-chip">Chef's Pick</span>
                </div>
                <div className="mini-dish-card">
                  <span className="diet-dot non-veg" />
                  <div className="mini-dish-info">
                    <strong>Old Delhi Butter Chicken</strong>
                    <span>₹380</span>
                  </div>
                  <span className="bestseller-chip">Bestseller</span>
                </div>
              </div>

              <div className="mockup-footer">
                <span>DineEQR by Black Cardinal</span>
                <Link to="/menu/the-spice-route" className="mockup-open-btn">
                  Open Full Menu <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Accents */}
          <div className="floating-card floating-card-top">
            <div className="float-icon-bubble">⚡</div>
            <div>
              <strong>Instant Updates</strong>
              <small>Change dishes in real-time</small>
            </div>
          </div>

          <div className="floating-card floating-card-bottom">
            <div className="float-icon-bubble">📱</div>
            <div>
              <strong>100% App-Free</strong>
              <small>Works in every mobile browser</small>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
