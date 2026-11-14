import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Instagram,
  Printer,
  RefreshCw,
  Smartphone,
  Palette,
  Zap,
  LayoutDashboard,
  ArrowUpRight,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award
} from "lucide-react";
import { getWhatsAppUrl } from "../common/FloatingWhatsAppButton";

export default function WhyChooseSection() {
  return (
    <section className="section-padding landing-section why-choose-section" id="benefits">
      <div className="landing-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <Award size={14} className="text-coral" />
            <span>SPECIAL ADVANTAGES</span>
          </div>
          <h2 className="section-title">
            Why Choose DineEQR?
          </h2>
          <p className="section-desc">
            Everything your restaurant needs to create a smarter digital dining experience and build a stronger online presence.
          </p>
        </div>

        {/* TWO HIGHLIGHTED PREMIUM BENEFITS CARDS */}
        <div className="special-benefits-duo">
          {/* Card 1: Google Reviews */}
          <div className="special-benefit-card google-reviews-card">
            <div className="benefit-card-glow" />
            <div className="benefit-top-badge">
              <span className="badge-star-icon">⭐</span>
              <span>SPECIAL ADVANTAGE #1</span>
            </div>

            <div className="benefit-body">
              <div className="benefit-icon-header">
                <div className="google-stars-pill">
                  <div className="stars-cluster">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#FBBC05" color="#FBBC05" />
                    ))}
                  </div>
                  <span className="stars-score">5.0 Star Feedback</span>
                </div>
              </div>

              <h3 className="benefit-title">
                Turn Happy Customers Into Google Reviews
              </h3>

              <p className="benefit-description">
                Make it easier for customers to discover your Google review page directly from your digital menu. Encourage satisfied customers to share their experience and help strengthen your restaurant's online reputation.
              </p>

              <div className="benefit-highlight-box">
                <span className="highlight-tag">
                  More Reviews. More Trust. More Visibility.
                </span>
              </div>

              {/* Interactive Demo Action Button */}
              <div className="benefit-interactive-preview">
                <a
                  href="https://search.google.com/local/writereview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="benefit-action-btn google-action-btn"
                >
                  <Star size={16} fill="#FBBC05" color="#FBBC05" />
                  <span>Rate Us on Google</span>
                  <ExternalLink size={14} />
                </a>
                <small className="benefit-note">
                  ✓ Configured independently per restaurant in your admin settings
                </small>
              </div>
            </div>
          </div>

          {/* Card 2: Instagram Followers */}
          <div className="special-benefit-card instagram-followers-card">
            <div className="benefit-card-glow insta-glow" />
            <div className="benefit-top-badge insta-badge">
              <span className="badge-star-icon">📸</span>
              <span>SPECIAL ADVANTAGE #2</span>
            </div>

            <div className="benefit-body">
              <div className="benefit-icon-header">
                <div className="insta-pill-badge">
                  <Instagram size={20} className="insta-icon-gradient" />
                  <span className="insta-user-text">@YourRestaurant</span>
                </div>
              </div>

              <h3 className="benefit-title">
                Turn Menu Visitors Into Instagram Followers
              </h3>

              <p className="benefit-description">
                Let customers discover your restaurant's Instagram profile while exploring your digital menu. Build a stronger social media presence and stay connected with your customers.
              </p>

              <div className="benefit-highlight-box insta-highlight-box">
                <span className="highlight-tag">
                  More Followers. More Engagement. Stronger Branding.
                </span>
              </div>

              {/* Interactive Demo Action Button */}
              <div className="benefit-interactive-preview">
                <a
                  href="https://instagram.com/blackcardinal1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="benefit-action-btn instagram-action-btn"
                >
                  <Instagram size={16} />
                  <span>Follow Us on Instagram</span>
                  <ExternalLink size={14} />
                </a>
                <small className="benefit-note">
                  ✓ Direct profile link displays on your mobile customer menu
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* REMAINING SIX BENEFITS GRID */}
        <div className="secondary-benefits-grid">
          {/* Benefit 3 */}
          <div className="standard-benefit-card">
            <div className="standard-icon-box">
              <Printer size={22} className="text-coral" />
            </div>
            <h4>Save Printing Costs</h4>
            <p>
              Update your menu digitally without repeatedly printing new copies every time prices or seasonal dishes change.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="standard-benefit-card">
            <div className="standard-icon-box">
              <RefreshCw size={22} className="text-coral" />
            </div>
            <h4>Easy Menu Updates</h4>
            <p>
              Change prices, food descriptions, images and availability in seconds through your central DineEQR dashboard.
            </p>
          </div>

          {/* Benefit 5 */}
          <div className="standard-benefit-card">
            <div className="standard-icon-box">
              <Smartphone size={22} className="text-coral" />
            </div>
            <h4>Better Customer Experience</h4>
            <p>
              Give customers a clean, mobile-friendly menu they can access with one QR scan—no apps or PDFs needed.
            </p>
          </div>

          {/* Benefit 6 */}
          <div className="standard-benefit-card">
            <div className="standard-icon-box">
              <Palette size={22} className="text-coral" />
            </div>
            <h4>Professional Restaurant Branding</h4>
            <p>
              Showcase your restaurant with a customised digital menu matching your ambiance and visual brand identity.
            </p>
          </div>

          {/* Benefit 7 */}
          <div className="standard-benefit-card">
            <div className="standard-icon-box">
              <Zap size={22} className="text-coral" />
            </div>
            <h4>Faster Menu Access</h4>
            <p>
              Customers can explore the menu directly on their smartphones the second they sit at their table.
            </p>
          </div>

          {/* Benefit 8 */}
          <div className="standard-benefit-card">
            <div className="standard-icon-box">
              <LayoutDashboard size={22} className="text-coral" />
            </div>
            <h4>Simple Menu Management</h4>
            <p>
              Manage restaurant details, categories, items, dietary tags, and social profiles effortlessly from one dashboard.
            </p>
          </div>
        </div>

        {/* Benefits Section WhatsApp CTA */}
        <div className="benefits-cta-banner">
          <div className="benefits-cta-left">
            <h3>Ready to upgrade your restaurant's digital presence?</h3>
            <p>Join smart restaurant owners growing customer reviews, social followers, and repeat orders with DineEQR.</p>
          </div>
          <div className="benefits-cta-right">
            <a
              href={getWhatsAppUrl("Hello DineEQR Team! I am interested in the Google Reviews & Instagram growth features of DineEQR. Please share more details.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageCircle size={18} /> Chat With Our Team on WhatsApp
            </a>
            <Link to="/admin" className="btn btn-outline btn-lg">
              Set Up Your Menu Free <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
