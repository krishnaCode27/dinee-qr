import React, { useRef, useState } from "react";
import Modal from "../../common/Modal";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer, Copy, Check, ExternalLink, Sparkles, Store } from "lucide-react";
import { CircularBrandLogo } from "../../common/BrandLogo";

export default function PrintQRModal({ isOpen, onClose, restaurant }) {
  const [copied, setCopied] = useState(false);
  const printAreaRef = useRef(null);

  if (!restaurant) return null;

  const origin = typeof window !== "undefined" ? window.location.origin : "https://dineeqr.blackcardinal.in";
  const menuUrl = `${origin}/menu/${restaurant.slug}`;

  // Download SVG
  const handleDownloadSVG = () => {
    const svgElem = document.getElementById(`print-qr-svg-${restaurant.id}`);
    if (!svgElem) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElem);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${restaurant.slug}-dineeqr.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download PNG by drawing SVG onto canvas
  const handleDownloadPNG = () => {
    const svgElem = document.getElementById(`print-qr-svg-${restaurant.id}`);
    if (!svgElem) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElem);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const URLObject = window.URL || window.webkitURL || window;
    const blobURL = URLObject.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 600;
      const context = canvas.getContext("2d");
      // White background
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 50, 50, 500, 500);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${restaurant.slug}-dineeqr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URLObject.revokeObjectURL(blobURL);
    };
    image.src = blobURL;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Print & Download QR Code"
      subtitle={`Display stand for ${restaurant.name}`}
      maxWidth="680px"
    >
      <div className="qr-modal-body">
        {/* Printable Stand Preview */}
        <div className="table-stand-preview" ref={printAreaRef} id="printable-table-stand">
          <div className="stand-header">
            <div className="stand-brand-row">
              <CircularBrandLogo size={28} />
              <div className="stand-brand-text">
                <span className="stand-brand-name">DineEQR</span>
                <span className="stand-brand-by">by Black Cardinal</span>
              </div>
            </div>
            <span className="stand-tagline">Scan. Explore. Order.</span>
          </div>

          <div className="stand-card-content">
            <div className="stand-restaurant-logo">
              {restaurant.logo || "🍽️"}
            </div>
            <h3 className="stand-restaurant-name">{restaurant.name}</h3>
            <p className="stand-tagline-sub">{restaurant.tagline || "Scan our contactless digital menu"}</p>

            <div className="stand-qr-wrapper">
              <QRCodeSVG
                id={`print-qr-svg-${restaurant.id}`}
                value={menuUrl}
                size={200}
                level="H"
                includeMargin
                bgColor="#FFFFFF"
                fgColor="#111317"
              />
            </div>

            <div className="stand-scan-prompt">
              <span className="scan-icon-pill">📱 Open Camera & Point</span>
              <p className="stand-url-display">{menuUrl}</p>
            </div>
          </div>

          <div className="stand-footer">
            <span>Powered by <strong>DineEQR by Black Cardinal</strong></span>
            <small>Fast • Contactless • Always Updated</small>
          </div>
        </div>

        {/* Action Controls */}
        <div className="qr-modal-controls">
          <div className="qr-url-box">
            <label className="field-label">Menu URL</label>
            <div className="qr-url-copy-row">
              <input type="text" readOnly value={menuUrl} />
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleCopyLink}
                title="Copy URL"
              >
                {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
              <a
                href={menuUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
                title="Open live menu"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="qr-buttons-grid">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDownloadPNG}
            >
              <Download size={15} /> Download PNG (HD)
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDownloadSVG}
            >
              <Download size={15} /> Download Vector SVG
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handlePrint}
            >
              <Printer size={15} /> Print Table Stand
            </button>
          </div>

          <p className="qr-download-notice">
            * Generated for direct use on table stands, tent cards, and restaurant storefronts.
          </p>
        </div>
      </div>
    </Modal>
  );
}
