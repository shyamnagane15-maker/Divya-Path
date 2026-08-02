import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Skeleton from "../ui/Skeleton";

export default function CrowdTrendChart({ data, loading }) {
  if (loading || !data) return <Skeleton height={220} />;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 6, right: 12, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="crowdLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#E8871E" />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(201,162,39,0.08)" vertical={false} />
        <XAxis dataKey="time" tick={{ fill: "#8a7a63", fontSize: 11 }} axisLine={{ stroke: "rgba(201,162,39,0.15)" }} tickLine={false} />
        <YAxis tick={{ fill: "#8a7a63", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
        <Tooltip
          contentStyle={{
            background: "#2b1d15",
            border: "1px solid rgba(201,162,39,0.3)",
            borderRadius: 10,
            fontSize: 12,
            color: "#f4ead8",
          }}
          labelStyle={{ color: "#c9a227", fontWeight: 700 }}
        />
        <Line type="monotone" dataKey="density" stroke="url(#crowdLine)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#E3C158" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
