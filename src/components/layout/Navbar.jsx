import React, { useState } from "react";
import { Menu, PanelLeftClose, PanelLeft, Bell } from "lucide-react";
import PulseDot from "../ui/PulseDot";
import NotificationsPanel from "../notifications/NotificationsPanel";
import { useAppState } from "../../context/AppStateContext";

export default function Navbar({ onToggleMobile, onToggleCollapse, collapsed }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const { selectedTemple } = useAppState();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="navbar-menu-btn" onClick={onToggleMobile} aria-label="Open menu">
          <Menu size={18} />
        </button>
        <button className="icon-btn" onClick={onToggleCollapse} aria-label="Toggle sidebar" style={{ flexShrink: 0 }}>
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
        {selectedTemple && (
          <div className="navbar-temple-pill">
            <span className="sidebar-temple-dot" style={{ background: selectedTemple.accent }} />
            {selectedTemple.name}
          </div>
        )}
        <div className="navbar-search">
          <SearchIcon />
          <input placeholder="Search visitors, bookings, cameras…" />
        </div>
      </div>

      <div className="navbar-right">
        <div className="live-pill">
          <PulseDot />
          Live System Active
        </div>

        <div style={{ position: "relative" }}>
          <button className="icon-btn" onClick={() => setNotifOpen((o) => !o)} aria-label="Notifications">
            <Bell size={16} />
            <span className="icon-btn-badge">3</span>
          </button>
          {notifOpen && <NotificationsPanel onClose={() => setNotifOpen(false)} />}
        </div>

        <div className="navbar-avatar">SC</div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
