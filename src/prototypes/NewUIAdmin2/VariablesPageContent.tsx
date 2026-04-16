import React, { useState } from 'react';
import { systemColors, rdComponentColors } from '../../tokens/colors';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const brand = systemColors.light['content-brand'];

// ─── Mock data ────────────────────────────────────────────────────────────────

const VARIABLES = [
  { id: 1,  name: 'Account',           type: 'Connection property', sensitive: false, values: 2  },
  { id: 2,  name: 'account_name_var',  type: 'Connection property', sensitive: false, values: 0  },
  { id: 3,  name: 'acnt',              type: 'Connection property', sensitive: false, values: 1  },
  { id: 4,  name: 'ash1',              type: 'Connection property', sensitive: false, values: 2  },
  { id: 5,  name: 'ash10',             type: 'Connection property', sensitive: false, values: 2  },
  { id: 6,  name: 'c_name_formula_var',type: 'Formula',             sensitive: false, values: 0  },
  { id: 7,  name: 'clientid',          type: 'Connection property', sensitive: true,  values: 2  },
  { id: 8,  name: 'clientid_1',        type: 'Connection property', sensitive: true,  values: 1  },
  { id: 9,  name: 'db_name',           type: 'Connection property', sensitive: false, values: 3  },
  { id: 10, name: 'default_schema',    type: 'Connection property', sensitive: false, values: 1  },
  { id: 11, name: 'env_config',        type: 'Formula',             sensitive: true,  values: 4  },
  { id: 12, name: 'filter_var',        type: 'Connection property', sensitive: false, values: 1  },
  { id: 13, name: 'host_name',         type: 'Connection property', sensitive: false, values: 2  },
  { id: 14, name: 'org_id_var',        type: 'Formula',             sensitive: false, values: 0  },
  { id: 15, name: 'password_var',      type: 'Connection property', sensitive: true,  values: 3  },
];

// ─── Checkbox ─────────────────────────────────────────────────────────────────

