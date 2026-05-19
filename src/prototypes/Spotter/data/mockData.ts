/**
 * Mock data for the Spotter prototype shell.
 *
 * Realistic-sounding entries for the left panel: analysts (custom AI agents),
 * recent chats, and the data model picker. No real chat thread / answers yet.
 */

export interface Analyst {
  id: string;
  name: string;
  canEdit: boolean;
}

export interface ChatEntry {
  id: string;
  title: string;
}

export interface DataModel {
  id: string;
  name: string;
}

export const analysts: Analyst[] = [
  { id: 'customer-prep', name: 'Customer prep', canEdit: true },
  { id: 'deal-accelerator', name: 'Deal accelerator', canEdit: false },
];

export const chats: ChatEntry[] = [
  { id: 'chat-1', title: 'Total sales by monthly' },
  { id: 'chat-2', title: 'Regions with lowest sales' },
  { id: 'chat-3', title: 'Geographical zones exhibiting low engagement' },
  { id: 'chat-4', title: 'Sparsely populated areas with high product demand' },
];

export const dataModels: DataModel[] = [
  { id: 'all', name: 'All data models' },
  { id: 'sales', name: 'Sales' },
  { id: 'support', name: 'Support' },
  { id: 'product', name: 'Product analytics' },
];

export const tenantName = 'Royal Enfield';
