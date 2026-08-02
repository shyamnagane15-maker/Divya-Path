import { mockRequest } from "./apiClient";
import { securityEventsMock, anomalySummaryMock } from "./mockData/securityData";

let events = securityEventsMock();

export const securityService = {
  getEvents: () => mockRequest(events),
  getAnomalySummary: () => mockRequest(anomalySummaryMock),
  acknowledgeEvent: (id) => {
    events = events.map((e) => (e.id === id ? { ...e, status: "acknowledged" } : e));
    return mockRequest(events, { delay: 350 });
  },
  resolveEvent: (id) => {
    events = events.map((e) => (e.id === id ? { ...e, status: "resolved" } : e));
    return mockRequest(events, { delay: 350 });
  },
};
