import React from "react";

export default function PulseDot({ color }) {
  return <span className="pulse-dot" style={color ? { background: color } : undefined} />;
}
