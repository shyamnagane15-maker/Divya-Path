import React from "react";
import { Clock3 } from "lucide-react";
import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import Skeleton from "../ui/Skeleton";

export default function SlotAvailabilityPanel({ data, loading }) {
  return (
    <Card title="Slot Availability" icon={Clock3}>
      {loading || !data ? (
        <Skeleton height={160} />
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {data.map((s) => {
            const pct = Math.round((s.booked / s.capacity) * 100);
            const level = pct >= 90 ? "high" : pct >= 60 ? "medium" : "low";
            return (
              <div key={s.slot}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>{s.slot}</span>
                  <span className="mono text-secondary">{s.booked}/{s.capacity}</span>
                </div>
                <ProgressBar value={pct} level={level} />
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
