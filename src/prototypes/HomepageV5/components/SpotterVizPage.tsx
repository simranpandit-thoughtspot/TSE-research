import React from 'react';
import styles from './SpotterVizPage.module.css';

const TS_LOGO_WHITE = 'M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z';

const IconAdd = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="6" y1="1" x2="6" y2="11" /><line x1="1" y1="6" x2="11" y2="6" />
  </svg>
);

const IconChevron = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2.5 4.5 6 8l3.5-3.5" />
  </svg>
);

const IconSparkles = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1c0 3.866-3.134 7-7 7 3.866 0 7 3.134 7 7 0-3.866 3.134-7 7-7-3.866 0-7-3.134-7-7Z" />
  </svg>
);

const IconPalette = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
    <circle cx="8" cy="8" r="6.5" />
    <circle cx="5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="8" cy="5" r="1" fill="currentColor" stroke="none" />
    <circle cx="11" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2.5l2.5 2.5L4 12.5H1.5V10L9 2.5Z" />
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
  </svg>
);

const SUGGESTION_CHIPS = [
  { label: 'Goal of liveboard', icon: '⊞' },
  { label: 'Define persona', icon: '👤' },
  { label: 'Explain trends', icon: '📊' },
  { label: 'Highlight risks', icon: '⚠' },
];

interface Props {
  onBack: () => void;
}

const SpotterVizPage: React.FC<Props> = ({ onBack }) => (
  <div className={styles.page}>
    {/* Dark top bar */}
    <div className={styles.topBar}>
      <div className={styles.logo} onClick={onBack} title="Back to Home">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-label="ThoughtSpot">
          <path d={TS_LOGO_WHITE} fill="white" />
        </svg>
      </div>

      <div className={styles.topBarCenter}>
        <div className={styles.tabGroup}>
          <button className={styles.tabBtn}>
            <IconAdd />
            Add
            <IconChevron />
          </button>
          <div className={styles.tabDivider} />
          <button className={styles.tabBtn}>
            <IconPalette />
            Styling
          </button>
          <div className={styles.tabDivider} />
          <button className={`${styles.tabBtn} ${styles.tabBtnActive}`}>
            <IconSparkles />
            SpotterViz
          </button>
        </div>
      </div>

      <div className={styles.topBarRight}>
        <button className={styles.cancelBtn} onClick={onBack}>Cancel</button>
        <button className={styles.saveBtn}>Save</button>
      </div>
    </div>

    {/* Title bar */}
    <div className={styles.titleBar}>
      <span className={styles.boardTitle}>New Liveboard</span>
      <button className={styles.editBtn} aria-label="Rename">
        <IconEdit />
      </button>
    </div>

    {/* Canvas */}
    <div className={styles.canvas}>
      <div className={styles.emptyState}>
        <div className={styles.mascot}>🐾</div>
        <h2 className={styles.emptyTitle}>Turn ideas into Liveboards</h2>

        <div className={styles.promptBox}>
          <div className={styles.promptInput}>
            Define your liveboard&apos;s target audience...
          </div>
          <div className={styles.promptToolbar}>
            <button className={styles.promptPlusBtn} aria-label="Add">+</button>
            <button className={styles.promptSend} aria-label="Send">
              <IconSend />
            </button>
          </div>
        </div>

        <div className={styles.suggestionChips}>
          {SUGGESTION_CHIPS.map((chip, i) => (
            <button key={i} className={styles.suggestionChip}>
              <span>{chip.icon}</span>
              {chip.label}
            </button>
          ))}
        </div>

        <div className={styles.bottomHint}>
          Or add Answers and pin here.{' '}
          <span className={styles.bottomHintLink}>Add Answer</span>
        </div>
      </div>
    </div>
  </div>
);

export default SpotterVizPage;
