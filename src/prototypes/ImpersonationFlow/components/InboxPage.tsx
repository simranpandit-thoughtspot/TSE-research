import React from 'react';
import styles from './InboxPage.module.css';
import { UserView } from '../ImpersonationFlow';

interface Props {
  view: UserView;
  onViewEmail: () => void;
  onViewRequest: () => void;
}

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const TS_LOGO_PATH =
  'M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z';

const InboxSidebar = () => (
  <div className={styles.gmailSidebar}>
    <button className={styles.composeBtn}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="#444746">
        <path d="M2 2h12v10H2V2z" stroke="#444746" strokeWidth="1.2" fill="none" />
        <path d="M4 5h8M4 7.5h6M4 10h4" stroke="#444746" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      Compose
    </button>
    {['Inbox', 'Starred', 'Snoozed', 'Sent', 'Drafts'].map((item) => (
      <div key={item} className={`${styles.sidebarItem} ${item === 'Inbox' ? styles.sidebarItemActive : ''}`}>
        <span>{item}</span>
        {item === 'Inbox' && <span className={styles.badge}>1,909</span>}
        {item === 'Drafts' && <span className={styles.badge}>5</span>}
      </div>
    ))}
    <div className={styles.sidebarMore}>
      <span>∨ More</span>
    </div>
    <div className={styles.sidebarSection}>Labels</div>
    <button className={styles.addLabel}>＋</button>
  </div>
);

const EmailListItem: React.FC<{ isNew?: boolean; onClick?: () => void }> = ({ isNew, onClick }) => (
  <div
    className={`${styles.emailListItem} ${isNew ? styles.emailListItemUnread : ''}`}
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : undefined }}
  >
    <div className={styles.emailAvatar}>
      <div className={styles.avatarCircle}>TS</div>
    </div>
    <div className={styles.emailMeta}>
      <div className={styles.emailSender}>ThoughtSpot Notifications</div>
      <div className={styles.emailSubject}>
        {isNew && <span className={styles.unreadDot} />}
        Authorization Required: Viewing Access Request for Your Account
      </div>
      <div className={styles.emailSnippet}>
        Administrator has requested permission to act as you within the system.
      </div>
    </div>
    <div className={styles.emailTime}>Feb 19</div>
  </div>
);

const EmailDetail: React.FC<{ onViewRequest: () => void }> = ({ onViewRequest }) => (
  <div className={styles.emailDetail}>
    <div className={styles.emailDetailHeader}>
      <h2 className={styles.emailDetailSubject}>
        Authorization Required: Viewing Access Request for Your Account
      </h2>
      <div className={styles.emailDetailMeta}>
        <div className={styles.emailDetailFrom}>
          <div className={styles.avatarCircle} style={{ width: 36, height: 36, fontSize: 12 }}>TS</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#202124', fontFamily: font }}>
              ThoughtSpot Notifications
            </div>
            <div style={{ fontSize: 12, color: '#5F6368', fontFamily: font }}>
              &lt;notification@notification.thoughtspot.com&gt;
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#5F6368', fontFamily: font }}>Feb 19, 2026, 5:19 PM</div>
      </div>
    </div>

    {/* Email body */}
    <div className={styles.emailBody}>
      <div className={styles.emailCard}>
        {/* Logo */}
        <div className={styles.emailLogo}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d={TS_LOGO_PATH} fill="#0F1729" />
          </svg>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#0F1729', fontFamily: font }}>ThoughtSpot</span>
        </div>

        <h1 className={styles.emailHeadline}>
          Administrator has requested permission to act as you within the system.
        </h1>

        <button className={styles.viewRequestBtn} onClick={onViewRequest}>
          View request
        </button>

        <div className={styles.emailSection}>
          <div className={styles.emailSectionTitle}>WHAT THIS MEANS:</div>
          <ul className={styles.emailList}>
            <li>If approved, the admin will be able to access your account in your exact role context and perform actions based on your current permissions (including create, read, update, and delete operations).</li>
            <li>All actions performed during this session will be securely logged and attributed to the administrator for audit purposes.</li>
            <li>Approving this request will also enable admins to act as you. This setting can later be updated under Profile {'>'} Preferences {'>'} Allow admin to act as you.</li>
          </ul>
          <p style={{ fontSize: 13, color: '#444', fontFamily: font, marginTop: 12 }}>
            If you have any questions, please contact your system administrator.{' '}
            <a href="#" className={styles.emailLink} onClick={e => e.preventDefault()}>Contact us →</a>
          </p>
        </div>

        <div className={styles.emailSection}>
          <div className={styles.emailSectionTitle}>WHY THIS MAY BE NEEDED:</div>
          <p style={{ fontSize: 13, color: '#444', fontFamily: font, lineHeight: 1.6 }}>
            This is typically requested for troubleshooting, support, configuration validation, or investigating access-related issues.
          </p>
          <p style={{ fontSize: 13, color: '#444', fontFamily: font, marginTop: 8 }}>
            If you have any questions, please contact your system administrator.{' '}
            <a href="#" className={styles.emailLink} onClick={e => e.preventDefault()}>Contact us →</a>
          </p>
        </div>

        <div className={styles.expiryBox}>
          If no action is taken, the request will expire after <strong>Aug 4, 2024, 5:19 PM</strong>.
        </div>

        <div className={styles.emailFooter}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, fontFamily: font }}>Data at your fingertips with ThoughtSpot mobile app</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="#" className={styles.emailLink} onClick={e => e.preventDefault()}>📱 ThoughtSpot for Android</a>
            <a href="#" className={styles.emailLink} onClick={e => e.preventDefault()}>📱 ThoughtSpot for iOS</a>
          </div>
        </div>

        <div className={styles.emailFooterAddress}>
          <strong>Thoughtspot</strong><br />
          (800) 508-7008<br />
          444 Castro St, Suite 1000 Mountain View, CA 94041<br />
          <a href="#" className={styles.emailLink} onClick={e => e.preventDefault()}>Privacy Policy</a>
          {' | '}
          <a href="#" className={styles.emailLink} onClick={e => e.preventDefault()}>Contact support</a>
        </div>
      </div>
    </div>
  </div>
);

const InboxPage: React.FC<Props> = ({ view, onViewEmail, onViewRequest }) => {
  return (
    <div className={styles.gmailShell}>
      {/* Gmail-like top bar */}
      <div className={styles.gmailHeader}>
        <div className={styles.gmailLogo}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#EA4335">
            <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span className={styles.gmailWordmark}>Gmail</span>
        </div>
        <div className={styles.gmailSearch}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="#5F6368" strokeWidth="1.4" />
            <path d="M10.5 10.5l3 3" stroke="#5F6368" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input className={styles.gmailSearchInput} placeholder="Search mail" readOnly />
        </div>
        <div className={styles.gmailActions}>
          <div className={styles.gmailAvatar}>R</div>
        </div>
      </div>

      <div className={styles.gmailBody}>
        <InboxSidebar />

        {/* Email list / detail pane */}
        {view === 'inbox' ? (
          <div className={styles.emailList}>
            <div className={styles.emailListHeader}>
              <span style={{ fontSize: 13, color: '#444', fontFamily: font }}>Primary</span>
            </div>
            <EmailListItem isNew onClick={onViewEmail} />
            {/* Filler items */}
            {[1, 2, 3, 4].map(i => (
              <EmailListItem key={i} />
            ))}
          </div>
        ) : (
          <div className={styles.emailDetailPane}>
            <button className={styles.backBtn} onClick={onViewEmail}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <EmailDetail onViewRequest={onViewRequest} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
