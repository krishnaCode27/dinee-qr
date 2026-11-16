import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  JATT_ROLL_BRAND,
  JATT_CATEGORIES,
  JATT_MENU_ITEMS
} from "../../data/jattRollData";
import JattHeroSection from "./JattHeroSection";
import JattCategoryTabs from "./JattCategoryTabs";
import JattMenuCard from "./JattMenuCard";
import JattCartDrawer from "./JattCartDrawer";
import "./jatt-styles.css";
import {
  ShoppingBag,
  ExternalLink,
  Flame,
  ArrowUpRight,
  Sparkles,
  QrCode
} from "lucide-react";

export default function JattRollMenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all");
  const [cart, setCart] = useState(() => {
    try {
      const saved = sessionStorage.getItem("jatt_roll_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const menuSectionRef = useRef(null);

  // Sync cart to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem("jatt_roll_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart", e);
    }
  }, [cart]);

  // Set document title
  useEffect(() => {
    document.title = "JATT ROLL MENU — Bold Flavours. Loaded Rolls. Full Satisfaction.";
    return () => {
      document.title = "DineEQR — Digital QR Menus";
    };
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: JATT_MENU_ITEMS.length };
    JATT_CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = JATT_MENU_ITEMS.filter((item) => item.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return JATT_MENU_ITEMS.filter((item) => {
      // Category filter
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      // Dietary filter
      const matchesDiet =
        dietFilter === "all" ||
        (dietFilter === "veg" && item.dietary === "veg") ||
        (dietFilter === "egg" && item.dietary === "egg");

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesDiet && matchesSearch;
    });
  }, [activeCategory, dietFilter, searchQuery]);

  // Total cart count
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add item to cart
  const handleAddToCart = (itemToAdd) => {
    setCart((prev) => {
      const sizeKey = itemToAdd.selectedSize || "default";
      const existingIndex = prev.findIndex(
        (i) => i.id === itemToAdd.id && (i.selectedSize || "default") === sizeKey
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: itemToAdd.id,
          name: itemToAdd.name,
          price: itemToAdd.price,
          selectedSize: itemToAdd.selectedSize,
          dietary: itemToAdd.dietary,
          quantity: 1
        }
      ];
    });
  };

  // Update item quantity in cart
  const handleUpdateQty = (itemId, sizeName, newQty) => {
    const sizeKey = sizeName || "default";
    setCart((prev) => {
      if (newQty <= 0) {
        return prev.filter(
          (i) => !(i.id === itemId && (i.selectedSize || "default") === sizeKey)
        );
      }
      return prev.map((i) =>
        i.id === itemId && (i.selectedSize || "default") === sizeKey
          ? { ...i, quantity: newQty }
          : i
      );
    });
  };

  // Remove specific item from cart
  const handleRemoveItem = (itemId, sizeName) => {
    const sizeKey = sizeName || "default";
    setCart((prev) =>
      prev.filter(
        (i) => !(i.id === itemId && (i.selectedSize || "default") === sizeKey)
      )
    );
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Scroll to menu section
  const handleExploreClick = () => {
    if (menuSectionRef.current) {
      menuSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Share digital menu link
  const handleShareClick = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: "JATT ROLL MENU — Digital QR Menu",
        text: "Explore JATT ROLL MENU: Bold Flavours, Loaded Rolls, Full Satisfaction!",
        url
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2200);
    }
  };

  return (
    <div className="jatt-menu-shell">
      {/* Top Sticky Header */}
      <header className="jatt-top-nav">
        <div className="jatt-container jatt-top-nav-inner">
          <Link to="/" className="jatt-nav-brand" title="DineEQR Digital Menu Platform">
            <div className="jatt-nav-brand-logo">🌯</div>
            <div className="jatt-nav-brand-text">
              <span className="jatt-nav-title">JATT ROLL MENU</span>
              <span className="jatt-nav-tagline">Bold Flavours. Loaded Rolls.</span>
            </div>
          </Link>

          <div className="jatt-nav-actions">
            <Link to="/admin/qr-generator" className="jatt-nav-badge-link" title="Open QR Code Generator">
              <QrCode size={14} />
              <span className="desktop-only">QR Generator</span>
            </Link>

            <button
              type="button"
              className="jatt-nav-cart-trigger"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Order Tray"
            >
              <ShoppingBag size={16} />
              <span className="desktop-only">Tray</span>
              {totalCartCount > 0 && (
                <span className="jatt-nav-cart-badge">{totalCartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <JattHeroSection
        brand={JATT_ROLL_BRAND}
        onExploreClick={handleExploreClick}
        onShareClick={handleShareClick}
        shareCopied={shareCopied}
      />

      {/* Sticky Categories & Search Bar */}
      <div ref={menuSectionRef} id="jatt-menu-section">
        <JattCategoryTabs
          categories={JATT_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSearchQuery("");
          }}
          categoryCounts={categoryCounts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dietFilter={dietFilter}
          onDietFilterChange={setDietFilter}
        />
      </div>

      {/* Products Grid Section */}
      <main className="jatt-menu-section">
        <div className="jatt-container">
          <div className="jatt-section-header">
            <h2 className="jatt-section-title">
              {searchQuery ? (
                <>Search Results for "{searchQuery}"</>
              ) : activeCategory === "All" ? (
                <>All 20 Menu Items</>
              ) : (
                <>{activeCategory}</>
              )}
              <span className="jatt-section-count">
                {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
              </span>
            </h2>
          </div>

          {filteredItems.length === 0 ? (
            <div className="jatt-empty-products">
              <h3>No items matched your search</h3>
              <p>Try clearing filters or search term to see our full roll selection.</p>
              <button
                type="button"
                className="jatt-btn jatt-btn-outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setDietFilter("all");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div className="jatt-dishes-grid" layout>
              <AnimatePresence>
                {filteredItems.map((item) => {
                  // Find if this item is in cart
                  const inCartItem = cart.find((i) => i.id === item.id);

                  return (
                    <JattMenuCard
                      key={item.id}
                      item={item}
                      cartItem={inCartItem}
                      onAddToCart={handleAddToCart}
                      onUpdateQty={handleUpdateQty}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Public Footer */}
      <footer className="jatt-public-footer">
        <div className="jatt-container jatt-footer-inner">
          <div className="jatt-footer-brand-title">
            JATT ROLL <span>MENU</span>
          </div>
          <p className="jatt-footer-sub">
            {JATT_ROLL_BRAND.tagline} • Serving fresh, loaded street food daily from 12:00 PM to 11:30 PM.
          </p>

          <div className="jatt-footer-meta">
            <span>📍 {JATT_ROLL_BRAND.location}, {JATT_ROLL_BRAND.city}</span>
            <span>📞 Call: {JATT_ROLL_BRAND.phone}</span>
            <span>⭐ Rating: {JATT_ROLL_BRAND.rating} / 5.0</span>
          </div>

          <div className="jatt-footer-powered">
            <span>Powered by <strong>DineEQR</strong> by <strong>Black Cardinal</strong></span>
            <span>•</span>
            <Link to="/">Create a Digital QR Menu for Your Restaurant</Link>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <JattCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        brand={JATT_ROLL_BRAND}
      />
    </div>
  );
}
