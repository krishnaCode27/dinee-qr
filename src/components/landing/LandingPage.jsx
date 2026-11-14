import React, { useState } from "react";
import LandingNav from "./LandingNav";
import HeroSection from "./HeroSection";
import WhyChooseSection from "./WhyChooseSection";
import HowItWorks from "./HowItWorks";
import TemplateGallery from "./TemplateGallery";
import DemoSection from "./DemoSection";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";
import LandingFooter from "./LandingFooter";
import EnquiryModal from "./EnquiryModal";

export default function LandingPage() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquirySubject, setEnquirySubject] = useState("");

  const handleOpenEnquiry = (subject = "Claim Launch Offer") => {
    setEnquirySubject(subject);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="landing-wrapper">
      <LandingNav />
      <main>
        <HeroSection onOpenEnquiry={() => handleOpenEnquiry("Hero Launch Offer")} />
        <WhyChooseSection />
        <HowItWorks />
        <TemplateGallery onSelectTemplate={() => {}} />
        <DemoSection />
        <PricingSection onOpenEnquiry={handleOpenEnquiry} />
        <FAQSection />
      </main>
      <LandingFooter onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialSubject={enquirySubject}
      />
    </div>
  );
}
