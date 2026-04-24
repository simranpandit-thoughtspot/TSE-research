import React, { useState, useEffect, useRef } from 'react';
import styles from './AdminView.module.css';
import { ImpersonationPref } from '../ImpersonationFlow';
import ImpersonationSession from './ImpersonationSession';

interface Props {
  impPref: ImpersonationPref;
  requestStatus: 'none' | 'pending' | 'approved' | 'declined';
  onSendRequest: () => void;
  onSessionStart?: () => void;
  onSessionEnd?: () => void;
  startSession?: boolean;
}

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';


interface UserRow {
  id: string;
  name: string;
  username: string;
  orgs: string;
  extraOrgs?: string;
  authType: 'Local' | 'SSO';
  created: string;
  status: 'Active' | 'Pending' | 'Locked' | 'Suspended' | 'Expired' | 'Deactivated';
  isTarget?: boolean;
}

const USERS: UserRow[] = [
  { id: '1', name: 'Simran Pandit', username: 'simran724pandit', orgs: 'Admin , Eng , Finance , Marketing', extraOrgs: '+5 more', authType: 'Local', created: '7 days ago', status: 'Active', isTarget: true },
  { id: '2', name: 'Nina James', username: 'ninand4579', orgs: 'Org Admins , Dev , QA , Sales', extraOrgs: '+9 more', authType: 'SSO', created: '14 days ago', status: 'Active' },
  { id: '3', name: '0oafgxoewfAsYiCR81d72222User', username: '0oafgxoewfAsYiCR81d72222Username', orgs: 'EMEA , APAC , NA , IT', authType: 'SSO', created: '3 weeks ago', status: 'Pending' },
  { id: '4', name: 'Arjun Singh', username: '26485arunj', orgs: '—', authType: 'SSO', created: 'a month ago', status: 'Locked' },
  { id: '5', name: 'Kiran Patel', username: 'kiranpatelUser12345', orgs: '—', authType: 'Local', created: '2 months ago', status: 'Suspended' },
  { id: '6', name: 'Leila Khan', username: 'leilakhanUser67890', orgs: '—', authType: 'Local', created: '3 months ago', status: 'Expired' },
  { id: '7', name: 'Aisha Raza', username: 'aisharazaUser54321', orgs: 'Admin , Eng , Finance , Marketing', extraOrgs: '+5 more', authType: 'SSO', created: 'a year ago', status: 'Pending' },
  { id: '8', name: 'Aisha Raza', username: 'aisharazaUser98765', orgs: 'Admin , Eng , Finance , Marketing', extraOrgs: '+5 more', authType: 'Local', created: '4 years ago', status: 'Deactivated' },
];

const STATUS_COLORS: Record<UserRow['status'], string> = {
  Active: '#111827',
  Pending: '#6B7280',
  Locked: '#6B7280',
  Suspended: '#6B7280',
  Expired: '#6B7280',
  Deactivated: '#9CA3AF',
};

const GROUPS = [
  'AA3ANALYSIS _group', 'BILLING_INFO_ADMINISTRATION _group', 'BYPASSRLS _schedule',
  'BYPASSRLS _group', 'BYPASSRLS _analysis', 'BYPASSRLS _report', 'BYPASSRLS _schedule',
  'BYPASSRLS _task', 'BYPASSRLS _group', 'BYPASSRLS _analysis', 'BYPASSRLS _report',
  'BYPASSRLS _task', 'REPORTING _group', 'ANALYTICS _read', 'DATA_ADMIN _write',
];

