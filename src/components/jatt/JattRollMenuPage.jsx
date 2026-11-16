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
import "./jatt-styles.css";
import { Utensils, Sparkles } from "lucide-react";

export default function JattRollMenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all");

  const menuSectionRef = useRef(null);

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

  // Group items by category for "All" view with category section headers
  const groupedSections = useMemo(() => {
    if (activeCategory !== "All" || searchQuery.trim()) {
      return [{ category: activeCategory, items: filteredItems }];
    }

    const sections = [];
    const categoryOrder = ["Signature Items", "Chaap", "Veg Rolls", "Fries", "Egg Rolls"];

    categoryOrder.forEach((cat) => {
      const catItems = filteredItems.filter((i) => i.category === cat);
      if (catItems.length > 0) {
        sections.push({ category: cat, items: catItems });
      }
    });

    return sections;
  }, [activeCategory, searchQuery, filteredItems]);

  const categoryEmojiMap = {
    "Signature Items": "🌯",
    "Chaap": "🍢",
    "Veg Rolls": "🥗",
    "Fries": "🍟",
    "Egg Rolls": "🥚"
  };

  return (
    <div className="jatt-menu-shell">
      {/* Top Bar */}
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
            <span className="jatt-nav-status-pill">
              <span className="jatt-status-pulse-dot" />
              <span>Open Now</span>
            </span>
          </div>
        </div>
      </header>

      {/* Compact Brand Header */}
      <JattHeroSection brand={JATT_ROLL_BRAND} />

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

      {/* Pure List-Wise Menu Section */}
      <main className="jatt-menu-list-section">
        <div className="jatt-container">
          {filteredItems.length === 0 ? (
            <div className="jatt-empty-products">
              <Utensils size={36} style={{ color: "#FF6B00", marginBottom: "10px" }} />
              <h3>No menu items found</h3>
              <p>Try clearing search keywords or dietary filters to view all 20 items.</p>
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
            <div className="jatt-sections-list">
              {groupedSections.map((sec) => (
                <section key={sec.category} className="jatt-category-block">
                  {/* Category Header Strip */}
                  <div className="jatt-category-strip-header">
                    <div className="jatt-strip-title-row">
                      <span className="jatt-strip-icon">
                        {categoryEmojiMap[sec.category] || "🍴"}
                      </span>
                      <h2 className="jatt-strip-title">{sec.category}</h2>
                      <span className="jatt-strip-count">
                        {sec.items.length} {sec.items.length === 1 ? "dish" : "dishes"}
                      </span>
                    </div>
                  </div>

                  {/* List-wise Menu Rows */}
                  <div className="jatt-category-items-rows">
                    <AnimatePresence mode="popLayout">
                      {sec.items.map((item, itemIndex) => (
                        <JattMenuCard key={item.id} item={item} index={itemIndex} />
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Clean Public Footer */}
      <footer className="jatt-public-footer">
        <div className="jatt-container jatt-footer-inner">
          <div className="jatt-footer-brand-title">
            JATT ROLL <span>MENU</span>
          </div>
          <p className="jatt-footer-sub">
            {JATT_ROLL_BRAND.tagline} • Serving fresh, loaded street rolls daily from 12:00 PM to 11:30 PM.
          </p>

          <div className="jatt-footer-meta">
            <span>📍 {JATT_ROLL_BRAND.location}, {JATT_ROLL_BRAND.city}</span>
            <span>⭐ Rating: {JATT_ROLL_BRAND.rating} / 5.0</span>
          </div>

          <div className="jatt-footer-powered">
            <span>Powered by <strong>DineEQR</strong> • <strong>Black Cardinal</strong></span>
            <span>•</span>
            <Link to="/">Create a Digital QR Menu for Your Restaurant</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
