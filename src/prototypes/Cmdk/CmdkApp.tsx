// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import {
  AppShell,
  Toast,
} from '../../components';
import { Icon } from '../../components/icons';
import type { AppSidebarProps } from '../../components/AppSidebar';
import type { GlobalHeaderProps } from '../../components/GlobalHeader';
import { CommandPalette } from './CommandPalette';
import {
  allMockObjects,
  type CommandItem,
  type ThoughtSpotObjectType,
} from './data/mockData';
import {
  DEFAULT_NAV_BY_TAB,
  DEFAULT_TAB,
  NAV_ITEMS_BY_TAB,
  SIDEBAR_CATEGORIES,
  SIDEBAR_TABS,
  findNavIdForPage,
  getNavLabel,
  type AppTabId,
} from './data/appConfig';
import { HomePage } from './pages/HomePage';
import { LiveboardsPage } from './pages/LiveboardsPage';
import { LiveboardDetailPage } from './pages/LiveboardDetailPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AdminContentPage } from './pages/AdminContentPage';
import { CommandCentrePage } from './pages/CommandCentrePage';
import { BillingStatsPage } from './pages/BillingStatsPage';
import { SpotterPage } from './pages/SpotterPage';
import { GenericPage } from './pages/GenericPage';
import type { PageContext } from './types';

const OBJECT_TYPE_TO_DATA_NAV: Record<ThoughtSpotObjectType, string> = {
  Liveboard: 'liveboards',
  Answer: 'search-results',
  Collection: 'search-results',
  'Data Model': 'data-objects',
  Table: 'data-objects',
  Connection: 'connections',
};

const findTabForNavId = (navId: string): AppTabId | undefined => {
  const matched = (Object.entries(NAV_ITEMS_BY_TAB) as Array<[AppTabId, (typeof NAV_ITEMS_BY_TAB)[AppTabId]]>).find(
    ([, items]) => items.some((item) => item.id === navId),
  );
  return matched?.[0];
};

const getContextForState = (activeTab: AppTabId, selectedNav: string): PageContext => {
  if (activeTab === 'admin') {
    return 'admin';
  }
  if (selectedNav === 'spotter') {
    return 'spotter';
  }
  if (selectedNav === 'liveboards') {
    return 'liveboard';
  }
  return 'default';
};

