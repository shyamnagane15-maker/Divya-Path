import { mockRequest } from "./apiClient";
import {
  crowdPredictionMock,
  rushHourForecastMock,
  queuePredictionMock,
  modelHealthMock,
  predictionHistoryMock,
} from "./mockData/aiData";

/**
 * aiService.js
 * -----------------------------------------------------------------------
 * Central abstraction for every AI-driven card in the dashboard. No
 * component should ever hardcode a prediction value — it calls one of
 * these methods instead. When the real model-serving endpoint exists,
 * only this file changes (mockRequest -> apiFetch).
 * -----------------------------------------------------------------------
 */
export const aiService = {
  getCrowdPrediction: () => mockRequest(crowdPredictionMock),
  getRushHourForecast: () => mockRequest(rushHourForecastMock),
  getQueuePrediction: () => mockRequest(queuePredictionMock),
  getModelHealth: () => mockRequest(modelHealthMock),
  getPredictionHistory: () => mockRequest(predictionHistoryMock),

  // Stub — activates once edge camera hardware is connected; the Smart
  // Gates page references this endpoint so the wiring is ready ahead of time.
  verifyFaceMatch: (imagePayload) =>
    mockRequest({ matched: false, reason: "Face recognition hardware not yet connected." }, { delay: 300 }),

  // Real backend equivalents:
  // getCrowdPrediction: () => apiFetch('/ai/crowd-prediction'),
  // getModelHealth: () => apiFetch('/ai/model-health'),
};
