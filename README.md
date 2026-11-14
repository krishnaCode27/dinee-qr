# DineEQR by Black Cardinal — Smart Digital Menu SaaS Platform

> **Official Brand:** DineEQR  
> **Parent Company:** Black Cardinal  
> **Tagline:** Scan. Explore. Order.

A production-grade, responsive, full-stack React SaaS application for restaurant, cafe, and bakery QR-powered digital menus.

---

## 🚀 Key Features

### 1. Brand Identity & Design System
- **Brand Colors:** Deep charcoal (`#111317`), warm ivory (`#FAF8F5`), vibrant coral red accent (`#FF4D38`), warm orange (`#F59E0B`), soft yellow (`#EAB308`), subtle green (`#10B981`).
- **Typography:** Plus Jakarta Sans & Sora for headings; Inter for body and metrics.
- **Official Logo:** Black Cardinal geometric bird insignia + clean DineEQR wordmark.

### 2. Modern SaaS Landing Page (`/`)
- Responsive sticky navbar with live demo indicator and quick portal login.
- Dynamic hero section with animated QR menu mockup and interactive previews.
- **8 Restaurant Templates Gallery:**
  - Premium Restaurant
  - Modern Cafe
  - Street Food
  - Fine Dining
  - Bakery & Patisserie
  - Fast Food (QSR)
  - Minimal Menu
  - Colorful Food Menu
- 4-step interactive onboarding process guide.
- Feature grid highlighting zero app downloads, real-time sync, and dietary filtering.
- Transparent pricing tiers:
  - **Free Trial:** 8 Days (₹0) — Includes Dynamic QR code (PNG & SVG), Mobile-optimized customer view, Unlimited items & categories, Standard menu template.
  - **Extended Trial Pass:** 15 Days (₹100) — Includes custom QR design with branding, up to 8 small printed QR stickers (hard copy), and 15 days menu hosting.
  - **Monthly Pro Plan:** ₹100/month — Includes custom URL, all 8 templates, 3 monthly menu changes, customized QR design with 8 small printed stickers (hard copy), and priority support.
  - **Launch Promotion:** Free custom QR design for the first 8 small shops.
- Interactive lead capture & enquiry modal.
- Collapsible FAQ and comprehensive footer with verified contact credentials.

### 3. Linear/Stripe-Grade Admin Dashboard (`/admin`)
- **Collapsible Sidebar:** Overview, Restaurants, Menus, Categories, Menu Items, QR Codes, Templates, Analytics, Subscriptions, Enquiries, Settings, Exit Portal.
- **Mobile Responsive Drawer:** Seamless drawer navigation on mobile and tablet screens.
- **Overview View:** Real-time summary cards, 7-day menu page views bar chart, quick action shortcuts, and recent restaurant tables.
- **Restaurant Management:** Full CRUD (add, edit, activate/deactivate, delete with confirmation), search, status filters, and unique customer-facing URL generation (`/menu/:slug`).
- **Menu Builder:** Category reordering, dietary badges (Pure Veg, Non-Veg, Vegan, Egg), price editing, dish photo upload, chef's specials, and instant in-stock/sold-out toggles.
- **QR Code Management:** Instant vector SVG and high-resolution PNG download, print-ready acrylic table stand layout preview, copy link with toast notification.
- **Template Management:** Preview and assign any of the 8 design styles to any restaurant in 1 click.
- **Analytics:** Verified menu page views, daily view distribution, device breakdown (mobile vs desktop), and top-performing dishes.
- **Subscriptions & Billing:** Plan tier administration, manual trial extensions (+15 days), expiry filters, and payment verification tracking.
- **Enquiries & Lead Management:** View customer inquiries from the landing page, update lead pipeline status (`New`, `Contacted`, `Converted`, `Closed`), and filter requests.
- **System Settings:** Currency preference selector, support contacts, full JSON export backup, JSON restore, and demo seed data reset.

