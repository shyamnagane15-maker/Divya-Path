import { mockRequest } from "./apiClient";
import { cameraFeedsMock } from "./mockData/cctvData";

export const cctvService = {
  getFeeds: () => mockRequest(cameraFeedsMock),
};
