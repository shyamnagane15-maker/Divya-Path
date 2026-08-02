import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppState } from "../../context/AppStateContext";

export default function RequireTemple() {
  const { isAuthenticated, selectedTemple } = useAppState();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (!selectedTemple) return <Navigate to="/select-temple" replace />;
  return <Outlet />;
}
