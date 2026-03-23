// Mock data for Admin2Vision prototype

export type UserStatus = 'Active' | 'Pending' | 'Locked' | 'Suspended';
export type AuthType = 'Local' | 'SAML' | 'OIDC' | 'LDAP';

export interface MockUser {
  id: string;
  name: string;
  username: string;
  email: string;
  org: string;
  authType: AuthType;
  status: UserStatus;
  created: string;
}

export interface MockOrg {
  id: string;
  name: string;
  members: number;
  status: 'Active' | 'Inactive';
  created: string;
}

export interface MockIDP {
  id: string;
  name: string;
  type: 'SAML' | 'OIDC';
  status: boolean;
  isDefault: boolean;
}

export interface MockVariable {
  id: string;
  name: string;
  type: 'connection' | 'formula' | 'text' | 'number';
  value: string;
}

export interface MockFeature {
  id: string;
  name: string;
  description: string;
  enabledOrgs: number;
  totalOrgs: number;
  orgs: string[];
}

export interface MockEarlyFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Anika Sharma',
    username: 'anika.sharma',
    email: 'anika.sharma@acme.io',
    org: 'Primary Org',
    authType: 'SAML',
    status: 'Active',
    created: 'Jan 12, 2024',
  },
  {
    id: '2',
    name: 'James Okafor',
    username: 'james.okafor',
    email: 'j.okafor@acme.io',
    org: 'Sales Org',
    authType: 'Local',
    status: 'Active',
    created: 'Feb 3, 2024',
  },
  {
    id: '3',
    name: 'Priya Menon',
    username: 'priya.menon',
    email: 'priya.m@acme.io',
    org: 'Primary Org',
    authType: 'OIDC',
    status: 'Pending',
    created: 'Mar 17, 2024',
  },
  {
    id: '4',
    name: 'Carlos Ruiz',
    username: 'carlos.ruiz',
    email: 'cruiz@acme.io',
    org: 'Finance Org',
    authType: 'SAML',
    status: 'Active',
    created: 'Nov 28, 2023',
  },
  {
    id: '5',
    name: 'Sophie Laroche',
    username: 'sophie.laroche',
    email: 's.laroche@acme.io',
    org: 'Marketing Org',
    authType: 'LDAP',
    status: 'Locked',
    created: 'Dec 5, 2023',
  },
  {
    id: '6',
    name: 'Yuki Tanaka',
    username: 'yuki.tanaka',
    email: 'yuki.t@acme.io',
    org: 'Engineering Org',
    authType: 'SAML',
    status: 'Active',
    created: 'Apr 2, 2024',
  },
  {
    id: '7',
    name: 'Marcus Webb',
    username: 'marcus.webb',
    email: 'm.webb@acme.io',
    org: 'Sales Org',
    authType: 'Local',
    status: 'Suspended',
    created: 'Sep 14, 2023',
  },
  {
    id: '8',
    name: 'Elena Vasquez',
    username: 'elena.vasquez',
    email: 'evasquez@acme.io',
    org: 'Primary Org',
    authType: 'OIDC',
    status: 'Active',
    created: 'May 21, 2024',
  },
];

export const mockOrgs: MockOrg[] = [
  { id: '1', name: 'Primary Org', members: 312, status: 'Active', created: 'Jun 1, 2022' },
  { id: '2', name: 'Sales Org', members: 87, status: 'Active', created: 'Aug 15, 2022' },
  { id: '3', name: 'Finance Org', members: 54, status: 'Active', created: 'Oct 3, 2022' },
  { id: '4', name: 'Marketing Org', members: 43, status: 'Active', created: 'Jan 10, 2023' },
  { id: '5', name: 'Engineering Org', members: 29, status: 'Inactive', created: 'Mar 7, 2023' },
];

export const mockIDPs: MockIDP[] = [
  { id: '1', name: 'Okta SSO', type: 'SAML', status: true, isDefault: true },
  { id: '2', name: 'Azure AD', type: 'OIDC', status: true, isDefault: false },
  { id: '3', name: 'Google Workspace', type: 'OIDC', status: false, isDefault: false },
];

