import React from 'react';
import { Theme, WidgetSize, KPIDisplayType, WidgetLayout, WidgetState } from '../../types';
import WidgetShell from '../WidgetShell/WidgetShell';
import KPIWidget from '../KPIWidget/KPIWidget';
import { MOCK_KPIS } from '../../data/mockKPIs';
import styles from './iPadFrame.module.css';

// ─── Layout constants — iPad Pro 12.9" landscape ──────────────────────────────
// Frame: 800×598px  Screen: 764×562px  Bezels: 18px
// Status bar: 28px   Content top: 36px
// Grid: 18px margin · 6 cols × 121px · 5 rows × 87px
// Dock: 72px at screen bottom

const STATUS_H    = 28;
const GRID_ML     = 18;
const COL_W       = 121;
const ROW_H       = 87;
const CONTENT_TOP = STATUS_H + 8;  // 36px from screen top
const WIDGET_POS: Record<WidgetSize, { left: number; top: number; w: number; h: number }> = {
  small:  { left: GRID_ML, top: CONTENT_TOP, w: 120, h: 120 },
  medium: { left: GRID_ML, top: CONTENT_TOP, w: 256, h: 120 },
  large:  { left: GRID_ML, top: CONTENT_TOP, w: 256, h: 269 },
  xlarge: { left: GRID_ML, top: CONTENT_TOP, w: 256, h: 340 },
};

// ─── Compute occupied grid cells ──────────────────────────────────────────────
function occupiedCells(size: WidgetSize): Set<string> {
  const pos = WIDGET_POS[size];
  const wR = pos.left + pos.w;
  const wB = pos.top  + pos.h;
  const set = new Set<string>();
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 6; c++) {
      const cL = GRID_ML + c * COL_W;
      const cT = CONTENT_TOP + r * ROW_H;
      if (cL < wR && cL + COL_W > pos.left && cT < wB && cT + ROW_H > pos.top) {
        set.add(`${r},${c}`);
      }
    }
  }
  return set;
}

// ─── Icon definitions ─────────────────────────────────────────────────────────
interface IconDef { id: string; bg: [string, string]; label: string; dark?: boolean; icon: string }

const GRID_ICONS: IconDef[] = [
  { id: 'facetime',  bg: ['#3FC860', '#25A244'], icon: 'video',     label: 'FaceTime'   },
  { id: 'files',     bg: ['#2A7FFC', '#1A6FEC'], icon: 'folder',    label: 'Files'      },
  { id: 'preview',   bg: ['#E8E8EC', '#D0D0D6'], icon: 'eye',       label: 'Preview',   dark: true },
  { id: 'maps',      bg: ['#4DBCCC', '#3DAABB'], icon: 'mappin',    label: 'Maps'       },
  { id: 'home',      bg: ['#FFB340', '#F09820'], icon: 'house',     label: 'Home',      dark: true },
  { id: 'camera',    bg: ['#1C1C1E', '#2C2C2E'], icon: 'camera',    label: 'Camera'     },
  { id: 'appstore',  bg: ['#007AFF', '#0A84FF'], icon: 'store',     label: 'App Store'  },
  { id: 'books',     bg: ['#FC8A00', '#E87800'], icon: 'book',      label: 'Books'      },
  { id: 'games',     bg: ['#FF3B30', '#E02010'], icon: 'rocket',    label: 'Games'      },
  { id: 'tv',        bg: ['#1C1C1E', '#0C0C0E'], icon: 'tv',        label: 'TV'         },
  { id: 'news',      bg: ['#FF3B30', '#FF453A'], icon: 'news',      label: 'News'       },
  { id: 'settings',  bg: ['#8E8E93', '#636366'], icon: 'gear',      label: 'Settings'   },
  { id: 'clock',     bg: ['#1C1C1E', '#0C0C0E'], icon: 'clock',     label: 'Clock'      },
  { id: 'weather',   bg: ['#2F9BFF', '#1A8AEE'], icon: 'cloud',     label: 'Weather'    },
  { id: 'stocks',    bg: ['#1C1C1E', '#0C0C0E'], icon: 'chart',     label: 'Stocks'     },
  { id: 'findmy',    bg: ['#34C759', '#25A244'], icon: 'location',  label: 'Find My'    },
  { id: 'contacts',  bg: ['#FFB340', '#F09820'], icon: 'person',    label: 'Contacts',  dark: true },
  { id: 'translate', bg: ['#2A7FFC', '#1A6FEC'], icon: 'translate', label: 'Translate'  },
  { id: 'yourapp',   bg: ['#E8E8EC', '#D0D0D6'], icon: 'grid',      label: 'Your App',  dark: true },
];

