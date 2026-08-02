import React, { useMemo, useState } from "react";
import { AlertTriangle, Info, ShieldAlert, Eye, CheckCheck, Check } from "lucide-react";
import Card from "../ui/Card";
import SearchBar from "../ui/SearchBar";
import FilterSelect from "../ui/FilterSelect";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";

const SEVERITY_CFG = {
  critical: { icon: AlertTriangle, color: "var(--danger)" },
  warning: { icon: AlertTriangle, color: "var(--warning)" },
  info: { icon: Info, color: "var(--info)" },
};

export default function SecurityEventLog({ events, loading, onAcknowledge, onResolve }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    if (!events) return [];
    return events.filter((e) => {
      const matchesSearch = e.text.toLowerCase().includes(search.toLowerCase());
      const matchesType = !typeFilter || e.severity === typeFilter;
      const matchesStatus = !statusFilter || e.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, search, typeFilter, statusFilter]);

  const counts = useMemo(() => {
    if (!events) return { critical: 0, warning: 0, info: 0 };
    return {
      critical: events.filter((e) => e.severity === "critical").length,
      warning: events.filter((e) => e.severity === "warning").length,
      info: events.filter((e) => e.severity === "info").length,
    };
  }, [events]);

  return (
    <Card
      title="Security Event Log"
      icon={ShieldAlert}
      actions={
        <div style={{ display: "flex", gap: 8 }}>
          <Badge variant="danger">{counts.critical} Critical</Badge>
          <Badge variant="warning">{counts.warning} Warning</Badge>
          <Badge variant="info">{counts.info} Info</Badge>
        </div>
      }
    >
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search events…" />
        <FilterSelect value={typeFilter} onChange={setTypeFilter} options={["critical", "warning", "info"]} allLabel="All Types" />
        <FilterSelect value={statusFilter} onChange={setStatusFilter} options={["pending", "acknowledged", "resolved"]} allLabel="All Status" />
      </div>

      {loading || !events ? (
        <div style={{ display: "grid", gap: 12 }}>
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={70} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="dtable-empty">No events match your filters.</div>
      ) : (
        <div style={{ display: "grid", gap: 4 }}>
          {filtered.map((e) => {
            const cfg = SEVERITY_CFG[e.severity] || SEVERITY_CFG.info;
            const Icon = cfg.icon;
            return (
              <div key={e.id} style={{ padding: "14px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ display: "flex", gap: 10, minWidth: 0 }}>
                    <Icon size={16} style={{ color: cfg.color, flexShrink: 0, marginTop: 2 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{e.text}</span>
                        <Badge variant={e.status}>{e.status}</Badge>
                      </div>
                      <div className="feed-meta" style={{ marginTop: 4 }}>
                        <Eye size={11} /> {e.source}
                        <span>·</span>
                        {e.time}
                      </div>
                      {e.note && (
                        <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginTop: 6, fontStyle: "italic" }}>{e.note}</div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    {e.status === "pending" && (
                      <Button variant="secondary" size="sm" icon={Check} onClick={() => onAcknowledge(e.id)}>
                        Acknowledge
                      </Button>
                    )}
                    {e.status === "acknowledged" && (
                      <Button variant="gold" size="sm" icon={CheckCheck} onClick={() => onResolve(e.id)}>
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
