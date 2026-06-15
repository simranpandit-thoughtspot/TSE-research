import React, { useState, useRef, useEffect } from 'react';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { Group } from '../data/mockData';

interface GroupsTableProps {
  groups: Group[];
  onViewPrivileges: (group: Group) => void;
  onGroupNameClick: (group: Group) => void;
  onEdit: (group: Group) => void;
  onDuplicate: (group: Group) => void;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

function GroupRowMenu({
  group,
  onViewPrivileges,
  onEdit,
  onDuplicate,
  onClose,
}: {
  group: Group;
  onViewPrivileges: (g: Group) => void;
  onEdit: (g: Group) => void;
  onDuplicate: (g: Group) => void;
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const items: { label: string; disabled?: boolean; onClick?: () => void }[] = [
    {
      label: 'Edit',
      onClick: () => { onEdit(group); onClose(); },
    },
    {
      label: 'Duplicate',
      onClick: () => { onDuplicate(group); onClose(); },
    },
    {
      label: 'View privileges',
      onClick: () => { onViewPrivileges(group); onClose(); },
    },
    { label: 'Delete', disabled: true },
    { label: 'Export' },
  ];

  return (
    <div
      ref={menuRef}
      style={{
        position: 'absolute',
        right: 0,
        top: '100%',
        zIndex: 100,
        background: '#fff',
        border: `1px solid ${referenceColors.gray['20']}`,
        borderRadius: 8,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        minWidth: 160,
        padding: '4px 0',
      }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          onClick={item.onClick}
          disabled={item.disabled}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '8px 16px',
            background: 'none',
            border: 'none',
            cursor: item.disabled ? 'default' : 'pointer',
            fontSize: 14,
            color: item.disabled
              ? systemColors.light['content-tertiary']
              : systemColors.light['content-primary'],
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => {
            if (!item.disabled)
              (e.currentTarget as HTMLElement).style.background = systemColors.light['background-subtle'];
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'none';
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export const GroupsTable: React.FC<GroupsTableProps> = ({
  groups,
  onViewPrivileges,
  onGroupNameClick,
  onEdit,
  onDuplicate,
  selectedIds,
  onSelectionChange,
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);
  const colWidths = '40px 1fr 160px 200px 100px';

  const allSelected = groups.length > 0 && groups.every((g) => (selectedIds ?? []).includes(g.id));
  const someSelected = !allSelected && groups.some((g) => (selectedIds ?? []).includes(g.id));

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

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
          <input
            ref={headerCheckboxRef}
            type="checkbox"
            checked={allSelected}
            onChange={() => {
              if (allSelected) {
                onSelectionChange?.([]);
              } else {
                onSelectionChange?.(groups.map((g) => g.id));
              }
            }}
            style={{ cursor: 'pointer', accentColor: '#2770EF' }}
          />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-secondary'], display: 'flex', alignItems: 'center', gap: 4 }}>
          Group Name
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2L6 10M6 10L3 7M6 10L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-secondary'] }}>Users</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-secondary'] }}>Created</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-secondary'], textAlign: 'right', paddingRight: 8 }}>Actions</div>
      </div>

      {/* Rows */}
      {groups.map((group) => (
        <div
          key={group.id}
          style={{
            display: 'grid',
            gridTemplateColumns: colWidths,
            alignItems: 'center',
            borderBottom: `1px dashed ${systemColors.light['border-divider']}`,
            padding: '0 8px',
            minHeight: 56,
            position: 'relative',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = systemColors.light['background-subtle']; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          {/* Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input
              type="checkbox"
              checked={(selectedIds ?? []).includes(group.id)}
              onChange={() => {
                const current = selectedIds ?? [];
                const next = current.includes(group.id)
                  ? current.filter((id) => id !== group.id)
                  : [...current, group.id];
                onSelectionChange?.(next);
              }}
              style={{ cursor: 'pointer', accentColor: '#2770EF' }}
            />
          </div>

          {/* Group Name — clickable */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => onGroupNameClick(group)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 14,
                  color: '#2770EF',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  textAlign: 'left',
                }}
              >
                {group.displayName}
              </button>
              {group.isDefault && (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#fff',
                    background: '#2770EF',
                    borderRadius: 4,
                    padding: '1px 8px',
                  }}
                >
                  Default
                </span>
              )}
            </div>
            <span style={{ fontSize: 12, color: systemColors.light['content-secondary'] }}>
              {group.name}
            </span>
          </div>

          {/* Users */}
          <div style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>{group.userCount}</div>

          {/* Created */}
          <div style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>{group.created}</div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 4, position: 'relative' }}>
            <button
              onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === group.id ? null : group.id); }}
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
                letterSpacing: 1,
              }}
            >
              •••
            </button>
            {openMenuId === group.id && (
              <GroupRowMenu
                group={group}
                onViewPrivileges={onViewPrivileges}
                onEdit={onEdit}
                onDuplicate={onDuplicate}
                onClose={() => setOpenMenuId(null)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
