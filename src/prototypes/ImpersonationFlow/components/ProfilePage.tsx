import React from 'react';
import styles from './ProfilePage.module.css';
import { ImpersonationPref } from '../ImpersonationFlow';

interface Props {
  pref: ImpersonationPref;
  onEditPreferences: () => void;
}

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const Row: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className={styles.row}>
    <span className={styles.rowLabel}>{label}</span>
    <span className={styles.rowValue}>{value}</span>
  </div>
);

const ProfilePage: React.FC<Props> = ({ pref, onEditPreferences }) => {
  const prefLabel = pref === 'always-allow' ? 'Always allow' : 'Require access request';

  return (
    <div className={styles.shell}>
      {/* Left sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.avatarWrap}>
          <img
            src="https://i.pravatar.cc/120?img=47"
            alt="Eliška Pedersen"
            className={styles.avatar}
          />
          <button className={styles.cameraBtn} aria-label="Change photo">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="#fff">
              <circle cx="8" cy="9" r="3" />
              <path d="M6 2l-1 2H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1h-3L10 2H6z" />
            </svg>
          </button>
        </div>
        <div className={styles.userName}>Eliška Pedersen</div>
        <div className={styles.userEmail}>EliskaPed123@apple.com</div>
        <button className={styles.signoutBtn}>Signout</button>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        {/* Name section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Name</h2>
            <button className={styles.editBtn}>Edit</button>
          </div>
          <Row label="Display name" value="Eliška Pedersen" />
        </section>

        <div className={styles.divider} />

        {/* Preference section */}
        <section className={styles.section} data-walkthrough="user-impersonation-pref">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Preference</h2>
            <button className={styles.editBtn} onClick={onEditPreferences}>Edit</button>
          </div>
          <Row label="System language" value="English (United States)" />
          <Row label="Appearance" value="Dark mode" />
          <Row label="Time zone" value="Asia/Calcutta" />
          <Row label="Email notifications" value="Enable" />
          <Row label="Email for receiving notifications" value="EliskaPed123@apple.com" />
          <Row
            label="Allow admins to act as you"
            value={
              <span style={{ color: pref === 'require-request' ? '#6B7280' : undefined }}>
                {prefLabel}
              </span>
            }
          />
        </section>

        <div className={styles.divider} />

        {/* Experience section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <button className={styles.editBtn}>Edit</button>
          </div>
          <Row label="KPI Anomalies" value="Show" />
          <Row
            label="New user onboarding"
            value={
              <a href="#" className={styles.link} onClick={e => e.preventDefault()}>
                Revisit onboarding experience
              </a>
            }
          />
        </section>

        <div className={styles.divider} />

        {/* Connect to section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Connect to</h2>
          </div>
          <p className={styles.sectionDesc}>
            Enables users to use Spotter to ask questions in natural language, preview insights, and get real-time notifications across connected app
          </p>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Slack</span>
            <div className={styles.slackCard}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="2" fill="#E01E5A" />
                <rect x="14" y="3" width="7" height="7" rx="2" fill="#36C5F0" />
                <rect x="3" y="14" width="7" height="7" rx="2" fill="#2EB67D" />
                <rect x="14" y="14" width="7" height="7" rx="2" fill="#ECB22E" />
              </svg>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', fontFamily: font }}>
                  Disconnect from Slack
                </div>
                <div style={{ fontSize: 12, color: '#6B7280', fontFamily: font }}>
                  Connected to "&lt;workspace name&gt;"
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
