import React from "react";
import { AlertTriangle, Info, CheckCircle2, AlertCircle } from "lucide-react";
import Skeleton from "../ui/Skeleton";

const TONE_CFG = {
  danger: { icon: AlertTriangle, color: "var(--danger)" },
  warning: { icon: AlertCircle, color: "var(--warning)" },
  info: { icon: Info, color: "var(--info)" },
  success: { icon: CheckCircle2, color: "var(--success)" },
};

export default function ActivityFeed({ data, loading }) {
  if (loading || !data) {
    return (
      <div style={{ display: "grid", gap: 12 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height={38} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {data.map((item) => {
        const cfg = TONE_CFG[item.tone] || TONE_CFG.info;
        const Icon = cfg.icon;
        return (
          <div className="feed-item" key={item.id}>
            <div className="feed-icon" style={{ background: `${cfg.color}22`, color: cfg.color }}>
              <Icon size={14} />
            </div>
            <div>
              <div className="feed-text">{item.text}</div>
              <div className="feed-meta">
                <span>{item.zone}</span>
                <span>·</span>
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
