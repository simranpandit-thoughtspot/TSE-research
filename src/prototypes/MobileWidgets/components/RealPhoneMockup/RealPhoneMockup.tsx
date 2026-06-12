import React from 'react';
import { Platform, Theme, WidgetSize, KPIDisplayType, WidgetLayout } from '../../types';
import { IOS_WIDGET_SIZES, ANDROID_WIDGET_SIZES } from '../../constants/widgetSpecs';
import WidgetShell from '../WidgetShell/WidgetShell';
import KPIWidget from '../KPIWidget/KPIWidget';
import { MOCK_KPIS } from '../../data/mockKPIs';
import styles from './RealPhoneMockup.module.css';

// ─── Image dimensions (verified from actual files) ──────────────────────────
// iOS:     mockup-iphone.webp  → 1306 × 1830 px
// Android: mockup-android.webp → 1080 × 1997 px

const IMAGE_DIMS = {
  ios:     { w: 1306, h: 1830 },
  android: { w: 1080, h: 1997 },
};

// Display width for each platform frame
const DISPLAY_WIDTH = {
  ios:     335,  // → display height: 1830*(335/1306) = 469px
  android: 300,  // → display height: 1997*(300/1080) = 555px
};

// ─── Overlay positions (pixels at display width) ─────────────────────────────
// iOS (335px wide, 469px tall):
//   Scale: 335/1306 = 0.2565
//   Phone screen starts at ~x=26px (after left bezel)
//   Home screen content starts at ~y=54px (after status bar + notch)
//   4-column grid, each col ~63px
//   Fitness widget slot (cols 3-4, rows 1-2): left=170px, top=54px, 126×126px
//
// Android (300px wide, 555px tall):
//   Scale: 300/1080 = 0.2778
//   Screen starts ~x=10px
//   Widget area starts ~y=88px (after status bar + date/weather)
//   Left card position: x=18px, y=88px

const IOS_OVERLAY: Record<WidgetSize, { left: number; top: number }> = {
  small:  { left: 170, top:  54 },
  medium: { left:  38, top:  54 },
  large:  { left:  38, top:  54 },
  xlarge: { left:  38, top:  54 },
};

const ANDROID_OVERLAY: Record<WidgetSize, { left: number; top: number }> = {
  small:  { left: 18, top:  88 },
  medium: { left: 18, top:  88 },
  large:  { left: 18, top:  88 },
  xlarge: { left: 18, top:  88 },
};

interface RealPhoneMockupProps {
  platform: Platform;
  size: WidgetSize;
  theme: Theme;
  kpiDisplayType: KPIDisplayType;
  layout: WidgetLayout;
  kpiIndex: number;
}

const RealPhoneMockup: React.FC<RealPhoneMockupProps> = ({
  platform, size, theme, kpiDisplayType, layout, kpiIndex,
}) => {
  const kpi = MOCK_KPIS[kpiIndex % MOCK_KPIS.length];
  const imgDims = IMAGE_DIMS[platform];
  const displayW = DISPLAY_WIDTH[platform];
  const displayH = Math.round(displayW * (imgDims.h / imgDims.w));
  const overlay = platform === 'ios' ? IOS_OVERLAY[size] : ANDROID_OVERLAY[size];
  const widgetSizes = platform === 'ios' ? IOS_WIDGET_SIZES : ANDROID_WIDGET_SIZES;
  const dims = widgetSizes[size];

  return (
    <div
      className={styles.wrapper}
      style={{ width: displayW, height: displayH }}
    >
      {/* Real device photo */}
      <img
        src={platform === 'ios' ? '/mockup-iphone.webp' : '/mockup-android.webp'}
        alt={platform === 'ios' ? 'iPhone home screen' : 'Android home screen'}
        className={styles.phoneImage}
        draggable={false}
      />

      {/* Widget overlay — positioned exactly over the target slot */}
      <div
        className={styles.widgetOverlay}
        style={{ left: overlay.left, top: overlay.top }}
      >
        <WidgetShell platform={platform} size={size} theme={theme}>
          <KPIWidget
            kpi={kpi}
            kpiDisplayType={kpiDisplayType}
            layout={layout}
            size={size}
            state="default"
            platform={platform}
          />
        </WidgetShell>
      </div>

      {/* "ThoughtSpot" label below widget (mimics iOS widget app name) */}
      {platform === 'ios' && (
        <div
          className={styles.widgetLabel}
          style={{
            left: overlay.left,
            top: overlay.top + dims.heightPx + 4,
            width: dims.widthPx,
          }}
        >
          ThoughtSpot
        </div>
      )}
    </div>
  );
};

export default RealPhoneMockup;
