import React from "react";

export default function TempleIcon({ variant, accent, size = 88 }) {
  return (
    <div className="temple-icon-frame">
      <div className="temple-icon-glow" style={{ background: accent }} />
      <svg width={size} height={size} viewBox="0 0 100 112" fill="none" className="temple-icon-float">
        {variant === "somnath" && <SomnathShape accent={accent} />}
        {variant === "dwarkadhish" && <DwarkaShape accent={accent} />}
        {variant === "ambaji" && <AmbajiShape accent={accent} />}
        {variant === "pavagadh" && <PavagadhShape accent={accent} />}
      </svg>
    </div>
  );
}

/* Curved, tiered shikhara with a trishul finial and a coastal wave base */
function SomnathShape({ accent }) {
  return (
    <>
      <line x1="50" y1="2" x2="50" y2="14" stroke={accent} strokeWidth="1.6" />
      <path d="M46 6 L50 2 L54 6" stroke={accent} strokeWidth="1.4" fill="none" />
      <circle cx="50" cy="16" r="3.5" fill={accent} />
      <path d="M50 19 C40 26, 40 34, 44 40 H56 C60 34, 60 26, 50 19 Z" fill="#7A1E2B" opacity="0.9" />
      <path d="M40 40 H60 V50 H40 Z" fill="#2B1D15" stroke={accent} strokeWidth="0.6" />
      <rect x="30" y="50" width="40" height="34" rx="2" fill="#241708" stroke={accent} strokeWidth="0.6" />
      <rect x="42" y="64" width="16" height="20" fill="#100b08" />
      <path d="M18 96 Q29 90 40 96 T62 96 T84 96" stroke={accent} strokeWidth="1.4" fill="none" opacity="0.6" />
      <path d="M14 102 Q28 95 42 102 T70 102 T88 102" stroke={accent} strokeWidth="1" fill="none" opacity="0.35" />
    </>
  );
}

/* Tall multi-tier stepped shikhara with a flag mast, classic Krishna-temple silhouette */
function DwarkaShape({ accent }) {
  return (
    <>
      <line x1="50" y1="2" x2="50" y2="16" stroke={accent} strokeWidth="1.4" />
      <path d="M50 3 L62 8 L50 11 Z" fill={accent} />
      {[
        { y: 16, w: 10 },
        { y: 24, w: 16 },
        { y: 32, w: 22 },
        { y: 40, w: 28 },
      ].map((tier, i) => (
        <rect
          key={i}
          x={50 - tier.w / 2}
          y={tier.y}
          width={tier.w}
          height="9"
          fill={i % 2 === 0 ? "#7A1E2B" : "#A32C3D"}
          stroke={accent}
          strokeWidth="0.5"
        />
      ))}
      <rect x="28" y="49" width="44" height="35" rx="2" fill="#241708" stroke={accent} strokeWidth="0.6" />
      <rect x="41" y="64" width="18" height="20" fill="#100b08" />
      <rect x="20" y="84" width="60" height="6" fill="#2B1D15" stroke={accent} strokeWidth="0.5" />
    </>
  );
}

/* Single pyramidal shikhara with an etched yantra face — aniconic Shakti Peeth motif */
function AmbajiShape({ accent }) {
  return (
    <>
      <circle cx="50" cy="8" r="2.4" fill={accent} />
      <path d="M50 12 L68 46 H32 Z" fill="#E8871E" opacity="0.85" />
      <path d="M50 22 L59 38 H41 Z" fill="none" stroke={accent} strokeWidth="1.1" />
      <circle cx="50" cy="31" r="1.6" fill={accent} />
      <rect x="26" y="46" width="48" height="38" rx="2" fill="#241708" stroke={accent} strokeWidth="0.6" />
      <rect x="40" y="62" width="20" height="22" fill="#100b08" />
      <rect x="18" y="84" width="64" height="6" fill="#2B1D15" stroke={accent} strokeWidth="0.5" />
    </>
  );
}

/* Small tiered temple perched atop a triangular hill — Pavagadh's defining feature */
function PavagadhShape({ accent }) {
  return (
    <>
      <line x1="50" y1="14" x2="50" y2="24" stroke={accent} strokeWidth="1.3" />
      <circle cx="50" cy="12" r="2.6" fill={accent} />
      <path d="M50 24 C43 29, 43 35, 46 39 H54 C57 35, 57 29, 50 24 Z" fill="#4C8DAF" opacity="0.9" />
      <rect x="41" y="39" width="18" height="10" fill="#2B1D15" stroke={accent} strokeWidth="0.5" />
      <path d="M8 100 L50 46 L92 100 Z" fill="#2B1D15" stroke={accent} strokeWidth="1" opacity="0.9" />
      <path d="M50 46 L38 100 H62 Z" fill="#241708" opacity="0.6" />
      <path d="M20 100 L50 60 L80 100 Z" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.4" />
    </>
  );
}
