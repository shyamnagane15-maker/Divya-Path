import { randomInt, randomChoice, timeAgo } from "./generators";

export function gateStatusMock() {
  return [
    { id: "gate-1", name: "Gate 1 — Main Entry", status: "Open", mode: "Auto", throughputPerMin: randomInt(20, 60) },
    { id: "gate-2", name: "Gate 2 — East", status: "Open", mode: "Auto", throughputPerMin: randomInt(10, 40) },
    { id: "gate-3", name: "Gate 3 — Sacred Pathway", status: "Closed", mode: "Manual", throughputPerMin: 0 },
    { id: "gate-4", name: "Gate 4 — VIP", status: "Closed", mode: "Manual", throughputPerMin: 0 },
  ];
}

const NAMES = ["Priya Rawal", "Ketan Bhatt", "Meena Solanki", "Arjun Nair", "Divya Shah", "Rohit Patel"];

export function entryLogsMock() {
  return Array.from({ length: 7 }, (_, i) => ({
    id: `entry-${i}`,
    name: randomChoice(NAMES),
    method: randomChoice(["QR Code", "RFID Card", "Face Recognition"]),
    gate: randomChoice(["Gate 1", "Gate 2", "Gate 4 — VIP"]),
    time: timeAgo(randomInt(1, 90)),
    result: randomChoice(["Verified", "Verified", "Verified", "Flagged"]),
  }));
}

export function exitLogsMock() {
  return Array.from({ length: 6 }, (_, i) => ({
    id: `exit-${i}`,
    name: randomChoice(NAMES),
    gate: randomChoice(["Gate 1", "Gate 2"]),
    time: timeAgo(randomInt(1, 90)),
    durationMinutes: randomInt(20, 140),
  }));
}

export function visitorFlowMock() {
  const hours = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
  return hours.map((time) => ({
    time,
    entries: randomInt(50, 400),
    exits: randomInt(40, 380),
  }));
}
