import React, { useMemo, useState } from "react";
import { CalendarCheck } from "lucide-react";
import Card from "../ui/Card";
import SearchBar from "../ui/SearchBar";
import FilterSelect from "../ui/FilterSelect";
import DataTable from "../ui/DataTable";
import Badge from "../ui/Badge";
import Skeleton from "../ui/Skeleton";

export default function BookingListTable({ data, loading }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const statuses = useMemo(() => (data ? [...new Set(data.map((d) => d.status))] : []), [data]);
  const types = useMemo(() => (data ? [...new Set(data.map((d) => d.type))] : []), [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || r.status === statusFilter;
      const matchesType = !typeFilter || r.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [data, search, statusFilter, typeFilter]);

  const columns = [
    { key: "id", label: "Booking ID", sortable: true },
    { key: "name", label: "Devotee", sortable: true },
    { key: "site", label: "Site" },
    { key: "slot", label: "Slot" },
    { key: "type", label: "Type", render: (r) => <Badge variant={r.type === "VIP" ? "warning" : "neutral"}>{r.type}</Badge> },
    { key: "status", label: "Status", render: (r) => <Badge variant={r.status}>{r.status}</Badge> },
    { key: "bookedAt", label: "Booked" },
  ];

  return (
    <Card title="Booking List" icon={CalendarCheck}>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search name or booking ID…" />
        <FilterSelect value={statusFilter} onChange={setStatusFilter} options={statuses} allLabel="All Statuses" />
        <FilterSelect value={typeFilter} onChange={setTypeFilter} options={types} allLabel="All Types" />
      </div>
      {loading || !data ? <Skeleton height={220} /> : <DataTable columns={columns} rows={filtered} />}
    </Card>
  );
}