const SidebarNav = () => (
  <div className={styles.sidebarNav}>
    <div className={styles.sidebarIcons}>
      <button className={styles.sidebarIcon} aria-label="Analytics">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="9" width="3.5" height="8" rx="1" fill="rgba(255,255,255,0.5)" />
          <rect x="7" y="5" width="3.5" height="12" rx="1" fill="rgba(255,255,255,0.5)" />
          <rect x="13" y="1" width="3.5" height="16" rx="1" fill="rgba(255,255,255,0.5)" />
        </svg>
      </button>
      <button className={styles.sidebarIcon} aria-label="Data">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <ellipse cx="9" cy="5" rx="7" ry="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" />
          <path d="M2 5v4c0 1.38 3.13 2.5 7 2.5S16 10.38 16 9V5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" />
          <path d="M2 9v4c0 1.38 3.13 2.5 7 2.5S16 14.38 16 13V9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" />
        </svg>
      </button>
      <button className={styles.sidebarIcon} aria-label="Develop">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M6 4l-4 5 4 5M12 4l4 5-4 5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      <button className={`${styles.sidebarIcon} ${styles.sidebarIconActive}`} aria-label="Admin">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" />
          <circle cx="9" cy="9" r="3.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" />
          <line x1="9" y1="1.5" x2="9" y2="5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" />
          <line x1="9" y1="13" x2="9" y2="16.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" />
          <line x1="1.5" y1="9" x2="5" y2="9" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" />
          <line x1="13" y1="9" x2="16.5" y2="9" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" />
        </svg>
      </button>
    </div>
    <div className={styles.sidebarText}>
      <div className={styles.sidebarTitle}>Admin Settings</div>
      <div className={styles.orgToggle}>
        <button className={`${styles.orgBtn} ${styles.orgBtnActive}`}>All orgs</button>
        <button className={styles.orgBtn}>Primary org</button>
      </div>
      <NavSection label="ADMIN DASHBOARD">
        <NavItem label="Command Center" />
        <NavItem label="Usage Insights" />
      </NavSection>
      <NavSection label="USERS">
        <NavItem label="User Management" active />
        <NavItem label="Feature & Flag Management" />
      </NavSection>
      <NavSection label="APPLICATION SETTINGS">
        <NavItem label="General Settings" />
        <NavItem label="Core Features" />
        <NavItem label="Agent Settings" />
        <NavItem label="Customisations" />
        <NavItem label="Variables" />
        <NavItem label="Vision Control" />
      </NavSection>
      <NavSection label="SECURITY & PERFORMANCE">
        <NavItem label="Governance & Security" />
      </NavSection>
      <NavSection label="SUPPORT">
        <NavItem label="System & Data Integration" />
      </NavSection>
    </div>
  </div>
);

const NavSection: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className={styles.navSection}>
    <div className={styles.navSectionLabel}>{label}</div>
    {children}
  </div>
);

const NavItem: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}>{label}</div>
);

