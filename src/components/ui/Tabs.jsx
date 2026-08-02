import React from "react";

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs-row">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`tab-btn ${active === tab.value ? "active" : ""}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
