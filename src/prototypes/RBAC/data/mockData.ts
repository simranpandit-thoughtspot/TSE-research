export interface PrivilegeCategory {
  category: string;
  privileges: string[];
}

export interface User {
  id: string;
  displayName: string;
  username: string;
  email: string;
  groups: string[];
  authType: 'Local' | 'SSO';
  created: string;
  status: 'Active' | 'Pending' | 'Locked' | 'Suspended' | 'Expired' | 'Deactivated';
  userSince: string;
  userType: 'Local' | 'SSO';
  mfaEnabled: boolean;
  privileges: PrivilegeCategory[];
}

export interface Group {
  id: string;
  name: string;
  displayName: string;
  isDefault?: boolean;
  userCount: number;
  created: string;
  description?: string;
  createdOn: string;
  privileges: PrivilegeCategory[];
}

const adminPrivileges: PrivilegeCategory[] = [
  {
    category: 'Application control',
    privileges: ['can_invite', 'can_share', 'can_download'],
  },
  {
    category: 'Data control',
    privileges: ['can_delete', 'can_view'],
  },
  {
    category: 'Download control',
    privileges: ['can_delete', 'can_view', 'can_download'],
  },
];

const basicPrivileges: PrivilegeCategory[] = [
  {
    category: 'Application control',
    privileges: ['can_share', 'can_download'],
  },
  {
    category: 'Data control',
    privileges: ['can_view'],
  },
];

const engineeringPrivileges: PrivilegeCategory[] = [
  {
    category: 'Application control',
    privileges: ['can_invite', 'can_share'],
  },
  {
    category: 'Data control',
    privileges: ['can_delete', 'can_view'],
  },
  {
    category: 'Download control',
    privileges: ['can_delete', 'can_view', 'can_download'],
  },
];

export const mockGroups: Group[] = [
  {
    id: 'grp-1',
    name: 'defaultgroup',
    displayName: 'Administrator',
    isDefault: true,
    userCount: 23,
    created: '2 mins ago',
    description: 'Default administrator group with full system access.',
    createdOn: '26th January 2024',
    privileges: adminPrivileges,
  },
  {
    id: 'grp-2',
    name: 'ThoughtspotEngg',
    displayName: 'Engineering',
    userCount: 58,
    created: '3 days ago',
    description: 'This group is for all the employees in the company in the backend dev team.',
    createdOn: '26th January 2024',
    privileges: engineeringPrivileges,
  },
  {
    id: 'grp-3',
    name: 'OrgAdmins',
    displayName: 'Org Admins',
    userCount: 12,
    created: '1 week ago',
    description: 'Org-level administrators with elevated privileges.',
    createdOn: '15th February 2024',
    privileges: adminPrivileges,
  },
  {
    id: 'grp-4',
    name: 'SalesStrategyDivision',
    displayName: 'Operations',
    userCount: 34,
    created: '1 year ago',
    description: 'Sales strategy and operations team.',
    createdOn: '10th March 2023',
    privileges: basicPrivileges,
  },
  {
    id: 'grp-5',
    name: 'FinanceTeam',
    displayName: 'Finance',
    userCount: 19,
    created: '2 months ago',
    description: 'Finance and accounting team.',
    createdOn: '1st November 2023',
    privileges: basicPrivileges,
  },
  {
    id: 'grp-6',
    name: 'MarketingGroup',
    displayName: 'Marketing',
    userCount: 27,
    created: '5 months ago',
    description: 'Marketing and growth team.',
    createdOn: '15th August 2023',
    privileges: basicPrivileges,
  },
];

const simranGroups = [
  'AA3ANALYSIS _group',
  'BILLING_INFO_ADMINISTRATION _group',
  'BYPASSRLS _schedule',
  'BYPASSRLS _group',
  'BYPASSRLS _analysis',
  'BYPASSRLS _report',
  'BYPASSRLS _schedule',
  'BYPASSRLS _task',
  'BYPASSRLS _group',
  'BYPASSRLS _analysis',
  'BYPASSRLS _report',
  'BYPASSRLS _task',
  'Admin',
  'Eng',
  'Finance',
  'Marketing',
  'HR_group',
  'All_Users',
];

export interface Role {
  id: string;
  name: string;
  privileges: PrivilegeCategory[];
}

