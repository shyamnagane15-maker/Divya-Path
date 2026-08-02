import React from "react";
import { Clock3, DoorOpen, Gauge } from "lucide-react";
import AIBadge from "../ui/AIBadge";
import Skeleton from "../ui/Skeleton";
import ProgressBar from "../ui/ProgressBar";

export default function QueuePredictionCard({ data, loading }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">
          <Clock3 size={16} /> Queue Prediction
        </div>
        <AIBadge />
      </div>

      {loading || !data ? (
        <Skeleton height={110} />
      ) : (
        <>
          <div className="grid grid-2" style={{ gap: 16, marginBottom: 18 }}>
            <div>
              <div className="mono" style={{ fontSize: 26, fontWeight: 700, color: "var(--saffron)" }}>
                {data.predictedWaitMinutes} min
              </div>
              <div className="text-muted" style={{ fontSize: 11.5, marginTop: 4 }}>Predicted wait time</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 26, fontWeight: 700, color: "var(--gold)" }}>
                {data.predictedQueueLength}
              </div>
              <div className="text-muted" style={{ fontSize: 11.5, marginTop: 4 }}>Predicted queue length</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--maroon-wash)",
              border: "1px solid var(--border-medium)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
              marginBottom: 16,
            }}
          >
            <DoorOpen size={16} color="var(--gold-bright)" />
            <div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>Recommended Gate</div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--gold-bright)" }}>{data.recommendedGate}</div>
            </div>
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
