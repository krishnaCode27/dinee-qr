import React, { useState } from "react";
import { X, Plus, Minus, Send, ShoppingBag, Trash2 } from "lucide-react";

export default function OrderCartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  restaurant
}) {
  const [tableNumber, setTableNumber] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSendWhatsApp = () => {
    if (!restaurant.phone) {
      alert("Restaurant contact number is not configured.");
      return;
    }

    let phoneClean = restaurant.phone.replace(/[^0-9]/g, "");
    if (phoneClean.length === 10) {
      phoneClean = `91${phoneClean}`; // Default to India prefix if 10 digits
    }

    // Format order message
    let message = `🍽️ *New Order from DineEQR Menu*\n`;
    message += `*Restaurant:* ${restaurant.name}\n`;
    if (tableNumber.trim()) {
      message += `*Table / Seat:* ${tableNumber.trim()}\n`;
    }
    message += `----------------------------\n`;

    cartItems.forEach((item, index) => {
      const diet = item.dietary === "veg" ? "🌱" : item.dietary === "non-veg" ? "🍗" : "✨";
      message += `${index + 1}. ${diet} ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    message += `----------------------------\n`;
    message += `*Total Amount:* ₹${totalAmount}\n`;
    if (customerNotes.trim()) {
      message += `*Special Instructions:* ${customerNotes.trim()}\n`;
    }
    message += `\n_Sent via DineEQR by Black Cardinal_`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneClean}?text=${encoded}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} />
            <h3>Your Order Tray</h3>
            <span className="cart-count-pill">{totalItemCount}</span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-view">
              <ShoppingBag size={48} className="cart-empty-icon" />
              <h4>Your order tray is empty</h4>
              <p>Explore the menu and add dishes to review your order before sending.</p>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-info">
                      <div className="cart-item-title-row">
                        <span className={`diet-dot ${item.dietary || "veg"}`} />
                        <strong>{item.name}</strong>
                      </div>
                      <span className="cart-item-unit-price">₹{item.price} each</span>
                    </div>

                    <div className="cart-qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <strong className="cart-item-total">₹{item.price * item.quantity}</strong>

                    <button
                      className="cart-remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Table Number & Notes */}
              <div className="cart-order-inputs">
                <label className="cart-input-label">
                  <span>Table Number / Seat (Optional)</span>
                  <input
                    type="text"
                    placeholder="e.g. Table 4 or Counter"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                  />
                </label>

                <label className="cart-input-label">
                  <span>Special Request / Cooking Notes</span>
                  <input
                    type="text"
                    placeholder="e.g. Less spicy, extra mint chutney"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                  />
                </label>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span>Estimated Total:</span>
              <strong className="cart-subtotal-price">₹{totalAmount}</strong>
            </div>

            <button
              className="btn btn-primary btn-block btn-lg whatsapp-order-btn"
              onClick={handleSendWhatsApp}
            >
              <Send size={16} /> Send Order to WhatsApp
            </button>

            <button className="cart-clear-btn" onClick={onClearCart}>
              Clear Tray
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
