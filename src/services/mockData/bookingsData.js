import { randomInt, randomChoice, timeAgo } from "./generators";

const NAMES = ["Priya Rawal", "Ketan Bhatt", "Meena Solanki", "Arjun Nair", "Divya Shah", "Rohit Patel", "Sneha Joshi", "Manav Desai"];
const SITES = ["Somnath", "Dwarka", "Ambaji", "Pavagadh"];
const SLOTS = ["6:00–7:00 AM", "9:00–10:00 AM", "12:00–1:00 PM", "4:00–5:00 PM", "7:00–8:00 PM"];

export function bookingListMock() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `BK-${1000 + i}`,
    name: randomChoice(NAMES),
    site: randomChoice(SITES),
    slot: randomChoice(SLOTS),
    type: randomChoice(["Regular", "Regular", "VIP"]),
    status: randomChoice(["Confirmed", "Confirmed", "Pending", "Checked In"]),
    bookedAt: timeAgo(randomInt(5, 600)),
  }));
}

export function slotAvailabilityMock() {
  return SLOTS.map((slot) => ({
    slot,
    capacity: 500,
    booked: randomInt(120, 490),
  }));
}

export function bookingAnalyticsMock() {
  return {
    totalToday: randomInt(2800, 4200),
    vipCount: randomInt(40, 120),
    noShowPct: +(Math.random() * 8).toFixed(1),
    peakSlot: randomChoice(SLOTS),
  };
}
