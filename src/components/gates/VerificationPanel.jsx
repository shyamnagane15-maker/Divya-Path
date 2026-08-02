import React, { useState } from "react";
import { QrCode, CreditCard, CheckCircle2, XCircle } from "lucide-react";
import Card from "../ui/Card";
import Tabs from "../ui/Tabs";
import Button from "../ui/Button";
import { bookingsService } from "../../services/bookingsService";

export default function VerificationPanel() {
  const [mode, setMode] = useState("qr");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  const handleVerify = async () => {
    setChecking(true);
    const res = await bookingsService.verifyQR(code || (mode === "qr" ? "DEV-00231" : "RFID-88421"));
    setChecking(false);
    setResult(res);
  };

  return (
    <Card title="RFID / QR Verification" icon={mode === "qr" ? QrCode : CreditCard}>
      <Tabs
        tabs={[
          { value: "qr", label: "QR Code" },
          { value: "rfid", label: "RFID Card" },
        ]}
        active={mode}
        onChange={(m) => {
          setMode(m);
          setResult(null);
        }}
      />

      <div style={{ marginTop: 16 }}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={mode === "qr" ? "Scan or enter QR payload…" : "Tap or enter RFID card ID…"}
          style={{
            width: "100%",
            background: "var(--bg-surface-raised)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "11px 14px",
            color: "var(--text-primary)",
            fontSize: 13,
            marginBottom: 12,
          }}
        />
        <Button variant="gold" loading={checking} onClick={handleVerify} style={{ width: "100%" }}>
          Verify {mode === "qr" ? "QR" : "RFID"}
        </Button>

        {result && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 14,
              padding: "10px 14px",
              borderRadius: "var(--radius-sm)",
              background: result.valid ? "var(--success-wash)" : "var(--danger-wash)",
              color: result.valid ? "var(--success)" : "var(--danger)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {result.valid ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {result.valid ? "Verified — access granted." : "Verification failed — flagged for manual review."}
          </div>
        )}
      </div>
    </Card>
  );
}
