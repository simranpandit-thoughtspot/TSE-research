import React, { useState, useRef, useEffect } from 'react';
import styles from './ImpersonationFlow.module.css';
import ProfilePage from './components/ProfilePage';
import PreferencesPage from './components/PreferencesPage';
import InboxPage from './components/InboxPage';
import ApproveRequestPage from './components/ApproveRequestPage';
import AdminView from './components/AdminView';
import AdminEmailPage from './components/AdminEmailPage';
import WalkthroughOverlay from './components/WalkthroughOverlay';

export type Persona = 'user' | 'admin';
export type ImpersonationPref = 'always-allow' | 'require-request';
export type UserView =
  | 'profile'
  | 'preferences'
  | 'inbox'
  | 'email-detail'
  | 'approve-request';

export interface ImpersonationState {
  pref: ImpersonationPref;
  requestStatus: 'none' | 'pending' | 'approved' | 'declined';
}

const TS_LOGO_PATH =
  'M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

/* ── Prototype Guide Modal ── */
const Step: React.FC<{ n: number; label: string; sub?: string }> = ({ n, label, sub }) => (
  <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
    <div style={{
      width: 20, height: 20, borderRadius: '50%', background: '#0F1729',
      color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: font,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
    }}>{n}</div>
    <div>
      <div style={{ fontSize: 13, color: '#1F2937', fontFamily: font, lineHeight: 1.4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11.5, color: '#6B7280', fontFamily: font, marginTop: 2 }}>{sub}</div>}
    </div>
  </div>
);

const ScenarioCard: React.FC<{ title: string; tag: string; tagColor: string; children: React.ReactNode }> = ({ title, tag, tagColor, children }) => (
  <div style={{
    flex: 1, border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden',
  }}>
    <div style={{ background: tagColor, padding: '12px 16px' }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', fontFamily: font, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>{tag}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', fontFamily: font }}>{title}</div>
    </div>
    <div style={{ padding: '16px 16px 4px' }}>{children}</div>
  </div>
);

const GuideModal: React.FC<{ onClose: () => void; onStartTour: () => void }> = ({ onClose, onStartTour }) => (
  <div className={styles.guideOverlay} onClick={onClose}>
    <div className={styles.guideModal} onClick={e => e.stopPropagation()}>

      {/* Header */}
      <div className={styles.guideHeader}>
        <div>
          <div className={styles.guideEyebrow}>Prototype guide</div>
          <h2 className={styles.guideTitle}>How to navigate this prototype</h2>
        </div>
        <button className={styles.guideClose} onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Intro */}
      <p className={styles.guideIntro}>
        This prototype simulates the "Act as user" (impersonation) feature from both perspectives.
        Use the <strong>Viewing as: User / Admin</strong> switcher in the top bar to jump between them at any point.
      </p>

      {/* Scenarios */}
      <div className={styles.guideScenarios}>
        <ScenarioCard tag="Scenario A" title="Admin can impersonate immediately" tagColor="#1D4ED8">
          <Step n={1} label="You're in User view" sub='Profile shows "Always allow admins to act as you" — the default setting.' />
          <Step n={2} label="Switch to Admin" sub='In User Management, click ⋮ next to Simran Pandit → "Act as user". Or click the name → User Details → "Act as user".' />
          <Step n={3} label="Session starts automatically" sub="A 1-second loading state leads into the impersonation session — Simran Pandit's home with a live timer in the nav." />
          <Step n={4} label="Exit the session" sub='Click the blue session button → "Exit session", or dismiss via the "End session" toast.' />
        </ScenarioCard>

        <ScenarioCard tag="Scenario B" title="Admin must request access first" tagColor="#6D28D9">
          <Step n={1} label="Switch to User → edit the preference" sub='On the profile page, click "Edit" next to Impersonation preference → select "Require access request" → Save.' />
          <Step n={2} label="Switch to Admin → send a request" sub='Click ⋮ next to Simran Pandit → "Act as user" → the request modal appears → click "Request access".' />
          <Step n={3} label="Switch to User → approve in Gmail" sub='A red dot appears on the Gmail tab. Click it → open the ThoughtSpot email → "View request" → Approve or Decline.' />
          <Step n={4} label="Switch back to Admin" sub='A notification dot appears on the Gmail tab and the bell icon. Click either → "Start session" → session begins.' />
        </ScenarioCard>
      </div>

      <div className={styles.guideFooter}>
        <button className={styles.guideTourBtn} onClick={() => { onClose(); onStartTour(); }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4.5 6.5l4-2.5v5L4.5 6.5z" fill="currentColor" />
          </svg>
          Take a tour
        </button>
        <button className={styles.guideStartBtn} onClick={onClose}>Start exploring</button>
      </div>
    </div>
  </div>
);

