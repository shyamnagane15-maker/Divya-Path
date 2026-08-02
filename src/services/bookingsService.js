import { mockRequest } from "./apiClient";
import { bookingListMock, slotAvailabilityMock, bookingAnalyticsMock } from "./mockData/bookingsData";

export const bookingsService = {
  getBookings: () => mockRequest(bookingListMock),
  getSlotAvailability: () => mockRequest(slotAvailabilityMock),
  getAnalytics: () => mockRequest(bookingAnalyticsMock),
  verifyQR: (code) => mockRequest({ code, valid: Math.random() > 0.1 }, { delay: 500 }),
};
