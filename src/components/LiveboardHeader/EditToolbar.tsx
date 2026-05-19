import React from 'react';
import { Button } from '@components/Button';
import { Icon } from '@components/icons';
import { colors, typography, layout } from './styles';

interface EditToolbarProps {
  onSave: () => void;
  onCancel: () => void;
  onToggleSpotter?: () => void;
  spotterOpen?: boolean;
}

const SpotterIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.111 1.778L8.889 5.333L12.444 7.111L8.889 8.889L7.111 12.444L5.333 8.889L1.778 7.111L5.333 5.333L7.111 1.778Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M12.444 2.667L13.333 4.444L15.111 5.333L13.333 6.222L12.444 8L11.556 6.222L9.778 5.333L11.556 4.444L12.444 2.667Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
  </svg>
);

export const EditToolbar: React.FC<EditToolbarProps> = ({ onSave, onCancel, onToggleSpotter, spotterOpen }) => (
  <div style={s.toolbar}>
    <div style={s.left}>
      <svg width="24" height="24" viewBox="0 0 47.4216 48" fill="none" style={{ color: colors.textOnDark }}>
        <path d="M47.4216 0H0V8.78311H47.4216V0Z" fill="currentColor" />
        <path d="M47.4216 11.7108H29.4035V20.4939H47.4216V11.7108Z" fill="currentColor" />
        <path d="M11.512 11.7108H0V20.4939H11.512C15.8132 20.4939 19.3192 23.9999 19.3192 28.3011V47.4216H28.1024V28.3011C28.1024 19.1566 20.6566 11.7108 11.512 11.7108Z" fill="currentColor" />
        <path d="M38.4216 33.253C34.3554 33.253 31.0481 36.5603 31.0481 40.6265C31.0481 44.6928 34.3554 48 38.4216 48C42.4879 48 45.7951 44.6928 45.7951 40.6265C45.7951 36.5603 42.4879 33.253 38.4216 33.253Z" fill="currentColor" />
      </svg>
    </div>

    <div style={s.center}>
      <button style={s.toolBtn}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={s.toolLabel}>Add</span>
        <Icon name="chevron-down" size="xs" color={colors.textOnDarkMuted} />
      </button>
      <button style={s.toolBtn}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 2V4M9 14V16M2 9H4M14 9H16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={s.toolLabel}>Styling</span>
      </button>
      {onToggleSpotter && (
        <button style={{ ...s.toolBtn, ...(spotterOpen ? s.toolBtnActive : {}) }} onClick={onToggleSpotter}>
          <SpotterIcon />
          <span style={s.toolLabel}>SpotterViz</span>
        </button>
      )}
    </div>

    <div style={s.right}>
      <Button variant="secondary" size="basic" colorway="white" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" size="basic" onClick={onSave}>
        Save
      </Button>
    </div>
  </div>
);

const s: Record<string, React.CSSProperties> = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: colors.editHeaderBg,
    color: colors.textOnDarkMuted,
    height: layout.headerHeight,
    padding: '0 24px',
    flexShrink: 0,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${colors.borderDark}`,
    borderRadius: 8,
    overflow: 'hidden',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  toolBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    height: 40,
    padding: '0 12px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: colors.textOnDarkMuted,
    fontFamily: typography.fontFamily,
  },
  toolBtnActive: {
    background: 'rgba(255,255,255,0.1)',
  },
  toolLabel: {
    fontSize: 14,
    fontWeight: 375,
    color: colors.textOnDarkMuted,
    lineHeight: '20px',
    whiteSpace: 'nowrap' as const,
  },
};
