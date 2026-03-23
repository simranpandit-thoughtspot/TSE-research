import React, { useState } from 'react';
import { mockUsers, mockOrgs, type UserStatus } from '../data/mockData';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const blue = '#71a1f4';

const StatusBadge: React.FC<{ status: UserStatus | 'Active' | 'Inactive' }> = ({ status }) => {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: '#e0f8ef', color: '#06bf7f' },
    Pending: { bg: '#fff8e5', color: '#d97706' },
    Locked: { bg: '#ffebec', color: '#e22b3d' },
    Suspended: { bg: '#f3f4f6', color: '#777e8b' },
    Inactive: { bg: '#f3f4f6', color: '#777e8b' },
  };
  const style = map[status] || map['Active'];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 10px',
        borderRadius: '20px',
        backgroundColor: style.bg,
        fontSize: '12px',
        fontWeight: 500,
        color: style.color,
        fontFamily: font,
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: style.color,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
};

const ThreeDotsMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '4px',
          color: '#777e8b',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f3f4f6'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
      >
        ···
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            zIndex: 50,
            minWidth: '140px',
            overflow: 'hidden',
          }}
          onMouseLeave={() => setOpen(false)}
        >
          {['Edit user', 'Reset password', 'Impersonate', 'Suspend', 'Delete'].map((action) => (
            <button
              key={action}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                width: '100%',
                padding: '9px 16px',
                border: 'none',
                textAlign: 'left',
                fontFamily: font,
                fontSize: '13px',
                color: action === 'Delete' ? '#e22b3d' : '#1d232f',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f6f8fa'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
            >
              {action}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const UsersTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.org.toLowerCase().includes(search.toLowerCase())
  );

  const allSelected = filtered.length > 0 && filtered.every((u) => selected.has(u.id));

  const toggleAll = () => {
    if (allSelected) {
      const next = new Set(selected);
      filtered.forEach((u) => next.delete(u.id));
      setSelected(next);
    } else {
      const next = new Set(selected);
      filtered.forEach((u) => next.add(u.id));
      setSelected(next);
    }
  };

  const toggleRow = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const cols = ['Name', 'Username', 'Email', 'Org', 'Auth Type', 'Status', 'Created', ''];

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', gap: '12px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '340px' }}>
          <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="#a5acb9" strokeWidth="1.3" />
            <line x1="9.5" y1="9.5" x2="12.5" y2="12.5" stroke="#a5acb9" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users…"
            style={{
              width: '100%',
              height: '36px',
              padding: '0 12px 0 32px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontFamily: font,
              fontSize: '13px',
              color: '#1d232f',
              outline: 'none',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          style={{
            height: '36px',
            padding: '0 18px',
            backgroundColor: blue,
            border: 'none',
            borderRadius: '8px',
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 600,
            color: '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          + Add user
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ width: '40px', padding: '11px 16px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  style={{ cursor: 'pointer', accentColor: blue }}
                />
              </th>
              {cols.map((col) => (
                <th
                  key={col}
                  style={{
                    padding: '11px 14px',
                    textAlign: 'left',
                    fontFamily: font,
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: '#777e8b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr
                key={user.id}
                style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
                  backgroundColor: selected.has(user.id) ? 'rgba(113,161,244,0.05)' : 'transparent',
                  transition: 'background-color 0.1s',
                }}
                onMouseEnter={(e) => {
                  if (!selected.has(user.id)) (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#fafafa';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.backgroundColor = selected.has(user.id) ? 'rgba(113,161,244,0.05)' : 'transparent';
                }}
              >
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selected.has(user.id)}
                    onChange={() => toggleRow(user.id)}
                    style={{ cursor: 'pointer', accentColor: blue }}
                  />
                </td>
                <td style={{ padding: '12px 14px', fontFamily: font, fontSize: '13.5px', fontWeight: 500, color: '#1d232f', whiteSpace: 'nowrap' }}>
                  {user.name}
                </td>
                <td style={{ padding: '12px 14px', fontFamily: font, fontSize: '13px', color: '#777e8b' }}>
                  {user.username}
                </td>
                <td style={{ padding: '12px 14px', fontFamily: font, fontSize: '13px', color: '#777e8b' }}>
                  {user.email}
                </td>
                <td style={{ padding: '12px 14px', fontFamily: font, fontSize: '13px', color: '#1d232f' }}>
                  {user.org}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontFamily: font, fontSize: '12.5px', color: '#1d232f', backgroundColor: '#f3f4f6', padding: '2px 9px', borderRadius: '5px' }}>
                    {user.authType}
                  </span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <StatusBadge status={user.status} />
                </td>
                <td style={{ padding: '12px 14px', fontFamily: font, fontSize: '12.5px', color: '#a5acb9', whiteSpace: 'nowrap' }}>
                  {user.created}
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <ThreeDotsMenu />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrgsTable: React.FC = () => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
      <button
        style={{
          height: '36px',
          padding: '0 18px',
          backgroundColor: blue,
          border: 'none',
          borderRadius: '8px',
          fontFamily: font,
          fontSize: '13px',
          fontWeight: 600,
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        + Add org
      </button>
    </div>
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e5e7eb' }}>
            {['Name', 'Members', 'Status', 'Created', ''].map((col) => (
              <th
                key={col}
                style={{
                  padding: '11px 14px',
                  textAlign: 'left',
                  fontFamily: font,
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#777e8b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockOrgs.map((org, i) => (
            <tr
              key={org.id}
              style={{ borderBottom: i < mockOrgs.length - 1 ? '1px solid #f3f4f6' : 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#fafafa'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent'; }}
            >
              <td style={{ padding: '13px 14px', fontFamily: font, fontSize: '13.5px', fontWeight: 500, color: '#1d232f' }}>
                {org.name}
              </td>
              <td style={{ padding: '13px 14px', fontFamily: font, fontSize: '13px', color: '#777e8b' }}>
                {org.members.toLocaleString()}
              </td>
              <td style={{ padding: '13px 14px' }}>
                <StatusBadge status={org.status} />
              </td>
              <td style={{ padding: '13px 14px', fontFamily: font, fontSize: '12.5px', color: '#a5acb9' }}>
                {org.created}
              </td>
              <td style={{ padding: '13px 8px' }}>
                <ThreeDotsMenu />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ComingSoon: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '300px',
      gap: '12px',
    }}
  >
    <div
      style={{
        width: '52px',
        height: '52px',
        borderRadius: '14px',
        backgroundColor: 'rgba(113,161,244,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#71a1f4" strokeWidth="1.5" />
        <line x1="8" y1="12" x2="16" y2="12" stroke="#71a1f4" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="8" x2="12" y2="16" stroke="#71a1f4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
    <div style={{ fontFamily: font, fontSize: '15px', fontWeight: 600, color: '#1d232f' }}>
      {label} — Coming soon
    </div>
    <div style={{ fontFamily: font, fontSize: '13px', color: '#a5acb9', textAlign: 'center', maxWidth: '300px' }}>
      This section is currently in development. Check back in the next release.
    </div>
  </div>
);

type Tab = 'users' | 'orgs' | 'groups' | 'roles' | 'authentication';

export const UsersOrgs: React.FC = () => {
  const [tab, setTab] = useState<Tab>('users');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'users', label: 'Users' },
    { id: 'orgs', label: 'Orgs' },
    { id: 'groups', label: 'Groups' },
    { id: 'roles', label: 'Roles' },
    { id: 'authentication', label: 'Authentication' },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: '1100px' }}>
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: '28px',
          gap: '0',
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 20px',
              background: 'none',
              border: 'none',
              borderBottom: tab === t.id ? `2px solid ${blue}` : '2px solid transparent',
              cursor: 'pointer',
              fontFamily: font,
              fontSize: '13.5px',
              fontWeight: tab === t.id ? 600 : 400,
              color: tab === t.id ? blue : '#777e8b',
              marginBottom: '-1px',
              transition: 'color 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'users' && <UsersTable />}
      {tab === 'orgs' && <OrgsTable />}
      {tab === 'groups' && <ComingSoon label="Groups" />}
      {tab === 'roles' && <ComingSoon label="Roles" />}
      {tab === 'authentication' && <ComingSoon label="Authentication" />}
    </div>
  );
};
