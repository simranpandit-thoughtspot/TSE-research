import React, { useState, useRef, useEffect } from 'react';
import { AppShell } from '../../components/AppShell';
import type { AppSidebarProps, SidebarTab, SidebarCategory, ScopeToggle } from '../../components/AppSidebar';
import type { GlobalHeaderProps } from '../../components/GlobalHeader';
import { systemColors, referenceColors } from '../../tokens/colors';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const brand = systemColors.light['content-brand'];

type SidebarTabId = 'insights' | 'data' | 'develop' | 'admin';

const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights' },
  { id: 'data', label: 'Data', headerTitle: 'Data Workspace' },
  { id: 'develop', label: 'Develop', headerTitle: 'Develop' },
  { id: 'admin', label: 'Admin', headerTitle: 'Admin' },
];

const SIDEBAR_CATEGORIES: Record<SidebarTabId, SidebarCategory[]> = {
  insights: [{ title: '', items: [{ id: 'home', label: 'Home' }] }],
  data: [{ title: '', items: [{ id: 'data-objects', label: 'Data objects' }] }],
  develop: [{ title: '', items: [{ id: 'playground', label: 'Playground' }] }],
  admin: [
    {
      title: '',
      items: [
        { id: 'home', label: 'Home' },
        { id: 'org-management', label: 'Org management' },
        { id: 'user-management', label: 'User management' },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { id: 'feature-management', label: 'Feature management' },
        { id: 'variables', label: 'Variables' },
        { id: 'version-control', label: 'Version control' },
      ],
    },
    {
      title: 'CONFIGURATION',
      items: [
        { id: 'application-settings', label: 'Application settings' },
        { id: 'customisation', label: 'Customisation' },
        { id: 'ai-settings', label: 'AI settings' },
        { id: 'search-spot-iq', label: 'Search & Spot IQ' },
      ],
    },
    {
      title: 'MONITOR',
      items: [
        { id: 'user-adoption', label: 'User & adoption' },
        { id: 'performance-tracking', label: 'performance tracking' },
        { id: 'ai-bi-stats', label: 'AI & BI stats' },
        { id: 'billing-query-stats', label: 'Billing query stats' },
      ],
    },
  ],
};

// ─── Chevron SVG ──────────────────────────────────────────────────────────────

