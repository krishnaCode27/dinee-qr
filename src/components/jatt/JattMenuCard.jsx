import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

export default function JattMenuCard({ item, index = 0 }) {
  const [selectedSize, setSelectedSize] = useState("regular");
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasSizes = Boolean(item.hasSizes && item.sizes);

  return (
    <motion.article
      className="jatt-menu-list-row"
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.32,
        delay: Math.min(index * 0.03, 0.35),
        ease: [0.16, 1, 0.3, 1]
      }}
      whileTap={{ scale: 0.985 }}
    >
      {/* Left Column: Details, Dietary Badge, Description, Pricing */}
      <div className="jatt-list-main-info">
        <div className="jatt-list-badges-line">
          {/* Dietary Indicator Symbol */}
          <span
            className={`jatt-diet-box ${item.dietary === "veg" ? "is-veg" : item.dietary === "egg" ? "is-egg" : "is-nonveg"}`}
            title={item.dietary === "veg" ? "Pure Vegetarian" : item.dietary === "egg" ? "Contains Egg" : "Non-Veg"}
          >
            <span className="jatt-diet-symbol" />
          </span>

          {/* Bestseller or Signature Badge */}
          {item.badge && (
            <motion.span
              className="jatt-list-item-badge"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {item.badge}
            </motion.span>
          )}

          {/* Spice Flame Tag */}
          {item.spiceLevel > 1 && (
            <span className="jatt-list-spice-level" title={`Spice Level: ${item.spiceLevel}/3`}>
              {[...Array(item.spiceLevel)].map((_, i) => (
                <Flame key={i} size={11} className="jatt-chili-icon" />
              ))}
            </span>
          )}
        </div>

        {/* Item Title */}
        <h3 className="jatt-list-item-name">{item.name}</h3>

        {/* Short Authentic Description */}
        <p className="jatt-list-item-desc">{item.description}</p>

        {/* Pricing Layout: Regular / Loaded side-by-side OR Single Price */}
        {hasSizes ? (
          <div className="jatt-list-sizes-price">
            <motion.button
              type="button"
              className={`jatt-size-price-tag ${selectedSize === "regular" ? "is-active" : ""}`}
              onClick={() => setSelectedSize("regular")}
              whileTap={{ scale: 0.93 }}
              title="Regular portion size"
            >
              <span className="size-title">Regular</span>
              <strong className="size-amount">₹{item.sizes.regular.price}</strong>
            </motion.button>

            <span className="size-divider">•</span>

            <motion.button
              type="button"
              className={`jatt-size-price-tag loaded-tag ${selectedSize === "loaded" ? "is-active" : ""}`}
              onClick={() => setSelectedSize("loaded")}
              whileTap={{ scale: 0.93 }}
              title="Loaded portion size"
            >
              <span className="size-title">⭐ Loaded</span>
              <strong className="size-amount">₹{item.sizes.loaded.price}</strong>
            </motion.button>
          </div>
        ) : (
          <div className="jatt-list-single-price">
            <span className="price-symbol">₹</span>
            <strong className="price-num">{item.price}</strong>
          </div>
        )}
      </div>

      {/* Right Column: High Quality Food Thumbnail */}
      <div className="jatt-list-media-wrap">
        <motion.img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className={`jatt-list-photo ${imageLoaded ? "is-loaded" : "is-loading"}`}
          onLoad={() => setImageLoaded(true)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: imageLoaded ? 1 : 0.3, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="jatt-list-photo-overlay" />
      </div>
    </motion.article>
  );
}
