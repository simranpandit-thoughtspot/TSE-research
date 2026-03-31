import React, { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import type { AppSidebarProps, SidebarTab, SidebarCategory } from '../../components/AppSidebar';
import type { GlobalHeaderProps } from '../../components/GlobalHeader';
import styles from './HomepageV4.module.css';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// ─── Sidebar setup ────────────────────────────────────────────────────────────

type SidebarTabId = 'insights' | 'data' | 'develop' | 'admin';

const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights', showAddButton: true },
  { id: 'data',     label: 'Data',     headerTitle: 'Data Workspace' },
  { id: 'develop',  label: 'Develop',  headerTitle: 'Develop' },
  { id: 'admin',    label: 'Admin',    headerTitle: 'Admin' },
];

// Red dot indicator for favourites with unread activity
const RedDot: React.FC = () => (
  <span
    style={{
      display: 'inline-block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: '#EF4444',
      flexShrink: 0,
    }}
  />
);

const SIDEBAR_CATEGORIES: Record<SidebarTabId, SidebarCategory[]> = {
  insights: [
    {
      title: '',
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
      title: '',
      items: [
        { id: 'collections', label: 'Collections' },
      ],
    },
    {
      title: 'FAVOURITES',
      items: [
        { id: 'fav-1', label: 'Retails Sales' },
        { id: 'fav-2', label: 'Total sales, Total quantity pu...' },
        { id: 'fav-3', label: 'Cloud Clusters',           badge: <RedDot /> },
        { id: 'fav-4', label: 'Sales by state and region',badge: <RedDot /> },
        { id: 'fav-5', label: 'Retails Sales' },
      ],
    },
  ],
  data:    [{ title: '', items: [{ id: 'data-objects', label: 'Data objects' }] }],
  develop: [{ title: '', items: [{ id: 'playground',  label: 'Playground' }] }],
  admin:   [{ title: '', items: [{ id: 'admin-home',  label: 'Home' }] }],
};

// ─── Small inline SVG icons ───────────────────────────────────────────────────

const IconSpotterChart: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M1 13.5L6.5 8L10.5 12L17 5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6.5" cy="8" r="1.5" fill="#6B7280"/>
    <circle cx="10.5" cy="12" r="1.5" fill="#6B7280"/>
  </svg>
);

const IconSpotterAI: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="14" height="10" rx="3" stroke="#6B7280" strokeWidth="1.4"/>
    <path d="M6 9h6M9 6v6" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconChevronDown: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconFilter: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconArrowUp: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSearch: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M9.5 9.5l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconResearch: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M4.5 7h5M4.5 4.5h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconData: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <ellipse cx="7" cy="4" rx="4.5" ry="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2.5 4v3c0 1.1 2 2 4.5 2s4.5-.9 4.5-2V4" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2.5 7v3c0 1.1 2 2 4.5 2s4.5-.9 4.5-2V7" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const IconLiveboard: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M4 8.5L6 6l2.5 2.5 1.5-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconRecentsLiveboard: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="20" height="20" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1"/>
    <path d="M8 18L11 14l3 3 3-5.5 3 3" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconRecentsAnswer: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="20" height="20" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1"/>
    <rect x="9"  y="10" width="10" height="1.5" rx="0.75" fill="#9CA3AF"/>
    <rect x="9"  y="13" width="7"  height="1.5" rx="0.75" fill="#9CA3AF"/>
    <rect x="9"  y="16" width="8.5" height="1.5" rx="0.75" fill="#9CA3AF"/>
  </svg>
);

// ─── Sparkline SVG paths ──────────────────────────────────────────────────────

type SparkColor = 'red' | 'green';

