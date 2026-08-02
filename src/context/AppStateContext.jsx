import React, { createContext, useContext, useState } from "react";

const AUTH_KEY = "templeflow_auth";
const TEMPLE_KEY = "templeflow_selected_temple";

const AppStateContext = createContext(null);

function readAuth() {
  try {
    return localStorage.getItem(AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

function readTemple() {
  try {
    const raw = localStorage.getItem(TEMPLE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AppStateProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readAuth);
  const [selectedTemple, setSelectedTemple] = useState(readTemple);

  const login = () => {
    try {
      localStorage.setItem(AUTH_KEY, "true");
    } catch {
      /* localStorage unavailable — session still works in-memory */
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(TEMPLE_KEY);
    } catch {
      /* noop */
    }
    setIsAuthenticated(false);
    setSelectedTemple(null);
  };

  const selectTemple = (temple) => {
    try {
      localStorage.setItem(TEMPLE_KEY, JSON.stringify(temple));
    } catch {
      /* noop */
    }
    setSelectedTemple(temple);
  };

  const clearTemple = () => {
    try {
      localStorage.removeItem(TEMPLE_KEY);
    } catch {
      /* noop */
    }
    setSelectedTemple(null);
  };

  return (
    <AppStateContext.Provider value={{ isAuthenticated, login, logout, selectedTemple, selectTemple, clearTemple }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within an AppStateProvider");
  return ctx;
}
