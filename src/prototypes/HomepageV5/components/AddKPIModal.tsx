import React, { useState } from 'react';
import styles from './AddKPIModal.module.css';

const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="6" cy="6" r="4.5" />
    <line x1="9.5" y1="9.5" x2="13" y2="13" />
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

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="#2770EF" />
    <path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevron = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2.5 4.5 6 8l3.5-3.5" />
  </svg>
);

const IconEye = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
    <path d="M1 6.5C1 6.5 3 2.5 6.5 2.5S12 6.5 12 6.5 10 10.5 6.5 10.5 1 6.5 1 6.5Z" />
    <circle cx="6.5" cy="6.5" r="1.8" />
  </svg>
);

const LIVEBOARDS = [
  { id: 'c360', name: 'Customer 360', author: 'Jane Doe', hasCheck: true, icon: <IconLiveboard /> },
  { id: 'myboard', name: 'My Liveboard', author: 'Ramkumar Natrajan', hasCheck: false, icon: <IconLiveboard /> },
  { id: 'pipeline', name: 'PIPELINE X - GTM', author: 'Chelsea Zhou', hasCheck: false, icon: <IconPie /> },
  { id: 'adoption', name: 'Adoption Metrics', author: 'Wade Warren', hasCheck: true, icon: <IconLiveboard /> },
  { id: 'copy360', name: 'Copy of Customer 360', author: 'Tarun', hasCheck: false, icon: <IconLiveboard /> },
  { id: 'revenue', name: 'Revenue Sales', author: 'Aditya Wadher', hasCheck: false, icon: <IconPie /> },
  { id: 'pipeline2', name: 'PIPELINE X - GTM', author: 'Shreyas', hasCheck: false, icon: <IconLiveboard /> },
];

interface KPICardData {
  name: string;
  period: string;
  value: string;
  trend?: 'up' | 'down';
  trendLabel?: string;
  sparkColor?: string;
  sparkPoints?: string;
  starred?: boolean;
}

const KPI_CARDS: KPICardData[] = [
  {
    name: 'Top 3: TS Cloud WAU', period: 'Week of 25/06/FY 2024', value: '63.92K',
    trend: 'down', trendLabel: '6.9% vs week of 18/06/FY 2024 (65.4K)',
    sparkColor: '#E22B3D', sparkPoints: '0,35 10,25 20,30 30,15 40,28 50,5 60,30 70,38 80,42 90,35 100,40',
    starred: true,
  },
  {
    name: 'M0 Created Monthly', period: 'Jun FY 2024', value: '506',
    trend: 'up', trendLabel: '10.2% vs May FY 2024 (459)',
    sparkColor: '#2770EF', sparkPoints: '0,40 15,35 30,30 45,25 55,20 65,18 75,22 85,15 100,8',
  },
  {
    name: 'SALs CQ', period: 'Q2 FY 2024', value: '2.35K',
    sparkColor: '#2770EF', sparkPoints: '0,30 20,28 40,25 60,22 80,20 100,18',
  },
  {
    name: 'CQ Booked Expansion', period: 'Jun FY 2024', value: '3.7M',
    trend: 'up', trendLabel: '10% vs May FY 2024 (3.34M)',
    sparkColor: '#2770EF', sparkPoints: '0,38 15,32 30,28 45,25 60,20 75,15 85,18 100,10',
  },
  {
    name: 'CQ Booked Expansion', period: 'Jun FY 2024', value: '3.7M',
    trend: 'down', trendLabel: '10% vs May FY 2024 (3.34M)',
    sparkColor: '#E22B3D', sparkPoints: '0,8 15,12 30,10 45,18 60,22 75,28 85,32 100,38',
  },
  {
    name: 'Top 3: TS Cloud WAU', period: 'FY 2024', value: '705.92K',
    trend: 'up', trendLabel: '10% vs FY 2023 (650.4K)',
    sparkColor: '#2770EF', sparkPoints: '0,40 20,35 35,32 50,26 65,20 80,15 90,18 100,12',
    starred: true,
  },
];

interface Props {
  onClose: () => void;
}

const AddKPIModal: React.FC<Props> = ({ onClose }) => {
  const [selectedBoard, setSelectedBoard] = useState('c360');

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add KPIs</h2>
        </div>

        <div className={styles.body}>
          {/* Left panel */}
          <div className={styles.leftPanel}>
            <div className={styles.searchWrap}>
              <div className={styles.searchInput}>
                <IconSearch />
                <span>Search</span>
              </div>
            </div>
            <ul className={styles.liveboardList}>
              {LIVEBOARDS.map(lb => (
                <li
                  key={lb.id}
                  className={`${styles.liveboardItem} ${selectedBoard === lb.id ? styles.liveboardItemActive : ''}`}
                  onClick={() => setSelectedBoard(lb.id)}
                >
                  <div className={styles.liveboardIcon}>
                    {lb.hasCheck ? <IconCheck /> : lb.icon}
                  </div>
                  <div className={styles.liveboardInfo}>
                    <div className={styles.liveboardName}>{lb.name}</div>
                    <div className={styles.liveboardAuthor}>{lb.author}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right panel */}
          <div className={styles.rightPanel}>
            <div className={styles.boardHeader}>
              <div>
                <div className={styles.boardTitle}>
                  <IconCheck />
                  Customer 360
                </div>
                <div className={styles.boardMeta}>
                  Last edited 14 mins ago
                  <IconEye />
                  14,882
                </div>
              </div>
            </div>

            <div className={styles.viewSelectWrap}>
              <div className={styles.viewSelectLabel}>Select View</div>
              <div className={styles.viewSelect}>
                Original Liveboard
                <span style={{ marginLeft: 'auto' }}><IconChevron /></span>
              </div>
            </div>

            <div className={styles.sectionHeading}>
              🎯 Team Goals
            </div>

            <div className={styles.kpiGrid}>
              {KPI_CARDS.map((card, i) => (
                <div key={i} className={styles.kpiCard}>
                  <div className={styles.kpiCheckbox} />
                  <div className={styles.kpiName}>
                    {card.starred ? '⭐ ' : ''}{card.name}
                  </div>
                  <div className={styles.kpiPeriod}>{card.period}</div>
                  <div className={styles.kpiValue}>{card.value}</div>
                  {card.trend && (
                    <div className={`${styles.kpiTrend} ${card.trend === 'up' ? styles.trendUp : styles.trendDown}`}>
                      {card.trend === 'up' ? '↑' : '↓'}
                      {card.trendLabel}
                    </div>
                  )}
                  {card.sparkPoints && (
                    <svg className={styles.sparkline} viewBox="0 0 100 45" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={card.sparkColor} stopOpacity="0.25" />
                          <stop offset="100%" stopColor={card.sparkColor} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <polyline
                        points={card.sparkPoints}
                        fill="none"
                        stroke={card.sparkColor}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                      />
                      <polygon
                        points={`0,45 ${card.sparkPoints} 100,45`}
                        fill={`url(#grad-${i})`}
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.addBtn} onClick={onClose}>Add KPIs</button>
        </div>
      </div>
    </div>
  );
};

export default AddKPIModal;
