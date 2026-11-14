import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TEMPLATES } from "../../data/seedData";
import { ArrowUpRight, Palette, Check, Sparkles, Eye, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "../common/FloatingWhatsAppButton";

export default function TemplateGallery({ onSelectTemplate }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Luxury & Contemporary", "Coffee & Brunch", "Fast & Vibrant", "High End", "Bakehouse & Sweets", "Quick Service (QSR)", "Modern Minimalist", "Casual & Family"];

  const filtered = activeFilter === "All"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeFilter);

  return (
    <section className="section-padding landing-section template-gallery-section" id="templates">
      <div className="landing-container">
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <Palette size={14} className="text-coral" />
            <span>VERSATILE MENU DESIGNS</span>
          </div>
          <h2 className="section-title">
            Tailored for Every Dining Style
          </h2>
          <p className="section-desc">
            Whether you operate a high-end rooftop restaurant, a cozy neighborhood cafe, or a fast-paced street counter, DineEQR has a design crafted to elevate your food presentation.
          </p>
        </div>

        {/* Template Grid */}
        <div className="templates-grid">
          {filtered.map((tpl) => (
            <div key={tpl.id} className="template-card">
              <div
                className="template-card-preview"
                style={{ background: tpl.previewBg }}
              >
                <div className="preview-top-tags">
                  <span className="template-category-pill">{tpl.category}</span>
                  {tpl.badge && <span className="template-badge-pill">{tpl.badge}</span>}
                </div>

                <div className="preview-mock-ui">
                  <div className="preview-bar" />
                  <div className="preview-dish-line" />
                  <div className="preview-dish-line short" />
                </div>

                <div className="preview-accent-dot" style={{ backgroundColor: tpl.accentColor }} />
              </div>

              <div className="template-card-content">
                <div className="template-card-header">
                  <h3 className="template-name">{tpl.name}</h3>
                  <span className="template-tagline">{tpl.tagline}</span>
                </div>
                <p className="template-desc">{tpl.description}</p>

                <div className="template-actions">
                  <Link
                    to="/menu/the-spice-route"
                    className="template-preview-btn"
                  >
                    <Eye size={14} /> Preview Style
                  </Link>
                  <Link
                    to="/admin"
                    className="template-use-btn"
                  >
                    Use in Admin <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Demo & WhatsApp Action Banner */}
        <div className="template-banner-cta">
          <div className="banner-left">
            <Sparkles size={24} className="text-coral" />
            <div>
              <h4>Want to see how your menu looks on actual smartphones?</h4>
              <p>Test out our live demo or talk directly with our design team to customize your layout.</p>
            </div>
          </div>
          <div className="banner-right">
            <a
              href={getWhatsAppUrl("Hello DineEQR Team! I saw your restaurant menu designs and want this menu for my restaurant. Please guide me on getting started.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={16} /> Want This Menu for Your Restaurant?
            </a>
            <Link to="/menu/the-spice-route" className="btn btn-outline">
              <Eye size={16} /> Open The Spice Route Demo
            </Link>
            <Link to="/admin" className="btn btn-primary">
              Set Up Your Menu Free <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
