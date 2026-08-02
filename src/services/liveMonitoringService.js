import { mockRequest } from "./apiClient";
import {
  summaryMock,
  crowdTrendMock,
  zoneDensityMock,
  systemHealthMock,
  activityFeedMock,
  heatmapMock,
} from "./mockData/liveMonitoringData";

export const liveMonitoringService = {
  getSummary: () => mockRequest(summaryMock),
  getCrowdTrend: () => mockRequest(crowdTrendMock),
  getZoneDensity: () => mockRequest(zoneDensityMock),
  getSystemHealth: () => mockRequest(systemHealthMock),
  getActivityFeed: () => mockRequest(activityFeedMock),
  getHeatmap: () => mockRequest(heatmapMock),

  // Real backend equivalents (uncomment when the API exists):
  // getSummary: () => apiFetch('/live-monitoring/summary'),
  // getCrowdTrend: () => apiFetch('/live-monitoring/crowd-trend'),
};
