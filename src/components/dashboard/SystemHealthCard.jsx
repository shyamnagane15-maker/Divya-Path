import React from "react";
import { Activity, Camera, Cpu, Server, AlertTriangle } from "lucide-react";
import Skeleton from "../ui/Skeleton";
import PulseDot from "../ui/PulseDot";

export default function SystemHealthCard({ data, loading }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">
          <Activity size={16} /> System Health
        </div>
        {!loading && data && (
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--success)", fontWeight: 700 }}>
            <PulseDot /> {data.status}
          </span>
        )}
      </div>

      {loading || !data ? (
        <Skeleton height={140} />
      ) : (
        <div style={{ display: "grid", gap: 4 }}>
          <Row icon={Camera} label="Active Cameras" value={`${data.activeCameras}/${data.totalCameras}`} />
          <Row icon={Cpu} label="AI Models Active" value={data.aiModelsActive} />
          <Row icon={Server} label="Edge Devices Online" value={`${data.edgeDevicesOnline}/${data.edgeDevicesTotal}`} />
          <Row
            icon={AlertTriangle}
            label="Active Alerts"
            value={data.activeAlerts}
            valueColor={data.activeAlerts > 0 ? "var(--danger)" : "var(--success)"}
          />
        </div>
      )}
    </div>
  );
}

function Row({ icon: Icon, label, value, valueColor }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border-subtle)" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "var(--text-secondary)" }}>
        <Icon size={15} style={{ color: "var(--gold)" }} /> {label}
      </span>
      <span className="mono" style={{ fontWeight: 700, color: valueColor || "var(--text-primary)" }}>{value}</span>
    </div>
  );
}
