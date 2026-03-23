/**
 * Mock data for AdminLang prototype
 */

export interface LiveboardItem {
  id: string;
  name: string;
  owner: string;
  lastModified: string;
  type: 'liveboard' | 'answer';
}

export const mockLiveboards: LiveboardItem[] = [
  { id: 'lb-1', name: 'Executive revenue dashboard', owner: 'Sarah Chen', lastModified: '2026-03-10', type: 'liveboard' },
  { id: 'lb-2', name: 'Sales pipeline overview', owner: 'James Wilson', lastModified: '2026-03-09', type: 'liveboard' },
  { id: 'lb-3', name: 'Customer retention metrics', owner: 'Priya Patel', lastModified: '2026-03-08', type: 'liveboard' },
  { id: 'lb-4', name: 'Marketing campaign performance', owner: 'Alex Kim', lastModified: '2026-03-07', type: 'liveboard' },
  { id: 'lb-5', name: 'Product usage analytics', owner: 'Maria Garcia', lastModified: '2026-03-06', type: 'liveboard' },
  { id: 'lb-6', name: 'Finance quarterly report', owner: 'David Lee', lastModified: '2026-03-05', type: 'liveboard' },
  { id: 'lb-7', name: 'HR headcount tracker', owner: 'Emily Brown', lastModified: '2026-03-04', type: 'liveboard' },
  { id: 'lb-8', name: 'Supply chain dashboard', owner: 'Raj Kumar', lastModified: '2026-03-03', type: 'liveboard' },
];

export const mockAnswers: LiveboardItem[] = [
  { id: 'ans-1', name: 'Revenue by region', owner: 'Sarah Chen', lastModified: '2026-03-10', type: 'answer' },
  { id: 'ans-2', name: 'Top 10 customers by ARR', owner: 'James Wilson', lastModified: '2026-03-09', type: 'answer' },
  { id: 'ans-3', name: 'Monthly churn rate trend', owner: 'Priya Patel', lastModified: '2026-03-08', type: 'answer' },
  { id: 'ans-4', name: 'Ad spend vs conversion', owner: 'Alex Kim', lastModified: '2026-03-07', type: 'answer' },
  { id: 'ans-5', name: 'Feature adoption rates', owner: 'Maria Garcia', lastModified: '2026-03-06', type: 'answer' },
  { id: 'ans-6', name: 'Budget vs actual spend', owner: 'David Lee', lastModified: '2026-03-05', type: 'answer' },
];

export interface CsvValidationError {
  type: 'missing-headers' | 'corrupt' | 'empty' | 'encoding' | 'invalid-format' | 'invalid-rows';
  message: string;
  details?: string;
}

export const csvRequiredHeaders = [
  'original-content',
  'content-type',
  'object-name',
  'object-type',
  'object-URL',
];

/** Sidebar nav items matching the screenshot */
export const adminSidebarItems = [
  { id: 'thoughtspot-ai', label: 'ThoughtSpot AI', section: 'APPLICATION SETTINGS' },
  { id: 'search-spotiq', label: 'Search & SpotIQ', section: 'APPLICATION SETTINGS' },
  { id: 'help-customization', label: 'Help customization', section: 'APPLICATION SETTINGS' },
  { id: 'email-customizations', label: 'Email customizations', section: 'APPLICATION SETTINGS' },
  { id: 'style-customization', label: 'Style customization', section: 'APPLICATION SETTINGS' },
  { id: 'chart-customization', label: 'Chart customization', section: 'APPLICATION SETTINGS' },
  { id: 'csv-upload', label: 'CSV upload', section: 'APPLICATION SETTINGS' },
  { id: 'early-access', label: 'Early access features', section: 'APPLICATION SETTINGS' },
  { id: 'version-control', label: 'Version Control', section: 'APPLICATION SETTINGS' },
  { id: 'data-modeling', label: 'Data modeling', section: 'APPLICATION SETTINGS' },
  { id: 'downloads-schedules', label: 'Downloads & Schedules', section: 'APPLICATION SETTINGS' },
  { id: 'home-page-experience', label: 'Home Page & App Experience', section: 'APPLICATION SETTINGS' },
  { id: 'administration', label: 'Administration', section: 'APPLICATION SETTINGS' },
  { id: 'variables', label: 'Variables', section: 'APPLICATION SETTINGS' },
  { id: 'billable-query-stats', label: 'Billable query stats', section: 'BILLING' },
];

export const adminTopSidebarItems = [
  { id: 'performance-tracking', label: 'Performance tracking', section: '' },
  { id: 'ai-bi-stats', label: 'AI and BI Stats', section: '' },
];

/** Homepage ordering items from screenshot */
export const homepageModules = [
  { order: 1, name: 'Spotter', status: 'Visible' },
  { order: 2, name: 'Watchlist', status: 'Visible' },
  { order: 3, name: 'Library', status: 'Visible' },
  { order: 4, name: 'Trending', status: 'Visible' },
  { order: 5, name: 'Learning', status: 'Visible' },
  { order: '-', name: 'Favorites', status: 'Hidden' },
];
