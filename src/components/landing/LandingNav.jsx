import React, { useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../common/BrandLogo";
import { getWhatsAppUrl } from "../common/FloatingWhatsAppButton";
import { Menu, X, ArrowUpRight, LogIn } from "lucide-react";

export default function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="landing-header">
      <div className="landing-container header-inner">
        <BrandLogo size="md" withTagline={false} />

        <nav className={`landing-nav-links ${mobileMenuOpen ? "is-open" : ""}`}>
          <a href="#benefits" onClick={() => setMobileMenuOpen(false)}>Benefits</a>
          <a href="#templates" onClick={() => setMobileMenuOpen(false)}>Templates</a>
          <a href="#demo" onClick={() => setMobileMenuOpen(false)}>Demo</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <div className="mobile-only-actions">
            <Link to="/admin" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>
              <LogIn size={15} /> Login
            </Link>
            <a
              href={getWhatsAppUrl("Hello DineEQR Team! I want to get started with a digital QR menu for my restaurant.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started <ArrowUpRight size={15} />
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <Link to="/admin" className="header-login-btn">
            <LogIn size={15} /> Login
          </Link>
          <a
            href={getWhatsAppUrl("Hello DineEQR Team! I want to get started with a digital QR menu for my restaurant.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp header-cta-btn"
          >
            Get Started <ArrowUpRight size={15} />
          </a>
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
