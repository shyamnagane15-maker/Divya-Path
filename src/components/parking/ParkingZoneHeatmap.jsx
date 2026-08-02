import React from "react";
import Skeleton from "../ui/Skeleton";
import Badge from "../ui/Badge";
import ProgressBar from "../ui/ProgressBar";

function levelFor(pct) {
  if (pct >= 75) return "high";
  if (pct >= 50) return "medium";
  return "low";
}

export default function ParkingZoneHeatmap({ data, loading }) {
  if (loading || !data) {
    return (
      <div style={{ display: "grid", gap: 14 }}>
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height={16} />)}
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {data.map((z) => {
        const level = levelFor(z.occupancyPct);
        return (
          <div key={z.zone}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
              <span style={{ fontWeight: 600 }}>{z.zone}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="mono text-secondary">{z.occupancyPct}%</span>
                <Badge variant={level}>{level}</Badge>
              </span>
            </div>
            <ProgressBar value={z.occupancyPct} level={level} />
          </div>
        );
      })}
    </div>
  );
}
