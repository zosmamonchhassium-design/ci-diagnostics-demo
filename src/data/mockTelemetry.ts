import { ServiceMetric, IncidentEvent, DashboardSummary } from '../types';

export const INITIAL_SUMMARY: DashboardSummary = {
  uptimePercentage: 99.96,
  healthyNodes: 47,
  totalNodes: 50,
  requestRatePerMin: 18450,
  p99LatencyMs: 38,
};

export const INITIAL_SERVICES: ServiceMetric[] = [
  {
    id: 'svc-edge-gw',
    name: 'Edge API Gateway',
    tier: 'Edge',
    status: 'healthy',
    latencyMs: 14,
    errorRatePercent: 0.02,
    cpuUtilizationPercent: 42,
    requestRatePerSec: 320,
  },
  {
    id: 'svc-auth-broker',
    name: 'Authentication Broker',
    tier: 'Core',
    status: 'healthy',
    latencyMs: 22,
    errorRatePercent: 0.01,
    cpuUtilizationPercent: 51,
    requestRatePerSec: 185,
  },
  {
    id: 'svc-billing-stream',
    name: 'Billing & Ledger Stream',
    tier: 'Core',
    status: 'healthy',
    latencyMs: 46,
    errorRatePercent: 0.04,
    cpuUtilizationPercent: 63,
    requestRatePerSec: 94,
  },
  {
    id: 'svc-inventory-index',
    name: 'Inventory Search Index',
    tier: 'Data',
    status: 'degraded',
    latencyMs: 142,
    errorRatePercent: 1.85,
    cpuUtilizationPercent: 88,
    requestRatePerSec: 140,
  },
  {
    id: 'svc-event-bus',
    name: 'Asynchronous Event Bus',
    tier: 'Core',
    status: 'healthy',
    latencyMs: 18,
    errorRatePercent: 0.00,
    cpuUtilizationPercent: 36,
    requestRatePerSec: 510,
  },
  {
    id: 'svc-telemetry-sink',
    name: 'Telemetry Ingest Pipeline',
    tier: 'Data',
    status: 'maintenance',
    latencyMs: 85,
    errorRatePercent: 0.00,
    cpuUtilizationPercent: 29,
    requestRatePerSec: 420,
  },
];

export const INITIAL_INCIDENTS: IncidentEvent[] = [
  {
    id: 'inc-1092',
    timestamp: '10 minutes ago',
    service: 'Inventory Search Index',
    severity: 'warning',
    description: 'Elevated p99 query latency detected during replica re-indexing window.',
  },
  {
    id: 'inc-1091',
    timestamp: '32 minutes ago',
    service: 'Telemetry Ingest Pipeline',
    severity: 'info',
    description: 'Scheduled buffer compaction cycle initiated by autonomous operator.',
  },
  {
    id: 'inc-1090',
    timestamp: '1 hour ago',
    service: 'Edge API Gateway',
    severity: 'info',
    description: 'Dynamic capacity scaling provisioned 2 additional ingress nodes.',
  },
];
