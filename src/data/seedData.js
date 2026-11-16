// DineEQR by Black Cardinal — Initial Seed Data
export const TEMPLATES = [
  {
    id: "premium-restaurant",
    name: "Premium Restaurant",
    tagline: "Sophisticated charcoal tones with gold-coral accents",
    category: "Luxury & Contemporary",
    previewBg: "linear-gradient(135deg, #111317 0%, #1c212a 100%)",
    accentColor: "#FF4D38",
    badge: "Most Popular",
    description: "Designed for polished dining rooms, rooftop bistros, and modern upscale eateries.",
    themeClass: "theme-premium"
  },
  {
    id: "modern-cafe",
    name: "Modern Cafe",
    tagline: "Warm latte, cream and oat tones with clean modern lines",
    category: "Coffee & Brunch",
    previewBg: "linear-gradient(135deg, #2b211a 0%, #523e32 100%)",
    accentColor: "#E09F67",
    badge: "Trending",
    description: "Tailored for artisan roasteries, espresso bars, brunch spots, and dessert cafes.",
    themeClass: "theme-cafe"
  },
  {
    id: "street-food",
    name: "Street Food",
    tagline: "Vibrant high-contrast amber and coral with punchy badges",
    category: "Fast & Vibrant",
    previewBg: "linear-gradient(135deg, #FF4D38 0%, #E83620 100%)",
    accentColor: "#FFE600",
    badge: "High Energy",
    description: "Built for shawarma hubs, chaat counters, burger shacks, and night food stalls.",
    themeClass: "theme-street"
  },
  {
    id: "fine-dining",
    name: "Fine Dining",
    tagline: "Editorial typography with minimalist borders and classic elegance",
    category: "High End",
    previewBg: "linear-gradient(135deg, #0d131a 0%, #182029 100%)",
    accentColor: "#D4AF37",
    badge: "Signature",
    description: "Curated multi-course menus with refined wine lists and chef recommendations.",
    themeClass: "theme-finedining"
  },
  {
    id: "bakery",
    name: "Bakery & Patisserie",
    tagline: "Soft rose, vanilla cream and artisan pastry aesthetics",
    category: "Bakehouse & Sweets",
    previewBg: "linear-gradient(135deg, #4A2835 0%, #753F54 100%)",
    accentColor: "#FFAAA6",
    badge: "Artisanal",
    description: "Ideal for sourdough bakeries, French patisseries, waffle shops, and custom cake studios.",
    themeClass: "theme-bakery"
  },
  {
    id: "fast-food",
    name: "Fast Food",
    tagline: "Punchy red and bright mustard designed for quick scanning",
    category: "Quick Service (QSR)",
    previewBg: "linear-gradient(135deg, #991b1b 0%, #dc2626 100%)",
    accentColor: "#FBBF24",
    badge: "QSR Special",
    description: "Combos, meal deals, wings, pizza slices, and fast order items.",
    themeClass: "theme-fastfood"
  },
  {
    id: "minimal-menu",
    name: "Minimal Menu",
    tagline: "Black-and-white clarity with distraction-free layout",
    category: "Modern Minimalist",
    previewBg: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
    accentColor: "#FFFFFF",
    badge: "Clean Slate",
    description: "Pure, typographic menu for boutique eateries, cocktail bars, and farm-to-table spots.",
    themeClass: "theme-minimal"
  },
  {
    id: "colorful-food-menu",
    name: "Colorful Food Menu",
    tagline: "Playful multi-hue tags, friendly icons and vibrant food cards",
    category: "Casual & Family",
    previewBg: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
    accentColor: "#34D399",
    badge: "Family Friendly",
    description: "Lively menus for family restaurants, juice bars, ice cream parlors, and diners.",
    themeClass: "theme-colorful"
  }
];

