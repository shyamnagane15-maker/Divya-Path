import React from "react";

const VARIANTS = {
  success: "badge-success",
  warning: "badge-warning",
  danger: "badge-danger",
  info: "badge-info",
  neutral: "badge-neutral",
};

// Maps common status/severity strings to a visual variant automatically.
const AUTO_MAP = {
  online: "success", open: "success", verified: "success", resolved: "success",
  checked_in: "success", "checked in": "success", confirmed: "success", low: "success", healthy: "success",
  medium: "warning", pending: "warning", warning: "warning", flagged: "warning",
  high: "danger", critical: "danger", closed: "danger", offline: "danger", danger: "danger",
  info: "info", acknowledged: "info",
};

export default function Badge({ children, variant, icon: Icon }) {
  const key = (variant || String(children).toLowerCase()).toLowerCase();
  const resolved = VARIANTS[variant] || VARIANTS[AUTO_MAP[key]] || VARIANTS.neutral;
  return (
    <span className={`badge ${resolved}`}>
      {Icon && <Icon size={11} />}
      {children}
    </span>
  );
}
