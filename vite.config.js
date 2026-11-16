import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// DineEQR Production Build Configuration with Security Hardening
export default defineConfig({
  plugins: [react()],
  build: {
    // Prevent source code leakage in production bundles
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          animations: ["framer-motion"],
          icons: ["lucide-react", "qrcode.react"]
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: false
  }
});
