import React, { useState, useMemo } from "react";
import DataTable from "../ui/DataTable";
import SearchBar from "../ui/SearchBar";
import FilterSelect from "../ui/FilterSelect";
import Badge from "../ui/Badge";
import Skeleton from "../ui/Skeleton";

export default function ParkingHistoryTable({ data, loading }) {
  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState("");

  const zones = useMemo(() => (data ? [...new Set(data.map((d) => d.zone))] : []), [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((r) => {
      const matchesSearch = r.plate.toLowerCase().includes(search.toLowerCase());
      const matchesZone = !zoneFilter || r.zone === zoneFilter;
      return matchesSearch && matchesZone;
    });
  }, [data, search, zoneFilter]);

  if (loading || !data) return <Skeleton height={220} />;

  const columns = [
    { key: "plate", label: "Plate", sortable: true },
    { key: "zone", label: "Zone", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "entryTime", label: "Entry Time" },
    { key: "status", label: "Status", render: (r) => <Badge variant={r.status === "Parked" ? "info" : "neutral"}>{r.status}</Badge> },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search plate number…" />
        <FilterSelect value={zoneFilter} onChange={setZoneFilter} options={zones} allLabel="All Zones" />
      </div>
      <DataTable columns={columns} rows={filtered} />
    </div>
  );
}
