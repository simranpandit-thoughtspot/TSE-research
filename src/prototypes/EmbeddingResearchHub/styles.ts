import { CSSProperties } from 'react';
import { systemColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

const c = systemColors.light;

export const HEADER_HEIGHT = 56;
export const BOTTOM_NAV_RESERVE = 88;

export const styles: Record<string, CSSProperties> = {
  shell: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: c['background-sunken'],
    backgroundImage: `radial-gradient(${c['border-divider']} 1.4px, transparent 1.4px)`,
    backgroundSize: '22px 22px',
    overflow: 'hidden',
  },
  header: {
    height: HEADER_HEIGHT,
    flexShrink: 0,
    padding: `0 ${spacing.F}px`,
    position: 'relative',
    zIndex: 2,
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: c['background-brand'],
    color: c['content-primary-inverse'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },
  brandText: {
    fontSize: 15,
    fontWeight: 600,
    color: c['content-primary'],
    whiteSpace: 'nowrap',
  },
  brandSubtext: {
    fontSize: 11,
    color: c['content-tertiary'],
    whiteSpace: 'nowrap',
  },
  content: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  },
};