export const availableRoles: Role[] = [
  { id: 'role-accounts', name: 'Accounts', privileges: adminPrivileges },
  { id: 'role-manager2', name: 'Manager_2', privileges: engineeringPrivileges },
  { id: 'role-executive', name: 'Executive', privileges: basicPrivileges },
  { id: 'role-manager1', name: 'Manager 1', privileges: basicPrivileges },
  { id: 'role-superadmin', name: 'Super Admin', privileges: adminPrivileges },
  { id: 'role-user1', name: 'User1', privileges: basicPrivileges },
];

export const availableParentGroups: string[] = [
  'AA3ANALYSIS _group',
  'Ajbuw_3hd',
  'BILLING_INFO_ADMINISTRATION _group',
  'BYPASSRLS _group',
  'BYPASSRLS',
  'Demo Retail Group',
  'DEVELOPER_group1',
  'EMEA_group',
  'APAC_group',
  'Finance_group',
];

export interface ParentGroupInfo {
  privileges: PrivilegeCategory[];
}

export const parentGroupInfoMap: Record<string, ParentGroupInfo> = {
  'AA3ANALYSIS _group': { privileges: [{ category: 'Application control', privileges: ['Can view insights', 'Can use search'] }, { category: 'Data control', privileges: ['Read access to analytics'] }] },
  'Ajbuw_3hd': { privileges: [{ category: 'Application control', privileges: ['API access'] }] },
  'BILLING_INFO_ADMINISTRATION _group': { privileges: [{ category: 'Application control', privileges: ['Can manage billing', 'Can view reports'] }, { category: 'Data control', privileges: ['Read/write financial data'] }] },
  'BYPASSRLS _group': { privileges: [{ category: 'Data control', privileges: ['Bypass row-level security', 'Full data access'] }] },
  'BYPASSRLS': { privileges: [{ category: 'Data control', privileges: ['Bypass row-level security', 'System-level data access'] }] },
  'Demo Retail Group': { privileges: [{ category: 'Application control', privileges: ['Can view insights', 'Can use search'] }] },
  'DEVELOPER_group1': { privileges: [{ category: 'Application control', privileges: ['Can develop', 'Can deploy'] }, { category: 'Data control', privileges: ['Read/write development data'] }] },
  'EMEA_group': { privileges: [{ category: 'Application control', privileges: ['Can view insights'] }, { category: 'Data control', privileges: ['EMEA region data access'] }] },
  'APAC_group': { privileges: [{ category: 'Application control', privileges: ['Can view insights'] }, { category: 'Data control', privileges: ['APAC region data access'] }] },
  'Finance_group': { privileges: [{ category: 'Application control', privileges: ['Can view reports', 'Can download data'] }, { category: 'Data control', privileges: ['Read access to financial data'] }] },
};

export const availableUsersForSelection: string[] = [
  'Alan Walker',
  'Jimmi Jones',
  'Indresh Kumar',
  'Jason',
  'User_2845',
  'Test user',
  'User_Admin',
  'Simran Pandit',
  'Nina James',
  'Arjun Singh',
  'Kiran Patel',
  'Leila Khan',
  'Aisha Raza',
];

export interface GroupUser {
  id: string;
  name: string;
  color: string;
}

export interface InheritedRole {
  id: string;
  name: string;
  privileges: { category: string; items: string[] }[];
}

export interface ParentGroupItem {
  id: string;
  name: string;
  color: string;
}

export const mockGroupUsers: GroupUser[] = [
  { id: 'gu-1', name: 'Clark Kent', color: '#7B61FF' },
  { id: 'gu-2', name: 'Diana Prince', color: '#C84B9E' },
  { id: 'gu-3', name: 'Eobard Thawne', color: '#00897B' },
  { id: 'gu-4', name: 'Barry Allen', color: '#E67E22' },
  { id: 'gu-5', name: 'Eobard Thawne', color: '#00897B' },
  { id: 'gu-6', name: 'Barry Allen', color: '#E67E22' },
  { id: 'gu-7', name: 'Eobard Thawne', color: '#00897B' },
  { id: 'gu-8', name: 'Eobard Thawne', color: '#00897B' },
];

