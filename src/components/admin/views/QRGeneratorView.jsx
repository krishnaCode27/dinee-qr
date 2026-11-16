import React, { useState, useRef, useMemo } from "react";
import { useApp } from "../../../context/AppContext";
import { QRCodeSVG } from "qrcode.react";
import { JATT_ROLL_BRAND } from "../../../data/jattRollData";
import {
  QrCode,
  Download,
  Printer,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Eye,
  Sliders,
  Palette,
  Maximize2,
  Image as ImageIcon,
  Share2
} from "lucide-react";

export default function QRGeneratorView() {
  const { restaurants, notify } = useApp();

  // Combine JATT ROLL MENU Demo + existing seeded restaurants
  const allRestaurants = useMemo(() => {
    const list = [
      {
        id: "jatt-roll-demo",
        name: "JATT ROLL MENU (Demo)",
        slug: "jatt-roll-menu",
        tagline: "Bold Flavours. Loaded Rolls. Full Satisfaction.",
        subtitle: "Fresh Food | Bold Flavours",
        logo: "🌯",
        isJatt: true,
        defaultUrl: "https://dineeqr.netlify.app/jatt-roll-menu"
      }
    ];

    restaurants.forEach((r) => {
      if (r.slug !== "jatt-roll-menu") {
        list.push({
          id: r.id,
          name: r.name,
          slug: r.slug,
          tagline: r.tagline || "Scan our contactless digital menu",
          subtitle: "Scan to Explore Our Menu",
          logo: r.logo || "🍽️",
          isJatt: false,
          defaultUrl: `${typeof window !== "undefined" ? window.location.origin : "https://dineeqr.netlify.app"}/menu/${r.slug}`
        });
      }
    });

    // Custom option
    list.push({
      id: "custom",
      name: "+ Custom Restaurant / URL",
      slug: "custom",
      tagline: "Scan to Explore Our Digital Menu",
      subtitle: "Fresh Food | Bold Flavours",
      logo: "🍽️",
      isJatt: false,
      defaultUrl: "https://dineeqr.netlify.app/jatt-roll-menu"
    });

    return list;
  }, [restaurants]);

  // Form state
  const [selectedRestId, setSelectedRestId] = useState("jatt-roll-demo");
  const selectedRest = allRestaurants.find((r) => r.id === selectedRestId) || allRestaurants[0];

  const [restaurantName, setRestaurantName] = useState(selectedRest.name.replace(" (Demo)", ""));
  const [menuUrl, setMenuUrl] = useState(selectedRest.defaultUrl);
  const [tagline, setTagline] = useState(selectedRest.tagline);
  const [footerSubtitle, setFooterSubtitle] = useState("Fresh Food | Bold Flavours");

  // Customization state
  const [fgColor, setFgColor] = useState("#FF6B00"); // Default to Jatt Roll Flame Orange
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrSize, setQrSize] = useState(240);
  const [includeMargin, setIncludeMargin] = useState(true);
  const [includeLogo, setIncludeLogo] = useState(true);
  const [errorCorrection, setErrorCorrection] = useState("H"); // L, M, Q, H

  const [copied, setCopied] = useState(false);
  const printStandRef = useRef(null);

  // When restaurant selection changes
  const handleRestaurantSelect = (id) => {
    setSelectedRestId(id);
    const target = allRestaurants.find((r) => r.id === id);
    if (target) {
      if (target.id === "jatt-roll-demo") {
        setRestaurantName("JATT ROLL MENU");
        setMenuUrl("https://dineeqr.netlify.app/jatt-roll-menu");
        setTagline("Bold Flavours. Loaded Rolls. Full Satisfaction.");
        setFooterSubtitle("Fresh Food | Bold Flavours");
        setFgColor("#FF6B00");
      } else if (target.id === "custom") {
        setRestaurantName("My Restaurant");
        setMenuUrl("https://dineeqr.netlify.app/jatt-roll-menu");
        setTagline("Scan to Explore Our Digital Menu");
        setFooterSubtitle("Fresh Food | Bold Flavours");
        setFgColor("#111317");
      } else {
        setRestaurantName(target.name);
        setMenuUrl(target.defaultUrl);
        setTagline(target.tagline);
        setFooterSubtitle("Scan to Explore Our Menu");
        setFgColor("#111317");
      }
    }
  };

  // Reset customization
  const handleReset = () => {
    if (selectedRest.isJatt) {
      setFgColor("#FF6B00");
      setBgColor("#FFFFFF");
      setQrSize(240);
      setIncludeMargin(true);
      setIncludeLogo(true);
      setErrorCorrection("H");
      setMenuUrl("https://dineeqr.netlify.app/jatt-roll-menu");
      setRestaurantName("JATT ROLL MENU");
      setTagline("Bold Flavours. Loaded Rolls. Full Satisfaction.");
      setFooterSubtitle("Fresh Food | Bold Flavours");
    } else {
      setFgColor("#111317");
      setBgColor("#FFFFFF");
      setQrSize(240);
      setIncludeMargin(true);
      setIncludeLogo(true);
      setErrorCorrection("H");
      setMenuUrl(selectedRest.defaultUrl);
      setRestaurantName(selectedRest.name);
      setTagline(selectedRest.tagline);
      setFooterSubtitle("Fresh Food | Bold Flavours");
    }
    notify("Customization reset to default.");
  };

  // Copy Menu URL
  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(menuUrl);
    setCopied(true);
    notify("Menu URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2200);
  };

  // Download SVG
  const handleDownloadSVG = () => {
    const svgElem = document.getElementById("admin-live-qr-svg");
    if (!svgElem) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElem);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${restaurantName.toLowerCase().replace(/\s+/g, "-")}-qr.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    notify("Vector SVG downloaded!");
  };

  // Download HD PNG
  const handleDownloadPNG = () => {
    const svgElem = document.getElementById("admin-live-qr-svg");
    if (!svgElem) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElem);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const URLObject = window.URL || window.webkitURL || window;
    const blobURL = URLObject.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1000;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");

      // Draw background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw QR image centered
      const pad = 100;
      ctx.drawImage(image, pad, pad, canvas.width - pad * 2, canvas.height - pad * 2);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${restaurantName.toLowerCase().replace(/\s+/g, "-")}-qr-hd.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URLObject.revokeObjectURL(blobURL);
      notify("HD PNG (1000x1000px) downloaded!");
    };
    image.src = blobURL;
  };

  // Print Table Stand
  const handlePrint = () => {
    window.print();
  };

  // Pre-defined color palette presets
  const colorPresets = [
    { label: "Jatt Flame Orange", value: "#FF6B00" },
    { label: "Deep Black", value: "#111317" },
    { label: "Cardinal Red", value: "#E31B23" },
    { label: "Royal Gold", value: "#D9A441" },
    { label: "Emerald Green", value: "#10B981" },
    { label: "Ocean Blue", value: "#2563EB" },
    { label: "Dark Purple", value: "#7C3AED" }
  ];

  const bgPresets = [
    { label: "Pure White", value: "#FFFFFF" },
    { label: "Warm Cream", value: "#FFF7EB" },
    { label: "Dark Charcoal", value: "#14161F" }
  ];

  return (
    <div className="admin-view-content qr-generator-view">
      {/* Top Header */}
      <div className="view-header-bar">
        <div>
          <div className="view-badge-eyebrow">
            <QrCode size={14} className="text-coral" />
            <span>TABLE STAND & MARKETING STUDIO</span>
          </div>
          <h2 className="view-title">QR Code Generator</h2>
          <p className="view-subtitle">
            Generate custom, scannable QR codes for restaurant dining tables, tent stands, and storefronts. Live preview with instant SVG & PNG downloads.
          </p>
        </div>

        <div className="header-actions-group">
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleReset}
            title="Reset to defaults"
          >
            <RotateCcw size={15} /> Reset
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleDownloadPNG}
          >
            <Download size={15} /> Download PNG
          </button>
        </div>
      </div>

      {/* Main Grid: Left Controls + Right Live Table Stand Preview */}
      <div className="qr-gen-layout-grid">
        {/* Left Column: Customization Controls */}
        <div className="qr-gen-controls-card">
          <div className="card-section-head">
            <Sliders size={18} className="text-coral" />
            <h3>Configuration & Branding</h3>
          </div>

          <div className="qr-controls-form">
            {/* Restaurant Selector */}
            <div className="form-group">
              <label className="field-label" htmlFor="qr-restaurant-select">
                Select Restaurant
              </label>
              <select
                id="qr-restaurant-select"
                value={selectedRestId}
                onChange={(e) => handleRestaurantSelect(e.target.value)}
                className="form-select-control"
              >
                {allRestaurants.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Restaurant Display Name */}
            <div className="form-group">
              <label className="field-label" htmlFor="qr-name-input">
                Restaurant Heading
              </label>
              <input
                id="qr-name-input"
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="e.g. JATT ROLL MENU"
                className="form-input-control"
              />
            </div>

            {/* Menu URL */}
            <div className="form-group">
              <label className="field-label" htmlFor="qr-url-input">
                Menu Target URL (Real Scannable Link)
              </label>
              <div className="input-with-button-row">
                <input
                  id="qr-url-input"
                  type="url"
                  value={menuUrl}
                  onChange={(e) => setMenuUrl(e.target.value)}
                  placeholder="https://dineeqr.netlify.app/jatt-roll-menu"
                  className="form-input-control"
                />
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handleCopyUrl}
                  title="Copy menu URL"
                >
                  {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
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
              <small className="field-hint">
                * Scanned smartphones navigate directly to this live digital menu.
              </small>
            </div>

            {/* Subtitle / Tagline */}
            <div className="form-group">
              <label className="field-label" htmlFor="qr-tagline-input">
                Header Subtitle / Tagline
              </label>
              <input
                id="qr-tagline-input"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Bold Flavours. Loaded Rolls. Full Satisfaction."
                className="form-input-control"
              />
            </div>

            {/* Stand Footer Subtitle */}
            <div className="form-group">
              <label className="field-label" htmlFor="qr-footer-subtitle">
                Stand Footer Subtitle
              </label>
              <input
                id="qr-footer-subtitle"
                type="text"
                value={footerSubtitle}
                onChange={(e) => setFooterSubtitle(e.target.value)}
                placeholder="Fresh Food | Bold Flavours"
                className="form-input-control"
              />
            </div>

            <div className="form-divider" />

            {/* QR Appearance */}
            <div className="form-group">
              <label className="field-label">
                QR Code Color (Foreground)
              </label>
              <div className="color-palette-preset-row">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`color-preset-circle ${fgColor === preset.value ? "is-active" : ""}`}
                    style={{ backgroundColor: preset.value }}
                    onClick={() => setFgColor(preset.value)}
                    title={preset.label}
                  />
                ))}
                <div className="custom-color-picker-wrap" title="Pick custom color">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="custom-color-input"
                  />
                </div>
              </div>
            </div>

            {/* Background Color */}
            <div className="form-group">
              <label className="field-label">
                Background Canvas Color
              </label>
              <div className="color-palette-preset-row">
                {bgPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`color-preset-circle ${bgColor === preset.value ? "is-active" : ""}`}
                    style={{ backgroundColor: preset.value, border: "1px solid #ccc" }}
                    onClick={() => setBgColor(preset.value)}
                    title={preset.label}
                  />
                ))}
              </div>
            </div>

            {/* QR Size and Options */}
            <div className="form-row-2col">
              <div className="form-group">
                <label className="field-label">QR Size ({qrSize}px)</label>
                <select
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="form-select-control"
                >
                  <option value={180}>Small (180px)</option>
                  <option value={220}>Medium (220px)</option>
                  <option value={260}>Standard (260px)</option>
                  <option value={320}>Large (320px)</option>
                  <option value={400}>Extra Large (400px)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="field-label">Error Correction</label>
                <select
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value)}
                  className="form-select-control"
                >
                  <option value="L">Level L (Low ~7%)</option>
                  <option value="M">Level M (Medium ~15%)</option>
                  <option value="Q">Level Q (Quarter ~25%)</option>
                  <option value="H">Level H (High ~30% - Best for Print)</option>
                </select>
              </div>
            </div>

            {/* Toggles */}
            <div className="toggles-row">
              <label className="toggle-checkbox-label">
                <input
                  type="checkbox"
                  checked={includeMargin}
                  onChange={(e) => setIncludeMargin(e.target.checked)}
                />
                <span>Include Quiet Zone Margin</span>
              </label>

              <label className="toggle-checkbox-label">
                <input
                  type="checkbox"
                  checked={includeLogo}
                  onChange={(e) => setIncludeLogo(e.target.checked)}
                />
                <span>Center Logo Indicator</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Table Stand Stand Preview */}
        <div className="qr-gen-preview-card">
          <div className="card-section-head flex-between">
            <div className="flex-center-gap">
              <Eye size={18} className="text-coral" />
              <h3>Table Stand Live Print Preview</h3>
            </div>
            <span className="live-preview-pill">Live Synced</span>
          </div>

          <div className="preview-container-area">
            {/* The Print Layout: Clean, Centered Table Stand */}
            <div
              className="table-stand-printable-box"
              ref={printStandRef}
              id="printable-jatt-table-stand"
              style={{ backgroundColor: bgColor }}
            >
              {/* Stand Header */}
              <div className="stand-brand-header">
                <div className="stand-logo-badge">
                  {selectedRest.logo || "🌯"}
                </div>
                <h1 className="stand-restaurant-heading">
                  {restaurantName}
                </h1>
                <p className="stand-tagline-text">
                  {tagline}
                </p>
              </div>

              {/* Scan Prompt Instruction */}
              <div className="stand-scan-instruction">
                <span className="stand-scan-chip">
                  SCAN TO EXPLORE OUR MENU
                </span>
              </div>

              {/* Real Scannable QR Code */}
              <div className="stand-qr-code-frame">
                <QRCodeSVG
                  id="admin-live-qr-svg"
                  value={menuUrl}
                  size={qrSize}
                  level={errorCorrection}
                  includeMargin={includeMargin}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  imageSettings={
                    includeLogo
                      ? {
                          src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23FF6B00'/><text x='50' y='65' font-size='45' text-anchor='middle' fill='%23FFFFFF'>🌯</text></svg>",
                          height: Math.floor(qrSize * 0.22),
                          width: Math.floor(qrSize * 0.22),
                          excavate: true
                        }
                      : undefined
                  }
                />
              </div>

              {/* Stand Footer */}
              <div className="stand-footer-block">
                <div className="stand-bold-flavour">
                  {footerSubtitle}
                </div>
                <div className="stand-powered-credit">
                  <span>Powered by <strong>DineEQR</strong> • Black Cardinal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons below preview */}
          <div className="preview-action-buttons-row">
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
              <Printer size={15} /> Print Stand Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
