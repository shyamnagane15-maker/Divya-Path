import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppState } from "../../context/AppStateContext";

export default function RequireAuth() {
  const { isAuthenticated } = useAppState();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}