export const mockInheritedRoles: InheritedRole[] = [
  {
    id: 'ir-1',
    name: 'ts_india',
    privileges: [
      {
        category: 'Application control',
        items: ['Has developer customisations privilege', 'Cannot copy or edit existing liveboards'],
      },
      { category: 'Data control', items: ['Can download'] },
    ],
  },
  {
    id: 'ir-2',
    name: 'ts_global',
    privileges: [
      { category: 'Application control', items: ['Can invite', 'Can share content'] },
      { category: 'Download control', items: ['Can download', 'Can export to CSV'] },
    ],
  },
  {
    id: 'ir-3',
    name: 'Finance_role',
    privileges: [
      { category: 'Data control', items: ['Can view financial data', 'Can delete records'] },
    ],
  },
  {
    id: 'ir-4',
    name: 'Engg_lead_role',
    privileges: [
      { category: 'Application control', items: ['Has developer customisations privilege'] },
      { category: 'Data control', items: ['Can view', 'Can delete'] },
    ],
  },
];

export const mockParentGroups: ParentGroupItem[] = [
  { id: 'pg-1', name: 'TS Global', color: '#7B61FF' },
  { id: 'pg-2', name: 'ts_india', color: '#00897B' },
];

// ─── Use-case specific group data ────────────────────────────────────────────

export const mockGroupsUC1: Group[] = [
  {
    id: 'grp-1',
    name: 'defaultgroup',
    displayName: 'Administrator',
    isDefault: true,
    userCount: 23,
    created: '2 mins ago',
    description: 'Default administrator group with full system access.',
    createdOn: '26th January 2024',
    privileges: adminPrivileges,
  },
];

export const mockGroupsUC23: Group[] = [
  { id: 'uc23-1', name: 'defaultgroup', displayName: 'Analyst', isDefault: true, userCount: 23, created: '2 mins ago', description: 'Default analyst group.', createdOn: '26th January 2024', privileges: adminPrivileges },
  { id: 'uc23-2', name: 'Data Insights Team', displayName: 'Design', userCount: 344, created: '1 hour ago', description: '', createdOn: '5th March 2024', privileges: basicPrivileges },
  { id: 'uc23-3', name: 'Product Development Squad', displayName: 'Marketing', userCount: 122, created: '2 days ago', description: '', createdOn: '10th February 2024', privileges: basicPrivileges },
  { id: 'uc23-4', name: 'User Experience Crew', displayName: 'Human Resources', userCount: 23, created: '5 mins ago', description: '', createdOn: '15th March 2024', privileges: basicPrivileges },
  { id: 'uc23-5', name: 'Quality Assurance Unit', displayName: 'Finance', userCount: 56, created: '3 weeks ago', description: '', createdOn: '1st January 2024', privileges: basicPrivileges },
  { id: 'uc23-6', name: 'Marketing Innovations Group', displayName: 'Sales', userCount: 113, created: '1 month ago', description: '', createdOn: '20th December 2023', privileges: basicPrivileges },
  { id: 'uc23-7', name: 'Customer Support Team', displayName: 'Product', userCount: 121, created: '5 hours ago', description: '', createdOn: '8th April 2024', privileges: basicPrivileges },
  { id: 'uc23-8', name: 'Sales Strategy Division', displayName: 'Operations', userCount: 34, created: '1 year ago', description: '', createdOn: '10th March 2023', privileges: basicPrivileges },
];

export const availableParentGroupsUC23: string[] = [
  'Administrator',
  'Analyst',
  'Power users',
  'Default_group',
  'Group default',
  'BYPASSRLS_group',
  'BILLING_INFO_ADMINISTRATION_group',
];

export const parentGroupInfoMapUC23: Record<string, ParentGroupInfo> = {
  Administrator: { privileges: [{ category: 'Application control', privileges: ['Full admin access', 'Can invite', 'Can share'] }, { category: 'Data control', privileges: ['Full data access'] }] },
  Analyst: { privileges: [{ category: 'Application control', privileges: ['Can view insights', 'Can use search'] }] },
  'Power users': { privileges: [{ category: 'Application control', privileges: ['Can develop', 'Can deploy', 'Can manage users'] }] },
  Default_group: { privileges: [{ category: 'Application control', privileges: ['Basic read access'] }] },
  'Group default': { privileges: [{ category: 'Application control', privileges: ['Default group privileges'] }] },
  BYPASSRLS_group: { privileges: [{ category: 'Data control', privileges: ['Bypass row-level security', 'Full data access'] }] },
  BILLING_INFO_ADMINISTRATION_group: { privileges: [{ category: 'Application control', privileges: ['Can manage billing', 'Can view financial data'] }] },
};

