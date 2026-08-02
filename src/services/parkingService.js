import { mockRequest } from "./apiClient";
import {
  parkingSummaryMock,
  parkingHeatmapMock,
  vehicleAnalyticsMock,
  parkingHistoryMock,
} from "./mockData/parkingData";

export const parkingService = {
  getSummary: () => mockRequest(parkingSummaryMock),
  getHeatmap: () => mockRequest(parkingHeatmapMock),
  getVehicleAnalytics: () => mockRequest(vehicleAnalyticsMock),
  getHistory: () => mockRequest(parkingHistoryMock),
};
