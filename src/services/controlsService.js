import { mockRequest } from "./apiClient";
import { controlStatesMock } from "./mockData/controlsData";

// Held in memory so toggles persist across a session in this mock layer.
let state = controlStatesMock();

export const controlsService = {
  getState: () => mockRequest(state, { delay: 350 }),

  toggleGate: (gateId) => {
    state = {
      ...state,
      gates: state.gates.map((g) => (g.id === gateId ? { ...g, open: !g.open } : g)),
    };
    return mockRequest(state, { delay: 500 });
  },

  toggleLight: (lightId) => {
    state = {
      ...state,
      lighting: state.lighting.map((l) => (l.id === lightId ? { ...l, on: !l.on } : l)),
    };
    return mockRequest(state, { delay: 400 });
  },

  setLightBrightness: (lightId, brightness) => {
    state = {
      ...state,
      lighting: state.lighting.map((l) => (l.id === lightId ? { ...l, brightness } : l)),
    };
    return mockRequest(state, { delay: 250 });
  },

  toggleQueuePause: () => {
    state = { ...state, queueControl: { ...state.queueControl, paused: !state.queueControl.paused } };
    return mockRequest(state, { delay: 400 });
  },

  adjustQueueCounters: (delta) => {
    const next = Math.max(1, Math.min(state.queueControl.totalCounters, state.queueControl.activeCounters + delta));
    state = { ...state, queueControl: { ...state.queueControl, activeCounters: next } };
    return mockRequest(state, { delay: 300 });
  },

  toggleParkingBarrier: () => {
    state = { ...state, parkingBarrier: { open: !state.parkingBarrier.open } };
    return mockRequest(state, { delay: 400 });
  },

  toggleCrowdDiversion: () => {
    state = { ...state, crowdDiversion: { ...state.crowdDiversion, active: !state.crowdDiversion.active } };
    return mockRequest(state, { delay: 400 });
  },

  sendEmergencyBroadcast: (message) => {
    return mockRequest({ sent: true, message, timestamp: new Date().toISOString() }, { delay: 600 });
  },

  toggleMaintenanceMode: (note) => {
    state = { ...state, maintenance: { mode: !state.maintenance.mode, note: note || "" } };
    return mockRequest(state, { delay: 400 });
  },

  // Real backend equivalents:
  // toggleGate: (gateId) => apiFetch(`/controls/gates/${gateId}/toggle`, { method: 'POST' }),
};
