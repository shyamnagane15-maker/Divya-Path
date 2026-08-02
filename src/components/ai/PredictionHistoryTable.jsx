import React from "react";
import DataTable from "../ui/DataTable";
import Badge from "../ui/Badge";
import Skeleton from "../ui/Skeleton";

export default function PredictionHistoryTable({ data, loading }) {
  if (loading || !data) return <Skeleton height={200} />;

  const columns = [
    { key: "timeframe", label: "Timeframe" },
    { key: "predicted", label: "Predicted", sortable: true, render: (r) => `${r.predicted}%` },
    { key: "actual", label: "Actual", sortable: true, render: (r) => `${r.actual}%` },
    {
      key: "deviation",
      label: "Deviation",
      sortable: true,
      render: (r) => (
        <Badge variant={r.deviation <= 4 ? "success" : r.deviation <= 8 ? "warning" : "danger"}>
          ±{r.deviation}%
        </Badge>
      ),
    },
  ];

  return <DataTable columns={columns} rows={data} />;
}
