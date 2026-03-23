import React, { useState, useRef, useEffect } from 'react';
import { AppShell } from '../../components/AppShell';
import type { AppSidebarProps, SidebarTab, SidebarCategory, ScopeToggle } from '../../components/AppSidebar';
import type { GlobalHeaderProps } from '../../components/GlobalHeader';
import { systemColors, referenceColors } from '../../tokens/colors';
import { CustomisationPageContent } from '../Customisation/Customisation';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const brand = systemColors.light['content-brand'];

type SidebarTabId = 'insights' | 'data' | 'develop' | 'admin';

const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights' },
  { id: 'data', label: 'Data', headerTitle: 'Data Workspace' },
  { id: 'develop', label: 'Develop', headerTitle: 'Develop' },
  { id: 'admin', label: 'Admin', headerTitle: 'Admin' },
];

const SIDEBAR_CATEGORIES: Record<SidebarTabId, SidebarCategory[]> = {
  insights: [{ title: '', items: [{ id: 'home', label: 'Home' }] }],
  data: [{ title: '', items: [{ id: 'data-objects', label: 'Data objects' }] }],
  develop: [{ title: '', items: [{ id: 'playground', label: 'Playground' }] }],
  admin: [
    {
      title: '',
      items: [
        { id: 'home', label: 'Home' },
        { id: 'org-management', label: 'Org management' },
        { id: 'user-management', label: 'User management' },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { id: 'feature-management', label: 'Feature management' },
        { id: 'variables', label: 'Variables' },
        { id: 'version-control', label: 'Version control' },
      ],
    },
    {
      title: 'CONFIGURATION',
      items: [
        { id: 'application-settings', label: 'Application settings' },
        { id: 'customisation', label: 'Customisation' },
        { id: 'ai-settings', label: 'AI settings' },
        { id: 'search-spot-iq', label: 'Search & Spot IQ' },
      ],
    },
    {
      title: 'MONITOR',
      items: [
        { id: 'user-adoption', label: 'User & adoption' },
        { id: 'performance-tracking', label: 'performance tracking' },
        { id: 'ai-bi-stats', label: 'AI & BI stats' },
        { id: 'billing-query-stats', label: 'Billing query stats' },
      ],
    },
  ],
};

// ─── Toggle ──────────────────────────────────────────────────────────────────

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
      backgroundColor: checked ? brand : referenceColors.gray['30'],
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

