import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Skeleton from "../ui/Skeleton";

function barColor(v) {
  if (v >= 75) return "#a32c3d";
  if (v >= 50) return "#e8871e";
  return "#c9a227";
}

export default function RushHourForecastChart({ data, loading }) {
  if (loading || !data) return <Skeleton height={220} />;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 6, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid stroke="rgba(201,162,39,0.08)" vertical={false} />
        <XAxis dataKey="time" tick={{ fill: "#8a7a63", fontSize: 11 }} axisLine={{ stroke: "rgba(201,162,39,0.15)" }} tickLine={false} />
        <YAxis tick={{ fill: "#8a7a63", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
        <Tooltip
          contentStyle={{ background: "#2b1d15", border: "1px solid rgba(201,162,39,0.3)", borderRadius: 10, fontSize: 12, color: "#f4ead8" }}
          labelStyle={{ color: "#c9a227", fontWeight: 700 }}
          formatter={(v) => [`${v}%`, "Predicted density"]}
        />
        <Bar dataKey="predicted" radius={[5, 5, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={barColor(d.predicted)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
