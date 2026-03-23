export interface GroupItem {
  id: string;
  name: string;
  subtitle: string;
  userCount: number;
  createdAt: string;
  parentGroupId?: string;
  assignedRoleIds?: string[];
  assignedUserIds?: string[];
  directPrivileges?: Privilege[];
  directRlsRules?: RlsRule[];
  sharedContent?: SharedContentItem[];
  inheritSharedContent?: boolean;
}

export interface RoleItem {
  id: string;
  name: string;
  description?: string;
}

export interface ParentGroupItem {
  id: string;
  name: string;
  childCount: number;
}

export interface UserItem {
  id: string;
  name: string;
  email?: string;
}

export interface Privilege {
  id: string;
  name: string;
  description: string;
  source: 'direct' | 'inherited';
  sourceGroupName?: string;
}

export interface RlsRule {
  id: string;
  tableName: string;
  columnName: string;
  operator: string;
  value: string;
  source: 'direct' | 'inherited';
  sourceGroupName?: string;
}

export interface SharedContentItem {
  id: string;
  name: string;
  type: 'liveboard' | 'answer' | 'worksheet';
  owner: string;
  sharedAt: string;
  source: 'direct' | 'inherited';
  sourceGroupName?: string;
  accessEnabled: boolean;
}

export const groups: GroupItem[] = [
  {
    id: 'g1',
    name: 'Engineering',
    subtitle: 'Thoughtspot Enggs',
    userCount: 23,
    createdAt: '2 mins ago',
    parentGroupId: 'pg2',
    assignedRoleIds: ['r2', 'r3'],
    assignedUserIds: ['u1', 'u2', 'u3', 'u4'],
    directPrivileges: [
      { id: 'p1', name: 'Can manage data', description: 'Create, edit, and delete data sources, worksheets, and views', source: 'direct' },
      { id: 'p2', name: 'Can use Spotter', description: 'Access Spotter AI-powered analytics', source: 'direct' },
      { id: 'p3', name: 'Can administer ThoughtSpot', description: 'Access admin settings and manage the cluster', source: 'direct' },
    ],
    directRlsRules: [
      { id: 'rls1', tableName: 'DimRegion', columnName: 'region', operator: '=', value: 'ts_username', source: 'direct' },
      { id: 'rls2', tableName: 'FactSales', columnName: 'department', operator: '=', value: 'Engineering', source: 'direct' },
    ],
    sharedContent: [
      { id: 'sc1', name: 'Revenue Dashboard', type: 'liveboard', owner: 'Alan Walker', sharedAt: '2 days ago', source: 'direct', accessEnabled: true },
      { id: 'sc2', name: 'Quarterly KPIs', type: 'liveboard', owner: 'Jimmi Jones', sharedAt: '1 week ago', source: 'direct', accessEnabled: true },
      { id: 'sc3', name: 'Customer Churn Analysis', type: 'answer', owner: 'Jason', sharedAt: '3 days ago', source: 'direct', accessEnabled: true },
    ],
    inheritSharedContent: true,
  },
  {
    id: 'g2',
    name: 'Design',
    subtitle: 'Data Insights Team',
    userCount: 344,
    createdAt: '1 hour ago',
    parentGroupId: 'pg1',
    assignedRoleIds: ['r1', 'r4'],
    assignedUserIds: ['u2', 'u5', 'u6'],
    directPrivileges: [
      { id: 'p4', name: 'Can view data', description: 'View all data sources and worksheets', source: 'direct' },
      { id: 'p5', name: 'Can use Spotter', description: 'Access Spotter AI-powered analytics', source: 'direct' },
    ],
    directRlsRules: [
      { id: 'rls3', tableName: 'DimUser', columnName: 'team', operator: '=', value: 'Design', source: 'direct' },
    ],
    sharedContent: [
      { id: 'sc4', name: 'Design System Metrics', type: 'liveboard', owner: 'Indresh Kumar', sharedAt: '5 hours ago', source: 'direct', accessEnabled: true },
    ],
    inheritSharedContent: true,
  },
  {
    id: 'g3',
    name: 'Marketing',
    subtitle: 'Product Development Squad',
    userCount: 122,
    createdAt: '2 days ago',
    assignedRoleIds: ['r1'],
    assignedUserIds: ['u3', 'u7'],
    directPrivileges: [
      { id: 'p6', name: 'Can view data', description: 'View all data sources and worksheets', source: 'direct' },
    ],
    directRlsRules: [],
    sharedContent: [
      { id: 'sc5', name: 'Campaign Performance', type: 'liveboard', owner: 'Test user', sharedAt: '1 month ago', source: 'direct', accessEnabled: true },
    ],
    inheritSharedContent: true,
  },
  {
    id: 'g4',
    name: 'Human Resources',
    subtitle: 'User Experience Crew',
    userCount: 23,
    createdAt: '5 mins ago',
    parentGroupId: 'pg6',
    assignedRoleIds: ['r4', 'r5'],
    assignedUserIds: ['u1', 'u6'],
    directPrivileges: [
      { id: 'p7', name: 'Can view data', description: 'View all data sources and worksheets', source: 'direct' },
      { id: 'p8', name: 'Can manage users', description: 'Create, edit, and delete user accounts', source: 'direct' },
    ],
    directRlsRules: [
      { id: 'rls4', tableName: 'DimEmployee', columnName: 'department', operator: '=', value: 'HR', source: 'direct' },
    ],
    sharedContent: [],
    inheritSharedContent: true,
  },
  { id: 'g5', name: 'Finance', subtitle: 'Quality Assurance Unit', userCount: 56, createdAt: '3 weeks ago', assignedUserIds: ['u4'], directPrivileges: [], directRlsRules: [], sharedContent: [], inheritSharedContent: true },
  { id: 'g6', name: 'Sales', subtitle: 'Marketing Innovations Group', userCount: 113, createdAt: '1 month ago', assignedUserIds: ['u5', 'u7'], directPrivileges: [], directRlsRules: [], sharedContent: [], inheritSharedContent: true },
  { id: 'g7', name: 'Product', subtitle: 'Customer Support Team', userCount: 121, createdAt: '5 hours ago', assignedUserIds: ['u2', 'u3'], directPrivileges: [], directRlsRules: [], sharedContent: [], inheritSharedContent: true },
  { id: 'g8', name: 'Operations', subtitle: 'Sales Strategy Division', userCount: 34, createdAt: '34', assignedUserIds: ['u1'], directPrivileges: [], directRlsRules: [], sharedContent: [], inheritSharedContent: true },
];

