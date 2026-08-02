import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Users, ArrowLeftRight } from "lucide-react";
import { NAV_SECTIONS } from "../../constants/nav";
import TempleMark from "./TempleMark";
import PulseDot from "../ui/PulseDot";
import { useAppState } from "../../context/AppStateContext";

export default function Sidebar({ collapsed, mobileOpen, onNavigate }) {
  const { selectedTemple } = useAppState();
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">
          <TempleMark />
        </div>
        {!collapsed && (
          <div>
            <div className="sidebar-brand-text-title">Temple Flow</div>
            <div className="sidebar-brand-text-sub">Command System</div>
          </div>
        )}
      </div>

      {!collapsed && selectedTemple && (
        <div className="sidebar-temple-badge">
          <span className="sidebar-temple-dot" style={{ background: selectedTemple.accent }} />
          <div style={{ minWidth: 0 }}>
            <div className="sidebar-temple-label">Managing</div>
            <div className="sidebar-temple-name">{selectedTemple.name}</div>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && <div className="sidebar-section-label">{section.label}</div>}
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={onNavigate}
                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} />
                {!collapsed && item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <>
            <div className="sidebar-status-row">
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <PulseDot /> System Status
              </span>
              <span className="sidebar-status-value" style={{ color: "var(--success)" }}>Online</span>
            </div>
            <div className="sidebar-status-row">
              <span>Active Cameras</span>
              <span className="sidebar-status-value">7/8</span>
            </div>
            <div className="sidebar-status-row">
              <span>AI Models</span>
              <span className="sidebar-status-value">4 Active</span>
            </div>

            <div className="sidebar-visitors-card">
              <div className="sidebar-visitors-label">
                <Users size={12} /> Current Visitors
              </div>
              <div className="sidebar-visitors-value">3,840</div>
              <div className="sidebar-visitors-delta">↑ 12% from yesterday</div>
            </div>

            <button className="sidebar-switch-temple-btn" onClick={() => navigate("/select-temple")}>
              <ArrowLeftRight size={13} /> Switch Temple
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
