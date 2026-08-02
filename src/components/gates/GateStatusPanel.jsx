import React from "react";
import { DoorOpen } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Switch from "../ui/Switch";
import Skeleton from "../ui/Skeleton";

export default function GateStatusPanel({ gates, loading, onToggleAuto }) {
  return (
    <Card title="Gate Status" icon={DoorOpen}>
      {loading || !gates ? (
        <Skeleton height={160} />
      ) : (
        <div className="dtable-wrap">
          <table className="dtable">
            <thead>
              <tr>
                <th>Gate</th>
                <th>Status</th>
                <th>Throughput</th>
                <th>Auto Control</th>
              </tr>
            </thead>
            <tbody>
              {gates.map((g) => (
                <tr key={g.id}>
                  <td style={{ fontWeight: 600 }}>{g.name}</td>
                  <td><Badge variant={g.status === "Open" ? "success" : "danger"}>{g.status}</Badge></td>
                  <td className="mono">{g.throughputPerMin}/min</td>
                  <td>
                    <Switch checked={g.mode === "Auto"} onChange={(val) => onToggleAuto(g.id, val)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
