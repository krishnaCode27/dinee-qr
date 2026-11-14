// DineEQR by Black Cardinal — Storage Manager
import { INITIAL_RESTAURANTS, INITIAL_ENQUIRIES, INITIAL_ANALYTICS, TEMPLATES, SUBSCRIPTION_PLANS } from "./seedData";
import { validateBackupSchema } from "../utils/security";

const STORAGE_KEYS = {
  RESTAURANTS: "dineeqr_restaurants_v2",
  ENQUIRIES: "dineeqr_enquiries_v2",
  ANALYTICS: "dineeqr_analytics_v2",
  SETTINGS: "dineeqr_settings_v2"
};

const LEGACY_KEYS = {
  RESTAURANTS: "dineqr_restaurants_v2",
  ENQUIRIES: "dineqr_enquiries_v2",
  ANALYTICS: "dineqr_analytics_v2",
  SETTINGS: "dineqr_settings_v2"
};

export const storage = {
  // Restaurants
  getRestaurants() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESTAURANTS) || localStorage.getItem(LEGACY_KEYS.RESTAURANTS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Error reading restaurants from localStorage", e);
    }
    // Initialize with seed
    localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(INITIAL_RESTAURANTS));
    return INITIAL_RESTAURANTS;
  },

  saveRestaurants(restaurants) {
    try {
      localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(restaurants));
    } catch (e) {
      console.error("Error saving restaurants", e);
    }
  },

  getRestaurantBySlug(slug) {
    const list = this.getRestaurants();
    return list.find(r => r.slug === slug || r.id === slug);
  },

  getRestaurantById(id) {
    const list = this.getRestaurants();
    return list.find(r => r.id === id);
  },

  saveRestaurant(restaurant) {
    const list = this.getRestaurants();
    const existingIndex = list.findIndex(r => r.id === restaurant.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = { ...updated[existingIndex], ...restaurant, updatedAt: new Date().toISOString() };
    } else {
      updated = [restaurant, ...list];
    }
    this.saveRestaurants(updated);
    return updated;
  },

  deleteRestaurant(id) {
    const list = this.getRestaurants();
    const filtered = list.filter(r => r.id !== id);
    this.saveRestaurants(filtered);
    return filtered;
  },

  incrementRestaurantViews(slug) {
    const list = this.getRestaurants();
    const index = list.findIndex(r => r.slug === slug || r.id === slug);
    if (index >= 0) {
      const updated = [...list];
      updated[index] = {
        ...updated[index],
        viewsCount: (updated[index].viewsCount || 0) + 1
      };
      this.saveRestaurants(updated);
      return updated[index];
    }
    return null;
  },

  // Enquiries
  getEnquiries() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || localStorage.getItem(LEGACY_KEYS.ENQUIRIES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Error reading enquiries", e);
    }
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
    return INITIAL_ENQUIRIES;
  },

  saveEnquiries(enquiries) {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.error("Error saving enquiries", e);
    }
  },

  addEnquiry(enquiry) {
    const list = this.getEnquiries();
    const newEnquiry = {
      id: `enq-${Date.now()}`,
      date: new Date().toISOString(),
      status: "New",
      ...enquiry
    };
    const updated = [newEnquiry, ...list];
    this.saveEnquiries(updated);
    return newEnquiry;
  },

  updateEnquiryStatus(id, status) {
    const list = this.getEnquiries();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    this.saveEnquiries(updated);
    return updated;
  },

  deleteEnquiry(id) {
    const list = this.getEnquiries();
    const updated = list.filter(item => item.id !== id);
    this.saveEnquiries(updated);
    return updated;
  },

  // Settings
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS) || localStorage.getItem(LEGACY_KEYS.SETTINGS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn("Error reading settings", e);
    }
    return {
      currency: "₹",
      brandName: "DineEQR",
      parentCompany: "Black Cardinal",
      supportEmail: "blackcardinalbusiness@gmail.com",
      supportPhone: "+91 7067492239",
      whatsappPhone: "+91 8815806560",
      location: "Morena, MP",
      instagram: "blackcardinal1",
      baseUrl: typeof window !== "undefined" ? window.location.origin : "https://dineeqr.blackcardinal.in"
    };
  },

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Reset to seed
  resetAllData() {
    localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(INITIAL_RESTAURANTS));
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      currency: "₹",
      brandName: "DineEQR",
      parentCompany: "Black Cardinal",
      supportEmail: "blackcardinalbusiness@gmail.com",
      supportPhone: "+91 7067492239",
      whatsappPhone: "+91 8815806560",
      location: "Morena, MP",
      instagram: "blackcardinal1"
    }));
    return {
      restaurants: INITIAL_RESTAURANTS,
      enquiries: INITIAL_ENQUIRIES
    };
  },

  // Export JSON backup
  exportBackup() {
    const payload = {
      version: "2.0.0",
      timestamp: new Date().toISOString(),
      restaurants: this.getRestaurants(),
      enquiries: this.getEnquiries(),
      settings: this.getSettings()
    };
    return JSON.stringify(payload, null, 2);
  },

  // Import JSON backup
  importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!validateBackupSchema(data)) {
        console.warn("Rejected JSON backup import: Schema validation failed.");
        return false;
      }
      this.saveRestaurants(data.restaurants);
      if (Array.isArray(data.enquiries)) this.saveEnquiries(data.enquiries);
      if (data.settings && typeof data.settings === "object") this.saveSettings(data.settings);
      return true;
    } catch (e) {
      console.error("Invalid backup file", e);
      return false;
    }
  }
};

export const slugify = (str) => {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
