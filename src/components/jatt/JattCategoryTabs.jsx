import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Search, X, Flame, Sparkles, Filter } from "lucide-react";

export default function JattCategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
  searchQuery,
  onSearchChange,
  dietFilter,
  onDietFilterChange
}) {
  const tabsScrollRef = useRef(null);

  const handleTabClick = (cat) => {
    onSelectCategory(cat);
  };

  return (
    <div className="jatt-sticky-filter-wrapper">
      <div className="jatt-container">
        {/* Top Filter Bar: Search + Diet Switcher */}
        <div className="jatt-filter-top-bar">
          <div className="jatt-search-box">
            <Search size={16} className="jatt-search-icon" />
            <input
              type="text"
              placeholder="Search rolls, chaap, fries, nachos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search menu items"
            />
            {searchQuery && (
              <button
                type="button"
                className="jatt-search-clear-btn"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Dietary Filter Buttons */}
          <div className="jatt-diet-toggle-bar">
            <button
              type="button"
              className={`jatt-diet-pill ${dietFilter === "all" ? "is-active" : ""}`}
              onClick={() => onDietFilterChange("all")}
            >
              <span>All</span>
            </button>
            <button
              type="button"
              className={`jatt-diet-pill is-veg-pill ${dietFilter === "veg" ? "is-active" : ""}`}
              onClick={() => onDietFilterChange("veg")}
            >
              <span className="jatt-veg-dot" />
              <span>Pure Veg</span>
            </button>
            <button
              type="button"
              className={`jatt-diet-pill is-egg-pill ${dietFilter === "egg" ? "is-active" : ""}`}
              onClick={() => onDietFilterChange("egg")}
            >
              <span className="jatt-egg-dot" />
              <span>Egg Rolls</span>
            </button>
          </div>
        </div>

        {/* Horizontal Category Tabs */}
        <div className="jatt-category-tabs-track" ref={tabsScrollRef}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat && !searchQuery;
            const count = categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                type="button"
                className={`jatt-cat-tab ${isActive ? "is-active" : ""}`}
                onClick={() => handleTabClick(cat)}
              >
                <span className="jatt-cat-label">{cat}</span>
                {count > 0 && (
                  <span className="jatt-cat-count">{count}</span>
                )}
                {isActive && (
                  <motion.div
                    className="jatt-cat-active-indicator"
                    layoutId="jattActiveCategory"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
