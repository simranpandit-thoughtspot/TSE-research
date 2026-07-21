import React from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { systemColors } from '../../../tokens/colors';
import { shadowPrimitives } from '../../../tokens/shadows';
import styles from './BottomNav.module.css';

const c = systemColors.light;

export type SectionId = 'secondary' | 'primary' | 'tabAudit' | 'problems';

interface NavItem {
  id: SectionId;
  label: string;
  icon?: IconName;
  glyph?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'secondary', label: 'Secondary research', icon: 'book' },
  { id: 'primary', label: 'Primary research', icon: 'microphone' },
  { id: 'tabAudit', label: 'Tab audit', glyph: '</>' },
  { id: 'problems', label: 'Problem areas', icon: 'exclamation-point-circle' },
];

interface BottomNavProps {
  active: SectionId;
  onChange: (id: SectionId) => void;
}

/**
 * Floating bottom toolbar — mirrors a FigJam/Figma canvas toolbar: a sticky
 * pill docked to the bottom of the viewport with a shadow, sitting on top
 * of the dotted canvas rather than a bordered top app-bar.
 */
export const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
  return (
    <nav
      className={styles.dock}
      role="tablist"
      aria-label="Research hub sections"
      style={{ backgroundColor: c['background-base'], boxShadow: shadowPrimitives.light.menu }}
    >
      {NAV_ITEMS.map((item, i) => {
        const isActive = item.id === active;
        return (
          <React.Fragment key={item.id}>
            {i === 2 && <span className={styles.divider} />}
            <button
              role="tab"
              aria-selected={isActive}
              aria-label={item.label}
              title={item.label}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              onClick={() => onChange(item.id)}
              style={{
                backgroundColor: isActive ? c['background-brand'] : 'transparent',
                color: isActive ? c['content-primary-inverse'] : c['content-secondary'],
              }}
            >
              {item.glyph ? (
                <span className={styles.glyph}>{item.glyph}</span>
              ) : item.icon ? (
                <Icon name={item.icon} size="s" color="currentColor" />
              ) : null}
              <span className={styles.label}>{item.label}</span>
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default BottomNav;
