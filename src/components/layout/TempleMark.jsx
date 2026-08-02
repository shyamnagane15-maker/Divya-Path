import React from "react";

export default function TempleMark({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none">
      <path d="M19 3 L26 12 H12 Z" fill="#C9A227" />
      <rect x="13.5" y="12" width="11" height="7" fill="#7A1E2B" />
      <path d="M19 9 L24.5 19 H13.5 Z" fill="#E3C158" />
      <rect x="10" y="19" width="18" height="11" rx="1.5" fill="#2B1D15" stroke="#C9A227" strokeWidth="0.6" />
      <rect x="14.5" y="22.5" width="9" height="7.5" fill="#100b08" />
      <circle cx="19" cy="26" r="1.4" fill="#E3C158" />
    </svg>
  );
}
