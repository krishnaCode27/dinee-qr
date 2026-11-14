import React from "react";
import { Link } from "react-router-dom";
import { Store, Utensils, QrCode, Share2, ArrowRight, ArrowUpRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <Store size={24} />,
      title: "Create Your Restaurant Profile",
      description: "Add restaurant name, logo, contact details, opening hours, and location information."
    },
    {
      step: "02",
      icon: <Utensils size={24} />,
      title: "Build Your Digital Menu",
      description: "Add categories, food items, images, descriptions, dietary tags, and prices."
    },
    {
      step: "03",
      icon: <QrCode size={24} />,
      title: "Generate Your QR Code",
      description: "Create a unique, dynamic QR code connected directly to your restaurant's digital menu."
    },
    {
      step: "04",
      icon: <Share2 size={24} />,
      title: "Share With Customers",
      description: "Display your QR code on tables, counters, posters, or packaging for instant smartphone access."
    }
  ];

  return (
    <section className="section-padding landing-section how-it-works-section" id="how-it-works">
      <div className="landing-container">
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <span className="badge-dot" />
            <span>EFFORTLESS ONBOARDING</span>
          </div>
          <h2 className="section-title">
            From Setup to Live Menu in 4 Simple Steps
          </h2>
          <p className="section-desc">
            No technical knowledge or coding needed. Everything is handled through our modern, intuitive admin dashboard.
          </p>
        </div>

        <div className="steps-cards-grid">
          {steps.map((s, index) => (
            <div key={s.step} className="step-process-card">
              <div className="step-number-tag">{s.step}</div>
              <div className="step-icon-wrapper">
                {s.icon}
              </div>
              <h3 className="step-card-title">{s.title}</h3>
              <p className="step-card-desc">{s.description}</p>
              {index < steps.length - 1 && (
                <div className="step-arrow-divider">
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="how-cta-center">
          <Link to="/admin" className="btn btn-primary btn-lg">
            Start Your Free 8-Day Trial <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
