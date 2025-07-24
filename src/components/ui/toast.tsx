import * as React from "react";
import { useToast } from "../../hooks/use-toast";

export interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  action?: React.ReactNode;
  variant?: "info" | "success" | "error";
}

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        minWidth: 0,
        maxWidth: 360,
        pointerEvents: "none"
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            background: "transparent",
            borderRadius: 0,
            boxShadow: "none",
            padding: 0,
            border: "none",
            color: "#222",
            minWidth: 0,
            maxWidth: 360,
            display: toast.open === false ? "none" : "block",
            pointerEvents: "auto"
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{toast.title}</div>
          {toast.description && (
            <div style={{ fontSize: 14, color: "#555" }}>{toast.description}</div>
          )}
          {toast.action && <div style={{ marginTop: 8 }}>{toast.action}</div>}
          <button
            onClick={() => dismiss(toast.id)}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "none",
              border: "none",
              color: "#888",
              fontSize: 18,
              cursor: "pointer",
              padding: 0,
              margin: 0,
              lineHeight: 1,
              width: 24,
              height: 24
            }}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
} 