import React, { useState } from 'react';
import styles from './HomepageV5.module.css';
import TSHeader from './components/TSHeader';
import TSSidebar from './components/TSSidebar';
import SpotterBar from './components/SpotterBar';
import ChipDropdown from './components/ChipDropdown';
import RecentsPanel from './components/RecentsPanel';
import WatchlistPanel from './components/WatchlistPanel';
import AddKPIModal from './components/AddKPIModal';
import SpotterVizPage from './components/SpotterVizPage';

type View = 'home' | 'spotterviz';
type ChipId = 'quick-search' | 'deep-analysis' | 'know-your-data';

const IconQuickSearch = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="9" width="2.5" height="6" rx="0.5" />
    <rect x="4.8" y="6" width="2.5" height="9" rx="0.5" />
    <rect x="8.6" y="3" width="2.5" height="12" rx="0.5" />
    <rect x="12.4" y="5" width="2.5" height="10" rx="0.5" />
  </svg>
);

const IconDeepAnalysis = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const IconKnowData = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <circle cx="8" cy="8" r="6.5" />
    <line x1="8" y1="7" x2="8" y2="12" />
    <circle cx="8" cy="4.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const IconCreate = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1c0 3.866-3.134 7-7 7 3.866 0 7 3.134 7 7 0-3.866 3.134-7 7-7-3.866 0-7-3.134-7-7Z" />
  </svg>
);

interface Chip {
  id: string;
  label: string;
  icon: React.ReactNode;
  isNew?: boolean;
}

const CHIPS: Chip[] = [
  { id: 'quick-search', label: 'Quick search', icon: <IconQuickSearch /> },
  { id: 'deep-analysis', label: 'Deep analysis', icon: <IconDeepAnalysis /> },
  { id: 'know-your-data', label: 'Know your data', icon: <IconKnowData /> },
  { id: 'create-liveboards', label: 'Create Liveboards', icon: <IconCreate />, isNew: true },
];

const HomepageV5: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [openChip, setOpenChip] = useState<ChipId | null>(null);
  const [addKPIOpen, setAddKPIOpen] = useState(false);

  const handleChipClick = (chipId: string) => {
    if (chipId === 'create-liveboards') {
      setOpenChip(null);
      setView('spotterviz');
    } else {
      setOpenChip(prev => prev === chipId ? null : chipId as ChipId);
    }
  };

  if (view === 'spotterviz') {
    return <SpotterVizPage onBack={() => setView('home')} />;
  }

  return (
    <div className={styles.shell}>
      <TSHeader />
      <div className={styles.body}>
        <TSSidebar />
        <main className={styles.main}>
          <div className={styles.heroSection}>
            <h1 className={styles.heroTitle}>
              Lets <span className={styles.heroAccent}>make sense</span> of your data together.
            </h1>
            <SpotterBar />
            <div className={styles.chipsRow}>
              {CHIPS.map(chip => (
                <button
                  key={chip.id}
                  className={`${styles.chip} ${openChip === chip.id ? styles.chipActive : ''}`}
                  onClick={() => handleChipClick(chip.id)}
                >
                  {chip.icon}
                  <span>{chip.label}</span>
                  {chip.isNew && <span className={styles.newBadge}>New</span>}
                </button>
              ))}
            </div>
            {openChip && (
              <ChipDropdown chipId={openChip} onClose={() => setOpenChip(null)} />
            )}
          </div>

          <div className={styles.panelsSection}>
            <RecentsPanel />
            <WatchlistPanel onAddKPI={() => setAddKPIOpen(true)} />
          </div>
        </main>
      </div>

      {addKPIOpen && <AddKPIModal onClose={() => setAddKPIOpen(false)} />}
    </div>
  );
};

export default HomepageV5;
