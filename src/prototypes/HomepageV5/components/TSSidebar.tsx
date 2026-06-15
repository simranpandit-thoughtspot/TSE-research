import React from 'react';
import styles from './TSSidebar.module.css';

const IconChart = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="9" width="2.5" height="6" rx="0.5" />
    <rect x="4.8" y="6" width="2.5" height="9" rx="0.5" />
    <rect x="8.6" y="3" width="2.5" height="12" rx="0.5" />
    <rect x="12.4" y="5" width="2.5" height="10" rx="0.5" />
  </svg>
);

const IconList = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="3" y1="4" x2="13" y2="4" />
    <line x1="3" y1="8" x2="13" y2="8" />
    <line x1="3" y1="12" x2="10" y2="12" />
  </svg>
);

const IconCode = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5 2 8l3 2.5M11 5.5l3 2.5-3 2.5M9 4l-2 8" />
  </svg>
);

const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="2.5" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.41 1.41M11.37 11.37l1.41 1.41M12.78 3.22l-1.41 1.41M4.63 11.37l-1.41 1.41" strokeLinecap="round" />
  </svg>
);

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="7" y1="2" x2="7" y2="12" />
    <line x1="2" y1="7" x2="12" y2="7" />
  </svg>
);

const IconLiveboard = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="1" y="1" width="5.5" height="5.5" rx="1" />
    <rect x="7.5" y="1" width="5.5" height="5.5" rx="1" />
    <rect x="1" y="7.5" width="5.5" height="5.5" rx="1" />
    <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" />
  </svg>
);

const IconPie = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M7 1.5A5.5 5.5 0 1 1 1.5 7H7V1.5Z" />
  </svg>
);

const FAVOURITES = [
  { label: 'Retails Sales', icon: <IconLiveboard />, dot: false },
  { label: 'Total sales, Total quantity pu...', icon: <IconLiveboard />, dot: false },
  { label: 'Cloud Clusters', icon: <IconLiveboard />, dot: true },
  { label: 'Sales by state and region', icon: <IconPie />, dot: true },
  { label: 'Retails Sales', icon: <IconLiveboard />, dot: false },
];

const TSSidebar: React.FC = () => (
  <aside className={styles.sidebar}>
    <div className={styles.iconNav}>
      <button className={`${styles.iconBtn} ${styles.iconBtnActive}`} title="Analytics">
        <IconChart />
      </button>
      <button className={styles.iconBtn} title="Library"><IconList /></button>
      <button className={styles.iconBtn} title="Developer"><IconCode /></button>
      <button className={styles.iconBtn} title="Settings"><IconSettings /></button>
    </div>

    <nav className={styles.nav}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Insights</span>
        <button className={styles.sectionAdd} title="Add"><IconPlus /></button>
      </div>

      <button className={`${styles.navItem} ${styles.navItemActive}`}>Home</button>
      <button className={styles.navItem}>Spotter</button>
      <button className={styles.navItem}>Search data</button>

      <div className={styles.navLabel}>Library</div>
      <button className={styles.navItem}>Liveboards</button>
      <button className={styles.navItem}>Answers</button>

      <div className={styles.navLabel}>Analysis &amp; Alerts</div>
      <button className={styles.navItem}>Subscriptions</button>
      <button className={styles.navItem}>SpotIQ analysis</button>

      <button className={styles.navItem} style={{ marginTop: 8 }}>Collections</button>

      <div className={styles.navLabel}>Favourites</div>
      {FAVOURITES.map((fav, i) => (
        <button key={i} className={styles.navItem}>
          {fav.dot && <span className={styles.favDot} />}
          <span className={styles.navIcon}>{fav.icon}</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {fav.label}
          </span>
        </button>
      ))}

      <button className={styles.showMore}>Show more</button>
    </nav>
  </aside>
);

export default TSSidebar;
