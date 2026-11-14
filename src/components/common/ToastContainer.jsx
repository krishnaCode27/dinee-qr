// Toast notification stack
import React from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => {
        const isError = toast.type === "error";
        const isInfo = toast.type === "info";

        return (
          <div key={toast.id} className={`toast-item toast-${toast.type || "success"}`}>
            <span className="toast-icon">
              {isError ? (
                <AlertCircle size={17} />
              ) : isInfo ? (
                <Info size={17} />
              ) : (
                <CheckCircle2 size={17} />
              )}
            </span>
            <span className="toast-msg">{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
