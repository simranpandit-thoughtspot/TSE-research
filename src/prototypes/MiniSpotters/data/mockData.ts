/**
 * Mock data for MiniSpotters prototype
 */

export interface MiniSpotter {
  id: string;
  name: string;
  icon: string; // emoji or short label
  description: string;
  dataSources: string[];
  tools: string[];
  creator: string;
  instructions: string;
  suggestedQuestions: string[];
  greeting: string;
  subtitle: string;
}

/** Available data sources for the creator wizard */
export interface DataSource {
  id: string;
  name: string;
  type: 'worksheet' | 'model' | 'liveboard' | 'connection';
}

export const availableDataSources: DataSource[] = [
  { id: 'ds-1', name: 'Revenue Model', type: 'model' },
  { id: 'ds-2', name: 'Sales Pipeline', type: 'worksheet' },
  { id: 'ds-3', name: 'Customer Health', type: 'worksheet' },
  { id: 'ds-4', name: 'Product Usage', type: 'model' },
  { id: 'ds-5', name: 'Finance Worksheet', type: 'worksheet' },
  { id: 'ds-6', name: 'Billing Data', type: 'connection' },
  { id: 'ds-7', name: 'CRM Pipeline', type: 'connection' },
  { id: 'ds-8', name: 'Support Tickets', type: 'worksheet' },
  { id: 'ds-9', name: 'Infrastructure Metrics', type: 'connection' },
  { id: 'ds-10', name: 'Ops Dashboard', type: 'liveboard' },
  { id: 'ds-11', name: 'Executive Dashboard', type: 'liveboard' },
  { id: 'ds-12', name: 'Marketing Analytics', type: 'model' },
  { id: 'ds-13', name: 'HR Headcount', type: 'worksheet' },
  { id: 'ds-14', name: 'Forecast Model', type: 'model' },
  { id: 'ds-15', name: 'Market Data', type: 'connection' },
];

/** Quick insights cue cards */
export interface QuickInsight {
  id: string;
  icon: string;
  title: string;
  description: string;
  query: string;
}

export const quickInsightsData: QuickInsight[] = [
  { id: 'qi-1', icon: 'trending-up', title: 'Revenue trends', description: 'Track revenue over time by segment', query: 'Show me revenue trends over the last 6 months' },
  { id: 'qi-2', icon: 'users', title: 'Customer health', description: 'Monitor churn risk and retention', query: 'What is the current customer health and churn risk?' },
  { id: 'qi-3', icon: 'bar-chart', title: 'Pipeline analysis', description: 'View open deals by stage and owner', query: 'Analyze the current sales pipeline by stage' },
  { id: 'qi-4', icon: 'target', title: 'Forecast accuracy', description: 'Compare forecast vs actuals', query: 'How accurate are our forecasts compared to actuals?' },
  { id: 'qi-5', icon: 'grid', title: 'Product usage', description: 'Feature adoption and engagement', query: 'Show me product usage and feature adoption metrics' },
  { id: 'qi-6', icon: 'alert-circle', title: 'Support metrics', description: 'Ticket volume and resolution time', query: 'What are our support ticket trends and resolution times?' },
  { id: 'qi-7', icon: 'settings', title: 'Operations', description: 'Ops efficiency and throughput', query: 'Give me an overview of operational efficiency this quarter' },
  { id: 'qi-8', icon: 'dollar-sign', title: 'Finance summary', description: 'P&L, burn rate, and margins', query: 'Summarize our financial performance including margins and burn rate' },
];

/** Available tools/connectors */
export interface Tool {
  id: string;
  name: string;
  description: string;
}

