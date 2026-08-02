import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function DashboardLayout() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        collapsed={!isMobile && collapsed}
        mobileOpen={isMobile && mobileOpen}
        onNavigate={() => setMobileOpen(false)}
      />
      <div className={`app-main ${!isMobile && collapsed ? "sidebar-collapsed" : ""}`}>
        <Navbar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          onToggleMobile={() => setMobileOpen((o) => !o)}
        />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
