import React, { useState, useEffect } from "react";
import Modal from "../../common/Modal";
import { useApp } from "../../../context/AppContext";
import { sanitizeText, sanitizePrice, sanitizeUrl } from "../../../utils/security";
import { Sparkles, Utensils, Tag, IndianRupee } from "lucide-react";

export default function MenuItemModal({
  isOpen,
  onClose,
  restaurantId,
  categories = [],
  item = null
}) {
  const { addMenuItem, updateMenuItem } = useApp();

  const isEditing = Boolean(item);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    dietary: "veg",
    description: "",
    image: "",
    available: true,
    featured: false
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        category: item.category || (categories[0] || "Main Course"),
        price: item.price !== undefined ? item.price : "",
        dietary: item.dietary || "veg",
        description: item.description || "",
        image: item.image || "",
        available: item.available !== undefined ? item.available : true,
        featured: Boolean(item.featured)
      });
    } else {
      setFormData({
        name: "",
        category: categories[0] || "Main Course",
        price: "",
        dietary: "veg",
        description: "",
        image: "",
        available: true,
        featured: false
      });
    }
  }, [item, categories, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = sanitizeText(formData.name, 120);
    const validPrice = sanitizePrice(formData.price);
    if (!cleanName || validPrice === null) return;

    const sanitizedData = {
      ...formData,
      name: cleanName,
      price: validPrice,
      description: sanitizeText(formData.description, 500),
      image: sanitizeUrl(formData.image)
    };

    if (isEditing) {
      updateMenuItem(restaurantId, item.id, sanitizedData);
    } else {
      addMenuItem(restaurantId, sanitizedData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Menu Dish" : "Add New Dish"}
      subtitle="Configure item pricing, dietary tags and availability"
      maxWidth="580px"
    >
      <form onSubmit={handleSubmit} className="menu-item-form">
        <label className="form-field-full">
          <span className="field-label">Dish / Item Name *</span>
          <input
            required
            type="text"
            placeholder="e.g. Truffle Mushroom Risotto"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>

        <div className="form-field-row">
          <label>
            <span className="field-label">Category *</span>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              {categories.length === 0 && <option value="General">General</option>}
            </select>
          </label>

          <label>
            <span className="field-label">Price (₹ INR) *</span>
            <input
              required
              type="number"
              min="0"
              step="1"
              placeholder="250"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </label>
        </div>

        <div className="form-field-row">
          <label>
            <span className="field-label">Dietary Classification</span>
            <select
              value={formData.dietary}
              onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
            >
              <option value="veg">Pure Vegetarian (Green Dot)</option>
              <option value="non-veg">Non-Vegetarian (Red Dot)</option>
              <option value="vegan">Vegan / Plant-Based</option>
              <option value="egg">Contains Egg</option>
            </select>
          </label>

          <label>
            <span className="field-label">Availability Status</span>
            <select
              value={formData.available ? "yes" : "no"}
              onChange={(e) => setFormData({ ...formData, available: e.target.value === "yes" })}
            >
              <option value="yes">Available (In Stock)</option>
              <option value="no">Unavailable (Sold Out / Hidden)</option>
            </select>
          </label>
        </div>

        <label className="form-field-full">
          <span className="field-label">Photo URL (Optional)</span>
          <input
            type="url"
            placeholder="https://images.unsplash.com/photo-..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </label>

        <label className="form-field-full">
          <span className="field-label">Description & Ingredients</span>
          <textarea
            rows={2}
            placeholder="e.g. Slow-cooked arborio rice with wild shiitake, white wine reduction and shaved parmesan..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </label>

        <div className="form-checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <span>Mark as <strong>Chef's Featured / Bestseller</strong></span>
          </label>
        </div>

        <div className="modal-actions-bar">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Save Dish Changes" : "Add Dish to Menu"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