export const ImpersonationFlow: React.FC = () => {
  const [persona, setPersona] = useState<Persona>('user');
  const [userView, setUserView] = useState<UserView>('profile');
  const [impState, setImpState] = useState<ImpersonationState>({
    pref: 'always-allow',
    requestStatus: 'none',
  });
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [adminTab, setAdminTab] = useState<'thoughtspot' | 'gmail'>('thoughtspot');
  const [adminGmailView, setAdminGmailView] = useState<'inbox' | 'email'>('inbox');
  const [externalStartSession, setExternalStartSession] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [walkthroughActive, setWalkthroughActive] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handlePrefSave = (newPref: ImpersonationPref) => {
    setImpState(prev => ({ ...prev, pref: newPref }));
    setUserView('profile');
  };

  const handleApprove = () => {
    setImpState(prev => ({ ...prev, requestStatus: 'approved' }));
  };

  const handleDecline = () => {
    setImpState(prev => ({ ...prev, requestStatus: 'declined' }));
  };

  const renderUserContent = () => {
    switch (userView) {
      case 'profile':
        return (
          <ProfilePage
            pref={impState.pref}
            onEditPreferences={() => setUserView('preferences')}
          />
        );
      case 'preferences':
        return (
          <PreferencesPage
            pref={impState.pref}
            onSave={handlePrefSave}
            onCancel={() => setUserView('profile')}
          />
        );
      case 'inbox':
      case 'email-detail':
        return (
          <InboxPage
            view={userView}
            onViewEmail={() => setUserView('email-detail')}
            onViewRequest={() => setUserView('approve-request')}
          />
        );
      case 'approve-request':
        return (
          <ApproveRequestPage
            requestStatus={impState.requestStatus}
            onApprove={handleApprove}
            onDecline={handleDecline}
            onBackToEmailDetail={() => setUserView('email-detail')}
            onBackToInbox={() => setUserView('inbox')}
          />
        );
    }
  };

  return (
    <div className={styles.root}>
      {/* Global Header — hidden during impersonation session */}
      {!isImpersonating && <header className={styles.header}>
        <div className={styles.headerLeft}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="ThoughtSpot">
            <path d={TS_LOGO_PATH} fill="#ffffff" />
          </svg>
        </div>

        {/* Persona Switcher — center of nav */}
        <div className={styles.personaSwitcher} data-walkthrough="persona-switcher">
          <span className={styles.switcherLabel}>Viewing as:</span>
          <div className={styles.switcherPills}>
            <button
              className={`${styles.pill} ${persona === 'user' ? styles.pillActive : ''}`}
              onClick={() => { setPersona('user'); setUserView('profile'); }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="5" r="3" />
                <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6H2z" />
              </svg>
              User
            </button>
            <button
              className={`${styles.pill} ${persona === 'admin' ? styles.pillActive : ''}`}
              onClick={() => setPersona('admin')}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10.5 6h5L11.5 9.5l2 5L8 12l-5.5 2.5 2-5L.5 6h5z" />
              </svg>
              Admin
            </button>
          </div>
        </div>

        <div className={styles.headerRight}>
          {/* Guide */}
          <button className={styles.guideBtn} onClick={() => { setShowGuide(true); setWalkthroughActive(false); }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6 5.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="6" cy="3.75" r="0.65" fill="currentColor" />
            </svg>
            Guide
          </button>
          {/* Search */}
          <div className={styles.searchBar}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" />
              <path d="M9.5 9.5l2.5 2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: font }}>
              Search in your library
            </span>
          </div>
          {/* Help */}
          <button className={styles.iconBtn} aria-label="Help">
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: font, fontWeight: 600 }}>?</span>
          </button>
          {/* Notifications */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button
              className={styles.iconBtn}
              aria-label="Notifications"
              style={{ position: 'relative' }}
              onClick={() => persona === 'admin' ? setShowNotifs(v => !v) : undefined}
            >
              <svg width="16" height="14" viewBox="0 0 16 14" fill="rgba(255,255,255,0.8)">
                <path d="M14.809 11.7122C13.5183 11.0551 12.7668 9.7408 12.7668 8.28587V6.05578V5.8679C12.7668 3.45093 11.1004 1.69013 8.84765 1.22077V1.19717C8.84765 0.540043 8.30761 0 7.65048 0C6.99335 0 6.45331 0.540043 6.45331 1.19717V1.22077C4.20054 1.69001 2.53415 3.45086 2.53415 5.8679V6.05578V8.30855C2.53415 9.78711 1.73633 11.0315 0.44566 11.7586C0.187883 11.8993 0 12.275 0 12.6272C0 13.1437 0.422052 13.5893 0.962096 13.5893H14.387C14.9034 13.5893 15.3491 13.1672 15.3491 12.6272C15.3019 12.2288 15.0904 11.8529 14.809 11.7122Z" />
              </svg>
              {(persona === 'admin' && impState.requestStatus === 'approved') && <span className={styles.notifDot} />}
            </button>

            {/* Notification panel — admin only */}
            {showNotifs && persona === 'admin' && (
              <div className={styles.notifsPanel}>
                <div className={styles.notifsHeader}>
                  <span className={styles.notifsTitle}>Notifications</span>
                  <button className={styles.markAllRead}>Mark all as read</button>
                </div>

                {impState.requestStatus === 'approved' && (
                  <div className={styles.notifItem}>
                    <img src="https://i.pravatar.cc/32?img=47" className={styles.notifAvatar} alt="Simran Pandit" />
                    <div className={styles.notifBody}>
                      <div className={styles.notifText}>
                        Success! <strong>Simran Pandit</strong> approved your request.
                      </div>
                      <button
                        className={styles.notifAction}
                        onClick={() => { setExternalStartSession(true); setShowNotifs(false); }}
                      >
                        Start Session
                      </button>
                      <div className={styles.notifTime}>10 min ago</div>
                    </div>
                    <span className={styles.notifUnreadDot} />
                  </div>
                )}

                <div className={styles.notifItem}>
                  <div className={styles.notifIconCircle}>TS</div>
                  <div className={styles.notifBody}>
                    <div className={styles.notifText}>You subscribed to an alert for <strong>AI Highlights MAU</strong></div>
                    <div className={styles.notifSubText}>Condition: Changes by (%) 5</div>
                    <div className={styles.notifTime}>1 day ago</div>
                  </div>
                </div>

                <div className={styles.notifItem}>
                  <div className={styles.notifIconCircle}>TS</div>
                  <div className={styles.notifBody}>
                    <div className={styles.notifText}>Alert triggered for <strong>Lifetime sales</strong></div>
                    <div className={styles.notifSubText}>Latest value of KPI: 234.21</div>
                    <div className={styles.notifTime}>1 day ago</div>
                  </div>
                </div>

                <button className={styles.showAllNotifs}>Show all notifications</button>
              </div>
            )}
          </div>
          {/* User avatar chip */}
          <button className={styles.userChip}>
            <img
              src="https://i.pravatar.cc/32?img=47"
              alt="Eliška Pedersen"
              className={styles.avatarImg}
            />
            <span style={{ fontSize: 13, color: '#fff', fontFamily: font }}>
              {persona === 'user' ? 'Eliška Pedersen' : 'Admin User'}
            </span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>}

      {/* Browser tab bar — admin only, hidden during impersonation */}
      {persona === 'admin' && !isImpersonating && (
        <div className={styles.browserTabBar}>
          <button
            className={`${styles.browserTab} ${adminTab === 'thoughtspot' ? styles.browserTabActive : ''}`}
            onClick={() => setAdminTab('thoughtspot')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d={TS_LOGO_PATH} fill="currentColor" />
            </svg>
            ThoughtSpot
          </button>
          <button
            className={`${styles.browserTab} ${adminTab === 'gmail' ? styles.browserTabActive : ''}`}
            onClick={() => setAdminTab('gmail')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335" />
            </svg>
            Gmail
            {impState.requestStatus === 'approved' && adminTab !== 'gmail' && (
              <span className={styles.tabNotifDot} />
            )}
          </button>
          <div className={styles.tabBarPlus}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="#5F6368" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {/* Browser tab bar — user only */}
      {persona === 'user' && (
        <div className={styles.browserTabBar}>
          {/* ThoughtSpot tab */}
          <button
            className={`${styles.browserTab} ${(userView === 'profile' || userView === 'preferences') ? styles.browserTabActive : ''}`}
            onClick={() => setUserView('profile')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d={TS_LOGO_PATH} fill="currentColor" />
            </svg>
            ThoughtSpot
          </button>

          {/* Gmail tab */}
          <button
            className={`${styles.browserTab} ${(userView === 'inbox' || userView === 'email-detail' || userView === 'approve-request') ? styles.browserTabActive : ''}`}
            onClick={() => setUserView(impState.requestStatus !== 'none' ? 'inbox' : 'inbox')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335" />
            </svg>
            Gmail
            {impState.requestStatus === 'pending' && (
              <span className={styles.tabNotifDot} />
            )}
          </button>

          <div className={styles.tabBarPlus}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="#5F6368" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {/* Guide modal */}
      {showGuide && (
        <GuideModal
          onClose={() => setShowGuide(false)}
          onStartTour={() => setWalkthroughActive(true)}
        />
      )}

      {walkthroughActive && (
        <WalkthroughOverlay
          onDone={() => setWalkthroughActive(false)}
          onSwitchToAdmin={() => { setPersona('admin'); setAdminTab('thoughtspot'); }}
          onSwitchToUser={() => { setPersona('user'); setUserView('profile'); }}
          onStartSession={() => setExternalStartSession(true)}
        />
      )}

      {/* Content */}
      <div className={styles.content}>
        {persona === 'user' ? (
          renderUserContent()
        ) : adminTab === 'gmail' ? (
          <AdminEmailPage
            view={adminGmailView}
            onViewEmail={() => setAdminGmailView(v => v === 'inbox' ? 'email' : 'inbox')}
            onStartSession={() => {
              setAdminTab('thoughtspot');
              setAdminGmailView('inbox');
              setExternalStartSession(true);
            }}
          />
        ) : (
          <AdminView
            impPref={impState.pref}
            requestStatus={impState.requestStatus}
            startSession={externalStartSession}
            onSendRequest={() => {
              setImpState(prev => ({ ...prev, requestStatus: 'pending' }));
              setUserView('inbox');
            }}
            onSessionStart={() => {
              setIsImpersonating(true);
              setExternalStartSession(false);
            }}
            onSessionEnd={() => {
              setIsImpersonating(false);
              setExternalStartSession(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImpersonationFlow;
