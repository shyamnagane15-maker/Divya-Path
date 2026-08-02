import React from "react";
import { AlertTriangle, ScanSearch, Users, Eye } from "lucide-react";
import StatCard from "../ui/StatCard";
import AIBadge from "../ui/AIBadge";

export default function AnomalySummaryCards({ data, loading }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div className="card-header-title">
          <Eye size={16} /> AI Anomaly Detection
        </div>
        <AIBadge label="Object Detection Active" />
      </div>
      <div className="grid grid-4">
        <StatCard label="Critical Alerts" value={data ? data.critical : "—"} icon={AlertTriangle} accent="var(--danger)" loading={loading} />
        <StatCard label="Warning Alerts" value={data ? data.warning : "—"} icon={AlertTriangle} accent="var(--warning)" loading={loading} />
        <StatCard label="Info Events" value={data ? data.info : "—"} icon={ScanSearch} accent="var(--info)" loading={loading} />
        <StatCard
          label="Crowd Violation Alerts"
          value={data ? data.crowdViolationAlerts : "—"}
          icon={Users}
          accent="var(--saffron)"
          loading={loading}
        />
      </div>
    </div>
  );
}
