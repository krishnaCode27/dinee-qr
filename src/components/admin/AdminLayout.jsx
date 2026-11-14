import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import OverviewView from "./views/OverviewView";
import RestaurantsView from "./views/RestaurantsView";
import MenusView from "./views/MenusView";
import CategoriesView from "./views/CategoriesView";
import ItemsView from "./views/ItemsView";
import QRCodesView from "./views/QRCodesView";
import TemplatesView from "./views/TemplatesView";
import AnalyticsView from "./views/AnalyticsView";
import SubscriptionsView from "./views/SubscriptionsView";
import EnquiriesView from "./views/EnquiriesView";
import SettingsView from "./views/SettingsView";
import RestaurantModal from "./modals/RestaurantModal";
import PrintQRModal from "./modals/PrintQRModal";
import AdminLoginPage from "./AdminLoginPage";
import { useApp } from "../../context/AppContext";

export default function AdminLayout({ initialView = "overview" }) {
  const { restaurants, isAdminAuthenticated, loginAdmin } = useApp();

  const [activeView, setActiveView] = useState(initialView);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Cross-view state
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(() => restaurants[0]?.id || "");
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [activeQRRest, setActiveQRRest] = useState(null);

  // If not authenticated, render the login lock screen
  if (!isAdminAuthenticated) {
    return <AdminLoginPage onLogin={loginAdmin} />;
  }

  const handleOpenAddRestaurant = () => {
    setEditingRestaurant(null);
    setIsRestaurantModalOpen(true);
  };

  const handleEditRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant);
    setIsRestaurantModalOpen(true);
  };

  const handleSelectQR = (restaurant) => {
    setActiveQRRest(restaurant);
  };

  const handleManageMenu = (restaurant) => {
    setSelectedRestaurantId(restaurant.id);
    setActiveView("menus");
  };

  return (
    <div className={`admin-shell-wrapper ${isCollapsed ? "sidebar-is-collapsed" : ""}`}>
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="admin-main-container">
        <AdminHeader
          activeView={activeView}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          onOpenAddRestaurant={handleOpenAddRestaurant}
        />

        <main className="admin-page-scroll">
          {activeView === "overview" && (
            <OverviewView
              setActiveView={setActiveView}
              onOpenAddRestaurant={handleOpenAddRestaurant}
              onSelectQR={handleSelectQR}
            />
          )}

          {activeView === "restaurants" && (
            <RestaurantsView
              onOpenAddRestaurant={handleOpenAddRestaurant}
              onEditRestaurant={handleEditRestaurant}
              onSelectQR={handleSelectQR}
              onManageMenu={handleManageMenu}
            />
          )}

          {activeView === "menus" && (
            <MenusView
              selectedRestaurantId={selectedRestaurantId}
              setSelectedRestaurantId={setSelectedRestaurantId}
              onOpenQR={handleSelectQR}
            />
          )}

          {activeView === "categories" && (
            <CategoriesView
              selectedRestaurantId={selectedRestaurantId}
              setSelectedRestaurantId={setSelectedRestaurantId}
            />
          )}

          {activeView === "items" && (
            <ItemsView
              selectedRestaurantId={selectedRestaurantId}
              setSelectedRestaurantId={setSelectedRestaurantId}
            />
          )}

          {activeView === "qrcodes" && (
            <QRCodesView onSelectQR={handleSelectQR} />
          )}

          {activeView === "templates" && (
            <TemplatesView />
          )}

          {activeView === "analytics" && (
            <AnalyticsView />
          )}

          {activeView === "subscriptions" && (
            <SubscriptionsView />
          )}

          {activeView === "enquiries" && (
            <EnquiriesView />
          )}

          {activeView === "settings" && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Global Modals for Admin */}
      <RestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={() => {
          setIsRestaurantModalOpen(false);
          setEditingRestaurant(null);
        }}
        restaurant={editingRestaurant}
      />

      <PrintQRModal
        isOpen={Boolean(activeQRRest)}
        onClose={() => setActiveQRRest(null)}
        restaurant={activeQRRest}
      />
    </div>
  );
}
