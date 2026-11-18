import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuroraShopLogo from "./AuroraShopLogo";
import { AURORA_BRAND } from "../../data/auroraData";

export default function AuroraLoader({ onLoaded }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant entrance delay for splash animation
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoaded) onLoaded();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="aurora-loader-screen"
          onClick={() => {
            setIsVisible(false);
            if (onLoaded) onLoaded();
          }}
        >
          {/* Ambient background glow */}
          <div className="loader-ambient-glow" />

          <div className="loader-content-wrap">
            {/* Animated Logo Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="loader-logo-ring-wrap"
            >
              <div className="loader-pulse-ring" />
              <div className="loader-pulse-ring delay" />
              <AuroraShopLogo size={100} />
            </motion.div>

            {/* Brand Title Reveal */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="loader-brand-title"
            >
              <span className="loader-text-white">Arora</span>{" "}
              <span className="loader-text-gold">Exclusive</span>
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="loader-brand-subtitle"
            >
              Fashion for the Whole Family
            </motion.p>

            {/* Elegant Loading Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "120px", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
              className="loader-progress-bar"
            >
              <div className="loader-progress-inner" />
            </motion.div>

            <span className="loader-location-hint">Ganiyari</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
