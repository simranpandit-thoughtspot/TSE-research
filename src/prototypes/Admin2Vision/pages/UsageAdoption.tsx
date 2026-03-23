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
    <div style={{ fontFamily: font, fontSize: '11.5px', fontWeight: 500, color: '#777e8b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
    <div style={{ fontFamily: font, fontSize: '26px', fontWeight: 700, color: '#1d232f', lineHeight: 1.1 }}>{value}</div>
    {change && (
      <div style={{ fontFamily: font, fontSize: '12px', color: up ? '#06bf7f' : '#e22b3d' }}>
        {up ? '↑' : '↓'} {change} vs last month
      </div>
    )}
  </div>
);

type Tab = 'overview' | 'top-content' | 'top-users';

export const UsageAdoption: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'top-content', label: 'Top content' },
    { id: 'top-users', label: 'Top users' },
  ];

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

      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <KPICard label="Total users" value="1,525" change="5.3%" up />
            <KPICard label="Active users (30d)" value="847" change="8.7%" up />
            <KPICard label="Liveboards viewed" value="12,430" change="14.2%" up />
            <KPICard label="Queries run" value="84,210" change="11.6%" up />
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#1d232f', marginBottom: '20px' }}>
              Daily active users (last 14 days)
            </div>
            {/* CSS bar chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
              {[62, 78, 54, 88, 95, 70, 45, 82, 90, 88, 72, 94, 86, 84].map((val, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${val}%`,
                      backgroundColor: i === 13 ? blue : 'rgba(113,161,244,0.4)',
                      borderRadius: '3px 3px 0 0',
                      transition: 'height 0.3s ease',
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontFamily: font, fontSize: '11px', color: '#a5acb9' }}>Mar 9</span>
              <span style={{ fontFamily: font, fontSize: '11px', color: '#a5acb9' }}>Mar 22</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'top-content' && (
        <div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e5e7eb' }}>
                  {['Name', 'Type', 'Views', 'Last viewed'].map((col) => (
                    <th key={col} style={{ padding: '11px 16px', textAlign: 'left', fontFamily: font, fontSize: '11.5px', fontWeight: 600, color: '#777e8b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Executive Summary', type: 'Liveboard', views: 4812, last: 'Mar 22, 2026' },
                  { name: 'Q1 Revenue Breakdown', type: 'Answer', views: 3420, last: 'Mar 21, 2026' },
                  { name: 'Sales Pipeline Q1', type: 'Liveboard', views: 3210, last: 'Mar 22, 2026' },
                  { name: 'Monthly Cost Report', type: 'Answer', views: 2640, last: 'Mar 20, 2026' },
                  { name: 'Finance Overview', type: 'Liveboard', views: 2540, last: 'Mar 21, 2026' },
                  { name: 'User Activity Log', type: 'Answer', views: 2100, last: 'Mar 19, 2026' },
                  { name: 'Campaign Performance', type: 'Liveboard', views: 1980, last: 'Mar 22, 2026' },
                  { name: 'Data Quality Dashboard', type: 'Liveboard', views: 1650, last: 'Mar 18, 2026' },
                ].map((row, i) => (
                  <tr
                    key={row.name}
                    style={{ borderBottom: i < 7 ? '1px solid #f3f4f6' : 'none' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#fafafa'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent'; }}
                  >
                    <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '13.5px', fontWeight: 500, color: '#1d232f' }}>{row.name}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ backgroundColor: row.type === 'Liveboard' ? 'rgba(113,161,244,0.12)' : '#f3f4f6', color: row.type === 'Liveboard' ? blue : '#777e8b', fontFamily: font, fontSize: '12px', fontWeight: 500, padding: '2px 9px', borderRadius: '5px' }}>{row.type}</span>
                    </td>
                    <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '13px', color: '#1d232f' }}>{row.views.toLocaleString()}</td>
                    <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '12.5px', color: '#a5acb9' }}>{row.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'top-users' && (
        <div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e5e7eb' }}>
                  {['User', 'Department', 'Queries', 'Last active'].map((col) => (
                    <th key={col} style={{ padding: '11px 16px', textAlign: 'left', fontFamily: font, fontSize: '11.5px', fontWeight: 600, color: '#777e8b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Anika Sharma', dept: 'Analytics', queries: 1842, last: 'Mar 22, 2026' },
                  { name: 'Carlos Ruiz', dept: 'Finance', queries: 1410, last: 'Mar 22, 2026' },
                  { name: 'Sophie Laroche', dept: 'Marketing', queries: 1280, last: 'Mar 21, 2026' },
                  { name: 'James Okafor', dept: 'Sales', queries: 1120, last: 'Mar 22, 2026' },
                  { name: 'Yuki Tanaka', dept: 'Engineering', queries: 986, last: 'Mar 20, 2026' },
                  { name: 'Elena Vasquez', dept: 'Analytics', queries: 920, last: 'Mar 19, 2026' },
                  { name: 'Priya Menon', dept: 'Operations', queries: 742, last: 'Mar 18, 2026' },
                ].map((row, i, arr) => (
                  <tr
                    key={row.name}
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#fafafa'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent'; }}
                  >
                    <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '13.5px', fontWeight: 500, color: '#1d232f' }}>{row.name}</td>
                    <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '13px', color: '#777e8b' }}>{row.dept}</td>
                    <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '13px', color: '#1d232f' }}>{row.queries.toLocaleString()}</td>
                    <td style={{ padding: '13px 16px', fontFamily: font, fontSize: '12.5px', color: '#a5acb9' }}>{row.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
