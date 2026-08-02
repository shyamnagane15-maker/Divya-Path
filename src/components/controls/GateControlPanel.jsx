import React from "react";
import { DoorOpen } from "lucide-react";
import Card from "../ui/Card";
import Switch from "../ui/Switch";
import Badge from "../ui/Badge";
import Skeleton from "../ui/Skeleton";

export default function GateControlPanel({ gates, loading, onToggle }) {
  return (
    <Card title="Open / Close Gates" icon={DoorOpen}>
      {loading || !gates ? (
        <Skeleton height={140} />
      ) : (
        <div style={{ display: "grid", gap: 4 }}>
          {gates.map((g) => (
            <div
              key={g.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{g.name}</span>
                <Badge variant={g.open ? "success" : "danger"}>{g.open ? "Open" : "Closed"}</Badge>
              </div>
              <Switch checked={g.open} onChange={() => onToggle(g.id)} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
