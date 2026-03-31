import React, { useState, useRef, useEffect } from 'react';
import styles from './HomepageV4.module.css';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const BRAND = '#2770EF';
const HEADER_H = 56;
const NAV_W = 240;

// ─── SVG paths ────────────────────────────────────────────────────────────────

const TS_LOGO =
  'M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z';

const BELL_PATH =
  'M14.809 11.7122C13.5183 11.0551 12.7668 9.7408 12.7668 8.28587V6.05578V5.8679C12.7668 3.45093 11.1004 1.69013 8.84765 1.22077V1.19717C8.84765 0.540043 8.30761 0 7.65048 0C6.99335 0 6.45331 0.540043 6.45331 1.19717V1.22077C4.20054 1.69001 2.53415 3.45086 2.53415 5.8679V6.05578V8.30855C2.53415 9.78711 1.73633 11.0315 0.44566 11.7586C0.187883 11.8993 0 12.275 0 12.6272C0 13.1437 0.422052 13.5893 0.962096 13.5893H14.387C14.9034 13.5893 15.3491 13.1672 15.3491 12.6272C15.3019 12.2288 15.0904 11.8529 14.809 11.7122Z';

const HELP_PATH =
  'M0.306085 2.70328C0.101746 3.26688 0 3.89311 0 4.58196H2.11546C2.11546 3.73012 2.2986 3.05071 2.66319 2.54458C3.02778 2.03759 3.59416 1.78367 4.3615 1.78367C4.55214 1.78961 4.74044 1.82788 4.91855 1.8969C5.13687 1.97692 5.33825 2.098 5.51207 2.25377C5.71138 2.43512 5.87233 2.65544 5.98519 2.90144C6.11491 3.16995 6.1802 3.4925 6.1802 3.86823C6.1802 4.18135 6.1395 4.44985 6.05895 4.67633C5.97925 4.90108 5.86733 5.10439 5.72574 5.2854C5.58329 5.46726 5.42219 5.63282 5.24244 5.78295C5.06354 5.93393 4.87446 6.09606 4.67691 6.27192C4.42933 6.48467 4.21566 6.69999 4.03676 6.91959C3.85701 7.13835 3.70524 7.39227 3.58145 7.67965C3.45766 7.96788 3.36863 8.30244 3.31267 8.68504C3.25671 9.06593 3.22873 10.4493 3.22873 11H5.23312C5.23312 10.5496 5.27382 9.25036 5.35436 8.93811C5.43491 8.62499 5.54853 8.3522 5.69775 8.12058C5.84489 7.89047 6.01913 7.67932 6.21666 7.49178C6.41506 7.30477 6.63127 7.11004 6.86698 6.91016C7.06454 6.73516 7.26209 6.55587 7.4605 6.37486C7.6589 6.193 7.83441 5.9897 7.98703 5.76662C8.14135 5.54438 8.26406 5.28624 8.35733 4.99373C8.45061 4.6995 8.49768 4.35634 8.49768 3.96169C8.49768 3.39723 8.39976 2.87385 8.20221 2.38903C8.00465 1.90592 7.73134 1.48453 7.38145 1.12401C7.02727 0.758313 6.60242 0.472271 6.13328 0.284676C5.60004 0.0953748 4.99495 0 4.31657 0C3.65682 0 3.06557 0.109143 2.5442 0.328611C2.02055 0.547223 1.57115 0.859471 1.19429 1.26469C0.817438 1.6682 0.521816 2.14874 0.306085 2.70328Z';

// ─── White Global Header ──────────────────────────────────────────────────────