const Chevron: React.FC<{ open: boolean; size?: number }> = ({ open, size = 14 }) => (
  <svg
    width={size} height={size} viewBox="0 0 14 14" fill="none"
    style={{ flexShrink: 0, transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.22s ease' }}
  >
    <path d="M3 5.5l4 4 4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Toggle ───────────────────────────────────────────────────────────────────

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    onClick={onChange} role="switch" aria-checked={checked}
    style={{
      position: 'relative', width: '36px', height: '20px', borderRadius: '10px',
      border: 'none', backgroundColor: checked ? brand : referenceColors.gray['30'],
      cursor: 'pointer', padding: 0, flexShrink: 0, transition: 'background-color 0.2s ease',
    }}
  >
    <span style={{
      position: 'absolute', top: '2px', left: checked ? '18px' : '2px',
      width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#fff',
      transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
    }} />
  </button>
);

// ─── Dropdown ─────────────────────────────────────────────────────────────────

const Dropdown: React.FC<{ value: string; options: string[]; width?: number; placeholder?: string }> = ({
  value: initialValue, options, width = 200, placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', width, flexShrink: 0 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', height: '34px', padding: '0 10px',
          border: `1px solid ${open ? brand : '#D1D5DB'}`, borderRadius: '6px',
          backgroundColor: '#FFFFFF', cursor: 'pointer', fontFamily: font, fontSize: '13px',
          color: selected ? '#111827' : '#9CA3AF', outline: 'none',
          boxShadow: open ? `0 0 0 2px ${brand}22` : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected || placeholder}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ flexShrink: 0, marginLeft: '6px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }}
        >
          <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)', zIndex: 100, overflow: 'hidden',
          animation: 'dropdownFade 0.15s ease',
        }}>
          {options.map((opt) => (
            <button key={opt} onClick={() => { setSelected(opt); setOpen(false); }}
              style={{
                display: 'block', width: '100%', padding: '9px 14px', border: 'none',
                textAlign: 'left', fontFamily: font, fontSize: '13px',
                fontWeight: opt === selected ? 500 : 400,
                color: opt === selected ? brand : '#111827',
                backgroundColor: opt === selected ? `${brand}10` : 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { if (opt !== selected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F9FAFB'; }}
              onMouseLeave={(e) => { if (opt !== selected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const Card: React.FC<{
  title: string;
  description?: string;
  open: boolean;
  onToggle: () => void;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, description, open, onToggle, rightAction, children }) => (
  <div style={{ backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
    {/* Header row: chevron + title + optional description + optional right action */}
    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '14px 24px 10px' }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px', flex: 1,
          border: 'none', background: 'none', cursor: 'pointer', fontFamily: font, textAlign: 'left', padding: 0,
        }}
      >
        <Chevron open={open} />
        <div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827', fontFamily: font }}>
            {title}
          </span>
          {description && (
            <div style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: font, marginTop: '2px', lineHeight: 1.5 }}>
              {description}
            </div>
          )}
        </div>
      </button>
      {rightAction && (
        <div style={{ flexShrink: 0, paddingTop: '1px' }}>{rightAction}</div>
      )}
    </div>

    {/* Collapsible body */}
    <div style={{ maxHeight: open ? '3000px' : '0px', overflow: 'hidden', transition: 'max-height 0.25s ease' }}>
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>
    </div>
  </div>
);

// ─── Setting Row ──────────────────────────────────────────────────────────────

const SettingRow: React.FC<{
  label: string;
  description?: string;
  control: React.ReactNode;
  noBg?: boolean;
}> = ({ label, description, control, noBg }) => (
  <div style={{
    display: 'flex', alignItems: description ? 'flex-start' : 'center',
    justifyContent: 'space-between', gap: '24px', padding: '16px 20px',
    backgroundColor: noBg ? 'transparent' : '#FFFFFF',
    border: noBg ? 'none' : '1px solid #E9EAEC', borderRadius: '8px',
  }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827', fontFamily: font, lineHeight: 1.4 }}>
        {label}
      </div>
      {description && (
        <div style={{ fontSize: '12.5px', color: '#9CA3AF', fontFamily: font, marginTop: '4px', lineHeight: 1.55 }}>
          {description}
        </div>
      )}
    </div>
    <div style={{ flexShrink: 0, paddingTop: description ? '2px' : '0' }}>{control}</div>
  </div>
);

// ─── Image Upload Area ────────────────────────────────────────────────────────

const ImageUploadArea: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E9EAEC', borderRadius: '8px',
      minHeight: '72px',
    }}>
      {/* Preview / placeholder */}
      <div style={{
        width: '56px', height: '44px', borderRadius: '6px',
        backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {preview ? (
          <img src={preview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="4" width="16" height="12" rx="2" stroke="#C0C6D0" strokeWidth="1.3" />
            <circle cx="7.5" cy="8.5" r="1.5" stroke="#C0C6D0" strokeWidth="1.3" />
            <path d="M2 13l4-3 3 2.5 3-4 4 4.5" stroke="#C0C6D0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />

      {/* Upload button */}
      <button
        onClick={() => inputRef.current?.click()}
        style={{
          height: '32px', padding: '0 16px', border: '1px solid #D1D5DB', borderRadius: '6px',
          backgroundColor: '#FFFFFF', fontSize: '13px', fontWeight: 500, color: '#374151',
          fontFamily: font, cursor: 'pointer',
        }}
      >
        Upload
      </button>
    </div>
  );
};

// ─── Double Dropdown Row ──────────────────────────────────────────────────────

const DoubleDropdownRow: React.FC<{
  label: string;
  value1: string;
  options1: string[];
  value2: string;
  options2: string[];
}> = ({ label, value1, options1, value2, options2 }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
    padding: '14px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E9EAEC', borderRadius: '8px',
  }}>
    <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827', fontFamily: font }}>
      {label}
    </span>
    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
      <Dropdown value={value1} options={options1} width={160} />
      <Dropdown value={value2} options={options2} width={190} />
    </div>
  </div>
);

// ─── Color picker grid ────────────────────────────────────────────────────────

const PICKER_COLORS = [
  ['#FFFFFF', '#FECACA', '#FED7AA', '#FEF3C7', '#DCFCE7', '#CFFAFE', '#DBEAFE', '#EDE9FE'],
  ['#F3F4F6', '#FCA5A5', '#FDBA74', '#FDE68A', '#BBF7D0', '#A5F3FC', '#BFDBFE', '#DDD6FE'],
  ['#D1D5DB', '#F87171', '#FB923C', '#FCD34D', '#86EFAC', '#67E8F9', '#93C5FD', '#C4B5FD'],
  ['#9CA3AF', '#EF4444', '#F97316', '#FBBF24', '#4ADE80', '#22D3EE', '#60A5FA', '#A78BFA'],
  ['#6B7280', '#DC2626', '#EA580C', '#F59E0B', '#22C55E', '#06B6D4', '#3B82F6', '#8B5CF6'],
  ['#4B5563', '#B91C1C', '#C2410C', '#D97706', '#16A34A', '#0891B2', '#2563EB', '#7C3AED'],
  ['#374151', '#991B1B', '#9A3412', '#B45309', '#15803D', '#0E7490', '#1D4ED8', '#6D28D9'],
  ['#111827', '#7F1D1D', '#7C2D12', '#78350F', '#14532D', '#164E63', '#1E3A8A', '#4C1D95'],
];

// ─── Color Swatch with picker popup ──────────────────────────────────────────

const ColorSwatch: React.FC<{ color: string }> = ({ color: initialColor }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(initialColor);
  const [hexInput, setHexInput] = useState(initialColor);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const pick = (c: string) => { setColor(c); setHexInput(c); };

  const handleHex = (val: string) => {
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) setColor(val);
  };

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      {/* Trigger button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          height: '32px', padding: '0 8px', borderRadius: '6px',
          border: open ? `2px solid ${brand}` : '1px solid #D1D5DB',
          backgroundColor: '#FFFFFF', cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '18px', height: '18px', borderRadius: '3px', backgroundColor: color, flexShrink: 0 }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
        >
          <path d="M2 4l3 3 3-3" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Picker popup */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0,
          backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB',
          borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
          zIndex: 300, padding: '12px', width: '220px',
          animation: 'dropdownFade 0.15s ease',
        }}>
          {/* Color grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '3px', marginBottom: '12px' }}>
            {PICKER_COLORS.flat().map((c, i) => (
              <div
                key={i}
                onClick={() => pick(c)}
                style={{
                  width: '22px', height: '22px', borderRadius: '3px',
                  backgroundColor: c, cursor: 'pointer', boxSizing: 'border-box',
                  border: c === color ? `2px solid ${brand}` : '1px solid rgba(0,0,0,0.08)',
                  outline: c === color ? '2px solid white' : 'none',
                  outlineOffset: '-3px',
                }}
              />
            ))}
          </div>

          {/* Hex input */}
          <div style={{ fontSize: '12px', color: '#374151', fontFamily: font, marginBottom: '6px', fontWeight: 500 }}>
            Hex color
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              value={hexInput}
              onChange={(e) => handleHex(e.target.value)}
              placeholder="#000000"
              style={{
                flex: 1, height: '32px', padding: '0 10px',
                border: '1px solid #D1D5DB', borderRadius: '6px',
                fontSize: '13px', fontFamily: font, color: '#111827', outline: 'none',
              }}
            />
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              backgroundColor: color, border: '1px solid #E5E7EB', flexShrink: 0,
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

const ColorRow: React.FC<{ label?: string; colors: string[] }> = ({ label, colors }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
    {label && (
      <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151', fontFamily: font, width: '140px', flexShrink: 0 }}>
        {label}
      </span>
    )}
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      {colors.map((c, i) => <ColorSwatch key={i} color={c} />)}
    </div>
  </div>
);

// ─── Checkbox ─────────────────────────────────────────────────────────────────

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 0' }}>
    <input
      type="checkbox" checked={checked} onChange={onChange}
      style={{ width: '14px', height: '14px', accentColor: brand, cursor: 'pointer' }}
    />
    <span style={{ fontSize: '13px', color: '#374151', fontFamily: font }}>{label}</span>
  </label>
);

// ─── Text Input Row ───────────────────────────────────────────────────────────

const TextInputRow: React.FC<{ label: string; placeholder?: string }> = ({ label, placeholder }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
    padding: '14px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E9EAEC', borderRadius: '8px',
  }}>
    <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827', fontFamily: font }}>
      {label}
    </span>
    <input
      type="text" placeholder={placeholder || 'Enter text'}
      style={{
        height: '34px', width: '220px', padding: '0 12px',
        border: '1px solid #D1D5DB', borderRadius: '6px',
        fontSize: '13px', fontFamily: font, color: '#111827',
        outline: 'none', flexShrink: 0,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = brand; e.currentTarget.style.boxShadow = `0 0 0 2px ${brand}22`; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.boxShadow = 'none'; }}
    />
  </div>
);

// ─── Reset link ───────────────────────────────────────────────────────────────

const ResetLink: React.FC = () => (
  <button style={{ border: 'none', background: 'none', fontSize: '13px', fontWeight: 500, color: brand, fontFamily: font, cursor: 'pointer', padding: 0 }}>
    Reset
  </button>
);

// ─── Add font link ────────────────────────────────────────────────────────────

const AddFontLink: React.FC = () => (
  <button style={{ display: 'flex', alignItems: 'center', gap: '4px', border: 'none', background: 'none', fontSize: '13px', fontWeight: 500, color: brand, fontFamily: font, cursor: 'pointer', padding: 0 }}>
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 2v9M2 6.5h9" stroke={brand} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    Add new font
  </button>
);

// ─── Color data ───────────────────────────────────────────────────────────────

const PRIMARY_COLORS = ['#2770EF', '#00BCD4', '#F59E0B', '#22C55E', '#A855F7', '#F97316', '#6B7280', '#EF4444'];

const SECONDARY_COLORS = [
  ['#BFDBFE', '#A5F3FC', '#FEF3C7', '#BBF7D0', '#E9D5FF', '#FED7AA', '#E5E7EB', '#FECACA'],
  ['#93C5FD', '#67E8F9', '#FDE68A', '#86EFAC', '#D8B4FE', '#FDBA74', '#D1D5DB', '#FCA5A5'],
  ['#3B82F6', '#06B6D4', '#F59E0B', '#4ADE80', '#C084FC', '#FB923C', '#9CA3AF', '#F87171'],
  ['#1D4ED8', '#0891B2', '#D97706', '#15803D', '#7E22CE', '#C2410C', '#374151', '#B91C1C'],
];

// ─── Page content (reusable without AppShell) ─────────────────────────────────

export const CustomisationPageContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('style');

  const [logoDefaultOpen, setLogoDefaultOpen] = useState(true);
  const [logoWideOpen, setLogoWideOpen] = useState(true);
  const [chartTextOpen, setChartTextOpen] = useState(true);
  const [tableTextOpen, setTableTextOpen] = useState(true);
  const [navColourOpen, setNavColourOpen] = useState(true);
  const [chartPaletteOpen, setChartPaletteOpen] = useState(true);
  const [footerTextOpen, setFooterTextOpen] = useState(true);
  const [disableColourRotation, setDisableColourRotation] = useState(false);

  const pageTabs = [
    { id: 'style', label: 'Style' },
    { id: 'chart', label: 'Chart' },
    { id: 'homepage', label: 'Homepage' },
    { id: 'email', label: 'Email' },
    { id: 'help', label: 'Help' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', backgroundColor: '#FFFFFF' }}>

      {/* Full-width page header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '28px 40px 0', borderBottom: '1px solid #E5E7EB' }}>
        <h1 style={{ margin: '0 0 16px 0', fontSize: '22px', fontWeight: 700, color: '#0F172A', fontFamily: font, letterSpacing: '-0.3px', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Customisations
        </h1>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#D1D5DB', margin: '0 24px 16px', flexShrink: 0 }} />
        <div style={{ display: 'flex', alignItems: 'flex-end', flex: 1 }}>
          {pageTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0 14px 16px', border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: font, fontSize: '13.5px',
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? brand : '#6B7280',
                borderBottom: activeTab === tab.id ? `2px solid ${brand}` : '2px solid transparent',
                marginBottom: '-1px', transition: 'color 0.15s', whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Centered content */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 40px 64px', boxSizing: 'border-box' }}>

        {activeTab === 'style' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Card title="Application Logo (Default) & Favicon" description="Recommended size: 140px x 140 px." open={logoDefaultOpen} onToggle={() => setLogoDefaultOpen(!logoDefaultOpen)} rightAction={<ResetLink />}>
              <ImageUploadArea />
            </Card>
            <Card title="Application Logo (Wide)" description="Recommended size: 230px x 45 px." open={logoWideOpen} onToggle={() => setLogoWideOpen(!logoWideOpen)} rightAction={<ResetLink />}>
              <ImageUploadArea />
            </Card>
            <Card title="Chart Text Styles" open={chartTextOpen} onToggle={() => setChartTextOpen(!chartTextOpen)} rightAction={<AddFontLink />}>
              <DoubleDropdownRow label="Select fonts" value1="X-Axis Labels" options1={['X-Axis Labels', 'Y-Axis Labels', 'Chart Title', 'Legend', 'Data Labels']} value2="Optimo Plain, helvetica..." options2={['Optimo Plain, helvetica...', 'Inter', 'Roboto', 'DM Sans', 'IBM Plex Sans']} />
            </Card>
            <Card title="Table Text Styles" open={tableTextOpen} onToggle={() => setTableTextOpen(!tableTextOpen)} rightAction={<AddFontLink />}>
              <DoubleDropdownRow label="Select fonts" value1="Table Value cells" options1={['Table Value cells', 'Table Header cells', 'Table Footer']} value2="Optimo Plain, helvetica..." options2={['Optimo Plain, helvetica...', 'Inter', 'Roboto', 'DM Sans', 'IBM Plex Sans']} />
            </Card>
            <Card title="Navigation Panel Colour" open={navColourOpen} onToggle={() => setNavColourOpen(!navColourOpen)} rightAction={<ResetLink />}>
              <SettingRow label="Theme colour" control={<Dropdown value="Dark" options={['Dark', 'Light', 'Dual Tone']} width={200} />} />
            </Card>
            <Card title="Chart Colour Palettes" open={chartPaletteOpen} onToggle={() => setChartPaletteOpen(!chartPaletteOpen)} rightAction={<ResetLink />}>
              <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E9EAEC', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Primary colours */}
                <ColorRow label="Primary colours" colors={PRIMARY_COLORS} />

                {/* Divider */}
                <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '4px 0' }} />

                {/* Secondary Colors label */}
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#374151', fontFamily: font }}>Secondary Colors</div>

                {/* Secondary rows — no label, just swatches */}
                {SECONDARY_COLORS.map((row, i) => (
                  <ColorRow key={i} colors={row} />
                ))}

                <div style={{ marginTop: '4px' }}>
                  <Checkbox label="Disable Colour Rotation" checked={disableColourRotation} onChange={() => setDisableColourRotation(!disableColourRotation)} />
                </div>
              </div>
            </Card>
            <Card title="Footer Text" open={footerTextOpen} onToggle={() => setFooterTextOpen(!footerTextOpen)} rightAction={<ResetLink />}>
              <TextInputRow label="Text for embedded objects" placeholder="Enter Text" />
            </Card>
          </div>
        )}

        {activeTab !== 'style' && (
          <div style={{ color: '#9CA3AF', fontFamily: font, fontSize: '13px' }}>
            {pageTabs.find(t => t.id === activeTab)?.label} settings coming soon.
          </div>
        )}

      </div>

      <style>{`
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ─── Standalone prototype (with its own AppShell) ─────────────────────────────

export const Customisation: React.FC = () => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTabId>('admin');
  const [sidebarNav, setSidebarNav] = useState('customisation');

  const scopeToggle: ScopeToggle = {
    options: [
      { id: 'all-orgs', label: 'All Orgs' },
      { id: 'primary-org', label: 'Primary Org' },
    ],
    activeId: 'all-orgs',
    onChange: () => {},
  };

  const headerProps: GlobalHeaderProps = {
    searchPlaceholder: 'Search in your library',
    userName: 'Primary',
    notificationCount: 1,
    showHamburger: false,
  };

  const sidebarProps: AppSidebarProps = {
    tabs: SIDEBAR_TABS,
    activeTab: sidebarTab,
    onTabChange: (tabId) => { setSidebarTab(tabId as SidebarTabId); setSidebarNav(''); },
    categories: SIDEBAR_CATEGORIES,
    selectedNav: sidebarNav,
    onNavSelect: setSidebarNav,
    ...(sidebarTab === 'admin' ? { scopeToggle } : {}),
  };

  return (
    <AppShell headerProps={headerProps} sidebarProps={sidebarProps} contentBackground="#FFFFFF" style={{ height: '100vh' }}>
      <CustomisationPageContent />
    </AppShell>
  );
};

export default Customisation;
