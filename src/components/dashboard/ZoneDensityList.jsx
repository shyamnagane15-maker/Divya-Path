import React from "react";
import Skeleton from "../ui/Skeleton";
import Badge from "../ui/Badge";
import ProgressBar from "../ui/ProgressBar";

export default function ZoneDensityList({ data, loading }) {
  if (loading || !data) {
    return (
      <div style={{ display: "grid", gap: 14 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={16} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {data.map((z) => (
        <div key={z.zone}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>{z.zone}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="mono text-secondary">{z.pct}%</span>
              <Badge variant={z.level.toLowerCase()}>{z.level}</Badge>
            </span>
          </div>
          <ProgressBar value={z.pct} level={z.level} />
        </div>
      ))}
    </div>
  );
}
