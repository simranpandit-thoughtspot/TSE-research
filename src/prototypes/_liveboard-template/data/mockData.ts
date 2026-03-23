// ── Tab & filter configuration ──────────────────────────
// Replace with your Liveboard's tab structure and filter set.

export const tabsData = [
  { label: 'Overview', id: 'overview' },
  { label: 'Revenue', id: 'revenue' },
  { label: 'Pipeline', id: 'pipeline' },
  { label: 'Customers', id: 'customers' },
  { label: 'Regional', id: 'regional' },
];

export const filterData = [
  { label: 'Time period', value: 'This quarter' },
  { label: 'Region', value: 'All' },
  { label: 'Segment', value: 'Enterprise, Mid-market' },
];

export const liveboardName = 'Business Overview';

// ── KPI data ────────────────────────────────────────────

export const kpiData = [
  { label: 'Total revenue', value: '$4.2M', change: '+12.3%' },
  { label: 'Active customers', value: '1,847', change: '+8.1%' },
  { label: 'Conversion rate', value: '24%', change: '+3.5%' },
];

// ── Bar chart sample data ───────────────────────────────

export const monthlyRevenue = {
  data: [320, 380, 410, 390, 450, 480, 520, 495, 540, 580, 610, 590],
  labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
};

// ── Sparkline data (for KPI tiles with trend) ───────────

export const revenueTrend = {
  sparkline: [3.2, 3.4, 3.5, 3.3, 3.6, 3.8, 4.0, 3.9, 4.1, 4.2],
};

// ── SpotterViz sample messages ──────────────────────────

export const spotterVizMessages = [
  { role: 'user' as const, text: 'Show me revenue breakdown by region' },
  {
    role: 'assistant' as const,
    text: 'Here\'s the regional revenue breakdown.',
    steps: [
      'Analyzing revenue data',
      'Grouping by region',
      'Creating visualization',
    ],
  },
];
