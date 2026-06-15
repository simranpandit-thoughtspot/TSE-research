// ─── iOS Widget Specs ────────────────────────────────────────────────────────
// Source: Apple HIG — iPhone 14 Pro (393×852pt), display scale 284/364 ≈ 0.780
// Rendered phone frame: 340px wide → screen 308px → content 284px → scale ≈ 0.780
// HIG pt sizes: small=170×170, medium=364×170, large=364×382
export const IOS_WIDGET_SIZES = {
  small: {
    widthPt: 170, heightPt: 170,
    widthPx: 164, heightPx: 164,
    label: 'Small', ptLabel: '170×170pt',
    note: 'systemSmall — 1 KPI',
  },
  medium: {
    widthPt: 364, heightPt: 170,
    widthPx: 284, heightPx: 140,
    label: 'Medium', ptLabel: '364×170pt',
    note: 'systemMedium — 2–3 KPIs',
  },
  large: {
    widthPt: 364, heightPt: 382,
    widthPx: 284, heightPx: 300,
    label: 'Large', ptLabel: '364×382pt',
    note: 'systemLarge — 4–5 KPIs',
  },
  xlarge: {
    widthPt: 364, heightPt: 472,
    widthPx: 284, heightPx: 370,
    label: 'XL', ptLabel: '364×472pt',
    note: 'systemXLarge (iPad/standby) — 6+ KPIs',
  },
} as const;

// Corner radius: ContainerRelativeShape = 21pt outer, 18pt inner
export const IOS_CORNER = { outer: 21, inner: 18 };
// Content margin: 16pt system margin → scaled
export const IOS_PADDING = 13;

// ─── Android Widget Specs ─────────────────────────────────────────────────────
// Source: Android Developer docs — Pixel 9 Pro, 4-column grid
// Rendered phone frame: 340px wide → screen 320px → content 272px (24px margin each side)
// Figma reference widget (small 2×2): 184×184px in 320px screen
export const ANDROID_WIDGET_SIZES = {
  small: {
    widthDp: 130, heightDp: 130,
    widthPx: 184, heightPx: 184,
    label: 'Small', dpLabel: '2×2 grid',
    note: 'Small (2×2) — 1 KPI',
  },
  medium: {
    widthDp: 276, heightDp: 130,
    widthPx: 272, heightPx: 184,
    label: 'Medium', dpLabel: '4×2 grid',
    note: 'Medium (4×2) — 2–3 KPIs',
  },
  large: {
    widthDp: 276, heightDp: 276,
    widthPx: 272, heightPx: 298,
    label: 'Large', dpLabel: '4×4 grid',
    note: 'Large (4×4) — 3–5 KPIs',
  },
  xlarge: {
    widthDp: 276, heightDp: 414,
    widthPx: 272, heightPx: 386,
    label: 'XL', dpLabel: '4×6 grid',
    note: 'Extra large — 6+ KPIs',
  },
} as const;

// Corner radius: system_app_widget_background_radius = 28dp outer
export const ANDROID_CORNER = { outer: 21, inner: 14 };
// Content padding: 16dp system standard
export const ANDROID_PADDING = 11;

// ─── Theme Color Maps ─────────────────────────────────────────────────────────

export type ThemeColors = {
  bg: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  positive: string;
  negative: string;
  chartLine: string;
  chartFill: string;
  chartBaseline: string;
  logo: string;
  fontFamily: string;
  glass?: boolean;
  borderColor?: string;
  skeletonBase?: string;
  skeletonShine?: string;
};

