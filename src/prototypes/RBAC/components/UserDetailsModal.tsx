import React, { useState } from 'react';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { systemColors } from '../../../tokens/colors';
import { User } from '../data/mockData';
import { PrivilegesPanel } from './PrivilegesPanel';

interface UserDetailsModalProps {
  user: User | null;
  onClose: () => void;
  onEdit?: (user: User) => void;
}

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: '#E8EDF5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 600,
        color: '#2770EF',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderTop: `1px solid ${systemColors.light['border-divider']}`,
      }}
    >
      <span style={{ fontSize: 14, color: systemColors.light['content-secondary'] }}>{label}</span>
      <span style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>{value}</span>
    </div>
  );
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState<'groups' | 'privileges'>('privileges');

  const footer = (
    <>
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 14,
          color: '#2770EF',
          fontFamily: 'inherit',
          padding: 0,
          fontWeight: 500,
        }}
      >
        Act as
      </button>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" onClick={() => user && onEdit?.(user)}>Edit</Button>
        <Button variant="primary" onClick={onClose}>Close</Button>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={!!user}
      onClose={onClose}
      size="M2"
      title="User details"
      showCloseButton={false}
      footer={footer}
    >
      {/* Negative margin to let two-column layout fill edge-to-edge inside content area */}
      <div
        style={{
          margin: '-24px',
          height: 'calc(100% + 48px)',
          display: 'flex',
          overflow: 'hidden',
          minHeight: 440,
        }}
      >
        {/* Left panel — user identity + metadata */}
        <div
          style={{
            width: 276,
            minWidth: 276,
            borderRight: `1px solid ${systemColors.light['border-divider']}`,
            padding: '20px 24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Avatar + name block */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: systemColors.light['background-subtle'],
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
            }}
          >
            <UserAvatar name={user?.displayName ?? ''} />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: systemColors.light['content-primary'] }}>
                {user?.displayName}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: systemColors.light['content-secondary'],
                  marginTop: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user?.email}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: systemColors.light['content-tertiary'],
                  marginTop: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user?.username}
              </div>
            </div>
          </div>

          {/* Metadata rows */}
          <MetaRow label="Status" value={user?.status ?? ''} />
          <MetaRow label="User since" value={user?.userSince ?? ''} />
          <MetaRow label="User type" value={user?.userType ?? ''} />
          <MetaRow label="MFA enabled" value={user?.mfaEnabled ? 'Yes' : 'No'} />
        </div>

        {/* Right panel — tabs */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Tab bar */}
          <div
            style={{
              display: 'flex',
              borderBottom: `1px solid ${systemColors.light['border-divider']}`,
              padding: '0 24px',
              flexShrink: 0,
            }}
          >
            {(['groups', 'privileges'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '16px 4px',
                  marginRight: 20,
                  fontSize: 14,
                  fontWeight: activeTab === tab ? 600 : 400,
                  color: activeTab === tab ? '#2770EF' : systemColors.light['content-secondary'],
                  borderBottom: activeTab === tab ? '2px solid #2770EF' : '2px solid transparent',
                  fontFamily: 'inherit',
                }}
              >
                {tab === 'groups' ? 'Groups' : 'Privileges'}
              </button>
            ))}
          </div>

          {/* Tab content — independently scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            {activeTab === 'privileges' ? (
              <PrivilegesPanel privileges={user?.privileges ?? []} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {(user?.groups ?? []).length === 0 ? (
                  <span style={{ fontSize: 14, color: systemColors.light['content-tertiary'] }}>
                    No groups assigned.
                  </span>
                ) : (
                  (user?.groups ?? []).map((g, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 14,
                        color: systemColors.light['content-primary'],
                        padding: '10px 0',
                        borderBottom: `1px solid ${systemColors.light['border-divider']}`,
                      }}
                    >
                      {g}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
