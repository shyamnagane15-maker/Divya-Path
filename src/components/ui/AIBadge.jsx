import React from "react";
import { Sparkles } from "lucide-react";

export default function AIBadge({ label = "AI Powered" }) {
  return (
    <span className="ai-badge">
      <Sparkles size={11} />
      {label}
    </span>
  );
}
