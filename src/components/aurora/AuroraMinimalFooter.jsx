import React, { useState } from "react";
import { Flag, X, Check, AlertCircle } from "lucide-react";

export default function AuroraMinimalFooter() {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setReason("");
    }, 2000);
  };

  return (
    <footer className="aurora-minimal-footer">
      <button
        type="button"
        className="aurora-report-link"
        onClick={() => setShowModal(true)}
      >
        <Flag size={13} />
        <span>Report this page</span>
      </button>

      {/* Report Modal */}
      {showModal && (
        <div
          className="aurora-modal-overlay"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="aurora-report-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="report-modal-header">
              <div className="report-title-wrap">
                <AlertCircle size={18} className="text-gold" />
                <h3>Report this page</h3>
              </div>
              <button
                type="button"
                className="report-close-btn"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {submitted ? (
              <div className="report-success-state">
                <Check size={28} className="text-gold" />
                <p>Thank you. Your feedback has been received.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="report-form">
                <p className="report-help-text">
                  Please let us know if there is an issue with this page.
                </p>

                <select
                  required
                  className="report-select"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="" disabled>Select a reason...</option>
                  <option value="broken-link">Broken or inactive link</option>
                  <option value="inaccurate-info">Inaccurate store information</option>
                  <option value="impersonation">Impersonation or copyright concern</option>
                  <option value="other">Other issue</option>
                </select>

                <div className="report-actions">
                  <button
                    type="button"
                    className="report-cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="report-submit-btn">
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
