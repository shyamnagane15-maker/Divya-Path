import { jitter, clamp, randomInt, randomChoice } from "./generators";

export function crowdPredictionMock() {
  const current = clamp(jitter(65, 5), 20, 95);
  const nextHour = clamp(current + jitter(0, 8), 15, 98);
  return {
    currentDensityPct: Math.round(current),
    nextHourDensityPct: Math.round(nextHour),
    trendVsYesterdayPct: jitter(12, 3),
    confidencePct: Math.round(clamp(jitter(91, 4), 70, 99)),
  };
}

export function rushHourForecastMock() {
  const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  return hours.map((time) => ({
    time,
    predicted: Math.round(clamp(jitter(55, 25), 10, 98)),
  }));
}

export function queuePredictionMock() {
  return {
    predictedWaitMinutes: randomInt(4, 28),
    predictedQueueLength: randomInt(0, 40),
    recommendedGate: randomChoice(["Gate 2 — East", "Gate 3 — Sacred Pathway", "Gate 1 — Main"]),
    confidencePct: Math.round(clamp(jitter(88, 5), 65, 99)),
  };
}

export function modelHealthMock() {
  return {
    modelName: "CrowdNet-v3.2",
    accuracyPct: +clamp(jitter(97.6, 0.6), 90, 99.9).toFixed(1),
    latencyMs: randomInt(80, 210),
    lastRetrained: "25 minutes ago",
    status: "Healthy",
    edgeNode: "Edge-Node-01",
  };
}

export function predictionHistoryMock() {
  return Array.from({ length: 6 }, (_, i) => {
    const predicted = randomInt(40, 90);
    const actual = clamp(predicted + randomInt(-8, 8), 10, 99);
    return {
      id: `pred-${i}`,
      timeframe: `${9 + i}:00 – ${10 + i}:00`,
      predicted,
      actual,
      deviation: Math.abs(predicted - actual),
    };
  });
}
