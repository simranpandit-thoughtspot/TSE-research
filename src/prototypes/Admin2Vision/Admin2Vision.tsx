import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppShell } from '../../components/AppShell';
import type { AppSidebarProps, SidebarTab, SidebarCategory } from '../../components/AppSidebar/AppSidebar';
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
const CONTENT_BG = '#f6f8fa';
const BLUE = '#71a1f4';
const SIDEBAR_CATEGORY_LABEL = '#a5acb9';
const SIDEBAR_NAV_TEXT = '#dbdfe7';

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

// ─── Sidebar Config ───────────────────────────────────────────────────────────

// No icon prop — AppSidebar uses built-in icons for the standard tab IDs
const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights' },
  { id: 'data', label: 'Data', headerTitle: 'Data' },
  { id: 'develop', label: 'Develop', headerTitle: 'Develop' },
  { id: 'admin', label: 'Admin', headerTitle: 'Admin' },
];

const SIDEBAR_CATEGORIES: Record<string, SidebarCategory[]> = {
  insights: [],
  data: [],
  develop: [],
  admin: [
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
  ],
};

// ─── Search icon for Command Palette ─────────────────────────────────────────
const IconSearch: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="6.5" cy="6.5" r="4.5" stroke={color} strokeWidth="1.3" />
    <line x1="10" y1="10" x2="13.5" y2="13.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

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
  const [scope, setScope] = useState<'all' | 'primary'>('all');
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
    setHighlightedPage(page);
    const timer = setTimeout(() => setHighlightedPage(null), 2000);
    return () => clearTimeout(timer);
  }, []);

  const sidebarProps: AppSidebarProps = {
    tabs: SIDEBAR_TABS,
    activeTab,
    onTabChange: (id) => setActiveTab(id as SidebarTabId),
    categories: SIDEBAR_CATEGORIES,
    selectedNav: activePage,
    onNavSelect: (id) => setActivePage(id as PageId),
    scopeToggle: {
      options: [
        { id: 'all', label: 'All Orgs' },
        { id: 'primary', label: 'Primary Org' },
      ],
      activeId: scope,
      onChange: (id) => setScope(id as 'all' | 'primary'),
    },
    highlightedItem: highlightedPage,
  };

  return (
    <AppShell
      style={{ height: '100vh' }}
      headerProps={{
        searchMode: 'trigger',
        searchPlaceholder: 'Search or jump to…',
        onSearchClick: () => setPaletteOpen(true),
        showKeyboardHint: true,
        userName: 'Admin',
        showDefaultActions: true,
      }}
      sidebarProps={sidebarProps}
      contentBackground={CONTENT_BG}
      overlaySlot={
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onNavigate={navigateTo}
        />
      }
    >
      {activeTab === 'admin' ? (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
          <PageHeader title={PAGE_TITLES[activePage] || activePage} />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {renderPage(activePage, navigateTo)}
          </div>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            minHeight: '100%',
          }}
        >
          <div
            style={{
              fontFamily: font,
              fontSize: '13px',
              color: '#6b7280',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            Switch to the <strong style={{ color: BLUE }}>Admin</strong> tab to manage your instance.
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default Admin2Vision;
