import React, { useEffect, useState } from "react";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { securityService } from "../../services/securityService";
import Skeleton from "../ui/Skeleton";

const ICON_MAP = {
  critical: { icon: AlertTriangle, color: "var(--danger)" },
  warning: { icon: AlertTriangle, color: "var(--warning)" },
  info: { icon: Info, color: "var(--info)" },
};

export default function NotificationsPanel({ onClose }) {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    securityService.getEvents().then((data) => setEvents(data.slice(0, 4)));
  }, []);

  return (
    <div
      className="card"
      style={{
        position: "absolute",
        right: 0,
        top: "calc(100% + 10px)",
        width: 320,
        zIndex: 50,
        boxShadow: "var(--shadow-raised)",
      }}
    >
      <div className="card-header-title" style={{ marginBottom: 12 }}>
        <CheckCircle2 size={15} /> Recent Notifications
      </div>

      {!events
        ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={40} style={{ marginBottom: 10 }} />)
        : events.map((e) => {
            const cfg = ICON_MAP[e.severity] || ICON_MAP.info;
            const Icon = cfg.icon;
            return (
              <div className="feed-item" key={e.id}>
                <div className="feed-icon" style={{ background: `${cfg.color}22`, color: cfg.color }}>
                  <Icon size={14} />
                </div>
                <div>
                  <div className="feed-text">{e.text}</div>
                  <div className="feed-meta">{e.time}</div>
                </div>
              </div>
            );
          })}

      <button className="btn btn-ghost btn-sm" style={{ width: "100%", marginTop: 10 }} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
