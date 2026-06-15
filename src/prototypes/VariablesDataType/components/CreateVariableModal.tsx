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
import { Alert } from '../../../components/Alert';
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

/** Hardcoded primary-org name shown in the segmented control tab when adminScope = 'primary' */
const PRIMARY_ORG_NAME = 'Acme Corp';

const ORG_OPTIONS = [
  { id: 'acme-corp', label: 'Acme Corp' },
  { id: 'technova', label: 'TechNova Inc' },
  { id: 'globalfinance', label: 'GlobalFinance Ltd' },
  { id: 'healthfirst', label: 'HealthFirst Systems' },
  { id: 'retailmax', label: 'RetailMax Group' },
  { id: 'datastream', label: 'DataStream Analytics' },
  { id: 'cloudventure', label: 'CloudVenture Co' },
  { id: 'pinnacle', label: 'Pinnacle Industries' },
  { id: 'bluestar', label: 'BlueStar Enterprises' },
  { id: 'novapulse', label: 'NovaPulse Technologies' },
  { id: 'meridian', label: 'Meridian Solutions' },
  { id: 'vertex-capital', label: 'Vertex Capital' },
  { id: 'skybridge', label: 'SkyBridge Networks' },
  { id: 'quantum', label: 'Quantum Dynamics' },
  { id: 'atlas', label: 'Atlas Consulting' },
  { id: 'horizon-media', label: 'Horizon Media' },
  { id: 'ironcore', label: 'IronCore Systems' },
  { id: 'silverline', label: 'Silverline Corp' },
  { id: 'nexus', label: 'Nexus Partners' },
  { id: 'zenith', label: 'Zenith Strategies' },
];

