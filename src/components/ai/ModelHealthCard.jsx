import React from "react";
import { Cpu, Zap, RefreshCw, Server } from "lucide-react";
import Skeleton from "../ui/Skeleton";
import Badge from "../ui/Badge";

export default function ModelHealthCard({ data, loading }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">
          <Cpu size={16} /> AI Model Health
        </div>
        {!loading && data && <Badge variant="success">{data.status}</Badge>}
      </div>

      {loading || !data ? (
        <Skeleton height={130} />
      ) : (
        <div style={{ display: "grid", gap: 4 }}>
          <Row icon={Cpu} label="Model" value={data.modelName} />
          <Row icon={Zap} label="Accuracy" value={`${data.accuracyPct}%`} valueColor="var(--success)" />
          <Row icon={Server} label="Inference Latency" value={`${data.latencyMs} ms`} />
          <Row icon={RefreshCw} label="Last Retrained" value={data.lastRetrained} />
          <Row icon={Server} label="Edge Node" value={data.edgeNode} />
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
