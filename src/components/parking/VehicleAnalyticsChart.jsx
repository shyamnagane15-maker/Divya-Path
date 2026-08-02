import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Skeleton from "../ui/Skeleton";

const COLORS = ["#c9a227", "#e8871e", "#a32c3d", "#4c8daf"];

export default function VehicleAnalyticsChart({ data, loading }) {
  if (loading || !data) return <Skeleton height={200} />;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical" margin={{ top: 6, right: 20, left: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(201,162,39,0.08)" horizontal={false} />
        <XAxis type="number" tick={{ fill: "#8a7a63", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis dataKey="type" type="category" tick={{ fill: "#d9cbb4", fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
        <Tooltip
          contentStyle={{ background: "#2b1d15", border: "1px solid rgba(201,162,39,0.3)", borderRadius: 10, fontSize: 12, color: "#f4ead8" }}
          cursor={{ fill: "rgba(201,162,39,0.06)" }}
        />
        <Bar dataKey="count" radius={[0, 5, 5, 0]}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
