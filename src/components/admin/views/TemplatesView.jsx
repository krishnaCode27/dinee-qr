import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { TEMPLATES } from "../../../data/seedData";
import Modal from "../../common/Modal";
import {
  Palette,
  Check,
  Eye,
  Store,
  Sparkles,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";

export default function TemplatesView() {
  const { restaurants, assignTemplate, notify } = useApp();

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [targetRestaurantId, setTargetRestaurantId] = useState(restaurants[0]?.id || "");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const handleOpenAssign = (tpl) => {
    setSelectedTemplate(tpl);
    setAssignModalOpen(true);
  };

  const handleConfirmAssign = (e) => {
    e.preventDefault();
    if (!selectedTemplate || !targetRestaurantId) return;
    assignTemplate(targetRestaurantId, selectedTemplate.id);
    setAssignModalOpen(false);
  };

  return (
    <div className="admin-view-content templates-view">
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Menu Design Templates (8 Styles)</h2>
          <p className="view-subtitle">
            Switch your restaurant's digital visual theme instantly. Each design adjusts typography, colors, badges, and layout aesthetics.
          </p>
        </div>

        <Link to="/menu/the-spice-route" target="_blank" className="btn btn-outline">
          <Eye size={15} /> Live Menu Preview <ExternalLink size={13} />
        </Link>
      </div>

      <div className="templates-admin-grid">
        {TEMPLATES.map((tpl) => {
          // Find which restaurants use this template
          const usingRestaurants = restaurants.filter((r) => r.templateId === tpl.id);

          return (
            <div key={tpl.id} className="template-admin-card">
              {/* Preview Box */}
              <div
                className="tpl-admin-preview-box"
                style={{ background: tpl.previewBg }}
              >
                <div className="tpl-admin-top">
                  <span className="tpl-category-chip">{tpl.category}</span>
                  {tpl.badge && <span className="tpl-badge-chip">{tpl.badge}</span>}
                </div>

                <div className="tpl-admin-center-art">
                  <div className="art-card-sim">
                    <div className="art-line-head" />
                    <div className="art-line-sub" />
                  </div>
                </div>

                <div className="tpl-admin-dot" style={{ backgroundColor: tpl.accentColor }} />
              </div>

              {/* Card Details */}
              <div className="tpl-admin-card-body">
                <div className="tpl-admin-title-row">
                  <h3 className="tpl-title">{tpl.name}</h3>
                  <span className="tpl-tagline">{tpl.tagline}</span>
                </div>

                <p className="tpl-desc">{tpl.description}</p>

                {/* Assigned restaurants list */}
                <div className="tpl-assigned-section">
                  <span className="assigned-label">ASSIGNED RESTAURANTS:</span>
                  {usingRestaurants.length === 0 ? (
                    <span className="no-assigned-text">None assigned yet</span>
                  ) : (
                    <div className="assigned-chips-wrap">
                      {usingRestaurants.map((r) => (
                        <span key={r.id} className="assigned-rest-chip">
                          <Store size={12} /> {r.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action button */}
                <div className="tpl-admin-actions">
                  <button
                    className="btn btn-primary btn-block btn-sm"
                    onClick={() => handleOpenAssign(tpl)}
                  >
                    <Check size={14} /> Assign to Restaurant
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assign Template Modal */}
      <Modal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        title={`Apply "${selectedTemplate?.name}" Template`}
        subtitle="Select which restaurant will use this menu design style"
        maxWidth="480px"
      >
        <form onSubmit={handleConfirmAssign} className="assign-form">
          <label className="form-field-full">
            <span className="field-label">Choose Restaurant *</span>
            <select
              value={targetRestaurantId}
              onChange={(e) => setTargetRestaurantId(e.target.value)}
            >
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} (Current: {r.templateId || "Default"})
                </option>
              ))}
            </select>
          </label>

          <div className="tpl-modal-preview-summary">
            <div
              className="tpl-summary-swatch"
              style={{ background: selectedTemplate?.previewBg }}
            />
            <div>
              <strong>{selectedTemplate?.name}</strong>
              <p>{selectedTemplate?.tagline}</p>
            </div>
          </div>

          <div className="modal-actions-bar">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setAssignModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Apply Design Template
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
