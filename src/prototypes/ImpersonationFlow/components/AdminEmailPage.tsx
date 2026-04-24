import React from 'react';
import inboxStyles from './InboxPage.module.css';

interface Props {
  view: 'inbox' | 'email';
  onViewEmail: () => void;
  onStartSession: () => void;
}

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const TS_LOGO_PATH =
  'M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z';

const ApprovalEmailBody: React.FC<{ onStartSession: () => void }> = ({ onStartSession }) => (
  <div style={{ padding: '32px', fontFamily: font }}>
    {/* TS Logo */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 36 }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d={TS_LOGO_PATH} fill="#0F1729" />
      </svg>
      <span style={{ fontSize: 17, fontWeight: 700, color: '#0F1729', fontFamily: font }}>ThoughtSpot</span>
    </div>

    {/* Headline */}
    <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', lineHeight: 1.3, margin: '0 0 28px', maxWidth: 520, fontFamily: font }}>
      &lt;Simran Pandit&gt; has approved your request to act on their behalf
    </h1>

    {/* Expiry box */}
    <div style={{ background: '#F3F4F6', borderRadius: 8, padding: '14px 18px', marginBottom: 36, fontSize: 14, color: '#374151', lineHeight: 1.5, fontFamily: font }}>
      If no action is taken, this approval will expire by <strong>Aug 4, 2024, 5:19 PM</strong>.
    </div>

    {/* Start session button — gradient border */}
    <div style={{ marginBottom: 44 }}>
      <div style={{
        display: 'inline-block',
        padding: 2,
        background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #f97316 100%)',
        borderRadius: 999,
      }}>
        <button
          onClick={onStartSession}
          style={{
            background: '#0F1729', color: '#fff', border: 'none', borderRadius: 999,
            padding: '13px 52px', fontSize: 15, fontWeight: 600, fontFamily: font, cursor: 'pointer', display: 'block',
          }}
        >
          Start session
        </button>
      </div>
    </div>

    {/* What this means */}
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 12, fontFamily: font }}>
        WHAT THIS MEANS:
      </div>
      <ul style={{ margin: 0, paddingLeft: 20, color: '#374151', fontSize: 14, lineHeight: 1.75, fontFamily: font }}>
        <li style={{ marginBottom: 6 }}>You will access the system in Simran's role context and can perform actions based on their permissions.</li>
        <li>All actions will be securely logged and attributed to you for audit purposes.</li>
      </ul>
    </div>

    {/* Contact */}
    <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 40, lineHeight: 1.6, fontFamily: font }}>
      If you have any questions, please contact your system administrator.{' '}
      <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }} onClick={e => e.preventDefault()}>Contact us →</a>
    </p>

    <div style={{ height: 1, background: '#E5E7EB', marginBottom: 28 }} />

    {/* Mobile app */}
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 8, fontFamily: font }}>Data at your fingertips with ThoughtSpot mobile app</div>
      <div style={{ display: 'flex', gap: 24 }}>
        <a href="#" style={{ color: '#2563EB', fontSize: 13, textDecoration: 'none', fontFamily: font }} onClick={e => e.preventDefault()}>📱 ThoughtSpot for Android</a>
        <a href="#" style={{ color: '#2563EB', fontSize: 13, textDecoration: 'none', fontFamily: font }} onClick={e => e.preventDefault()}>iOS ThoughtSpot for iOS</a>
      </div>
    </div>

    <div style={{ height: 1, background: '#E5E7EB', marginBottom: 20 }} />

    <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.7, marginBottom: 12, fontFamily: font }}>
      You are receiving this email because you are subscribed to threshold alert on Thoughtspot
    </p>
    <div style={{ marginBottom: 20 }}>
      <a href="#" style={{ fontSize: 12, color: '#2563EB', textDecoration: 'none', fontFamily: font }} onClick={e => e.preventDefault()}>Modify Alert</a>
      <span style={{ color: '#9CA3AF', fontSize: 12 }}> | </span>
      <a href="#" style={{ fontSize: 12, color: '#2563EB', textDecoration: 'none', fontFamily: font }} onClick={e => e.preventDefault()}>Unsubscribe</a>
    </div>
    <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.8, fontFamily: font }}>
      <strong style={{ color: '#374151' }}>Thoughtspot</strong><br />
      (800) 508-7008<br />
      444 Castro St, Suite 1000 Mountain View, CA 94041<br />
      <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }} onClick={e => e.preventDefault()}>Privacy Policy</a>
      {' | '}
      <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }} onClick={e => e.preventDefault()}>Contact support</a>
    </div>
  </div>
);

const FILLER_EMAILS = [
  { sender: 'Google', subject: 'Security alert', snippet: 'A new sign-in to your Google Account', time: 'Feb 18', initials: 'G', bg: '#4285F4' },
  { sender: 'LinkedIn', subject: 'New connection request', snippet: 'Someone wants to connect with you', time: 'Feb 17', initials: 'in', bg: '#0A66C2' },
  { sender: 'Slack', subject: 'You have unread messages', snippet: '3 unread messages in #general', time: 'Feb 16', initials: 'S', bg: '#4A154B' },
  { sender: 'Atlassian', subject: 'Confluence: page updated', snippet: 'Admin Settings page was updated', time: 'Feb 14', initials: 'A', bg: '#0052CC' },
];

