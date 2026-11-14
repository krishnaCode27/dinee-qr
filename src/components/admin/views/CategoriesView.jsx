import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import ConfirmDialog from "../../common/ConfirmDialog";
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Store,
  Check,
  X
} from "lucide-react";

export default function CategoriesView({ selectedRestaurantId, setSelectedRestaurantId }) {
  const { restaurants, addCategory, updateCategory, deleteCategory, reorderCategories } = useApp();

  const currentRest = restaurants.find((r) => r.id === selectedRestaurantId) || restaurants[0];

  const [newCatName, setNewCatName] = useState("");
  const [editingCat, setEditingCat] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [deleteCatTarget, setDeleteCatTarget] = useState(null);

  if (!currentRest) {
    return (
      <div className="admin-view-content">
        <div className="empty-state-card">
          <FolderTree size={44} className="empty-state-icon" />
          <h3>No Restaurants Available</h3>
          <p>Please create a restaurant first.</p>
        </div>
      </div>
    );
  }

  const categories = currentRest.categories || [];
  const items = currentRest.items || [];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(currentRest.id, newCatName.trim());
    setNewCatName("");
  };

  const handleSaveEdit = (oldName) => {
    if (!editValue.trim()) return;
    updateCategory(currentRest.id, oldName, editValue.trim());
    setEditingCat(null);
  };

  const moveCategory = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const reordered = [...categories];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    reorderCategories(currentRest.id, reordered);
  };

  return (
    <div className="admin-view-content categories-view">
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Menu Categories</h2>
          <p className="view-subtitle">
            Organize course sections, reorder presentation order, and categorize dishes.
          </p>
        </div>

        {/* Restaurant Picker */}
        <div className="selector-select-wrap">
          <Store size={16} />
          <select
            value={currentRest.id}
            onChange={(e) => setSelectedRestaurantId(e.target.value)}
          >
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-grid-2-col">
        {/* Category List & Order */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Categories for {currentRest.name}</h3>
              <p className="card-sub">Order determines how tabs appear on the customer menu</p>
            </div>
            <span className="items-count-badge">{categories.length} Total</span>
          </div>

          <div className="category-order-list">
            {categories.map((cat, index) => {
              const itemCount = items.filter((i) => i.category === cat).length;
              const isEditing = editingCat === cat;

              return (
                <div key={cat} className="category-order-row">
                  <div className="cat-order-left">
                    <span className="cat-index-num">#{index + 1}</span>

                    {isEditing ? (
                      <div className="cat-inline-edit">
                        <input
                          autoFocus
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit(cat);
                            if (e.key === "Escape") setEditingCat(null);
                          }}
                        />
                        <button
                          className="btn-icon-table text-green"
                          onClick={() => handleSaveEdit(cat)}
                          title="Save"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          className="btn-icon-table"
                          onClick={() => setEditingCat(null)}
                          title="Cancel"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="cat-text-info">
                        <strong>{cat}</strong>
                        <small>{itemCount} assigned {itemCount === 1 ? "dish" : "dishes"}</small>
                      </div>
                    )}
                  </div>

                  <div className="cat-order-right">
                    <button
                      className="btn-icon-table"
                      disabled={index === 0}
                      onClick={() => moveCategory(index, -1)}
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      className="btn-icon-table"
                      disabled={index === categories.length - 1}
                      onClick={() => moveCategory(index, 1)}
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>

                    {!isEditing && (
                      <button
                        className="btn-icon-table"
                        onClick={() => {
                          setEditingCat(cat);
                          setEditValue(cat);
                        }}
                        title="Edit Category Name"
                      >
                        <Edit2 size={14} />
                      </button>
                    )}

                    <button
                      className="btn-icon-table text-danger"
                      onClick={() => setDeleteCatTarget(cat)}
                      title="Delete Category"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Category Form Card */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Add New Category</h3>
              <p className="card-sub">Create a new section for this menu</p>
            </div>
          </div>

          <form onSubmit={handleAdd} className="add-category-box">
            <label className="form-field-full">
              <span className="field-label">Category Name *</span>
              <input
                required
                type="text"
                placeholder="e.g. Clay Oven Starters, House Mocktails, Artisanal Breads"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
              />
            </label>

            <button type="submit" className="btn btn-primary btn-block">
              <Plus size={16} /> Add Category to Menu
            </button>
          </form>

          <div className="card-hint-box mt-6">
            <h4>Category Best Practices:</h4>
            <ul>
              <li>Keep category names concise (under 20 characters).</li>
              <li>Place high-margin items and bestselling starters at the top.</li>
              <li>Separate beverages and desserts into their own dedicated tabs.</li>
            </ul>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={Boolean(deleteCatTarget)}
        onClose={() => setDeleteCatTarget(null)}
        onConfirm={() => {
          if (deleteCatTarget) deleteCategory(currentRest.id, deleteCatTarget);
        }}
        title={`Delete Category "${deleteCatTarget}"?`}
        message={`Dishes assigned to this category will not be deleted, but may need to be reassigned to another category.`}
        confirmText="Delete Category"
      />
    </div>
  );
}
