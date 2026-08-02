import React from "react";

export default function Switch({ checked, onChange, disabled }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      aria-pressed={checked}
      style={{
        width: 42,
        height: 24,
        borderRadius: 999,
        border: "1px solid var(--border-medium)",
        background: checked ? "linear-gradient(135deg, var(--gold-bright), var(--gold))" : "var(--bg-surface-raised)",
        position: "relative",
        transition: "background 0.2s ease",
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 20 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: checked ? "#241708" : "var(--text-muted)",
          transition: "left 0.2s ease",
        }}
      />
    </button>
  );
}
