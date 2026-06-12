import React from 'react';
import { Theme, WidgetSize, KPIDisplayType, WidgetLayout, WidgetState } from '../../types';
import WidgetShell from '../WidgetShell/WidgetShell';
import KPIWidget from '../KPIWidget/KPIWidget';
import { MOCK_KPIS } from '../../data/mockKPIs';
import styles from './PhoneFrame.module.css';

// Figma-sourced assets (Pixel 9 Pro reference)
import wallpaperSrc    from '../../assets/android/wallpaper.png';
import weatherSrc      from '../../assets/android/weather.png';
import icoCalendar     from '../../assets/android/ico-calendar.png';
import icoChrome       from '../../assets/android/ico-chrome.png';
import icoPodcast      from '../../assets/android/ico-podcast.png';
import icoAssistant    from '../../assets/android/ico-assistant.png';
import icoTs           from '../../assets/android/ico-ts.png';
import icoGoogle       from '../../assets/android/ico-google.png';
import icoYoutubePlay  from '../../assets/android/ico-youtube-play.svg?url';
import icoPlaystore    from '../../assets/android/ico-playstore.png';
import icoMessages     from '../../assets/android/ico-messages.png';
import icoGmail        from '../../assets/android/ico-gmail.png';
import icoContacts     from '../../assets/android/ico-contacts.png';
import icoRow3d        from '../../assets/android/ico-row3d-overlay.svg?url';
import searchGoogle    from '../../assets/android/search-google.png';
import searchMic       from '../../assets/android/search-mic.png';
import searchLens      from '../../assets/android/search-lens.png';

// ─── Layout constants (screen: 320×700px inside 340×720px, 10px bezels) ───────
// All x/y values are relative to the pixelScreen div (320×700px)

export const ANDROID_WIDGET_POS = {
  small:  { left: 68,  top: 164, w: 184, h: 184 },
  medium: { left: 24,  top: 164, w: 272, h: 184 },
  large:  { left: 24,  top: 164, w: 272, h: 298 },
  xlarge: { left: 24,  top: 164, w: 272, h: 386 },
};

// Icon grid — 4 cols, justify-between, 24px margins each side in 320px frame
// Gap = (272 - 4×46) / 3 = 29.33px → left[i] = 24 + i×75.33
const icoLeft = (i: number) => Math.round(24 + i * 75.33);

type BgVariant = 'light' | 'dark' | 'none';
interface IconDef { bg: BgVariant; overlay: string; inset?: string; label: string }

// Row 1  (top = 372px)
const ROW1: IconDef[] = [
  { bg: 'light', overlay: icoCalendar,    inset: '24%',             label: 'Calendar'  },
  { bg: 'light', overlay: icoChrome,      inset: '19%',             label: 'Chrome'    },
  { bg: 'dark',  overlay: icoPodcast,     inset: '19%',             label: 'Podcast'   },
  { bg: 'light', overlay: icoAssistant,   inset: '19%',             label: 'Assistant' },
];

// Row 2  (top = 464px)
const ROW2: IconDef[] = [
  { bg: 'none',  overlay: icoTs,          inset: '0%',              label: 'App name'  },
  { bg: 'dark',  overlay: icoGoogle,      inset: '23%',             label: 'Google'    },
  { bg: 'dark',  overlay: icoYoutubePlay, inset: '14% 19% 14% 19%', label: 'Youtube'   },
  { bg: 'dark',  overlay: icoPlaystore,   inset: '20%',             label: 'Play Store'},
];

// Row 3  (top = 564px)
const ROW3: IconDef[] = [
  { bg: 'dark',  overlay: icoMessages,    inset: '16% 17%',         label: 'Messages'  },
  { bg: 'none',  overlay: icoGmail,       inset: '0%',              label: 'Gmail'     },
  { bg: 'dark',  overlay: icoContacts,    inset: '23%',             label: 'Contacts'  },
  { bg: 'dark',  overlay: icoRow3d,       inset: '20%',             label: 'Pixel'     },
];

// ─── Absolute icon cell ───────────────────────────────────────────────────────
const AbsAndroidIcon: React.FC<{ def: IconDef; colIdx: number; top: number }> = ({ def, colIdx, top }) => {
  const left = icoLeft(colIdx);
  const bgClass = def.bg === 'light' ? styles.androidIconBgLight
                : def.bg === 'dark'  ? styles.androidIconBgDark
                : styles.androidIconBgNone;
  return (
    <div className={styles.absAndroidIconWrap} style={{ left, top }}>
      <div className={`${styles.androidIconCircle} ${bgClass}`}>
        <img
          src={def.overlay}
          alt={def.label}
          className={styles.androidIconOverlay}
          style={{ inset: def.inset ?? '20%' }}
        />
      </div>
      <div className={styles.androidIconLabel}>{def.label}</div>
    </div>
  );
};

