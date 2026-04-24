import React, { useState, useEffect, useRef } from 'react';
import styles from './ImpersonationSession.module.css';

interface Props {
  onExit: () => void;
}

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const TS_LOGO_PATH =
  'M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z';

const formatTime = (s: number) => {
  const h = Math.floor(s / 3600).toString().padStart(2, '0');
  const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${h}:${m}:${sec}`;
};

/* ── Mini line chart for watchlist cards ── */
const MiniChart: React.FC = () => (
  <svg width="100%" height="44" viewBox="0 0 200 44" preserveAspectRatio="none" fill="none">
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0 38 C20 36 40 30 60 22 C80 14 100 18 120 12 C140 6 160 8 180 4 L200 2 L200 44 L0 44Z" fill="url(#chartGrad)" />
    <path d="M0 38 C20 36 40 30 60 22 C80 14 100 18 120 12 C140 6 160 8 180 4 L200 2" stroke="#10B981" strokeWidth="1.5" />
  </svg>
);

/* ── Watchlist card ── */
const WatchlistCard: React.FC<{ loading?: boolean }> = ({ loading }) => (
  <div className={styles.watchCard}>
    {loading ? (
      <div className={styles.skeletonCard}>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonValue}`} />
        <div className={`${styles.skeleton} ${styles.skeletonLine}`} />
        <div className={`${styles.skeleton} ${styles.skeletonChart}`} />
      </div>
    ) : (
      <>
        <div className={styles.cardTitle}>Top 3: TS Cloud WAU</div>
        <div className={styles.cardDate}>09/03/FY 2025</div>
        <div className={styles.cardValue}>$145.35M</div>
        <div className={styles.cardChange}>
          <span className={styles.changeUp}>↑ 6.9%</span>
          <span className={styles.changeLabel}> vs week of 18/06/FY 2024 (65.4K)</span>
        </div>
        <MiniChart />
        <div className={styles.cardFooter}>
          <div className={styles.cardFooterLabel}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="10" height="10" rx="2" stroke="#9CA3AF" strokeWidth="1.2" />
              <line x1="3" y1="4" x2="9" y2="4" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="3" y1="6.5" x2="9" y2="6.5" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="3" y1="9" x2="7" y2="9" stroke="#9CA3AF" strokeWidth="1" />
            </svg>
            Cloud Clusters
          </div>
          <img src="https://i.pravatar.cc/20?img=33" className={styles.cardAvatar} alt="" />
        </div>
      </>
    )}
  </div>
);

