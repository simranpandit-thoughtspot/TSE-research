import React, { useState } from 'react';
import WidgetShell from '../WidgetShell/WidgetShell';
import KPIWidget from '../KPIWidget/KPIWidget';
import IOSPhoneFrame from '../PhoneFrame/iOSPhoneFrame';
import AndroidPhoneFrame from '../PhoneFrame/AndroidPhoneFrame';
import { MOCK_KPIS } from '../../data/mockKPIs';
import {
  IOS_WIDGET_SIZES, ANDROID_WIDGET_SIZES,
  IOS_CORNER, ANDROID_CORNER,
  IOS_PADDING, ANDROID_PADDING,
  IOS_TYPE, ANDROID_TYPE,
} from '../../constants/widgetSpecs';
import type { WidgetSize, WidgetState } from '../../types';
import widgetSmallUrl  from '../../assets/widget-small.svg?url';
import widgetMediumUrl from '../../assets/widget-medium.svg?url';
import widgetLargeUrl  from '../../assets/widget-large.svg?url';
import widgetXlargeUrl from '../../assets/widget-xlarge.svg?url';
import smallDefaultUrl from '../../assets/small-default.svg?url';
import smallLoadingUrl from '../../assets/small-loading.svg?url';
import smallEmptyUrl   from '../../assets/small-empty.svg?url';
import styles from './DocsPage.module.css';

// ─── Constants ────────────────────────────────────────────────────────────────

type Plat = 'ios' | 'android';

const SIZES: WidgetSize[]  = ['small', 'medium', 'large', 'xlarge'];
const STATES: WidgetState[] = ['default', 'loading', 'error', 'empty'];

const STATE_LABEL: Record<WidgetState, string> = {
  default: 'Default', loading: 'Loading', error: 'Error', empty: 'Empty',
};

const STATIC_SVG: Record<WidgetSize, string> = {
  small: widgetSmallUrl, medium: widgetMediumUrl,
  large: widgetLargeUrl, xlarge: widgetXlargeUrl,
};

const SMALL_STATE_SVG: Partial<Record<WidgetState, string>> = {
  default: smallDefaultUrl,
  loading: smallLoadingUrl,
  empty:   smallEmptyUrl,
};

const ORANGE = '#FF6B2B';
const PURPLE = '#7B6BFF';
const YELLOW = '#F5C218';
const OO = 48;
const HDR_H = 22;
const DIV_H = 1;
const IOS_ROW_H = 34;
const DROID_ROW_H = 30;

// ─── Annotation helpers ───────────────────────────────────────────────────────

function pill(x: number, y: number, label: string, anchor: 'l' | 'r' | 'c') {
  const tw = Math.max(34, label.length * 6.5 + 14);
  const ph = 20;
  const px = anchor === 'r' ? x - tw : anchor === 'c' ? x - tw / 2 : x;
  return (
    <g>
      <rect x={px} y={y - ph / 2} width={tw} height={ph} rx={5} fill={ORANGE} />
      <text x={px + tw / 2} y={y + 4.5} textAnchor="middle" fontSize={10.5} fontWeight="700"
        fill="white" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
        {label}
      </text>
    </g>
  );
}

function co(cx: number, cy: number, lx: number, ly: number, label: string, anchor: 'l' | 'r') {
  return (
    <g>
      <circle cx={cx} cy={cy} r={4} fill={ORANGE} />
      <line x1={cx} y1={cy} x2={lx} y2={ly} stroke={ORANGE} strokeWidth={1.2}
        strokeDasharray="4 3" opacity={0.9} />
      {pill(lx, ly, label, anchor)}
    </g>
  );
}

function dimLabel(x: number, y: number, label: string, rotate?: number) {
  const tw = Math.max(34, label.length * 6.5 + 14);
  return (
    <g transform={rotate != null ? `rotate(${rotate} ${x} ${y})` : undefined}>
      <rect x={x - tw / 2} y={y - 7} width={tw} height={14} rx={2.5} fill="white" stroke={ORANGE} strokeWidth={1} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize={9.5} fontWeight="700" fill={ORANGE}
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">{label}</text>
    </g>
  );
}