const Checkbox: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button onClick={onChange} role="checkbox" aria-checked={checked} style={{
    width: '16px', height: '16px', borderRadius: '3px', flexShrink: 0,
    border: `1.5px solid ${checked ? brand : '#D1D5DB'}`,
    backgroundColor: checked ? brand : '#FFFFFF',
    cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'border-color 0.15s, background-color 0.15s',
  }}>
    {checked && (
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
        <path d="M1 3.5l2.5 2.5L8 1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
);

// ─── DotsMenu ─────────────────────────────────────────────────────────────────

const DotsMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '32px', height: '32px', borderRadius: '50%', border: 'none',
        backgroundColor: open ? '#F3F4F6' : 'transparent',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F3F4F6'; }}
        onMouseLeave={(e) => { if (!open) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
      >
        <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
          <circle cx="2" cy="2" r="1.5" fill="#6B7280" />
          <circle cx="8" cy="2" r="1.5" fill="#6B7280" />
          <circle cx="14" cy="2" r="1.5" fill="#6B7280" />
        </svg>
      </button>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', right: 0,
            backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 100, overflow: 'hidden', minWidth: '140px',
          }}>
            {['Edit', 'Rename', 'Delete'].map((action) => (
              <button key={action} onClick={() => setOpen(false)} style={{
                display: 'block', width: '100%', padding: '10px 16px',
                border: 'none', textAlign: 'left', fontFamily: font, fontSize: '13px',
                color: action === 'Delete' ? '#EF4444' : '#111827',
                backgroundColor: 'transparent', cursor: 'pointer',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = action === 'Delete' ? '#FEF2F2' : '#F9FAFB'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
              >
                {action}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── VariablesPageContent ─────────────────────────────────────────────────────

export const VariablesPageContent: React.FC = () => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState('');

  const allSelected = selected.size === VARIABLES.length;
  const toggleAll = () => { if (allSelected) setSelected(new Set()); else setSelected(new Set(VARIABLES.map(v => v.id))); };
  const toggleRow = (id: number) => { const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s); };

  const filtered = VARIABLES.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>

      {/* ── Sticky header: title + subtitle ── */}
      <div style={{
        flexShrink: 0, padding: '28px 40px 20px',
        borderBottom: '1px solid #E5E7EB', backgroundColor: '#FFFFFF',
      }}>
        <h1 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: 700, color: '#0F172A', fontFamily: font, letterSpacing: '-0.3px' }}>
          Variables
        </h1>
        <p style={{ margin: 0, fontSize: '13.5px', color: '#6B7280', fontFamily: font }}>
          Create and manage variables for your ThoughtSpot instance.
        </p>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '24px 40px 64px', boxSizing: 'border-box' }}>

          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            {/* Search */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ position: 'absolute', left: '10px' }}>
                <circle cx="6" cy="6" r="4.5" stroke="#9CA3AF" strokeWidth="1.4" />
                <line x1="9.5" y1="9.5" x2="12.5" y2="12.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '200px', height: '36px', paddingLeft: '32px', paddingRight: '12px',
                  border: '1px solid #D1D5DB', borderRadius: '8px',
                  fontFamily: font, fontSize: '13px', color: '#111827',
                  outline: 'none', backgroundColor: '#FFFFFF',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = brand; e.currentTarget.style.boxShadow = `0 0 0 2px ${brand}22`; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Create Variable — secondary pill */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              height: '36px', padding: '0 18px', borderRadius: '20px',
              border: 'none', backgroundColor: rdComponentColors['button-secondary-default'],
              cursor: 'pointer', fontFamily: font, fontSize: '13px', fontWeight: 600, color: '#111827',
              transition: 'opacity 0.15s',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.8'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Create Variable
            </button>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: font }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #E5E7EB' }}>
                <th style={{ width: '44px', padding: '10px 12px 10px 0', textAlign: 'left' }}>
                  <Checkbox checked={allSelected} onChange={toggleAll} />
                </th>
                <th style={{ padding: '10px 16px 10px 0', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Name</th>
                <th style={{ padding: '10px 16px 10px 0', textAlign: 'left', fontSize: '13px', fontWeight: 500, color: '#9CA3AF' }}>Type</th>
                <th style={{ padding: '10px 16px 10px 0', textAlign: 'left', fontSize: '13px', fontWeight: 500, color: '#9CA3AF' }}>Sensitive values</th>
                <th style={{ padding: '10px 16px 10px 0', textAlign: 'left', fontSize: '13px', fontWeight: 500, color: '#9CA3AF' }}>Values assigned</th>
                <th style={{ padding: '10px 0', width: '48px' }} />
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id}
                  style={{
                    borderBottom: '1px solid #F3F4F6',
                    backgroundColor: selected.has(v.id) ? `${brand}08` : 'transparent',
                    transition: 'background-color 0.1s',
                  }}
                  onMouseEnter={(e) => { if (!selected.has(v.id)) (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#FAFAFA'; }}
                  onMouseLeave={(e) => { if (!selected.has(v.id)) (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent'; }}
                >
                  <td style={{ padding: '16px 12px 16px 0', verticalAlign: 'middle' }}>
                    <Checkbox checked={selected.has(v.id)} onChange={() => toggleRow(v.id)} />
                  </td>
                  <td style={{ padding: '16px 16px 16px 0', verticalAlign: 'middle' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 500, color: brand, fontFamily: font, cursor: 'pointer' }}>
                      {v.name}
                    </span>
                  </td>
                  <td style={{ padding: '16px 16px 16px 0', verticalAlign: 'middle' }}>
                    <span style={{ fontSize: '13.5px', color: '#374151', fontFamily: font }}>{v.type}</span>
                  </td>
                  <td style={{ padding: '16px 16px 16px 0', verticalAlign: 'middle' }}>
                    <span style={{ fontSize: '13.5px', color: '#374151', fontFamily: font }}>
                      {v.sensitive ? 'True' : 'False'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 16px 16px 0', verticalAlign: 'middle' }}>
                    <span style={{ fontSize: '13.5px', color: '#374151', fontFamily: font }}>{v.values}</span>
                  </td>
                  <td style={{ padding: '16px 0', verticalAlign: 'middle', textAlign: 'right' }}>
                    <DotsMenu />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default VariablesPageContent;
