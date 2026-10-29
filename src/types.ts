export type ServiceHealthStatus = 'healthy' | 'degraded' | 'maintenance';

export interface ServiceMetric {
  id: string;
  name: string;
  tier: 'Edge' | 'Core' | 'Data';
  status: ServiceHealthStatus;
  latencyMs: number;
  errorRatePercent: number;
  cpuUtilizationPercent: number;
  requestRatePerSec: number;
}

export interface IncidentEvent {
  id: string;
  timestamp: string;
  service: string;
  severity: 'info' | 'warning' | 'critical';
  description: string;
}

export interface DashboardSummary {
  uptimePercentage: number;
  healthyNodes: number;
  totalNodes: number;
  requestRatePerMin: number;
  p99LatencyMs: number;
}

export type FilterStatus = 'all' | ServiceHealthStatus;
