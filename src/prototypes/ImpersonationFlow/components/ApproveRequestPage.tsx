import React, { useState } from 'react';
import styles from './ApproveRequestPage.module.css';

type RequestStatus = 'none' | 'pending' | 'approved' | 'declined';

interface Props {
  requestStatus: RequestStatus;
  onApprove: () => void;
  onDecline: () => void;
  onBackToEmailDetail: () => void;
  onBackToInbox: () => void;
}

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const TS_LOGO_PATH =
  'M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z';

/* ── Simulated browser chrome ──────────────────────────────────────────────── */
const BrowserChrome: React.FC<{
  onGmailTabClick: () => void;
  onCloseTab: () => void;
}> = ({ onGmailTabClick, onCloseTab }) => (
  <div className={styles.browserChrome}>
    {/* Traffic lights */}
    <div className={styles.trafficLights}>
      <span className={styles.tlRed} onClick={onCloseTab} title="Close tab" />
      <span className={styles.tlYellow} />
      <span className={styles.tlGreen} />
    </div>

    {/* Tab bar */}
    <div className={styles.tabBar}>
      {/* Inactive Gmail tab */}
      <button className={styles.inactiveTab} onClick={onGmailTabClick}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335" />
        </svg>
        <span className={styles.tabLabel}>Gmail – Inbox</span>
      </button>

      {/* Active ThoughtSpot tab */}
      <div className={styles.activeTab}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d={TS_LOGO_PATH} fill="#0F1729" />
        </svg>
        <span className={styles.tabLabel}>ThoughtSpot</span>
        <button className={styles.closeTabBtn} onClick={onCloseTab} aria-label="Close tab">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2L2 8" stroke="#5F6368" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={styles.tabBarNew}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2v10M2 7h10" stroke="#5F6368" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    </div>

    {/* Address bar row */}
    <div className={styles.addressRow}>
      <div className={styles.navBtns}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="#D1D5DB" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13 8A5 5 0 113 8" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
      <div className={styles.addressBar}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="4" width="10" height="7" rx="1.5" stroke="#9CA3AF" strokeWidth="1.2" />
          <path d="M4 4V3a2 2 0 014 0v1" stroke="#9CA3AF" strokeWidth="1.2" />
        </svg>
        <span style={{ fontSize: 13, color: '#374151', fontFamily: font }}>thoughtspot.com</span>
      </div>
      <div className={styles.addressActions}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1l1.8 4h4.2l-3.4 2.5L12 12 8 9.5 4 12l1.4-4.5L2 5h4.2z" stroke="#9CA3AF" strokeWidth="1.2" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="#9CA3AF" strokeWidth="1.2" />
          <path d="M8 5v4l2 2" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="4.5" cy="8" r="1" fill="#9CA3AF" />
          <circle cx="8" cy="8" r="1" fill="#9CA3AF" />
          <circle cx="11.5" cy="8" r="1" fill="#9CA3AF" />
        </svg>
      </div>
    </div>
  </div>
);

/* ── Loading dots ── */
const LoadingDots: React.FC = () => (
  <div className={styles.dotsWrap}>
    <span className={styles.dot} style={{ animationDelay: '0ms' }} />
    <span className={styles.dot} style={{ animationDelay: '160ms' }} />
    <span className={styles.dot} style={{ animationDelay: '320ms' }} />
  </div>
);

/* ── Success / Decline icons ── */
const SuccessIcon: React.FC = () => (
  <div className={styles.iconWrap}>
    <div className={styles.successBurst}>
      {[...Array(12)].map((_, i) => (
        <span key={i} className={styles.burstRay} style={{ transform: `rotate(${i * 30}deg)` }} />
      ))}
    </div>
    <div className={styles.successCircle}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 14l6 6 10-11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
);

const DeclineIcon: React.FC = () => (
  <div className={styles.iconWrap}>
    <div className={styles.declineBurst}>
      {[...Array(12)].map((_, i) => (
        <span key={i} className={styles.burstRayRed} style={{ transform: `rotate(${i * 30}deg)` }} />
      ))}
    </div>
    <div className={styles.declineCircle}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M8 8l12 12M20 8L8 20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);

/* ── Main component ── */
const ApproveRequestPage: React.FC<Props> = ({
  requestStatus,
  onApprove,
  onDecline,
  onBackToEmailDetail,
  onBackToInbox,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onApprove();
    }, 800);
  };

  const handleDecline = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onDecline();
    }, 800);
  };

  const showResult = requestStatus === 'approved' || requestStatus === 'declined';

  return (
    <div className={styles.browserFrame}>
      <BrowserChrome
        onGmailTabClick={onBackToEmailDetail}
        onCloseTab={onBackToInbox}
      />

      <div className={styles.page}>
        {/* Minimal ThoughtSpot header */}
        <header className={styles.pageHeader}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d={TS_LOGO_PATH} fill="#0F1729" />
          </svg>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#0F1729', fontFamily: font }}>
            ThoughtSpot
          </span>
        </header>

        {/* Center content */}
        <div className={styles.center}>
          {isLoading ? (
            <>
              <h1 className={styles.heading}>Approve 'act as' request</h1>
              <p className={styles.subtitle}>
                All actions performed during this session will be securely logged and attributed to the administrator for audit purposes.
              </p>
              <LoadingDots />
            </>
          ) : showResult ? (
            <>
              {requestStatus === 'approved' ? <SuccessIcon /> : <DeclineIcon />}
              <h1 className={styles.resultHeading}>
                {requestStatus === 'approved' ? 'Request approved' : 'Request declined'}
              </h1>
              <div className={styles.resultActions}>
                <button className={styles.backToGmailBtn} onClick={onBackToEmailDetail}>
                  Go back to Gmail
                </button>
                <button className={styles.closeTabLink} onClick={onBackToInbox}>
                  Close tab
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className={styles.heading}>Approve 'act as' request</h1>
              <p className={styles.subtitle}>
                All actions performed during this session will be securely logged and attributed to the administrator for audit purposes.
              </p>
              <button className={styles.approveBtn} onClick={handleApprove}>
                Approve request
              </button>
              <button className={styles.declineLink} onClick={handleDecline}>
                Decline request
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <span>ThoughtSpot</span>
          <span>(800) 508-7008</span>
          <span>444 Castro St, Suite 1000 Mountain View, CA 94041</span>
          <span>
            <a href="#" className={styles.footerLink} onClick={e => e.preventDefault()}>Privacy Policy</a>
            {' | '}
            <a href="#" className={styles.footerLink} onClick={e => e.preventDefault()}>Manage Notification Preferences</a>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default ApproveRequestPage;
