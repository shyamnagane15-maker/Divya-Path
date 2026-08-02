import { jitter, clamp, randomInt, randomChoice, timeAgo } from "./generators";

const ZONES = ["Main Hall", "Entry Gate", "Sacred Pathway", "Exit Area", "Parking Area", "East Corridor"];

export function summaryMock() {
  return {
    crowdDensity: clamp(jitter(61, 6), 20, 96),
    totalVisitors: randomInt(3600, 4100),
    visitorsDeltaPct: jitter(12, 2),
    queueLength: randomInt(0, 14),
    queueWaitMinutes: randomInt(0, 22),
    parkingOccupancyPct: clamp(jitter(44, 4), 10, 95),
    parkingSlotsFree: randomInt(90, 160),
    lastUpdated: new Date().toISOString(),
  };
}

export function crowdTrendMock() {
  const hours = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  let val = 18;
  return hours.map((h) => {
    val = clamp(val + randomInt(-4, 10), 10, 95);
    return { time: h, density: val };
  });
}

export function zoneDensityMock() {
  return ZONES.map((zone) => {
    const pct = clamp(jitter(55, 20), 20, 95);
    const level = pct >= 75 ? "High" : pct >= 50 ? "Medium" : "Low";
    return { zone, pct: Math.round(pct), level };
  });
}

export function systemHealthMock() {
  return {
    status: "Online",
    activeCameras: 7,
    totalCameras: 8,
    aiModelsActive: 4,
    activeAlerts: randomInt(0, 3),
    edgeDevicesOnline: 11,
    edgeDevicesTotal: 12,
  };
}

const FEED_TEMPLATES = [
  { text: "Unattended baggage flagged in Main Hall", tone: "danger" },
  { text: "Crowd density approaching threshold at Entry Gate", tone: "warning" },
  { text: "New parking slot allocated to VIP section", tone: "info" },
  { text: "Gate 3 auto-opened for scheduled Aarti crowd", tone: "success" },
  { text: "AI model retrained with new crowd patterns", tone: "info" },
  { text: "Volunteer checked in 6 offline devotees at Stall 2", tone: "success" },
];

export function activityFeedMock() {
  return FEED_TEMPLATES.map((item, i) => ({
    id: `feed-${i}`,
    ...item,
    zone: ZONES[i % ZONES.length],
    time: timeAgo(randomInt(1, 40)),
  })).sort(() => Math.random() - 0.5);
}

export function heatmapMock() {
  // 8x6 intensity grid, 0-1
  return Array.from({ length: 8 * 6 }, () => +Math.random().toFixed(2));
}
