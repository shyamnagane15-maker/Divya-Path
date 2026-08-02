import { randomInt, randomChoice, timeAgo } from "./generators";

const EVENTS = [
  { text: "Unattended baggage detected in Main Hall", severity: "critical", source: "Camera-07, Zone-A" },
  { text: "Crowd density approaching threshold in Entry Gate", severity: "warning", source: "Sensor-Grid-12" },
  { text: "New parking slot allocated for VIP section", severity: "info", source: "Parking-Zone-B" },
  { text: "Suspicious object detected near Entry Gate", severity: "critical", source: "Camera-03, Zone-B" },
  { text: "AI model retrained with new crowd patterns", severity: "info", source: "Edge-Node-01" },
  { text: "Queue wait time exceeding threshold", severity: "warning", source: "Virtual-Queue-System" },
];

export function securityEventsMock() {
  return EVENTS.map((e, i) => ({
    id: `evt-${i}`,
    ...e,
    status: randomChoice(["pending", "pending", "acknowledged", "resolved"]),
    time: timeAgo(randomInt(1, 60)),
    note:
      i % 3 === 1
        ? "Security team deployed. Object identified as lost item. All clear."
        : i % 3 === 2
        ? "Additional staff deployed. Situation resolved."
        : "",
  }));
}

export function anomalySummaryMock() {
  return {
    critical: EVENTS.filter((e) => e.severity === "critical").length,
    warning: EVENTS.filter((e) => e.severity === "warning").length,
    info: EVENTS.filter((e) => e.severity === "info").length,
    objectDetectionActive: true,
    crowdViolationAlerts: randomInt(0, 3),
  };
}
