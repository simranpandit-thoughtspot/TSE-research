import React, { useState, useRef, useEffect } from 'react';

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

const Dropdown: React.FC<{ value: string; options: string[]; width?: number }> = ({
  value: initialValue,
  options,
  width = 220,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', width, flexShrink: 0 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '36px',
          padding: '0 12px',
          border: `1px solid ${open ? blue : '#e5e7eb'}`,
          borderRadius: '6px',
          backgroundColor: '#FFFFFF',
          cursor: 'pointer',
          fontFamily: font,
          fontSize: '13px',
          color: '#111827',
          outline: 'none',
          boxShadow: open ? `0 0 0 2px ${blue}22` : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      >
        <span>{selected}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginLeft: '8px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            zIndex: 100,
            overflow: 'hidden',
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 16px',
                border: 'none',
                textAlign: 'left',
                fontFamily: font,
                fontSize: '13px',
                fontWeight: opt === selected ? 500 : 400,
                color: opt === selected ? blue : '#111827',
                backgroundColor: opt === selected ? `${blue}18` : 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { if (opt !== selected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F9FAFB'; }}
              onMouseLeave={(e) => { if (opt !== selected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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

const CardSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          padding: '16px 24px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          fontFamily: font,
          textAlign: 'left',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.22s ease' }}>
          <path d="M3 5.5l4 4 4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827', fontFamily: font }}>{title}</span>
      </button>
      {open && (
        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export const GeneralSettings: React.FC = () => {
  const [hideOrgName, setHideOrgName] = useState(false);
  const [orgUrlSharing, setOrgUrlSharing] = useState(true);
  const [inAppSupport, setInAppSupport] = useState(true);
  const [coverPages, setCoverPages] = useState(true);
  const [hideMetadata, setHideMetadata] = useState(false);
  const [fileInstructions, setFileInstructions] = useState(false);

  return (
    <div style={{ padding: '32px', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Cluster Settings */}
      <CardSection title="Cluster settings">
        <SettingRow label="Time zone" description="Default time zone used for displaying dates and times across the platform." control={<Dropdown value="(UTC-08:00) Pacific Time" options={['(UTC-08:00) Pacific Time', '(UTC-05:00) Eastern Time', '(UTC+00:00) UTC', '(UTC+05:30) India Standard Time', '(UTC+08:00) Singapore Time']} />} />
        <SettingRow label="Date & Time format" description="Format used to display dates and timestamps in the UI." control={<Dropdown value="MM/DD/YYYY, 12h" options={['MM/DD/YYYY, 12h', 'DD/MM/YYYY, 24h', 'YYYY-MM-DD, 24h', 'DD MMM YYYY, 12h']} />} />
        <SettingRow
          label="Cluster version"
          description="Current deployed version of the ThoughtSpot cluster."
          control={
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontFamily: font, fontSize: '13.5px', fontWeight: 600, color: '#1d232f' }}>v9.10.0.cl</span>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: font,
                  fontSize: '13px',
                  color: blue,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                Request Update
              </button>
            </div>
          }
        />
      </CardSection>

      {/* Administration */}
      <CardSection title="Administration">
        <SettingRow label="Hide org name" description="Conceal org name from the URL and session metadata visible to end users." control={<Toggle checked={hideOrgName} onChange={() => setHideOrgName(!hideOrgName)} />} />
        <SettingRow label="Org URL sharing" description="Allow users to share links that include the org identifier in the URL." control={<Toggle checked={orgUrlSharing} onChange={() => setOrgUrlSharing(!orgUrlSharing)} />} />
        <SettingRow label="In-app support" description="Show the in-app support widget to end users for help and ticket submission." control={<Toggle checked={inAppSupport} onChange={() => setInAppSupport(!inAppSupport)} />} />
      </CardSection>

      {/* Downloads & Schedules */}
      <CardSection title="Downloads & Schedules">
        <SettingRow label="Include cover pages" description="Attach a cover page to all scheduled reports and downloaded PDFs." control={<Toggle checked={coverPages} onChange={() => setCoverPages(!coverPages)} />} />
        <SettingRow label="Hide metadata header" description="Omit the metadata header section from downloaded files and exports." control={<Toggle checked={hideMetadata} onChange={() => setHideMetadata(!hideMetadata)} />} />
        <SettingRow label="Downloaded file instructions" description="Include usage instructions in the footer of all downloaded files." control={<Toggle checked={fileInstructions} onChange={() => setFileInstructions(!fileInstructions)} />} />
      </CardSection>
    </div>
  );
};