const USER_OPTIONS = [
  { id: 'u01', label: 'Aarav Sharma' },
  { id: 'u02', label: 'Abigail Turner' },
  { id: 'u03', label: 'Abhishek Patel' },
  { id: 'u04', label: 'Adam Mitchell' },
  { id: 'u05', label: 'Akira Tanaka' },
  { id: 'u06', label: 'Alejandro Ruiz' },
  { id: 'u07', label: 'Alicia Chen' },
  { id: 'u08', label: 'Amanda Foster' },
  { id: 'u09', label: 'Amir Hassan' },
  { id: 'u10', label: 'Andrea Costa' },
  { id: 'u11', label: 'Ankit Verma' },
  { id: 'u12', label: 'Anna Kowalski' },
  { id: 'u13', label: 'Arjun Nair' },
  { id: 'u14', label: 'Ayesha Khan' },
  { id: 'u15', label: 'Benjamin Clark' },
  { id: 'u16', label: 'Bhavya Reddy' },
  { id: 'u17', label: 'Carlos Mendez' },
  { id: 'u18', label: 'Catherine Lee' },
  { id: 'u19', label: 'Chiara Romano' },
  { id: 'u20', label: 'Christine Hall' },
  { id: 'u21', label: 'Daniel Wong' },
  { id: 'u22', label: 'David Okonkwo' },
  { id: 'u23', label: 'Deepak Malhotra' },
  { id: 'u24', label: 'Elena Vasquez' },
  { id: 'u25', label: 'Emily Davis' },
  { id: 'u26', label: 'Ethan Brooks' },
  { id: 'u27', label: 'Farhan Ali' },
  { id: 'u28', label: 'Fatima Al-Rashid' },
  { id: 'u29', label: 'Gabriel Santos' },
  { id: 'u30', label: 'Gaurav Gupta' },
  { id: 'u31', label: 'Grace Thompson' },
  { id: 'u32', label: 'Hannah Mueller' },
  { id: 'u33', label: 'Haruto Sato' },
  { id: 'u34', label: 'Isabelle Dubois' },
  { id: 'u35', label: 'Ishan Desai' },
  { id: 'u36', label: 'James Williams' },
  { id: 'u37', label: 'Jasmine Rodriguez' },
  { id: 'u38', label: 'Jason Kim' },
  { id: 'u39', label: 'Jennifer Martinez' },
  { id: 'u40', label: 'Jonas Weber' },
  { id: 'u41', label: 'Karan Mehta' },
  { id: 'u42', label: 'Karen Wilson' },
  { id: 'u43', label: 'Kenji Nakamura' },
  { id: 'u44', label: 'Kevin O\'Brien' },
  { id: 'u45', label: 'Kofi Mensah' },
  { id: 'u46', label: 'Laura Sanchez' },
  { id: 'u47', label: 'Leah Cooper' },
  { id: 'u48', label: 'Li Wei' },
  { id: 'u49', label: 'Lucas Bernard' },
  { id: 'u50', label: 'Manisha Joshi' },
  { id: 'u51', label: 'Maria Fernandez' },
  { id: 'u52', label: 'Mark Johnson' },
  { id: 'u53', label: 'Mei Ling' },
  { id: 'u54', label: 'Michael Brown' },
  { id: 'u55', label: 'Mohamed Ibrahim' },
  { id: 'u56', label: 'Natasha Ivanova' },
  { id: 'u57', label: 'Neha Kapoor' },
  { id: 'u58', label: 'Nicholas Taylor' },
  { id: 'u59', label: 'Nisha Pillai' },
  { id: 'u60', label: 'Olivia Harris' },
  { id: 'u61', label: 'Palak Shah' },
  { id: 'u62', label: 'Pedro Alves' },
  { id: 'u63', label: 'Poonam Singh' },
  { id: 'u64', label: 'Priya Krishnan' },
  { id: 'u65', label: 'Rachel Green' },
  { id: 'u66', label: 'Rahul Saxena' },
  { id: 'u67', label: 'Raj Bhatia' },
  { id: 'u68', label: 'Ravi Chandran' },
  { id: 'u69', label: 'Rebecca Moore' },
  { id: 'u70', label: 'Reshma Acharya' },
  { id: 'u71', label: 'Ricardo Gomez' },
  { id: 'u72', label: 'Robert Anderson' },
  { id: 'u73', label: 'Rohit Agarwal' },
  { id: 'u74', label: 'Ryan Thompson' },
  { id: 'u75', label: 'Sakura Yamamoto' },
  { id: 'u76', label: 'Sameer Hussain' },
  { id: 'u77', label: 'Sarah Johnson' },
  { id: 'u78', label: 'Shira Cohen' },
  { id: 'u79', label: 'Shreya Banerjee' },
  { id: 'u80', label: 'Sofia Petrov' },
  { id: 'u81', label: 'Srinivas Rao' },
  { id: 'u82', label: 'Stephanie Clark' },
  { id: 'u83', label: 'Sunita Dhingra' },
  { id: 'u84', label: 'Tanya Osei' },
  { id: 'u85', label: 'Thomas Müller' },
  { id: 'u86', label: 'Timothy Allen' },
  { id: 'u87', label: 'Usha Ramakrishnan' },
  { id: 'u88', label: 'Valentina Cruz' },
  { id: 'u89', label: 'Vikram Yadav' },
  { id: 'u90', label: 'Vishal Tiwari' },
  { id: 'u91', label: 'William Parker' },
  { id: 'u92', label: 'Xiao Lin' },
  { id: 'u93', label: 'Yamini Bose' },
  { id: 'u94', label: 'Yash Chauhan' },
  { id: 'u95', label: 'Zara Ahmed' },
  { id: 'u96', label: 'Zheng Wei' },
  { id: 'u97', label: 'Zoey Martin' },
  { id: 'u98', label: 'Aditya Kumar' },
  { id: 'u99', label: 'Bernadette Walsh' },
  { id: 'u100', label: 'Chirag Pandey' },
];

