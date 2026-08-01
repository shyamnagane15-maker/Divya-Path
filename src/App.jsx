import React, { useState } from "react";
import {
  ShieldCheck,
  Users,
  Store,
  Camera,
  Phone,
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Search,
  Database,
  IdCard,
  Clock3,
  MapPin,
  Loader2,
  UserRound,
} from "lucide-react";

/* ============================================================
   DARSHAN SETU — Temple & Pilgrimage Crowd Management Portal
   Three gateways: Devotee / Volunteer (Seva Mitra) / Vendor
   ============================================================ */

const SITES = ["Somnath", "Dwarka", "Ambaji", "Pavagadh"];
const SLOTS = ["6:00–7:00 AM", "9:00–10:00 AM", "12:00–1:00 PM", "4:00–5:00 PM", "7:00–8:00 PM"];

const tokens = {
  maroon: "#6B1B2B",
  maroonDeep: "#4A121E",
  gold: "#C89B3C",
  goldLight: "#E7C878",
  sandstone: "#F6EEE1",
  sandstoneDeep: "#EFE2CC",
  stone: "#8C7757",
  ink: "#2B1810",
  inkSoft: "#5B4636",
};

export default function DarshanSetuPortal() {
  const [screen, setScreen] = useState("gateway"); // gateway | devotee | volunteer | vendor
  const [mode, setMode] = useState("login"); // login | register | dashboard

  const goGateway = () => {
    setScreen("gateway");
    setMode("login");
  };

  return (
    <div style={{ minHeight: "100vh", background: tokens.sandstone, fontFamily: "'Inter',sans-serif", color: tokens.ink }}>
      <GlobalStyle />
      <TopBar screen={screen} onBack={goGateway} />

      {screen === "gateway" && (
        <Gateway
          onSelect={(role) => {
            setScreen(role);
            setMode("login");
          }}
        />
      )}

      {screen !== "gateway" && (
        <RolePanel role={screen} mode={mode} setMode={setMode} onBack={goGateway} />
      )}

      <Footer />
    </div>
  );
}