const WhiteGlobalHeader: React.FC = () => (
  <header
    style={{
      height: HEADER_H,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #EAECF0',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      flexShrink: 0,
      boxSizing: 'border-box',
      zIndex: 100,
    }}
  >
    {/* Logo — aligned to nav width */}
    <div style={{ width: NAV_W - 20, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 4 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="ThoughtSpot">
        <path d={TS_LOGO} fill="#0F1729" />
      </svg>
    </div>

    {/* Stretch to push actions right */}
    <div style={{ flex: 1 }} />

    {/* Search trigger */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        border: '1px solid #E5E7EB',
        borderRadius: 999,
        background: '#F9FAFB',
        width: 256,
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" stroke="#9CA3AF" strokeWidth="1.4" />
        <path d="M9.5 9.5l2.5 2.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 13, color: '#9CA3AF', fontFamily: font, userSelect: 'none' }}>
        Search in your library
      </span>
    </div>

    {/* Help */}
    <button
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: '50%',
        border: 'none', background: 'none', cursor: 'pointer',
        marginLeft: 12,
      }}
      aria-label="Help"
    >
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" aria-hidden="true">
        <path d={HELP_PATH} fill="#6B7280" />
        <path d="M5.2 13H3.2V16H5.2V13Z" fill="#6B7280" />
      </svg>
    </button>

    {/* Bell */}
    <button
      style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: '50%',
        border: 'none', background: 'none', cursor: 'pointer',
        marginLeft: 4,
      }}
      aria-label="Notifications"
    >
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
        <path d={BELL_PATH} fill="#6B7280" />
      </svg>
      <span
        style={{
          position: 'absolute', top: 5, right: 5,
          width: 7, height: 7, borderRadius: '50%',
          background: '#EF4444', border: '1.5px solid #fff',
        }}
      />
    </button>

    {/* Profile */}
    <button
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '4px 6px 4px 10px', borderRadius: 999,
        marginLeft: 8,
      }}
      aria-label="Profile"
    >
      <span style={{ fontSize: 13, fontWeight: 500, color: '#111827', fontFamily: font }}>
        Royal Enfield
      </span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div
        style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 10, fontWeight: 700, fontFamily: font,
          flexShrink: 0,
        }}
      >
        RE
      </div>
    </button>
  </header>
);

// ─── White Left Nav ───────────────────────────────────────────────────────────

type TabId = 'insights' | 'data' | 'develop' | 'admin';

interface NavItem {
  id: string;
  label: string;
  redDot?: boolean;
  icon?: 'liveboard' | 'answer';
}
interface NavSection {
  title?: string;
  items: NavItem[];
}

const INSIGHTS_NAV: NavSection[] = [
  {
    items: [
      { id: 'home',        label: 'Home' },
      { id: 'spotter',     label: 'Spotter' },
      { id: 'search-data', label: 'Search data' },
    ],
  },
  {
    title: 'LIBRARY',
    items: [
      { id: 'liveboards', label: 'Liveboards' },
      { id: 'answers',    label: 'Answers' },
    ],
  },
  {
    title: 'ANALYSIS & ALERTS',
    items: [
      { id: 'subscriptions',   label: 'Subscriptions' },
      { id: 'spotiq-analysis', label: 'SpotIQ analysis' },
    ],
  },
  {
    items: [
      { id: 'collections', label: 'Collections' },
    ],
  },
  {
    title: 'FAVOURITES',
    items: [
      { id: 'fav-1', label: 'Retails Sales',              icon: 'liveboard' },
      { id: 'fav-2', label: 'Total sales, Total quantity pu...', icon: 'answer' },
      { id: 'fav-3', label: 'Cloud Clusters',             icon: 'liveboard', redDot: true },
      { id: 'fav-4', label: 'Sales by state and region',  icon: 'liveboard', redDot: true },
      { id: 'fav-5', label: 'Retails Sales',              icon: 'answer' },
    ],
  },
];

// Tab icon SVGs
const InsightsIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M0 8.5C0 7.94772 0.447715 7.5 1 7.5H4.29412C4.8464 7.5 5.29412 7.94772 5.29412 8.5V18H0V8.5Z" fill={active ? BRAND : '#9CA3AF'} />
    <path d="M6.35294 1C6.35294 0.447716 6.80065 0 7.35294 0H10.6471C11.1993 0 11.6471 0.447715 11.6471 1V18H6.35294V1Z" fill={active ? BRAND : '#9CA3AF'} />
    <path d="M12.7059 4C12.7059 3.44772 13.1536 3 13.7059 3H17C17.5523 3 18 3.44772 18 4V18H12.7059V4Z" fill={active ? BRAND : '#9CA3AF'} />
  </svg>
);

const DataIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M17 8.5C17 9.63333 13.5067 10.8611 9 10.8611C4.50667 10.8611 1.02667 9.63333 1 8.51889V5.23222C2.97333 6.10111 5.85333 6.61111 9 6.61111C12.1467 6.61111 15.0267 6.10111 17 5.23222V8.5ZM17 11.3711V14.6767C16.9467 15.9611 13.3867 17 9 17C4.61333 17 1.05333 15.9611 1 14.6672V11.3617C2.97333 12.24 5.85333 12.75 9 12.75C12.1467 12.75 15.0267 12.24 17 11.3711ZM9 4.72222C4.58667 4.72222 1 3.66444 1 2.36111C1 1.05778 4.58667 0 9 0C13.4133 0 17 1.05778 17 2.36111C17 3.66444 13.4133 4.72222 9 4.72222Z" fill={active ? BRAND : '#9CA3AF'} />
  </svg>
);

const DevelopIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M0 8.82471L4.20726 3.44784L5.57812 4.81615L2.61204 8.82471L5.52254 12.9104L4.20726 14.2016L0 8.82471Z" fill={active ? BRAND : '#9CA3AF'} />
    <path d="M5.00625 18L11.0825 0L12.9165 0L6.84023 18H5.00625Z" fill={active ? BRAND : '#9CA3AF'} />
    <path d="M12.4219 4.89691L13.7927 3.52861L18 8.90548L13.7927 14.2824L12.4589 12.9911L15.388 8.90548L12.4219 4.89691Z" fill={active ? BRAND : '#9CA3AF'} />
  </svg>
);

const AdminIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="2.8" stroke={active ? BRAND : '#9CA3AF'} strokeWidth="1.5" />
    <path d="M9 1.75V4.1M9 13.9V16.25M1.75 9H4.1M13.9 9H16.25M3.86 3.86L5.52 5.52M12.48 12.48L14.14 14.14M14.14 3.86L12.48 5.52M5.52 12.48L3.86 14.14" stroke={active ? BRAND : '#9CA3AF'} strokeLinecap="round" strokeWidth="1.5" />
  </svg>
);

const LiveboardNavIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="12" height="12" rx="2" fill="#E5E7EB" />
    <path d="M3.5 9L5.5 6.5l2 2L9.5 5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AnswerNavIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="12" height="12" rx="2" fill="#E5E7EB" />
    <rect x="3.5" y="4"   width="7"   height="1.2" rx="0.6" fill="#9CA3AF" />
    <rect x="3.5" y="6.5" width="5"   height="1.2" rx="0.6" fill="#9CA3AF" />
    <rect x="3.5" y="9"   width="6"   height="1.2" rx="0.6" fill="#9CA3AF" />
  </svg>
);

const TABS: { id: TabId; Icon: React.FC<{ active?: boolean }> }[] = [
  { id: 'insights', Icon: InsightsIcon },
  { id: 'data',     Icon: DataIcon },
  { id: 'develop',  Icon: DevelopIcon },
  { id: 'admin',    Icon: AdminIcon },
];

interface WhiteLeftNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  selectedNav: string;
  onNavSelect: (id: string) => void;
}

