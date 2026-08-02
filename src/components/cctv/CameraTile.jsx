import React from "react";
import { Video, VideoOff, AlertTriangle, Maximize2 } from "lucide-react";
import Badge from "../ui/Badge";

export default function CameraTile({ camera, onExpand }) {
  const live = camera.status === "Live";
  return (
    <div
      style={{
        border: `1px solid ${camera.alert ? "rgba(214,82,74,0.5)" : "var(--border-subtle)"}`,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--bg-surface)",
      }}
    >
      <div
        style={{
          aspectRatio: "16/10",
          background: live
            ? "repeating-linear-gradient(135deg, #1c140f, #1c140f 10px, #221812 10px, #221812 20px)"
            : "var(--bg-void)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {live ? <Video size={26} style={{ color: "rgba(201,162,39,0.3)" }} /> : <VideoOff size={26} style={{ color: "var(--text-muted)" }} />}

        <span style={{ position: "absolute", top: 10, left: 10 }}>
          <Badge variant={live ? "success" : "neutral"}>{camera.status}</Badge>
        </span>

        {camera.alert && (
          <span style={{ position: "absolute", top: 10, right: 10 }}>
            <Badge variant="danger" icon={AlertTriangle}>Alert</Badge>
          </span>
        )}

        <button
          className="icon-btn"
          onClick={() => onExpand(camera)}
          style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(16,11,8,0.6)" }}
          aria-label="Expand"
        >
          <Maximize2 size={14} />
        </button>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div style={{ fontWeight: 700, fontSize: 13 }}>{camera.zone}</div>
        <div className="mono text-muted" style={{ fontSize: 11 }}>{camera.id}</div>
        {camera.alert && <div style={{ fontSize: 11.5, color: "var(--danger)", marginTop: 4 }}>{camera.alert}</div>}
      </div>
    </div>
  );
}
