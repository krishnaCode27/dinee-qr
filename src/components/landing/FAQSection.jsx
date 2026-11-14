import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Do my restaurant guests need to download any app to view the menu?",
      a: "No! DineEQR menus are 100% web-based. Customers simply point their iPhone or Android camera at your QR code, and your interactive digital menu opens instantly in their native mobile browser."
    },
    {
      q: "How do I download and print QR codes for my tables and counters?",
      a: "From your DineEQR admin dashboard, you can download high-resolution PNG or vector SVG files. We also provide a one-click 'Print Table Stand' view with your restaurant branding and scan instructions sized for standard acrylic holders."
    },
    {
      q: "Can I update dish prices or mark items sold out in real time?",
      a: "Yes, instantly. As soon as you toggle an item as unavailable or change its price in your admin panel, the live menu updates immediately for any guest viewing it."
    },
    {
      q: "What happens after the 8-day free trial?",
      a: "You can continue uninterrupted on our simple Monthly Plan at just ₹100/month, or opt for the 15-day extended trial pass (₹100). No credit card is required to start your 8-day free trial."
    },
    {
      q: "Can I customize the menu design to match my restaurant's theme?",
      a: "Yes! DineEQR includes 8 curated templates designed for different concepts—from luxury fine dining and modern cafes to fast-food shacks and artisan bakeries. You can switch templates anytime in 1 click."
    },
    {
      q: "How does the WhatsApp order enquiry feature work?",
      a: "Customers can add their desired items into an interactive tray and click 'Send Order to WhatsApp'. This formats their selection neatly and opens WhatsApp directly to your restaurant's phone number."
    }
  ];

  return (
    <section className="section-padding landing-section faq-section-wrap" id="faq">
      <div className="landing-container">
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <HelpCircle size={14} className="text-coral" />
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="section-title">
            Frequently Asked Questions
          </h2>
          <p className="section-desc">
            Everything you need to know about setting up and running your digital menu with DineEQR by Black Cardinal.
          </p>
        </div>

        <div className="faq-accordion-box">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`faq-item-row ${isOpen ? "is-expanded" : ""}`}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className={`faq-arrow ${isOpen ? "rotate-180" : ""}`} />
                </div>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
