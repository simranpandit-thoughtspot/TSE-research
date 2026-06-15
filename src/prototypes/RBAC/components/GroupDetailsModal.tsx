import React, { useEffect, useState } from 'react';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Accordion } from '../../../components/Accordion';
import { systemColors } from '../../../tokens/colors';
import {
  Group,
  mockGroupUsers,
  mockInheritedRoles,
  mockParentGroups,
  InheritedRole,
  ParentGroupItem,
} from '../data/mockData';

type GroupTab = 'users' | 'roles' | 'lineage';

interface GroupDetailsModalProps {
  group: Group | null;
  initialTab?: GroupTab;
  onClose: () => void;
  onEdit?: (group: Group) => void;
}

function GroupAvatar({ name, size = 44 }: { name: string; size?: number }) {
  const initial = name.trim()[0]?.toUpperCase() ?? 'G';
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#DCE8FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 600,
        color: '#2770EF',
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  );
}

function ColoredAvatar({ name, color, size = 32 }: { name: string; color: string; size?: number }) {
  const initial = name.trim()[0]?.toLowerCase() ?? '?';
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color + '33',
        border: `1.5px solid ${color}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 600,
        color: color,
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  );
}

function UserRow({ name, color }: { name: string; color: string }) {
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]).join('');
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 0',
        borderBottom: `1px solid ${systemColors.light['border-divider']}`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: color + '33',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 600,
          color: color,
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      <span style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>{name}</span>
    </div>
  );
}

function InheritedRoleCard({ role }: { role: InheritedRole }) {
  return (
    <div
      style={{
        border: `1px solid ${systemColors.light['border-divider']}`,
        borderRadius: 8,
        padding: '12px 16px',
        marginBottom: 8,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: systemColors.light['content-primary'] }}>
          {role.name}
        </span>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#2770EF', fontFamily: 'inherit', padding: 0 }}
        >
          View
        </button>
      </div>
      {role.privileges.map((cat) => (
        <div key={cat.category} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: systemColors.light['content-secondary'], marginBottom: 6 }}>
            {cat.category}
          </div>
          {cat.items.map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: systemColors.light['content-primary'], marginBottom: 4 }}>
              <span style={{ marginTop: 1 }}>•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ParentGroupRow({ item }: { item: ParentGroupItem }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: `1px solid ${systemColors.light['border-divider']}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <ColoredAvatar name={item.name} color={item.color} size={30} />
        <span style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>{item.name}</span>
      </div>
      <button
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#2770EF', fontFamily: 'inherit', padding: 0 }}
      >
        View
      </button>
    </div>
  );
}

export const GroupDetailsModal: React.FC<GroupDetailsModalProps> = ({
  group,
  initialTab = 'users',
  onClose,
  onEdit,
}) => {
  const [activeTab, setActiveTab] = useState<GroupTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, group]);

  const footer = (
    <>
      <div />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          variant="secondary"
          onClick={() => group && onEdit?.(group)}
        >
          Edit
        </Button>
        <Button variant="primary" onClick={onClose}>Close</Button>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={!!group}
      onClose={onClose}
      size="M2"
      title="Group details"
      showCloseButton={false}
      footer={footer}
    >
      <div style={{ margin: '-24px', height: 'calc(100% + 48px)', display: 'flex', overflow: 'hidden', minHeight: 440 }}>

        {/* Left panel */}
        <div
          style={{
            width: 276,
            minWidth: 276,
            borderRight: `1px solid ${systemColors.light['border-divider']}`,
            padding: '20px 24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {/* Avatar + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <GroupAvatar name={group?.displayName ?? ''} size={44} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: systemColors.light['content-primary'] }}>
                {group?.displayName}
              </div>
              <div style={{ fontSize: 12, color: systemColors.light['content-secondary'], marginTop: 2 }}>
                {group?.name}
              </div>
            </div>
          </div>

          {/* Description */}
          {group?.description && (
            <p style={{ fontSize: 13, color: systemColors.light['content-secondary'], lineHeight: 1.5, margin: '0 0 16px' }}>
              {group.description}
            </p>
          )}

          {/* Metadata */}
          <div style={{ borderTop: `1px solid ${systemColors.light['border-divider']}`, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${systemColors.light['border-divider']}` }}>
              <span style={{ fontSize: 14, color: systemColors.light['content-secondary'] }}>Group created on</span>
              <span style={{ fontSize: 14, color: systemColors.light['content-tertiary'] }}>{group?.createdOn}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span style={{ fontSize: 14, color: systemColors.light['content-secondary'] }}>Sharing content</span>
              <span style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>Enabled</span>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${systemColors.light['border-divider']}`, padding: '0 24px', flexShrink: 0 }}>
            {([
              { id: 'users', label: 'Users' },
              { id: 'roles', label: 'Roles' },
              { id: 'lineage', label: 'Group lineage' },
            ] as { id: GroupTab; label: string }[]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '16px 4px',
                  marginRight: 20,
                  fontSize: 14,
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? '#2770EF' : systemColors.light['content-secondary'],
                  borderBottom: activeTab === tab.id ? '2px solid #2770EF' : '2px solid transparent',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>

            {/* Users tab */}
            {activeTab === 'users' && (
              <div>
                {mockGroupUsers.map((u) => (
                  <UserRow key={u.id} name={u.name} color={u.color} />
                ))}
              </div>
            )}

            {/* Roles tab */}
            {activeTab === 'roles' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Accordion variant="bordered" allowMultiple>
                  <Accordion.Item title="Direct roles (1)">
                    <div style={{ padding: '8px 4px' }}>
                      <div style={{ fontSize: 14, color: systemColors.light['content-primary'], padding: '8px 0' }}>
                        Accounts
                      </div>
                    </div>
                  </Accordion.Item>
                </Accordion>
                <Accordion variant="bordered" allowMultiple defaultExpanded={0}>
                  <Accordion.Item title={`Inherited roles (${mockInheritedRoles.length})`}>
                    <div style={{ padding: '8px 4px' }}>
                      {mockInheritedRoles.map((role) => (
                        <InheritedRoleCard key={role.id} role={role} />
                      ))}
                    </div>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}

            {/* Group lineage tab */}
            {activeTab === 'lineage' && (
              <div>
                <Accordion variant="bordered" allowMultiple defaultExpanded={0}>
                  <Accordion.Item title={`Parent Groups(${mockParentGroups.length})`}>
                    <div style={{ padding: '4px 4px' }}>
                      {mockParentGroups.map((pg) => (
                        <ParentGroupRow key={pg.id} item={pg} />
                      ))}
                    </div>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
