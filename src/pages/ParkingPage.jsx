import React from "react";
import { ParkingSquare, CarFront, ShieldCheck, LayoutGrid, BarChart3, History } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import ParkingZoneHeatmap from "../components/parking/ParkingZoneHeatmap";
import VehicleAnalyticsChart from "../components/parking/VehicleAnalyticsChart";
import ParkingHistoryTable from "../components/parking/ParkingHistoryTable";
import { usePolling } from "../hooks/usePolling";
import { parkingService } from "../services/parkingService";

export default function ParkingPage() {
  const { data: summary, loading: summaryLoading } = usePolling(parkingService.getSummary, { interval: 6000 });
  const { data: heatmap, loading: heatmapLoading } = usePolling(parkingService.getHeatmap, { interval: 7000 });
  const { data: analytics, loading: analyticsLoading } = usePolling(parkingService.getVehicleAnalytics, { interval: 10000 });
  const { data: history, loading: historyLoading } = usePolling(parkingService.getHistory, { interval: 8000 });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Parking</h1>
          <p className="page-subtitle">Live occupancy, VIP allocation, and vehicle flow across all parking zones.</p>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <StatCard
          label="Live Occupancy"
          value={summary ? `${summary.occupancyPct}%` : "—"}
          icon={ParkingSquare}
          accent="var(--gold)"
          progress={summary?.occupancyPct}
          loading={summaryLoading}
        />
        <StatCard
          label="Available Slots"
          value={summary ? summary.availableSlots : "—"}
          icon={CarFront}
          accent="var(--success)"
          sublabel={summary ? `of ${summary.totalSlots} total` : ""}
          loading={summaryLoading}
        />
        <StatCard
          label="VIP Parking"
          value={summary ? `${summary.vipOccupied}/${summary.vipTotal}` : "—"}
          icon={ShieldCheck}
          accent="var(--maroon-bright)"
          progress={summary ? (summary.vipOccupied / summary.vipTotal) * 100 : 0}
          loading={summaryLoading}
        />
        <StatCard
          label="Total Slots"
          value={summary ? summary.totalSlots : "—"}
          icon={LayoutGrid}
          accent="var(--info)"
          loading={summaryLoading}
        />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 20, alignItems: "start" }}>
        <Card title="Parking Heatmap" icon={LayoutGrid}>
          <ParkingZoneHeatmap data={heatmap} loading={heatmapLoading} />
        </Card>
        <Card title="Vehicle Analytics" icon={BarChart3}>
          <VehicleAnalyticsChart data={analytics} loading={analyticsLoading} />
        </Card>
      </div>

      <Card title="Parking History" icon={History}>
        <ParkingHistoryTable data={history} loading={historyLoading} />
      </Card>
    </div>
  );
}
