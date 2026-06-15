import React from 'react';
import styles from './SpotterBar.module.css';

const IconChartBars = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="9" width="2.5" height="6" rx="0.5" />
    <rect x="4.8" y="6" width="2.5" height="9" rx="0.5" />
    <rect x="8.6" y="3" width="2.5" height="12" rx="0.5" />
    <rect x="12.4" y="5" width="2.5" height="10" rx="0.5" />
  </svg>
);

const IconSpotterAI = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const IconChevron = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2.5 4.5 6 8l3.5-3.5" />
  </svg>
);

const IconFilter = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="2" y1="4" x2="14" y2="4" />
    <line x1="4" y1="8" x2="12" y2="8" />
    <line x1="6" y1="12" x2="10" y2="12" />
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
  </svg>
);

const SpotterBar: React.FC = () => (
  <div className={styles.bar}>
    <div className={styles.input}>
      Ask me a question. Use &apos;@&apos; to select columns and values
    </div>
    <div className={styles.toolbar}>
      <button className={styles.toolBtn} title="Search" aria-label="Quick search">
        <IconChartBars />
      </button>
      <button className={styles.toolBtn} title="Spotter AI" aria-label="Spotter AI">
        <IconSpotterAI />
      </button>
      <button className={styles.dataModelBtn}>
        All data models
        <IconChevron />
      </button>
      <button className={styles.plusBtn} aria-label="Add">+</button>
      <div className={styles.spacer} />
      <button className={styles.filterBtn} aria-label="Filters">
        <IconFilter />
      </button>
      <button className={styles.sendBtn} aria-label="Send">
        <IconSend />
      </button>
    </div>
  </div>
);

export default SpotterBar;
