import React from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles, ArrowUpRight, HelpCircle, ShieldCheck, MessageCircle } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "../../data/seedData";
import { getWhatsAppUrl } from "../common/FloatingWhatsAppButton";

export default function PricingSection({ onOpenEnquiry }) {
  return (
    <section className="section-padding landing-section pricing-section-wrap" id="pricing">
      <div className="landing-container">
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <span className="badge-dot" />
            <span>TRANSPARENT & AFFORDABLE</span>
          </div>
          <h2 className="section-title">
            Simple Pricing for Growing Food Businesses
          </h2>
          <p className="section-desc">
            No expensive software lock-ins, hardware contracts, or transaction commissions. Pick the plan that fits your pace.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid-3">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isFeatured = plan.highlight;

            return (
              <div
                key={plan.id}
                className={`pricing-card-box ${isFeatured ? "is-featured-plan" : ""}`}
              >
                {plan.badge && (
                  <div className="pricing-badge-strip">{plan.badge}</div>
                )}

                <div className="plan-header">
                  <span className="plan-eyebrow">{plan.billingCycle.toUpperCase()}</span>
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc">{plan.description}</p>
                </div>

                <div className="plan-price-row">
                  <div className="plan-amount">
                    <span className="currency-symbol">₹</span>
                    <span className="price-num">{plan.price}</span>
                  </div>
                  <span className="price-sub">/ {plan.durationLabel}</span>
                </div>

                <ul className="plan-feature-list">
                  {plan.features.map((feat, i) => (
                    <li key={i}>
                      <Check size={16} className="text-coral feat-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="plan-cta-box">
                  <Link
                    to="/admin"
                    className={`btn ${isFeatured ? "btn-primary" : "btn-outline"} btn-block`}
                  >
                    {plan.ctaText} <ArrowUpRight size={15} />
                  </Link>

                  <a
                    href={getWhatsAppUrl(`Hello DineEQR Team! I am interested in the ${plan.name} Plan (₹${plan.price}) for my restaurant. Please share the details and pricing.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp-outline btn-block btn-sm"
                    style={{ marginTop: "8px" }}
                  >
                    <MessageCircle size={14} /> Contact Us
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Launch Offer Callout Box */}
        <div className="launch-offer-spotlight">
          <div className="offer-inner">
            <div className="offer-badge-col">
              <span className="offer-tag">EXCLUSIVE LAUNCH OFFER</span>
              <Sparkles size={28} className="offer-sparkle-icon" />
            </div>

            <div className="offer-text-col">
              <h3>First 8 Small Shops Receive Free Custom QR Design & Setup</h3>
              <p>
                Are you a local cafe, bakery, cloud kitchen or small eatery? The first 8 eligible small food businesses to sign up will get their QR poster design, menu entry, and table stand graphics created completely free by the Black Cardinal design team.
              </p>
            </div>

            <div className="offer-action-col">
              <a
                href={getWhatsAppUrl("Hello DineEQR Team! I want to claim the Launch Offer: Free Custom QR Design & Setup for my food shop.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={16} /> Contact Us on WhatsApp <ArrowUpRight size={16} />
              </a>
              <small className="offer-seats-left">Limited spots available for early adopters</small>
            </div>
          </div>
        </div>

        <div className="pricing-footnote">
          <ShieldCheck size={16} />
          <span>Transparent Pricing: Prices are in INR. Payment status in this MVP demo is logged securely in admin records. Real gateway integration is available upon deployment.</span>
        </div>
      </div>
    </section>
  );
}
