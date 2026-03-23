import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ADMIN_NAV_COMMANDS } from './data/mockData';
import { CommandCentre } from './pages/CommandCentre';
import { UsersOrgs } from './pages/UsersOrgs';
import { Authentication } from './pages/Authentication';
import { GeneralSettings } from './pages/GeneralSettings';
import { AgentSettings } from './pages/AgentSettings';
import { FeatureManagement } from './pages/FeatureManagement';
import { Variables } from './pages/Variables';
import { VersionControl } from './pages/VersionControl';
import { AIBIStats } from './pages/AIBIStats';
import { UsageAdoption } from './pages/UsageAdoption';
import { BillingStats } from './pages/BillingStats';
import { PerformanceTracking } from './pages/PerformanceTracking';
import { Placeholder } from './pages/Placeholder';

// ─── Constants ────────────────────────────────────────────────────────────────
const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const SIDEBAR_BG = '#1d232f';
const SIDEBAR_ACTIVE_BG = 'rgba(113,161,244,0.12)';
const SIDEBAR_ACTIVE_TEXT = '#71a1f4';
const SIDEBAR_HIGHLIGHT_BG = 'rgba(113,161,244,0.3)';
const SIDEBAR_HOVER_BG = 'rgba(113,161,244,0.06)';
const SIDEBAR_NAV_TEXT = '#dbdfe7';
const SIDEBAR_CATEGORY_LABEL = '#a5acb9';
const SIDEBAR_BORDER = '#323946';
const TOPNAV_BG = '#1d232f';
const CONTENT_BG = '#f6f8fa';
const BLUE = '#71a1f4';

type SidebarTabId = 'insights' | 'data' | 'develop' | 'admin';
type PageId =
  | 'command-centre'
  | 'ai-bi-stats'
  | 'object-usage'
  | 'users-orgs'
  | 'authentication'
  | 'user-adoption'
  | 'general-settings'
  | 'agent-settings'
  | 'feature-management'
  | 'customisations'
  | 'variables'
  | 'version-control'
  | 'simulations'
  | 'governance'
  | 'connections'
  | 'infrastructure'
  | 'performance-tracking'
  | 'billing-stats';

const PAGE_TITLES: Record<PageId, string> = {
  'command-centre': 'Command Centre',
  'ai-bi-stats': 'AI & BI Stats',
  'object-usage': 'Object Usage',
  'users-orgs': 'Users & Orgs',
  'authentication': 'Authentication',
  'user-adoption': 'User Adoption',
  'general-settings': 'General Settings',
  'agent-settings': 'Agent Settings',
  'feature-management': 'Feature Management',
  'customisations': 'Customisations',
  'variables': 'Variables',
  'version-control': 'Version Control',
  'simulations': 'Simulations & Impersonation',
  'governance': 'Governance & Security',
  'connections': 'Connections & Integrations',
  'infrastructure': 'Infrastructure & Support',
  'performance-tracking': 'Performance Tracking',
  'billing-stats': 'Billing Stats',
};

type ScopeId = 'all' | 'primary';

interface NavCategory {
  title: string;
  items: { id: PageId; label: string }[];
}

const ADMIN_CATEGORIES: NavCategory[] = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'command-centre', label: 'Command centre' },
      { id: 'ai-bi-stats', label: 'AI & BI Stats' },
      { id: 'object-usage', label: 'Object usage' },
    ],
  },
  {
    title: 'USERS & IDENTITY',
    items: [
      { id: 'users-orgs', label: 'Users & Orgs' },
      { id: 'authentication', label: 'Authentication' },
      { id: 'user-adoption', label: 'User adoption' },
    ],
  },
  {
    title: 'APPLICATION SETTINGS',
    items: [
      { id: 'general-settings', label: 'General settings' },
      { id: 'agent-settings', label: 'Agent settings' },
      { id: 'feature-management', label: 'Feature management' },
      { id: 'customisations', label: 'Customisations' },
      { id: 'variables', label: 'Variables' },
      { id: 'version-control', label: 'Version control' },
    ],
  },
  {
    title: 'SECURITY',
    items: [
      { id: 'simulations', label: 'Simulations & Impersonation' },
      { id: 'governance', label: 'Governance & Security' },
    ],
  },
  {
    title: 'SUPPORT AND INFRASTRUCTURE',
    items: [
      { id: 'connections', label: 'Connections & Integrations' },
      { id: 'infrastructure', label: 'Infrastructure & Support' },
    ],
  },
];

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const IconBarChart: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="2" y="10" width="3" height="6" rx="1" fill={color} />
    <rect x="7.5" y="6" width="3" height="10" rx="1" fill={color} />
    <rect x="13" y="2" width="3" height="14" rx="1" fill={color} />
  </svg>
);