/* ---------------- Top bar ---------------- */
function TopBar({ screen, onBack }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 28px",
        borderBottom: `1px solid ${tokens.sandstoneDeep}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <GopuramMark />
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 22, letterSpacing: 0.5, color: tokens.maroonDeep, lineHeight: 1 }}>
            Darshan Setu
          </div>
          <div style={{ fontSize: 10, letterSpacing: 2, color: tokens.stone, textTransform: "uppercase", marginTop: 2 }}>
            Somnath · Dwarka · Ambaji · Pavagadh
          </div>
        </div>
      </div>
      {screen !== "gateway" && (
        <button onClick={onBack} className="ds-link-btn">
          <ArrowLeft size={15} style={{ marginRight: 6 }} />
          All gateways
        </button>
      )}
    </div>
  );
}

/* ---------------- Gateway / Landing ---------------- */
function Gateway({ onSelect }) {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 40px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: tokens.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
          Three Gates, One Darshan
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: tokens.maroonDeep, margin: 0, lineHeight: 1.1 }}>
          Choose your gate into the temple network
        </h1>
        <p style={{ maxWidth: 560, margin: "18px auto 0", color: tokens.inkSoft, fontSize: 16, lineHeight: 1.6 }}>
          Devotees book darshan and stay connected. Seva volunteers verify and register pilgrims at the gate.
          Empanelled vendors assign slots and help walk-ins across the city.
        </p>
      </div>

      <div className="ds-gate-grid">
        <GateCard
          icon={<UserRound size={26} color="#fff" />}
          title="Devotee"
          subtitle="For pilgrims &amp; families"
          desc="Book your darshan slot, track live queue times, upload your ID photo, and share your visit with 5 emergency contacts."
          cta="Enter as Devotee"
          accent={tokens.maroon}
          onClick={() => onSelect("devotee")}
        />
        <GateCard
          icon={<ShieldCheck size={26} color="#fff" />}
          title="Volunteer"
          subtitle="Seva Mitra · Temple staff"
          desc="Register walk-in devotees on the spot, verify pilgrim ID, and search the live pilgrim database."
          cta="Enter as Volunteer"
          accent={tokens.gold}
          dark
          onClick={() => onSelect("volunteer")}
        />
        <GateCard
          icon={<Store size={26} color="#fff" />}
          title="Vendor"
          subtitle="Empanelled city stalls"
          desc="Register offline devotees at your stall and assign them an available darshan slot in real time."
          cta="Enter as Vendor"
          accent={tokens.stone}
          onClick={() => onSelect("vendor")}
        />
      </div>
    </div>
  );
}

function GateCard({ icon, title, subtitle, desc, cta, accent, dark, onClick }) {
  return (
    <button onClick={onClick} className="ds-gate-card" style={{ "--accent": accent }}>
      <div className="ds-gate-arch" style={{ background: accent }}>
        {icon}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 24, color: tokens.maroonDeep }}>{title}</div>
      <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: tokens.stone, fontWeight: 600, marginTop: 2, marginBottom: 12 }}>
        {subtitle}
      </div>
      <div style={{ fontSize: 14, color: tokens.inkSoft, lineHeight: 1.55, minHeight: 66 }}>{desc}</div>
      <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: accent, fontWeight: 700, fontSize: 13, letterSpacing: 0.3 }}>
        {cta} <span style={{ transition: "transform .2s" }}>→</span>
      </div>
    </button>
  );
}

/* ---------------- Role panel router ---------------- */
function RolePanel({ role, mode, setMode, onBack }) {
  const config = {
    devotee: { title: "Devotee Gate", accent: tokens.maroon, icon: <UserRound size={22} color="#fff" /> },
    volunteer: { title: "Volunteer · Seva Mitra", accent: tokens.gold, icon: <ShieldCheck size={22} color="#fff" /> },
    vendor: { title: "Vendor Portal", accent: tokens.stone, icon: <Store size={22} color="#fff" /> },
  }[role];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 24px 60px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 44, height: 44, borderRadius: "12px 12px 4px 4px", background: config.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {config.icon}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: tokens.maroonDeep }}>{config.title}</div>
      </div>

      {mode !== "dashboard" && (
        <div className="ds-toggle">
          <button className={mode === "login" ? "ds-toggle-btn active" : "ds-toggle-btn"} style={{ "--accent": config.accent }} onClick={() => setMode("login")}>
            Log In
          </button>
          <button className={mode === "register" ? "ds-toggle-btn active" : "ds-toggle-btn"} style={{ "--accent": config.accent }} onClick={() => setMode("register")}>
            Register
          </button>
        </div>
      )}

      <div className="ds-card">
        {role === "devotee" && mode === "login" && <LoginForm accent={config.accent} label="Devotee" />}
        {role === "devotee" && mode === "register" && <DevoteeRegister accent={config.accent} onDone={() => setMode("login")} />}

        {role === "volunteer" && mode === "login" && <LoginForm accent={config.accent} label="Volunteer" onSuccess={() => setMode("dashboard")} />}
        {role === "volunteer" && mode === "register" && <VolunteerRegister accent={config.accent} onDone={() => setMode("login")} />}
        {role === "volunteer" && mode === "dashboard" && <VolunteerDashboard accent={config.accent} />}

        {role === "vendor" && mode === "login" && <LoginForm accent={config.accent} label="Vendor" onSuccess={() => setMode("dashboard")} />}
        {role === "vendor" && mode === "register" && <VendorRegister accent={config.accent} onDone={() => setMode("login")} />}
        {role === "vendor" && mode === "dashboard" && <VendorDashboard accent={config.accent} />}
      </div>
    </div>
  );
}

/* ---------------- Shared bits ---------------- */
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: tokens.inkSoft, marginBottom: 6, letterSpacing: 0.3 }}>{label}</label>
      {children}
    </div>
  );
}

function InputWithIcon({ icon, ...props }) {
  return (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: tokens.stone }}>{icon}</span>
      <input {...props} className="ds-input" style={{ paddingLeft: 38 }} />
    </div>
  );
}

function PrimaryButton({ accent, loading, children, ...props }) {
  return (
    <button
      {...props}
      disabled={loading}
      style={{
        width: "100%",
        background: accent,
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "14px 18px",
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: 0.4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        cursor: loading ? "default" : "pointer",
        opacity: loading ? 0.85 : 1,
        marginTop: 6,
      }}
    >
      {loading ? <Loader2 size={16} className="ds-spin" /> : children}
    </button>
  );
}

function useFakeSubmit(onDone) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      if (onDone) setTimeout(onDone, 900);
    }, 900);
  };
  return { loading, done, submit };
}

/* ---------------- Login (shared shape, per-role label) ---------------- */
function LoginForm({ accent, label, onSuccess }) {
  const { loading, done, submit } = useFakeSubmit(onSuccess);

  if (done) return <SuccessNote accent={accent} text={`Welcome back — ${label.toLowerCase()} session started.`} />;

  return (
    <form onSubmit={submit}>
      <Field label="Email Address">
        <InputWithIcon icon={<Mail size={16} />} type="email" placeholder="email@example.com" required className="ds-input" />
      </Field>
      <Field label="Password">
        <InputWithIcon icon={<Lock size={16} />} type="password" placeholder="Enter password" required className="ds-input" />
      </Field>
      <PrimaryButton accent={accent} loading={loading}>
        <ShieldCheck size={16} /> Log In Securely
      </PrimaryButton>
    </form>
  );
}

function SuccessNote({ accent, text }) {
  return (
    <div style={{ textAlign: "center", padding: "24px 8px" }}>
      <CheckCircle2 size={38} color={accent} />
      <div style={{ marginTop: 12, fontWeight: 700, color: tokens.ink }}>{text}</div>
    </div>
  );
}

/* ---------------- Devotee Register (mirrors register.tsx fields) ---------------- */
function DevoteeRegister({ accent, onDone }) {
  const [photo, setPhoto] = useState(null);
  const [relatives, setRelatives] = useState(["", "", "", "", ""]);
  const { loading, done, submit } = useFakeSubmit(onDone);

  const updateRelative = (i, v) => {
    const next = [...relatives];
    next[i] = v;
    setRelatives(next);
  };

  const onPickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  if (done) return <SuccessNote accent={accent} text="Account created — you're ready for darshan." />;

  return (
    <form onSubmit={submit}>
      <Field label="Full Name">
        <input required className="ds-input" placeholder="As per ID" />
      </Field>
      <Field label="Phone Number">
        <InputWithIcon icon={<Phone size={16} />} type="tel" placeholder="+91 9999999999" required className="ds-input" />
      </Field>
      <Field label="Email Address">
        <InputWithIcon icon={<Mail size={16} />} type="email" placeholder="email@example.com" required className="ds-input" />
      </Field>
      <Field label="Password">
        <InputWithIcon icon={<Lock size={16} />} type="password" placeholder="Secure password" required className="ds-input" />
      </Field>

      <div className="ds-subsection">
        <div className="ds-subsection-title">Emergency Protocol Setup</div>

        <Field label="Profile Photo (for identification)">
          <label className="ds-photo-upload">
            {photo ? (
              <img src={photo} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />
            ) : (
              <>
                <Camera size={26} color={tokens.maroonDeep} />
                <div style={{ fontWeight: 700, color: tokens.maroonDeep, fontSize: 13, marginTop: 6 }}>Tap to upload</div>
              </>
            )}
            <input type="file" accept="image/*" onChange={onPickPhoto} style={{ display: "none" }} />
          </label>
        </Field>

        <Field label="5 Emergency Relative Contacts">
          {relatives.map((rel, i) => (
            <input
              key={i}
              className="ds-input ds-input-sm"
              placeholder={`Relative ${i + 1} number`}
              value={rel}
              onChange={(e) => updateRelative(i, e.target.value)}
            />
          ))}
        </Field>
      </div>

      <PrimaryButton accent={accent} loading={loading}>
        <ShieldCheck size={16} /> Register Securely
      </PrimaryButton>
    </form>
  );
}

/* ---------------- Volunteer Register ---------------- */
function VolunteerRegister({ accent, onDone }) {
  const { loading, done, submit } = useFakeSubmit(onDone);
  if (done) return <SuccessNote accent={accent} text="Volunteer profile created — pending site admin approval." />;

  return (
    <form onSubmit={submit}>
      <Field label="Full Name">
        <input required className="ds-input" placeholder="As per staff ID" />
      </Field>
      <Field label="Staff ID">
        <InputWithIcon icon={<IdCard size={16} />} required className="ds-input" placeholder="e.g. GUJCOST-VOL-0142" />
      </Field>
      <Field label="Assigned Site">
        <select required className="ds-input" defaultValue="">
          <option value="" disabled>Select temple site</option>
          {SITES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>
      <Field label="Phone Number">
        <InputWithIcon icon={<Phone size={16} />} type="tel" required className="ds-input" placeholder="+91 9999999999" />
      </Field>
      <Field label="Email Address">
        <InputWithIcon icon={<Mail size={16} />} type="email" required className="ds-input" placeholder="email@example.com" />
      </Field>
      <Field label="Password">
        <InputWithIcon icon={<Lock size={16} />} type="password" required className="ds-input" placeholder="Secure password" />
      </Field>
      <PrimaryButton accent={accent} loading={loading}>
        <ShieldCheck size={16} /> Register as Volunteer
      </PrimaryButton>
    </form>
  );
}

/* ---------------- Vendor Register ---------------- */
function VendorRegister({ accent, onDone }) {
  const { loading, done, submit } = useFakeSubmit(onDone);
  if (done) return <SuccessNote accent={accent} text="Vendor profile created — pending empanelment check." />;

  return (
    <form onSubmit={submit}>
      <Field label="Vendor / Stall Name">
        <input required className="ds-input" placeholder="e.g. Shree Prasad Stores" />
      </Field>
      <Field label="Vendor ID">
        <InputWithIcon icon={<IdCard size={16} />} required className="ds-input" placeholder="e.g. VEN-2201" />
      </Field>
      <Field label="Zone / Location">
        <InputWithIcon icon={<MapPin size={16} />} required className="ds-input" placeholder="e.g. Somnath — East Approach Road" />
      </Field>
      <Field label="Phone Number">
        <InputWithIcon icon={<Phone size={16} />} type="tel" required className="ds-input" placeholder="+91 9999999999" />
      </Field>
      <Field label="Email Address">
        <InputWithIcon icon={<Mail size={16} />} type="email" required className="ds-input" placeholder="email@example.com" />
      </Field>
      <Field label="Password">
        <InputWithIcon icon={<Lock size={16} />} type="password" required className="ds-input" placeholder="Secure password" />
      </Field>
      <PrimaryButton accent={accent} loading={loading}>
        <ShieldCheck size={16} /> Register as Vendor
      </PrimaryButton>
    </form>
  );
}

/* ---------------- Volunteer Dashboard (mock) ---------------- */
function VolunteerDashboard({ accent }) {
  const [tab, setTab] = useState("register");
  return (
    <div>
      <div className="ds-toggle" style={{ marginBottom: 20 }}>
        <button className={tab === "register" ? "ds-toggle-btn active" : "ds-toggle-btn"} style={{ "--accent": accent }} onClick={() => setTab("register")}>
          Register Devotee
        </button>
        <button className={tab === "verify" ? "ds-toggle-btn active" : "ds-toggle-btn"} style={{ "--accent": accent }} onClick={() => setTab("verify")}>
          Verify ID
        </button>
        <button className={tab === "database" ? "ds-toggle-btn active" : "ds-toggle-btn"} style={{ "--accent": accent }} onClick={() => setTab("database")}>
          Pilgrim Database
        </button>
      </div>

      {tab === "register" && <OfflineDevoteeForm accent={accent} showSlot={false} />}

      {tab === "verify" && (
        <div>
          <Field label="Search by Phone Number or Devotee ID">
            <InputWithIcon icon={<Search size={16} />} className="ds-input" placeholder="e.g. +91 98765xxxxx or DEV-00231" />
          </Field>
          <div className="ds-mock-card">
            <IdCard size={20} color={accent} />
            <div style={{ marginLeft: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Match found: Priya Rawal</div>
              <div style={{ fontSize: 12, color: tokens.stone }}>DEV-00231 · Verified photo on file · Somnath 9:00 AM slot</div>
            </div>
          </div>
        </div>
      )}

      {tab === "database" && (
        <div>
          <Field label="Filter by Site">
            <select className="ds-input" defaultValue="">
              <option value="" disabled>All sites</option>
              {SITES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <div className="ds-table">
            <div className="ds-table-head">
              <span>Name</span><span>Site</span><span>Slot</span><span>Status</span>
            </div>
            {[
              ["Priya Rawal", "Somnath", "9:00 AM", "Checked in"],
              ["Ketan Bhatt", "Dwarka", "4:00 PM", "Pending"],
              ["Meena Solanki", "Ambaji", "6:00 AM", "Checked in"],
            ].map((row) => (
              <div className="ds-table-row" key={row[0]}>
                {row.map((cell, i) => <span key={i}>{cell}</span>)}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 12, color: tokens.stone }}>
            <Database size={14} /> Live database — connect your backend to replace this preview.
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Vendor Dashboard (mock) ---------------- */
function VendorDashboard({ accent }) {
  const [tab, setTab] = useState("register");
  return (
    <div>
      <div className="ds-toggle" style={{ marginBottom: 20 }}>
        <button className={tab === "register" ? "ds-toggle-btn active" : "ds-toggle-btn"} style={{ "--accent": accent }} onClick={() => setTab("register")}>
          Register Devotee
        </button>
        <button className={tab === "slot" ? "ds-toggle-btn active" : "ds-toggle-btn"} style={{ "--accent": accent }} onClick={() => setTab("slot")}>
          Assign Slot
        </button>
      </div>

      {tab === "register" && <OfflineDevoteeForm accent={accent} showSlot={true} />}

      {tab === "slot" && (
        <div>
          <Field label="Devotee Phone Number">
            <InputWithIcon icon={<Phone size={16} />} className="ds-input" placeholder="+91 9999999999" />
          </Field>
          <Field label="Site">
            <select className="ds-input" defaultValue="">
              <option value="" disabled>Select site</option>
              {SITES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Available Slot">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 8 }}>
              {SLOTS.map((s) => (
                <label key={s} className="ds-slot-pill">
                  <input type="radio" name="slot" value={s} style={{ marginRight: 6 }} />
                  <Clock3 size={13} style={{ marginRight: 4 }} /> {s}
                </label>
              ))}
            </div>
          </Field>
          <PrimaryButton accent={accent}>
            <CheckCircle2 size={16} /> Assign Slot
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

function OfflineDevoteeForm({ accent, showSlot }) {
  const { loading, done, submit } = useFakeSubmit(null);
  if (done) return <SuccessNote accent={accent} text="Devotee registered offline and added to the database." />;
  return (
    <form onSubmit={submit}>
      <Field label="Devotee Full Name">
        <input required className="ds-input" placeholder="As told at the counter" />
      </Field>
      <Field label="Phone Number">
        <InputWithIcon icon={<Phone size={16} />} type="tel" required className="ds-input" placeholder="+91 9999999999" />
      </Field>
      <Field label="Site">
        <select required className="ds-input" defaultValue="">
          <option value="" disabled>Select temple site</option>
          {SITES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      {showSlot && (
        <Field label="Darshan Slot">
          <select className="ds-input" defaultValue="">
            <option value="" disabled>Select slot</option>
            {SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      )}
      <PrimaryButton accent={accent} loading={loading}>
        <ShieldCheck size={16} /> Register Devotee
      </PrimaryButton>
    </form>
  );
}

/* ---------------- Decorative gopuram mark ---------------- */
function GopuramMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path d="M17 2 L23 10 H11 Z" fill={tokens.gold} />
      <rect x="12.5" y="10" width="9" height="6" fill={tokens.maroon} />
      <path d="M17 8 L21.5 16 H12.5 Z" fill={tokens.goldLight} />
      <rect x="9" y="16" width="16" height="9" rx="1" fill={tokens.maroonDeep} />
      <rect x="13" y="19" width="8" height="6" fill={tokens.sandstone} />
    </svg>
  );
}

function Footer() {
  return (
    <div style={{ textAlign: "center", padding: "20px 24px 32px", fontSize: 11, color: tokens.stone, letterSpacing: 0.5 }}>
      Government of Gujarat · GUJCOST, Dept. of Science &amp; Technology — Temple &amp; Pilgrimage Crowd Management
    </div>
  );
}

/* ---------------- Global styles ---------------- */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

      .ds-link-btn {
        display:flex; align-items:center; background:none; border:none; cursor:pointer;
        color:${tokens.maroonDeep}; font-weight:700; font-size:13px; letter-spacing:0.3px;
      }
      .ds-gate-grid {
        display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:24px;
      }
      .ds-gate-card {
        background:#fff; border:1px solid ${tokens.sandstoneDeep}; border-radius:16px;
        padding:28px 22px 24px; text-align:center; cursor:pointer;
        transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;
      }
      .ds-gate-card:hover {
        transform:translateY(-4px);
        box-shadow:0 16px 32px rgba(74,18,30,0.12);
        border-color:var(--accent);
      }
      .ds-gate-card:hover span { transform:translateX(3px); display:inline-block; }
      .ds-gate-arch {
        width:64px; height:64px; margin:0 auto 16px;
        border-radius:44px 44px 8px 8px;
        display:flex; align-items:center; justify-content:center;
      }
      .ds-card {
        background:#fff; border:1px solid ${tokens.sandstoneDeep}; border-radius:16px; padding:28px;
        box-shadow:0 10px 24px rgba(74,18,30,0.06);
      }
      .ds-toggle {
        display:flex; background:${tokens.sandstoneDeep}; border-radius:10px; padding:4px; margin-bottom:20px;
      }
      .ds-toggle-btn {
        flex:1; border:none; background:transparent; padding:10px 8px; border-radius:8px;
        font-weight:700; font-size:12.5px; letter-spacing:0.3px; color:${tokens.inkSoft}; cursor:pointer;
      }
      .ds-toggle-btn.active { background:var(--accent); color:#fff; }
      .ds-input {
        width:100%; box-sizing:border-box; background:${tokens.sandstone}; border:1px solid ${tokens.sandstoneDeep};
        border-radius:10px; padding:13px 14px; font-size:14px; color:${tokens.ink}; font-family:inherit;
      }
      .ds-input:focus { outline:2px solid ${tokens.gold}; outline-offset:1px; }
      .ds-input-sm { padding:10px 12px; margin-bottom:8px; font-size:13px; }
      .ds-subsection {
        margin:18px 0 6px; padding-top:16px; border-top:1px dashed ${tokens.sandstoneDeep};
      }
      .ds-subsection-title {
        font-family:'Cormorant Garamond',serif; font-weight:700; font-size:17px; color:${tokens.maroonDeep};
        text-align:center; margin-bottom:14px;
      }
      .ds-photo-upload {
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        height:120px; border:1px dashed ${tokens.maroon}; border-radius:10px; background:${tokens.sandstone};
        cursor:pointer; overflow:hidden;
      }
      .ds-mock-card {
        display:flex; align-items:center; background:${tokens.sandstone}; border:1px solid ${tokens.sandstoneDeep};
        border-radius:10px; padding:14px 16px; margin-top:14px;
      }
      .ds-table { border:1px solid ${tokens.sandstoneDeep}; border-radius:10px; overflow:hidden; margin-top:6px; }
      .ds-table-head, .ds-table-row {
        display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; padding:10px 14px; font-size:13px;
      }
      .ds-table-head { background:${tokens.sandstoneDeep}; font-weight:700; color:${tokens.inkSoft}; font-size:11px; text-transform:uppercase; letter-spacing:0.4px; }
      .ds-table-row { border-top:1px solid ${tokens.sandstoneDeep}; }
      .ds-table-row:nth-child(even) { background:#fbf7ef; }
      .ds-slot-pill {
        display:flex; align-items:center; border:1px solid ${tokens.sandstoneDeep}; border-radius:20px;
        padding:8px 12px; font-size:12.5px; cursor:pointer; background:${tokens.sandstone};
      }
      .ds-spin { animation:ds-spin 0.9s linear infinite; }
      @keyframes ds-spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    `}</style>
  );
}
