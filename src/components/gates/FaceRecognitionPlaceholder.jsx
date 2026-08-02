import React from "react";
import { ScanFace } from "lucide-react";
import Card from "../ui/Card";
import AIBadge from "../ui/AIBadge";

export default function FaceRecognitionPlaceholder() {
  return (
    <Card title="Face Recognition" icon={ScanFace} actions={<AIBadge label="Pending Hardware" />}>
      <div
        style={{
          border: "1px dashed var(--border-medium)",
          borderRadius: "var(--radius-md)",
          padding: "36px 20px",
          textAlign: "center",
          background: "var(--bg-surface-raised)",
        }}
      >
        <ScanFace size={30} style={{ color: "var(--gold)", marginBottom: 10 }} />
        <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--text-secondary)", marginBottom: 6 }}>
          Camera feed will render here
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 320, margin: "0 auto" }}>
          Face-match verification is wired to <code style={{ color: "var(--gold-bright)" }}>aiService.verifyFaceMatch()</code> and
          activates once edge camera hardware is connected.
        </div>
      </div>
    </Card>
  );
}
