import React, { useState } from 'react';
import styles from './CreateVariableModal.module.css';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { TextInput } from '../../../components/TextInput';
import { Radio } from '../../../components/Radio';
import { Checkbox } from '../../../components/Checkbox';
import { Select } from '../../../components/Select';
import { SegmentedControl } from '../../../components/SegmentedControl';
import { Divider } from '../../../components/Divider';
import { Link } from '../../../components/Link';
import { Icon } from '../../../components/icons';
import { SearchInput } from '../../../components/SearchInput';
import { Horizontal, Vertical } from '../../../components/Layout';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontSize, fontWeight } from '../../../tokens/typography';
import { radius } from '../../../tokens/radius';

// ─── Types ────────────────────────────────────────────────────────────────────

type VariablePurpose = 'connection' | 'formula' | 'table';
type ScopeTab = 'org' | 'user';

interface OrgRow { id: string; orgId: string; value: string }
interface UserRow { id: string; orgId: string; userId: string; value: string }

let _rowId = 1;
const nextId = () => String(_rowId++);

const emptyOrgRow = (): OrgRow => ({ id: nextId(), orgId: '', value: '' });
const emptyUserRow = (): UserRow => ({ id: nextId(), orgId: '', userId: '', value: '' });

// ─── Mock options ─────────────────────────────────────────────────────────────

const ORG_OPTIONS = [
  { id: 'primary-org', label: 'Primary Org' },
  { id: 'secondary-org', label: 'Secondary Org' },
  { id: 'tertiary-org', label: 'Tertiary Org' },
];

const USER_OPTIONS = [
  { id: 'abhishek', label: 'Abhishek' },
  { id: 'catherine', label: 'Catherine' },
  { id: 'daniel', label: 'Daniel' },
  { id: 'damain', label: 'Damain' },
  { id: 'reshma', label: 'Reshma' },
];

const PURPOSE_OPTIONS = [
  { id: 'connection' as VariablePurpose, label: 'Connection Property' },
  { id: 'formula' as VariablePurpose, label: 'Formula Mapping' },
  { id: 'table' as VariablePurpose, label: 'Table Mapping' },
];

const DATA_TYPE_OPTIONS = [
  { id: 'VARCHAR', label: 'VARCHAR' },
  { id: 'INT32', label: 'INT32' },
  { id: 'INT64', label: 'INT64' },
  { id: 'DOUBLE', label: 'DOUBLE' },
  { id: 'DATE', label: 'DATE' },
  { id: 'DATE_TIME', label: 'DATE_TIME' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getOrgLabel = (orgId: string) =>
  ORG_OPTIONS.find((o) => o.id === orgId)?.label ?? orgId;

const getUserLabel = (userId: string) =>
  USER_OPTIONS.find((u) => u.id === userId)?.label ?? userId;

// ─── Shared pieces ────────────────────────────────────────────────────────────

const FieldLabel: React.FC<{ children: React.ReactNode; info?: boolean }> = ({
  children,
  info,
}) => (
  <Horizontal gap={spacing.A} align="center">
    <span
      style={{
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium,
        color: systemColors.light['content-primary'],
        lineHeight: '18px',
      }}
    >
      {children}
    </span>
    {info && (
      <Icon
        name="info-circle"
        size="s"
        color={systemColors.light['content-tertiary']}
      />
    )}
  </Horizontal>
);

const SectionLabel: React.FC<{ children: React.ReactNode; info?: boolean }> = ({
  children,
  info,
}) => (
  <Horizontal gap={spacing.B} align="center">
    <span
      style={{
        fontSize: '18px',
        fontWeight: fontWeight.semibold,
        color: systemColors.light['content-primary'],
        lineHeight: '24px',
        letterSpacing: '-0.4px',
      }}
    >
      {children}
    </span>
    {info && (
      <Icon
        name="info-circle"
        size="s"
        color={systemColors.light['content-tertiary']}
      />
    )}
  </Horizontal>
);

const ColHeader: React.FC<{ children: React.ReactNode; info?: boolean }> = ({
  children,
  info,
}) => (
  <Horizontal gap={spacing.A} align="center">
    <span
      style={{
        fontSize: fontSize.xs,
        fontWeight: fontWeight.medium,
        color: systemColors.light['content-secondary'],
        lineHeight: '20px',
      }}
    >
      {children}
    </span>
    {info && (
      <Icon
        name="info-circle"
        size="s"
        color={systemColors.light['content-tertiary']}
      />
    )}
  </Horizontal>
);

// ─── Table shared styles ──────────────────────────────────────────────────────

const tableHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: systemColors.light['background-sunken'],
  borderBottom: `1px solid ${systemColors.light['border-divider']}`,
  padding: `${spacing.B}px ${spacing.C}px`,
  gap: spacing.B,
};

const tableRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: `${spacing.C}px ${spacing.C}px`,
  gap: spacing.B,
  borderBottom: `1px solid ${systemColors.light['border-divider']}`,
};

