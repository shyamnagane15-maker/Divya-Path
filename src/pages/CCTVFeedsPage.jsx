import React, { useState } from "react";
import { AlertTriangle, Grid3x3, Video, VideoOff } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import CameraTile from "../components/cctv/CameraTile";
import { usePolling } from "../hooks/usePolling";
import { cctvService } from "../services/cctvService";

export default function CCTVFeedsPage() {
  const { data: cameras, loading } = usePolling(cctvService.getFeeds, { interval: 8000 });
  const [selected, setSelected] = useState(null);

  const liveCount = cameras ? cameras.filter((c) => c.status === "Live").length : 0;
  const alertCam = cameras ? cameras.find((c) => c.alert) : null;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">CCTV Feeds</h1>
          <p className="page-subtitle">
            {cameras ? `${liveCount} of ${cameras.length} cameras active` : "Loading camera network…"}
          </p>
        </div>
        {selected && (
          <Button variant="secondary" icon={Grid3x3} onClick={() => setSelected(null)}>
            Back to Grid
          </Button>
        )}
      </div>

      {alertCam && !selected && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            background: "var(--danger-wash)",
            border: "1px solid rgba(214,82,74,0.35)",
            borderRadius: "var(--radius-md)",
            padding: "14px 18px",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <AlertTriangle size={20} color="var(--danger)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--danger)" }}>Critical Alert</div>
              <div style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>
                {alertCam.alert} — {alertCam.zone} ({alertCam.id})
              </div>
            </div>
          </div>
          <Button variant="danger" size="sm" onClick={() => setSelected(alertCam)}>
            Respond
          </Button>
        </div>
      )}

      {loading || !cameras ? (
        <div className="grid grid-4">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} height={160} />)}
        </div>
      ) : selected ? (
        <Card
          title={`${selected.zone} — Single View`}
          icon={selected.status === "Live" ? Video : VideoOff}
          actions={<Badge variant={selected.status === "Live" ? "success" : "neutral"}>{selected.status}</Badge>}
        >
          <div
            style={{
              aspectRatio: "16/8",
              background: "repeating-linear-gradient(135deg, #1c140f, #1c140f 12px, #221812 12px, #221812 24px)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <Video size={44} style={{ color: "rgba(201,162,39,0.3)" }} />
          </div>
          <div className="mono text-muted" style={{ fontSize: 12 }}>{selected.id} · {selected.zone}</div>
        </Card>
      ) : (
        <div className="grid grid-4">
          {cameras.map((cam) => (
            <CameraTile key={cam.id} camera={cam} onExpand={setSelected} />
          ))}
        </div>
      )}
    </div>
  );
}
