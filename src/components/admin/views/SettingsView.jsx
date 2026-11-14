import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { storage } from "../../../data/storage";
import { validateUploadFile } from "../../../utils/security";
import ConfirmDialog from "../../common/ConfirmDialog";
import {
  Settings,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  Save,
  CheckCircle2,
  Database,
  Lock,
  Server
} from "lucide-react";

export default function SettingsView() {
  const { settings, setSettings, resetAllData, notify } = useApp();

  const [formData, setFormData] = useState({
    currency: settings.currency || "₹",
    brandName: settings.brandName || "DineEQR",
    parentCompany: settings.parentCompany || "Black Cardinal",
    supportEmail: settings.supportEmail || "blackcardinalbusiness@gmail.com",
    supportPhone: settings.supportPhone || "+91 7067492239",
    location: settings.location || "Morena, MP",
    instagram: settings.instagram || "blackcardinal1",
    baseUrl: settings.baseUrl || (typeof window !== "undefined" ? window.location.origin : "https://dineeqr.blackcardinal.in")
  });

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettings(formData);
    storage.saveSettings(formData);
    notify("Platform settings saved.");
  };

  const handleExportBackup = () => {
    const backupJson = storage.exportBackup();
    const blob = new Blob([backupJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dineeqr-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify("Exported full platform JSON backup.");
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Security validation on upload: file size max 5MB, must be JSON
    const validation = validateUploadFile(file, {
      maxSizeBytes: 5 * 1024 * 1024,
      allowedTypes: ["application/json", "text/json", ""],
      allowedExtensions: [".json"]
    });

    if (!validation.valid) {
      notify(validation.error || "Invalid file format.", "error");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        const success = storage.importBackup(content);
        if (success) {
          notify("Backup restored successfully. Refreshing platform...");
          setTimeout(() => window.location.reload(), 1200);
        } else {
          notify("Failed to restore backup. Invalid JSON file format or corrupted schema.", "error");
        }
      }
    };
    reader.onerror = () => {
      notify("Failed to read file.", "error");
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="admin-view-content settings-view">
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Platform & System Settings</h2>
          <p className="view-subtitle">
            Configure branding parameters, currency rules, local storage backups, and data persistence.
          </p>
        </div>
      </div>

      <div className="admin-grid-2-col">
        {/* Brand & Global Configuration */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">General Brand Configuration</h3>
              <p className="card-sub">Platform identity and contact details</p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} className="settings-form">
            <div className="form-field-row">
              <label>
                <span className="field-label">Platform Brand Name</span>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                />
              </label>

              <label>
                <span className="field-label">Parent Company</span>
                <input
                  type="text"
                  value={formData.parentCompany}
                  onChange={(e) => setFormData({ ...formData, parentCompany: e.target.value })}
                />
              </label>
            </div>

            <div className="form-field-row">
              <label>
                <span className="field-label">Default Currency Symbol</span>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <option value="₹">₹ (Indian Rupee - INR)</option>
                  <option value="$">$ (US Dollar - USD)</option>
                  <option value="€">€ (Euro - EUR)</option>
                  <option value="£">£ (British Pound - GBP)</option>
                  <option value="AED">AED (UAE Dirham)</option>
                </select>
              </label>

              <label>
                <span className="field-label">QR Base URL Origin</span>
                <input
                  type="text"
                  value={formData.baseUrl}
                  onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                />
              </label>
            </div>

            <div className="form-field-row">
              <label>
                <span className="field-label">Support Email</span>
                <input
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                />
              </label>

              <label>
                <span className="field-label">Support Phone / Call Us</span>
                <input
                  type="tel"
                  value={formData.supportPhone}
                  onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                />
              </label>
            </div>

            <div className="form-field-row">
              <label>
                <span className="field-label">Instagram Handle</span>
                <input
                  type="text"
                  placeholder="blackcardinal1"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                />
              </label>

              <label>
                <span className="field-label">HQ Location</span>
                <input
                  type="text"
                  placeholder="Morena, MP"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              <Save size={15} /> Save Platform Settings
            </button>
          </form>
        </div>

        {/* Data Persistence, Backup & Reset */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Data Backup & Migration</h3>
              <p className="card-sub">Export or restore your restaurants, menus, and enquiries</p>
            </div>
            <Database size={18} className="text-coral" />
          </div>

          <div className="backup-controls-box">
            <div className="backup-action-item">
              <div>
                <strong>Export Platform JSON Backup</strong>
                <p>Download all restaurant data, menus, items, and enquiries into a standalone JSON file.</p>
              </div>
              <button className="btn btn-outline btn-sm" onClick={handleExportBackup}>
                <Download size={14} /> Export Backup
              </button>
            </div>

            <div className="backup-action-item">
              <div>
                <strong>Restore from JSON Backup</strong>
                <p>Import and restore a previously exported DineEQR JSON backup file.</p>
              </div>
              <label className="btn btn-outline btn-sm cursor-pointer">
                <Upload size={14} /> Import File
                <input
                  type="file"
                  accept=".json"
                  className="hidden-file-input"
                  onChange={handleImportFile}
                />
              </label>
            </div>

            <div className="backup-action-item border-danger">
              <div>
                <strong className="text-danger">Reset to Default Demo Seed</strong>
                <p>Clears custom changes and restores initial high-quality seed restaurants & menus.</p>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setIsResetConfirmOpen(true)}
              >
                <RotateCcw size={14} /> Reset Data
              </button>
            </div>
          </div>

          {/* Architecture note */}
          <div className="card-hint-box mt-6">
            <div className="hint-header">
              <Server size={16} className="text-coral" />
              <strong>Production Backend Readiness:</strong>
            </div>
            <p>
              This MVP cleanly abstracts all operations through <code>storage.js</code> and <code>AppContext</code>. When deploying to production with a real Node/Supabase/PostgreSQL database and authentication server (Auth0 / Firebase), simply swap the storage layer without altering UI components.
            </p>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetAllData}
        title="Reset All Data to Demo Seed?"
        message="This will replace all restaurants, items, and enquiries with the default Black Cardinal demo dataset. Any newly created restaurants will be removed."
        confirmText="Yes, Reset Everything"
      />
    </div>
  );
}
