import React from "react";
import Skeleton from "../ui/Skeleton";

const COLS = 8;

function cellColor(intensity) {
  // sandstone -> gold -> saffron -> maroon as intensity rises
  if (intensity < 0.35) return "rgba(217,203,180,0.14)";
  if (intensity < 0.6) return "rgba(201,162,39,0.45)";
  if (intensity < 0.8) return "rgba(232,135,30,0.6)";
  return "rgba(122,30,43,0.85)";
}

export default function CrowdHeatmap({ data, loading }) {
  if (loading || !data) return <Skeleton height={180} />;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: 4,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {data.map((intensity, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1.4",
              background: cellColor(intensity),
              borderRadius: 3,
              transition: "background 0.6s ease",
            }}
            title={`Zone ${i + 1}: ${Math.round(intensity * 100)}% density`}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14, fontSize: 11.5 }} className="text-muted">
        <LegendDot color="rgba(217,203,180,0.5)" label="Low" />
        <LegendDot color="rgba(201,162,39,0.8)" label="Medium" />
        <LegendDot color="rgba(232,135,30,0.9)" label="Elevated" />
        <LegendDot color="rgba(122,30,43,1)" label="Critical" />
        <span style={{ marginLeft: "auto" }}>Sensor-grid placeholder — live floor-plan overlay pending camera calibration.</span>
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 9, height: 9, borderRadius: 2, background: color, display: "inline-block" }} />
      {label}
    </span>
  );
}
