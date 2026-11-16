import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Send,
  ShoppingBag,
  Trash2,
  ChevronRight,
  Flame,
  ArrowRight,
  AlertCircle
} from "lucide-react";

export default function JattCartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  brand
}) {
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [orderType, setOrderType] = useState("Dine-In"); // Dine-In, Takeaway

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;

    const phoneClean = (brand.whatsapp || brand.phone || "918815806560").replace(/[^0-9]/g, "");

    let message = `🌯 *NEW ORDER — JATT ROLL MENU*\n`;
    message += `_${brand.tagline}_\n`;
    message += `==============================\n`;
    message += `*Order Type:* ${orderType}\n`;
    if (tableNumber.trim()) {
      message += `*Table / Counter:* ${tableNumber.trim()}\n`;
    }
    message += `==============================\n\n`;

    cart.forEach((item, index) => {
      const diet = item.dietary === "veg" ? "🌱" : item.dietary === "egg" ? "🥚" : "🍗";
      const sizeStr = item.selectedSize ? ` (${item.selectedSize})` : "";
      message += `${index + 1}. ${diet} *${item.name}${sizeStr}*\n`;
      message += `   Qty: ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}\n`;
    });

    message += `\n==============================\n`;
    message += `*TOTAL ESTIMATED:* ₹${totalAmount}\n`;
    message += `==============================\n`;

    if (notes.trim()) {
      message += `*Chef Instructions:* ${notes.trim()}\n`;
    }

    message += `\n_Order placed via JATT ROLL MENU on DineEQR_`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneClean}?text=${encoded}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Floating Bottom Cart Bar (Sticky when drawer is closed) */}
      {!isOpen && totalCount > 0 && (
        <motion.div
          className="jatt-floating-cart-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="jatt-floating-cart-inner" onClick={onClose ? () => {} : null}>
            <div className="jatt-floating-cart-left">
              <div className="jatt-cart-bag-icon">
                <ShoppingBag size={20} />
                <span className="jatt-cart-counter-bubble">{totalCount}</span>
              </div>
              <div className="jatt-floating-cart-totals">
                <span className="jatt-floating-price">₹{totalAmount}</span>
                <span className="jatt-floating-items-count">
                  {totalCount} {totalCount === 1 ? "roll / item" : "rolls / items"}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="jatt-view-order-btn"
              onClick={onClose ? () => {} : null}
            >
              <span>View Order Tray</span>
              <ChevronRight size={17} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Cart Drawer Overlay & Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="jatt-cart-drawer-backdrop" onClick={onClose}>
            <motion.aside
              className="jatt-cart-drawer-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="jatt-cart-header">
                <div className="jatt-cart-header-title">
                  <div className="jatt-cart-icon-wrap">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h3>Your Order Tray</h3>
                    <p>{totalCount} {totalCount === 1 ? "item added" : "items added"}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="jatt-cart-close-btn"
                  onClick={onClose}
                  aria-label="Close cart drawer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="jatt-cart-body">
                {cart.length === 0 ? (
                  <div className="jatt-cart-empty-view">
                    <div className="jatt-empty-icon-circle">
                      <ShoppingBag size={42} />
                    </div>
                    <h4>Your Tray is Empty</h4>
                    <p>
                      Explore the JATT ROLL MENU and add loaded rolls, chaap, or crispy peri-peri fries!
                    </p>
                    <button
                      type="button"
                      className="jatt-btn jatt-btn-primary jatt-empty-browse-btn"
                      onClick={onClose}
                    >
                      <span>Explore Menu</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Dine-In or Takeaway Switcher */}
                    <div className="jatt-order-type-tabs">
                      <button
                        type="button"
                        className={`jatt-type-tab ${orderType === "Dine-In" ? "is-active" : ""}`}
                        onClick={() => setOrderType("Dine-In")}
                      >
                        🍽️ Dine-In Table
                      </button>
                      <button
                        type="button"
                        className={`jatt-type-tab ${orderType === "Takeaway" ? "is-active" : ""}`}
                        onClick={() => setOrderType("Takeaway")}
                      >
                        🛍️ Takeaway / Pick-up
                      </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="jatt-cart-items-list">
                      {cart.map((item) => {
                        const itemKey = `${item.id}-${item.selectedSize || "default"}`;
                        return (
                          <div key={itemKey} className="jatt-cart-row">
                            <div className="jatt-cart-row-info">
                              <div className="jatt-cart-row-title-line">
                                <span
                                  className={`jatt-diet-dot ${item.dietary === "veg" ? "is-veg" : item.dietary === "egg" ? "is-egg" : "is-nonveg"}`}
                                />
                                <strong>{item.name}</strong>
                              </div>
                              <div className="jatt-cart-row-sub">
                                {item.selectedSize && (
                                  <span className="jatt-cart-size-tag">
                                    {item.selectedSize}
                                  </span>
                                )}
                                <span className="jatt-cart-item-rate">
                                  ₹{item.price} each
                                </span>
                              </div>
                            </div>

                            <div className="jatt-cart-row-controls">
                              <div className="jatt-cart-qty-box">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQty(item.id, item.selectedSize, item.quantity - 1)}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={12} />
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQty(item.id, item.selectedSize, item.quantity + 1)}
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>

                              <span className="jatt-cart-row-total">
                                ₹{item.price * item.quantity}
                              </span>

                              <button
                                type="button"
                                className="jatt-cart-remove-item-btn"
                                onClick={() => onRemoveItem(item.id, item.selectedSize)}
                                title="Remove from tray"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Order Details Form: Table & Special Notes */}
                    <div className="jatt-cart-details-form">
                      <div className="jatt-form-group">
                        <label className="jatt-input-label">
                          <span>{orderType === "Dine-In" ? "Table Number / Seat" : "Customer / Token Name"}</span>
                          <input
                            type="text"
                            placeholder={orderType === "Dine-In" ? "e.g. Table 4 or Outdoor 2" : "e.g. Rahul / Token 12"}
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                          />
                        </label>
                      </div>

                      <div className="jatt-form-group">
                        <label className="jatt-input-label">
                          <span>Cooking Notes / Special Instructions</span>
                          <input
                            type="text"
                            placeholder="e.g. Extra spicy, less mayo, extra onions"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="jatt-cart-footer">
                  <div className="jatt-cart-bill-summary">
                    <div className="jatt-bill-row">
                      <span>Subtotal ({totalCount} items)</span>
                      <strong>₹{totalAmount}</strong>
                    </div>
                    <div className="jatt-bill-row is-total">
                      <span>Grand Total:</span>
                      <strong className="jatt-grand-amount">₹{totalAmount}</strong>
                    </div>
                  </div>

                  {/* Primary WhatsApp Order CTA */}
                  <motion.button
                    type="button"
                    className="jatt-whatsapp-order-btn"
                    onClick={handleSendWhatsApp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={16} />
                    <span>Send Order via WhatsApp</span>
                  </motion.button>

                  <div className="jatt-cart-footer-actions">
                    <button
                      type="button"
                      className="jatt-cart-clear-btn"
                      onClick={onClearCart}
                    >
                      Clear Tray
                    </button>
                    <button
                      type="button"
                      className="jatt-cart-continue-btn"
                      onClick={onClose}
                    >
                      + Add More Items
                    </button>
                  </div>

                  <p className="jatt-cart-notice">
                    * Orders are sent straight to the restaurant's WhatsApp kitchen desk.
                  </p>
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
