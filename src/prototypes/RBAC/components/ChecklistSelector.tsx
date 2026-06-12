import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { Toggle } from '../../../components/Toggle';

export interface ChecklistItem {
  id: string;
  label: string;
  badge?: React.ReactNode;
  infoContent?: React.ReactNode;
}

interface ChecklistSelectorProps {
  title: string;
  optional?: boolean;
  items: ChecklistItem[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  countLabel?: string;
}

interface PopoverState {
  top: number;
  left: number;
  content: React.ReactNode;
}

function InfoPopover({ state, onClose }: { state: PopoverState; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: state.top,
        left: state.left,
        zIndex: 9999,
        background: '#fff',
        border: `1px solid ${referenceColors.gray['20']}`,
        borderRadius: 8,
        boxShadow: '0 4px 20px rgba(0,0,0,0.16)',
        padding: '12px 16px',
        width: 240,
        maxHeight: 320,
        overflowY: 'auto',
      }}
    >
      {state.content}
    </div>,
    document.body
  );
}

export const ChecklistSelector: React.FC<ChecklistSelectorProps> = ({
  title,
  optional = false,
  items,
  selectedIds,
  onChange,
  countLabel,
}) => {
  const [search, setSearch] = useState('');
  const [showSelected, setShowSelected] = useState(false);
  const [popover, setPopover] = useState<PopoverState | null>(null);

  const filtered = items.filter((item) => {
    const matchesSearch = item.label.toLowerCase().includes(search.toLowerCase());
    if (showSelected) return matchesSearch && selectedIds.includes(item.id);
    return matchesSearch;
  });

  const toggle = (id: string) => {
    onChange(selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]);
  };

  const selectAll = () => onChange(filtered.map((i) => i.id));
  const clear = () => onChange([]);

  const label = countLabel ?? title.split(' ').slice(1).join(' ');
  const selectedCount = selectedIds.length;

  function handleInfoClick(e: React.MouseEvent<HTMLButtonElement>, item: ChecklistItem) {
    e.preventDefault();
    e.stopPropagation();
    if (popover) { setPopover(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    setPopover({
      top: rect.top - 8,
      left: rect.left - 256, // 240px popover + 16px gap to the left
      content: item.infoContent,
    });
  }

  return (
    <div style={{ marginBottom: 20 }}>
      {/* Section title */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: systemColors.light['content-primary'] }}>
          {title}
        </span>
        {optional && (
          <span style={{ fontSize: 13, color: systemColors.light['content-tertiary'] }}>(Optional)</span>
        )}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: systemColors.light['content-tertiary'], display: 'flex', pointerEvents: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', height: 36, paddingLeft: 32, paddingRight: 12,
            border: `1px solid ${systemColors.light['border-default']}`,
            borderRadius: 6, fontSize: 14, outline: 'none', fontFamily: 'inherit',
            boxSizing: 'border-box', color: systemColors.light['content-primary'],
          }}
        />
      </div>

      {/* Bordered list */}
      <div style={{ border: `1px solid ${systemColors.light['border-default']}`, borderRadius: 8, overflow: 'hidden' }}>
        {/* Count + actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: `1px solid ${systemColors.light['border-divider']}` }}>
          <span style={{ fontSize: 13, color: systemColors.light['content-secondary'] }}>
            {label} ({selectedCount})
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={selectAll} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#2770EF', fontFamily: 'inherit', padding: 0 }}>
              Select all
            </button>
            <span style={{ color: systemColors.light['content-tertiary'] }}>|</span>
            <button onClick={clear} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#2770EF', fontFamily: 'inherit', padding: 0 }}>
              Clear
            </button>
          </div>
        </div>

        {/* Items — no overflow clipping so portal popover renders above */}
        <div style={{ maxHeight: 180, overflowY: 'auto', overflowX: 'visible' }}>
          {filtered.map((item) => (
            <label
              key={item.id}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 12px', cursor: 'pointer',
                borderBottom: `1px solid ${systemColors.light['border-divider']}`,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = systemColors.light['background-subtle']; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggle(item.id)}
                  style={{ cursor: 'pointer', accentColor: '#2770EF', width: 16, height: 16 }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, color: systemColors.light['content-primary'] }}>{item.label}</span>
                  {item.badge}
                </div>
              </div>
              {item.infoContent && (
                <button
                  onClick={(e) => handleInfoClick(e, item)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: systemColors.light['content-tertiary'], flexShrink: 0 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M8 7v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="8" cy="5" r="0.8" fill="currentColor" />
                  </svg>
                </button>
              )}
            </label>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '16px 12px', fontSize: 14, color: systemColors.light['content-tertiary'], textAlign: 'center' }}>
              No items found
            </div>
          )}
        </div>

        {/* Show selected toggle */}
        <div style={{ padding: '8px 12px', borderTop: `1px solid ${systemColors.light['border-divider']}` }}>
          <Toggle checked={showSelected} onChange={setShowSelected} label="Show selected" labelPosition="right" />
        </div>
      </div>

      {/* Portal popover — rendered outside overflow containers */}
      {popover && <InfoPopover state={popover} onClose={() => setPopover(null)} />}
    </div>
  );
};
