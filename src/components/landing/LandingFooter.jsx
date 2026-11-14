import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../common/BrandLogo";
import { Mail, Phone, MapPin, ArrowUpRight, Sparkles, Heart, MessageCircle, Instagram } from "lucide-react";
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from "../common/FloatingWhatsAppButton";

export default function LandingFooter({ onOpenEnquiry }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="landing-container footer-main-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <BrandLogo light size="lg" withTagline={true} />
          <p className="footer-desc">
            DineEQR by Black Cardinal provides next-generation QR-powered digital menus for restaurants, cafes, bakeries, and cloud kitchens worldwide.
          </p>
          <div className="footer-parent-tag">
            <span className="dot-active" />
            <span>A proud product of <strong>Black Cardinal</strong></span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul>
            <li><a href="#benefits">Why Choose DineEQR</a></li>
            <li><a href="#templates">Menu Templates (8)</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#pricing">Plans & Pricing</a></li>
            <li><a href="#faq">Frequently Asked Questions</a></li>
          </ul>
        </div>

        {/* Live Demos & Admin */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Product & Demos</h4>
          <ul>
            <li>
              <Link to="/menu/the-spice-route">
                The Spice Route Demo <ArrowUpRight size={13} />
              </Link>
            </li>
            <li>
              <Link to="/menu/urban-roast">
                Urban Roast Cafe Demo <ArrowUpRight size={13} />
              </Link>
            </li>
            <li>
              <Link to="/menu/street-crave">
                Street Crave Demo <ArrowUpRight size={13} />
              </Link>
            </li>
            <li>
              <Link to="/admin">
                Admin Dashboard Portal <ArrowUpRight size={13} />
              </Link>
            </li>
            <li>
              <button
                className="footer-text-btn"
                onClick={() => onOpenEnquiry("Footer Special Offer")}
              >
                Claim Free QR Offer <Sparkles size={13} className="text-coral" />
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info & WhatsApp CTA */}
        <div className="footer-contact-col">
          <h4 className="footer-col-title">Contact with Us</h4>
          <div className="footer-contact-item">
            <Mail size={16} className="text-coral" />
            <a href="mailto:blackcardinalbusiness@gmail.com">blackcardinalbusiness@gmail.com</a>
          </div>
          <div className="footer-contact-item">
            <Instagram size={16} className="text-coral" />
            <a
              href="https://instagram.com/blackcardinal1"
              target="_blank"
              rel="noopener noreferrer"
            >
              @blackcardinal1
            </a>
          </div>
          <div className="footer-contact-item">
            <Phone size={16} className="text-coral" />
            <a href="tel:+917067492239">+91 7067492239 (Call Us)</a>
          </div>
          <div className="footer-contact-item">
            <MapPin size={16} className="text-coral" />
            <span>Morena, MP</span>
          </div>

          <div style={{ marginTop: "16px" }}>
            <a
              href={getWhatsAppUrl("Hello DineEQR Team! I have questions regarding digital QR menus. Let's chat!")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ width: "100%" }}
            >
              <MessageCircle size={15} /> Have Questions? Chat With Our Team
            </a>
          </div>
        </div>
      </div>

      <div className="landing-container footer-bottom-bar">
        <div className="copyright-text">
          © {new Date().getFullYear()} Black Cardinal. All rights reserved. DineEQR is a trademark of Black Cardinal.
        </div>
        <div className="footer-bottom-links">
          <span>Scan. Explore. Order.</span>
          <span className="divider">•</span>
          <span>Designed with care for restaurateurs</span>
        </div>
      </div>
    </footer>
  );
}
