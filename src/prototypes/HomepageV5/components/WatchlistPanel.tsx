import React from 'react';
import styles from './WatchlistPanel.module.css';

const IconPlus = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="6" y1="1" x2="6" y2="11" />
    <line x1="1" y1="6" x2="11" y2="6" />
  </svg>
);

const IconDots = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <circle cx="2.5" cy="7" r="1.3" />
    <circle cx="7" cy="7" r="1.3" />
    <circle cx="11.5" cy="7" r="1.3" />
  </svg>
);

const ArrowUp = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M5 8V2M2 5l3-3 3 3" />
  </svg>
);

const ArrowDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M5 2v6M2 5l3 3 3-3" />
  </svg>
);

type Trend = 'up' | 'down' | 'flat';

interface KPI {
  name: string;
  period: string;
  value: string;
  trend: Trend;
  trendLabel: string;
}

const KPIS: KPI[] = [
  { name: 'Total Revenue by Product', period: 'WoW', value: '88.888M', trend: 'up', trendLabel: '20.74 %' },
  { name: 'Sessions by Traffic Source', period: 'MoM', value: '10.07M', trend: 'up', trendLabel: '20.74 %' },
  { name: 'Conversion Rate by Marketing', period: 'WoW', value: '6.3%', trend: 'down', trendLabel: '20.74 %' },
  { name: 'Avg. Session Duration by Platform', period: 'MoM', value: '14.52M', trend: 'flat', trendLabel: '0 %' },
  { name: 'New Users by Last Week', period: 'MoM', value: '575.124M', trend: 'down', trendLabel: '20.74 %' },
];

interface Props {
  onAddKPI: () => void;
}

const WatchlistPanel: React.FC<Props> = ({ onAddKPI }) => (
  <div className={styles.panel}>
    <div className={styles.header}>
      <span className={styles.title}>Watchlist</span>
      <button className={styles.addBtn} onClick={onAddKPI}>
        <IconPlus />
        Add KPI
      </button>
    </div>
    <ul className={styles.list} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {KPIS.map((kpi, i) => (
        <li key={i}>
          <div className={styles.item}>
            <div className={styles.itemLeft}>
              <div className={styles.itemName}>{kpi.name}</div>
              <div className={styles.itemPeriod}>{kpi.period}</div>
            </div>
            <div className={styles.itemRight}>
              <div className={styles.valueGroup}>
                <span className={styles.value}>{kpi.value}</span>
                <span className={`${styles.trend} ${
                  kpi.trend === 'up' ? styles.trendUp :
                  kpi.trend === 'down' ? styles.trendDown : styles.trendFlat
                }`}>
                  {kpi.trend === 'up' && <ArrowUp />}
                  {kpi.trend === 'down' && <ArrowDown />}
                  {kpi.trendLabel}
                </span>
              </div>
              <div className={styles.dotsWrap}>
                <button
                  className={styles.dotsBtn}
                  onClick={e => e.stopPropagation()}
                  aria-label="More options"
                >
                  <IconDots />
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default WatchlistPanel;
