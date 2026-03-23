import React, { useState } from 'react';

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

const SettingRow: React.FC<{ label: string; description?: string; control: React.ReactNode }> = ({ label, description, control }) => (
  <div
    style={{
      display: 'flex',
      alignItems: description ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      gap: '32px',
      padding: '20px 24px',
      backgroundColor: '#FFFFFF',
      border: '1px solid #E9EAEC',
      borderRadius: '8px',
    }}
  >
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827', fontFamily: font, lineHeight: 1.4 }}>{label}</div>
      {description && (
        <div style={{ fontSize: '12.5px', color: '#9CA3AF', fontFamily: font, marginTop: '4px', lineHeight: 1.6 }}>{description}</div>
      )}
    </div>
    <div style={{ flexShrink: 0, paddingTop: description ? '2px' : '0' }}>{control}</div>
  </div>
);

type Tab = 'spotter' | 'spotterViz' | 'spotterModel' | 'spotterCode';

const tabs: { id: Tab; label: string }[] = [
  { id: 'spotter', label: 'Spotter' },
  { id: 'spotterViz', label: 'Spotter Viz' },
  { id: 'spotterModel', label: 'Spotter model' },
  { id: 'spotterCode', label: 'Spotter code' },
];

const ComingSoon: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '280px', gap: '12px' }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(113,161,244,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke={blue} strokeWidth="1.5" />
        <line x1="11" y1="7" x2="11" y2="11.5" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="14" r="0.8" fill={blue} />
      </svg>
    </div>
    <div style={{ fontFamily: font, fontSize: '15px', fontWeight: 600, color: '#1d232f' }}>{label} settings — Coming soon</div>
    <div style={{ fontFamily: font, fontSize: '13px', color: '#a5acb9', textAlign: 'center', maxWidth: '300px' }}>
      Configuration options for this module will be available in the next release.
    </div>
  </div>
);

export const AgentSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('spotter');
  const [enableSpotter, setEnableSpotter] = useState(true);
  const [spotterAllUsers, setSpotterAllUsers] = useState(true);
  const [showInSearch, setShowInSearch] = useState(true);
  const [followUp, setFollowUp] = useState(false);

  return (
    <div style={{ padding: '32px', maxWidth: '900px' }}>
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

      {activeTab === 'spotter' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px 8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827', fontFamily: font }}>Spotter AI features</span>
            </div>
            <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <SettingRow
                label="Enable Spotter"
                description="Master toggle — enables or disables the Spotter AI assistant across the entire instance."
                control={<Toggle checked={enableSpotter} onChange={() => setEnableSpotter(!enableSpotter)} />}
              />
              <SettingRow
                label="Spotter for all users"
                description="When enabled, all users in all orgs have access to Spotter. Disable to restrict to specific orgs."
                control={<Toggle checked={spotterAllUsers} onChange={() => setSpotterAllUsers(!spotterAllUsers)} />}
              />
              <SettingRow
                label="Show Spotter in search"
                description="Display the Spotter entry point within the universal search bar."
                control={<Toggle checked={showInSearch} onChange={() => setShowInSearch(!showInSearch)} />}
              />
              <SettingRow
                label="Enable follow-up questions"
                description="Allow Spotter to proactively suggest follow-up questions after answering a query."
                control={<Toggle checked={followUp} onChange={() => setFollowUp(!followUp)} />}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'spotter' && <ComingSoon label={tabs.find((t) => t.id === activeTab)?.label || ''} />}
    </div>
  );
};