export const CmdkApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTabId>(DEFAULT_TAB);
  const [selectedNav, setSelectedNav] = useState<string>(DEFAULT_NAV_BY_TAB[DEFAULT_TAB]);
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);
  const [adminScope, setAdminScope] = useState<'all-orgs' | 'primary-org'>('primary-org');

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandPaletteFilter, setCommandPaletteFilter] = useState<string | undefined>(undefined);

  const [selectedLiveboardId, setSelectedLiveboardId] = useState<string | null>(null);
  const [searchResultsQuery, setSearchResultsQuery] = useState('');
  const [searchObjectType, setSearchObjectType] = useState<string | undefined>(undefined);
  const [spotterQuery, setSpotterQuery] = useState('');

  const [toast, setToast] = useState<string | null>(null);

  const liveboardDetail = useMemo(
    () => allMockObjects.find((object) => object.id === selectedLiveboardId) ?? null,
    [selectedLiveboardId],
  );

  useEffect(() => {
    if (!highlightedItem) {
      return;
    }
    const timer = window.setTimeout(() => setHighlightedItem(null), 1200);
    return () => window.clearTimeout(timer);
  }, [highlightedItem]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandPaletteOpen((previous) => !previous);
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  const navigateTo = (tab: AppTabId, navId: string) => {
    setActiveTab(tab);
    setSelectedNav(navId);
    setHighlightedItem(navId);
    setSelectedLiveboardId(null);
  };

  const handleOpenObject = (objectId: string, objectType: ThoughtSpotObjectType) => {
    const targetNav = OBJECT_TYPE_TO_DATA_NAV[objectType];
    if (objectType === 'Liveboard') {
      setActiveTab('insights');
      setSelectedNav('liveboards');
      setSelectedLiveboardId(objectId);
      return;
    }

    if (objectType === 'Answer' || objectType === 'Collection') {
      setActiveTab('insights');
      setSelectedNav('search-results');
      setSearchResultsQuery(allMockObjects.find((object) => object.id === objectId)?.name ?? '');
      setSearchObjectType(objectType);
      return;
    }

    setActiveTab('data');
    setSelectedNav(targetNav);
    setSearchObjectType(objectType);
  };

  const handlePaletteSelect = (item: CommandItem) => {
    setCommandPaletteOpen(false);
    setCommandPaletteFilter(undefined);

    if (item.isViewAll && item.query) {
      setActiveTab('insights');
      setSelectedNav('search-results');
      setSearchResultsQuery(item.query);
      setSearchObjectType(undefined);
      return;
    }

    if (item.isSpotter) {
      setActiveTab('insights');
      setSelectedNav('spotter');
      setSpotterQuery(item.query ?? item.label);
      return;
    }

    if (item.isObject && item.objectId && item.objectType) {
      handleOpenObject(item.objectId, item.objectType);
      return;
    }

    if (item.action) {
      setToast(`Triggered action: ${item.label}`);
      setActiveTab('insights');
      setSelectedNav('home');
      return;
    }

    if (item.page) {
      const mappedNavId = findNavIdForPage(item.page);
      if (mappedNavId) {
        const targetTab = (item.appTab as AppTabId | undefined) ?? findTabForNavId(mappedNavId) ?? 'admin';
        navigateTo(targetTab, mappedNavId);
        return;
      }
    }

    if (item.appTab) {
      navigateTo(item.appTab as AppTabId, DEFAULT_NAV_BY_TAB[item.appTab as AppTabId]);
      return;
    }
  };

  const headerProps: GlobalHeaderProps = {
    searchPlaceholder: 'Search in ThoughtSpot',
    searchMode: 'trigger',
    onSearchClick: () => {
      setCommandPaletteFilter(undefined);
      setCommandPaletteOpen(true);
    },
    onLogoClick: () => {
      setActiveTab('insights');
      setSelectedNav('home');
      setSelectedLiveboardId(null);
      setSearchResultsQuery('');
      setSearchObjectType(undefined);
      setCommandPaletteFilter(undefined);
      setCommandPaletteOpen(false);
      setToast(null);
    },
    userName: 'Royal Enfield',
    notificationCount: 1,
  };

  const adminSearchIcon = (
    <button
      type="button"
      style={styles.adminSearchButton}
      onClick={() => {
        setCommandPaletteFilter('admin');
        setCommandPaletteOpen(true);
      }}
      title="Search admin settings"
    >
      <Icon name="search" size="s" color="var(--as-text, #A5ACB9)" />
    </button>
  );

  const sidebarTabs = useMemo(
    () =>
      SIDEBAR_TABS.map((tab) =>
        tab.id === 'admin' ? { ...tab, headerActionSlot: adminSearchIcon } : tab,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const sidebarProps: AppSidebarProps = {
    tabs: sidebarTabs,
    activeTab,
    onTabChange: (tabId) => {
      const nextTab = tabId as AppTabId;
      setActiveTab(nextTab);
      setSelectedNav(DEFAULT_NAV_BY_TAB[nextTab]);
      setSelectedLiveboardId(null);
    },
    categories: SIDEBAR_CATEGORIES,
    selectedNav,
    onNavSelect: (navId) => {
      setSelectedNav(navId);
      setHighlightedItem(navId);
      setSelectedLiveboardId(null);
      if (navId === 'search-results') {
        setSearchResultsQuery('');
      }
    },
    highlightedItem,
    scopeToggle: activeTab === 'admin'
      ? {
        options: [
          { id: 'all-orgs', label: 'All Orgs' },
          { id: 'primary-org', label: 'Primary Org' },
        ],
        activeId: adminScope,
        onChange: (id) => setAdminScope(id as 'all-orgs' | 'primary-org'),
      }
      : undefined,
  };

  const renderActiveContent = () => {
    if (selectedLiveboardId) {
      return <LiveboardDetailPage liveboard={liveboardDetail} onBack={() => setSelectedLiveboardId(null)} />;
    }

    if (activeTab === 'insights') {
      if (selectedNav === 'home') {
        return (
          <HomePage
            onOpenLiveboards={() => setSelectedNav('liveboards')}
            onOpenSpotter={() => setSelectedNav('spotter')}
          />
        );
      }
      if (selectedNav === 'liveboards') {
        return <LiveboardsPage objects={allMockObjects} onOpenLiveboard={setSelectedLiveboardId} />;
      }
      if (selectedNav === 'spotter') {
        return <SpotterPage initialQuery={spotterQuery} />;
      }
      if (selectedNav === 'search-results') {
        return (
          <SearchResultsPage
            query={searchResultsQuery}
            objectType={searchObjectType}
            objects={allMockObjects}
            onQueryChange={setSearchResultsQuery}
            onOpenObject={handleOpenObject}
          />
        );
      }
      return <GenericPage title={getNavLabel(selectedNav)} category="Insights" />;
    }

    if (activeTab === 'admin') {
      if (selectedNav === 'resource-control-centre') {
        return <CommandCentrePage />;
      }
      if (selectedNav === 'billing-stats') {
        return <BillingStatsPage />;
      }
      if (selectedNav === 'ai-and-bi-stats') {
        return <GenericPage title="AI and BI Stats" category="Admin overview" />;
      }
      return <AdminContentPage key={selectedNav} pageId={selectedNav} pageLabel={getNavLabel(selectedNav)} />;
    }

    if (activeTab === 'data') {
      return <GenericPage title={getNavLabel(selectedNav)} category="Data Workspace" />;
    }

    return <GenericPage title={getNavLabel(selectedNav)} category="Develop" />;
  };

  return (
    <div>
      <AppShell
        style={styles.shell}
        headerProps={headerProps}
        sidebarProps={sidebarProps}
        hideSidebar={Boolean(selectedLiveboardId)}
        contentBackground="#F6F8FA"
      >
        {renderActiveContent()}
      </AppShell>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => {
          setCommandPaletteOpen(false);
          setCommandPaletteFilter(undefined);
        }}
        onSelect={handlePaletteSelect}
        context={getContextForState(activeTab, selectedNav)}
        initialFilter={commandPaletteFilter}
      />

      {toast && (
        <Toast
          message={toast}
          type="success"
          isVisible
          duration={2500}
          onDismiss={() => setToast(null)}
          position="bottom-right"
        />
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  shell: {
    height: '100vh',
  },
  adminSearchButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    padding: 0,
    border: 'none',
    borderRadius: '50%',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'background 150ms ease',
  },
};

export default CmdkApp;
