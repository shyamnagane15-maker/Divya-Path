import React from "react";
import { Users, ScanEye, Clock3, ParkingSquare, LayoutGrid, Activity } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import CrowdTrendChart from "../components/dashboard/CrowdTrendChart";
import ZoneDensityList from "../components/dashboard/ZoneDensityList";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import CrowdHeatmap from "../components/dashboard/CrowdHeatmap";
import AICrowdPredictionCard from "../components/dashboard/AICrowdPredictionCard";
import SystemHealthCard from "../components/dashboard/SystemHealthCard";
import PulseDot from "../components/ui/PulseDot";
import { usePolling } from "../hooks/usePolling";
import { liveMonitoringService } from "../services/liveMonitoringService";
import { aiService } from "../services/aiService";

export default function LiveMonitoringPage() {
  const { data: summary, loading: summaryLoading } = usePolling(liveMonitoringService.getSummary, { interval: 5000 });
  const { data: trend, loading: trendLoading } = usePolling(liveMonitoringService.getCrowdTrend, { interval: 8000 });
  const { data: zones, loading: zonesLoading } = usePolling(liveMonitoringService.getZoneDensity, { interval: 7000 });
  const { data: health, loading: healthLoading } = usePolling(liveMonitoringService.getSystemHealth, { interval: 9000 });
  const { data: feed, loading: feedLoading } = usePolling(liveMonitoringService.getActivityFeed, { interval: 6000 });
  const { data: heatmap, loading: heatmapLoading } = usePolling(liveMonitoringService.getHeatmap, { interval: 5000 });
  const { data: aiPrediction, loading: aiLoading } = usePolling(aiService.getCrowdPrediction, { interval: 6000 });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Live Monitoring</h1>
          <p className="page-subtitle">Real-time crowd, queue, and system telemetry across the temple complex.</p>
        </div>
        <div className="live-pill">
          <PulseDot /> Refreshing every few seconds
        </div>
      </div>

      {/* Top stat row */}
      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <StatCard
          label="Crowd Density"
          value={summary ? `${summary.crowdDensity}%` : "—"}
          icon={Users}
          accent="var(--gold)"
          progress={summary?.crowdDensity}
          sublabel="AI-detected occupancy"
          loading={summaryLoading}
        />
        <StatCard
          label="Total Visitors"
          value={summary ? summary.totalVisitors.toLocaleString() : "—"}
          icon={ScanEye}
          accent="var(--info)"
          deltaPct={summary?.visitorsDeltaPct}
          sublabel="vs yesterday"
          loading={summaryLoading}
        />
        <StatCard
          label="Queue Length"
          value={summary ? summary.queueLength : "—"}
          icon={Clock3}
          accent="var(--saffron)"
          sublabel={summary ? `~${summary.queueWaitMinutes} min wait` : ""}
          loading={summaryLoading}
        />
        <StatCard
          label="Parking Occupancy"
          value={summary ? `${summary.parkingOccupancyPct}%` : "—"}
          icon={ParkingSquare}
          accent="var(--maroon-bright)"
          progress={summary?.parkingOccupancyPct}
          sublabel={summary ? `${summary.parkingSlotsFree} slots free` : ""}
          loading={summaryLoading}
        />
      </div>

      {/* AI prediction + system health */}
      <div className="grid grid-2" style={{ marginBottom: 20, alignItems: "start" }}>
        <AICrowdPredictionCard data={aiPrediction} loading={aiLoading} />
        <SystemHealthCard data={health} loading={healthLoading} />
      </div>

      {/* Trend chart + zone density */}
      <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr", gap: 18, marginBottom: 20 }}>
        <Card title="Crowd Trend — Today" icon={Activity}>
          <CrowdTrendChart data={trend} loading={trendLoading} />
        </Card>
        <Card title="Zone Density Breakdown" icon={LayoutGrid}>
          <ZoneDensityList data={zones} loading={zonesLoading} />
        </Card>
      </div>

      {/* Heatmap + activity feed */}
      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
        <Card title="Crowd Heatmap" icon={LayoutGrid}>
          <CrowdHeatmap data={heatmap} loading={heatmapLoading} />
        </Card>
        <Card title="Live Activity Feed" icon={Activity}>
          <ActivityFeed data={feed} loading={feedLoading} />
        </Card>
      </div>
    </div>
  );
}
