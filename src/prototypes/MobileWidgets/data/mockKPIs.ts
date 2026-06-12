import { KPIData } from '../types';

const generateSparkline = (trend: 'up' | 'down' | 'volatile', base: number, range: number): number[] => {
  const points: number[] = [];
  let current = base;
  for (let i = 0; i < 24; i++) {
    const noise = (Math.random() - 0.48) * range;
    const drift = trend === 'up' ? range * 0.04 : trend === 'down' ? -range * 0.04 : 0;
    current = Math.max(base * 0.6, Math.min(base * 1.5, current + noise + drift));
    points.push(Math.round(current * 100) / 100);
  }
  return points;
};

// ─── Single-KPI widget data (used in small / full-graph views) ───────────────
export const MOCK_KPIS: KPIData[] = [
  {
    id: 'cq-bookings',
    name: 'CQ Bookings',
    shortName: 'CQ BOOKE...',
    value: '3.7M',
    trend: '↑ 10%',
    trendDirection: 'up',
    period: 'Week 04/20...',
    comparison: 'vs May FY 2024...',
    sparklineData: generateSparkline('up', 3200, 600),
  },
  {
    id: 'pipeline',
    name: 'Pipeline Value',
    shortName: 'PIPELINE',
    value: '$12.4M',
    trend: '↑ 22%',
    trendDirection: 'up',
    period: 'Q2 FY 2025',
    comparison: 'vs Q2 FY 2024',
    sparklineData: generateSparkline('up', 10000, 2000),
  },
  {
    id: 'dau',
    name: 'Daily Active Users',
    shortName: 'DAU',
    value: '142K',
    trend: '↓ 3%',
    trendDirection: 'down',
    period: 'Apr 2025',
    comparison: 'vs Mar 2025',
    sparklineData: generateSparkline('down', 145000, 8000),
  },
  {
    id: 'churn',
    name: 'Churn Rate',
    shortName: 'CHURN',
    value: '2.1%',
    trend: '↑ 0.2%',
    trendDirection: 'down',
    period: 'Q1 FY 2025',
    comparison: 'vs Q4 FY 2024',
    sparklineData: generateSparkline('volatile', 2.0, 0.4),
  },
  {
    id: 'nps',
    name: 'NPS Score',
    shortName: 'NPS',
    value: '68',
    trend: '↑ 5pts',
    trendDirection: 'up',
    period: 'May 2025',
    comparison: 'vs Apr 2025',
    sparklineData: generateSparkline('up', 63, 8),
  },
];

// ─── Watchlist KPI data (used in list / grid layout for medium/large) ─────────
export const WATCHLIST_KPIS: KPIData[] = [
  {
    id: 'wl-total-revenue',
    name: 'Total Revenue by Product',
    shortName: 'TOTAL REV',
    value: '88.888M',
    trend: '↑ 20.74 %',
    trendDirection: 'up',
    period: 'WoW',
    comparison: 'WoW',
    sparklineData: generateSparkline('up', 80, 12),
  },
  {
    id: 'wl-new-users',
    name: 'New Users by Last Week',
    shortName: 'NEW USERS',
    value: '575.124M',
    trend: '↓ 20.74 %',
    trendDirection: 'down',
    period: 'MoM',
    comparison: 'MoM',
    sparklineData: generateSparkline('down', 500, 60),
  },
  {
    id: 'wl-dau',
    name: 'Daily Active Users',
    shortName: 'DAU',
    value: '142.567K',
    trend: '↑ 5.23 %',
    trendDirection: 'up',
    period: 'WoW',
    comparison: 'WoW',
    sparklineData: generateSparkline('up', 140, 10),
  },
  {
    id: 'wl-session',
    name: 'Avg. Session Duration',
    shortName: 'SESSION',
    value: '4.2M',
    trend: '↑ 8.14 %',
    trendDirection: 'up',
    period: 'MoM',
    comparison: 'MoM',
    sparklineData: generateSparkline('up', 4, 0.4),
  },
  {
    id: 'wl-pipeline',
    name: 'Pipeline Coverage',
    shortName: 'PIPELINE',
    value: '3.2×',
    trend: '↓ 12.50 %',
    trendDirection: 'down',
    period: 'QoQ',
    comparison: 'QoQ',
    sparklineData: generateSparkline('down', 3.5, 0.3),
  },
  {
    id: 'wl-retention',
    name: 'Customer Retention',
    shortName: 'RETENTION',
    value: '94.8%',
    trend: '↑ 1.20 %',
    trendDirection: 'up',
    period: 'MoM',
    comparison: 'MoM',
    sparklineData: generateSparkline('up', 93, 1.5),
  },
];

export const DEFAULT_KPI = MOCK_KPIS[0];