function brk(x: number, y1: number, y2: number, label: string) {
  const midY = (y1 + y2) / 2;
  const T = 7;
  return (
    <g>
      <line x1={x} y1={y1} x2={x + T} y2={y1} stroke={ORANGE} strokeWidth={1.5} />
      <line x1={x + T / 2} y1={y1} x2={x + T / 2} y2={y2} stroke={ORANGE} strokeWidth={1.2} />
      <line x1={x} y1={y2} x2={x + T} y2={y2} stroke={ORANGE} strokeWidth={1.5} />
      {pill(x + T + 4, midY, label, 'l')}
    </g>
  );
}

// ─── Figma-redline band helpers (used for small iOS spacing tab) ──────────────

function hBand(y1: number, y2: number, color: string, svgW: number) {
  return (
    <g>
      <rect x={0} y={y1} width={svgW} height={Math.max(1, y2 - y1)} fill={color} fillOpacity={0.15} />
      <line x1={0} y1={y1} x2={svgW} y2={y1}
        stroke={color} strokeWidth={1.2} strokeDasharray="6 3" />
      <line x1={0} y1={y2} x2={svgW} y2={y2}
        stroke={color} strokeWidth={1.2} strokeDasharray="6 3" />
    </g>
  );
}

function measure(y1: number, y2: number, label: string, color: string, svgW: number, textOffset = 0) {
  const midY = (y1 + y2) / 2 + textOffset;
  const ix = svgW - 18;
  const TW = 8;
  return (
    <g>
      <line x1={ix - TW/2} y1={y1} x2={ix + TW/2} y2={y1} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={ix} y1={y1} x2={ix} y2={y2} stroke={color} strokeWidth={1.5} />
      <line x1={ix - TW/2} y1={y2} x2={ix + TW/2} y2={y2} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <text x={ix + TW/2 + 5} y={midY + 5}
        fontSize={15} fontWeight="700" fill={color}
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
        {label}
      </text>
    </g>
  );
}

function vGrid(x: number, svgH: number, color: string) {
  return (
    <line x1={x} y1={0} x2={x} y2={svgH}
      stroke={color} strokeWidth={1} strokeDasharray="5 3" opacity={0.5} />
  );
}

// ─── Annotation SVG ───────────────────────────────────────────────────────────

type AnnotTab = 'size' | 'corner' | 'spacing' | 'fonts';

function weightLabel(w: string): string {
  const n = parseInt(w);
  if (n <= 400) return 'Reg';
  if (n === 500) return 'Med';
  if (n === 600) return 'Semibold';
  if (n === 700) return 'Bold';
  return 'ExtraBold';
}

interface AnnSVGProps {
  platform: Plat;
  size: WidgetSize;
  uid: string;
  alwaysShow?: boolean;
  annotTab?: AnnotTab;
}

