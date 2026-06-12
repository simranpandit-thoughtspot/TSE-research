import React from 'react';
import styles from './RecentsPanel.module.css';

const IconSparkle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1c0 3.866-3.134 7-7 7 3.866 0 7 3.134 7 7 0-3.866 3.134-7 7-7-3.866 0-7-3.134-7-7Z" />
  </svg>
);

const IconLiveboard = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="1" y="1" width="5" height="5" rx="1" />
    <rect x="8" y="1" width="5" height="5" rx="1" />
    <rect x="1" y="8" width="5" height="5" rx="1" />
    <rect x="8" y="8" width="5" height="5" rx="1" />
  </svg>
);

const IconPie = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M7 1.5A5.5 5.5 0 1 1 1.5 7H7V1.5Z" />
  </svg>
);

const IconDots = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <circle cx="2.5" cy="7" r="1.3" />
    <circle cx="7" cy="7" r="1.3" />
    <circle cx="11.5" cy="7" r="1.3" />
  </svg>
);

const ITEMS = [
  { id: 1, label: 'Quarterly profit dashboard', time: 'yesterday', icon: <IconSparkle /> },
  { id: 2, label: 'Customer attrition by team', time: '2 days ago', icon: <IconLiveboard /> },
  { id: 3, label: 'New leads by marketing chan...', time: '4 days ago', icon: <IconPie /> },
  { id: 4, label: 'Adelaide product pipeline', time: '1 week ago', icon: <IconLiveboard /> },
  { id: 5, label: 'Weekly active users', time: '2 weeks ago', icon: <IconSparkle /> },
];

const RecentsPanel: React.FC = () => (
  <div className={styles.panel}>
    <div className={styles.header}>Recents</div>
    <ul className={styles.list} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {ITEMS.map(item => (
        <li key={item.id}>
          <button className={styles.item}>
            <div className={styles.itemIcon}>{item.icon}</div>
            <div className={styles.itemInfo}>
              <div className={styles.itemName}>{item.label}</div>
              <div className={styles.itemTime}>{item.time}</div>
            </div>
            <div className={styles.dots} onClick={e => e.stopPropagation()}>
              <IconDots />
            </div>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentsPanel;
