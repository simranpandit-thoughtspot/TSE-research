import React, { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import type { AppSidebarProps, SidebarTab, SidebarCategory, ScopeToggle } from '../../components/AppSidebar';
import type { GlobalHeaderProps } from '../../components/GlobalHeader';
import { Tabs } from '../../components/Tabs';
import { Icon } from '../../components/icons';
import { GroupsTable, WizardModal, AddDetailsStep, ConfigureGroupStep, GroupDetailPanel } from './components';
import { pageHeaderStyles, toolbarStyles } from './styles';
import { groups as mockGroups, userManagementTabs, GroupItem } from './data/mockData';
import { systemColors } from '../../tokens/colors';

type SidebarTabId = 'insights' | 'data' | 'develop' | 'admin';

const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights' },
  { id: 'data', label: 'Data', headerTitle: 'Data Workspace' },
  { id: 'develop', label: 'Develop', headerTitle: 'Develop' },
  { id: 'admin', label: 'Admin', headerTitle: 'Admin Settings' },
];

const SIDEBAR_CATEGORIES: Record<SidebarTabId, SidebarCategory[]> = {
  insights: [
    {
      title: 'Navigation',
      items: [
        { id: 'home', label: 'Home' },
        { id: 'liveboards', label: 'Liveboards' },
        { id: 'answers', label: 'Answers' },
        { id: 'spotter', label: 'Spotter' },
      ],
    },
  ],
  data: [
    {
      title: 'Data Workspace',
      items: [
        { id: 'data-objects', label: 'Data objects' },
        { id: 'connections', label: 'Connections' },
        { id: 'utilities', label: 'Utilities' },
      ],
    },
  ],
  develop: [
    {
      title: 'Developer',
      items: [
        { id: 'playground', label: 'Playground' },
        { id: 'custom-actions', label: 'Custom actions' },
      ],
    },
  ],
  admin: [
    {
      title: 'ADMIN DASHBOARD',
      items: [
        { id: 'command-center', label: 'Command Center' },
        { id: 'usage-insights', label: 'Usage Insights' },
      ],
    },
    {
      title: 'USERS',
      items: [
        { id: 'user-management', label: 'User Management' },
        { id: 'feature-flag', label: 'Feature & Flag Management' },
      ],
    },
    {
      title: 'APPLICATION SETTINGS',
      items: [
        { id: 'general-settings', label: 'General Settings' },
        { id: 'core-features', label: 'Core Features' },
        { id: 'agent-settings', label: 'Agent Settings' },
        { id: 'customisations', label: 'Customisations' },
        { id: 'variables', label: 'Variables' },
        { id: 'vision-control', label: 'Vision Control' },
      ],
    },
    {
      title: 'SECURITY & PERFORMANCE',
      items: [
        { id: 'governance', label: 'Governance & Security' },
      ],
    },
    {
      title: 'SUPPORT',
      items: [
        { id: 'system-data', label: 'System & Data Integration' },
      ],
    },
  ],
};

const WIZARD_STEPS = [
  { title: 'Add details', stepTitle: 'Add details' },
  { title: 'Configure group', stepTitle: 'Configure group' },
];

interface WizardData {
  groupDetails: {
    groupName: string;
    displayName: string;
    description: string;
    allowSharing: boolean;
  };
  selectedRoleIds: string[];
  selectedParentGroupIds: string[];
  selectedUserIds: string[];
}

const initialWizardData: WizardData = {
  groupDetails: {
    groupName: '',
    displayName: '',
    description: '',
    allowSharing: false,
  },
  selectedRoleIds: [],
  selectedParentGroupIds: [],
  selectedUserIds: [],
};

