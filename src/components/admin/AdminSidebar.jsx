import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../common/BrandLogo";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  Store,
  BookOpen,
  FolderTree,
  UtensilsCrossed,
  QrCode,
  Palette,
  BarChart2,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export default function AdminSidebar({
  activeView,
  setActiveView,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}) {
  const { stats, notify, logoutAdmin } = useApp();
  const navigate = useNavigate();

  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
    {
      id: "restaurants",
      label: "Restaurants",
      icon: <Store size={18} />,
      badge: stats.totalRestaurants > 0 ? stats.totalRestaurants : null
    },
    { id: "menus", label: "Menus", icon: <BookOpen size={18} /> },
    { id: "categories", label: "Categories", icon: <FolderTree size={18} /> },
    {
      id: "items",
      label: "Menu Items",
      icon: <UtensilsCrossed size={18} />,
      badge: stats.totalItems > 0 ? stats.totalItems : null
    },
    { id: "qrcodes", label: "QR Codes", icon: <QrCode size={18} /> },
    { id: "templates", label: "Templates", icon: <Palette size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={18} /> },
    {
      id: "subscriptions",
      label: "Subscriptions",
      icon: <CreditCard size={18} />,
      badge: stats.activeSubscriptions > 0 ? `${stats.activeSubscriptions}` : null
    },
    {
      id: "enquiries",
      label: "Enquiries",
      icon: <MessageSquare size={18} />,
      badge: stats.newEnquiries > 0 ? `${stats.newEnquiries} New` : null,
      badgeColor: "coral"
    },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> }
  ];

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin");
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar-shell ${isCollapsed ? "is-collapsed" : ""} ${isMobileOpen ? "is-mobile-open" : ""}`}
      >
        <div className="sidebar-brand-head">
          <BrandLogo
            light
            size={isCollapsed ? "sm" : "md"}
            collapsed={isCollapsed}
            withTagline={false}
            linkTo="/admin"
          />
          <button
            className="sidebar-collapse-toggle desktop-only"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar collapse"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <div className="sidebar-nav-section">
          {!isCollapsed && <span className="sidebar-group-title">MANAGEMENT</span>}
          <nav className="sidebar-nav-list">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  className={`sidebar-nav-item ${isActive ? "is-active" : ""}`}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="nav-item-icon">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="nav-item-label">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className={`nav-item-badge ${item.badgeColor === "coral" ? "badge-coral" : ""}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-footer-section">
          <Link to="/" className="sidebar-ext-link" title="Visit Public Landing Page">
            <ExternalLink size={16} />
            {!isCollapsed && <span>View Website</span>}
          </Link>
          <button
            className="sidebar-logout-btn"
            onClick={handleLogout}
            title="Log out of admin"
          >
            <LogOut size={16} />
            {!isCollapsed && <span>Exit Portal</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