export const SUBSCRIPTION_PLANS = [
  {
    id: "free-trial",
    name: "Free Trial",
    price: 0,
    durationDays: 8,
    durationLabel: "8 Days Free",
    billingCycle: "trial",
    description: "Test drive DineEQR with your complete menu and instantly generated QR code.",
    features: [
      "Dynamic QR code (PNG & SVG)",
      "Mobile-optimized customer view",
      "Unlimited items & categories",
      "Standard menu template"
    ],
    highlight: false,
    ctaText: "Start Free Trial"
  },
  {
    id: "extended-trial",
    name: "Extended Trial Pass",
    price: 100,
    durationDays: 15,
    durationLabel: "15 Days Access",
    billingCycle: "15-day pass",
    description: "Starter pass including custom-branded QR design and up to 8 physical table sticker prints.",
    features: [
      "Everything in Free Trial",
      "15 days active menu hosting",
      "Custom QR design with restaurant branding",
      "Up to 8 small printed QR stickers (Hard copy)",
      "Email & WhatsApp support"
    ],
    highlight: false,
    ctaText: "Get Started"
  },
  {
    id: "monthly-plan",
    name: "Monthly Pro",
    price: 100,
    durationDays: 30,
    durationLabel: "Per Month",
    billingCycle: "monthly",
    description: "The complete digital menu solution for restaurants, cafes, and cloud kitchens.",
    features: [
      "Custom restaurant URL (dineeqr.in/menu/...)",
      "Access to all 8 premium templates",
      "Monthly 3 menu updates / changes included",
      "Customized QR design with 8 small printed stickers (Hard copy)",
      "Priority Black Cardinal support",
      "Zero commission on orders"
    ],
    highlight: true,
    badge: "Best Value",
    ctaText: "Get Started"
  }
];