interface AndroidPhoneFrameProps {
  theme: Theme;
  size: WidgetSize;
  kpiDisplayType: KPIDisplayType;
  layout: WidgetLayout;
  state: WidgetState;
  kpiIndex: number;
}

const AndroidPhoneFrame: React.FC<AndroidPhoneFrameProps> = ({
  theme, size, kpiDisplayType, layout, state, kpiIndex,
}) => {
  const kpi = MOCK_KPIS[kpiIndex % MOCK_KPIS.length];
  const pos = ANDROID_WIDGET_POS[size];

  return (
    <div className={styles.pixel}>
      {/* Hardware buttons — right side only */}
      <div className={`${styles.btn} ${styles.pixelPower}`}   />
      <div className={`${styles.btn} ${styles.pixelVolUp}`}   />
      <div className={`${styles.btn} ${styles.pixelVolDown}`} />

      <div className={styles.pixelScreen}>
        {/* Wallpaper */}
        <img src={wallpaperSrc} alt="" className={styles.androidWallpaper} />

        {/* Status bar */}
        <div className={styles.androidStatus}>
          <span className={styles.statusTime} style={{ color: 'rgba(255,255,255,0.92)' }}>12:10</span>
          {/* Punch-hole camera */}
          <div className={styles.punchHole} />
          <div className={styles.statusRight}>
            <AndroidWifi /><AndroidSignal /><AndroidBattery />
          </div>
        </div>

        {/* Date + weather */}
        <div className={styles.androidDateArea}>
          <img src={weatherSrc} alt="" className={styles.androidWeatherImg} />
          <div className={styles.androidDate}>Fri, Sep 17</div>
        </div>

        {/* Widget */}
        <div
          className={styles.widgetOverlay}
          style={{ left: pos.left, top: pos.top, width: pos.w, height: pos.h }}
        >
          <WidgetShell platform="android" size={size} theme={theme}>
            <KPIWidget
              kpi={kpi}
              kpiDisplayType={kpiDisplayType}
              layout={layout}
              size={size}
              state={state}
              platform="android"
            />
          </WidgetShell>
        </div>

        {/* Icon rows */}
        {ROW1.map((d, i) => <AbsAndroidIcon key={d.label} def={d} colIdx={i} top={372} />)}
        {ROW2.map((d, i) => <AbsAndroidIcon key={d.label} def={d} colIdx={i} top={464} />)}
        {ROW3.map((d, i) => <AbsAndroidIcon key={d.label} def={d} colIdx={i} top={564} />)}

        {/* Google search bar */}
        <div className={styles.androidSearchBar}>
          <img src={searchGoogle} alt="Google" className={styles.androidSearchGoogle} />
          <div className={styles.androidSearchRight}>
            <img src={searchMic}  alt="Mic"  className={styles.androidSearchIcon} />
            <img src={searchLens} alt="Lens" className={styles.androidSearchIcon} />
          </div>
        </div>

        {/* Navigation indicator */}
        <div className={styles.androidNavBar}>
          <div className={styles.navLine} />
        </div>
      </div>
    </div>
  );
};

// ─── Status bar SVG icons ─────────────────────────────────────────────────────
const AndroidWifi = () => (
  <svg width="16" height="12" viewBox="0 0 16 12">
    <circle cx="8" cy="10.5" r="1.5" fill="white" />
    <path d="M4.5 7.5a5 5 0 017 0" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    <path d="M1.5 4.5a9 9 0 0113 0" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </svg>
);
const AndroidSignal = () => (
  <svg width="16" height="12" viewBox="0 0 16 12">
    {[0,1,2,3].map(i => (
      <rect key={i} x={i * 4.5} y={12 - (i+1)*3} width="3" height={(i+1)*3} rx="0.8" fill="white" />
    ))}
  </svg>
);
const AndroidBattery = () => (
  <svg width="26" height="12" viewBox="0 0 26 12">
    <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1" fill="none" />
    <rect x="22" y="3.5" width="2.5" height="5" rx="1.5" fill="rgba(255,255,255,0.5)" />
    <rect x="2" y="2" width="13" height="8" rx="1.5" fill="white" />
  </svg>
);

export default AndroidPhoneFrame;