export const mockVariables: MockVariable[] = [
  { id: '1', name: 'CURRENT_USER_DEPT', type: 'formula', value: 'ts_user_department()' },
  { id: '2', name: 'FISCAL_YEAR_START', type: 'text', value: 'April' },
  { id: '3', name: 'DEFAULT_CURRENCY', type: 'text', value: 'USD' },
  { id: '4', name: 'SNOWFLAKE_CONN', type: 'connection', value: 'snowflake-prod-01' },
  { id: '5', name: 'REVENUE_THRESHOLD', type: 'number', value: '1000000' },
  { id: '6', name: 'REGION_FILTER', type: 'formula', value: 'ts_user_region()' },
];

export const mockFeatures: MockFeature[] = [
  {
    id: '1',
    name: 'Liveboard V2',
    description: 'Upgraded liveboard layout engine with drag-and-drop tile resizing.',
    enabledOrgs: 5,
    totalOrgs: 12,
    orgs: ['Primary Org', 'Sales Org', 'Finance Org', 'Marketing Org', 'Engineering Org'],
  },
  {
    id: '2',
    name: 'Spotter Conversational',
    description: 'Multi-turn conversational analytics with Spotter AI.',
    enabledOrgs: 3,
    totalOrgs: 12,
    orgs: ['Primary Org', 'Engineering Org', 'Sales Org'],
  },
  {
    id: '3',
    name: 'Data Workspace',
    description: 'Unified workspace for managing data models, tables, and connections.',
    enabledOrgs: 12,
    totalOrgs: 12,
    orgs: ['All Orgs'],
  },
  {
    id: '4',
    name: 'Embedded Analytics SDK v2',
    description: 'Next-generation embedding SDK with React components.',
    enabledOrgs: 2,
    totalOrgs: 12,
    orgs: ['Engineering Org', 'Primary Org'],
  },
];

export const mockEarlyFeatures: MockEarlyFeature[] = [
  {
    id: '1',
    name: 'AI-Generated Insights',
    description: 'Automatically surface key insights and anomalies from your data using Spotter AI.',
    enabled: false,
  },
  {
    id: '2',
    name: 'Predictive Forecasting',
    description: 'Extend time-series charts with ML-powered forecast overlays.',
    enabled: false,
  },
  {
    id: '3',
    name: 'Natural Language Filters',
    description: 'Allow users to describe filters in plain language (e.g. "last quarter for EMEA").',
    enabled: true,
  },
  {
    id: '4',
    name: 'Collaborative Annotations',
    description: 'Pin comments and annotations to specific data points on liveboards.',
    enabled: false,
  },
  {
    id: '5',
    name: 'Auto Schema Discovery',
    description: 'Automatically detect and map schema changes in connected data sources.',
    enabled: false,
  },
];

export const ADMIN_NAV_COMMANDS = [
  { id: 'command-centre', label: 'Command Centre', category: 'OVERVIEW' },
  { id: 'ai-bi-stats', label: 'AI & BI Stats', category: 'OVERVIEW' },
  { id: 'object-usage', label: 'Object Usage', category: 'OVERVIEW' },
  { id: 'users-orgs', label: 'Users & Orgs', category: 'USERS & IDENTITY' },
  { id: 'authentication', label: 'Authentication', category: 'USERS & IDENTITY' },
  { id: 'user-adoption', label: 'User Adoption', category: 'USERS & IDENTITY' },
  { id: 'general-settings', label: 'General Settings', category: 'APPLICATION SETTINGS' },
  { id: 'agent-settings', label: 'Agent Settings', category: 'APPLICATION SETTINGS' },
  { id: 'feature-management', label: 'Feature Management', category: 'APPLICATION SETTINGS' },
  { id: 'customisations', label: 'Customisations', category: 'APPLICATION SETTINGS' },
  { id: 'variables', label: 'Variables', category: 'APPLICATION SETTINGS' },
  { id: 'version-control', label: 'Version Control', category: 'APPLICATION SETTINGS' },
  { id: 'simulations', label: 'Simulations & Impersonation', category: 'SECURITY' },
  { id: 'governance', label: 'Governance & Security', category: 'SECURITY' },
  { id: 'connections', label: 'Connections & Integrations', category: 'SUPPORT AND INFRASTRUCTURE' },
  { id: 'infrastructure', label: 'Infrastructure & Support', category: 'SUPPORT AND INFRASTRUCTURE' },
];
