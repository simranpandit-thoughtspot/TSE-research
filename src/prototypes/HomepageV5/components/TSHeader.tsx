import React from 'react';
import styles from './TSHeader.module.css';

const TS_LOGO = 'M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z';

const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="6" cy="6" r="4.5" />
    <line x1="9.5" y1="9.5" x2="13" y2="13" />
  </svg>
);

const IconHelp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.2 6.1c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c0 1.1-.9 1.5-1.5 2-.2.2-.3.4-.3.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
  </svg>
);

const IconBell = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2a4.5 4.5 0 0 0-4.5 4.5v2L2 10.5h12L12.5 8.5v-2A4.5 4.5 0 0 0 8 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2.5 4.5 6 8l3.5-3.5" />
  </svg>
);

const TSHeader: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="ThoughtSpot">
        <path d={TS_LOGO} fill="#0F1729" />
      </svg>
    </div>

    <div className={styles.spacer} />

    <div className={styles.search}>
      <IconSearch />
      <span>Search in your library</span>
    </div>

    <button className={styles.iconBtn} aria-label="Help">
      <IconHelp />
    </button>

    <button className={`${styles.iconBtn} ${styles.bell}`} aria-label="Notifications">
      <IconBell />
      <span className={styles.bellDot} />
    </button>

    <button className={styles.orgBtn}>
      Royal Enfield
      <IconChevronDown />
    </button>

    <div className={styles.avatar} title="User profile">
      RE
    </div>
  </header>
);

export default TSHeader;
