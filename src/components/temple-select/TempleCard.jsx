import React, { useRef, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import TempleIcon from "./TempleIcons";

export default function TempleCard({ temple, onSelect }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <button
      ref={cardRef}
      className="temple-card"
      style={{ "--card-accent": temple.accent, transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(temple)}
    >
      <div className="temple-card-sheen" />
      <TempleIcon variant={temple.id} accent={temple.accent} />

      <div style={{ marginTop: 18, textAlign: "center" }}>
        <div className="temple-card-name">{temple.name}</div>
        <div className="temple-card-tagline">{temple.tagline}</div>
        <div className="temple-card-location">
          <MapPin size={11} /> {temple.location}
        </div>
      </div>

      <div className="temple-card-cta">
        Enter Temple <ArrowRight size={14} />
      </div>
    </button>
  );
}