const tableWrapperStyle: React.CSSProperties = {
  border: `1px solid ${systemColors.light['border-divider']}`,
  borderRadius: radius.md,
  overflow: 'visible',
};

// ─── Step 2 table variants ────────────────────────────────────────────────────

// Figma-specified column widths for org-mapping (total 740px):
// Col 1 (Org name): 311px | Col 2 (Variable values): flex-1 (~366px) | Col 3 (action): 63px
const ORG_COL1 = 311;
const ORG_COL3 = 63;

/** Org-mapping table: Org name | Variable values (;-separated) | X */
const OrgMappingTable: React.FC<{
  rows: OrgRow[];
  onRowChange: (id: string, field: keyof OrgRow, val: string) => void;
  onRowRemove: (id: string) => void;
  onAddRow: () => void;
  /** Hide the bottom "+ Add new row" button — used in iteration 2 where it's in the toolbar */
  hideAddRow?: boolean;
  /** Optional search filter to highlight/filter visible rows */
  searchQuery?: string;
}> = ({ rows, onRowChange, onRowRemove, onAddRow, hideAddRow, searchQuery }) => {
  const visibleRows = searchQuery
    ? rows.filter((r) => {
        const label = getOrgLabel(r.orgId).toLowerCase();
        return label.includes(searchQuery.toLowerCase()) || r.orgId === '';
      })
    : rows;

  return (
    <Vertical gap={spacing.C}>
      <div style={tableWrapperStyle}>
        {/* Header */}
        <div style={tableHeaderStyle}>
          <div style={{ flex: `0 0 ${ORG_COL1}px` }}>
            <ColHeader>Org name</ColHeader>
          </div>
          <div style={{ flex: 1 }}>
            <ColHeader info>
              Variable values (use ; for separation for multiple values)
            </ColHeader>
          </div>
          <div style={{ width: ORG_COL3, flexShrink: 0 }} />
        </div>

        {/* Rows */}
        {visibleRows.map((row) => {
          const usedOrgIds = rows.filter((r) => r.id !== row.id && r.orgId).map((r) => r.orgId);
          const availableOrgs = ORG_OPTIONS.filter((o) => !usedOrgIds.includes(o.id));
          return (
            <div key={row.id} style={tableRowStyle}>
              <div style={{ flex: `0 0 ${ORG_COL1}px` }}>
                <Select
                  options={availableOrgs}
                  value={row.orgId}
                  onChange={(v) => onRowChange(row.id, 'orgId', v)}
                  placeholder="Select org"
                  searchable
                  searchPlaceholder="Search"
                  fullWidth
                />
              </div>
              <div style={{ flex: 1 }}>
                <TextInput
                  placeholder="Enter value"
                  value={row.value}
                  onChange={(e) => onRowChange(row.id, 'value', e.target.value)}
                />
              </div>
              <div style={{ width: ORG_COL3, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="tertiary"
                  size="small"
                  icon="cross"
                  iconOnly
                  aria-label="Remove row"
                  disabled={rows.length === 1}
                  onClick={() => onRowRemove(row.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {!hideAddRow && (
        <Button
          variant="tertiary"
          icon="plus"
          iconPosition="leading"
          size="small"
          onClick={onAddRow}
          style={{ alignSelf: 'flex-start' }}
        >
          Add new row
        </Button>
      )}
    </Vertical>
  );
};

// User-mapping action column widths (fixed); data columns use flex:1 to share remaining space.
const USER_COL4_CROSS_ONLY = 57;
const USER_COL4_PLUS_CROSS = 68;

/** User-mapping table: Org Name | User Name | Variable value | [+] | X */
const UserMappingTable: React.FC<{
  rows: UserRow[];
  onRowChange: (id: string, field: keyof UserRow, val: string) => void;
  onRowRemove: (id: string) => void;
  onAddRow: () => void;
  hideAddRow?: boolean;
  /** Hide the inline + button inside each row (iteration 2) */
  hideRowAddButton?: boolean;
  searchQuery?: string;
}> = ({ rows, onRowChange, onRowRemove, onAddRow, hideAddRow, hideRowAddButton, searchQuery }) => {
  const actionColWidth = hideRowAddButton ? USER_COL4_CROSS_ONLY : USER_COL4_PLUS_CROSS;

  const visibleRows = searchQuery
    ? rows.filter((r) => {
        const orgLabel = getOrgLabel(r.orgId).toLowerCase();
        const userLabel = getUserLabel(r.userId).toLowerCase();
        const q = searchQuery.toLowerCase();
        return orgLabel.includes(q) || userLabel.includes(q) || r.orgId === '';
      })
    : rows;

  return (
    <Vertical gap={spacing.C}>
      <div style={tableWrapperStyle}>
        {/* Header */}
        <div style={tableHeaderStyle}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <ColHeader>Org Name</ColHeader>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <ColHeader>User Name</ColHeader>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <ColHeader>Variable value</ColHeader>
          </div>
          <div style={{ width: actionColWidth, flexShrink: 0 }} />
        </div>

        {/* Rows */}
        {visibleRows.map((row) => {
          const usedOrgIds = rows.filter((r) => r.id !== row.id && r.orgId).map((r) => r.orgId);
          const availableOrgs = ORG_OPTIONS.filter((o) => !usedOrgIds.includes(o.id));
          return (
            <div key={row.id} style={tableRowStyle}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Select
                  options={availableOrgs}
                  value={row.orgId}
                  onChange={(v) => onRowChange(row.id, 'orgId', v)}
                  placeholder="Select org"
                  searchable
                  searchPlaceholder="Search"
                  fullWidth
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Select
                  options={USER_OPTIONS}
                  value={row.userId}
                  onChange={(v) => onRowChange(row.id, 'userId', v)}
                  placeholder="Select user"
                  searchable
                  searchPlaceholder="Search"
                  fullWidth
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <TextInput
                  placeholder="Enter value"
                  value={row.value}
                  onChange={(e) => onRowChange(row.id, 'value', e.target.value)}
                />
              </div>
              <div style={{ width: actionColWidth, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {!hideRowAddButton && (
                  <>
                    <Button
                      variant="tertiary"
                      size="small"
                      icon="plus"
                      iconOnly
                      aria-label="Add row"
                      onClick={onAddRow}
                    >
                      Add
                    </Button>
                    <div
                      style={{
                        width: 1,
                        height: 20,
                        backgroundColor: systemColors.light['border-divider'],
                        margin: `0 ${spacing.A}px`,
                        flexShrink: 0,
                      }}
                    />
                  </>
                )}
                <Button
                  variant="tertiary"
                  size="small"
                  icon="cross"
                  iconOnly
                  aria-label="Remove row"
                  disabled={rows.length === 1}
                  onClick={() => onRowRemove(row.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {!hideAddRow && (
        <Button
          variant="tertiary"
          icon="plus"
          iconPosition="leading"
          size="small"
          onClick={onAddRow}
          style={{ alignSelf: 'flex-start' }}
        >
          Add new row
        </Button>
      )}
    </Vertical>
  );
};

// ─── Step 3 — Review cards ────────────────────────────────────────────────────

const ChevronIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
      flexShrink: 0,
    }}
    aria-hidden="true"
  >
    <path
      d="M6 4L10 8L6 12"
      stroke={systemColors.light['content-secondary']}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReviewCard: React.FC<{
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isExpanded, onToggle, children }) => (
  <div
    style={{
      backgroundColor: systemColors.light['background-sunken'],
      border: `1px solid ${systemColors.light['border-divider']}`,
      borderRadius: 12,
      overflow: 'hidden',
    }}
  >
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.C,
        padding: `${spacing.D}px`,
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <ChevronIcon expanded={isExpanded} />
      <span
        style={{
          fontSize: fontSize.sm,
          fontWeight: fontWeight.semibold,
          color: systemColors.light['content-primary'],
          lineHeight: '20px',
        }}
      >
        {title}
      </span>
    </div>

    {isExpanded && (
      <>
        <Divider spacing="none" />
        <div style={{ padding: `${spacing.D}px` }}>
          {children}
        </div>
      </>
    )}
  </div>
);

/** Mini read-only table for org-only review (org name → variable value) */
const OrgReviewMiniTable: React.FC<{ rows: { value: string }[] }> = ({ rows }) => (
  <div
    style={{
      border: `1px solid ${systemColors.light['border-divider']}`,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: systemColors.light['background-base'],
    }}
  >
    <div style={tableHeaderStyle}>
      <div style={{ flex: 1 }}>
        <ColHeader info>Variable values (use ; for separation for multiple values)</ColHeader>
      </div>
    </div>
    {rows.map((row, i) => (
      <div
        key={i}
        style={{
          ...tableRowStyle,
          backgroundColor: systemColors.light['background-base'],
        }}
      >
        <div style={{ flex: 1 }}>
          <TextInput value={row.value} readOnly placeholder="—" onChange={() => {}} />
        </div>
      </div>
    ))}
  </div>
);

/** Mini read-only table for user review (user name | variable value) */
const UserReviewMiniTable: React.FC<{ rows: { userId: string; value: string }[] }> = ({
  rows,
}) => (
  <div
    style={{
      border: `1px solid ${systemColors.light['border-divider']}`,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: systemColors.light['background-base'],
    }}
  >
    <div style={tableHeaderStyle}>
      <div style={{ flex: 1 }}>
        <ColHeader>User name</ColHeader>
      </div>
      <div style={{ flex: 1 }}>
        <ColHeader info>Variable values (use ; for separation for multiple values)</ColHeader>
      </div>
    </div>
    {rows.map((row, i) => (
      <div
        key={i}
        style={{
          ...tableRowStyle,
          backgroundColor: systemColors.light['background-base'],
        }}
      >
        <div style={{ flex: 1 }}>
          <TextInput value={getUserLabel(row.userId)} readOnly placeholder="—" onChange={() => {}} />
        </div>
        <div style={{ flex: 1 }}>
          <TextInput value={row.value} readOnly placeholder="—" onChange={() => {}} />
        </div>
      </div>
    ))}
  </div>
);

// ─── Props & component ────────────────────────────────────────────────────────

export interface CreateVariableModalProps {
  isOpen: boolean;
  onClose: () => void;
  iteration?: '1' | '2';
}

export const CreateVariableModal: React.FC<CreateVariableModalProps> = ({
  isOpen,
  onClose,
  iteration = '1',
}) => {
  // ── Step 1 state ──────────────────────────────────────────────────────────
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState<VariablePurpose | null>(null);
  const [dataType, setDataType] = useState('VARCHAR');
  const [scopeOrg, setScopeOrg] = useState(true);
  const [scopeUser, setScopeUser] = useState(false);
  const [sensitive, setSensitive] = useState(false);

  // ── Step 2 state ──────────────────────────────────────────────────────────
  const [mappingTab, setMappingTab] = useState<ScopeTab>('org');
  const [orgRows, setOrgRows] = useState<OrgRow[]>([emptyOrgRow()]);
  const [userRows, setUserRows] = useState<UserRow[]>([emptyUserRow()]);
  const [step2Search, setStep2Search] = useState('');

  // ── Step 3 state ──────────────────────────────────────────────────────────
  const [reviewTab, setReviewTab] = useState<ScopeTab>('org');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set(['primary-org']));

  const totalSteps = iteration === '2' ? 3 : 2;
  const canProceed = name.trim().length > 0 && purpose !== null;

  const handleClose = () => {
    setStep(1);
    setName('');
    setPurpose(null);
    setDataType('VARCHAR');
    setScopeOrg(true);
    setScopeUser(false);
    setSensitive(false);
    setMappingTab('org');
    setOrgRows([emptyOrgRow()]);
    setUserRows([emptyUserRow()]);
    setStep2Search('');
    setReviewTab('org');
    setExpandedCards(new Set(['primary-org']));
    onClose();
  };

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ── Step 2 helpers ────────────────────────────────────────────────────────
  const updateOrgRow = (id: string, field: keyof OrgRow, val: string) =>
    setOrgRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  const removeOrgRow = (id: string) =>
    setOrgRows((prev) => prev.filter((r) => r.id !== id));
  const addOrgRow = () => setOrgRows((prev) => [...prev, emptyOrgRow()]);
  const addOrgRowTop = () => setOrgRows((prev) => [emptyOrgRow(), ...prev]);

  const updateUserRow = (id: string, field: keyof UserRow, val: string) =>
    setUserRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  const removeUserRow = (id: string) =>
    setUserRows((prev) => prev.filter((r) => r.id !== id));
  const addUserRow = () => setUserRows((prev) => [...prev, emptyUserRow()]);
  const addUserRowTop = () => setUserRows((prev) => [emptyUserRow(), ...prev]);

  // ── Step 2 scope mode ─────────────────────────────────────────────────────
  const bothScopes = purpose === 'formula' && scopeOrg && scopeUser;
  const userOnly = purpose === 'formula' && !scopeOrg && scopeUser;

  // ── Step 2 title ──────────────────────────────────────────────────────────
  const step2Title =
    purpose === 'formula'
      ? `Assign ${dataType} values`
      : 'Assign values';

  // ─────────────────────────────────────────────────────────────────────────
  // Step 1 rendering helpers
  // ─────────────────────────────────────────────────────────────────────────

  const innerCardStyle: React.CSSProperties = {
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['border-divider']}`,
    borderRadius: radius.md,
    padding: spacing.D,
  };

  const renderExpanded = (id: VariablePurpose) => {
    const SensitiveBlock = () => (
      <Vertical gap={spacing.B}>
        <Horizontal gap={spacing.A} align="center">
          <span style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: systemColors.light['content-primary'], lineHeight: '18px' }}>
            Information type
          </span>
          <Icon name="info-circle" size="s" color={systemColors.light['content-tertiary']} />
        </Horizontal>
        <Checkbox label="Sensitive information" checked={sensitive} onChange={setSensitive} />
      </Vertical>
    );

    if (id === 'formula') {
      return (
        <Vertical gap={spacing.E}>
          <Vertical gap={spacing.B}>
            <span style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: systemColors.light['content-primary'] }}>Data type</span>
            <div style={{ maxWidth: 325 }}>
              <Select options={DATA_TYPE_OPTIONS} value={dataType} onChange={setDataType} />
            </div>
          </Vertical>
          <Divider spacing="none" />
          <Vertical gap={spacing.B}>
            <span style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: systemColors.light['content-primary'] }}>Scope</span>
            <Checkbox label="Org" checked={scopeOrg} onChange={setScopeOrg} />
            <Checkbox label="User" checked={scopeUser} onChange={setScopeUser} />
          </Vertical>
          <Divider spacing="none" />
          <SensitiveBlock />
        </Vertical>
      );
    }
    return <SensitiveBlock />;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Step 2 — Iteration 1 (current 2-step flow)
  // ─────────────────────────────────────────────────────────────────────────

  const renderStep2ContentV1 = () => {
    const scopeLabel = (
      <Horizontal gap={spacing.A} align="center">
        <span style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: systemColors.light['content-primary'] }}>
          Scope mapping
        </span>
        <Icon name="info-circle" size="s" color={systemColors.light['content-tertiary']} />
      </Horizontal>
    );

    if (bothScopes) {
      return (
        <Vertical gap={spacing.E}>
          {scopeLabel}
          <SegmentedControl
            options={[
              { id: 'org', label: 'Org Mapping' },
              { id: 'user', label: 'User Mapping' },
            ]}
            value={mappingTab}
            onChange={(v) => setMappingTab(v as ScopeTab)}
          />
          {mappingTab === 'org' ? (
            <OrgMappingTable rows={orgRows} onRowChange={updateOrgRow} onRowRemove={removeOrgRow} onAddRow={addOrgRow} />
          ) : (
            <UserMappingTable rows={userRows} onRowChange={updateUserRow} onRowRemove={removeUserRow} onAddRow={addUserRow} />
          )}
        </Vertical>
      );
    }

    if (userOnly) {
      return (
        <Vertical gap={spacing.E}>
          {scopeLabel}
          <UserMappingTable rows={userRows} onRowChange={updateUserRow} onRowRemove={removeUserRow} onAddRow={addUserRow} />
        </Vertical>
      );
    }

    return (
      <Vertical gap={spacing.E}>
        {scopeLabel}
        <OrgMappingTable rows={orgRows} onRowChange={updateOrgRow} onRowRemove={removeOrgRow} onAddRow={addOrgRow} />
      </Vertical>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Step 2 — Iteration 2 (3-step flow, with search toolbar)
  // ─────────────────────────────────────────────────────────────────────────

  const renderStep2ContentV2 = () => {
    const activeTable = bothScopes && mappingTab === 'user' ? 'user' : userOnly ? 'user' : 'org';
    const addRow = activeTable === 'user' ? addUserRowTop : addOrgRowTop;

    const toolbar = (
      <Horizontal justify="space-between" align="center">
        <div style={{ width: 200 }}>
          <SearchInput
            placeholder="Search"
            value={step2Search}
            onChange={(e) => setStep2Search(e.target.value)}
          />
        </div>
        <Button variant="tertiary" icon="plus" iconPosition="leading" size="small" onClick={addRow}>
          Add new row
        </Button>
      </Horizontal>
    );

    return (
      <Vertical gap={spacing.D}>
        <SectionLabel info>Scope Mapping</SectionLabel>

        {bothScopes && (
          <SegmentedControl
            options={[
              { id: 'org', label: 'Org Mapping' },
              { id: 'user', label: 'User Mapping' },
            ]}
            value={mappingTab}
            onChange={(v) => {
              setMappingTab(v as ScopeTab);
              setStep2Search('');
            }}
          />
        )}

        {toolbar}

        {activeTable === 'user' ? (
          <UserMappingTable
            rows={userRows}
            onRowChange={updateUserRow}
            onRowRemove={removeUserRow}
            onAddRow={addUserRowTop}
            hideAddRow
            hideRowAddButton
            searchQuery={step2Search}
          />
        ) : (
          <OrgMappingTable
            rows={orgRows}
            onRowChange={updateOrgRow}
            onRowRemove={removeOrgRow}
            onAddRow={addOrgRowTop}
            hideAddRow
            searchQuery={step2Search}
          />
        )}
      </Vertical>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Step 3 — Review (Iteration 2 only)
  // ─────────────────────────────────────────────────────────────────────────

  const renderStep3Content = () => {
    // Group user rows by org
    const userRowsByOrg = userRows.reduce<Record<string, UserRow[]>>((acc, row) => {
      const key = row.orgId || '__unassigned__';
      if (!acc[key]) acc[key] = [];
      acc[key].push(row);
      return acc;
    }, {});

    // Collect all org IDs that appear in any row
    const allOrgIds = bothScopes
      ? Array.from(new Set([
          ...orgRows.map((r) => r.orgId).filter(Boolean),
          ...userRows.map((r) => r.orgId).filter(Boolean),
        ]))
      : userOnly
      ? Array.from(new Set(userRows.map((r) => r.orgId).filter(Boolean)))
      : orgRows.map((r) => r.orgId).filter(Boolean);

    const orgCardsContent = (
      <Vertical gap={spacing.C}>
        {orgRows
          .filter((r) => r.orgId)
          .map((row) => (
            <ReviewCard
              key={row.id}
              title={getOrgLabel(row.orgId)}
              isExpanded={expandedCards.has(row.id)}
              onToggle={() => toggleCard(row.id)}
            >
              <OrgReviewMiniTable rows={[{ value: row.value }]} />
            </ReviewCard>
          ))}
        {orgRows.filter((r) => r.orgId).length === 0 && (
          <span style={{ fontSize: fontSize.sm, color: systemColors.light['content-secondary'] }}>
            No org values assigned
          </span>
        )}
      </Vertical>
    );

    const userCardsContent = (
      <Vertical gap={spacing.C}>
        {allOrgIds.map((orgId) => {
          const orgLabel = getOrgLabel(orgId);
          const cardId = `review-user-${orgId}`;
          const rows = userRowsByOrg[orgId] ?? [];
          return (
            <ReviewCard
              key={orgId}
              title={orgLabel}
              isExpanded={expandedCards.has(cardId)}
              onToggle={() => toggleCard(cardId)}
            >
              {rows.length > 0 ? (
                <UserReviewMiniTable rows={rows.map((r) => ({ userId: r.userId, value: r.value }))} />
              ) : (
                <span style={{ fontSize: fontSize.sm, color: systemColors.light['content-secondary'] }}>
                  No user values assigned
                </span>
              )}
            </ReviewCard>
          );
        })}
        {allOrgIds.length === 0 && (
          <span style={{ fontSize: fontSize.sm, color: systemColors.light['content-secondary'] }}>
            No user values assigned
          </span>
        )}
      </Vertical>
    );

    // Tab bar styles
    const tabBarStyle: React.CSSProperties = {
      display: 'flex',
      borderBottom: `1px solid ${systemColors.light['border-divider']}`,
      marginBottom: spacing.D,
    };
    const tabStyle = (active: boolean): React.CSSProperties => ({
      padding: `6px ${spacing.C}px`,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.regular,
      color: active ? systemColors.light['content-brand'] : systemColors.light['content-primary'],
      border: 'none',
      borderBottom: active ? `2px solid ${systemColors.light['content-brand']}` : '2px solid transparent',
      marginBottom: -1,
      cursor: 'pointer',
      background: 'none',
      outline: 'none',
      lineHeight: '20px',
    });

    // Org-only: no tabs, just org cards
    if (!bothScopes && !userOnly) {
      return (
        <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
          {orgCardsContent}
        </div>
      );
    }

    // User-only: no tabs, just user cards
    if (userOnly) {
      return (
        <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
          {userCardsContent}
        </div>
      );
    }

    // Both: tabs
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
        <div style={tabBarStyle}>
          <button
            style={tabStyle(reviewTab === 'org')}
            onClick={() => setReviewTab('org')}
          >
            Org Mapping
          </button>
          <button
            style={tabStyle(reviewTab === 'user')}
            onClick={() => setReviewTab('user')}
          >
            User Mapping
          </button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {reviewTab === 'org' ? orgCardsContent : userCardsContent}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Footers
  // ─────────────────────────────────────────────────────────────────────────

  const step1Footer = (
    <Horizontal justify="space-between" align="center" style={{ width: '100%' }}>
      <Link href="#" onClick={(e) => { e.preventDefault(); handleClose(); }}>
        Cancel
      </Link>
      <Button variant="primary" disabled={!canProceed} onClick={() => setStep(2)}>
        Next
      </Button>
    </Horizontal>
  );

  // Iteration 1: step 2 footer has "Save"
  const step2FooterV1 = (
    <Horizontal justify="space-between" align="center" style={{ width: '100%' }}>
      <Link href="#" onClick={(e) => { e.preventDefault(); handleClose(); }}>
        Cancel
      </Link>
      <Horizontal gap={spacing.C} align="center">
        <Button variant="tertiary" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save
        </Button>
      </Horizontal>
    </Horizontal>
  );

  // Iteration 2: step 2 footer has "Next" → goes to step 3
  const step2FooterV2 = (
    <Horizontal justify="space-between" align="center" style={{ width: '100%' }}>
      <Link href="#" onClick={(e) => { e.preventDefault(); handleClose(); }}>
        Cancel
      </Link>
      <Horizontal gap={spacing.C} align="center">
        <Button variant="tertiary" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button variant="primary" onClick={() => { setStep(3); setExpandedCards(new Set()); }}>
          Next
        </Button>
      </Horizontal>
    </Horizontal>
  );

  // Iteration 2: step 3 footer has "Save"
  const step3Footer = (
    <Horizontal justify="space-between" align="center" style={{ width: '100%' }}>
      <Link href="#" onClick={(e) => { e.preventDefault(); handleClose(); }}>
        Cancel
      </Link>
      <Horizontal gap={spacing.C} align="center">
        <Button variant="tertiary" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save
        </Button>
      </Horizontal>
    </Horizontal>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Active footer
  // ─────────────────────────────────────────────────────────────────────────

  const activeFooter =
    step === 1
      ? step1Footer
      : step === 2
      ? iteration === '2'
        ? step2FooterV2
        : step2FooterV1
      : step3Footer;

  // ─────────────────────────────────────────────────────────────────────────
  // Step title
  // ─────────────────────────────────────────────────────────────────────────

  const modalTitle =
    step === 1
      ? 'Add variable details'
      : step === 2
      ? step2Title
      : 'Review values';

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      eyebrow="Create variable"
      title={modalTitle}
      type="wizard"
      currentStep={step}
      totalSteps={totalSteps}
      size="M2"
      className={styles.fixedModal}
      footer={activeFooter}
    >
      {step === 1 ? (
        /* ── Step 1 ── */
        <Vertical gap={spacing.F}>
          <div style={{ width: 325 }}>
            <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <Vertical gap={spacing.C}>
            <Horizontal gap={spacing.A} align="center">
              <span style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: systemColors.light['content-primary'], lineHeight: '18px' }}>
                Purpose
              </span>
              <Icon name="info-circle" size="s" color={systemColors.light['content-tertiary']} />
            </Horizontal>

            <Vertical gap={spacing.B}>
              {PURPOSE_OPTIONS.map((option) => {
                const selected = purpose === option.id;
                return (
                  <div
                    key={option.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected}
                    onClick={() => { setPurpose(option.id); setSensitive(false); }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setPurpose(option.id);
                        setSensitive(false);
                      }
                    }}
                    style={{
                      backgroundColor: systemColors.light['background-sunken'],
                      border: `1px solid ${selected ? systemColors.light['border-default'] : systemColors.light['border-divider']}`,
                      borderRadius: radius.lg,
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <div style={{ padding: `${spacing.D}px` }}>
                      <Radio
                        label={option.label}
                        checked={selected}
                        name="variable-purpose"
                        value={option.id}
                        onChange={() => { setPurpose(option.id); setSensitive(false); }}
                      />
                    </div>
                    {selected && (
                      <>
                        <Divider spacing="none" />
                        <div style={{ padding: spacing.D }}>
                          <div style={innerCardStyle}>{renderExpanded(option.id)}</div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </Vertical>
          </Vertical>
        </Vertical>
      ) : step === 2 ? (
        /* ── Step 2 ── */
        iteration === '2' ? renderStep2ContentV2() : renderStep2ContentV1()
      ) : (
        /* ── Step 3 (Iteration 2 only) ── */
        renderStep3Content()
      )}
    </Modal>
  );
};
