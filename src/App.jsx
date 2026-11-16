import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ToastContainer from "./components/common/ToastContainer";
import LandingPage from "./components/landing/LandingPage";
import AdminLayout from "./components/admin/AdminLayout";
import CustomerMenuPage from "./components/menu/CustomerMenuPage";
import JattRollMenuPage from "./components/jatt/JattRollMenuPage";
import BrandLogo from "./components/common/BrandLogo";
import FloatingWhatsAppButton from "./components/common/FloatingWhatsAppButton";
import { ArrowLeft, Home } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="public-menu-notfound">
      <div className="notfound-card">
        <BrandLogo size="lg" withTagline={true} />
        <h2>404 — Page Not Found</h2>
        <p>The page or digital menu URL you are looking for does not exist or has been relocated.</p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Return to DineEQR Home
          </Link>
          <Link to="/admin" className="btn btn-outline">
            Go to Admin Dashboard
          </Link>
          <Link to="/menu/the-spice-route" className="btn btn-outline">
            The Spice Route Demo
          </Link>
          <Link to="/jatt-roll-menu" className="btn btn-outline">
            JATT ROLL MENU Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dedicated JATT ROLL MENU Demo (Public contactless menu) */}
        <Route path="/jatt-roll-menu" element={<JattRollMenuPage />} />

        {/* Admin Dashboard & Management Views */}
        <Route path="/admin" element={<AdminLayout initialView="overview" />} />
        <Route path="/admin/restaurants" element={<AdminLayout initialView="restaurants" />} />
        <Route path="/admin/menus" element={<AdminLayout initialView="menus" />} />
        <Route path="/admin/categories" element={<AdminLayout initialView="categories" />} />
        <Route path="/admin/items" element={<AdminLayout initialView="items" />} />
        <Route path="/admin/qrcodes" element={<AdminLayout initialView="qrcodes" />} />
        <Route path="/admin/qr-generator" element={<AdminLayout initialView="qr-generator" />} />
        <Route path="/admin/templates" element={<AdminLayout initialView="templates" />} />
        <Route path="/admin/analytics" element={<AdminLayout initialView="analytics" />} />
        <Route path="/admin/subscriptions" element={<AdminLayout initialView="subscriptions" />} />
        <Route path="/admin/enquiries" element={<AdminLayout initialView="enquiries" />} />
        <Route path="/admin/settings" element={<AdminLayout initialView="settings" />} />
        <Route path="/admin/restaurant/:id" element={<AdminLayout initialView="menus" />} />

        {/* Customer-Facing Digital Menu */}
        <Route path="/menu/:slug" element={<CustomerMenuPage />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global Toast Stack */}
      <ToastContainer />

      {/* Floating WhatsApp Lead Generation Button */}
      <FloatingWhatsAppButton />
    </AppProvider>
  );
}
