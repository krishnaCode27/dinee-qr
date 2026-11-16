import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Star } from "lucide-react";

export default function JattHeroSection({ brand }) {
  return (
    <section className="jatt-compact-brand-header">
      <div className="jatt-container">
        <div className="jatt-brand-header-content">
          {/* Logo & Rating Badge */}
          <div className="jatt-brand-badge-row">
            <span className="jatt-badge-street">STREET FOOD SPECIAL</span>
            <span className="jatt-badge-rating">
              <Star size={12} fill="#FFB703" color="#FFB703" />
              <strong>{brand.rating}</strong>
              <small>({brand.reviewsCount})</small>
            </span>
          </div>

          {/* Typography */}
          <h1 className="jatt-brand-title">
            <span className="jatt-title-white">JATT ROLL</span>{" "}
            <span className="jatt-title-orange">MENU</span>
          </h1>

          <p className="jatt-brand-subtitle">
            Rolls <span className="jatt-dot">•</span> Chaap{" "}
            <span className="jatt-dot">•</span> Fries{" "}
            <span className="jatt-dot">•</span> Shakes
          </p>

          <p className="jatt-brand-tagline">
            Bold Flavours. Loaded Rolls. Full Satisfaction.
          </p>

          {/* Quick Info Chips */}
          <div className="jatt-brand-meta-pills">
            <div className="jatt-meta-pill">
              <Clock size={12} className="jatt-meta-ico" />
              <span>{brand.openingHours}</span>
            </div>
            <div className="jatt-meta-pill">
              <MapPin size={12} className="jatt-meta-ico" />
              <span>{brand.location}</span>
            </div>
            <div className="jatt-meta-pill is-diet-pill">
              <span>🌱 Pure Veg & 🥚 Egg Options</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
