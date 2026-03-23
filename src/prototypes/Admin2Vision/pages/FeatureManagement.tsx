import React, { useState } from 'react';
import { mockFeatures, mockEarlyFeatures } from '../data/mockData';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const blue = '#71a1f4';

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    role="switch"
    aria-checked={checked}
    style={{
      position: 'relative',
      width: '36px',
      height: '20px',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: checked ? blue : '#d1d5db',
      cursor: 'pointer',
      padding: 0,
      flexShrink: 0,
      transition: 'background-color 0.2s ease',
    }}
  >
    <span
      style={{
        position: 'absolute',
        top: '2px',
        left: checked ? '18px' : '2px',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
      }}
    />
  </button>
);

const FeatureRow: React.FC<{
  name: string;
  description: string;
  enabledOrgs: number;
  totalOrgs: number;
  orgs: string[];
}> = ({ name, description, enabledOrgs, totalOrgs, orgs }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          gap: '16px',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#1d232f' }}>{name}</div>
          <div style={{ fontFamily: font, fontSize: '12.5px', color: '#777e8b', marginTop: '3px' }}>{description}</div>
        </div>
        <div
          style={{
            fontFamily: font,
            fontSize: '13px',
            color: '#777e8b',
            whiteSpace: 'nowrap',
          }}
        >
          Enabled for{' '}
          <strong style={{ color: '#1d232f' }}>{enabledOrgs}</strong>
          {' / '}
          {totalOrgs} orgs
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '5px 12px',
            fontFamily: font,
            fontSize: '12.5px',
            color: '#777e8b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          {expanded ? 'Collapse' : 'Manage orgs'}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
          >
            <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {expanded && (
        <div
          style={{
            borderTop: '1px solid #f3f4f6',
            padding: '16px 20px',
            backgroundColor: '#fafafa',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {orgs.map((org) => (
            <span
              key={org}
              style={{
                backgroundColor: 'rgba(113,161,244,0.1)',
                color: blue,
                fontFamily: font,
                fontSize: '12.5px',
                fontWeight: 500,
                padding: '4px 12px',
                borderRadius: '20px',
                border: '1px solid rgba(113,161,244,0.25)',
              }}
            >
              {org}
            </span>
          ))}
          <button
            style={{
              backgroundColor: 'transparent',
              color: blue,
              fontFamily: font,
              fontSize: '12.5px',
              fontWeight: 500,
              padding: '4px 12px',
              borderRadius: '20px',
              border: `1px dashed ${blue}`,
              cursor: 'pointer',
            }}
          >
            + Add org
          </button>
        </div>
      )}
    </div>
  );
};

type Tab = 'general' | 'early' | 'beta';

export const FeatureManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [earlyFeatures, setEarlyFeatures] = useState(mockEarlyFeatures);

  const toggleEarly = (id: string) => {
    setEarlyFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'general', label: 'General access' },
    { id: 'early', label: 'Early access' },
    { id: 'beta', label: 'Beta access' },
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

      {activeTab === 'general' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mockFeatures.map((f) => (
            <FeatureRow
              key={f.id}
              name={f.name}
              description={f.description}
              enabledOrgs={f.enabledOrgs}
              totalOrgs={f.totalOrgs}
              orgs={f.orgs}
            />
          ))}
        </div>
      )}

      {activeTab === 'early' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div
            style={{
              backgroundColor: '#fff8e5',
              border: '1px solid #fcc838',
              borderRadius: '8px',
              padding: '12px 18px',
              marginBottom: '20px',
              fontFamily: font,
              fontSize: '13px',
              color: '#1d232f',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14.5 13.5H1.5L8 2Z" stroke="#fcc838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="8" y1="6.5" x2="8" y2="9.5" stroke="#fcc838" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11.5" r="0.75" fill="#fcc838" />
            </svg>
            Early access features may be unstable. Enable only for testing purposes.
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
            {earlyFeatures.map((f, i) => (
              <div
                key={f.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '18px 20px',
                  borderBottom: i < earlyFeatures.length - 1 ? '1px solid #f3f4f6' : 'none',
                  gap: '20px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#1d232f' }}>{f.name}</div>
                  <div style={{ fontFamily: font, fontSize: '12.5px', color: '#777e8b', marginTop: '4px', lineHeight: 1.5 }}>{f.description}</div>
                </div>
                <Toggle checked={f.enabled} onChange={() => toggleEarly(f.id)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'beta' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '280px', gap: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(113,161,244,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 18L11 4L18 18H4Z" stroke={blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontFamily: font, fontSize: '15px', fontWeight: 600, color: '#1d232f' }}>Beta access — Coming soon</div>
          <div style={{ fontFamily: font, fontSize: '13px', color: '#a5acb9', textAlign: 'center', maxWidth: '300px' }}>
            Beta feature access controls will be available in the next release.
          </div>
        </div>
      )}
    </div>
  );
};
