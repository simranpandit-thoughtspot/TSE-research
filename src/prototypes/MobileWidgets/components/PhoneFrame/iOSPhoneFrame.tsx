import React from 'react';
import { Theme, WidgetSize, KPIDisplayType, WidgetLayout, WidgetState } from '../../types';
import WidgetShell from '../WidgetShell/WidgetShell';
import KPIWidget from '../KPIWidget/KPIWidget';
import { MOCK_KPIS } from '../../data/mockKPIs';
import styles from './PhoneFrame.module.css';
import widgetSmallUrl from '../../assets/widget-small.svg?url';
import widgetMediumUrl from '../../assets/widget-medium.svg?url';
import widgetLargeUrl from '../../assets/widget-large.svg?url';
import widgetXlargeUrl from '../../assets/widget-xlarge.svg?url';

// Figma-sourced assets
import wallpaperSrc from '../../assets/wallpaper.png';
import icoFaceTime  from '../../assets/icons/facetime.png';
import icoCalendar  from '../../assets/icons/calendar.png';
import icoPhotos    from '../../assets/icons/photos.png';
import icoCamera    from '../../assets/icons/camera.png';
import icoMail      from '../../assets/icons/mail.png';
import icoNotes     from '../../assets/icons/notes.png';
import icoReminders from '../../assets/icons/reminders.png';
import icoClock     from '../../assets/icons/clock.png';
import icoNews      from '../../assets/icons/news.png';
import icoTV        from '../../assets/icons/tv.png';
import icoGames     from '../../assets/icons/games.png';
import icoAppStore  from '../../assets/icons/appstore.png';
import icoMaps      from '../../assets/icons/maps.png';
import icoHealth    from '../../assets/icons/health.png';
import icoWallet    from '../../assets/icons/wallet.png';
import icoSettings  from '../../assets/icons/settings.png';
import icoPhone     from '../../assets/icons/phone.png';
import icoSafari    from '../../assets/icons/safari.png';
import icoMessages  from '../../assets/icons/messages.png';
import icoMusic     from '../../assets/icons/music.png';

// ─── Layout constants (screen: 308×668px inside 340×700px, 16px bezels) ─────
const STATUS_H   = 56;
const GRID_ML    = 12;
const COL        = 68;
const GAP        = 4;
const WIDGET_TOP = STATUS_H + 4;  // 60px from screen top

// px left of col c
const colX = (c: number) => GRID_ML + c * (COL + GAP);

// Icon cell height = 60px icon + 3px gap + 10px label ≈ 73px
const CELL_H  = 73;
const ROW_GAP = 8;

export const IOS_WIDGET_POS = {
  small:  { left: GRID_ML, top: WIDGET_TOP, w: 164,               h: 164 },
  medium: { left: GRID_ML, top: WIDGET_TOP, w: 4 * COL + 3 * GAP, h: 140 },
  large:  { left: GRID_ML, top: WIDGET_TOP, w: 4 * COL + 3 * GAP, h: 300 },
  xlarge: { left: GRID_ML, top: WIDGET_TOP, w: 4 * COL + 3 * GAP, h: 370 },
};

const SVG_WIDGET: Record<WidgetSize, string> = {
  small: widgetSmallUrl,
  medium: widgetMediumUrl,
  large: widgetLargeUrl,
  xlarge: widgetXlargeUrl,
};

interface IconDef { src: string; label: string }

// Grid icon definitions (matches Figma reference layout)
const SIDE_ROW0: IconDef[] = [
  { src: icoFaceTime, label: 'FaceTime' },
  { src: icoCalendar, label: 'Calendar' },
];
const SIDE_ROW1: IconDef[] = [
  { src: icoPhotos,   label: 'Photos'   },
  { src: icoCamera,   label: 'Camera'   },
];
const FULL_ROWS: IconDef[][] = [
  [{ src: icoMail,     label: 'Mail'      }, { src: icoNotes,    label: 'Notes'     }, { src: icoReminders, label: 'Reminders' }, { src: icoClock,    label: 'Clock'     }],
  [{ src: icoNews,     label: 'News'      }, { src: icoTV,       label: 'TV'        }, { src: icoGames,     label: 'Games'     }, { src: icoAppStore, label: 'App Store' }],
  [{ src: icoMaps,     label: 'Maps'      }, { src: icoHealth,   label: 'Health'    }, { src: icoWallet,    label: 'Wallet'    }, { src: icoSettings, label: 'Settings'  }],
];
const DOCK: IconDef[] = [
  { src: icoPhone,    label: 'Phone'    },
  { src: icoSafari,   label: 'Safari'   },
  { src: icoMessages, label: 'Messages' },
  { src: icoMusic,    label: 'Music'    },
];

// ─── Absolutely-positioned PNG icon ──────────────────────────────────────────
const AbsIcon: React.FC<{ def: IconDef; col: number; top: number }> = ({ def, col, top }) => (
  <div className={styles.absIconWrap} style={{ left: colX(col), top }}>
    <img src={def.src} alt={def.label} className={styles.appIconImg} />
    <div className={styles.iconLabel}>{def.label}</div>
  </div>
);