// iOS WidgetKit rendering modes:
// full   = full-color light (white bg — standard Figma design)
// clear  = Liquid Glass / vibrant translucent dark frosted
// tinted = system-tinted accented monochromatic
export const IOS_THEMES: Record<string, ThemeColors> = {
  full: {
    bg: '#FFFFFF',
    bgSecondary: '#F2F7FF',
    textPrimary: '#1D232F',
    textSecondary: '#777E8B',
    positive: '#06BF7F',
    negative: '#E22B3D',
    chartLine: '#2770EF',
    chartFill: 'rgba(39,112,239,0.08)',
    chartBaseline: 'rgba(39,112,239,0.25)',
    logo: '#1D232F',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
    skeletonBase: 'rgba(0,0,0,0.07)',
    skeletonShine: 'rgba(255,255,255,0.88)',
  },
  dark: {
    bg: '#1C1C1E',
    bgSecondary: '#2C2C2E',
    textPrimary: '#F7F8FA',
    textSecondary: '#9BA3AF',
    positive: '#06BF7F',
    negative: '#E22B3D',
    chartLine: '#2770EF',
    chartFill: 'rgba(39,112,239,0.18)',
    chartBaseline: 'rgba(39,112,239,0.4)',
    logo: '#FFFFFF',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
    skeletonBase: 'rgba(255,255,255,0.09)',
    skeletonShine: 'rgba(255,255,255,0.2)',
  },
  clear: {
    bg: 'rgba(24, 24, 28, 0.72)',
    bgSecondary: 'rgba(255,255,255,0.08)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.55)',
    positive: '#06BF7F',
    negative: '#E22B3D',
    chartLine: '#2770EF',
    chartFill: 'rgba(39,112,239,0.22)',
    chartBaseline: 'rgba(39,112,239,0.4)',
    logo: '#FFFFFF',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
    glass: true,
    borderColor: 'rgba(255,255,255,0.14)',
    skeletonBase: 'rgba(255,255,255,0.08)',
    skeletonShine: 'rgba(255,255,255,0.2)',
  },
  tinted: {
    bg: '#0A52C4',
    bgSecondary: 'rgba(255,255,255,0.12)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.72)',
    positive: 'rgba(255,255,255,0.9)',
    negative: 'rgba(255,200,200,0.9)',
    chartLine: 'rgba(255,255,255,0.85)',
    chartFill: 'rgba(255,255,255,0.15)',
    chartBaseline: 'rgba(255,255,255,0.45)',
    logo: '#FFFFFF',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
    skeletonBase: 'rgba(255,255,255,0.1)',
    skeletonShine: 'rgba(255,255,255,0.22)',
  },
  black: {
    bg: '#000000',
    bgSecondary: 'rgba(255,255,255,0.06)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.4)',
    positive: '#06BF7F',
    negative: '#E22B3D',
    chartLine: '#2770EF',
    chartFill: 'rgba(39,112,239,0.22)',
    chartBaseline: 'rgba(39,112,239,0.4)',
    logo: '#FFFFFF',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
    borderColor: 'rgba(255,255,255,0.14)',
    skeletonBase: 'rgba(255,255,255,0.08)',
    skeletonShine: 'rgba(255,255,255,0.18)',
  },
};

export const ANDROID_THEMES: Record<string, ThemeColors> = {
  light: {
    bg: '#FFFFFF',
    bgSecondary: '#F2F7FF',
    textPrimary: '#1D232F',
    textSecondary: '#777E8B',
    positive: '#06BF7F',
    negative: '#E22B3D',
    chartLine: '#2770EF',
    chartFill: 'rgba(39,112,239,0.08)',
    chartBaseline: 'rgba(39,112,239,0.25)',
    logo: '#1D232F',
    fontFamily: '"Google Sans", "Roboto", system-ui, sans-serif',
    skeletonBase: 'rgba(0,0,0,0.07)',
    skeletonShine: 'rgba(255,255,255,0.88)',
  },
  dark: {
    bg: '#1C1B1F',
    bgSecondary: '#2B2930',
    textPrimary: '#F7F8FA',
    textSecondary: '#9BA3AF',
    positive: '#06BF7F',
    negative: '#E22B3D',
    chartLine: '#2770EF',
    chartFill: 'rgba(39,112,239,0.18)',
    chartBaseline: 'rgba(39,112,239,0.4)',
    logo: '#F7F8FA',
    fontFamily: '"Google Sans", "Roboto", system-ui, sans-serif',
    skeletonBase: 'rgba(255,255,255,0.09)',
    skeletonShine: 'rgba(255,255,255,0.2)',
  },
};

// ─── Typography Scale ─────────────────────────────────────────────────────────

export const IOS_TYPE = {
  title: { size: '11px', weight: '700', lineHeight: '1.2' },
  titleLarge: { size: '13px', weight: '800', lineHeight: '1.2' },
  valueSmall: { size: '22px', weight: '700', lineHeight: '1.0' },
  valueMedium: { size: '28px', weight: '700', lineHeight: '1.0' },
  valueLarge: { size: '32px', weight: '700', lineHeight: '1.0' },
  trend: { size: '10px', weight: '500', lineHeight: '1.3' },
  caption: { size: '9px', weight: '400', lineHeight: '1.3' },
  watchlistRow: { size: '12px', weight: '400', lineHeight: '1.3' },   // KPI name — regular
  watchlistValue: { size: '14px', weight: '600', lineHeight: '1.0' }, // Value — semibold
  watchlistTrend: { size: '10px', weight: '400', lineHeight: '1.2' }, // Trend %
  watchlistPeriod: { size: '10px', weight: '400', lineHeight: '1.2' },// WoW / MoM
};

export const ANDROID_TYPE = {
  title: { size: '11px', weight: '500', lineHeight: '1.3' },
  titleLarge: { size: '12px', weight: '500', lineHeight: '1.3' },
  valueSmall: { size: '18px', weight: '400', lineHeight: '1.0' },
  valueMedium: { size: '22px', weight: '400', lineHeight: '1.0' },
  valueLarge: { size: '26px', weight: '400', lineHeight: '1.0' },
  trend: { size: '10px', weight: '400', lineHeight: '1.3' },
  caption: { size: '9px', weight: '400', lineHeight: '1.3' },
  watchlistRow: { size: '12px', weight: '400', lineHeight: '1.3' },
  watchlistValue: { size: '14px', weight: '600', lineHeight: '1.0' },
  watchlistTrend: { size: '10px', weight: '400', lineHeight: '1.2' },
};
