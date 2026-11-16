// JATT ROLL MENU — Official Brand & Menu Data
// Subtitle: Rolls | Chaap | Fries | Shakes
// Tagline: Bold Flavours. Loaded Rolls. Full Satisfaction.

export const JATT_ROLL_BRAND = {
  id: "jatt-roll-menu",
  name: "JATT ROLL MENU",
  slug: "jatt-roll-menu",
  subtitle: "Rolls | Chaap | Fries | Shakes",
  tagline: "Bold Flavours. Loaded Rolls. Full Satisfaction.",
  description: "Modern Indian street food brand specializing in loaded kathi rolls, succulent soya chaap, peri-peri crunch fries, and thick shakes.",
  rating: "4.9",
  reviewsCount: "1.2k+ Reviews",
  badge: "Trending Street Brand",
  openingHours: "12:00 PM – 11:30 PM (Daily)",
  location: "Sector 18, Street Food Hub",
  city: "Gurugram, NCR",
  phone: "+91 88158 06560",
  whatsapp: "+91 88158 06560",
  logoEmoji: "🌯",
  accentColor: "#FF6B00",
  secondaryColor: "#FFB703",
  darkColor: "#0A0A0C",
  menuUrl: "https://dineeqr.netlify.app/jatt-roll-menu",
  heroImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1200&auto=format&fit=crop&q=85",
  stats: [
    { label: "Signature Rolls", value: "20+ Varieties" },
    { label: "Preparation", value: "Made Fresh" },
    { label: "Customer Love", value: "4.9 ★ Rating" }
  ]
};

export const JATT_CATEGORIES = [
  "All",
  "Signature Items",
  "Chaap",
  "Veg Rolls",
  "Fries",
  "Egg Rolls"
];

