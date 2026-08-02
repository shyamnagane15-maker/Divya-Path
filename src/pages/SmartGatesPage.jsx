import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import Card from "../components/ui/Card";
import GateStatusPanel from "../components/gates/GateStatusPanel";
import VerificationPanel from "../components/gates/VerificationPanel";
import FaceRecognitionPlaceholder from "../components/gates/FaceRecognitionPlaceholder";
import EntryExitLogsTable from "../components/gates/EntryExitLogsTable";
import VisitorFlowChart from "../components/gates/VisitorFlowChart";
import { usePolling } from "../hooks/usePolling";
import { gatesService } from "../services/gatesService";

export default function SmartGatesPage() {
  const { data: gates, loading: gatesLoading, refetch } = usePolling(gatesService.getGateStatus, { interval: 7000 });
  const { data: entryLogs, loading: entryLoading } = usePolling(gatesService.getEntryLogs, { interval: 6000 });
  const { data: exitLogs, loading: exitLoading } = usePolling(gatesService.getExitLogs, { interval: 6000 });
  const { data: flow, loading: flowLoading } = usePolling(gatesService.getVisitorFlow, { interval: 9000 });
  const [localGates, setLocalGates] = useState(null);

  const displayGates = localGates || gates;

  const handleToggleAuto = async (gateId, autoOn) => {
    await gatesService.toggleAutoControl(gateId, autoOn);
    setLocalGates(
      (displayGates || []).map((g) => (g.id === gateId ? { ...g, mode: autoOn ? "Auto" : "Manual" } : g))
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Smart Gates</h1>
          <p className="page-subtitle">Gate status, identity verification, and visitor flow across all entry points.</p>
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <GateStatusPanel gates={displayGates} loading={gatesLoading} onToggleAuto={handleToggleAuto} />
      </div>

      <div className="grid grid-2" style={{ marginBottom: 18, alignItems: "start" }}>
        <VerificationPanel />
        <FaceRecognitionPlaceholder />
      </div>

      <Card title="Visitor Flow — Entries vs Exits" icon={TrendingUp} style={{ marginBottom: 18 }}>
        <VisitorFlowChart data={flow} loading={flowLoading} />
      </Card>

      <EntryExitLogsTable entryLogs={entryLogs} exitLogs={exitLogs} loading={entryLoading || exitLoading} />
    </div>
  );
}
