import React, { useState } from 'react';
import { Tabs } from '../../../components/Tabs';
import { systemColors } from '../../../tokens/colors';
import styles from './SecondaryResearch.module.css';
import { WhatIsEmbedding } from './WhatIsEmbedding';
import { ComparisonTable } from './ComparisonTable';
import { ReviewsPanel } from './ReviewsPanel';
import { SecondarySummary } from './SecondarySummary';

type SubTab = 'what' | 'comparison' | 'reviews' | 'summary';

const TABS = [
  { id: 'what', label: 'What is embedding?' },
  { id: 'comparison', label: 'Comparison table' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'summary', label: 'Summary' },
];

export const SecondaryResearch: React.FC = () => {
  const [tab, setTab] = useState<SubTab>('what');

  return (
    <div className={styles.wrapper}>
      <div className={styles.subnav}>
        <p className={styles.subnavTitle}>Secondary research</p>
        <span className={styles.subnavDivider} style={{ backgroundColor: systemColors.light['border-divider'] }} />
        <Tabs tabs={TABS} activeTab={tab} onTabChange={(id) => setTab(id as SubTab)} />
      </div>
      <div className={styles.body}>
        {tab === 'what' && <WhatIsEmbedding />}
        {tab === 'comparison' && <ComparisonTable />}
        {tab === 'reviews' && <ReviewsPanel />}
        {tab === 'summary' && <SecondarySummary />}
      </div>
    </div>
  );
};

export default SecondaryResearch;
