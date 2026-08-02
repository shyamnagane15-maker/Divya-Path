import { mockRequest } from "./apiClient";
import { gateStatusMock, entryLogsMock, exitLogsMock, visitorFlowMock } from "./mockData/gatesData";

export const gatesService = {
  getGateStatus: () => mockRequest(gateStatusMock),
  getEntryLogs: () => mockRequest(entryLogsMock),
  getExitLogs: () => mockRequest(exitLogsMock),
  getVisitorFlow: () => mockRequest(visitorFlowMock),
  toggleAutoControl: (gateId, enabled) => mockRequest({ gateId, autoControl: enabled }, { delay: 400 }),
};