// ─────────────────────────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  {
    id: 'usr-1',
    displayName: 'Simran Pandit',
    username: 'simran.pandit',
    email: 'simranpandit@thoughtspot.com',
    groups: simranGroups,
    authType: 'Local',
    created: '7 days ago',
    status: 'Active',
    userSince: '26th January 2024',
    userType: 'Local',
    mfaEnabled: true,
    privileges: adminPrivileges,
  },
  {
    id: 'usr-2',
    displayName: 'Nina James',
    username: 'ninand4579',
    email: 'ninajames@thoughtspot.com',
    groups: ['Org Admins', 'Dev', 'QA', 'Sales', 'EMEA', 'APAC', 'NA', 'IT', 'Finance', 'Marketing', 'All_Users', 'HR_group', 'Admin'],
    authType: 'SSO',
    created: '14 days ago',
    status: 'Active',
    userSince: '12th March 2024',
    userType: 'SSO',
    mfaEnabled: false,
    privileges: engineeringPrivileges,
  },
  {
    id: 'usr-3',
    displayName: '0oafgxoewfAsYiCR81d72222User',
    username: '0oafgxoewfAsYiCR81d72222Username',
    email: '0oafgxoewfAsYiCR81d72222@thoughtspot.com',
    groups: ['EMEA', 'APAC', 'NA', 'IT'],
    authType: 'SSO',
    created: '3 weeks ago',
    status: 'Pending',
    userSince: '5th April 2024',
    userType: 'SSO',
    mfaEnabled: false,
    privileges: basicPrivileges,
  },
  {
    id: 'usr-4',
    displayName: 'Arjun Singh',
    username: '26485arunj',
    email: 'arjunsingh@thoughtspot.com',
    groups: [],
    authType: 'SSO',
    created: 'a month ago',
    status: 'Locked',
    userSince: '18th February 2024',
    userType: 'SSO',
    mfaEnabled: true,
    privileges: basicPrivileges,
  },
  {
    id: 'usr-5',
    displayName: 'Kiran Patel',
    username: 'kiranpatelUser12345',
    email: 'kiranpatel@thoughtspot.com',
    groups: [],
    authType: 'Local',
    created: '2 months ago',
    status: 'Suspended',
    userSince: '30th January 2024',
    userType: 'Local',
    mfaEnabled: false,
    privileges: basicPrivileges,
  },
  {
    id: 'usr-6',
    displayName: 'Leila Khan',
    username: 'leilakhanUser67890',
    email: 'leilakhan@thoughtspot.com',
    groups: [],
    authType: 'Local',
    created: '3 months ago',
    status: 'Expired',
    userSince: '10th December 2023',
    userType: 'Local',
    mfaEnabled: false,
    privileges: basicPrivileges,
  },
  {
    id: 'usr-7',
    displayName: 'Aisha Raza',
    username: 'aisharazaUser54321',
    email: 'aisharaza54321@thoughtspot.com',
    groups: ['Admin', 'Eng', 'Finance', 'Marketing', 'HR_group', 'All_Users', 'EMEA', 'APAC', 'QA', 'Dev'],
    authType: 'SSO',
    created: 'a year ago',
    status: 'Pending',
    userSince: '2nd April 2023',
    userType: 'SSO',
    mfaEnabled: true,
    privileges: basicPrivileges,
  },
  {
    id: 'usr-8',
    displayName: 'Aisha Raza',
    username: 'aisharazaUser98765',
    email: 'aisharaza98765@thoughtspot.com',
    groups: ['Admin', 'Eng', 'Finance', 'Marketing', 'HR_group', 'All_Users', 'EMEA', 'APAC', 'QA', 'Dev'],
    authType: 'Local',
    created: '4 years ago',
    status: 'Deactivated',
    userSince: '14th September 2020',
    userType: 'Local',
    mfaEnabled: false,
    privileges: basicPrivileges,
  },
];
