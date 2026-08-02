import React, { useState } from "react";
import { ParkingSquare, Waypoints, Wrench } from "lucide-react";
import Card from "../ui/Card";
import Switch from "../ui/Switch";
import Skeleton from "../ui/Skeleton";
import Badge from "../ui/Badge";

export default function FacilityTogglesPanel({
  parkingBarrier,
  crowdDiversion,
  maintenance,
  loading,
  onToggleBarrier,
  onToggleDiversion,
  onToggleMaintenance,
}) {
  const [note, setNote] = useState("");

  return (
    <Card title="Facility Controls" icon={Wrench}>
      {loading || !parkingBarrier || !crowdDiversion || !maintenance ? (
        <Skeleton height={160} />
      ) : (
        <div style={{ display: "grid", gap: 4 }}>
          <Row
            icon={ParkingSquare}
            label="Parking Barrier"
            statusLabel={parkingBarrier.open ? "Open" : "Closed"}
            checked={parkingBarrier.open}
            onChange={onToggleBarrier}
          />
          <Row
            icon={Waypoints}
            label={`Crowd Diversion — ${crowdDiversion.target}`}
            statusLabel={crowdDiversion.active ? "Active" : "Idle"}
            checked={crowdDiversion.active}
            onChange={onToggleDiversion}
          />
          <div style={{ padding: "12px 0" }}>
            <Row
              icon={Wrench}
              label="Maintenance Mode"
              statusLabel={maintenance.mode ? "Enabled" : "Disabled"}
              checked={maintenance.mode}
              onChange={() => onToggleMaintenance(note)}
              noBorder
            />
            {maintenance.mode && (
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Maintenance note (e.g. Gate 3 sensor recalibration)"
                style={{
                  width: "100%",
                  marginTop: 10,
                  background: "var(--bg-surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  padding: "9px 12px",
                  color: "var(--text-primary)",
                  fontSize: 12.5,
                }}
              />
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

function Row({ icon: Icon, label, statusLabel, checked, onChange, noBorder }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: noBorder ? "none" : "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <Icon size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
        <span style={{ fontSize: 13.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
        <Badge variant={checked ? "success" : "neutral"}>{statusLabel}</Badge>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}
