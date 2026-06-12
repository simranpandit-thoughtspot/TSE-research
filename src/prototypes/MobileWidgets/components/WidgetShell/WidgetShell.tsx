import React from 'react';
import { Platform, Theme, WidgetSize } from '../../types';
import {
  IOS_WIDGET_SIZES, ANDROID_WIDGET_SIZES,
  IOS_CORNER, ANDROID_CORNER,
  IOS_PADDING, ANDROID_PADDING,
  IOS_THEMES, ANDROID_THEMES,
  ThemeColors,
} from '../../constants/widgetSpecs';
import styles from './WidgetShell.module.css';

interface WidgetShellProps {
  platform: Platform;
  size: WidgetSize;
  theme: Theme;
  children: React.ReactNode;
  className?: string;
}

const WidgetShell: React.FC<WidgetShellProps> = ({
  platform, size, theme, children, className,
}) => {
  const sizes = platform === 'ios' ? IOS_WIDGET_SIZES : ANDROID_WIDGET_SIZES;
  const dims = sizes[size];
  const corner = platform === 'ios' ? IOS_CORNER : ANDROID_CORNER;
  const padding = platform === 'ios' ? IOS_PADDING : ANDROID_PADDING;
  const themeMap = platform === 'ios' ? IOS_THEMES : ANDROID_THEMES;
  const colors: ThemeColors = themeMap[theme] ?? themeMap[platform === 'ios' ? 'full' : 'dark'];

  const cssVars = {
    '--widget-bg': colors.bg,
    '--widget-bg-secondary': colors.bgSecondary,
    '--widget-text-primary': colors.textPrimary,
    '--widget-text-secondary': colors.textSecondary,
    '--widget-positive': colors.positive,
    '--widget-negative': colors.negative,
    '--widget-chart-line': colors.chartLine,
    '--widget-chart-fill': colors.chartFill,
    '--widget-chart-baseline': colors.chartBaseline,
    '--widget-logo': colors.logo,
    '--widget-font': colors.fontFamily,
    '--widget-corner-outer': `${corner.outer}px`,
    '--widget-corner-inner': `${corner.inner}px`,
    '--widget-padding': `${padding}px`,
    '--widget-width': `${dims.widthPx}px`,
    '--widget-height': `${dims.heightPx}px`,
    '--widget-skeleton-base': colors.skeletonBase ?? 'rgba(0,0,0,0.07)',
    '--widget-skeleton-shine': colors.skeletonShine ?? 'rgba(255,255,255,0.85)',
  } as React.CSSProperties;

  const glassStyle = colors.glass
    ? {
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: `1px solid ${colors.borderColor ?? 'rgba(255,255,255,0.18)'}`,
      }
    : colors.borderColor
    ? { border: `1px solid ${colors.borderColor}` }
    : {};

  return (
    <div
      className={`${styles.shell} ${styles[platform]} ${className ?? ''}`}
      style={{
        ...cssVars,
        ...glassStyle,
        width: dims.widthPx,
        height: dims.heightPx,
        borderRadius: corner.outer,
        backgroundColor: colors.bg,
        fontFamily: colors.fontFamily,
        padding,
      }}
    >
      {children}
    </div>
  );
};

export default WidgetShell;
export type { ThemeColors };
