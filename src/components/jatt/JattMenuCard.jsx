import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Flame, Sparkles, Check } from "lucide-react";

export default function JattMenuCard({
  item,
  cartItem,
  onAddToCart,
  onUpdateQty
}) {
  // If item supports sizes (e.g. Chaap items), default to "regular"
  const [selectedSize, setSelectedSize] = useState("regular");
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasSizes = Boolean(item.hasSizes && item.sizes);
  const currentPrice = hasSizes ? item.sizes[selectedSize]?.price : item.price;
  const currentSizeName = hasSizes ? item.sizes[selectedSize]?.name : null;

  // Cart item matching this specific item and size
  const cartQty = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    onAddToCart({
      id: item.id,
      name: item.name,
      basePrice: item.price,
      price: currentPrice,
      selectedSize: currentSizeName,
      dietary: item.dietary,
      image: item.image,
      category: item.category
    });
  };

  const handleSizeChange = (sizeKey) => {
    setSelectedSize(sizeKey);
  };

  return (
    <motion.article
      className="jatt-menu-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      {/* Food Photo Container */}
      <div className="jatt-card-media">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className={`jatt-card-img ${imageLoaded ? "is-loaded" : "is-loading"}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="jatt-card-media-overlay" />

        {/* Dietary Indicator Badge */}
        <div className="jatt-diet-badge-pos">
          <span
            className={`jatt-diet-box ${item.dietary === "veg" ? "is-veg" : item.dietary === "egg" ? "is-egg" : "is-nonveg"}`}
            title={item.dietary === "veg" ? "Pure Vegetarian" : item.dietary === "egg" ? "Contains Egg" : "Non-Veg"}
          >
            <span className="jatt-diet-symbol" />
          </span>
        </div>

        {/* Feature / Bestseller Badge */}
        {item.badge && (
          <span className="jatt-item-badge">
            {item.badge}
          </span>
        )}

        {/* Spice Level Indicator */}
        {item.spiceLevel > 1 && (
          <div className="jatt-spice-tag" title={`Spice Level: ${item.spiceLevel}/3`}>
            {[...Array(item.spiceLevel)].map((_, i) => (
              <Flame key={i} size={11} className="jatt-chili-icon" />
            ))}
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="jatt-card-body">
        <div className="jatt-card-top-info">
          <span className="jatt-card-category">{item.category}</span>
          <h3 className="jatt-card-title">{item.name}</h3>
          <p className="jatt-card-desc">{item.description}</p>
        </div>

        {/* Size Selection (Regular vs Loaded) for Chaap */}
        {hasSizes && (
          <div className="jatt-size-selector">
            <span className="jatt-size-label">Portion Size:</span>
            <div className="jatt-size-toggle-group">
              <button
                type="button"
                className={`jatt-size-btn ${selectedSize === "regular" ? "is-active" : ""}`}
                onClick={() => handleSizeChange("regular")}
              >
                <span>Regular</span>
                <small>₹{item.sizes.regular.price}</small>
              </button>
              <button
                type="button"
                className={`jatt-size-btn ${selectedSize === "loaded" ? "is-active" : ""}`}
                onClick={() => handleSizeChange("loaded")}
              >
                <span className="jatt-loaded-star">⭐ Loaded</span>
                <small>₹{item.sizes.loaded.price}</small>
              </button>
            </div>
          </div>
        )}

        {/* Footer: Price + Action Button */}
        <div className="jatt-card-footer">
          <div className="jatt-price-block">
            <span className="jatt-currency">₹</span>
            <span className="jatt-amount">{currentPrice}</span>
            {hasSizes && (
              <span className="jatt-size-indicator">({selectedSize})</span>
            )}
          </div>

          <div className="jatt-action-block">
            {cartQty > 0 ? (
              <div className="jatt-qty-controller">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  className="jatt-qty-btn"
                  onClick={() => onUpdateQty(item.id, currentSizeName, cartQty - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </motion.button>
                <span className="jatt-qty-display">{cartQty}</span>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  className="jatt-qty-btn"
                  onClick={() => onUpdateQty(item.id, currentSizeName, cartQty + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </motion.button>
              </div>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="jatt-add-btn"
                onClick={handleAdd}
              >
                <Plus size={15} />
                <span>ADD</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
