import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Flame, Sparkles } from "lucide-react";

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
  const activeTabRef = useRef(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Auto-scroll active category tab into view on mobile
  useEffect(() => {
    if (activeTabRef.current && tabsScrollRef.current) {
      const container = tabsScrollRef.current;
      const activeEl = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      // If active tab is out of view horizontally, scroll it into view smoothly
      if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
        const scrollOffset = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
        container.scrollTo({ left: scrollOffset, behavior: "smooth" });
      }
    }
  }, [activeCategory]);

  return (
    <div className="jatt-sticky-filter-wrapper">
      <div className="jatt-container">
        {/* Top Filter Bar: Animated Search Box + Diet Switcher */}
        <div className="jatt-filter-top-bar">
          <motion.div
            className={`jatt-search-box ${isSearchFocused ? "is-focused" : ""}`}
            animate={{
              boxShadow: isSearchFocused
                ? "0 0 0 3px rgba(255, 107, 0, 0.25), 0 4px 15px rgba(0, 0, 0, 0.3)"
                : "0 0 0 1px rgba(255, 255, 255, 0.08)"
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ color: isSearchFocused ? "#FF6B00" : "rgba(255, 247, 235, 0.45)" }}
              className="jatt-search-icon-wrap"
            >
              <Search size={15} />
            </motion.div>

            <input
              type="text"
              placeholder="Search rolls, chaap, fries, spices..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              aria-label="Search menu items"
            />

            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  type="button"
                  className="jatt-search-clear-btn"
                  onClick={() => onSearchChange("")}
                  aria-label="Clear search"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Dietary Filter Buttons */}
          <div className="jatt-diet-toggle-bar">
            <motion.button
              type="button"
              className={`jatt-diet-pill ${dietFilter === "all" ? "is-active" : ""}`}
              onClick={() => onDietFilterChange("all")}
              whileTap={{ scale: 0.94 }}
            >
              <span>All</span>
            </motion.button>
            <motion.button
              type="button"
              className={`jatt-diet-pill is-veg-pill ${dietFilter === "veg" ? "is-active" : ""}`}
              onClick={() => onDietFilterChange("veg")}
              whileTap={{ scale: 0.94 }}
            >
              <span className="jatt-veg-dot" />
              <span>Pure Veg</span>
            </motion.button>
            <motion.button
              type="button"
              className={`jatt-diet-pill is-egg-pill ${dietFilter === "egg" ? "is-active" : ""}`}
              onClick={() => onDietFilterChange("egg")}
              whileTap={{ scale: 0.94 }}
            >
              <span className="jatt-egg-dot" />
              <span>Egg Rolls</span>
            </motion.button>
          </div>
        </div>

        {/* Horizontal Category Tabs with Smooth Scroll */}
        <div className="jatt-category-tabs-track" ref={tabsScrollRef}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat && !searchQuery;
            const count = categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                ref={isActive ? activeTabRef : null}
                type="button"
                className={`jatt-cat-tab ${isActive ? "is-active" : ""}`}
                onClick={() => onSelectCategory(cat)}
              >
                <span className="jatt-cat-label">{cat}</span>
                {count > 0 && (
                  <span className="jatt-cat-count">{count}</span>
                )}
                {isActive && (
                  <motion.div
                    className="jatt-cat-active-indicator"
                    layoutId="jattActiveCategory"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
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
