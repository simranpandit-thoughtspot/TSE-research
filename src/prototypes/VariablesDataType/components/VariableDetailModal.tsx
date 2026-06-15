import React, { useState } from 'react';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Divider } from '../../../components/Divider';
import { Avatar } from '../../../components/Avatar';
import { Horizontal, Vertical } from '../../../components/Layout';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontSize, fontWeight } from '../../../tokens/typography';
import type { VariableRow } from '../data/mockData';
import { EditVariableModal } from './EditVariableModal';

// ─── Mock detail data ─────────────────────────────────────────────────────────

interface DetailOrg {
  orgName: string;
  value: string;
}

interface DetailUserGroup {
  orgName: string;
  users: { userName: string; value: string }[];
}

const DETAIL_ORGS: DetailOrg[] = [
  { orgName: 'Acme Corp',            value: 'SARANJIT; SARANJIT2; SARANJIT3' },
  { orgName: 'TechNova Inc',         value: 'TECHVAL; TECHVAL2' },
  { orgName: 'GlobalFinance Ltd',    value: 'GFL_01; GFL_02; GFL_03' },
  { orgName: 'HealthFirst Systems',  value: 'HEALTH_VAR' },
  { orgName: 'RetailMax Group',      value: 'RETAIL; RETAIL2; RETAIL3; RETAIL4' },
];

const DETAIL_USER_GROUPS: DetailUserGroup[] = [
  {
    orgName: 'Acme Corp',
    users: [
      { userName: 'Clark Kent',     value: 'SARANJIT; SARANJIT2; SARANJIT3' },
      { userName: 'Diana Prince',   value: 'SARANJIT; SARANJIT2' },
      { userName: 'Eobard Thawne',  value: 'SARANJIT; SARANJIT2' },
    ],
  },
  {
    orgName: 'TechNova Inc',
    users: [
      { userName: 'Barry Allen',    value: 'SARANJIT; SARANJIT2; SARANJIT3' },
      { userName: 'Hal Jordan',     value: 'SARANJIT; SARANJIT2' },
    ],
  },
  {
    orgName: 'GlobalFinance Ltd',
    users: [
      { userName: 'Arthur Curry',   value: 'SARANJIT; SARANJIT2; SARANJIT3' },
      { userName: 'Oliver Queen',   value: 'SARANJIT; SARANJIT2' },
      { userName: 'Bruce Wayne',    value: 'SARANJIT; SARANJIT2' },
    ],
  },
];

// ─── Tab bar ──────────────────────────────────────────────────────────────────

type DetailTab = 'org' | 'users';

const TabBar: React.FC<{
  active: DetailTab;
  onChange: (t: DetailTab) => void;
}> = ({ active, onChange }) => {
  const tabStyle = (id: DetailTab): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    height: 32,
    padding: `0 ${spacing.C}px`,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: '20px',
    color:
      active === id
        ? systemColors.light['content-brand']
        : systemColors.light['content-primary'],
    borderBottom:
      active === id
        ? `2px solid ${systemColors.light['content-brand']}`
        : `1px solid ${systemColors.light['border-divider']}`,
    marginBottom: active === id ? -1 : 0,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
  });

  return (
    <div
      style={{
        display: 'flex',
        borderBottom: `1px solid ${systemColors.light['border-divider']}`,
      }}
    >
      <button style={tabStyle('org')} onClick={() => onChange('org')}>
        Org
      </button>
      <button style={tabStyle('users')} onClick={() => onChange('users')}>
        Users
      </button>
    </div>
  );
};

// ─── Metadata row (left panel) ────────────────────────────────────────────────

const MetaRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Horizontal style={{ minHeight: 32 }} align="center">
    <span
      style={{
        flex: '0 0 110px',
        fontSize: fontSize.sm,
        fontWeight: fontWeight.regular,
        color: systemColors.light['content-primary'],
        lineHeight: '20px',
      }}
    >
      {label}
    </span>
    <span
      style={{
        flex: 1,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.regular,
        color: systemColors.light['content-secondary'],
        lineHeight: '20px',
        textAlign: 'right',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </span>
  </Horizontal>
);

// ─── Org card (right panel, Org tab) ─────────────────────────────────────────

const OrgCard: React.FC<{
  orgName: string;
  value: string;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ orgName, value, isExpanded, onToggle }) => (
  <div
    style={{
      background: systemColors.light['background-sunken'],
      border: `1px solid ${systemColors.light['border-divider']}`,
      borderRadius: 12,
      overflow: 'hidden',
    }}
  >
    {/* Header */}
    <button
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: `${spacing.D}px`,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        outline: 'none',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{
          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s',
          flexShrink: 0,
          marginRight: spacing.C,
        }}
      >
        <path
          d="M6 4L10 8L6 12"
          stroke={systemColors.light['content-secondary']}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          fontSize: fontSize.sm,
          fontWeight: fontWeight.semibold,
          color: systemColors.light['content-primary'],
          lineHeight: '20px',
        }}
      >
        {orgName}
      </span>
    </button>

    {/* Expanded value */}
    {isExpanded && (
      <>
        <Divider spacing="none" />
        <div style={{ padding: spacing.D }}>
          <p
            style={{
              fontSize: fontSize.sm,
              color: systemColors.light['content-primary'],
              lineHeight: '20px',
              margin: 0,
              wordBreak: 'break-word',
            }}
          >
            {value}
          </p>
        </div>
      </>
    )}
  </div>
);

// ─── User-org card (right panel, Users tab) ──────────────────────────────────

