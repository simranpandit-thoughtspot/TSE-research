import React, { forwardRef } from 'react';
import { Icon } from '../icons';
import { referenceColors } from '../../tokens/colors';
import styles from './GlobalHeader.module.css';

// ThoughtSpot brand mark (Radiant 3.0). Four-path monogram: top bar +
// right bar + "T" hook + dot. Sourced from Figma file 1QlRveXx4wppvDXyPVWUTK
// node 20202:11191. ViewBox 0 0 47.4216 48.
const THOUGHTSPOT_LOGO_PATHS = [
  'M47.4216 0H0V8.78311H47.4216V0Z',
  'M47.4216 11.7108H29.4035V20.4939H47.4216V11.7108Z',
  'M11.512 11.7108H0V20.4939H11.512C15.8132 20.4939 19.3192 23.9999 19.3192 28.3011V47.4216H28.1024V28.3011C28.1024 19.1566 20.6566 11.7108 11.512 11.7108Z',
  'M38.4216 33.253C34.3554 33.253 31.0481 36.5603 31.0481 40.6265C31.0481 44.6928 34.3554 48 38.4216 48C42.4879 48 45.7951 44.6928 45.7951 40.6265C45.7951 36.5603 42.4879 33.253 38.4216 33.253Z',
] as const;
const BELL_ICON_PATH =
  'M14.809 11.7122C13.5183 11.0551 12.7668 9.7408 12.7668 8.28587V6.05578V5.8679C12.7668 3.45093 11.1004 1.69013 8.84765 1.22077V1.19717C8.84765 0.540043 8.30761 0 7.65048 0C6.99335 0 6.45331 0.540043 6.45331 1.19717V1.22077C4.20054 1.69001 2.53415 3.45086 2.53415 5.8679V6.05578V8.30855C2.53415 9.78711 1.73633 11.0315 0.44566 11.7586C0.187883 11.8993 0 12.275 0 12.6272C0 13.1437 0.422052 13.5893 0.962096 13.5893H14.387C14.9034 13.5893 15.3491 13.1672 15.3491 12.6272C15.3019 12.2288 15.0904 11.8529 14.809 11.7122Z';

const classNames = (...values: Array<string | undefined | false>): string =>
  values.filter(Boolean).join(' ');