const DOCK_ICONS: IconDef[] = [
  { id: 'messages', bg: ['#3FC860', '#25A244'], icon: 'bubble',  label: '' },
  { id: 'safari',   bg: ['#007AFF', '#0A84FF'], icon: 'compass', label: '' },
  { id: 'music',    bg: ['#FF3B30', '#FF453A'], icon: 'note',    label: '' },
  { id: 'mail',     bg: ['#007AFF', '#0A84FF'], icon: 'mail',    label: '' },
  { id: 'calendar', bg: ['#FFFFFF', '#F2F2F7'], icon: 'cal',     label: '', dark: true },
  { id: 'photos',   bg: ['#FFFFFF', '#F2F2F7'], icon: 'photos',  label: '', dark: true },
  { id: 'notes',    bg: ['#FFD60A', '#FF9F0A'], icon: 'notepad', label: '', dark: true },
];

interface iPadFrameProps {
  theme: Theme;
  size: WidgetSize;
  kpiDisplayType: KPIDisplayType;
  layout: WidgetLayout;
  state: WidgetState;
  kpiIndex: number;
}

const IPadFrame: React.FC<iPadFrameProps> = ({ theme, size, kpiDisplayType, layout, state, kpiIndex }) => {
  const kpi = MOCK_KPIS[kpiIndex % MOCK_KPIS.length];
  const pos = WIDGET_POS[size];
  const occupied = occupiedCells(size);

  // Assign icons to free grid cells in reading order
  const iconPlacements: Array<{ def: IconDef; x: number; y: number }> = [];
  let idx = 0;
  for (let r = 0; r < 5 && idx < GRID_ICONS.length; r++) {
    for (let c = 0; c < 6 && idx < GRID_ICONS.length; c++) {
      if (!occupied.has(`${r},${c}`)) {
        const cellX = GRID_ML + c * COL_W;
        const cellY = CONTENT_TOP + r * ROW_H;
        iconPlacements.push({ def: GRID_ICONS[idx], x: cellX, y: cellY });
        idx++;
      }
    }
  }

  return (
    <div className={styles.ipad}>
      {/* Hardware buttons */}
      <div className={`${styles.btn} ${styles.btnPower}`} />
      <div className={`${styles.btn} ${styles.btnVolUp}`} />
      <div className={`${styles.btn} ${styles.btnVolDown}`} />

      <div className={styles.ipadScreen}>
        {/* Wallpaper */}
        <div className={styles.ipadWallpaper} />

        {/* Status bar */}
        <div className={styles.ipadStatus}>
          <span className={styles.ipadStatusTime}>9:41  Tue Apr 1</span>
          <div className={styles.statusIcons}>
            <SignalIcon /><WifiIcon /><span className={styles.battPct}>100%</span><BatteryIcon />
          </div>
        </div>

        {/* Widget */}
        <div className={styles.widgetOverlay} style={{ left: pos.left, top: pos.top }}>
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
        </div>

        {/* Widget app label */}
        <div
          className={styles.widgetLabel}
          style={{ left: pos.left, top: pos.top + pos.h + 3, width: pos.w }}
        >
          ThoughtSpot
        </div>

        {/* App icon grid */}
        {iconPlacements.map(({ def, x, y }) => (
          <AppIcon key={def.id} def={def} x={x} y={y} />
        ))}

        {/* Page dots */}
        <div className={styles.pageDots}>
          <div className={`${styles.dot} ${styles.dotActive}`} />
          <div className={styles.dot} />
        </div>

        {/* Dock */}
        <div className={styles.ipadDock}>
          {DOCK_ICONS.map(d => <DockIcon key={d.id} def={d} />)}
          <div className={styles.dockSep} />
          <DockIcon def={{ id: 'appstore2', bg: ['#007AFF', '#0A84FF'], icon: 'store', label: '' }} />
          <DockIcon def={{ id: 'news2',    bg: ['#FF3B30', '#FF453A'], icon: 'news',  label: '' }} />
        </div>

        <div className={styles.homeIndicator} />
      </div>
    </div>
  );
};

