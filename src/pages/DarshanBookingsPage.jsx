import React from "react";
import { CalendarCheck, ShieldCheck, Percent, Clock3 } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import BookingListTable from "../components/bookings/BookingListTable";
import SlotAvailabilityPanel from "../components/bookings/SlotAvailabilityPanel";
import VerificationPanel from "../components/gates/VerificationPanel";
import { usePolling } from "../hooks/usePolling";
import { bookingsService } from "../services/bookingsService";
import { liveMonitoringService } from "../services/liveMonitoringService";

export default function DarshanBookingsPage() {
  const { data: bookings, loading: bookingsLoading } = usePolling(bookingsService.getBookings, { interval: 7000 });
  const { data: slots, loading: slotsLoading } = usePolling(bookingsService.getSlotAvailability, { interval: 8000 });
  const { data: analytics, loading: analyticsLoading } = usePolling(bookingsService.getAnalytics, { interval: 9000 });
  const { data: summary, loading: summaryLoading } = usePolling(liveMonitoringService.getSummary, { interval: 5000 });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Darshan Bookings</h1>
          <p className="page-subtitle">Slot bookings, VIP allocation, live queue status, and booking analytics.</p>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <StatCard
          label="Bookings Today"
          value={analytics ? analytics.totalToday.toLocaleString() : "—"}
          icon={CalendarCheck}
          accent="var(--gold)"
          loading={analyticsLoading}
        />
        <StatCard
          label="VIP Bookings"
          value={analytics ? analytics.vipCount : "—"}
          icon={ShieldCheck}
          accent="var(--maroon-bright)"
          loading={analyticsLoading}
        />
        <StatCard
          label="No-Show Rate"
          value={analytics ? `${analytics.noShowPct}%` : "—"}
          icon={Percent}
          accent="var(--warning)"
          loading={analyticsLoading}
        />
        <StatCard
          label="Live Queue Status"
          value={summary ? summary.queueLength : "—"}
          icon={Clock3}
          accent="var(--info)"
          sublabel={summary ? `~${summary.queueWaitMinutes} min wait` : ""}
          loading={summaryLoading}
        />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", gap: 18, marginBottom: 18, alignItems: "start" }}>
        <SlotAvailabilityPanel data={slots} loading={slotsLoading} />
        <VerificationPanel />
      </div>

      <BookingListTable data={bookings} loading={bookingsLoading} />
    </div>
  );
}
