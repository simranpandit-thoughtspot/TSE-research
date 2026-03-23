import React from 'react';
import { Button } from '@components/Button';
import { Icon } from '@components/icons';
import { colors, typography } from './styles';

interface EditToolbarProps {
  onSave: () => void;
  onCancel: () => void;
  onToggleSpotter?: () => void;
  spotterOpen?: boolean;
}

const SpotterIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.111 1.778L8.889 5.333L12.444 7.111L8.889 8.889L7.111 12.444L5.333 8.889L1.778 7.111L5.333 5.333L7.111 1.778Z" stroke="#DBDFE7" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M12.444 2.667L13.333 4.444L15.111 5.333L13.333 6.222L12.444 8L11.556 6.222L9.778 5.333L11.556 4.444L12.444 2.667Z" stroke="#DBDFE7" strokeWidth="0.8" strokeLinejoin="round" />
  </svg>
);

export const EditToolbar: React.FC<EditToolbarProps> = ({ onSave, onCancel, onToggleSpotter, spotterOpen }) => (
  <div style={s.toolbar}>
    <div style={s.left}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z" fill="white" />
      </svg>
    </div>

    <div style={s.center}>
      <button style={s.toolBtn}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1V13M1 7H13" stroke="#DBDFE7" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={s.toolLabel}>Add</span>
        <Icon name="chevron-down" size="xs" color="#DBDFE7" />
      </button>
      <button style={s.toolBtn}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="#DBDFE7" strokeWidth="1.2" />
          <circle cx="9" cy="9" r="3" stroke="#DBDFE7" strokeWidth="1.2" />
          <path d="M9 2V4M9 14V16M2 9H4M14 9H16" stroke="#DBDFE7" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={s.toolLabel}>Styling</span>
      </button>
      {onToggleSpotter && (
        <button style={{ ...s.toolBtn, ...(spotterOpen ? { background: 'rgba(255,255,255,0.1)' } : {}) }} onClick={onToggleSpotter}>
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
    height: 60,
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
    border: '1px solid #4A515E',
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
    fontFamily: typography.fontFamily,
  },
  toolLabel: {
    fontSize: 14,
    fontWeight: 375,
    color: '#DBDFE7',
    lineHeight: '20px',
    whiteSpace: 'nowrap' as const,
  },
};
