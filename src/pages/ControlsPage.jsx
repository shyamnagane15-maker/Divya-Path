import React, { useEffect, useState } from "react";
import GateControlPanel from "../components/controls/GateControlPanel";
import QueueControlPanel from "../components/controls/QueueControlPanel";
import EmergencyBroadcastPanel from "../components/controls/EmergencyBroadcastPanel";
import LightingControlPanel from "../components/controls/LightingControlPanel";
import FacilityTogglesPanel from "../components/controls/FacilityTogglesPanel";
import BellSchedulePanel from "../components/controls/BellSchedulePanel";
import { controlsService } from "../services/controlsService";

export default function ControlsPage() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    controlsService.getState().then((s) => {
      setState(s);
      setLoading(false);
    });
  }, []);

  const withUpdate = (promise) => promise.then(setState);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Controls</h1>
          <p className="page-subtitle">Operate gates, queues, lighting, and facility systems in real time.</p>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginBottom: 18, alignItems: "start" }}>
        <GateControlPanel gates={state?.gates} loading={loading} onToggle={(id) => withUpdate(controlsService.toggleGate(id))} />
        <QueueControlPanel
          queueControl={state?.queueControl}
          loading={loading}
          onTogglePause={() => withUpdate(controlsService.toggleQueuePause())}
          onAdjustCounters={(delta) => withUpdate(controlsService.adjustQueueCounters(delta))}
        />
      </div>

      <div className="grid grid-2" style={{ marginBottom: 18, alignItems: "start" }}>
        <LightingControlPanel
          lighting={state?.lighting}
          loading={loading}
          onToggle={(id) => withUpdate(controlsService.toggleLight(id))}
          onBrightness={(id, val) => withUpdate(controlsService.setLightBrightness(id, val))}
        />
        <EmergencyBroadcastPanel />
      </div>

      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <FacilityTogglesPanel
          parkingBarrier={state?.parkingBarrier}
          crowdDiversion={state?.crowdDiversion}
          maintenance={state?.maintenance}
          loading={loading}
          onToggleBarrier={() => withUpdate(controlsService.toggleParkingBarrier())}
          onToggleDiversion={() => withUpdate(controlsService.toggleCrowdDiversion())}
          onToggleMaintenance={(note) => withUpdate(controlsService.toggleMaintenanceMode(note))}
        />
        <BellSchedulePanel schedule={state?.bellSchedule} loading={loading} />
      </div>
    </div>
  );
}
