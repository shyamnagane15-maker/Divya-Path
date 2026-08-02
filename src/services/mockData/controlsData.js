export function controlStatesMock() {
  return {
    gates: [
      { id: "gate-1", name: "Gate 1 — Main Entry", open: true },
      { id: "gate-2", name: "Gate 2 — East", open: true },
      { id: "gate-3", name: "Gate 3 — Sacred Pathway", open: false },
      { id: "gate-4", name: "Gate 4 — VIP", open: false },
    ],
    lighting: [
      { id: "light-main", name: "Main Hall", on: true, brightness: 80 },
      { id: "light-path", name: "Sacred Pathway", on: true, brightness: 60 },
      { id: "light-park", name: "Parking Area", on: true, brightness: 100 },
    ],
    queueControl: { paused: false, activeCounters: 6, totalCounters: 8 },
    parkingBarrier: { open: true },
    crowdDiversion: { active: false, target: "Sacred Pathway → East Corridor" },
    bellSchedule: [
      { id: "bell-1", label: "Mangala Aarti", time: "05:30" },
      { id: "bell-2", label: "Madhyahna Aarti", time: "12:00" },
      { id: "bell-3", label: "Sandhya Aarti", time: "19:00" },
    ],
    maintenance: { mode: false, note: "" },
  };
}
