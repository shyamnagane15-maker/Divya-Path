import React, { useState } from "react";
import { ListOrdered } from "lucide-react";
import Card from "../ui/Card";
import Tabs from "../ui/Tabs";
import DataTable from "../ui/DataTable";
import Badge from "../ui/Badge";
import Skeleton from "../ui/Skeleton";

export default function EntryExitLogsTable({ entryLogs, exitLogs, loading }) {
  const [tab, setTab] = useState("entry");

  const entryColumns = [
    { key: "name", label: "Devotee", sortable: true },
    { key: "method", label: "Method" },
    { key: "gate", label: "Gate" },
    { key: "time", label: "Time" },
    { key: "result", label: "Result", render: (r) => <Badge variant={r.result === "Verified" ? "success" : "warning"}>{r.result}</Badge> },
  ];

  const exitColumns = [
    { key: "name", label: "Devotee", sortable: true },
    { key: "gate", label: "Gate" },
    { key: "time", label: "Time" },
    { key: "durationMinutes", label: "Visit Duration", sortable: true, render: (r) => `${r.durationMinutes} min` },
  ];

  return (
    <Card title="Entry / Exit Logs" icon={ListOrdered} actions={<Tabs tabs={[{ value: "entry", label: "Entry" }, { value: "exit", label: "Exit" }]} active={tab} onChange={setTab} />}>
      {loading ? (
        <Skeleton height={200} />
      ) : tab === "entry" ? (
        <DataTable columns={entryColumns} rows={entryLogs || []} />
      ) : (
        <DataTable columns={exitColumns} rows={exitLogs || []} />
      )}
    </Card>
  );
}
