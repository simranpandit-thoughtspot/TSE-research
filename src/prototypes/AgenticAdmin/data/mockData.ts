export type OrgHealth = 'healthy' | 'warning' | 'critical';

export interface Org {
  id: string;
  name: string;
  users: number;
  groups: string[];
  createdAt: string;
  health: OrgHealth;
  activeUsers7d: number;
  featuresEnabled: number;
}

export interface PendingTask {
  id: string;
  type: 'user-request' | 'org-provisioning' | 'feature-approval' | 'role-change';
  title: string;
  detail: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  org: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  actor: string;
  target: string;
  time: string;
  type: 'user' | 'org' | 'feature' | 'config';
}

export interface FeatureFlag {
  id: string;
  label: string;
  description: string;
  enabledOrgs: string[];
}

export const MOCK_ORGS: Org[] = [
  {
    id: 'acme', name: 'Acme Corp', users: 89,
    groups: ['Admin', 'Eng', 'Finance', 'Marketing'],
    createdAt: 'a year ago', health: 'healthy', activeUsers7d: 76, featuresEnabled: 8,
  },
  {
    id: 'nina', name: 'Nina Enterprises', users: 45,
    groups: ['Org Admins', 'Dev', 'QA', 'Sales'],
    createdAt: '14 days ago', health: 'warning', activeUsers7d: 21, featuresEnabled: 5,
  },
  {
    id: 'innovative', name: 'Innovative Solutions Corp.', users: 78,
    groups: ['EMEA', 'APAC', 'NA', 'IT'],
    createdAt: '3 weeks ago', health: 'healthy', activeUsers7d: 64, featuresEnabled: 12,
  },
  {
    id: 'arjun', name: 'Arjun Industries', users: 12,
    groups: [],
    createdAt: 'a month ago', health: 'critical', activeUsers7d: 2, featuresEnabled: 3,
  },
  {
    id: 'kiran', name: 'Kiran Technologies', users: 32,
    groups: [],
    createdAt: '2 months ago', health: 'healthy', activeUsers7d: 28, featuresEnabled: 6,
  },
  {
    id: 'leila', name: 'Leila Innovations', users: 67,
    groups: [],
    createdAt: '3 months ago', health: 'warning', activeUsers7d: 34, featuresEnabled: 7,
  },
];

export const FEATURE_FLAGS: FeatureFlag[] = [
  {
    id: 'spotiq', label: 'SpotIQ',
    description: 'AI-powered automated insight discovery',
    enabledOrgs: ['acme', 'innovative', 'kiran'],
  },
  {
    id: 'ea-mode', label: 'Early access mode',
    description: 'Access to pre-release features before general availability',
    enabledOrgs: ['innovative'],
  },
  {
    id: 'spotter-agent', label: 'Spotter agent',
    description: 'Agentic AI analysis and multi-step reasoning',
    enabledOrgs: ['acme', 'innovative'],
  },
  {
    id: 'custom-charts', label: 'Custom chart types',
    description: 'Extended visualisation library with 20+ chart types',
    enabledOrgs: ['acme', 'innovative', 'leila'],
  },
  {
    id: 'analyst-studio', label: 'Analyst studio',
    description: 'Advanced data modelling and schema workspace',
    enabledOrgs: ['innovative'],
  },
];

export const PENDING_TASKS: PendingTask[] = [
  {
    id: 't1', type: 'role-change',
    title: 'Approve role change',
    detail: 'Raj Kumar → Data Manager at Acme Corp',
    time: '2 hours ago', priority: 'high', org: 'Acme Corp',
  },
  {
    id: 't2', type: 'feature-approval',
    title: 'Enable early access',
    detail: 'Nina Enterprises requested EA mode',
    time: '5 hours ago', priority: 'medium', org: 'Nina Enterprises',
  },
  {
    id: 't3', type: 'user-request',
    title: 'Review inactive users',
    detail: '14 users inactive for 30+ days across 3 orgs',
    time: '1 day ago', priority: 'low', org: 'Multiple orgs',
  },
  {
    id: 't4', type: 'org-provisioning',
    title: 'New org provisioning',
    detail: 'Leila Holdings requested org setup',
    time: '2 days ago', priority: 'medium', org: 'Leila Holdings',
  },
  {
    id: 't5', type: 'user-request',
    title: 'Bulk user import',
    detail: '23 users pending approval for Kiran Technologies',
    time: '3 days ago', priority: 'high', org: 'Kiran Technologies',
  },
];

export const AUDIT_LOG: AuditEntry[] = [
  {
    id: 'a1', action: 'Feature enabled', actor: 'Sneharsh D.',
    target: 'SpotIQ → Kiran Technologies', time: '10 min ago', type: 'feature',
  },
  {
    id: 'a2', action: 'User added', actor: 'Sneharsh D.',
    target: 'priya@acme.com → Acme Corp', time: '1 hour ago', type: 'user',
  },
  {
    id: 'a3', action: 'Org config updated', actor: 'Sneharsh D.',
    target: 'Customisation → Nina Enterprises', time: '3 hours ago', type: 'org',
  },
  {
    id: 'a4', action: 'Role changed', actor: 'Sneharsh D.',
    target: 'Sam Lee: Consumer → Data Manager', time: '5 hours ago', type: 'user',
  },
  {
    id: 'a5', action: 'Feature disabled', actor: 'System',
    target: 'Analyst Studio → Arjun Industries', time: 'Yesterday', type: 'feature',
  },
  {
    id: 'a6', action: 'Org created', actor: 'Sneharsh D.',
    target: 'Leila Innovations', time: '3 days ago', type: 'org',
  },
];

export const KPI = {
  totalOrgs: 12,
  activeUsers: 847,
  alerts: 3,
  pendingRequests: 5,
};

// ─── Flow detection ───────────────────────────────────────────────────────────

export type FlowType = 'add-users' | 'feature-flag' | 'org-health' | 'general';

export function detectFlow(input: string): FlowType {
  const lower = input.toLowerCase();
  if (lower.includes('add') && (lower.includes('user') || lower.includes('@') || lower.includes('member'))) {
    return 'add-users';
  }
  if (lower.includes('enable') || lower.includes('disable') || lower.includes('feature') || lower.includes('flag') || lower.includes('ea ') || lower.includes('early access')) {
    return 'feature-flag';
  }
  if (lower.includes('health') || lower.includes('status') || lower.includes('overview') || lower.includes('how is') || lower.includes('show me')) {
    return 'org-health';
  }
  return 'general';
}

export function extractOrg(input: string): Org {
  const lower = input.toLowerCase();
  for (const org of MOCK_ORGS) {
    if (lower.includes(org.name.toLowerCase()) || lower.includes(org.id)) return org;
  }
  return MOCK_ORGS[0]; // Acme Corp default
}

export function extractFeatureFlag(input: string): FeatureFlag {
  const lower = input.toLowerCase();
  for (const flag of FEATURE_FLAGS) {
    if (lower.includes(flag.label.toLowerCase()) || lower.includes(flag.id)) return flag;
  }
  // Detect 'ea' or 'early access' specifically
  if (lower.includes('ea') || lower.includes('early access')) return FEATURE_FLAGS[1];
  return FEATURE_FLAGS[0]; // SpotIQ default
}

export function extractEmails(input: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const found = input.match(emailRegex);
  return found && found.length > 0 ? found : ['john.doe@example.com', 'sarah.k@example.com'];
}