// ─── Custom Dropdown ──────────────────────────────────────────────────────────

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
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '36px',
          padding: '0 12px',
          border: `1px solid ${open ? brand : '#D1D5DB'}`,
          borderRadius: '6px',
          backgroundColor: '#FFFFFF',
          cursor: 'pointer',
          fontFamily: font,
          fontSize: '13px',
          color: '#111827',
          outline: 'none',
          boxShadow: open ? `0 0 0 2px ${brand}22` : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      >
        <span>{selected}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            flexShrink: 0,
            marginLeft: '8px',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s ease',
          }}
        >
          <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Menu */}
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
            animation: 'dropdownFade 0.15s ease',
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
                color: opt === selected ? brand : '#111827',
                backgroundColor: opt === selected ? `${brand}10` : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.1s',
              }}
              onMouseEnter={(e) => {
                if (opt !== selected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                if (opt !== selected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Setting Row (white sub-card inside gray card) ────────────────────────────

const SettingRow: React.FC<{
  label: string;
  description?: string;
  control: React.ReactNode;
}> = ({ label, description, control }) => (
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
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827', fontFamily: font, lineHeight: 1.4 }}>
        {label}
      </div>
      {description && (
        <div style={{ fontSize: '12.5px', color: '#9CA3AF', fontFamily: font, marginTop: '4px', lineHeight: 1.6 }}>
          {description}
        </div>
      )}
    </div>
    <div style={{ flexShrink: 0, paddingTop: description ? '2px' : '0' }}>
      {control}
    </div>
  </div>
);

// ─── Card (collapsible gray outer container) ──────────────────────────────────

const Card: React.FC<{
  title: string;
  description?: string;
  open?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
}> = ({ title, description, open, onToggle, children }) => {
  const collapsible = onToggle !== undefined;

  return (
    <div
      style={{
        backgroundColor: '#F3F4F6',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      {collapsible ? (
        <button
          onClick={onToggle}
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
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{
              flexShrink: 0,
              transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.22s ease',
            }}
          >
            <path d="M3 5.5l4 4 4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827', fontFamily: font }}>
            {title}
          </span>
        </button>
      ) : (
        <div style={{ padding: '16px 24px 12px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827', fontFamily: font }}>
            {title}
          </div>
          {description && (
            <div style={{ fontSize: '12.5px', color: '#9CA3AF', fontFamily: font, marginTop: '4px', lineHeight: 1.5 }}>
              {description}
            </div>
          )}
        </div>
      )}

      {/* Body — always visible when not collapsible, otherwise animated */}
      <div
        style={{
          maxHeight: collapsible ? (open ? '2000px' : '0px') : undefined,
          overflow: collapsible ? 'hidden' : undefined,
          transition: collapsible ? 'max-height 0.25s ease' : undefined,
        }}
      >
        <div style={{ padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

export const NewUIAdmin2: React.FC = () => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTabId>('admin');
  const [sidebarNav, setSidebarNav] = useState('application-settings');
  const [activeTab, setActiveTab] = useState('general');

  const [hideOrgName, setHideOrgName] = useState(true);
  const [orgUrlSharing, setOrgUrlSharing] = useState(true);
  const [inAppSupport, setInAppSupport] = useState(true);

  const [includeCoverPages, setIncludeCoverPages] = useState(false);
  const [hideMetadataHeader, setHideMetadataHeader] = useState(false);
  const [downloadInstructions, setDownloadInstructions] = useState(false);

  // Data modelling toggles
  const [newTmlUtility, setNewTmlUtility] = useState(false);
  const [nonEquiJoins, setNonEquiJoins] = useState(false);
  const [dataModelsOpen, setDataModelsOpen] = useState(true);

  // CSV upload toggles
  const [snowflake, setSnowflake] = useState(false);
  const [databricks, setDatabricks] = useState(false);
  const [googleBigQuery, setGoogleBigQuery] = useState(false);

  const [clusterOpen, setClusterOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(true);
  const [downloadsOpen, setDownloadsOpen] = useState(true);

  const scopeToggle: ScopeToggle = {
    options: [
      { id: 'all-orgs', label: 'All Orgs' },
      { id: 'primary-org', label: 'Primary Org' },
    ],
    activeId: 'all-orgs',
    onChange: () => {},
  };

  const headerProps: GlobalHeaderProps = {
    searchPlaceholder: 'Search in your library',
    userName: 'Primary',
    notificationCount: 1,
    showHamburger: false,
  };

  const sidebarProps: AppSidebarProps = {
    tabs: SIDEBAR_TABS,
    activeTab: sidebarTab,
    onTabChange: (tabId) => { setSidebarTab(tabId as SidebarTabId); setSidebarNav(''); },
    categories: SIDEBAR_CATEGORIES,
    selectedNav: sidebarNav,
    onNavSelect: setSidebarNav,
    ...(sidebarTab === 'admin' ? { scopeToggle } : {}),
  };

  const pageTabs = [
    { id: 'general', label: 'General settings' },
    { id: 'data-modelling', label: 'Data modelling' },
    { id: 'csv-upload', label: 'CSV upload' },
  ];

  return (
    <AppShell
      headerProps={headerProps}
      sidebarProps={sidebarProps}
      contentBackground="#FFFFFF"
      style={{ height: '100vh' }}
    >
      {/* Route to Customisation page when that nav item is selected */}
      {sidebarNav === 'customisation' ? <CustomisationPageContent /> : (

      <div style={{ height: '100%', overflowY: 'auto', backgroundColor: '#FFFFFF' }}>

        {/* ── Page header: full-width, title left + tabs inline ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            padding: '28px 40px 0',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          {/* Title — left aligned, full height */}
          <h1
            style={{
              margin: '0 0 16px 0',
              fontSize: '22px',
              fontWeight: 700,
              color: '#0F172A',
              fontFamily: font,
              letterSpacing: '-0.3px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Application settings
          </h1>

          {/* Vertical separator */}
          <div
            style={{
              width: '1px',
              height: '24px',
              backgroundColor: '#D1D5DB',
              margin: '0 24px 16px',
              flexShrink: 0,
            }}
          />

          {/* Tabs — inline with title, underline on active */}
          <div style={{ display: 'flex', alignItems: 'flex-end', flex: 1 }}>
            {pageTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0 14px 16px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontFamily: font,
                  fontSize: '13.5px',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? brand : '#6B7280',
                  borderBottom: activeTab === tab.id
                    ? `2px solid ${brand}`
                    : '2px solid transparent',
                  marginBottom: '-1px',
                  transition: 'color 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Centered content column */}
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '32px 40px 64px',
            boxSizing: 'border-box',
          }}
        >

          {/* ── General settings tab ────────────────────────────── */}
          {activeTab === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Cluster settings */}
              <Card title="Cluster settings" open={clusterOpen} onToggle={() => setClusterOpen(!clusterOpen)}>
                <SettingRow
                  label="Time zone"
                  control={
                    <Dropdown
                      value="Asia/Calcutta"
                      options={['Asia/Calcutta', 'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Tokyo']}
                      width={220}
                    />
                  }
                />
                <SettingRow
                  label="Date & Time format"
                  control={
                    <Dropdown
                      value="DD/MM/YYYY"
                      options={['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'MMM DD, YYYY']}
                      width={220}
                    />
                  }
                />
                <SettingRow
                  label="Cluster version (v26.7)"
                  description="This cluster is running an outdated version. Please update to the latest release to ensure full compatibility."
                  control={
                    <a
                      href="#"
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: brand,
                        fontFamily: font,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Request Update
                    </a>
                  }
                />
              </Card>

              {/* Administration */}
              <Card title="Administration" open={adminOpen} onToggle={() => setAdminOpen(!adminOpen)}>
                <SettingRow
                  label="Hide org name"
                  description="Manage visibility of Org name in the top-nav bar for user belonging to single org."
                  control={<Toggle checked={hideOrgName} onChange={() => setHideOrgName(!hideOrgName)} />}
                />
                <SettingRow
                  label="Org URL sharing"
                  description="When enabled, Liveboards from different orgs can be viewed in the same window without needing to switch between orgs."
                  control={<Toggle checked={orgUrlSharing} onChange={() => setOrgUrlSharing(!orgUrlSharing)} />}
                />
                <SettingRow
                  label="In-app support"
                  description="To enhance your support experience, ThoughtSpot now offers in-app support for all Cloud customers. This feature provides immediate assistance for product-related inquiries and 'how-to' questions directly within the ThoughtSpot application."
                  control={<Toggle checked={inAppSupport} onChange={() => setInAppSupport(!inAppSupport)} />}
                />
              </Card>

              {/* Downloads & Schedules */}
              <Card title="Downloads & Schedules" open={downloadsOpen} onToggle={() => setDownloadsOpen(!downloadsOpen)}>
                <SettingRow
                  label="Include cover and filter pages in the Liveboard PDF by default"
                  description="Control whether cover and filter pages are included by default in Liveboard PDFs. Users can always override this setting per download or schedule."
                  control={<Toggle checked={includeCoverPages} onChange={() => setIncludeCoverPages(!includeCoverPages)} />}
                />
                <SettingRow
                  label="Hide Metadata header in CSV exports"
                  control={<Toggle checked={hideMetadataHeader} onChange={() => setHideMetadataHeader(!hideMetadataHeader)} />}
                />
                <SettingRow
                  label="Downloaded file instructions"
                  description="Text will appear in all downloaded files for answers and Liveboards. It will appear at the bottom of the page in PDF and PNG files and on top in CSV and XLSX files."
                  control={<Toggle checked={downloadInstructions} onChange={() => setDownloadInstructions(!downloadInstructions)} />}
                />
              </Card>

            </div>
          )}

          {activeTab === 'data-modelling' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Card title="Data models" open={dataModelsOpen} onToggle={() => setDataModelsOpen(!dataModelsOpen)}>
                <SettingRow
                  label="New TML Utility UI"
                  description="Enable the new TML Utility UI with asynchronous TML imports."
                  control={<Toggle checked={newTmlUtility} onChange={() => setNewTmlUtility(!newTmlUtility)} />}
                />
                <SettingRow
                  label="Non Equi Joins"
                  description="Enable creation of non equi joins in the model UI."
                  control={<Toggle checked={nonEquiJoins} onChange={() => setNonEquiJoins(!nonEquiJoins)} />}
                />
              </Card>
            </div>
          )}

          {activeTab === 'csv-upload' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Card
                title="CSV upload"
                description="Configure the data upload using CSV files"
              >
                <SettingRow
                  label="Snowflake"
                  control={<Toggle checked={snowflake} onChange={() => setSnowflake(!snowflake)} />}
                />
                <SettingRow
                  label="Databricks"
                  control={<Toggle checked={databricks} onChange={() => setDatabricks(!databricks)} />}
                />
                <SettingRow
                  label="Google BigQuery"
                  control={<Toggle checked={googleBigQuery} onChange={() => setGoogleBigQuery(!googleBigQuery)} />}
                />
              </Card>
            </div>
          )}

        </div>
      </div>

      )}

      {/* Dropdown animation keyframe */}
      <style>{`
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </AppShell>
  );
};

export default NewUIAdmin2;
