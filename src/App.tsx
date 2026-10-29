import { useState } from 'react';
import {
  INITIAL_SUMMARY,
  INITIAL_SERVICES,
  INITIAL_INCIDENTS,
} from './data/mockTelemetry';
import { FilterStatus, ServiceMetric, DashboardSummary } from './types';

export function App() {
  const [summary, setSummary] = useState<DashboardSummary>(INITIAL_SUMMARY);
  const [services, setServices] = useState<ServiceMetric[]>(INITIAL_SERVICES);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [lastRefreshed, setLastRefreshed] = useState<string>(
    new Date().toLocaleTimeString()
  );

  // A default label is allowed only for dev UI display
  const reportLabel =
    (import.meta.env.VITE_PUBLIC_REPORT_LABEL &&
      import.meta.env.VITE_PUBLIC_REPORT_LABEL.trim()) ||
    'Local Dev Preview';

  const handleSimulateCycle = () => {
    // Generate slight synthetic variance for metrics
    setServices((prev) =>
      prev.map((svc) => {
        const jitter = Math.floor(Math.random() * 7) - 3;
        const newLatency = Math.max(5, svc.latencyMs + jitter);
        const cpuJitter = Math.floor(Math.random() * 5) - 2;
        const newCpu = Math.min(99, Math.max(10, svc.cpuUtilizationPercent + cpuJitter));
        return {
          ...svc,
          latencyMs: newLatency,
          cpuUtilizationPercent: newCpu,
        };
      })
    );

    setSummary((prev) => ({
      ...prev,
      p99LatencyMs: Math.max(25, prev.p99LatencyMs + Math.floor(Math.random() * 5) - 2),
      requestRatePerMin: prev.requestRatePerMin + Math.floor(Math.random() * 120) - 50,
    }));

    setLastRefreshed(new Date().toLocaleTimeString());
  };

  const filteredServices = services.filter((svc) => {
    if (filter === 'all') return true;
    return svc.status === filter;
  });

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-title-group">
          <h1>Pulse Telemetry Dashboard</h1>
          <p>Real-time service fleet performance and health monitoring</p>
        </div>
        <div className="header-badge-group">
          <span className="report-badge" title="Active build report label">
            Label: {reportLabel}
          </span>
          <span className="status-pill healthy">
            <span className="pulse-dot"></span>
            Fleet Operational
          </span>
        </div>
      </header>

      <section className="metrics-grid" aria-label="Summary Metrics">
        <div className="metric-card">
          <div className="metric-label">System Uptime (30d)</div>
          <div className="metric-value">{summary.uptimePercentage.toFixed(2)}%</div>
          <div className="metric-sub">SLA Target: &ge;99.90%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Active Nodes</div>
          <div className="metric-value">
            {summary.healthyNodes} / {summary.totalNodes}
          </div>
          <div className="metric-sub">3 nodes in reserve/maint</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Ingress Throughput</div>
          <div className="metric-value">
            {summary.requestRatePerMin.toLocaleString()}
          </div>
          <div className="metric-sub">Requests per minute</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">P99 Latency</div>
          <div className="metric-value">{summary.p99LatencyMs} ms</div>
          <div className="metric-sub">Target &lt; 50 ms</div>
        </div>
      </section>

      <div className="toolbar-section">
        <div className="filter-group" role="group" aria-label="Filter by health status">
          {(['all', 'healthy', 'degraded', 'maintenance'] as const).map((status) => (
            <button
              key={status}
              type="button"
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="action-btn"
          onClick={handleSimulateCycle}
        >
          Simulate Telemetry Tick
        </button>
      </div>

      <section className="table-card" aria-label="Service Fleet Table">
        <div className="table-header-title">Service Fleet Inventory</div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Tier</th>
                <th>Health Status</th>
                <th>Latency</th>
                <th>Error Rate</th>
                <th>CPU Load</th>
                <th>Throughput</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((svc) => (
                <tr key={svc.id}>
                  <td className="service-name">{svc.name}</td>
                  <td>
                    <span className="tier-badge">{svc.tier}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${svc.status}`}>
                      <span className="pulse-dot"></span>
                      {svc.status}
                    </span>
                  </td>
                  <td>{svc.latencyMs} ms</td>
                  <td>{svc.errorRatePercent.toFixed(2)}%</td>
                  <td>{svc.cpuUtilizationPercent}%</td>
                  <td>{svc.requestRatePerSec} req/s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="incident-card" aria-label="Recent Events">
        <h2>Recent Fleet Activity</h2>
        <div className="incident-list">
          {INITIAL_INCIDENTS.map((item) => (
            <div key={item.id} className={`incident-item ${item.severity}`}>
              <div className="incident-meta">
                <strong>{item.service}</strong>
                <span>{item.timestamp}</span>
              </div>
              <p className="incident-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="dashboard-footer">
        Last telemetry cycle: {lastRefreshed} &bull; Environment: {import.meta.env.MODE}
      </footer>
    </div>
  );
}

export default App;
