import React, { useState, useRef, useEffect } from 'react';
import { AppShell } from '../../components/AppShell';
import type { AppSidebarProps, SidebarTab, SidebarCategory, ScopeToggle } from '../../components/AppSidebar';
import type { GlobalHeaderProps } from '../../components/GlobalHeader';
import { systemColors } from '../../tokens/colors';
import {
  mockGroupsUC1,
  mockGroupsUC23,
  mockUsers,
  Group,
  User,
  availableParentGroupsUC23,
  parentGroupInfoMapUC23,
} from './data/mockData';
import {
  GroupsTable,
  UsersTable,
  UserDetailsModal,
  GroupDetailsModal,
  EditGroupModal,
  DuplicateGroupWizard,
  AddUserWizard,
  EditUserWizard,
} from './components';
import { PrivilegesPanel } from './components/PrivilegesPanel';
import type { ChecklistItem } from './components/ChecklistSelector';

type MainTab = 'users' | 'groups' | 'roles' | 'authentication';
type SidebarTabId = 'insights' | 'data' | 'develop' | 'admin';
type GroupDetailTab = 'users' | 'roles' | 'lineage';

// ─── Use case configuration ───────────────────────────────────────────────────

interface UseCaseConfig {
  id: number;
  number: string;
  title: string;
  subtitle?: string;
  bgColor: string;
  subtitleColor?: string;
}

const USE_CASES: UseCaseConfig[] = [
  { id: 1, number: '0', title: '0th view of groups', bgColor: '#52B87A' },
  { id: 2, number: '2', title: 'Admin assigns a new user to a preset group.', subtitle: 'Admin creates a new user, selects a default group e.g. "Standard Contributor," and the user automatically inherits the role and corresponding privileges defined for that group.', bgColor: '#52B87A' },
  { id: 3, number: '3', title: 'Admin edits the users of a default group (but cannot delete the group).', subtitle: 'Admin modifies the "Read-Only" default group to add new users to it. But the interface prevents the "Delete Group" action.', bgColor: '#52B87A' },
  { id: 4, number: '4', title: 'Admin duplicates a group (Preset groups + other groups) and customizes privileges to fit in the new use case', subtitle: 'Admin selects a default group ("Administrator"), chooses "Duplicate," names it "Senior Project Manager," and then adds two unique, higher-level privileges before saving the new, non-default group.', bgColor: '#52B87A' },
  { id: 5, number: '5', title: 'Not let the admin create a duplicate group/role with the same name.', subtitle: 'Admin attempts to create a new group named "Administrators" when a group with that exact name already exists. The system prevents creation and displays a message: "A group or role with this name already exists."', bgColor: '#FAF0EE', subtitleColor: '#CC2200' },
  { id: 6, number: '6', title: 'Admin assigns a user to a group and is shown a summary of the privileges that will be granted.', subtitle: 'When assigning the user to the "Finance Team" group, a pop-up window or sidebar displays a list: "Privileges to be Granted: Access Financial Reports, Edit Budget Line Items, View Audit Logs."', bgColor: '#52B87A' },
  { id: 7, number: '7', title: 'Admin tries to bulk delete groups.', subtitle: 'Admin will not be able to bulk delete if the preset and default groups are also selected.', bgColor: '#FAF0EE', subtitleColor: '#CC2200' },
];

// ─── Sidebar / header constants ───────────────────────────────────────────────

const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights' },
  { id: 'data', label: 'Data', headerTitle: 'Data Workspace' },
  { id: 'develop', label: 'Develop', headerTitle: 'Develop' },
  { id: 'admin', label: 'Admin', headerTitle: 'Admin Settings' },
];

