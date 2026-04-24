import React, { useState } from 'react';
import styles from './PreferencesPage.module.css';
import { ImpersonationPref } from '../ImpersonationFlow';

interface Props {
  pref: ImpersonationPref;
  onSave: (pref: ImpersonationPref) => void;
  onCancel: () => void;
}

const PreferencesPage: React.FC<Props> = ({ pref, onSave, onCancel }) => {
  const [localPref, setLocalPref] = useState<ImpersonationPref>(pref);
  const [emailNotif, setEmailNotif] = useState(true);

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
        <h1 className={styles.pageTitle}>Preferences</h1>

        <div className={styles.form}>
          {/* System language */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>System language</label>
            <div className={styles.selectWrap}>
              <select className={styles.select}>
                <option>Use browser language</option>
                <option>English (United States)</option>
                <option>French</option>
                <option>German</option>
              </select>
              <svg className={styles.selectChevron} width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1l5 5 5-5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Time zone */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Time zone</label>
            <input className={styles.input} type="text" defaultValue="Asia/Calcutta" />
          </div>

          {/* Email notifications */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Email notifications</label>
            <div className={styles.toggleWrap}>
              <span className={styles.toggleLabel}>Enabled</span>
              <button
                role="switch"
                aria-checked={emailNotif}
                className={`${styles.toggle} ${emailNotif ? styles.toggleOn : ''}`}
                onClick={() => setEmailNotif(v => !v)}
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>
          </div>

          {/* Email for receiving notifications */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Email for receiving notifications</label>
            <input className={styles.input} type="email" defaultValue="EliskaPed123@apple.com" />
          </div>

          {/* Allow admins to act as you */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Allow admins to act as you</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="act-as-pref"
                  value="always-allow"
                  checked={localPref === 'always-allow'}
                  onChange={() => setLocalPref('always-allow')}
                  className={styles.radioInput}
                />
                <span className={styles.radioCustom} data-checked={localPref === 'always-allow'} />
                Always allow
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="act-as-pref"
                  value="require-request"
                  checked={localPref === 'require-request'}
                  onChange={() => setLocalPref('require-request')}
                  className={styles.radioInput}
                />
                <span className={styles.radioCustom} data-checked={localPref === 'require-request'} />
                Require access request
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.formRow}>
            <div className={styles.formLabel} />
            <div className={styles.actions}>
              <button className={styles.saveBtn} onClick={() => onSave(localPref)}>
                Save
              </button>
              <button className={styles.cancelBtn} onClick={onCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreferencesPage;
