export type Platform = 'ios' | 'android';
export type MockupDevice = 'iphone' | 'android' | 'watch' | 'ipad' | 'standby' | 'carplay' | 'desktop';

export type IOSTheme = 'full' | 'dark' | 'clear' | 'tinted' | 'black';
export type AndroidTheme = 'light' | 'dark';
export type Theme = IOSTheme | AndroidTheme;

export type WidgetSize = 'small' | 'medium' | 'large' | 'xlarge';
export type KPIDisplayType =
  | 'full'
  | 'no-change'
  | 'no-date'
  | 'full-graph'
  | 'full-graph-no-change'
  | 'full-graph-no-date';
export type WidgetLayout = 'list' | 'grid';
export type WidgetView = 'lock' | 'home';
export type WidgetState = 'default' | 'empty' | 'loading' | 'error';
export type ActiveView = 'mockup' | 'docs';

export interface KPIData {
  id: string;
  name: string;
  shortName: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  period: string;
  comparison: string;
  sparklineData: number[];
}