/* ── Session indicator button + popover ── */
const SessionIndicator: React.FC<{ elapsed: number; onExit: () => void }> = ({ elapsed, onExit }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        className={styles.sessionBtn}
        onClick={() => setOpen(v => !v)}
        aria-label="Session info"
        data-walkthrough="session-indicator"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="3" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.3" />
          <circle cx="8" cy="8" r="2.5" fill="#fff" />
          <path d="M1 6h14" stroke="#fff" strokeWidth="1" opacity="0.4" />
        </svg>
      </button>
      {open && (
        <div className={styles.sessionPopover}>
          <div className={styles.popoverActingAs}>Acting as</div>
          <div className={styles.popoverRow}>
            <span className={styles.popoverName}>&lt;Simran Pandit&gt;</span>
            <span className={styles.popoverTimer}>{formatTime(elapsed)}</span>
          </div>
          <button className={styles.popoverExitBtn} onClick={onExit}>
            Exit session
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Exit confirm modal ── */
const ExitModal: React.FC<{ onCancel: () => void; onConfirm: () => void }> = ({ onCancel, onConfirm }) => (
  <div className={styles.exitOverlay} onClick={onCancel}>
    <div className={styles.exitModal} onClick={e => e.stopPropagation()}>
      <h2 className={styles.exitTitle}>Exit viewing session</h2>
      <div className={styles.exitDivider} />
      <p className={styles.exitDesc}>
        You activity during the session has been saved and recorded. Are you sure you want to exit?
      </p>
      <div className={styles.exitActions}>
        <button className={styles.exitCancelBtn} onClick={onCancel}>Cancel</button>
        <button className={styles.exitConfirmBtn} onClick={onConfirm}>Exit</button>
      </div>
    </div>
  </div>
);

/* ── Main Component ── */
const ImpersonationSession: React.FC<Props> = ({ onExit }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      setToastVisible(true);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleExit = () => {
    setExitModalOpen(false);
    onExit();
  };

  return (
    <div className={styles.platform}>
        {/* Thin blue impersonation border */}
        <div className={styles.impersonationBorder} />

        {/* Top nav */}
        <header className={styles.platformNav}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d={TS_LOGO_PATH} fill="#fff" />
          </svg>
          <div style={{ flex: 1 }} />
          <div className={styles.navSearch}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" />
              <path d="M9.5 9.5l2.5 2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: font }}>Search in your library</span>
          </div>
          <button className={styles.navIconBtn}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: font, fontWeight: 600 }}>?</span>
          </button>
          <button className={styles.navIconBtn} style={{ position: 'relative' }}>
            <svg width="16" height="14" viewBox="0 0 16 14" fill="rgba(255,255,255,0.8)">
              <path d="M14.809 11.7122C13.5183 11.0551 12.7668 9.7408 12.7668 8.28587V6.05578V5.8679C12.7668 3.45093 11.1004 1.69013 8.84765 1.22077V1.19717C8.84765 0.540043 8.30761 0 7.65048 0C6.99335 0 6.45331 0.540043 6.45331 1.19717V1.22077C4.20054 1.69001 2.53415 3.45086 2.53415 5.8679V6.05578V8.30855C2.53415 9.78711 1.73633 11.0315 0.44566 11.7586C0.187883 11.8993 0 12.275 0 12.6272C0 13.1437 0.422052 13.5893 0.962096 13.5893H14.387C14.9034 13.5893 15.3491 13.1672 15.3491 12.6272C15.3019 12.2288 15.0904 11.8529 14.809 11.7122Z" />
            </svg>
            <span className={styles.navNotifDot} />
          </button>
          <button className={styles.userChip}>
            <img src="https://i.pravatar.cc/28?img=47" alt="Simran Pandit" className={styles.navAvatar} />
            <span style={{ fontSize: 13, color: '#fff', fontFamily: font }}>Simran Pandit</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          {/* Session indicator */}
          {!isLoading && (
            <SessionIndicator elapsed={elapsed} onExit={() => setExitModalOpen(true)} />
          )}
        </header>

        {/* Body */}
        <div className={styles.platformBody}>
          {/* Sidebar */}
          <aside className={styles.platformSidebar}>
            <div className={styles.sidebarIcons}>
              <button className={`${styles.sidebarIcon} ${styles.sidebarIconActive}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="7" width="3" height="8" rx="1" fill="rgba(255,255,255,0.85)" />
                  <rect x="6" y="4" width="3" height="11" rx="1" fill="rgba(255,255,255,0.85)" />
                  <rect x="11" y="1" width="3" height="14" rx="1" fill="rgba(255,255,255,0.85)" />
                </svg>
              </button>
              {[
                <svg key="d" width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="5" rx="6" ry="2" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" /><path d="M2 5v4c0 1.1 2.69 2 6 2s6-.9 6-2V5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" /><path d="M2 9v3c0 1.1 2.69 2 6 2s6-.9 6-2V9" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" /></svg>,
                <svg key="c" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 3l-3 5 3 5M12 3l3 5-3 5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.3" strokeLinecap="round" /></svg>,
                <svg key="s" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" /><circle cx="8" cy="8" r="2.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" /></svg>,
              ].map((icon, i) => (
                <button key={i} className={styles.sidebarIcon}>{icon}</button>
              ))}
            </div>
            <div className={styles.sidebarContent}>
              <div className={styles.sidebarHeading}>
                Insights
                <button className={styles.sidebarAdd}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M2 7h10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {['Home', 'Spotter', 'Search data'].map(item => (
                <div key={item} className={`${styles.sidebarItem} ${item === 'Home' ? styles.sidebarItemActive : ''}`}>{item}</div>
              ))}
              <div className={styles.sidebarSection}>LIBRARY</div>
              {['Liveboards', 'Answers'].map(item => (
                <div key={item} className={styles.sidebarItem}>{item}</div>
              ))}
              <div className={styles.sidebarSection}>ANALYSIS & ALERTS</div>
              {['Subscriptions', 'SpotIQ analysis'].map(item => (
                <div key={item} className={styles.sidebarItem}>{item}</div>
              ))}
              <div className={styles.sidebarSection}>FAVOURITES</div>
              {['Retails Sales', 'Total sales, Total quantity pu...', 'Cloud Clusters', 'Sales by state and region', 'Retails Sales'].map((item, i) => (
                <div key={i} className={styles.sidebarItem}>{item}</div>
              ))}
              <button className={styles.showMore}>Show more</button>
            </div>
          </aside>

          {/* Main content */}
          <main className={styles.platformMain}>
            <h1 className={styles.contentTitle}>Spotter</h1>

            {isLoading ? (
              <div className={styles.loadingDots}>
                <span className={styles.dot} style={{ animationDelay: '0ms' }} />
                <span className={styles.dot} style={{ animationDelay: '160ms' }} />
                <span className={styles.dot} style={{ animationDelay: '320ms' }} />
              </div>
            ) : (
              <div className={styles.spotterBar}>
                <div className={styles.spotterDataSource}>
                  Retail-Apparel
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
                <div className={styles.spotterInput}>Ask a business question in natural language</div>
                <button className={styles.askBtn}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Ask Spotter
                </button>
              </div>
            )}

            {/* Watchlist */}
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Watchlist</h2>
              <button className={styles.sectionAction}>+ Add to Watchlist</button>
            </div>
            <div className={styles.watchlistRow}>
              <WatchlistCard loading={isLoading} />
              <WatchlistCard loading={isLoading} />
              <WatchlistCard loading={isLoading} />
              <div className={styles.watchCardClipped}>
                <WatchlistCard loading={isLoading} />
              </div>
              {!isLoading && (
                <button className={styles.watchNext}>
                  <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                    <path d="M2 2l6 6-6 6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>

            {/* Library */}
            {!isLoading && (
              <>
                <div className={styles.sectionHeader} style={{ marginTop: 24 }}>
                  <h2 className={styles.sectionTitle}>Library</h2>
                  <div className={styles.libraryTabs}>
                    <button className={`${styles.libTab} ${styles.libTabActive}`}>All</button>
                    <button className={styles.libTab}>Yours</button>
                  </div>
                  <div style={{ flex: 1 }} />
                  <button className={styles.sectionAction}>All Liveboards</button>
                  <button className={styles.sectionAction}>All Answers</button>
                </div>
                <div className={styles.libraryFilters}>
                  <div className={styles.libSearch}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="5" cy="5" r="3.5" stroke="#9CA3AF" strokeWidth="1.2" />
                      <path d="M8 8l2 2" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <input placeholder="Search" className={styles.libSearchInput} readOnly />
                  </div>
                  <div className={styles.authorChip}>Author <strong>Anje Keizer</strong></div>
                </div>
                <table className={styles.libTable}>
                  <thead>
                    <tr>
                      <th className={styles.libTh}>Type</th>
                      <th className={styles.libTh}></th>
                      <th className={styles.libTh}>Name</th>
                      <th className={styles.libTh}>Tags</th>
                      <th className={styles.libTh}>Author</th>
                      <th className={styles.libTh}>Last viewed ↑</th>
                      <th className={styles.libTh}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.libTd}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 7m-5 0a5 5 0 1010 0 5 5 0 00-10 0" stroke="#9CA3AF" strokeWidth="1.2" /><path d="M7 2v5l3 2" stroke="#9CA3AF" strokeWidth="1.2" /></svg></td>
                      <td className={styles.libTd}>—</td>
                      <td className={styles.libTd}><span className={styles.libName}>Retails Sales</span></td>
                      <td className={styles.libTd}><span className={styles.libTag}>Customer success</span></td>
                      <td className={styles.libTd}><span className={styles.libAuthor}><img src="https://i.pravatar.cc/20?img=33" className={styles.libAvatar} alt="" /> Anje Keizer</span></td>
                      <td className={styles.libTd} style={{ color: '#6B7280' }}>1 day ago</td>
                      <td className={styles.libTd}><button className={styles.shareBtn}>Share</button></td>
                    </tr>
                    <tr>
                      <td className={styles.libTd}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="#9CA3AF" strokeWidth="1.2" /><path d="M4 4h6M4 7h4" stroke="#9CA3AF" strokeWidth="1.1" strokeLinecap="round" /></svg></td>
                      <td className={styles.libTd}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#2563EB" /><path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg></td>
                      <td className={styles.libTd}><span className={styles.libName}>Sales</span></td>
                      <td className={styles.libTd}><span className={styles.libTag}>sales</span><span className={styles.libTag}>pipeline</span></td>
                      <td className={styles.libTd}><span className={styles.libAuthor}><img src="https://i.pravatar.cc/20?img=33" className={styles.libAvatar} alt="" /> Anje Keizer</span></td>
                      <td className={styles.libTd} style={{ color: '#6B7280' }}>7 days ago</td>
                      <td className={styles.libTd}><button className={styles.shareBtn}>Share</button></td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}

            {isLoading && (
              <div style={{ marginTop: 24 }}>
                <div className={styles.sectionHeader}>
                  <div className={`${styles.skeleton} ${styles.skeletonTitle}`} style={{ width: 80, height: 20 }} />
                </div>
                <div className={styles.watchlistRow}>
                  <WatchlistCard loading />
                  <WatchlistCard loading />
                  <WatchlistCard loading />
                  <div className={styles.watchCardClipped}><WatchlistCard loading /></div>
                </div>
              </div>
            )}
          </main>
        </div>

      {/* Session toast */}
      {toastVisible && (
        <div className={styles.sessionToast}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.3" />
            <circle cx="8" cy="8" r="2.5" fill="#fff" />
          </svg>
          <span style={{ fontFamily: font, fontSize: 13, color: '#fff' }}>
            You are now acting as <strong>&lt;Simran Pandit&gt;</strong>.
          </span>
          <button className={styles.endSessionBtn} onClick={() => setExitModalOpen(true)}>
            End session
          </button>
          <button className={styles.toastClose} onClick={() => setToastVisible(false)}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Exit modal */}
      {exitModalOpen && (
        <ExitModal onCancel={() => setExitModalOpen(false)} onConfirm={handleExit} />
      )}
    </div>
  );
};

export default ImpersonationSession;