const AdminView: React.FC<Props> = ({ impPref, onSendRequest, onSessionStart, onSessionEnd, startSession }) => {
  const [view, setView] = useState<'user-management' | 'impersonating'>('user-management');
  const [menuRow, setMenuRow] = useState<string | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Enter session when parent signals via startSession prop
  useEffect(() => {
    if (startSession) {
      setView('impersonating');
      onSessionStart?.();
    }
  }, [startSession]);

  // Close 3-dot menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuRow(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const triggerActAs = () => {
    setMenuRow(null);
    setUserDetailsOpen(false);
    if (impPref === 'always-allow') {
      setView('impersonating');
      onSessionStart?.();
    } else {
      setRequestModalOpen(true);
    }
  };

  const handleSendRequest = () => {
    setRequestModalOpen(false);
    onSendRequest();
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

  const handleExitSession = () => {
    setView('user-management');
    onSessionEnd?.();
  };

  if (view === 'impersonating') {
    return <ImpersonationSession onExit={handleExitSession} />;
  }

  return (
    <div className={styles.shell}>
      {/* Body */}
      <div className={styles.body}>
        <SidebarNav />

        {/* Main content */}
        <main className={styles.main}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>User management</h1>
            <div className={styles.pageTabs}>
              <button className={`${styles.tab} ${styles.tabActive}`}>Users</button>
              <button className={styles.tab}>Authentication</button>
            </div>
          </div>

          <div className={styles.tableToolbar}>
            <div className={styles.searchWrap}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#9CA3AF" strokeWidth="1.4" />
                <path d="M9.5 9.5l2.5 2.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input className={styles.tableSearch} placeholder="Search" />
            </div>
            <button className={styles.filterBtn}>
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                <path d="M1 2h12M3 6h8M5 10h4" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Add filter
            </button>
            <div style={{ flex: 1 }} />
            <button className={styles.iconBtnLight}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#6B7280" strokeWidth="1.3" />
                <path d="M5 8h6M8 5l3 3-3 3" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
            <button className={styles.addBtn}>Add new user</button>
            <button className={styles.addBtnChevron}>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Table */}
          <div className={styles.tableWrap} data-walkthrough="admin-user-table">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thCheck}><input type="checkbox" /></th>
                  <th className={styles.th}>
                    Name
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 4 }}>
                      <path d="M5 2v6M2 5l3 3 3-3" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </th>
                  <th className={styles.th}>Orgs</th>
                  <th className={styles.th}>Auth Type</th>
                  <th className={styles.th}>Created</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.thActions}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {USERS.map(user => (
                  <tr key={user.id} className={styles.tr}>
                    <td className={styles.tdCheck}><input type="checkbox" /></td>
                    <td className={styles.td}>
                      <button
                        className={styles.userName}
                        onClick={() => user.isTarget && setUserDetailsOpen(true)}
                        style={{ cursor: user.isTarget ? 'pointer' : 'default' }}
                      >
                        {user.name}
                      </button>
                      <div className={styles.userUsername}>{user.username}</div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.orgText}>{user.orgs}</span>
                      {user.extraOrgs && <div><button className={styles.moreOrgs}>{user.extraOrgs}</button></div>}
                    </td>
                    <td className={styles.td}>{user.authType}</td>
                    <td className={styles.td}>{user.created}</td>
                    <td className={styles.td}>
                      <span style={{ color: STATUS_COLORS[user.status] }}>{user.status}</span>
                    </td>
                    <td className={styles.tdActions}>
                      <div style={{ position: 'relative' }} ref={menuRow === user.id ? menuRef : undefined}>
                        <button
                          className={styles.dotsBtn}
                          data-walkthrough={user.isTarget ? 'simran-row-dots' : undefined}
                          onClick={() => setMenuRow(menuRow === user.id ? null : user.id)}
                        >
                          <span className={styles.dot3} />
                          <span className={styles.dot3} />
                          <span className={styles.dot3} />
                        </button>
                        {menuRow === user.id && (
                          <div className={styles.contextMenu}>
                            <button className={styles.menuItem}>Edit</button>
                            <button className={styles.menuItem}>Export</button>
                            <button
                              className={`${styles.menuItem} ${styles.menuItemHighlight}`}
                              onClick={triggerActAs}
                            >
                              Act as user
                            </button>
                            <button className={styles.menuItem}>Deactivate user</button>
                            <button className={styles.menuItem}>Reset password</button>
                            <button className={`${styles.menuItem} ${styles.menuItemDisabled}`}>Send activation mail</button>
                            <button className={`${styles.menuItem} ${styles.menuItemDanger}`}>Delete</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <span style={{ fontFamily: font, fontSize: 13, color: '#374151' }}>
                <strong>1–20</strong> of <strong>500</strong>
              </span>
              <button className={styles.nextBtn}>Next &gt;</button>
            </div>
          </div>
        </main>
      </div>

      {/* User Details Modal */}
      {userDetailsOpen && (
        <div className={styles.overlay} onClick={() => setUserDetailsOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>User details</h2>
            <div className={styles.modalBody}>
              <div className={styles.modalLeft}>
                <div className={styles.modalUserHeader}>
                  <img src="https://i.pravatar.cc/56?img=47" className={styles.modalAvatar} alt="" />
                  <div>
                    <div className={styles.modalUserName}>Simran Pandit</div>
                    <div className={styles.modalUserEmail}>simranpandit@thoughtspot.com</div>
                    <div className={styles.modalUserHandle}>simran724pandit</div>
                  </div>
                </div>
                <div className={styles.modalFields}>
                  <div className={styles.modalField}><span className={styles.fieldLabel}>Status</span><span className={styles.fieldValue}>Active</span></div>
                  <div className={styles.modalField}><span className={styles.fieldLabel}>User since</span><span className={styles.fieldValue}>26th January 2024</span></div>
                  <div className={styles.modalField}><span className={styles.fieldLabel}>User type</span><span className={styles.fieldValue}>Local</span></div>
                  <div className={styles.modalField}><span className={styles.fieldLabel}>MFA enabled</span><span className={styles.fieldValue}>Yes</span></div>
                </div>
              </div>
              <div className={styles.modalRight}>
                <div className={styles.groupsTitle}>Groups</div>
                <div className={styles.groupsList}>
                  {GROUPS.map((g, i) => <div key={i} className={styles.groupItem}>{g}</div>)}
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.actAsLink} onClick={triggerActAs}>Act as user</button>
              <div className={styles.modalActions}>
                <button className={styles.actionBtn} onClick={() => setUserDetailsOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Access Modal */}
      {requestModalOpen && (
        <div className={styles.overlay} onClick={() => setRequestModalOpen(false)}>
          <div className={styles.smallModal} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Request access to act as user</h2>
            <p className={styles.modalDesc}>
              Send a request to <strong>&lt;Simran Pandit&gt;</strong> to act as them.
              You will be notified when they approve.
            </p>
            <div className={styles.modalActions} style={{ justifyContent: 'flex-end' }}>
              <button className={styles.cancelBtn} onClick={() => setRequestModalOpen(false)}>Cancel</button>
              <button className={styles.actionBtn} onClick={handleSendRequest}>Request access</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastVisible && (
        <div className={styles.toast}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#10B981" />
            <path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: font, fontSize: 13, color: '#fff' }}>
            "Act as" request has been sent to the user.
          </span>
          <button className={styles.toastClose} onClick={() => setToastVisible(false)}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminView;