// ─── App icon ─────────────────────────────────────────────────────────────────
const AppIcon: React.FC<{ def: IconDef; x: number; y: number }> = ({ def, x, y }) => (
  <div className={styles.appIconWrap} style={{ left: x, top: y }}>
    <div
      className={styles.appIcon}
      style={{ background: `linear-gradient(145deg, ${def.bg[0]}, ${def.bg[1]})` }}
    >
      <IpadIconShape type={def.icon} dark={!def.dark} />
    </div>
    <div className={styles.iconLabel}>{def.label}</div>
  </div>
);

const DockIcon: React.FC<{ def: IconDef }> = ({ def }) => (
  <div
    className={styles.dockIcon}
    style={{ background: `linear-gradient(145deg, ${def.bg[0]}, ${def.bg[1]})` }}
  >
    <IpadIconShape type={def.icon} dark={!def.dark} />
  </div>
);

// ─── Icon shapes ──────────────────────────────────────────────────────────────
const IpadIconShape: React.FC<{ type: string; dark?: boolean }> = ({ type, dark }) => {
  const c = dark ? '#fff' : '#1C1C1E';
  const op = dark ? 0.92 : 0.85;
  switch (type) {
    case 'video': return (
      <svg width="28" height="22" viewBox="0 0 28 22">
        <rect x="1" y="1" width="17" height="20" rx="3.5" fill={c} opacity={op}/>
        <polygon points="19,6 27,3 27,19 19,16" fill={c} opacity={op}/>
      </svg>
    );
    case 'folder': return (
      <svg width="28" height="24" viewBox="0 0 28 24">
        <path d="M2 6h8l3 3h13v13a2 2 0 01-2 2H2a2 2 0 01-2-2V8a2 2 0 012-2z" fill={c} opacity={op}/>
      </svg>
    );
    case 'eye': return (
      <svg width="28" height="20" viewBox="0 0 28 20">
        <path d="M14 2C7 2 1 10 1 10s6 8 13 8 13-8 13-8S21 2 14 2z" stroke={c} strokeWidth="1.5" fill="none" opacity={op}/>
        <circle cx="14" cy="10" r="3.5" fill={c} opacity={op}/>
      </svg>
    );
    case 'mappin': return (
      <svg width="22" height="28" viewBox="0 0 22 28">
        <path d="M11 1C6.03 1 2 5.03 2 10c0 6.5 9 17 9 17s9-10.5 9-17c0-4.97-4.03-9-9-9z" fill={c} opacity={op}/>
        <circle cx="11" cy="10" r="3.5" fill={`rgba(${dark?'0,0,0':'255,255,255'},0.35)`}/>
      </svg>
    );
    case 'house': return (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <path d="M13 2L1 12h4v12h6v-7h4v7h6V12h4L13 2z" fill={c} opacity={op}/>
      </svg>
    );
    case 'camera': return (
      <svg width="28" height="22" viewBox="0 0 28 22">
        <rect x="1" y="4" width="26" height="17" rx="3" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <rect x="9" y="1" width="10" height="5" rx="1.5" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <circle cx="14" cy="12" r="4.5" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <circle cx="14" cy="12" r="2" fill={c} opacity="0.5"/>
      </svg>
    );
    case 'store': return (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <path d="M13 2L3 6v14l10 4 10-4V6L13 2z" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <path d="M9 13l3 3 5-6" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity={op}/>
      </svg>
    );
    case 'book': return (
      <svg width="24" height="26" viewBox="0 0 24 26">
        <rect x="1" y="2" width="22" height="22" rx="2.5" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <line x1="12" y1="2" x2="12" y2="24" stroke={c} strokeWidth="1.4" opacity={op}/>
        <path d="M2 6h9M2 10h9M2 14h9" stroke={c} strokeWidth="1" opacity="0.5"/>
      </svg>
    );
    case 'rocket': return (
      <svg width="22" height="28" viewBox="0 0 22 28">
        <path d="M11 1C11 1 18 6 18 14H4C4 6 11 1 11 1z" fill={c} opacity={op}/>
        <rect x="5" y="14" width="12" height="8" rx="2" fill={c} opacity={op}/>
        <path d="M5 18L1 24h5M17 18l4 6h-5" fill={c} opacity="0.65"/>
        <circle cx="11" cy="10" r="2.5" fill={`rgba(${dark?'0,0,0':'255,255,255'},0.35)`}/>
      </svg>
    );
    case 'tv': return (
      <svg width="28" height="24" viewBox="0 0 28 24">
        <rect x="1" y="2" width="26" height="18" rx="3" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <line x1="9" y1="22" x2="19" y2="22" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity={op}/>
        <path d="M7 11h14M11 7h6" stroke={c} strokeWidth="1.4" strokeLinecap="round" opacity="0.55"/>
      </svg>
    );
    case 'news': return (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <text x="13" y="20" textAnchor="middle" fill={c} fontSize="20" fontWeight="800" opacity={op}>N</text>
      </svg>
    );
    case 'gear': return (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <circle cx="13" cy="13" r="5" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <path d="M13 2v3M13 21v3M2 13h3M21 13h3M4.9 4.9l2.1 2.1M19 19l2.1 2.1M4.9 21.1l2.1-2.1M19 7l2.1-2.1" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity={op}/>
      </svg>
    );
    case 'clock': return (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <circle cx="13" cy="13" r="11" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <path d="M13 6v7l5 3" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={op}/>
      </svg>
    );
    case 'cloud': return (
      <svg width="28" height="20" viewBox="0 0 28 20">
        <circle cx="10" cy="13" r="6.5" fill={c} opacity={op}/>
        <circle cx="18" cy="13" r="5" fill={c} opacity={op}/>
        <rect x="4" y="13" width="20" height="7" fill={c} opacity={op}/>
        <circle cx="20" cy="7" r="4.5" fill="#FFD60A"/>
      </svg>
    );
    case 'chart': return (
      <svg width="26" height="22" viewBox="0 0 26 22">
        <polyline points="2,18 7,10 12,14 17,6 24,8" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity={op}/>
        <line x1="2" y1="20" x2="24" y2="20" stroke={c} strokeWidth="1.2" opacity="0.5"/>
      </svg>
    );
    case 'location': return (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <circle cx="12" cy="12" r="3.5" fill={c} opacity={op}/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke={c} strokeWidth="1.4" strokeLinecap="round" opacity="0.55"/>
      </svg>
    );
    case 'person': return (
      <svg width="22" height="26" viewBox="0 0 22 26">
        <circle cx="11" cy="8" r="5.5" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <path d="M1 25c0-5.52 4.48-10 10-10s10 4.48 10 10" stroke={c} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity={op}/>
      </svg>
    );
    case 'translate': return (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <path d="M3 8h9M7 4v4M3 8c0 4 3 7 6 8" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={op}/>
        <path d="M14 16l3-8 3 8M15.5 13h3" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={op}/>
        <line x1="13" y1="4" x2="23" y2="22" stroke={c} strokeWidth="1" opacity="0.3"/>
      </svg>
    );
    case 'grid': return (
      <svg width="24" height="24" viewBox="0 0 24 24">
        {[0,1,2].map(ri => [0,1,2].map(ci => (
          <rect key={`${ri}${ci}`} x={2+ci*8} y={2+ri*8} width="6" height="6" rx="1.5" fill={ci===1&&ri===1?'rgba(0,0,0,0.2)':c} opacity={op}/>
        )))}
      </svg>
    );
    case 'bubble': return (
      <svg width="26" height="24" viewBox="0 0 26 24">
        <path d="M2 3h22a2 2 0 012 2v12a2 2 0 01-2 2H8l-6 4V5a2 2 0 012-2z" fill={c} opacity={op}/>
      </svg>
    );
    case 'compass': return (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <circle cx="13" cy="13" r="11" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <polygon points="13,5 16,13 13,11 10,13" fill="#FF3B30"/>
        <polygon points="13,21 16,13 13,15 10,13" fill={c} opacity={op}/>
      </svg>
    );
    case 'note': return (
      <svg width="22" height="28" viewBox="0 0 22 28">
        <ellipse cx="8" cy="21" rx="6.5" ry="5.5" stroke={c} strokeWidth="1.5" fill="none" opacity={op}/>
        <line x1="14.5" y1="21" x2="14.5" y2="5" stroke={c} strokeWidth="2" strokeLinecap="round" opacity={op}/>
        <line x1="14.5" y1="5" x2="20" y2="8" stroke={c} strokeWidth="2" strokeLinecap="round" opacity={op}/>
      </svg>
    );
    case 'mail': return (
      <svg width="26" height="20" viewBox="0 0 26 20">
        <rect x="1" y="2" width="24" height="16" rx="2.5" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <path d="M1 4l12 9 12-9" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
      </svg>
    );
    case 'cal': return (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <rect x="1" y="4" width="24" height="21" rx="3" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <line x1="1" y1="10" x2="25" y2="10" stroke={c} strokeWidth="1.2" opacity="0.5"/>
        <text x="13" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FF3B30">1</text>
        <line x1="8" y1="1" x2="8" y2="7" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity={op}/>
        <line x1="18" y1="1" x2="18" y2="7" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity={op}/>
      </svg>
    );
    case 'photos': return (
      <svg width="26" height="26" viewBox="0 0 26 26">
        {[
          ['#FF3B30',0,0], ['#FF9500',45,0], ['#34C759',90,0],
          ['#007AFF',135,0],['#5856D6',180,0],['#FF2D55',225,0],
          ['#AF52DE',270,0],['#30B0C7',315,0],
        ].map(([color, angle]) => (
          <path
            key={String(angle)}
            d={`M13 13 L13 4`}
            stroke={String(color)}
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${angle} 13 13)`}
            opacity="0.88"
          />
        ))}
        <circle cx="13" cy="13" r="3" fill="white"/>
      </svg>
    );
    case 'notepad': return (
      <svg width="22" height="26" viewBox="0 0 22 26">
        <rect x="1" y="4" width="20" height="21" rx="2.5" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
        <rect x="7" y="1" width="8" height="5" rx="1.5" fill={c} opacity="0.55"/>
        {[10, 15, 20].map(y => (
          <line key={y} x1="4.5" y1={y} x2="17.5" y2={y} stroke={c} strokeWidth="1.2" opacity="0.45"/>
        ))}
      </svg>
    );
    default: return (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke={c} strokeWidth="1.4" fill="none" opacity={op}/>
      </svg>
    );
  }
};

// ─── Status bar icons ─────────────────────────────────────────────────────────
const SignalIcon = () => (
  <svg width="17" height="12" viewBox="0 0 17 12">
    {[0,1,2,3].map(i => (
      <rect key={i} x={i*4.5} y={12-(i+1)*3} width="3" height={(i+1)*3} rx="0.8" fill="white"/>
    ))}
  </svg>
);
const WifiIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12">
    <circle cx="8" cy="10" r="1.5" fill="white"/>
    <path d="M4.5 7.5a5 5 0 017 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M1.5 4.5a9 9 0 0113 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);
const BatteryIcon = () => (
  <svg width="25" height="12" viewBox="0 0 25 12">
    <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="white" strokeWidth="1"/>
    <rect x="22" y="3.5" width="2.5" height="5" rx="1.5" fill="white" opacity="0.4"/>
    <rect x="2" y="2" width="15" height="8" rx="1.5" fill="white"/>
  </svg>
);

export default IPadFrame;
