import { jitter, clamp, randomInt, randomChoice, timeAgo } from "./generators";

const ZONES = ["Zone A", "Zone B", "Zone C — VIP", "Zone D"];
const VEHICLE_TYPES = ["Car", "Two-Wheeler", "Bus", "Auto"];

export function parkingSummaryMock() {
  return {
    occupancyPct: Math.round(clamp(jitter(44, 5), 10, 96)),
    totalSlots: 320,
    availableSlots: randomInt(90, 170),
    vipOccupied: randomInt(6, 20),
    vipTotal: 24,
  };
}

export function parkingHeatmapMock() {
  return ZONES.map((zone) => ({
    zone,
    occupancyPct: Math.round(clamp(jitter(55, 25), 10, 98)),
  }));
}

export function vehicleAnalyticsMock() {
  return VEHICLE_TYPES.map((type) => ({ type, count: randomInt(30, 620) }));
}

export function parkingHistoryMock() {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `pk-${i}`,
    plate: `GJ ${randomInt(1, 30).toString().padStart(2, "0")} ${randomChoice(["AB", "CD", "EF", "XY"])} ${randomInt(1000, 9999)}`,
    zone: randomChoice(ZONES),
    type: randomChoice(VEHICLE_TYPES),
    entryTime: timeAgo(randomInt(20, 400)),
    status: randomChoice(["Parked", "Exited"]),
  }));
}