const Sparkline: React.FC<{ color: SparkColor; path: string }> = ({ color, path }) => (
  <svg width="60" height="24" viewBox="0 0 60 24" fill="none" aria-hidden="true">
    <path
      d={path}
      stroke={color === 'red' ? '#EF4444' : '#22C55E'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Varied sparkline paths
const SPARKLINES = {
  redDown:   'M2 6 L10 10 L18 8 L26 14 L34 12 L42 18 L50 16 L58 20',
  redMixed:  'M2 12 L10 8 L18 14 L26 6 L34 16 L42 10 L50 18 L58 14',
  greenUp:   'M2 20 L10 16 L18 18 L26 12 L34 14 L42 8 L50 10 L58 6',
  redDown2:  'M2 8 L10 12 L18 6 L26 16 L34 10 L42 18 L50 14 L58 20',
  greenUp2:  'M2 18 L10 14 L18 16 L26 10 L34 12 L42 6 L50 8 L58 4',
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const RECENTS = [
  { id: 1, icon: 'liveboard', name: 'Quarterly profit dashboard',     time: 'yesterday' },
  { id: 2, icon: 'answer',    name: 'Customer attrition by team',     time: '2 days ago' },
  { id: 3, icon: 'answer',    name: 'New leads by marketing chan...',  time: '4 days ago' },
  { id: 4, icon: 'answer',    name: 'Adelaide product pipeline',      time: '1 week ago' },
  { id: 5, icon: 'liveboard', name: 'Weekly active users',            time: '2 week ago' },
];

interface WatchlistItem {
  id: number;
  name: string;
  period: string;
  sparkline: keyof typeof SPARKLINES;
  pct: string;
  trend: 'up' | 'down';
  value: string;
}

const WATCHLIST: WatchlistItem[] = [
  { id: 1, name: 'Total Orders by Monthly Date', period: 'WoW', sparkline: 'redDown',  pct: '0.2%',   trend: 'down', value: '273.55M' },
  { id: 2, name: 'Active Users by Weekly Date',  period: 'Mom', sparkline: 'redMixed', pct: '26.10%', trend: 'up',   value: '10.07M'  },
  { id: 3, name: 'Sessions by Weekly Date',      period: 'Mom', sparkline: 'greenUp',  pct: '88.88%', trend: 'up',   value: '6.3%'    },
  { id: 4, name: 'Total Visits by Monthly Date', period: 'Mom', sparkline: 'redDown2', pct: '16.08%', trend: 'down', value: '14.52M'  },
  { id: 5, name: 'Total Revenue by Monthly...',  period: 'Mom', sparkline: 'greenUp2', pct: '0.3%',   trend: 'up',   value: '88.888M' },
];

// ─── Main component ───────────────────────────────────────────────────────────

export const HomepageV4: React.FC = () => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTabId>('insights');
  const [sidebarNav, setSidebarNav] = useState('home');

  const headerProps: GlobalHeaderProps = {
    searchPlaceholder: 'Search in your library',
    userName: 'Royal Enfield',
    notificationCount: 1,
    showHamburger: false,
  };

  const sidebarProps: AppSidebarProps = {
    tabs: SIDEBAR_TABS,
    activeTab: sidebarTab,
    onTabChange: (id) => { setSidebarTab(id as SidebarTabId); setSidebarNav(''); },
    categories: SIDEBAR_CATEGORIES,
    selectedNav: sidebarNav,
    onNavSelect: setSidebarNav,
  };

  return (
    <AppShell
      headerProps={headerProps}
      sidebarProps={sidebarProps}
      contentBackground="#EEEDF8"
      style={{ height: '100vh' }}
    >
      <div
        style={{
          height: '100%',
          overflowY: 'auto',
          background: '#EEEDF8',
          fontFamily: font,
        }}
      >
        {/* ── Hero section ──────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '56px 24px 40px',
          }}
        >
          {/* Headline */}
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#111827',
              fontFamily: font,
              letterSpacing: '-0.4px',
              margin: '0 0 28px 0',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            Lets take a{' '}
            <span style={{ color: '#2770EF' }}>deep dive</span>
            {' '}into your data.
          </h1>

          {/* Spotter box with animated gradient glow */}
          <div className={styles.spotterGlowOuter}>
            <div className={styles.spotterBox}>
              {/* Query input area */}
              <div style={{ padding: '20px 24px 16px' }}>
                <p
                  className={styles.queryText}
                  style={{ margin: 0 }}
                >
                  What is the average deal size by industry?
                  <span className={styles.queryCursor} />
                </p>
              </div>

              {/* Toolbar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px 12px',
                  borderTop: '1px solid #F3F4F6',
                }}
              >
                {/* Left icons */}
                <button className={styles.iconBtn} aria-label="Chart">
                  <IconSpotterChart />
                </button>
                <button className={styles.iconBtn} aria-label="AI">
                  <IconSpotterAI />
                </button>

                {/* Divider */}
                <div style={{ width: 1, height: 20, background: '#E5E7EB', margin: '0 2px' }} />

                {/* Data model selector */}
                <button className={styles.dataModelPill}>
                  All data model
                  <IconChevronDown />
                </button>

                {/* Add button */}
                <button className={styles.plusBtn} aria-label="Add data source">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Filter */}
                <button className={styles.iconBtn} aria-label="Filter options">
                  <IconFilter />
                </button>

                {/* Send */}
                <button className={styles.sendBtn} aria-label="Submit">
                  <IconArrowUp />
                </button>
              </div>
            </div>
          </div>

          {/* Quick action chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '16px',
            }}
          >
            <button className={styles.actionChip}>
              <IconSearch />
              Quick search
            </button>
            <button className={styles.actionChip}>
              <IconResearch />
              Deep research
            </button>
            <button className={styles.actionChip}>
              <IconData />
              Know your data
            </button>
            <button className={styles.actionChip}>
              <IconLiveboard />
              Create Liveboards
              <span className={styles.newBadge}>New</span>
            </button>
          </div>
        </div>

        {/* ── Recents + Watchlist ────────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 40px 48px',
            boxSizing: 'border-box',
          }}
        >
          {/* Recents card */}
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #E9EAEC',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #F3F4F6',
                fontSize: '15px',
                fontWeight: 700,
                color: '#111827',
                fontFamily: font,
              }}
            >
              Recents
            </div>
            <div>
              {RECENTS.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 20px',
                    borderBottom: idx < RECENTS.length - 1 ? '1px solid #F9FAFB' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F9FAFB'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                >
                  {item.icon === 'liveboard' ? <IconRecentsLiveboard /> : <IconRecentsAnswer />}
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '13.5px',
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
                    <div style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: font, marginTop: '2px' }}>
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Watchlist card */}
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #E9EAEC',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #F3F4F6',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#111827',
                  fontFamily: font,
                }}
              >
                Watchlist
              </span>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#2770EF',
                  fontFamily: font,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  padding: 0,
                }}
              >
                + Add KPI
              </button>
            </div>
            <div>
              {WATCHLIST.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '11px 20px',
                    borderBottom: idx < WATCHLIST.length - 1 ? '1px solid #F9FAFB' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F9FAFB'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                >
                  {/* Name + period */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '13px',
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
                    <div style={{ fontSize: '11.5px', color: '#9CA3AF', fontFamily: font, marginTop: '1px' }}>
                      {item.period}
                    </div>
                  </div>

                  {/* Sparkline */}
                  <Sparkline
                    color={item.sparkline.startsWith('red') ? 'red' : 'green'}
                    path={SPARKLINES[item.sparkline]}
                  />

                  {/* Percentage badge */}
                  <span className={item.trend === 'up' ? styles.badgeUp : styles.badgeDown}>
                    {item.pct}
                  </span>

                  {/* Value */}
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#111827',
                      fontFamily: font,
                      minWidth: '72px',
                      textAlign: 'right',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </AppShell>
  );
};

export default HomepageV4;
