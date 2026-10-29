const metrics = [
  { title: 'Requests processed', value: '248,620', detail: '+12.4% vs. previous week', trend: 'positive' },
  { title: 'Service availability', value: '99.97%', detail: 'Above the 99.9% target', trend: 'positive' },
  { title: 'Median response', value: '142 ms', detail: '18 ms faster this week', trend: 'positive' },
  { title: 'Open incidents', value: '02', detail: '2 low priority, 0 critical', trend: 'neutral' },
];

const traffic = [
  { day: 'Mon', requests: 28_420 },
  { day: 'Tue', requests: 34_600 },
  { day: 'Wed', requests: 31_180 },
  { day: 'Thu', requests: 39_720 },
  { day: 'Fri', requests: 43_860 },
  { day: 'Sat', requests: 36_240 },
  { day: 'Sun', requests: 34_600 },
];

const services = [
  { name: 'Gateway API', description: 'Public request routing', availability: '99.99%', latency: '86 ms', status: 'Operational' },
  { name: 'Reporting', description: 'Scheduled report generation', availability: '99.95%', latency: '218 ms', status: 'Operational' },
  { name: 'Event processing', description: 'Background event delivery', availability: '99.97%', latency: '124 ms', status: 'Operational' },
  { name: 'Search', description: 'Internal index queries', availability: '99.96%', latency: '141 ms', status: 'Operational' },
];

export function App() {
  const reportLabel = import.meta.env.VITE_PUBLIC_REPORT_LABEL?.trim() || 'Demo operations';

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Northstar overview">
          <span className="brand-mark" aria-hidden="true">N</span>
          NORTHSTAR
        </a>
        <span className="workspace-name">Engineering / Operations</span>
        <span className="demo-badge">SYNTHETIC DATA</span>
      </header>

      <main>
        <div className="page-heading">
          <div>
            <p className="eyebrow">{reportLabel}</p>
            <h1>Operations overview</h1>
            <p className="subtitle">A weekly view of service traffic and reliability.</p>
          </div>
          <div className="date-range"><span aria-hidden="true">&#9638;</span> Oct 19 - Oct 25, 2026</div>
        </div>

        <section className="metrics" aria-label="Weekly summary">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.title}>
              <h2>{metric.title}</h2>
              <p className="metric-value">{metric.value}</p>
              <p className={`metric-detail ${metric.trend}`}>{metric.detail}</p>
            </article>
          ))}
        </section>

        <div className="detail-grid">
          <section className="panel traffic-panel" aria-labelledby="traffic-title">
            <div className="panel-heading">
              <div><h2 id="traffic-title">Request volume</h2><p>Daily requests across all services</p></div>
              <span className="chart-legend"><span />Requests</span>
            </div>
            <div className="chart" role="img" aria-label={traffic.map(({ day, requests }) => `${day}: ${requests.toLocaleString('en-US')} requests`).join('; ')}>
              <div className="chart-scale" aria-hidden="true"><span>50k</span><span>25k</span><span>0</span></div>
              <div className="chart-bars" aria-hidden="true">
                {traffic.map(({ day, requests }) => (
                  <div className="chart-column" key={day}>
                    <span className="bar-value">{(requests / 1_000).toFixed(1)}k</span>
                    <div className="bar-track"><div className="bar" style={{ height: `${requests / 50_000 * 100}%` }} /></div>
                    <span className="bar-label">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="panel reliability-panel" aria-labelledby="reliability-title">
            <h2 id="reliability-title">Reliability target</h2>
            <p className="panel-subtitle">Weekly service availability</p>
            <div className="availability-gauge"><div><strong>99.97<span>%</span></strong><span>availability</span></div></div>
            <p className="target-result">Target met</p>
            <p className="target-note">Availability stayed above the 99.9% weekly target.</p>
          </aside>
        </div>

        <section className="panel services-panel" aria-labelledby="services-title">
          <div className="panel-heading"><div><h2 id="services-title">Service health</h2><p>Weekly performance by service</p></div><span className="service-count">4 services</span></div>
          <div className="table-scroll">
            <table>
              <thead><tr><th scope="col">Service</th><th scope="col">Availability</th><th scope="col">Median response</th><th scope="col">Status</th></tr></thead>
              <tbody>{services.map((service) => (
                <tr key={service.name}>
                  <td><strong>{service.name}</strong><span className="service-description">{service.description}</span></td>
                  <td>{service.availability}</td><td>{service.latency}</td>
                  <td><span className="status"><span aria-hidden="true" />{service.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>
        <footer>Demo workspace. All metrics are synthetic. <span>Weekly report / UTC</span></footer>
      </main>
    </div>
  );
}
