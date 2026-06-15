import React, { useState } from 'react';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { TextInput } from '../../../components/TextInput';
import { Select } from '../../../components/Select';
import { SearchInput } from '../../../components/SearchInput';
import { Link } from '../../../components/Link';
import { Horizontal, Vertical } from '../../../components/Layout';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontSize, fontWeight } from '../../../tokens/typography';
import type { VariableRow } from '../data/mockData';

// ─── Mock org options (same set as create modal) ──────────────────────────────

const ORG_OPTIONS = [
  { id: 'acme-corp',       label: 'Acme Corp' },
  { id: 'technova',        label: 'TechNova Inc' },
  { id: 'globalfinance',   label: 'GlobalFinance Ltd' },
  { id: 'healthfirst',     label: 'HealthFirst Systems' },
  { id: 'retailmax',       label: 'RetailMax Group' },
  { id: 'datastream',      label: 'DataStream Analytics' },
  { id: 'cloudventure',    label: 'CloudVenture Co' },
  { id: 'pinnacle',        label: 'Pinnacle Industries' },
];

const getOrgLabel = (orgId: string) =>
  ORG_OPTIONS.find((o) => o.id === orgId)?.label ?? orgId;

// ─── Row types ────────────────────────────────────────────────────────────────

let _id = 0;
const nextId = () => `edit-row-${++_id}`;

interface EditRow {
  id: string;
  orgId: string;
  value: string;
}

const emptyRow = (): EditRow => ({ id: nextId(), orgId: '', value: '' });

// ─── Shared table styles ──────────────────────────────────────────────────────

const tableWrapperStyle: React.CSSProperties = {
  border: `1px solid ${systemColors.light['border-divider']}`,
  borderRadius: 8,
  overflow: 'hidden',
};

const tableHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: systemColors.light['background-sunken'],
  borderBottom: `1px solid ${systemColors.light['border-divider']}`,
  padding: `7px ${spacing.D}px`,
};

const tableRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.C,
  padding: spacing.C,
  borderBottom: `1px solid ${systemColors.light['border-divider']}`,
  minHeight: 72,
};

const ColHeader: React.FC<{ children: React.ReactNode; info?: boolean }> = ({
  children,
  info,
}) => (
  <Horizontal gap={4} align="center">
    <span
      style={{
        fontSize: fontSize.xs,
        fontWeight: fontWeight.regular,
        color: systemColors.light['content-secondary'],
        lineHeight: '18px',
        letterSpacing: '-0.072px',
      }}
    >
      {children}
    </span>
    {info && (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5.5" stroke={systemColors.light['content-tertiary']} />
        <path
          d="M6 5.5V8.5M6 4V3.5"
          stroke={systemColors.light['content-tertiary']}
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    )}
  </Horizontal>
);

// ─── Column widths ────────────────────────────────────────────────────────────

const COL2 = 366;
const COL3 = 63;

// ─── Props ────────────────────────────────────────────────────────────────────

export interface EditVariableModalProps {
  isOpen: boolean;
  /** Called when Cancel is clicked — returns to the detail card */
  onClose: () => void;
  /** Called when Save is clicked — closes everything */
  onSave?: () => void;
  variable: VariableRow | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const EditVariableModal: React.FC<EditVariableModalProps> = ({
  isOpen,
  onClose,
  onSave,
  variable,
}) => {
  const [rows, setRows] = useState<EditRow[]>([
    { id: nextId(), orgId: 'acme-corp',     value: 'SARANJIT; SARANJIT2; SARANJIT3' },
    { id: nextId(), orgId: 'technova',      value: 'TECHVAL; TECHVAL2' },
    { id: nextId(), orgId: 'globalfinance', value: 'GFL_01; GFL_02; GFL_03' },
  ]);
  const [search, setSearch] = useState('');

  const handleClose = () => {
    setSearch('');
    onClose();
  };

  const updateRow = (id: string, field: keyof EditRow, val: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  };

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const addRow = () => {
    setRows((prev) => [emptyRow(), ...prev]);
  };

  const visibleRows = search
    ? rows.filter((r) =>
        getOrgLabel(r.orgId).toLowerCase().includes(search.toLowerCase()) ||
        r.orgId === ''
      )
    : rows;

  if (!variable) return null;

  const dataType = 'VARCHAR';

  // ── Custom header (eyebrow + typed title) ──────────────────────────────────
  // Modal `title` is a plain string; we need rich text so we use `eyebrow` +
  // a custom approach: we pass the title with the data type styled inline via
  // the headerContent pattern — rendered as modal body top area instead.
  // We use the Modal's `eyebrow` prop for "Edit variable" and `title` for the
  // main heading composed as plain text fallback.

  const footer = (
    <Horizontal justify="space-between" align="center" style={{ width: '100%' }}>
      <Link href="#" onClick={(e) => { e.preventDefault(); handleClose(); }}>
        Cancel
      </Link>
      <Button variant="primary" onClick={() => { setSearch(''); onSave?.(); }}>
        Save
      </Button>
    </Horizontal>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      eyebrow="Edit variable"
      title={`Assign ${dataType} values`}
      footer={footer}
      size="M2"
    >
      {/* Fixed-height body so total modal ≈ 690px (header ~88px + footer ~72px + body 530px) */}
      <div style={{ height: 530, overflowY: 'auto' }}>
      <Vertical gap={spacing.H}>
        {/* Toolbar: search + add new row */}
        <Horizontal justify="space-between" align="center">
          <SearchInput
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 200 }}
          />
          <Button
            variant="tertiary"
            icon="plus"
            iconPosition="leading"
            size="small"
            onClick={addRow}
          >
            Add new row
          </Button>
        </Horizontal>

        {/* Mapping table */}
        <div style={tableWrapperStyle}>
          {/* Header */}
          <div style={tableHeaderStyle}>
            <div style={{ flex: 1 }}>
              <ColHeader>Org name</ColHeader>
            </div>
            <div style={{ flex: `0 0 ${COL2}px` }}>
              <ColHeader info>
                Variable values (use ; for separation for multiple values)
              </ColHeader>
            </div>
            <div style={{ width: COL3, flexShrink: 0 }} />
          </div>

          {/* Rows */}
          {visibleRows.map((row) => {
            const usedOrgIds = rows
              .filter((r) => r.id !== row.id && r.orgId)
              .map((r) => r.orgId);
            const availableOrgs = ORG_OPTIONS.filter(
              (o) => !usedOrgIds.includes(o.id)
            );

            return (
              <div key={row.id} style={tableRowStyle}>
                {/* Col 1: org name — read-only once selected */}
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
                      onChange={(v) => updateRow(row.id, 'orgId', v)}
                      placeholder="Select org"
                      searchable
                      searchPlaceholder="Search"
                      size="large"
                      fullWidth
                    />
                  )}
                </div>

                {/* Col 2: variable value */}
                <div style={{ flex: `0 0 ${COL2}px` }}>
                  <TextInput
                    placeholder="Enter value"
                    value={row.value}
                    onChange={(e) => updateRow(row.id, 'value', e.target.value)}
                  />
                </div>

                {/* Col 3: remove */}
                <div
                  style={{
                    width: COL3,
                    flexShrink: 0,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="tertiary"
                    size="small"
                    icon="cross"
                    iconOnly
                    aria-label="Remove row"
                    disabled={rows.length === 1}
                    onClick={() => removeRow(row.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Vertical>
      </div>
    </Modal>
  );
};
