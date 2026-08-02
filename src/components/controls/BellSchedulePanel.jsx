import React from "react";
import { BellRing } from "lucide-react";
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";

export default function BellSchedulePanel({ schedule, loading }) {
  return (
    <Card title="Temple Bell Scheduling" icon={BellRing}>
      {loading || !schedule ? (
        <Skeleton height={100} />
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {schedule.map((b) => (
            <div
              key={b.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "var(--bg-surface-raised)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 14px",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600 }}>{b.label}</span>
              <span className="mono" style={{ color: "var(--gold-bright)", fontWeight: 700, fontSize: 13 }}>{b.time}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
