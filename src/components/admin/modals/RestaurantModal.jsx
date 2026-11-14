import React, { useState, useEffect } from "react";
import Modal from "../../common/Modal";
import { useApp } from "../../../context/AppContext";
import { TEMPLATES } from "../../../data/seedData";
import { sanitizeGoogleReviewUrl, sanitizeInstagramUrl, sanitizePhone, sanitizeUrl, sanitizeText } from "../../../utils/security";
import { Store, User, Mail, Phone, MapPin, Clock, Palette, Sparkles, Image as ImageIcon, Star, Instagram, ExternalLink } from "lucide-react";

export default function RestaurantModal({ isOpen, onClose, restaurant = null }) {
  const { addRestaurant, updateRestaurant } = useApp();

  const isEditing = Boolean(restaurant);

  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    description: "",
    tagline: "",
    logo: "🍽️",
    coverImage: "",
    openingHours: "11:00 AM – 11:00 PM",
    category: "North Indian & Mughlai",
    templateId: "premium-restaurant",
    planId: "free-trial",
    googleReviewUrl: "",
    googleReviewEnabled: false,
    instagramUrl: "",
    instagramEnabled: false
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        ownerName: restaurant.ownerName || "",
        email: restaurant.email || "",
        phone: restaurant.phone || "",
        address: restaurant.address || "",
        city: restaurant.city || "",
        description: restaurant.description || "",
        tagline: restaurant.tagline || "",
        logo: restaurant.logo || "🍽️",
        coverImage: restaurant.coverImage || "",
        openingHours: restaurant.openingHours || "11:00 AM – 11:00 PM",
        category: restaurant.category || "Dining & Drinks",
        templateId: restaurant.templateId || "premium-restaurant",
        planId: restaurant.subscription?.planId || "free-trial",
        googleReviewUrl: restaurant.googleReviewUrl || "",
        googleReviewEnabled: typeof restaurant.googleReviewEnabled === "boolean" ? restaurant.googleReviewEnabled : Boolean(restaurant.googleReviewUrl),
        instagramUrl: restaurant.instagramUrl || "",
        instagramEnabled: typeof restaurant.instagramEnabled === "boolean" ? restaurant.instagramEnabled : Boolean(restaurant.instagramUrl)
      });
    } else {
      setFormData({
        name: "",
        ownerName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        description: "",
        tagline: "",
        logo: "🍽️",
        coverImage: "",
        openingHours: "11:00 AM – 11:00 PM",
        category: "Fine Dining & Lounge",
        templateId: "premium-restaurant",
        planId: "free-trial",
        googleReviewUrl: "",
        googleReviewEnabled: false,
        instagramUrl: "",
        instagramEnabled: false
      });
    }
  }, [restaurant, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = sanitizeText(formData.name, 120);
    if (!cleanName) return;

    // Sanitize and validate inputs
    const sanitizedData = {
      ...formData,
      name: cleanName,
      ownerName: sanitizeText(formData.ownerName, 100),
      phone: sanitizePhone(formData.phone) || formData.phone.trim(),
      email: formData.email.trim().slice(0, 120),
      city: sanitizeText(formData.city, 80),
      address: sanitizeText(formData.address, 200),
      tagline: sanitizeText(formData.tagline, 150),
      description: sanitizeText(formData.description, 500),
      coverImage: sanitizeUrl(formData.coverImage),
      googleReviewUrl: sanitizeGoogleReviewUrl(formData.googleReviewUrl),
      instagramUrl: sanitizeInstagramUrl(formData.instagramUrl)
    };

    if (isEditing) {
      updateRestaurant(restaurant.id, sanitizedData);
    } else {
      addRestaurant(sanitizedData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Edit ${restaurant.name}` : "Add New Restaurant Profile"}
      subtitle="Configure profile details, brand styling, and menu template"
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit} className="restaurant-form">
        <div className="form-field-row">
          <label>
            <span className="field-label">Restaurant / Brand Name *</span>
            <input
              required
              type="text"
              placeholder="e.g. The Amber Lounge"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>

          <label>
            <span className="field-label">Owner / Manager Name</span>
            <input
              type="text"
              placeholder="e.g. Vikramaditya Sharma"
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            />
          </label>
        </div>

        <div className="form-field-row">
          <label>
            <span className="field-label">Contact Phone / WhatsApp *</span>
            <input
              required
              type="tel"
              placeholder="+91 88158 06560"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </label>

          <label>
            <span className="field-label">Contact Email</span>
            <input
              type="email"
              placeholder="contact@amberlounge.in"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
        </div>

        <div className="form-field-row">
          <label>
            <span className="field-label">Street Address</span>
            <input
              type="text"
              placeholder="Civil Lines, Near Clock Tower"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </label>

          <label>
            <span className="field-label">City, State</span>
            <input
              type="text"
              placeholder="Morena, Madhya Pradesh"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </label>
        </div>

        <div className="form-field-row">
          <label>
            <span className="field-label">Cuisine / Category</span>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="North Indian & Mughlai">North Indian & Mughlai</option>
              <option value="Specialty Coffee & Brunch">Specialty Coffee & Brunch</option>
              <option value="Street Eats & Fast Food">Street Eats & Fast Food</option>
              <option value="Artisan Bakery & Patisserie">Artisan Bakery & Patisserie</option>
              <option value="Multi-Cuisine Family Dining">Multi-Cuisine Family Dining</option>
              <option value="Pizzeria & Italian">Pizzeria & Italian</option>
              <option value="Asian & Pan-Asian">Asian & Pan-Asian</option>
              <option value="Cloud Kitchen & Delivery">Cloud Kitchen & Delivery</option>
            </select>
          </label>

          <label>
            <span className="field-label">Menu Design Template</span>
            <select
              value={formData.templateId}
              onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-field-row">
          <label>
            <span className="field-label">Logo Emoji or Symbol</span>
            <input
              type="text"
              maxLength={4}
              placeholder="🍛 or ☕"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            />
          </label>

          <label>
            <span className="field-label">Operating Hours</span>
            <input
              type="text"
              placeholder="11:30 AM – 11:00 PM"
              value={formData.openingHours}
              onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
            />
          </label>
        </div>

        <label className="form-field-full">
          <span className="field-label">Tagline (Displayed under name on menu)</span>
          <input
            type="text"
            placeholder="e.g. A little spice, a lot of soul."
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          />
        </label>

        <label className="form-field-full">
          <span className="field-label">Cover Image URL (Optional)</span>
          <input
            type="url"
            placeholder="https://images.unsplash.com/photo-..."
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          />
        </label>

        <label className="form-field-full">
          <span className="field-label">Short Description / Story</span>
          <textarea
            rows={2}
            placeholder="Brief welcoming message or restaurant specialties..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </label>

        {!isEditing && (
          <label className="form-field-full">
            <span className="field-label">Initial Subscription Plan</span>
            <select
              value={formData.planId}
              onChange={(e) => setFormData({ ...formData, planId: e.target.value })}
            >
              <option value="free-trial">Free Trial (8 Days - ₹0)</option>
              <option value="extended-trial">Extended Trial (15 Days - ₹100)</option>
              <option value="monthly-plan">Monthly Pro Plan (₹100/mo)</option>
            </select>
          </label>
        )}

        {/* Dedicated Social & Review Links Section */}
        <div className="restaurant-social-settings-box">
          <div className="section-subtitle-pill">
            <Sparkles size={14} className="text-coral" />
            <span>Social & Review Growth Links</span>
          </div>
          <p className="section-note-small">
            Display direct action buttons ("Rate Us on Google" & "Follow Us on Instagram") on this restaurant's customer digital menu.
          </p>

          {/* Google Reviews Setting */}
          <div className="social-input-block">
            <div className="social-toggle-row">
              <label className="social-toggle-label">
                <input
                  type="checkbox"
                  checked={formData.googleReviewEnabled}
                  onChange={(e) => setFormData({ ...formData, googleReviewEnabled: e.target.checked })}
                />
                <span className="toggle-text">
                  <Star size={15} fill="#FBBC05" color="#FBBC05" />
                  <strong>Enable "Rate Us on Google" Button</strong>
                </span>
              </label>

              {formData.googleReviewUrl && (
                <a
                  href={formData.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-xs btn-outline preview-link-btn"
                >
                  <ExternalLink size={12} /> Test Link
                </a>
              )}
            </div>

            <input
              type="url"
              placeholder="Google Review Page URL (e.g. https://g.page/r/.../review)"
              value={formData.googleReviewUrl}
              onChange={(e) => setFormData({
                ...formData,
                googleReviewUrl: e.target.value,
                googleReviewEnabled: e.target.value ? formData.googleReviewEnabled : false
              })}
              className="social-url-input"
            />
          </div>

          {/* Instagram Setting */}
          <div className="social-input-block">
            <div className="social-toggle-row">
              <label className="social-toggle-label">
                <input
                  type="checkbox"
                  checked={formData.instagramEnabled}
                  onChange={(e) => setFormData({ ...formData, instagramEnabled: e.target.checked })}
                />
                <span className="toggle-text">
                  <Instagram size={15} className="text-coral" />
                  <strong>Enable "Follow Us on Instagram" Button</strong>
                </span>
              </label>

              {formData.instagramUrl && (
                <a
                  href={formData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-xs btn-outline preview-link-btn"
                >
                  <ExternalLink size={12} /> Test Link
                </a>
              )}
            </div>

            <input
              type="url"
              placeholder="Instagram Profile URL (e.g. https://instagram.com/my_restaurant)"
              value={formData.instagramUrl}
              onChange={(e) => setFormData({
                ...formData,
                instagramUrl: e.target.value,
                instagramEnabled: e.target.value ? formData.instagramEnabled : false
              })}
              className="social-url-input"
            />
          </div>
        </div>

        <div className="modal-actions-bar">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Save Changes" : "Create Restaurant & QR"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
