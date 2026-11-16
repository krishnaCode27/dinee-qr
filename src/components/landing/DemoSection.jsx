import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Star,
  Instagram,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  MapPin,
  Clock,
  Eye,
  Check
} from "lucide-react";

export default function DemoSection() {
  const [activeCategory, setActiveCategory] = useState("Starters & Kebabs");
  const [searchQuery, setSearchQuery] = useState("");

  const sampleCategories = [
    "Starters & Kebabs",
    "Main Course Curries",
    "Biryani & Rice",
    "Artisan Breads",
    "Heritage Desserts"
  ];

  const sampleDishes = [
    {
      id: "demo-1",
      name: "Tandoori Malai Paneer Tikka",
      category: "Starters & Kebabs",
      price: 260,
      dietary: "veg",
      description: "Charcoal-roasted cottage cheese cubes marinated in rich hung curd, cashew paste and fresh mint glaze.",
      image: "https://images.unsplash.com/photo-1567184109411-b28f27034344?w=400&auto=format&fit=crop&q=80",
      featured: true
    },
    {
      id: "demo-2",
      name: "Old Delhi Butter Chicken",
      category: "Main Course Curries",
      price: 380,
      dietary: "non-veg",
      description: "Tender boneless chicken roasted in a tandoor then simmered in a velvet tomato, butter, and fenugreek gravy.",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&auto=format&fit=crop&q=80",
      featured: true
    },
    {
      id: "demo-3",
      name: "Lucknowi Dum Murgh Biryani",
      category: "Biryani & Rice",
      price: 360,
      dietary: "non-veg",
      description: "Aromatic long-grain aged basmati rice cooked on slow dum with saffron, browned onions and whole spices.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80",
      featured: true
    },
    {
      id: "demo-4",
      name: "Garlic Butter Chur Chur Naan",
      category: "Artisan Breads",
      price: 85,
      dietary: "veg",
      description: "Crisp layered tandoor-baked flatbread crushed with desi ghee, roasted garlic and fresh coriander.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop&q=80",
      featured: false
    },
    {
      id: "demo-5",
      name: "Shahi Kesar Phirni",
      category: "Heritage Desserts",
      price: 140,
      dietary: "veg",
      description: "Slow-reduced ground rice pudding infused with Kashmiri saffron strands and slivered pistachios in an earthen pot.",
      image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=400&auto=format&fit=crop&q=80",
      featured: true
    }
  ];

  const filtered = sampleDishes.filter((dish) => {
    const matchesCat = activeCategory === dish.category;
    const matchesQuery = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return (searchQuery ? matchesQuery : matchesCat);
  });

  return (
    <section className="section-padding landing-section live-demo-section" id="demo">
      <div className="landing-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <Eye size={14} className="text-coral" />
            <span>INTERACTIVE RESTAURANT DEMO</span>
          </div>
          <h2 className="section-title">
            See How Your Menu Looks in Action
          </h2>
          <p className="section-desc">
            Explore a live interactive preview of a DineEQR contactless digital menu. Test category tabs, dish cards, and our brand-new Google Review and Instagram integration.
          </p>
        </div>

        {/* Live Demo Device Simulator */}
        <div className="demo-simulator-wrapper">
          <div className="demo-device-frame">
            {/* Device Browser Header */}
            <div className="demo-device-topbar">
              <div className="device-controls">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="device-url-bar">
                <span>dineeqr.blackcardinal.in/menu/the-spice-route</span>
                <span className="demo-sample-pill">Interactive Sample</span>
              </div>
            </div>

            {/* Menu Header Inside Simulator */}
            <div className="demo-menu-content">
              <div className="demo-hero-banner">
                <div className="demo-rest-identity">
                  <div className="demo-avatar">🍛</div>
                  <div>
                    <h3 className="demo-rest-name">The Spice Route</h3>
                    <p className="demo-rest-sub">Royal North Indian & Tandoor • Open Now</p>
                    <div className="demo-rest-meta">
                      <span><MapPin size={12} /> Morena, MP</span>
                      <span><Clock size={12} /> 11:30 AM – 11:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Social & Review Promotion Buttons */}
                <div className="demo-social-buttons-row">
                  <a
                    href="https://search.google.com/local/writereview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-social-btn google-badge-btn"
                    title="Customers tap this to leave a Google review"
                  >
                    <Star size={15} fill="#FBBC05" color="#FBBC05" />
                    <span>Rate Us on Google</span>
                    <ExternalLink size={12} />
                  </a>

                  <a
                    href="https://instagram.com/blackcardinal1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-social-btn instagram-badge-btn"
                    title="Customers tap this to follow your Instagram"
                  >
                    <Instagram size={15} />
                    <span>Follow Us on Instagram</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Search Bar in Demo */}
              <div className="demo-search-bar">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search dishes (e.g. Biryani, Paneer, Tikka)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter Tabs */}
              <div className="demo-category-tabs">
                {sampleCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`demo-tab-btn ${activeCategory === cat && !searchQuery ? "is-active" : ""}`}
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory(cat);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sample Food Dishes Grid */}
              <div className="demo-dishes-grid">
                {filtered.length > 0 ? (
                  filtered.map((dish) => (
                    <div key={dish.id} className="demo-dish-card">
                      <div className="demo-dish-image-wrap">
                        <img src={dish.image} alt={dish.name} loading="lazy" />
                        <span className={`demo-diet-tag ${dish.dietary}`}>
                          {dish.dietary === "veg" ? "Pure Veg" : "Non-Veg"}
                        </span>
                      </div>
                      <div className="demo-dish-info">
                        <div className="demo-dish-header">
                          <h4 className="demo-dish-title">{dish.name}</h4>
                          <span className="demo-dish-price">₹{dish.price}</span>
                        </div>
                        <p className="demo-dish-desc">{dish.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="demo-empty-state">
                    <p>No dishes matching "{searchQuery}" in this demo.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section Primary CTA */}
        <div className="demo-bottom-cta text-center">
          <div className="demo-cta-buttons-row" style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "12px" }}>
            <Link
              to="/jatt-roll-menu"
              className="btn btn-primary btn-xl"
              style={{ background: "linear-gradient(135deg, #FF6B00 0%, #FF5500 100%)", boxShadow: "0 8px 25px rgba(255, 107, 0, 0.4)" }}
            >
              🌯 Try JATT ROLL MENU Demo <ArrowUpRight size={18} />
            </Link>
            <Link
              to="/menu/the-spice-route"
              className="btn btn-outline btn-xl"
            >
              🍛 The Spice Route Demo <ArrowUpRight size={18} />
            </Link>
          </div>
          <p className="demo-sub-note">
            Open full smartphone viewport to test animated product cards, size selectors, live order tray, and WhatsApp checkout.
          </p>
        </div>
      </div>
    </section>
  );
}