export const availableTools: Tool[] = [
  { id: 'tool-1', name: 'Search data', description: 'Query connected data sources with natural language' },
  { id: 'tool-2', name: 'Create visualizations', description: 'Generate charts and graphs from query results' },
  { id: 'tool-3', name: 'SpotIQ analysis', description: 'Run automated insights and anomaly detection' },
  { id: 'tool-4', name: 'Export to CSV', description: 'Download query results as CSV files' },
  { id: 'tool-5', name: 'Pin to Liveboard', description: 'Save answers to Liveboards for sharing' },
  { id: 'tool-6', name: 'Schedule reports', description: 'Set up recurring report delivery via email' },
  { id: 'tool-7', name: 'Slack integration', description: 'Send insights directly to Slack channels' },
  { id: 'tool-8', name: 'Monitor alerts', description: 'Create threshold-based alerts on KPIs' },
];

/** Emoji options for the picker */
export const emojiOptions = ['🤖', '📊', '💰', '👥', '⚙️', '📈', '🎯', '🔍', '💡', '🚀', '📉', '🏢'];

export const miniSpotters: MiniSpotter[] = [
  {
    id: 'spotter-ai',
    name: 'Spotter - AI Analyst',
    icon: '🤖',
    description: 'General-purpose AI data analyst with access to all connected data sources.',
    dataSources: ['All models', 'All Liveboards'],
    tools: ['Search data', 'Create visualizations', 'SpotIQ analysis', 'Export to CSV', 'Pin to Liveboard'],
    creator: 'ThoughtSpot',
    instructions: 'You are a general-purpose AI data analyst. Help users explore their data, find insights, and answer business questions.',
    greeting: "Hi! I'm Spotter, your AI data analyst",
    subtitle: "Let's make sense of your data together",
    suggestedQuestions: [
      'What are the top performing products this quarter?',
      'Analyze sales trends over the last 6 months',
      'Show me customer retention insights',
      'What factors are driving revenue growth?',
    ],
  },
  {
    id: 'revenue-radar',
    name: 'Revenue Radar',
    icon: 'CS',
    description: 'Focused on revenue tracking, ARR analysis, and financial KPIs across all business units.',
    dataSources: ['Revenue Model', 'Finance Worksheet', 'Billing Data'],
    tools: ['Search data', 'Create visualizations', 'Export to CSV'],
    creator: 'Finance Team',
    instructions: 'Focus exclusively on revenue, ARR, MRR, and financial KPIs. Always segment by business unit unless asked otherwise.',
    greeting: 'Revenue Radar',
    subtitle: 'Deep dive into revenue metrics and financial performance',
    suggestedQuestions: [
      'What is our current ARR by segment?',
      'Show MRR growth trend over the past 12 months',
      'Which accounts have the highest expansion revenue?',
      'Compare revenue forecast vs actuals this quarter',
    ],
  },
  {
    id: 'sales-analysis',
    name: 'Sales Analysis',
    icon: '📊',
    description: 'Pipeline analysis, deal velocity, win rates, and sales team performance metrics.',
    dataSources: ['CRM Pipeline', 'Sales Activity', 'Quota Attainment'],
    tools: ['Search data', 'Create visualizations', 'SpotIQ analysis'],
    creator: 'Sales Ops',
    instructions: 'You are a sales operations analyst. Focus on pipeline, deal velocity, win rates, and rep performance.',
    greeting: 'Sales Analysis',
    subtitle: 'Your pipeline and performance at a glance',
    suggestedQuestions: [
      'What is our current pipeline coverage ratio?',
      'Show deal velocity by stage this quarter',
      'Which reps are trending above quota?',
      'Analyze win rate by deal size and segment',
    ],
  },
  {
    id: 'customer-insights',
    name: 'Customer Insights',
    icon: '👥',
    description: 'Customer health scores, engagement patterns, churn risk, and satisfaction metrics.',
    dataSources: ['Customer Health', 'Product Usage', 'Support Tickets'],
    tools: ['Search data', 'Create visualizations', 'Monitor alerts'],
    creator: 'CS Team',
    instructions: 'Focus on customer health, engagement, and retention. Flag at-risk accounts proactively.',
    greeting: 'Customer Insights',
    subtitle: 'Understand customer health and engagement',
    suggestedQuestions: [
      'Which accounts have declining health scores?',
      'Show me the top churn risk customers this month',
      'What is the average NPS trend by segment?',
      'Analyze support ticket volume by priority',
    ],
  },
  {
    id: 'operations',
    name: 'Operations',
    icon: '⚙️',
    description: 'Operational efficiency, SLA compliance, infrastructure metrics, and cost optimization.',
    dataSources: ['Ops Dashboard', 'Infrastructure Metrics', 'Cost Data'],
    tools: ['Search data', 'Create visualizations', 'Monitor alerts', 'Slack integration'],
    creator: 'Ops Team',
    instructions: 'Monitor operational health, SLA compliance, and infrastructure costs. Escalate anomalies.',
    greeting: 'Operations',
    subtitle: 'Monitor operational health and efficiency',
    suggestedQuestions: [
      'What is our current SLA compliance rate?',
      'Show infrastructure cost trends by service',
      'Which services had the most incidents this week?',
      'Analyze deployment frequency and failure rate',
    ],
  },
  {
    id: 'forecasting',
    name: 'Forecasting',
    icon: '📈',
    description: 'Forward-looking projections, scenario planning, and predictive analytics.',
    dataSources: ['Forecast Model', 'Historical Trends', 'Market Data'],
    tools: ['Search data', 'Create visualizations', 'SpotIQ analysis', 'Schedule reports'],
    creator: 'Strategy Team',
    instructions: 'Provide forward-looking projections and scenario planning. Always show confidence intervals.',
    greeting: 'Forecasting',
    subtitle: 'Predictive insights and scenario planning',
    suggestedQuestions: [
      'What is the revenue forecast for next quarter?',
      'Show best-case vs worst-case pipeline scenarios',
      'Project headcount needs for the next 6 months',
      'What is the expected churn rate next quarter?',
    ],
  },
  {
    id: 'trending',
    name: 'Trending Questions',
    icon: '📈',
    description: 'Popular questions and analyses trending across your organization.',
    dataSources: ['All models'],
    tools: ['Search data', 'Create visualizations'],
    creator: 'ThoughtSpot',
    instructions: 'Surface trending questions and popular analyses from across the organization.',
    greeting: 'Trending Questions',
    subtitle: 'See what your organization is asking about',
    suggestedQuestions: [
      'What are the top KPIs this week?',
      'Show the most viewed Liveboards',
      'Which data sources are most queried?',
      'What questions are other teams asking?',
    ],
  },
];

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp?: number;
}