const IconGrid: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="2" y="2" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.4" />
    <rect x="10" y="2" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.4" />
    <rect x="2" y="10" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.4" />
    <rect x="10" y="10" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.4" />
  </svg>
);

const IconCode: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M6 5L2 9L6 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5L16 9L12 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconGear: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="2.5" stroke={color} strokeWidth="1.4" />
    <path d="M9 2v1.5M9 14.5V16M2 9h1.5M14.5 9H16M4.1 4.1l1.06 1.06M12.84 12.84l1.06 1.06M4.1 13.9l1.06-1.06M12.84 5.16l1.06-1.06" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconSearch: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="6.5" cy="6.5" r="4.5" stroke={color} strokeWidth="1.3" />
    <line x1="10" y1="10" x2="13.5" y2="13.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconBell: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 2a5 5 0 0 0-5 5v2l-1 2h12l-1-2V7a5 5 0 0 0-5-5Z" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M6.5 13a1.5 1.5 0 0 0 3 0" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconQuestion: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.3" />
    <path d="M6.5 6a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 3" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="8" cy="12" r="0.7" fill={color} />
  </svg>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar: React.FC = () => (
  <div
    style={{
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: BLUE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 700,
      color: '#fff',
      fontFamily: font,
      flexShrink: 0,
      cursor: 'pointer',
    }}
  >
    AS
  </div>
);

// ─── TopNav ───────────────────────────────────────────────────────────────────
interface TopNavProps {
  onOpenPalette: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ onOpenPalette }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: TOPNAV_BG,
      borderBottom: `1px solid ${SIDEBAR_BORDER}`,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: '16px',
      zIndex: 100,
    }}
  >
    {/* Logo */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '220px', flexShrink: 0 }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill={BLUE} />
        <path d="M8 20L14 8L20 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="10" y1="16" x2="18" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: font, fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
        ThoughtSpot
      </span>
    </div>

    {/* Search */}
    <button
      onClick={onOpenPalette}
      style={{
        flex: 1,
        maxWidth: '480px',
        height: '36px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 14px',
        cursor: 'pointer',
        transition: 'background-color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
    >
      <IconSearch color="#a5acb9" />
      <span style={{ fontFamily: font, fontSize: '13px', color: '#a5acb9', flex: 1, textAlign: 'left' }}>
        Search or jump to…
      </span>
      <kbd style={{ fontFamily: font, fontSize: '11px', color: '#777e8b', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '2px 6px' }}>
        ⌘K
      </kbd>
    </button>

    {/* Right icons */}
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[IconQuestion, IconBell].map((Icon, i) => (
        <button
          key={i}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '7px',
            border: 'none',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#a5acb9',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
        >
          <Icon color="#a5acb9" />
        </button>
      ))}
      <div style={{ marginLeft: '8px' }}>
        <Avatar />
      </div>
    </div>
  </div>
);

