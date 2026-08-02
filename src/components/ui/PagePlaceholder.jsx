import React from "react";
import Card from "./Card";

export default function PagePlaceholder({ title, subtitle, icon: Icon }) {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>
      </div>
      <Card>
        <div style={{ padding: "40px 10px", textAlign: "center", color: "var(--text-muted)" }}>
          {Icon && <Icon size={28} style={{ marginBottom: 10, color: "var(--gold)" }} />}
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--text-secondary)" }}>
            Module scaffolded — full build arrives in the next batch.
          </div>
        </div>
      </Card>
    </div>
  );
}
