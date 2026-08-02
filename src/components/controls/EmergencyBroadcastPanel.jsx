import React, { useState } from "react";
import { Megaphone, Send, CheckCircle2 } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { controlsService } from "../../services/controlsService";

export default function EmergencyBroadcastPanel() {
  const [message, setMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);

  const handleSend = async () => {
    setSending(true);
    const result = await controlsService.sendEmergencyBroadcast(message);
    setSending(false);
    setSent(result);
    setConfirmOpen(false);
    setMessage("");
    setTimeout(() => setSent(null), 4000);
  };

  return (
    <Card title="Emergency Broadcast" icon={Megaphone}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="e.g. All devotees please move calmly towards Exit Gate 2. Do not rush."
        rows={3}
        className="ds-input"
        style={{
          width: "100%",
          resize: "vertical",
          background: "var(--bg-surface-raised)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: 12,
          color: "var(--text-primary)",
          fontSize: 13,
          fontFamily: "inherit",
          marginBottom: 12,
        }}
      />
      <Button variant="danger" icon={Send} disabled={!message.trim()} onClick={() => setConfirmOpen(true)} style={{ width: "100%" }}>
        Broadcast to All Zones
      </Button>

      {sent && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 12.5, color: "var(--success)" }}>
          <CheckCircle2 size={14} /> Broadcast sent to all zone speakers.
        </div>
      )}

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Emergency Broadcast"
        description="This will play immediately on every speaker across all zones. Confirm the message below."
        actions={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="danger" loading={sending} onClick={handleSend}>Confirm & Send</Button>
          </>
        }
      >
        <div
          style={{
            background: "var(--bg-surface-raised)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: 12,
            fontSize: 13,
            fontStyle: "italic",
            color: "var(--text-secondary)",
          }}
        >
          "{message}"
        </div>
      </Modal>
    </Card>
  );
}
