import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, X, Copy, Check, Share2, Smartphone } from "lucide-react";

export default function AuroraCornerQR() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://dineeqr.netlify.app/";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="aurora-corner-qr-wrapper" aria-label="QR Code to this page">
      {/* Floating QR Trigger Pill / Mini Card */}
      <div
        className="aurora-corner-qr-pill"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-label="Scan QR Code"
        title="Scan QR Code"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="corner-qr-mini-code">
          <QRCodeSVG
            value={currentUrl}
            size={36}
            bgColor="#0D0D0E"
            fgColor="#E5C365"
            level="M"
          />
        </div>
        <div className="corner-qr-text">
          <span className="qr-badge-title">Scan QR</span>
          <span className="qr-badge-sub">Visit on Phone</span>
        </div>
      </div>

      {/* Expanded QR Modal Card */}
      {isOpen && (
        <div className="aurora-corner-qr-modal" role="dialog" aria-modal="true">
          <div className="corner-qr-modal-header">
            <div className="header-meta">
              <QrCode size={16} className="text-gold" />
              <span className="modal-title">Scan on Mobile</span>
            </div>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close QR Modal"
            >
              <X size={15} />
            </button>
          </div>

          <div className="corner-qr-code-frame">
            <QRCodeSVG
              value={currentUrl}
              size={168}
              bgColor="#FFFFFF"
              fgColor="#0E0E10"
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="corner-qr-modal-body">
            <p className="qr-guide-text">
              <Smartphone size={14} className="text-gold" />
              <span>Point your smartphone camera to open Arora Exclusive instantly</span>
            </p>

            <button
              type="button"
              className="qr-copy-link-btn"
              onClick={handleCopy}
            >
              {copied ? <Check size={14} className="text-gold" /> : <Copy size={14} />}
              <span>{copied ? "Link Copied!" : "Copy Page Link"}</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