interface IOSPhoneFrameProps {
  theme: Theme;
  size: WidgetSize;
  kpiDisplayType: KPIDisplayType;
  layout: WidgetLayout;
  state: WidgetState;
  kpiIndex: number;
}

const IOSPhoneFrame: React.FC<IOSPhoneFrameProps> = ({
  theme, size, kpiDisplayType, layout, state, kpiIndex,
}) => {
  const kpi  = MOCK_KPIS[kpiIndex % MOCK_KPIS.length];
  const pos  = IOS_WIDGET_POS[size];
  const useSvg = theme === 'full' && state === 'default';

  // Row y-positions beside the small widget (cols 2+3 only)
  const sideRow0 = WIDGET_TOP;
  const sideRow1 = WIDGET_TOP + CELL_H + ROW_GAP;

  // Rows below the widget (full 4-col rows)
  const belowStart = pos.top + pos.h + 12;
  const MAX_Y      = 500; // search bar starts ~510px; leave 8px breathing room
  const belowRows: number[] = [];
  for (let y = belowStart; y + CELL_H < MAX_Y && belowRows.length < 3; y += CELL_H + ROW_GAP) {
    belowRows.push(y);
  }

  return (
    <div className={styles.iphone}>
      {/* Hardware buttons */}
      <div className={`${styles.btn} ${styles.btnMute}`}    />
      <div className={`${styles.btn} ${styles.btnVolUp}`}   />
      <div className={`${styles.btn} ${styles.btnVolDown}`} />
      <div className={`${styles.btn} ${styles.btnPower}`}   />

      <div className={styles.iphoneScreen}>
        {/* Wallpaper */}
        <img src={wallpaperSrc} alt="" className={styles.iosWallpaper} />

        {/* Dynamic Island */}
        <div className={styles.dynamicIsland} />

        {/* Status bar */}
        <div className={styles.iosStatus}>
          <span className={styles.statusTime}>9:41</span>
          <div className={styles.statusRight}>
            <SignalIcon /><WifiIcon /><BatteryIcon />
          </div>
        </div>

        {/* Widget */}
        <div
          className={styles.widgetOverlay}
          style={{ left: pos.left, top: pos.top, width: pos.w, height: pos.h }}
        >
          {useSvg ? (
            <img
              src={SVG_WIDGET[size]}
              width={pos.w}
              height={pos.h}
              alt="ThoughtSpot widget"
              style={{ display: 'block', borderRadius: size === 'small' ? 16 : 20 }}
            />
          ) : (
            <WidgetShell platform="ios" size={size} theme={theme}>
              <KPIWidget
                kpi={kpi}
                kpiDisplayType={kpiDisplayType}
                layout={layout}
                size={size}
                state={state}
                platform="ios"
              />
            </WidgetShell>
          )}
        </div>

        {/* App label under widget */}
        <div
          className={styles.widgetAppLabel}
          style={{ left: pos.left, top: pos.top + pos.h + 3, width: pos.w }}
        >
          Thoughtspot
        </div>

        {/* Small-size side icons removed — 164px widget fills the full 4-column span */}

        {/* Full rows below the widget */}
        {FULL_ROWS.slice(0, belowRows.length).map((row, ri) =>
          row.map((d, ci) => (
            <AbsIcon key={`${ri}-${d.label}`} def={d} col={ci} top={belowRows[ri]} />
          ))
        )}

        {/* Page dots */}
        <div className={styles.pageDots}>
          <div className={`${styles.dot} ${styles.dotActive}`} />
          <div className={styles.dot} />
        </div>

        {/* Search bar */}
        <div className={styles.searchBar}>
          <SearchIcon />
          <span className={styles.searchText}>Search</span>
        </div>

        {/* Dock */}
        <div className={styles.iosDock}>
          {DOCK.map(d => (
            <img key={d.label} src={d.src} alt={d.label} className={styles.dockIconImg} />
          ))}
        </div>

        <div className={styles.homeIndicator} />
      </div>
    </div>
  );
};

// ─── Status bar SVG icons ─────────────────────────────────────────────────────
const SignalIcon = () => (
  <svg width="17" height="12" viewBox="0 0 17 12">
    {[0, 1, 2, 3].map(i => (
      <rect key={i} x={i * 4.5} y={12 - (i + 1) * 3} width="3" height={(i + 1) * 3} rx="0.8" fill="white" />
    ))}
  </svg>
);
const WifiIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12">
    <circle cx="8" cy="10" r="1.5" fill="white" />
    <path d="M4.5 7.5a5 5 0 017 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M1.5 4.5a9 9 0 0113 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);
const BatteryIcon = () => (
  <svg width="25" height="12" viewBox="0 0 25 12">
    <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="white" strokeWidth="1" />
    <rect x="22" y="3.5" width="2.5" height="5" rx="1.5" fill="white" opacity="0.4" />
    <rect x="2" y="2" width="15" height="8" rx="1.5" fill="white" />
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14">
    <circle cx="5.5" cy="5.5" r="4" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" fill="none" />
    <line x1="8.7" y1="8.7" x2="12.5" y2="12.5" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default IOSPhoneFrame;
