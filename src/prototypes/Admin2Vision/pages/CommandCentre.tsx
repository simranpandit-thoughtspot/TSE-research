import React from 'react';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

interface CommandCentreProps {
  onNavigate: (page: string) => void;
}

const HealthCard: React.FC<{
  label: string;
  value: string;
  subtitle: string;
  navigateTo?: string;
  navigateLabel?: string;
  onNavigate?: (page: string) => void;
  indicator?: 'green' | 'yellow' | 'red' | 'blue';
}> = ({ label, value, subtitle, navigateTo, navigateLabel, onNavigate, indicator }) => (
  <div
    style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: '12px', fontWeight: 500, color: '#777e8b', fontFamily: font, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </span>
      {indicator && (
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor:
              indicator === 'green' ? '#06bf7f' :
              indicator === 'yellow' ? '#fcc838' :
              indicator === 'red' ? '#e22b3d' : '#71a1f4',
            flexShrink: 0,
          }}
        />
      )}
    </div>
    <div style={{ fontSize: '28px', fontWeight: 700, color: '#1d232f', fontFamily: font, lineHeight: 1.1 }}>
      {value}
    </div>
    <div style={{ fontSize: '12.5px', color: '#a5acb9', fontFamily: font }}>
      {subtitle}
    </div>
    {navigateTo && onNavigate && (
      <button
        onClick={() => onNavigate(navigateTo)}
        style={{
          marginTop: '8px',
          background: 'none',
          border: 'none',
          padding: 0,
          fontFamily: font,
          fontSize: '12.5px',
          color: '#71a1f4',
          cursor: 'pointer',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {navigateLabel || 'Navigate to →'}
      </button>
    )}
  </div>
);

export const CommandCentre: React.FC<CommandCentreProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '32px', maxWidth: '1100px' }}>
      {/* Alert Banner */}
      <div
        style={{
          backgroundColor: '#fff8e5',
          border: '1px solid #fcc838',
          borderRadius: '8px',
          padding: '12px 20px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L14.5 13.5H1.5L8 2Z" stroke="#fcc838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="8" y1="6.5" x2="8" y2="9.5" stroke="#fcc838" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11.5" r="0.75" fill="#fcc838" />
          </svg>
          <span style={{ fontSize: '13.5px', color: '#1d232f', fontFamily: font }}>
            <strong>ThoughtSpot v9.12.2 is available.</strong> Update now to get new features and security patches.
          </span>
        </div>
        <button
          style={{
            background: 'none',
            border: '1px solid #fcc838',
            borderRadius: '6px',
            padding: '5px 14px',
            fontFamily: font,
            fontSize: '12.5px',
            color: '#1d232f',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontWeight: 500,
          }}
        >
          Review update
        </button>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        <HealthCard
          label="Instance health"
          value="Healthy"
          subtitle="All services operational"
          indicator="green"
          navigateTo="infrastructure"
          navigateLabel="View infrastructure →"
          onNavigate={onNavigate}
        />
        <HealthCard
          label="Active users (24h)"
          value="1,247"
          subtitle="+3.2% vs yesterday"
          indicator="blue"
          navigateTo="user-adoption"
          navigateLabel="View adoption →"
          onNavigate={onNavigate}
        />
        <HealthCard
          label="Query success rate"
          value="98.6%"
          subtitle="14 failed queries in last 24h"
          indicator="green"
          navigateTo="infrastructure"
          navigateLabel="View query logs →"
          onNavigate={onNavigate}
        />
        <HealthCard
          label="Avg query time"
          value="1.4s"
          subtitle="P95: 4.2s"
          indicator="green"
          navigateTo="infrastructure"
          navigateLabel="View performance →"
          onNavigate={onNavigate}
        />
        <HealthCard
          label="Storage used"
          value="67%"
          subtitle="335 GB of 500 GB used"
          indicator="yellow"
          navigateTo="infrastructure"
          navigateLabel="View storage details →"
          onNavigate={onNavigate}
        />
        <HealthCard
          label="Active orgs"
          value="12 / 15"
          subtitle="12 active, 3 licensed but inactive"
          indicator="blue"
          navigateTo="users-orgs"
          navigateLabel="Manage orgs →"
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};
