import React from "react";
import { Link } from "react-router-dom";
import { Menu, Plus, ExternalLink, ShieldAlert, Sparkles, UserCheck } from "lucide-react";

export default function AdminHeader({
  activeView,
  onOpenMobileMenu,
  onOpenAddRestaurant
}) {
  const titles = {
    overview: "Dashboard Overview",
    restaurants: "Restaurant Profiles",
    menus: "Menu Management",
    categories: "Menu Categories",
    items: "Menu Items & Pricing",
    qrcodes: "QR Codes & Table Stands",
    templates: "Menu Design Templates",
    analytics: "Menu Views & Analytics",
    subscriptions: "Subscriptions & Plans",
    enquiries: "Customer Enquiries",
    settings: "Platform Settings"
  };

  return (
    <header className="admin-header-bar">
      <div className="header-left-col">
        <button
          className="mobile-sidebar-toggle"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="admin-breadcrumb">
          <span className="crumb-root">DineEQR</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{titles[activeView] || "Admin"}</span>
        </div>
      </div>

      <div className="header-right-col">
        <div className="demo-mode-pill desktop-only" title="Data stored in browser localStorage for this MVP">
          <span className="pill-dot" />
          <span>Local Storage MVP</span>
        </div>

        <Link
          to="/menu/the-spice-route"
          target="_blank"
          rel="noreferrer"
          className="header-ghost-btn"
          title="Open live customer menu"
        >
          <ExternalLink size={14} />
          <span className="desktop-only">Demo Menu</span>
        </Link>

        <button
          className="btn btn-primary btn-sm header-action-btn"
          onClick={onOpenAddRestaurant}
        >
          <Plus size={15} />
          <span>Add Restaurant</span>
        </button>

        <div className="admin-avatar-pill">
          <div className="admin-avatar-circle" style={{ overflow: "hidden", padding: 0 }}>
            <img
              src="/images/logo/dineeqr-circular-favicon-512.png"
              alt="Black Cardinal Admin"
              width="32"
              height="32"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <span className="admin-user-name desktop-only">Black Cardinal</span>
        </div>
      </div>
    </header>
  );
}