export const roles: RoleItem[] = [
  { id: 'r1', name: 'Accounts', description: 'Access to account-level settings and billing' },
  { id: 'r2', name: 'Manager_2', description: 'Manager-level access with team oversight' },
  { id: 'r3', name: 'Executive', description: 'Executive-level access across all orgs' },
  { id: 'r4', name: 'Manager 1', description: 'Manager-level access with limited scope' },
  { id: 'r5', name: 'Accounts', description: 'Secondary accounts role for sub-orgs' },
  { id: 'r6', name: 'Super Admin', description: 'Full administrative access to all features' },
  { id: 'r7', name: 'User1', description: 'Basic user access with read permissions' },
];

export const parentGroups: ParentGroupItem[] = [
  { id: 'pg1', name: 'AA3ANALYSIS _group', childCount: 2 },
  { id: 'pg2', name: 'Ajbuw_3hd', childCount: 4 },
  { id: 'pg3', name: 'BILLING_INFO_ADMINISTRATION _group', childCount: 4 },
  { id: 'pg4', name: 'flootloose _group', childCount: 2 },
  { id: 'pg5', name: 'BYPASSRLS _group', childCount: 2 },
  { id: 'pg6', name: 'Demo Retail Group', childCount: 2 },
  { id: 'pg7', name: 'Aanada', childCount: 2 },
];

export const users: UserItem[] = [
  { id: 'u1', name: 'Alan Walker', email: 'alan.walker@thoughtspot.com' },
  { id: 'u2', name: 'Jimmi Jones', email: 'jimmi.jones@thoughtspot.com' },
  { id: 'u3', name: 'Indresh Kumar', email: 'indresh.kumar@thoughtspot.com' },
  { id: 'u4', name: 'Jason', email: 'jason@thoughtspot.com' },
  { id: 'u5', name: 'User_2845', email: 'user2845@thoughtspot.com' },
  { id: 'u6', name: 'Test user', email: 'testuser@thoughtspot.com' },
  { id: 'u7', name: 'User_Admin', email: 'useradmin@thoughtspot.com' },
];

export const userManagementTabs = [
  { id: 'users', label: 'Users' },
  { id: 'groups', label: 'Groups' },
  { id: 'roles', label: 'Roles' },
  { id: 'authentication', label: 'Authentication' },
];

export const groupDetailTabs = [
  { id: 'users', label: 'Users' },
  { id: 'privileges', label: 'Privileges' },
  { id: 'rls-rules', label: 'RLS Rules' },
  { id: 'shared-content', label: 'Shared Content' },
];

