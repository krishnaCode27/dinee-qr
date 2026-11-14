import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import MenuItemModal from "../modals/MenuItemModal";
import ConfirmDialog from "../../common/ConfirmDialog";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  ExternalLink,
  Sparkles,
  Check,
  X,
  FolderTree,
  Tag,
  Store,
  ArrowUpDown
} from "lucide-react";

export default function MenusView({
  selectedRestaurantId,
  setSelectedRestaurantId,
  onOpenQR
}) {
  const {
    restaurants,
    deleteMenuItem,
    toggleItemAvailability,
    toggleItemFeatured,
    addCategory,
    deleteCategory
  } = useApp();

  const currentRest = restaurants.find((r) => r.id === selectedRestaurantId) || restaurants[0];

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState("all");
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItemTarget, setDeleteItemTarget] = useState(null);
  const [newCatInput, setNewCatInput] = useState("");
  const [showAddCat, setShowAddCat] = useState(false);

  if (!currentRest) {
    return (
      <div className="admin-view-content">
        <div className="empty-state-card">
          <BookOpen size={44} className="empty-state-icon" />
          <h3>No Restaurants Available</h3>
          <p>Create a restaurant profile first to manage its digital menu.</p>
        </div>
      </div>
    );
  }

  const items = currentRest.items || [];
  const categories = currentRest.categories || [];

  const filteredItems = items.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = dietaryFilter === "all" || item.dietary === dietaryFilter;
    return matchesCat && matchesSearch && matchesDiet;
  });

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCatInput.trim()) return;
    addCategory(currentRest.id, newCatInput.trim());
    setNewCatInput("");
    setShowAddCat(false);
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const liveMenuUrl = `${origin}/menu/${currentRest.slug}`;

  return (
    <div className="admin-view-content menus-view">
      {/* Top Selector Bar */}
      <div className="menu-top-selector-bar">
        <div className="rest-selector-box">
          <label className="selector-label">SELECT RESTAURANT MENU:</label>
          <div className="selector-select-wrap">
            <Store size={18} />
            <select
              value={currentRest.id}
              onChange={(e) => {
                setSelectedRestaurantId(e.target.value);
                setActiveCategory("All");
              }}
            >
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.items?.length || 0} items)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="menu-top-actions">
          <a
            href={liveMenuUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            <Eye size={15} /> Preview Live Menu <ExternalLink size={13} />
          </a>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingItem(null);
              setIsItemModalOpen(true);
            }}
          >
            <Plus size={16} /> Add Menu Item
          </button>
        </div>
      </div>

      {/* Categories Toolbar */}
      <div className="categories-pill-bar">
        <div className="cat-scroll-list">
          <button
            className={`cat-pill-btn ${activeCategory === "All" ? "is-active" : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            All Items ({items.length})
          </button>
          {categories.map((c) => {
            const count = items.filter((i) => i.category === c).length;
            return (
              <button
                key={c}
                className={`cat-pill-btn ${activeCategory === c ? "is-active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                <span>{c}</span>
                <span className="cat-count">({count})</span>
              </button>
            );
          })}
        </div>

        <button
          className="btn btn-outline btn-sm add-cat-trigger"
          onClick={() => setShowAddCat(!showAddCat)}
        >
          <Plus size={14} /> Add Category
        </button>
      </div>

      {/* Inline Add Category input */}
      {showAddCat && (
        <form onSubmit={handleAddCategorySubmit} className="inline-add-category-form">
          <input
            autoFocus
            type="text"
            placeholder="New Category Name (e.g. Desserts, Mocktails, Daily Specials)"
            value={newCatInput}
            onChange={(e) => setNewCatInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Save Category
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setShowAddCat(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Search & Dietary Filters */}
      <div className="menu-filter-row">
        <div className="search-input-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder={`Search dishes in ${currentRest.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="diet-filter-buttons">
          <button
            className={`diet-btn ${dietaryFilter === "all" ? "active" : ""}`}
            onClick={() => setDietaryFilter("all")}
          >
            All
          </button>
          <button
            className={`diet-btn ${dietaryFilter === "veg" ? "active" : ""}`}
            onClick={() => setDietaryFilter("veg")}
          >
            <span className="diet-dot veg" /> Pure Veg
          </button>
          <button
            className={`diet-btn ${dietaryFilter === "non-veg" ? "active" : ""}`}
            onClick={() => setDietaryFilter("non-veg")}
          >
            <span className="diet-dot non-veg" /> Non-Veg
          </button>
          <button
            className={`diet-btn ${dietaryFilter === "vegan" ? "active" : ""}`}
            onClick={() => setDietaryFilter("vegan")}
          >
            Vegan
          </button>
        </div>
      </div>

      {/* Items Table / Cards */}
      {filteredItems.length === 0 ? (
        <div className="empty-state-card">
          <BookOpen size={40} className="empty-state-icon" />
          <h4>No Dishes Found</h4>
          <p>No dishes match your selected category or filter. Add dishes to populate this menu.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingItem(null);
              setIsItemModalOpen(true);
            }}
          >
            <Plus size={16} /> Add First Dish
          </button>
        </div>
      ) : (
        <div className="menu-items-table-card">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Dish / Item</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Dietary</th>
                  <th>Availability</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className={!item.available ? "row-unavailable" : ""}>
                    <td>
                      <div className="dish-title-cell">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="dish-thumb" />
                        ) : (
                          <div className="dish-thumb-placeholder">🍽️</div>
                        )}
                        <div>
                          <strong>{item.name}</strong>
                          <p className="dish-sub-desc">{item.description || "No description added"}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag-cell">{item.category}</span>
                    </td>
                    <td>
                      <strong className="dish-price-text">₹{item.price}</strong>
                    </td>
                    <td>
                      <span className={`diet-badge-pill diet-${item.dietary || "veg"}`}>
                        <span className={`diet-dot ${item.dietary || "veg"}`} />
                        {item.dietary === "non-veg" ? "Non-Veg" : item.dietary === "veg" ? "Veg" : item.dietary || "Veg"}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`toggle-switch-btn ${item.available ? "is-available" : "is-soldout"}`}
                        onClick={() => toggleItemAvailability(currentRest.id, item.id)}
                        title="Click to toggle availability"
                      >
                        {item.available ? (
                          <>
                            <Check size={13} /> Available
                          </>
                        ) : (
                          <>
                            <X size={13} /> Sold Out
                          </>
                        )}
                      </button>
                    </td>
                    <td>
                      <button
                        className={`star-featured-btn ${item.featured ? "is-featured" : ""}`}
                        onClick={() => toggleItemFeatured(currentRest.id, item.id)}
                        title="Toggle Chef's Pick / Featured"
                      >
                        <Sparkles size={14} />
                        {item.featured ? "Featured" : "Standard"}
                      </button>
                    </td>
                    <td>
                      <div className="table-actions-cell">
                        <button
                          className="btn-icon-table"
                          onClick={() => {
                            setEditingItem(item);
                            setIsItemModalOpen(true);
                          }}
                          title="Edit Dish"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn-icon-table text-danger"
                          onClick={() => setDeleteItemTarget(item)}
                          title="Delete Dish"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Item Modal */}
      <MenuItemModal
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          setEditingItem(null);
        }}
        restaurantId={currentRest.id}
        categories={categories}
        item={editingItem}
      />

      {/* Delete Item Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteItemTarget)}
        onClose={() => setDeleteItemTarget(null)}
        onConfirm={() => {
          if (deleteItemTarget) deleteMenuItem(currentRest.id, deleteItemTarget.id);
        }}
        title={`Remove "${deleteItemTarget?.name}"?`}
        message="Are you sure you want to delete this dish from the menu? It will be removed immediately from customer view."
        confirmText="Delete Dish"
      />
    </div>
  );
}