const WhiteLeftNav: React.FC<WhiteLeftNavProps> = ({
  activeTab,
  onTabChange,
  selectedNav,
  onNavSelect,
}) => (
  <aside
    style={{
      width: NAV_W,
      flexShrink: 0,
      height: '100%',
      background: '#ffffff',
      borderRight: '1px solid #EAECF0',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}
  >
    {/* Tab switcher row */}
    <div
      style={{
        display: 'flex',
        background: '#F5F6F8',
        borderBottom: '1px solid #EAECF0',
        flexShrink: 0,
      }}
    >
      {TABS.map((tab, i) => (
        <React.Fragment key={tab.id}>
          <button
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.id}
            style={{
              flex: 1,
              height: 52,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: activeTab === tab.id ? '#ffffff' : 'transparent',
              cursor: 'pointer',
              boxShadow: activeTab === tab.id ? 'inset 0 -2px 0 ' + BRAND : 'none',
              transition: 'background 0.15s',
            }}
          >
            <tab.Icon active={activeTab === tab.id} />
          </button>
          {i < TABS.length - 1 && (
            <div style={{ width: 1, background: '#EAECF0', flexShrink: 0, margin: '10px 0' }} />
          )}
        </React.Fragment>
      ))}
    </div>

    {/* Nav panel */}
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px 12px',
          borderBottom: '1px solid #F3F4F6',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#111827',
            fontFamily: font,
            letterSpacing: '-0.2px',
          }}
        >
          Insights
        </span>
        <button
          style={{
            width: 24, height: 24, borderRadius: '50%',
            border: '1px solid #E5E7EB', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#6B7280', flexShrink: 0,
          }}
          aria-label="Add"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Nav items — scrollable */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 0 12px',
        }}
      >
        {INSIGHTS_NAV.map((section, si) => (
          <div key={si} style={{ marginBottom: section.title || si > 0 ? 4 : 0 }}>
            {section.title && (
              <div
                style={{
                  padding: '8px 20px 4px',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.6px',
                  color: '#9CA3AF',
                  fontFamily: font,
                  textTransform: 'uppercase',
                }}
              >
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = selectedNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavSelect(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '6px 20px',
                    minHeight: 32,
                    border: 'none',
                    background: isActive ? 'rgba(39,112,239,0.08)' : 'transparent',
                    color: isActive ? BRAND : '#374151',
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 400,
                    fontFamily: font,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(39,112,239,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }}
                >
                  {/* Red dot for active notifications */}
                  {item.redDot && (
                    <span
                      style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#EF4444', flexShrink: 0,
                      }}
                    />
                  )}
                  {/* Favourite type icon */}
                  {item.icon && !item.redDot && (
                    item.icon === 'liveboard' ? <LiveboardNavIcon /> : <AnswerNavIcon />
                  )}
                  {item.icon && item.redDot && (
                    item.icon === 'liveboard' ? <LiveboardNavIcon /> : <AnswerNavIcon />
                  )}
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        ))}

        {/* Show more */}
        <button
          style={{
            display: 'block',
            width: '100%',
            padding: '6px 20px',
            border: 'none',
            background: 'none',
            textAlign: 'left',
            fontSize: 13.5,
            fontWeight: 500,
            color: BRAND,
            fontFamily: font,
            cursor: 'pointer',
            marginTop: 4,
          }}
        >
          Show more
        </button>
      </nav>
    </div>
  </aside>
);

// ─── Spotter box inner SVGs ───────────────────────────────────────────────────

const SpotterChartIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M1 13L5.5 8L9.5 11.5L14 5.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="5.5" cy="8" r="1.5" fill="#9CA3AF" />
    <circle cx="9.5" cy="11.5" r="1.5" fill="#9CA3AF" />
  </svg>
);

const SpotterAIIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2" y="3.5" width="14" height="11" rx="3" stroke="#9CA3AF" strokeWidth="1.4"/>
    <path d="M6.5 9h5M9 6.5v5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const ChevronDownIcon: React.FC = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M2 4l3.5 3.5L9 4" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4.5h12M4 8h8M6.5 11.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ArrowUpIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 12V4M4.5 7.5L8 4l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Action chip icons ────────────────────────────────────────────────────────

const QuickSearchIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M9.5 9.5l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const DeepResearchIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M4 7h6M4 4.5h6M4 9.5h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const KnowDataIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <ellipse cx="7" cy="3.5" rx="4.5" ry="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2.5 3.5v3c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-3" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2.5 6.5v3c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-3" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const LiveboardsIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M4 9L6 6.5l2.5 2.5L11 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Recents data + icons ─────────────────────────────────────────────────────

const RecentsLiveboardIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="3" y="3" width="24" height="24" rx="5" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1"/>
    <path d="M7.5 20L11 15l3.5 3.5 3-5 3.5 3" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RecentsAnswerIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="3" y="3" width="24" height="24" rx="5" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1"/>
    <rect x="8.5"  y="10"   width="13" height="1.6" rx="0.8" fill="#9CA3AF"/>
    <rect x="8.5"  y="13.5" width="9"  height="1.6" rx="0.8" fill="#9CA3AF"/>
    <rect x="8.5"  y="17"   width="11" height="1.6" rx="0.8" fill="#9CA3AF"/>
  </svg>
);

const SpotterRecentsIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="3" y="3" width="24" height="24" rx="5" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1"/>
    <circle cx="15" cy="15" r="4" stroke="#6366F1" strokeWidth="1.4"/>
    <path d="M15 12v3l2 2" stroke="#6366F1" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const RECENTS = [
  { id: 1, icon: 'liveboard', name: 'Quarterly profit dashboard',   time: 'yesterday' },
  { id: 2, icon: 'answer',    name: 'Customer attrition by team',   time: '2 days ago' },
  { id: 3, icon: 'answer',    name: 'New leads by marketing chan...', time: '4 days ago' },
  { id: 4, icon: 'answer',    name: 'Adelaide product pipeline',    time: '1 week ago' },
  { id: 5, icon: 'spotter',   name: 'Weekly active users',          time: '2 weeks ago' },
];

// ─── Watchlist data ───────────────────────────────────────────────────────────

type SparkKey = 'redDown' | 'redMixed' | 'greenUp' | 'redDown2' | 'greenUp2';

const SPARKLINES: Record<SparkKey, string> = {
  redDown:   'M2 5 L10 9 L18 7 L26 13 L34 11 L42 17 L50 15 L58 19',
  redMixed:  'M2 11 L10 7 L18 13 L26 5 L34 15 L42 9 L50 17 L58 13',
  greenUp:   'M2 19 L10 15 L18 17 L26 11 L34 13 L42 7 L50 9 L58 5',
  redDown2:  'M2 7 L10 11 L18 5 L26 15 L34 9 L42 17 L50 13 L58 19',
  greenUp2:  'M2 17 L10 13 L18 15 L26 9 L34 11 L42 5 L50 7 L58 3',
};

interface WatchItem {
  id: number;
  name: string;
  period: string;
  spark: SparkKey;
  pct: string;
  trend: 'up' | 'down';
  value: string;
}

const WATCHLIST: WatchItem[] = [
  { id: 1, name: 'Total Orders by Monthly Date', period: 'WoW', spark: 'redDown',  pct: '0.2%',   trend: 'down', value: '273.55M' },
  { id: 2, name: 'Active Users by Weekly Date',  period: 'Mom', spark: 'redMixed', pct: '26.10%', trend: 'up',   value: '10.07M'  },
  { id: 3, name: 'Sessions by Weekly Date',      period: 'Mom', spark: 'greenUp',  pct: '88.88%', trend: 'up',   value: '6.3%'    },
  { id: 4, name: 'Total Visits by Monthly Date', period: 'Mom', spark: 'redDown2', pct: '16.08%', trend: 'down', value: '14.52M'  },
  { id: 5, name: 'Total Revenue by Monthly...',  period: 'Mom', spark: 'greenUp2', pct: '0.3%',   trend: 'up',   value: '88.888M' },
  { id: 6, name: 'Avg Deal Size by Industry',    period: 'WoW', spark: 'greenUp',  pct: '4.12%',  trend: 'up',   value: '1.24M'   },
  { id: 7, name: 'Pipeline by Region',           period: 'Mom', spark: 'redDown',  pct: '2.5%',   trend: 'down', value: '42.1M'   },
];