const AdminEmailPage: React.FC<Props> = ({ view, onViewEmail, onStartSession }) => (
  <div className={inboxStyles.gmailShell}>
    {/* Gmail header */}
    <div className={inboxStyles.gmailHeader}>
      <div className={inboxStyles.gmailLogo}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#EA4335">
          <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <span className={inboxStyles.gmailWordmark}>Gmail</span>
      </div>
      <div className={inboxStyles.gmailSearch}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="4.5" stroke="#5F6368" strokeWidth="1.4" />
          <path d="M10.5 10.5l3 3" stroke="#5F6368" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input className={inboxStyles.gmailSearchInput} placeholder="Search mail" readOnly />
      </div>
      <div className={inboxStyles.gmailActions}>
        <div className={inboxStyles.gmailAvatar} style={{ background: '#1D4ED8' }}>A</div>
      </div>
    </div>

    <div className={inboxStyles.gmailBody}>
      {/* Sidebar */}
      <div className={inboxStyles.gmailSidebar}>
        <button className={inboxStyles.composeBtn}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#444746">
            <path d="M2 2h12v10H2V2z" stroke="#444746" strokeWidth="1.2" fill="none" />
            <path d="M4 5h8M4 7.5h6M4 10h4" stroke="#444746" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Compose
        </button>
        {[
          { label: 'Inbox', badge: '99+' },
          { label: 'Starred' },
          { label: 'Snoozed' },
          { label: 'Sent' },
          { label: 'Drafts', badge: '5' },
        ].map(({ label, badge }) => (
          <div key={label} className={`${inboxStyles.sidebarItem} ${label === 'Inbox' ? inboxStyles.sidebarItemActive : ''}`}>
            <span>{label}</span>
            {badge && <span className={inboxStyles.badge}>{badge}</span>}
          </div>
        ))}
        <div className={inboxStyles.sidebarMore}><span>∨ More</span></div>
        <div className={inboxStyles.sidebarSection}>Labels</div>
        <button className={inboxStyles.addLabel}>＋</button>
      </div>

      {/* Email pane */}
      {view === 'inbox' ? (
        <div className={inboxStyles.emailList}>
          <div className={inboxStyles.emailListHeader}>
            <span style={{ fontSize: 13, color: '#444', fontFamily: font }}>Primary</span>
          </div>

          {/* Unread approval email */}
          <div
            className={`${inboxStyles.emailListItem} ${inboxStyles.emailListItemUnread}`}
            onClick={onViewEmail}
            style={{ cursor: 'pointer' }}
          >
            <div className={inboxStyles.emailAvatar}>
              <div className={inboxStyles.avatarCircle}>TS</div>
            </div>
            <div className={inboxStyles.emailMeta}>
              <div className={inboxStyles.emailSender}>ThoughtSpot Notifications</div>
              <div className={inboxStyles.emailSubject}>
                <span className={inboxStyles.unreadDot} />
                Access approved by Simran Pandit (simran.pandit@thoughtspot.com)
              </div>
              <div className={inboxStyles.emailSnippet}>
                Simran Pandit has approved your request to act on their behalf.
              </div>
            </div>
            <div className={inboxStyles.emailTime}>Feb 19</div>
          </div>

          {FILLER_EMAILS.map((e, i) => (
            <div key={i} className={inboxStyles.emailListItem}>
              <div className={inboxStyles.emailAvatar}>
                <div className={inboxStyles.avatarCircle} style={{ background: e.bg, color: '#fff' }}>{e.initials}</div>
              </div>
              <div className={inboxStyles.emailMeta}>
                <div className={inboxStyles.emailSender}>{e.sender}</div>
                <div className={inboxStyles.emailSubject}>{e.subject}</div>
                <div className={inboxStyles.emailSnippet}>{e.snippet}</div>
              </div>
              <div className={inboxStyles.emailTime}>{e.time}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={inboxStyles.emailDetailPane} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Subject + nav row */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #E8EAED', flexShrink: 0, gap: 12 }}>
            <button className={inboxStyles.backBtn} onClick={onViewEmail}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#202124', fontFamily: font, margin: 0 }}>
              Access approved by Simran Pandit (simran.pandit@thoughtspot.com)
            </h2>
          </div>

          {/* Sender + date row */}
          <div style={{ padding: '12px 24px', borderBottom: '1px solid #E8EAED', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1C1B1F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, fontFamily: font, flexShrink: 0 }}>TS</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#202124', fontFamily: font }}>ThoughtSpot Notifications &lt;notification@notification.thoughtspot.com&gt;</div>
                <div style={{ fontSize: 12, color: '#5F6368', fontFamily: font }}>to me</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#5F6368', fontFamily: font, flexShrink: 0 }}>Feb 19, 2026, 5:19 PM (4 mins ago)</div>
          </div>

          {/* Email body */}
          <div style={{ flex: 1, overflowY: 'auto', background: '#F6F7F8' }}>
            <div style={{ maxWidth: 600, margin: '24px auto', background: '#fff', borderRadius: 4 }}>
              <ApprovalEmailBody onStartSession={onStartSession} />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default AdminEmailPage;
