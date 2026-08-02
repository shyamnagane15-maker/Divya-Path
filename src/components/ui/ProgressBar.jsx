import React from "react";

const LEVEL_COLOR = {
  low: "var(--success)",
  medium: "var(--warning)",
  high: "var(--danger)",
};

export default function ProgressBar({ value, color, level }) {
  const resolvedColor = color || (level ? LEVEL_COLOR[level.toLowerCase()] : undefined) || "var(--gold)";
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: resolvedColor }} />
    </div>
  );
}
