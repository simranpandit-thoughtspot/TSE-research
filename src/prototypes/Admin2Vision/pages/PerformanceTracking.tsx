import React, { useState } from 'react';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const blue = '#71a1f4';

const KPICard: React.FC<{ label: string; value: string; sub?: string; status?: 'good' | 'warn' | 'bad' }> = ({ label, value, sub, status }) => (
  <div
    style={{
      backgroundColor: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      flex: 1,
      minWidth: '160px',
    }}
  >
    <div style={{ fontFamily: font, fontSize: '11.5px', fontWeight: 500, color: '#777e8b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
    <div style={{ fontFamily: font, fontSize: '26px', fontWeight: 700, color: status === 'bad' ? '#e22b3d' : status === 'warn' ? '#d97706' : '#1d232f', lineHeight: 1.1 }}>
      {value}
    </div>
    {sub && <div style={{ fontFamily: font, fontSize: '12px', color: '#a5acb9' }}>{sub}</div>}
  </div>
);

type Tab = 'latency' | 'slow-queries' | 'system-health';

const latencyData = [
  { bucket: '< 0.5s', count: 28400, pct: 0.34 },
  { bucket: '0.5 – 1s', count: 21200, pct: 0.25 },
  { bucket: '1 – 2s', count: 16800, pct: 0.20 },
  { bucket: '2 – 5s', count: 10100, pct: 0.12 },
  { bucket: '5 – 10s', count: 5040, pct: 0.06 },
  { bucket: '> 10s', count: 2670, pct: 0.03 },
];

export const PerformanceTracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('latency');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'latency', label: 'Latency distribution' },
    { id: 'slow-queries', label: 'Slow queries' },
    { id: 'system-health', label: 'System health' },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: '1000px' }}>
      {/* KPIs */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
        <KPICard label="Avg query time" value="1.4s" sub="All queries, last 24h" status="good" />
        <KPICard label="P95 latency" value="4.2s" sub="95th percentile" status="warn" />
        <KPICard label="Failed queries" value="14" sub="Last 24h" status="good" />
        <KPICard label="Cache hit rate" value="73.4%" sub="Buffer cache" status="good" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '28px' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '10px 20px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === t.id ? `2px solid ${blue}` : '2px solid transparent',
              cursor: 'pointer',
              fontFamily: font,
              fontSize: '13.5px',
              fontWeight: activeTab === t.id ? 600 : 400,
              color: activeTab === t.id ? blue : '#777e8b',
              marginBottom: '-1px',
              transition: 'color 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'latency' && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '28px' }}>
          <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#1d232f', marginBottom: '24px' }}>
            Query latency distribution (last 24h · 84,210 total queries)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {latencyData.map((row) => (
              <div key={row.bucket} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '80px', fontFamily: font, fontSize: '12.5px', color: '#777e8b', textAlign: 'right', flexShrink: 0 }}>
                  {row.bucket}
                </div>
                <div style={{ flex: 1, backgroundColor: '#f3f4f6', borderRadius: '4px', height: '22px', overflow: 'hidden', position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${row.pct * 100}%`,
                      backgroundColor: row.bucket === '> 10s' ? '#fecaca' : row.bucket === '5 – 10s' ? '#fef3c7' : 'rgba(113,161,244,0.6)',
                      borderRadius: '4px',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
                <div style={{ width: '90px', display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <span style={{ fontFamily: font, fontSize: '12.5px', color: '#1d232f', fontWeight: 500, width: '45px', textAlign: 'right' }}>
                    {row.count.toLocaleString()}
                  </span>
                  <span style={{ fontFamily: font, fontSize: '12px', color: '#a5acb9' }}>
                    ({Math.round(row.pct * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'slow-queries' && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e5e7eb' }}>
                {['Query', 'User', 'Duration', 'Timestamp', 'Status'].map((col) => (
                  <th key={col} style={{ padding: '11px 16px', textAlign: 'left', fontFamily: font, fontSize: '11.5px', fontWeight: 600, color: '#777e8b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { query: 'Revenue by region last 2 years', user: 'Carlos Ruiz', duration: '14.2s', ts: '10:24 AM', status: 'Completed' },
                { query: 'All transactions where amount > 50000', user: 'Anika Sharma', duration: '12.8s', ts: '09:41 AM', status: 'Completed' },
                { query: 'Marketing attribution by channel', user: 'Sophie Laroche', duration: '11.4s', ts: '08:55 AM', status: 'Timed out' },
                { query: 'Cohort retention analysis Q1–Q4', user: 'Yuki Tanaka', duration: '10.9s', ts: '08:12 AM', status: 'Completed' },
                { query: 'Compare user segments by LTV', user: 'Elena Vasquez', duration: '10.1s', ts: 'Mar 21', status: 'Failed' },
              ].map((row, i, arr) => (
                <tr
                  key={row.query}
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#fafafa'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent'; }}
                >
                  <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '13px', color: '#1d232f', maxWidth: '280px' }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.query}</div>
                  </td>
                  <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '13px', color: '#777e8b' }}>{row.user}</td>
                  <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '13px', fontWeight: 600, color: '#e22b3d' }}>{row.duration}</td>
                  <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '12.5px', color: '#a5acb9' }}>{row.ts}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{
                      backgroundColor: row.status === 'Completed' ? '#e0f8ef' : row.status === 'Timed out' ? '#fff8e5' : '#ffebec',
                      color: row.status === 'Completed' ? '#06bf7f' : row.status === 'Timed out' ? '#d97706' : '#e22b3d',
                      fontFamily: font, fontSize: '12px', fontWeight: 500, padding: '2px 9px', borderRadius: '20px',
                    }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'system-health' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { service: 'Query Engine', status: 'Healthy', latency: '1.2ms', uptime: '99.97%' },
            { service: 'Search Index', status: 'Healthy', latency: '0.8ms', uptime: '99.99%' },
            { service: 'Data Cache', status: 'Degraded', latency: '22ms', uptime: '98.40%' },
            { service: 'Scheduler', status: 'Healthy', latency: '2.1ms', uptime: '99.95%' },
            { service: 'Auth Service', status: 'Healthy', latency: '1.0ms', uptime: '100%' },
            { service: 'Webhook Dispatcher', status: 'Healthy', latency: '3.4ms', uptime: '99.88%' },
          ].map((svc) => (
            <div
              key={svc.service}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: svc.status === 'Healthy' ? '#06bf7f' : '#fcc838', flexShrink: 0 }} />
              <span style={{ flex: 1, fontFamily: font, fontSize: '13.5px', fontWeight: 500, color: '#1d232f' }}>{svc.service}</span>
              <span style={{ fontFamily: font, fontSize: '12.5px', color: '#777e8b', width: '70px', textAlign: 'right' }}>{svc.latency}</span>
              <span style={{ fontFamily: font, fontSize: '12.5px', color: '#1d232f', fontWeight: 500, width: '60px', textAlign: 'right' }}>{svc.uptime}</span>
              <span style={{
                backgroundColor: svc.status === 'Healthy' ? '#e0f8ef' : '#fff8e5',
                color: svc.status === 'Healthy' ? '#06bf7f' : '#d97706',
                fontFamily: font, fontSize: '12px', fontWeight: 500, padding: '2px 9px', borderRadius: '20px', width: '80px', textAlign: 'center',
              }}>
                {svc.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
