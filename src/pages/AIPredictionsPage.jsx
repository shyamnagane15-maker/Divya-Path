import React from "react";
import { TrendingUp, History } from "lucide-react";
import Card from "../components/ui/Card";
import AIBadge from "../components/ui/AIBadge";
import AICrowdPredictionCard from "../components/dashboard/AICrowdPredictionCard";
import QueuePredictionCard from "../components/ai/QueuePredictionCard";
import ModelHealthCard from "../components/ai/ModelHealthCard";
import RushHourForecastChart from "../components/ai/RushHourForecastChart";
import PredictionHistoryTable from "../components/ai/PredictionHistoryTable";
import { usePolling } from "../hooks/usePolling";
import { aiService } from "../services/aiService";

export default function AIPredictionsPage() {
  const { data: crowdPrediction, loading: crowdLoading } = usePolling(aiService.getCrowdPrediction, { interval: 6000 });
  const { data: rushHour, loading: rushLoading } = usePolling(aiService.getRushHourForecast, { interval: 9000 });
  const { data: queuePrediction, loading: queueLoading } = usePolling(aiService.getQueuePrediction, { interval: 7000 });
  const { data: modelHealth, loading: healthLoading } = usePolling(aiService.getModelHealth, { interval: 10000 });
  const { data: history, loading: historyLoading } = usePolling(aiService.getPredictionHistory, { interval: 12000 });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Predictions</h1>
          <p className="page-subtitle">Forecasting models for crowd density, queue behavior, and gate recommendations.</p>
        </div>
        <AIBadge label="4 Models Active" />
      </div>

      <div className="grid grid-2" style={{ marginBottom: 20, alignItems: "start" }}>
        <AICrowdPredictionCard data={crowdPrediction} loading={crowdLoading} />
        <QueuePredictionCard data={queuePrediction} loading={queueLoading} />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr", gap: 18, marginBottom: 20, alignItems: "start" }}>
        <Card title="Rush Hour Forecasting" icon={TrendingUp} actions={<AIBadge />}>
          <RushHourForecastChart data={rushHour} loading={rushLoading} />
        </Card>
        <ModelHealthCard data={modelHealth} loading={healthLoading} />
      </div>

      <Card title="Prediction History" icon={History} actions={<AIBadge label="Model Accuracy Log" />}>
        <PredictionHistoryTable data={history} loading={historyLoading} />
      </Card>
    </div>
  );
}
