import React, { useEffect, useState } from "react";
import AnomalySummaryCards from "../components/security/AnomalySummaryCards";
import SecurityEventLog from "../components/security/SecurityEventLog";
import { securityService } from "../services/securityService";
import { usePolling } from "../hooks/usePolling";

export default function SecurityPage() {
  const { data: anomalySummary, loading: summaryLoading } = usePolling(securityService.getAnomalySummary, { interval: 8000 });
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    securityService.getEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const handleAcknowledge = async (id) => {
    const updated = await securityService.acknowledgeEvent(id);
    setEvents(updated);
  };

  const handleResolve = async (id) => {
    const updated = await securityService.resolveEvent(id);
    setEvents(updated);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Security</h1>
          <p className="page-subtitle">Event log, anomaly detection, and incident acknowledgement across the complex.</p>
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <AnomalySummaryCards data={anomalySummary} loading={summaryLoading} />
      </div>

      <SecurityEventLog events={events} loading={loading} onAcknowledge={handleAcknowledge} onResolve={handleResolve} />
    </div>
  );
}
