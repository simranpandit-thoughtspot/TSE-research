import React from 'react';
import { systemColors } from '../../../tokens/colors';
import { User } from '../data/mockData';

interface UsersTableProps {
  users: User[];
  onUserClick: (user: User) => void;
}

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  Active: { color: '#1A7F4B', bg: '#E8F7EF' },
  Pending: { color: '#8A6500', bg: '#FFF4D6' },
  Locked: { color: '#C53B3B', bg: '#FDECEA' },
  Suspended: { color: '#B85C00', bg: '#FFF0E6' },
  Expired: { color: '#5A5A6A', bg: '#F0F0F5' },
  Deactivated: { color: '#5A5A6A', bg: '#F0F0F5' },
};

function GroupsCell({ groups }: { groups: string[] }) {
  if (!groups.length) {
    return <span style={{ color: systemColors.light['content-tertiary'] }}>-</span>;
  }
  const visible = groups.slice(0, 4);
  const more = groups.length - 4;
  return (
    <span style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>
      {visible.join(' , ')}
      {more > 0 && (
        <>
          {' '}
          <span style={{ color: '#2770EF', fontWeight: 500, cursor: 'pointer' }}>+{more} more</span>
        </>
      )}
    </span>
  );
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, onUserClick }) => {
  const colWidths = '40px 220px 1fr 100px 140px 120px 60px';

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: colWidths,
          alignItems: 'center',
          borderBottom: `1px solid ${systemColors.light['border-divider']}`,
          padding: '0 8px',
          height: 44,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <input type="checkbox" style={{ cursor: 'pointer', accentColor: '#2770EF' }} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-secondary'], display: 'flex', alignItems: 'center', gap: 4 }}>
          Name
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2L6 10M6 10L3 7M6 10L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-secondary'] }}>Groups</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-secondary'] }}>Auth Type</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-secondary'] }}>Created</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-secondary'] }}>Status</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-secondary'], textAlign: 'right', paddingRight: 8 }}>Actions</div>
      </div>

      {/* Rows */}
      {users.map((user) => {
        const statusCfg = STATUS_CONFIG[user.status] ?? STATUS_CONFIG.Deactivated;
        return (
          <div
            key={user.id}
            style={{
              display: 'grid',
              gridTemplateColumns: colWidths,
              alignItems: 'center',
              borderBottom: `1px solid ${systemColors.light['border-divider']}`,
              padding: '0 8px',
              minHeight: 60,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = systemColors.light['background-subtle'];
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            {/* Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <input type="checkbox" style={{ cursor: 'pointer', accentColor: '#2770EF' }} />
            </div>

            {/* Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <button
                onClick={() => onUserClick(user)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left',
                  fontSize: 14,
                  color: '#2770EF',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: 210,
                }}
              >
                {user.displayName}
              </button>
              <span style={{ fontSize: 12, color: systemColors.light['content-secondary'], overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 210 }}>
                {user.username}
              </span>
            </div>

            {/* Groups */}
            <div style={{ paddingRight: 16 }}>
              <GroupsCell groups={user.groups} />
            </div>

            {/* Auth Type */}
            <div style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>
              {user.authType}
            </div>

            {/* Created */}
            <div style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>
              {user.created}
            </div>

            {/* Status */}
            <div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: statusCfg.color,
                  background: statusCfg.bg,
                  borderRadius: 4,
                  padding: '2px 8px',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.status}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 4 }}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: 4,
                  color: systemColors.light['content-secondary'],
                  fontSize: 18,
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                •••
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