export const INITIAL_RESTAURANTS = [
  {
    id: "rest-cardinal-spice",
    name: "The Spice Route",
    slug: "the-spice-route",
    ownerName: "Vikramaditya Sharma",
    email: "vikram@thespiceroute.in",
    phone: "+91 88158 06560",
    address: "MG Road, Civil Lines",
    city: "Morena, Madhya Pradesh",
    description: "Royal North Indian curries, smoky char-grilled tandoori kebabs, and heritage aromatic biryanis crafted with slow-cooked authentic spices.",
    tagline: "A little spice, a lot of soul.",
    logo: "🍛",
    logoImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=160&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200&auto=format&fit=crop&q=80",
    openingHours: "11:30 AM – 11:00 PM (All Days)",
    category: "North Indian & Mughlai",
    templateId: "premium-restaurant",
    status: "active",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ-the-spice-route-morena",
    googleReviewEnabled: true,
    instagramUrl: "https://instagram.com/blackcardinal1",
    instagramEnabled: true,
    subscription: {
      planId: "monthly-plan",
      planName: "Monthly Pro",
      status: "active",
      startDate: "2026-11-01",
      expiryDate: "2026-12-01",
      paymentStatus: "Verified"
    },
    viewsCount: 1420,
    categories: ["Starters & Kebabs", "Main Course Curries", "Artisan Breads", "Biryani & Rice", "Heritage Desserts", "Beverages"],
    items: [
      {
        id: "item-101",
        name: "Tandoori Malai Paneer Tikka",
        category: "Starters & Kebabs",
        price: 260,
        dietary: "veg",
        description: "Charcoal-roasted cottage cheese cubes marinated in rich hung curd, cashew paste and fresh mint glaze.",
        image: "https://images.unsplash.com/photo-1567184109411-b28f27034344?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "item-102",
        name: "Old Delhi Butter Chicken",
        category: "Main Course Curries",
        price: 380,
        dietary: "non-veg",
        description: "Tender boneless chicken roasted in a tandoor then simmered in a luscious velvet tomato, butter, and fenugreek gravy.",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "item-103",
        name: "Dal Makhani Royale",
        category: "Main Course Curries",
        price: 240,
        dietary: "veg",
        description: "Slow-simmered whole black lentils cooked for 18 hours on glowing charcoal with churned white butter.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "item-104",
        name: "Awadhi Dum Gosht Biryani",
        category: "Biryani & Rice",
        price: 440,
        dietary: "non-veg",
        description: "Fragrant long-grain basmati layered with tender spiced mutton, saffron milk and caramelised shallots.",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "item-105",
        name: "Garlic Butter Naan",
        category: "Artisan Breads",
        price: 65,
        dietary: "veg",
        description: "Fresh hand-stretched refined flour flatbread topped with toasted garlic flakes and herb butter.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "item-106",
        name: "Warm Shahi Gulab Jamun",
        category: "Heritage Desserts",
        price: 95,
        dietary: "veg",
        description: "Mawa dumplings fried to golden perfection, soaked in cardamom-infused saffron sugar nectar.",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "item-107",
        name: "Kesar Mango Lassi",
        category: "Beverages",
        price: 110,
        dietary: "veg",
        description: "Chilled hand-churned yogurt blended with Alphonso mango pulp and Kashmiri saffron threads.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      }
    ],
    createdAt: "2026-10-15T09:00:00Z"
  },
  {
    id: "rest-urban-roast",
    name: "Urban Roast & Co.",
    slug: "urban-roast",
    ownerName: "Ananya Iyer",
    email: "ananya@urbanroast.cafe",
    phone: "+91 97112 34567",
    address: "Shop 4, Heritage Arcade, Sector 14",
    city: "Gurugram, Haryana",
    description: "Specialty single-origin pour-overs, sourdough tartines, flaky pastries, and hearty brunch bowls.",
    tagline: "Life happens over specialty coffee.",
    logo: "☕",
    logoImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=160&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&auto=format&fit=crop&q=80",
    openingHours: "08:00 AM – 10:30 PM (Mon-Sun)",
    category: "Specialty Coffee & Brunch",
    templateId: "modern-cafe",
    status: "active",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ-urban-roast-indore",
    googleReviewEnabled: true,
    instagramUrl: "https://instagram.com/blackcardinal1",
    instagramEnabled: true,
    subscription: {
      planId: "monthly-plan",
      planName: "Monthly Pro",
      status: "active",
      startDate: "2026-11-05",
      expiryDate: "2026-12-05",
      paymentStatus: "Verified"
    },
    viewsCount: 980,
    categories: ["Espresso & Brews", "Sourdough & Bagels", "Fresh Bowls", "Sweet Bakery", "Cold Refreshers"],
    items: [
      {
        id: "item-201",
        name: "Vanilla Bean Cortado",
        category: "Espresso & Brews",
        price: 180,
        dietary: "veg",
        description: "Double ristretto extracted over Madagascar bourbon vanilla and silky textured oat milk.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "item-202",
        name: "Avocado & Ricotta Tartine",
        category: "Sourdough & Bagels",
        price: 290,
        dietary: "veg",
        description: "Crushed Hass avocado on toasted house sourdough with fresh ricotta, chili crunch, and microgreens.",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "item-203",
        name: "Truffle Mushroom Melt",
        category: "Sourdough & Bagels",
        price: 320,
        dietary: "veg",
        description: "Sautéed wild shiitake and button mushrooms with melted aged cheddar and truffle garlic aioli.",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "item-204",
        name: "Almond Frangipane Croissant",
        category: "Sweet Bakery",
        price: 195,
        dietary: "egg",
        description: "Twice-baked buttery laminated pastry filled with almond cream and dusted with toasted flakes.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      }
    ],
    createdAt: "2026-10-22T14:30:00Z"
  },
  {
    id: "rest-bombay-patty",
    name: "The Street Crave",
    slug: "street-crave",
    ownerName: "Devansh Patel",
    email: "devansh@streetcrave.com",
    phone: "+91 99234 56789",
    address: "Corner Stall 12, Food Walk",
    city: "Indore, Madhya Pradesh",
    description: "Sizzling gourmet smash patties, loaded peri-peri fries, crunchy chaats, and chilled house lemonades.",
    tagline: "Crave bold. Eat loud.",
    logo: "🍔",
    logoImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=160&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
    openingHours: "01:00 PM – 01:00 AM (Late Night)",
    category: "Street Eats & Fast Food",
    templateId: "street-food",
    status: "active",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ-street-crave-indore",
    googleReviewEnabled: true,
    instagramUrl: "https://instagram.com/blackcardinal1",
    instagramEnabled: true,
    subscription: {
      planId: "free-trial",
      planName: "Free Trial (8 Days)",
      status: "trial",
      startDate: "2026-11-10",
      expiryDate: "2026-11-18",
      paymentStatus: "Trial Active"
    },
    viewsCount: 540,
    categories: ["Smash Burgers", "Loaded Fries", "Wraps & Rolls", "Chillers"],
    items: [
      {
        id: "item-301",
        name: "Double Cheddar Smash Patty",
        category: "Smash Burgers",
        price: 210,
        dietary: "non-veg",
        description: "Crispy-edged double smashed beef-style patties with secret crave sauce, pickles, and grilled onions.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "item-302",
        name: "Crispy Paneer Volcano Burger",
        category: "Smash Burgers",
        price: 190,
        dietary: "veg",
        description: "Crispy coated spicy paneer patty smothered with ghost pepper mayo and crunchy slaw.",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "item-303",
        name: "Firecracker Peri-Peri Fries",
        category: "Loaded Fries",
        price: 130,
        dietary: "veg",
        description: "Golden shoestring fries tossed in fiery African bird's eye spice mix with cheesy jalapeno dip.",
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      }
    ],
    createdAt: "2026-11-10T11:00:00Z"
  },
  {
    id: "rest-la-croissant",
    name: "La Petite Patisserie",
    slug: "la-petite-patisserie",
    ownerName: "Camille Fernandez",
    email: "contact@lapetitepatisserie.in",
    phone: "+91 98450 12345",
    address: "Boutique Lane, Colaba",
    city: "Mumbai, Maharashtra",
    description: "Classic French entremets, raspberry macarons, seasonal fruit tarts, and fresh sourdough loaves.",
    tagline: "Parisian sweetness in every crumb.",
    logo: "🥐",
    logoImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=80",
    openingHours: "09:00 AM – 09:00 PM (Tue-Sun)",
    category: "Artisan Bakery & Patisserie",
    templateId: "bakery",
    status: "active",
    subscription: {
      planId: "extended-trial",
      planName: "Extended Trial (15 Days)",
      status: "active",
      startDate: "2026-11-08",
      expiryDate: "2026-11-23",
      paymentStatus: "Pass Paid (₹100)"
    },
    viewsCount: 710,
    categories: ["Entremets & Tarts", "Artisan Breads", "Macarons & Cookies", "Tea & Tisanes"],
    items: [
      {
        id: "item-401",
        name: "Wild Berry & Pistachio Entremet",
        category: "Entremets & Tarts",
        price: 280,
        dietary: "egg",
        description: "Layers of Sicilian pistachio dacquoise, raspberry compote, and light white chocolate mousse with mirror glaze.",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "item-402",
        name: "Box of 6 French Macarons",
        category: "Macarons & Cookies",
        price: 450,
        dietary: "egg",
        description: "Assorted selection of Salted Caramel, Dark Chocolate Ganache, Rose Lychee, and Madagascar Vanilla.",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      }
    ],
    createdAt: "2026-11-08T08:15:00Z"
  },
  {
    id: "rest-jatt-roll-menu",
    name: "JATT ROLL MENU",
    slug: "jatt-roll-menu",
    ownerName: "Harpreet Singh",
    email: "orders@jattrollmenu.in",
    phone: "+91 88158 06560",
    address: "Shop 12, Food Street, Sector 18",
    city: "Gurugram, NCR",
    description: "Bold Flavours. Loaded Rolls. Full Satisfaction. Modern Indian street food brand specializing in loaded kathi rolls, succulent soya chaap, peri-peri crunch fries, and thick shakes.",
    tagline: "Bold Flavours. Loaded Rolls. Full Satisfaction.",
    logo: "🌯",
    logoImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=160&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1200&auto=format&fit=crop&q=85",
    openingHours: "12:00 PM – 11:30 PM (Daily)",
    category: "Street Food & Rolls",
    templateId: "street-food",
    status: "active",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ-jatt-roll-menu-demo",
    googleReviewEnabled: true,
    instagramUrl: "https://instagram.com/blackcardinal1",
    instagramEnabled: true,
    subscription: {
      planId: "monthly-plan",
      planName: "Monthly Pro",
      status: "active",
      startDate: "2026-11-15",
      expiryDate: "2026-12-15",
      paymentStatus: "Verified"
    },
    viewsCount: 3850,
    categories: ["Signature Items", "Chaap", "Veg Rolls", "Fries", "Egg Rolls"],
    items: [
      {
        id: "jatt-sig-1",
        name: "Spicy Bhoot",
        category: "Signature Items",
        price: 199,
        dietary: "veg",
        description: "Signature ghost pepper chilli spiced roll wrapped in flaky golden paratha with crispy fillings, jalapeño mayo, and secret street spice dust.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-sig-2",
        name: "Andhra Chilly",
        category: "Signature Items",
        price: 199,
        dietary: "veg",
        description: "Fiery Guntur chili marinade tossed with fresh onion rings, crisp green chilies, curry leaf tempering, and house special mint chutney.",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-sig-3",
        name: "Lord Lemon",
        category: "Signature Items",
        price: 199,
        dietary: "veg",
        description: "Tangy lemon-pepper zesty street roll bursting with citrus glaze, crushed black peppercorns, fresh coriander, and crisp golden crunch.",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "jatt-sig-4",
        name: "Korean Kaboom",
        category: "Signature Items",
        price: 199,
        dietary: "veg",
        description: "Sweet-spicy Korean gochujang glazed fusion crunch roll with toasted sesame seeds, shredded cabbage slaw, and spicy garlic aioli.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-chaap-1",
        name: "Kadak Singh",
        category: "Chaap",
        price: 129,
        dietary: "veg",
        description: "Crispy tandoori soya chaap tossed in robust Punjabi spices, chatpata masala, sliced red onions, and tangy mint chutney. Regular ₹129 / Loaded ₹179",
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-chaap-2",
        name: "V. Manchurian",
        category: "Chaap",
        price: 139,
        dietary: "veg",
        description: "Soya chaap coated in savory Indo-Chinese Manchurian glaze, minced ginger, toasted garlic bits, and fresh spring onion greens. Regular ₹139 / Loaded ₹189",
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "jatt-chaap-3",
        name: "M. Mushroom",
        category: "Chaap",
        price: 149,
        dietary: "veg",
        description: "Juicy marinated button mushrooms and tender soya chaap sautéed with cracked black pepper, street seasonings, and creamy dressing. Regular ₹149 / Loaded ₹199",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "jatt-chaap-4",
        name: "Mughlai Chaap",
        category: "Chaap",
        price: 159,
        dietary: "veg",
        description: "Rich Mughlai aromatic gravy spiced chaap roll infused with cardamom, creamy cashew paste, and royal whole spices. Regular ₹159 / Loaded ₹209",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-chaap-5",
        name: "Makhani Chaap",
        category: "Chaap",
        price: 169,
        dietary: "veg",
        description: "Charcoal-grilled soya chaap drenched in velvety butter-rich tomato makhani sauce, fresh cream, and fragrant kasuri methi. Regular ₹169 / Loaded ₹219",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-veg-1",
        name: "Happy Singh",
        category: "Veg Rolls",
        price: 79,
        dietary: "veg",
        description: "The all-time favourite classic street-style mixed vegetable roll loaded with crunchy cabbage, capsicum, and zesty sauces.",
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "jatt-veg-2",
        name: "JR Lucky",
        category: "Veg Rolls",
        price: 89,
        dietary: "veg",
        description: "Special chef roll packed with seasoned aloo patty, fresh crisp onions, crunchy greens, and our signature roll cream.",
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-veg-3",
        name: "Bhutta Singh",
        category: "Veg Rolls",
        price: 99,
        dietary: "veg",
        description: "Golden sweet corn and sautéed spiced veggies roll wrapped in a warm flaky paratha with chipotle mayonnaise drizzle.",
        image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "jatt-veg-4",
        name: "Shammi Kebab",
        category: "Veg Rolls",
        price: 119,
        dietary: "veg",
        description: "Melt-in-mouth spiced vegetarian shammi kebab rolls with sliced red onions, chaat masala, and cooling mint-curd yogurt dip.",
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-fries-1",
        name: "Salted Fries",
        category: "Fries",
        price: 89,
        dietary: "veg",
        description: "Golden crisp French fries fried fresh to order and delicately seasoned with pure fine sea salt.",
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "jatt-fries-2",
        name: "Peri Peri",
        category: "Fries",
        price: 99,
        dietary: "veg",
        description: "Crispy hot French fries vigorously shaken with tangy, fiery African peri-peri chili dust.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-fries-3",
        name: "Loaded Nachos",
        category: "Fries",
        price: 149,
        dietary: "veg",
        description: "Crunchy corn tortilla chips loaded with hot liquid cheese sauce, tomato salsa, sliced pickled jalapeños, and spiced mayonnaise.",
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-egg-1",
        name: "Classic Egg",
        category: "Egg Rolls",
        price: 79,
        dietary: "egg",
        description: "Beaten farm-fresh egg fried directly over golden layered paratha, rolled with crunchy spiced onions, green chili, and tangy sauces.",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: false
      },
      {
        id: "jatt-egg-2",
        name: "Makhani Egg",
        category: "Egg Rolls",
        price: 89,
        dietary: "egg",
        description: "Golden egg roll infused with rich buttery tomato makhani sauce, roasted street spices, and crisp pickled onions.",
        image: "https://images.unsplash.com/photo-1567184109411-b28f27034344?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-egg-3",
        name: "Loaded Egg",
        category: "Egg Rolls",
        price: 99,
        dietary: "egg",
        description: "Double egg roll loaded with extra toppings, melted cheese blend, sautéed crunchy veggies, and roasted garlic mayonnaise.",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      },
      {
        id: "jatt-egg-4",
        name: "Korean Egg",
        category: "Egg Rolls",
        price: 119,
        dietary: "egg",
        description: "Crispy egg roll tossed with savory Korean gochujang glaze, spicy kimchi mayo, toasted white sesame seeds, and fresh scallions.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
        available: true,
        featured: true
      }
    ],
    createdAt: "2026-11-15T10:00:00Z"
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: "enq-101",
    customerName: "Rajesh Malhotra",
    restaurantName: "The Grand Dhaba & Lounge",
    phone: "+91 98231 11223",
    email: "rajesh@granddhaba.com",
    city: "Chandigarh",
    message: "Interested in the Monthly Plan for 2 branches. Need help with professional QR stand prints and bilingual menu.",
    date: "2026-11-13T16:20:00Z",
    status: "New",
    source: "Landing Page Form"
  },
  {
    id: "enq-102",
    customerName: "Sunita Deshmukh",
    restaurantName: "Chai & Conversations",
    phone: "+91 97654 33221",
    email: "sunita@chaiconvo.in",
    city: "Pune",
    message: "Want to claim the free launch offer for small shops! We have 25 items on our cafe menu.",
    date: "2026-11-12T11:45:00Z",
    status: "Contacted",
    source: "Launch Offer Banner"
  },
  {
    id: "enq-103",
    customerName: "Tariq Mansoor",
    restaurantName: "Al-Bake Express",
    phone: "+91 99887 76655",
    email: "tariq@albakeexpress.com",
    city: "Lucknow",
    message: "Activated 8-day trial and love the speed. How do we upgrade to the annual or monthly subscription?",
    date: "2026-11-11T09:10:00Z",
    status: "Converted",
    source: "Trial Expiry Prompt"
  },
  {
    id: "enq-104",
    customerName: "Kavita Rao",
    restaurantName: "Bakehouse 72",
    phone: "+91 91234 56780",
    email: "kavita@bakehouse72.com",
    city: "Bengaluru",
    message: "Can we add daily chef specials that disappear when sold out? Checked out the demo and loved the bakery theme.",
    date: "2026-11-09T14:30:00Z",
    status: "Closed",
    source: "Landing Demo"
  }
];

export const INITIAL_ANALYTICS = {
  dailyViews: [
    { day: "Mon", views: 240, scans: 195 },
    { day: "Tue", views: 310, scans: 260 },
    { day: "Wed", views: 420, scans: 345 },
    { day: "Thu", views: 390, scans: 310 },
    { day: "Fri", views: 680, scans: 590 },
    { day: "Sat", views: 920, scans: 810 },
    { day: "Sun", views: 850, scans: 740 }
  ],
  deviceBreakdown: [
    { device: "Mobile (iOS / Android)", percentage: 89 },
    { device: "Tablet", percentage: 7 },
    { device: "Desktop", percentage: 4 }
  ],
  recentActivity: [
    { id: "act-1", text: "New restaurant registered: The Street Crave", time: "2 hours ago", type: "register" },
    { id: "act-2", text: "QR code downloaded for The Spice Route (High-res SVG)", time: "4 hours ago", type: "qr" },
    { id: "act-3", text: "New enquiry from The Grand Dhaba & Lounge", time: "Yesterday", type: "enquiry" },
    { id: "act-4", text: "Template assigned: Modern Cafe to Urban Roast & Co.", time: "2 days ago", type: "template" },
    { id: "act-5", text: "Menu updated: Old Delhi Butter Chicken price updated", time: "3 days ago", type: "menu" }
  ]
};
