import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import RequireAuth from "./components/routing/RequireAuth";
import RequireTemple from "./components/routing/RequireTemple";

import LoginPage from "./pages/LoginPage";
import SelectTemplePage from "./pages/SelectTemplePage";
import LiveMonitoringPage from "./pages/LiveMonitoringPage";
import CCTVFeedsPage from "./pages/CCTVFeedsPage";
import AIPredictionsPage from "./pages/AIPredictionsPage";
import ControlsPage from "./pages/ControlsPage";
import ParkingPage from "./pages/ParkingPage";
import SmartGatesPage from "./pages/SmartGatesPage";
import DarshanBookingsPage from "./pages/DarshanBookingsPage";
import SecurityPage from "./pages/SecurityPage";

export default function App() {
  return (
    <Routes>
      {/* Public entry point */}
      <Route path="/" element={<LoginPage />} />

      {/* Requires login */}
      <Route element={<RequireAuth />}>
        <Route path="/select-temple" element={<SelectTemplePage />} />

        {/* Requires login AND a selected temple */}
        <Route element={<RequireTemple />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<LiveMonitoringPage />} />
            <Route path="cctv-feeds" element={<CCTVFeedsPage />} />
            <Route path="ai-predictions" element={<AIPredictionsPage />} />
            <Route path="controls" element={<ControlsPage />} />
            <Route path="parking" element={<ParkingPage />} />
            <Route path="smart-gates" element={<SmartGatesPage />} />
            <Route path="darshan-bookings" element={<DarshanBookingsPage />} />
            <Route path="security" element={<SecurityPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
