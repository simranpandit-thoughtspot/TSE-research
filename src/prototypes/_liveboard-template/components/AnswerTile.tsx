import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@components/icons';
import { colors, typography, layout } from '../styles';
import { systemColors } from '@tokens/colors/system';

interface AnswerTileProps {
  title: string;
  children: React.ReactNode;
  mode: 'view' | 'edit';
  style?: React.CSSProperties;
  headerBorder?: boolean;
}

const iconColor = systemColors.light['content-secondary'];

const SpotterIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.111 1.778L8.889 5.333L12.444 7.111L8.889 8.889L7.111 12.444L5.333 8.889L1.778 7.111L5.333 5.333L7.111 1.778Z" stroke={iconColor} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M12.444 2.667L13.333 4.444L15.111 5.333L13.333 6.222L12.444 8L11.556 6.222L9.778 5.333L11.556 4.444L12.444 2.667Z" stroke={iconColor} strokeWidth="0.8" strokeLinejoin="round" />
  </svg>
);

const ExpandIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M9.5 2.5H13.5V6.5M6.5 13.5H2.5V9.5M13.5 2.5L9.5 6.5M2.5 13.5L6.5 9.5" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoreDotsIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="1.25" fill={iconColor} />
    <circle cx="3.5" cy="8" r="1.25" fill={iconColor} />
    <circle cx="12.5" cy="8" r="1.25" fill={iconColor} />
  </svg>
);

const TOOLBAR_FULL_WIDTH = 198;

const ActionPalette: React.FC<{ compact?: boolean; mode: 'view' | 'edit' }> = ({ compact, mode }) => {
  if (compact) {
    return (
      <div style={s.toolbar}>
        <button style={s.toolbarIconBtn}><MoreDotsIcon /></button>
      </div>
    );
  }

  if (mode === 'edit') {
    return (
      <div style={s.toolbar}>
        <button style={s.toolbarIconBtn}>
          <Icon name="pencil" size="s" color={iconColor} />
        </button>
        <div style={s.toolbarSep} />
        <button style={s.toolbarSpotterBtn}>
          <span style={s.toolbarLabel}>Move to</span>
          <Icon name="chevron-right" size="xs" color={iconColor} />
        </button>
        <div style={s.toolbarSep} />
        <button style={s.toolbarIconBtn}>
          <Icon name="cross" size="s" color={iconColor} />
        </button>
      </div>
    );
  }

  return (
    <div style={s.toolbar}>
      <button style={s.toolbarSpotterBtn}>
        <SpotterIcon />
        <span style={{ ...s.toolbarLabel, color: systemColors.light['content-primary'] }}>Ask Spotter</span>
      </button>
      <div style={s.toolbarSep} />
      <button style={s.toolbarIconBtn}><ExpandIcon /></button>
      <div style={s.toolbarSep} />
      <button style={s.toolbarIconBtn}><MoreDotsIcon /></button>
    </div>
  );
};

export const AnswerTile: React.FC<AnswerTileProps> = ({ title, children, mode, style, headerBorder }) => {
  const [hovered, setHovered] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const useCompact = tileRef.current ? tileRef.current.offsetWidth <= TOOLBAR_FULL_WIDTH : false;

  useEffect(() => {
    if (hovered) {
      timerRef.current = setTimeout(() => setShowToolbar(true), 650);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      setShowToolbar(false);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [hovered]);

  const outlineColor = systemColors.light['border-default'];

  return (
    <div
      ref={tileRef}
      style={{
        ...s.tile,
        ...style,
        border: `1px solid ${hovered ? outlineColor : systemColors.light['border-divider']}`,
        ...(hovered ? { zIndex: 110 } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {showToolbar && (
        <div style={s.toolbarWrapper}>
          <ActionPalette compact={useCompact} mode={mode} />
        </div>
      )}
      <div style={{ ...s.tileHeader, ...(headerBorder ? { borderBottom: `1px solid ${colors.border}` } : {}) }}>
        <span style={s.tileTitle}>{title}</span>
      </div>
      <div style={s.tileBody}>
        {children}
      </div>
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  tile: {
    background: colors.cardBg,
    borderRadius: layout.tileRadius,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'border-color 0.15s',
  },
  tileHeader: {
    padding: '8px 8px 4px 8px',
  },
  tileTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    letterSpacing: -0.064,
    lineHeight: '24px',
    display: 'block',
    padding: 8,
  },
  tileBody: {
    padding: '4px 8px 8px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  toolbarWrapper: {
    position: 'absolute',
    top: -25,
    right: -1,
    zIndex: 30,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    height: 32,
    padding: '0 8px',
    gap: 8,
    borderRadius: 8,
    border: `1px solid ${systemColors.light['border-default']}`,
    background: 'white',
  },
  toolbarSpotterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    height: 24,
    padding: '0 4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 2,
    fontFamily: typography.fontFamily,
  },
  toolbarLabel: {
    fontSize: 14,
    fontWeight: 375,
    lineHeight: '20px',
    whiteSpace: 'nowrap' as const,
    color: systemColors.light['content-primary'],
  },
  toolbarSep: {
    width: 1,
    alignSelf: 'stretch',
    flexShrink: 0,
    background: systemColors.light['border-divider'],
  },
  toolbarIconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 4,
    padding: 0,
    flexShrink: 0,
  },
};