// ─── Sidebar ──────────────────────────────────────────────────────────────────
interface SidebarProps {
  activeTab: SidebarTabId;
  onTabChange: (tab: SidebarTabId) => void;
  activePage: PageId;
  onPageChange: (page: PageId) => void;
  scope: ScopeId;
  onScopeChange: (scope: ScopeId) => void;
  highlightedPage: PageId | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  activePage,
  onPageChange,
  scope,
  onScopeChange,
  highlightedPage,
}) => {
  const sidebarTabs: { id: SidebarTabId; Icon: React.FC<{ size?: number; color?: string }> }[] = [
    { id: 'insights', Icon: IconBarChart },
    { id: 'data', Icon: IconGrid },
    { id: 'develop', Icon: IconCode },
    { id: 'admin', Icon: IconGear },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        bottom: 0,
        width: '261px',
        backgroundColor: SIDEBAR_BG,
        borderRight: `1px solid ${SIDEBAR_BORDER}`,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 90,
        overflow: 'hidden',
      }}
    >
      {/* Tab icons row */}
      <div
        style={{
          display: 'flex',
          borderBottom: `1px solid ${SIDEBAR_BORDER}`,
          padding: '0 8px',
          flexShrink: 0,
        }}
      >
        {sidebarTabs.map(({ id, Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            title={id.charAt(0).toUpperCase() + id.slice(1)}
            style={{
              flex: 1,
              height: '52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === id ? `2px solid ${BLUE}` : '2px solid transparent',
              marginBottom: '-1px',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = SIDEBAR_HOVER_BG; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
          >
            <Icon
              size={18}
              color={activeTab === id ? SIDEBAR_ACTIVE_TEXT : SIDEBAR_CATEGORY_LABEL}
            />
          </button>
        ))}
      </div>

      {/* Nav area — scrollable */}
      {activeTab === 'admin' ? (
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {/* Scope Toggle */}
          <div style={{ padding: '16px 12px 8px' }}>
            <div
              style={{
                display: 'flex',
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '3px',
                gap: '2px',
              }}
            >
              {[
                { id: 'all' as ScopeId, label: 'All Orgs' },
                { id: 'primary' as ScopeId, label: 'Primary Org' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => onScopeChange(id)}
                  style={{
                    flex: 1,
                    height: '28px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: scope === id ? 'rgba(113,161,244,0.2)' : 'transparent',
                    color: scope === id ? SIDEBAR_ACTIVE_TEXT : SIDEBAR_CATEGORY_LABEL,
                    fontFamily: font,
                    fontSize: '12px',
                    fontWeight: scope === id ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'background-color 0.15s, color 0.15s',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          {ADMIN_CATEGORIES.map((cat) => (
            <div key={cat.title} style={{ marginBottom: '4px' }}>
              <div
                style={{
                  padding: '10px 16px 4px',
                  fontFamily: font,
                  fontSize: '10.5px',
                  fontWeight: 600,
                  color: SIDEBAR_CATEGORY_LABEL,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {cat.title}
              </div>
              {cat.items.map((item) => {
                const isActive = activePage === item.id;
                const isHighlighted = highlightedPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: 'calc(100% - 12px)',
                      padding: '8px 16px',
                      border: 'none',
                      textAlign: 'left',
                      fontFamily: font,
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? SIDEBAR_ACTIVE_TEXT : isHighlighted ? SIDEBAR_ACTIVE_TEXT : SIDEBAR_NAV_TEXT,
                      backgroundColor: isHighlighted ? SIDEBAR_HIGHLIGHT_BG : isActive ? SIDEBAR_ACTIVE_BG : 'transparent',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      margin: '1px 6px',
                      transition: 'background-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive && !isHighlighted) (e.currentTarget as HTMLButtonElement).style.backgroundColor = SIDEBAR_HOVER_BG;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive && !isHighlighted) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
          <div style={{ height: '24px' }} />
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 16px',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontFamily: font,
              fontSize: '12.5px',
              color: SIDEBAR_CATEGORY_LABEL,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Switch to the <strong style={{ color: SIDEBAR_ACTIVE_TEXT }}>Admin</strong> tab to<br />manage your instance.
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Command Palette ──────────────────────────────────────────────────────────
interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

type CmdFilter = 'all' | 'liveboards' | 'answers' | 'collections' | 'data-models' | 'tables' | 'connections';

const CMD_FILTERS: { id: CmdFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'liveboards', label: 'Liveboards' },
  { id: 'answers', label: 'Answers' },
  { id: 'collections', label: 'Collections' },
  { id: 'data-models', label: 'Data Models' },
  { id: 'tables', label: 'Tables' },
  { id: 'connections', label: 'Connections' },
];

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CmdFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = ADMIN_NAV_COMMANDS.filter(
    (cmd) => !query || cmd.label.toLowerCase().includes(query.toLowerCase()) || cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1)); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); return; }
      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        onNavigate(filteredCommands[selectedIndex].id as PageId);
        onClose();
        return;
      }
    },
    [open, onClose, onNavigate, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  if (!open) return null;

  // Group filtered commands by category
  const grouped: Record<string, typeof filteredCommands> = {};
  filteredCommands.forEach((cmd) => {
    if (!grouped[cmd.category]) grouped[cmd.category] = [];
    grouped[cmd.category].push(cmd);
  });

  let globalIndex = 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(29,35,47,0.6)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '120px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '620px',
          maxHeight: '520px',
          backgroundColor: '#1d232f',
          borderRadius: '14px',
          border: '1px solid #323946',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid #323946',
          }}
        >
          <IconSearch size={16} color="#a5acb9" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or navigate to…"
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              fontFamily: font,
              fontSize: '15px',
              color: '#fff',
              outline: 'none',
            }}
          />
          <kbd
            style={{
              fontFamily: font,
              fontSize: '11px',
              color: '#777e8b',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              padding: '2px 6px',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Filters */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            padding: '10px 16px',
            borderBottom: '1px solid #323946',
            overflowX: 'auto',
            flexShrink: 0,
          }}
        >
          {CMD_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '4px 12px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: filter === f.id ? 'rgba(113,161,244,0.2)' : 'rgba(255,255,255,0.05)',
                color: filter === f.id ? BLUE : '#a5acb9',
                fontFamily: font,
                fontSize: '12.5px',
                fontWeight: filter === f.id ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredCommands.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', fontFamily: font, fontSize: '13px', color: '#777e8b' }}>
              No results for "{query}"
            </div>
          ) : (
            Object.entries(grouped).map(([category, cmds]) => (
              <div key={category}>
                <div
                  style={{
                    padding: '10px 20px 4px',
                    fontFamily: font,
                    fontSize: '10.5px',
                    fontWeight: 600,
                    color: SIDEBAR_CATEGORY_LABEL,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {category}
                </div>
                {cmds.map((cmd) => {
                  const idx = globalIndex++;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        onNavigate(cmd.id as PageId);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%',
                        padding: '10px 20px',
                        border: 'none',
                        textAlign: 'left',
                        fontFamily: font,
                        fontSize: '13.5px',
                        color: isSelected ? '#fff' : SIDEBAR_NAV_TEXT,
                        backgroundColor: isSelected ? 'rgba(113,161,244,0.15)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.1s',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 4l3 3-3 3" stroke={isSelected ? BLUE : '#777e8b'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {cmd.label}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '10px 20px',
            borderTop: '1px solid #323946',
            display: 'flex',
            gap: '16px',
            flexShrink: 0,
          }}
        >
          {[
            { key: '↵', label: 'to select' },
            { key: '↑↓', label: 'to navigate' },
            { key: 'ESC', label: 'to close' },
          ].map(({ key, label }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <kbd style={{ fontFamily: font, fontSize: '10px', color: '#777e8b', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', padding: '1px 5px' }}>
                {key}
              </kbd>
              <span style={{ fontFamily: font, fontSize: '11px', color: '#777e8b' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Page Header ──────────────────────────────────────────────────────────────
const PageHeader: React.FC<{ title: string }> = ({ title }) => (
  <div
    style={{
      height: '60px',
      borderBottom: '1px solid #eaedf2',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      backgroundColor: '#fff',
      flexShrink: 0,
    }}
  >
    <h1
      style={{
        fontFamily: font,
        fontSize: '18px',
        fontWeight: 700,
        color: '#1d232f',
        margin: 0,
      }}
    >
      {title}
    </h1>
  </div>
);

// ─── Page Renderer ────────────────────────────────────────────────────────────
const renderPage = (page: PageId, onNavigate: (page: PageId) => void) => {
  const onNavigateStr = (p: string) => onNavigate(p as PageId);
  switch (page) {
    case 'command-centre': return <CommandCentre onNavigate={onNavigateStr} />;
    case 'ai-bi-stats': return <AIBIStats />;
    case 'users-orgs': return <UsersOrgs />;
    case 'authentication': return <Authentication />;
    case 'user-adoption': return <UsageAdoption />;
    case 'general-settings': return <GeneralSettings />;
    case 'agent-settings': return <AgentSettings />;
    case 'feature-management': return <FeatureManagement />;
    case 'variables': return <Variables />;
    case 'version-control': return <VersionControl />;
    case 'billing-stats': return <BillingStats />;
    case 'infrastructure':
    case 'performance-tracking': return <PerformanceTracking />;
    case 'object-usage':
      return <Placeholder title="Object Usage" description="View and manage all ThoughtSpot objects across orgs, including liveboards, answers, worksheets, and connections." />;
    case 'customisations':
      return <Placeholder title="Customisations" description="Manage brand settings, themes, logo uploads, font selections, and chart colour palettes for all orgs." />;
    case 'simulations':
      return <Placeholder title="Simulations & Impersonation" description="Run admin simulations and impersonate users to debug issues without sharing credentials." />;
    case 'governance':
      return <Placeholder title="Governance & Security" description="Configure row-level security, column masking, data access policies, and audit logging." />;
    case 'connections':
      return <Placeholder title="Connections & Integrations" description="Manage data connections, API tokens, webhook endpoints, and third-party integrations." />;
    default:
      return <Placeholder title={PAGE_TITLES[page] || 'Page'} />;
  }
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const Admin2Vision: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTabId>('admin');
  const [activePage, setActivePage] = useState<PageId>('command-centre');
  const [scope, setScope] = useState<ScopeId>('all');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [highlightedPage, setHighlightedPage] = useState<PageId | null>(null);

  // Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const navigateTo = useCallback((page: PageId) => {
    setActiveTab('admin');
    setActivePage(page);
    // Highlight animation
    setHighlightedPage(page);
    const timer = setTimeout(() => setHighlightedPage(null), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePaletteNavigate = useCallback((page: PageId) => {
    navigateTo(page);
  }, [navigateTo]);

  return (
    <div style={{ fontFamily: font, minHeight: '100vh', backgroundColor: CONTENT_BG }}>
      <TopNav onOpenPalette={() => setPaletteOpen(true)} />

      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activePage={activePage}
        onPageChange={setActivePage}
        scope={scope}
        onScopeChange={setScope}
        highlightedPage={highlightedPage}
      />

      {/* Main content */}
      <div
        style={{
          marginLeft: '261px',
          marginTop: '60px',
          minHeight: 'calc(100vh - 60px)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: CONTENT_BG,
        }}
      >
        <PageHeader title={PAGE_TITLES[activePage] || activePage} />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {renderPage(activePage, navigateTo)}
        </div>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={handlePaletteNavigate}
      />
    </div>
  );
};

export default Admin2Vision;
