import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import ConfirmDialog from "../../common/ConfirmDialog";
import {
  Store,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  QrCode,
  BookOpen,
  Power,
  Copy,
  Check,
  MapPin,
  Clock,
  Phone,
  Mail,
  Palette
} from "lucide-react";

export default function RestaurantsView({
  onOpenAddRestaurant,
  onEditRestaurant,
  onSelectQR,
  onManageMenu
}) {
  const { restaurants, deleteRestaurant, toggleRestaurantStatus, notify } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const filtered = restaurants.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ownerName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && r.status === "active") ||
      (statusFilter === "inactive" && r.status === "inactive");

    return matchesSearch && matchesStatus;
  });

  const handleCopyUrl = (r) => {
    const url = `${origin}/menu/${r.slug}`;
    navigator.clipboard?.writeText(url);
    setCopiedId(r.id);
    notify(`Copied menu link for ${r.name}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="admin-view-content restaurants-view">
      {/* View Header & Action Bar */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Restaurants & Outlets</h2>
          <p className="view-subtitle">
            Manage your registered restaurants, unique menu URLs, and operating details.
          </p>
        </div>
        <button className="btn btn-primary" onClick={onOpenAddRestaurant}>
          <Plus size={16} /> Add Restaurant
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="view-filter-bar">
        <div className="search-input-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by restaurant name, city, owner, cuisine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-select-box">
          <Filter size={15} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses ({restaurants.length})</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive / Paused</option>
          </select>
        </div>
      </div>

      {/* Restaurant Cards / List */}
      {filtered.length === 0 ? (
        <div className="empty-state-card">
          <Store size={44} className="empty-state-icon" />
          <h3>No Restaurants Found</h3>
          <p>Try adjusting your search query or add your first restaurant profile to get started.</p>
          <button className="btn btn-primary" onClick={onOpenAddRestaurant}>
            <Plus size={16} /> Create Restaurant Profile
          </button>
        </div>
      ) : (
        <div className="restaurants-cards-grid">
          {filtered.map((r) => {
            const menuUrl = `${origin}/menu/${r.slug}`;
            const isActive = r.status === "active";

            return (
              <div key={r.id} className={`restaurant-admin-card ${!isActive ? "is-inactive" : ""}`}>
                {/* Card Top Cover & Avatar */}
                <div
                  className="rest-card-cover"
                  style={{
                    backgroundImage: r.coverImage
                      ? `linear-gradient(to bottom, rgba(17,19,23,0.3), rgba(17,19,23,0.85)), url(${r.coverImage})`
                      : "linear-gradient(135deg, #111317 0%, #2a313d 100%)"
                  }}
                >
                  <div className="cover-top-row">
                    <span className={`status-pill ${isActive ? "pill-active" : "pill-inactive"}`}>
                      {isActive ? "Active Menu" : "Paused"}
                    </span>
                    <span className="template-pill">
                      <Palette size={12} /> {r.templateId || "Premium"}
                    </span>
                  </div>

                  <div className="rest-avatar-bubble">
                    {r.logo || "🍽️"}
                  </div>
                </div>

                {/* Card Body */}
                <div className="rest-card-body">
                  <div className="rest-card-title-row">
                    <div>
                      <h3 className="rest-name">{r.name}</h3>
                      <p className="rest-tagline">{r.tagline || r.category}</p>
                    </div>
                  </div>

                  {/* Details metadata */}
                  <div className="rest-meta-list">
                    <div className="meta-item">
                      <MapPin size={14} />
                      <span>{r.address ? `${r.address}, ${r.city}` : r.city || "Address not provided"}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>{r.openingHours || "11:00 AM – 11:00 PM"}</span>
                    </div>
                    <div className="meta-item">
                      <Phone size={14} />
                      <span>{r.phone || "No phone added"}</span>
                    </div>
                  </div>

                  {/* URL copy strip */}
                  <div className="rest-url-strip">
                    <span className="url-text">{menuUrl}</span>
                    <button
                      className="url-copy-icon-btn"
                      onClick={() => handleCopyUrl(r)}
                      title="Copy Menu URL"
                    >
                      {copiedId === r.id ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                    </button>
                    <a
                      href={menuUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="url-open-icon-btn"
                      title="Open Live Menu"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Stats badge */}
                  <div className="rest-card-stats-row">
                    <div className="stat-pill">
                      <strong>{(r.items || []).length}</strong>
                      <small>Dishes</small>
                    </div>
                    <div className="stat-pill">
                      <strong>{(r.categories || []).length}</strong>
                      <small>Categories</small>
                    </div>
                    <div className="stat-pill">
                      <strong>{(r.viewsCount || 0).toLocaleString()}</strong>
                      <small>Views</small>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="rest-card-actions">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => onManageMenu(r)}
                    title="Edit categories & dishes"
                  >
                    <BookOpen size={14} /> Manage Menu
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => onSelectQR(r)}
                    title="View & Download QR Code"
                  >
                    <QrCode size={14} /> QR Stand
                  </button>
                  <button
                    className="btn btn-outline btn-sm btn-icon-only"
                    onClick={() => onEditRestaurant(r)}
                    title="Edit Restaurant Details"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    className={`btn btn-outline btn-sm btn-icon-only ${isActive ? "" : "text-green"}`}
                    onClick={() => toggleRestaurantStatus(r.id)}
                    title={isActive ? "Deactivate Restaurant" : "Activate Restaurant"}
                  >
                    <Power size={14} />
                  </button>
                  <button
                    className="btn btn-outline btn-sm btn-icon-only text-danger"
                    onClick={() => setDeleteTarget(r)}
                    title="Delete Restaurant Profile"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteRestaurant(deleteTarget.id);
        }}
        title={`Delete "${deleteTarget?.name}"?`}
        message="This will permanently delete this restaurant profile, all its menu dishes, and its unique QR URL. This action cannot be reversed."
        confirmText="Yes, Delete Restaurant"
      />
    </div>
  );
}