### 4. Customer-Facing Mobile Menu (`/menu/:slug`)
- Mobile-first, sub-second rendering with dynamic template styling.
- Restaurant cover imagery, logo avatar, opening hours, address, and direct call button.
- Instant dish search and dietary filters (All, Pure Veg, Non-Veg).
- Chef's Special / Recommended dishes carousel.
- Interactive order tray drawer with live quantity controls and **"Send Order to WhatsApp"** direct ordering integration.

---

## 📁 Updated Folder Structure

```
d:\digital_menu\
├── index.html                     # HTML5 shell with Google Fonts & favicon
├── package.json                   # Dependencies & build scripts
├── src/
│   ├── main.jsx                   # React root mount
│   ├── App.jsx                    # Route dispatcher with global AppProvider
│   ├── styles.css                 # Production design tokens & responsive CSS
│   ├── context/
│   │   └── AppContext.jsx         # Global state provider & storage dispatcher
│   ├── data/
│   │   ├── seedData.js            # Initial realistic seed data for 4 restaurants
│   │   └── storage.js             # Robust localStorage manager with import/export
│   └── components/
│       ├── common/
│       │   ├── BrandLogo.jsx      # Black Cardinal bird + DineEQR wordmark
│       │   ├── Modal.jsx          # Accessible modal dialog
│       │   ├── ConfirmDialog.jsx  # Reversible confirmation modal
│       │   └── ToastContainer.jsx # Toast notification stack
│       ├── landing/
│       │   ├── LandingPage.jsx    # Complete SaaS marketing landing page
│       │   ├── LandingNav.jsx     # Modern navbar
│       │   ├── HeroSection.jsx    # Hero with live QR mockup
│       │   ├── TemplateGallery.jsx# 8 restaurant menu templates showcase
│       │   ├── HowItWorks.jsx     # 4-step onboarding workflow
│       │   ├── FeaturesSection.jsx# Feature value propositions
│       │   ├── PricingSection.jsx # Pricing plans & launch offer
│       │   ├── FAQSection.jsx     # Interactive FAQ accordion
│       │   ├── LandingFooter.jsx  # Official footer
│       │   └── EnquiryModal.jsx   # Lead capture form
│       ├── admin/
│       │   ├── AdminLayout.jsx    # Main admin shell & view switcher
│       │   ├── AdminSidebar.jsx   # Collapsible sidebar with mobile drawer
│       │   ├── AdminHeader.jsx    # Topbar with breadcrumb & actions
│       │   ├── views/
│       │   │   ├── OverviewView.jsx
│       │   │   ├── RestaurantsView.jsx
│       │   │   ├── MenusView.jsx
│       │   │   ├── CategoriesView.jsx
│       │   │   ├── ItemsView.jsx
│       │   │   ├── QRCodesView.jsx
│       │   │   ├── TemplatesView.jsx
│       │   │   ├── AnalyticsView.jsx
│       │   │   ├── SubscriptionsView.jsx
│       │   │   ├── EnquiriesView.jsx
│       │   │   └── SettingsView.jsx
│       │   └── modals/
│       │       ├── RestaurantModal.jsx
│       │       ├── MenuItemModal.jsx
│       │       └── PrintQRModal.jsx
│       └── menu/
│           ├── CustomerMenuPage.jsx# Mobile-first public menu
│           └── OrderCartDrawer.jsx # WhatsApp ordering tray
```

---

## 🛠️ Run & Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Preloaded Demo Menus
- **The Spice Route:** `/menu/the-spice-route` (Premium North Indian & Tandoor)
- **Urban Roast & Co.:** `/menu/urban-roast` (Specialty Cafe & Brunch)
- **The Street Crave:** `/menu/street-crave` (Street Food & Smash Burgers)
- **La Petite Patisserie:** `/menu/la-petite-patisserie` (Artisan French Bakery)

---

## 🔒 Production Readiness & Backend Roadmap
- Currently data is persisted locally via `localStorage` with full JSON import/export and reset capability.
- The business layer is decoupled inside `src/data/storage.js` and `AppContext.jsx`. To connect a remote database (PostgreSQL, Supabase, or Firebase) and Auth0 authentication, replace the storage methods with API calls.
- Payment gateways (Razorpay/Stripe) can be connected to the Subscription & Order endpoints.
