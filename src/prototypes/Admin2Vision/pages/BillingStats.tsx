import React, { useState } from 'react';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const blue = '#71a1f4';

const KPICard: React.FC<{ label: string; value: string; sub?: string }> = ({ label, value, sub }) => (
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
    {sub && <div style={{ fontFamily: font, fontSize: '12px', color: '#a5acb9' }}>{sub}</div>}
  </div>
);

type Tab = 'billing-stats' | 'subscriptions';

export const BillingStats: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('billing-stats');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'billing-stats', label: 'Billing query stats' },
    { id: 'subscriptions', label: 'Subscriptions' },
  ];

  const queryData = [
    { type: 'Ad-hoc queries', count: 38420, cost: '$1,152.60', rate: '$0.03' },
    { type: 'Scheduled reports', count: 12480, cost: '$624.00', rate: '$0.05' },
    { type: 'API calls', count: 24300, cost: '$486.00', rate: '$0.02' },
    { type: 'Embedded queries', count: 9010, cost: '$450.50', rate: '$0.05' },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: '1000px' }}>
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

      {activeTab === 'billing-stats' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <KPICard label="Total queries" value="84,210" sub="This billing period" />
            <KPICard label="Billed queries" value="71,640" sub="84.1% of total" />
            <KPICard label="Estimated cost" value="$2,713" sub="Based on usage so far" />
            <KPICard label="Next billing date" value="Apr 1" sub="2026" />
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #f3f4f6' }}>
              <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#1d232f' }}>Query breakdown</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e5e7eb' }}>
                  {['Query type', 'Count', 'Unit rate', 'Estimated cost'].map((col) => (
                    <th key={col} style={{ padding: '11px 18px', textAlign: 'left', fontFamily: font, fontSize: '11.5px', fontWeight: 600, color: '#777e8b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryData.map((row, i) => (
                  <tr
                    key={row.type}
                    style={{ borderBottom: i < queryData.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#fafafa'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent'; }}
                  >
                    <td style={{ padding: '13px 18px', fontFamily: font, fontSize: '13.5px', fontWeight: 500, color: '#1d232f' }}>{row.type}</td>
                    <td style={{ padding: '13px 18px', fontFamily: font, fontSize: '13px', color: '#777e8b' }}>{row.count.toLocaleString()}</td>
                    <td style={{ padding: '13px 18px', fontFamily: font, fontSize: '13px', color: '#777e8b' }}>{row.rate}</td>
                    <td style={{ padding: '13px 18px', fontFamily: font, fontSize: '13.5px', fontWeight: 600, color: '#1d232f' }}>{row.cost}</td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: '#f6f8fa', borderTop: '2px solid #e5e7eb' }}>
                  <td style={{ padding: '13px 18px', fontFamily: font, fontSize: '13.5px', fontWeight: 700, color: '#1d232f' }}>Total</td>
                  <td style={{ padding: '13px 18px', fontFamily: font, fontSize: '13px', fontWeight: 600, color: '#1d232f' }}>84,210</td>
                  <td style={{ padding: '13px 18px' }} />
                  <td style={{ padding: '13px 18px', fontFamily: font, fontSize: '13.5px', fontWeight: 700, color: '#1d232f' }}>$2,713.10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'subscriptions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { name: 'ThoughtSpot Enterprise', tier: 'Enterprise', seats: 15, renewal: 'Apr 1, 2027', status: 'Active', price: '$48,000 / yr' },
            { name: 'Spotter AI Add-on', tier: 'Add-on', seats: 10, renewal: 'Apr 1, 2027', status: 'Active', price: '$12,000 / yr' },
            { name: 'Embedded SDK', tier: 'Add-on', seats: null, renewal: 'Apr 1, 2027', status: 'Active', price: '$6,000 / yr' },
          ].map((sub) => (
            <div
              key={sub.name}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font, fontSize: '14.5px', fontWeight: 600, color: '#1d232f' }}>{sub.name}</div>
                <div style={{ fontFamily: font, fontSize: '12.5px', color: '#777e8b', marginTop: '3px' }}>
                  {sub.seats ? `${sub.seats} licensed seats · ` : ''}Renews {sub.renewal}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: font, fontSize: '15px', fontWeight: 700, color: '#1d232f' }}>{sub.price}</div>
                <span style={{ backgroundColor: '#e0f8ef', color: '#06bf7f', fontFamily: font, fontSize: '12px', fontWeight: 500, padding: '2px 9px', borderRadius: '20px' }}>
                  {sub.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
