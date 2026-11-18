import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Sparkles, ZoomIn, X, Compass, ExternalLink } from "lucide-react";
import { AURORA_BRAND } from "../../data/auroraData";

export default function AuroraStoreGallery() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section id="aurora-store-glance" className="aurora-store-glance-section">
      <div className="aurora-container">
        {/* Section Header */}
        <div className="aurora-section-header">
          <div className="aurora-section-subtitle-wrap">
            <Sparkles size={14} className="text-gold" />
            <span className="aurora-section-subtitle">Store Glimpse</span>
          </div>
          <h2 className="aurora-section-title">Visit Our Store</h2>
          <p className="aurora-section-description">
            Experience our premier fashion showroom located in front of SBI Bank, Ganiyari.
          </p>
        </div>

        {/* Dual Image Presentation */}
        <div className="aurora-dual-gallery-grid">
          {AURORA_BRAND.images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="aurora-store-image-card"
              onClick={() => setActiveImage(img)}
              role="button"
              tabIndex={0}
              aria-label={`View full photo of ${img.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveImage(img);
                }
              }}
            >
              <div className="store-image-container">
                <img
                  src={img.url}
                  alt={img.alt}
                  className="store-photo"
                  loading="lazy"
                />
                
                {/* Floating Location Badge */}
                <div className="store-image-top-badge">
                  <MapPin size={13} className="text-gold" />
                  <span>{img.location}</span>
                </div>

                {/* Hover overlay hint */}
                <div className="store-image-hover-overlay">
                  <div className="zoom-pill">
                    <ZoomIn size={16} />
                    <span>View Full Photo</span>
                  </div>
                </div>

                {/* Bottom Caption Gradient */}
                <div className="store-image-caption">
                  <span className="store-caption-sub">{img.subtitle}</span>
                  <h3 className="store-caption-title">{img.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Store Address Banner */}
        <div className="aurora-store-address-pill">
          <MapPin size={16} className="text-gold flex-shrink-0" />
          <span>
            <strong>Store Address:</strong> Arora Exclusive, in front of SBI Bank, Ganiyari
          </span>
          <a
            href={AURORA_BRAND.googleBusiness.url}
            target="_blank"
            rel="noopener noreferrer"
            className="store-address-link"
          >
            <span>Get Directions</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div
            className="aurora-modal-overlay"
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="aurora-lightbox-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="aurora-modal-close"
                onClick={() => setActiveImage(null)}
                aria-label="Close image"
              >
                <X size={20} />
              </button>

              <img
                src={activeImage.url}
                alt={activeImage.alt}
                className="lightbox-full-img"
              />

              <div className="lightbox-footer">
                <div>
                  <h4 className="lightbox-title">{activeImage.title}</h4>
                  <p className="lightbox-desc">{activeImage.subtitle} • {activeImage.location}</p>
                </div>
                <a
                  href={AURORA_BRAND.googleBusiness.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-action-btn"
                >
                  <MapPin size={15} />
                  <span>Visit Store</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
