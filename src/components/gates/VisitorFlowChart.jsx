import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Skeleton from "../ui/Skeleton";

export default function VisitorFlowChart({ data, loading }) {
  if (loading || !data) return <Skeleton height={220} />;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 6, right: 12, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="entriesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a227" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#c9a227" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="exitsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a32c3d" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#a32c3d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(201,162,39,0.08)" vertical={false} />
        <XAxis dataKey="time" tick={{ fill: "#8a7a63", fontSize: 11 }} axisLine={{ stroke: "rgba(201,162,39,0.15)" }} tickLine={false} />
        <YAxis tick={{ fill: "#8a7a63", fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
        <Tooltip contentStyle={{ background: "#2b1d15", border: "1px solid rgba(201,162,39,0.3)", borderRadius: 10, fontSize: 12, color: "#f4ead8" }} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#b8a88c" }} />
        <Area type="monotone" dataKey="entries" stroke="#c9a227" fill="url(#entriesFill)" strokeWidth={2} />
        <Area type="monotone" dataKey="exits" stroke="#a32c3d" fill="url(#exitsFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
