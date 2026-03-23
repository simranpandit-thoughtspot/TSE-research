import React, { useState } from 'react';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const blue = '#71a1f4';

const KPICard: React.FC<{ label: string; value: string; change?: string; up?: boolean }> = ({ label, value, change, up }) => (
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
    <div style={{ fontFamily: font, fontSize: '11.5px', fontWeight: 500, color: '#777e8b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {label}
    </div>
    <div style={{ fontFamily: font, fontSize: '26px', fontWeight: 700, color: '#1d232f', lineHeight: 1.1 }}>
      {value}
    </div>
    {change && (
      <div style={{ fontFamily: font, fontSize: '12px', color: up ? '#06bf7f' : '#e22b3d' }}>
        {up ? '↑' : '↓'} {change} vs last month
      </div>
    )}
  </div>
);

type Tab = 'ai-overview' | 'spotter' | 'spotiq' | 'bi-content';

const tabs: { id: Tab; label: string }[] = [
  { id: 'ai-overview', label: 'AI overview' },
  { id: 'spotter', label: 'Spotter' },
  { id: 'spotiq', label: 'SpotIQ insights' },
  { id: 'bi-content', label: 'BI content' },
];

const BarChart: React.FC<{ data: { label: string; value: number; color?: string }[]; maxValue: number }> = ({ data, maxValue, }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {data.map((item) => (
      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '90px', fontFamily: font, fontSize: '12.5px', color: '#777e8b', textAlign: 'right', flexShrink: 0 }}>
          {item.label}
        </div>
        <div style={{ flex: 1, backgroundColor: '#f3f4f6', borderRadius: '4px', height: '20px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${(item.value / maxValue) * 100}%`,
              height: '100%',
              backgroundColor: item.color || blue,
              borderRadius: '4px',
              transition: 'width 0.4s ease',
              opacity: 0.85,
            }}
          />
        </div>
        <div style={{ width: '50px', fontFamily: font, fontSize: '12.5px', color: '#1d232f', fontWeight: 500, flexShrink: 0 }}>
          {item.value.toLocaleString()}
        </div>
      </div>
    ))}
  </div>
);

const AIOverview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <KPICard label="Total AI queries" value="84,210" change="12.4%" up />
      <KPICard label="Spotter sessions" value="21,340" change="8.1%" up />
      <KPICard label="SpotIQ analyses" value="6,820" change="3.2%" up />
      <KPICard label="Avg AI confidence" value="87.3%" change="1.1%" up />
    </div>
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
      <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#1d232f', marginBottom: '20px' }}>
        AI query volume by feature (last 30 days)
      </div>
      <BarChart
        data={[
          { label: 'Spotter NLP', value: 42000 },
          { label: 'SpotIQ', value: 18500 },
          { label: 'Auto insights', value: 12300 },
          { label: 'Smart suggest', value: 8800 },
          { label: 'Forecasting', value: 2610 },
        ]}
        maxValue={45000}
      />
    </div>
  </div>
);

const SpotterTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <KPICard label="Spotter queries" value="21,340" change="8.1%" up />
      <KPICard label="Avg turns/session" value="3.2" />
      <KPICard label="Queries answered" value="94.1%" change="0.8%" up />
      <KPICard label="Avg latency" value="1.8s" change="0.2s" up={false} />
    </div>
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
      <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#1d232f', marginBottom: '20px' }}>
        Spotter queries by org (last 30 days)
      </div>
      <BarChart
        data={[
          { label: 'Primary Org', value: 9800 },
          { label: 'Sales Org', value: 6200 },
          { label: 'Finance Org', value: 2900 },
          { label: 'Marketing', value: 1840 },
          { label: 'Engineering', value: 600 },
        ]}
        maxValue={11000}
      />
    </div>
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
      <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#1d232f', marginBottom: '16px' }}>
        Top Spotter query topics
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
            {['Topic', 'Queries', 'Avg rating'].map((h) => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontFamily: font, fontSize: '11.5px', fontWeight: 600, color: '#777e8b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { topic: 'Revenue analysis', queries: 4210, rating: '4.7' },
            { topic: 'Sales pipeline', queries: 3850, rating: '4.5' },
            { topic: 'User adoption', queries: 2910, rating: '4.2' },
            { topic: 'Inventory trends', queries: 2340, rating: '4.6' },
            { topic: 'Cost breakdown', queries: 1980, rating: '4.1' },
          ].map((row, i) => (
            <tr key={row.topic} style={{ borderBottom: i < 4 ? '1px solid #f3f4f6' : 'none' }}>
              <td style={{ padding: '12px 12px', fontFamily: font, fontSize: '13.5px', color: '#1d232f', fontWeight: 500 }}>{row.topic}</td>
              <td style={{ padding: '12px 12px', fontFamily: font, fontSize: '13px', color: '#777e8b' }}>{row.queries.toLocaleString()}</td>
              <td style={{ padding: '12px 12px' }}>
                <span style={{ fontFamily: font, fontSize: '13px', color: '#06bf7f', fontWeight: 500 }}>★ {row.rating}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SpotIQTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <KPICard label="Total analyses" value="6,820" change="3.2%" up />
      <KPICard label="Anomalies found" value="342" />
      <KPICard label="Insights shared" value="1,240" change="6.4%" up />
      <KPICard label="Avg analysis time" value="3.4s" />
    </div>
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
      <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#1d232f', marginBottom: '20px' }}>
        SpotIQ analyses by type
      </div>
      <BarChart
        data={[
          { label: 'Trend', value: 2400, color: '#71a1f4' },
          { label: 'Anomaly', value: 1860, color: '#fcc838' },
          { label: 'Compare', value: 1420, color: '#06bf7f' },
          { label: 'Correlation', value: 780, color: '#e22b3d' },
          { label: 'Forecast', value: 360, color: '#a855f7' },
        ]}
        maxValue={2600}
      />
    </div>
  </div>
);

const BIContentTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <KPICard label="Total liveboards" value="1,842" change="4.2%" up />
      <KPICard label="Total answers" value="6,310" change="9.8%" up />
      <KPICard label="Collections" value="287" change="2.1%" up />
      <KPICard label="Shared objects" value="3,104" change="11.2%" up />
    </div>
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
      <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#1d232f', marginBottom: '16px' }}>
        Top liveboards by views (last 30 days)
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
            {['Liveboard', 'Org', 'Views', 'Last viewed'].map((h) => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontFamily: font, fontSize: '11.5px', fontWeight: 600, color: '#777e8b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Executive Summary', org: 'Primary Org', views: 4812, last: 'Mar 22, 2026' },
            { name: 'Sales Pipeline Q1', org: 'Sales Org', views: 3210, last: 'Mar 22, 2026' },
            { name: 'Finance Overview', org: 'Finance Org', views: 2540, last: 'Mar 21, 2026' },
            { name: 'Campaign Performance', org: 'Marketing Org', views: 1980, last: 'Mar 22, 2026' },
            { name: 'Infra Health', org: 'Engineering Org', views: 820, last: 'Mar 20, 2026' },
          ].map((row, i) => (
            <tr key={row.name} style={{ borderBottom: i < 4 ? '1px solid #f3f4f6' : 'none' }}>
              <td style={{ padding: '12px 12px', fontFamily: font, fontSize: '13.5px', color: '#1d232f', fontWeight: 500 }}>{row.name}</td>
              <td style={{ padding: '12px 12px', fontFamily: font, fontSize: '13px', color: '#777e8b' }}>{row.org}</td>
              <td style={{ padding: '12px 12px', fontFamily: font, fontSize: '13px', color: '#1d232f' }}>{row.views.toLocaleString()}</td>
              <td style={{ padding: '12px 12px', fontFamily: font, fontSize: '12.5px', color: '#a5acb9' }}>{row.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const AIBIStats: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('ai-overview');

  return (
    <div style={{ padding: '32px', maxWidth: '1100px' }}>
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

      {activeTab === 'ai-overview' && <AIOverview />}
      {activeTab === 'spotter' && <SpotterTab />}
      {activeTab === 'spotiq' && <SpotIQTab />}
      {activeTab === 'bi-content' && <BIContentTab />}
    </div>
  );
};