const hexToRgba = (hex: string, alpha: number): string => {
  const normalized = hex.replace('#', '');
  const int = Number.parseInt(normalized, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export type GlobalHeaderTheme = 'dark' | 'light';

export interface GlobalHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  onLogoClick?: () => void;
  searchPlaceholder?: string;
  searchMode?: 'trigger' | 'input';
  onSearchClick?: () => void;
  onSearchChange?: (query: string) => void;
  searchValue?: string;
  showKeyboardHint?: boolean;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  showHamburger?: boolean;
  onHamburgerClick?: () => void;
  onHelpClick?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  showDefaultActions?: boolean;
  rightSlot?: React.ReactNode;
  theme?: GlobalHeaderTheme;
}

const THEMES: Record<GlobalHeaderTheme, { cssVars: Record<string, string>; logoFill: string }> = {
  dark: {
    cssVars: {
      '--gh-bg': referenceColors.gray['90'],
      '--gh-border': referenceColors.gray['80'],
      '--gh-surface': referenceColors.gray['85'],
      '--gh-surface-hover': referenceColors.gray['80'],
      '--gh-active': referenceColors.brand['50'],
      '--gh-text': referenceColors.gray['30'],
      '--gh-muted': referenceColors.gray['50'],
      '--gh-subtle': referenceColors.gray['60'],
      '--gh-danger': referenceColors.red['60'],
      '--gh-focus': referenceColors.brand['60'],
      '--gh-hover-ring': hexToRgba(referenceColors.brand['50'], 0.28),
    },
    logoFill: referenceColors.gray['00'],
  },
  light: {
    cssVars: {
      '--gh-bg': referenceColors.gray['00'],
      '--gh-border': referenceColors.gray['20'],
      '--gh-surface': referenceColors.gray['10'],
      '--gh-surface-hover': referenceColors.gray['20'],
      '--gh-active': referenceColors.brand['50'],
      '--gh-text': referenceColors.gray['90'],
      '--gh-muted': referenceColors.gray['60'],
      '--gh-subtle': referenceColors.gray['70'],
      '--gh-danger': referenceColors.red['60'],
      '--gh-focus': referenceColors.brand['60'],
      '--gh-hover-ring': hexToRgba(referenceColors.brand['50'], 0.28),
    },
    logoFill: referenceColors.gray['90'],
  },
};

export const GlobalHeader = forwardRef<HTMLElement, GlobalHeaderProps>(
  (
    {
      logo,
      onLogoClick,
      searchPlaceholder = 'Search in ThoughtSpot',
      searchMode = 'trigger',
      onSearchClick,
      onSearchChange,
      searchValue = '',
      showKeyboardHint = true,
      userName = 'Workspace',
      userAvatar,
      notificationCount = 0,
      showHamburger = false,
      onHamburgerClick,
      onHelpClick,
      onNotificationClick,
      onProfileClick,
      showDefaultActions = true,
      rightSlot,
      theme = 'dark',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const { cssVars, logoFill } = THEMES[theme];
    const mergedStyle: React.CSSProperties = {
      ...(cssVars as React.CSSProperties),
      ...style,
    };

    return (
      <header ref={ref} className={classNames(styles.header, className)} style={mergedStyle} {...props}>
        <div className={styles.leftSection}>
          {showHamburger && (
            <button
              type="button"
              className={styles.iconButton}
              onClick={onHamburgerClick}
              aria-label="Toggle sidebar"
            >
              <Icon name="hamburger" size="m" color="var(--gh-text)" />
            </button>
          )}

          <button type="button" className={styles.logoButton} onClick={onLogoClick} aria-label="Go to home">
            {logo ?? (
              <svg className={styles.logo} fill="none" viewBox="0 0 47.4216 48" aria-hidden="true">
                {THOUGHTSPOT_LOGO_PATHS.map((d) => (
                  <path key={d} d={d} fill={logoFill} />
                ))}
              </svg>
            )}
          </button>
        </div>

        <div className={styles.rightSection}>
          {searchMode === 'input' ? (
            <label className={styles.searchField}>
              <span className={styles.searchIcon} aria-hidden="true">
                <Icon name="magnifying-glass" size="m" color="currentColor" />
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={(event) => onSearchChange?.(event.target.value)}
                placeholder={searchPlaceholder}
                className={styles.searchInput}
                aria-label={searchPlaceholder}
              />
            </label>
          ) : (
            <button type="button" className={styles.searchTrigger} onClick={onSearchClick} aria-label={searchPlaceholder}>
              <span className={styles.searchIcon} aria-hidden="true">
                <Icon name="magnifying-glass" size="m" color="currentColor" />
              </span>
              <span className={styles.searchPlaceholder}>{searchPlaceholder}</span>
              {showKeyboardHint && <kbd className={styles.keyboardHint}>Cmd+K</kbd>}
            </button>
          )}

          {showDefaultActions && (
            <>
              <button type="button" className={styles.circleButton} onClick={onHelpClick} aria-label="Help">
                <Icon name="question-mark" size="m" color="currentColor" />
              </button>

              <button
                type="button"
                className={styles.circleButton}
                onClick={onNotificationClick}
                aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount})` : ''}`}
              >
                <svg className={styles.notificationIcon} fill="none" viewBox="0 0 16 14" aria-hidden="true">
                  <path d={BELL_ICON_PATH} fill="currentColor" />
                </svg>
                {notificationCount > 0 && <span className={styles.notificationDot} />}
              </button>

              <button type="button" className={styles.profileButton} onClick={onProfileClick} aria-label="Profile menu">
                <span className={styles.profileName}>{userName}</span>
                <Icon name="chevron-down" size="s" color="var(--gh-text)" aria-hidden />
                {userAvatar ? (
                  <img src={userAvatar} alt="" className={styles.avatar} />
                ) : (
                  <span className={styles.avatarFallback} aria-hidden>
                    <Icon name="profile" size="m" color="var(--gh-text)" />
                  </span>
                )}
              </button>
            </>
          )}

          {rightSlot}
        </div>
      </header>
    );
  },
);

GlobalHeader.displayName = 'GlobalHeader';

export default GlobalHeader;
