import React from "react";
import Modal from "./Modal";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  confirmVariant = "danger"
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="420px">
      <div className="confirm-dialog-content">
        <div className={`confirm-icon ${confirmVariant === "danger" ? "confirm-icon-danger" : ""}`}>
          <AlertTriangle size={24} />
        </div>
        <h4 className="confirm-title">{title}</h4>
        <p className="confirm-desc">{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-outline" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className={`btn ${confirmVariant === "danger" ? "btn-danger" : "btn-primary"}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
