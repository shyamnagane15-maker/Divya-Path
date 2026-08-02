import React from "react";
import { Lightbulb } from "lucide-react";
import Card from "../ui/Card";
import Switch from "../ui/Switch";
import Skeleton from "../ui/Skeleton";

export default function LightingControlPanel({ lighting, loading, onToggle, onBrightness }) {
  return (
    <Card title="Lighting" icon={Lightbulb}>
      {loading || !lighting ? (
        <Skeleton height={140} />
      ) : (
        <div style={{ display: "grid", gap: 18 }}>
          {lighting.map((l) => (
            <div key={l.id}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{l.name}</span>
                <Switch checked={l.on} onChange={() => onToggle(l.id)} />
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={l.brightness}
                disabled={!l.on}
                onChange={(e) => onBrightness(l.id, Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--gold)" }}
              />
              <div className="text-muted mono" style={{ fontSize: 11, textAlign: "right" }}>{l.brightness}%</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
