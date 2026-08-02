import React from "react";
import { TrendingUp, Gauge } from "lucide-react";
import AIBadge from "../ui/AIBadge";
import Skeleton from "../ui/Skeleton";
import ProgressBar from "../ui/ProgressBar";

export default function AICrowdPredictionCard({ data, loading }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">
          <TrendingUp size={16} /> Crowd Density Analytics
        </div>
        <AIBadge />
      </div>

      {loading || !data ? (
        <Skeleton height={90} />
      ) : (
        <>
          <div className="grid grid-3" style={{ gap: 16, marginBottom: 18 }}>
            <MetricBlock label="Current Density" value={`${data.currentDensityPct}%`} color="var(--gold)" />
            <MetricBlock label="Next Hour Prediction" value={`${data.nextHourDensityPct}%`} color="var(--info)" />
            <MetricBlock
              label="vs Yesterday"
              value={`${data.trendVsYesterdayPct >= 0 ? "+" : ""}${data.trendVsYesterdayPct}%`}
              color={data.trendVsYesterdayPct >= 0 ? "var(--success)" : "var(--danger)"}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
            <span className="text-secondary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Gauge size={13} /> Model confidence
            </span>
            <span className="mono" style={{ fontWeight: 700 }}>{data.confidencePct}%</span>
          </div>
          <div style={{ marginTop: 6 }}>
            <ProgressBar value={data.confidencePct} color="var(--gold)" />
          </div>
        </>
      )}
    </div>
  );
}

function MetricBlock({ label, value, color }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 26, fontWeight: 700, color }}>{value}</div>
      <div className="text-muted" style={{ fontSize: 11.5, marginTop: 4 }}>{label}</div>
    </div>
  );
}
