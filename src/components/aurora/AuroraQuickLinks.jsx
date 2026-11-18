import React from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, MapPin, ArrowUpRight, Star, ExternalLink, PhoneCall, Sparkles } from "lucide-react";
import { AURORA_BRAND } from "../../data/auroraData";

export default function AuroraQuickLinks() {
  const links = [
    {
      id: "instagram",
      title: "Follow Us on Instagram",
      subtitle: AURORA_BRAND.instagram.description,
      handle: AURORA_BRAND.instagram.display,
      url: AURORA_BRAND.instagram.url,
      actionText: "View @arora_exclusive",
      badge: "Official Profile",
      icon: Instagram,
      gradient: "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)",
      glowColor: "rgba(221, 42, 123, 0.25)"
    },
    {
      id: "whatsapp",
      title: "Chat With Us on WhatsApp",
      subtitle: AURORA_BRAND.whatsapp.description,
      handle: AURORA_BRAND.whatsapp.display,
      url: `${AURORA_BRAND.whatsapp.url}?text=${encodeURIComponent(AURORA_BRAND.whatsapp.defaultText)}`,
      actionText: "Start WhatsApp Chat",
      badge: "Instant Assistance",
      icon: MessageCircle,
      gradient: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
      glowColor: "rgba(37, 211, 102, 0.25)"
    },
    {
      id: "google",
      title: "Find Us / View Reviews on Google",
      subtitle: AURORA_BRAND.googleBusiness.description,
      handle: "Google Business Verified",
      url: AURORA_BRAND.googleBusiness.url,
      actionText: "Explore Google Profile",
      badge: "Store & Reviews",
      icon: MapPin,
      gradient: "linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC05 100%)",
      glowColor: "rgba(66, 133, 244, 0.25)"
    }
  ];

  return (
    <section id="aurora-quick-links" className="aurora-section aurora-quicklinks-section">
      <div className="aurora-container">
        {/* Section Header */}
        <div className="aurora-section-header">
          <div className="aurora-section-subtitle-wrap">
            <Sparkles size={14} className="text-gold" />
            <span className="aurora-section-subtitle">Official Direct Channels</span>
          </div>
          <h2 className="aurora-section-title">Connect with Arora Exclusive</h2>
          <p className="aurora-section-description">
            Follow our latest fashion drops on Instagram, chat directly on WhatsApp, or navigate to our store in front of SBI Bank, Ganiyari.
          </p>
        </div>

        {/* Quick Links Cards Grid */}
        <div className="aurora-links-grid">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="aurora-link-card"
                style={{ "--glow-color": link.glowColor }}
              >
                {/* Accent Top Line */}
                <div className="aurora-card-accent-line" style={{ background: link.gradient }} />

                <div className="aurora-card-inner">
                  {/* Left Icon Badge */}
                  <div className="aurora-card-icon-wrap" style={{ background: link.gradient }}>
                    <Icon size={24} className="aurora-card-icon" />
                  </div>

                  {/* Center Content */}
                  <div className="aurora-card-body">
                    <div className="aurora-card-top-meta">
                      <span className="aurora-card-handle">{link.handle}</span>
                      <span className="aurora-card-badge">{link.badge}</span>
                    </div>

                    <h3 className="aurora-card-title">{link.title}</h3>
                    <p className="aurora-card-description">{link.subtitle}</p>

                    <div className="aurora-card-cta">
                      <span className="aurora-cta-link-text">{link.actionText}</span>
                      <div className="aurora-cta-icon-circle">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Quick Call Direct Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="aurora-call-banner"
        >
          <div className="aurora-call-info">
            <div className="aurora-call-icon-wrap">
              <PhoneCall size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="aurora-call-title">Prefer a direct voice conversation?</h4>
              <p className="aurora-call-subtitle">Call our personal shopping line directly at {AURORA_BRAND.whatsapp.display}</p>
            </div>
          </div>
          <a
            href={`tel:${AURORA_BRAND.whatsapp.number}`}
            className="aurora-call-btn"
            aria-label="Call Aurora Exclusive"
          >
            <PhoneCall size={15} />
            <span>Call Now</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