const AnnotationSVG: React.FC<AnnSVGProps> = ({ platform, size, uid, alwaysShow, annotTab }) => {
  const isIOS = platform === 'ios';
  const wSpec = isIOS ? IOS_WIDGET_SIZES[size] : ANDROID_WIDGET_SIZES[size];
  const pad   = isIOS ? IOS_PADDING   : ANDROID_PADDING;
  const cr    = (isIOS ? IOS_CORNER : ANDROID_CORNER).outer;
  const type  = isIOS ? IOS_TYPE : ANDROID_TYPE;

  const w = wSpec.widthPx;
  const h = wSpec.heightPx;
  const svgW = w + OO * 2;
  const svgH = h + OO * 2;
  const wx = OO;
  const wy = OO;
  const isSmall = size === 'small';
  const rowH = isIOS ? IOS_ROW_H : DROID_ROW_H;
  const mid = `ann${uid}`;
  const R = svgW - 8;

  // Row geometry (watchlist)
  const rowStartY = wy + pad + HDR_H + DIV_H;
  const nameY     = rowStartY + rowH * 0.28;
  const periodY   = rowStartY + rowH * 0.68;
  const valueY    = rowStartY + rowH * 0.28;
  const trendY    = rowStartY + rowH * 0.68;

  const fontName = isIOS ? 'SF Pro' : 'Google Sans';
  const iosType  = type as typeof IOS_TYPE;

  const showSize    = !annotTab || annotTab === 'size';
  const showCorner  = !annotTab || annotTab === 'corner';
  const showSpacing = !annotTab || annotTab === 'spacing';
  const showFonts   = !annotTab || annotTab === 'fonts';

  return (
    <svg
      width={svgW} height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      overflow="visible"
      className={alwaysShow ? styles.annotSvgAlways : styles.annotSvg}
      style={{ position: 'absolute', left: -OO, top: -OO, pointerEvents: 'none' }}
    >
      <defs>
        <marker id={`${mid}s`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M7 1 L1 4 L7 7" fill="none" stroke={ORANGE} strokeWidth="1.2" />
        </marker>
        <marker id={`${mid}e`} markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto">
          <path d="M1 1 L7 4 L1 7" fill="none" stroke={ORANGE} strokeWidth="1.2" />
        </marker>
      </defs>

      {/* ── Size ── */}
      {showSize && (
        <g>
          {/* Width */}
          <line x1={wx} y1={wy+h+20} x2={wx+w} y2={wy+h+20} stroke={ORANGE} strokeWidth={1}
            markerStart={`url(#${mid}s)`} markerEnd={`url(#${mid}e)`} />
          {dimLabel(wx + w/2, wy+h+20, `${w}px`)}
          {/* Height */}
          <line x1={wx+w+20} y1={wy} x2={wx+w+20} y2={wy+h} stroke={ORANGE} strokeWidth={1}
            markerStart={`url(#${mid}s)`} markerEnd={`url(#${mid}e)`} />
          {dimLabel(wx+w+20, wy + h/2, `${h}px`, -90)}
        </g>
      )}

      {/* ── Padding & spacing ── */}
      {showSpacing && (
        isSmall && isIOS ? (
          // Small iOS: Figma-redline band style.
          // Geometry (164×164): Block1 y=19–70, divider y=81, Block2 y=94–145, margin ~16px.
          <g>
            {/* ── Vertical column grid lines ── */}
            {vGrid(wx,       svgH, PURPLE)}
            {vGrid(wx+16,    svgH, PURPLE)}
            {vGrid(wx+w-16,  svgH, PURPLE)}
            {vGrid(wx+w,     svgH, PURPLE)}

            {/* ── Content boundary ── */}
            <rect x={wx+16} y={wy+16} width={w-32} height={h-32}
              fill="none" stroke={PURPLE} strokeWidth={1}
              strokeDasharray="5 3" rx={Math.max(1, cr-16)} opacity={0.7} />

            {/* ── Horizontal spacing bands (full SVG width) ── */}
            {hBand(wy,       wy+19,   PURPLE, svgW)}
            {hBand(wy+46,    wy+50,   YELLOW, svgW)}
            {hBand(wy+73,    wy+81,   ORANGE, svgW)}
            {hBand(wy+81,    wy+89,   ORANGE, svgW)}
            {hBand(wy+121,   wy+125,  YELLOW, svgW)}
            {hBand(wy+h-19,  wy+h,    PURPLE, svgW)}

            {/* ── I-beam measurements (right side, labels overflow via SVG overflow="visible") ── */}
            {measure(wy,       wy+19,   '16 px', PURPLE, svgW)}
            {measure(wy+46,    wy+50,   '4 px',  YELLOW, svgW)}
            {measure(wy+73,    wy+81,   '8 px',  ORANGE, svgW, -8)}
            {measure(wy+81,    wy+89,   '8 px',  ORANGE, svgW, +8)}
            {measure(wy+121,   wy+125,  '4 px',  YELLOW, svgW)}
            {measure(wy+h-19,  wy+h,    '16',    PURPLE, svgW)}
          </g>
        ) : (
          <g>
            {/* Content area guide */}
            <rect x={wx+pad} y={wy+pad} width={w-pad*2} height={h-pad*2}
              fill="rgba(255,107,43,0.05)" stroke={ORANGE} strokeWidth={0.8}
              strokeDasharray="3 2.5" rx={Math.max(1, cr-pad)} />
            {/* Edge padding callouts */}
            {co(wx + w*0.5, wy + pad/2,       R,  wy - 10,      `${pad}px`, 'r')}
            {co(wx + w*0.5, wy + h - pad/2,   R,  wy + h + 12,  `${pad}px`, 'r')}
            {co(wx + pad/2, wy + h*0.65,       8,  wy + h*0.7,   `${pad}px`, 'l')}
            {co(wx+w-pad/2, wy + h*0.35,       R,  wy + h*0.3,   `${pad}px`, 'r')}
            {/* Row gap annotations (non-small) */}
            {!isSmall && (
              <g>
                {brk(wx+w+4, wy+pad,                    wy+pad+HDR_H,            `${HDR_H}px`)}
                {brk(wx+w+4, wy+pad+HDR_H+DIV_H,        rowStartY+rowH*0.3,      '4px')}
                {brk(wx+w+4, rowStartY+rowH*0.35,        rowStartY+rowH*0.65,     '4px')}
              </g>
            )}
          </g>
        )
      )}

      {/* ── Corner radius ── */}
      {showCorner && (
        <g>
          {/* Top-left */}
          <path d={`M ${wx+cr} ${wy} A ${cr} ${cr} 0 0 0 ${wx} ${wy+cr}`}
            fill="none" stroke={ORANGE} strokeWidth={1.5} />
          <line x1={wx} y1={wy+cr} x2={wx+cr} y2={wy+cr} stroke={ORANGE} strokeWidth={0.7} strokeDasharray="2 2" opacity={0.5} />
          <line x1={wx+cr} y1={wy} x2={wx+cr} y2={wy+cr} stroke={ORANGE} strokeWidth={0.7} strokeDasharray="2 2" opacity={0.5} />
          {pill(wx - 4, wy - 12, `${cr}px`, 'r')}
          {/* Top-right */}
          <path d={`M ${wx+w-cr} ${wy} A ${cr} ${cr} 0 0 1 ${wx+w} ${wy+cr}`}
            fill="none" stroke={ORANGE} strokeWidth={1.5} />
          {pill(wx+w + 4, wy - 12, `${cr}px`, 'l')}
          {/* Bottom-right */}
          <path d={`M ${wx+w} ${wy+h-cr} A ${cr} ${cr} 0 0 1 ${wx+w-cr} ${wy+h}`}
            fill="none" stroke={ORANGE} strokeWidth={1.5} />
          {pill(wx+w + 4, wy+h + 12, `${cr}px`, 'l')}
          {/* Bottom-left */}
          <path d={`M ${wx} ${wy+h-cr} A ${cr} ${cr} 0 0 0 ${wx+cr} ${wy+h}`}
            fill="none" stroke={ORANGE} strokeWidth={1.5} />
          {pill(wx - 4, wy+h + 12, `${cr}px`, 'r')}
        </g>
      )}

      {/* ── Fonts ── */}
      {showFonts && (
        <g>
          {isSmall ? (
            // Small iOS: 164×164. Block1 (title+WoW) y≈19–70, Block2 (value+trend) y≈94–145.
            // Labels placed outside widget bounds: Lx=wx-8 (anchor r), Rx=wx+w+8 (anchor l).
            (() => {
              const Lx = wx - 8;
              const Rx = wx + w + 8;
              return (
                <g>
                  {/* Title — exits right */}
                  {co(wx+w*0.5,  wy+30, Rx, wy+14, `Reg | ${parseInt(type.watchlistRow.size)}px`, 'l')}
                  {/* WoW / MoM — exits left */}
                  {co(wx+pad+10, wy+55, Lx, wy+50, `Reg | ${parseInt((iosType.watchlistPeriod ?? type.watchlistTrend).size)}px`, 'r')}
                  {/* Value — exits left */}
                  {co(wx+pad+10, wy+119, Lx, wy+133, `${weightLabel(type.watchlistValue.weight)} | ${parseInt(type.watchlistValue.size)}px`, 'r')}
                  {/* Change % — exits right */}
                  {co(wx+w*0.72, wy+119, Rx, wy+133, `Reg | ${parseInt(type.watchlistTrend.size)}px`, 'l')}
                </g>
              );
            })()
          ) : (
            <g>
              {/* name */}
              {co(wx+pad+30,       nameY,    R,  nameY - 4,  `Reg | ${parseInt(type.watchlistRow.size)}px`,    'r')}
              {/* period */}
              {co(wx+pad+14,       periodY,  8,  periodY + 4, `Reg | ${parseInt((iosType.watchlistPeriod ?? type.watchlistTrend).size)}px`, 'l')}
              {/* value */}
              {co(wx+w-pad-34,     valueY,   8,  valueY + 16, `${weightLabel(type.watchlistValue.weight)} | ${parseInt(type.watchlistValue.size)}px`, 'l')}
              {/* trend */}
              {co(wx+w-pad-14,     trendY,   R,  trendY + 18, `Reg | ${parseInt(type.watchlistTrend.size)}px`, 'r')}
            </g>
          )}
          {/* Global typeface note */}
          <text
            x={wx + w / 2} y={wy + h + OO - 6}
            textAnchor="middle" fontSize={9} fontWeight="500"
            fill="rgba(0,0,0,0.38)"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          >
            Typeface: {fontName}
          </text>
        </g>
      )}
    </svg>
  );
};

// ─── Widget renderer ──────────────────────────────────────────────────────────

interface WidgetPreviewProps {
  platform: Plat;
  size: WidgetSize;
  state: WidgetState;
  isDark: boolean;
  useStaticForDefault?: boolean;
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({ platform, size, state, isDark, useStaticForDefault }) => {
  const isIOS = platform === 'ios';
  const wSpec = isIOS ? IOS_WIDGET_SIZES[size] : ANDROID_WIDGET_SIZES[size];
  const theme = isIOS ? (isDark ? 'dark' : 'full') : (isDark ? 'dark' : 'light');

  if (isIOS && size === 'small' && !isDark && SMALL_STATE_SVG[state]) {
    return (
      <img
        src={SMALL_STATE_SVG[state]!}
        width={wSpec.widthPx}
        height={wSpec.heightPx}
        alt={`${size} ${state} widget`}
        style={{ display: 'block', borderRadius: 20 }}
      />
    );
  }

  if (isIOS && state === 'default' && useStaticForDefault && !isDark) {
    return (
      <img
        src={STATIC_SVG[size]}
        width={wSpec.widthPx}
        height={wSpec.heightPx}
        alt={`${size} widget`}
        style={{ display: 'block', borderRadius: 24 }}
      />
    );
  }

  return (
    <WidgetShell platform={platform} size={size} theme={theme}>
      <KPIWidget
        kpi={MOCK_KPIS[0]}
        kpiDisplayType="full"
        layout="list"
        size={size}
        state={state}
        platform={platform}
      />
    </WidgetShell>
  );
};

// ─── Gallery card ─────────────────────────────────────────────────────────────

interface CardProps {
  platform: Plat;
  size: WidgetSize;
  state: WidgetState;
  isDark: boolean;
  onClick: () => void;
}

const StateCard: React.FC<CardProps> = ({ platform, size, state, isDark, onClick }) => (
  <div
    className={`${styles.stateCard} ${isDark ? styles.stateCardDark : ''}`}
    onClick={onClick} role="button" tabIndex={0}
    onKeyDown={e => e.key === 'Enter' && onClick()}
  >
    <div className={`${styles.cardState} ${isDark ? styles.cardStateDark : ''}`}>{STATE_LABEL[state]}</div>
    <div className={styles.cardPreview}>
      <WidgetPreview platform={platform} size={size} state={state} isDark={isDark} useStaticForDefault />
    </div>
  </div>
);

// ─── Size section ─────────────────────────────────────────────────────────────

interface SectionProps {
  platform: Plat;
  size: WidgetSize;
  isDark: boolean;
  onCard: (size: WidgetSize, state: WidgetState) => void;
}

const SizeSection: React.FC<SectionProps> = ({ platform, size, isDark, onCard }) => {
  const isIOS   = platform === 'ios';
  const iosSpec = IOS_WIDGET_SIZES[size];
  const dSpec   = ANDROID_WIDGET_SIZES[size];

  const label = isIOS
    ? `${iosSpec.label} · ${iosSpec.ptLabel}`
    : `${dSpec.dpLabel.replace(' grid', '')} · ${dSpec.widthDp}×${dSpec.heightDp}dp`;

  const note = isIOS ? iosSpec.note : dSpec.note;

  return (
    <section className={`${styles.sizeSection} ${isDark ? styles.sizeSectionDark : ''}`}>
      <div className={styles.sectionHead}>
        <span className={`${styles.sectionLabel} ${isDark ? styles.sectionLabelDark : ''}`}>{label}</span>
        <span className={`${styles.sectionNote} ${isDark ? styles.sectionNoteDark : ''}`}>{note}</span>
      </div>
      <div className={styles.cardRow}>
        {STATES.map(st => (
          <StateCard
            key={st}
            platform={platform}
            size={size}
            state={st}
            isDark={isDark}
            onClick={() => onCard(size, st)}
          />
        ))}
      </div>
    </section>
  );
};

// ─── Detail view ─────────────────────────────────────────────────────────────

interface DetailProps {
  platform: Plat;
  size: WidgetSize;
  state: WidgetState;
  isDark: boolean;
  onBack: () => void;
}

const ANNOT_TABS: { id: AnnotTab; label: string }[] = [
  { id: 'size',    label: 'Size'              },
  { id: 'corner',  label: 'Corner radius'     },
  { id: 'spacing', label: 'Padding & spacing' },
  { id: 'fonts',   label: 'Fonts'             },
];

const DetailView: React.FC<DetailProps> = ({ platform, size, state, isDark, onBack }) => {
  const [annotTab, setAnnotTab] = useState<AnnotTab>('size');

  const isIOS   = platform === 'ios';
  const iosSpec = IOS_WIDGET_SIZES[size];
  const dSpec   = ANDROID_WIDGET_SIZES[size];
  const wSpec   = isIOS ? iosSpec : dSpec;

  const sizeLabel = isIOS
    ? `${iosSpec.label} — ${iosSpec.ptLabel}`
    : `${dSpec.dpLabel.replace(' grid', '')} — ${dSpec.widthDp}×${dSpec.heightDp}dp`;

  const uid = `d${platform[0]}${size[0]}${annotTab}`;
  const iosTheme  = isDark ? 'dark' : 'full';
  const droidTheme = isDark ? 'dark' : 'light';

  return (
    <div className={`${styles.detail} ${isDark ? styles.detailDark : ''}`}>
      {/* Back */}
      <button className={`${styles.backBtn} ${isDark ? styles.backBtnDark : ''}`} onClick={onBack} aria-label="Back to gallery">
        ← Back
      </button>

      {/* ── Hero preview ── */}
      <div className={`${styles.heroCard} ${isDark ? styles.heroCardDark : ''}`}>
        <WidgetPreview platform={platform} size={size} state={state} isDark={isDark} useStaticForDefault />
      </div>

      {/* ── Title ── */}
      <div className={styles.detailMeta}>
        <h2 className={`${styles.detailTitle} ${isDark ? styles.detailTitleDark : ''}`}>{sizeLabel}</h2>
        <div className={styles.detailBadges}>
          <span className={`${styles.badge} ${isDark ? styles.badgeDark : ''}`}>{STATE_LABEL[state]}</span>
          <span className={`${styles.badge} ${isDark ? styles.badgeDark : ''}`}>{isIOS ? 'iOS WidgetKit' : 'Android App Widget'}</span>
        </div>
        <p className={`${styles.detailDesc} ${isDark ? styles.detailDescDark : ''}`}>
          ThoughtSpot KPI {isIOS ? 'iOS WidgetKit' : 'Android App Widget'} · {isIOS ? iosSpec.note : dSpec.note}
        </p>
      </div>

      {/* ── Spec annotations ── */}
      <div className={`${styles.annotSection} ${isDark ? styles.annotSectionDark : ''}`}>
        <div className={styles.annotHeader}>
          <div>
            <h3 className={`${styles.sectionTitle} ${isDark ? styles.sectionTitleDark : ''}`}>Spec annotations</h3>
            <p className={`${styles.sectionSub} ${isDark ? styles.sectionSubDark : ''}`}>Click a category to inspect that layer.</p>
          </div>
          <div className={styles.annotTabs}>
            {ANNOT_TABS.map(t => (
              <button
                key={t.id}
                className={`${styles.annotTab} ${isDark ? styles.annotTabDark : ''} ${annotTab === t.id ? styles.annotTabActive : ''}`}
                onClick={() => setAnnotTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.annotOuter}>
          <div
            className={styles.annotInner}
            style={{ width: wSpec.widthPx, height: wSpec.heightPx }}
          >
            <WidgetPreview platform={platform} size={size} state="default" isDark={isDark} useStaticForDefault />
            <AnnotationSVG platform={platform} size={size} uid={uid} alwaysShow annotTab={annotTab} />
          </div>
        </div>
      </div>

      {/* ── In context ── */}
      <div className={`${styles.mockupSection} ${isDark ? styles.mockupSectionDark : ''}`}>
        <h3 className={`${styles.sectionTitle} ${isDark ? styles.sectionTitleDark : ''}`}>In context</h3>
        <p className={`${styles.sectionSub} ${isDark ? styles.sectionSubDark : ''}`}>How it appears on the device home screen.</p>
        <div className={styles.mockupWrap}>
          {isIOS ? (
            <IOSPhoneFrame
              theme={iosTheme}
              size={size}
              kpiDisplayType="full"
              layout="list"
              state={state}
              kpiIndex={0}
            />
          ) : (
            <AndroidPhoneFrame
              theme={droidTheme}
              size={size}
              kpiDisplayType="full"
              layout="list"
              state={state}
              kpiIndex={0}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ─── DocsPage ─────────────────────────────────────────────────────────────────

interface DocsPageProps {
  isDark: boolean;
}

const DocsPage: React.FC<DocsPageProps> = ({ isDark }) => {
  const [platform, setPlatform] = useState<Plat>('ios');
  const [detail, setDetail] = useState<{ size: WidgetSize; state: WidgetState } | null>(null);

  if (detail) {
    return (
      <DetailView
        platform={platform}
        size={detail.size}
        state={detail.state}
        isDark={isDark}
        onBack={() => setDetail(null)}
      />
    );
  }

  return (
    <div className={`${styles.root} ${isDark ? styles.rootDark : ''}`}>
      <div className={`${styles.topBar} ${isDark ? styles.topBarDark : ''}`}>
        <div className={`${styles.segControl} ${isDark ? styles.segControlDark : ''}`}>
          {(['ios', 'android'] as Plat[]).map(p => (
            <button
              key={p}
              className={`${styles.seg} ${isDark ? styles.segDark : ''} ${platform === p ? (isDark ? styles.segActiveDark : styles.segActive) : ''}`}
              onClick={() => setPlatform(p)}
            >
              {p === 'ios' ? 'iOS' : 'Android'}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.gallery}>
        {SIZES.filter(s => !(s === 'xlarge' && platform === 'ios')).map(s => (
          <SizeSection
            key={s}
            platform={platform}
            size={s}
            isDark={isDark}
            onCard={(size, state) => setDetail({ size, state })}
          />
        ))}
      </div>
    </div>
  );
};

export default DocsPage;
