import React, { useState } from "react";
import Modal from "../common/Modal";
import { useApp } from "../../context/AppContext";
import { sanitizeText, sanitizePhone } from "../../utils/security";
import { Send, CheckCircle2, Sparkles, Store, Phone, Mail, User, MapPin, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "../common/FloatingWhatsAppButton";

export default function EnquiryModal({ isOpen, onClose, initialSubject = "" }) {
  const { addEnquiry } = useApp();

  const [formData, setFormData] = useState({
    customerName: "",
    restaurantName: "",
    phone: "",
    email: "",
    city: "",
    message: initialSubject ? `Regarding ${initialSubject}: ` : ""
  });
  const [submitted, setSubmitted] = useState(false);

  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot bot protection: if filled, drop silently
    if (honeypot) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
      return;
    }

    const cleanCustomerName = sanitizeText(formData.customerName, 100);
    const cleanPhone = sanitizePhone(formData.phone) || formData.phone.trim();
    if (!cleanCustomerName || !cleanPhone) return;

    const sanitizedEnquiry = {
      customerName: cleanCustomerName,
      restaurantName: sanitizeText(formData.restaurantName, 120),
      phone: cleanPhone,
      email: formData.email.trim().slice(0, 120),
      city: sanitizeText(formData.city, 80),
      message: sanitizeText(formData.message, 1000),
      source: initialSubject || "Landing Page Contact Modal"
    };

    // Attempt serverless submission for rate limiting and spam protection
    try {
      fetch("/api/submit-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizedEnquiry.customerName,
          phone: sanitizedEnquiry.phone,
          email: sanitizedEnquiry.email,
          restaurantName: sanitizedEnquiry.restaurantName,
          message: sanitizedEnquiry.message,
          plan: sanitizedEnquiry.source,
          _hp: honeypot
        })
      }).catch(() => {});
    } catch {
      // ignore
    }

    addEnquiry(sanitizedEnquiry);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        customerName: "",
        restaurantName: "",
        phone: "",
        email: "",
        city: "",
        message: ""
      });
      setHoneypot("");
    }, 2200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialSubject || "Claim Launch Offer / Contact Black Cardinal"}
      subtitle="Fill in your details and our team will get your restaurant set up with DineEQR."
      maxWidth="540px"
    >
      {submitted ? (
        <div className="enquiry-success-view">
          <div className="success-icon-wrap">
            <CheckCircle2 size={44} className="text-coral" />
          </div>
          <h3>Enquiry Received!</h3>
          <p>
            Thank you! A Black Cardinal onboarding specialist will reach out to you via WhatsApp or phone within a few hours to assist with your digital menu setup.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="enquiry-form">
          {/* Honeypot anti-spam field (hidden from legitimate users) */}
          <div style={{ display: "none", position: "absolute", left: "-9999px" }} aria-hidden="true">
            <input
              type="text"
              name="_hp"
              tabIndex="-1"
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="form-field-row">
            <label>
              <span className="field-label">Your Name *</span>
              <div className="input-with-icon">
                <User size={16} />
                <input
                  required
                  type="text"
                  placeholder="e.g. Vikramaditya Sharma"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
            </label>

            <label>
              <span className="field-label">Restaurant / Cafe Name *</span>
              <div className="input-with-icon">
                <Store size={16} />
                <input
                  required
                  type="text"
                  placeholder="e.g. The Spice Route"
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                />
              </div>
            </label>
          </div>

          <div className="form-field-row">
            <label>
              <span className="field-label">Phone / WhatsApp *</span>
              <div className="input-with-icon">
                <Phone size={16} />
                <input
                  required
                  type="tel"
                  placeholder="+91 88158 06560"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </label>

            <label>
              <span className="field-label">Email Address</span>
              <div className="input-with-icon">
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="owner@myrestaurant.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </label>
          </div>

          <label className="form-field-full">
            <span className="field-label">City / Location</span>
            <div className="input-with-icon">
              <MapPin size={16} />
              <input
                type="text"
                placeholder="e.g. Morena, Indore, Jaipur"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </label>

          <label className="form-field-full">
            <span className="field-label">Message / Requirements</span>
            <textarea
              rows={3}
              placeholder="Tell us about your menu (number of items, table stand designs, custom requests)..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </label>

          <div style={{ margin: "14px 0 8px 0" }}>
            <a
              href={getWhatsAppUrl(formData.message ? `Hello DineEQR Team! ${formData.message}` : "Hello DineEQR Team! I am interested in creating a digital QR menu for my restaurant. Please share details and pricing.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp-outline btn-block"
            >
              <MessageCircle size={16} /> Prefer Fast WhatsApp Chat? Click Here (+91 8815806560)
            </a>
          </div>

          <div className="modal-actions-bar">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Send size={15} /> Submit Enquiry
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