export const AdminPortal2: React.FC = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [searchValue, setSearchValue] = useState('');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>(initialWizardData);
  const [groups, setGroups] = useState<GroupItem[]>(mockGroups);
  const [sidebarTab, setSidebarTab] = useState<SidebarTabId>('admin');
  const [sidebarNav, setSidebarNav] = useState('user-management');
  const [selectedGroup, setSelectedGroup] = useState<GroupItem | null>(null);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    group.subtitle.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCreateGroup = () => {
    setWizardData(initialWizardData);
    setWizardStep(0);
    setIsWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
    setWizardStep(0);
    setWizardData(initialWizardData);
  };

  const handleNextStep = () => {
    if (wizardStep < WIZARD_STEPS.length - 1) {
      setWizardStep(wizardStep + 1);
    } else {
      const newGroup: GroupItem = {
        id: `g-${Date.now()}`,
        name: wizardData.groupDetails.groupName || 'New Group',
        subtitle: wizardData.groupDetails.displayName || wizardData.groupDetails.groupName,
        userCount: wizardData.selectedUserIds.length,
        createdAt: 'Just now',
      };
      setGroups([newGroup, ...groups]);
      handleCloseWizard();
    }
  };

  const handlePrevStep = () => {
    if (wizardStep > 0) {
      setWizardStep(wizardStep - 1);
    }
  };

  const getNextLabel = () => {
    return wizardStep === WIZARD_STEPS.length - 1 ? 'Create' : 'Next';
  };

  const renderWizardStep = () => {
    switch (wizardStep) {
      case 0:
        return (
          <AddDetailsStep
            data={wizardData.groupDetails}
            onChange={(data) => setWizardData({ ...wizardData, groupDetails: data })}
          />
        );
      case 1:
        return (
          <ConfigureGroupStep
            selectedRoleIds={wizardData.selectedRoleIds}
            selectedParentGroupIds={wizardData.selectedParentGroupIds}
            selectedUserIds={wizardData.selectedUserIds}
            onRolesChange={(ids) => setWizardData({ ...wizardData, selectedRoleIds: ids })}
            onParentGroupChange={(ids) => setWizardData({ ...wizardData, selectedParentGroupIds: ids })}
            onUsersChange={(ids) => setWizardData({ ...wizardData, selectedUserIds: ids })}
          />
        );
      default:
        return null;
    }
  };

  const scopeToggle: ScopeToggle = {
    options: [
      { id: 'all-orgs', label: 'All orgs' },
      { id: 'primary-org', label: 'Primary org' },
    ],
    activeId: 'primary-org',
    onChange: () => {},
  };

  const headerProps: GlobalHeaderProps = {
    searchPlaceholder: 'Search in your library',
    userName: 'Royal Enfield',
    notificationCount: 1,
    showHamburger: true,
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

  return (
    <AppShell headerProps={headerProps} sidebarProps={sidebarProps} contentBackground="#FFFFFF" style={{ height: '100vh' }}>
      <div style={{ padding: '24px 32px' }}>
        {/* Page Header */}
        <div style={pageHeaderStyles.container}>
          <h1 style={pageHeaderStyles.title}>User management</h1>

          <div style={pageHeaderStyles.tabs}>
            <Tabs
              tabs={userManagementTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>

        {/* Toolbar */}
        <div style={toolbarStyles.container}>
          <div style={toolbarStyles.left}>
            <div style={toolbarStyles.searchWrapper as React.CSSProperties}>
              <span style={toolbarStyles.searchIcon as React.CSSProperties}>
                <Icon name="magnifying-glass" size="s" color="currentColor" />
              </span>
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={toolbarStyles.searchInput}
              />
            </div>
          </div>

          <div style={toolbarStyles.right}>
            <button style={toolbarStyles.settingsButton}>
              <Icon name="cog" size="s" color="currentColor" />
            </button>
            <div style={toolbarStyles.createButtonGroup}>
              <button style={toolbarStyles.createButton} onClick={handleCreateGroup}>
                Create new group
              </button>
              <button
                style={{
                  ...toolbarStyles.createChevron,
                  backgroundColor: systemColors.light['content-brand'],
                  borderLeft: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <Icon name="chevron-down" size="xs" color="#FFFFFF" />
              </button>
            </div>
          </div>
        </div>

        {/* Groups Table */}
        <GroupsTable
          groups={filteredGroups}
          onGroupClick={(group) => setSelectedGroup(group)}
        />
      </div>

      {/* Group Detail Panel */}
      {selectedGroup && (
        <GroupDetailPanel
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
          onGroupUpdate={(updatedGroup) => {
            setGroups(groups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
            setSelectedGroup(updatedGroup);
          }}
        />
      )}

      {/* Wizard Modal */}
      <WizardModal
        isOpen={isWizardOpen}
        onClose={handleCloseWizard}
        contextLabel="Create new group"
        currentStep={wizardStep}
        totalSteps={WIZARD_STEPS.length}
        stepTitle={WIZARD_STEPS[wizardStep]?.stepTitle || ''}
        onBack={handlePrevStep}
        onNext={handleNextStep}
        nextLabel={getNextLabel()}
        isNextDisabled={false}
        showBack={wizardStep > 0}
      >
        {renderWizardStep()}
      </WizardModal>
    </AppShell>
  );
};

export default AdminPortal2;
