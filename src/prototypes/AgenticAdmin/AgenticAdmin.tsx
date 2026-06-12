import React, { useState, useRef } from 'react';
import { AppShell } from '../../components/AppShell';
import type { AppSidebarProps, SidebarTab, SidebarCategory, ScopeToggle } from '../../components/AppSidebar';
import type { GlobalHeaderProps } from '../../components/GlobalHeader';
import { CommandCenter } from './components/CommandCenter';
import { AgentBar, type AgentBarHandle } from './components/AgentBar';
import styles from './AgenticAdmin.module.css';

// ── Import existing NewUIAdmin2 page components ────────────────────────────────
import { CustomisationPageContent } from '../NewUIAdmin2/CustomisationPageContent';
import { AISettingsPageContent } from '../NewUIAdmin2/AISettingsPageContent';
import { SearchSpotIQPageContent } from '../NewUIAdmin2/SearchSpotIQPageContent';
import { UserManagementPageContent } from '../NewUIAdmin2/UserManagementPageContent';
import { FeatureManagementPageContent } from '../NewUIAdmin2/FeatureManagementPageContent';
import { VariablesPageContent } from '../NewUIAdmin2/VariablesPageContent';
import { VersionControlPageContent } from '../NewUIAdmin2/VersionControlPageContent';
import { OnboardingPageContent } from '../NewUIAdmin2/OnboardingPageContent';
import { OrgManagementPageContent } from '../NewUIAdmin2/OrgManagementPageContent';
import { UsageAdoptionPageContent } from '../NewUIAdmin2/UsageAdoptionPageContent';
import { PerformanceTrackingPageContent } from '../NewUIAdmin2/PerformanceTrackingPageContent';
import { AIBIStatsPageContent } from '../NewUIAdmin2/AIBIStatsPageContent';
import { BillingQueryStatsPageContent } from '../NewUIAdmin2/BillingQueryStatsPageContent';
import { TermsPageContent } from '../NewUIAdmin2/TermsPageContent';
import { ScheduledMaintenancePageContent } from '../NewUIAdmin2/ScheduledMaintenancePageContent';

type SidebarTabId = 'insights' | 'data' | 'develop' | 'admin';
type Scope = 'all-orgs' | 'primary-org';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// ── Sidebar configuration (matches NewUIAdmin2) ───────────────────────────────

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
        { id: 'customisation', label: 'Customisation' },
        { id: 'ai-settings', label: 'AI settings' },
        { id: 'onboarding', label: 'Onboarding' },
        { id: 'search-spot-iq', label: 'Search & Spot IQ' },
      ],
    },
    {
      title: 'MONITOR',
      items: [
        { id: 'user-adoption', label: 'Usage & adoption' },
        { id: 'performance-tracking', label: 'Performance tracking' },
        { id: 'ai-bi-stats', label: 'AI & BI stats' },
        { id: 'billing-query-stats', label: 'Billing query stats' },
        { id: 'scheduled-maintenance', label: 'Scheduled maintenance' },
        { id: 'terms', label: 'Terms' },
      ],
    },
  ],
};

// ── Main component ────────────────────────────────────────────────────────────

export const AgenticAdmin: React.FC = () => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTabId>('admin');
  const [sidebarNav, setSidebarNav] = useState('home');
  const [scope, setScope] = useState<Scope>('all-orgs');
  const [agentBanner, setAgentBanner] = useState<string | null>(null);

  const agentBarRef = useRef<AgentBarHandle>(null);

  const handleSuggestedPrompt = (text: string) => {
    agentBarRef.current?.triggerPrompt(text);
  };

  const handleAgentNavigate = (page: string, banner?: string) => {
    setSidebarNav(page);
    setAgentBanner(banner ?? null);
    // Switch to admin tab if not already there
    setSidebarTab('admin');
  };

  const scopeToggle: ScopeToggle = {
    options: [
      { id: 'all-orgs', label: 'All Orgs' },
      { id: 'primary-org', label: 'Primary Org' },
    ],
    activeId: scope,
    onChange: (id: string) => setScope(id as Scope),
  };

  const headerProps: GlobalHeaderProps = {
    searchPlaceholder: 'Search in your library',
    userName: 'Primary',
    notificationCount: 3,
    showHamburger: false,
  };

  const sidebarProps: AppSidebarProps = {
    tabs: SIDEBAR_TABS,
    activeTab: sidebarTab,
    onTabChange: (tabId) => {
      setSidebarTab(tabId as SidebarTabId);
      setSidebarNav('');
    },
    categories: SIDEBAR_CATEGORIES,
    selectedNav: sidebarNav,
    onNavSelect: (id) => {
      setSidebarNav(id);
      setAgentBanner(null);
    },
    ...(sidebarTab === 'admin' ? { scopeToggle } : {}),
  };

  const renderPage = () => {
    switch (sidebarNav) {
      case 'home':
        return <CommandCenter onSuggestedPrompt={handleSuggestedPrompt} />;
      case 'org-management':
        return <OrgManagementPageContent />;
      case 'user-management':
        return <UserManagementPageContent scope={scope} />;
      case 'feature-management':
        return <FeatureManagementPageContent scope={scope} />;
      case 'variables':
        return <VariablesPageContent />;
      case 'version-control':
        return <VersionControlPageContent scope={scope} />;
      case 'customisation':
        return <CustomisationPageContent scope={scope} />;
      case 'ai-settings':
        return <AISettingsPageContent />;
      case 'onboarding':
        return <OnboardingPageContent />;
      case 'search-spot-iq':
        return <SearchSpotIQPageContent />;
      case 'user-adoption':
        return <UsageAdoptionPageContent />;
      case 'performance-tracking':
        return <PerformanceTrackingPageContent />;
      case 'ai-bi-stats':
        return <AIBIStatsPageContent />;
      case 'billing-query-stats':
        return <BillingQueryStatsPageContent />;
      case 'scheduled-maintenance':
        return <ScheduledMaintenancePageContent />;
      case 'terms':
        return <TermsPageContent />;
      default:
        return (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '100%', fontFamily: font, color: '#9CA3AF', fontSize: '14px',
          }}>
            Select a page from the sidebar
          </div>
        );
    }
  };

  return (
    <AppShell
      headerProps={headerProps}
      sidebarProps={sidebarProps}
      contentBackground="#FFFFFF"
      style={{ height: '100vh' } as React.CSSProperties}
    >
      <div className={styles.shell} style={{ fontFamily: font }}>
        {/* Page content area */}
        <div className={styles.pageArea}>
          {/* Agent navigation banner */}
          {agentBanner && (
            <div className={styles.agentBanner}>
              <span className={styles.agentBannerIcon}>✦</span>
              <span className={styles.agentBannerText}>
                Agent action: {agentBanner}. Review the details below and confirm.
              </span>
              <button
                className={styles.agentBannerDismiss}
                onClick={() => setAgentBanner(null)}
              >
                Dismiss
              </button>
            </div>
          )}
          {renderPage()}
        </div>

        {/* Agent bar — always visible at bottom */}
        <AgentBar ref={agentBarRef} onNavigate={handleAgentNavigate} />
      </div>
    </AppShell>
  );
};

export default AgenticAdmin;
