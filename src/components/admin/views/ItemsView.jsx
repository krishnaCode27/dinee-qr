import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import MenuItemModal from "../modals/MenuItemModal";
import ConfirmDialog from "../../common/ConfirmDialog";
import {
  UtensilsCrossed,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Sparkles,
  Check,
  X,
  Store,
  Tag
} from "lucide-react";

export default function ItemsView({ selectedRestaurantId, setSelectedRestaurantId }) {
  const {
    restaurants,
    deleteMenuItem,
    toggleItemAvailability,
    toggleItemFeatured
  } = useApp();

  const [restaurantFilter, setRestaurantFilter] = useState(selectedRestaurantId || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all");
  const [availFilter, setAvailFilter] = useState("all");
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeRestForModal, setActiveRestForModal] = useState(restaurants[0]?.id || "");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Aggregate items
  let allItemsWithRest = [];
  restaurants.forEach((r) => {
    (r.items || []).forEach((item) => {
      allItemsWithRest.push({
        ...item,
        restaurantId: r.id,
        restaurantName: r.name,
        restaurantCategories: r.categories || []
      });
    });
  });

  const filtered = allItemsWithRest.filter((item) => {
    const matchesRest = restaurantFilter === "all" || item.restaurantId === restaurantFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = dietFilter === "all" || item.dietary === dietFilter;
    const matchesAvail =
      availFilter === "all" ||
      (availFilter === "available" && item.available) ||
      (availFilter === "soldout" && !item.available);

    return matchesRest && matchesSearch && matchesDiet && matchesAvail;
  });

  const handleOpenAddModal = () => {
    const targetRest = restaurantFilter !== "all" ? restaurantFilter : (restaurants[0]?.id || "");
    setActiveRestForModal(targetRest);
    setEditingItem(null);
    setIsItemModalOpen(true);
  };

  const currentRestForModal = restaurants.find((r) => r.id === activeRestForModal) || restaurants[0];

  return (
    <div className="admin-view-content items-view">
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Menu Items & Pricing</h2>
          <p className="view-subtitle">
            Manage dish pricing, food images, dietary labels, and availability status across all menus.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          <Plus size={16} /> Add Menu Item
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="view-filter-bar multi-filters">
        <div className="search-input-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search items, ingredients, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-select-box">
          <Store size={15} />
          <select
            value={restaurantFilter}
            onChange={(e) => {
              setRestaurantFilter(e.target.value);
              if (e.target.value !== "all") setSelectedRestaurantId(e.target.value);
            }}
          >
            <option value="all">All Restaurants ({restaurants.length})</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-select-box">
          <Filter size={15} />
          <select
            value={dietFilter}
            onChange={(e) => setDietFilter(e.target.value)}
          >
            <option value="all">All Diets</option>
            <option value="veg">Pure Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="vegan">Vegan</option>
            <option value="egg">Contains Egg</option>
          </select>
        </div>

        <div className="filter-select-box">
          <select
            value={availFilter}
            onChange={(e) => setAvailFilter(e.target.value)}
          >
            <option value="all">All Availability</option>
            <option value="available">In Stock Only</option>
            <option value="soldout">Sold Out Only</option>
          </select>
        </div>
      </div>

      {/* Items table */}
      {filtered.length === 0 ? (
        <div className="empty-state-card">
          <UtensilsCrossed size={44} className="empty-state-icon" />
          <h3>No Menu Items Found</h3>
          <p>No dishes match your selected filter criteria. Add dishes to your menus to see them listed here.</p>
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <Plus size={16} /> Add First Dish
          </button>
        </div>
      ) : (
        <div className="dashboard-card p-0">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Dish / Item</th>
                  <th>Restaurant</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Dietary</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={`${item.restaurantId}-${item.id}`} className={!item.available ? "row-unavailable" : ""}>
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
                      <span className="rest-link-tag">{item.restaurantName}</span>
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
                        onClick={() => toggleItemAvailability(item.restaurantId, item.id)}
                        title="Click to toggle availability"
                      >
                        {item.available ? <Check size={13} /> : <X size={13} />}
                        {item.available ? "Available" : "Sold Out"}
                      </button>
                    </td>
                    <td>
                      <button
                        className={`star-featured-btn ${item.featured ? "is-featured" : ""}`}
                        onClick={() => toggleItemFeatured(item.restaurantId, item.id)}
                        title="Toggle Featured Dish"
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
                            setActiveRestForModal(item.restaurantId);
                            setEditingItem(item);
                            setIsItemModalOpen(true);
                          }}
                          title="Edit Dish"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn-icon-table text-danger"
                          onClick={() => setDeleteTarget(item)}
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

      {/* Item Modal */}
      {currentRestForModal && (
        <MenuItemModal
          isOpen={isItemModalOpen}
          onClose={() => {
            setIsItemModalOpen(false);
            setEditingItem(null);
          }}
          restaurantId={activeRestForModal}
          categories={currentRestForModal.categories || []}
          item={editingItem}
        />
      )}

      {/* Delete Item Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteMenuItem(deleteTarget.restaurantId, deleteTarget.id);
        }}
        title={`Delete "${deleteTarget?.name}"?`}
        message={`Are you sure you want to permanently delete this dish from ${deleteTarget?.restaurantName}?`}
        confirmText="Delete Dish"
      />
    </div>
  );
}
