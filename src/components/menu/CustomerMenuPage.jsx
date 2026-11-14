import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import BrandLogo, { CircularBrandLogo } from "../common/BrandLogo";
import OrderCartDrawer from "./OrderCartDrawer";
import { sanitizeGoogleReviewUrl, sanitizeInstagramUrl, sanitizePhone, sanitizeUrl } from "../../utils/security";
import {
  Search,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  ArrowUpRight,
  Utensils,
  Share2,
  ChevronRight,
  Star,
  Instagram,
  ExternalLink
} from "lucide-react";

export default function CustomerMenuPage() {
  const { slug } = useParams();
  const { restaurants, incrementViews, notify } = useApp();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  // Find restaurant
  const restaurant = useMemo(() => {
    return restaurants.find((r) => r.slug === slug || r.id === slug);
  }, [restaurants, slug]);

  // Track page view once
  useEffect(() => {
    if (restaurant) {
      incrementViews(restaurant.slug);
    }
  }, [restaurant?.slug, incrementViews]);

  if (!restaurant) {
    return (
      <div className="public-menu-notfound">
        <div className="notfound-card">
          <BrandLogo size="md" />
          <h2>Menu Not Found</h2>
          <p>
            The digital menu link you scanned may have been updated or moved. Please ask your server for assistance.
          </p>
          <div className="notfound-actions">
            <Link to="/menu/the-spice-route" className="btn btn-primary">
              View The Spice Route Demo
            </Link>
            <Link to="/" className="btn btn-outline">
              Return to DineEQR Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Prevent unauthorized public access to unpublished or inactive menus
  if (restaurant.active === false || restaurant.status === "inactive" || restaurant.status === "draft") {
    return (
      <div className="public-menu-notfound">
        <div className="notfound-card">
          <BrandLogo size="md" />
          <h2>Menu Temporarily Inactive</h2>
          <p>
            The digital menu for <strong>{restaurant.name}</strong> is currently unpublished or undergoing revisions. Please check back soon or consult restaurant staff.
          </p>
          <div className="notfound-actions">
            <Link to="/" className="btn btn-primary">
              Return to DineEQR Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Template theme class
  const themeClassMap = {
    "premium-restaurant": "theme-premium",
    "modern-cafe": "theme-cafe",
    "street-food": "theme-street",
    "fine-dining": "theme-finedining",
    "bakery": "theme-bakery",
    "fast-food": "theme-fastfood",
    "minimal-menu": "theme-minimal",
    "colorful-food-menu": "theme-colorful"
  };
  const activeThemeClass = themeClassMap[restaurant.templateId] || "theme-premium";

  // Filter items
  const items = restaurant.items || [];
  const categories = restaurant.categories || [];

  const filteredItems = items.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = dietFilter === "all" || item.dietary === dietFilter;

    return matchesCat && matchesSearch && matchesDiet;
  });

  const featuredItems = items.filter((item) => item.featured && item.available);

  // Cart operations
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQty = (itemId, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i)));
    }
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${restaurant.name} Digital Menu`,
        text: `Check out the menu for ${restaurant.name} on DineEQR`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  return (
    <div className={`public-menu-shell ${activeThemeClass}`}>
      {/* Brand Header Bar */}
      <header className="public-menu-header">
        <div className="public-header-container">
          <Link to="/" className="public-brand-link">
            <CircularBrandLogo size={24} />
            <span className="public-brand-name">Dine<span className="text-coral">QR</span></span>
          </Link>
          <div className="public-header-right">
            <button className="share-btn-pill" onClick={handleShare}>
              {shareFeedback ? <Check size={13} className="text-green" /> : <Share2 size={13} />}
              <span>{shareFeedback ? "Link Copied" : "Share"}</span>
            </button>
            <span className="public-tagline-chip desktop-only">Scan. Explore. Order.</span>
          </div>
        </div>
      </header>

      {/* Hero Cover Banner */}
      <section
        className="public-restaurant-hero"
        style={{
          backgroundImage: sanitizeUrl(restaurant.coverImage)
            ? `linear-gradient(to bottom, rgba(17,19,23,0.3) 0%, rgba(17,19,23,0.85) 100%), url("${sanitizeUrl(restaurant.coverImage)}")`
            : "linear-gradient(135deg, #111317 0%, #202633 100%)"
        }}
      >
        <div className="public-hero-content">
          <div className="public-avatar-box">
            {restaurant.logo || "🍽️"}
          </div>

          <div className="public-rest-info">
            <div className="public-title-row">
              <h1 className="public-rest-title">{restaurant.name}</h1>
              <span className="verified-pill">Verified Menu</span>
            </div>

            <p className="public-tagline-text">
              {restaurant.tagline || restaurant.description}
            </p>

            <div className="public-meta-chips">
              <div className="meta-chip">
                <MapPin size={13} />
                <span>{restaurant.address ? `${restaurant.address}, ${restaurant.city}` : restaurant.city}</span>
              </div>
              <div className="meta-chip">
                <Clock size={13} />
                <span>{restaurant.openingHours || "11:00 AM – 11:00 PM"}</span>
              </div>
              {restaurant.phone && (
                <a href={sanitizePhone(restaurant.phone) ? `tel:${sanitizePhone(restaurant.phone)}` : "#"} className="meta-chip phone-chip">
                  <Phone size={13} />
                  <span>Call: {restaurant.phone}</span>
                </a>
              )}
            </div>

            {/* Social & Review Promotion Actions */}
            {((restaurant.googleReviewEnabled && sanitizeGoogleReviewUrl(restaurant.googleReviewUrl)) ||
              (restaurant.instagramEnabled && sanitizeInstagramUrl(restaurant.instagramUrl))) && (
              <div className="public-social-badges-row">
                {restaurant.googleReviewEnabled && sanitizeGoogleReviewUrl(restaurant.googleReviewUrl) && (
                  <a
                    href={sanitizeGoogleReviewUrl(restaurant.googleReviewUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="public-social-pill google-pill"
                    title={`Rate ${restaurant.name} on Google`}
                  >
                    <span className="pill-star-icon">⭐</span>
                    <span>Rate Us on Google</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {restaurant.instagramEnabled && sanitizeInstagramUrl(restaurant.instagramUrl) && (
                  <a
                    href={sanitizeInstagramUrl(restaurant.instagramUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="public-social-pill insta-pill"
                    title={`Follow ${restaurant.name} on Instagram`}
                  >
                    <span className="pill-insta-icon">📸</span>
                    <span>Follow Us on Instagram</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Menu Body */}
      <main className="public-menu-content">
        {/* Sticky Search & Dietary Filter Bar */}
        <div className="public-filter-sticky-bar">
          <div className="public-search-wrap">
            <Search size={15} className="public-search-icon" />
            <input
              type="text"
              placeholder={`Search in ${restaurant.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="public-diet-filters">
            <button
              className={`diet-tab-btn ${dietFilter === "all" ? "is-active" : ""}`}
              onClick={() => setDietFilter("all")}
            >
              All
            </button>
            <button
              className={`diet-tab-btn ${dietFilter === "veg" ? "is-active" : ""}`}
              onClick={() => setDietFilter("veg")}
            >
              <span className="diet-dot veg" /> Pure Veg
            </button>
            <button
              className={`diet-tab-btn ${dietFilter === "non-veg" ? "is-active" : ""}`}
              onClick={() => setDietFilter("non-veg")}
            >
              <span className="diet-dot non-veg" /> Non-Veg
            </button>
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="public-categories-bar">
          <button
            className={`cat-tab-btn ${activeCategory === "All" ? "is-active" : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            All Items
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`cat-tab-btn ${activeCategory === c ? "is-active" : ""}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured Specials Strip */}
        {activeCategory === "All" && !searchQuery && featuredItems.length > 0 && (
          <section className="public-featured-section">
            <div className="featured-section-title">
              <Sparkles size={16} className="text-coral" />
              <span>Chef's Recommended Specials</span>
            </div>

            <div className="featured-dishes-scroll">
              {featuredItems.map((item) => {
                const inCartItem = cart.find((i) => i.id === item.id);

                return (
                  <div key={`featured-${item.id}`} className="featured-dish-card">
                    {sanitizeUrl(item.image) && (
                      <div
                        className="featured-dish-img"
                        style={{ backgroundImage: `url("${sanitizeUrl(item.image)}")` }}
                      />
                    )}
                    <div className="featured-dish-body">
                      <div className="featured-dish-top">
                        <span className={`diet-dot ${item.dietary || "veg"}`} />
                        <span className="featured-badge-pill">Recommended</span>
                      </div>
                      <h4 className="featured-dish-name">{item.name}</h4>
                      <p className="featured-dish-desc">{item.description}</p>

                      <div className="featured-dish-footer">
                        <strong className="featured-price">₹{item.price}</strong>
                        {inCartItem ? (
                          <div className="mini-qty-box">
                            <button onClick={() => handleUpdateQty(item.id, inCartItem.quantity - 1)}>
                              <Minus size={12} />
                            </button>
                            <span>{inCartItem.quantity}</span>
                            <button onClick={() => handleUpdateQty(item.id, inCartItem.quantity + 1)}>
                              <Plus size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            className="btn btn-primary btn-xs add-tray-btn"
                            onClick={() => handleAddToCart(item)}
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Dishes List */}
        <section className="public-dishes-container">
          {filteredItems.length === 0 ? (
            <div className="public-empty-dishes">
              <Utensils size={36} />
              <h4>No dishes found</h4>
              <p>Try clearing your search query or switching dietary filters.</p>
            </div>
          ) : (
            <div className="dishes-list-grid">
              {filteredItems.map((item) => {
                const isAvailable = item.available !== false;
                const inCartItem = cart.find((i) => i.id === item.id);

                return (
                  <article
                    key={item.id}
                    className={`public-dish-card ${!isAvailable ? "is-sold-out" : ""}`}
                  >
                    <div className="dish-card-main">
                      <div className="dish-header-row">
                        <span className={`diet-dot ${item.dietary || "veg"}`} />
                        {item.featured && (
                          <span className="dish-chef-badge">Chef's Special</span>
                        )}
                        {!isAvailable && (
                          <span className="dish-soldout-badge">Sold Out</span>
                        )}
                      </div>

                      <h3 className="dish-name">{item.name}</h3>
                      <p className="dish-description">{item.description}</p>
                      <strong className="dish-price">₹{item.price}</strong>
                    </div>

                    <div className="dish-card-media">
                      {sanitizeUrl(item.image) ? (
                        <div
                          className="dish-photo"
                          style={{ backgroundImage: `url("${sanitizeUrl(item.image)}")` }}
                        />
                      ) : (
                        <div className="dish-photo-emoji">🍽️</div>
                      )}

                      {/* Add button below image */}
                      {isAvailable && (
                        <div className="dish-action-slot">
                          {inCartItem ? (
                            <div className="item-qty-selector">
                              <button
                                onClick={() => handleUpdateQty(item.id, inCartItem.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span>{inCartItem.quantity}</span>
                              <button
                                onClick={() => handleUpdateQty(item.id, inCartItem.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-outline btn-sm add-dish-btn"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add +
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom Social Engagement Box */}
        {((restaurant.googleReviewEnabled && restaurant.googleReviewUrl) ||
          (restaurant.instagramEnabled && restaurant.instagramUrl)) && (
          <div className="menu-bottom-engagement-box">
            <h4>Loved your dining experience?</h4>
            <p>Support {restaurant.name} by leaving a quick 5-star review or following us on Instagram for daily chef specials.</p>
            <div className="engagement-buttons-row">
              {restaurant.googleReviewEnabled && restaurant.googleReviewUrl && (
                <a
                  href={restaurant.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-action-btn google-review-btn"
                >
                  <span className="btn-star">⭐</span>
                  <span>Rate Us on Google</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {restaurant.instagramEnabled && restaurant.instagramUrl && (
                <a
                  href={restaurant.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-action-btn instagram-btn"
                >
                  <Instagram size={15} />
                  <span>Follow Us on Instagram</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating Order Tray Bar (Mobile / Tablet bottom bar) */}
      {totalCartCount > 0 && (
        <div className="floating-cart-bar">
          <div className="floating-cart-inner" onClick={() => setIsCartOpen(true)}>
            <div className="floating-cart-left">
              <div className="cart-badge-icon">
                <ShoppingBag size={18} />
                <span className="cart-bubble">{totalCartCount}</span>
              </div>
              <div className="cart-totals-preview">
                <strong>₹{totalCartAmount}</strong>
                <small>{totalCartCount} {totalCartCount === 1 ? "item" : "items"}</small>
              </div>
            </div>

            <div className="floating-cart-right">
              <span>View Order Tray</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      )}

      {/* Public Footer */}
      <footer className="public-menu-footer">
        <div className="footer-bird-icon" style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <CircularBrandLogo size={38} />
        </div>
        <p className="footer-thanks">Thanks for dining with us at {restaurant.name}!</p>
        <div className="footer-brand-credit">
          <span>Powered by <strong>DineEQR</strong> by <strong>Black Cardinal</strong></span>
          <span className="dot-sep">•</span>
          <span>Scan. Explore. Order.</span>
        </div>
        <Link to="/" className="footer-create-link">
          Create a contactless digital menu for your restaurant <ArrowUpRight size={13} />
        </Link>
      </footer>

      {/* Order Tray Drawer */}
      <OrderCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCart([])}
        restaurant={restaurant}
      />
    </div>
  );
}
