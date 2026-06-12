import React from 'react';
import styles from './ChipDropdown.module.css';

const CHIP_DATA: Record<string, { label: string; icon: React.ReactNode; queries: string[] }> = {
  'quick-search': {
    label: 'Quick search',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="9" width="2.5" height="6" rx="0.5" />
        <rect x="4.8" y="6" width="2.5" height="9" rx="0.5" />
        <rect x="8.6" y="3" width="2.5" height="12" rx="0.5" />
        <rect x="12.4" y="5" width="2.5" height="10" rx="0.5" />
      </svg>
    ),
    queries: [
      'What was total revenue last month?',
      'Show me top 10 products by sales this quarter.',
      'How do sales this year compare to last year?',
      'Which region had the highest growth last quarter?',
    ],
  },
  'deep-analysis': {
    label: 'Deep analysis',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    queries: [
      'Why did revenue drop in Q3?',
      'What factors drive customer churn the most?',
      'Identify outliers in session duration by platform.',
      'Predict sales trends for next quarter.',
    ],
  },
  'know-your-data': {
    label: 'Know your data',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="8" cy="8" r="6.5" />
        <line x1="8" y1="7" x2="8" y2="12" />
        <circle cx="8" cy="4.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
    queries: [
      'What data sources are currently connected?',
      'Show me column descriptions for the Revenue table.',
      'Which datasets have the most rows?',
      'When was my data last refreshed?',
    ],
  },
};

const IconX = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="2" y1="2" x2="10" y2="10" />
    <line x1="10" y1="2" x2="2" y2="10" />
  </svg>
);

interface ChipDropdownProps {
  chipId: string;
  onClose: () => void;
}

const ChipDropdown: React.FC<ChipDropdownProps> = ({ chipId, onClose }) => {
  const data = CHIP_DATA[chipId];
  if (!data) return null;

  return (
    <div className={styles.dropdown}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>{data.icon}</span>
        <span className={styles.headerLabel}>{data.label}</span>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <IconX />
        </button>
      </div>
      <ul className={styles.queries}>
        {data.queries.map((q, i) => (
          <li key={i}>
            <button className={styles.queryItem}>{q}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChipDropdown;