const PURPOSE_OPTIONS = [
  { id: 'connection' as VariablePurpose, label: 'Connection Property' },
  { id: 'formula' as VariablePurpose, label: 'Formula Variable' },
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

// Figma-specified column widths for org-mapping (node 274:107204):
// Col 1 (Org name): flex-1 | Col 2 (Variable values): 366px fixed | Col 3 (action): 63px
const ORG_COL2 = 366;
const ORG_COL3 = 63;

/** Org-mapping table: Org name | Variable values (;-separated) | X */
const OrgMappingTable: React.FC<{
  rows: OrgRow[];
  onRowChange: (id: string, field: keyof OrgRow, val: string) => void;
  onRowRemove: (id: string) => void;
  onAddRow: () => void;
  /** Hide the bottom "+ Add new row" button — used when toolbar owns it */
  hideAddRow?: boolean;
  /** Optional search filter */
  searchQuery?: string;
  rowErrors?: Record<string, { value?: string }>;
  /** Primary-org mode: single fixed row, org name shown read-only in col 1 */
  isPrimaryOrg?: boolean;
  /** Name of the primary org to display in col 1 when isPrimaryOrg is true */
  primaryOrgName?: string;
}> = ({ rows, onRowChange, onRowRemove, onAddRow, hideAddRow, searchQuery, rowErrors, isPrimaryOrg, primaryOrgName }) => {
  const visibleRows = searchQuery
    ? rows.filter((r) => {
        const label = getOrgLabel(r.orgId).toLowerCase();
        return label.includes(searchQuery.toLowerCase()) || r.orgId === '';
      })
    : rows;

  // Primary-org: 2-column table — col 1 = read-only org name, col 2 = value input
  if (isPrimaryOrg) {
    const row = rows[0];
    const rowErr = rowErrors?.[row.id] ?? {};
    return (
      <div style={tableWrapperStyle}>
        <div style={tableHeaderStyle}>
          <div style={{ flex: 1 }}>
            <ColHeader>Org name</ColHeader>
          </div>
          <div style={{ flex: `0 0 ${ORG_COL2}px` }}>
            <ColHeader info>
              Variable values (use ; for separation for multiple values)
            </ColHeader>
          </div>
          <div style={{ width: ORG_COL3, flexShrink: 0 }} />
        </div>
        <div style={tableRowStyle}>
          <div style={{ flex: 1 }}>
            <TextInput
              value={primaryOrgName ?? ''}
              readOnly
              onChange={() => {}}
            />
          </div>
          <div style={{ flex: `0 0 ${ORG_COL2}px` }}>
            <TextInput
              placeholder="Enter value"
              value={row.value}
              onChange={(e) => onRowChange(row.id, 'value', e.target.value)}
              error={!!rowErr.value}
              errorMessage={rowErr.value}
            />
          </div>
          <div style={{ width: ORG_COL3, flexShrink: 0 }} />
        </div>
      </div>
    );
  }

  return (
    <Vertical gap={spacing.C}>
      <div style={tableWrapperStyle}>
        {/* Header */}
        <div style={tableHeaderStyle}>
          <div style={{ flex: 1 }}>
            <ColHeader>Org name</ColHeader>
          </div>
          <div style={{ flex: `0 0 ${ORG_COL2}px` }}>
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
          const rowErr = rowErrors?.[row.id] ?? {};
          return (
            <div key={row.id} style={tableRowStyle}>
              {/* Col 1: org name — read-only display once selected, Select when empty */}
              <div style={{ flex: 1 }}>
                {row.orgId ? (
                  <TextInput
                    value={getOrgLabel(row.orgId)}
                    readOnly
                    onChange={() => {}}
                  />
                ) : (
                  <Select
                    options={availableOrgs}
                    value={row.orgId}
                    onChange={(v) => onRowChange(row.id, 'orgId', v)}
                    placeholder="Select org"
                    searchable
                    searchPlaceholder="Search"
                    size="large"
                    fullWidth
                  />
                )}
              </div>
              {/* Col 2: variable value */}
              <div style={{ flex: `0 0 ${ORG_COL2}px` }}>
                <TextInput
                  placeholder="Enter value"
                  value={row.value}
                  onChange={(e) => onRowChange(row.id, 'value', e.target.value)}
                  error={!!rowErr.value}
                  errorMessage={rowErr.value}
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
          onClick={() => onAddRow()}
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

/** User-mapping table: [Org Name |] User Name | Variable value | [+] | X */
const UserMappingTable: React.FC<{
  rows: UserRow[];
  onRowChange: (id: string, field: keyof UserRow, val: string) => void;
  onRowRemove: (id: string) => void;
  /** orgId is forwarded so the new row inherits the clicked row's org */
  onAddRow: (orgId?: string) => void;
  hideAddRow?: boolean;
  /** Hide the inline + button inside each row */
  hideRowAddButton?: boolean;
  searchQuery?: string;
  rowErrors?: Record<string, { value?: string }>;
  /** Primary-org mode: hide org column */
  isPrimaryOrg?: boolean;
}> = ({ rows, onRowChange, onRowRemove, onAddRow, hideAddRow, hideRowAddButton, searchQuery, rowErrors, isPrimaryOrg }) => {
  const actionColWidth = hideRowAddButton ? USER_COL4_CROSS_ONLY : USER_COL4_PLUS_CROSS;

  const visibleRows = searchQuery
    ? rows.filter((r) => {
        const userLabel = getUserLabel(r.userId).toLowerCase();
        const q = searchQuery.toLowerCase();
        if (isPrimaryOrg) return userLabel.includes(q) || r.userId === '';
        const orgLabel = getOrgLabel(r.orgId).toLowerCase();
        return orgLabel.includes(q) || userLabel.includes(q) || r.orgId === '';
      })
    : rows;

  return (
    <Vertical gap={spacing.C}>
      <div style={tableWrapperStyle}>
        {/* Header */}
        <div style={tableHeaderStyle}>
          {!isPrimaryOrg && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <ColHeader>Org Name</ColHeader>
            </div>
          )}
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
          // Users already assigned in other rows are hidden from this row's dropdown
          const usedUserIds = rows.filter((r) => r.id !== row.id && r.userId).map((r) => r.userId);
          const availableUsers = USER_OPTIONS.filter((u) => !usedUserIds.includes(u.id));
          const rowErr = rowErrors?.[row.id] ?? {};
          return (
            <div key={row.id} style={tableRowStyle}>
              {!isPrimaryOrg && (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Select
                    options={ORG_OPTIONS}
                    value={row.orgId}
                    onChange={(v) => onRowChange(row.id, 'orgId', v)}
                    placeholder="Select org"
                    searchable
                    searchPlaceholder="Search"
                    size="large"
                    fullWidth
                  />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <Select
                  options={availableUsers}
                  value={row.userId}
                  onChange={(v) => onRowChange(row.id, 'userId', v)}
                  placeholder="Select user"
                  searchable
                  searchPlaceholder="Search"
                  size="large"
                  fullWidth
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <TextInput
                  placeholder="Enter value"
                  value={row.value}
                  onChange={(e) => onRowChange(row.id, 'value', e.target.value)}
                  error={!!rowErr.value}
                  errorMessage={rowErr.value}
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
                      onClick={() => onAddRow(row.orgId)}
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
          onClick={() => onAddRow()}
          style={{ alignSelf: 'flex-start' }}
        >
          Add new row
        </Button>
      )}
    </Vertical>
  );
};


// ─── Props & component ────────────────────────────────────────────────────────

export interface CreateVariableModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 'all' = super-admin across all orgs (default); 'primary' = org admin in their own org */
  adminScope?: 'all' | 'primary';
}

export const CreateVariableModal: React.FC<CreateVariableModalProps> = ({
  isOpen,
  onClose,
  adminScope = 'all',
}) => {
  const isPrimaryOrg = adminScope === 'primary';
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

  // ── Validation error state ─────────────────────────────────────────────────
  // Only value-field data-type errors are stored per-row (shown inline).
  // Required-field validation shows a single section banner instead.
  type OrgRowErr  = { value?: string };
  type UserRowErr = { value?: string };
  const [nameError,       setNameError]       = useState('');
  const [step2BannerError, setStep2BannerError] = useState('');
  const [orgRowErrors,  setOrgRowErrors]  = useState<Record<string, OrgRowErr>>({});
  const [userRowErrors, setUserRowErrors] = useState<Record<string, UserRowErr>>({});

  const totalSteps = 2;

  // ── Step navigation with validation ──────────────────────────────────────

  const handleStep1Next = () => {
    if (!name.trim()) {
      setNameError('Variable name is required');
      return;
    }
    setNameError('');
    setStep(2);
  };

  const validateStep2 = (): boolean => {
    let hasEmpty = false;
    const newOrgErrors: Record<string, OrgRowErr> = {};
    const newUserErrors: Record<string, UserRowErr> = {};

    if (!userOnly) {
      orgRows.forEach((row) => {
        // In primary-org mode there's no org selector — only the value is required
        const orgRequired = !isPrimaryOrg && !row.orgId;
        if (orgRequired || !row.value.trim()) {
          hasEmpty = true;
        } else {
          const typeErr = validateValue(row.value, dataType);
          if (typeErr) newOrgErrors[row.id] = { value: typeErr };
        }
      });
    }

    if (bothScopes || userOnly) {
      userRows.forEach((row) => {
        // In primary-org mode org column is hidden — only userId + value are required
        const orgRequired = !isPrimaryOrg && !row.orgId;
        if (orgRequired || !row.userId || !row.value.trim()) {
          hasEmpty = true;
        } else {
          const typeErr = validateValue(row.value, dataType);
          if (typeErr) newUserErrors[row.id] = { value: typeErr };
        }
      });
    }

    setOrgRowErrors(newOrgErrors);
    setUserRowErrors(newUserErrors);

    if (hasEmpty) {
      setStep2BannerError('Fill in all required fields to proceed');
      return false;
    }

    const hasTypeErrors =
      Object.keys(newOrgErrors).length > 0 || Object.keys(newUserErrors).length > 0;
    setStep2BannerError('');
    return !hasTypeErrors;
  };

  const handleStep2Proceed = () => {
    if (!validateStep2()) return;
    handleClose();
  };

  // Validate a value string against the chosen data type; returns '' if valid.
  const validateValue = (val: string, dt: string): string => {
    const v = val.trim();
    if (!v) return '';
    switch (dt) {
      case 'INT':     return /^-?\d+$/.test(v)             ? '' : `Enter a valid ${dt} value`;
      case 'FLOAT':   return /^-?\d+(\.\d+)?$/.test(v)     ? '' : `Enter a valid ${dt} value`;
      case 'BOOLEAN': return /^(true|false|0|1)$/i.test(v) ? '' : 'Enter true or false';
      case 'DATE':    return isNaN(Date.parse(v))           ? 'Enter a valid date (YYYY-MM-DD)' : '';
      default:        return '';
    }
  };

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
    setNameError('');
    setStep2BannerError('');
    setOrgRowErrors({});
    setUserRowErrors({});
    onClose();
  };

  // ── Step 2 helpers ────────────────────────────────────────────────────────
  const updateOrgRow = (id: string, field: keyof OrgRow, val: string) => {
    setOrgRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
    setStep2BannerError('');
    if (field === 'value') {
      setOrgRowErrors((prev) => {
        const typeErr = validateValue(val, dataType);
        const rowErr: OrgRowErr = typeErr ? { value: typeErr } : {};
        return { ...prev, [id]: rowErr };
      });
    }
  };
  const removeOrgRow = (id: string) => {
    setOrgRows((prev) => prev.filter((r) => r.id !== id));
    setOrgRowErrors((prev) => { const next = { ...prev }; delete next[id]; return next; });
  };
  const addOrgRowTop = () => setOrgRows((prev) => [emptyOrgRow(), ...prev]);

  const updateUserRow = (id: string, field: keyof UserRow, val: string) => {
    setUserRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
    setStep2BannerError('');
    if (field === 'value') {
      setUserRowErrors((prev) => {
        const typeErr = validateValue(val, dataType);
        const rowErr: UserRowErr = typeErr ? { value: typeErr } : {};
        return { ...prev, [id]: rowErr };
      });
    }
  };
  const removeUserRow = (id: string) => {
    setUserRows((prev) => prev.filter((r) => r.id !== id));
    setUserRowErrors((prev) => { const next = { ...prev }; delete next[id]; return next; });
  };
  // orgId is optional: when provided the new row inherits that org (row-level + click);
  // when omitted the new row copies the org from the top row.
  const addUserRowTop = (orgId?: string) =>
    setUserRows((prev) => {
      const defaultOrg = orgId ?? (prev.length > 0 ? prev[0].orgId : '');
      return [{ ...emptyUserRow(), orgId: defaultOrg }, ...prev];
    });

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
        </Vertical>
      );
    }
    return <SensitiveBlock />;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Step 2 — 3-step flow with search toolbar
  // ─────────────────────────────────────────────────────────────────────────

  const renderStep2Content = () => {
    const activeTable = bothScopes && mappingTab === 'user' ? 'user' : userOnly ? 'user' : 'org';
    // In primary-org mode, org tab has a single fixed row — no "Add new row"
    const showAddRow = !(isPrimaryOrg && activeTable === 'org');
    const addRow = activeTable === 'user' ? addUserRowTop : addOrgRowTop;

    const toolbar = (
      <Horizontal justify="space-between" align="center">
        <Horizontal gap={10} align="center">
          <div style={{ width: 200 }}>
            <SearchInput
              placeholder="Search"
              value={step2Search}
              onChange={(e) => setStep2Search(e.target.value)}
            />
          </div>
          {bothScopes && (
            <SegmentedControl
              options={[
                { id: 'org', label: isPrimaryOrg ? PRIMARY_ORG_NAME : 'Org' },
                { id: 'user', label: 'User' },
              ]}
              value={mappingTab}
              onChange={(v) => {
                setMappingTab(v as ScopeTab);
                setStep2Search('');
              }}
            />
          )}
        </Horizontal>
        {showAddRow && (
          <Button variant="tertiary" icon="plus" iconPosition="leading" size="small" onClick={() => addRow()}>
            Add new row
          </Button>
        )}
      </Horizontal>
    );

    return (
      <Vertical gap={spacing.D}>
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
            rowErrors={userRowErrors}
            isPrimaryOrg={isPrimaryOrg}
          />
        ) : (
          <OrgMappingTable
            rows={orgRows}
            onRowChange={updateOrgRow}
            onRowRemove={removeOrgRow}
            onAddRow={addOrgRowTop}
            hideAddRow
            searchQuery={step2Search}
            rowErrors={orgRowErrors}
            isPrimaryOrg={isPrimaryOrg}
            primaryOrgName={PRIMARY_ORG_NAME}
          />
        )}
      </Vertical>
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
      <Button variant="primary" disabled={purpose === null} onClick={handleStep1Next}>
        Next
      </Button>
    </Horizontal>
  );

  const step2Footer = (
    <Horizontal justify="space-between" align="center" style={{ width: '100%' }}>
      <Link href="#" onClick={(e) => { e.preventDefault(); handleClose(); }}>
        Cancel
      </Link>
      <Horizontal gap={spacing.C} align="center">
        <Button variant="tertiary" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button variant="primary" onClick={handleStep2Proceed}>
          Save
        </Button>
      </Horizontal>
    </Horizontal>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Active footer
  // ─────────────────────────────────────────────────────────────────────────

  const activeFooter = step === 1 ? step1Footer : step2Footer;

  // ─────────────────────────────────────────────────────────────────────────
  // Step title
  // ─────────────────────────────────────────────────────────────────────────

  const modalTitle = step === 1 ? 'Add variable details' : step2Title;

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
            <TextInput
              label="Name"
              value={name}
              onChange={(e) => { setName(e.target.value); if (e.target.value.trim()) setNameError(''); }}
              error={!!nameError}
              errorMessage={nameError}
            />
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
      ) : (
        /* ── Step 2 ── */
        <Vertical gap={spacing.C}>
          {step2BannerError && (
            <Alert
              status="failure"
              variant="section"
              message={step2BannerError}
              dismissible
              onDismiss={() => setStep2BannerError('')}
              className={styles.bannerFullWidth}
            />
          )}
          {renderStep2Content()}
        </Vertical>
      )}
    </Modal>
  );
};