export interface ChatHistory {
  id: string;
  title: string;
  spotterId: string;
  lastMessage: string;
  timestamp: string;
}

/** Simulated agent responses per MiniSpotter */
export const agentResponses: Record<string, Record<string, string>> = {
  'spotter-ai': {
    'What are the top performing products this quarter?':
      "Based on the data, here are your **top 5 performing products** this quarter:\n\n1. **Enterprise Analytics Suite** — $4.2M revenue (+23% QoQ)\n2. **Cloud Data Platform** — $3.8M revenue (+18% QoQ)\n3. **AI Insights Pro** — $2.9M revenue (+31% QoQ)\n4. **Data Integration Hub** — $2.1M revenue (+12% QoQ)\n5. **Self-Service BI** — $1.7M revenue (+8% QoQ)\n\nNotably, **AI Insights Pro** has the highest growth rate at 31% quarter-over-quarter, suggesting strong market demand for AI-powered analytics.",
    'Analyze sales trends over the last 6 months':
      "Here's your **6-month sales trend analysis**:\n\n• **Total revenue** grew from **$12.4M to $15.8M** (+27.4%)\n• **New business** accounts for **42%** of total revenue, up from 35%\n• **Average deal size** increased from **$48K to $62K** (+29%)\n• **Sales cycle** shortened by **8 days** on average (72 → 64 days)\n\nThe strongest growth was in the **Enterprise segment** (+34%), while **SMB** remained flat. I'd recommend focusing pipeline efforts on mid-market where there's room to grow.",
    'Show me customer retention insights':
      "Here are your **customer retention metrics**:\n\n• **Net Revenue Retention**: **112%** (up from 108% last quarter)\n• **Gross Retention**: **94%** (stable)\n• **Logo Churn**: **2.3%** monthly (down from 2.8%)\n• **Expansion Revenue**: **$2.1M** this quarter\n\n**Key insight**: Customers using 3+ product features have a **97% retention rate** vs **86%** for single-feature users. This suggests that deeper product adoption is the strongest predictor of retention.",
    'What factors are driving revenue growth?':
      "Based on correlation analysis, here are the **top drivers of revenue growth**:\n\n1. **Product-led growth**: Self-serve signups converting at **18%** (up from 11%)\n2. **Enterprise expansion**: Existing accounts expanding at **$340K avg** annual upsell\n3. **New market entry**: APAC revenue grew **45%** YoY\n4. **AI features adoption**: 67% of new deals include AI add-ons\n\n**Risk factors** to watch:\n• Rising CAC in North America (+14%)\n• Longer enterprise sales cycles in EMEA\n• Increasing competition in the mid-market segment",
  },
  'revenue-radar': {
    'What is our current ARR by segment?':
      "Here's the **ARR breakdown by segment**:\n\n• **Enterprise** (>$100K): **$42.3M** (56% of total ARR)\n• **Mid-Market** ($25K-$100K): **$21.7M** (29% of total ARR)\n• **SMB** (<$25K): **$11.2M** (15% of total ARR)\n\n**Total ARR: $75.2M** — up 22% year-over-year.\n\nEnterprise grew fastest at **28% YoY**, driven by 12 new logos averaging **$380K ARR** each.",
    'Show MRR growth trend over the past 12 months':
      "**Monthly Recurring Revenue trend** (last 12 months):\n\nMRR grew from **$5.1M to $6.3M** (+23.5%).\n\n• **Strongest months**: March (+4.2%) and September (+3.8%) — driven by quarter-end deal closures\n• **Net new MRR avg**: **$180K/month**\n• **Churn MRR avg**: **$52K/month**\n• **Expansion MRR avg**: **$95K/month**\n\nThe trend line shows accelerating growth in H2, with expansion MRR overtaking new business MRR for the first time in November.",
    'Which accounts have the highest expansion revenue?':
      "**Top 5 accounts by expansion revenue** (last 12 months):\n\n1. **Acme Corp** — $420K expansion (+3 product modules)\n2. **GlobalTech Inc** — $380K expansion (+200 seats)\n3. **DataFirst Ltd** — $295K expansion (Enterprise tier upgrade)\n4. **NovaStar Systems** — $240K expansion (+AI add-on)\n5. **Pinnacle Group** — $210K expansion (+2 business units)\n\nThese 5 accounts represent **38%** of total expansion revenue. All have dedicated CSMs and usage above the 90th percentile.",
    'Compare revenue forecast vs actuals this quarter':
      "**Q1 2026 forecast vs actuals:**\n\n• **Forecast**: $19.8M\n• **Actuals (to date)**: $17.2M (87% of forecast with 3 weeks remaining)\n• **Projected close**: $20.1M (+1.5% above forecast)\n\n**By category:**\n• New business: $8.1M vs $7.4M forecast (**+9.5%** — strong outperformance)\n• Renewal: $9.2M vs $9.8M forecast (**-6.1%** — 3 delayed renewals)\n• Expansion: $2.8M vs $2.6M forecast (**+7.7%**)\n\nThe delayed renewals (Orion, BlueWave, TechVault) are expected to close by month-end.",
  },
};

// Fallback response for any question not pre-mapped
export const fallbackResponse =
  "I'm analyzing the data for your question. Based on the available information, here are some initial findings:\n\n• The relevant data sources have been queried across **3 tables** and **12 dimensions**\n• Results are filtered to the **current quarter** by default\n• I found **847 matching records** across the selected scope\n\nWould you like me to break this down by a specific dimension, or shall I generate a visualization?";
