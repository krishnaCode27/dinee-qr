import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { QRCodeSVG } from "qrcode.react";
import PrintQRModal from "../modals/PrintQRModal";
import {
  QrCode,
  Download,
  Printer,
  Copy,
  ExternalLink,
  Check,
  Search,
  Sparkles,
  Store,
  RefreshCw,
  Palette
} from "lucide-react";

export default function QRCodesView({ onSelectQR }) {
  const { restaurants, notify } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestForModal, setSelectedRestForModal] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const origin = typeof window !== "undefined" ? window.location.origin : "https://dineeqr.blackcardinal.in";

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (r) => {
    const url = `${origin}/menu/${r.slug}`;
    navigator.clipboard?.writeText(url);
    setCopiedId(r.id);
    notify(`Copied QR menu link for ${r.name}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleQuickDownloadSVG = (r) => {
    const svgElem = document.getElementById(`qr-code-${r.id}`);
    if (!svgElem) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElem);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${r.slug}-qr.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify(`Downloaded vector SVG for ${r.name}`);
  };

  const handleQuickDownloadPNG = (r) => {
    const svgElem = document.getElementById(`qr-code-${r.id}`);
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
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 50, 50, 500, 500);

      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `${r.slug}-qr.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URLObject.revokeObjectURL(blobURL);
      notify(`Downloaded HD PNG for ${r.name}`);
    };
    image.src = blobURL;
  };

  return (
    <div className="admin-view-content qrcodes-view">
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">QR Code Management</h2>
          <p className="view-subtitle">
            Dynamic QR codes generated automatically for each restaurant profile. Ready for download, table tents, and print stands.
          </p>
        </div>

        <div className="search-input-box max-w-xs">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="qr-cards-grid">
        {filtered.map((r) => {
          const menuUrl = `${origin}/menu/${r.slug}`;

          return (
            <div key={r.id} className="qr-admin-card">
              <div className="qr-card-top-header">
                <div className="qr-rest-title-row">
                  <span className="qr-rest-logo">{r.logo || "🍽️"}</span>
                  <div>
                    <h3 className="qr-rest-name">{r.name}</h3>
                    <span className="qr-slug-tag">/menu/{r.slug}</span>
                  </div>
                </div>
                <span className="qr-scan-ready-pill">Ready to Print</span>
              </div>

              {/* QR Preview Graphic */}
              <div className="qr-card-preview-area">
                <div className="qr-code-frame">
                  <QRCodeSVG
                    id={`qr-code-${r.id}`}
                    value={menuUrl}
                    size={160}
                    level="H"
                    includeMargin
                    bgColor="#FFFFFF"
                    fgColor="#111317"
                  />
                </div>
                <p className="qr-hint-text">
                  Points directly to: <span className="text-truncate">{menuUrl}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="qr-card-buttons-stack">
                <button
                  className="btn btn-primary btn-sm btn-block"
                  onClick={() => setSelectedRestForModal(r)}
                >
                  <Printer size={15} /> Table Stand & Print View
                </button>

                <div className="qr-quick-download-row">
                  <button
                    className="btn btn-outline btn-sm flex-1"
                    onClick={() => handleQuickDownloadPNG(r)}
                    title="Download high-resolution PNG image"
                  >
                    <Download size={14} /> PNG
                  </button>
                  <button
                    className="btn btn-outline btn-sm flex-1"
                    onClick={() => handleQuickDownloadSVG(r)}
                    title="Download scalable vector SVG for print shops"
                  >
                    <Download size={14} /> SVG
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleCopy(r)}
                    title="Copy direct menu link"
                  >
                    {copiedId === r.id ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                  </button>
                  <a
                    href={menuUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                    title="Open live menu"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Print & Full Layout Modal */}
      <PrintQRModal
        isOpen={Boolean(selectedRestForModal)}
        onClose={() => setSelectedRestForModal(null)}
        restaurant={selectedRestForModal}
      />
    </div>
  );
}