const UserOrgCard: React.FC<{
  orgName: string;
  users: { userName: string; value: string }[];
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ orgName, users, isExpanded, onToggle }) => (
  <div
    style={{
      background: systemColors.light['background-sunken'],
      border: `1px solid ${systemColors.light['border-divider']}`,
      borderRadius: 12,
      overflow: 'hidden',
    }}
  >
    {/* Card header */}
    <button
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: `${spacing.D}px`,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        outline: 'none',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{
          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s',
          flexShrink: 0,
          marginRight: spacing.C,
        }}
      >
        <path
          d="M6 4L10 8L6 12"
          stroke={systemColors.light['content-secondary']}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          fontSize: fontSize.sm,
          fontWeight: fontWeight.semibold,
          color: systemColors.light['content-primary'],
          lineHeight: '20px',
        }}
      >
        {orgName}
      </span>
    </button>

    {/* Expanded user rows */}
    {isExpanded && (
      <>
        <Divider spacing="none" />
        <div>
          {users.map((u, i) => (
            <div key={u.userName}>
              <Horizontal
                align="center"
                style={{ padding: `${spacing.C}px ${spacing.D}px`, gap: spacing.C }}
              >
                <Avatar name={u.userName} size="m" />
                <span
                  style={{
                    flex: 1,
                    fontSize: fontSize.sm,
                    color: systemColors.light['content-primary'],
                    lineHeight: '20px',
                  }}
                >
                  {u.userName}
                </span>
                <span
                  style={{
                    fontSize: fontSize.sm,
                    color: systemColors.light['content-secondary'],
                    lineHeight: '20px',
                    textAlign: 'right',
                    flexShrink: 0,
                  }}
                >
                  {u.value}
                </span>
              </Horizontal>
              {i < users.length - 1 && <Divider spacing="none" />}
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────────

interface VariableDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  variable: VariableRow | null;
}

export const VariableDetailModal: React.FC<VariableDetailModalProps> = ({
  isOpen,
  onClose,
  variable,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('org');
  const [expandedOrgCards, setExpandedOrgCards] = useState<Set<string>>(
    new Set(['Acme Corp'])
  );
  const [expandedUserCards, setExpandedUserCards] = useState<Set<string>>(
    new Set(['Acme Corp'])
  );
  const [isEditOpen, setIsEditOpen] = useState(false);

  const toggleOrgCard = (orgName: string) => {
    setExpandedOrgCards((prev) => {
      const next = new Set(prev);
      if (next.has(orgName)) next.delete(orgName);
      else next.add(orgName);
      return next;
    });
  };

  const toggleUserCard = (orgName: string) => {
    setExpandedUserCards((prev) => {
      const next = new Set(prev);
      if (next.has(orgName)) next.delete(orgName);
      else next.add(orgName);
      return next;
    });
  };

  if (!variable) return null;

  const footer = (
    <Horizontal justify="space-between" align="center" style={{ width: '100%' }}>
      {/* Left: empty tertiary slot (matches Figma _Footer pattern) */}
      <div style={{ width: 51, height: 32 }} />
      <Horizontal gap={spacing.D} align="center">
        <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
          Edit
        </Button>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Horizontal>
    </Horizontal>
  );

  return (
    <>
      {/* Detail modal — hidden while edit is open */}
      <Modal
        title="Variable details"
        isOpen={isOpen && !isEditOpen}
        onClose={onClose}
        footer={footer}
        size="M2"
      >
        {/* Two-panel body */}
        <div style={{ display: 'flex', height: 550, overflow: 'hidden' }}>

          {/* ── Left panel: metadata (318px, sunken bg) ── */}
          <div
            style={{
              flex: '0 0 318px',
              background: systemColors.light['background-sunken'],
              padding: `${spacing.F}px`,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.D,
            }}
          >
            {/* Variable name */}
            <span
              style={{
                fontSize: 18,
                fontWeight: fontWeight.semibold,
                color: systemColors.light['content-primary'],
                lineHeight: '24px',
                wordBreak: 'break-word',
              }}
            >
              {variable.name}
            </span>

            <Divider spacing="none" />

            <Vertical gap={0}>
              <MetaRow label="Type"          value="Formula Variable" />
              <MetaRow label="Data type"     value="VARCHAR" />
              <MetaRow label="Value assigned" value="34" />
              <MetaRow label="Last modified" value="12 minutes ago" />
            </Vertical>
          </div>

          {/* ── Right panel: tabbed content ── */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              padding: `${spacing.C}px 0`,
            }}
          >
            <div style={{ padding: `0 ${spacing.F}px` }}>
              <TabBar active={activeTab} onChange={setActiveTab} />
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: `${spacing.C}px ${spacing.F}px`,
              }}
            >
              {activeTab === 'org' ? (
                <Vertical gap={spacing.C}>
                  {DETAIL_ORGS.map((org) => (
                    <OrgCard
                      key={org.orgName}
                      orgName={org.orgName}
                      value={org.value}
                      isExpanded={expandedOrgCards.has(org.orgName)}
                      onToggle={() => toggleOrgCard(org.orgName)}
                    />
                  ))}
                </Vertical>
              ) : (
                <Vertical gap={spacing.C}>
                  {DETAIL_USER_GROUPS.map((group) => (
                    <UserOrgCard
                      key={group.orgName}
                      orgName={group.orgName}
                      users={group.users}
                      isExpanded={expandedUserCards.has(group.orgName)}
                      onToggle={() => toggleUserCard(group.orgName)}
                    />
                  ))}
                </Vertical>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit modal — replaces the detail card; back goes to detail */}
      <EditVariableModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={onClose}
        variable={variable}
      />
    </>
  );
};