export const JATT_MENU_ITEMS = [
  // 1. SIGNATURE ITEMS
  {
    id: "jatt-sig-1",
    name: "Spicy Bhoot",
    category: "Signature Items",
    dietary: "veg",
    price: 199,
    badge: "Fiery Bestseller 🔥",
    description: "Signature ghost pepper chilli spiced roll wrapped in flaky golden paratha with crispy fillings, jalapeño mayo, and our secret street spice dust.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 3,
    featured: true,
    available: true
  },
  {
    id: "jatt-sig-2",
    name: "Andhra Chilly",
    category: "Signature Items",
    dietary: "veg",
    price: 199,
    badge: "Hot & Tangy 🌶️",
    description: "Fiery Guntur chili marinade tossed with fresh onion rings, crisp green chilies, curry leaf tempering, and house special mint chutney.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 3,
    featured: true,
    available: true
  },
  {
    id: "jatt-sig-3",
    name: "Lord Lemon",
    category: "Signature Items",
    dietary: "veg",
    price: 199,
    badge: "Zesty Hit 🍋",
    description: "Tangy lemon-pepper zesty street roll bursting with citrus glaze, crushed black peppercorns, fresh coriander, and crisp golden crunch.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: false,
    available: true
  },
  {
    id: "jatt-sig-4",
    name: "Korean Kaboom",
    category: "Signature Items",
    dietary: "veg",
    price: 199,
    badge: "Fusion Special ✨",
    description: "Sweet-spicy Korean gochujang glazed fusion crunch roll with toasted sesame seeds, shredded cabbage slaw, and spicy garlic aioli.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 2,
    featured: true,
    available: true
  },

  // 2. CHAAP (Regular & Loaded sizes)
  {
    id: "jatt-chaap-1",
    name: "Kadak Singh",
    category: "Chaap",
    dietary: "veg",
    price: 129,
    hasSizes: true,
    sizes: {
      regular: { name: "Regular", price: 129 },
      loaded: { name: "Loaded", price: 179 }
    },
    badge: "Punjabi Classic",
    description: "Crispy tandoori soya chaap tossed in robust Punjabi spices, chatpata masala, sliced red onions, and tangy mint chutney.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 2,
    featured: true,
    available: true
  },
  {
    id: "jatt-chaap-2",
    name: "V. Manchurian",
    category: "Chaap",
    dietary: "veg",
    price: 139,
    hasSizes: true,
    sizes: {
      regular: { name: "Regular", price: 139 },
      loaded: { name: "Loaded", price: 189 }
    },
    badge: "Indo-Chinese",
    description: "Soya chaap coated in savory Indo-Chinese Manchurian glaze, minced ginger, toasted garlic bits, and fresh spring onion greens.",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 2,
    featured: false,
    available: true
  },
  {
    id: "jatt-chaap-3",
    name: "M. Mushroom",
    category: "Chaap",
    dietary: "veg",
    price: 149,
    hasSizes: true,
    sizes: {
      regular: { name: "Regular", price: 149 },
      loaded: { name: "Loaded", price: 199 }
    },
    badge: "Mushroom Special",
    description: "Juicy marinated button mushrooms and tender soya chaap sautéed with cracked black pepper, street seasonings, and creamy dressing.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: false,
    available: true
  },
  {
    id: "jatt-chaap-4",
    name: "Mughlai Chaap",
    category: "Chaap",
    dietary: "veg",
    price: 159,
    hasSizes: true,
    sizes: {
      regular: { name: "Regular", price: 159 },
      loaded: { name: "Loaded", price: 209 }
    },
    badge: "Royal Rich",
    description: "Rich Mughlai aromatic gravy spiced chaap roll infused with cardamom, creamy cashew paste, and royal whole spices.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: true,
    available: true
  },
  {
    id: "jatt-chaap-5",
    name: "Makhani Chaap",
    category: "Chaap",
    dietary: "veg",
    price: 169,
    hasSizes: true,
    sizes: {
      regular: { name: "Regular", price: 169 },
      loaded: { name: "Loaded", price: 219 }
    },
    badge: "Top Seller ⭐",
    description: "Charcoal-grilled soya chaap drenched in velvety butter-rich tomato makhani sauce, fresh cream, and fragrant kasuri methi.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: true,
    available: true
  },

  // 3. VEG ROLLS
  {
    id: "jatt-veg-1",
    name: "Happy Singh",
    category: "Veg Rolls",
    dietary: "veg",
    price: 79,
    badge: "Street Hit",
    description: "The all-time favourite classic street-style mixed vegetable roll loaded with crunchy cabbage, capsicum, and zesty sauces.",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: false,
    available: true
  },
  {
    id: "jatt-veg-2",
    name: "JR Lucky",
    category: "Veg Rolls",
    dietary: "veg",
    price: 89,
    badge: "Chef Pick",
    description: "Special chef roll packed with seasoned aloo patty, fresh crisp onions, crunchy greens, and our signature roll cream.",
    image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: true,
    available: true
  },
  {
    id: "jatt-veg-3",
    name: "Bhutta Singh",
    category: "Veg Rolls",
    dietary: "veg",
    price: 99,
    badge: "Sweet & Spicy",
    description: "Golden sweet corn and sautéed spiced veggies roll wrapped in a warm flaky paratha with chipotle mayonnaise drizzle.",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: false,
    available: true
  },
  {
    id: "jatt-veg-4",
    name: "Shammi Kebab",
    category: "Veg Rolls",
    dietary: "veg",
    price: 119,
    badge: "Melt In Mouth",
    description: "Melt-in-mouth spiced vegetarian shammi kebab rolls with sliced red onions, chaat masala, and cooling mint-curd yogurt dip.",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 2,
    featured: true,
    available: true
  },

  // 4. FRIES
  {
    id: "jatt-fries-1",
    name: "Salted Fries",
    category: "Fries",
    dietary: "veg",
    price: 89,
    badge: "Crispy",
    description: "Golden crisp French fries fried fresh to order and delicately seasoned with pure fine sea salt.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 0,
    featured: false,
    available: true
  },
  {
    id: "jatt-fries-2",
    name: "Peri Peri",
    category: "Fries",
    dietary: "veg",
    price: 99,
    badge: "Crowd Favorite 🔥",
    description: "Crispy hot French fries vigorously shaken with tangy, fiery African peri-peri chili dust.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 2,
    featured: true,
    available: true
  },
  {
    id: "jatt-fries-3",
    name: "Loaded Nachos",
    category: "Fries",
    dietary: "veg",
    price: 149,
    badge: "Cheesy Overload 🧀",
    description: "Crunchy corn tortilla chips loaded with hot liquid cheese sauce, tomato salsa, sliced pickled jalapeños, and spiced mayonnaise.",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: true,
    available: true
  },

  // 5. EGG ROLLS
  {
    id: "jatt-egg-1",
    name: "Classic Egg",
    category: "Egg Rolls",
    dietary: "egg",
    price: 79,
    badge: "Kolkata Style",
    description: "Beaten farm-fresh egg fried directly over golden layered paratha, rolled with crunchy spiced onions, green chili, and tangy sauces.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: false,
    available: true
  },
  {
    id: "jatt-egg-2",
    name: "Makhani Egg",
    category: "Egg Rolls",
    dietary: "egg",
    price: 89,
    badge: "Butter Rich",
    description: "Golden egg roll infused with rich buttery tomato makhani sauce, roasted street spices, and crisp pickled onions.",
    image: "https://images.unsplash.com/photo-1567184109411-b28f27034344?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: true,
    available: true
  },
  {
    id: "jatt-egg-3",
    name: "Loaded Egg",
    category: "Egg Rolls",
    dietary: "egg",
    price: 99,
    badge: "Extra Stuffed 🥚",
    description: "Double egg roll loaded with extra toppings, melted cheese blend, sautéed crunchy veggies, and roasted garlic mayonnaise.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 1,
    featured: true,
    available: true
  },
  {
    id: "jatt-egg-4",
    name: "Korean Egg",
    category: "Egg Rolls",
    dietary: "egg",
    price: 119,
    badge: "Gochujang Kick 🥢",
    description: "Crispy egg roll tossed with savory Korean gochujang glaze, spicy kimchi mayo, toasted white sesame seeds, and fresh scallions.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    spiceLevel: 2,
    featured: true,
    available: true
  }
];