const SIDEBAR_CATEGORIES: Record<SidebarTabId, SidebarCategory[]> = {
  insights: [{ title: 'Navigation', items: [{ id: 'home', label: 'Home' }] }],
  data: [{ title: 'Data', items: [{ id: 'data-objects', label: 'Data objects' }] }],
  develop: [{ title: 'Developer', items: [{ id: 'playground', label: 'Playground' }] }],
  admin: [
    {
      title: 'Admin dashboard',
      items: [
        { id: 'command-center', label: 'Command Center' },
        { id: 'usage-insights', label: 'Usage Insights' },
      ],
    },
    {
      title: 'Users',
      items: [
        { id: 'user-management', label: 'User Management' },
        { id: 'feature-flag', label: 'Feature & Flag Management' },
      ],
    },
    {
      title: 'Application Settings',
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
      title: 'Security & Performance',
      items: [{ id: 'governance', label: 'Governance & Security' }],
    },
    {
      title: 'Support',
      items: [{ id: 'system-data', label: 'System & Data Integration' }],
    },
  ],
};

const MAIN_TABS: { id: MainTab; label: string }[] = [
  { id: 'users', label: 'Users' },
  { id: 'groups', label: 'Groups' },
  { id: 'roles', label: 'Roles' },
  { id: 'authentication', label: 'Authentication' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DEFAULT_BADGE = (
  <span style={{
    fontSize: 11, fontWeight: 600, color: '#fff',
    background: '#2770EF', borderRadius: 4, padding: '1px 7px',
  }}>
    Default
  </span>
);

function buildUC23ParentGroupItems(): ChecklistItem[] {
  return availableParentGroupsUC23.map((g) => {
    const info = parentGroupInfoMapUC23[g];
    return {
      id: g,
      label: g,
      badge: g === 'Administrator' ? DEFAULT_BADGE : undefined,
      infoContent: info ? <PrivilegesPanel privileges={info.privileges} /> : undefined,
    };
  });
}

// ─── Component ───────────────────────────────────────────────────────────────

export const RBAC: React.FC = () => {
  // Use case
  const [useCaseId, setUseCaseId] = useState(1);
  const [showIntro, setShowIntro] = useState(true);

  // Toast — group updated
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Toast — group duplicated
  const [showDuplicateToast, setShowDuplicateToast] = useState(false);
  const duplicateToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Toast — user updated
  const [showUserToast, setShowUserToast] = useState(false);
  const userToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // RBAC state
  const [mainTab, setMainTab] = useState<MainTab>('groups');
  const [sidebarTab, setSidebarTab] = useState<SidebarTabId>('admin');
  const [sidebarNav, setSidebarNav] = useState('user-management');
  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [groupDetail, setGroupDetail] = useState<{ group: Group; tab: GroupDetailTab } | null>(null);
  const [editGroup, setEditGroup] = useState<Group | null>(null);
  const [duplicateGroup, setDuplicateGroup] = useState<Group | null>(null);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  // Cleanup timers on unmount
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);
  useEffect(() => () => { if (duplicateToastTimer.current) clearTimeout(duplicateToastTimer.current); }, []);
  useEffect(() => () => { if (userToastTimer.current) clearTimeout(userToastTimer.current); }, []);

  const handleUseCaseChange = (id: number) => {
    setUseCaseId(id);
    setShowIntro(true);
    setMainTab(id === 6 ? 'users' : 'groups');
    setSearchValue('');
    setEditGroup(null);
    setDuplicateGroup(null);
    setGroupDetail(null);
    setSelectedUser(null);
    setShowToast(false);
    setShowUserToast(false);
    setSelectedGroupIds([]);
    setShowAddUser(false);
    setEditUser(null);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (userToastTimer.current) clearTimeout(userToastTimer.current);
  };

  const triggerToast = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setShowToast(true);
    toastTimer.current = setTimeout(() => setShowToast(false), 4000);
  };

  const triggerDuplicateToast = () => {
    if (duplicateToastTimer.current) clearTimeout(duplicateToastTimer.current);
    setShowDuplicateToast(true);
    duplicateToastTimer.current = setTimeout(() => setShowDuplicateToast(false), 4000);
  };

  // Current use case data
  const currentGroups = useCaseId === 1 ? mockGroupsUC1 : mockGroupsUC23;
  const currentUseCase = USE_CASES.find((uc) => uc.id === useCaseId)!;

  // For UC2/3 edit modal: specific parent group items + initial selections
  const isUC23 = useCaseId === 2 || useCaseId === 3;
  const uc23ParentGroupItems = isUC23 ? buildUC23ParentGroupItems() : undefined;
  const uc23InitialParentGroups = isUC23
    ? ['Power users', 'Group default', 'BYPASSRLS_group']
    : undefined;

  // For UC4/5 duplicate wizard
  const isUC45 = useCaseId === 4 || useCaseId === 5;
  const uc45ExistingNames = isUC45
    ? [...mockGroupsUC23.map((g) => g.displayName), ...mockGroupsUC23.map((g) => g.name)]
    : undefined;
  const uc45OnSave = isUC45 ? triggerDuplicateToast : undefined;

  // Bulk mode
  const hasDefaultGroupSelected = currentGroups
    .filter((g) => selectedGroupIds.includes(g.id))
    .some((g) => g.isDefault);
  const bulkMode = selectedGroupIds.length > 0;

  const filteredGroups = currentGroups.filter((g) =>
    g.displayName.toLowerCase().includes(searchValue.toLowerCase()) ||
    g.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredUsers = mockUsers.filter((u) =>
    u.displayName.toLowerCase().includes(searchValue.toLowerCase()) ||
    u.username.toLowerCase().includes(searchValue.toLowerCase())
  );

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
    userName: 'Royal Enfiled',
    notificationCount: 1,
    showHamburger: true,
  };

  const sidebarProps: AppSidebarProps = {
    tabs: SIDEBAR_TABS,
    activeTab: sidebarTab,
    onTabChange: (id) => setSidebarTab(id as SidebarTabId),
    categories: SIDEBAR_CATEGORIES,
    selectedNav: sidebarNav,
    onNavSelect: setSidebarNav,
    ...(sidebarTab === 'admin' ? { scopeToggle } : {}),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

      {/* ── Use case tab bar ── */}
      <div style={{
        height: 40,
        flexShrink: 0,
        background: '#1D232F',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        gap: 2,
      }}>
        {USE_CASES.map((uc) => {
          const active = useCaseId === uc.id;
          return (
            <button
              key={uc.id}
              onClick={() => handleUseCaseChange(uc.id)}
              style={{
                height: 28,
                padding: '0 14px',
                background: active ? '#2770EF' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                fontFamily: 'inherit',
                transition: 'background 150ms',
              }}
            >
              Use case {uc.id}
            </button>
          );
        })}
      </div>

      {/* ── App content (AppShell + intro overlay) ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AppShell
          headerProps={headerProps}
          sidebarProps={sidebarProps}
          contentBackground="#FFFFFF"
          style={{ height: '100%' }}
        >
          {/* Sticky page header */}
          <div style={{
            padding: '24px 32px 0',
            borderBottom: `1px solid ${systemColors.light['border-divider']}`,
            position: 'sticky',
            top: 0,
            background: '#fff',
            zIndex: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: systemColors.light['content-primary'], margin: 0 }}>
                User management
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 0 }}>
              {MAIN_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setMainTab(tab.id); setSearchValue(''); setSelectedGroupIds([]); }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '0 4px 12px', marginRight: 24, fontSize: 14,
                    fontWeight: mainTab === tab.id ? 600 : 400,
                    color: mainTab === tab.id ? '#2770EF' : systemColors.light['content-secondary'],
                    borderBottom: mainTab === tab.id ? '2px solid #2770EF' : '2px solid transparent',
                    fontFamily: 'inherit',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '20px 32px' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              {mainTab === 'groups' && bulkMode ? (
                /* Bulk mode toolbar */
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    style={{
                      height: 36, padding: '0 16px', background: '#fff',
                      border: `1px solid ${systemColors.light['border-default']}`,
                      borderRadius: 6, cursor: 'pointer', fontSize: 14,
                      fontFamily: 'inherit', color: systemColors.light['content-primary'],
                    }}
                  >
                    Export
                  </button>
                  <button
                    disabled={hasDefaultGroupSelected}
                    style={{
                      height: 36, padding: '0 16px', background: '#fff',
                      border: `1px solid ${systemColors.light['border-default']}`,
                      borderRadius: 6, fontSize: 14, fontFamily: 'inherit',
                      cursor: hasDefaultGroupSelected ? 'default' : 'pointer',
                      color: hasDefaultGroupSelected
                        ? systemColors.light['content-tertiary']
                        : systemColors.light['content-primary'],
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                /* Normal toolbar */
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: systemColors.light['content-tertiary'], pointerEvents: 'none', display: 'flex' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      style={{
                        height: 36, width: 240, paddingLeft: 32, paddingRight: 12,
                        border: `1px solid ${systemColors.light['border-default']}`,
                        borderRadius: 6, fontSize: 14, outline: 'none', fontFamily: 'inherit',
                        color: systemColors.light['content-primary'],
                      }}
                    />
                  </div>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#2770EF', fontFamily: 'inherit' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Add filter
                  </button>
                </div>
              )}

              {/* Right side — hidden in bulk mode */}
              {!(mainTab === 'groups' && bulkMode) && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ width: 36, height: 36, border: `1px solid ${systemColors.light['border-default']}`, borderRadius: 6, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: systemColors.light['content-secondary'] }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="2" fill="currentColor" />
                      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div style={{ display: 'flex' }}>
                    <button
                      onClick={useCaseId === 6 && mainTab === 'users' ? () => setShowAddUser(true) : undefined}
                      style={{ height: 36, padding: '0 16px', background: '#2770EF', color: '#fff', border: 'none', borderRadius: '6px 0 0 6px', cursor: 'pointer', fontSize: 14, fontWeight: 500, fontFamily: 'inherit' }}
                    >
                      {mainTab === 'groups' ? 'Create new group' : 'Add new user'}
                    </button>
                    <button style={{ height: 36, width: 36, background: '#2770EF', color: '#fff', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.3)', borderRadius: '0 6px 6px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tables */}
            {mainTab === 'groups' && (
              <GroupsTable
                groups={filteredGroups}
                onGroupNameClick={(group) => setGroupDetail({ group, tab: 'users' })}
                onViewPrivileges={(group) => setGroupDetail({ group, tab: 'roles' })}
                onEdit={(group) => setEditGroup(group)}
                onDuplicate={(group) => setDuplicateGroup(group)}
                selectedIds={selectedGroupIds}
                onSelectionChange={setSelectedGroupIds}
              />
            )}
            {mainTab === 'users' && (
              <UsersTable users={filteredUsers} onUserClick={(user) => setSelectedUser(user)} />
            )}
            {(mainTab === 'roles' || mainTab === 'authentication') && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: systemColors.light['content-tertiary'], fontSize: 14 }}>
                {mainTab === 'roles' ? 'Roles management' : 'Authentication settings'} — not yet prototyped
              </div>
            )}

            {/* Pagination */}
            {(mainTab === 'groups' || mainTab === 'users') && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 32, fontSize: 14, color: systemColors.light['content-secondary'] }}>
                <span>1-20 of 500</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2770EF', fontSize: 14, fontFamily: 'inherit', fontWeight: 500 }}>
                  Next &rsaquo;
                </button>
              </div>
            )}
          </div>

          {/* Modals */}
          <UserDetailsModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onEdit={(u) => { setSelectedUser(null); setEditUser(u); }}
          />
          <GroupDetailsModal
            group={groupDetail?.group ?? null}
            initialTab={groupDetail?.tab ?? 'users'}
            onClose={() => setGroupDetail(null)}
            onEdit={(group) => { setGroupDetail(null); setEditGroup(group); }}
          />
          <EditGroupModal
            isOpen={!!editGroup}
            group={editGroup}
            onClose={() => setEditGroup(null)}
            onSave={isUC23 ? triggerToast : undefined}
            parentGroupItemsOverride={uc23ParentGroupItems}
            initialSelectedParentGroupsOverride={uc23InitialParentGroups}
          />
          <DuplicateGroupWizard
            isOpen={!!duplicateGroup}
            groupName={duplicateGroup?.name ?? ''}
            onClose={() => setDuplicateGroup(null)}
            existingGroupNames={uc45ExistingNames}
            onSave={uc45OnSave}
          />
          <AddUserWizard
            isOpen={showAddUser}
            onClose={() => setShowAddUser(false)}
            onSave={useCaseId === 6 ? () => {
              if (toastTimer.current) clearTimeout(toastTimer.current);
              setShowToast(true);
              toastTimer.current = setTimeout(() => setShowToast(false), 4000);
            } : undefined}
          />
          <EditUserWizard
            isOpen={!!editUser}
            user={editUser}
            onClose={() => setEditUser(null)}
            onSave={() => {
              if (userToastTimer.current) clearTimeout(userToastTimer.current);
              setShowUserToast(true);
              userToastTimer.current = setTimeout(() => setShowUserToast(false), 4000);
            }}
          />
        </AppShell>

        {/* ── Use case intro overlay ── */}
        {showIntro && (
          <div
            onClick={() => setShowIntro(false)}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 500,
              background: currentUseCase.bgColor,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: 36,
              userSelect: 'none',
            }}
          >
            <div style={{
              fontSize: 36,
              fontWeight: 600,
              color: '#1D232F',
              textAlign: 'center',
              maxWidth: 640,
              padding: '0 32px',
              lineHeight: 1.3,
            }}>
              {currentUseCase.title}
            </div>
            <div style={{
              width: 96, height: 96,
              background: '#1D232F',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              fontWeight: 700,
              color: '#fff',
            }}>
              {currentUseCase.number}
            </div>
            {currentUseCase.subtitle && (
              <div style={{
                fontSize: 18,
                color: currentUseCase.subtitleColor ?? '#1D232F',
                textAlign: 'center',
                maxWidth: 600,
                padding: '0 32px',
                lineHeight: 1.6,
                opacity: currentUseCase.subtitleColor ? 1 : 0.8,
              }}>
                ({currentUseCase.subtitle})
              </div>
            )}
            <div style={{ fontSize: 13, color: 'rgba(29,35,47,0.4)', marginTop: 8 }}>
              Click anywhere to continue
            </div>
          </div>
        )}
      </div>

      {/* ── Toast: group updated ── */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 2000,
          background: '#1D232F',
          color: '#fff',
          borderRadius: 8,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          fontSize: 14,
          minWidth: 280,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="8" fill="#4CAF50" />
            <path d="M5.5 9l2.5 2.5L13 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ flex: 1 }}>Group updated successfully</span>
          <button style={{ background: 'none', border: 'none', color: '#2770EF', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', padding: '0 4px', fontWeight: 500 }}>
            Create group
          </button>
          <button
            onClick={() => setShowToast(false)}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, display: 'flex', marginLeft: 4 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Toast: user updated ── */}
      {showUserToast && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 2000,
          background: '#1D232F',
          color: '#fff',
          borderRadius: 8,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          fontSize: 14,
          minWidth: 280,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="8" fill="#4CAF50" />
            <path d="M5.5 9l2.5 2.5L13 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ flex: 1 }}>User updated successfully</span>
          <button
            onClick={() => setShowUserToast(false)}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, display: 'flex', marginLeft: 4 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Flow hotspot ── */}
      {!showIntro && !editGroup && !duplicateGroup && !groupDetail && !selectedUser && !showAddUser && !editUser && (
        <PulseHotspot target="rbac-action-btn" />
      )}

      {/* ── Toast: group duplicated ── */}
      {showDuplicateToast && (
        <div style={{
          position: 'fixed',
          bottom: 80,
          right: 24,
          zIndex: 2000,
          background: '#1D232F',
          color: '#fff',
          borderRadius: 8,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          fontSize: 14,
          minWidth: 280,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="8" fill="#4CAF50" />
            <path d="M5.5 9l2.5 2.5L13 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ flex: 1 }}>Group duplicated successfully</span>
          <button
            onClick={() => setShowDuplicateToast(false)}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, display: 'flex', marginLeft: 4 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default RBAC;
