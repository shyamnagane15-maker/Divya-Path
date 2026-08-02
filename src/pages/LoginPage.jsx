import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, User } from "lucide-react";
import TempleMark from "../components/layout/TempleMark";
import { useAppState } from "../context/AppStateContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAppState();
  const [mode, setMode] = useState("login");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      login();
      navigate("/select-temple");
    }, 600);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <TempleMark size={46} />
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--gold-bright)" }}>
            Temple Flow
          </div>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginTop: 4 }}>
            Smart Temple Command System
          </div>
        </div>

        <div className="tabs-row" style={{ width: "100%", marginBottom: 22 }}>
          <button className={`tab-btn ${mode === "login" ? "active" : ""}`} style={{ flex: 1 }} onClick={() => setMode("login")} type="button">
            Log In
          </button>
          <button className={`tab-btn ${mode === "register" ? "active" : ""}`} style={{ flex: 1 }} onClick={() => setMode("register")} type="button">
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <Field label="Full Name" icon={User}>
              <input required className="auth-input" placeholder="Staff / Admin name" />
            </Field>
          )}
          <Field label="Email Address" icon={Mail}>
            <input required type="email" className="auth-input" placeholder="email@example.com" />
          </Field>
          <Field label="Password" icon={Lock}>
            <input required type="password" className="auth-input" placeholder="Enter password" />
          </Field>

          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: "100%", marginTop: 8, padding: "13px 18px" }}>
            {submitting ? (
              "Verifying…"
            ) : (
              <>
                <ShieldCheck size={16} /> {mode === "login" ? "Log In Securely" : "Create Account"}
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", fontSize: 11.5, color: "var(--text-muted)", marginTop: 18 }}>
          Government of Gujarat · GUJCOST Prototype
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: 0.3 }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <Icon size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        {children}
      </div>
    </div>
  );
}
