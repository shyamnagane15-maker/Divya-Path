import React from "react";
import { useNavigate } from "react-router-dom";
import TempleMark from "../components/layout/TempleMark";
import TempleCard from "../components/temple-select/TempleCard";
import { TEMPLES } from "../constants/temples";
import { useAppState } from "../context/AppStateContext";

export default function SelectTemplePage() {
  const navigate = useNavigate();
  const { selectTemple } = useAppState();

  const handleSelect = (temple) => {
    selectTemple(temple);
    navigate("/dashboard");
  };

  return (
    <div className="select-temple-shell">
      <div style={{ textAlign: "center", marginBottom: 48, maxWidth: 640 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <TempleMark size={44} />
        </div>
        <div style={{ fontSize: 11.5, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>
          Temple Flow · Command System
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4.5vw,42px)", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
          Select Your Temple
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14.5, marginTop: 14, lineHeight: 1.6 }}>
          Choose the site you're managing today. Your dashboard, live feeds, and controls will
          scope to this temple until you switch.
        </p>
      </div>

      <div className="temple-grid">
        {TEMPLES.map((temple) => (
          <TempleCard key={temple.id} temple={temple} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
