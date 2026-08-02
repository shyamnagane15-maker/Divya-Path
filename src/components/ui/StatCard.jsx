import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import Skeleton from "./Skeleton";
import ProgressBar from "./ProgressBar";

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = "var(--gold)",
  deltaPct,
  sublabel,
  progress, // 0-100, optional
  loading,
}) {
  return (
    <div className="stat-card" style={{ "--stat-accent": accent }}>
      <div className="stat-card-top">
        <span className="stat-card-label">{label}</span>
        {Icon && (
          <div className="stat-card-icon">
            <Icon size={16} />
          </div>
        )}
      </div>

      {loading ? (
        <Skeleton width="70%" height={28} />
      ) : (
        <div className="stat-card-value">{value}</div>
      )}

      {progress !== undefined && !loading && (
        <div style={{ marginTop: 12 }}>
          <ProgressBar value={progress} color={accent} />
        </div>
      )}

      {(deltaPct !== undefined || sublabel) && !loading && (
        <div className="stat-card-foot">
          {deltaPct !== undefined && (
            <span className={`stat-card-delta ${deltaPct >= 0 ? "up" : "down"}`}>
              {deltaPct >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {Math.abs(deltaPct)}%
            </span>
          )}
          {sublabel && <span className="text-muted">{sublabel}</span>}
        </div>
      )}
    </div>
  );
}
