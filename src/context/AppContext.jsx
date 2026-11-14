// DineEQR by Black Cardinal — Application Context
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from "react";
import { storage, slugify } from "../data/storage";
import { TEMPLATES, SUBSCRIPTION_PLANS } from "../data/seedData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [restaurants, setRestaurants] = useState(() => storage.getRestaurants());
  const [enquiries, setEnquiries] = useState(() => storage.getEnquiries());
  const [settings, setSettings] = useState(() => storage.getSettings());
  const [toasts, setToasts] = useState([]);

  // Session Token State — Verified against Netlify backend
  const [adminSession, setAdminSession] = useState(() => {
    try {
      const token = sessionStorage.getItem("dineeqr_session_token");
      const expiresAt = Number(sessionStorage.getItem("dineeqr_session_expires") || 0);
      const userStr = sessionStorage.getItem("dineeqr_admin_user");
      const user = userStr ? JSON.parse(userStr) : null;

      if (token && expiresAt > Date.now()) {
        return { token, expiresAt, user };
      }
      return null;
    } catch {
      return null;
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return Boolean(adminSession && adminSession.expiresAt > Date.now());
  });

  const sessionTimerRef = useRef(null);

  // Toast notification dispatcher — Defined first so subsequent callbacks can safely depend on it
  const notify = useCallback((message, type = "success", duration = 3500) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Secure logout handler — Clears all session tokens and security state
  const logoutAdmin = useCallback((showNotification = true) => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }

    try {
      sessionStorage.removeItem("dineeqr_session_token");
      sessionStorage.removeItem("dineeqr_session_expires");
      sessionStorage.removeItem("dineeqr_admin_user");
      // Clean up legacy keys
      sessionStorage.removeItem("dineeqr_admin_auth");
      localStorage.removeItem("dineeqr_admin_auth");
      sessionStorage.removeItem("dineqr_admin_auth");
      localStorage.removeItem("dineqr_admin_auth");
    } catch (e) {
      console.warn("Storage clearance warning:", e);
    }

    setIsAdminAuthenticated(false);
    setAdminSession(null);

    if (showNotification) {
      notify("Logged out of Admin Portal", "info");
    }
  }, [notify]);

  // Secure server-side authentication login
  const loginAdmin = useCallback(async (username, password) => {
    if (!username?.trim() || !password) {
      notify("Please provide both username and password.", "error");
      return false;
    }

    try {
      const response = await fetch("/api/auth-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success && data.token) {
        sessionStorage.setItem("dineeqr_session_token", data.token);
        sessionStorage.setItem("dineeqr_session_expires", data.expiresAt.toString());
        sessionStorage.setItem("dineeqr_admin_user", JSON.stringify(data.user || { username, role: "admin" }));

        setAdminSession({ token: data.token, expiresAt: data.expiresAt, user: data.user });
        setIsAdminAuthenticated(true);

        // Schedule automatic session expiry logout
        const remainingMs = Math.max(0, data.expiresAt - Date.now());
        if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
        sessionTimerRef.current = setTimeout(() => {
          logoutAdmin(false);
          notify("Your administrator session has expired. Please log in again.", "warning");
        }, remainingMs);

        notify("Welcome back, Administrator!", "success");
        return true;
      } else {
        const errorMsg = data.error || (response.status === 429 ? "Too many login attempts. Account temporarily locked." : "Invalid administrator credentials.");
        notify(errorMsg, "error");
        return false;
      }
    } catch (err) {
      console.warn("Server auth endpoint unavailable:", err);

      // Offline / Local development fallback: ONLY active if explicitly enabled in environment
      if (import.meta.env.VITE_ENABLE_MOCK_AUTH === "true") {
        if (username === "admin") {
          const fakeExp = Date.now() + (8 * 3600 * 1000);
          sessionStorage.setItem("dineeqr_session_token", "dev_mock_token");
          sessionStorage.setItem("dineeqr_session_expires", fakeExp.toString());
          sessionStorage.setItem("dineeqr_admin_user", JSON.stringify({ username: "admin", role: "admin" }));
          setIsAdminAuthenticated(true);
          setAdminSession({ token: "dev_mock_token", expiresAt: fakeExp, user: { username: "admin", role: "admin" } });
          notify("Logged in via Local Dev Mock Mode (VITE_ENABLE_MOCK_AUTH=true)", "warning");
          return true;
        }
      }

      notify("Authentication service unavailable. Please check your network connection.", "error");
      return false;
    }
  }, [notify, logoutAdmin]);

  // Server-side session verification on app mount
  useEffect(() => {
    const token = sessionStorage.getItem("dineeqr_session_token");
    const expiresAt = Number(sessionStorage.getItem("dineeqr_session_expires") || 0);

    if (token && expiresAt > Date.now()) {
      // Verify token authenticity with Netlify serverless function
      fetch("/api/auth-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ token })
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.valid) {
            setIsAdminAuthenticated(true);
            setAdminSession({ token, expiresAt: data.expiresAt || expiresAt, user: data.user });

            // Set auto-logout timer
            const remainingMs = Math.max(0, (data.expiresAt || expiresAt) - Date.now());
            if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
            sessionTimerRef.current = setTimeout(() => {
              logoutAdmin(false);
              notify("Your administrator session has expired. Please log in again.", "warning");
            }, remainingMs);
          } else {
            // Token rejected by server
            logoutAdmin(false);
          }
        })
        .catch(() => {
          // If offline/preview and token unexpired, retain local session
          if (expiresAt > Date.now()) {
            setIsAdminAuthenticated(true);
          } else {
            logoutAdmin(false);
          }
        });
    } else if (token && expiresAt <= Date.now()) {
      logoutAdmin(false);
    }

    return () => {
      if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
    };
  }, [logoutAdmin, notify]);

  // Save to storage on state change
  useEffect(() => {
    storage.saveRestaurants(restaurants);
  }, [restaurants]);

  useEffect(() => {
    storage.saveEnquiries(enquiries);
  }, [enquiries]);

  // Derived metrics for admin dashboard
  const stats = useMemo(() => {
    const totalRestaurants = restaurants.length;
    const activeRestaurants = restaurants.filter(r => r.status === "active").length;
    let totalItems = 0;
    let totalViews = 0;
    let activeSubscriptions = 0;

    restaurants.forEach(r => {
      totalItems += (r.items || []).length;
      totalViews += (r.viewsCount || 0);
      if (r.subscription && (r.subscription.status === "active" || r.subscription.status === "trial")) {
        activeSubscriptions++;
      }
    });

    const totalEnquiries = enquiries.length;
    const newEnquiries = enquiries.filter(e => e.status === "New").length;

    return {
      totalRestaurants,
      activeRestaurants,
      totalItems,
      totalViews,
      activeSubscriptions,
      totalEnquiries,
      newEnquiries
    };
  }, [restaurants, enquiries]);

  // Restaurant Actions
  const addRestaurant = useCallback((data) => {
    let slug = slugify(data.name || "restaurant");
    if (restaurants.some(r => r.slug === slug)) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newRestaurant = {
      id: `rest-${Date.now()}`,
      slug,
      name: data.name,
      ownerName: data.ownerName || "Restaurant Owner",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      city: data.city || "",
      description: data.description || "Fresh food prepared daily with signature recipes.",
      tagline: data.tagline || "Taste the difference.",
      logo: data.logo || "🍽️",
      logoImage: data.logoImage || "",
      coverImage: data.coverImage || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
      openingHours: data.openingHours || "11:00 AM – 11:00 PM",
      category: data.category || "Dining & Drinks",
      templateId: data.templateId || "premium-restaurant",
      status: "active",
      subscription: {
        planId: data.planId || "free-trial",
        planName: data.planId === "monthly-plan" ? "Monthly Pro" : "Free Trial (8 Days)",
        status: "trial",
        startDate: new Date().toISOString().split("T")[0],
        expiryDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        paymentStatus: "Trial Active"
      },
      viewsCount: 0,
      categories: ["Starters", "Main Course", "Beverages", "Desserts"],
      items: [
        {
          id: `item-${Date.now()}-1`,
          name: "Chef's Signature Dish",
          category: "Main Course",
          price: 250,
          dietary: "veg",
          description: "Freshly prepared with house spice blend and seasonal ingredients.",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
          available: true,
          featured: true
        }
      ],
      createdAt: new Date().toISOString()
    };

    setRestaurants(prev => [newRestaurant, ...prev]);
    notify(`"${newRestaurant.name}" created successfully. QR code ready!`);
    return newRestaurant;
  }, [restaurants, notify]);

  const updateRestaurant = useCallback((id, updates) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, ...updates, updatedAt: new Date().toISOString() };
      }
      return r;
    }));
    notify("Restaurant details updated.");
  }, [notify]);

  const deleteRestaurant = useCallback((id) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
    notify("Restaurant profile deleted.", "info");
  }, [notify]);

  const toggleRestaurantStatus = useCallback((id) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === "active" ? "inactive" : "active";
        return { ...r, status: nextStatus };
      }
      return r;
    }));
    notify("Restaurant status updated.");
  }, [notify]);

  // Menu Items Actions
  const addMenuItem = useCallback((restaurantId, itemData) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        const newItem = {
          id: `item-${Date.now()}`,
          name: itemData.name,
          category: itemData.category || (r.categories[0] || "General"),
          price: Number(itemData.price) || 0,
          dietary: itemData.dietary || "veg",
          description: itemData.description || "",
          image: itemData.image || "",
          available: itemData.available !== undefined ? itemData.available : true,
          featured: Boolean(itemData.featured)
        };
        return {
          ...r,
          items: [...(r.items || []), newItem]
        };
      }
      return r;
    }));
    notify("New menu item added.");
  }, [notify]);

  const updateMenuItem = useCallback((restaurantId, itemId, updates) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        return {
          ...r,
          items: (r.items || []).map(item => item.id === itemId ? { ...item, ...updates } : item)
        };
      }
      return r;
    }));
    notify("Menu item saved.");
  }, [notify]);

  const deleteMenuItem = useCallback((restaurantId, itemId) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        return {
          ...r,
          items: (r.items || []).filter(item => item.id !== itemId)
        };
      }
      return r;
    }));
    notify("Menu item removed.", "info");
  }, [notify]);

  const toggleItemAvailability = useCallback((restaurantId, itemId) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        return {
          ...r,
          items: (r.items || []).map(item => item.id === itemId ? { ...item, available: !item.available } : item)
        };
      }
      return r;
    }));
  }, []);

  const toggleItemFeatured = useCallback((restaurantId, itemId) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        return {
          ...r,
          items: (r.items || []).map(item => item.id === itemId ? { ...item, featured: !item.featured } : item)
        };
      }
      return r;
    }));
  }, []);

  // Category Actions
  const addCategory = useCallback((restaurantId, categoryName) => {
    if (!categoryName.trim()) return;
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        const cats = r.categories || [];
        if (cats.includes(categoryName.trim())) return r;
        return {
          ...r,
          categories: [...cats, categoryName.trim()]
        };
      }
      return r;
    }));
    notify(`Category "${categoryName}" added.`);
  }, [notify]);

  const updateCategory = useCallback((restaurantId, oldName, newName) => {
    if (!newName.trim() || oldName === newName) return;
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        const cats = (r.categories || []).map(c => c === oldName ? newName.trim() : c);
        const updatedItems = (r.items || []).map(i => i.category === oldName ? { ...i, category: newName.trim() } : i);
        return {
          ...r,
          categories: cats,
          items: updatedItems
        };
      }
      return r;
    }));
    notify("Category updated.");
  }, [notify]);

  const deleteCategory = useCallback((restaurantId, categoryName) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        return {
          ...r,
          categories: (r.categories || []).filter(c => c !== categoryName)
        };
      }
      return r;
    }));
    notify(`Category "${categoryName}" deleted.`, "info");
  }, [notify]);

  const reorderCategories = useCallback((restaurantId, newOrder) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        return { ...r, categories: newOrder };
      }
      return r;
    }));
  }, []);

  // Template Assignment
  const assignTemplate = useCallback((restaurantId, templateId) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        return { ...r, templateId };
      }
      return r;
    }));
    notify("Template design applied to restaurant!");
  }, [notify]);

  // Subscription Actions
  const updateSubscription = useCallback((restaurantId, subData) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        return {
          ...r,
          subscription: {
            ...(r.subscription || {}),
            ...subData
          }
        };
      }
      return r;
    }));
    notify("Subscription updated.");
  }, [notify]);

  const extendSubscription = useCallback((restaurantId, daysToAdd = 15) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restaurantId) {
        const currentExp = r.subscription?.expiryDate ? new Date(r.subscription.expiryDate) : new Date();
        const base = currentExp > new Date() ? currentExp : new Date();
        const newExpiry = new Date(base.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

        return {
          ...r,
          subscription: {
            ...(r.subscription || {}),
            status: "active",
            expiryDate: newExpiry.toISOString().split("T")[0],
            paymentStatus: "Manually Extended"
          }
        };
      }
      return r;
    }));
    notify(`Trial / subscription extended by ${daysToAdd} days.`);
  }, [notify]);

  // Enquiry Actions
  const addEnquiry = useCallback((enquiryData) => {
    const item = storage.addEnquiry(enquiryData);
    setEnquiries(prev => [item, ...prev]);
    notify("Thank you! Your enquiry has been received. Black Cardinal will contact you soon.");
    return item;
  }, [notify]);

  const updateEnquiryStatus = useCallback((id, status) => {
    const updated = storage.updateEnquiryStatus(id, status);
    setEnquiries(updated);
    notify(`Enquiry marked as "${status}".`);
  }, [notify]);

  const deleteEnquiry = useCallback((id) => {
    const updated = storage.deleteEnquiry(id);
    setEnquiries(updated);
    notify("Enquiry deleted.", "info");
  }, [notify]);

  // Analytics View Counter
  const incrementViews = useCallback((slug) => {
    const res = storage.incrementRestaurantViews(slug);
    if (res) {
      setRestaurants(prev => prev.map(r => (r.slug === slug || r.id === slug) ? { ...r, viewsCount: res.viewsCount } : r));
    }
  }, []);

  // Reset / Backup
  const resetAllData = useCallback(() => {
    const res = storage.resetAllData();
    setRestaurants(res.restaurants);
    setEnquiries(res.enquiries);
    notify("Demo data reset to default seed.", "info");
  }, [notify]);

  const value = {
    restaurants,
    enquiries,
    settings,
    setSettings,
    stats,
    templates: TEMPLATES,
    subscriptionPlans: SUBSCRIPTION_PLANS,
    toasts,
    notify,
    removeToast,
    // Restaurant methods
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    toggleRestaurantStatus,
    // Menu items methods
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    toggleItemFeatured,
    // Category methods
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
    // Template
    assignTemplate,
    // Subscription
    updateSubscription,
    extendSubscription,
    // Enquiry
    addEnquiry,
    updateEnquiryStatus,
    deleteEnquiry,
    // Views
    incrementViews,
    resetAllData,
    // Admin Auth
    isAdminAuthenticated,
    adminSession,
    loginAdmin,
    logoutAdmin
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
