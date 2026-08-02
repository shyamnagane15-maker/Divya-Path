import React from "react";
import { Users, Minus, Plus } from "lucide-react";
import Card from "../ui/Card";
import Switch from "../ui/Switch";
import Badge from "../ui/Badge";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";

export default function QueueControlPanel({ queueControl, loading, onTogglePause, onAdjustCounters }) {
  return (
    <Card title="Queue Controls" icon={Users}>
      {loading || !queueControl ? (
        <Skeleton height={100} />
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>Virtual queue processing</span>
              <Badge variant={queueControl.paused ? "warning" : "success"}>{queueControl.paused ? "Paused" : "Running"}</Badge>
            </div>
            <Switch checked={!queueControl.paused} onChange={onTogglePause} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="text-secondary" style={{ fontSize: 13 }}>Active counters</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Button variant="secondary" size="sm" icon={Minus} onClick={() => onAdjustCounters(-1)} aria-label="Decrease counters" />
              <span className="mono" style={{ fontWeight: 700, minWidth: 44, textAlign: "center" }}>
                {queueControl.activeCounters}/{queueControl.totalCounters}
              </span>
              <Button variant="secondary" size="sm" icon={Plus} onClick={() => onAdjustCounters(1)} aria-label="Increase counters" />
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