// Inherited data for groups that have a parent
const parentInheritedPrivileges: Privilege[] = [
  { id: 'ip1', name: 'Can download data', description: 'Download data from answers and liveboards as CSV, XLSX, or PDF', source: 'inherited', sourceGroupName: 'Ajbuw_3hd' },
  { id: 'ip2', name: 'Can share with all orgs', description: 'Share content across all organizations', source: 'inherited', sourceGroupName: 'Ajbuw_3hd' },
  { id: 'ip3', name: 'Can manage data', description: 'Create, edit, and delete data sources', source: 'inherited', sourceGroupName: 'Ajbuw_3hd' },
];

const parentInheritedRlsRules: RlsRule[] = [
  { id: 'irls1', tableName: 'DimRegion', columnName: 'country', operator: '=', value: 'ts_org_id', source: 'inherited', sourceGroupName: 'Ajbuw_3hd' },
  { id: 'irls2', tableName: 'FactRevenue', columnName: 'business_unit', operator: 'IN', value: 'ts_groups', source: 'inherited', sourceGroupName: 'Ajbuw_3hd' },
];

const parentInheritedContent: SharedContentItem[] = [
  { id: 'isc1', name: 'Global Revenue Tracker', type: 'liveboard', owner: 'System Admin', sharedAt: '2 months ago', source: 'inherited', sourceGroupName: 'Ajbuw_3hd', accessEnabled: true },
  { id: 'isc2', name: 'Org-wide Headcount', type: 'answer', owner: 'HR Admin', sharedAt: '3 weeks ago', source: 'inherited', sourceGroupName: 'Ajbuw_3hd', accessEnabled: true },
  { id: 'isc3', name: 'Sales Pipeline Worksheet', type: 'worksheet', owner: 'Sales Ops', sharedAt: '1 month ago', source: 'inherited', sourceGroupName: 'Ajbuw_3hd', accessEnabled: false },
];

const parentInheritedPrivilegesAlt: Privilege[] = [
  { id: 'ip4', name: 'Can view data', description: 'View all data sources and worksheets', source: 'inherited', sourceGroupName: 'AA3ANALYSIS _group' },
  { id: 'ip5', name: 'Can use Spotter', description: 'Access Spotter AI-powered analytics', source: 'inherited', sourceGroupName: 'AA3ANALYSIS _group' },
];

const parentInheritedRlsRulesAlt: RlsRule[] = [
  { id: 'irls3', tableName: 'DimProduct', columnName: 'category', operator: '=', value: 'Analysis', source: 'inherited', sourceGroupName: 'AA3ANALYSIS _group' },
];

const parentInheritedContentAlt: SharedContentItem[] = [
  { id: 'isc4', name: 'Product Analytics Dashboard', type: 'liveboard', owner: 'Analytics Team', sharedAt: '1 week ago', source: 'inherited', sourceGroupName: 'AA3ANALYSIS _group', accessEnabled: true },
];

const parentInheritedDemoRetail: Privilege[] = [
  { id: 'ip6', name: 'Can view data', description: 'View all data sources and worksheets', source: 'inherited', sourceGroupName: 'Demo Retail Group' },
];

const parentInheritedDemoRetailRls: RlsRule[] = [
  { id: 'irls4', tableName: 'DimStore', columnName: 'region', operator: '=', value: 'Demo_Retail', source: 'inherited', sourceGroupName: 'Demo Retail Group' },
];

export function getInheritedPrivileges(parentGroupId?: string): Privilege[] {
  if (!parentGroupId) return [];
  switch (parentGroupId) {
    case 'pg2': return parentInheritedPrivileges;
    case 'pg1': return parentInheritedPrivilegesAlt;
    case 'pg6': return parentInheritedDemoRetail;
    default: return [];
  }
}

export function getInheritedRlsRules(parentGroupId?: string): RlsRule[] {
  if (!parentGroupId) return [];
  switch (parentGroupId) {
    case 'pg2': return parentInheritedRlsRules;
    case 'pg1': return parentInheritedRlsRulesAlt;
    case 'pg6': return parentInheritedDemoRetailRls;
    default: return [];
  }
}

export function getInheritedSharedContent(parentGroupId?: string): SharedContentItem[] {
  if (!parentGroupId) return [];
  switch (parentGroupId) {
    case 'pg2': return parentInheritedContent;
    case 'pg1': return parentInheritedContentAlt;
    default: return [];
  }
}

export function getParentGroupName(parentGroupId?: string): string | undefined {
  if (!parentGroupId) return undefined;
  return parentGroups.find(pg => pg.id === parentGroupId)?.name;
}

export function getUsersForGroup(group: GroupItem): UserItem[] {
  if (!group.assignedUserIds) return [];
  return group.assignedUserIds
    .map(id => users.find(u => u.id === id))
    .filter((u): u is UserItem => u !== undefined);
}