const Sparkline: React.FC<{ sparkKey: SparkKey }> = ({ sparkKey }) => {
  const isRed = sparkKey.startsWith('red');
  return (
    <svg width="60" height="24" viewBox="0 0 60 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d={SPARKLINES[sparkKey]}
        stroke={isRed ? '#EF4444' : '#22C55E'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ─── Popular queries data ─────────────────────────────────────────────────────

const POPULAR_QUERIES = [
  'What is the average deal size by industry?',
  'What were the sales in Q3 of 2024?',
  'What are the current inventory levels in the Central region?',
  'What are the primary drivers of revenue growth?',
  'What are the sales trends in the Nordic region?',
];

// ─── Main component ───────────────────────────────────────────────────────────

export const HomepageV4: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('insights');
  const [selectedNav, setSelectedNav] = useState('home');
  const [spotterOpen, setSpotterOpen] = useState(false);
  const [queryText, setQueryText] = useState('What is the average deal size by industry?');
  const spotterRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (spotterRef.current && !spotterRef.current.contains(e.target as Node)) {
        setSpotterOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: font,
        overflow: 'hidden',
      }}
    >
      {/* ── White Global Header ──────────────────────────────────────── */}
      <WhiteGlobalHeader />

      {/* ── Body row ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* White Left Nav */}
        <WhiteLeftNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedNav={selectedNav}
          onNavSelect={setSelectedNav}
        />

        {/* Main content */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: '#EEEDF8',
          }}
        >
          {/* ── Spotter section — 40% ─────────────────────────────── */}
          <div
            style={{
              height: '40%',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '70px 48px',
              boxSizing: 'border-box',
            }}
          >
            {/* Headline */}
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#111827',
                fontFamily: font,
                letterSpacing: '-0.4px',
                margin: '0 0 24px 0',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              Lets take a{' '}
              <span style={{ color: BRAND }}>deep dive</span>
              {' '}into your data.
            </h1>

            {/* Animated gradient spotter box — click to expand popular queries */}
            <div ref={spotterRef} style={{ position: 'relative', width: '100%' }}>
              <div
                className={styles.spotterGlowOuter}
                onClick={() => setSpotterOpen(true)}
                style={{ cursor: spotterOpen ? 'default' : 'text' }}
              >
                <div className={styles.spotterBox}>
                  {/* Query / placeholder text */}
                  <div style={{ padding: '20px 24px 14px' }}>
                    {spotterOpen ? (
                      <p
                        style={{
                          margin: 0, fontSize: 14,
                          color: '#9CA3AF', fontFamily: font, lineHeight: 1.5,
                        }}
                      >
                        Ask me a question. Use &apos;@&apos; to select columns and values.
                      </p>
                    ) : (
                      <p
                        style={{
                          margin: 0, fontSize: 14,
                          color: '#374151', fontFamily: font, lineHeight: 1.5,
                        }}
                      >
                        {queryText}
                        <span className={styles.queryCursor} />
                      </p>
                    )}
                  </div>

                  {/* Toolbar */}
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '10px 16px 12px',
                      borderTop: '1px solid #F3F4F6',
                    }}
                  >
                    <button className={styles.iconBtn} aria-label="Chart type"><SpotterChartIcon /></button>
                    <button className={styles.iconBtn} aria-label="AI mode"><SpotterAIIcon /></button>
                    <div style={{ width: 1, height: 18, background: '#E5E7EB', margin: '0 2px' }} />
                    <button className={styles.dataModelPill}>
                      All data model
                      <ChevronDownIcon />
                    </button>
                    <button className={styles.plusBtn} aria-label="Add source">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <div style={{ flex: 1 }} />
                    <button className={styles.iconBtn} aria-label="Filter"><FilterIcon /></button>
                    <button className={styles.sendBtn} aria-label="Submit"><ArrowUpIcon /></button>
                  </div>

                </div>
              </div>

              {/* Popular queries — overlay card, floats below the prompt box */}
              {spotterOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 2,
                    right: 2,
                    background: '#ffffff',
                    borderRadius: 14,
                    border: '1px solid #E9EAEC',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.13)',
                    zIndex: 50,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: '12px 20px 6px',
                      fontSize: 12, fontWeight: 500,
                      color: '#9CA3AF', fontFamily: font,
                      letterSpacing: '0.01em',
                    }}
                  >
                    Popular queries
                  </div>
                  {POPULAR_QUERIES.map((query, i) => {
                    const rest = query.slice(4);
                    return (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setQueryText(query);
                          setSpotterOpen(false);
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          width: '100%', padding: '10px 20px',
                          border: 'none', background: 'none',
                          cursor: 'pointer', textAlign: 'left',
                          fontFamily: font, fontSize: 14, color: '#111827',
                          transition: 'background 0.1s',
                          boxSizing: 'border-box',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = '#F9FAFB';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'none';
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, color: '#9CA3AF' }}>
                          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                        <span>
                          <strong style={{ fontWeight: 600 }}>What</strong>
                          {rest}
                        </span>
                      </button>
                    );
                  })}
                  <div style={{ height: 8 }} />
                </div>
              )}
            </div>

            {/* Quick action chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 8,
                marginTop: 14,
              }}
            >
              <button className={styles.actionChip}><QuickSearchIcon /> Quick search</button>
              <button className={styles.actionChip}><DeepResearchIcon /> Deep research</button>
              <button className={styles.actionChip}><KnowDataIcon /> Know your data</button>
              <button className={styles.actionChip}>
                <LiveboardsIcon /> Create Liveboards
                <span className={styles.newBadge}>New</span>
              </button>
            </div>
          </div>

          {/* ── Recents + Watchlist — 60% ─────────────────────────── */}
          <div
            style={{
              height: '60%',
              flexShrink: 0,
              padding: '70px 48px',
              boxSizing: 'border-box',
              display: 'grid',
              gridTemplateColumns: '5fr 7fr',  /* Recents narrower, Watchlist wider */
              gap: 16,
              overflow: 'hidden',
            }}
          >
            {/* Recents card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 12,
                border: '1px solid #E9EAEC',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '15px 20px',
                  borderBottom: '1px solid #F3F4F6',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#111827',
                  fontFamily: font,
                  flexShrink: 0,
                }}
              >
                Recents
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {RECENTS.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '11px 20px',
                      borderBottom: idx < RECENTS.length - 1 ? '1px solid #F9FAFB' : 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F9FAFB'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                  >
                    {item.icon === 'liveboard' ? <RecentsLiveboardIcon /> :
                     item.icon === 'spotter'   ? <SpotterRecentsIcon />  : <RecentsAnswerIcon />}
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: '#111827',
                          fontFamily: font,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: 11.5, color: '#9CA3AF', fontFamily: font, marginTop: 2 }}>
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Watchlist card — scrollable list */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 12,
                border: '1px solid #E9EAEC',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Fixed header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px 20px',
                  borderBottom: '1px solid #F3F4F6',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: '#111827', fontFamily: font }}>
                  Watchlist
                </span>
                <button
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 500, color: BRAND,
                    fontFamily: font, padding: 0,
                    display: 'flex', alignItems: 'center', gap: 3,
                  }}
                >
                  + Add KPI
                </button>
              </div>

              {/* Scrollable list */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {WATCHLIST.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '11px 20px',
                      borderBottom: idx < WATCHLIST.length - 1 ? '1px solid #F9FAFB' : 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F9FAFB'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                  >
                    {/* Name + period */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: '#111827',
                          fontFamily: font,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: 11.5, color: '#9CA3AF', fontFamily: font, marginTop: 1 }}>
                        {item.period}
                      </div>
                    </div>

                    {/* Sparkline */}
                    <Sparkline sparkKey={item.spark} />

                    {/* % badge */}
                    <span
                      className={item.trend === 'up' ? styles.badgeUp : styles.badgeDown}
                    >
                      {item.pct}
                    </span>

                    {/* Value */}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#111827',
                        fontFamily: font,
                        minWidth: 72,
                        textAlign: 'right',
                        flexShrink: 0,
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomepageV4;
